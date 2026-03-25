import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { getCorsHeaders, handleCors, sanitizeForPrompt, sanitizeArrayForPrompt, requireApiKey, handleAiGatewayError, errorResponse } from "../_shared/security.ts";
import { requireAuthUser } from "../_shared/auth.ts";

// Input validation schemas
const messageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().min(1).max(10000),
});

const personaSchema = z.object({
  name: z.string().min(1).max(200),
  title: z.string().min(1).max(200),
  company: z.string().min(1).max(200),
  industry: z.string().min(1).max(200),
});

const feedbackRequestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(100),
  persona: personaSchema,
});

serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const corsHeaders = getCorsHeaders(req);

    // Verify authenticated @att.com user
    const authResult = await requireAuthUser(req, corsHeaders);
    if (authResult.error) return authResult.error;

    // Parse and validate input
    const rawBody = await req.json();
    const parseResult = feedbackRequestSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return new Response(
        JSON.stringify({ error: "Invalid input", details: parseResult.error.flatten() }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { messages, persona } = parseResult.data;

    const GOOGLE_AI_API_KEY = requireApiKey();

    const systemPrompt = `You are a sales coaching assistant evaluating a mock role-play conversation between an AT&T sales representative (the human) and a prospective customer persona.

Persona summary:
- Name: ${sanitizeForPrompt(persona.name)}
- Title: ${sanitizeForPrompt(persona.title)}
- Company: ${sanitizeForPrompt(persona.company)}
- Industry: ${sanitizeForPrompt(persona.industry)}

The conversation messages are provided below as alternating "user" (sales rep) and "assistant" (customer persona) turns.

Your task:
1. Briefly summarize what the sales rep did well (3-5 short bullet points).
2. Provide 3-5 specific coaching tips on what they can improve in future conversations.
3. Focus your feedback on how well the rep uncovered needs, handled objections, and positioned AT&T against the persona's pain points.
4. Be direct but encouraging and practical.

Return your answer in **two clearly labeled sections** with bullet points only:

What you did well:
- ...

Where to improve:
- ...`;

    const chatMessages: { role: string; content: string }[] = [
      { role: "system", content: systemPrompt },
      ...messages,
      {
        role: "user",
        content:
          "Now provide the feedback for this conversation following the requested structure.",
      },
    ];

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GOOGLE_AI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gemini-2.5-flash",
          messages: chatMessages,
          stream: false,
        }),
      },
    );

    if (!response.ok) {
      const gatewayError = handleAiGatewayError(response, corsHeaders);
      if (gatewayError) return gatewayError;

      const errorText = await response.text();
      console.error("AI gateway feedback error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI feedback service temporarily unavailable" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const data = await response.json();
    const feedback = data?.choices?.[0]?.message?.content ?? "";

    return new Response(JSON.stringify({ feedback }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Roleplay feedback error:", error);
    return new Response(
      JSON.stringify({ error: "An internal error occurred. Please try again." }),
      {
        status: 500,
        headers: { ...getCorsHeaders(req), "Content-Type": "application/json" },
      },
    );
  }
});
