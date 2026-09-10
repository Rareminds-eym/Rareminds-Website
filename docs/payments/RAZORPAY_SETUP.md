# Razorpay Worker Setup

## Ownership boundary

Razorpay credentials and provider logic belong only to `/mnt/E230EB0F30EAEA0D/Rareminds/skill-echosystem/payment-worker`. Do not add Razorpay secrets to website, browser, or Supabase configuration.

The website uses the existing `razorpay-api` worker through the `PAYMENT_WORKER` Cloudflare service binding. Server-side order creation, checkout signature verification, and webhook signature verification are RPC calls. The browser loads Razorpay Checkout only as the user-facing payment UI.

## Website configuration

```toml
[[services]]
binding = "PAYMENT_WORKER"
service = "razorpay-api"
```

The binding targets the payment worker's default `PaymentService` entrypoint.

## Webhook

Configure Razorpay to send `payment.captured` and `order.paid` events to:

```text
https://<website-domain>/api/payments/webhook
```

Pages forwards the untouched body and signature to `PAYMENT_WORKER.verifyWebhookSignature()`. Keep the webhook secret only in the payment worker.

## Verification

- Confirm paid-event registration returns a pending registration and payment authorization token.
- Confirm `/api/payments/create-order` returns an order created by the payment-worker RPC.
- Complete a Razorpay test checkout and confirm both `payments` and `event_registrations` become completed.
- Confirm duplicate callbacks are accepted only for the same order/payment pair.

Rotate any credentials that were previously committed or configured outside the payment worker.
