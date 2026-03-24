export interface Product {
  id: string;
  name: string;
  category: 'connectivity' | 'voice' | 'mobility' | 'bundle' | 'iot' | 'security' | '24-hour-internet' | 'all-in-one';
  price: string;
  monthlyPrice: number;
  features: string[];
  talkingPoints: string[];
  valueProps: string[];
  // Value proposition statement with outcome-first structure
  valuePropositionStatement: {
    forTarget: string;
    // NEW: Lead with customer outcome
    customerOutcome: string;
    // NEW: What risk is mitigated
    riskMitigated: string;
    // NEW: Key differentiator (simplified)
    keyDifferentiator: string;
    // Legacy fields for backward compatibility
    whoNeed: string;
    andWant: string;
    productIs: string;
    keyBenefit: string;
    unlike: string;
    differentiation: string;
  };
  objectionHandling: { objection: string; response: string }[];
  bestFor: string[];
  competitiveAdvantages: string[];
  targetSegments: ('small-business' | 'mid-market' | 'enterprise')[];
  // NEW: Differentiate from consumer version
  businessDifferentiators?: string[];
}

export const products: Product[] = [
  // AT&T Business Fiber Products
  {
    id: 'business-fiber-300m',
    name: 'AT&T Business Fiber 300M',
    category: 'connectivity',
    price: '$70/mo',
    monthlyPrice: 70,
    features: [
      'Symmetrical 300 Mbps upload/download',
      '99.9% network reliability with 24/7 business support',
      'No data caps, no equipment fees, no annual contract',
      'Free installation when ordered online',
      'Built-in AT&T network security tools',
      'Options for bundling AT&T wireless backup, voice, security, and cloud solutions'
    ],
    valuePropositionStatement: {
      forTarget: 'Small businesses with 1-10 employees at a single site',
      customerOutcome: 'Your team works without waiting — uploads, downloads, video calls all happen the moment you need them',
      riskMitigated: 'No more lost productivity from slow connections or surprise bills throwing off your budget',
      keyDifferentiator: 'True fiber with symmetrical speeds and no contracts — business-grade without the business complexity',
      whoNeed: 'reliable internet for basic cloud operations, email, and web browsing',
      andWant: 'predictable costs without hidden fees, contracts, or surprise charges',
      productIs: 'AT&T Business Fiber 300M is shared fiber internet that\'s simple and flexible',
      keyBenefit: 'that delivers consistent symmetrical speeds using light-based fiber transmission for essential business operations',
      unlike: 'consumer-grade cable that transmits data using electricity with shared coax bandwidth and unreliable upload speeds',
      differentiation: 'providing shared fiber with symmetrical upload and download speeds, business-priority support, no contracts, and guaranteed reliability'
    },
    talkingPoints: [
      'Entry-level fiber that outperforms cable internet at comparable pricing',
      'Fiber transmits data using light instead of electricity - higher speeds and greater capacity than cable',
      'Symmetrical speeds mean uploads are just as fast as downloads - essential for cloud access and video conferencing',
      'No data caps, no equipment fees, no annual contract - complete flexibility',
      'Business-grade support available 24/7 with personalized portal access'
    ],
    valueProps: [
      'Simple pricing: $70/mo with no hidden fees',
      'No installation fees when ordered online',
      'Business priority support vs consumer queues',
      'Scalable - upgrade speeds up to 5 Gigs anytime as you grow',
      'Future-proofed infrastructure with multi-decade lifespan'
    ],
    objectionHandling: [
      {
        objection: "Consumer fiber is cheaper at home",
        response: "Consumer plans have deprioritized support, slower repair times, and terms that prohibit business use. Business Fiber includes 24/7 dedicated support, built-in security tools, and 99.9% reliability designed for business-critical operations."
      },
      {
        objection: "300 Mbps doesn't seem fast enough",
        response: "300 Mbps symmetrical handles 5-10 users comfortably with video conferencing, cloud backups, and VoIP. If you need more, you can upgrade anytime up to 5 Gigs - no contract locks you in."
      },
      {
        objection: "What about multi-location needs?",
        response: "For a single site or temporary location, Business Fiber is ideal with no contract. For multiple sites, AT&T HSIA-E offers a single service agreement, unified billing, and dedicated enterprise support across all locations."
      }
    ],
    bestFor: ['Small offices', 'Startups', 'Professional services', 'Single-location businesses', 'Temporary locations'],
    competitiveAdvantages: [
      'True fiber vs cable coax infrastructure - data travels at the speed of light',
      'Symmetrical speeds (cable typically 35 Mbps upload max)',
      '99.9% network reliability SLA',
      'No contracts, no equipment fees, no data caps'
    ],
    targetSegments: ['small-business'],
    businessDifferentiators: [
      'Business-priority 24/7 support vs consumer wait times',
      'Static IP available for hosting and VPN',
      'Built-in network security and threat detection',
      'Terms allow commercial use (consumer plans prohibit this)',
      'Options for wireless internet backup to ensure business continuity',
      'Personalized portal for service management'
    ]
  },
  {
    id: 'business-fiber-1g',
    name: 'AT&T Business Fiber 1 GIG',
    category: 'connectivity',
    price: '$160/mo',
    monthlyPrice: 160,
    features: [
      'Symmetrical speeds up to 1 Gbps',
      'Built-in 5G wireless backup at no extra cost (integrated gateway with 1G+ orders)',
      'Wi-Fi 6E gateway included',
      '99.9% network reliability with 24/7 business support',
      'Built-in network security and threat detection',
      'No data caps, no equipment fees, no annual contract',
      'Free installation when ordered online',
      'Options for bundling voice, security, and cloud solutions'
    ],
    valuePropositionStatement: {
      forTarget: 'Growing businesses running cloud-dependent operations',
      customerOutcome: 'Your business stays connected when it matters most — with automatic 5G backup, you never tell a customer "our system is down"',
      riskMitigated: 'Eliminate the risk of losing sales, productivity, and customer trust during outages',
      keyDifferentiator: 'The only provider with built-in 5G backup at no extra cost',
      whoNeed: 'fast, reliable connectivity that won\'t fail during critical business moments',
      andWant: 'peace of mind with automatic failover and no unexpected downtime costs',
      productIs: 'AT&T Business Fiber 1 GIG is shared fiber internet with integrated 5G backup',
      keyBenefit: 'that ensures your business stays connected with automatic 5G failover using fiber\'s low-latency infrastructure for cloud computing and AI applications',
      unlike: 'consumer fiber plans without backup or cable internet that degrades during peak hours',
      differentiation: 'providing the only built-in 5G backup in the market with symmetrical speeds, fiber\'s future-proofed multi-decade lifespan, and AT&T Guarantee'
    },
    talkingPoints: [
      'ONLY provider with built-in 5G backup at no extra cost - integrated gateway included with 1G+ orders',
      'Fiber transmits data using light - handles multi-cloud computing and AI with low latency',
      'Symmetrical 1 Gbps speeds - uploads match downloads for video conferencing, HD streaming, and VoIP',
      'AT&T Managed Internet Backup: seamless wireless failover to AT&T Wireless Network during outages',
      'Future-proofed: fiber\'s multi-decade lifespan handles technologies we haven\'t dreamed up yet'
    ],
    valueProps: [
      'Built-in 5G backup included at no additional cost - competitors charge $50-100/mo',
      'Symmetrical speeds: 1 Gbps up AND down - essential for cloud access',
      'Wi-Fi 6E gateway for faster speeds, lower latency, greater range',
      '24/7 business-priority support with personalized portal',
      'AT&T Guarantee with credits for downtime over 20 minutes'
    ],
    objectionHandling: [
      {
        objection: "Consumer fiber is much cheaper",
        response: "Consumer plans lack the built-in 5G backup ($50-100/mo value), business-priority support, and the AT&T Guarantee. Business Fiber also includes built-in security tools. When you factor in backup service costs and downtime risk, Business Fiber delivers better total value."
      },
      {
        objection: "We already have cable internet",
        response: "Fiber transmits data using light instead of electricity, providing much higher speeds and greater capacity than cable. Cable offers shared bandwidth that degrades during peak hours with upload speeds typically maxing at 35 Mbps. Business Fiber provides symmetrical speeds - your upload matches your download."
      },
      {
        objection: "The price seems high",
        response: "Factor in the value: 5G backup alone is worth $50-100/mo from competitors. Add the Wi-Fi 6E gateway, built-in security tools, 24/7 support, and AT&T Guarantee. The real question is: what does an hour of downtime cost your business?"
      },
      {
        objection: "What if we have multiple locations?",
        response: "For a single site, Business Fiber 1 GIG is ideal. For multiple sites, AT&T HSIA-E offers the same fast, reliable features with a single service agreement, unified billing, and one support number for all locations."
      }
    ],
    bestFor: ['Multi-device environments', 'Remote workforce support', 'Cloud-dependent businesses', 'Video conferencing heavy users', 'IoT device environments'],
    competitiveAdvantages: [
      'Only provider with built-in 5G backup at no extra charge',
      'Leader in U.S. Fiber Lit Buildings for 9 consecutive years',
      'AT&T Guarantee - fiber downtime credits for outages 20+ minutes',
      'Fiber\'s low-latency infrastructure meets demands of multi-cloud computing and AI'
    ],
    targetSegments: ['small-business', 'mid-market'],
    businessDifferentiators: [
      'Built-in 5G backup with integrated gateway - consumer plans have no backup option',
      'AT&T Managed Internet Backup for seamless wireless failover during outages',
      'AT&T Guarantee with downtime credits for outages over 20 minutes',
      'Business-priority 24/7 support with personalized portal',
      'Network security and threat detection included',
      'Dynamic IP addressing via wireless gateway protects sensitive POS transactions'
    ]
  },
  {
    id: 'business-fiber-5g',
    name: 'AT&T Business Fiber 5 GIG',
    category: 'connectivity',
    price: '$285/mo',
    monthlyPrice: 285,
    features: [
      'Symmetrical speeds up to 5 Gbps (single device wired max: 4.7 Gbps)',
      'Built-in 5G wireless backup with integrated gateway',
      'Wi-Fi 6E gateway included',
      '99.9% network reliability with 24/7 business support',
      'Built-in network security and threat detection',
      'No data caps, no equipment fees, no annual contract',
      'Options for bundling voice, security, and cloud solutions'
    ],
    valuePropositionStatement: {
      forTarget: 'Data-intensive businesses needing maximum bandwidth',
      customerOutcome: 'Your team works at full speed no matter how demanding the task — AI, video production, massive file transfers all happen without waiting',
      riskMitigated: 'Never worry about bandwidth bottlenecks slowing your most critical operations',
      keyDifferentiator: 'Highest symmetrical speeds available with built-in 5G backup — enterprise performance, business simplicity',
      whoNeed: 'maximum network performance for large file transfers, video production, AI applications, or high-priority transaction processing',
      andWant: 'future-proofed infrastructure that scales with growth without performance compromises',
      productIs: 'AT&T Business Fiber 5 GIG is maximum-performance shared fiber internet',
      keyBenefit: 'that delivers 5x the speed of standard 1 Gbps plans with fiber\'s dynamic, low-latency infrastructure for the most demanding business operations',
      unlike: 'consumer plans capped at lower speeds or cable infrastructure that degrades under heavy load',
      differentiation: 'offering the highest symmetrical speeds available — uploads match downloads — with integrated 5G backup and fiber\'s multi-decade lifespan for future technologies'
    },
    talkingPoints: [
      'Maximum performance: symmetrical speeds up to 5 Gbps - handles AI, multi-cloud, and edge computing',
      'Single device wired speed up to 4.7 Gbps - true enterprise performance at single-site simplicity',
      'Fiber\'s highly resilient, low-latency infrastructure meets demands we haven\'t dreamed up yet',
      'Same integrated 5G backup protection as 1 GIG tier - no extra cost',
      'Ideal for high-speed data processing, large downloads, and near-instant IoT communication'
    ],
    valueProps: [
      'Highest symmetrical speed tier in the market - up to 5 Gbps',
      'Handles dozens of simultaneous users with video, cloud, and large file transfers',
      'Future-proofs your infrastructure with fiber\'s multi-decade lifespan',
      'Business-grade performance with small business simplicity - no annual contract'
    ],
    objectionHandling: [
      {
        objection: "Do we really need 5 Gbps?",
        response: "Fiber's dynamic infrastructure meets the speed and bandwidth demands of multi-cloud computing and AI. With technologies evolving rapidly, 5 GIG future-proofs your infrastructure - there's plenty of room to grow as new solutions emerge."
      },
      {
        objection: "We're not that big of a company",
        response: "Even 20-person teams with heavy cloud usage, video editing, or AI/ML workloads can saturate a 1 Gbps connection. 5 GIG ensures everyone works at full productivity simultaneously without competing for bandwidth."
      },
      {
        objection: "What if we have multiple locations?",
        response: "For a single site needing maximum bandwidth, Business Fiber 5 GIG is ideal. For multiple sites, AT&T HSIA-E offers the same symmetrical speeds up to 5 Gbps with a single service agreement and unified billing across all locations."
      }
    ],
    bestFor: ['Data-intensive operations', 'AI/ML workloads', 'Tech companies', 'Healthcare facilities', 'Financial services', 'Video production'],
    competitiveAdvantages: [
      'Highest symmetrical speed tier available in the market',
      'Built-in 5G backup eliminates need for separate backup service',
      'Fiber transmits data using light - handles demands cable infrastructure cannot match',
      'Future-proofed with fiber\'s multi-decade lifespan'
    ],
    targetSegments: ['mid-market', 'enterprise'],
    businessDifferentiators: [
      '5 GIG speeds not available on consumer products',
      'Integrated 5G backup with gateway included',
      'Business-grade performance without complex enterprise contracts',
      'Network security included',
      'Ideal for high-priority transaction processing and IoT device environments'
    ]
  },
  {
    id: 'hsia-enterprise',
    name: 'AT&T High Speed Internet Access – Enterprise (HSIA-E)',
    category: 'connectivity',
    price: 'Custom pricing',
    monthlyPrice: 0,
    features: [
      'Symmetrical speeds up to 5 Gbps',
      'Multi-location management under single service agreement (1-3 year contract)',
      'Single unified bill for all locations',
      'Platform ready for SD-WAN or MPLS augmentation',
      'Dedicated 24/7 business support via single contact number for all sites',
      'No equipment fees - installation fees vary by contract terms',
      'No speed or data caps',
      'Options for bundling AT&T backup, voice, security, and cloud solutions'
    ],
    valuePropositionStatement: {
      forTarget: 'Companies with multiple sites or branch offices',
      customerOutcome: 'Every location runs at the same speed, with the same reliability — no weak links in your network',
      riskMitigated: 'Stop juggling multiple vendors, multiple bills, and finger-pointing when something breaks',
      keyDifferentiator: 'One contract, one bill, one support number for all locations — true enterprise orchestration',
      whoNeed: 'consistent, high-performance connectivity across all business sites',
      andWant: 'simplified vendor management, unified billing, and dedicated enterprise support',
      productIs: 'AT&T HSIA-E is business-grade multi-location shared fiber internet',
      keyBenefit: 'that consolidates all locations under one contract with dedicated enterprise support, unified billing, and faster issue resolution',
      unlike: 'fragmented local provider relationships with inconsistent service, multiple bills, and different support contacts',
      differentiation: 'providing true enterprise orchestration with one contract, one bill, one support number across all locations backed by 850,000+ fiber-lit buildings'
    },
    talkingPoints: [
      'Designed specifically for multi-location enterprises - mid and large-sized companies',
      'One contract, one bill across ALL locations - dramatically simplified management',
      'Single contact number for ALL sites: orders, maintenance, billing - faster resolutions',
      'Same great ABF features: symmetrical speeds up to 5 Gbps, 99.9% reliability, built-in security',
      'National AT&T fiber footprint: 850,000+ fiber-lit buildings, ~4 million U.S. business locations'
    ],
    valueProps: [
      'Single service agreement (1-3 years) simplifies procurement and reduces overhead',
      'Unified billing for easier expense tracking and accounting',
      'Business-grade support with single contact number for all sites',
      'Scalable architecture supports business growth seamlessly',
      'No equipment fees - predictable cost structure'
    ],
    objectionHandling: [
      {
        objection: "We have different providers at each location",
        response: "That fragmentation creates management headaches, inconsistent service, and multiple vendor relationships. HSIA-E provides uniform service across all locations with one contract, one bill, and one support number - making issue resolution faster and more productive."
      },
      {
        objection: "Custom pricing sounds expensive",
        response: "Custom pricing works in your favor - we design a solution for your specific needs across all locations, often providing better value than piecing together individual contracts. Plus, no equipment fees keeps costs predictable."
      },
      {
        objection: "What's the difference from AT&T Business Fiber?",
        response: "AT&T Business Fiber is ideal for single sites with no annual contract required. HSIA-E is built for multi-site enterprises - you get a single service agreement, unified billing across all locations, and dedicated enterprise support through one contact number for faster issue resolution."
      }
    ],
    bestFor: ['Multi-location enterprises', 'Retail chains', 'Healthcare networks', 'Financial institutions', 'Franchise operations', 'Branch offices'],
    competitiveAdvantages: [
      'True business-grade service with dedicated support for multi-site businesses',
      'Single contact number for all sites - faster, more productive issue resolution',
      'National fiber footprint: 850,000+ fiber-lit buildings',
      'Leader in U.S. Fiber Lit Buildings for 9 consecutive years'
    ],
    targetSegments: ['mid-market', 'enterprise'],
    // Differentiation from AT&T Business Fiber
    businessDifferentiators: [
      'Multi-site vs single-site: HSIA-E designed for multiple locations, ABF for single/temporary sites',
      'Contract structure: 1-3 year service agreement vs no annual contract',
      'Unified billing: Single invoice for all locations vs per-location billing',
      'Enterprise support: Single contact number for all sites vs per-location support',
      'National reach: Leverage AT&T\'s 850,000+ fiber-lit building footprint'
    ]
  },
  // AT&T Dedicated Internet (ADI) - Enterprise-Grade, Mission-Critical Connectivity
  // NOTE: Dynamic Defense is currently available ONLY with ADI (and Switched Ethernet on Demand with Internet Offload)
  // Future: Dynamic Defense planned for AT&T Business Fiber (ABF) products
  {
    id: 'dedicated-internet',
    name: 'AT&T Dedicated Internet',
    category: 'connectivity',
    price: 'Custom pricing',
    monthlyPrice: 0,
    features: [
      'America\'s #1 dedicated internet provider (Frost Radar)',
      'Symmetrical speeds from 10 Mbps up to 1 Tbps',
      '100% uptime guarantee with industry-leading SLAs',
      'Proactive monitoring and rapid fault resolution',
      'Diversity and resiliency capabilities with priority network restoration',
      'Personalized portal to control speeds, ports, and inventory',
      'Prioritize business-critical traffic to meet evolving needs',
      'Always delivered over fiber connection - best-in-class performance against signal loss',
      'AT&T Dynamic Defense Shield included at no additional cost (Standard package)',
      '#1 in Customer Satisfaction - Large Enterprise and Medium Business (J.D. Power)',
      '#1 on U.S. Business Fiber Leaderboard for 9 consecutive years',
      'Dedicated account managers and expert-led onboarding'
    ],
    valuePropositionStatement: {
      forTarget: 'Mission-critical businesses where downtime is not an option',
      customerOutcome: 'Your operations run 24/7/365 without interruption — private bandwidth, proactive monitoring, and priority restoration when seconds matter',
      riskMitigated: 'Eliminate the risk of shared bandwidth slowdowns and unplanned outages impacting your business',
      keyDifferentiator: '100% uptime guarantee with AT&T Dynamic Defense security included — America\'s #1 dedicated internet provider',
      whoNeed: 'the most reliable, secure, and fastest business internet with guaranteed uptime',
      andWant: 'private, unshared bandwidth with proactive monitoring and priority restoration',
      productIs: 'AT&T Dedicated Internet is America\'s #1 dedicated internet provider',
      keyBenefit: 'that delivers blazing-fast symmetrical speeds up to 1 Tbps with 100% uptime guarantee, proactive monitoring, and built-in AT&T Dynamic Defense security at no additional cost',
      unlike: 'shared internet services where bandwidth is contested and reliability varies',
      differentiation: 'providing private, unshared connectivity with industry-leading SLAs, priority restoration, and network-embedded security powered by AT&T Dynamic Defense'
    },
    talkingPoints: [
      'America\'s #1 dedicated internet provider - recognized by Frost Radar for comprehensive offerings and nationwide network',
      '100% uptime guarantee with industry-leading SLAs - for when there\'s NO margin for downtime',
      'Symmetrical speeds: uploads match downloads from 10 Mbps to 1 Tbps - scales with your business',
      'Always delivered over fiber - fast, reliable performance even across long distances',
      'AT&T Dynamic Defense Shield INCLUDED at no additional cost - detects and blocks millions of threats',
      '#1 in Customer Satisfaction for Large Enterprise and Medium Business Internet (J.D. Power)',
      '#1 on U.S. Business Fiber Leaderboard for 9 consecutive years (Vertical Systems Group)',
      'AT&T Guarantee provides proactive notification in the event of service disruption'
    ],
    valueProps: [
      'Private, unshared bandwidth - your traffic never competes with other businesses',
      '100% uptime guarantee backed by industry-leading SLAs',
      'Proactive monitoring catches issues before they impact your business',
      'Priority network restoration when issues occur',
      'Built-in security with AT&T Dynamic Defense Shield at no extra cost',
      'Personalized portal for real-time control of speeds, ports, and inventory',
      'Expert-led onboarding with dedicated account managers minimizes transition disruption'
    ],
    objectionHandling: [
      {
        objection: "It's too expensive",
        response: "Consider the long-term ROI: increased productivity, 100% uptime guarantee, reduced downtime costs, and built-in Dynamic Defense security at no extra charge. What does an hour of downtime cost your business? ADI is designed for when there's no margin for downtime."
      },
      {
        objection: "We're happy with our current provider",
        response: "AT&T is America's #1 dedicated internet provider with industry-leading SLAs, 100% uptime guarantee, and #1 customer satisfaction ratings from J.D. Power for both Large Enterprise and Medium Business. Plus, we're #1 on the U.S. Fiber Leaderboard for 9 consecutive years."
      },
      {
        objection: "We don't need that much bandwidth",
        response: "ADI offers scalable bandwidth from 10 Mbps to 1 Tbps - we right-size to your needs today with room to grow. The value is in the guaranteed uptime, proactive monitoring, and included security, not just raw speed."
      },
      {
        objection: "Internet is not secure enough",
        response: "AT&T Dynamic Defense is included at no additional cost - it detects and blocks millions of internet threats before they reach your business. For enhanced protection, upgrade to Advanced or Premium packages for comprehensive threat detection and protection against sophisticated cyberattacks."
      },
      {
        objection: "Switching will disrupt our business",
        response: "Our expert-led onboarding with dedicated account managers and technical support is designed to minimize disruption during transition. We've helped thousands of enterprises migrate seamlessly."
      },
      {
        objection: "What's the difference from Business Fiber?",
        response: "Business Fiber is shared internet ideal for single sites with flexible terms. Dedicated Internet provides PRIVATE, unshared bandwidth with 100% uptime guarantee, industry-leading SLAs, proactive monitoring, and priority restoration - for mission-critical operations where downtime is not an option."
      }
    ],
    bestFor: ['Mission-critical operations', 'Large enterprises', 'Healthcare networks', 'Financial institutions', 'Data centers', 'Businesses requiring guaranteed uptime', 'High-security environments'],
    competitiveAdvantages: [
      'America\'s #1 dedicated internet provider (Frost Radar)',
      '100% uptime guarantee with industry-leading SLAs',
      'AT&T Dynamic Defense Shield included at no additional cost',
      '#1 Customer Satisfaction - Large Enterprise AND Medium Business (J.D. Power)',
      '#1 U.S. Business Fiber Leaderboard for 9 consecutive years',
      'AT&T has the largest fiber footprint in the U.S.',
      'Nation\'s fastest internet and wireless network (RootMetrics/Ookla)',
      'Always delivered over fiber - never copper or cable'
    ],
    targetSegments: ['mid-market', 'enterprise'],
    businessDifferentiators: [
      'DEDICATED (private) vs SHARED bandwidth - your traffic never competes',
      '100% uptime guarantee vs best-effort reliability',
      'Proactive monitoring vs reactive support',
      'Priority network restoration vs standard queue',
      'AT&T Dynamic Defense INCLUDED vs security sold separately',
      'Industry-leading SLAs with AT&T Guarantee notification',
      'Symmetrical speeds up to 1 Tbps - true enterprise scale'
    ]
  },
  // AT&T Internet Air for Business
  {
    id: 'internet-air-business',
    name: 'AT&T Internet Air for Business',
    category: 'connectivity',
    price: 'From $50/mo',
    monthlyPrice: 50,
    features: [
      'Fast, reliable 5G wireless internet',
      'No overage charges',
      'Two simple plans available',
      'Predictable monthly pricing - no increase at 12 months',
      'Self-setup in minutes - faster than cable installation',
      'Access to 5G/5G+ networks',
      'Premium plan: 250GB AT&T Turbo for Business priority data'
    ],
    valuePropositionStatement: {
      forTarget: 'Businesses needing connectivity where fiber isn\'t available',
      customerOutcome: 'You\'re online and serving customers within hours, not weeks — no waiting for fiber installation',
      riskMitigated: 'Stop losing revenue to long installation waits or locations without wired options',
      keyDifferentiator: 'Business-grade 5G connectivity with priority data — setup in minutes, not months',
      whoNeed: 'reliable internet connectivity at remote, temporary, or underserved locations',
      andWant: 'quick setup without lengthy installation waits or infrastructure requirements',
      productIs: 'AT&T Internet Air for Business is 5G fixed wireless internet for business',
      keyBenefit: 'that provides business-grade connectivity in minutes at locations where fiber isn\'t available',
      unlike: 'consumer fixed wireless with residential support and no business features',
      differentiation: 'offering business-priority service with AT&T Turbo for Business priority data and predictable pricing'
    },
    talkingPoints: [
      'Perfect solution when fiber isn\'t available at your location',
      'Setup in minutes vs. weeks for cable/fiber installation',
      'AT&T Turbo for Business (Premium plan): 250GB priority data for better performance',
      'No overage charges and predictable monthly pricing'
    ],
    valueProps: [
      'Deploy connectivity in minutes, not weeks',
      'Cost-effective for remote or temporary locations',
      'Premium plan includes priority data for business-critical operations',
      'No long-term contracts with predictable pricing'
    ],
    objectionHandling: [
      {
        objection: "Is wireless internet reliable enough for business?",
        response: "AT&T Internet Air leverages our 5G network with fiber-connected cell sites. For locations without fiber, this delivers business-grade performance. The Premium plan includes priority data for consistent speeds."
      },
      {
        objection: "Consumer fixed wireless is cheaper",
        response: "Consumer plans lack business priority data, have residential-level support, and terms prohibit commercial use. Business Internet Air includes Turbo for Business priority on Premium plan and 24/7 business support."
      }
    ],
    bestFor: ['Remote locations', 'Pop-up stores', 'Construction sites', 'Temporary offices', 'Backup connectivity', 'Rural businesses'],
    competitiveAdvantages: [
      'Faster deployment than cable or fiber installation',
      'No overage charges unlike some competitors',
      'Predictable pricing without 12-month increases',
      'Backed by AT&T\'s extensive 5G network'
    ],
    targetSegments: ['small-business', 'mid-market'],
    businessDifferentiators: [
      'AT&T Turbo for Business priority data (Premium plan)',
      'Business-priority 24/7 support',
      'Terms allow commercial use',
      'Predictable pricing without increases'
    ]
  },
  // AT&T Business Voice
  {
    id: 'business-voice',
    name: 'AT&T Business Voice',
    category: 'voice',
    price: 'From $30/line/mo',
    monthlyPrice: 30,
    features: [
      'Cloud-based VoIP with TLS encryption',
      '24-hour built-in battery backup',
      'Optional automatic wireless failover',
      'Auto attendant for professional call routing',
      'Voicemail with email integration',
      'Call forwarding and 3-way calling',
      'Self-service voice portal',
      'Digital Phone Call Protect (robocall/spam blocking)',
      'E911 support',
      'Certified for utility lines (fire alarms, elevators, security)'
    ],
    valuePropositionStatement: {
      forTarget: 'Businesses replacing legacy phone systems',
      customerOutcome: 'Your calls connect every time — with 24-hour backup, you never miss an important customer',
      riskMitigated: 'Eliminate downtime from power outages and the compliance risk of uncertified utility lines',
      keyDifferentiator: 'The only VoIP certified for utility lines with built-in 24-hour battery backup',
      whoNeed: 'secure, reliable voice communications with modern features',
      andWant: 'simplified management with compliance for utility lines and emergency services',
      productIs: 'AT&T Business Voice is all-in-one cloud business telephony',
      keyBenefit: 'that replaces complex legacy systems with secure, reliable cloud voice including utility line certification',
      unlike: 'consumer VoIP services that lack compliance certifications or business reliability features',
      differentiation: 'providing the only solution certified for utility lines (fire alarms, elevators) with 24-hour battery backup and 150 years of voice expertise'
    },
    talkingPoints: [
      'All-in-one solution: hardware, data, phone service for one monthly rate',
      'CERTIFIED for utility lines: fire alarms, elevators, security - competitors often aren\'t compliant',
      '24-hour battery backup plus optional wireless failover - stays up when power goes down',
      '150 years of AT&T voice expertise - the trusted name in business communications'
    ],
    valueProps: [
      '82% of SMBs reduced costs moving to cloud communications',
      '94% of SMBs report security benefits from cloud migration',
      'Consolidate voice with one provider to simplify management',
      'User-friendly self-service portal for easy feature management'
    ],
    objectionHandling: [
      {
        objection: "We have a PBX system that still works",
        response: "Legacy PBX lacks modern features: mobile integration, cloud backup, spam blocking, and remote management. AT&T Business Voice provides these while supporting your existing analog equipment during transition."
      },
      {
        objection: "VoIP isn't reliable enough",
        response: "AT&T Business Voice includes 24-hour battery backup and optional wireless failover. With proactive monitoring and automatic failover, you get MORE reliability than traditional landlines."
      },
      {
        objection: "We need lines for fire alarms and elevators",
        response: "Perfect fit - AT&T Business Voice is specifically CERTIFIED for utility lines including fire alarms, elevators, security alarms, and medical monitoring. Many VoIP providers can't meet these compliance requirements."
      }
    ],
    bestFor: ['Businesses replacing legacy phone systems', 'Multi-line environments', 'Compliance-required industries', 'Locations needing utility line support'],
    competitiveAdvantages: [
      'Certified for utility lines (fire alarms, elevators) - competitors often aren\'t',
      '24-hour battery backup included standard',
      'Digital Phone Call Protect blocks robocalls and spam',
      'Nearly 150 years of AT&T voice expertise'
    ],
    targetSegments: ['small-business', 'mid-market', 'enterprise'],
    businessDifferentiators: [
      'Utility line certification not available on consumer VoIP',
      '24-hour battery backup standard',
      'E911 compliance for business requirements',
      'Multi-location billing consolidation'
    ]
  },
  // Business Mobility
  {
    id: 'enterprise-mobility-custom',
    name: 'AT&T Custom Key Enterprise Unlimited',
    category: 'mobility',
    price: 'Custom pricing',
    monthlyPrice: 0,
    features: [
      'Custom enterprise pricing',
      '3-year service commitments for best pricing',
      'Dedicated account management',
      'Private Mobile Connection (Custom APN)',
      'Mobile Device Management integration',
      'AT&T Turbo for Business priority data',
      'On-premises cellular network options',
      'Multi-Access Edge Computing (MEC)'
    ],
    valuePropositionStatement: {
      forTarget: 'Large enterprises requiring custom mobility solutions',
      customerOutcome: 'Your mobile workforce operates with enterprise security and private connectivity — sensitive data stays protected',
      riskMitigated: 'Eliminate the risk of data exposure on public networks and coverage gaps in your facilities',
      keyDifferentiator: 'Private Mobile Connection and on-premises cellular options unavailable in any standard plan',
      whoNeed: 'advanced security, private connectivity, and custom pricing for large device fleets',
      andWant: 'dedicated account management and integration with existing enterprise systems',
      productIs: 'AT&T Custom Key Enterprise Unlimited is custom enterprise mobility',
      keyBenefit: 'that provides true business-grade mobility with private connectivity, custom pricing, and dedicated management',
      unlike: 'standard business plans without customization or enterprise security options',
      differentiation: 'offering Private Mobile Connection, on-premises cellular, and MEC capabilities unavailable in any standard plan'
    },
    talkingPoints: [
      'True business-grade mobility designed for the rigors of your business',
      'Private Mobile Connection (Custom APN) for security-sensitive data',
      'On-premises cellular for in-building coverage challenges',
      '3-year commitments unlock best device pricing (iPad at $49.99)'
    ],
    valueProps: [
      'Custom pricing tailored to your device mix and usage',
      'Integration with Cisco WebEx and Teams Phone Mobile',
      'Fleet solutions, video for fleets, IoT connectivity',
      'Private routing for sensitive data'
    ],
    objectionHandling: [
      {
        objection: "Custom deals take too long",
        response: "Our Deal Desk is designed for efficient enterprise engagements. We turn around custom proposals in days, not weeks - we understand the value of your time."
      },
      {
        objection: "3-year commitment is too long",
        response: "The 3-year commitment unlocks our best device pricing - iPad 10th Gen at just $49.99. This commitment provides budget predictability and locks in favorable rates."
      }
    ],
    bestFor: ['Large enterprises', 'Multi-national organizations', 'High-security industries', 'Complex mobility needs'],
    competitiveAdvantages: [
      'Most comprehensive enterprise mobility portfolio',
      'Private Mobile Connection for security-sensitive organizations',
      'On-premises cellular and MEC capabilities',
      'Integration with leading UC platforms'
    ],
    targetSegments: ['enterprise']
  },
  // IoT Products
  {
    id: 'fleet-solutions',
    name: 'AT&T Fleet Solutions',
    category: 'iot',
    price: 'Custom pricing',
    monthlyPrice: 0,
    features: [
      'GPS fleet tracking',
      'Video for fleets (dash cameras)',
      'OEM telematics integration',
      'Driver behavior monitoring',
      'Route optimization',
      'Fuel management',
      'Compliance reporting',
      'Real-time alerts'
    ],
    valuePropositionStatement: {
      forTarget: 'Businesses operating vehicle fleets',
      customerOutcome: 'You see every truck, every route, every driver in real-time — no more guessing where your fleet is',
      riskMitigated: 'Reduce accident liability with video evidence and eliminate fuel waste from inefficient routing',
      keyDifferentiator: 'End-to-end fleet intelligence with video, telematics, and behavior monitoring in one solution',
      whoNeed: 'visibility into fleet operations, driver safety, and operational efficiency',
      andWant: 'integrated solutions that reduce costs, improve safety, and simplify compliance',
      productIs: 'AT&T Fleet Solutions is comprehensive fleet management',
      keyBenefit: 'that transforms fleet operations with real-time visibility, video intelligence, and automated compliance',
      unlike: 'basic GPS tracking solutions without video or behavior analytics',
      differentiation: 'providing end-to-end fleet intelligence including video, telematics, and behavior monitoring on AT&T\'s IoT network'
    },
    talkingPoints: [
      'Complete fleet visibility from location to driver behavior',
      'Video intelligence protects your business and exonerates drivers in claims',
      'Route optimization and fuel management reduce operating costs',
      'Automated compliance reporting saves administrative time'
    ],
    valueProps: [
      'Reduce fuel costs through route optimization',
      'Lower liability with video evidence of incidents',
      'Improve safety with driver behavior monitoring',
      'Simplify compliance with automated reporting'
    ],
    objectionHandling: [
      {
        objection: "We already have GPS tracking",
        response: "Basic GPS is just the start. AT&T Fleet Solutions adds video intelligence, driver behavior analysis, and OEM integration that transforms data into actionable insights for cost reduction and safety improvement."
      },
      {
        objection: "Drivers won't like being monitored",
        response: "Position this as driver protection. Video evidence exonerates drivers in false claims, and telematics data often enables insurance savings that can be shared as driver incentives."
      }
    ],
    bestFor: ['Transportation companies', 'Delivery services', 'Field service businesses', 'Construction fleets'],
    competitiveAdvantages: [
      'End-to-end solution on AT&T\'s IoT network',
      'Video intelligence included',
      'OEM telematics integration',
      'Dedicated IoT support'
    ],
    targetSegments: ['small-business', 'mid-market', 'enterprise']
  },
  // Cybersecurity - Dynamic Defense (for network security, NOT mobile devices)
  // IMPORTANT: Dynamic Defense is currently available ONLY with:
  //   - AT&T Dedicated Internet (ADI) - Standard package FREE for life of circuit
  //   - AT&T Switched Ethernet on Demand with Internet Offload
  // FUTURE: Dynamic Defense planned for AT&T Business Fiber (ABF) products
  {
    id: 'dynamic-defense',
    name: 'AT&T Dynamic Defense',
    category: 'security',
    price: 'Standard: $0/mo with ADI, Advanced: $175/mo, Premium: $275/mo',
    monthlyPrice: 0,
    features: [
      'Industry-leading AT&T threat intelligence powered by AI and machine learning',
      '24/7/365 network monitoring',
      'Fast deployment in about 30 minutes - no hardware required',
      'AT&T Dynamic Defense Shield - blocks malicious traffic before reaching your network',
      'Configurable stateful NextGen Firewall with granular security controls',
      'Geo IP Filtering - block traffic from high-risk countries',
      'Web Filtering - control employee access by category or website',
      'Application-based policy for granular security controls',
      'Reporting and logging with user-friendly dashboard',
      'Version control for security policy configurations',
      'Premium tier: Virus, Spyware, Vulnerability, and DNS protection',
      'Integrates with AT&T Dedicated Internet and AT&T Switched Ethernet on Demand with Internet Offload',
      'Charges appear on existing AT&T connectivity bill - no separate contracts',
      'Can be added or removed without termination charges'
    ],
    valuePropositionStatement: {
      forTarget: 'Businesses seeking proactive network security',
      customerOutcome: 'Threats are blocked before they reach your network — you focus on business, not security firefighting',
      riskMitigated: 'Stop breaches at the network level before they become costly incidents',
      keyDifferentiator: 'Network-embedded security powered by 824.6 petabytes of daily threat intelligence — deploys in 30 minutes',
      whoNeed: 'comprehensive cyber protection that stops threats before they reach the business',
      andWant: 'business-grade security embedded in their network connectivity',
      productIs: 'AT&T Dynamic Defense is the first line of defense embedded in our global network infrastructure',
      keyBenefit: 'that detects threats, filters malicious traffic, and executes security controls BEFORE data reaches your network - extending AT&T global network security to your business',
      unlike: 'traditional on-premise firewalls requiring expensive hardware, maintenance, and security expertise',
      differentiation: 'providing proactive threat detection powered by AT&T carrying 824.6 petabytes of data traffic daily, deployed in 30 minutes with no hardware needed'
    },
    talkingPoints: [
      'FIRST LINE OF DEFENSE: Stops threats BEFORE they hit your business - embedded in AT&T global network',
      'AT&T carries 824.6+ petabytes of data daily - giving us insights into new threats as they arise',
      'AI and machine learning powered threat intelligence adapts to the evolving risk landscape',
      'Deploys in about 30 minutes - no hardware, no waiting, no maintenance',
      'Three packages: Standard ($0 with ADI), Advanced ($175/mo), Premium ($275/mo) up to 1 Gbps',
      'Standard package FREE for life of circuit with AT&T Dedicated Internet',
      'First two months FREE with new AT&T Dedicated Internet, then auto-renews at monthly rate',
      'Works standalone or as added layer of defense with existing security solutions'
    ],
    valueProps: [
      'Business-grade network security prevents threats from reaching your network',
      'May IMPROVE network performance by filtering malicious traffic upstream',
      'Consolidates security products - no separate equipment, contracts, or maintenance',
      'Cost-effective: eliminates add-on security solutions from multiple providers',
      'Uses AT&T Chief Security Office recommended policies OR deploy your own custom policies',
      'Simplified management - centralized policy control',
      'Standard package at no cost with qualifying AT&T Dedicated Internet'
    ],
    objectionHandling: [
      {
        objection: "We already have a firewall",
        response: "Dynamic Defense is your FIRST line of defense - it blocks threats at the network level before they even reach your firewall. This reduces load on your existing security and catches threats your on-premise solution might miss. Think of it as adding a security checkpoint at the street level, not just the building entrance."
      },
      {
        objection: "We don't have IT security expertise",
        response: "That's exactly why Dynamic Defense was designed this way. Use AT&T Chief Security Office recommended policies pre-configured with best practices, or deploy your own. Two views available: simplified for non-experts and advanced for security professionals. No security experience needed."
      },
      {
        objection: "Is it effective against modern threats?",
        response: "Our threat intelligence is powered by machine learning and AI that adapts to the evolving risk landscape. AT&T carries over 824.6 petabytes of data daily, giving us insights into new threats as they arise and the ability to immediately block malicious traffic."
      },
      {
        objection: "What about the cost?",
        response: "Standard package is FREE for life of circuit with AT&T Dedicated Internet. Advanced ($175/mo) and Premium ($275/mo) add enhanced shields and full threat protection. No hardware costs, no maintenance fees, no separate contracts - charges appear on your existing connectivity bill."
      },
      {
        objection: "What's the difference between packages?",
        response: "Standard includes AT&T Dynamic Defense Shield and basic threat protection. Advanced ($175/mo) adds Enhanced Shield blocking 150K+ malicious IPs, NextGen Firewall, Geo/Web filtering, and application policies. Premium ($275/mo) adds virus, spyware, vulnerability, and DNS protection for comprehensive coverage."
      },
      {
        objection: "What connectivity does it work with?",
        response: "Dynamic Defense integrates seamlessly with AT&T Dedicated Internet (private, unshared access with symmetrical speeds) and AT&T Switched Ethernet on Demand with Internet Offload. It extends AT&T's global network security infrastructure directly to the edge of your business network."
      }
    ],
    bestFor: ['Businesses without dedicated IT security staff', 'Healthcare (HIPAA compliance)', 'Financial services', 'Retail (PCI compliance)', 'Any business with sensitive customer data', 'Businesses with AT&T Dedicated Internet'],
    competitiveAdvantages: [
      'AT&T carries 824.6+ petabytes of data daily - unmatched threat visibility',
      'Threat intelligence powered by AI/ML that adapts to evolving risks',
      'Network-embedded: no hardware to buy, install, or maintain',
      'Deploys in about 30 minutes vs weeks for traditional solutions',
      'Standard package FREE with AT&T Dedicated Internet',
      'Works standalone OR as added layer with existing security',
      'Charges on existing connectivity bill - no extra contracts'
    ],
    targetSegments: ['small-business', 'mid-market', 'enterprise'],
    businessDifferentiators: [
      'Three-tier approach: Standard (free with ADI), Advanced ($175), Premium ($275)',
      'Dynamic Defense Shield powered by AT&T Chief Security Office threat intelligence',
      'Geo Filtering blocks traffic from U.S. Treasury-designated high-risk countries',
      'Web Filtering controls employee internet access by category',
      'Application Control for specific apps (e.g., block TikTok, allow Teams)',
      'Premium tier includes virus, spyware, vulnerability, AND DNS protection'
    ]
  },
  // AT&T SD-WAN with Cisco
  {
    id: 'sd-wan-cisco',
    name: 'AT&T SD-WAN with Cisco',
    category: 'connectivity',
    price: 'Contact for pricing',
    monthlyPrice: 0,
    features: [
      'Software-defined Wide Area Network with Cisco technology',
      'Seamlessly connect clouds, applications, and users wherever they are located',
      'Centralized control and management across the entire network',
      'Dynamic routing of network traffic - automatically selects fastest, most reliable path',
      'Multi-cloud connectivity to public and private clouds',
      'Analytics and insights extending visibility to internet, cloud, and SaaS applications',
      'Integrated security: application-aware firewall, IPS, encryption, URL filtering, malware defense',
      'Unified communications (UC) support: voice, instant messaging, video conferencing',
      'Fully managed or co-managed solution options',
      'Centralized management dashboards for monitoring performance across all networks',
      'Near real-time traffic steering for exceptional multi-cloud performance',
      'Configure and deploy software, perform upgrades, provision devices from simple UI'
    ],
    valuePropositionStatement: {
      forTarget: 'Multi-location enterprises needing to connect clouds and applications',
      customerOutcome: 'Your apps work at the same speed from every location — traffic automatically routes the fastest path',
      riskMitigated: 'Eliminate performance inconsistency across sites and the complexity of managing multiple connections',
      keyDifferentiator: 'Fully managed SD-WAN with Cisco — AT&T experts handle design, deployment, and management',
      whoNeed: 'intelligent network traffic routing with centralized control and visibility',
      andWant: 'simplified management with built-in security across all locations',
      productIs: 'AT&T SD-WAN with Cisco is a fully managed software-defined WAN solution',
      keyBenefit: 'that intelligently routes traffic, seamlessly connecting clouds, applications, and users with integrated security',
      unlike: 'traditional WAN solutions requiring complex hardware configurations at each site',
      differentiation: 'providing cloud-based software overlay with automatic path selection, centralized management, and AT&T expert design and deployment'
    },
    talkingPoints: [
      'Cloud-based software overlay runs over your standard network transport',
      'Automatically selects the fastest, most reliable path to cloud infrastructure',
      'In event of disruption, automatically adjusts data paths to ensure uptime and availability',
      'Integrated security provides real-time threat protection across users, branches, clouds, and data centers',
      'Fully managed service: AT&T experts design, configure, deploy, and manage your SD-WAN',
      'Co-managed option available: partnership between your IT department and AT&T specialists',
      'Supports unified communications: voice, messaging, video in one solution',
      'Correlates application behavior and quality of experience with underlying SD-WAN performance'
    ],
    valueProps: [
      'Optimized network and application performance',
      'Simplifies branch security with integrated protection',
      'Prioritizes bandwidth for business-critical applications',
      'Simplified network management and visibility across all locations',
      'Improved network redundancy and resiliency with automatic failover',
      'Rapidly scale users, devices, locations, and bandwidth',
      'Takes pressure off IT resources with fully managed option',
      'No internal knowledge center needed - rely on AT&T experts'
    ],
    objectionHandling: [
      {
        objection: "We don't have the IT resources to manage SD-WAN",
        response: "That's exactly why we offer a fully managed service. AT&T engineers analyze your applications, security requirements, and traffic patterns, then configure, deploy, and manage your SD-WAN solution. You won't need an internal knowledge center."
      },
      {
        objection: "We have existing WAN infrastructure",
        response: "AT&T SD-WAN with Cisco uses a cloud-based software overlay that runs over your standard network transport. You can leverage existing connectivity while gaining intelligent routing, centralized management, and integrated security."
      },
      {
        objection: "Security is a concern with software-defined networking",
        response: "Security is built-in for optimal site-to-site protection. This includes application-aware enterprise firewall, intrusion prevention system (IPS), encryption, URL filtering, malware defense, and real-time threat protection across users, branches, clouds, and data centers."
      },
      {
        objection: "We need to support unified communications",
        response: "AT&T SD-WAN with Cisco supports UC and SD-WAN in one solution - voice, instant messaging, video conferencing, unified messaging, integrated voicemail, and email. Your teams can communicate across phone, mobile, desktop, and laptop seamlessly."
      },
      {
        objection: "We use multiple cloud providers",
        response: "AT&T SD-WAN with Cisco makes it easy to connect any WAN location to multiple clouds, both public and private. Near real-time traffic steering delivers exceptional multi-cloud performance and user experience from any location."
      }
    ],
    bestFor: ['Multi-location enterprises', 'Businesses with multi-cloud environments', 'Organizations needing centralized network management', 'Companies with remote workforce', 'Businesses requiring UC integration', 'Organizations with limited IT resources'],
    competitiveAdvantages: [
      'Cisco technology with AT&T managed services expertise',
      'Fully managed or co-managed options to match your IT capabilities',
      'Integrated security: firewall, IPS, encryption, URL filtering, malware defense',
      'Automatic path selection ensures uptime and availability',
      'Centralized management dashboards across all networks',
      'Analytics extending visibility beyond traditional corporate network',
      'Supports unified communications in one solution'
    ],
    targetSegments: ['mid-market', 'enterprise'],
    businessDifferentiators: [
      'Software-defined vs hardware-centric: move traffic management to cloud',
      'Fully managed service: AT&T experts handle design, configuration, deployment, management',
      'Integrated UC support: voice, messaging, video conferencing in one solution',
      'Multi-cloud connectivity with near real-time traffic steering',
      'Centralized management: configure, deploy, upgrade, provision from single UI',
      'QoE analytics correlate application behavior with network performance'
    ]
  },
  // AT&T Phone for Business (Cloud PBX VoIP)
  {
    id: 'phone-for-business',
    name: 'AT&T Phone for Business',
    category: 'voice',
    price: 'Contact for pricing',
    monthlyPrice: 0,
    features: [
      'Cloud PBX phone system using VoIP - no landlines required',
      'Hosted in the cloud - access from anywhere at any time',
      'Works with AT&T Internet for Business or AT&T Business Fiber',
      'Unlimited nationwide calling across the U.S.',
      'Two plans: Unlimited North America OR International Plus II (50+ countries)',
      'Works with most analog landline systems including Key Telephone Systems (KTS)',
      'Voicemail with voicemail-to-text notifications and transcription',
      'Locate Me - incoming calls ring multiple devices simultaneously',
      'Flexible Caller ID/Name - display business name on outgoing calls',
      'Call Logs and Click to Call from your PC',
      'Business Attendant - 24/7 virtual receptionist',
      'Hunt Groups and Call Queuing for sales/service teams',
      'Dial-by-name directory for faster caller routing',
      'Web Portal for managing features and reviewing bills',
      'One monthly bill includes voice, internet, features, and messaging'
    ],
    valuePropositionStatement: {
      forTarget: 'Businesses modernizing their phone system',
      customerOutcome: 'Your team takes calls from anywhere — office, home, or on the road — customers get the same professional experience',
      riskMitigated: 'Stop missing calls because your old system can\'t keep up with how your team actually works',
      keyDifferentiator: 'Cloud PBX with virtual receptionist and voicemail transcription — no hardware, one simple bill',
      whoNeed: 'reliable, flexible voice communications with advanced call handling features',
      andWant: 'cloud-based simplicity that works from anywhere with professional features',
      productIs: 'AT&T Phone for Business is a cloud PBX phone system using VoIP',
      keyBenefit: 'that delivers more flexible, reliable, and secure voice than traditional landlines with advanced features for mobile and productive teams',
      unlike: 'traditional landline systems requiring on-site equipment and storage closets',
      differentiation: 'providing cloud-hosted communications accessible from anywhere with voicemail transcription, virtual receptionist, and one simple monthly bill'
    },
    talkingPoints: [
      'Cloud PBX: no landlines to set up, no storage closet needed - hosted in the cloud',
      'More flexible, reliable, and secure than traditional landline systems',
      'Two plan options: Unlimited North America OR International Plus II with 50+ countries',
      'Business Attendant: 24/7 virtual receptionist manages caller greetings, routes calls, takes messages',
      'Locate Me: calls ring on multiple devices until answered - office, mobile, anywhere',
      'Voicemail-to-text transcription saves time and increases accuracy',
      'Works with most existing analog equipment - may not need new hardware',
      'Web portal makes it easy to manage features and review bills from anywhere'
    ],
    valueProps: [
      'No costly hardware investment - cloud-hosted solution',
      'No on-site storage or equipment needed',
      'Simple and worry-free with convenient web portal management',
      'One monthly bill includes voice, internet, features, and messaging',
      'Great bundle pricing with no complex phone equipment required',
      'Flexibility: multiple calling features to manage inbound and outbound calls',
      'Mobility: free employees to work from anywhere with cloud-based routing'
    ],
    objectionHandling: [
      {
        objection: "We have existing analog phones",
        response: "AT&T Phone for Business works with most analog landline systems, including analog Key Telephone Systems (KTS). You may not need to buy new equipment at all - we integrate with what you have."
      },
      {
        objection: "We need international calling",
        response: "Our International Plus II plan includes unlimited calling to Canada, Puerto Rico, U.S. Territories, Mexico, AND 50+ countries, plus special lower rates to 19 frequently called countries. Perfect for businesses with global reach."
      },
      {
        objection: "How do we handle calls when out of the office?",
        response: "Locate Me rings incoming calls simultaneously on multiple landline and wireless numbers until answered. Customize call handling - route to your cell when out of office, it's seamless to the caller. Plus voicemail-to-text lets you respond quickly."
      },
      {
        objection: "We need a receptionist but can't afford one",
        response: "Business Attendant is your 24/7 virtual receptionist. It manages caller greetings during and after hours, provides company info like hours and location, takes messages, and transfers callers to specific departments or people."
      },
      {
        objection: "Managing a phone system is complicated",
        response: "Web Portal makes it simple - manage your features, make changes to your service, and run reports from one place using any internet connection. It's designed to be convenient and secure."
      },
      {
        objection: "Our customers don't recognize our number and ignore calls",
        response: "Flexible Caller ID lets you display your business name and number on outgoing calls. Replace the outgoing number with your business name to increase your contact rates."
      }
    ],
    bestFor: ['Small businesses needing professional phone system', 'Hybrid/remote workforces', 'Businesses with international calling needs', 'Companies without dedicated IT staff', 'Multi-location businesses', 'Growing businesses needing scalable voice'],
    competitiveAdvantages: [
      'Cloud-hosted: no hardware investment, no on-site storage needed',
      'Works with existing analog equipment - no forced equipment upgrades',
      'Business Attendant: 24/7 virtual receptionist included',
      'Locate Me: ring multiple devices simultaneously',
      'Voicemail-to-text transcription for efficient message handling',
      'Two plan options: domestic or international coverage',
      'One bill for voice, internet, features, and messaging'
    ],
    targetSegments: ['small-business', 'mid-market'],
    businessDifferentiators: [
      'Cloud PBX vs on-premise PBX: no hardware, no maintenance, no storage closet',
      'Business Attendant virtual receptionist not available in consumer VoIP',
      'Locate Me simultaneous ring on multiple devices',
      'Flexible Caller ID to display business name on outgoing calls',
      'Hunt Groups and Call Queuing for professional sales/service operations',
      'Works with AT&T Internet for Business or AT&T Business Fiber for reliable connection'
    ]
  },
  // AT&T Office@Hand (Cloud UCaaS Platform - AT&T + RingCentral)
  {
    id: 'office-at-hand',
    name: 'AT&T Office@Hand',
    category: 'voice',
    price: 'Contact for pricing',
    monthlyPrice: 0,
    features: [
      'Cloud-based unified communications platform (voice, messaging, meetings)',
      'Seamless voice, messaging, conferencing, and mobile access on any device',
      'Auto receptionist, call routing, and extensions',
      'Integration with 300+ top business apps to streamline workflows',
      'Quick setup with ready-to-use admin tools and push-to-talk',
      'Analytics to boost productivity and profits',
      'One toll-free number across all devices',
      'Voice traffic prioritized over AT&T private fiber network to PSTN',
      'AT&T Office@Hand Contact Center add-on for AI-powered omnichannel support',
      'AT&T Office@Hand RingSense add-on for AI transcription and sales insights'
    ],
    valuePropositionStatement: {
      forTarget: 'Businesses needing unified communications',
      customerOutcome: 'Voice, video, and messaging work seamlessly on any device — your team collaborates like they\'re in the same room',
      riskMitigated: 'End the frustration of juggling multiple communication tools that don\'t work together',
      keyDifferentiator: 'AT&T + RingCentral partnership with 300+ app integrations and AI-powered insights',
      whoNeed: 'seamless voice, messaging, and conferencing that works anywhere',
      andWant: 'business-grade reliability with AI-powered tools to boost productivity',
      productIs: 'AT&T Office@Hand is a cloud communications platform powered by AT&T and RingCentral',
      keyBenefit: 'that unifies voice, messaging, and meetings with AI tools to enhance collaboration and accelerate sales',
      unlike: 'traditional on-premise phone systems or fragmented communication tools',
      differentiation: 'combining AT&T\'s 140+ years of telecom expertise with RingCentral\'s UCaaS leadership for superior call quality, security, and one-vendor simplicity'
    },
    talkingPoints: [
      'Cloud UCaaS platform: voice, messaging, and meetings on any device, anywhere',
      'Partnership of industry leaders: AT&T telecom expertise + RingCentral UCaaS leadership',
      'Voice traffic prioritized on AT&T private fiber network for superior call quality',
      'Integrates with 300+ business apps including Salesforce, Microsoft 365, and more',
      'One invoice for all AT&T solutions - no billing surprises',
      'Contact Center add-on: AI-powered omnichannel support across 20+ channels',
      'RingSense add-on: AI transcribes, summarizes, and stores customer interactions for sales insights'
    ],
    valueProps: [
      'One solution, one vendor: single invoice for all AT&T solutions',
      'Top quality from two industry leaders: AT&T + RingCentral partnership',
      'Increased security: follows AT&T security protocols for reduced risk',
      'Improved call quality: voice prioritized over AT&T private fiber network',
      'Multiple layers of customer care: AT&T Customer Care + RingCentral support + AT&T Sales Team',
      'Scalable: easily add users, locations, and features as you grow',
      'AI-powered tools: Contact Center and RingSense boost productivity and sales'
    ],
    objectionHandling: [
      {
        objection: "We already have AT&T Phone for Business",
        response: "Phone for Business is great for basic cloud PBX needs. Office@Hand is our enterprise UCaaS platform - it adds video meetings, team messaging, 300+ app integrations, and optional AI-powered Contact Center and RingSense for sales insights. It's designed for businesses that need unified communications across multiple locations."
      },
      {
        objection: "We're using Microsoft Teams or Zoom",
        response: "Office@Hand integrates seamlessly with Microsoft 365 and other apps you already use. What it adds is business-grade voice quality over AT&T's private fiber network, native PSTN calling, and AI tools like RingSense that capture sales insights from every customer interaction."
      },
      {
        objection: "We have a lot of existing phone infrastructure",
        response: "Office@Hand is cloud-based so you can migrate at your own pace. It supports desk phones, softphones, and mobile apps - your team can use whatever devices they prefer while you modernize your infrastructure."
      },
      {
        objection: "How is this different from RingCentral direct?",
        response: "Going through AT&T gives you voice traffic prioritized on our private fiber network for superior call quality, AT&T security protocols, multiple layers of support, and one invoice for all your AT&T solutions. You get RingCentral's platform backed by AT&T's network and service."
      },
      {
        objection: "Contact center solutions are too complex and expensive",
        response: "That's exactly why we built Office@Hand Contact Center - it's streamlined, AI-powered, and has all-inclusive predictable pricing. No complex setup, comprehensive reporting included, and you pay one predictable monthly cost."
      }
    ],
    bestFor: ['Multi-location businesses', 'Remote and hybrid workforces', 'Sales teams needing call insights', 'Customer service teams', 'Growing businesses needing scalable communications', 'Companies consolidating communication vendors'],
    competitiveAdvantages: [
      'AT&T + RingCentral: two industry leaders in one solution',
      'Voice prioritized on AT&T private fiber network for superior call quality',
      'AT&T security protocols: one less point of risk',
      'One invoice for all AT&T solutions - simplified billing',
      '300+ business app integrations',
      'AI-powered Contact Center and RingSense add-ons',
      'Multiple layers of support: AT&T Customer Care + RingCentral + AT&T Sales Team'
    ],
    targetSegments: ['small-business', 'mid-market', 'enterprise'],
    businessDifferentiators: [
      'Enterprise UCaaS vs basic cloud PBX: unified voice, messaging, video, and collaboration',
      'AI-powered Contact Center: omnichannel support across 20+ channels with AI-enhanced agents',
      'RingSense AI: transcribes, summarizes, and analyzes customer interactions for sales insights',
      'CRM integrations: connect to Salesforce and other tools for call insights on keywords, objections, competitor mentions',
      'Robust disaster recovery and business continuity built-in',
      'Native dialing experience with AT&T network integration'
    ]
  },
  // All-in-One Bundles (AIO) - Value-focused fiber + wireless bundles
  // KEY DIFFERENTIATOR: Basic fiber + CRU only (NO wireless backup)
  // Target: Embedded Base/New New, Small Business / Segments 2-3
  // Sales Channels: All Business Sellers & Digital
  {
    id: 'aio-500m',
    name: 'All-in-One 500M',
    category: 'all-in-one',
    price: '$130/mo',
    monthlyPrice: 130,
    features: [
      'AT&T Business Fiber 500 Mbps',
      '1 CRU (Wireless Business Line) included',
      'Basic fiber + CRU bundle (no wireless backup)',
      'Available via all business sellers & digital channels',
      'Target: Embedded base and new small business customers',
      'Simple pricing with no hidden fees',
      'Optional add-on: Additional CRU lines (2+ $55, 3+ $40, 4+ $35, 5+ $30)',
      'Optional add-on: Business Phone Seat 1 $15, Seat 2 $24'
    ],
    valuePropositionStatement: {
      forTarget: 'Embedded base and new small business customers seeking value',
      customerOutcome: 'Your team has fiber at the office and wireless on the go — all on one simple bill at the best price',
      riskMitigated: 'Stop juggling separate providers and surprise charges for basic business needs',
      keyDifferentiator: 'Fiber + wireless bundle at the best price point — pure value without backup complexity',
      whoNeed: 'reliable internet with wireless connectivity at the best price',
      andWant: 'simplified bundling at predictable, affordable pricing',
      productIs: 'All-in-One 500M is basic fiber + CRU in one value bundle',
      keyBenefit: 'that delivers bundled fiber internet and a wireless line at the best price point',
      unlike: 'purchasing fiber and wireless separately with multiple bills',
      differentiation: 'providing the best-value bundle pricing for customers who prioritize cost over always-on backup'
    },
    talkingPoints: [
      'All-in-One: Basic fiber + CRU in one value bundle',
      'Best price point for businesses that don\'t need wireless backup',
      'Add more wireless lines at discounted rates: $55 for 2nd, $40 for 3rd, $35 for 4th, $30 for 5th+',
      'Add Business Phone seats: $15 for first seat, $24 for second seat',
      'Available through all business sellers and digital channels'
    ],
    valueProps: [
      'Value bundle: $130/mo for fiber + wireless — best price point',
      'Scale easily: add lines and phone seats at volume discounts',
      'Available via all business sellers & digital — maximum accessibility',
      'Simple bundled billing with no complexity'
    ],
    objectionHandling: [
      {
        objection: "I can get cheaper internet elsewhere",
        response: "This bundle includes a wireless business line worth $55/mo. Compare apples to apples: 500M fiber + wireless vs. basic internet alone. Plus, having both on one bill simplifies your operations."
      },
      {
        objection: "What's the difference from 24-Hour Internet?",
        response: "24-Hour Internet includes wireless BACKUP for always-on connectivity — your fiber stays protected if there's an outage. All-in-One is our value option: basic fiber + CRU at the best price, ideal when backup isn't a priority."
      },
      {
        objection: "Do I need the wireless backup?",
        response: "If downtime would significantly impact your business — lost sales, missed deadlines, customer frustration — choose 24-Hour Internet with backup. If occasional outages are manageable, All-in-One gives you the best value."
      }
    ],
    bestFor: ['Small retail stores', 'Professional services', 'Small offices', 'Startups', 'Embedded base customers'],
    competitiveAdvantages: [
      'Best-value bundle pricing in the market',
      'Discounted add-on rates for additional lines',
      'Single bill, single provider',
      'Available through all sales channels'
    ],
    targetSegments: ['small-business']
  },
  {
    id: 'aio-1g',
    name: 'All-in-One 1 GIG',
    category: 'all-in-one',
    price: '$170/mo',
    monthlyPrice: 170,
    features: [
      'AT&T Business Fiber 1 Gbps',
      '1 CRU (Wireless Business Line) included',
      'Basic fiber + CRU bundle (no wireless backup)',
      'Available via all business sellers & digital channels',
      'Target: Embedded base and new small business customers',
      'Symmetrical upload/download speeds',
      'Optional add-on: Additional CRU lines (2+ $55, 3+ $40, 4+ $35, 5+ $30)',
      'Optional add-on: Business Phone Seat 1 $15, Seat 2 $24'
    ],
    valuePropositionStatement: {
      forTarget: 'Growing small businesses needing high-speed at the best price',
      customerOutcome: 'Your team runs cloud apps, video calls, and file transfers at full speed — with wireless mobility included at best-value pricing',
      riskMitigated: 'No more slowdowns during video calls or cloud operations, no separate wireless bills to manage',
      keyDifferentiator: '1 Gbps fiber + wireless at the best price point — performance without backup complexity',
      whoNeed: 'fast symmetrical speeds for cloud operations, video conferencing, and mobile workforce',
      andWant: 'bundled fiber and wireless at the best price with room to scale',
      productIs: 'All-in-One 1 GIG is basic high-speed fiber + CRU value bundle',
      keyBenefit: 'that provides maximum performance at best-value pricing',
      unlike: 'slower cable bundles or paying separately for fiber and wireless services',
      differentiation: 'delivering fast symmetrical speeds with included wireless at the best price point for customers who prioritize value'
    },
    talkingPoints: [
      'All-in-One: Fast 1 Gbps speeds with wireless in one $170/mo value bundle',
      'Basic fiber + CRU — best price point without backup complexity',
      'Symmetrical 1 Gbps - uploads as fast as downloads for cloud and video',
      'Add team wireless lines at volume discounts: $55, $40, $35, $30 for additional lines',
      'Add Business Phone seats: $15 for first seat, $24 for second seat'
    ],
    valueProps: [
      'Best-value 1 Gbps bundle: $170/mo',
      'Symmetrical speeds for professional cloud operations',
      'Included wireless line for mobility',
      'Scalable: add phones and lines as you grow'
    ],
    objectionHandling: [
      {
        objection: "That's more than I pay for 1 Gbps now",
        response: "You're getting fast fiber PLUS a wireless business line - that's typically $55+ separately. Plus bundle discounts on additional lines. Compare total cost, not just the internet line."
      },
      {
        objection: "What's the difference from 24-Hour Internet?",
        response: "24-Hour Internet includes wireless BACKUP for always-on connectivity — your fiber stays protected if there's an outage. All-in-One is our value option: basic fiber + CRU at the best price, ideal when backup isn't a priority."
      },
      {
        objection: "Do I need the wireless backup?",
        response: "If downtime would significantly impact your business — lost sales, missed deadlines, customer frustration — choose 24-Hour Internet with backup. If occasional outages are manageable, All-in-One gives you the best value."
      }
    ],
    bestFor: ['Growing small businesses', 'Cloud-dependent operations', 'Video conference heavy users', 'Professional services', 'Embedded base customers'],
    competitiveAdvantages: [
      'Best-value 1 Gbps bundle in the market',
      'Symmetrical speeds vs cable asymmetric',
      'Volume discounts on additional lines',
      'Available through all sales channels'
    ],
    targetSegments: ['small-business']
  },
  // 24 Hour Internet - Unified Small and Mid-Market Business Experience
  // First scaled end-to-end journey with converged ordering, one bill, one care
  // Delivers wireless internet within 24 hours, then fiber becomes primary when installed
  {
    id: '24hr-internet-500m',
    name: '24 Hour Internet 500M',
    category: '24-hour-internet',
    price: '$130/mo',
    monthlyPrice: 130,
    features: [
      '⭐ CORE BUNDLE / LEAD OFFER',
      'Business-grade internet within 24 hours via wireless',
      'Business Fiber 500 Mbps becomes primary when installed (typically under 10 days)',
      'Wireless Backup for continuity when fiber is interrupted',
      '1 Mobility line included',
      'One order, one bill, one care path',
      'Unified digital experience with single app for support, billing, and updates',
      'Converged ordering through simplified flow',
      'Optional add-on: Business Voice seats at $15/seat',
      'Optional add-on: Additional mobility lines'
    ],
    valuePropositionStatement: {
      forTarget: 'Businesses who need connectivity now, not weeks from now',
      customerOutcome: 'You\'re open for business within 24 hours — then fiber becomes your foundation with wireless as your safety net',
      riskMitigated: 'Stop losing revenue waiting for installation while your competition serves your customers',
      keyDifferentiator: 'The only unified journey from same-day activation to fiber primary — one order, one bill, one app',
      whoNeed: 'immediate connectivity without long installation waits or fragmented experiences',
      andWant: 'simple setup with one bill and one support path',
      productIs: '24 Hour Internet is the first unified Small and Mid-Market Business end-to-end journey',
      keyBenefit: 'that delivers business-grade internet within 24 hours via wireless, then transitions to fiber as primary with wireless backup for always-on connectivity',
      unlike: 'fragmented experiences with long installations, multi-step ordering, and multiple bills',
      differentiation: 'providing converged ordering, unified billing, single care path, and consistent digital experience - all in one streamlined activation'
    },
    talkingPoints: [
      '24 Hour Internet: Business-grade connectivity within 24 hours',
      'Wireless internet delivered immediately while waiting for fiber installation',
      'When Business Fiber is installed, it becomes primary with Wireless Backup for continuity',
      'One order, one bill, one support path - no fragmented handoffs',
      'Single app for support, billing, and updates - everything in one place',
      'Most fiber installed in under 10 days'
    ],
    valueProps: [
      'Up and running within 24 hours using wireless',
      'One bill for all services - simplified accounting',
      'Single support path - no finger-pointing between providers',
      'Unified digital experience in one app',
      'Wireless backup ensures you never go offline'
    ],
    objectionHandling: [
      {
        objection: "Why do I need wireless if I'm getting fiber?",
        response: "Wireless gets you online within 24 hours while fiber is being installed. Once fiber is ready, it becomes your primary connection and wireless serves as backup - so you're never without connectivity."
      },
      {
        objection: "I've had bad experiences with multiple bills and support issues",
        response: "That's exactly what 24 Hour Internet fixes. One order, one bill, one support number. Everything managed through a single app. No more calling different providers or reconciling multiple invoices."
      },
      {
        objection: "How long until I have fiber?",
        response: "You're connected within 24 hours via wireless. Most fiber installations complete in under 10 days. When fiber is ready, it becomes your primary connection automatically."
      }
    ],
    bestFor: ['Price-sensitive small businesses', 'Businesses needing immediate connectivity', 'Companies frustrated by fragmented vendor experiences', 'Single-location small businesses'],
    competitiveAdvantages: [
      'Only unified end-to-end journey for small business',
      'Connectivity within 24 hours - not weeks',
      'One bill, one support path, one app',
      'Automatic transition from wireless to fiber primary',
      'Built-in wireless backup for business continuity'
    ],
    targetSegments: ['small-business', 'mid-market']
  },
  {
    id: '24hr-internet-1g',
    name: '24 Hour Internet 1 GIG',
    category: '24-hour-internet',
    price: '$170/mo',
    monthlyPrice: 170,
    features: [
      '⭐ CORE BUNDLE / LEAD OFFER',
      'Business-grade internet within 24 hours via wireless',
      'Business Fiber 1 Gbps becomes primary when installed (typically under 10 days)',
      'Symmetrical upload/download speeds',
      'Wireless Backup for continuity when fiber is interrupted',
      '1 Mobility line included',
      'One order, one bill, one care path',
      'Unified digital experience with single app for support, billing, and updates',
      'Converged ordering through simplified flow',
      'Optional add-on: Business Voice seats at $15/seat',
      'Optional add-on: Additional mobility lines'
    ],
    valuePropositionStatement: {
      forTarget: 'Growing businesses who need fast performance without the wait',
      customerOutcome: 'You\'re running at high speeds within 24 hours — with automatic backup so you never go dark',
      riskMitigated: 'Stop waiting weeks for fiber while losing productivity, and eliminate single-point-of-failure risk',
      keyDifferentiator: 'Immediate high-speed connectivity via wireless, seamless transition to fiber primary, built-in backup',
      whoNeed: 'high-speed symmetrical connectivity with immediate activation',
      andWant: 'simplified experience with one provider managing everything',
      productIs: '24 Hour Internet 1 GIG is high-speed unified connectivity',
      keyBenefit: 'that delivers business-grade internet within 24 hours, transitioning to fast fiber as primary with wireless backup for always-on performance',
      unlike: 'waiting weeks for fiber installation with fragmented vendor relationships',
      differentiation: 'providing immediate connectivity plus fast fiber through one unified journey with single ordering, billing, and care'
    },
    talkingPoints: [
      '24 Hour Internet at 1 Gbps speed: online within 24 hours',
      'Wireless internet immediately, then fast fiber becomes your primary connection',
      'Symmetrical 1 Gbps: uploads match downloads for video, cloud, and VoIP',
      'One order, one bill, one care path - everything unified',
      'Single app manages support, billing, and status updates'
    ],
    valueProps: [
      'High-speed performance with 24-hour activation',
      'Symmetrical speeds for demanding applications',
      'One unified bill and support experience',
      'Automatic failover to wireless backup',
      'Streamlined digital experience'
    ],
    objectionHandling: [
      {
        objection: "Why choose 1 GIG over 500M?",
        response: "1 Gbps provides headroom for video conferencing, cloud operations, and simultaneous users. The $40/mo difference delivers 2x the bandwidth and symmetrical speeds that matter for business applications."
      },
      {
        objection: "Can I really be up in 24 hours?",
        response: "Yes - wireless internet is activated within 24 hours. You're immediately connected for business. Fiber is typically installed within 10 days and becomes your primary connection with wireless as backup."
      },
      {
        objection: "What about Business Voice?",
        response: "Business Voice seats can be added at $15/seat. Everything is on one bill and managed through one support path - voice, internet, wireless, all unified."
      }
    ],
    bestFor: ['Growing mid-market businesses', 'Cloud-dependent operations', 'Video conferencing-heavy teams', 'Businesses needing immediate high-speed connectivity'],
    competitiveAdvantages: [
      'High-speed internet within 24 hours via wireless, then fiber',
      'Only unified end-to-end journey with 1 Gbps',
      'Symmetrical speeds beat cable uploads',
      'Single bill and support path',
      'Automatic wireless backup'
    ],
    targetSegments: ['small-business', 'mid-market']
  },
  {
    id: 'aio-300m',
    name: 'All-in-One 300M',
    category: 'all-in-one',
    price: '$100/mo',
    monthlyPrice: 100,
    features: [
      'AT&T Business Fiber 300 Mbps',
      '1 CRU (Wireless Business Line) included',
      'Basic fiber + CRU bundle (no wireless backup)',
      'Available via all business sellers & digital channels',
      'Target: Embedded base and new small business customers',
      'Symmetrical upload/download speeds',
      'Most affordable fiber bundle option',
      'Optional add-on: Additional CRU lines (2+ $55, 3+ $40, 4+ $35, 5+ $30)',
      'Optional add-on: Business Phone Seat 1 $15, Seat 2 $24'
    ],
    valuePropositionStatement: {
      forTarget: 'Cost-conscious small businesses seeking the best value',
      customerOutcome: 'Your business runs on real fiber — not cable — with wireless included at just $100/month',
      riskMitigated: 'Stop settling for slow cable uploads that frustrate your team and customers',
      keyDifferentiator: 'True fiber + wireless at the most affordable bundle price — pure value',
      whoNeed: 'reliable fiber internet with wireless at the lowest entry point',
      andWant: 'bundled simplicity without breaking the budget',
      productIs: 'All-in-One 300M is the entry-level basic fiber + CRU value bundle',
      keyBenefit: 'that delivers fiber + wireless at just $100/month - the most accessible business bundle',
      unlike: 'basic cable internet without wireless inclusion',
      differentiation: 'providing true fiber + wireless bundling at an unmatched entry price point for customers who prioritize value'
    },
    talkingPoints: [
      'All-in-One starting at just $100/mo - our most affordable value bundle',
      'Basic fiber + CRU — best price point without backup complexity',
      '300 Mbps symmetrical handles 5-10 users easily',
      'Perfect entry point to AT&T Business ecosystem',
      'Add Business Phone seats: $15 for first seat, $24 for second seat'
    ],
    valueProps: [
      'Lowest entry: $100/mo for fiber + wireless — best value',
      '300 Mbps symmetrical - faster uploads than typical cable plans',
      'True fiber reliability, not shared cable',
      'Easy path to upgrade as you grow'
    ],
    objectionHandling: [
      {
        objection: "Cable is cheaper",
        response: "This is FIBER at $100 - not cable. You get symmetrical speeds (cable typically 35 Mbps upload max), PLUS a wireless line included. Compare the total value, not just the headline price."
      },
      {
        objection: "Is 300 Mbps enough?",
        response: "300 Mbps symmetrical handles 5-10 simultaneous users with cloud apps and video calls. It outperforms typical cable uploads. And you can upgrade anytime as you grow."
      },
      {
        objection: "What's the difference from 24-Hour Internet?",
        response: "24-Hour Internet includes wireless BACKUP for always-on connectivity — your fiber stays protected if there's an outage. All-in-One is our value option: basic fiber + CRU at the best price, ideal when backup isn't a priority."
      }
    ],
    bestFor: ['Very small businesses', 'Budget-conscious startups', 'Home-based businesses', 'Small retail', 'Embedded base customers'],
    competitiveAdvantages: [
      'Lowest fiber + wireless bundle price in the market',
      'Symmetrical speeds beat cable uploads',
      'True fiber infrastructure',
      'Available through all sales channels'
    ],
    targetSegments: ['small-business']
  },
  {
    id: 'aio-2g',
    name: 'All-in-One 2 GIG',
    category: 'all-in-one',
    price: '$195/mo',
    monthlyPrice: 195,
    features: [
      'AT&T Business Fiber 2 Gbps',
      '1 CRU (Wireless Business Line) included',
      'Basic fiber + CRU bundle (no wireless backup)',
      'Available via all business sellers & digital channels',
      'Target: Embedded base and new small business customers',
      'Symmetrical upload/download speeds',
      'For data-intensive small businesses',
      'Optional add-on: Additional CRU lines (2+ $55, 3+ $40, 4+ $35, 5+ $30)',
      'Optional add-on: Business Phone Seat 1 $15, Seat 2 $24'
    ],
    valuePropositionStatement: {
      forTarget: 'Data-intensive small businesses seeking high-performance value',
      customerOutcome: 'Your team never competes for bandwidth — video production, cloud development, and massive file transfers all happen simultaneously at the best price',
      riskMitigated: 'Eliminate productivity bottlenecks from bandwidth constraints as your team and workload grow',
      keyDifferentiator: '2 Gbps symmetrical speeds at best-value pricing — performance without backup complexity',
      whoNeed: '2x the bandwidth for multiple simultaneous heavy users',
      andWant: 'bundled fiber + wireless at the best value without enterprise complexity',
      productIs: 'All-in-One 2 GIG is high-performance basic fiber + CRU value bundle',
      keyBenefit: 'that delivers 2 Gbps symmetrical speeds with wireless in a simple bundle at best-value pricing',
      unlike: 'enterprise solutions requiring complex contracts',
      differentiation: 'providing 2x the speed at accessible small business pricing for customers who prioritize value'
    },
    talkingPoints: [
      'All-in-One at 2 Gbps - high performance at best-value pricing',
      'Basic fiber + CRU — best price point without backup complexity',
      'Perfect for teams with heavy cloud, video, or data operations',
      'Symmetrical 2 Gbps: uploads match downloads',
      'Add Business Phone seats: $15 for first seat, $24 for second seat'
    ],
    valueProps: [
      '2x the speed at best-value price',
      'Future-proofs your connectivity',
      'Handles 15-25 heavy simultaneous users',
      'Wireless line included in bundle'
    ],
    objectionHandling: [
      {
        objection: "Do we really need 2 Gbps?",
        response: "If your team does video production, large file transfers, cloud development, or heavy backup operations, you'll feel the difference. This future-proofs you for 3-5 years of growth."
      },
      {
        objection: "What's the difference from 24-Hour Internet?",
        response: "24-Hour Internet includes wireless BACKUP for always-on connectivity — your fiber stays protected if there's an outage. All-in-One is our value option: basic fiber + CRU at the best price, ideal when backup isn't a priority."
      }
    ],
    bestFor: ['Creative agencies', 'Tech startups', 'Data-heavy operations', 'Growing professional services', 'Embedded base customers'],
    competitiveAdvantages: [
      '2 Gbps at best-value small business pricing',
      'Bundle includes wireless line',
      'Symmetrical performance',
      'Available through all sales channels'
    ],
    targetSegments: ['small-business', 'mid-market']
  },
  {
    id: 'aio-5g',
    name: 'All-in-One 5 GIG',
    category: 'all-in-one',
    price: '$295/mo',
    monthlyPrice: 295,
    features: [
      'AT&T Business Fiber 5 Gbps',
      '1 CRU (Wireless Business Line) included',
      '5 Gigabit fiber + wireless bundle',
      'Available nationwide via all business sellers & digital',
      'Maximum symmetrical upload/download speeds',
      'For the most demanding small business operations',
      'Optional add-on: Additional CRU lines from $30-55/mo',
      'Optional add-on: Business Phone seats at $15/seat'
    ],
    valuePropositionStatement: {
      forTarget: 'Performance-demanding small businesses',
      customerOutcome: 'Your operations run at maximum speed — AI, video production, massive file transfers all happen without waiting',
      riskMitigated: 'Never hit a bandwidth ceiling no matter how demanding your workload becomes',
      keyDifferentiator: 'Maximum 5 Gbps speeds at small business pricing — enterprise performance, simple bundle',
      whoNeed: 'the fastest symmetrical speeds available without enterprise contracts',
      andWant: 'bundled simplicity with top-tier performance',
      productIs: 'All-in-One 5 GIG is maximum-performance fiber + wireless bundle',
      keyBenefit: 'that delivers 5 gigabit symmetrical speeds - the fastest small business bundle available',
      unlike: 'enterprise solutions with complex procurement and long contracts',
      differentiation: 'providing business-grade 5 Gbps speeds in a simple small business bundle format'
    },
    talkingPoints: [
      'All-in-One at MAXIMUM speed: 5 Gbps symmetrical',
      'Enterprise-class performance, small business simplicity',
      'For businesses where bandwidth is never enough',
      'Wireless line included at $295/mo total'
    ],
    valueProps: [
      'Maximum available speed: 5 Gbps',
      'Enterprise performance, bundle pricing',
      'Future-proof for 5+ years',
      'Wireless included'
    ],
    objectionHandling: [
      {
        objection: "That's a lot for a small business",
        response: "Consider what you get: 5 Gbps fiber + wireless line for $295. Enterprise customers pay far more for this performance. If speed drives your business, this is the best value at the top tier."
      }
    ],
    bestFor: ['Video production companies', 'Software development', 'Data centers', 'High-frequency operations'],
    competitiveAdvantages: [
      'Highest speed bundle available',
      'Small business pricing for enterprise speeds',
      'Wireless included',
      'No complex enterprise contracts'
    ],
    targetSegments: ['small-business', 'mid-market']
  }
];

export const getProductsByCategory = (category: string) => {
  return products.filter(p => p.category === category);
};

export const getProductById = (id: string) => {
  return products.find(p => p.id === id);
};

export const getProductsBySegment = (segment: 'small-business' | 'mid-market' | 'enterprise') => {
  return products.filter(p => p.targetSegments.includes(segment));
};

// Helper to generate concise value proposition statement
export const getValuePropositionSummary = (product: Product): string => {
  const vp = product.valuePropositionStatement;
  return `For ${vp.forTarget} who need ${vp.whoNeed}, ${vp.productIs} ${vp.keyBenefit}. Unlike ${vp.unlike}, our solution ${vp.differentiation}.`;
};
