# Product Value Engine

AT&T Business sales enablement tool powered by AI. Helps sellers generate value propositions, handle competitor claims, run roleplay practice sessions, analyze ROI, and more.

## Features

1. **Quick Value Prop Generator** -- Generate tailored value propositions on demand
2. **Product Value Lab** -- Deep-dive product value analysis with segment fit scoring
3. **Personas Hub** -- Buyer persona profiles and messaging guidance
4. **Claim Analysis** -- AI-powered competitor claim responses and counter-positioning
5. **Use Cases / Customer Stories** -- Industry-specific use cases and customer success narratives
6. **ROI Analyzer** -- Calculate and present return-on-investment projections
7. **Solutions Catalog** -- Browse and search the AT&T Business solutions portfolio
8. **Battlecard Dashboard** -- Competitive intelligence battlecards with saved claims
9. **AI Roleplay Practice** -- Simulated sales conversations with AI-generated buyer personas

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui (Radix primitives)
- **Backend:** Supabase (Auth, PostgreSQL, Edge Functions)
- **AI:** Google Gemini via OpenAI-compatible endpoint
- **Hosting:** GitHub Pages (static SPA)

## Architecture

```
Browser (SPA)
  |
  |-- GitHub Pages (static assets)
  |
  |-- Supabase Auth (email OTP magic link, @att.com only)
  |
  |-- Supabase Edge Functions (Deno, 7 functions)
  |     |-- analyze-business
  |     |-- claim-response
  |     |-- competitor-intel
  |     |-- product-feedback-chat
  |     |-- response-recommendation
  |     |-- roleplay-chat
  |     |-- roleplay-feedback
  |     |-- _shared/  (auth.ts, security.ts)
  |
  |-- Supabase PostgreSQL
        |-- saved_claims (RLS, user ownership)
```

- **Frontend:** Single-page application deployed to GitHub Pages. All routing handled client-side with a 404.html redirect for deep links.
- **Backend:** Seven Supabase Edge Functions running on Deno. Each function calls Google Gemini through the OpenAI-compatible endpoint and returns structured responses.
- **Database:** PostgreSQL via Supabase with Row-Level Security. Users can only read, update, and delete their own rows.
- **Auth:** Email OTP magic link restricted to @att.com addresses. JWT verified server-side on every edge function call.

## Security

- CORS origin allowlist on all edge functions (no wildcard)
- LLM prompt input sanitization before interpolation
- Row-Level Security with user ownership enforcement
- Custom auth gate (requireAuthUser) on all edge functions with JWT verification + @att.com domain check
- Generic error responses to client (no internal message leakage)
- Secrets managed via GitHub Secrets (build-time) and Supabase Edge Function Secrets (runtime)
- No business data logged to console in production

## Design System

Aligned to the AT&T NetBond SDCI Design Library (Figma-verified):

- **Font:** ATT Aleck Sans (400/500/700) -- 62KB WOFF2
- **Primary:** Cobalt #0057b8
- **Letter-spacing:** -0.03em globally
- **Buttons:** Pill shape (rounded-full), 3 sizes (28/36/44px)
- **Cards:** 16px radius, subtle border
- **Type scale:** figma-xs (10px) through figma-5xl (56px)
- **Accessibility:** prefers-reduced-motion support

## Usability Testing

Maze usability testing is integrated:

- **Snippet:** Installed in index.html (async, <1KB)
- **Live study:** [PVE Usability Test v1](https://t.maze.co/515187571)
- **Features:** Heatmaps, screen recording, website task testing, open questions
- **Dashboard:** [Maze Results](https://app.maze.co/projects/515163141/mazes/515187571/results)

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Supabase CLI (for edge function development)

### Installation

```bash
git clone https://github.com/socraticstatic/product-value-engine.git
cd product-value-engine
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

### Development

```bash
npm run dev
```

To run edge functions locally:

```bash
supabase functions serve
```

## Deployment

### Frontend

Push to `main` triggers the GitHub Actions workflow, which builds and deploys to GitHub Pages.

### Edge Functions

```bash
supabase functions deploy --no-verify-jwt
```

Edge function secrets (GOOGLE_AI_API_KEY) are managed through the Supabase dashboard or CLI.

Note: `--no-verify-jwt` is required because the new Supabase project uses ES256 JWTs which are incompatible with the built-in verifier. Auth is enforced by `requireAuthUser()` in each function instead.

## Project Structure

```
src/
  App.tsx                  # Root component and route definitions
  main.tsx                 # Entry point
  index.css                # Global styles and Tailwind directives
  assets/                  # Static assets
  components/
    ui/                    # shadcn/ui primitives
    form/                  # Form components
    battlecard/            # Battlecard dashboard components
    product-lab/           # Product Value Lab components
    roi-analyzer/          # ROI Analyzer components
    value-prop/            # Value prop generator components
  contexts/                # React contexts (AuthContext)
  data/                    # Static data and configuration
  hooks/                   # Custom React hooks
  integrations/
    supabase/              # Supabase client and type definitions
  lib/                     # Utility libraries
  pages/                   # Route-level page components
  services/                # API service layer
  types/                   # TypeScript type definitions
  utils/                   # Shared utility functions

supabase/
  functions/
    _shared/               # Shared auth and security modules
    analyze-business/      # Business analysis endpoint
    claim-response/        # Competitor claim response
    competitor-intel/      # Competitive intelligence
    product-feedback-chat/ # Product feedback conversation
    response-recommendation/ # Response recommendations
    roleplay-chat/         # AI roleplay conversation
    roleplay-feedback/     # Roleplay session feedback
```
