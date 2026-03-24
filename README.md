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
- JWT verification (verify_jwt=true) on all edge functions
- Server-side @att.com domain validation in _shared/auth.ts
- Secrets managed via GitHub Secrets (build-time) and Supabase Edge Function Secrets (runtime)
- No business data logged to console in production

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
supabase functions deploy
```

Edge function secrets (GOOGLE_AI_API_KEY) are managed through the Supabase dashboard or CLI.

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
