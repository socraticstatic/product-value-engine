import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a sales coaching assistant evaluating a mock role-play conversation between an AT&T sales representative (the human) and a prospective customer persona.

Persona summary:
- Name: ${persona.name}
- Title: ${persona.title}
- Company: ${persona.company}
- Industry: ${persona.industry}

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
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: chatMessages,
          stream: false,
        }),
      },
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({
            error: "Rate limit exceeded. Please wait a moment before requesting feedback again.",
          }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({
            error:
              "AI credits exhausted. Please add credits in workspace settings to continue using feedback.",
          }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

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
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
