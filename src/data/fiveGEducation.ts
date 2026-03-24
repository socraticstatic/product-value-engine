// 5G Standalone Network Sales Education
// Based on AT&T 5G Advanced Sales Education materials

export interface FiveGConcept {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  businessBenefits: string[];
  talkingPoints: string[];
  industries?: string[];
}

export interface FiveGFAQ {
  question: string;
  answer: string;
}

export const fiveGConcepts: FiveGConcept[] = [
  {
    id: '5g-sa',
    name: '5G Standalone (SA)',
    shortDescription: 'Standalone 5G Core that enables full 5G capabilities and innovation',
    fullDescription: 'AT&T\'s 5G Standalone network is the next-generation, cloud-native "brain" of the 5G network—built from the ground-up specifically for 5G. It\'s a dedicated 5G radio access network (RAN) and 5G network core that operates independently from older 4G LTE systems, unlocking the full potential of 5G.',
    businessBenefits: [
      'Ultra-low latency and faster upload speeds for demanding business needs',
      'Lays the foundation for future technology and business innovation',
      'Enables advanced capabilities like intelligent routing, network slicing, and edge computing',
      'Supports massive IoT deployments',
      'Engineered for flexibility, scalability and efficient use of network resources'
    ],
    talkingPoints: [
      'Highlight ultra-low latency and faster upload speeds as performance benchmarks',
      'Emphasize flexibility and scalability as key to enterprise innovation',
      'Reinforce that SA is engineered for mission-critical reliability',
      '"AT&T\'s 5G Standalone network is deployed nationwide—we\'re moving business customers onto the network as capacity expands"'
    ]
  },
  {
    id: 'network-slicing',
    name: 'Network Slicing',
    shortDescription: 'Virtual network lanes that guarantee performance for specific use cases',
    fullDescription: 'Network slicing is a 5G Standalone (SA) core feature that virtually partitions a single physical network into multiple dedicated "slices," each tailored for specific needs like ultra-low latency, high reliability, or high throughput. This enables support for diverse industries and use cases with optimized performance, security, and reliability.',
    businessBenefits: [
      'Dedicated, secure lanes for specific business functions',
      'Tailored connectivity meeting Business Grade standards',
      'Performance, security, and scalability across diverse industries',
      'More flexible, efficient approach to connectivity',
      'Precision control for mission-critical applications'
    ],
    talkingPoints: [
      '"Network slicing lets us carve out dedicated lanes for specific business functions—whether it\'s autonomous vehicles, remote surgery, or smart city infrastructure"',
      '"Each slice is optimized for performance, security, and reliability. That\'s business grade connectivity tailored to your exact needs"',
      'Position slicing as a tool for precision, control, and performance',
      'Use vertical examples (healthcare, manufacturing, logistics) to show real-world business grade use cases',
      'Note: AT&T is currently testing slicing with select enterprise customers—plan to offer generally in late 2026'
    ],
    industries: ['Connected Car', 'Smart Cities', 'Healthcare', 'Entertainment', 'Finance', 'Manufacturing', 'Transportation & Logistics']
  },
  {
    id: 'private-networks',
    name: 'Private Networks',
    shortDescription: 'Dedicated 5G environments with full control, security, and customization',
    fullDescription: 'Private 5G networks deliver control and customization, ensuring secure, scalable, and integrated connectivity that evolves with business needs. Ideal for campuses, ports, and factories, private networks integrate seamlessly with enterprise IT and ensure data privacy and operational efficiency.',
    businessBenefits: [
      'Full control over connectivity',
      'Enhanced security and data privacy',
      'Scalable and built to evolve with business',
      'Seamless integration with enterprise IT systems',
      'Supports robotics, AGVs, real-time analytics, and advanced automation'
    ],
    talkingPoints: [
      '"Private 5G networks give customers full control over their connectivity. They\'re secure, scalable, and built to evolve with the business"',
      '"AT&T Spectrum for Private Networks (ASPN) is a key differentiator—offering licensed spectrum for low-latency, high-reliability performance"',
      '"Whether it\'s a factory floor, a port, or a campus, private networks deliver business grade integration with enterprise IT and support advanced automation"',
      'Frame private 5G as the ultimate network for control, security, and customization',
      'Mention ASPN as a differentiator for licensed, low-latency connectivity'
    ]
  }
];

