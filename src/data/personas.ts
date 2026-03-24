export interface CustomerPersona {
  id: string;
  segmentId: number;
  segmentName: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  avatar: string;
  quote: string;
  
  // Business characteristics
  employeeCount: string;
  locations: string;
  revenue: string;
  techBudget: string;
  itStaff: string;
  
  // Psychographics
  techSophistication: 'low' | 'medium' | 'high';
  decisionMaker: string;
  researchMethod: string;
  influencers: string[];
  
  // Needs & pain points
  topNeeds: { need: string; importance: number }[];
  painPoints: string[];
  currentProvider: string;
  
  // Recommended approach
  leadProducts: string[];
  suggestProducts: string[];
  avoidProducts: string[];
  salesApproach: string;
  keyTalkingPoints: string[];
  objectionsToPrepareFor: string[];
  
  // Multi-dimensional groupings
  valueTier: 'platinum' | 'gold' | 'silver' | 'bronze';
  estimatedAnnualValue: string;
  buyingBehavior: 'early-adopter' | 'risk-averse' | 'price-shopper' | 'relationship-buyer' | 'rfp-driven';
  mindset: 'tech-optimist' | 'tech-skeptic' | 'security-first' | 'growth-focused' | 'efficiency-obsessed';
  primaryNeed: 'connectivity' | 'security' | 'mobility' | 'integration' | 'innovation';
  decisionStyle: 'owner-operator' | 'it-led' | 'c-suite' | 'committee';
  productAffinity: 'internet-first' | 'voice-centric' | 'wireless-heavy' | 'full-stack';
  
  // Market Type (NEW - Enterprise vs SMB)
  marketType?: 'smb' | 'enterprise';
  enterpriseGrouping?: 'healthcare' | 'hospitality' | 'industrials' | 'professional-services' | 'retail' | 'technology';
}

// =============================================================================
// SMB SEGMENT OVERVIEW (from 2025 Segmentation Report)
// =============================================================================
// 
// Segment 1: NoCo-LoCo, Simple IT - 16.4M businesses
//   • FTEs: 1 | IT FTEs: 0 | Locations: 0 (No commercial location)
//   • IT Complexity: Low | Cloud: On-Prem | Decision Maker: Owner
//   • Purchase Cycle: <1 week to 1 month | Channel: Digital
//   • Key Solutions: Broadband, Mobile
//
// Segment 2: Micro, Simple IT - 11.6M businesses  
//   • FTEs: 2-9 | IT FTEs: 1 (51% have 1) | Locations: 1
//   • IT Complexity: Low | Cloud: Single Cloud | Decision Maker: Owner
//   • Purchase Cycle: 1 week to 1 month | Channel: Digital
//   • Key Solutions: Broadband, Mobile, VoIP
//
// Segment 3: Small, Simple IT - 702K businesses
//   • FTEs: 10-50 | IT FTEs: 2-5 (48%) | Locations: 2-5
//   • IT Complexity: Medium | Cloud: Single Cloud | Decision Maker: Owner
//   • Purchase Cycle: 1 week to 1 month | Channel: Digital
//   • Key Solutions: Broadband, VoIP, VPN, Network Security
//
// Segment 4: Small, Scale IT - 401K businesses (TRANSITION POINT)
//   • FTEs: 20-99 | IT FTEs: 5+ (85%) | Locations: 2-5
//   • IT Complexity: Medium | Cloud: Hybrid | Decision Maker: Owner with IT
//   • Purchase Cycle: 1-3 months | Channel: Sales Reps
//   • Key Solutions: VoIP, VPN, Network Security, IoT, Dedicated Internet
//
// Segment 5: Medium, Scale IT - 282K businesses
//   • FTEs: 100-500 | IT FTEs: 5+ (98%) | Locations: 2-9
//   • IT Complexity: High | Cloud: Hybrid | Decision Maker: IT
//   • Purchase Cycle: 1-3 months | Channel: Sales Reps
//   • Key Solutions: DIA, VPN, Network Security, IoT, Cloud Interconnect
//
// Segment 6: Medium, Complex IT - 245K businesses
//   • FTEs: 100-750 | IT FTEs: 10+ (100%) | Locations: 2-9
//   • IT Complexity: High | Cloud: Multi-Cloud/Hybrid | Decision Maker: IT
//   • Purchase Cycle: 1-3 months | Channel: Sales Reps & Indirect
//   • Key Solutions: SD-WAN, Private 5G, Network Edge, Cloud Interconnect
//
// Segment 7: Large, Complex IT - 59K businesses
//   • FTEs: 500-1,999 | IT FTEs: 50+ (51%) | Locations: 10+
//   • IT Complexity: High | Cloud: Multi-Cloud/Hybrid | Decision Maker: IT
//   • Purchase Cycle: 3+ months | Channel: Sales Reps & Indirect
//   • Key Solutions: Full enterprise stack, Private 5G, Network Edge
// =============================================================================

// Segment insights from research (AT&T Business Affinity Analysis Playbook - March 2025)
export const segmentInsights = {
  keyFindings: [
    'Technology complexity increases as size, location count and number of IT personnel increases',
    'Price sensitivity decreases as the number of IT personnel increases',
    'The number of solutions used increases as location count increases',
    'Coverage, reliability and security remain table stakes across all segments',
    'Differentiating qualities: Flexibility in contracts, Proactive support (esp. during outages), Tailored offerings',
  ],
  transitionPoint: 'Segment 4 presents a transition point from smaller/simpler business needs to complex enterprise-like needs',
  digitalChannelNote: 'Digital is vital for all segments; smaller segments for research, purchase and support; larger segments for research and industry presence',
  priceSensitivityDropoff: 'Price sensitivity has a large drop off at segment 6 due to the significant increase in IT FTEs (10+)',
  attPreference: '70% of segment 7 prefers AT&T (AT&T leads in NPS)',
  acquisitionFocusSegments: ['Segment 2', 'Segment 3', 'Segment 4'], // Negative AT&T perception - combat with value messaging
  retentionFocusSegments: ['Segment 5', 'Segment 6', 'Segment 7'], // Positive AT&T perception - higher expectations
  threeKeyThemes: [
    'Optimizing the Experience: Shift from campaigns to orchestrating customer journey from start to finish',
    'Deepening Personalization: Align segment mindset with journey stage to deliver right message at right time',
    'Becoming a True Partner: Differentiate by being a resource beyond telecom solutions',
  ],
};

