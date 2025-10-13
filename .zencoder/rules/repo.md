# Repository Overview

- **Name**: Rareminds Website
- **Primary Tech Stack**: React + TypeScript + Vite, Supabase backend integrations
- **Notable Features**:
  - Event registration flows with OTP verification
  - Supabase edge functions for OTP emails and registrations
  - Corporate training and academy pages with dynamic content

## Key Directories

1. `src/`
   - **components/**: React components for various domains (Academy, Events, etc.)
   - **pages/**: Route-based page components
   - **lib/**: Supabase client utilities and helper functions
   - **services/**: API interaction files
   - **utils/**: Shared utilities and data definitions

2. `public/`
   - **Assets**: Images, PDFs, and static resources for the front-end

3. `supabase/`
   - **functions/**: Supabase edge function source code (e.g., `send-otp-email`)
   - **migrations/**: SQL migration scripts

## Build & Tooling

- **Build Tool**: Vite
- **Styling**: Tailwind CSS + custom CSS modules
- **Linting**: ESLint (config in `eslint.config.ts`)

## Notes

- Ensure `.env` contains Supabase keys and API URLs for local testing.
- OTP and registration features rely on Supabase edge functions; check function logs if issues arise.
- Use `npm run dev` for local development and `npm run build` for production builds.