export const fiveGIndustryApplications: Record<string, { benefits: string[]; example?: string }> = {
  'Healthcare': {
    benefits: [
      'Reliable and secure connections for remote surgery video and telemedicine',
      'Remote monitoring and secure data transmission for medical records',
      'Expanded access to care and specialists',
      'Improved patient outcomes through real-time data analysis and video feed',
      'Enhanced data privacy and compliance'
    ]
  },
  'Manufacturing': {
    benefits: [
      'Autonomous robots and vehicles communicate in real time',
      'Increased efficiency and production',
      'Improved operational efficiency and productivity',
      'Reduced downtime and maintenance costs',
      'Enhanced safety and precision in operations'
    ],
    example: 'Today\'s advanced automotive assembly lines rely on the autonomous features of their cars to keep the assembly line moving. As each car comes off the assembly line it needs a secure, reliable network to communicate with the factory\'s systems and other cars. A dedicated network slice provides lower latency and packet loss, reducing congestion and ensuring the cars get to their assigned location safely.'
  },
  'Transportation & Logistics': {
    benefits: [
      'Optimized performance for fleet management and vehicle tracking',
      'Smart ports and warehouse automation',
      'Future support for drone-based delivery and inspections',
      'Optimized logistics and reduced delivery times',
      'Increased safety and operational visibility'
    ]
  },
  'Finance': {
    benefits: [
      'Isolating customer data from open internet',
      'Enhanced security and reduced fraud',
      'Secure, low-latency transactions'
    ]
  },
  'Entertainment': {
    benefits: [
      'Dedicated services for vendors, broadcasters, consumers during crowded events',
      'Reliable connectivity at concerts or sporting events',
      'Enhanced fan experiences'
    ]
  },
  'Smart Cities': {
    benefits: [
      'Dedicated spectrum for self-driving vehicles',
      'Real-time communication to avoid accidents',
      'Running city public services during events',
      'Video analytics for traffic and safety management'
    ]
  },
  'Connected Car': {
    benefits: [
      'Ultra-reliable, low-latency communications for autonomous driving',
      'Enhanced safety features',
      'Seamless in-car experiences'
    ]
  }
};

export const fiveGCustomerBenefits = [
  { label: 'Real-Time Performance', description: 'Power business-critical applications that demand instant response and high reliability' },
  { label: 'Flexibility', description: 'Create network experiences tailored to support your specific needs by intelligently routing mission-critical data' },
  { label: 'Effortless Scaling', description: 'Quickly scale your connectivity up or down as your business evolves' },
  { label: 'Enhanced Security', description: 'Benefit from advanced, built-in security features for greater peace of mind' },
  { label: 'Competitive Edge', description: 'Stay ahead by adopting next-gen technology before it becomes mainstream' },
  { label: 'Faster Innovation', description: 'Accelerate your ability to launch new products and services' }
];

export const fiveGKeyTalkingPoints = [
  "AT&T's solutions are built to perform without compromise. Whether it's 5G SA, slicing, or private networks, we deliver connectivity that's secure, scalable, and shaped by customer needs.",
  "Our advanced 5G capabilities are not just innovative—they're engineered to meet the highest standards of business performance.",
  "AT&T Turbo for Business is already lifting performance for businesses today, and network slicing will take that precision even further.",
  "Network slicing lets us carve out dedicated lanes for specific business functions—whether it's autonomous vehicles, remote surgery, or smart city infrastructure.",
  "Each slice is optimized for performance, security, and reliability. That's business grade connectivity tailored to your exact needs.",
  "Private 5G networks give customers full control over their connectivity. They're secure, scalable, and built to evolve with the business.",
  "AT&T Spectrum for Private Networks (ASPN) is a key differentiator—offering licensed spectrum for low-latency, high-reliability performance.",
  "Whether it's a factory floor, a port, or a campus, private networks deliver business grade integration with enterprise IT and support advanced automation."
];

