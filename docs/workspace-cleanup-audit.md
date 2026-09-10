# Workspace cleanup audit — Cloudflare Pages BFF

Audited at 2026-09-10T11:21:11.889Z; repository commit `0e4c6582d482d5d3f8b9c50d474eeb547d04aae4`.

Original audit phase: no application, configuration, dependency or historical files were removed or modified during that phase. See Completed cleanup below for the subsequent authorized changes. The frontend build regenerated ignored `dist/` output; local compilation wrote temporary output. The pre-existing untracked `docs/cleanup-audit.md` was preserved. This report and its [JSON inventory](workspace-cleanup-audit.json) are the new deliverables.

## Completed cleanup

The inventory below is the **pre-cleanup audit snapshot**: its counts, sizes and reference evidence describe the files before removal. The JSON inventory now includes `cleanupStatus` for each row and a `cleanupExecution` record.

Removed **15 confirmed obsolete files**: the two Node server notices, retired Supabase payment stubs/configs, two retired email `.npmrc` files, obsolete `eslint.config.ts`, `test.txt`, `public/vite.svg`, three `_legacy_backup` components, and `dev.vars.example` after consolidation. The optional Zoho webhook placeholder is now commented and documented in `.dev.vars.example` so local forwarding stays disabled until configured. Replaced the template README with project setup instructions.

Uncertain source files, all five stylesheet candidates, other asset candidates, historical files, dependencies, migrations and active Cloudflare configuration remain in place. `public/vite.svg` was the specifically verified template exception to the general asset hold.

| Validation | Result |
| --- | --- |
| Frontend build | Passed (16.48 seconds), existing chunk-size warning |
| Built output comparison | All 621 retained files byte-identical; only `vite.svg` removed |
| Pages Functions compilation | Passed; no deployment |
| Lint comparison | 385 warnings, zero errors; five old warnings removed, no new warnings |
| `git diff --check` | Passed |
| Runtime form/payment/email smoke tests | Not run; frontend output identical and active Functions source/config unchanged; no business-flow requests made |

## False-positive review

The original “removable” classification was too strong for **50 source files**. They are unreachable through browser imports but are inputs to Tailwind’s `./src/**/*.{js,ts,jsx,tsx}` content scan. Those rows are now **retain pending evidence**.

- **Confirmed build-time dependence:** excluding all 138 source candidates from Tailwind’s content input removes **177 CSS selectors**. Compiling each suspected contributor separately confirmed 50 files supplying selectors in that set. This was an in-memory Tailwind comparison, not a deletion or a full Vite/visual regression test. It does not prove those components render or that every removed selector is needed.
- **Type-reference ambiguity:** retain `src/types/Blog.ts`. Several blog modules import `@/types/blog` with different casing. Exact-case import analysis cannot safely establish that this file is unused.
- **Already excluded false positives:** preserve `src/assets/LandingPage/css/landing.css`, `src/assets/corporate/Home/Carousal/carousel.css`, `Teacher/test1.tsx`, `Teacher/test2.tsx`, `utils/testConnection.ts`, and `App.css`; they have active imports.
- **Assets remain uncertain:** all 141 filename candidates and 31 duplicate groups remain retained. Additional AST checks of decoded string literals and path-like templates found no new matches; dynamic database URLs and external consumers were not ruled out.
- **Clear leftovers remain candidates:** no new references were found to empty Node server notices, retired function residue, legacy backup components or the obsolete ESLint config. Installed ESLint’s discovery list confirms that `eslint.config.ts` is not selected by `eslint .`.

The 138-source count remains an import-graph count, not a deletion count. There are now **51 retained source candidates** (50 CSS contributors plus the ambiguous Blog type) and **87 conditional removal candidates**. The JSON inventory records all 177 selectors and each confirmed contributing file. No application files were modified or deleted.

## Findings and confidence

| Category | Count |
| --- | ---: |
| Source modules scanned (declaration files excluded) | 595 |
| Source modules unreachable from the browser entry | 138 |
| Unlinked stylesheet candidates | 5 |
| Tracked assets scanned | 540 |
| Assets with no literal filename reference | 141 |
| Identical-content groups | 31 |

Counts overlap: a file may appear in source, backend, asset or duplicate sections. These are candidate counts, not a count of proven-safe deletions. The fresh scan reproduces the plan’s 138 / 5 / 141 / 31 counts. It does not adopt the differing counts or unverified typecheck claims in the pre-existing report.

| Classification | Meaning |
| --- | --- |
| removable | Static evidence supports removal; perform the listed verification before any later cleanup. This audit does not delete it. |
| consolidate first | Still contains useful information; move or replace that information before removal. |
| generated | Reproducible output or dependencies; useful locally and not inherently unwanted. |
| retain pending evidence | Historical value, runtime URLs, ambiguous imports or another unresolved consumer prevent a removal recommendation. |

## Method and limits

- Parsed imports, re-exports and literal dynamic imports with the installed TypeScript AST parser and resolver. Followed the `@/` alias, extensionless paths and index modules. Comments do not count as imports.
- Started browser reachability at `src/main.tsx`, the sole local module entry in `index.html`. Also checked imports from every Functions module and root JS/TS tooling file before classifying candidates.
- Checked CSS imports and URLs with alias-aware resolution. CSS fragment URLs such as `url(#govt)` are not filesystem dependencies. No `import.meta.glob`, nonliteral dynamic imports or asset-loading `new URL(..., import.meta.url)` patterns were found.
- Searched literal asset basenames in 754 tracked text files, including checked-in SQL. Filename references can occur in comments or unrelated same-named files; absence can miss encoded names, constructed URLs or live database content.
- Hashed the 540 asset files using SHA-256. Public URLs can remain necessary even when their files have identical bytes. Duplicate tables show every matching filename-reference file; these references are evidence, not necessarily active consumers.
- Sizes are file bytes (logical size), not filesystem allocation. Generated directories are summarized; historical files are listed individually.
- Did not inspect live database rows, production traffic or external links. Retain uncertain public assets. Ambient `.d.ts` files are excluded from the unreachable-source count and should be preserved.
- Tailwind scans source text: removing unreachable TSX can alter generated CSS. A build alone is not a substitute for visual smoke checks.

## Baseline verification

| Check | Result |
| --- | --- |
| `npm run build` | Passed (exit 0), 14.44 seconds. Existing chunk-size warning; generated dist refreshed. |
| `npm run lint` | Passed (exit 0), 390 warnings, 0 errors. |
| `./node_modules/.bin/wrangler pages functions build functions --outdir /tmp/rm-cleanup-functions --compatibility-date 2026-05-25 --compatibility-flags nodejs_compat` | Passed (exit 0): Compiled Worker successfully. Initial sandbox log-write error resolved by rerunning outside sandbox. |
| `Route, form, payment and email smoke tests` | Not run: this is a documentation-only audit and no business-flow requests were made. |
| `TypeScript typecheck` | Not run in this audit; no result adopted from the pre-existing report. |

## Backend and tooling (11 entries)

| Path | Bytes | Classification | Reason | Reference evidence |
| --- | ---: | --- | --- | --- |
| `server.js` | 91 | removable | Comment-only retired Node server | No active import or npm/config entry references this file. |
| `src/backend/server.js` | 90 | removable | Comment-only retired Node server | No active import or npm/config entry references this file. |
| `supabase/functions/create-payment-order/index.ts` | 90 | removable | Retired function residue | Payment implementation is in functions/api/payments/[action].ts; payment docs prohibit deploying the retired Supabase handlers; email handlers were retired. |
| `supabase/functions/create-payment-order/deno.json` | 3 | removable | Retired function residue | Payment implementation is in functions/api/payments/[action].ts; payment docs prohibit deploying the retired Supabase handlers; email handlers were retired. |
| `supabase/functions/verify-payment/index.ts` | 95 | removable | Retired function residue | Payment implementation is in functions/api/payments/[action].ts; payment docs prohibit deploying the retired Supabase handlers; email handlers were retired. |
| `supabase/functions/verify-payment/deno.json` | 3 | removable | Retired function residue | Payment implementation is in functions/api/payments/[action].ts; payment docs prohibit deploying the retired Supabase handlers; email handlers were retired. |
| `supabase/functions/send-contact-email/.npmrc` | 221 | removable | Retired function residue | File contains only private-registry guidance comments; no registry settings or executable handler remains in this retired email-function folder. |
| `supabase/functions/send-recruitment-email/.npmrc` | 221 | removable | Retired function residue | File contains only private-registry guidance comments; no registry settings or executable handler remains in this retired email-function folder. |
| `eslint.config.ts` | 844 | removable | Obsolete parallel ESLint configuration | package.json runs eslint .; installed node_modules/eslint/lib/eslint/flat-eslint.js:94 lists only eslint.config.js, eslint.config.mjs and eslint.config.cjs for discovery. The active eslint.config.js exists. |
| `test.txt` | 14 | removable | Scratch text file | No active import or npm/config entry references this file. |
| `public/vite.svg` | 1497 | removable | Unused Vite template logo | No active import or npm/config entry references this file. |

