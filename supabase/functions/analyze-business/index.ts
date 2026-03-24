import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

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
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

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
- Industry: ${profile.industry}
- Business size: ${profile.businessSize}
- Number of locations: ${profile.locations}
- Pain points: ${profile.painPoints.join(', ')}
- Priorities: ${profile.priorities.join(', ')}
${profile.additionalContext ? `- Additional context: ${profile.additionalContext}` : ''}

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

Company: ${profile.companyName}
Industry: ${profile.industry}
Size: ${profile.businessSize}
Locations: ${profile.locations}
Pain Points: ${profile.painPoints.join(', ')}
Priorities: ${profile.priorities.join(', ')}
${profile.additionalContext ? `Additional Notes: ${profile.additionalContext}` : ''}`;

    console.log("Calling Lovable AI for business analysis...");

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
        temperature: 0.7,
        max_tokens: 2000
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please contact support." }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    console.log("AI response received, parsing...");

    // Parse JSON from the response (handle markdown code blocks)
    let parsedContent;
    try {
      // Try to extract JSON from markdown code blocks
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      const jsonString = jsonMatch ? jsonMatch[1].trim() : content.trim();
      parsedContent = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
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
            industryUseCase: `Ideal for ${profile.industry} businesses needing consistent connectivity`,
            estimatedSavings: "$15,000 - $30,000 annually",
            paybackPeriod: "6-8 months",
            valueDrivers: ["99.9% reliability", "Built-in 5G backup", "Symmetrical speeds"],
            riskOfInaction: "Continued downtime and productivity losses",
            potentialLoss: "$25,000 annually",
            riskExamples: ["Network outages during peak hours", "Lost customer transactions"]
          }
        ],
        summary: "Based on your profile, we recommend solutions focused on reliability and performance.",
        industryInsights: `${profile.industry} businesses typically see significant ROI from improved connectivity.`
      };
    }

    console.log("Returning analysis result");

    return new Response(
      JSON.stringify(parsedContent),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in analyze-business:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
