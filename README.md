# Rareminds website

React and TypeScript frontend built with Vite, with a Cloudflare Pages Functions BFF in `functions/`. The browser calls `/api` endpoints; payment and email operations use Cloudflare service bindings. There is no standalone Node application server. Node and npm are used for development and builds.

## Setup

Install dependencies with `npm ci`. Use a Node version supported by the installed Vite and Wrangler packages.

Copy `.env.example` to `.env` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for the intended Supabase project. Optionally set `VITE_GTM_ID` for Google Tag Manager. Values prefixed with `VITE_` are exposed to the browser.

Copy `.dev.vars.example` to `.dev.vars` for local Pages Functions secrets. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. The optional `ZOHO_FLOW_WEBHOOK_URL` enables event-registration forwarding to Zoho CRM; leave it unset to skip forwarding. Keep these server-only values out of `VITE_` variables and committed configuration.

## Local development

Run `npm run dev:full` to build the frontend and start Pages locally on port 8789. In a second terminal, run `npm run dev` for Vite with hot reload. Vite proxies `/api` requests to Pages on port 8789.

The Pages command requires the corresponding service Workers to be available for payment and email flows:

| Binding | Worker | Entrypoint |
| --- | --- | --- |
| `PAYMENT_WORKER` | `razorpay-api` | Default payment service |
| `EMAIL_SERVICE` | `shared-email-api` | `EmailService` |

Bindings and rate limiters are defined in `wrangler.toml`. Start the service Workers from their own projects when testing those integrations locally. Provider credentials belong to those Workers.

`npm run dev:pages` serves an existing `dist/` build without rebuilding it. Rebuild after frontend changes when using Pages directly. `npm run preview` previews the static frontend only; use Pages for BFF requests.

## Checks and deployment

- `npm run build`: build the frontend into `dist/`.
- `npm run lint`: run ESLint using `eslint.config.js`.
- `npm run test:connection`: query the configured Supabase project's events table to check connectivity.
- `npm run pages:deploy`: build and deploy to Cloudflare Pages. Configure the target environment's secrets and service bindings before using it.

Supabase migrations and configured seeds are kept under `supabase/`. Payment and email requests are handled through the Pages BFF and service Workers.

See [Razorpay setup](docs/payments/RAZORPAY_SETUP.md) and [payment troubleshooting](docs/payments/PAYMENT_TROUBLESHOOTING.md) for payment ownership, webhook configuration and verification steps.
