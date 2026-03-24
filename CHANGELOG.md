# Changelog

All notable changes to the Product Value Engine project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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
