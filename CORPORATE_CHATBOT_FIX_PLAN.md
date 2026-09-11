# Corporate chatbot remediation plan

Status: proposed implementation plan; application code unchanged.

## 1. Outcome and scope

Deliver a corporate help experience that answers supported recruitment and training questions accurately, makes uncertainty explicit, and offers a dependable route to contact the team. It must work with keyboard navigation, assistive technology, small screens, slow networks, and interrupted interactions.

Scope: the corporate floating-action menu, FAQ panel, WhatsApp contact panel, their shared state, corporate FAQ content, and focused verification. Preserve the Book a Demo and Download actions while changing their shared menu integration. Other verticals must keep their existing FAQ data and behavior.

The current implementation is a local FAQ lookup plus an external WhatsApp handoff. No model or chatbot backend is involved. Keep that architecture for this repair. An LLM, vector database, CRM integration, persistent transcripts, and a new messaging backend require separate product requirements and are outside this plan.

## 2. Evidence and priority

Priorities describe remediation order, not an assertion of a security incident.

| Priority | Finding | Evidence status | Required outcome |
| --- | --- | --- | --- |
| P1 | Corporate FAQ reads student/government content | Confirmed by Redux data path | Corporate-only, reviewed content |
| P1 | First substring match returns irrelevant answers | Executed: `hi` returns historical student data; `courses` returns funding content | Ranked retrieval, ambiguity handling, safe fallback |
| P1 | Delayed WhatsApp opening and unconditional form clearing | Timer and failure path confirmed; popup behavior browser-dependent | Immediate user-initiated handoff with retry |
| P2 | Handoff timer survives close/unmount | Confirmed callback behavior | No external navigation after cancellation |
| P2 | Invalid name/email accepted | Executed with whitespace name and malformed email | Trimmed input, form validation, useful errors |
| P2 | Parent and FAQ own competing visibility state and launchers | Confirmed in source; pointer sequence requires browser regression | One owner and one launcher |
| P2 | Closing FAQ discards draft and history | Confirmed conditional unmount plus local state | Preserve state during the corporate session |
| P2 | Fixed dimensions exceed narrow viewports | Confirmed dimensions; visual and keyboard behavior unverified | Usable responsive panels |
| P2 | Non-semantic controls and missing focus/announcement behavior | Confirmed in source; assistive-technology validation pending | Accessible complete interaction |
| P2 | Widget import failure reaches corporate route boundary | Confirmed boundary placement; fault injection pending | Widget-local failure and recovery |
| P2 | Scroll handler overwrites explicit menu choices | Confirmed state assignment | User controls visibility |
| P3 | No loading feedback while widget chunks load | Confirmed null Suspense fallback | Visible pending state |
| P3 | No widget outcome instrumentation | Confirmed in scoped components | Privacy-conscious event coverage where existing analytics permits |

Ordinary paraphrase failure and the missing recovery path belong to the retrieval work; avoid counting them as independent architectural problems. Browser-specific findings must not be reported as browser-tested until the verification below runs.

## 3. Design decisions

### State and lifecycle

- `FloatingActionMenu` owns a single `activePanel: null | 'faq' | 'chat' | 'demo'`. Opening one panel closes the others atomically.
- Keep `menuOpen` separate from panel selection. Remove automatic scroll-driven menu opening; retain explicit activation through the existing launcher.
- FAQ and contact panels are controlled components. Remove FAQ's internal launcher and duplicated `isOpen` state.
- Keep FAQ draft, messages, and selected topic in a controller above the conditionally rendered panel. Closing and reopening within the corporate layout preserves them; a visible Reset action clears them. Leaving the corporate area or reloading clears them. Do not persist transcripts to local storage.
- Keep contact values in memory while the corporate layout is mounted so closing/reopening or retrying does not require retyping. Clear on leaving that layout or explicit reset; do not represent opening WhatsApp as confirmed delivery.
- Use the existing Radix dialog dependency for panel semantics and focus handling after checking its use elsewhere in the repository. Render overlays through a portal to avoid ancestor stacking and transform interactions.
- Closing by button, Escape, or backdrop must use the same transition. Return focus to a mounted trigger, falling back to the main launcher when a menu item has unmounted. Background interaction must follow the chosen modal behavior consistently.
- On corporate route changes, close the panel and menu while retaining the in-memory conversation. Preserve a user-selected topic; update a route-derived default only when no explicit topic was chosen. Test internal answer links and browser Back/Forward. Route navigation should receive normal page focus rather than a late dialog cleanup moving focus back to the launcher.

