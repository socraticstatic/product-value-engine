/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode } from 'react';

export type PlaceholderSection = 
  | 'value-proposition'
  | 'talking-points'
  | 'objection-handling'
  | 'competitive-intel'
  | 'product-recommendation'
  | 'customer-profile'
  | 'bundle-summary'
  | 'bundle-synergies'
  | 'persona-fit'
  | 'segment-analysis'
  | 'feature-analysis'
  | 'product-details'
  | 'use-cases'
  | 'empathetic-opener'
  | 'need-match'
  | 'competitor-comparison'
  | 'objection-item'
  | 'talking-point-item'
  | 'product-card'
  | 'pain-point-badge'
  | 'priority-badge'
  | 'business-description'
  | 'feature-impact'
  | 'synergy-item'
  | 'persona-card'
  | 'segment-card';

export interface PlaceholderContent {
  title: string;
  description: string;
  bullets: string[];
  footer?: string;
  example?: string;
  inlineDescription?: string;
}

const placeholderDefinitions: Record<PlaceholderSection, PlaceholderContent> = {
  'value-proposition': {
    title: 'Value Proposition',
    description: 'This section will generate a personalized value proposition that:',
    bullets: [
      'Opens with an empathetic statement acknowledging the customer\'s specific pain points',
      'Connects AT&T solutions to their stated business priorities',
      'Uses industry-specific language and terminology',
      'Quantifies benefits where possible (uptime %, cost savings)',
      'Concludes with a clear differentiator vs. current provider'
    ],
    footer: 'Content is dynamically generated based on: industry, business description, pain points, priorities, and recommended products.',
    example: '"I understand that downtime is costing your restaurant group real money. With AT&T Business Fiber, you get 99.9% uptime SLA..."',
    inlineDescription: 'AI-generated value proposition tailored to customer pain points and industry',
  },
  'talking-points': {
    title: 'Talking Points',
    description: 'This section will provide conversation starters that:',
    bullets: [
      'Map to Business Grade messaging pillars (Reliable, Secure, Simple)',
      'Address the customer\'s specific challenges using their language',
      'Include discovery questions to deepen the conversation',
      'Provide proof points and statistics relevant to their industry',
      'Guide the conversation toward recommended solutions'
    ],
    footer: 'Talking points are prioritized based on customer pain points and priorities.',
    example: '"When network issues impact your business, every minute matters—that\'s why our 24/7 support team is just a call away."',
    inlineDescription: 'Contextual conversation starters based on Business Grade pillars',
  },
  'objection-handling': {
    title: 'Objection Handling',
    description: 'This section will list common objections with responses:',
    bullets: [
      'Price objections with value-based rebuttals',
      'Competitor comparisons with differentiators',
      'Technical concerns with capability explanations',
      'Timing/urgency objections with cost-of-delay messaging',
      'Contract/commitment concerns with flexibility options'
    ],
    footer: 'Objections are specific to the recommended products and customer profile.',
    example: 'Objection: "Your prices are higher than the competition." Response: "Let me show you the total cost of ownership..."',
    inlineDescription: 'Common objections with prepared responses',
  },
  'competitive-intel': {
    title: 'Competitive Intelligence',
    description: 'This section will display competitive intelligence including:',
    bullets: [
      'The AT&T Guarantee differentiator',
      'Side-by-side comparisons with selected competitors',
      'Win themes highlighting AT&T advantages',
      'Caution areas where competitors may have perceived strengths',
      'Hidden costs and fine print warnings'
    ],
    footer: 'Competitor comparisons are product-specific and can be filtered by competitor.',
    example: 'AT&T vs Comcast: "AT&T offers true fiber with symmetric speeds; Comcast uses hybrid fiber-coax..."',
    inlineDescription: 'Side-by-side competitor comparisons with win themes',
  },
  'product-recommendation': {
    title: 'Recommended Solutions',
    description: 'This section will display AI-recommended products:',
    bullets: [
      'Products matched to customer pain points and priorities',
      'Feature-to-benefit translations for their industry',
      'Business Grade pillar alignment indicators',
      'Pricing and package information',
      'Links to detailed solution information'
    ],
    footer: 'Recommendations are scored based on customer profile matching algorithms.',
    example: 'AT&T Business Fiber - $89/mo | Matches: Reliability priority, Downtime pain point',
    inlineDescription: 'Products matched to customer needs with pricing',
  },
  'customer-profile': {
    title: 'Customer Profile',
    description: 'This section will summarize the customer\'s context:',
    bullets: [
      'Business type, industry, and employee count',
      'Current provider and switching motivations',
      'Stated pain points with business impact analysis',
      'Key priorities and success metrics',
      'Budget orientation and decision-making style'
    ],
    footer: 'Profile data drives all personalization throughout the battlecard.',
    example: 'Restaurant Group | 25 employees | 3 locations | Current: Comcast | Pain: Downtime',
    inlineDescription: 'Customer business context and needs summary',
  },
  'bundle-summary': {
    title: 'Solution Summary',
    description: 'This section will summarize the selected multi-product solution:',
    bullets: [
      'Total monthly cost and individual product pricing',
      'Target customer segments for the solution',
      'Combined feature list across all products',
      'Value proposition count and coverage'
    ],
    footer: 'Summary updates automatically as products are added or removed.',
    example: 'Solution: Fiber + VoIP + Security = $199/mo | Best for: Multi-location retail',
    inlineDescription: 'Solution pricing and target segment analysis',
  },
  'bundle-synergies': {
    title: 'Multi-Product Synergies',
    description: 'This section will highlight multi-product advantages:',
    bullets: [
      'Cross-product integration benefits',
      'Simplified billing and single vendor advantages',
      'Combined support and service level benefits',
      'Potential cost savings from multi-product solutions'
    ],
    footer: 'Synergies are calculated based on product compatibility and customer needs.',
    example: 'Fiber + VoIP: Crystal-clear HD voice quality over dedicated fiber connection',
    inlineDescription: 'Cross-product integration benefits',
  },
  'persona-fit': {
    title: 'Persona Fit Analysis',
    description: 'This section will show product-persona alignment:',
    bullets: [
      'Overall fit score for each customer persona',
      'Needs alignment percentage',
      'Pain point match analysis',
      'Product affinity and budget fit indicators',
      'Detailed reasoning for each fit assessment'
    ],
    footer: 'Personas are based on real customer archetypes and buying behaviors.',
    example: 'Jennifer Chen (Brewpub Owner) - 87% fit | Matches: Multi-location, Growth-focused',
    inlineDescription: 'Product-persona alignment scores',
  },
  'segment-analysis': {
    title: 'Segment Fit Analysis',
    description: 'This section will analyze market segment alignment:',
    bullets: [
      'Fit breakdown by buying behavior dimension',
      'Value tier alignment across segments',
      'Decision style compatibility',
      'Mindset and primary need matching',
      'Top personas within each segment'
    ],
    footer: 'Analysis helps identify best-fit target markets for the selected products.',
    example: 'Small, Scale IT (Segment 4): 82% fit | Decision: Owner with IT | Budget: <$50K',
    inlineDescription: 'Market segment alignment by buying behavior',
  },
  'feature-analysis': {
    title: 'Feature Analysis',
    description: 'This section will assess feature relevance:',
    bullets: [
      'Feature importance by persona segment',
      'Competitive positioning of each feature',
      'Gap analysis against market needs',
      'Feature-to-benefit translations'
    ],
    footer: 'Analysis helps prioritize feature messaging for different audiences.',
    example: '99.9% Uptime SLA → Critical for manufacturing (avoids $50K/hr downtime costs)',
    inlineDescription: 'Feature importance and competitive positioning',
  },
  'product-details': {
    title: 'Product Details',
    description: 'This section will display comprehensive product information:',
    bullets: [
      'Full feature list with descriptions',
      'Value propositions and key messages',
      'Target use cases and best-fit scenarios',
      'Market differentiators and competitive advantages',
      'Business vs. consumer differentiators'
    ],
    footer: 'Details are sourced from the product catalog and updated regularly.',
    example: 'AT&T Business Fiber: Symmetric speeds up to 5 Gbps, 99.9% uptime SLA...',
    inlineDescription: 'Comprehensive product features and differentiators',
  },
  'use-cases': {
    title: 'Target Use Cases',
    description: 'This section will display ideal customer scenarios:',
    bullets: [
      'Business situations where product excels',
      'Industry-specific applications',
      'Problem-solution mappings',
      'Success story references'
    ],
    footer: 'Use cases help reps identify qualified opportunities.',
    example: 'Best for: Multi-location retail needing reliable POS connectivity',
    inlineDescription: 'Ideal customer scenarios and applications',
  },
  // Inline placeholder types for individual content items
  'empathetic-opener': {
    title: 'Empathetic Opener',
    description: 'An opening statement that acknowledges the customer\'s pain point',
    bullets: [],
    example: '"I understand that network downtime is directly impacting your restaurant operations..."',
    inlineDescription: 'Personalized opening statement acknowledging customer pain',
  },
  'need-match': {
    title: 'Need Match',
    description: 'Shows how product features align with customer needs',
    bullets: [],
    example: 'Your priority: Reliability → Our solution: 99.9% uptime SLA with financial guarantee',
    inlineDescription: 'Feature-to-need alignment',
  },
  'competitor-comparison': {
    title: 'Competitor Comparison',
    description: 'Side-by-side comparison with a specific competitor',
    bullets: [],
    example: 'AT&T: True fiber, symmetric speeds | Comcast: Hybrid coax, asymmetric',
    inlineDescription: 'Feature comparison with competitor',
  },
  'objection-item': {
    title: 'Objection Response',
    description: 'A specific objection with its prepared response',
    bullets: [],
    example: '"Too expensive" → "Let me show you the TCO including downtime costs..."',
    inlineDescription: 'Objection with prepared response',
  },
  'talking-point-item': {
    title: 'Talking Point',
    description: 'A conversation starter tied to customer needs',
    bullets: [],
    example: '"For a multi-location business like yours, having one reliable provider means less complexity..."',
    inlineDescription: 'Need-based conversation starter',
  },
  'product-card': {
    title: 'Product Card',
    description: 'Product recommendation with pricing and fit score',
    bullets: [],
    example: 'AT&T Business Fiber - $89/mo | 92% match | Addresses: Reliability, Speed',
    inlineDescription: 'Product with pricing and customer fit',
  },
  'pain-point-badge': {
    title: 'Pain Point',
    description: 'Customer pain point indicator',
    bullets: [],
    example: '⚠️ Frequent Downtime',
    inlineDescription: 'Customer challenge tag',
  },
  'priority-badge': {
    title: 'Priority',
    description: 'Customer priority indicator',
    bullets: [],
    example: '★ Reliability',
    inlineDescription: 'Customer priority tag',
  },
  'business-description': {
    title: 'Business Description',
    description: 'Brief summary of the customer\'s business',
    bullets: [],
    example: 'Multi-location restaurant group with 3 locations and 45 employees',
    inlineDescription: 'Customer business summary',
  },
  'feature-impact': {
    title: 'Feature Impact',
    description: 'How a feature translates to business value',
    bullets: [],
    example: '99.9% Uptime → Keeps your POS systems running during peak hours',
    inlineDescription: 'Feature-to-business-value translation',
  },
  'synergy-item': {
    title: 'Multi-Product Synergy',
    description: 'Cross-product benefit from combining solutions',
    bullets: [],
    example: 'Fiber + VoIP: HD voice quality over dedicated connection',
    inlineDescription: 'Cross-product integration benefit',
  },
  'persona-card': {
    title: 'Persona Card',
    description: 'Customer persona with fit analysis',
    bullets: [],
    example: 'Jennifer Chen (Brewpub) - 87% fit | Growth-focused, Multi-location',
    inlineDescription: 'Persona with product fit score',
  },
  'segment-card': {
    title: 'Segment Card',
    description: 'Market segment with alignment analysis',
    bullets: [],
    example: 'Small, Scale IT - 82% fit | 401K businesses | Owner with IT decision',
    inlineDescription: 'Segment with product alignment',
  },
};

interface DemoModeContextType {
  isDemoMode: boolean;
  toggleDemoMode: () => void;
  getPlaceholder: (section: PlaceholderSection) => PlaceholderContent;
}

const DemoModeContext = createContext<DemoModeContextType | undefined>(undefined);

export function DemoModeProvider({ children }: { children: ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(false);

  const toggleDemoMode = () => {
    setIsDemoMode(prev => !prev);
  };

  const getPlaceholder = (section: PlaceholderSection): PlaceholderContent => {
    return placeholderDefinitions[section];
  };

  return (
    <DemoModeContext.Provider value={{ isDemoMode, toggleDemoMode, getPlaceholder }}>
      {children}
    </DemoModeContext.Provider>
  );
}

export function useDemoMode() {
  const context = useContext(DemoModeContext);
  if (context === undefined) {
    throw new Error('useDemoMode must be used within a DemoModeProvider');
  }
  return context;
}
