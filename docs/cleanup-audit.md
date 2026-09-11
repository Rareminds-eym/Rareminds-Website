# Workspace cleanup audit - rm-website (Cloudflare Pages BFF)

Audit only. No files were changed, moved, or deleted while producing this inventory.

## Scope and method

| Check | How it was produced |
| --- | --- |
| Source reachability | Import-graph walk from the single browser entry `src/main.tsx` (the only script `index.html` loads), resolving `@/*` -> `src/*`, relative paths, extensionless and `index.*` resolution, static imports, re-exports and `lazy(() => import(...))`. Block and line comments stripped so commented-out imports do not count as live. No `import.meta.glob` exists in the repo, so nothing is reached implicitly. |
| Importer evidence | Second pass resolving every specifier in every `src/**` file plus `functions/**` and `index.html`, then grouping each unreachable file by whether its importers are live, unreachable, or commented out. |
| Asset references | Literal basename search across all 662 text files in the repo (excluding `node_modules`, `dist`, `.git`, `.wrangler`, `supabase-old`, `semantic-review`, and `package-lock.json`), including `.sql` seeds, `.toml` config and `index.html`. |
| Duplicates | SHA-1 of file contents across `public/**` and `src/**` assets. |
| Sizes | `du -sh` / `stat` at audit time. |

### Verified baselines (measured now, before any cleanup)

| Gate | Result |
| --- | --- |
| `npm run build` (vite 6) | passes, ~14 s, 175 emitted asset files |
| `npx wrangler pages functions build` | "Compiled Worker successfully" |
| `npm run lint` | 390 problems: 0 errors, 390 warnings |
| `npx tsc --noEmit` | 577 pre-existing errors. Typecheck is **not** wired into any npm script and is not a usable gate today. |
| Working tree | clean on branch `dev` at audit time |

### Counts

| Category | Count | Size |
| --- | --- | --- |
| Files under `src/` | 709 | 87 MB |
| Reached from `src/main.tsx` | 531 | - |
| Unreachable under `src/` | 196 | - |
| - source modules (.ts/.tsx/.js) | 141 | 3.7 MB |
| - stylesheets | 5 | 2.3 KB |
| - assets | 50 | 71.8 MB |
| Assets scanned (public + src) | 537 | - |
| Assets with no literal filename reference | 138 | 80.9 MB |
| Duplicate-content groups | 31 | 19.1 MB reclaimable |

My source-module count is 141 rather than the 138 quoted in the brief. The three extra are `src/App.tsx`, `src/BlogDetailLazy.tsx` and `src/backend/server.js`, which are unreachable by the same rule as the rest. My asset count is 138 of 537 scanned rather than 141 of 540; the deltas come from counting rules, not from a different conclusion.

## Classification legend

| Class | Meaning |
| --- | --- |
| **removable** | No live reference by any path the toolchain or runtime can take. Safe to delete once the verification suite below passes. |
| **consolidate first** | Carries information that is still needed somewhere else. Move the content, then delete. |
| **generated** | Reproducible build output or tool cache. Delete freely; never commit. |
| **historical** | Point-in-time record (retired code, review reports, dumps). Keep or archive deliberately; do not silently delete. |
| **retain pending evidence** | Looks unreferenced to a static scan, but a real consumer may exist (ambient types, DB-driven URLs, external inbound links). Needs a positive check before removal. |

## 1. Root-level and retired-backend candidates

| Path | Size | Reason | Reference evidence | Class |
| --- | --- | --- | --- | --- |
| `server.js` | 91 B | Retirement notice only, no code | Single comment: "Legacy Node server removed; the BFF lives in Cloudflare Functions under functions/api/." No npm script or config points at it. Tracked in git. | removable |
| `src/backend/server.js` | 90 B | Retirement notice only, no code | Same one-line notice. Unreachable from `src/main.tsx`; nothing imports `src/backend/*`. Deleting it empties `src/backend/`. | removable |
| `supabase/functions/create-payment-order/index.ts` | 90 B | Retirement notice only | "Retired: payment orders are created only through the Pages BFF and PAYMENT_WORKER RPC." Live path is `functions/api/payments/[action].ts` + the `PAYMENT_WORKER` service binding in wrangler.toml. | removable |
| `supabase/functions/create-payment-order/deno.json` | 3 B | Empty config `{}` for a retired function | Only meaningful next to a real index.ts. | removable |
| `supabase/functions/verify-payment/index.ts` | 95 B | Retirement notice only | "Retired: payment signatures are verified only through the Pages BFF and PAYMENT_WORKER RPC." | removable |
| `supabase/functions/verify-payment/deno.json` | 3 B | Empty config `{}` for a retired function | Only meaningful next to a real index.ts. | removable |
| `supabase/functions/send-contact-email/.npmrc` | 221 B | Leftover boilerplate in an otherwise empty directory | Directory contains this file and nothing else; the email function itself already moved to `functions/api/email/[action].ts` (migration `20260909150000_move_email_to_pages_bff.sql`). Comment-only file, no registry actually configured. | removable |
| `supabase/functions/send-recruitment-email/.npmrc` | 221 B | Leftover boilerplate in an otherwise empty directory | Identical content, same situation. | removable |
| `eslint.config.ts` | 844 B | Obsolete duplicate config | ESLint 8 flat-config loads `eslint.config.js` (the active one: TS parser, ignores dist/node_modules/.wrangler/supabase-old). This `.ts` variant targets only `**/*.{js,jsx}` and imports `globals` and `@eslint/js`, neither of which is in package.json - it cannot load. `npm run lint` = `eslint .` never reads it. | removable |
| `test.txt` | 14 B | Scratch file | UTF-16 content "test". No reference anywhere. Tracked in git. | removable |
| `public/vite.svg` | 1 KB | Vite starter-template logo | Not referenced by index.html, src/, functions/ or public/. | removable |
| `dev.vars.example` | 938 B | Second env example that overlaps `.dev.vars.example` | Documents `ZOHO_FLOW_WEBHOOK_URL`, which is **live**: read in functions/api/register.ts (typed at line 23, guarded at 978-979, used at 990). `.dev.vars.example` currently documents only SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY. Copy the ZOHO block over first, then delete. | consolidate first |
| `README.md` | 856 B | Vite starter-template README | Still titled "React + Vite" and describes plugin choices; says nothing about the Pages BFF, `dev:pages`, service bindings, or Supabase. `package.json.description` repeats the same template sentence. | consolidate first (replace, do not just delete) |
| `.zencoder/rules/repo.md` | 1 KB | Stale repo description for an editor assistant | Lists "Supabase edge functions for OTP emails and registrations" as a notable feature; those were retired in favour of `functions/api/`. Either refresh or drop the directory. | consolidate first |
| `.wrangler/deploy.yml.removed` | 2 KB | Retired GitHub Actions workflow (EC2 + scp deploy) | Superseded by `npm run pages:deploy` (wrangler pages deploy). Kept only as a renamed artefact inside an ignored directory. | historical |
| `supabase/seed_remote.sql` | 12.0 MB | One-off remote dump, not wired into any tooling | `supabase/config.toml` line 183 sets `sql_paths = ["./seed/*.sql"]`, which excludes this file. Nothing in package.json or docs/ references it. Tracked in git, so it is 12 MB of repo weight. | historical |
| `src/assets/corporate/Home/_legacy_backup/industries.tsx` | 1.8 MB | Backup copy of a live component | Directory name says `_legacy_backup`. The live module is `src/assets/corporate/Home/industries/industries.tsx`, imported by IndustriesSection.tsx. Nothing resolves to the backup. | removable |
| `src/assets/corporate/Home/_legacy_backup/process.tsx` | 522 KB | Backup copy of a live component | Live module is `src/assets/corporate/Home/process/process.tsx` (imported by ProcessSection.tsx:3). | removable |
| `src/assets/corporate/Home/_legacy_backup/processMobile.tsx` | 441 KB | Backup copy of a live component | Live module is `src/assets/corporate/Home/process/processMobile.tsx` (imported by ProcessSection.tsx:2). | removable |