### Content and retrieval

- Add a dedicated corporate dataset; do not replace `src/data/faqData.ts`, which contains content for another audience.
- Each entry has a stable ID, topic (`recruitment`, `training`, or `general`), canonical question, curated alternate phrasings, keywords, answer, and any verified internal contact/service link. Keep source references and review ownership alongside the content for maintainers.
- Seed answers from existing corporate service content, then have the relevant business owner verify claims. Verify the WhatsApp destination with the contact owner. Do not invent pricing, availability, funding eligibility, delivery commitments, or service guarantees.
- If authoritative wording is unavailable, return a supported contact route rather than a factual answer. Structural and accessibility repairs can ship without waiting for a complete FAQ catalog.
- Implement a pure retrieval function returning a discriminated result: `answer`, `suggestions`, `greeting`, or `no_match`.
- Normalize case, Unicode, punctuation, and whitespace consistently for both submission and suggestions. Match exact canonical questions and aliases first. Use token/phrase relevance for candidate ranking; calibrate confidence and runner-up separation against a reviewed query set.
- Avoid treating short character fragments as word matches. A broad term such as `courses` should offer relevant choices. If intent is ambiguous, contradictory, or unsupported, ask the user to select a topic or contact the team.
- Use explicit topic selection where possible; the current route may supply a default but must not prevent searching another corporate topic.
- A suggestion carries an FAQ ID and selects that entry directly. Do not rerun a selected question through a fuzzy matcher that could select a different answer.
- Limit visible suggestions to five. Provide useful starter topics before typing and a contact action on every no-match response.
- Render answers as React text and explicitly structured links. Avoid raw HTML injection. Link destinations come from curated content, not user input.
- Validate the dataset in automated checks: unique stable IDs, supported topics, nonempty questions/answers, valid link destinations, and duplicate normalized questions or aliases. Resolve cross-answer alias collisions explicitly instead of allowing array order to decide. An empty catalog must still expose verified contact options.
- Record an owner, last-reviewed date, and next-review date for business claims. Review content after service/contact changes; overdue or withdrawn claims must be reverified or replaced with a contact fallback. Content validation and retrieval fixtures run again on future dataset edits.
- Define supported languages explicitly. Until reviewed translations exist, unsupported-language questions should receive a clear supported-language/contact fallback. Do not imply multilingual understanding from Unicode normalization alone.

### WhatsApp handoff

- Remove the four-second timer, simulated loading phase, and external animation dependency from this flow.
- Use a real form with labelled fields and a submit handler; trim inputs, use email validity checks, and show inline errors. Support Enter and prevent duplicate submission.
- Preserve existing required name/email fields for this repair. Any decision to remove mandatory email collection is a separate product choice.
- Open the encoded WhatsApp URL synchronously from valid submission. Keep `noopener,noreferrer`. Provide a clearly labelled direct WhatsApp link and verified alternate contact route for retry.
- Do not use `window.open()` returning `null` as proof of popup blocking: `noopener` can also cause a null return. Do not claim message delivery or agent connection based on this return value.
- Clearly state that the action opens WhatsApp and prefills the entered details; the visitor still sends the message there. Use “Continue in WhatsApp” rather than implying an embedded live-agent connection.
- Keep the form/retry path available after the attempt. If JavaScript throws, show an actionable error without clearing input. No delayed callbacks may navigate after close or route departure.

### Layout, accessibility, and bounds