## Documentation and configuration (2 entries)

| Path | Bytes | Classification | Reason | Reference evidence |
| --- | ---: | --- | --- | --- |
| `dev.vars.example` | 938 | consolidate first | Contains the still-used ZOHO_FLOW_WEBHOOK_URL setting | functions/api/register.ts reads ZOHO_FLOW_WEBHOOK_URL. Merge its placeholder into .dev.vars.example and correct copy instructions before removing this file. |
| `README.md` | 856 | consolidate first | Generic React/Vite starter documentation | Replace with project setup, Vite + Pages development, service bindings and links to payment docs; preserve the README filename. |

## Unreachable source (138 entries)

| Path | Bytes | Classification | Reason | Reference evidence |
| --- | ---: | --- | --- | --- |
| `src/App.tsx` | 1162 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/BlogDetailLazy.tsx` | 195 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/assets/corporate/Home/_legacy_backup/industries.tsx` | 1867594 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/assets/corporate/Home/_legacy_backup/process.tsx` | 534978 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/assets/corporate/Home/_legacy_backup/processMobile.tsx` | 451294 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/backend/server.js` | 90 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/Academy.tsx` | 22609 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/Blogs/FloatingShareBar.tsx` | 1349 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/Blogs/blog.ts` | 424 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/Contact/input.tsx` | 805 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/Contact/textarea.tsx` | 786 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/Contact/toast.tsx` | 4896 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/FAQChatbot.tsx` | 10029 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | src/components/Academy/Floatingbutton.tsx:4 (unreachable importer) Tailwind compilation of this file alone reproduces 8 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Academy/Floatingbutton.tsx` | 6388 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/Project/naanMudhalvan/AchievementsSection.tsx` | 3272 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/Project/naanMudhalvan/RoleSection.tsx` | 2749 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/StickyButton/StickyButton/FAQChatbot.tsx` | 7312 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 1 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Academy/Students/CaseStudy/CaseStudy.tsx` | 13706 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 3 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Academy/Students/CaseStudy/CaseStudyCard.tsx` | 3360 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 2 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Academy/Students/CaseStudy/CaseStudyDetail.tsx` | 13275 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 10 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Academy/Students/FAQ.tsx` | 3298 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/Students/Logos copy.tsx` | 5563 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/Teacher/BonusSection.tsx` | 4689 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 1 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Academy/Teacher/CTASection.tsx` | 1358 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 2 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Academy/Teacher/CareerCounsellingBlueprint.tsx` | 18732 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | src/components/Academy/Teacher/programs.tsx:4 (unreachable importer) Tailwind compilation of this file alone reproduces 5 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Academy/Teacher/ContactSection.tsx` | 1644 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/Teacher/CourseCards.tsx` | 15918 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 4 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Academy/Teacher/DayCard.tsx` | 4180 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/Teacher/DownloadForm.tsx` | 2674 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 1 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Academy/Teacher/FAB/ActionButton.tsx` | 1160 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | src/components/Academy/Teacher/FAB/FloatingActionButton.tsx:4 (unreachable importer) |
| `src/components/Academy/Teacher/FAB/FloatingActionButton.tsx` | 3472 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/Teacher/FDPButton.tsx` | 1789 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/Teacher/FaqAndContact.tsx` | 4616 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/Teacher/Herobanner/DownloadForm.tsx` | 4421 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/Teacher/Herobanner/EnquiryForm.tsx` | 4565 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/Teacher/Herobanner/HeroBanner.tsx` | 4563 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 2 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Academy/Teacher/Herobanner/Schedule.tsx` | 1509 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/Teacher/Herobanner/ServiceCarousel.tsx` | 4082 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 1 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Academy/Teacher/Herobanner/Services.tsx` | 7769 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 5 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Academy/Teacher/NEPChecklist.tsx` | 9931 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | src/components/Academy/Teacher/programs.tsx:5 (unreachable importer) |
| `src/components/Academy/Teacher/Service.tsx` | 20623 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 2 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Academy/Teacher/ServicePage.tsx` | 0 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/Teacher/Services.tsx` | 0 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/Teacher/Showcase_videos/RotatingCube.tsx` | 13843 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | src/components/Academy/Teacher/Showcase_videos/viedo_Cube.tsx:2 (unreachable importer) Tailwind compilation of this file alone reproduces 3 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Academy/Teacher/Showcase_videos/viedo_Cube.tsx` | 3813 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 4 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Academy/Teacher/TestimonialsCarousel.tsx` | 14035 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 1 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Academy/Teacher/Testimonialsdemo.tsx` | 5352 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/Teacher/VideoCarousel.tsx` | 14290 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/Teacher/programs.tsx` | 17121 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 1 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Academy/Teacher/testimonials/StarRating.tsx` | 518 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | src/components/Academy/Teacher/testimonials/TestimonialCard.tsx:2 (unreachable importer) |
| `src/components/Academy/Teacher/testimonials/TestimonialCard.tsx` | 2061 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | src/components/Academy/Teacher/testimonials/testimonials.tsx:2 (unreachable importer) |
| `src/components/Academy/Teacher/testimonials/testimonials.tsx` | 8407 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/UI/avatar.tsx` | 1404 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/UI/buttonfaq.tsx` | 1901 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Academy/UI/faqData.ts` | 2974 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | src/components/Academy/FAQChatbot.tsx:9 (unreachable importer); src/components/Academy/StickyButton/StickyButton/FAQChatbot.tsx:5 (unreachable importer); src/components/Contact/StickyButton/StickyButton/FAQChatbot.tsx:5 (unreachable importer) |
| `src/components/Academy/UI/sonner.tsx` | 894 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 1 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Academy/UI/tabs.tsx` | 1896 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | src/components/Academy/Students/CaseStudy/CaseStudy.tsx:7 (unreachable importer); src/components/Academy/Students/CaseStudy/CaseStudyDetail.tsx:4 (unreachable importer) Tailwind compilation of this file alone reproduces 1 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Academy/UI/testimonial.ts` | 157 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | src/components/Academy/Teacher/TestimonialsCarousel.tsx:148 (unreachable importer) |
| `src/components/Contact/StickyButton/StickyButton/FAQChatbot.tsx` | 7312 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 1 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Contact/Textarea.tsx` | 0 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Corporate/CookieConsent.tsx` | 6171 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 11 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Corporate/Recruitment/HeroSection.tsx` | 0 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Corporate/Recruitment/Home/Contact/ContactForm.tsx` | 4637 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 1 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Corporate/Recruitment/Home/Contact/FormField.tsx` | 1594 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | src/components/Corporate/Recruitment/Home/Contact/ContactForm.tsx:8 (unreachable importer) Tailwind compilation of this file alone reproduces 1 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Corporate/Recruitment/Home/services/servicesData.ts` | 0 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Corporate/Recruitment/TechTeamSection.tsx` | 0 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Corporate/Training/CaseStudies.tsx` | 4044 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 4 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Corporate/Training/Contact/toast.tsx` | 4896 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Corporate/Training/serviceData.ts` | 2946 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Events/EventContactFormExample.tsx` | 7520 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | src/components/Events/index.ts:23 (unreachable importer) |
| `src/components/Events/EventCountdown.tsx` | 7124 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | src/components/Events/index.ts:14 (unreachable importer) Tailwind compilation of this file alone reproduces 7 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Events/EventCountdownSupabase.tsx` | 10008 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | src/components/Events/index.ts:16 (unreachable importer) Tailwind compilation of this file alone reproduces 10 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Events/HurryUpBooking.tsx` | 8702 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | src/components/Events/index.ts:15 (unreachable importer) Tailwind compilation of this file alone reproduces 10 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Events/StickyButton/FAQChatbot.tsx` | 8515 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 1 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Events/TestEventContactForm.tsx` | 3401 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Events/index.ts` | 1555 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/GATracker.tsx` | 238 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Govt/Blogs/FloatingShareBar.tsx` | 1349 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Govt/Blogs/blog.ts` | 424 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Govt/CTAButton.tsx` | 784 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 2 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Menu/Index.tsx` | 330 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/Projects/ProjectDetail.tsx` | 29446 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 5 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Projects/ProjectDetailClean.tsx` | 16856 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 1 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Projects/ProjectDetailDesigned.tsx` | 28402 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 7 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/debug/RegistrationDebug.tsx` | 2586 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/ui/CountdownTimer.tsx` | 4464 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 2 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/ui/PageHeader.tsx` | 802 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | src/pages/Academia/Student/CareerToolkit.tsx:8 (unreachable importer) Tailwind compilation of this file alone reproduces 4 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/ui/RegistrationStatusBanner.tsx` | 4979 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/ui/gradient-tracing.tsx` | 0 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/ui/icon-badge.tsx` | 682 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 1 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/ui/testimonials.tsx` | 1766 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/ui/toaster.tsx` | 771 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/universities/Blogs/FloatingShareButton.tsx` | 1397 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/universities/Blogs/blog.ts` | 32389 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/universities/fdp/CalendarSection.tsx` | 5268 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 1 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/universities/fdp/ProgramLearnMore.tsx` | 661 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 1 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/universities/fdp/StickyButtons.tsx` | 11056 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/universities/fdp/data/programsData.tsx` | 2319 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | src/components/universities/fdp/ProgramLearnMore.tsx:1 (unreachable importer) |
| `src/components/universities/sdp/CourseCard/CourseCard.tsx` | 3452 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 3 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/universities/sdp/FAQ.tsx` | 6563 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 4 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/universities/sdp/FinalCTA.tsx` | 9552 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 4 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/universities/sdp/GradeSelector/GradeSelector.tsx` | 2443 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 2 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/universities/sdp/InstitutionalEnquiry.tsx` | 6480 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/universities/sdp/Pagination/index.ts` | 40 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/universities/sdp/StickyButtons.tsx` | 1486 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/universities/sdp/Testimonials.tsx` | 1934 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/universities/sdp/modals/CourseEnrollmentModal.tsx` | 6166 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/universities/sdp/shared/ErrorBoundary.tsx` | 1985 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/components/universities/sdp/shared/LazyImage.tsx` | 1377 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | src/components/universities/sdp/shared/index.ts:2 (unreachable importer) |
| `src/components/universities/sdp/shared/LoadingSkeleton.tsx` | 2889 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 2 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/universities/sdp/shared/index.ts` | 114 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/constants/faqData.ts` | 10244 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/data/coursesData.ts` | 28733 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/data/recruitment_serviceData.ts` | 54423 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/features/corporateTrainingServicesSlice.ts` | 2491 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | src/pages/Corporate/Training/Services/Index.tsx:4 (unreachable importer) |
| `src/hooks/Events/useEventCountdown.ts` | 5599 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | src/components/Events/EventCountdownSupabase.tsx:2 (unreachable importer); src/components/Events/index.ts:35 (unreachable importer); src/components/Events/index.ts:36 (unreachable importer) |
| `src/hooks/use-debounce.ts` | 408 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/hooks/useTestimonials.ts` | 157 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/pages/Academia/Student/CareerToolkit.tsx` | 11270 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 18 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/pages/Academia/Student/ThreeEProgram.tsx` | 6856 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 6 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/pages/Blogs/types.ts` | 0 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/pages/ComingSoon.tsx` | 3273 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 2 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/pages/Corporate/CorporateLanding.tsx` | 4665 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 2 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/pages/Corporate/Training/Services/CoursesPageNew.tsx` | 0 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/pages/Corporate/Training/Services/Index.tsx` | 16234 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 13 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/pages/Corporate/Training/Services/[slug].tsx` | 28549 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 23 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/pages/Corporate/Training/Services/serviceData.ts` | 293423 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | src/features/corporateTrainingServicesSlice.ts:2 (unreachable importer); src/pages/Corporate/Training/Services/[slug].tsx:5 (unreachable importer) Tailwind compilation of this file alone reproduces 5 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/pages/Universities/Passport/components/problemSection.tsx` | 3455 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/pages/Universities/ServicesPage.tsx` | 507 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/pages/Universities/sdp/SDPLandingPage.tsx` | 2110 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/types/Blog.ts` | 287 | retain pending evidence | Not reached by exact-case resolution, but differently cased imports may intend this module | @/types/blog occurs in Academy/Govt/universities blog modules; actual filename is src/types/Blog.ts. Resolve import casing before deciding whether this file is unused. |
| `src/types/LandingPage/desc-card.tsx` | 68 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/types/sdp/service.types.ts` | 355 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/types/user-type.tsx` | 86 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/utils/priceUtils.ts` | 1262 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/utils/registrationStatus.ts` | 3131 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | src/components/debug/RegistrationDebug.tsx:2 (unreachable importer) |
| `src/utils/testSupabase.ts` | 1211 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | No resolved importers in scanned source, Functions or root JS/TS tooling. |
| `src/utils/testimonials.tsx` | 2530 | removable | Not reachable from src/main.tsx via static imports, re-exports or literal dynamic imports | src/components/universities/sdp/Testimonials.tsx:4 (unreachable importer) |

## Unlinked stylesheet (5 entries)

| Path | Bytes | Classification | Reason | Reference evidence |
| --- | ---: | --- | --- | --- |
| `src/assets/institutions/index.css` | 2107 | removable | No path from browser, Functions or root tooling through imports, including CSS @import and url() | No resolved importers; alias-aware resolution included. |
| `src/assets/institutions/pageStyles.css` | 226 | removable | No path from browser, Functions or root tooling through imports, including CSS @import and url() | No resolved importers; alias-aware resolution included. |
| `src/assets/scrollbar.css` | 0 | removable | No path from browser, Functions or root tooling through imports, including CSS @import and url() | No resolved importers; alias-aware resolution included. |
| `src/components/Academy/Teacher/Showcase_videos/cube-animations.css` | 0 | removable | No path from browser, Functions or root tooling through imports, including CSS @import and url() | No resolved importers; alias-aware resolution included. |
| `src/components/Academy/Teacher/test.module.css` | 0 | removable | No path from browser, Functions or root tooling through imports, including CSS @import and url() | No resolved importers; alias-aware resolution included. |

## Asset filename candidate (141 entries)

| Path | Bytes | Classification | Reason | Reference evidence |
| --- | ---: | --- | --- | --- |
| `public/Event/speaker-bg.svg` | 470 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/Govt-Images/Chemical.svg` | 121336 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/Govt-Images/Chemistry.svg` | 4578 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/Govt-Images/Ev.svg` | 27787 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/Govt-Images/Hero.png` | 807929 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/Govt-Images/Logos/logo1.png` | 2896788 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/Govt-Images/Logos/logo10.png` | 2133727 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/Govt-Images/Logos/logo3.png` | 3577415 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/Govt-Images/Logos/logo4.png` | 3075873 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/Govt-Images/Logos/logo5.png` | 3350700 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/Govt-Images/Logos/logo6.png` | 3186372 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/Govt-Images/Logos/logo7.png` | 2612393 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/Govt-Images/Logos/logo8.png` | 3031657 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/Govt-Images/Logos/logo9.png` | 2517659 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/Govt-Images/Main_layout.svg` | 237044 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/Govt-Images/Mobile.svg` | 227858 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/Govt-Images/banner1.JPG` | 179029 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/Govt-Images/banner2.JPG` | 132449 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/Govt-Images/banner3.JPG` | 110149 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/Govt-Images/banner4.JPG` | 147771 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/Govt-Images/dashboard3.png` | 26716 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/Govt-Images/dashboard4.png` | 40897 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/Govt-Images/ytbanner1.png` | 104542 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/Govt-Images/ytbanner2.png` | 105636 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/Govt-Images/ytbanner3.png` | 117752 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/_headers` | 1199 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/_redirects` | 270 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/1.both Students and Schools sections under Academia_video_1080.png` | 408689 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/Component 7 (3).svg` | 492051 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/Editable Lesson Plan Templates.svg` | 1754 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/Faculty Trained1.svg` | 1463 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/Group.svg` | 149835 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/Logos/schools/299309237_440387461465397_4976478082979932156_n.jpg` | 11734 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/Projects/naan_Mudhalvan/Chemical-Safety-in-Battery-Management.jpg` | 336967 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/Projects/naan_Mudhalvan/Naan-Mudalvan-banner2.jpg` | 474252 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/Projects/naan_Mudhalvan/Naan-Mudalvan_banner.jpg` | 157648 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/SDP-01.svg` | 299181 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/Schoolservice.docx` | 1892741 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/component-.png` | 69590 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/courseBanner/Don’t Let Career Confusion Derail Student Potential.png` | 80793 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/courses/3Eprogram/gropofstudentssuccess.svg` | 591560 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/courses/arroweleft.svg` | 12726 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/courses/arrowright.svg` | 12743 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/courses/left-course-icon.svg` | 11755 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/courses/right-course-icon.svg` | 11017 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/delete2.png` | 45659 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/facultytrained.svg` | 1667 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/herobanner/10m.png` | 88964 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/herobanner/1m.png` | 145068 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/herobanner/1mm.png` | 446995 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/herobanner/2mm.png` | 44607 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/herobanner/3mm.png` | 177491 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/herobanner/4mm.png` | 121195 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/herobanner/5mm.png` | 165673 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/herobanner/6m.png` | 125299 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/herobanner/7m.png` | 218851 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/herobanner/8m.png` | 139137 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/herobanner/9m.png` | 111815 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/herobanner/Artboard 12.png` | 113461 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/herobanner/English Isn’t Just a Subject.  It’s Your Superpower_.png` | 212929 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/herobanner/Guessing Your Career Is Risky. Planning It Isn’t_.png` | 106708 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/herobanner/SArtboard 1.png` | 86244 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/herobanner/SArtboard 2.png` | 144600 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/herobanner/Turn Your Degree Into a Career_.png` | 117489 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/node.png` | 77320 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/programdiv.svg` | 2299 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/pth1.svg` | 967 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/pth2.svg` | 866 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/pth3.svg` | 882 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/pth4.svg` | 802 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/pth5.svg` | 697 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/st.jpeg` | 172863 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/testtest.png` | 521708 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/traditionalmethod/Old-01-01-removebg-preview.png` | 124200 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/academy/traditionalmethod/new_Method-01-removebg-preview (1).png` | 90016 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/institutions/images/Banners/Hero.jpeg` | 373615 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/institutions/images/Testimonials/FDP9.jpg` | 5065307 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/institutions/logos/Rareminds Logo.png` | 329973 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/institutions/logos/images/Banners/Banner1.jpeg` | 230004 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/institutions/logos/images/Banners/Banner4.jpeg` | 205246 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/institutions/logos/images/Banners/Hero.jpeg` | 373615 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/institutions/vectors/BenefitsSection.JPG` | 233516 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/institutions/vectors/Courses.jpg` | 204755 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/institutions/vectors/SimulationGame.png` | 1206987 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/institutions/vectors/Thumbnail1.jpg` | 1268990 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/institutions/vectors/Thumbnail2.jpg` | 140866 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/institutions/vectors/Thumbnail3.jpg` | 121447 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/institutions/vectors/Thumbnail4.webp` | 24384 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/passport/Arc 1.svg` | 13179 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/passport/Arc 2.svg` | 12515 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/passport/Benefits for Institutions.webp` | 35664 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/passport/Benefits for Students.webp` | 45782 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/passport/Home-page-banner-1111.jpg` | 226827 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/passport/Home-page-banner_1.png` | 203597 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/passport/Home-page-banner_2.png` | 271113 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/passport/Home-page-banner_3.png` | 177603 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/passport/Home-page-banner_4.png` | 236249 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/passport/Home-page-banner_5.png` | 210920 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/passport/Home-page-banner_mobile_1.png` | 70502 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/passport/Home-page-banner_mobile_2.png` | 78219 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/passport/Home-page-banner_mobile_3.png` | 45543 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/passport/Home-page-banner_mobile_4.png` | 59860 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/passport/Home-page-banner_mobile_5.png` | 59136 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/passport/banner 1.1.jpg` | 437663 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/passport/banner-img.png` | 153381 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/robots.txt` | 419 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `public/vite.svg` | 1497 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/Banner1.png` | 71595 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/Banner10.svg` | 244 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/Banner11.svg` | 244 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/Banner12.svg` | 252 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/Banner13.svg` | 254 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/Banner15.svg` | 614 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/Banner4.svg` | 222 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/Banner5.svg` | 197 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/Banner6.svg` | 232 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/Banner8.png` | 131208 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/KrishanLatha.jpg` | 6092371 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/Labhita-Ma-39_am.png` | 1557772 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/Labhitha.jpg` | 5473180 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/Lalitha.jpg` | 4297174 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/Subashini_Mam.jpg` | 1624081 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/Subhashini.jpg` | 5728502 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/Tamil-Nadu-Skill-Development-Corporation-Register-under-GST-AAR-Taxscan.jpg` | 34252 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/The Powerhouse Behind banner.jpg` | 336654 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/The Powerhouse Behind banner.png` | 122367 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/Vishak.jpg` | 6114831 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/Who We Are” part of the About page 2.png` | 141646 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/banner2.svg` | 199 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/banner3.svg` | 195 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/leftCard.svg` | 611 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/leftCard1.svg` | 223 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/leftCard2.png` | 3388 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/rareminds_bulb.png` | 15533 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/sandya.jpg` | 4554520 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/success_banner_mobile_390x844.png` | 55131 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/tripura_1.jpg` | 7970 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/version1.svg` | 240 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/version3.svg` | 611 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/vishak.png` | 471671 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |
| `src/assets/who.png` | 355467 | retain pending evidence | No literal filename occurrence in the scanned tracked text corpus | No match among 754 text files. Database values, external URLs, URL encoding and string-built paths were not ruled out. |

## Historical material (40 entries)

These are retained records or local metadata, not disposable build caches. No file contents or secret values are reproduced.

| Path | Bytes | Classification | Reason | Reference evidence |
| --- | ---: | --- | --- | --- |
| `semantic-review/2026-09-09-125440-pr-local.md` | 4923 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Tracked historical file; not part of the active browser/BFF import graph. |
| `semantic-review/2026-09-09-161259-pr-local.md` | 7779 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Tracked historical file; not part of the active browser/BFF import graph. |
| `semantic-review/2026-09-09-163112-pr-local.md` | 3256 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Tracked historical file; not part of the active browser/BFF import graph. |
| `semantic-review/2026-09-10-100410-pr-local.md` | 6943 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Tracked historical file; not part of the active browser/BFF import graph. |
| `semantic-review/2026-09-10-102750-pr-local.md` | 5162 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Tracked historical file; not part of the active browser/BFF import graph. |
| `semantic-review/2026-09-10-104641-pr-local.md` | 4958 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Tracked historical file; not part of the active browser/BFF import graph. |
| `supabase-old/.temp/cli-latest` | 8 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `supabase-old/.temp/gotrue-version` | 8 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `supabase-old/.temp/linked-project.json` | 133 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `supabase-old/.temp/pooler-url` | 93 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `supabase-old/.temp/postgres-version` | 10 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `supabase-old/.temp/project-ref` | 20 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `supabase-old/.temp/rest-version` | 7 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `supabase-old/.temp/storage-migration` | 33 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `supabase-old/.temp/storage-version` | 8 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `.wrangler/deploy.yml.removed` | 1689 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `.wrangler/retired-email-debug/check-email-config.js` | 3419 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `.wrangler/retired-email-debug/debug-edge-function-error.js` | 6518 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `.wrangler/retired-email-debug/debug-email-otp.js` | 3720 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `.wrangler/retired-email-debug/test-deployed-function.js` | 4080 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `.wrangler/retired-email-debug/test-edge-function-direct.js` | 1776 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `.wrangler/retired-email-debug/test-edge-functions.js` | 3796 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `.wrangler/retired-email-debug/test-final-otp.js` | 3694 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `.wrangler/retired-supabase-email-functions/_shared/email-worker.ts` | 2124 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `.wrangler/retired-supabase-email-functions/contact-form-email/deno.json` | 192 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `.wrangler/retired-supabase-email-functions/contact-form-email/index.ts` | 1472 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `.wrangler/retired-supabase-email-functions/send-contact-email/deno.json` | 20 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `.wrangler/retired-supabase-email-functions/send-contact-email/index.ts` | 1867 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `.wrangler/retired-supabase-email-functions/send-download-notification/deno.json` | 192 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `.wrangler/retired-supabase-email-functions/send-download-notification/index.ts` | 1729 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `.wrangler/retired-supabase-email-functions/send-event-enquiry-email/deno.json` | 20 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `.wrangler/retired-supabase-email-functions/send-event-enquiry-email/index.ts` | 1614 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `.wrangler/retired-supabase-email-functions/send-otp-email/deno.json` | 192 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `.wrangler/retired-supabase-email-functions/send-otp-email/index.ts` | 3807 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `.wrangler/retired-supabase-email-functions/send-recruitment-email/deno.json` | 20 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `.wrangler/retired-supabase-email-functions/send-recruitment-email/index.ts` | 1552 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `.wrangler/retired-supabase-email-functions/send-training-email/deno.json` | 192 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `.wrangler/retired-supabase-email-functions/send-training-email/index.ts` | 1540 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `.wrangler/retired-supabase-email-functions/verify-otp/deno.json` | 192 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |
| `.wrangler/retired-supabase-email-functions/verify-otp/index.ts` | 3293 | retain pending evidence | Historical review, retired implementation or Supabase CLI metadata; not assumed reproducible | Untracked or ignored local history; preserve until its retention value is established. |

## Duplicate asset groups (31)

All groups are **retain pending evidence**. Files at distinct public URLs may intentionally share content. In particular, preserve both `public/llms.txt` and `public/.well-known/llms.txt`, and do not collapse desktop/mobile assets based on identical bytes alone. The theoretical redundant-byte figures in JSON are not promised storage savings.

### Group 1 — 3504 bytes per file

SHA-256: `2d49fc3d977d99fdd25e36727a9b32835bf8e03ba34f8cd9191b5308bb3dd8e3`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/.well-known/llms.txt` | 3504 | retain pending evidence | public/robots.txt |
| `public/llms.txt` | 3504 | retain pending evidence | public/robots.txt |