`test-connection.js` is deliberately **not** in this table: it is wired up as `npm run test:connection` and is a Supabase diagnostic, not a Node server.

## 2. Unreachable source modules (141)

Every row is unreachable from `src/main.tsx`. None of the 141 has a live importer in a reached file, so this set can be deleted as one unit without touching any live import. Breakdown of the evidence: 113 with no resolving specifier anywhere, 23 imported only by other unreachable files, 5 referenced only from commented-out imports. Three rows are reclassified **retain pending evidence** because they are consumed without an import.

| Path | Size | Reason | Reference evidence | Class |
| --- | --- | --- | --- | --- |
| `src/App.tsx` | 1 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/assets/corporate/Home/_legacy_backup/industries.tsx` | 1.8 MB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/assets/corporate/Home/_legacy_backup/process.tsx` | 522 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/assets/corporate/Home/_legacy_backup/processMobile.tsx` | 441 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/backend/server.js` | 90 B | Retirement notice only (1 comment line, no code) | Full contents: "Legacy Node server removed; the BFF lives in Cloudflare Functions under functions/api/." | removable |
| `src/BlogDetailLazy.tsx` | 195 B | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Academy.tsx` | 22 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Blogs/blog.ts` | 424 B | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Blogs/FloatingShareBar.tsx` | 1 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Contact/input.tsx` | 805 B | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Contact/textarea.tsx` | 786 B | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Contact/toast.tsx` | 5 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/FAQChatbot.tsx` | 10 KB | Imported only by other unreachable files | Importers (all unreachable): src/components/Academy/Floatingbutton.tsx:4. Remove as a set; keeping any member re-orphans the rest. | removable |
| `src/components/Academy/Floatingbutton.tsx` | 6 KB | Only reference is a commented-out import | Commented import at src/pages/Academia/Student/student.tsx:42. | removable |
| `src/components/Academy/Project/naanMudhalvan/AchievementsSection.tsx` | 3 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Project/naanMudhalvan/RoleSection.tsx` | 3 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Project/types/papaparse.d.ts` | 28 B | Redundant `declare module 'papaparse'` shim | @types/papaparse ^5.3.16 is a declared devDependency; this shim only weakens the real types. | removable |
| `src/components/Academy/StickyButton/StickyButton/FAQChatbot.tsx` | 7 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Students/CaseStudy/CaseStudy.tsx` | 13 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Students/CaseStudy/CaseStudyCard.tsx` | 3 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Students/CaseStudy/CaseStudyDetail.tsx` | 13 KB | Only reference is a commented-out import | Commented import at src/pages/Academia/Student/student.tsx:41. | removable |
| `src/components/Academy/Students/FAQ.tsx` | 3 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Students/Logos copy.tsx` | 5 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Teacher/BonusSection.tsx` | 5 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Teacher/CareerCounsellingBlueprint.tsx` | 18 KB | Imported only by other unreachable files | Importers (all unreachable): src/components/Academy/Teacher/programs.tsx:4. Remove as a set; keeping any member re-orphans the rest. | removable |
| `src/components/Academy/Teacher/ContactSection.tsx` | 2 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Teacher/CourseCards.tsx` | 16 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Teacher/CTASection.tsx` | 1 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Teacher/DayCard.tsx` | 4 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Teacher/DownloadForm.tsx` | 3 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Teacher/FAB/ActionButton.tsx` | 1 KB | Imported only by other unreachable files | Importers (all unreachable): src/components/Academy/Teacher/FAB/FloatingActionButton.tsx:4. Remove as a set; keeping any member re-orphans the rest. | removable |
| `src/components/Academy/Teacher/FAB/FloatingActionButton.tsx` | 3 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Teacher/FaqAndContact.tsx` | 5 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Teacher/FDPButton.tsx` | 2 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Teacher/Herobanner/DownloadForm.tsx` | 4 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Teacher/Herobanner/EnquiryForm.tsx` | 4 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Teacher/Herobanner/HeroBanner.tsx` | 4 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Teacher/Herobanner/Schedule.tsx` | 1 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Teacher/Herobanner/ServiceCarousel.tsx` | 4 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Teacher/Herobanner/Services.tsx` | 8 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Teacher/NEPChecklist.tsx` | 10 KB | Imported only by other unreachable files | Importers (all unreachable): src/components/Academy/Teacher/programs.tsx:5. Remove as a set; keeping any member re-orphans the rest. | removable |
| `src/components/Academy/Teacher/programs.tsx` | 17 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Teacher/Service.tsx` | 20 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Teacher/ServicePage.tsx` | 0 B | Empty file (0 bytes), no importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Teacher/Services.tsx` | 0 B | Empty file (0 bytes), no importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Teacher/Showcase_videos/RotatingCube.tsx` | 14 KB | Imported only by other unreachable files | Importers (all unreachable): src/components/Academy/Teacher/Showcase_videos/viedo_Cube.tsx:2. Remove as a set; keeping any member re-orphans the rest. | removable |
| `src/components/Academy/Teacher/Showcase_videos/viedo_Cube.tsx` | 4 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Teacher/testimonials/StarRating.tsx` | 518 B | Imported only by other unreachable files | Importers (all unreachable): src/components/Academy/Teacher/testimonials/TestimonialCard.tsx:2. Remove as a set; keeping any member re-orphans the rest. | removable |
| `src/components/Academy/Teacher/testimonials/TestimonialCard.tsx` | 2 KB | Imported only by other unreachable files | Importers (all unreachable): src/components/Academy/Teacher/testimonials/testimonials.tsx:2. Remove as a set; keeping any member re-orphans the rest. | removable |
| `src/components/Academy/Teacher/testimonials/testimonials.tsx` | 8 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Teacher/TestimonialsCarousel.tsx` | 14 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Teacher/Testimonialsdemo.tsx` | 5 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/Teacher/VideoCarousel.tsx` | 14 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/UI/avatar.tsx` | 1 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/UI/buttonfaq.tsx` | 2 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Academy/UI/faqData.ts` | 3 KB | Imported only by other unreachable files | Importers (all unreachable): src/components/Academy/FAQChatbot.tsx:9, src/components/Academy/StickyButton/StickyButton/FAQChatbot.tsx:5, src/components/Contact/StickyButton/StickyButton/FAQChatbot.tsx:5. Remove as a set; keeping any member re-orphans the rest. | removable |
| `src/components/Academy/UI/sonner.tsx` | 894 B | Only reference is a commented-out import | Commented import at src/components/Academy/Students/FaqAndContact.tsx:12, src/components/Academy/Teacher/FaqAndContact.tsx:12. | removable |
| `src/components/Academy/UI/tabs.tsx` | 2 KB | Imported only by other unreachable files | Importers (all unreachable): src/components/Academy/Students/CaseStudy/CaseStudy.tsx:7, src/components/Academy/Students/CaseStudy/CaseStudyDetail.tsx:4. Remove as a set; keeping any member re-orphans the rest. | removable |
| `src/components/Academy/UI/testimonial.ts` | 157 B | Imported only by other unreachable files | Importers (all unreachable): src/components/Academy/Teacher/TestimonialsCarousel.tsx:148. Remove as a set; keeping any member re-orphans the rest. | removable |
| `src/components/Contact/StickyButton/StickyButton/FAQChatbot.tsx` | 7 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Contact/Textarea.tsx` | 0 B | Empty file (0 bytes), no importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Corporate/CookieConsent.tsx` | 6 KB | Only reference is a commented-out import | Commented import at src/pages/Corporate/Passport/Index.tsx:13. | removable |
| `src/components/Corporate/Recruitment/HeroSection.tsx` | 0 B | Empty file (0 bytes), no importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Corporate/Recruitment/Home/Contact/ContactForm.tsx` | 5 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Corporate/Recruitment/Home/Contact/FormField.tsx` | 2 KB | Imported only by other unreachable files | Importers (all unreachable): src/components/Corporate/Recruitment/Home/Contact/ContactForm.tsx:8. Remove as a set; keeping any member re-orphans the rest. | removable |
| `src/components/Corporate/Recruitment/Home/services/servicesData.ts` | 0 B | Empty file (0 bytes), no importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Corporate/Recruitment/TechTeamSection.tsx` | 0 B | Empty file (0 bytes), no importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Corporate/Training/CaseStudies.tsx` | 4 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Corporate/Training/Contact/toast.tsx` | 5 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Corporate/Training/serviceData.ts` | 3 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/debug/RegistrationDebug.tsx` | 3 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Events/EventContactFormExample.tsx` | 7 KB | Imported only by other unreachable files | Importers (all unreachable): src/components/Events/index.ts:23. Remove as a set; keeping any member re-orphans the rest. | removable |
| `src/components/Events/EventCountdown.tsx` | 7 KB | Imported only by other unreachable files | Importers (all unreachable): src/components/Events/index.ts:14. Remove as a set; keeping any member re-orphans the rest. | removable |
| `src/components/Events/EventCountdownSupabase.tsx` | 10 KB | Imported only by other unreachable files | Importers (all unreachable): src/components/Events/index.ts:16. Remove as a set; keeping any member re-orphans the rest. | removable |
| `src/components/Events/HurryUpBooking.tsx` | 8 KB | Imported only by other unreachable files | Importers (all unreachable): src/components/Events/index.ts:15. Remove as a set; keeping any member re-orphans the rest. | removable |
| `src/components/Events/index.ts` | 2 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Events/StickyButton/FAQChatbot.tsx` | 8 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Events/TestEventContactForm.tsx` | 3 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/GATracker.tsx` | 238 B | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Govt/Blogs/blog.ts` | 424 B | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Govt/Blogs/FloatingShareBar.tsx` | 1 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Govt/CTAButton.tsx` | 784 B | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Menu/Index.tsx` | 330 B | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Projects/ProjectDetail.tsx` | 29 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Projects/ProjectDetailClean.tsx` | 16 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/Projects/ProjectDetailDesigned.tsx` | 28 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/ui/CountdownTimer.tsx` | 4 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/ui/gradient-tracing.tsx` | 0 B | Empty file (0 bytes), no importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/ui/icon-badge.tsx` | 682 B | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/ui/PageHeader.tsx` | 802 B | Imported only by other unreachable files | Importers (all unreachable): src/pages/Academia/Student/CareerToolkit.tsx:8. Remove as a set; keeping any member re-orphans the rest. | removable |
| `src/components/ui/RegistrationStatusBanner.tsx` | 5 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/ui/testimonials.tsx` | 2 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/ui/toaster.tsx` | 771 B | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/universities/Blogs/blog.ts` | 32 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/universities/Blogs/FloatingShareButton.tsx` | 1 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/universities/fdp/CalendarSection.tsx` | 5 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/universities/fdp/data/programsData.tsx` | 2 KB | Imported only by other unreachable files | Importers (all unreachable): src/components/universities/fdp/ProgramLearnMore.tsx:1. Remove as a set; keeping any member re-orphans the rest. | removable |
| `src/components/universities/fdp/ProgramLearnMore.tsx` | 661 B | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/universities/fdp/StickyButtons.tsx` | 11 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/universities/sdp/CourseCard/CourseCard.tsx` | 3 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/universities/sdp/FAQ.tsx` | 6 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/universities/sdp/FinalCTA.tsx` | 9 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/universities/sdp/GradeSelector/GradeSelector.tsx` | 2 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/universities/sdp/InstitutionalEnquiry.tsx` | 6 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/universities/sdp/modals/CourseEnrollmentModal.tsx` | 6 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/universities/sdp/Pagination/index.ts` | 40 B | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/universities/sdp/shared/ErrorBoundary.tsx` | 2 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/universities/sdp/shared/index.ts` | 114 B | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/universities/sdp/shared/LazyImage.tsx` | 1 KB | Imported only by other unreachable files | Importers (all unreachable): src/components/universities/sdp/shared/index.ts:2. Remove as a set; keeping any member re-orphans the rest. | removable |
| `src/components/universities/sdp/shared/LoadingSkeleton.tsx` | 3 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/universities/sdp/StickyButtons.tsx` | 1 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/components/universities/sdp/Testimonials.tsx` | 2 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/constants/faqData.ts` | 10 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/css.d.ts` | 108 B | Ambient module declaration, never imported by design | Declares `*.module.css`; 7 reached files import `.module.css` (e.g. src/pages/Blogs/styles.module.css consumers). Deleting it breaks typecheck. | retain pending evidence |
| `src/data/coursesData.ts` | 28 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/data/recruitment_serviceData.ts` | 53 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/features/corporateTrainingServicesSlice.ts` | 2 KB | Imported only by other unreachable files | Importers (all unreachable): src/pages/Corporate/Training/Services/Index.tsx:4. Remove as a set; keeping any member re-orphans the rest. | removable |
| `src/hooks/Events/useEventCountdown.ts` | 5 KB | Imported only by other unreachable files | Importers (all unreachable): src/components/Events/EventCountdownSupabase.tsx:2, src/components/Events/index.ts:35, src/components/Events/index.ts:36. Remove as a set; keeping any member re-orphans the rest. | removable |
| `src/hooks/use-debounce.ts` | 408 B | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/hooks/useTestimonials.ts` | 157 B | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/pages/Academia/Student/CareerToolkit.tsx` | 11 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/pages/Academia/Student/ThreeEProgram.tsx` | 7 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/pages/Blogs/types.ts` | 0 B | Empty file (0 bytes), no importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/pages/ComingSoon.tsx` | 3 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/pages/Corporate/CorporateLanding.tsx` | 5 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/pages/Corporate/Training/Services/[slug].tsx` | 28 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/pages/Corporate/Training/Services/CoursesPageNew.tsx` | 0 B | Empty file (0 bytes), no importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/pages/Corporate/Training/Services/Index.tsx` | 16 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/pages/Corporate/Training/Services/serviceData.ts` | 287 KB | Imported only by other unreachable files | Importers (all unreachable): src/features/corporateTrainingServicesSlice.ts:2, src/pages/Corporate/Training/Services/[slug].tsx:5. Remove as a set; keeping any member re-orphans the rest. | removable |
| `src/pages/Universities/Passport/components/problemSection.tsx` | 3 KB | Only reference is a commented-out import | Commented import at src/pages/Universities/Passport/Index.tsx:3. | removable |
| `src/pages/Universities/sdp/SDPLandingPage.tsx` | 2 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/pages/Universities/ServicesPage.tsx` | 507 B | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/types/Blog.ts` | 287 B | Exports an unused `Blog` interface | Nothing resolves to it. The near-miss import `@/types/blog` in 3 blogData.ts files wants `BlogPost`/`BlogCategory`, which this file does not export - see Latent issues. | removable |
| `src/types/LandingPage/desc-card.tsx` | 68 B | Global (script-scope) type declaration, used without an import | `CardDesc` referenced by 6 reached files: src/components/LandingPage/{career-counselling,college,corporate,govt,school,desc-card}.tsx. | retain pending evidence |
| `src/types/pdf.d.ts` | 82 B | Ambient `*.pdf` module declaration with no consumer | No `import ... from "*.pdf"` anywhere in src; the 4 PDFs are served from public/institutions/pdfs via URL strings. | removable |
| `src/types/sdp/service.types.ts` | 355 B | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/types/user-type.tsx` | 86 B | Global (script-scope) type declaration, used without an import | `UserType` referenced by 6 reached files: src/components/LandingPage/{career-counselling,college,corporate,govt,school,desc-card}.tsx. | retain pending evidence |
| `src/utils/priceUtils.ts` | 1 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |
| `src/utils/registrationStatus.ts` | 3 KB | Imported only by other unreachable files | Importers (all unreachable): src/components/debug/RegistrationDebug.tsx:2. Remove as a set; keeping any member re-orphans the rest. | removable |
| `src/utils/testimonials.tsx` | 2 KB | Imported only by other unreachable files | Importers (all unreachable): src/components/universities/sdp/Testimonials.tsx:4. Remove as a set; keeping any member re-orphans the rest. | removable |
| `src/utils/testSupabase.ts` | 1 KB | No importer | No module specifier in src/, functions/ or index.html resolves to this path. | removable |

