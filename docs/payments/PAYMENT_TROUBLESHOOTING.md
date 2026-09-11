# Payment RPC Troubleshooting

## Request flow

1. The browser calls `/api/payments/create-order` with a registration ID and short-lived payment token.
2. Pages reads the authoritative amount through a service-role PostgreSQL RPC.
3. Pages calls `PAYMENT_WORKER.createOrder()` through the Cloudflare service binding.
4. Razorpay Checkout returns its signed result to the browser.
5. Pages calls `PAYMENT_WORKER.verifyPaymentSignature()` and transactionally completes database state.
6. Razorpay webhooks reach `/api/payments/webhook`; Pages delegates signature verification to `PAYMENT_WORKER.verifyWebhookSignature()`.

## Common failures

- **503 / payment service unavailable:** confirm the `PAYMENT_WORKER=razorpay-api` service binding is available to Pages and the payment worker has its Razorpay secrets.
- **409 / order still being prepared:** retry shortly. The database reservation fails closed to prevent duplicate orders.
- **403 / registration authorization expired:** verify the email again to rotate authorization for the existing pending registration.
- **422 / signature rejected:** inspect payment-worker logs; the website never verifies Razorpay signatures locally.
- **Database storage unavailable:** confirm `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are configured only for Pages Functions and that the migration has been applied.

Do not deploy or invoke Supabase payment Edge Functions, and do not place Razorpay credentials in website or Supabase configuration.