// Grouping metadata for display
export const groupingMetadata = {
  valueTier: {
    label: 'Value Tier',
    description: 'Revenue potential and strategic value',
    options: {
      'platinum': { label: 'Platinum', color: 'bg-purple-500/15 text-purple-400 border-purple-500/30', description: '$100K+ annual value' },
      'gold': { label: 'Gold', color: 'bg-amber-500/15 text-amber-500 border-amber-500/30', description: '$25K-$100K annual' },
      'silver': { label: 'Silver', color: 'bg-slate-400/15 text-slate-400 border-slate-400/30', description: '$5K-$25K annual' },
      'bronze': { label: 'Bronze', color: 'bg-orange-600/15 text-orange-500 border-orange-500/30', description: 'Under $5K annual' },
    },
    salesTips: {
      'platinum': 'Assign dedicated account team. Focus on strategic partnership, not transactions. Executive engagement is critical.',
      'gold': 'Balance attention with efficiency. Look for upsell opportunities. Quarterly business reviews recommended.',
      'silver': 'Efficient sales process. Bundle solutions for value. Strong follow-up on renewals.',
      'bronze': 'Streamlined, low-touch approach. Focus on self-service and bundled packages. Perfect for digital-first engagement.',
    }
  },
  buyingBehavior: {
    label: 'Buying Behavior',
    description: 'How they make purchasing decisions',
    options: {
      'early-adopter': { label: 'Early Adopter', color: 'bg-muted text-foreground border-border', description: 'First to try new tech' },
      'risk-averse': { label: 'Risk-Averse', color: 'bg-muted text-foreground border-border', description: 'Needs proof and guarantees' },
      'price-shopper': { label: 'Price Shopper', color: 'bg-muted text-foreground border-border', description: 'Seeks best value' },
      'relationship-buyer': { label: 'Relationship Buyer', color: 'bg-muted text-foreground border-border', description: 'Values trust' },
      'rfp-driven': { label: 'RFP-Driven', color: 'bg-muted text-foreground border-border', description: 'Formal process' },
    },
    salesTips: {
      'early-adopter': 'Demo new features first. Discuss product roadmap. Highlight innovation and cutting-edge capabilities.',
      'risk-averse': 'Lead with case studies and references. Offer pilots or trials. Emphasize SLAs and guarantees.',
      'price-shopper': 'Focus on TCO, not just price. Show bundle discounts. Quantify ROI clearly.',
      'relationship-buyer': 'Invest in face-to-face time. Be responsive and reliable. Remember personal details.',
      'rfp-driven': 'Be thorough in proposals. Prepare for committee presentations. Address all evaluation criteria.',
    }
  },
  mindset: {
    label: 'Mindset',
    description: 'Their attitude toward technology',
    options: {
      'tech-optimist': { label: 'Tech Optimist', color: 'bg-muted text-foreground border-border', description: 'Believes tech solves problems' },
      'tech-skeptic': { label: 'Tech Skeptic', color: 'bg-muted text-foreground border-border', description: 'Prefers proven solutions' },
      'security-first': { label: 'Security-First', color: 'bg-muted text-foreground border-border', description: 'Prioritizes protection' },
      'growth-focused': { label: 'Growth-Focused', color: 'bg-muted text-foreground border-border', description: 'Looking to scale' },
      'efficiency-obsessed': { label: 'Efficiency-Obsessed', color: 'bg-muted text-foreground border-border', description: 'Optimize operations' },
    },
    salesTips: {
      'tech-optimist': 'Show the art of the possible. Demo advanced features. Connect tech to business outcomes.',
      'tech-skeptic': 'Keep it simple. Focus on reliability. Avoid jargon. Emphasize support and ease of use.',
      'security-first': 'Lead with security credentials. Discuss compliance certifications. Highlight threat protection.',
      'growth-focused': 'Show scalability. Discuss future-proofing. Present growth case studies.',
      'efficiency-obsessed': 'Quantify time savings. Show automation opportunities. Focus on operational simplicity.',
    }
  },
  primaryNeed: {
    label: 'Primary Need',
    description: 'What they\'re seeking most',
    options: {
      'connectivity': { label: 'Connectivity', color: 'bg-muted text-foreground border-border', description: 'Reliable internet priority' },
      'security': { label: 'Security', color: 'bg-muted text-foreground border-border', description: 'Protection focused' },
      'mobility': { label: 'Mobility', color: 'bg-muted text-foreground border-border', description: 'Wireless & remote access' },
      'integration': { label: 'Integration', color: 'bg-muted text-foreground border-border', description: 'Systems that work together' },
      'innovation': { label: 'Innovation', color: 'bg-muted text-foreground border-border', description: 'Competitive advantage' },
    },
    salesTips: {
      'connectivity': 'Lead with fiber reliability. Discuss uptime SLAs. Show network coverage maps.',
      'security': 'Open with threat landscape. Present security portfolio. Discuss compliance requirements.',
      'mobility': 'Feature wireless solutions first. Discuss remote work enablement. Show mobility management.',
      'integration': 'Present unified solutions. Discuss APIs and interoperability. Show single-pane management.',
      'innovation': 'Lead with 5G and edge. Discuss emerging tech. Show innovation partnerships.',
    }
  },
  decisionStyle: {
    label: 'Decision Style',
    description: 'Who makes the buying decision',
    options: {
      'owner-operator': { label: 'Owner-Operator', color: 'bg-muted text-foreground border-border', description: 'Fast decisions' },
      'it-led': { label: 'IT-Led', color: 'bg-muted text-foreground border-border', description: 'IT drives evaluation' },
      'c-suite': { label: 'C-Suite', color: 'bg-muted text-foreground border-border', description: 'Executive decision' },
      'committee': { label: 'Committee', color: 'bg-muted text-foreground border-border', description: 'Multiple stakeholders' },
    },
    salesTips: {
      'owner-operator': 'Speak business language, not tech. Be concise. Show clear ROI. Respect their time.',
      'it-led': 'Bring technical resources. Be prepared for deep dives. Provide detailed specs.',
      'c-suite': 'Focus on strategic value. Prepare executive summaries. Align with business objectives.',
      'committee': 'Identify all stakeholders. Tailor messaging to each role. Build consensus over time.',
    }
  },
  productAffinity: {
    label: 'Product Affinity',
    description: 'What products they\'re likely to buy',
    options: {
      'internet-first': { label: 'Internet-First', color: 'bg-muted text-foreground border-border', description: 'Connectivity foundation' },
      'voice-centric': { label: 'Voice-Centric', color: 'bg-muted text-foreground border-border', description: 'Voice/UCaaS critical' },
      'wireless-heavy': { label: 'Wireless-Heavy', color: 'bg-muted text-foreground border-border', description: 'Mobile workforce' },
      'full-stack': { label: 'Full-Stack', color: 'bg-muted text-foreground border-border', description: 'Comprehensive buyer' },
    },
    salesTips: {
      'internet-first': 'Lead with fiber. Position other products as add-ons. Focus on reliability and speed.',
      'voice-centric': 'Feature VoIP/UCaaS prominently. Discuss call quality. Show communication features.',
      'wireless-heavy': 'Lead with mobility solutions. Discuss device management. Show wireless coverage.',
      'full-stack': 'Present bundled solutions. Show integration benefits. Discuss account simplification.',
    }
  },
};

export type GroupingKey = keyof typeof groupingMetadata;