### Group 2 — 3006 bytes per file

SHA-256: `4ccfd834cf3d89c1cc3645b6b62811db91c5b294339dbf042c022000c3cc66c7`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/Corporate/Images/Recruitment/process/process_1.webp` | 3006 | retain pending evidence | src/assets/corporate/Home/process/process.tsx |
| `public/Corporate/Images/Recruitment/processMobile/processMobile_6.webp` | 3006 | retain pending evidence | src/assets/corporate/Home/process/processMobile.tsx |

### Group 3 — 5570 bytes per file

SHA-256: `8024b94c3068b0b3505556e69b8cd863f0dcabb2175c0cca5b229ee93730f288`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/Corporate/Images/Recruitment/process/process_12.webp` | 5570 | retain pending evidence | src/assets/corporate/Home/process/process.tsx |
| `public/Corporate/Images/Recruitment/processMobile/processMobile_1.webp` | 5570 | retain pending evidence | src/assets/corporate/Home/process/processMobile.tsx |

### Group 4 — 3838 bytes per file

SHA-256: `27cba35d4541551c3e322e45edb076e07131589047e28386e781c4ddf79ec3e6`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/Corporate/Images/Recruitment/process/process_14.webp` | 3838 | retain pending evidence | src/assets/corporate/Home/process/process.tsx |
| `public/Corporate/Images/Recruitment/processMobile/processMobile_0.webp` | 3838 | retain pending evidence | src/assets/corporate/Home/process/processMobile.tsx |

### Group 5 — 3568 bytes per file

SHA-256: `1935417cdd6a3eb475dce962aa85ffc7bee28f8023fe19a99ea49824c3f3e37d`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/Corporate/Images/Recruitment/process/process_2.webp` | 3568 | retain pending evidence | src/assets/corporate/Home/process/process.tsx |
| `public/Corporate/Images/Recruitment/processMobile/processMobile_3.webp` | 3568 | retain pending evidence | src/assets/corporate/Home/process/processMobile.tsx |

