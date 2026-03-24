import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getCorsHeaders, handleCors, sanitizeForPrompt, sanitizeArrayForPrompt, requireApiKey, handleAiGatewayError, errorResponse } from "../_shared/security.ts";

interface BusinessProfile {
  companyName: string;
  industry: string;
  businessSize: string;
  locations: string;
  painPoints: string[];
  priorities: string[];
  additionalContext: string;
}

const AT_T_PRODUCTS = [
  { id: 'business-fiber-300m', name: 'AT&T Business Fiber 300M', category: 'Connectivity', price: '$70/mo' },
  { id: 'business-fiber-1g', name: 'AT&T Business Fiber 1 GIG', category: 'Connectivity', price: '$160/mo' },
  { id: 'business-fiber-5g', name: 'AT&T Business Fiber 5 GIG', category: 'Connectivity', price: '$285/mo' },
  { id: 'hsia-enterprise', name: 'AT&T HSIA-E (Multi-Location)', category: 'Enterprise Connectivity', price: 'Custom' },
  { id: 'internet-air-business', name: 'AT&T Internet Air for Business', category: 'Wireless Backup', price: '$60/mo' },
  { id: '24hour-internet-500m', name: '24 Hour Internet 500M', category: '24-Hour Internet', price: '$120/mo' },
  { id: '24hour-internet-1g', name: '24 Hour Internet 1 GIG', category: '24-Hour Internet', price: '$180/mo' },
  { id: 'business-voice', name: 'AT&T Business Voice', category: 'Voice', price: '$25/mo per line' },
  { id: 'att-phone-advanced', name: 'AT&T Phone Advanced', category: 'Voice', price: '$40/mo per line' },
  { id: 'business-complete-bundle', name: 'AT&T Business Complete Bundle', category: 'Bundle', price: '$220/mo' },
  { id: 'activearmor-security', name: 'AT&T ActiveArmor', category: 'Security', price: '$15/mo' }
];

serve(async (req) => {
  // Handle CORS preflight
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const corsHeaders = getCorsHeaders(req);
    const GOOGLE_AI_API_KEY = requireApiKey();

    const { profile } = await req.json() as { profile: BusinessProfile };

    if (!profile) {
      return new Response(
        JSON.stringify({ error: 'Business profile is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are an expert AT&T Business Solutions consultant. Analyze the business profile and recommend the most suitable AT&T products based on their needs.

Available AT&T Products:
${AT_T_PRODUCTS.map(p => `- ${p.name} (${p.category}): ${p.price}`).join('\n')}

For each recommendation, provide:
1. Match score (0-100) based on how well the product fits their needs
2. Why this product is recommended for their specific situation
3. Industry-specific use case
4. Estimated savings range
5. Payback period estimate
6. Key value drivers
7. Risk of inaction (what happens if they don't act)
8. Potential annual loss from inaction

Consider:
- Industry: ${sanitizeForPrompt(profile.industry)}
- Business size: ${sanitizeForPrompt(profile.businessSize)}
- Number of locations: ${sanitizeForPrompt(profile.locations)}
- Pain points: ${sanitizeArrayForPrompt(profile.painPoints).join(', ')}
- Priorities: ${sanitizeArrayForPrompt(profile.priorities).join(', ')}
${profile.additionalContext ? `- Additional context: ${sanitizeForPrompt(profile.additionalContext)}` : ''}

Respond with a JSON object containing:
{
  "recommendations": [
    {
      "productName": "Product name",
      "productId": "product-id",
      "category": "Category",
      "matchScore": 95,
      "description": "Brief product description",
      "whyRecommended": "Why this fits their needs",
      "industryUseCase": "Specific use case for their industry",
      "estimatedSavings": "$X,XXX - $XX,XXX annually",
      "paybackPeriod": "X months",
      "valueDrivers": ["driver1", "driver2", "driver3"],
      "riskOfInaction": "What happens if they don't act",
      "potentialLoss": "$XX,XXX annually",
      "riskExamples": ["example1", "example2"]
    }
  ],
  "summary": "Overall analysis summary",
  "industryInsights": "Industry-specific insights"
}

Recommend 2-4 products, ordered by match score. Be specific to their industry and pain points.`;

    const userPrompt = `Analyze this business and recommend AT&T solutions:

Company: ${sanitizeForPrompt(profile.companyName)}
Industry: ${sanitizeForPrompt(profile.industry)}
Size: ${sanitizeForPrompt(profile.businessSize)}
Locations: ${sanitizeForPrompt(profile.locations)}
Pain Points: ${sanitizeArrayForPrompt(profile.painPoints).join(', ')}
Priorities: ${sanitizeArrayForPrompt(profile.priorities).join(', ')}
${profile.additionalContext ? `Additional Notes: ${sanitizeForPrompt(profile.additionalContext)}` : ''}`;

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
        temperature: 0.7,
        max_tokens: 2000
      }),
    });

    const gatewayError = handleAiGatewayError(response, corsHeaders);
    if (gatewayError) return gatewayError;

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse JSON from the response (handle markdown code blocks)
    let parsedContent;
    try {
      // Try to extract JSON from markdown code blocks
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      const jsonString = jsonMatch ? jsonMatch[1].trim() : content.trim();
      parsedContent = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("Failed to parse AI response");
      // Return a fallback response
      parsedContent = {
        recommendations: [
          {
            productName: "AT&T Business Fiber 1 GIG",
            productId: "business-fiber-1g",
            category: "Connectivity",
            matchScore: 85,
            description: "High-speed fiber internet with built-in 5G backup",
            whyRecommended: "Based on your reliability and speed priorities",
            industryUseCase: `Ideal for ${sanitizeForPrompt(profile.industry)} businesses needing consistent connectivity`,
            estimatedSavings: "$15,000 - $30,000 annually",
            paybackPeriod: "6-8 months",
            valueDrivers: ["99.9% reliability", "Built-in 5G backup", "Symmetrical speeds"],
            riskOfInaction: "Continued downtime and productivity losses",
            potentialLoss: "$25,000 annually",
            riskExamples: ["Network outages during peak hours", "Lost customer transactions"]
          }
        ],
        summary: "Based on your profile, we recommend solutions focused on reliability and performance.",
        industryInsights: `${sanitizeForPrompt(profile.industry)} businesses typically see significant ROI from improved connectivity.`
      };
    }

    return new Response(
      JSON.stringify(parsedContent),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in analyze-business:", error);
    const corsHeaders = getCorsHeaders(req);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