// Segment metadata from 2025 SMB Segmentation Report
export const smbSegmentMetadata = {
  1: {
    name: 'NoCo-LoCo, Simple IT',
    businessCount: '16.4M',
    fteRange: '1',
    itFtes: '0',
    locations: '0 (No commercial location)',
    itComplexity: 'Low',
    cloudEnvironment: 'On-Prem',
    decisionMaker: 'Owner',
    purchaseCycle: '<1 week to 1 month',
    purchaseChannel: 'Digital',
    techBudget: '<$5K',
    keyNeeds: [
      { need: 'Price', importance: 82 },
      { need: 'Coverage/Reliability', importance: 80 },
      { need: 'Customer & Tech Support', importance: 59 },
      { need: 'Clear Contract & Billing', importance: 53 },
      { need: 'Network Security', importance: 49 },
    ],
    topSolutions: ['Business Mobile Phones (62%)', 'Broadband Internet (78%)'],
    researchMethods: ['Provider Website (76%)', 'Search Engine'],
    interviewThemes: [
      'Importance of network coverage and consistent connectivity over speed',
      'Desire for clear contracting, billing, and better customer support',
      'Frustration with limited plan options, especially regarding data usage',
      'Many use consumer-grade products due to lack of necessity for business plan',
      'Reliance on telecom providers for technical support due to lack of IT department',
    ],
    buyerQuote: '"I don\'t see any real reason to switch to business cell phone especially. I don\'t know what the value add would be there for me personally." - Owner, Mobile Yoga Studio',
  },
  2: {
    name: 'Micro, Simple IT',
    businessCount: '11.6M',
    fteRange: '2-9',
    itFtes: '1 (51% have at least 1)',
    locations: '1',
    itComplexity: 'Low',
    cloudEnvironment: 'Single Cloud',
    decisionMaker: 'Owner',
    purchaseCycle: '1 week to 1 month',
    purchaseChannel: 'Digital',
    techBudget: '<$5K',
    attPerception: 'Negative', // Acquisition focus segment
    winningStrategy: 'Position AT&T as a provider of value in product but also offer incremental value as a resource that validates the price and builds trust through third-party partnerships and free resources relevant to the business.',
    retentionStrategy: 'Communicate the potentially unseen value of AT&T services and ongoing support through a bank of business resources, recap campaigns playfully highlighting usage, security, and benefits, and offering right-sizing savings opportunities.',
    keyNeeds: [
      { need: 'Price', importance: 73 },
      { need: 'Coverage/Reliability', importance: 66 },
      { need: 'Network Security', importance: 59 },
      { need: 'Customer & Tech Support', importance: 59 },
      { need: 'Clear Contract & Billing', importance: 48 },
    ],
    topSolutions: ['Broadband Internet (82%)', 'Business Mobile Phones (75%)', 'VoIP (41%)'],
    researchMethods: ['Provider Website (67%)', 'Word of Mouth'],
    engagementPreference: 'Informally, typically reaching out to sales representatives. Tend toward informal contracting and avoid formalized agreements.',
    purchaseTimeframe: '1-4 weeks',
    triggers: [
      'Negative experiences on price, coverage, or support',
      'Business growth requiring more capacity',
      'Contract expiry with current provider',
    ],
    journeyPhases: {
      livingLife: 'Establish relationship, warm up prospects to combat negative perceptions largely driven by price concerns',
      deliberation: 'Center narrative on authentic storytelling conveying incremental value of AT&T partnership',
      backInFlow: 'Nurture trust through continued resource content curated to role and industry',
      evolveAdjust: 'Create holistic integrated engagement serving professional and personal needs through community building',
    },
    empathyMap: {
      positive: [
        'I\'m thriving as an entrepreneur and feel confident in the decisions I\'m making for my business',
        'I have a clear objective and resources to confidently achieve the right balance between price and offerings',
        'I\'m confident I\'m getting transparent information I can trust to make the right choice',
      ],
      negative: [
        'I\'m feeling out of control. Everything is compounding.',
        'I think I know what I need, but comparing brands and options feels so time-consuming',
        'I\'m concerned the options aren\'t providing enough in return for the cost',
      ],
    },
    macroInfluences: [
      '46% of Americans consider themselves workaholics',
      '88% of self-employed professionals focus on smaller and more integrated services',
      '80% of small businesses operate without any staff',
    ],
    interviewThemes: [
      'Prioritize reliable internet connection as fundamental need',
      'Desire for consolidating communication services to reduce platforms',
      'Transition from consumer-grade to business-grade as business grows',
      'Avoid long-term contracts due to potential changes in location or scale',
      'SLA breach reimbursements are attractive option',
    ],
    buyerQuote: '"We don\'t have a large budget for our technology. We need something that is simple… we\'re relatively low tech. So having something that is reliable and cost effective are really the most important things." - Owner, Exercise Studio',
  },
  3: {
    name: 'Small, Simple IT',
    businessCount: '702K',
    fteRange: '10-19',
    itFtes: '1-10',
    locations: '2-5',
    itComplexity: 'Medium',
    cloudEnvironment: 'Single Cloud',
    decisionMaker: 'CEO/Owner',
    purchaseCycle: '1-4 weeks',
    purchaseChannel: 'Digital + Sales Reps',
    techBudget: '$1K-$5K annually',
    attPerception: 'Negative (23%)', // Acquisition focus segment - need to combat
    attStrengths: ['Coverage', 'Network Security', 'Clear Contracts & Billing'],
    attImprovementAreas: ['Price', 'Customer Support'],
    winningStrategy: 'Position AT&T as provider offering great coverage and pricing with support that understands small business needs and offers simple, well-integrated solutions.',
    retentionStrategy: 'Build trust through consistent service quality and proactive support, especially during outages.',
    keyNeeds: [
      { need: 'Price', importance: 71 },
      { need: 'Coverage', importance: 71 },
      { need: 'Network Security', importance: 60 },
      { need: 'Customer Support', importance: 50 },
      { need: 'Clear Contracts & Billing', importance: 37 },
    ],
    topSolutions: ['Broadband (81%)', 'Business Mobile (80%)', 'VoIP (54%)', 'Network Security (53%)'],
    researchMethods: ['Provider Website (61%)', 'Search Engines (56%)', 'Sales Reps (48%)', 'Industry Sources (40%)', 'Telecom Sources (40%)'],
    engagementPreference: 'Informally, typically reaching out to sales representatives and brick-and-mortar stores. Avoid longer-term contracts and may be comfortable without formal contracting.',
    purchaseTimeframe: '1-4 weeks',
    buyerProfile: 'CEO/Owner with very low- to low-tech familiarity and often influenced by industry peers and colleagues',
    triggers: [
      'Negative experiences on price, coverage, or support',
      'Business expansion or new location',
      'Service disruptions or reliability issues',
    ],
    interviewThemes: [
      'Price is significant factor with desire for lower costs',
      'Open to adopting new services as business needs evolve',
      'Prefer direct conversations with providers over fully online purchasing',
      'Key triggers: cost changes, network stability, company growth, service disruptions',
      'Desire for clearer and more accessible information online',
      'Not IT experts but can get scrappy',
    ],
    buyerQuote: '"You go online and get lots of marketing information and you have to dig to get to the details you\'re looking for. Making it easier to find the nuts and bolts would be better." - COO, Cancer Treatment Research Start-up',
  },
  4: {
    name: 'Small, Scale IT',
    businessCount: '401K',
    fteRange: '50-99',
    itFtes: '1-10',
    locations: '2-5',
    itComplexity: 'Medium',
    cloudEnvironment: 'Hybrid',
    decisionMaker: 'Exec/Owner DM with IT influence',
    purchaseCycle: '1 week - 3 months',
    purchaseChannel: 'Sales Reps (53%) + Provider Website (63%)',
    techBudget: '$10K-$20K annually',
    isTransitionSegment: true,
    attPerception: 'Negative', // Acquisition focus segment
    attStrengths: ['Coverage', 'Network Security'],
    attImprovementAreas: ['Price', 'Customer Support', 'Lack of proactive follow-ups'],
    winningStrategy: 'Position AT&T as a reliable partner that can scale with their business and supports growth through expert thought leadership resources, right-sized recommendations, and flexibility with ease of scale.',
    retentionStrategy: 'Convey reliability through ongoing recommendations and support tailored to the business and paced with growth via proactive regular wellness check-ins and ongoing supportive business resources.',
    keyNeeds: [
      { need: 'Coverage', importance: 63 },
      { need: 'Price', importance: 60 },
      { need: 'Network Security', importance: 49 },
      { need: 'Customer Support', importance: 40 },
      { need: 'Clear Contracts & Billing', importance: 35 },
    ],
    topSolutions: ['Business Mobile (81%)', 'Broadband (80%)', 'VoIP (61%)', 'Network Security (59%)', 'VPN (53%)', 'IoT (51%)'],
    researchMethods: ['Provider Website (63%)', 'Sales Reps (53%)', 'Search Engines (47%)', 'Industry Sources (43%)', 'Telecom Sources (41%)'],
    engagementPreference: 'Informally, typically reaching out to sales representatives. Typically use formal contracts (either for fixed price only or fixed price + SLAs).',
    purchaseTimeframe: '1 week - 3 months',
    buyerProfile: 'IT-influenced decision making with owner still primary. Always looking for right balance between price and offerings.',
    triggers: [
      'Business growth requiring scalable solutions',
      'Need for more complex services as business scales',
      'Price-performance balance reassessment',
    ],
    journeyKeyStages: {
      deliberation: 'Demonstrate understanding of business needs, communicate straightforward pricing and flexible plan options',
      gettingAcquainted: 'Set clear expectations and ongoing dedicated rep support',
      evolveAdjust: 'Introduce yearly account right-sizing assessments to ensure product mix aligns with business needs',
    },
    empathyMap: {
      positive: [
        'The IT team and I are confident about our solution and feel comfortable getting the team up to speed',
        'It\'s great that our solution requires minimal intervention once it\'s installed',
        'I have complaints, but their service has been consistent – they\'re proactive and easy to renew with',
      ],
      negative: [
        'There are several major tasks to juggle, and I\'m overwhelmed prioritizing with internal onboardings',
        'Our team is encountering service interruptions with no notice of cause and timely resolution',
        'This service was too expensive – I\'m just going to look for a cheaper option with similar levels of service',
      ],
    },
    interviewThemes: [
      'Shift from cost-only to cost + flexibility in contracts',
      'Need safety net if salespeople over-promise and under-deliver',
      'Support for exploring new technologies like IoT edge would be helpful',
      'Harder to find way around offerings outside core mobility and internet',
      'Growing IT presence influences but doesn\'t yet drive decisions',
      'Reliability, cost-effectiveness, and security are priorities - small but growing so services must scale',
    ],
    buyerQuote: '"As we scale and cost becomes less of an issue, we would go for the leading technology or provider based on performance metrics like speed, reliability, and features. Security remains a top priority." - CFO, Mobile Payments Fintech Startup',
  },
  5: {
    name: 'Medium, Simple IT',
    businessCount: '282K',
    fteRange: '100-999',
    itFtes: '1-10',
    locations: '2-5',
    itComplexity: 'High',
    cloudEnvironment: 'Hybrid',
    decisionMaker: 'Executive/Owner & IT',
    purchaseCycle: '1-6 months',
    purchaseChannel: 'Sales Reps & Websites',
    techBudget: '$25K-$100K annually',
    attPerception: 'Positive (45%)', // Retention focus segment
    attStrengths: ['Coverage', 'Network Security', 'Integrated Solutions'],
    attImprovementAreas: ['Price', 'Customer Support'],
    winningStrategy: 'Position AT&T and its offerings as a partner willing and able to tailor to the needs of the business by simplifying solutions and offerings, offering contract executive summaries, and establishing ease and flexibility.',
    retentionStrategy: 'Authentically convey that AT&T is a leader in innovation and evolves to better serve their business as a partner through relevant resources, proactive regular wellness check-ins, and information on how to get the most of their existing service and/or new product advances.',
    keyNeeds: [
      { need: 'Coverage', importance: 69 },
      { need: 'Network Security', importance: 68 },
      { need: 'Price', importance: 62 },
      { need: 'Customer Support', importance: 43 },
      { need: 'Integrated Solutions', importance: 39 },
    ],
    topSolutions: ['Business Mobile (82%)', 'Broadband (79%)', 'VoIP (64%)', 'IoT (56%)', 'VPN (55%)'],
    researchMethods: ['Sales Reps', 'Websites', 'Industry Sources', 'Search Engines', 'Friends & Colleagues'],
    engagementPreference: 'Relatively formally, at times using an RFP process. Typically use 1-3 year contracts with guarantees for fixed pricing and SLAs.',
    purchaseTimeframe: '1-6 months',
    buyerProfile: 'Executive/Owner & IT with medium- to high-tech familiarity and often influenced by IT colleagues from other firms and consultants',
    triggers: [
      'Regular review of telecom solution / contract expiry',
      'Adding new locations or expanding existing locations',
      'Negative experiences on coverage or support',
    ],
    journeyKeyStages: {
      deliberation: 'Anchor communications in transparency, bundling options, and adaptability to incite curiosity and build trust',
      selectingSolution: 'Arm sales reps with tools and resources to show high-level understanding of business needs',
      backInFlow: 'Demonstrate commitment to strong customer service and reliable products',
      evolveAdjust: 'Continue conversation with relevant insights, recommendations, and product advancement',
    },
    empathyMap: {
      positive: [
        'I\'m clear on the needs of the business and have an understanding of my product options',
        'I\'m more confident having an app to manage and view my account, billing, and usage on my own time',
        'I\'m relieved I don\'t have to think about my network failing so I can focus on what matters most',
      ],
      negative: [
        'I\'m frustrated at the level of inefficiencies in our network when it comes to speed and reliability',
        'My inbox is overloaded with emails and I\'m confused by what I need to know and what\'s just fluff',
        'This solution doesn\'t grow with us',
      ],
    },
    interviewThemes: [
      'IT teams regularly evaluate changes in technology',
      'Common triggers: building new facility, expanding connectivity, reliability issues',
      'Procurement of high-speed dedicated fiber and sophisticated solutions',
      'Preference for bundling services for better pricing',
      'Prefer non-formal RFP process for quick comparisons',
      'Had bad experiences being upsold and need to trust reps and support',
    ],
    buyerQuote: '"We are constantly managing our performance in terms of connection quality and bandwidth use. We\'re always looking to see what\'s new and how we can improve." - VP of IT, Temporary Road Construction Company',
  },
  6: {
    name: 'Medium, Scale IT',
    businessCount: '245K',
    fteRange: '100-999',
    itFtes: '10+ (100%)',
    locations: '10+',
    itComplexity: 'High',
    cloudEnvironment: 'Multi-Cloud / Hybrid',
    decisionMaker: 'IT/Exec DM',
    purchaseCycle: '1-6 months or longer',
    purchaseChannel: 'Sales Reps & Indirect',
    techBudget: '>$50K',
    priceSensitivityNote: 'Major drop in price sensitivity due to 10+ IT FTEs - significant increase in variety and quantity of complex products',
    attPerception: 'Positive', // Retention focus segment
    attStrengths: ['Coverage', 'Brand'],
    attImprovementAreas: ['Price', 'Tailored Contract', 'Proactive/Frequent Communications'],
    winningStrategy: 'Position AT&T as experts with powerful, well-designed solutions. They look for simplicity and value and expect solutions and buying processes to be as easy as possible.',
    retentionStrategy: 'Demonstrate ongoing value through expertise, proactive communications especially during outages, and à la carte service options vs. overselling bundles.',
    keyNeeds: [
      { need: 'Network Security', importance: 63 },
      { need: 'Coverage', importance: 59 },
      { need: 'Integrated Solutions', importance: 40 },
      { need: 'Innovation', importance: 38 },
      { need: 'Understands My Business', importance: 37 },
    ],
    topSolutions: ['Business Mobile (82%)', 'Broadband (69%)', 'IoT (65%)', 'VoIP (64%)', 'Network Security (63%)', 'VPN (56%)', 'Cloud Interconnect (55%)'],
    researchMethods: ['Vendor Demos (55%)', 'Industry Analysts', 'Peer Networks'],
    engagementPreference: 'Formally, typically using an RFP process. Typically use 1-3 year contracts with guarantees for fixed pricing and SLAs.',
    purchaseTimeframe: '1-6 months or longer',
    buyerProfile: 'IT DM with high-tech familiarity looking at what other companies of the same scale are doing',
    triggers: [
      'Negative experiences on price, coverage, or support',
      'Need for more innovative solutions',
      'Integration challenges with current provider',
    ],
    journeyKeyStages: {
      deliberation: 'They look to providers for expertise and powerful, well-designed solutions',
      selectingSolution: 'Looking for simplicity and value - expect solutions and buying processes to be as easy as possible',
      backInFlow: 'Being highly communicative and prompt, especially during outages, provides incremental value',
      evolveAdjust: 'Always looking at what other companies of the same scale are doing to ensure top-of-the-line integrated solutions',
    },
    interviewThemes: [
      'Beyond table stakes, prioritize ease of use, customizable plans, advanced features',
      'Frustration with overpriced services that underperform and poor customer support',
      'Perception that providers bundle but fail to offer truly innovative solutions',
      'Lack of communicated innovation makes it challenging to consider purchasing beyond basics',
      'Gap between what is offered and what is needed for effective solutions',
      'Uncomfortable with companies trying to oversell larger package of value-added services',
    ],
    buyerQuote: '"We were uncomfortable with companies trying to oversell a larger package of value-added services. They were making it difficult to take the à la carte service and specific package we wanted, which was part of the reason we ended up with Verizon." - CBO, Boutique Consulting Firm',
  },
  7: {
    name: 'Large, Multi-Location',
    businessCount: '59K',
    fteRange: '100-999',
    itFtes: '10+',
    locations: '10+',
    itComplexity: 'High',
    cloudEnvironment: 'Multi-Cloud / Hybrid',
    decisionMaker: 'IT DM',
    purchaseCycle: '3+ months',
    purchaseChannel: 'Sales Reps & Indirect',
    techBudget: '>$50K',
    attPreference: '70% prefer AT&T (AT&T leads in NPS amongst wireless and wireline competitors)',
    attPerception: 'Positive', // Retention focus segment
    attStrengths: ['Coverage', 'Network Security', 'Brand Reputation'],
    attImprovementAreas: ['Customer Support Organization', 'Responsiveness', 'Full Transparency with Contracts & Billing'],
    winningStrategy: 'Organization and responsiveness in customer support is extremely important. They need full transparency with contracts and billing. They usually look for vendors that offer a broad range of products, including more complex offerings.',
    retentionStrategy: 'Demonstrate ongoing partnership value through dedicated support, 3-5 year strategic planning, and continuous innovation in technology offerings.',
    keyNeeds: [
      { need: 'Coverage', importance: 69 },
      { need: 'Network Security', importance: 54 },
      { need: 'Understands My Business', importance: 45 },
      { need: 'Price', importance: 38 },
      { need: 'Cybersecurity Offerings', importance: 36 },
    ],
    topSolutions: ['Business Mobile (80%)', 'IoT (75%)', 'Broadband (71%)', 'VoIP (70%)', 'Private 5G (66%)', 'Network Security (62%)', 'VPN (59%)', 'Cloud Interconnect (54%)', 'Fixed Wireless (50%)', 'Dedicated Internet (49%)', 'Network Edge (44%)', 'SD-WAN (38%)'],
    researchMethods: ['RFP Process', 'Vendor Evaluations', 'Industry Conferences'],
    engagementPreference: 'Formally through RFP process. Expect broad range of products including complex offerings. Full transparency with contracts and billing required.',
    purchaseTimeframe: '3+ months',
    buyerProfile: 'IT DM looking for vendors with broad product range including complex offerings. Likely uses multiple connectivity providers.',
    triggers: [
      'Strategic planning cycle (3-5 year outlook)',
      'Contract flexibility needs (pricing, speed of installation, reserved IPs)',
      'Challenges with support understanding business impact of service issues',
    ],
    productRecommendations: {
      lead: ['Broadband', 'Business Mobile', 'VoIP', 'IoT', 'FWA', 'VPN', 'SD-WAN', 'Toll-Free Voice', 'SIP-Trunking', 'Network Security'],
      suggest: ['ADI', 'Network Edge', 'Private 5G', 'Cloud Interconnect'],
      avoid: ['MPLS'],
    },
    interviewThemes: [
      'Looking to plan for future needs (3-5 year outlook)',
      'Flexibility in contracts including pricing, speed of installation, reserved IP addresses',
      'Testimonials, reputation and previous experience influence RFP decisions',
      'Challenges with support and providers understanding business impact of service issues',
      'Local presence preferred, especially provider that owns last mile of connectivity',
      'Security is non-negotiable regardless of price',
    ],
    buyerQuote: '"Latency is most critical these days… I\'d like more engagement through educational material, videos, webinars, and events… a customer portal with updates similar to what hyper scalers provide." - VP of IT, Mental Health Service Provider',
  },
};