### Group 6 — 7310 bytes per file

SHA-256: `78dad9114741ec420d2f39cf300719d34425bdde354e7f36db004ba07d3a781d`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/Corporate/Images/Recruitment/process/process_3.webp` | 7310 | retain pending evidence | src/assets/corporate/Home/process/process.tsx |
| `public/Corporate/Images/Recruitment/processMobile/processMobile_4.webp` | 7310 | retain pending evidence | src/assets/corporate/Home/process/processMobile.tsx |

### Group 7 — 3878 bytes per file

SHA-256: `d5bde5a242e49ccd05b1765f7b96d369c58e2489f07c085eb3d7dca99cfb01ff`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/Corporate/Images/Recruitment/process/process_4.webp` | 3878 | retain pending evidence | src/assets/corporate/Home/process/process.tsx |
| `public/Corporate/Images/Recruitment/processMobile/processMobile_5.webp` | 3878 | retain pending evidence | src/assets/corporate/Home/process/processMobile.tsx |

### Group 8 — 4300 bytes per file

SHA-256: `b45a89eb69c71fdccf115860e4e41cca4c510c5abc2153cb91facdfa12e47aae`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/Corporate/Images/Recruitment/process/process_5.webp` | 4300 | retain pending evidence | src/assets/corporate/Home/process/process.tsx |
| `public/Corporate/Images/Recruitment/processMobile/processMobile_2.webp` | 4300 | retain pending evidence | src/assets/corporate/Home/process/processMobile.tsx |

### Group 9 — 22742 bytes per file

SHA-256: `fc15cc8bcd97373113a746963e78bb8e2072e7b82f6924857eb4a23cc642818c`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/Corporate/Images/Training/hero/hero.webp` | 22742 | retain pending evidence | supabase/seed/5_competition_results_storage.sql |
| `public/Corporate/Images/Training/hero/roi.webp` | 22742 | retain pending evidence | src/pages/Corporate/Training/Home/index.tsx; supabase/seed/5_competition_results_storage.sql |

