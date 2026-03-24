import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { getCorsHeaders, handleCors, sanitizeForPrompt, requireApiKey, handleAiGatewayError, errorResponse } from "../_shared/security.ts";

// Input validation schema
const recommendationRequestSchema = z.object({
  claim: z.string().min(1).max(5000),
  questions: z.array(z.string().min(1).max(1000)).min(1).max(20),
  customerResponses: z.record(z.string().min(1).max(2000)),
  suggestedResponse: z.string().max(5000).nullable().optional(),
  competitor: z.string().max(100).nullable().optional(),
  productCategory: z.string().max(100).nullable().optional(),
});

serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const corsHeaders = getCorsHeaders(req);

    // Parse and validate input
    const rawBody = await req.json();
    const parseResult = recommendationRequestSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return new Response(
        JSON.stringify({ error: "Invalid input", details: parseResult.error.flatten() }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { claim, questions, customerResponses, suggestedResponse, competitor, productCategory } = parseResult.data;

    if (Object.keys(customerResponses).length === 0) {
      return new Response(
        JSON.stringify({ error: 'No customer responses provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const GOOGLE_AI_API_KEY = requireApiKey();

    // Build context from questions and responses
    const qaPairs = questions.map((q: string, idx: number) => {
      const response = customerResponses[idx.toString()] || "No response provided";
      return `Q${idx + 1}: ${sanitizeForPrompt(q)}\nCustomer Response: ${sanitizeForPrompt(response)}`;
    }).join('\n\n');

    const systemPrompt = `You are an expert AT&T sales coach helping reps respond to competitive situations.
Based on the customer's responses to discovery questions, provide a tailored recommendation on how to proceed.

IMPORTANT: Lead with AT&T's strengths, then balance by challenging competitor claims to differentiate.

Structure your response with these exact headers:

## 1. AT&T Strengths to Lead With
Highlight 2-3 key AT&T advantages that directly address the customer's stated needs and priorities. Be specific about how these strengths solve their problems.

## 2. Customer Insights Analysis
What do the customer's responses reveal about their true needs, concerns, and decision criteria?

## 3. Competitor Claim Challenges
Identify gaps or weaknesses in the competitor's offer. Frame questions or points that expose these weaknesses without being negative—focus on what the customer should consider.

## 4. Refined Response Strategy
Provide a tailored approach for this specific customer, combining AT&T's strengths with addressing their concerns.

## 5. RECOMMENDED NEXT STEPS
[This section should stand out as actionable items]
Provide 3-4 specific, concrete next steps for the sales conversation. Format as a numbered list with clear actions.

Be concise, actionable, and focused on winning the deal.`;

    const userPrompt = `Original Competitor Claim: "${sanitizeForPrompt(claim)}"
${competitor ? `Competitor: ${sanitizeForPrompt(competitor)}` : ''}
${productCategory ? `Product Category: ${sanitizeForPrompt(productCategory)}` : ''}

Original Suggested Response: "${suggestedResponse ? sanitizeForPrompt(suggestedResponse) : 'Not provided'}"

Customer Discovery Q&A:
${qaPairs}

Based on the customer's responses, provide a tailored recommendation for how to proceed with this sales opportunity.`;

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
    const recommendation = data.choices?.[0]?.message?.content;

    return new Response(
      JSON.stringify({ recommendation }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error generating recommendation:', error);
    const corsHeaders = getCorsHeaders(req);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate recommendation';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