Notable groupings inside that table:

- **Alternate implementations of live pages**: `src/App.tsx` (a `BrowserRouter` app superseded by `src/routes.tsx` + `createBrowserRouter`, which `main.tsx` actually mounts), `src/components/Projects/ProjectDetail.tsx`, `ProjectDetailClean.tsx` and `ProjectDetailDesigned.tsx` (routes.tsx:121 uses `ProjectDetailNew.tsx`), `src/pages/Corporate/Training/Services/{Index,[slug]}.tsx` plus its 287 KB `serviceData.ts`, and four near-duplicate `FAQChatbot.tsx` copies under Academy/, Academy/StickyButton/StickyButton/ and Contact/StickyButton/StickyButton/.
- **A whole unused Teacher variant**: ~30 files under `src/components/Academy/Teacher/` (Herobanner/*, testimonials/*, FAB/*, Service.tsx, programs.tsx, CourseCards.tsx, NEPChecklist.tsx, ...). The live equivalents live under `Academy/Students/` and `pages/Academia/Teacher/`. `Teacher/test1.tsx`, `test2.tsx` and `test1.module.css` are **not** in this set - `oldandnewmethod.tsx` imports them.
- **Debug and example helpers**: `src/components/debug/RegistrationDebug.tsx` with `src/utils/registrationStatus.ts`, `src/components/Events/TestEventContactForm.tsx`, `EventContactFormExample.tsx`, `src/utils/testSupabase.ts` (distinct from the live `src/utils/testConnection.ts`).
- **A dead barrel file**: `src/components/Events/index.ts` re-exports EventCountdown, EventCountdownSupabase, HurryUpBooking, EventContactFormExample and `hooks/Events/useEventCountdown.ts`. Nothing imports the barrel, so the whole cluster is orphaned together.
- **Duplicated UI primitives**: `Academy/Contact/{input,textarea,toast}.tsx`, `Academy/UI/{avatar,tabs,sonner,buttonfaq}.tsx`, `ui/{toaster,testimonials,icon-badge,PageHeader,CountdownTimer,gradient-tracing}.tsx`. The live components with the same names sit in `src/components/ui/` and `src/components/Academy/UI/` and are imported by path, not by name, so the copies never load.
- **12 empty (0-byte) files**, which are pure noise: `Teacher/ServicePage.tsx`, `Teacher/Services.tsx`, `Contact/Textarea.tsx`, `Corporate/Recruitment/HeroSection.tsx`, `Corporate/Recruitment/TechTeamSection.tsx`, `Corporate/Recruitment/Home/services/servicesData.ts`, `ui/gradient-tracing.tsx`, `pages/Blogs/types.ts`, `pages/Corporate/Training/Services/CoursesPageNew.tsx`, plus the three empty stylesheets in section 3.

## 3. Stylesheet candidates (5 of 5 confirmed unlinked)

| Path | Size | Reason | Reference evidence | Class |
| --- | --- | --- | --- | --- |
| `src/assets/institutions/index.css` | 2 KB | Stylesheet never imported | No `import`, no `@import`, not in index.html, not referenced by vite/tailwind/postcss config. | removable |
| `src/assets/institutions/pageStyles.css` | 226 B | Stylesheet never imported | Only textual hit is its own header comment `/* pageStyles.css */`. | removable |
| `src/assets/scrollbar.css` | 0 B | Empty stylesheet, never imported | Empty file (0 bytes) and no importer. | removable |
| `src/components/Academy/Teacher/Showcase_videos/cube-animations.css` | 0 B | Empty stylesheet, never imported | Empty file (0 bytes) and no importer. | removable |
| `src/components/Academy/Teacher/test.module.css` | 0 B | Empty stylesheet, never imported | Empty file (0 bytes) and no importer. Distinct from the live test1.module.css. | removable |

Checked against: JS/TS `import "*.css"` specifiers, CSS `@import` and `url()`, `index.html` `<link>` tags, `vite.config.ts`, `postcss.config.ts` and `tailwind.config.ts`. The live stylesheet set is `src/index.css`, `src/App.css` (both from `main.tsx`), 6 `*.module.css` files, and 5 plain CSS files imported by components. Note that Tailwind class scanning does not create a dependency on a CSS file, so an unimported stylesheet is genuinely never shipped.

## 4. Assets under `src/` not reached by the bundler (50)

For `src/` assets the import graph is authoritative: an image under `src/` only ships if a module imports it. The "literal refs" column records whether the filename appears anywhere in text, which is what distinguishes a truly orphaned file from one that is only referenced from commented-out code or from a public URL of the same name.

| Path | Size | Reason | Reference evidence | Class |
| --- | --- | --- | --- | --- |
| `src/assets/banner.gif` | 23.1 MB | Referenced only from commented-out imports in a live file | src/components/Contact/Input.tsx lines 185, 312, 347, 487 - all `// import bannerBg ...`. Delete the dead comment blocks in the same change. | removable |
| `src/assets/bannergif.gif` | 11.1 MB | Referenced only from commented-out imports in a live file | src/components/Contact/Input.tsx line 781 (`// import bannerBg ...`). | removable |
| `src/assets/Vishak.jpg` | 5.8 MB | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/KrishanLatha.jpg` | 5.8 MB | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/Subhashini.jpg` | 5.5 MB | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/Labhitha.jpg` | 5.2 MB | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/sandya.jpg` | 4.3 MB | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/Lalitha.jpg` | 4.1 MB | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/Subashini_Mam.jpg` | 1.5 MB | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/Labhita-Ma-39_am.png` | 1.5 MB | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/pdfs/Vels.pdf` | 631 KB | Bundler-invisible duplicate of the public copy that is actually served | Byte-identical to public/institutions/pdfs/Vels.pdf; every consumer uses the URL `/institutions/pdfs/Vels.pdf` (functions/api/send-pdf.ts allowlist, sdp components, seeds). | removable |
| `src/assets/About-us-Banner.png` | 557 KB | Referenced only from a commented-out import | src/pages/About/Hero.tsx keeps the import commented; the page renders a different banner. | removable |
| `src/assets/vishak.png` | 461 KB | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/who.png` | 347 KB | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/The Powerhouse Behind banner.jpg` | 329 KB | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/pdfs/FDP_Handbook.pdf` | 287 KB | Bundler-invisible duplicate of the public copy that is actually served | Byte-identical to public/institutions/pdfs/FDP_Handbook.pdf; consumers use `/institutions/pdfs/FDP_Handbook.pdf`. | removable |
| `src/assets/pdfs/Course_List.pdf` | 206 KB | Bundler-invisible duplicate of the public copy that is actually served | Byte-identical to public/institutions/pdfs/Course_List.pdf; consumers use `/institutions/pdfs/Course_List.pdf`. | removable |
| `src/assets/Rectangle493.png` | 146 KB | Referenced only from commented-out imports in a live file | src/components/Contact/Input.tsx lines 3, 73, 186, 349. Byte-identical to src/assets/version.png (duplicate group 10). | removable |
| `src/assets/version.png` | 146 KB | Referenced only from commented-out imports in a live file | src/components/Contact/Input.tsx. Byte-identical to src/assets/Rectangle493.png (duplicate group 10). | removable |
| `src/assets/Who We Are” part of the About page 2.png` | 138 KB | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/pdfs/Campus Audit.pdf` | 133 KB | Bundler-invisible duplicate of the public copy that is actually served | Byte-identical to public/institutions/pdfs/Campus Audit.pdf; consumers use `/institutions/pdfs/Campus Audit.pdf`. | removable |
| `src/assets/Banner8.png` | 128 KB | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/The Powerhouse Behind banner.png` | 119 KB | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/Banner.png` | 90 KB | Referenced only from a commented-out import | src/pages/About/Hero.tsx (commented). | removable |
| `src/assets/Banner1.png` | 70 KB | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/About-us right.png` | 63 KB | Referenced only from a commented-out import | src/pages/About/Hero.tsx (commented). | removable |
| `src/assets/success_banner_mobile_390x844.png` | 54 KB | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/Tamil-Nadu-Skill-Development-Corporation-Register-under-GST-AAR-Taxscan.jpg` | 33 KB | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/rareminds_bulb.png` | 15 KB | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/tamil.png` | 9 KB | Referenced only from a commented-out import | src/pages/About/Partners.tsx (commented). | removable |
| `src/assets/tripura_1.jpg` | 8 KB | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/Tripura Skill Development Mission 1.png` | 7 KB | Referenced only from a commented-out import | src/pages/About/Partners.tsx (commented). | removable |
| `src/assets/university.png` | 7 KB | Referenced only from a commented-out import | src/pages/About/Partners.tsx (commented). | removable |
| `src/assets/leftCard2.png` | 3 KB | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/Banner15.svg` | 614 B | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/leftCard.svg` | 611 B | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/version3.svg` | 611 B | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/Banner13.svg` | 254 B | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/Banner12.svg` | 252 B | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/Banner10.svg` | 244 B | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/Banner11.svg` | 244 B | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/version1.svg` | 240 B | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/Banner6.svg` | 232 B | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/banner7.svg` | 223 B | Empty file, referenced only from commented-out imports | src/components/Contact/Input.tsx lines 313, 348. | removable |
| `src/assets/leftCard1.svg` | 223 B | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/Banner4.svg` | 222 B | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/banner2.svg` | 199 B | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/Banner5.svg` | 197 B | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/banner3.svg` | 195 B | Never imported | No import resolves to it and its filename appears nowhere in the repo. | removable |
| `src/assets/Banner9.svg` | 194 B | Empty file, referenced only from commented-out imports | src/components/Contact/Input.tsx line 488. | removable |

Two facts worth calling out from that table:

- `src/assets/banner.gif` (23.1 MB) and `src/assets/bannergif.gif` (11.1 MB) are 34 MB of GIFs whose only mentions are commented-out imports inside the **live** `src/components/Contact/Input.tsx` (1857 lines, mostly commented-out earlier versions of the contact page). The file is reachable via `src/pages/Contact/index.tsx`, so the comment blocks should be removed in the same change as the GIFs.
- The seven large portrait JPGs (`Vishak.jpg`, `KrishanLatha.jpg`, `Subhashini.jpg`, `Labhitha.jpg`, `sandya.jpg`, `Lalitha.jpg`, `Subashini_Mam.jpg`) total 33 MB of unoptimised originals with no reference of any kind. They are the single largest recoverable block under `src/`.

## 5. `public/` assets with no literal filename reference (104)

`public/` is copied verbatim into `dist/`, so a missing reference is *not* proof that a URL is dead: event and blog records in Supabase store image paths, and old campaign links point at real files. Default class here is therefore **retain pending evidence**, and the resolving check is a query over the DB columns that hold image URLs plus a look at CDN/analytics logs. Only files whose provenance is unambiguous are marked removable.

| Path | Size | Reason | Reference evidence | Class |
| --- | --- | --- | --- | --- |
| `public/institutions/images/Testimonials/FDP9.jpg` | 4.8 MB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/Govt-Images/Logos/logo3.png` | 3.4 MB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/Govt-Images/Logos/logo5.png` | 3.2 MB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/Govt-Images/Logos/logo6.png` | 3.0 MB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/Govt-Images/Logos/logo4.png` | 2.9 MB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/Govt-Images/Logos/logo8.png` | 2.9 MB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/Govt-Images/Logos/logo1.png` | 2.8 MB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/Govt-Images/Logos/logo7.png` | 2.5 MB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/Govt-Images/Logos/logo9.png` | 2.4 MB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/Govt-Images/Logos/logo10.png` | 2.0 MB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/institutions/vectors/Thumbnail1.jpg` | 1.2 MB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/institutions/vectors/SimulationGame.png` | 1.2 MB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/Govt-Images/Hero.png` | 789 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/courses/3Eprogram/gropofstudentssuccess.svg` | 578 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/testtest.png` | 509 KB | Scratch upload (name is the evidence) | No reference anywhere. | removable |
| `public/academy/Component 7 (3).svg` | 481 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/Projects/naan_Mudhalvan/Naan-Mudalvan-banner2.jpg` | 463 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/herobanner/1mm.png` | 437 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/passport/banner 1.1.jpg` | 427 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/1.both Students and Schools sections under Academia_video_1080.png` | 399 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/institutions/images/Banners/Hero.jpeg` | 365 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/institutions/logos/images/Banners/Hero.jpeg` | 365 KB | Inside a stray nested tree with zero path references | The string `institutions/logos/images` appears **0** times in src/, functions/, index.html and supabase/, while `institutions/images/services` appears 32 times. No basename reference either. | retain pending evidence |
| `public/academy/Projects/naan_Mudhalvan/Chemical-Safety-in-Battery-Management.jpg` | 329 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/institutions/logos/Rareminds Logo.png` | 322 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/SDP-01.svg` | 292 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/passport/Home-page-banner_2.png` | 265 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/Govt-Images/Main_layout.svg` | 231 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/passport/Home-page-banner_4.png` | 231 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/institutions/vectors/BenefitsSection.JPG` | 228 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/institutions/logos/images/Banners/Banner1.jpeg` | 225 KB | Inside a stray nested tree with zero path references | The string `institutions/logos/images` appears **0** times in src/, functions/, index.html and supabase/, while `institutions/images/services` appears 32 times. No basename reference either. | retain pending evidence |
| `public/Govt-Images/Mobile.svg` | 223 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/passport/Home-page-banner-1111.jpg` | 222 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/herobanner/7m.png` | 214 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/herobanner/English Isn’t Just a Subject.  It’s Your Superpower_.png` | 208 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/passport/Home-page-banner_5.png` | 206 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/institutions/logos/images/Banners/Banner4.jpeg` | 200 KB | Inside a stray nested tree with zero path references | The string `institutions/logos/images` appears **0** times in src/, functions/, index.html and supabase/, while `institutions/images/services` appears 32 times. No basename reference either. | retain pending evidence |
| `public/institutions/vectors/Courses.jpg` | 200 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/passport/Home-page-banner_1.png` | 199 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/Govt-Images/banner1.JPG` | 175 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/passport/Home-page-banner_3.png` | 173 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/herobanner/3mm.png` | 173 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/st.jpeg` | 169 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/herobanner/5mm.png` | 162 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/Projects/naan_Mudhalvan/Naan-Mudalvan_banner.jpg` | 154 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/passport/banner-img.png` | 150 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/Group.svg` | 146 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/Govt-Images/banner4.JPG` | 144 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/herobanner/1m.png` | 142 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/herobanner/SArtboard 2.png` | 141 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/institutions/vectors/Thumbnail2.jpg` | 138 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/herobanner/8m.png` | 136 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/Govt-Images/banner2.JPG` | 129 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/herobanner/6m.png` | 122 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/traditionalmethod/Old-01-01-removebg-preview.png` | 121 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/institutions/vectors/Thumbnail3.jpg` | 119 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/Govt-Images/Chemical.svg` | 118 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/herobanner/4mm.png` | 118 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/Govt-Images/ytbanner3.png` | 115 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/herobanner/Turn Your Degree Into a Career_.png` | 115 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/herobanner/Artboard 12.png` | 111 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/herobanner/9m.png` | 109 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/Govt-Images/banner3.JPG` | 108 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/herobanner/Guessing Your Career Is Risky. Planning It Isn’t_.png` | 104 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/Govt-Images/ytbanner2.png` | 103 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/Govt-Images/ytbanner1.png` | 102 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/traditionalmethod/new_Method-01-removebg-preview (1).png` | 88 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/herobanner/10m.png` | 87 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/herobanner/SArtboard 1.png` | 84 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/courseBanner/Don’t Let Career Confusion Derail Student Potential.png` | 79 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/passport/Home-page-banner_mobile_2.png` | 76 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/node.png` | 76 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/passport/Home-page-banner_mobile_1.png` | 69 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/component-.png` | 68 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/passport/Home-page-banner_mobile_4.png` | 58 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/passport/Home-page-banner_mobile_5.png` | 58 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/passport/Benefits for Students.webp` | 45 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/delete2.png` | 45 KB | Scratch upload (name is the evidence) | No reference anywhere. | removable |
| `public/passport/Home-page-banner_mobile_3.png` | 44 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/herobanner/2mm.png` | 44 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/Govt-Images/dashboard4.png` | 40 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/passport/Benefits for Institutions.webp` | 35 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/Govt-Images/Ev.svg` | 27 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/Govt-Images/dashboard3.png` | 26 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/institutions/vectors/Thumbnail4.webp` | 24 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/passport/Arc 1.svg` | 13 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/courses/arrowright.svg` | 12 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/courses/arroweleft.svg` | 12 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/passport/Arc 2.svg` | 12 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/courses/left-course-icon.svg` | 11 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/Logos/schools/299309237_440387461465397_4976478082979932156_n.jpg` | 11 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/courses/right-course-icon.svg` | 11 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/Govt-Images/Chemistry.svg` | 4 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/programdiv.svg` | 2 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/Editable Lesson Plan Templates.svg` | 2 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/facultytrained.svg` | 2 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/vite.svg` | 1 KB | Vite starter-template logo | No reference in index.html, src/, functions/ or public/. Nothing in the Rareminds UI uses it. | removable |
| `public/academy/Faculty Trained1.svg` | 1 KB | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/pth1.svg` | 967 B | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/pth3.svg` | 882 B | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/pth2.svg` | 866 B | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/pth4.svg` | 802 B | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/academy/pth5.svg` | 697 B | No literal filename reference | Basename absent from all 662 scanned text files; could still be reached by a DB-stored URL or an external link. | retain pending evidence |
| `public/Event/speaker-bg.svg` | 470 B | Empty file (0 bytes) | No reference anywhere; an empty SVG cannot be a working background. | removable |
| `public/robots.txt` | 419 B | Well-known crawler file, fetched by URL only | Served at /robots.txt; it also points crawlers at /llms.txt and /.well-known/llms.txt. | retain |

The concentrated wins in that list, if the DB check comes back clean:

| Cluster | Files | Size | Note |
| --- | --- | --- | --- |
| `public/Govt-Images/Logos/logo{1,3,4,5,6,7,8,9,10}.png` | 9 | 25.4 MB | 2-3.5 MB each for logo images; the Govt logo carousel currently reads from other paths. |
| `public/institutions/logos/images/**` | 11 | 15.9 MB | Entire nested tree unreferenced; 5 of the files are byte-identical duplicates of served images. |
| `public/academy/herobanner/**` | 19 | 2.1 MB | Superseded hero variants (`1m`, `1mm`, `7m`, `SArtboard 1/2`, long-sentence filenames). |
| `public/passport/**` | 14 | 1.7 MB | Older Passport banner set; the live ones sit under `public/passport/StepProcess/`. |

## 6. Duplicate content groups (31)

Identical bytes, different paths. Several groups are legitimate: the same placeholder logo is intentionally reused for different schools, and a few files are needed both as a bundled `src/` import and as a public URL. Only groups where one member is provably unreachable are marked removable.

| # | Each | Copies | Reclaimable | Files | Verdict |
| --- | --- | --- | --- | --- | --- |
| 1 | 2.8 MB | 3 | 5.5 MB | `public/default-blog-image.jpg`<br>`public/institutions/images/services/1.png`<br>`public/institutions/logos/images/services/1.png` | Mixed: `default-blog-image.jpg` and `institutions/images/services/1.png` are both live; the `logos/images` copy is the stray. Drop the `logos/images` member only. |
| 2 | 3.0 MB | 2 | 3.0 MB | `public/institutions/images/services/5.png`<br>`public/institutions/logos/images/services/5.png` | Drop the `logos/images` member; `institutions/images/services/5.png` is referenced 9x. |
| 3 | 2.9 MB | 2 | 2.9 MB | `public/institutions/images/services/4.png`<br>`public/institutions/logos/images/services/4.png` | Drop the `logos/images` member; `institutions/images/services/4.png` is referenced 11x. |
| 4 | 2.8 MB | 2 | 2.8 MB | `public/institutions/images/services/2.png`<br>`public/institutions/logos/images/services/2.png` | Drop the `logos/images` member; `institutions/images/services/2.png` is referenced 18x. |
| 5 | 2.8 MB | 2 | 2.8 MB | `public/institutions/images/services/3.png`<br>`public/institutions/logos/images/services/3.png` | Drop the `logos/images` member; `institutions/images/services/3.png` is referenced 13x. |
| 6 | 631 KB | 2 | 631 KB | `public/institutions/pdfs/Vels.pdf`<br>`src/assets/pdfs/Vels.pdf` | Drop the `src/assets` member; the served URL is `/institutions/pdfs/Vels.pdf` (allowlisted in functions/api/send-pdf.ts). |
| 7 | 365 KB | 2 | 365 KB | `public/institutions/images/Banners/Hero.jpeg`<br>`public/institutions/logos/images/Banners/Hero.jpeg` | Neither path is referenced. Resolve with the DB check, then drop the `logos/images` member at minimum. |
| 8 | 287 KB | 2 | 287 KB | `public/institutions/pdfs/FDP_Handbook.pdf`<br>`src/assets/pdfs/FDP_Handbook.pdf` | Drop the `src/assets` member; served URL is `/institutions/pdfs/FDP_Handbook.pdf`. |
| 9 | 206 KB | 2 | 206 KB | `public/institutions/pdfs/Course_List.pdf`<br>`src/assets/pdfs/Course_List.pdf` | Drop the `src/assets` member; served URL is `/institutions/pdfs/Course_List.pdf`. |
| 10 | 146 KB | 2 | 146 KB | `src/assets/Rectangle493.png`<br>`src/assets/version.png` | Both members are referenced only from commented-out imports in Contact/Input.tsx. Drop both. |
| 11 | 133 KB | 2 | 133 KB | `public/institutions/pdfs/Campus Audit.pdf`<br>`src/assets/pdfs/Campus Audit.pdf` | Drop the `src/assets` member; served URL is `/institutions/pdfs/Campus Audit.pdf`. |
| 12 | 104 KB | 2 | 104 KB | `public/academy/herobanner/Guessing Your Career Is Risky. Planning It Isn’t_.png`<br>`public/academy/herobanner/GuessingYourCareerIsRisky.PlanningItIsn’t.png` | Drop the smart-quote/spaced variant; `GuessingYourCareerIsRisky.PlanningItIsn’t.png` is the one referenced by servicesStudent.ts. |
| 13 | 12 KB | 7 | 70 KB | `public/academy/Logos/schools/GOVERNMENT HIGHER SECONDARY SCHOOL, KASIPALAYAM.png`<br>`public/academy/Logos/schools/GOVT HS S K VELUR.png`<br>`public/academy/Logos/schools/GOVT. HS, AGARAM.png`<br>`public/academy/Logos/schools/GOVT.HSS, KANNIVADI.png`<br>`public/academy/Logos/schools/GOVTHSS VIRUVEEDU.png`<br>`public/academy/Logos/schools/GVHSS CHALAKUDY.png`<br>`public/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png` | Intentional: one placeholder logo reused for 7 schools, all 7 paths referenced by Logos.tsx. **Retain.** Optional follow-up: point all 7 entries at a single file. |
| 14 | 45 KB | 2 | 45 KB | `public/passport/Benefits for Students.webp`<br>`public/passport/StepProcess/Benefits-Students.webp` | Drop `public/passport/Benefits for Students.webp`; the referenced path is `passport/StepProcess/Benefits-Students.webp`. |
| 15 | 35 KB | 2 | 35 KB | `public/passport/Benefits for Institutions.webp`<br>`public/passport/StepProcess/Benefits-Institutions.webp` | Drop `public/passport/Benefits for Institutions.webp`; the referenced path is `passport/StepProcess/Benefits-Institutions.webp`. |
| 16 | 31 KB | 2 | 31 KB | `public/academy/Logos/schools/GBHSS PETNANAICKENPALAYAM.png`<br>`public/academy/Logos/schools/Government Boys Higher Secondary School, Thammampatt.png` | Both paths referenced by Logos.tsx. **Retain.** |
| 17 | 23 KB | 2 | 23 KB | `public/academy/RareMinds ISO Logo-01.png`<br>`public/academy/traditionalmethod/RareMinds ISO Logo-01.png` | Both paths referenced (6 consumers each). **Retain**, or consolidate on one path in a follow-up. |
| 18 | 22 KB | 2 | 22 KB | `public/Corporate/Images/Training/hero/hero.webp`<br>`public/Corporate/Images/Training/hero/roi.webp` | Both referenced (`roi.webp` by the Training home page, `hero.webp` by a seed). **Retain.** |
| 19 | 7 KB | 2 | 7 KB | `public/Corporate/Images/Recruitment/process/process_3.webp`<br>`public/Corporate/Images/Recruitment/processMobile/processMobile_4.webp` | Both referenced by the process/processMobile SVG components. **Retain.** |
| 20 | 5 KB | 2 | 5 KB | `public/Corporate/Images/Recruitment/process/process_12.webp`<br>`public/Corporate/Images/Recruitment/processMobile/processMobile_1.webp` | Both referenced by the process/processMobile SVG components. **Retain.** |
| 21 | 5 KB | 2 | 5 KB | `public/RMLogo.webp`<br>`src/assets/RMLogo.webp` | Both live: `index.html` uses `/RMLogo.webp`, EventCard.tsx and EventsPage.tsx import `src/assets/RMLogo.webp` as a fallback. **Retain both.** |
| 22 | 4 KB | 2 | 4 KB | `public/Corporate/Images/Recruitment/process/process_5.webp`<br>`public/Corporate/Images/Recruitment/processMobile/processMobile_2.webp` | Both referenced by the process/processMobile SVG components. **Retain.** |
| 23 | 4 KB | 2 | 4 KB | `public/Corporate/Images/Recruitment/process/process_4.webp`<br>`public/Corporate/Images/Recruitment/processMobile/processMobile_5.webp` | Both referenced by the process/processMobile SVG components. **Retain.** |
| 24 | 4 KB | 2 | 4 KB | `public/Corporate/Images/Recruitment/process/process_14.webp`<br>`public/Corporate/Images/Recruitment/processMobile/processMobile_0.webp` | Both referenced by the process/processMobile SVG components. **Retain.** |
| 25 | 3 KB | 2 | 3 KB | `public/Corporate/Images/Recruitment/process/process_2.webp`<br>`public/Corporate/Images/Recruitment/processMobile/processMobile_3.webp` | Both referenced by the process/processMobile SVG components. **Retain.** |
| 26 | 3 KB | 2 | 3 KB | `public/.well-known/llms.txt`<br>`public/llms.txt` | Intentional dual publication of `llms.txt` (root + `.well-known`), both advertised in robots.txt. **Retain.** |
| 27 | 3 KB | 2 | 3 KB | `public/Corporate/Images/Recruitment/process/process_1.webp`<br>`public/Corporate/Images/Recruitment/processMobile/processMobile_6.webp` | Both referenced by the process/processMobile SVG components. **Retain.** |
| 28 | 836 B | 2 | 836 B | `public/institutions/vectors/arrowDown.svg`<br>`src/assets/corporate/Home/Carousal/arrowDown.svg` | Both live: the SVG is imported from `src/assets` by two carousels and fetched as `/institutions/vectors/arrowDown.svg` elsewhere. **Retain both.** |
| 29 | 611 B | 2 | 611 B | `src/assets/leftCard.svg`<br>`src/assets/version3.svg` | Both unreferenced empty-ish SVGs under `src/assets`. Drop both. |
| 30 | 244 B | 2 | 244 B | `src/assets/Banner10.svg`<br>`src/assets/Banner11.svg` | Both are 0-byte unreferenced SVGs. Drop both. |
| 31 | 223 B | 2 | 223 B | `src/assets/banner7.svg`<br>`src/assets/leftCard1.svg` | Both 0-byte; one is referenced only from a commented-out import. Drop both. |

## 7. Generated output, caches, and historical material

| Path | Size | What it is | Class |
| --- | --- | --- | --- |
| `dist/` | 240 MB | Vite build output, reproduced by `npm run build` in ~14 s. Git-ignored (`/dist`). Large because `public/` (226 MB) is copied verbatim, so it shrinks with section 5, not on its own. | generated |
| `node_modules/` | 872 MB | Reproduced by `npm ci` from `package-lock.json`. Git-ignored. | generated |
| `.wrangler/state/` | 5.1 MB | Local `wrangler pages dev` state (KV/D1/R2/cache/ratelimit emulation). Recreated on next dev run. Git-ignored. | generated |
| `.wrangler/tmp/` | 1.4 MB | Stale bundle/dev scratch directories from previous wrangler runs (`bundle-*`, `dev-*`). Git-ignored. | generated |
| `supabase/.temp/` | 8.5 KB | Supabase CLI scratch state (project ref, versions, pooler URL). Git-ignored. | generated |
| `.wrangler/retired-email-debug/` (7 files) | 36 KB | Ad-hoc Node scripts used while debugging the old Supabase email/OTP functions. Point at endpoints that no longer exist. Untracked and already parked in an ignored directory. | historical |
| `.wrangler/retired-supabase-email-functions/` (17 files) | 44 KB | The retired Deno email functions (`send-otp-email`, `verify-otp`, `send-contact-email`, `send-*-email`, `_shared/email-worker.ts`) plus their deno.json files. Superseded by `functions/api/email/[action].ts` + the `EMAIL_SERVICE` binding. | historical |
| `.wrangler/deploy.yml.removed` | 1.7 KB | Retired EC2 deploy workflow. | historical |
| `supabase-old/` | 13 KB | Untracked, git-ignored, and contains nothing but `.temp/` CLI state - no migrations, no functions, no seeds. The only directory in this section that is both historical *and* empty of actual history. | historical (safe to drop) |
| `semantic-review/` (6 `.md`) | 48 KB | Dated semantic review reports for the BFF migration (2026-09-09 / 2026-09-10). Tracked in git, so the history survives deletion; keep if the team treats them as decision records. | historical |
| `supabase/seed_remote.sql` | 12 MB | Remote dump not referenced by `config.toml` (`sql_paths = ["./seed/*.sql"]`). Tracked. | historical |

The distinction that matters: everything marked *generated* can be deleted with no decision to make, because a documented command rebuilds it. Everything marked *historical* is a judgement call about what the team wants to keep, and three of those directories (`.wrangler/retired-*`, `supabase-old/`) are untracked, so deleting them destroys the only copy.

## 8. Preserve list (explicitly out of scope)

| Path / concern | Why it stays |
| --- | --- |
| `functions/**` (8 files) | The live BFF: `api/email/[action].ts`, `api/payments/[action].ts`, `api/register.ts`, `api/event-registrations.ts`, `api/send-contact-email.ts`, `api/send-pdf.ts`, `constants/fieldMappings.ts`, `utils/logger.ts`. Compiles clean. |
| `wrangler.toml` bindings | `PAYMENT_WORKER` and `EMAIL_SERVICE` service bindings and the three named rate limiters (`EMAIL_RATE_LIMITER`, `EMAIL_OTP_RATE_LIMITER`, `PAYMENT_RATE_LIMITER`) are all referenced by the functions above. No public API surface changes anywhere in this audit. |
| `compatibility_flags = ["nodejs_compat"]` | Not removed. Running on Cloudflare is not a reason to drop it; the flag is what lets the Functions runtime use Node built-ins, and dropping it is a behavioural change unrelated to cleanup. |
| `supabase/migrations/**` (6 files, 200 KB) | Applied schema history, including `20260909150000_move_email_to_pages_bff.sql`. |
| `supabase/seed/*.sql` (5 files, 13 MB) | Configured seeds: `config.toml:183` `sql_paths = ["./seed/*.sql"]`. |
| `supabase/config.toml` | Local Supabase configuration. |
| npm / Vite / Wrangler / TypeScript tooling | `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.ts`, `eslint.config.js`, `index.html`, `.gitignore`, `.gitattributes`, `.env.example`, `.dev.vars.example`. |
| `test-connection.js` | Configured diagnostic (`npm run test:connection`), not a Node server. Explicitly retained. |
| `src/components/Academy/Teacher/test1.tsx`, `test2.tsx`, `test1.module.css` | Live: imported by `Academy/Teacher/oldandnewmethod.tsx` as `Text1`/`Text2`. |
| `src/utils/testConnection.ts` | Reached from the app graph. (The unreachable one is `src/utils/testSupabase.ts` - different file.) |
| `src/App.css` | Imported by `src/main.tsx:9`. Only `src/App.tsx` is unreachable, not its stylesheet. |
| `src/css.d.ts`, `src/types/user-type.tsx`, `src/types/LandingPage/desc-card.tsx` | Consumed without an import (ambient module declaration and two global type declarations). See section 2. |
| `public/robots.txt`, `public/llms.txt`, `public/.well-known/llms.txt` | Fetched by URL only; robots.txt advertises both llms.txt paths. |
| `docs/**` | Current operational docs (Razorpay setup, payment troubleshooting) with a working index. |

## 9. Latent issues found while auditing (not cleanup, but adjacent)

These are broken references that survive only because `tsc` is not in the build path and esbuild silently drops imports whose bindings are unused. They matter for cleanup because each one looks like evidence of a live consumer until you resolve it.

| Location | Problem |
| --- | --- |
| `src/components/universities/Blogs/BlogDetail.tsx:5-6` | Imports `../UI/input` and `../UI/textarea`. `src/components/universities/UI/` does not exist. The build survives because every `<Input>`/`<Textarea>` usage in that file is inside commented-out JSX, so esbuild elides the imports. Uncommenting the comment form breaks `npm run build`. |
| `src/components/{Academy,Govt,universities}/Blogs/blogData.ts:1` | `import { BlogPost, BlogCategory } from "@/types/blog"`. On a case-sensitive filesystem that path does not resolve (`src/types/Blog.ts`), and `Blog.ts` does not export those names anyway - they live in the per-area `blog.ts` files. Elided at build time, an error under `tsc`. |
| `src/components/Academy/Project/**` (4 files) | `import type { Project } from '../types/index'` / `'../types/'` / `'../types'`. There is no `index.ts` in `Academy/Project/types/`; the interface is in `project.ts`. Type-only, so the bundle is unaffected. |
| `npx tsc --noEmit` | 577 pre-existing errors and no `typecheck` npm script. Worth adding a script and a baseline before deleting files, so that cleanup regressions are distinguishable from the existing backlog. |

## 10. Verification suite for any subsequent cleanup

Run these against the pre-cleanup baselines recorded above, one commit per class of removal (generated -> root oddments -> unreachable source -> stylesheets -> src assets -> duplicate public assets), so any regression bisects cleanly.

| Step | Command | Pass condition |
| --- | --- | --- |
| Frontend build | `npm run build` | Exit 0. Compare the emitted asset list against the 175-file baseline; every disappearing chunk must map to a file you intended to delete. |
| Functions compile | `npx wrangler pages functions build --outdir=/tmp/fnbuild` | "Compiled Worker successfully". |
| Lint comparison | `npm run lint` | 0 errors, and warning count <= 390. A rise means a deletion left a dangling reference. |
| Typecheck delta | `npx tsc --noEmit` | Error count <= 577 (informational, not a gate until the backlog is addressed). |
| Route smoke | `npm run dev:full`, then walk the route table in `src/routes.tsx` | No 404 chunk loads, no missing-image placeholders, especially Academia/Teacher, Universities SDP/FDP, Corporate Training, Government, Blogs, Events, Passport. |
| Form + BFF smoke | Submit contact, event registration (incl. OTP), recruitment, training enquiry, PDF download, and a payment order | Each `functions/api/*` route returns its normal response; `send-pdf` still resolves its allowlisted `/institutions/pdfs/*` paths. |
| Asset spot check | Load pages that use the duplicate groups you touched | The retained copy of each group still renders. |

One ordering constraint: consolidate `dev.vars.example` into `.dev.vars.example` **before** deleting it, otherwise the only documentation of `ZOHO_FLOW_WEBHOOK_URL` disappears while `functions/api/register.ts` still reads it. And resolve the `public/` DB-URL question before deleting anything from section 5 - that check, not the static scan, is what makes those 45 MB safe to remove.
