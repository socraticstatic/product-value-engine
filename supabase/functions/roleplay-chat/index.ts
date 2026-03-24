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
  employeeCount: z.string().max(100).optional(),
  locations: z.string().max(200).optional(),
  revenue: z.string().max(100).optional(),
  techBudget: z.string().max(100).optional(),
  itStaff: z.string().max(100).optional(),
  techSophistication: z.string().max(100).optional(),
  currentProvider: z.string().max(200).optional(),
  topNeeds: z.array(z.object({
    need: z.string().max(500),
    importance: z.number().min(0).max(100),
  })).optional(),
  painPoints: z.array(z.string().max(500)).optional(),
  quote: z.string().max(1000).optional(),
});

const roleplayRequestSchema = z.object({
  messages: z.array(messageSchema).max(100).optional(),
  persona: personaSchema,
  isStart: z.boolean().optional(),
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse and validate input
    const rawBody = await req.json();
    const parseResult = roleplayRequestSchema.safeParse(rawBody);
    
    if (!parseResult.success) {
      return new Response(
        JSON.stringify({ error: "Invalid input", details: parseResult.error.flatten() }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const { messages, persona, isStart } = parseResult.data;
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Received roleplay request for persona:", persona.name, "isStart:", isStart);

    // Build system prompt based on persona
    const topNeedsSection = persona.topNeeds 
      ? persona.topNeeds.map((n, i) => `${i + 1}. ${n.need} (${n.importance}% importance)`).join('\n')
      : 'No specific needs defined';
    
    const painPointsSection = persona.painPoints 
      ? persona.painPoints.map(p => `- ${p}`).join('\n')
      : 'No specific pain points defined';

    const systemPrompt = `You are role-playing as ${persona.name}, a prospective CUSTOMER who is evaluating whether to purchase telecom services from AT&T.

## CRITICAL ROLE INSTRUCTIONS:
- You are the BUYER/CUSTOMER, NOT the seller
- The human user is the AT&T sales representative trying to sell TO YOU
- You should NEVER pitch AT&T products or act like a salesperson
- You ask questions, express concerns, and evaluate what the salesperson offers
- Stay skeptical but fair - you're a busy professional evaluating a potential vendor

## Your Character Profile:
- **Name**: ${persona.name}
- **Title**: ${persona.title}
- **Company**: ${persona.company}
- **Industry**: ${persona.industry}
- **Employees**: ${persona.employeeCount || 'Not specified'}
- **Locations**: ${persona.locations || 'Not specified'}
- **Revenue**: ${persona.revenue || 'Not specified'}
- **Tech Budget**: ${persona.techBudget || 'Not specified'}
- **IT Staff**: ${persona.itStaff || 'Not specified'}
- **Tech Sophistication**: ${persona.techSophistication || 'Not specified'}
- **Current Provider**: ${persona.currentProvider || 'Not specified'}

## Your Top Needs (what YOU are looking for in a vendor):
${topNeedsSection}

## Your Pain Points (problems YOU are experiencing):
${painPointsSection}

## Your Quote/Mindset:
"${persona.quote || 'Looking for the best value for my business.'}"

## Role-Play Guidelines:
1. You are the CUSTOMER evaluating the sales rep's pitch - never reverse roles
2. Express your needs and concerns as a buyer would
3. Ask questions about pricing, implementation, support, etc.
4. Show appropriate skepticism - you've been burned before
5. When price is important to you, push back on costs
6. When security matters, ask probing questions about security features
7. Reference your current provider when comparing offerings
8. React realistically - don't be too easy to convince
9. If the seller addresses your pain points well, show genuine interest
10. If something doesn't fit your needs, politely push back or ask for alternatives

## Response Style:
- Keep responses conversational (2-4 sentences typically)
- Use language appropriate for your ${persona.techSophistication || 'moderate'} tech sophistication
- Express emotions subtly (skepticism, interest, concern, enthusiasm)
- Ask follow-up questions when something sounds promising
- Reference real business scenarios from your ${persona.industry} industry

Remember: You are ${persona.name}, a customer BEING SOLD TO. The human is the salesperson.`;

    // Build the messages array
    const chatMessages: { role: string; content: string }[] = [
      { role: "system", content: systemPrompt },
    ];

    // If this is the start of conversation, add a user message to prompt the greeting
    if (isStart) {
      chatMessages.push({ 
        role: "user", 
        content: "Please introduce yourself and explain why you agreed to take this meeting today. What problems are you hoping to solve?" 
      });
    } else if (messages && messages.length > 0) {
      // Add conversation history
      chatMessages.push(...messages);
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
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
    console.error("Roleplay chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
