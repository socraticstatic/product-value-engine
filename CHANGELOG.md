# Changelog

All notable changes to the Product Value Engine project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.6.0] - 2026-03-24

### Added

- Maze usability testing: "PVE Usability Test v1" study created and live
  - Study link: https://t.maze.co/515187571
  - 7 blocks: welcome, screener, role question, 2 open questions, website test (PVE live site), thank you
  - Website test linked to socraticstatic.github.io/product-value-engine with heatmaps enabled
  - Snippet verified, screen recording available
- Full UX click-through test suite completed (12 tests, all passing)
  - Login validation, auth redirect, magic link authentication
  - All 9 feature tabs render correctly
  - Claim Analysis AI end-to-end with Google Gemini (auth enforced)
  - Sign out + session cleanup verified

### Fixed

- Re-enabled requireAuthUser() in all 7 edge functions with verify_jwt=false (ES256 JWT format incompatible with Supabase built-in verifier on new projects)
- Hash fragment cleanup after magic link redirect -- AuthContext now calls replaceState to remove #access_token fragments on SIGNED_IN event, fixing tab navigation after login

### Security

- @att.com domain restriction verified end-to-end: no-auth returns 401, authenticated @att.com user succeeds
- Edge functions deployed with auth re-enabled after testing

## [0.5.0] - 2026-03-24

### Security

- Wired `requireAuthUser()` into all 7 edge functions -- @att.com domain restriction now enforced server-side (was dead code)
- Genericized all catch-block error responses -- internal messages no longer leaked to client
- Edge functions now return "An internal error occurred" instead of error.message

### Changed

- Route-level code splitting with React.lazy (Index, ProductLab, Login) + Suspense fallback
- Vite build optimization: manualChunks splits vendor, supabase, UI (Radix), and charts into separate chunks
- Initial JS payload reduced from 2.0 MB single chunk to ~340 KB largest chunk (vendor+UI on first load)
- Build target set to es2020

### Fixed

- Resolved all 107 ESLint errors across 30+ files (zero errors, zero warnings)
- Removed unused imports, variables, and functions from 30 components
- Fixed React anti-pattern: CompareView component created during render (SolutionsCatalogPage)
- Fixed setState-in-effect in SolutionsCatalogPage (replaced with useMemo)
- Fixed missing useEffect dependency in RolePlayChat (wrapped startConversation in useCallback)
- Replaced 3 `any` types with proper TypeScript types
- Removed unused `date-fns`-style patterns and dead code across utilities

## [0.4.0] - 2026-03-24

### Changed

- Replaced Plus Jakarta Sans + Inter with ATT Aleck Sans (brand typeface) in 3 weights (400, 500, 700) as WOFF2 files (62KB total)
- Primary color changed from AT&T Cyan (#009FDB) to Cobalt (#0057b8) per SDCI design library standard
- Card border-radius increased from 8px (rounded-lg) to 16px (rounded-2xl) per SDCI spec
- Button shape changed from rounded-lg to rounded-full (pill) per SDCI spec
- Button sizes aligned to SDCI: sm=28px, default=36px, lg=44px
- Button font-weight reduced from semibold (600) to medium (500) per SDCI 3-weight limit
- Applied letter-spacing -0.03em globally on body and headings per SDCI typography spec
- Border-radius scale aligned to SDCI: 4/6/8/12/16/24px
- Success color aligned from lime (#91DC00) to forest green (#2d7e24) per SDCI
- Destructive color aligned from generic red to #c70032 per SDCI
- Warning color aligned to #ff8500 per SDCI
- Background color aligned to #f8fafb (SDCI bg-fw-wash)
- Foreground/heading color aligned to #1d2329 (SDCI text-fw-heading)
- Muted foreground aligned to #454b52 (SDCI text-fw-body)
- Input border aligned to #686e74 (SDCI border-fw-primary)
- Card border aligned to #dcdfe3 (SDCI border-fw-secondary)
- Ring/focus color aligned to Cobalt #0057b8

### Added

- ATT Aleck Sans @font-face declarations (Regular, Medium, Bold) with font-display: swap
- SDCI Figma type scale tokens: figma-xs (10px) through figma-5xl (56px)
- Cards now have subtle border (border-border/50) per SDCI card pattern
- prefers-reduced-motion media query disables all animations for accessibility

## [0.3.0] - 2026-03-24

### Added

- Micro-interactions on login page: card entrance fade-up animation, logo float and glow pulse, ambient background glow, dot pattern drift effect
- Input focus glow with icon color shift
- Button hover arrow slide with shadow lift
- Validation error shake and slide-in animations
- Form-to-confirmation crossfade with staggered animations
- Top accent gradient line on login card
- All animations implemented in pure CSS with zero new dependencies

## [0.2.0] - 2026-03-24

### Changed

- Created new Supabase project (yttpppvuzurerzhsrzmi) under socraticstatic's Org, replacing the Lovable-managed project
- Replaced Lovable AI gateway (ai.gateway.lovable.dev) with Google Gemini direct API (generativelanguage.googleapis.com/v1beta/openai/)
- Migrated LOVABLE_API_KEY to GOOGLE_AI_API_KEY across all 7 edge functions and the shared security module
- Stripped google/ prefix from model names for direct Gemini API compatibility
- Updated config.toml project_id to new Supabase project
- Updated GitHub Secrets for VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY

### Added

- Google AI API key created and set as Edge Function secret
- Ran saved_claims migration on new project (table, RLS policies, indexes)
- Configured Supabase auth: email OTP, Site URL, redirect URLs
- Installed Supabase CLI and deployed all 7 edge functions

### Removed

- All Lovable dependencies and gateway references

## [0.1.0] - 2026-03-24

### Added

- @att.com email authentication using Supabase magic link OTP
- AuthContext provider with session persistence, auto-refresh, and useAuth hook
- Login page with AT&T blue gradient, white card, globe logo, and @att.com zod validation
- ProtectedRoute wrapper that redirects unauthenticated users to /login
- Sign-out button and email display in EngineNavigation (desktop and mobile)
- user_id populated on saved_claims inserts
- verify_jwt=true enforcement on all 7 edge functions
- Server-side auth helper (_shared/auth.ts) with JWT verification and @att.com domain check

### Security

- Moved Supabase anon keys from plaintext in deploy.yml to GitHub Secrets
- Replaced wildcard CORS (*) with origin allowlist on all 7 edge functions
- Created shared security module (_shared/security.ts) with origin-validated CORS, LLM prompt input sanitization, centralized API key validation, and standardized gateway error handling
- Sanitized all user input before interpolation into LLM prompts
- Removed all console.log statements that logged business data
- Added RLS migration: user_id column, restricted INSERT to authenticated users, restricted DELETE/UPDATE to row owner
- Added database indexes on user_id and competitor columns

## [0.0.1] - 2026-03-24

### Added

- Rebuilt from Lovable-generated Product Value Engine (PM Edition) zip
- Preserved all 9 features and UI components
- Deployed to GitHub Pages at socraticstatic.github.io/product-value-engine/

### Fixed

- Supabase client crash with graceful handling of missing environment variables
- GitHub Pages SPA routing via basename configuration and 404.html redirect