### Group 10 — 4786 bytes per file

SHA-256: `c3bcb2e162f5a490d6bb779ee53b41fabde92ed480c90d883cdedbdb421b3917`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/RMLogo.webp` | 4786 | retain pending evidence | index.html; src/components/Academy/Blogs/BlogDetail.tsx; src/components/Events/EventCard.tsx; src/components/Events/EventsPage.tsx; src/components/Govt/Blogs/BlogDetail.tsx; src/components/LoaderComponent.tsx; src/components/universities/sdp/FAQChatbot.tsx; src/pages/Academia/ComingSoon.tsx; src/pages/Academia/Teacher/teacher.tsx; src/pages/Blogs/BlogDetail.tsx; src/pages/ComingSoon.tsx; supabase/seed/5_competition_results_storage.sql |
| `src/assets/RMLogo.webp` | 4786 | retain pending evidence | index.html; src/components/Academy/Blogs/BlogDetail.tsx; src/components/Events/EventCard.tsx; src/components/Events/EventsPage.tsx; src/components/Govt/Blogs/BlogDetail.tsx; src/components/LoaderComponent.tsx; src/components/universities/sdp/FAQChatbot.tsx; src/pages/Academia/ComingSoon.tsx; src/pages/Academia/Teacher/teacher.tsx; src/pages/Blogs/BlogDetail.tsx; src/pages/ComingSoon.tsx; supabase/seed/5_competition_results_storage.sql |

### Group 11 — 31980 bytes per file

SHA-256: `e5653ee8c048a0a3c4c4efccb1944d1e9dacf88bd859912786a3d63dcd7ce274`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/academy/Logos/schools/GBHSS PETNANAICKENPALAYAM.png` | 31980 | retain pending evidence | src/components/Academy/Students/Logos.tsx; src/components/Academy/Teacher/Logos.tsx |
| `public/academy/Logos/schools/Government Boys Higher Secondary School, Thammampatt.png` | 31980 | retain pending evidence | src/components/Academy/Students/Logos.tsx; src/components/Academy/Teacher/Logos.tsx |

### Group 12 — 11915 bytes per file