- Use viewport-bounded width, safe-area-aware spacing, and dynamic viewport height where supported; include a compatible fallback. Test the input while the software keyboard is open.
- Ensure the transcript scrolls independently and long words/URLs wrap. Keep close and submit controls reachable when content grows.
- Give every field a persistent label; use native buttons for launchers and suggestions. Provide visible focus, dialog labelling, and state attributes on the launcher.
- Announce new bot responses politely without rereading the entire transcript. Respect reduced-motion preferences and avoid continuous attention animation.
- Follow new messages only when the visitor is already near the bottom or has just submitted; do not move someone away from older messages they are reading.
- Initial proposed input limits: question 1,000 characters, name 100, email 254; show limits and do not silently truncate. Bound in-memory transcript retention to 100 messages with a visible notice when older messages are removed. Confirm these limits during implementation review.
- Enter must not submit while an input-method editor is composing text. Test composition, pasted Unicode, punctuation, and long unbroken strings. Check dialog contrast, focus visibility, and pointer target size against the site's accessibility target as well as keyboard behavior.

### Failure containment and observability

- Give FAQ and contact widgets their own error boundary and visible loading fallback. A failed chunk must leave the corporate page usable and provide close, contact, and deliberate reload options. Do not promise that resetting a boundary will retry a rejected React lazy import.
- Remove unnecessary network dependencies from the core handoff. FAQ matching must remain functional after its local code/data load without an API request.
- Where the existing analytics consent mechanism permits, record panel open, FAQ outcome, suggestion selection, handoff attempt, validation failure category, and widget load failure.
- Event properties may include topic, FAQ ID, outcome enum, and coarse route category. Exclude names, emails, question text, transcript text, and the WhatsApp URL. Bound and deduplicate events. Verify error reporting does not capture those values indirectly.
- Do not label a handoff attempt as a lead, delivered message, or completed conversation. Keep analytics failures isolated from user interaction.

## 4. Delivery sequence

### Stage 1 — Reproduction and fixtures

1. Capture the current FAQ results, close/reopen behavior, menu scroll behavior, and WhatsApp cancellation path.
2. Assemble a reviewed query fixture set spanning recruitment, training, greetings, broad queries, paraphrases, punctuation, unsupported topics, and adversarial/contradictory wording.
   Separate threshold-calibration examples from held-out acceptance examples. Record the expected answer ID or acceptable candidate IDs for each supported case; unsupported cases must not return a factual answer. Report correct direct answers, relevant disambiguations, false answers, and fallbacks separately so a matcher that always falls back cannot pass. All critical fixtures must meet their specified outcome before release; these results do not establish accuracy on unseen language.
3. Verify contact destinations and identify authoritative corporate content. Record any content gaps.
4. Confirm repository testing conventions. Currently `package.json` has no application unit/browser test scripts; `test:connection` is not chatbot coverage. Add focused tooling only where necessary, rather than treating connectivity checks as validation.

Exit: reproducible scenarios and reviewed expectations exist. Browser-only risks are clearly separated from executed failures.

### Stage 2 — Correct answers and dependable contact

1. Introduce corporate data and pure retrieval with focused unit tests.
2. Add starter topics, deterministic suggestion selection, and no-match recovery.
3. Replace delayed WhatsApp navigation with validated immediate handoff and retry controls.
4. Verify existing non-corporate FAQ consumers continue using their original dataset.

Exit: no student/government answers leak into corporate results; supported fixtures resolve or disambiguate; invalid contact input is blocked; cancellation creates no later navigation.

### Stage 3 — Lifecycle, accessibility, and responsive integration

1. Consolidate panel state and preserve FAQ session state above panel mounting.
2. Remove duplicate launcher and scroll-driven visibility changes.
3. Add dialog/focus behavior, accessible controls, announcements, and responsive bounds.
4. Recheck Book a Demo and Download through the shared menu.

Exit: all panel transitions work with pointer and keyboard; close/reopen preserves FAQ state; narrow screens and software keyboards remain usable.

### Stage 4 — Resilience and operational visibility

1. Add local loading and failure UI; inject chunk-load failure to verify containment.
2. Add input/history bounds and transcript scroll behavior.
   Measure matching/input responsiveness with the full catalog and maximum retained history on a recorded mobile device or throttled profile. Compare widget chunk size and initial corporate-page loading against the baseline. Set and record a numeric regression budget before accepting the implementation; keep test-only libraries out of production bundles and preserve lazy loading.
3. Integrate safe outcome events with existing consent handling, if available. If unavailable, keep the UI repair independent and document telemetry as deferred.

Exit: widget failures do not replace the page; recovery is actionable; emitted event payloads contain no personal data or free text.

### Stage 5 — Release verification

