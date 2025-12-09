-- Create pdf_downloads table
CREATE TABLE IF NOT EXISTS public.pdf_downloads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT,
  company TEXT,
  role TEXT,
  message TEXT,
  download_type TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.pdf_downloads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts
CREATE POLICY "Allow public inserts" ON public.pdf_downloads
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Create trigger function to send email notification
CREATE OR REPLACE FUNCTION public.handle_pdf_download()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM net.http_post(
    url := (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'SUPABASE_URL') || '/functions/v1/send-download-notification',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'SUPABASE_SERVICE_ROLE_KEY')
    ),
    body := jsonb_build_object('record', to_jsonb(NEW))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
CREATE TRIGGER on_pdf_download_created
  AFTER INSERT ON public.pdf_downloads
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_pdf_download();
