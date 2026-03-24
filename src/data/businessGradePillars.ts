// Business Grade Strategy - 5 Pillars
// Defined by Customers. Backed by Research. Delivered Together.

export interface BusinessGradePillar {
  id: string;
  name: string;
  customerVoice: string; // What customers say they want
  description: string;
  proofPoints: string[];
  mustHave: string[];
  highlyDesired: string[];
  niceToHave: string[];
  keyPhrases: string[]; // Phrases sellers should use
  keywords: string[]; // For matching to customer needs
}

export const businessGradePillars: BusinessGradePillar[] = [
  {
    id: 'always-connected',
    name: 'Always Connected',
    customerVoice: 'I want everything to work, everywhere, all the time.',
    description: 'Reliable connectivity that never lets your business down, from headquarters to remote locations.',
    proofPoints: [
      'Connectivity resilience for hard-to-reach, remote, or outage-prone locations',
      'Priority over consumers and lower-paying business devices',
      'Consistent connection & speed available nationwide'
    ],
    mustHave: [
      'Fast enough downloads (+300Mbps shared, +20Mbps DIA)',
      'Available where needed - everywhere you live and work, all company locations'
    ],
    highlyDesired: [
      'Fast upload speeds (+300Mbps shared, +20Mbps DIA)',
      'Built-in backup with automatic failover in case of outages',
      'Works during peak times with consistent performance regardless of congestion'
    ],
    niceToHave: [
      'Symmetrical speeds up to 5Gbps',
      'At or near equal download & upload speeds'
    ],
    keyPhrases: [
      'Business-grade connectivity that works everywhere, all the time',
      'Your business gets priority over consumer traffic',
      'Built-in backup means you never go offline',
      'Consistent speeds even during peak hours',
      'Coverage where other providers can\'t reach'
    ],
    keywords: ['reliable', 'uptime', 'backup', 'failover', 'speed', 'coverage', 'availability', 'downtime', 'connectivity']
  },
  {
    id: 'always-secure',
    name: 'Always Secure',
    customerVoice: 'I want to feel safe, so I don\'t have to think about threats.',
    description: 'Security that\'s embedded in the network, protecting your business without complexity.',
    proofPoints: [
      'Embedded security with AI-powered threat mitigation to block threats before they reach your network or devices',
      'Fraud prevention tools that provide protection from SPAM, phishing, and spoofing'
    ],
    mustHave: [
      'Modern encryption with latest protocols (WPA, AES) to enforce data privacy & restrict access',
      'Reputation & trustworthiness - customers avoid unknown brands or frequent breach headlines'
    ],
    highlyDesired: [
      'Domain expertise with deep insight into threats, paired with effective mitigation tools'
    ],
    niceToHave: [
      'Common security fabric for holistic threat prevention, detection and response across all endpoints',
      'Zero trust application access for secure identity validation',
      'Integration with pure play providers (SASE, UEM, etc.)'
    ],
    keyPhrases: [
      'Security embedded in the network, not bolted on top',
      'AI-powered threat blocking before threats reach you',
      'Protection without complexity',
      'You literally cannot secure a network you don\'t own',
      '150 years of trusted AT&T security expertise'
    ],
    keywords: ['security', 'secure', 'threat', 'protection', 'encrypted', 'safe', 'breach', 'compliance', 'fraud']
  },
  {
    id: 'effortlessly-simple',
    name: 'Effortlessly Simple',
    customerVoice: 'Easy to setup and integrate with my tech stack.',
    description: 'Products that work together seamlessly, reducing IT burden and management complexity.',
    proofPoints: [
      'Uniquely converged - the combination of AT&T products delivers added value beyond standalone use',
      'Unified experience to manage multiple AT&T products through a single pane of glass'
    ],
    mustHave: [
      'Ease of setup with intuitive configuration to minimize IT burden, pro install available if needed',
      'Management portal for configuration, visibility, and control'
    ],
    highlyDesired: [
      'Cross-product intelligence where products share data and context to improve performance',
      'Consistent design so experiences feel familiar across products to reduce learning curves'
    ],
    niceToHave: [
      'Works with your tech - products integrate with other business tech (Webex, Teams, etc.)',
      'External UX control through 3rd-party platforms',
      'Network APIs for customers and partners to build on AT&T capabilities'
    ],
    keyPhrases: [
      'Setup in minutes, not weeks',
      'One portal to manage everything',
      'Products that work together, not against each other',
      'Reduce IT burden with intuitive management',
      'Seamlessly integrates with your existing tech stack'
    ],
    keywords: ['simple', 'easy', 'setup', 'integrate', 'manage', 'portal', 'unified', 'consolidate', 'one provider']
  },
  {
    id: 'expert-support',
    name: 'Expert Support',
    customerVoice: 'Tools for visibility & control, AND proactive, automated resolutions. I want it ALL.',
    description: 'Support that goes beyond reactive help to proactive, intelligent resolution.',
    proofPoints: [
      'Holistic support with a single front door for support across all products - no silos',
      'Self-service tools with access to how-to content and digital support options',
      'Live support access with an easy path to talk to a person when digital tools don\'t solve the issue'
    ],
    mustHave: [
      'Single front door for support across all products',
      'Self-service tools and digital support options',
      'Live support access when needed'
    ],
    highlyDesired: [
      'Assigned support team linked to the business',
      'Co-management model: self-managed but with AT&T as a partner',
      'Self-reporting issues with alerts when issues occur'
    ],
    niceToHave: [
      'Dedicated account team assigned only to the business',
      'Fully managed solutions inclusive of AT&T & 3rd party products',
      'Zero-touch provisioning based on business profile'
    ],
    keyPhrases: [
      '24/7 business-priority support, not consumer wait times',
      'One number to call for all your services',
      'Proactive alerts before problems become outages',
      'Expert support backed by 150 years of experience',
      'We\'re your partner, not just a vendor'
    ],
    keywords: ['support', '24/7', 'help', 'service', 'response', 'resolution', 'dedicated', 'partner', 'managed']
  },
  {
    id: 'best-value',
    name: 'Best Value',
    customerVoice: 'I can\'t get a better value for my money. Switching would be a downgrade.',
    description: 'Transparent pricing with no hidden fees, delivering more value than competitors.',
    proofPoints: [
      'Transparent pricing with clear, predictable costs and no hidden fees or surprise charges',
      'Value over competitors with exclusive benefits, better experiences, or lowest price',
      'Custom pricing tailored based on usage, footprint, and business priorities'
    ],
    mustHave: [
      'Transparent pricing with no hidden fees or surprise charges',
      'Value over competitors through exclusive benefits or better experiences',
      'Custom pricing based on usage and business priorities'
    ],
    highlyDesired: [
      'Embedded finance options with financing, leasing, or subscription models',
      'Cost optimization insights with recommendations to reduce spend based on usage',
      'Multi-AT&T product discounts - buying more AT&T products is a better value'
    ],
    niceToHave: [
      'Performance-based discounts for uptime, usage, or loyalty',
      'Multi-product discounts with 3rd-party products',
      'ROI visibility tools showing how AT&T services drive business outcomes'
    ],
    keyPhrases: [
      'Transparent pricing with no hidden fees or surprises',
      'Bundle and save more than piecing together services',
      'Switching to competitors would be a downgrade',
      'More value for your money than any alternative',
      'The AT&T Guarantee backs our commitment to you'
    ],
    keywords: ['price', 'cost', 'value', 'budget', 'save', 'affordable', 'expensive', 'hidden fees', 'bundle']
  }
];

