import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { getCorsHeaders, handleCors, sanitizeForPrompt, requireApiKey, handleAiGatewayError, errorResponse } from "../_shared/security.ts";

// Input validation schema
const claimRequestSchema = z.object({
  claim: z.string().min(1, "Claim is required").max(5000, "Claim must be less than 5000 characters"),
  competitor: z.string().max(100, "Competitor must be less than 100 characters").nullable().optional(),
  productCategory: z.string().max(100, "Product category must be less than 100 characters").nullable().optional(),
});

serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const corsHeaders = getCorsHeaders(req);

    // Parse and validate input
    const rawBody = await req.json();
    const parseResult = claimRequestSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return new Response(
        JSON.stringify({ error: "Invalid input", details: parseResult.error.flatten() }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { claim, competitor, productCategory } = parseResult.data;

    // Sanitize inputs
    const sanitizedClaim = sanitizeForPrompt(claim);
    const sanitizedCompetitor = competitor ? sanitizeForPrompt(competitor.trim()) : null;
    const sanitizedProductCategory = productCategory ? sanitizeForPrompt(productCategory.trim()) : null;

    const LOVABLE_API_KEY = requireApiKey();

    const systemPrompt = `You are an expert AT&T Business sales consultant helping sellers respond to competitor claims they hear from customers. Your role is to provide nuanced, honest, and practical responses that acknowledge the "not apples-to-apples" nature of competitive comparisons.

Key principles:
1. Never dismiss competitor offerings - acknowledge their value where appropriate
2. Focus on uncovering the REAL differences in technology, service, and value
3. Provide discovery questions that help expose limitations naturally
4. Give practical, field-ready responses sellers can adapt
5. Be honest about AT&T's strengths AND where competitors might have advantages in specific scenarios

AT&T Business Portfolio Context:
- AT&T Business Fiber: True dedicated fiber with symmetrical speeds, 99.99% SLA, includes 5G backup FREE
- AT&T Internet Air: Fixed wireless 5G solution for areas without fiber, quick deployment
- AT&T Mobility: Comprehensive 5G wireless with FirstNet for first responders
- AT&T Voice: Cloud-based unified communications, integrates with Microsoft Teams
- AT&T Cybersecurity: Managed security services, threat detection, compliance support

Common "Not Apples-to-Apples" factors to consider:
- Asymmetric vs symmetric speeds (many competitors advertise download only)
- Shared vs dedicated bandwidth
- Consumer-grade vs business-grade SLAs
- Hidden fees, equipment costs, installation charges
- Contract terms and early termination fees
- Actual vs "up to" speeds
- Network technology differences (fiber vs cable vs fixed wireless vs DSL)
- Bundling requirements vs standalone pricing
- Support quality and response times`;

    const userPrompt = `A seller heard this competitor claim from a customer:

"${sanitizedClaim}"
${sanitizedCompetitor ? `\nCompetitor mentioned: ${sanitizedCompetitor}` : ''}
${sanitizedProductCategory ? `\nProduct category context: ${sanitizedProductCategory}` : ''}

Provide a structured response with the following sections:

1. CLAIM ANALYSIS - What is the competitor actually offering? Provide context about their product/service.

2. IT'S NOT APPLES-TO-APPLES - Identify 3-4 key differences that customers might not realize. Be specific and factual.

3. AT&T'S ADVANTAGE - What specific AT&T solutions or benefits address this scenario? Include relevant product details.

4. SUGGESTED RESPONSE - Write a conversational, non-defensive response the seller can adapt. It should acknowledge the competitor's offering while naturally pivoting to value discovery.

5. FOLLOW-UP QUESTIONS FOR YOUR CUSTOMER - These are friendly discovery questions YOU (the AT&T seller) should ask YOUR CUSTOMER during your conversation. Remember: the customer heard this claim from a competitor and is now talking to you. These are NOT questions about the competitor's product specs - they are conversational questions to ask your customer.

Ask questions that help:
- Clarify exactly what the competitor told them or offered them ("What exactly did they say about...?")
- Understand what's most important to the customer's business ("What matters most to you when it comes to...?")
- Gently help the customer think through details they may not have considered ("Did they mention anything about...?")
- Uncover any fine print, limitations, or hidden costs in what they heard ("Did they explain what happens if...?")

Frame these as natural, consultative questions you'd ask a customer sitting across from you - not technical interrogations about competitor products.

Format your response as JSON with these exact keys: claimAnalysis, notApplesToApples (array of strings), attAdvantage, suggestedResponse, questionsToAsk (array of strings)`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
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
    const content = data.choices?.[0]?.message?.content;

    // Parse the JSON response from the AI
    let parsedResponse;
    try {
      // Extract JSON from the response (it might be wrapped in markdown code blocks)
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || content.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content;
      parsedResponse = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON");
      // Return raw content if parsing fails
      parsedResponse = { rawContent: content };
    }

    return new Response(JSON.stringify(parsedResponse), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in claim-response function:", error);
    const corsHeaders = getCorsHeaders(req);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