SHA-256: `3b6b8bf274bb783c1dfbe39d61449476303d642a59fd833ca8d70419c3992023`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/academy/Logos/schools/GOVERNMENT HIGHER SECONDARY SCHOOL, KASIPALAYAM.png` | 11915 | retain pending evidence | src/components/Academy/Students/Logos.tsx; src/components/Academy/Teacher/Logos.tsx |
| `public/academy/Logos/schools/GOVT HS S K VELUR.png` | 11915 | retain pending evidence | src/components/Academy/Students/Logos.tsx; src/components/Academy/Teacher/Logos.tsx |
| `public/academy/Logos/schools/GOVT. HS, AGARAM.png` | 11915 | retain pending evidence | src/components/Academy/Students/Logos.tsx; src/components/Academy/Teacher/Logos.tsx |
| `public/academy/Logos/schools/GOVT.HSS, KANNIVADI.png` | 11915 | retain pending evidence | src/components/Academy/Students/Logos.tsx; src/components/Academy/Teacher/Logos.tsx |
| `public/academy/Logos/schools/GOVTHSS VIRUVEEDU.png` | 11915 | retain pending evidence | src/components/Academy/Students/Logos.tsx; src/components/Academy/Teacher/Logos.tsx |
| `public/academy/Logos/schools/GVHSS CHALAKUDY.png` | 11915 | retain pending evidence | src/components/Academy/Students/Logos.tsx; src/components/Academy/Teacher/Logos.tsx |
| `public/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png` | 11915 | retain pending evidence | src/components/Academy/Students/Logos.tsx; src/components/Academy/Students/Testimonials.tsx; src/components/Academy/Teacher/Logos.tsx |

### Group 13 — 23285 bytes per file

SHA-256: `c3915c8fe27b855569014b02c19b08b17948d86df88637b19628995d0d2add03`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/academy/RareMinds ISO Logo-01.png` | 23285 | retain pending evidence | src/components/Academy/Students/Testimonials.tsx; src/components/Academy/Teacher/TestimonialSlider.tsx; src/components/Academy/Teacher/Testimonials.tsx; src/components/Academy/Teacher/TestimonialsCarousel.tsx; src/components/Academy/Teacher/Testimonialsdemo.tsx; src/components/Academy/Teacher/oldandnewmethod.tsx |
| `public/academy/traditionalmethod/RareMinds ISO Logo-01.png` | 23285 | retain pending evidence | src/components/Academy/Students/Testimonials.tsx; src/components/Academy/Teacher/TestimonialSlider.tsx; src/components/Academy/Teacher/Testimonials.tsx; src/components/Academy/Teacher/TestimonialsCarousel.tsx; src/components/Academy/Teacher/Testimonialsdemo.tsx; src/components/Academy/Teacher/oldandnewmethod.tsx |

### Group 14 — 106708 bytes per file

SHA-256: `a219ba1e03d3983b145f125a2ef6384bca16765f1700a4eab7cb67f64186f914`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/academy/herobanner/Guessing Your Career Is Risky. Planning It Isn’t_.png` | 106708 | retain pending evidence | No filename matches outside the file itself; dynamic/external consumers remain possible. |
| `public/academy/herobanner/GuessingYourCareerIsRisky.PlanningItIsn’t.png` | 106708 | retain pending evidence | src/components/Academy/UI/servicesStudent.ts |

### Group 15 — 2891312 bytes per file

SHA-256: `a4d7814891116deec1255390908e091c96eda9cd96bafc80a56d3f158259dd96`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/default-blog-image.jpg` | 2891312 | retain pending evidence | src/components/Academy/Blogs/BlogCard.tsx; src/components/Academy/Blogs/BlogDetail.tsx; src/components/Academy/Students/Current_blogs.tsx; src/components/Academy/Teacher/Current_blogs.tsx; src/components/Govt/Blogs/BlogCard.tsx; src/components/Govt/Blogs/BlogDetail.tsx; src/components/universities/Blogs/BlogCard.tsx; src/components/universities/Blogs/BlogDetail.tsx; src/pages/Blogs/BlogCard.tsx; src/pages/Blogs/BlogDetail.tsx |
| `public/institutions/images/services/1.png` | 2891312 | retain pending evidence | src/components/Academy/Academy.tsx; src/components/Academy/MainLayout.tsx; src/components/Academy/Students/Testimonials.tsx; src/components/Academy/Teacher/ContactSection.tsx; src/components/Academy/Teacher/Herobanner/Hero.tsx; src/components/Academy/Teacher/Service.tsx; src/components/Academy/Teacher/TestimonialSlider.tsx; src/components/Academy/Teacher/Testimonials.tsx; src/components/Academy/Teacher/TestimonialsCarousel.tsx; src/components/Academy/Teacher/Testimonialsdemo.tsx; src/components/Academy/Teacher/oldandnewmethod.tsx; src/components/Academy/UI/services.ts; src/components/Contact/Input.tsx; src/components/Govt/sections/DashboardSection.tsx; src/components/universities/inst/CommunicationPersonalityDevelopment.tsx; src/components/universities/inst/CourseCards.tsx; src/components/universities/inst/DomainSpecificPrograms.tsx; src/components/universities/inst/InstitutionalValueAdded.tsx; src/components/universities/inst/LeadershipCareerGrowth.tsx; src/components/universities/inst/MentalHealthCounselingFDP.tsx; src/components/universities/sdp/Problem.tsx; src/components/universities/sdp/ServiceCategoryCard/ServiceCategoryCard.tsx; src/pages/About/Hero.tsx; src/pages/About/Partners.tsx; src/pages/Academia/Student/student.tsx; src/pages/Academia/Teacher/Cources.tsx; src/pages/Universities/Passport/components/ImpactSection.tsx; src/pages/Universities/sdp/ServiceCategoriesPage.tsx; src/services/school/schoolCourseService.ts |
| `public/institutions/logos/images/services/1.png` | 2891312 | retain pending evidence | src/components/Academy/Academy.tsx; src/components/Academy/MainLayout.tsx; src/components/Academy/Students/Testimonials.tsx; src/components/Academy/Teacher/ContactSection.tsx; src/components/Academy/Teacher/Herobanner/Hero.tsx; src/components/Academy/Teacher/Service.tsx; src/components/Academy/Teacher/TestimonialSlider.tsx; src/components/Academy/Teacher/Testimonials.tsx; src/components/Academy/Teacher/TestimonialsCarousel.tsx; src/components/Academy/Teacher/Testimonialsdemo.tsx; src/components/Academy/Teacher/oldandnewmethod.tsx; src/components/Academy/UI/services.ts; src/components/Contact/Input.tsx; src/components/Govt/sections/DashboardSection.tsx; src/components/universities/inst/CommunicationPersonalityDevelopment.tsx; src/components/universities/inst/CourseCards.tsx; src/components/universities/inst/DomainSpecificPrograms.tsx; src/components/universities/inst/InstitutionalValueAdded.tsx; src/components/universities/inst/LeadershipCareerGrowth.tsx; src/components/universities/inst/MentalHealthCounselingFDP.tsx; src/components/universities/sdp/Problem.tsx; src/components/universities/sdp/ServiceCategoryCard/ServiceCategoryCard.tsx; src/pages/About/Hero.tsx; src/pages/About/Partners.tsx; src/pages/Academia/Student/student.tsx; src/pages/Academia/Teacher/Cources.tsx; src/pages/Universities/Passport/components/ImpactSection.tsx; src/pages/Universities/sdp/ServiceCategoriesPage.tsx; src/services/school/schoolCourseService.ts |

### Group 16 — 373615 bytes per file

SHA-256: `9ea37f424d5638bc4ea68fc402f93aeba0181e2593f5ec7bd8f3f90e6d73057d`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/institutions/images/Banners/Hero.jpeg` | 373615 | retain pending evidence | No filename matches outside the file itself; dynamic/external consumers remain possible. |
| `public/institutions/logos/images/Banners/Hero.jpeg` | 373615 | retain pending evidence | No filename matches outside the file itself; dynamic/external consumers remain possible. |

### Group 17 — 2936465 bytes per file

SHA-256: `45d2ff17529aace53d4d0828bd477dd5881adabf86e59f0c8692c3b958502764`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/institutions/images/services/2.png` | 2936465 | retain pending evidence | src/components/Academy/MainLayout.tsx; src/components/Academy/Teacher/Herobanner/Hero.tsx; src/components/Academy/Teacher/Problem.tsx; src/components/Academy/Teacher/Service.tsx; src/components/Academy/UI/services.ts; src/components/Govt/sections/DashboardSection.tsx; src/components/universities/inst/CommunicationPersonalityDevelopment.tsx; src/components/universities/inst/CourseCards.tsx; src/components/universities/inst/DomainSpecificPrograms.tsx; src/components/universities/inst/InstitutionalValueAdded.tsx; src/components/universities/inst/LeadershipCareerGrowth.tsx; src/components/universities/inst/MentalHealthCounselingFDP.tsx; src/components/universities/sdp/Problem.tsx; src/pages/About/Hero.tsx; src/pages/About/Partners.tsx; src/pages/Academia/Teacher/Cources.tsx; src/pages/Universities/Passport/components/HeroSection.tsx; src/pages/Universities/Passport/components/ImpactSection.tsx |
| `public/institutions/logos/images/services/2.png` | 2936465 | retain pending evidence | src/components/Academy/MainLayout.tsx; src/components/Academy/Teacher/Herobanner/Hero.tsx; src/components/Academy/Teacher/Problem.tsx; src/components/Academy/Teacher/Service.tsx; src/components/Academy/UI/services.ts; src/components/Govt/sections/DashboardSection.tsx; src/components/universities/inst/CommunicationPersonalityDevelopment.tsx; src/components/universities/inst/CourseCards.tsx; src/components/universities/inst/DomainSpecificPrograms.tsx; src/components/universities/inst/InstitutionalValueAdded.tsx; src/components/universities/inst/LeadershipCareerGrowth.tsx; src/components/universities/inst/MentalHealthCounselingFDP.tsx; src/components/universities/sdp/Problem.tsx; src/pages/About/Hero.tsx; src/pages/About/Partners.tsx; src/pages/Academia/Teacher/Cources.tsx; src/pages/Universities/Passport/components/HeroSection.tsx; src/pages/Universities/Passport/components/ImpactSection.tsx |