// Get pillar by ID
export const getBusinessGradePillar = (pillarId: string): BusinessGradePillar | undefined => {
  return businessGradePillars.find(p => p.id === pillarId);
};

// Get relevant pillars based on keywords from customer needs
export const getRelevantPillars = (needs: string[]): BusinessGradePillar[] => {
  const needsLower = needs.map(n => n.toLowerCase()).join(' ');
  return businessGradePillars.filter(pillar => 
    pillar.keywords.some(kw => needsLower.includes(kw))
  );
};

// Get key phrase for a specific need
export const getKeyPhraseForNeed = (need: string): string | undefined => {
  const needLower = need.toLowerCase();
  for (const pillar of businessGradePillars) {
    if (pillar.keywords.some(kw => needLower.includes(kw))) {
      return pillar.keyPhrases[Math.floor(Math.random() * pillar.keyPhrases.length)];
    }
  }
  return undefined;
};

// Map pain points to business grade pillars
export const painPointToPillarMap: Record<string, string> = {
  'slow-speeds': 'always-connected',
  'downtime': 'always-connected',
  'security-concerns': 'always-secure',
  'high-costs': 'best-value',
  'multiple-vendors': 'effortlessly-simple',
  'poor-support': 'expert-support',
  'legacy-systems': 'effortlessly-simple',
  'compliance': 'always-secure',
  'scalability-limits': 'always-connected',
  'no-backup': 'always-connected',
};

// Map priorities to business grade pillars
export const priorityToPillarMap: Record<string, string> = {
  'reliability': 'always-connected',
  'security': 'always-secure',
  'speed': 'always-connected',
  'scalability': 'always-connected',
  'cost-savings': 'best-value',
  'remote-work': 'always-connected',
  'unified-comms': 'effortlessly-simple',
  'iot': 'always-connected',
  'backup-failover': 'always-connected',
  'mobility': 'always-connected',
};

// Get the best key phrase based on customer pain point or priority
export const getBestKeyPhrase = (needId: string, needType: 'painPoint' | 'priority'): string => {
  const pillarId = needType === 'painPoint' 
    ? painPointToPillarMap[needId] 
    : priorityToPillarMap[needId];
  
  if (pillarId) {
    const pillar = getBusinessGradePillar(pillarId);
    if (pillar) {
      return pillar.keyPhrases[0]; // Return the first (best) key phrase
    }
  }
  
  // Default fallback
  return 'AT&T delivers business-grade solutions designed for your success.';
};

// Core Business Grade messaging
export const businessGradeCore = {
  statement: 'AT&T is THE provider of Business-Grade Solutions',
  tagline: 'Defined by Customers. Backed by Research. Delivered Together.',
  pillars: businessGradePillars.map(p => ({
    id: p.id,
    name: p.name,
    customerVoice: p.customerVoice
  }))
};
