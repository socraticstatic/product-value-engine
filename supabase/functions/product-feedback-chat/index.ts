import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation schemas
const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  price: z.string(),
  monthlyPrice: z.number(),
  features: z.array(z.string()),
  valueProps: z.array(z.string()),
});

const personaSchema = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string(),
  company: z.string(),
  industry: z.string(),
  employeeCount: z.string().optional(),
  locations: z.string().optional(),
  revenue: z.string().optional(),
  techBudget: z.string().optional(),
  techSophistication: z.string().optional(),
  topNeeds: z.array(z.object({
    need: z.string(),
    importance: z.number(),
  })).optional(),
  painPoints: z.array(z.string()).optional(),
  quote: z.string().optional(),
  valueTier: z.string().optional(),
  buyingBehavior: z.string().optional(),
  mindset: z.string().optional(),
});

const requestSchema = z.object({
  persona: personaSchema,
  products: z.array(productSchema),
  focusArea: z.enum(['features', 'pricing', 'comparison', 'overall']),
  competitorContext: z.string().optional(),
  specificQuestion: z.string().optional(),
  messages: z.array(z.object({
    role: z.enum(["user", "assistant", "system"]),
    content: z.string(),
  })).optional(),
  isStart: z.boolean().optional(),
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawBody = await req.json();
    const parseResult = requestSchema.safeParse(rawBody);
    
    if (!parseResult.success) {
      return new Response(
        JSON.stringify({ error: "Invalid input", details: parseResult.error.flatten() }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const { persona, products, focusArea, competitorContext, specificQuestion, messages, isStart } = parseResult.data;
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Product feedback request for persona:", persona.name, "products:", products.map(p => p.name).join(', '));

    // Build product descriptions
    const productDescriptions = products.map(p => 
      `**${p.name}** ($${p.monthlyPrice}/mo):\n` +
      `- Features: ${p.features.slice(0, 4).join('; ')}\n` +
      `- Value Props: ${p.valueProps.slice(0, 3).join('; ')}`
    ).join('\n\n');

    // Build needs section
    const topNeedsSection = persona.topNeeds 
      ? persona.topNeeds.map((n, i) => `${i + 1}. ${n.need} (${n.importance}% importance)`).join('\n')
      : 'No specific needs defined';
    
    const painPointsSection = persona.painPoints 
      ? persona.painPoints.map(p => `- ${p}`).join('\n')
      : 'No specific pain points defined';

    // Focus area specific instructions - oriented toward product strategy research
    const focusInstructions = {
      features: `Focus your feedback on the specific FEATURES of the products from a product strategy perspective. Provide insight on:
- Which features directly address your critical business needs
- Which features seem like unnecessary complexity for your use case
- What capabilities are missing that would make this product compelling
- How the feature set compares to what you'd expect for your business size`,
      pricing: `Focus your feedback on the PRICING and VALUE perception:
- How does the pricing align with your budget expectations and tech investment strategy?
- Do you perceive the value proposition as justified for the cost?
- What pricing concerns or questions would you raise in an evaluation?
- How does the price-to-value ratio compare to alternatives you've considered?`,
      comparison: `Compare these products to ${competitorContext || 'other solutions you\'ve evaluated'}:
- What makes these products stand out or fall short versus alternatives?
- Where might competitors have a positioning advantage?
- What would you need to see to choose this solution over alternatives?
- What claims or differentiators resonate most with your needs?`,
      overall: `Provide holistic feedback on this product's market positioning:
- Does this solution feel designed for businesses like yours?
- What's your biggest concern or hesitation as a potential evaluator?
- What messaging or positioning would strengthen your confidence?
- How well does the overall value proposition align with your priorities?`,
    };

    const systemPrompt = `You are role-playing as ${persona.name}, a prospective CUSTOMER being interviewed for product research and feedback.

## CRITICAL ROLE INSTRUCTIONS:
- You are being interviewed as a potential BUYER/CUSTOMER to help product teams understand market needs
- Provide honest, constructive feedback that would help a Product Manager improve their offering
- Be specific and actionable in your feedback - vague responses aren't helpful for product strategy
- Stay in character based on your profile, reflecting real concerns and priorities
- You are evaluating product offerings and providing genuine feedback
- Be constructive but honest - express real concerns a customer would have
- Stay in character based on your profile

## Your Character Profile:
- **Name**: ${persona.name}
- **Title**: ${persona.title}
- **Company**: ${persona.company}
- **Industry**: ${persona.industry}
- **Employees**: ${persona.employeeCount || 'Not specified'}
- **Tech Budget**: ${persona.techBudget || 'Not specified'}
- **Tech Sophistication**: ${persona.techSophistication || 'medium'}
- **Buying Behavior**: ${persona.buyingBehavior || 'Not specified'}
- **Mindset**: ${persona.mindset || 'Not specified'}
- **Value Tier**: ${persona.valueTier || 'Not specified'}

## Your Top Needs:
${topNeedsSection}

## Your Pain Points:
${painPointsSection}

## Your Quote/Mindset:
"${persona.quote || 'Looking for the best value for my business.'}"

## Products Being Evaluated:
${productDescriptions}

## Focus Area Instructions:
${focusInstructions[focusArea]}

## Response Guidelines:
1. Respond AS the customer persona - use "I", "my business", "we" etc.
2. Reference your specific needs and pain points in your feedback
3. Be specific about which features/aspects you're reacting to
4. Express genuine reactions: interest, concern, confusion, enthusiasm
5. Ask clarifying questions a real evaluator would ask
6. Consider your budget constraints and technical sophistication
7. Keep responses conversational but substantive (3-6 sentences typically)
8. Provide the kind of honest feedback that helps Product Managers improve offerings
9. Don't just criticize - explain what would make the product more compelling

${specificQuestion ? `\n## Specific Question to Address:\n${specificQuestion}` : ''}
${competitorContext ? `\n## Competitor Context:\nYou're comparing this to ${competitorContext}. Reference this in your feedback.` : ''}

Remember: You are ${persona.name}, evaluating these products for your ${persona.industry} business.`;

    // Build messages array
    const chatMessages: { role: string; content: string }[] = [
      { role: "system", content: systemPrompt },
    ];

    if (isStart) {
      chatMessages.push({ 
        role: "user", 
        content: specificQuestion 
          ? specificQuestion 
          : `You're being presented with the following product(s): ${products.map(p => p.name).join(', ')}. Please share your initial reaction and feedback from your perspective as a ${persona.industry} business owner.`
      });
    } else if (messages && messages.length > 0) {
      chatMessages.push(...messages);
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: chatMessages,
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits in workspace settings." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service temporarily unavailable" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Product feedback chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