1. Run focused automated tests and the production build. Use repository-supported static checks; distinguish pre-existing failures from regressions.
2. Complete desktop and real mobile browser checks, including Safari/iOS and Chromium/Android. Automation alone is insufficient for external-app handoff behavior.
3. Obtain business review of the actual FAQ answers/contact destination and engineering review of the final diff.
4. Deploy through the repository's normal release process when authorized. Verify the deployed widget and keep a known-good fallback available.

Implementation can be split into three reviewable changes: content/retrieval, handoff, and panel integration/resilience. Each must include its relevant tests; avoid a large visual redesign bundled into this repair.

## 5. Acceptance matrix

| Area | Required scenarios and pass condition |
| --- | --- |
| Corporate accuracy | Reviewed recruitment/training queries return the intended answer or relevant choices; no unrelated student/funding responses |
| Retrieval | `hi` is a greeting; `courses` offers choices; punctuation and reviewed aliases work; unsupported queries produce contact recovery; exact suggestion selection returns its own FAQ |
| Input handling | Whitespace-only values rejected; malformed email rejected; Enter works; visible errors associate with fields; maximum lengths enforced |
| Handoff | Valid action opens/prefills WhatsApp from the user gesture; form retains retry path; blocked navigation remains recoverable; no delivery claim; close causes no later navigation |
| State | FAQ/chat/demo are mutually exclusive; no duplicate launcher; Escape/backdrop/button agree; FAQ draft/history survives close/reopen and clears on reset |
| Menu | Manual open/close survives page scrolling; all four existing actions still work |
| Accessibility | Keyboard can reach and operate every control; focus enters and returns predictably; modal background is handled consistently; responses are announced; reduced motion respected |
| Responsive | Test 320, 375, 390, 768, and 1440px widths, landscape, browser zoom, and a real mobile keyboard; no clipped controls or inaccessible transcript |
| Failure recovery | Slow chunk shows loading; rejected chunk shows local recovery while the page remains usable; alternate contact route is reachable |
| Privacy | No transcripts or contact values in local storage or analytics; curated links and text rendering retained; external destination is explicit |
| Regression | Corporate routes, Book a Demo, Download, and non-corporate FAQ consumers retain intended behavior |
| Content integrity | Duplicate IDs/ambiguous aliases and malformed entries fail validation; empty catalog retains contact recovery; reviewed links resolve |
| Navigation | Internal answer links and Back/Forward close overlays, preserve in-session history, and leave focus on the destination page; explicit topic choices remain stable |
| Language/input methods | IME confirmation does not send prematurely; Unicode renders safely; unsupported languages receive a clear fallback |
| Retrieval evaluation | Held-out cases meet their explicit expected outcomes; false answers and excessive fallback cannot be hidden in an aggregate success rate |
| Performance | Recorded bundle and input-response measurements meet the agreed regression budget with a full catalog and bounded history |

Suggested focused tools: Vitest for pure retrieval and React Testing Library for form/state behavior, plus Playwright for integrated browser interactions if no existing equivalent is found. Use automated accessibility checks as a supplement to manual keyboard and screen-reader checks. Mock external navigation in automated tests; do not send messages or submit real leads.

## 6. Release gates and rollback

- All confirmed P1/P2 fixes have passing targeted evidence; no known unresolved blocker in the acceptance matrix.
- Business wording and contact destinations are verified. Unverified answer topics use the supported contact fallback.
- Browser-dependent claims have actual browser evidence, with any unavailable device coverage explicitly recorded.
- Production build succeeds; changed-code static checks and regression checks pass, or unrelated baseline failures are documented.
- Inspect allowed analytics payloads before enabling events. Missing telemetry must not disable contact functionality.
- After release, inspect widget-load errors, no-match outcomes, and handoff attempts where consented telemetry exists. Establish a baseline before setting numeric conversion or success targets.
- If a release breaks answers, panel access, or contact navigation, revert the affected change or serve a verified contact-only fallback through the existing release mechanism. Do not restore known incorrect FAQ content as the fallback.

## 7. Completion evidence

The implementation report must include changed files, approved content sources, automated test results, browser/device checks, any remaining limitations, and rollback instructions. Do not claim a production-ready or fully accessible result from source inspection alone.