export const fiveGFAQs: FiveGFAQ[] = [
  {
    question: "Is AT&T's 5G Standalone network nationwide?",
    answer: "Yes. AT&T's 5G SA network is deployed nationwide. We are thoughtfully moving thousands of customers onto it in select areas every day."
  },
  {
    question: "Does AT&T currently offer network slicing service?",
    answer: "While we have not launched a standard offer for network slicing in Business or Consumer, we offer customers enhanced, prioritized connectivity with AT&T Turbo. AT&T Turbo for Business gives priority to all your data, not just some applications. Additionally, we are running select proof-of-concepts with select customers on a case-by-case basis. General availability is planned for late 2026."
  },
  {
    question: "How does AT&T Turbo for Business differ from network slicing?",
    answer: "Turbo for Business gives priority to all your data, not just specific apps. It's available today and helps ensure consistent performance during congestion. Slicing will offer more granular control for specific business functions."
  },
  {
    question: "Which devices support AT&T's 5G Standalone network?",
    answer: "Most flagship devices from the last 3–4 years are compatible, including iPhone 13 and newer, Samsung Galaxy S21 and newer, and Google Pixel 6 and newer. Eligibility also depends on SIM card, rate plan, and location."
  },
  {
    question: "What is AT&T RedCap?",
    answer: "RedCap (Reduced Capability) is a streamlined version of 5G designed for wearables and IoT devices. It offers nationwide coverage and supports lower-cost, lower-power devices like smartwatches and industrial sensors."
  },
  {
    question: "What use cases benefit most from 5G SA and network slicing?",
    answer: "Industries like healthcare, manufacturing, transportation, finance, and smart cities benefit from ultra-low latency, high reliability, and secure, tailored connectivity."
  },
  {
    question: "Can small businesses benefit from AT&T's advanced wireless solutions?",
    answer: "Absolutely. Even the smallest American businesses deserve the largest American network. AT&T's business-grade wireless is scalable, secure, and built to support businesses of any size."
  },
  {
    question: "Does FirstNet use network slicing?",
    answer: "No. FirstNet is a dedicated public safety network, not a slice of a commercial network. It provides exclusive access, priority, and preemption for first responders."
  },
  {
    question: "How will AT&T's EchoStar spectrum acquisition enhance 5G experiences?",
    answer: "Our acquisition of EchoStar's low- and mid-band spectrum extends across more than 400 U.S. markets—virtually nationwide. This strengthens AT&T's spectrum portfolio and is expected to enhance customers' wireless experience and expand our leading convergence of 5G and internet to even more U.S. markets."
  }
];

// Helper function to get relevant 5G talking points based on industry
export function get5GTalkingPointsForIndustry(industry: string): string[] {
  const industryLower = industry.toLowerCase();
  const relevantPoints: string[] = [];
  
  // Always include the core 5G SA benefits
  relevantPoints.push("AT&T's 5G Standalone network delivers ultra-low latency and faster upload speeds—business grade connectivity engineered for reliability.");
  
  // Add industry-specific applications
  const industryApps = Object.entries(fiveGIndustryApplications).find(([key]) => 
    industryLower.includes(key.toLowerCase()) || key.toLowerCase().includes(industryLower)
  );
  
  if (industryApps) {
    const [, appData] = industryApps;
    if (appData.benefits.length > 0) {
      relevantPoints.push(`For ${industry}: ${appData.benefits[0]}`);
    }
  }
  
  // Add network slicing mention for enterprise industries
  if (['manufacturing', 'healthcare', 'transportation', 'logistics', 'finance', 'automotive'].some(ind => industryLower.includes(ind))) {
    relevantPoints.push("Network slicing will enable dedicated, secure network lanes tailored for your specific business functions—coming in late 2026.");
  }
  
  return relevantPoints;
}

// Helper function to determine if 5G advanced solutions are relevant for a customer
export function is5GAdvancedRelevant(industry: string, priorities: string[]): boolean {
  const advancedIndustries = ['manufacturing', 'healthcare', 'transportation', 'logistics', 'automotive', 'finance', 'entertainment', 'smart city', 'connected'];
  const advancedPriorities = ['scalability', 'security', 'speed', 'reliability', 'iot', 'automation'];
  
  const industryRelevant = advancedIndustries.some(ind => industry.toLowerCase().includes(ind));
  const priorityRelevant = priorities.some(p => advancedPriorities.includes(p.toLowerCase()));
  
  return industryRelevant || priorityRelevant;
}