export const customerPersonas: CustomerPersona[] = [
  // SEGMENT 1: NoCo-LoCo, Simple IT (16.4M businesses)
  {
    id: 'maria-homeyoga',
    segmentId: 1,
    segmentName: 'NoCo-LoCo, Simple IT',
    name: 'Maria Santos',
    title: 'Owner & Instructor',
    company: 'Zen Flow Yoga Studio',
    industry: 'Health & Wellness',
    avatar: '🧘',
    quote: "When I look at the consumer websites, they are all pretty good. I just wish the packages felt right for a home-based business.",
    
    employeeCount: '1',
    locations: '0 (Home-based)',
    revenue: '<$500K',
    techBudget: '<$5K',
    itStaff: 'None',
    
    techSophistication: 'low',
    decisionMaker: 'Owner/CEO',
    researchMethod: 'Provider website (76%)',
    influencers: ['Friends', 'Family', 'Colleagues'],
    
    topNeeds: [
      { need: 'Price', importance: 82 },
      { need: 'Coverage/Reliability', importance: 80 },
      { need: 'Customer & Tech Support', importance: 59 },
      { need: 'Clear Contract & Billing', importance: 53 },
      { need: 'Network Security', importance: 49 },
    ],
    painPoints: [
      'Consumer packages don\'t fit business needs',
      'Limited tech knowledge makes decisions difficult',
      'Needs reliable internet for virtual classes',
      'Budget-conscious but needs professional service',
    ],
    currentProvider: 'Consumer cable or DSL',
    
    leadProducts: ['AT&T Business Fiber', 'AT&T High Speed Internet'],
    suggestProducts: ['AT&T Business Voice', 'Basic Network Security'],
    avoidProducts: ['Dedicated Internet', 'Cybersecurity suites', 'IoT solutions', 'SD-WAN', 'Private 5G'],
    salesApproach: 'Keep it simple and focus on value. Maria isn\'t tech-savvy, so avoid jargon. Emphasize reliability for her virtual yoga classes and the peace of mind that comes with business-grade service. Price is her #1 concern—show clear ROI. Digital is the primary purchase channel.',
    keyTalkingPoints: [
      'Business Fiber gives you consistent speeds for HD video streaming of your classes',
      'Simple billing—one bill, no surprises, easy to understand',
      '24/7 support means help when you need it, not just 9-5',
      'Symmetric upload speeds for seamless Zoom/video sessions',
    ],
    objectionsToPrepareFor: [
      '"Consumer internet is cheaper"—Yes, but it\'s not designed for business use. Business includes priority support and consistent speeds.',
      '"I don\'t need all those features"—We can start simple with just internet and add services as you grow.',
    ],
    
    valueTier: 'bronze',
    estimatedAnnualValue: '$1K - $3K',
    buyingBehavior: 'price-shopper',
    mindset: 'tech-skeptic',
    primaryNeed: 'connectivity',
    decisionStyle: 'owner-operator',
    productAffinity: 'internet-first',
  },
  
  // SEGMENT 2: Micro, Simple IT (11.6M businesses)
  {
    id: 'tony-autobody',
    segmentId: 2,
    segmentName: 'Micro, Simple IT',
    name: 'Tony Russo',
    title: 'Owner',
    company: 'Russo\'s Collision Center',
    industry: 'Automotive Services',
    avatar: '🔧',
    quote: "My business is a single location collision repair center. I just need things to work—I don't have time to deal with tech problems.",
    
    employeeCount: '2-9',
    locations: '1',
    revenue: '$1M - $5M',
    techBudget: '<$5K',
    itStaff: '1 (part-time or outsources)',
    
    techSophistication: 'low',
    decisionMaker: 'Owner/CEO',
    researchMethod: 'Provider website (67%), word of mouth',
    influencers: ['Friends', 'Colleagues', 'Insurance partners'],
    
    topNeeds: [
      { need: 'Price', importance: 73 },
      { need: 'Coverage/Reliability', importance: 66 },
      { need: 'Network Security', importance: 59 },
      { need: 'Customer & Tech Support', importance: 59 },
      { need: 'Clear Contract & Billing', importance: 48 },
    ],
    painPoints: [
      'Downtime costs money—can\'t process insurance claims',
      'No IT expertise on staff',
      'Needs reliable connectivity for paint booth systems',
      'Handles sensitive customer/insurance data',
      'Transitioning from consumer to business-grade as business grows',
    ],
    currentProvider: 'Consumer-grade or basic business provider',
    
    leadProducts: ['AT&T Business Fiber', 'AT&T High Speed Internet'],
    suggestProducts: ['AT&T Business Voice', 'VoIP', 'Network Security'],
    avoidProducts: ['Dedicated Internet', 'Cloud Interconnect', 'SD-WAN', 'Network Edge', 'Private 5G'],
    salesApproach: 'Tony values reliability and doesn\'t want to think about tech. Position AT&T as the "set it and forget it" solution. He trusts recommendations from peers, so reference similar auto shops. Digital is his preferred purchase channel but he values consolidating services.',
    keyTalkingPoints: [
      'Industry-leading reliability means fewer disruptions to your claims processing',
      'Our network security protects your customers\' sensitive data',
      'Local support team that understands small business needs',
      'Simple monthly pricing with no hidden fees',
      'Consider bundling services to simplify—one provider, one bill',
    ],
    objectionsToPrepareFor: [
      '"I\'ve been with my current provider for years"—We can make the transition seamless and often save you money.',
      '"I don\'t understand all this tech stuff"—That\'s exactly why you need a partner like AT&T. We handle the complexity.',
    ],
    
    valueTier: 'silver',
    estimatedAnnualValue: '$5K - $12K',
    buyingBehavior: 'relationship-buyer',
    mindset: 'efficiency-obsessed',
    primaryNeed: 'connectivity',
    decisionStyle: 'owner-operator',
    productAffinity: 'internet-first',
  },
  
  // SEGMENT 3: Small, Simple IT (702K businesses)
  {
    id: 'jennifer-brewpub',
    segmentId: 3,
    segmentName: 'Small, Simple IT',
    name: 'Jennifer Chen',
    title: 'Co-Owner & Head Brewer',
    company: 'Golden Gate Brewing Co.',
    industry: 'Food & Beverage',
    avatar: '🍺',
    quote: "We operate a brewery and taproom for beer, wines, ciders, and meads. Technology should support our craft, not complicate it.",
    
    employeeCount: '10-19',
    locations: '2-5',
    revenue: '$2M - $8M',
    techBudget: '$1K-$5K annually',
    itStaff: '1-10 (part-time or outsourced)',
    
    techSophistication: 'medium',
    decisionMaker: 'Owner/CEO',
    researchMethod: 'Provider website (61%), industry peers',
    influencers: ['Industry peers', 'Consultants', 'Equipment vendors'],
    
    topNeeds: [
      { need: 'Price', importance: 71 },
      { need: 'Coverage/Reliability', importance: 71 },
      { need: 'Network Security', importance: 60 },
      { need: 'Customer & Tech Support', importance: 50 },
      { need: 'Clear Contract & Billing', importance: 37 },
    ],
    painPoints: [
      'Multiple locations need to communicate',
      'POS systems require reliable connectivity',
      'Growing business with scaling needs',
      'Seasonal traffic spikes during events',
      'Online marketing info is overwhelming—wants straight answers',
    ],
    currentProvider: 'Mix of providers',
    
    leadProducts: ['AT&T Business Fiber'],
    suggestProducts: ['AT&T Business Voice', 'VoIP', 'Network Security', 'VPN', 'IoT Solutions'],
    avoidProducts: ['Dedicated Internet', 'Cloud Interconnect', 'SD-WAN', 'Network Edge', 'Private 5G'],
    salesApproach: 'Jennifer is building something—appeal to her growth mindset. She prefers direct conversations over fully online purchasing. Multi-location connectivity is a key opportunity. She wants clear, straight information without marketing fluff.',
    keyTalkingPoints: [
      'Connect both locations on one reliable network with unified billing',
      'Fiber handles peak taproom traffic without slowdowns',
      'VPN lets you securely access brewing systems from anywhere',
      'IoT sensors can monitor fermentation temps and alert you to issues',
    ],
    objectionsToPrepareFor: [
      '"We\'re not that big yet"—That\'s the perfect time to get the right infrastructure. Growing into your network is easier than outgrowing it.',
      '"IoT sounds complicated"—We\'ll set it up and manage it. You just get the alerts.',
    ],
    
    valueTier: 'silver',
    estimatedAnnualValue: '$10K - $20K',
    buyingBehavior: 'relationship-buyer',
    mindset: 'growth-focused',
    primaryNeed: 'connectivity',
    decisionStyle: 'owner-operator',
    productAffinity: 'internet-first',
  },
  
  // SEGMENT 4: Small, Scale IT (401K businesses) - TRANSITION POINT
  {
    id: 'david-lawfirm',
    segmentId: 4,
    segmentName: 'Small, Scale IT',
    name: 'David Washington',
    title: 'Managing Partner',
    company: 'Washington & Associates LLP',
    industry: 'Legal Services',
    avatar: '⚖️',
    quote: "We are a law firm with ~60 attorneys and support staff. Security and reliability aren't optional—they're ethical obligations.",
    
    employeeCount: '50-99',
    locations: '2-5',
    revenue: '$10M - $25M',
    techBudget: '$10K-$20K annually',
    itStaff: '1-10 (includes IT influence)',
    
    techSophistication: 'medium',
    decisionMaker: 'Owner with IT influence',
    researchMethod: 'Provider website (63%), Sales Reps, consultant recommendations',
    influencers: ['Professional consultants', 'Industry colleagues', 'IT staff'],
    
    topNeeds: [
      { need: 'Coverage/Reliability', importance: 63 },
      { need: 'Price', importance: 60 },
      { need: 'Network Security', importance: 49 },
      { need: 'Customer & Tech Support', importance: 40 },
      { need: 'Clear Contract & Billing', importance: 35 },
    ],
    painPoints: [
      'Attorney time is expensive—downtime is costly',
      'Client confidentiality is paramount',
      'Large file transfers (legal documents)',
      'Remote work requirements for attorneys',
      'Need safety net if provider over-promises and under-delivers',
    ],
    currentProvider: 'Business-grade provider',
    
    leadProducts: ['AT&T Business Fiber', 'AT&T Business Voice', 'VoIP'],
    suggestProducts: ['Dedicated Internet', 'VPN', 'Network Security', 'Cybersecurity', 'IoT'],
    avoidProducts: ['MDM', 'Network Edge', 'Private 5G'],
    salesApproach: 'This is the TRANSITION SEGMENT—decision-making is shifting toward IT-influenced. David is still the decision-maker but relies on IT staff for validation. Lead with business value (uptime, security, compliance) and let IT team validate technical specs. Purchase cycle is 1-3 months; engage via sales reps.',
    keyTalkingPoints: [
      'Our network security helps maintain client confidentiality and bar compliance',
      'Dedicated Internet provides bandwidth attorneys need for large document transfers',
      'VPN enables secure remote access for attorneys working from court or home',
      'We offer SLAs with financial guarantees—accountability you can count on',
    ],
    objectionsToPrepareFor: [
      '"Our IT person recommends a different solution"—Great, let\'s set up a technical deep-dive with your IT team.',
      '"We need guaranteed uptime"—Our business-grade SLAs include uptime guarantees with financial credits.',
    ],
    
    valueTier: 'gold',
    estimatedAnnualValue: '$40K - $75K',
    buyingBehavior: 'risk-averse',
    mindset: 'security-first',
    primaryNeed: 'security',
    decisionStyle: 'committee',
    productAffinity: 'full-stack',
  },
  
  // SEGMENT 5: Medium, Simple IT (282K businesses)
  {
    id: 'sarah-manufacturing',
    segmentId: 5,
    segmentName: 'Medium, Simple IT',
    name: 'Sarah Mitchell',
    title: 'VP of Operations',
    company: 'Mitchell Equipment Manufacturing',
    industry: 'Manufacturing',
    avatar: '🏭',
    quote: "We manufacture construction equipment. Our systems need to work 24/7—a production line stoppage costs us $50K per hour.",
    
    employeeCount: '100-500',
    locations: '2-9',
    revenue: '$25M - $75M',
    techBudget: '>$50K',
    itStaff: '5+ (98% have dedicated IT)',
    
    techSophistication: 'high',
    decisionMaker: 'IT',
    researchMethod: 'Provider website (61%), Sales Reps, vendor demos',
    influencers: ['IT team', 'Industry peers', 'Equipment vendors'],
    
    topNeeds: [
      { need: 'Coverage/Reliability', importance: 69 },
      { need: 'Price', importance: 62 },
      { need: 'Network Security', importance: 58 },
      { need: 'Customer & Tech Support', importance: 43 },
      { need: 'Integrated Solutions', importance: 39 },
    ],
    painPoints: [
      'Multiple manufacturing facilities need coordination',
      'IoT devices on production floor require reliable connectivity',
      'Downtime directly impacts revenue',
      'Legacy systems mixed with modern cloud (Hybrid environment)',
      'Prefer bundling services for better pricing',
    ],
    currentProvider: 'Multiple providers, seeking consolidation',
    
    leadProducts: ['AT&T Business Fiber', 'AT&T Business Mobility', 'Network Security', 'VoIP', 'IoT', 'VPN'],
    suggestProducts: ['Dedicated Internet', 'Cloud Interconnect', 'Fixed Wireless', 'SD-WAN'],
    avoidProducts: ['Basic consumer products'],
    salesApproach: 'Sarah speaks operations language—uptime, efficiency, ROI. IT is now the primary decision maker. They prefer non-formal RFP process for quick comparisons. Purchase cycle is 1-3 months. They regularly evaluate technology and prefer shorter contract terms to take advantage of new offerings.',
    keyTalkingPoints: [
      'SD-WAN connects all your facilities on one intelligent network with automatic failover',
      'IoT solutions integrate with your production systems for real-time monitoring',
      'Our 99.99% uptime SLA protects your production schedule',
      'Consolidate from multiple vendors to AT&T for simplified management and better pricing',
    ],
    objectionsToPrepareFor: [
      '"We have contracts with multiple providers"—We can work around existing contracts and help with buyout costs. Consolidation savings are significant.',
      '"We only do one-year renewals"—We offer flexible contract terms. Short renewals let you take advantage of new technology as it becomes available.',
    ],
    
    valueTier: 'gold',
    estimatedAnnualValue: '$75K - $150K',
    buyingBehavior: 'rfp-driven',
    mindset: 'efficiency-obsessed',
    primaryNeed: 'integration',
    decisionStyle: 'it-led',
    productAffinity: 'full-stack',
  },
  
  // SEGMENT 6: Medium, Scale IT (245K businesses)
  {
    id: 'michael-techsolutions',
    segmentId: 6,
    segmentName: 'Medium, Scale IT',
    name: 'Michael Park',
    title: 'CIO',
    company: 'Vertex Tech Solutions',
    industry: 'Technology Services',
    avatar: '💻',
    quote: "We were uncomfortable with companies trying to oversell a larger package of value-added services. They were making it difficult to take the à la carte service we wanted.",
    
    employeeCount: '100-999',
    locations: '10+',
    revenue: '$50M - $150M',
    techBudget: '>$50K',
    itStaff: '10+ (100% have significant IT presence)',
    
    techSophistication: 'high',
    decisionMaker: 'IT / CIO',
    researchMethod: 'Vendor demos (55%), industry analysts, peer networks',
    influencers: ['IT team', 'Trusted telecom experts', 'Industry analysts'],
    
    topNeeds: [
      { need: 'Network Security', importance: 63 },
      { need: 'Coverage/Reliability', importance: 59 },
      { need: 'Integrated Solutions', importance: 40 },
      { need: 'Innovation', importance: 38 },
      { need: 'Understands My Business', importance: 37 },
    ],
    painPoints: [
      'Skeptical of telecom providers\' technical expertise',
      'Frustration with overpriced services that underperform',
      'Poor customer support experiences',
      'Perception that bundling doesn\'t offer real innovation',
      'Gap between what is offered and what is needed',
      'Complex multi-cloud/hybrid environment',
    ],
    currentProvider: 'Enterprise provider or cloud-native solutions',
    
    leadProducts: ['AT&T Business Fiber', 'AT&T Business Mobility', 'VoIP', 'IoT', 'VPN', 'Network Security', 'Cloud Interconnect'],
    suggestProducts: ['SD-WAN', 'Private 5G', 'Network Edge', 'Cybersecurity', 'Dedicated Internet'],
    avoidProducts: ['MPLS (legacy perception)'],
    salesApproach: 'Michael is skeptical of traditional telecom—he sees providers as utilities known only for failures. Major price sensitivity DROPS here due to 10+ IT FTEs. Lead with innovation and technical excellence. Show AT&T investment in 5G, edge computing, and security. Bring technical resources—he\'ll test your expertise.',
    keyTalkingPoints: [
      'AT&T is a technology company, not just a telecom. Our fiber network and 5G leadership prove it.',
      'Our cybersecurity practice protects 3,000+ enterprise customers with dedicated SOC resources',
      'Cloud Interconnect provides dedicated connections to AWS, Azure, and Google Cloud',
      'Private 5G enables next-generation solutions beyond basic connectivity',
    ],
    objectionsToPrepareFor: [
      '"Tech companies do this better"—We partner with all major cloud providers. Our network is the backbone they run on.',
      '"I\'ve had bad experiences with telecom support"—Our enterprise accounts get dedicated support teams. Here\'s our escalation path and SLA commitments.',
      '"Telecom is undifferentiated"—Let me show you how we\'re different. Innovation in 5G and edge computing sets us apart.',
    ],
    
    valueTier: 'platinum',
    estimatedAnnualValue: '$150K - $400K',
    buyingBehavior: 'early-adopter',
    mindset: 'tech-optimist',
    primaryNeed: 'innovation',
    decisionStyle: 'it-led',
    productAffinity: 'full-stack',
  },
  
  // SEGMENT 7: Large, Multi-Location (59K businesses)
  {
    id: 'patricia-healthcare',
    segmentId: 7,
    segmentName: 'Large, Multi-Location',
    name: 'Patricia Williams',
    title: 'CTO',
    company: 'CareBridge Health Systems',
    industry: 'Healthcare',
    avatar: '🏥',
    quote: "Latency is most critical these days. I'd like more engagement through educational material, videos, webinars, and events—a customer portal with updates similar to what hyper scalers provide.",
    
    employeeCount: '100-999',
    locations: '10+',
    revenue: '$100M - $500M',
    techBudget: '>$50K',
    itStaff: '10+ (IT-led decision making)',
    
    techSophistication: 'high',
    decisionMaker: 'IT / CTO',
    researchMethod: 'RFP process, vendor evaluations, industry conferences',
    influencers: ['IT team', 'Trusted telecom experts', 'Compliance officers'],
    
    topNeeds: [
      { need: 'Coverage/Reliability', importance: 69 },
      { need: 'Network Security', importance: 54 },
      { need: 'Understands My Business', importance: 45 },
      { need: 'Price', importance: 38 },
      { need: 'Cybersecurity Offerings', importance: 36 },
    ],
    painPoints: [
      'HIPAA compliance is mandatory',
      'Multiple facilities across several states',
      'Medical devices require reliable, secure connectivity',
      'Staff mobility and communication critical',
      'Legacy systems and modern EHR integration',
      'Challenges with support understanding business impact of service issues',
      'Wants hyper-scaler level customer portal experience',
    ],
    currentProvider: 'Major enterprise provider, evaluating alternatives',
    
    leadProducts: ['AT&T Business Fiber', 'AT&T Business Mobility', 'VoIP', 'IoT', 'VPN', 'SD-WAN', 'Private 5G', 'Cloud Interconnect', 'Cybersecurity'],
    suggestProducts: ['Network Edge', 'Dedicated Internet', 'SIP Trunking', 'Fixed Wireless', 'Switched Ethernet'],
    avoidProducts: [],
    salesApproach: '70% of Segment 7 prefers AT&T. Patricia needs a strategic partner, not a vendor. Purchase cycle is 3+ months with formal RFP. She\'s planning 3-5 years ahead and values flexibility in contracts. Local presence and owning last mile of connectivity matters. Security is non-negotiable regardless of price.',
    keyTalkingPoints: [
      'AT&T serves 9 of the top 10 healthcare systems. We understand HIPAA requirements.',
      'SD-WAN with built-in security connects all 12 facilities with automatic failover',
      'IoT solutions for patient monitoring, asset tracking, and facility management',
      'Private 5G enables real-time telemedicine and medical device connectivity',
      'Our dedicated healthcare team provides single-point-of-contact for all locations',
    ],
    objectionsToPrepareFor: [
      '"We need HIPAA BAA agreements"—Absolutely, we provide comprehensive BAA coverage.',
      '"Switching 12 locations is risky"—We develop phased implementation plans. Most healthcare clients start with 2-3 pilot sites.',
      '"I want a customer portal like hyper scalers"—Let me show you our enterprise portal with real-time updates and proactive monitoring.',
    ],
    
    valueTier: 'platinum',
    estimatedAnnualValue: '$400K - $1.5M',
    buyingBehavior: 'rfp-driven',
    mindset: 'security-first',
    primaryNeed: 'security',
    decisionStyle: 'committee',
    productAffinity: 'full-stack',
    marketType: 'smb',
  },
  
  // =============================================================================
  // ENTERPRISE PERSONAS (2000+ FTEs)
  // From 2025 Enterprise Marketplace Segmentation Report
  // =============================================================================
  
  // ENTERPRISE: Healthcare
  {
    id: 'enterprise-hospital-cio',
    segmentId: 8,
    segmentName: 'Enterprise Healthcare',
    name: 'Dr. James Patterson',
    title: 'Chief Information Officer',
    company: 'Mercy Regional Health System',
    industry: 'Healthcare',
    avatar: '🏥',
    quote: "Network segmentation and IoMT security are non-negotiable. We need a partner who understands healthcare, not just connectivity.",
    
    employeeCount: '5,000-10,000',
    locations: '25+',
    revenue: '$2B+',
    techBudget: '>$50M',
    itStaff: '50+ FTEs',
    
    techSophistication: 'high',
    decisionMaker: 'IT Committee',
    researchMethod: 'RFP Process & Vendor Evaluations',
    influencers: ['CFO', 'CISO', 'CMO', 'Department Heads'],
    
    topNeeds: [
      { need: 'Network Reliability (24/7)', importance: 95 },
      { need: 'HIPAA Compliance', importance: 93 },
      { need: 'IoMT Security', importance: 88 },
      { need: 'Telehealth Support', importance: 82 },
      { need: 'Network Segmentation', importance: 80 },
    ],
    painPoints: [
      'Legacy network infrastructure limiting IoMT adoption',
      'Complex regulatory compliance across facilities',
      'Managing security across distributed locations',
      'Ensuring 24/7 uptime for critical care systems',
    ],
    currentProvider: 'Multiple incumbents',
    
    leadProducts: ['Dedicated Internet', 'SD-WAN', 'Cybersecurity', 'Network Edge'],
    suggestProducts: ['Private 5G', 'Cloud Interconnect', 'IoT Solutions'],
    avoidProducts: [],
    salesApproach: 'Lead with healthcare-specific expertise. Emphasize HIPAA compliance, network segmentation for IoMT, and 24/7 support. Engage clinical informatics and IT security stakeholders. Prepare for formal RFP process with detailed technical specifications.',
    keyTalkingPoints: [
      'AT&T has dedicated healthcare vertical expertise with HIPAA-compliant solutions',
      'Network segmentation keeps IoMT devices isolated from patient data systems',
      'SD-WAN provides resilient connectivity across all facilities with automatic failover',
      '24/7 NOC support with healthcare-specific escalation paths',
    ],
    objectionsToPrepareFor: [
      '"We have multiple incumbents and prefer best-of-breed"—Show how unified AT&T platform reduces complexity and total cost while maintaining best-in-class capabilities per domain.',
      '"Our current provider understands healthcare"—Present healthcare-specific case studies and dedicated vertical team credentials.',
    ],
    
    valueTier: 'platinum',
    estimatedAnnualValue: '$1.5M - $5M',
    buyingBehavior: 'rfp-driven',
    mindset: 'security-first',
    primaryNeed: 'security',
    decisionStyle: 'committee',
    productAffinity: 'full-stack',
    marketType: 'enterprise',
    enterpriseGrouping: 'healthcare',
  },
  
  // ENTERPRISE: Hospitality
  {
    id: 'enterprise-hotel-vpit',
    segmentId: 8,
    segmentName: 'Enterprise Hospitality',
    name: 'Michelle Torres',
    title: 'VP of Technology',
    company: 'Grandview Hospitality Group',
    industry: 'Hospitality',
    avatar: '🏨',
    quote: "Guest experience starts with reliable WiFi. But I also need to manage 200+ properties without 200 different solutions.",
    
    employeeCount: '5,000-10,000',
    locations: '200+',
    revenue: '$3B+',
    techBudget: '>$30M',
    itStaff: '100+ FTEs',
    
    techSophistication: 'high',
    decisionMaker: 'IT Leadership',
    researchMethod: 'Vendor Evaluations & Peer Networks',
    influencers: ['COO', 'CFO', 'Property GMs', 'Brand Leadership'],
    
    topNeeds: [
      { need: 'Unified Management', importance: 92 },
      { need: 'Guest WiFi Reliability', importance: 90 },
      { need: 'Scalability', importance: 88 },
      { need: 'Property Network Standardization', importance: 85 },
      { need: 'Cost Optimization', importance: 78 },
    ],
    painPoints: [
      'Managing multiple vendors across properties',
      'Inconsistent guest WiFi experience',
      'High cost of property-by-property IT support',
      'Seasonal demand spikes straining bandwidth',
    ],
    currentProvider: 'Mix of regional providers',
    
    leadProducts: ['SD-WAN', 'Dedicated Internet', 'Managed WiFi'],
    suggestProducts: ['IoT Solutions', 'Cloud Interconnect', 'Cybersecurity'],
    avoidProducts: [],
    salesApproach: 'Emphasize unified management and brand standardization. Show how single-vendor approach reduces complexity and improves guest experience consistency. Lead with property deployment speed and centralized monitoring.',
    keyTalkingPoints: [
      'Single management portal for all 200+ properties with centralized visibility',
      'SD-WAN enables consistent performance and automatic failover at each property',
      'Standardized guest WiFi experience enhances brand reputation and guest satisfaction scores',
      'Proactive monitoring prevents issues before they impact guest experience',
    ],
    objectionsToPrepareFor: [
      '"We have long-term contracts at individual properties"—Develop migration roadmap that phases in properties as contracts expire.',
      '"Local providers know our properties better"—Highlight AT&T national footprint with local presence and dedicated hospitality team.',
    ],
    
    valueTier: 'platinum',
    estimatedAnnualValue: '$2M - $6M',
    buyingBehavior: 'relationship-buyer',
    mindset: 'efficiency-obsessed',
    primaryNeed: 'integration',
    decisionStyle: 'c-suite',
    productAffinity: 'full-stack',
    marketType: 'enterprise',
    enterpriseGrouping: 'hospitality',
  },
  
  // ENTERPRISE: Industrials (Manufacturing)
  {
    id: 'enterprise-manufacturing-vp',
    segmentId: 8,
    segmentName: 'Enterprise Industrials',
    name: 'Michael Chen',
    title: 'VP of Operations Technology',
    company: 'Pacific Manufacturing Group',
    industry: 'Manufacturing',
    avatar: '🏭',
    quote: "OT and IT convergence is happening whether we like it or not. I need a partner who can secure both worlds.",
    
    employeeCount: '2,000-5,000',
    locations: '12',
    revenue: '$1.5B',
    techBudget: '>$25M',
    itStaff: '100+ FTEs',
    
    techSophistication: 'high',
    decisionMaker: 'OT/IT Leadership',
    researchMethod: 'Industry Analysts & Peer Networks',
    influencers: ['CTO', 'CISO', 'Plant Managers', 'Manufacturing Engineering'],
    
    topNeeds: [
      { need: 'OT/IT Network Segmentation', importance: 94 },
      { need: 'Uptime for Production Systems', importance: 92 },
      { need: 'IoT Connectivity', importance: 88 },
      { need: 'Remote Site Connectivity', importance: 85 },
      { need: 'Cybersecurity for OT', importance: 90 },
    ],
    painPoints: [
      'Legacy SCADA systems lack modern security',
      'OT/IT convergence creating security gaps',
      'Distributed plants with inconsistent connectivity',
      'Need for real-time production analytics',
    ],
    currentProvider: 'Regional fiber + cellular backup',
    
    leadProducts: ['Private 5G', 'SD-WAN', 'IoT Solutions', 'Cybersecurity'],
    suggestProducts: ['Network Edge', 'Dedicated Internet', 'Cloud Interconnect'],
    avoidProducts: [],
    salesApproach: 'Lead with OT security and network segmentation expertise. Emphasize AT&T industrial IoT capabilities and Private 5G for flexible factory floor connectivity. Show manufacturing-specific case studies and ROI through reduced downtime.',
    keyTalkingPoints: [
      'Private 5G provides secure, low-latency connectivity for factory floor devices',
      'Network segmentation keeps OT isolated from IT threats',
      'SD-WAN connects all 12 plants with consistent performance and visibility',
      'Edge computing enables real-time production analytics without cloud latency',
    ],
    objectionsToPrepareFor: [
      '"We\'re not ready for OT/IT convergence"—Position as gradual journey with immediate security benefits.',
      '"Private 5G is overkill for our needs"—Show ROI through flexibility, reduced cabling, and future-proofing.',
    ],
    
    valueTier: 'platinum',
    estimatedAnnualValue: '$1M - $3M',
    buyingBehavior: 'early-adopter',
    mindset: 'tech-optimist',
    primaryNeed: 'innovation',
    decisionStyle: 'it-led',
    productAffinity: 'full-stack',
    marketType: 'enterprise',
    enterpriseGrouping: 'industrials',
  },
  
  // ENTERPRISE: Professional Services (Financial)
  {
    id: 'enterprise-financial-cto',
    segmentId: 8,
    segmentName: 'Enterprise Professional Services',
    name: 'Robert Williams',
    title: 'Chief Technology Officer',
    company: 'Pinnacle Financial Corporation',
    industry: 'Financial Services',
    avatar: '🏦',
    quote: "Security isn't a feature, it's a foundation. Every vendor conversation starts with compliance.",
    
    employeeCount: '2,000-5,000',
    locations: '75',
    revenue: '$800M',
    techBudget: '>$40M',
    itStaff: '150+ FTEs',
    
    techSophistication: 'high',
    decisionMaker: 'Technology Committee',
    researchMethod: 'RFP Process & Regulatory Guidance',
    influencers: ['CISO', 'CFO', 'Compliance Officer', 'Branch Operations'],
    
    topNeeds: [
      { need: 'Compliance (SOC 2, PCI-DSS)', importance: 96 },
      { need: 'Network Security', importance: 95 },
      { need: 'Branch Connectivity', importance: 88 },
      { need: 'Business Continuity', importance: 92 },
      { need: 'Encrypted Connectivity', importance: 90 },
    ],
    painPoints: [
      'Regulatory scrutiny on third-party risk',
      'Branch network complexity',
      'Balancing digital transformation with security',
      'Multi-cloud connectivity challenges',
    ],
    currentProvider: 'Legacy MPLS provider',
    
    leadProducts: ['SD-WAN', 'Cybersecurity', 'Dedicated Internet', 'Cloud Interconnect'],
    suggestProducts: ['Network Edge', 'VoIP', 'Backup Solutions'],
    avoidProducts: [],
    salesApproach: 'Lead with compliance credentials and security certifications. Emphasize AT&T track record with financial services and regulatory expertise. Prepare detailed security documentation and third-party audit reports.',
    keyTalkingPoints: [
      'AT&T maintains SOC 2 Type II and supports PCI-DSS compliance requirements',
      'SD-WAN with integrated security replaces legacy MPLS with better performance and visibility',
      'Dedicated fiber at key branches with automatic failover protects business continuity',
      'Encrypted site-to-cloud connectivity for multi-cloud environments',
    ],
    objectionsToPrepareFor: [
      '"Our regulators are comfortable with current provider"—Provide regulatory references and compliance documentation.',
      '"MPLS is proven and reliable"—Show SD-WAN provides MPLS-level reliability with better agility and cost efficiency.',
    ],
    
    valueTier: 'platinum',
    estimatedAnnualValue: '$1.5M - $4M',
    buyingBehavior: 'rfp-driven',
    mindset: 'security-first',
    primaryNeed: 'security',
    decisionStyle: 'committee',
    productAffinity: 'full-stack',
    marketType: 'enterprise',
    enterpriseGrouping: 'professional-services',
  },
  
  // ENTERPRISE: Retail
  {
    id: 'enterprise-retail-cio',
    segmentId: 8,
    segmentName: 'Enterprise Retail',
    name: 'Jennifer Adams',
    title: 'Chief Information Officer',
    company: 'ValueMart Stores',
    industry: 'Retail',
    avatar: '🏬',
    quote: "POS downtime is lost revenue. With 500+ stores, even 1% downtime is millions in lost sales.",
    
    employeeCount: '10,000+',
    locations: '500+',
    revenue: '$5B+',
    techBudget: '>$80M',
    itStaff: '200+ FTEs',
    
    techSophistication: 'high',
    decisionMaker: 'IT Leadership',
    researchMethod: 'Vendor Evaluations & Industry Peers',
    influencers: ['COO', 'CFO', 'Store Operations', 'Loss Prevention'],
    
    topNeeds: [
      { need: 'POS Reliability', importance: 98 },
      { need: 'Store Network Uptime', importance: 96 },
      { need: 'Unified Store Management', importance: 90 },
      { need: 'Cost Optimization at Scale', importance: 85 },
      { need: 'Omnichannel Support', importance: 82 },
    ],
    painPoints: [
      'Managing 500+ store networks',
      'POS downtime impacting revenue',
      'Multiple vendor complexity',
      'Scaling for seasonal peaks',
    ],
    currentProvider: 'Mix of regional + national providers',
    
    leadProducts: ['SD-WAN', 'Dedicated Internet', 'LTE Backup'],
    suggestProducts: ['IoT Solutions', 'Cybersecurity', 'Cloud Interconnect'],
    avoidProducts: [],
    salesApproach: 'Lead with store network reliability and unified management. Quantify downtime costs and show ROI through reduced outages. Emphasize rapid deployment capability and centralized monitoring for 500+ locations.',
    keyTalkingPoints: [
      'SD-WAN with LTE backup ensures POS stays online even during primary circuit outages',
      'Centralized management portal provides visibility across all 500+ stores',
      'Standardized store network templates enable rapid new store deployment',
      'Automatic failover protects revenue during peak shopping periods',
    ],
    objectionsToPrepareFor: [
      '"We can\'t migrate 500 stores at once"—Propose phased rollout by region with pilot stores first.',
      '"Our current costs are already optimized"—Show TCO analysis including hidden costs of multi-vendor complexity.',
    ],
    
    valueTier: 'platinum',
    estimatedAnnualValue: '$3M - $8M',
    buyingBehavior: 'relationship-buyer',
    mindset: 'efficiency-obsessed',
    primaryNeed: 'connectivity',
    decisionStyle: 'c-suite',
    productAffinity: 'full-stack',
    marketType: 'enterprise',
    enterpriseGrouping: 'retail',
  },
  
  // ENTERPRISE: Technology
  {
    id: 'enterprise-tech-cto',
    segmentId: 8,
    segmentName: 'Enterprise Technology',
    name: 'Sarah Chen',
    title: 'Chief Technology Officer',
    company: 'Nexus Software Solutions',
    industry: 'Technology',
    avatar: '💻',
    quote: "Developer productivity depends on low-latency cloud connectivity. Lag kills velocity.",
    
    employeeCount: '2,000-5,000',
    locations: '8',
    revenue: '$500M',
    techBudget: '>$60M',
    itStaff: '200+ FTEs',
    
    techSophistication: 'high',
    decisionMaker: 'Engineering Leadership',
    researchMethod: 'Technical Evaluations & Peer Networks',
    influencers: ['VP Engineering', 'Platform Team', 'DevOps', 'Security'],
    
    topNeeds: [
      { need: 'Low-Latency Cloud Connectivity', importance: 95 },
      { need: 'Multi-Cloud Access', importance: 92 },
      { need: 'Global Office Connectivity', importance: 88 },
      { need: 'Developer Productivity', importance: 90 },
      { need: 'Scalability', importance: 86 },
    ],
    painPoints: [
      'Latency impacting developer experience',
      'Managing multi-cloud complexity',
      'Connecting global engineering teams',
      'Scaling bandwidth for CI/CD pipelines',
    ],
    currentProvider: 'Cloud-first with ISP connectivity',
    
    leadProducts: ['Cloud Interconnect', 'Dedicated Internet', 'SD-WAN'],
    suggestProducts: ['Cybersecurity', 'Network Edge'],
    avoidProducts: ['VoIP'],
    salesApproach: 'Speak the language of engineering—latency, throughput, availability. Lead with cloud interconnect and direct peering. Show technical architecture and performance benchmarks. Engage DevOps and platform engineering teams.',
    keyTalkingPoints: [
      'Direct cloud interconnect to AWS, Azure, and GCP with single-digit millisecond latency',
      'Dedicated fiber provides consistent bandwidth for CI/CD pipelines and large artifact transfers',
      'SD-WAN connects global offices with optimized routing and consistent developer experience',
      'Scalable bandwidth on-demand for development sprints and release cycles',
    ],
    objectionsToPrepareFor: [
      '"We\'re cloud-native and don\'t need traditional network"—Cloud interconnect is about optimizing cloud access, not replacing it.',
      '"We can just use the internet"—Show performance comparison and reliability differences for production workloads.',
    ],
    
    valueTier: 'platinum',
    estimatedAnnualValue: '$800K - $2M',
    buyingBehavior: 'early-adopter',
    mindset: 'tech-optimist',
    primaryNeed: 'innovation',
    decisionStyle: 'it-led',
    productAffinity: 'internet-first',
    marketType: 'enterprise',
    enterpriseGrouping: 'technology',
  },
];