### Group 18 — 2900766 bytes per file

SHA-256: `6c464d43bccdfbd1dc5476e7d165a954e36c869a52b6205fe927fd7563a3c75f`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/institutions/images/services/3.png` | 2900766 | retain pending evidence | src/components/Academy/Teacher/Herobanner/Hero.tsx; src/components/Academy/Teacher/Service.tsx; src/components/Academy/UI/services.ts; src/components/Contact/Input.tsx; src/components/universities/inst/CommunicationPersonalityDevelopment.tsx; src/components/universities/inst/CourseCards.tsx; src/components/universities/inst/DomainSpecificPrograms.tsx; src/components/universities/inst/InstitutionalValueAdded.tsx; src/components/universities/inst/LeadershipCareerGrowth.tsx; src/components/universities/inst/MentalHealthCounselingFDP.tsx; src/pages/Academia/Teacher/Cources.tsx; src/pages/Universities/Passport/components/ImpactSection.tsx; supabase/seed/3_courses_and_programs.sql |
| `public/institutions/logos/images/services/3.png` | 2900766 | retain pending evidence | src/components/Academy/Teacher/Herobanner/Hero.tsx; src/components/Academy/Teacher/Service.tsx; src/components/Academy/UI/services.ts; src/components/Contact/Input.tsx; src/components/universities/inst/CommunicationPersonalityDevelopment.tsx; src/components/universities/inst/CourseCards.tsx; src/components/universities/inst/DomainSpecificPrograms.tsx; src/components/universities/inst/InstitutionalValueAdded.tsx; src/components/universities/inst/LeadershipCareerGrowth.tsx; src/components/universities/inst/MentalHealthCounselingFDP.tsx; src/pages/Academia/Teacher/Cources.tsx; src/pages/Universities/Passport/components/ImpactSection.tsx; supabase/seed/3_courses_and_programs.sql |

### Group 19 — 3055238 bytes per file

SHA-256: `edff6c3a1abe77cfd82450ca045f0903da5b40720a119289611d104ecb37bf8f`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/institutions/images/services/4.png` | 3055238 | retain pending evidence | src/components/Academy/Teacher/Herobanner/Hero.tsx; src/components/Academy/Teacher/Service.tsx; src/components/Academy/UI/services.ts; src/components/universities/inst/CommunicationPersonalityDevelopment.tsx; src/components/universities/inst/CourseCards.tsx; src/components/universities/inst/DomainSpecificPrograms.tsx; src/components/universities/inst/InstitutionalValueAdded.tsx; src/components/universities/inst/LeadershipCareerGrowth.tsx; src/components/universities/inst/MentalHealthCounselingFDP.tsx; src/pages/Academia/Teacher/Cources.tsx; src/pages/Universities/Passport/components/ImpactSection.tsx |
| `public/institutions/logos/images/services/4.png` | 3055238 | retain pending evidence | src/components/Academy/Teacher/Herobanner/Hero.tsx; src/components/Academy/Teacher/Service.tsx; src/components/Academy/UI/services.ts; src/components/universities/inst/CommunicationPersonalityDevelopment.tsx; src/components/universities/inst/CourseCards.tsx; src/components/universities/inst/DomainSpecificPrograms.tsx; src/components/universities/inst/InstitutionalValueAdded.tsx; src/components/universities/inst/LeadershipCareerGrowth.tsx; src/components/universities/inst/MentalHealthCounselingFDP.tsx; src/pages/Academia/Teacher/Cources.tsx; src/pages/Universities/Passport/components/ImpactSection.tsx |

### Group 20 — 3139936 bytes per file

SHA-256: `7b2d38d5c089d500387b9ccef87dc34e17a6ccdda143164092cd743d24493578`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/institutions/images/services/5.png` | 3139936 | retain pending evidence | src/components/Academy/Teacher/Herobanner/Hero.tsx; src/components/Academy/UI/services.ts; src/components/universities/inst/CommunicationPersonalityDevelopment.tsx; src/components/universities/inst/CourseCards.tsx; src/components/universities/inst/DomainSpecificPrograms.tsx; src/components/universities/inst/InstitutionalValueAdded.tsx; src/components/universities/inst/LeadershipCareerGrowth.tsx; src/components/universities/inst/MentalHealthCounselingFDP.tsx; src/pages/Universities/Passport/components/ImpactSection.tsx |
| `public/institutions/logos/images/services/5.png` | 3139936 | retain pending evidence | src/components/Academy/Teacher/Herobanner/Hero.tsx; src/components/Academy/UI/services.ts; src/components/universities/inst/CommunicationPersonalityDevelopment.tsx; src/components/universities/inst/CourseCards.tsx; src/components/universities/inst/DomainSpecificPrograms.tsx; src/components/universities/inst/InstitutionalValueAdded.tsx; src/components/universities/inst/LeadershipCareerGrowth.tsx; src/components/universities/inst/MentalHealthCounselingFDP.tsx; src/pages/Universities/Passport/components/ImpactSection.tsx |

### Group 21 — 136057 bytes per file

SHA-256: `f0dbb1ba38048f36cbb928cb49cd7a12a2de2f3baefb85079a6066335e4dba31`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/institutions/pdfs/Campus Audit.pdf` | 136057 | retain pending evidence | functions/api/send-pdf.ts; src/components/universities/sdp/Hero.tsx; supabase/seed/2_forms_and_requests.sql; supabase/seed_remote.sql |
| `src/assets/pdfs/Campus Audit.pdf` | 136057 | retain pending evidence | functions/api/send-pdf.ts; src/components/universities/sdp/Hero.tsx; supabase/seed/2_forms_and_requests.sql; supabase/seed_remote.sql |

### Group 22 — 211150 bytes per file

SHA-256: `bea0a99fea22f5ffb496bec3b2157a7855314d4f5639b3ae7b9e40fcb653f84a`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/institutions/pdfs/Course_List.pdf` | 211150 | retain pending evidence | functions/api/send-pdf.ts; src/components/Academy/Teacher/Service.tsx; src/components/universities/sdp/FloatingAction.tsx; src/components/universities/sdp/Hero.tsx; src/components/universities/sdp/StickyButtons.tsx; src/services/sdp/enrollmentService.ts; supabase/seed/2_forms_and_requests.sql; supabase/seed_remote.sql |
| `src/assets/pdfs/Course_List.pdf` | 211150 | retain pending evidence | functions/api/send-pdf.ts; src/components/Academy/Teacher/Service.tsx; src/components/universities/sdp/FloatingAction.tsx; src/components/universities/sdp/Hero.tsx; src/components/universities/sdp/StickyButtons.tsx; src/services/sdp/enrollmentService.ts; supabase/seed/2_forms_and_requests.sql; supabase/seed_remote.sql |

### Group 23 — 294060 bytes per file

SHA-256: `e5cbc3c466f229cb67ba496c29cca556855f29a29fddd86b2a160dbf350caa9d`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/institutions/pdfs/FDP_Handbook.pdf` | 294060 | retain pending evidence | functions/api/send-pdf.ts; src/components/universities/fdp/FDPSolutions.tsx |
| `src/assets/pdfs/FDP_Handbook.pdf` | 294060 | retain pending evidence | functions/api/send-pdf.ts; src/components/universities/fdp/FDPSolutions.tsx |

### Group 24 — 646637 bytes per file

