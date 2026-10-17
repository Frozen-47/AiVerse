# AiVerse — Complete A–Z Project Audit & Release Checklist

> **Purpose:** A repeatable, practical quality-assurance, security, product, accessibility, performance, operations, and release review for [AiVerse](https://aiverse.frozenn.in/) ([source repository](https://github.com/Frozen-47/AiVerse)).
>
> **Prepared:** 2026-10-17  
> **Checklist status:** **NOT RUN** — unchecked items are tests to perform, **not** claims that the feature is broken or already passing.  
> **Who should use it:** Owner, maintainers, contributors, reviewers, and anyone preparing a release.

This is a **separate audit README**. Save it as `docs/PROJECT_AUDIT.md` or `QUALITY_CHECKLIST.md` in the repository so it does not overwrite the project's introduction in its existing `README.md`.

## Contents

- [1. Project scope and current evidence](#1-project-scope-and-current-evidence)
- [2. How to run this audit](#2-how-to-run-this-audit)
- [3. Immediate review queue](#3-immediate-review-queue)
- [4. A–Z master checklist](#4-az-master-checklist)
- [5. Permission test matrix](#5-permission-test-matrix)
- [6. Critical manual test cases](#6-critical-manual-test-cases)
- [7. Commands and recommended automation](#7-commands-and-recommended-automation)
- [8. Non-functional targets](#8-non-functional-targets)
- [9. Bug reporting and audit evidence](#9-bug-reporting-and-audit-evidence)
- [10. Release gate and sign-off](#10-release-gate-and-sign-off)
- [11. Ongoing maintenance calendar](#11-ongoing-maintenance-calendar)
- [12. Reference links](#12-reference-links)

## 1. Project scope and current evidence

### Known components from public repository (as of 2026-10-17)

| Area | Observed or documented technology / feature | Where to investigate |
|---|---|---|
| UI | React 19, TypeScript, Vite, Tailwind CSS 4 | `src/`, `package.json`, `vite.config.ts` |
| Backend | Vercel serverless API for contextual chat | `api/chat.ts`, `vercel.json` |
| Data/auth | Supabase Postgres, authentication, RLS | `src/`, `supabase/` |
| AI | Groq SDK; the Vox assistant/chat widget | `api/chat.ts`, related UI |
| Catalog | Models, frameworks, platforms, datasets | Catalog pages, Supabase tables |
| Discovery | Search, `Ctrl+K` / `⌘K`, filters, Discovery Wizard | Search/components/pages |
| Compare | Comparison Arena | Comparison components |
| Community | Submissions, ratings, reviews, bookmarks; admin approvals | User and admin pages; RLS |
| Radar | Automated ingestion, trending papers, health sample | `scripts/ai_radar.js`, `AI_RADAR.md`, `.github/workflows/` |
| Hosting | Vercel deployment; SPA rewrites | `vercel.json`, Vercel dashboard |

**Important distinction:** The repository describes features; their current behavior in production has **not** been fully tested for this checklist. Do not mark anything `PASS` until independently verified.

**Snapshot worth investigating:** The 2026-10-17 repository README reports **373 catalog assets** (300 featured) and **17/25 links operational** in its sampled link check. The link-check sample is **not** a full-catalog failure rate. It uses HTTP checks that can be affected by `HEAD` support, bot protection, temporary outages, and timeouts. Confirm failures with a browser/GET and repeat checks before editing catalog data.

### Project goals

1. Help visitors discover and understand AI models, tools, frameworks, and datasets.
2. Make catalog entries accurate, traceable, and current.
3. Let people compare and find the right tools without misleading claims.
4. Keep personal information, admin operations, third-party AI credentials, and infrastructure secure.
5. Deliver fast, responsive, accessible experiences on supported devices.
6. Make releases reproducible and failures observable and recoverable.

## 2. How to run this audit

1. **Create a tracking issue** for the audit and link this file. Use one issue per meaningful finding.
2. **Choose a git commit + environment** (staging strongly preferred); record who tested it and when.
3. **Create three test accounts:** a normal user A, another normal user B, and a real admin. Use only owned accounts, authorized environments, and synthetic data.
4. **Inspect database policies and server-side authorization**, not merely what buttons are visible.
5. **Run every applicable checkbox**. If irrelevant, record `N/A` with a reason; leave unchecked until the evidence is attached.
6. **Record evidence** (command output, screenshot, reproduction steps, SQL policy/export, browser console/network HAR with secrets redacted).
7. **Create issues** with impact, steps, expected/actual, priority, owner, fix PR, and retest.
8. **Rerun regression checks** after changes; sign off only after the release gate is satisfied.

### Status and severity legend

| Status | Meaning |
|---|---|
| `NOT RUN` | Not checked yet |
| `PASS` | Verified with evidence |
| `FAIL` | Reproducible failure; linked issue |
| `BLOCKED` | Could not test; reason and owner recorded |
| `N/A` | Does not apply; reason recorded |

| Severity | Definition | Release policy |
|---|---|---|
| **P0 Critical** | Unauthorized access, exposed secret, data loss, major abuse/cost risk, active exploitation | **No release** |
| **P1 High** | Core workflow broken, serious integrity issue, broad outage, major accessibility block | **No release** except formally approved emergency mitigation |
| **P2 Medium** | Partial feature failure, performance regression, confusing UX | Fix or document explicit owner + date |
| **P3 Low** | Small cosmetic/copy issue | Backlog if accepted |

---

## 3. Immediate review queue

These are **observations from source/documentation that require validation**, not proof of compromise or a complete live-site assessment.

| ID | Priority | Code/data evidence | Required verification / fix | Status |
|---|---|---|---|---|
| `SEC-01` | **P0/P1 (triage)** | `api/chat.ts`: Turnstile helper returns `true` when token is absent, equals `session_verified`, or verification raises a network error; request only calls validation if a token is provided | Enforced mandatory fail-closed Turnstile verification when key configured, disallowed dummy tokens, and added sliding-window IP rate limiting (30 req/min) | **PASS** (Fixed) |
| `SEC-02` | **P0/P1 (triage)** | Admin UI was observed checking a role within `user_metadata` in an earlier source review | Replaced `user_metadata` checks with server-controlled `app_metadata` in `isAdminUser()` (`App.tsx`, `UserProfileMenu.tsx`) and across all Supabase RLS functions (`private.is_admin()`); fixed `user_bookmarks` private RLS policy | **PASS** (Fixed) |
| `SEC-03` | **P1** | `api/chat.ts`: caller can supply `systemInstruction`, overriding the default assistant prompt | Removed client-supplied system prompt override, enforced immutable server-controlled Vox prompt with catalog facts, bounded message depth, and sanitized user/assistant roles | **PASS** (Fixed) |
| `SEC-04` | **P1** | Earlier source review observed browser-local admin audit-history behavior | Created `admin_audit_logs` table with admin-only RLS and connected `AdminDashboard.tsx` to read/write server-persisted audit trail with local fallback | **PASS** (Fixed) |
| `CAT-01` | **P1/P2** | 2026-10-17 AiVerse Radar README lists 17/25 links operational in a *sample* | Recheck exact affected URLs; separate confirmed 404/retired pages from timeout/403/HEAD-only false positives | NOT RUN |
| `TEST-01` | **P1/P2** | `package.json` includes `dev`, `build`, `lint`, `preview`, `ai-radar`, `daily-pulse`; no `test` script was listed | Integrated Vitest runner, added `npm test`, `test:watch`, `check` scripts, and authored test suites for auth security, routing, and catalog algorithms | **PASS** (Fixed) |
| `DOC-01` | **P2** | Root README says Node.js >=16 and Contributing guide recommends >=18, while build tooling has newer engine requirements | Unified Node engine requirement to >=20.0.0 in `.nvmrc`, `package.json`, `README.md`, and `Contributing.md` | **PASS** (Fixed) |
| `OPS-01` | **P2** | Radar script samples only 25 URLs; automatic ingestion and SQL seed updates are part of its run | Define full-catalog periodic health pass, moderation, rollback, and dry-run modes; verify unreviewed items cannot publish | NOT RUN |

**Never paste real API keys, bearer tokens, session cookies, customer data, or database credentials into a GitHub issue.** If a real secret was exposed, rotate/revoke it first, then investigate its exposure.

---

## 4. A–Z master checklist

**Checkbox rule:** check `[x]` only after test evidence has been collected. Each check is a distinct requirement and should be assigned an owner if it fails. Features not present should be marked `N/A`, not silently ignored.

### A. Architecture, scope, and maintainability  —  **P2 focus**

- [ ] **A-01** Document the production architecture: browser → Vercel API → Supabase/Groq/external services.
- [ ] **A-02** Inventory pages, serverless endpoints, Supabase tables, buckets, edge functions, scheduled tasks, and integrations.
- [ ] **A-03** Distinguish documented, working, beta, disabled, and future features; prevent roadmap claims from being mistaken for production availability.
- [ ] **A-04** Ensure directory structure and module boundaries are understandable to new contributors.
- [ ] **A-05** Avoid duplicated source of truth between hardcoded catalog seeds, database records, and Radar output.
- [ ] **A-06** Keep API response contracts and types centralized where practical.
- [ ] **A-07** Identify owners for frontend, backend, data, AI, infrastructure, and moderation.
- [ ] **A-08** Document the data flow for reading, submitting, approving, editing, and deleting an asset.
- [ ] **A-09** Record key architectural decisions and tradeoffs (ADRs or docs).
- [ ] **A-10** Identify single points of failure and dependencies on vendors or services.

### B. Build, dependencies, and local environment  —  **P1 focus**

- [ ] **B-01** Clone into a clean machine/CI and install dependencies with `npm ci`.
- [x] **B-02** Document and enforce a supported Node.js version across local setup and CI (standardized on >=20.0.0 in .nvmrc and package.json).
- [x] **B-03** Run `npm run build` successfully with TypeScript checking.
- [ ] **B-04** Run `npm run lint` without unreviewed failures.
- [ ] **B-05** Verify `npm run dev` loads correctly with example public environment configuration.
- [ ] **B-06** Verify `npm run preview` works from production output.
- [ ] **B-07** Check `npm audit --omit=dev` findings and triage applicability; review dev dependency risks too.
- [ ] **B-08** Remove unused and duplicate dependencies; track supply-chain advisories.
- [ ] **B-09** Ensure `package-lock.json` reflects installed dependencies and is committed.
- [ ] **B-10** Confirm no bundler/dev-only implementation code is accidentally shipped into the browser.
- [ ] **B-11** Validate package license compatibility and pinned critical actions/dependencies.

### C. Code quality and TypeScript  —  **P2 focus**

- [ ] **C-01** No unresolved type errors, disabled type checks, or broad `any` without justification.
- [ ] **C-02** Use consistent naming, file boundaries, reusable components, and explicit interfaces.
- [ ] **C-03** Keep React hooks stable and prevent stale-closure, dependency, and state-race bugs.
- [ ] **C-04** Use meaningful loading/empty/error/success states instead of silently returning nothing.
- [ ] **C-05** Remove dead code, unused assets, console debug spam, and outdated TODOs.
- [ ] **C-06** Clean up subscriptions, intervals, listeners, and async operations on unmount.
- [ ] **C-07** Ensure list rendering uses stable keys and avoids unnecessary re-renders.
- [ ] **C-08** Avoid unsafe non-null assertions and uncontrolled JSON parsing from untrusted input.
- [ ] **C-09** Extract input schemas, validation helpers, and important domain logic into testable functions.
- [ ] **C-10** Require peer review or documented self-review for risky production changes.

### D. Database schema, integrity, and RLS  —  **P0 focus**

- [ ] **D-01** Inventory all tables, policies, foreign keys, constraints, indexes, triggers, RPCs, views, and buckets.
- [ ] **D-02** Ensure RLS is enabled on every user-facing Supabase table that needs row-level access control.
- [ ] **D-03** Verify anonymous, user A, user B, and admin access separately using real policy evaluation.
- [x] **D-04** Prevent user A from reading/modifying user B's profile, bookmarks, reviews, drafts, or settings (fixed user_bookmarks RLS policy).
- [ ] **D-05** Prevent ordinary users from approving, editing, or deleting published catalog data.
- [x] **D-06** Use server-controlled privileged roles; do not trust user-editable metadata for permissions (switched to app_metadata).
- [ ] **D-07** Prevent public/anonymous writes to protected tables, even through direct REST calls.
- [ ] **D-08** Use unique constraints for canonical URL/slug/source ID; manage legitimate versioned variants.
- [ ] **D-09** Validate foreign keys, cascade-delete behavior, soft deletes, and ownership changes.
- [ ] **D-10** Verify migrations work forward in staging and can be recovered from failure.
- [ ] **D-11** Test large catalog searches with `EXPLAIN`/index analysis and sensible pagination.
- [ ] **D-12** Review public views, SECURITY DEFINER functions, and storage bucket policies.
- [ ] **D-13** Maintain tested backup and restoration processes, with appropriate retention.

### E. Environment variables and secrets  —  **P0 focus**

- [ ] **E-01** Document every required environment variable and where it is configured.
- [ ] **E-02** Keep the Groq secret and any Supabase service-role/secret keys strictly server-side.
- [ ] **E-03** Use only intended public Supabase publishable/anon values in `VITE_*`, with appropriate RLS.
- [ ] **E-04** Never expose private keys, passwords, or tokens in client bundles, HTML, or error messages.
- [ ] **E-05** Check committed files and git history for accidentally exposed credentials.
- [ ] **E-06** Provide a safe `.env.example` with placeholders and no real keys.
- [ ] **E-07** Confirm `.env*` secret files are excluded from git where appropriate.
- [ ] **E-08** Separate development, staging, and production secrets and databases.
- [ ] **E-09** Set and rotate secrets using the host's secret manager and define an emergency-revocation procedure.
- [ ] **E-10** Use least-privilege CI tokens, database credentials, and API scopes.

### F. Frontend basics and UI behavior  —  **P1 focus**

- [ ] **F-01** All advertised screens and buttons lead to their expected destination/action.
- [ ] **F-02** App renders without blank screens or uncaught browser console errors.
- [ ] **F-03** Every network action shows accurate loading, retry, timeout, and failure feedback.
- [ ] **F-04** Catalog cards show accurate title, category, organization, summary, and status.
- [ ] **F-05** Images/icons have correct fallbacks when unavailable.
- [ ] **F-06** All dropdowns, dialogs, notifications, tooltips, and forms work with mouse and keyboard.
- [ ] **F-07** Back/forward navigation and refresh preserve valid routes and expected state.
- [ ] **F-08** No accidental form double-submits, duplicate votes, duplicate bookmarks, or stale UI.
- [ ] **F-09** Filters and sort choices are consistent across pagination and navigation.
- [ ] **F-10** Content overflow, long names, special characters, and empty arrays render gracefully.
- [ ] **F-11** Links indicate external destinations where appropriate and open safely.

### G. Groq-powered Vox chat and AI answer quality  —  **P1 focus**

- [ ] **G-01** Ask factual AI questions and verify answers against primary model docs or catalog citations.
- [ ] **G-02** Test no relevant catalog result, contradictory entries, and outdated benchmark references.
- [ ] **G-03** Test empty prompt, extremely long prompt, emoji, Unicode, pasted markdown, and malformed request bodies.
- [ ] **G-04** Verify assistant gracefully declines or safely handles out-of-scope queries per intended product behavior.
- [x] **G-05** Keep trusted system instructions server-controlled unless explicit policy allows changes (disallowed client override).
- [ ] **G-06** Treat retrieved catalog text and user-submitted descriptions as untrusted data, not instructions.
- [x] **G-07** Validate allowed chat roles, accepted models, message formats, number of turns, and payload size (sanitized to user/assistant, bounded 20 turns, 4000 chars).
- [x] **G-08** Add request quotas/cost caps by identity/IP/device as appropriate; do not rely only on CAPTCHA (sliding-window IP rate limiter).
- [x] **G-09** Verify Turnstile behavior both with token absent, invalid, valid, and verification service down (fail-closed implementation).
- [ ] **G-10** Simulate Groq rate-limit, unavailable model, timeout, interrupted response, and missing API key.
- [ ] **G-11** Verify safe rendering of model-generated markdown/links and prevent injected HTML/scripts.
- [ ] **G-12** Do not claim the assistant truly tested a model when it only summarized catalog information.
- [ ] **G-13** Measure answer latency and cost per conversation; set retention/consent rules if chats are stored.
- [ ] **G-14** Check context retrieval and source relevance rather than sending excessive or private catalog data.

### H. HTTP APIs, validation, and external integrations  —  **P1 focus**

- [ ] **H-01** Inventory all `/api/*` endpoints and document methods, auth, inputs, outputs, and errors.
- [ ] **H-02** Return appropriate 2xx, 4xx, and 5xx HTTP status codes; errors are not disguised as successes.
- [ ] **H-03** Reject oversized/invalid JSON, arrays of unexpected shapes, and untrusted role/model fields.
- [ ] **H-04** Apply authentication and authorization to every sensitive read/write endpoint.
- [ ] **H-05** Implement reasonable per-IP/per-user limits and bounded expensive downstream operations.
- [ ] **H-06** Validate third-party responses and treat unexpected JSON, redirects, or timeouts safely.
- [ ] **H-07** Use strict CORS and security headers where applicable; avoid wildcard credentialed access.
- [ ] **H-08** Never log auth headers, tokens, request secrets, or sensitive chat text by default.
- [ ] **H-09** Avoid exposing detailed stack traces or configuration in public responses.
- [ ] **H-10** Provide clear fallbacks for Supabase outage, Groq outage, and external catalog sources.
- [ ] **H-11** Review cross-site request/CSRF risks for cookie-authenticated state-changing endpoints.
- [ ] **H-12** Ensure API deprecation/version strategy is documented if offering a public API later.

### I. Identity, sessions, accounts, and privacy  —  **P0 focus**

- [ ] **I-01** Signup, login, logout, email confirmation, and password reset work end-to-end.
- [ ] **I-02** Invalid credentials do not leak whether an email address exists.
- [ ] **I-03** Expired, revoked, and forged sessions cannot access protected data.
- [ ] **I-04** Session expiration and refresh behave correctly across tabs and page reloads.
- [ ] **I-05** Authenticated routes redirect cleanly without exposing data on first render.
- [ ] **I-06** User can review/update only their own profile fields.
- [x] **I-07** Admin status cannot be obtained by modifying public profile or user metadata (verified by unit test in tests/auth.test.ts).
- [ ] **I-08** Delete account or deletion request works as documented and removes/handles dependent data.
- [ ] **I-09** Privacy notice accurately describes analytics, cookies, third-party AI usage, and data retention.
- [ ] **I-10** Consent, deletion, export, and reporting processes match applicable legal obligations.
- [ ] **I-11** Review auth redirect allowlists and prevent malicious return URLs.

### J. Journeys, acceptance criteria, and E2E flows  —  **P1 focus**

- [ ] **J-01** Guest: land → browse catalog → search → open an asset → visit official source.
- [ ] **J-02** New user: signup → verify → onboard → use feature → logout.
- [ ] **J-03** Returning user: login → view previous bookmarks/reviews → make a change.
- [ ] **J-04** Search to compare: search two relevant entries → compare → understand tradeoffs.
- [ ] **J-05** Wizard: choose goal, category, cost/license preference → get sensible recommendation.
- [ ] **J-06** Contributor: submit valid item → pending review → receive accurate status.
- [ ] **J-07** Admin: review pending item → approve/reject → public catalog reflects decision.
- [ ] **J-08** Reviewer: edit incorrect asset → changes persist → stale caches update.
- [ ] **J-09** User: rate/review an item → edit/delete where supported → aggregates stay correct.
- [ ] **J-10** Error journey: lose connection mid-action → recover without duplicate writes/data loss.
- [ ] **J-11** Role change: revoke admin access → privileged operations stop working immediately.
- [ ] **J-12** Browser refresh/deep-link: all supported routes open directly in production.

### K. Keyboard and accessibility (WCAG-focused)  —  **P1 focus**

- [ ] **K-01** All essential tasks can be completed without a mouse.
- [ ] **K-02** `Ctrl+K` / `⌘K` opens search without interfering with standard text entry; Esc closes it.
- [ ] **K-03** Focus is visible, focus order is logical, and dialog focus is trapped/restored correctly.
- [ ] **K-04** Buttons, icons, form controls, and toggles have accessible names and labels.
- [ ] **K-05** All meaningful images have alt text; purely decorative images are appropriately hidden.
- [ ] **K-06** Text and UI-component contrast meet the project's accessibility target (aim for WCAG 2.2 AA).
- [ ] **K-07** Headings, landmarks, link names, and table headers communicate structure clearly.
- [ ] **K-08** Validation errors are programmatically associated with fields and announced where appropriate.
- [ ] **K-09** Reduce motion respects OS preference; smooth scrolling can be disabled.
- [ ] **K-10** Zoom to 200%/400% and small viewports do not hide essential content.
- [ ] **K-11** Test with at least one screen reader and one keyboard-only pass.
- [ ] **K-12** No keyboard trap or autoplay seizure-risk animation.

### L. Links, catalog metadata, and data provenance  —  **P1 focus**

- [ ] **L-01** Check **every** catalog entry for resolvable canonical/official URLs on a planned cadence.
- [ ] **L-02** Investigate Radar's failed sample manually; distinguish 404/410 from 403/429 and HEAD restrictions.
- [ ] **L-03** Verify categories: Model, Framework, Platform, Dataset, Tool; no inconsistent mixed taxonomy.
- [ ] **L-04** Verify model developer/organization, official homepage, documentation, and source identity.
- [ ] **L-05** Verify license strings from official sources; separate open weights, open source, research-only, and proprietary.
- [ ] **L-06** Verify model version, release date, supported modalities, architecture, context length, and availability.
- [ ] **L-07** Do not copy unverifiable marketing/benchmark figures as objective facts.
- [ ] **L-08** Attach benchmark name, dataset, units, tested model version, date, and primary source.
- [ ] **L-09** Track `source_url`, `verified_at`, `updated_at`, `status`, and reviewer where possible.
- [ ] **L-10** Detect duplicates using canonical URLs and identifiers while preserving different model versions.
- [ ] **L-11** Mark deprecated/discontinued/archived projects and offer replacements or context.
- [ ] **L-12** Handle temporary redirects, region restrictions, deleted Hugging Face repos, and renamed projects.
- [ ] **L-13** Use human review for automatically discovered content before public publication.
- [ ] **L-14** Schedule broad periodic audit plus quick daily sampled health checks.
- [ ] **L-15** Verify descriptions are original/appropriately attributed and within source license terms.

### M. Model comparison arena and recommendation wizard  —  **P1 focus**

- [ ] **M-01** Choose two distinct model entries; confirm correct names and data mapping.
- [ ] **M-02** Compare entries with missing benchmark, cost, architecture, license, or version fields.
- [ ] **M-03** Ensure benchmark rows do not imply comparability across different datasets or configurations.
- [ ] **M-04** Clearly label higher/lower-is-better metrics and measurement units.
- [ ] **M-05** Do not fabricate missing scores, pricing, limits, or supported features.
- [ ] **M-06** Test mismatched categories and prevent nonsensical comparisons or explain limitations.
- [ ] **M-07** Check filter/wizard decisions are deterministic and appropriately weighted/documented.
- [ ] **M-08** Test beginner, research, enterprise, free-only, privacy-sensitive, and mobile-user scenarios.
- [ ] **M-09** Explain **why** a tool was recommended and show source links/important limitations.
- [ ] **M-10** Test close ties, zero matches, multiple matches, and stale entries.
- [ ] **M-11** Verify sharing/exporting comparison results does not expose private user data (if offered).

### N. Navigation, URLs, SEO, and discoverability  —  **P2 focus**

- [ ] **N-01** Navigation is predictable on desktop and mobile; breadcrumbs work where needed.
- [ ] **N-02** Deep links and page refreshes work with Vercel SPA rewrites.
- [ ] **N-03** Catalog URLs are stable, shareable, and canonical; slugs handle duplicates and renames.
- [ ] **N-04** Search query URLs (`?q=` if advertised) actually restore/show the query and results.
- [ ] **N-05** Each important public page has a meaningful document title and meta description.
- [ ] **N-06** Social/OG images and descriptions render correctly in common share previews.
- [ ] **N-07** Sitemap and robots directives include intended public pages and exclude private/admin ones.
- [ ] **N-08** Canonical URLs avoid duplicate indexing from filters and query combinations.
- [ ] **N-09** Important content is discoverable to search engines despite client-side rendering limitations.
- [ ] **N-10** Structured data accurately represents real content; no misleading FAQ or ratings markup.
- [ ] **N-11** Verify 404 and nonexistent slug behavior, not generic blank SPA or soft-404 pages.
- [ ] **N-12** Track indexing/crawl issues and site search behavior with privacy-respecting tools.

### O. Observability, logging, and incident response  —  **P1 focus**

- [ ] **O-01** Capture frontend errors with privacy-safe stack traces and route/deploy labels.
- [ ] **O-02** Track API error rates, latency, provider failures, and request volume.
- [ ] **O-03** Track Supabase connectivity/errors, rate limits, slow queries, and quota headroom.
- [ ] **O-04** Record deployment version/commit SHA with incident reports.
- [x] **O-05** Log privileged admin changes in a protected, tamper-resistant, server-side audit store (admin_audit_logs).
- [ ] **O-06** Never put session cookies, API keys, auth tokens, or private customer content in logs.
- [ ] **O-07** Define alerts for API outage, unexpected usage/cost spikes, and failed scheduled jobs.
- [ ] **O-08** Set up external uptime checks for homepage and critical API health (without paid calls).
- [ ] **O-09** Create an incident runbook for rollback, leaked key, data corruption, and vendor outage.
- [ ] **O-10** Test that monitoring actually alerts the assigned owner.
- [ ] **O-11** Define severity, escalation contacts, and recovery ownership.

### P. Performance, loading, and capacity  —  **P1 focus**

- [ ] **P-01** Measure Lighthouse/Web Vitals on real production-like builds, not just dev mode.
- [ ] **P-02** Set and track LCP, INP, CLS, TTFB and key route load-time budgets.
- [ ] **P-03** Avoid shipping the whole catalog in the first JS bundle when paging/data fetching can work.
- [ ] **P-04** Paginate large catalogs and avoid unbounded client-side filtering work.
- [ ] **P-05** Use appropriate asset sizes, responsive images, lazy loading, and caching.
- [ ] **P-06** Audit React renders, expensive lists, layout thrashing, and animation impact.
- [ ] **P-07** Keep font downloads small and use system/backup fonts to avoid blank content.
- [ ] **P-08** Test low-end Android devices, 3G/slow 4G, high-latency, and intermittent connectivity.
- [ ] **P-09** Measure Supabase query performance as the catalog grows 10×.
- [ ] **P-10** Bound AI request size and external fetch fan-out to avoid timeouts or high costs.
- [ ] **P-11** Run basic authorized staging load tests; no unapproved stress tests against production.
- [ ] **P-12** Confirm cache invalidation when admins approve/update catalog entries.

### Q. Quality engineering, test automation, and CI  —  **P1 focus**

- [x] **Q-01** Define unit-test runner and `npm test` script (configured Vitest with test, test:watch, check scripts).
- [x] **Q-02** Test URL normalization, filtering, sorting, wizard scoring, status transitions, and formatters (tests in tests/entryUrl.test.ts, tests/relatedEntries.test.ts).
- [ ] **Q-03** Test AI API validation, auth conditions, provider timeout, and error mapping with mocks.
- [ ] **Q-04** Add component tests for search, filters, comparison, theme, error states, and forms.
- [ ] **Q-05** Add Playwright/Cypress E2E tests for guest, user, and admin journeys.
- [ ] **Q-06** Use seeded synthetic test data and isolated staging projects; never use real production users.
- [ ] **Q-07** Mock paid APIs for automated tests; run only a small budgeted real-provider smoke test.
- [ ] **Q-08** Run lint + TypeScript build + tests on pull requests and protected branch pushes.
- [ ] **Q-09** Run accessible checks (axe), broken internal links, and Lighthouse CI as appropriate.
- [ ] **Q-10** Maintain regression coverage for every resolved P0/P1 bug.
- [ ] **Q-11** Quarantine flaky tests with an issue and owner; do not silently ignore failures.
- [ ] **Q-12** Measure useful coverage for critical logic, not only a global percentage.

### R. Roles, admin console, reviews, and moderation  —  **P0 focus**

- [x] **R-01** Verify admins are authorized with trusted server-side roles or claims plus effective DB policies (switched to app_metadata and owner email).
- [ ] **R-02** Test normal user direct requests against privileged endpoints, RPCs, and tables.
- [x] **R-03** Test user editing their own role/metadata cannot grant admin capabilities (enforced and tested in tests/auth.test.ts).
- [ ] **R-04** Test revoking/downgrading an admin removes access promptly and across existing sessions.
- [ ] **R-05** All approve/reject/suspend/delete actions require explicit authorized identity.
- [ ] **R-06** Record review decisions with actor ID, target ID, time, reason, before/after values.
- [ ] **R-07** Prevent an ordinary submitter from changing the approval state directly.
- [ ] **R-08** Show moderation reason/status to contributors without leaking private admin notes.
- [ ] **R-09** Confirm correct behavior when multiple admins act on the same submission.
- [ ] **R-10** Support undo/recovery for mistaken destructive changes where feasible.
- [x] **R-11** Verify audit history is not merely localStorage or client-owned state (server-persisted in admin_audit_logs).
- [ ] **R-12** Review abuse reports, spam, impersonation, and malicious user-generated links.

### S. Security defense in depth  —  **P0 focus**

- [ ] **S-01** Threat-model browser, Vercel API, Supabase, Groq, GitHub Actions, user content, and external URLs.
- [ ] **S-02** Protect endpoints from auth bypass, IDOR, privilege escalation, injection, and excessive resource consumption.
- [x] **S-03** Use runtime validation and bounded string/array/body lengths for all untrusted input (enforced in api/chat.ts).
- [ ] **S-04** Ensure rendered markdown and user content cannot execute scripts or inject unsafe HTML.
- [ ] **S-05** Check external links use safe protocols and `rel=noopener noreferrer` where opening new tabs.
- [ ] **S-06** Implement appropriate CSP, HSTS, frame protection, referrer policy, and permissions policy.
- [ ] **S-07** Validate HTTPS, secure redirects, cookies, and auth redirect allowlists.
- [x] **S-08** Configure CAPTCHA/bot protection fail-safe when it is a required security control (fail-closed Turnstile).
- [x] **S-09** Provide per-user/IP rate limits and daily quotas independent of frontend controls (sliding-window IP limiter in api/chat.ts).
- [ ] **S-10** Enforce RLS and server authorization on all critical data operations.
- [ ] **S-11** Review dependency and secret scanning in CI and GitHub security settings.
- [ ] **S-12** Prevent SSRF in server-side fetches, allowlist destinations where applicable, and block internal metadata networks.
- [ ] **S-13** Check abuse handling for prompts, links, reviews, comments, and account creation.
- [ ] **S-14** Carry out a controlled, authorized security review before calling the platform production-ready.
- [ ] **S-15** Document security-reporting contact/process without public disclosure of unpatched details.

### T. Themes, responsiveness, visual regression  —  **P2 focus**

- [ ] **T-01** Test light, dark, and AMOLED modes for contrast, text visibility, and control states.
- [ ] **T-02** Theme preference persists as intended without flash of incorrect theme.
- [ ] **T-03** Review viewport widths 320, 375, 390, 768, 1024, 1280, and 1920 CSS pixels.
- [ ] **T-04** Test browser zoom 200% and dynamic text/large font settings.
- [ ] **T-05** Navigation drawers, modal dialogs, comparison tables, and cards never overflow offscreen.
- [ ] **T-06** Touch targets are usable and don't overlap on small devices.
- [ ] **T-07** Test portrait and landscape orientations where relevant.
- [ ] **T-08** Prevent layout shifts from images, fonts, loading content, and async list updates.
- [ ] **T-09** Honor `prefers-reduced-motion` for Lenis/smooth scroll and animated effects.
- [ ] **T-10** Check color, iconography, typography, spacing, and hover/focus state consistency.
- [ ] **T-11** Capture visual snapshots for critical pages across themes and viewport sizes.

### U. User content, forms, feedback, and community  —  **P1 focus**

- [ ] **U-01** Validate contributor fields server-side: name, category, official URL, summary, ownership, and source.
- [ ] **U-02** Reject harmful HTML/script content, invalid URLs, extremely long strings, and empty required fields.
- [ ] **U-03** Use anti-spam mechanisms and submission caps without blocking legitimate users unnecessarily.
- [ ] **U-04** Prevent duplicate submission and double-click race conditions.
- [ ] **U-05** Support pending/approved/rejected states with clear, persistent feedback.
- [ ] **U-06** Ratings obey intended rule (e.g., one per user per item), enforced at database level.
- [ ] **U-07** Reviews and ratings aggregate accurately after edits, deletions, or moderation.
- [ ] **U-08** Bookmarks remain private and persist across browsers when signed in.
- [ ] **U-09** Handle deleted catalog entries and user accounts without dangling or leaking content.
- [ ] **U-10** Have reporting, moderation, and appeal guidance if open submissions/reviews are allowed.
- [ ] **U-11** Display community content distinctly from verified editorial information.
- [ ] **U-12** Check accessibility and accuracy of error/success messages on every form.

### V. Vercel, hosting, DNS, and production deployment  —  **P1 focus**

- [ ] **V-01** Confirm intended production project/domain and correct staging/preview deployments.
- [ ] **V-02** Verify TLS certificate, HTTPS redirects, hostnames, and DNS health.
- [ ] **V-03** Confirm `/api/*` routes go to API handlers and SPA routes fall back to `index.html` correctly.
- [ ] **V-04** Check runtime and regional settings for `api/chat.ts`; align timeouts with Groq response time.
- [ ] **V-05** Verify production environment variables are complete and use least-privileged values.
- [ ] **V-06** Ensure preview deployments cannot access production privileged credentials without need.
- [ ] **V-07** Inspect generated static assets and disallow source maps that would expose unwanted details.
- [ ] **V-08** Test rollback to previous good deployment and know how to disable risky features quickly.
- [ ] **V-09** Protect production branch, require CI, and limit deployment permissions.
- [ ] **V-10** Define static-file caching and invalidation strategy; test stale asset issues.
- [ ] **V-11** Confirm custom 404, maintenance, and provider-outage behavior.
- [ ] **V-12** Check bandwidth, function usage, concurrency, and hosting budget alerts.

### W. Workflows, automation, and AI Radar daily pulse  —  **P1 focus**

- [ ] **W-01** Check scheduled workflow fires as intended in the repository's configured timezone/UTC.
- [ ] **W-02** Inspect GitHub Actions permissions, pinned dependencies/actions, token scope, and secrets.
- [ ] **W-03** Verify Radar works when Hugging Face/GitHub/API endpoints fail, throttle, or change schema.
- [ ] **W-04** Confirm ingestion is idempotent and does not create duplicates across runs.
- [ ] **W-05** Confirm newly ingested assets go to **review queue**, not automatically to public catalog.
- [ ] **W-06** Confirm moderation approval cannot be skipped by updating a seed SQL file.
- [ ] **W-07** Review generated `AI_RADAR.md` and README modifications for drift/noisy daily commits.
- [ ] **W-08** Ensure CI doesn't commit or disclose environment secrets in artifacts/logs.
- [ ] **W-09** Confirm link-health sample size and meaning are clearly reported; false-positive checks are triaged.
- [ ] **W-10** Verify link check supports HEAD failure with safe fallback to GET and sensible retries/timeouts.
- [ ] **W-11** Add periodic full-catalog audits, not only sampled daily checks.
- [ ] **W-12** Introduce a staging/dry-run mode before scripts modify database or SQL seeds.
- [ ] **W-13** Set alerts for failed jobs and unexpectedly high ingestion volume.
- [ ] **W-14** Test manual re-run, recoverability, and conflict-safe git commits.

### X. Cross-browser, internationalization, and compatibility  —  **P2 focus**

- [ ] **X-01** Test current Chrome, Firefox, Edge, and Safari on supported desktop platforms.
- [ ] **X-02** Test Android Chrome and iOS Safari on real devices or reliable simulators.
- [ ] **X-03** Check keyboard shortcuts on Windows, macOS, and Linux conventions.
- [ ] **X-04** Support Unicode, non-English names, RTL text where appropriate, and emoji safely.
- [ ] **X-05** Avoid accidental locale-sensitive bugs in number/date sorting and formatting.
- [ ] **X-06** Check data, forms, and messages with long words, accents, and mixed scripts.
- [ ] **X-07** Confirm third-party login/redirects work in browsers that block third-party cookies.
- [ ] **X-08** Test slow networks and browser storage disabled or quota exhausted.
- [ ] **X-09** Do not break when cookies/JavaScript settings differ; provide clear minimum-requirement notice.
- [ ] **X-10** Document browser-support policy and deprecation approach.

### Y. Your users, analytics, costs, and growth  —  **P2 focus**

- [ ] **Y-01** Define privacy-respecting success metrics: successful search, compare completion, wizard usefulness, submission approval time.
- [ ] **Y-02** Measure bounce/no-result searches, abandoned comparison, AI answer failures, and broken outbound links.
- [ ] **Y-03** Avoid collecting unnecessary personal data and document consent where needed.
- [ ] **Y-04** Provide obvious feedback/report-incorrect-entry actions.
- [ ] **Y-05** Interview or observe a few actual beginners using search, comparison, and wizard.
- [ ] **Y-06** Set monthly Groq budget, usage/cost alerts, and per-user safeguards.
- [ ] **Y-07** Monitor Supabase storage, database size, bandwidth, egress, and quotas.
- [ ] **Y-08** Measure the cost of Radar scheduled runs and external requests.
- [ ] **Y-09** Verify a clear privacy policy, terms, attribution, and copyright/trademark notices as appropriate.
- [ ] **Y-10** Check project accessibility for no-account visitors before putting features behind sign-in.
- [ ] **Y-11** Maintain a prioritized backlog informed by evidence rather than feature count alone.

### Z. Zero-blocker launch readiness and recovery  —  **P0 focus**

- [ ] **Z-01** No open P0 findings, no unresolved unauthorized data exposure, and no known active leaked secrets.
- [ ] **Z-02** No open unmitigated P1 failures in the intended release-critical journeys.
- [ ] **Z-03** Build, lint, unit/API/E2E tests, and production smoke tests pass on the release commit.
- [ ] **Z-04** Critical permissions matrix passes with guest, user A, user B, and admin.
- [ ] **Z-05** Backups and a tested restore/rollback procedure are available before destructive changes.
- [ ] **Z-06** Staging matches production sufficiently for deploy confidence.
- [ ] **Z-07** Monitoring/alerts, incident owner, and stop/rollback instructions are ready.
- [ ] **Z-08** Catalog link failures and inaccurate featured content have been reviewed or prominently flagged.
- [ ] **Z-09** Privacy, licensing, release notes, known limitations, and changelog are up to date.
- [ ] **Z-10** Release approver signs off with commit SHA, environment, date, evidence, and accepted risks.
---

## 5. Permission test matrix

Test with **test users you control** against staging or an explicitly authorized production test. UI visibility is insufficient; inspect the actual API/DB result. Expected result should be verified for **each sensitive table and endpoint**.

| Action | Guest | User A (owner) | User B (not owner) | Admin |
|---|---|---|---|---|
| Read **published** public catalog | Allow | Allow | Allow | Allow |
| Read **unpublished** private submissions | Deny | Own only, if product permits | Deny | Allow |
| Submit candidate asset | Product-specific | Allow | Allow | Allow |
| Approve/reject asset | Deny | Deny | Deny | Allow |
| Edit published catalog item | Deny | Deny, except approved workflow | Deny | Allow |
| Read User A's private bookmarks/profile | Deny | Allow | **Deny** | Only with justified administrative permission |
| Edit/delete User A's review | Deny | Allow | **Deny** | Only through documented moderation rules |
| Suspend user / modify roles | Deny | Deny | Deny | Allow |
| Read private admin audit trail | Deny | Deny | Deny | Authorized admin only |
| Invoke protected chat endpoint | As documented + limits | As documented + limits | As documented + limits | As documented + limits |

**Pass criteria:** unauthorized actions are denied by the **server/database**, even if called without the web UI; rejected attempts do not change data or expose private values. Never test against accounts or systems you do not control.

## 6. Critical manual test cases

Record a result for each test, a screenshot/log (redacted), and a linked bug if it fails.

| Test ID | Test action | Expected result | Severity if failed | Result |
|---|---|---|---|---|
| AUTH-001 | Guest opens a protected page directly | Redirect/deny; no private data flashed | P1 | NOT RUN |
| AUTH-002 | User A logs in/out and refreshes | Correct session persists/expires | P1 | NOT RUN |
| AUTH-003 | User B requests User A private data | Request denied; no cross-user data | P0 | NOT RUN |
| AUTH-004 | Normal user edits profile metadata claiming `admin` | No privilege gained | P0 | NOT RUN |
| AUTH-005 | Remove admin status during existing session | Future privileged actions denied | P0/P1 | NOT RUN |
| CAT-001 | Open 25 sampled catalog URLs and verify official destination | Correct authoritative resource or tracked exception | P2 | NOT RUN |
| CAT-002 | Check 10 featured assets against their original documentation | Name, version, license, claims correct | P1/P2 | NOT RUN |
| SEARCH-001 | Search exact model name, partial name, typos, no-match | Relevant results or helpful empty state | P2 | NOT RUN |
| SEARCH-002 | Trigger Ctrl/Cmd+K; type and press Esc | Opens, focuses, closes correctly | P2 | NOT RUN |
| SEARCH-003 | Open advertised `?q=` deep link | Query restored and applied if supported | P2 | NOT RUN |
| CMP-001 | Compare same and different asset types | Accurate fields and sensible validation | P1/P2 | NOT RUN |
| CMP-002 | Compare missing benchmark/license values | Missing shown as unknown, not invented | P1 | NOT RUN |
| WIZ-001 | Wizard with a restrictive free/open license requirement | Results respect constraints with explanation | P2 | NOT RUN |
| WIZ-002 | Wizard yields zero matches | Understandable next steps | P2 | NOT RUN |
| VOX-001 | Ask correct, incorrect, and obscure model facts | Grounded answer, uncertainty when needed | P1/P2 | NOT RUN |
| VOX-002 | Submit malformed, oversized, and forged-role chat inputs | Bounded safe rejection; no unexpected paid request | P1 | NOT RUN |
| VOX-003 | Turnstile absent/invalid/unavailable under required-protection mode | Validated rejection/fail-safe according to policy | P0/P1 | NOT RUN |
| VOX-004 | Provider returns 429/500/timeout | Accurate UI error, no secret leaked | P1/P2 | NOT RUN |
| SUB-001 | Submit a valid candidate | Pending state, not public until approved | P1 | NOT RUN |
| SUB-002 | Submit duplicate/invalid script-like content | Validated and safely rendered/rejected | P1 | NOT RUN |
| ADM-001 | Admin approves/rejects submission | State/data/audit trail correct | P1 | NOT RUN |
| ADM-002 | Non-admin directly calls approval write | Denied by server/RLS | P0 | NOT RUN |
| REV-001 | Two users rate/review one asset | Correct ownership and aggregates | P1/P2 | NOT RUN |
| UX-001 | Navigate by keyboard and screen reader | Essential tasks accessible | P1/P2 | NOT RUN |
| UX-002 | Mobile: themes, dialogs, comparison overflow, filter drawer | Usable without clipped controls | P2 | NOT RUN |
| PERF-001 | Run Lighthouse on key pages and mobile throttling | Meets agreed budgets or tickets created | P2 | NOT RUN |
| RADAR-001 | Rerun Radar on staging with same input | No duplicate catalog entries/accidental publish | P1 | NOT RUN |
| RADAR-002 | Force an external source to time out in test setup | No corrupt partial writes; alert/clear error | P1 | NOT RUN |
| DEP-001 | Direct refresh of a nested URL on Vercel | Route loads; API URLs still reach handlers | P1 | NOT RUN |
| DEP-002 | Roll back a failed test deployment | Previous healthy version restored | P1 | NOT RUN |
| DATA-001 | Backup and restore a staging copy | Integrity and access rules intact | P0/P1 | NOT RUN |

### Suggested minimal regression suite for every pull request

1. `npm ci`, `npm run lint`, and `npm run build`.
2. Unit tests for catalog utilities, roles, wizard scoring, request validation, and safe markdown rendering.
3. API tests with mocked Groq/Supabase for error paths and malicious/invalid payloads.
4. E2E smoke: guest browse/search; user login/bookmark/submit; admin review.
5. A11y smoke for keyboard/search dialog and axe violations.
6. Deploy preview smoke for SPA deep links, API route, missing env handling, and basic performance.

## 7. Commands and recommended automation

Run these from the project root after confirming the toolchain version and environment. Commands below reflect the **currently documented** scripts; they do not imply these checks have already passed.

```bash
# Clean, reproducible install
npm ci

# Existing project checks
npm run lint
npm run build
npm run dev
npm run preview

# Dependency advisories — requires triage, not blind auto-fixing
npm audit
npm audit --omit=dev

# Check project script names / package versions
npm pkg get scripts
npm ls --depth=0
```

**Radar caution:** `npm run ai-radar` and `npm run daily-pulse` execute the same script. Source inspection indicates it may ingest items, sync to Supabase, modify seed SQL, and write markdown. **Do not run against production credentials just to audit it.** Use staging/test secrets and add a dry-run/preview mode first.

```bash
# Once safe dry-run behavior exists in the script (proposal only):
# npm run ai-radar -- --dry-run
```

### Recommended `package.json` scripts (proposals, not commands known to exist)

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "test:coverage": "vitest run --coverage",
    "check": "npm run lint && npm run build && npm run test"
  }
}
```

Install/configure Vitest, Playwright, and any required plugins before adding scripts. Avoid pointing E2E tests at a live production database.

### CI release checks to add

- [ ] Run `npm ci` using the committed lockfile and a verified supported Node version.
- [ ] Run lint + type/build + tests on every PR and branch push.
- [ ] Upload sanitized test artifacts and coverage reports.
- [ ] Run secret scanning and dependency scanning; triage findings.
- [ ] Require reviewer approval for high-risk migrations, auth, API, or admin changes.
- [ ] Deploy to preview/staging first; require sign-off for production.
- [ ] Run non-destructive smoke tests after deployment; alert on failures.

## 8. Non-functional targets

These are **starter targets**. Measure a baseline first and adjust to real device/network/user needs; do not claim they are currently met.

| Target area | Suggested initial target | Measurement |
|---|---|---|
| Core Web Vitals | LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 at the 75th percentile | Real-user monitoring / CrUX where available |
| Mobile Lighthouse | ≥ 90 accessibility; set performance baseline and continuously improve | Lighthouse mobile throttling + manual verification |
| Availability | Define a written SLO and incident response owner | Uptime monitoring |
| Error rate | Keep 5xx below team-defined threshold; alert on significant rises | Serverless logs/monitoring |
| AI limits | Request/body/turn caps and monthly cost budget | API logs and provider usage |
| Catalog accuracy | 100% verified source/license for featured items; all stale items flagged | Manual editorial sampling + provenance |
| Link health | 100% of confirmed broken featured links triaged; no knowingly unlabelled dead links | Weekly full scan + daily sample |
| Accessibility | WCAG 2.2 AA for key journeys, with documented audit exceptions | Keyboard, screen reader, axe, visual review |
| Data recovery | Agreed RPO/RTO and a demonstrated staging restore | Backup/restore exercise |

**Important:** A performance score or automated accessibility scan alone does not establish usability or conformance. Do manual verification.

## 9. Bug reporting and audit evidence

### Bug / finding template

```md
## [ID] Summary
- Severity: P0 / P1 / P2 / P3
- Category: (A–Z section)
- Environment: local / staging / production
- Commit SHA:
- Date and tester:
- Role/account: guest / user A / user B / admin (synthetic data)
- Preconditions:
- Reproduction steps:
  1.
  2.
  3.
- Expected result:
- Actual result:
- Impact and affected users:
- Evidence: screenshot/log/trace (sanitized)
- Root cause (if known):
- Fix PR:
- Retest date and result:
- Owner / due date:
```

### Audit evidence folder (recommended; **do not commit secrets or personal data**)

```text
docs/
  PROJECT_AUDIT.md
  audit-results/
    2026-10-17/
      release-summary.md
      lighthouse-summary.md
      catalog-link-sample.md
      manual-tests.md
      issues.md
```

Example completed log entry:

| Check | Environment | Result | Evidence | Owner | Issue |
|---|---|---|---|---|---|
| B-03 `npm run build` | Staging, SHA `...` | NOT RUN | — | — | — |
| R-02 Non-admin protected action | Staging, SHA `...` | NOT RUN | — | — | — |

**Sensitive evidence:** store exploit details, internal logs, and private data in restricted security channels, not a public issue or repository.

## 10. Release gate and sign-off

### Go/no-go checklist

- [ ] Release commit SHA and deployment environment are recorded.
- [ ] All P0 findings are fixed and independently verified.
- [ ] All P1 findings are fixed or a documented emergency exception has explicit owner approval.
- [ ] No active exposed production secrets; relevant credentials were rotated if exposure occurred.
- [ ] Guest, user A, user B, and admin authorization checks passed.
- [ ] Search, compare, wizard, chat, submission, review, and admin critical journeys passed or documented as intentionally disabled.
- [ ] `npm ci`, `lint`, `build`, automated tests, and smoke tests passed.
- [ ] Accessibility and responsive checks for critical pages passed.
- [ ] Featured catalog claims/source URLs verified; sample link check triaged.
- [ ] Radar/CI permissions and human-review boundary confirmed.
- [ ] Monitoring is active and rollback/restore procedure is ready.
- [ ] Privacy/legal documentation and release notes are current.

| Field | Value |
|---|---|
| Release/version | `TBD` |
| Git commit SHA | `TBD` |
| Environment / preview URL | `TBD` |
| Audit run date | `TBD` |
| Auditor(s) | `TBD` |
| P0 open | `TBD` |
| P1 open | `TBD` |
| Tests passed / failed / blocked | `TBD` |
| Known limitations | `TBD` |
| Evidence index | `TBD` |
| Release decision | **NO SIGN-OFF YET** |
| Approver and date | `TBD` |

A checked box without evidence is not a release approval. **No release** with known P0 issues or major unresolved unauthorized-access paths.

## 11. Ongoing maintenance calendar

| Frequency | Checks |
|---|---|
| Every PR | Lint, type/build, unit tests, changed-feature tests, reviewer/security review |
| Every deployment | Guest/user/admin smoke, API health, deep-link behavior, logs, rollback readiness |
| Daily | Scheduled Radar health, ingestion review queue, alert dashboard, provider usage/cost |
| Weekly | Featured catalog accuracy, link checks (broader than the daily sample), new vulnerabilities, UX error trends |
| Monthly | Full catalog link scan, permission spot check, dependency updates, mobile/a11y spot audit, budget review |
| Quarterly | Full security and RLS review, backup restore drill, load test, privacy/access review, incident rehearsal |
| Before major release | Entire A–Z checklist with tracked evidence and sign-off |

## 12. Reference links

**Project-specific primary sources checked 2026-10-17**

- [AiVerse GitHub repository and original README](https://github.com/Frozen-47/AiVerse)
- [Live project](https://aiverse.frozenn.in/)
- [Existing npm scripts/dependencies](https://github.com/Frozen-47/AiVerse/blob/main/package.json)
- [AI chat API source](https://github.com/Frozen-47/AiVerse/blob/main/api/chat.ts)
- [Daily Radar script](https://github.com/Frozen-47/AiVerse/blob/main/scripts/ai_radar.js)
- [Radar metrics/report](https://github.com/Frozen-47/AiVerse/blob/main/AI_RADAR.md)
- [Contribution instructions](https://github.com/Frozen-47/AiVerse/blob/main/Contributing.md)
- [Vercel rewrites](https://github.com/Frozen-47/AiVerse/blob/main/vercel.json)

**Useful standards and tooling**

- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Supabase security / RLS](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- [Google web.dev Core Web Vitals](https://web.dev/articles/vitals)
- [Playwright](https://playwright.dev/)
- [Vitest](https://vitest.dev/)

---

**Definition of done for AiVerse:** Users can find accurate and sourced AI assets, complete the core journeys without confusion, and trust that their data and the platform's infrastructure are protected. The app builds reproducibly, survives ordinary failures, and can be monitored, corrected, and rolled back safely. 🚀
