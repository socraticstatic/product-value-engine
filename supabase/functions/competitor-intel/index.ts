import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { getCorsHeaders, handleCors, sanitizeForPrompt, sanitizeArrayForPrompt, requireApiKey, handleAiGatewayError, errorResponse } from "../_shared/security.ts";
// import { requireAuthUser } from "../_shared/auth.ts";

// Input validation schema
const competitorIntelSchema = z.object({
  productId: z.string().min(1).max(100),
  productName: z.string().min(1).max(200),
  competitors: z.array(z.string().min(1).max(100)).min(1).max(10),
});

serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const corsHeaders = getCorsHeaders(req);

    // Verify authenticated @att.com user
    // const authResult = await requireAuthUser(req, corsHeaders);
    // if (authResult.error) return authResult.error;

    // Parse and validate input
    const rawBody = await req.json();
    const parseResult = competitorIntelSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return new Response(
        JSON.stringify({ error: "Invalid input", details: parseResult.error.flatten() }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { productId, productName, competitors } = parseResult.data;

    const GOOGLE_AI_API_KEY = requireApiKey();

    const systemPrompt = `You are a competitive intelligence analyst for AT&T Business sales teams.
Your job is to provide accurate, up-to-date information about competitor business internet, voice, and wireless offerings.
Focus on: current pricing, contract terms, included features, hidden fees, and how AT&T compares.
Be factual and specific - include actual pricing when known.
Current date: ${new Date().toISOString().split('T')[0]}`;

    const userPrompt = `Research current business offerings from these competitors: ${sanitizeArrayForPrompt(competitors).join(', ')}

Compare them to AT&T's ${sanitizeForPrompt(productName)} product.

For each competitor, provide:
1. Their current offer details and pricing
2. AT&T's advantage over them
3. Important nuances salespeople should know
4. A winning statement to use in sales conversations

Be specific about current market pricing and offers.`;

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GOOGLE_AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "provide_competitor_intel",
              description: "Provide structured competitor intelligence data",
              parameters: {
                type: "object",
                properties: {
                  competitors: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        competitor: {
                          type: "string",
                          description: "Name of the competitor (e.g., 'Comcast Business', 'Verizon Business')"
                        },
                        theirOffer: {
                          type: "string",
                          description: "Their current offer with pricing (e.g., '1 Gbps / 35 Mbps upload, $299/mo with 3-year contract')"
                        },
                        attAdvantage: {
                          type: "string",
                          description: "Key advantages AT&T has over this competitor"
                        },
                        nuance: {
                          type: "string",
                          description: "Important context or nuance salespeople should know"
                        },
                        winningStatement: {
                          type: "string",
                          description: "A persuasive statement to use when competing against this offer"
                        },
                        priceChange: {
                          type: "string",
                          enum: ["up", "down", "same", "unknown"],
                          description: "Whether their price has changed recently"
                        },
                        confidence: {
                          type: "string",
                          enum: ["high", "medium", "low"],
                          description: "Confidence level in this data accuracy"
                        }
                      },
                      required: ["competitor", "theirOffer", "attAdvantage", "nuance", "winningStatement"]
                    }
                  },
                  marketTrends: {
                    type: "array",
                    items: { type: "string" },
                    description: "Notable market trends or recent changes"
                  }
                },
                required: ["competitors"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "provide_competitor_intel" } }
      }),
    });

    const gatewayError = handleAiGatewayError(response, corsHeaders);
    if (gatewayError) return gatewayError;

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();

    // Extract the tool call result
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall || toolCall.function.name !== "provide_competitor_intel") {
      throw new Error("AI did not return structured data");
    }

    const intelData = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify({
      success: true,
      productId,
      data: intelData,
      lastUpdated: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in competitor-intel function:", error);
    const corsHeaders = getCorsHeaders(req);
    return new Response(JSON.stringify({
      error: "An internal error occurred. Please try again.",
      code: "INTERNAL_ERROR"
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
