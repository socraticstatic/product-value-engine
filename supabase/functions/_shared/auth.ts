import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, errorResponse } from "./security.ts";

const ALLOWED_DOMAIN = "@att.com";

/**
 * Verify the JWT from the Authorization header and validate the user's email domain.
 * Returns the authenticated user or an error Response.
 */
export async function requireAuthUser(
  req: Request,
  corsHeaders: Record<string, string>
): Promise<
  | { user: { id: string; email: string }; error?: never }
  | { user?: never; error: Response }
> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return {
      error: errorResponse(corsHeaders, "Missing or invalid authorization header", 401, "UNAUTHORIZED"),
    };
  }

  const token = authHeader.replace("Bearer ", "");

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    return {
      error: errorResponse(corsHeaders, "Invalid or expired token", 401, "UNAUTHORIZED"),
    };
  }

  if (!user.email?.toLowerCase().endsWith(ALLOWED_DOMAIN)) {
    return {
      error: errorResponse(
        corsHeaders,
        "Only @att.com email addresses are authorized",
        403,
        "FORBIDDEN"
      ),
    };
  }

  return { user: { id: user.id, email: user.email } };
}