export function getPersonasBySegment(segmentId: number): CustomerPersona[] {
  return customerPersonas.filter(p => p.segmentId === segmentId);
}

export function getPersonaById(id: string): CustomerPersona | undefined {
  return customerPersonas.find(p => p.id === id);
}

export function getAllSegments(): { id: number; name: string; businessCount: string }[] {
  const segments: { id: number; name: string; businessCount: string }[] = [];
  customerPersonas.forEach(p => {
    if (!segments.find(s => s.id === p.segmentId)) {
      const meta = smbSegmentMetadata[p.segmentId as keyof typeof smbSegmentMetadata];
      segments.push({ 
        id: p.segmentId, 
        name: p.segmentName,
        businessCount: meta?.businessCount || 'Unknown'
      });
    }
  });
  return segments.sort((a, b) => a.id - b.id);
}

export function getSegmentMetadata(segmentId: number) {
  return smbSegmentMetadata[segmentId as keyof typeof smbSegmentMetadata];
}

export function getPersonasByGrouping<K extends GroupingKey>(
  groupingKey: K,
  groupValue: CustomerPersona[K]
): CustomerPersona[] {
  return customerPersonas.filter(p => p[groupingKey] === groupValue);
}

export function getGroupedPersonas<K extends GroupingKey>(
  groupingKey: K
): Map<CustomerPersona[K], CustomerPersona[]> {
  const grouped = new Map<CustomerPersona[K], CustomerPersona[]>();
  customerPersonas.forEach(p => {
    const value = p[groupingKey];
    if (!grouped.has(value)) {
      grouped.set(value, []);
    }
    grouped.get(value)!.push(p);
  });
  return grouped;
}

// Get personas by market type
export function getPersonasByMarketType(marketType: 'smb' | 'enterprise' | 'all'): CustomerPersona[] {
  if (marketType === 'all') return customerPersonas;
  if (marketType === 'enterprise') {
    return customerPersonas.filter(p => p.marketType === 'enterprise');
  }
  // SMB includes personas without marketType or explicitly marked as smb
  return customerPersonas.filter(p => !p.marketType || p.marketType === 'smb');
}

// Get personas by enterprise grouping
export function getPersonasByEnterpriseGrouping(grouping: string): CustomerPersona[] {
  return customerPersonas.filter(p => p.enterpriseGrouping === grouping);
}
