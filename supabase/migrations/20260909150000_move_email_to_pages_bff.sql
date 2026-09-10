-- Email delivery now runs only in the Cloudflare Pages BFF through EmailService RPC.
DROP TRIGGER IF EXISTS on_pdf_download_created ON public.pdf_downloads;
DROP FUNCTION IF EXISTS public.handle_pdf_download();
DROP FUNCTION IF EXISTS public.call_recruitment_form_webhook();
DROP FUNCTION IF EXISTS public.notify_contact_form_insert();

-- OTP creation and verification now use the Pages BFF with the service role.
DROP POLICY IF EXISTS "Users can manage their own OTPs" ON public.email_otps;
REVOKE ALL ON TABLE public.email_otps FROM anon, authenticated, service_role;

-- Serialize OTP replacement and consumption per normalized email so a concurrent
-- resend cannot make an older code pass between lookup and deletion.
CREATE OR REPLACE FUNCTION public.store_email_otp(
  p_email text,
  p_otp text,
  p_expires_at timestamptz
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_email text := lower(btrim(p_email));
BEGIN
  IF v_email = '' OR p_otp !~ '^[0-9]{4}$' OR p_expires_at <= now() THEN
    RAISE EXCEPTION 'Invalid OTP data' USING ERRCODE = '22023';
  END IF;

  PERFORM pg_advisory_xact_lock(hashtextextended(v_email, 0));

  DELETE FROM public.email_otps
  WHERE lower(email) = v_email;

  INSERT INTO public.email_otps (email, otp, expires_at, verified)
  VALUES (v_email, p_otp, p_expires_at, false);
END;
$$;

CREATE OR REPLACE FUNCTION public.consume_email_otp(
  p_email text,
  p_otp text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_email text := lower(btrim(p_email));
  v_id uuid;
  v_stored_otp text;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtextextended(v_email, 0));

  SELECT id, otp
  INTO v_id, v_stored_otp
  FROM public.email_otps
  WHERE lower(email) = v_email
    AND verified IS FALSE
    AND expires_at > now()
  ORDER BY created_at DESC NULLS LAST, id DESC
  LIMIT 1
  FOR UPDATE;

  IF v_id IS NULL OR v_stored_otp <> p_otp THEN
    RETURN NULL;
  END IF;

  UPDATE public.email_otps
  SET verified = true,
      expires_at = now() + interval '10 minutes'
  WHERE id = v_id;

  RETURN v_id;
END;
$$;

ALTER TABLE public.event_registrations
  ADD COLUMN IF NOT EXISTS payment_access_token uuid;
ALTER TABLE public.payments
  ALTER COLUMN razorpay_order_id DROP NOT NULL,
  ADD COLUMN IF NOT EXISTS razorpay_key_id text,
  ADD COLUMN IF NOT EXISTS order_request_id uuid;

-- Stop with actionable diagnostics rather than failing later at an opaque unique-index statement.
-- Existing conflicts must be reviewed against Razorpay before this migration is applied again.
DO $$
DECLARE
  v_duplicate_groups bigint;
BEGIN
  SELECT count(*) INTO v_duplicate_groups
  FROM (
    SELECT event_id, lower(email)
    FROM public.event_registrations
    WHERE event_id IS NOT NULL
    GROUP BY event_id, lower(email)
    HAVING count(*) > 1
  ) duplicates;
  IF v_duplicate_groups > 0 THEN
    RAISE EXCEPTION 'Migration blocked: % duplicate event registration email group(s). Reconcile event_registrations by event_id and lower(email).', v_duplicate_groups;
  END IF;

  SELECT count(*) INTO v_duplicate_groups
  FROM (
    SELECT registration_id
    FROM public.payments
    WHERE registration_id IS NOT NULL
    GROUP BY registration_id
    HAVING count(*) > 1
  ) duplicates;
  IF v_duplicate_groups > 0 THEN
    RAISE EXCEPTION 'Migration blocked: % registration(s) have multiple payment rows. Reconcile payments by registration_id.', v_duplicate_groups;
  END IF;

  SELECT count(*) INTO v_duplicate_groups
  FROM (
    SELECT razorpay_order_id
    FROM public.payments
    WHERE razorpay_order_id IS NOT NULL
    GROUP BY razorpay_order_id
    HAVING count(*) > 1
  ) duplicates;
  IF v_duplicate_groups > 0 THEN
    RAISE EXCEPTION 'Migration blocked: % duplicate Razorpay order ID group(s). Reconcile payments by razorpay_order_id.', v_duplicate_groups;
  END IF;

  SELECT count(*) INTO v_duplicate_groups
  FROM (
    SELECT razorpay_payment_id
    FROM public.payments
    WHERE razorpay_payment_id IS NOT NULL
    GROUP BY razorpay_payment_id
    HAVING count(*) > 1
  ) duplicates;
  IF v_duplicate_groups > 0 THEN
    RAISE EXCEPTION 'Migration blocked: % duplicate Razorpay payment ID group(s). Reconcile payments by razorpay_payment_id.', v_duplicate_groups;
  END IF;
END;
$$;

CREATE UNIQUE INDEX IF NOT EXISTS ux_event_registrations_event_email
  ON public.event_registrations (event_id, lower(email))
  WHERE event_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_payments_registration_id
  ON public.payments (registration_id)
  WHERE registration_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_payments_order_request_id
  ON public.payments (order_request_id)
  WHERE order_request_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_payments_razorpay_order_id
  ON public.payments (razorpay_order_id)
  WHERE razorpay_order_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_payments_razorpay_payment_id
  ON public.payments (razorpay_payment_id)
  WHERE razorpay_payment_id IS NOT NULL;

CREATE OR REPLACE FUNCTION public.register_event_with_email_verification(
  p_event_id uuid,
  p_email text,
  p_name text,
  p_phone text,
  p_organization text,
  p_quantity integer,
  p_verification_proof uuid
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_email text := lower(btrim(p_email));
  v_event_name text;
  v_event_type text;
  v_price numeric(10,2);
  v_proof uuid;
  v_registration_id bigint;
  v_registration_event_name text;
  v_quantity integer;
  v_total numeric(12,2);
  v_amount_paise bigint;
  v_currency text;
  v_payment_status text;
  v_payment_token uuid;
BEGIN
  IF v_email = '' OR v_email !~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    OR btrim(p_name) = '' OR length(btrim(p_name)) > 100
    OR btrim(p_phone) = '' OR length(btrim(p_phone)) > 30
    OR btrim(p_organization) = '' OR length(btrim(p_organization)) > 200
    OR p_quantity < 1 OR p_quantity > 10 THEN
    RAISE EXCEPTION 'Invalid registration details' USING ERRCODE = '22023';
  END IF;

  PERFORM pg_advisory_xact_lock(hashtextextended(v_email, 0));

  SELECT title, event_type::text, price
  INTO v_event_name, v_event_type, v_price
  FROM public.events
  WHERE id = p_event_id
    AND status::text IN ('upcoming', 'ongoing')
    AND (registration_deadline IS NULL OR registration_deadline >= current_date)
  FOR SHARE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Event is unavailable for registration' USING ERRCODE = 'P0001';
  END IF;

  DELETE FROM public.email_otps
  WHERE id = p_verification_proof
    AND lower(email) = v_email
    AND verified IS TRUE
    AND expires_at > now()
  RETURNING id INTO v_proof;

  IF v_proof IS NULL THEN
    RAISE EXCEPTION 'Email verification is invalid or expired' USING ERRCODE = '28000';
  END IF;

  SELECT id, event_name, quantity, total_amount, payment_amount,
         COALESCE(payment_currency, 'INR'), payment_status
  INTO v_registration_id, v_registration_event_name, v_quantity, v_total,
       v_amount_paise, v_currency, v_payment_status
  FROM public.event_registrations
  WHERE event_id = p_event_id AND lower(email) = v_email
  FOR UPDATE;

  IF FOUND THEN
    IF v_event_type = 'paid' AND v_payment_status = 'pending' AND v_amount_paise > 0 THEN
      v_payment_token := gen_random_uuid();
      UPDATE public.event_registrations
      SET payment_access_token = v_payment_token
      WHERE id = v_registration_id;

      RETURN jsonb_build_object(
        'id', v_registration_id,
        'event_name', v_registration_event_name,
        'event_type', v_event_type,
        'quantity', v_quantity,
        'total_amount', v_total,
        'payment_amount', v_amount_paise,
        'payment_currency', v_currency,
        'payment_status', v_payment_status,
        'payment_token', v_payment_token
      );
    END IF;

    RAISE EXCEPTION 'Email is already registered for this event' USING ERRCODE = '23505';
  END IF;

  IF v_event_type = 'paid' THEN
    IF v_price IS NULL OR v_price <= 0 THEN
      RAISE EXCEPTION 'Paid event has no valid price' USING ERRCODE = '22023';
    END IF;
    v_total := round(v_price * p_quantity, 2);
    v_amount_paise := round(v_price * 100)::bigint * p_quantity;
    IF v_amount_paise > 2147483647 THEN
      RAISE EXCEPTION 'Payment amount is too large' USING ERRCODE = '22003';
    END IF;
    v_payment_status := 'pending';
    v_payment_token := gen_random_uuid();
  ELSE
    v_total := 0;
    v_amount_paise := 0;
    v_payment_status := 'not_required';
    v_payment_token := NULL;
  END IF;

  INSERT INTO public.event_registrations (
    event_id, event_name, name, email, phone, organization, quantity,
    total_amount, payment_amount, payment_currency, payment_status, payment_access_token
  ) VALUES (
    p_event_id, v_event_name, btrim(p_name), v_email, btrim(p_phone), btrim(p_organization), p_quantity,
    v_total, v_amount_paise::integer, 'INR', v_payment_status, v_payment_token
  ) RETURNING id INTO v_registration_id;

  RETURN jsonb_build_object(
    'id', v_registration_id,
    'event_name', v_event_name,
    'event_type', v_event_type,
    'quantity', p_quantity,
    'total_amount', v_total,
    'payment_amount', v_amount_paise,
    'payment_currency', 'INR',
    'payment_status', v_payment_status,
    'payment_token', v_payment_token
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.reserve_event_payment_order(
  p_registration_id bigint,
  p_payment_token uuid
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_amount integer;
  v_currency text;
  v_event_name text;
  v_payment_row_id bigint;
  v_payment_status text;
  v_order_id text;
  v_key_id text;
  v_request_id uuid;
BEGIN
  SELECT payment_amount, COALESCE(payment_currency, 'INR'), event_name
  INTO v_amount, v_currency, v_event_name
  FROM public.event_registrations
  WHERE id = p_registration_id
    AND payment_access_token = p_payment_token
    AND payment_status = 'pending'
    AND payment_amount > 0
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Registration is not payable' USING ERRCODE = 'P0001';
  END IF;

  SELECT id, status, razorpay_order_id, razorpay_key_id, order_request_id
  INTO v_payment_row_id, v_payment_status, v_order_id, v_key_id, v_request_id
  FROM public.payments
  WHERE registration_id = p_registration_id
  FOR UPDATE;

  IF FOUND THEN
    IF v_payment_status = 'pending' AND v_order_id IS NOT NULL AND v_key_id IS NOT NULL THEN
      RETURN jsonb_build_object(
        'disposition', 'ready',
        'amount', v_amount,
        'currency', v_currency,
        'event_name', v_event_name,
        'order_id', v_order_id,
        'razorpay_key_id', v_key_id,
        'request_id', v_request_id
      );
    END IF;

    IF v_payment_status = 'creating' AND v_request_id IS NOT NULL THEN
      RETURN jsonb_build_object(
        'disposition', 'wait',
        'amount', v_amount,
        'currency', v_currency,
        'event_name', v_event_name,
        'request_id', v_request_id
      );
    END IF;

    RAISE EXCEPTION 'Payment order state is invalid' USING ERRCODE = 'P0001';
  END IF;

  v_request_id := gen_random_uuid();
  INSERT INTO public.payments (
    registration_id, razorpay_order_id, amount, currency, status, order_request_id
  ) VALUES (
    p_registration_id, NULL, v_amount, v_currency, 'creating', v_request_id
  );

  RETURN jsonb_build_object(
    'disposition', 'create',
    'amount', v_amount,
    'currency', v_currency,
    'event_name', v_event_name,
    'request_id', v_request_id
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.finalize_event_payment_order(
  p_registration_id bigint,
  p_request_id uuid,
  p_order_id text,
  p_amount integer,
  p_currency text,
  p_key_id text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_amount integer;
  v_currency text;
  v_payment_row_id bigint;
  v_payment_status text;
  v_existing_order_id text;
  v_existing_key_id text;
BEGIN
  IF btrim(p_order_id) = '' OR length(p_order_id) > 100 OR p_amount <= 0
    OR p_currency !~ '^[A-Z]{3}$' OR btrim(p_key_id) = '' OR length(p_key_id) > 100 THEN
    RAISE EXCEPTION 'Invalid payment order' USING ERRCODE = '22023';
  END IF;

  SELECT payment_amount, COALESCE(payment_currency, 'INR')
  INTO v_amount, v_currency
  FROM public.event_registrations
  WHERE id = p_registration_id AND payment_status = 'pending'
  FOR UPDATE;

  IF v_amount IS NULL OR v_amount <> p_amount OR v_currency <> p_currency THEN
    RAISE EXCEPTION 'Payment order does not match registration' USING ERRCODE = '22023';
  END IF;

  SELECT id, status, razorpay_order_id, razorpay_key_id
  INTO v_payment_row_id, v_payment_status, v_existing_order_id, v_existing_key_id
  FROM public.payments
  WHERE registration_id = p_registration_id AND order_request_id = p_request_id
  FOR UPDATE;

  IF v_payment_row_id IS NULL THEN
    RETURN false;
  END IF;

  IF v_payment_status = 'pending' THEN
    RETURN v_existing_order_id = p_order_id AND v_existing_key_id = p_key_id;
  END IF;

  IF v_payment_status <> 'creating' OR v_existing_order_id IS NOT NULL THEN
    RETURN false;
  END IF;

  UPDATE public.payments
  SET razorpay_order_id = p_order_id,
      razorpay_key_id = p_key_id,
      status = 'pending',
      updated_at = now()
  WHERE id = v_payment_row_id;

  UPDATE public.event_registrations
  SET order_id = p_order_id,
      payment_currency = p_currency
  WHERE id = p_registration_id;

  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION public.complete_event_payment(
  p_order_id text,
  p_payment_id text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_payment_row_id bigint;
  v_registration_id bigint;
  v_payment_status text;
  v_existing_payment_id text;
  v_registration_status text;
  v_registration_order_id text;
  v_registration_payment_id text;
BEGIN
  IF btrim(p_order_id) = '' OR length(p_order_id) > 100
    OR btrim(p_payment_id) = '' OR length(p_payment_id) > 100 THEN
    RETURN false;
  END IF;

  SELECT id, registration_id, status, razorpay_payment_id
  INTO v_payment_row_id, v_registration_id, v_payment_status, v_existing_payment_id
  FROM public.payments
  WHERE razorpay_order_id = p_order_id
  FOR UPDATE;

  IF v_payment_row_id IS NULL THEN
    RETURN false;
  END IF;

  SELECT payment_status, order_id, razorpay_payment_id
  INTO v_registration_status, v_registration_order_id, v_registration_payment_id
  FROM public.event_registrations
  WHERE id = v_registration_id
  FOR UPDATE;

  IF v_registration_status = 'completed' THEN
    RETURN v_registration_order_id = p_order_id
      AND v_registration_payment_id = p_payment_id
      AND v_payment_status = 'completed'
      AND v_existing_payment_id = p_payment_id;
  END IF;

  IF v_payment_status <> 'pending' OR v_registration_status <> 'pending'
    OR v_registration_order_id <> p_order_id THEN
    RETURN false;
  END IF;

  UPDATE public.event_registrations
  SET payment_status = 'completed',
      payment_id = p_payment_id,
      razorpay_payment_id = p_payment_id,
      payment_date = now(),
      payment_verified_at = now(),
      payment_access_token = NULL
  WHERE id = v_registration_id;

  UPDATE public.payments
  SET razorpay_payment_id = p_payment_id,
      status = 'completed',
      updated_at = now()
  WHERE id = v_payment_row_id;

  RETURN true;
END;
$$;

ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.event_registrations, public.payments FROM anon, authenticated;
REVOKE ALL ON SEQUENCE public.event_registrations_id_seq, public.payments_id_seq FROM anon, authenticated;

REVOKE ALL ON FUNCTION public.store_email_otp(text, text, timestamptz) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.consume_email_otp(text, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.register_event_with_email_verification(uuid, text, text, text, text, integer, uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.reserve_event_payment_order(bigint, uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.finalize_event_payment_order(bigint, uuid, text, integer, text, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.complete_event_payment(text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.store_email_otp(text, text, timestamptz) TO service_role;
GRANT EXECUTE ON FUNCTION public.consume_email_otp(text, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.register_event_with_email_verification(uuid, text, text, text, text, integer, uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.reserve_event_payment_order(bigint, uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.finalize_event_payment_order(bigint, uuid, text, integer, text, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.complete_event_payment(text, text) TO service_role;
