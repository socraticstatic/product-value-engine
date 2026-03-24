// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://socraticstatic.github.io",
  "http://localhost:8080",
  "http://localhost:5173",
];

/**
 * Returns CORS headers with origin validation.
 * Only allows requests from known origins.
 */
export function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") || "";
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

/**
 * Handle CORS preflight requests.
 */
export function handleCors(req: Request): Response | null {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: getCorsHeaders(req) });
  }
  return null;
}

/**
 * Sanitize a string for safe interpolation into LLM prompts.
 * Strips control characters, excessive whitespace, and common injection patterns.
 */
export function sanitizeForPrompt(input: string): string {
  return input
    // Remove control characters (except newlines and tabs)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    // Collapse excessive newlines (more than 3 in a row)
    .replace(/\n{4,}/g, "\n\n\n")
    // Strip common prompt injection attempts
    .replace(/^(system|assistant|user)\s*:/gim, "[role]:")
    // Trim
    .trim();
}

/**
 * Sanitize an array of strings for prompt interpolation.
 */
export function sanitizeArrayForPrompt(items: string[]): string[] {
  return items.map(sanitizeForPrompt);
}

/**
 * Get the Lovable API key or throw.
 */
export function requireApiKey(): string {
  const key = Deno.env.get("LOVABLE_API_KEY");
  if (!key) {
    throw new Error("LOVABLE_API_KEY is not configured");
  }
  return key;
}

/**
 * Build a standard JSON error response.
 */
export function errorResponse(
  corsHeaders: Record<string, string>,
  message: string,
  status = 500,
  code?: string
): Response {
  return new Response(
    JSON.stringify({ error: message, ...(code && { code }) }),
    { status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

/**
 * Handle common AI gateway error responses (429, 402).
 */
export function handleAiGatewayError(
  response: globalThis.Response,
  corsHeaders: Record<string, string>
): Response | null {
  if (response.status === 429) {
    return errorResponse(corsHeaders, "Rate limit exceeded. Please try again in a moment.", 429, "RATE_LIMIT");
  }
  if (response.status === 402) {
    return errorResponse(corsHeaders, "AI credits exhausted. Please contact support.", 402, "PAYMENT_REQUIRED");
  }
  return null;
}