SHA-256: `7c09e2083367f77cf58fb117dd9ad226807eb6c8974503ff19ed8a78310a883f`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/institutions/pdfs/Vels.pdf` | 646637 | retain pending evidence | functions/api/send-pdf.ts; src/components/universities/sdp/CaseStudies.tsx; src/components/universities/sdp/FinalCTA.tsx; supabase/seed/2_forms_and_requests.sql; supabase/seed_remote.sql |
| `src/assets/pdfs/Vels.pdf` | 646637 | retain pending evidence | functions/api/send-pdf.ts; src/components/universities/sdp/CaseStudies.tsx; src/components/universities/sdp/FinalCTA.tsx; supabase/seed/2_forms_and_requests.sql; supabase/seed_remote.sql |

### Group 25 — 836 bytes per file

SHA-256: `a5520ee02384055d4932c666d6f3dd9948a0a23f4fb9cf53c094a429948eb1d0`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/institutions/vectors/arrowDown.svg` | 836 | retain pending evidence | src/components/Corporate/Recruitment/Home/Carousel/FullScreenCarousel.tsx; src/components/Corporate/Training/hero/FullScreenCarousel.tsx; src/components/universities/fdp/HeroSection.tsx; src/components/universities/inst/Hero.tsx; src/components/universities/sdp/Hero.tsx |
| `src/assets/corporate/Home/Carousal/arrowDown.svg` | 836 | retain pending evidence | src/components/Corporate/Recruitment/Home/Carousel/FullScreenCarousel.tsx; src/components/Corporate/Training/hero/FullScreenCarousel.tsx; src/components/universities/fdp/HeroSection.tsx; src/components/universities/inst/Hero.tsx; src/components/universities/sdp/Hero.tsx |

### Group 26 — 35664 bytes per file

SHA-256: `c82d40476e146e200972bb12515be469cf11fdde8aa540c670cbd4943d3f964f`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/passport/Benefits for Institutions.webp` | 35664 | retain pending evidence | No filename matches outside the file itself; dynamic/external consumers remain possible. |
| `public/passport/StepProcess/Benefits-Institutions.webp` | 35664 | retain pending evidence | src/pages/Universities/Passport/components/InstitutionsBenefits.tsx |

### Group 27 — 45782 bytes per file

SHA-256: `5cb43505475b9499ffc7a8300f2347a946506f5fab84fc482222b801e8cf0faf`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `public/passport/Benefits for Students.webp` | 45782 | retain pending evidence | No filename matches outside the file itself; dynamic/external consumers remain possible. |
| `public/passport/StepProcess/Benefits-Students.webp` | 45782 | retain pending evidence | src/pages/Universities/Passport/components/BenefitsSections.tsx |

### Group 28 — 244 bytes per file

SHA-256: `68b40e98c9c3657a9ad288b02803baf77baff27c5fd96b763cf32f445f1463a1`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `src/assets/Banner10.svg` | 244 | retain pending evidence | No filename matches outside the file itself; dynamic/external consumers remain possible. |
| `src/assets/Banner11.svg` | 244 | retain pending evidence | No filename matches outside the file itself; dynamic/external consumers remain possible. |

### Group 29 — 149148 bytes per file

SHA-256: `21ac94e93334af22adc6b813307602723165ac598ea7d8391feb6e9ed29204c7`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `src/assets/Rectangle493.png` | 149148 | retain pending evidence | src/components/Contact/Input.tsx |
| `src/assets/version.png` | 149148 | retain pending evidence | src/components/Contact/Input.tsx |

### Group 30 — 223 bytes per file

SHA-256: `c880c4e5140a1d4884fc49f482b6c5bc34204627fff6befeef74cd5946e477d1`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `src/assets/banner7.svg` | 223 | retain pending evidence | src/components/Contact/Input.tsx |
| `src/assets/leftCard1.svg` | 223 | retain pending evidence | No filename matches outside the file itself; dynamic/external consumers remain possible. |

### Group 31 — 611 bytes per file

SHA-256: `b18729e0ad8cadee9d839d545a6f55f3a786358b55598b4676b888bd685dc558`.

| Path | Bytes | Classification | Reference evidence (literal filename matches) |
| --- | ---: | --- | --- |
| `src/assets/leftCard.svg` | 611 | retain pending evidence | No filename matches outside the file itself; dynamic/external consumers remain possible. |
| `src/assets/version3.svg` | 611 | retain pending evidence | No filename matches outside the file itself; dynamic/external consumers remain possible. |

## Generated directories

Directory-level inventory avoids thousands of unhelpful dependency/build entries. Keep installed dependencies for development. `dev:pages` serves `dist/`, so rebuild it before use if it is ever cleared. Do not treat all of `.wrangler/` as disposable: retired code and local state can have retention value.

| Path | Bytes | Files | Classification | Reason |
| --- | ---: | ---: | --- | --- |
| `dist/` | 249230249 | 622 | generated | Rebuilt by npm run build; used by local Pages commands |
| `node_modules/` | 1013455883 | 42489 | generated | Restored by npm ci; required for development |
| `.wrangler/tmp/` | 1361480 | 15 | generated | Wrangler temporary bundles; regenerate with tooling |

## Unresolved local imports

These were observed during static analysis, not introduced by the audit. They limit the confidence of broad deletion. Some are type-only imports or occur inside unreachable modules, so a passing Vite build does not rule them out. Duplicate specifiers are listed once.

| Importer | Unresolved specifier |
| --- | --- |
| `src/components/Academy/Blogs/blogData.ts` | `@/types/blog` |
| `src/components/Academy/Project/Project/ProjectCard.tsx` | `../../types/index` |
| `src/components/Academy/Project/Project/ProjectModal.tsx` | `../types/` |
| `src/components/Academy/Project/hooks/useProjectSearch.ts` | `../types/index` |
| `src/components/Academy/Project/utils/search.ts` | `../types` |
| `src/components/Academy/Teacher/Herobanner/Services.tsx` | 7769 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 5 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Corporate/Recruitment/Home/Contact/ContactForm.tsx` | 4637 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 1 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Corporate/Recruitment/Home/Contact/ContactForm.tsx` | 4637 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 1 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/Govt/Blogs/blogData.ts` | `@/types/blog` |
| `src/components/universities/Blogs/BlogDetail.tsx` | `../UI/input` |
| `src/components/universities/Blogs/BlogDetail.tsx` | `../UI/textarea` |
| `src/components/universities/Blogs/blog.ts` | `@/types/blog` |
| `src/components/universities/Blogs/blogData.ts` | `@/types/blog` |
| `src/components/universities/sdp/FAQ.tsx` | 6563 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 4 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/universities/sdp/FAQ.tsx` | 6563 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 4 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/universities/sdp/FAQ.tsx` | 6563 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 4 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |
| `src/components/universities/sdp/Testimonials.tsx` | `./sdp/TestimonialQuotes` |
| `src/pages/Academia/Student/ThreeEProgram.tsx` | 6856 | retain pending evidence | Browser-import unreachable, but consumed by Tailwind content scanning | No resolved importers in scanned source, Functions or root JS/TS tooling. Tailwind compilation of this file alone reproduces 6 selectors that disappear when the full 138-file candidate set is excluded. Check runtime styling and data-driven classes before removal; this does not prove the component renders. |

## Preserve and follow-up rules

- Preserve all active `functions/` endpoints and utilities, Cloudflare service/rate-limit bindings, `wrangler.toml`, `nodejs_compat`, and `/api` proxy configuration. The active BFF is Cloudflare Pages Functions.
- Preserve Node-based development tools: npm, Vite, Wrangler, TypeScript, package manifests and lockfile. Cloudflare hosting does not remove their development purpose.
- Preserve `test-connection.js` and its configured npm command, `src/utils/testConnection.ts`, `Teacher/test1.tsx`, `Teacher/test2.tsx`, and `src/App.css`; they are active tooling or imported application code.
- Preserve Supabase configuration, migrations, configured `supabase/seed/*.sql`, and `supabase/seed_remote.sql`. A historical dump is not unnecessary merely because it is outside the current seed glob. Preserve local credentials and editor/agent settings.
- Consolidate `ZOHO_FLOW_WEBHOOK_URL` from `dev.vars.example` into `.dev.vars.example` and document copying to `.dev.vars` only during a later authorized cleanup. Keep `.env.example` for browser configuration.
- Replace the generic README with actual project setup during a later documentation change; this audit leaves it intact.
- For a later removal change: re-run the import/reference scan, build the frontend, compile Functions and compare lint to this baseline. Smoke-test routed Academia, Corporate, Government and Universities pages, responsive layouts and styles, plus event registration, email/contact forms and payment behavior using suitable test services. Check public images and downloads for missing URLs.
- No deletion, dependency pruning, consolidation, deploy, migration or API changes were performed.
