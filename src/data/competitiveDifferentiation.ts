// Competitive differentiation data with nuanced comparisons
// Addresses scenarios where AT&T products are not 1:1 comparable to competitors

export interface CompetitorComparison {
  competitor: string;
  theirOffer: string;
  attAdvantage: string;
  nuance: string;
  winningStatement: string;
}

export interface ProductDifferentiator {
  productId: string;
  productName: string;
  uniqueSellingPoints: string[];
  notApplesToApples: {
    scenario: string;
    explanation: string;
    howToPosition: string;
  }[];
  competitorComparisons: CompetitorComparison[];
  bundleAdvantages?: string[];
  hiddenCosts?: {
    competitor: string;
    hiddenFee: string;
    attApproach: string;
  }[];
}

export const competitiveDifferentiation: ProductDifferentiator[] = [
  {
    productId: "business-fiber-1g",
    productName: "AT&T Business Fiber 1 GIG",
    uniqueSellingPoints: [
      "ONLY provider with built-in 5G backup at NO extra cost - competitors charge $50-100/mo separately",
      "AT&T Guarantee with financial credits for outages over 20 minutes",
      "Leader in U.S. Fiber Lit Buildings for 9 consecutive years",
      "Wi-Fi 6E gateway included - latest technology standard",
      "True symmetrical speeds: 1 Gbps UP and DOWN"
    ],
    notApplesToApples: [
      {
        scenario: "Customer compares to Comcast Business 1 Gig",
        explanation: "Comcast advertises 1 Gbps but delivers asymmetrical speeds (typically 35 Mbps upload). They also do not include backup connectivity.",
        howToPosition: "Ask: What are your upload speed needs? Cloud backups, video conferencing, and VoIP all depend on upload. AT&T provides true symmetrical speeds PLUS automatic 5G failover - Comcast charges extra for backup."
      },
      {
        scenario: "Customer compares to Spectrum Enterprise",
        explanation: "Spectrum may offer competitive pricing but uses coax infrastructure in many areas, not true fiber. Their backup options are add-ons.",
        howToPosition: "Verify if their quote is for true fiber or coax. AT&T delivers fiber to the premises with dedicated bandwidth - not shared neighborhood infrastructure."
      },
      {
        scenario: "Customer says Verizon Fios is cheaper",
        explanation: "Verizon Fios consumer plans are cheaper but prohibit business use, have residential support queues, and no SLAs.",
        howToPosition: "Fios consumer terms prohibit commercial use. Business Fiber includes 24/7 priority support, SLA guarantees, and the AT&T Guarantee for accountability."
      }
    ],
    competitorComparisons: [
      {
        competitor: "Comcast Business",
        theirOffer: "1 Gbps download / 35 Mbps upload, $299/mo with 3-year contract",
        attAdvantage: "True symmetrical 1 Gbps, built-in 5G backup, no long-term contract required",
        nuance: "Comcast often bundles voice to match pricing - make sure to compare apples to apples on internet-only",
        winningStatement: "With AT&T, you get 28x faster upload speeds and automatic failover protection included - Comcast would charge you extra for both."
      },
      {
        competitor: "Verizon Business Internet",
        theirOffer: "Fios Gigabit Connection at $164/mo",
        attAdvantage: "AT&T Guarantee with credits, 5G backup included, Wi-Fi 6E gateway",
        nuance: "Verizon pricing is competitive but lacks the backup guarantee. Their coverage is limited to specific metros.",
        winningStatement: "AT&T matches the speed and includes automatic 5G backup worth $600/year - plus the AT&T Guarantee holds us accountable."
      },
      {
        competitor: "T-Mobile 5G Business Internet",
        theirOffer: "$50/mo for 5G fixed wireless",
        attAdvantage: "Fiber provides consistent dedicated bandwidth vs shared wireless spectrum",
        nuance: "T-Mobile is attractive on price but this is a different technology - wireless vs fiber. Performance varies by location and congestion.",
        winningStatement: "Fixed wireless is great for backup or remote locations, but fiber provides the dedicated, consistent bandwidth your business-critical operations need. We offer Internet Air for locations where fiber isnt available."
      }
    ],
    hiddenCosts: [
      {
        competitor: "Comcast Business",
        hiddenFee: "Connection Pro backup: $50-100/mo extra",
        attApproach: "5G backup included at no additional cost"
      },
      {
        competitor: "Spectrum Enterprise",
        hiddenFee: "Installation fees up to $500",
        attApproach: "Free installation when ordered online"
      },
      {
        competitor: "Most Competitors",
        hiddenFee: "Equipment rental fees $15-25/mo",
        attApproach: "Wi-Fi 6E gateway included"
      }
    ]
  },
  {
    productId: "business-voice",
    productName: "AT&T Business Voice",
    uniqueSellingPoints: [
      "ONLY VoIP solution certified for utility lines (fire alarms, elevators, security systems)",
      "24-hour built-in battery backup - critical for emergency communications",
      "150+ years of voice expertise backing the service",
      "Digital Phone Call Protect blocks robocalls and spam",
      "E911 support with location accuracy"
    ],
    notApplesToApples: [
      {
        scenario: "Customer compares to RingCentral or Zoom Phone",
        explanation: "Cloud-native UCaaS platforms offer more collaboration features but lack utility line certification and may not meet compliance requirements.",
        howToPosition: "Do you have fire alarms, elevators, or security systems that need phone lines? Those require utility-certified service. AT&T Business Voice is certified - most cloud platforms are not."
      },
      {
        scenario: "Customer says they can use Microsoft Teams calling",
        explanation: "Teams calling is great for internal collaboration but requires additional licensing and lacks the reliability features of dedicated voice.",
        howToPosition: "Teams is excellent for collaboration, and it works great alongside AT&T Business Voice for your main business lines. We provide the reliable dial tone and utility line support that Teams cannot."
      },
      {
        scenario: "Customer wants to keep their legacy PBX",
        explanation: "Legacy PBX systems are expensive to maintain and lack modern features. However, some businesses have significant investment.",
        howToPosition: "We can connect to your existing PBX with SIP Trunking to modernize without replacing everything. Or migrate fully to cloud voice and eliminate maintenance costs."
      }
    ],
    competitorComparisons: [
      {
        competitor: "RingCentral",
        theirOffer: "Cloud PBX with video and messaging, $20-35/user/mo",
        attAdvantage: "Utility line certification, 24-hour battery backup, carrier-grade reliability",
        nuance: "RingCentral excels at UCaaS features but relies on internet connectivity with no dedicated backup. Not certified for life-safety systems.",
        winningStatement: "RingCentral is a great collaboration tool, but AT&T Business Voice provides the carrier-grade reliability and utility certification your critical communications need."
      },
      {
        competitor: "Vonage Business",
        theirOffer: "VoIP with mobile apps, $19.99/line/mo",
        attAdvantage: "Battery backup, carrier network, robocall protection included",
        nuance: "Vonage is competitive on features but lacks the infrastructure backing and battery backup for power outages.",
        winningStatement: "When the power goes out, Vonage goes silent. AT&T Business Voice keeps working with 24-hour battery backup built in."
      },
      {
        competitor: "Ooma Office",
        theirOffer: "Low-cost VoIP at $19.95/user/mo",
        attAdvantage: "Business-grade security, TLS encryption, carrier support network",
        nuance: "Ooma targets very small businesses and lacks enterprise security and support.",
        winningStatement: "Ooma is designed for home offices. AT&T Business Voice provides the security, support, and reliability that growing businesses need."
      }
    ],
    hiddenCosts: [
      {
        competitor: "RingCentral",
        hiddenFee: "Additional per-minute charges for toll-free",
        attApproach: "Predictable monthly pricing"
      },
      {
        competitor: "Vonage",
        hiddenFee: "E911 fees and compliance add-ons",
        attApproach: "E911 included in base service"
      }
    ]
  },
  {
    productId: "internet-air-business",
    productName: "AT&T Internet Air for Business",
    uniqueSellingPoints: [
      "Deploy internet in minutes, not weeks",
      "AT&T Guarantee with network performance commitment",
      "Perfect for locations without fiber availability",
      "No installation appointment or technician visit required",
      "AT&T Turbo for Business priority data on Premium plan",
      "Predictable pricing with no 12-month increases"
    ],
    notApplesToApples: [
      {
        scenario: "Customer compares to T-Mobile 5G Home Internet",
        explanation: "T-Mobile offers consumer fixed wireless which is not designed for business use and lacks priority data options.",
        howToPosition: "T-Mobiles offering is residential - their terms prohibit business use. AT&T Internet Air for Business includes business support and priority data options."
      },
      {
        scenario: "Customer asks why not just use mobile hotspot",
        explanation: "Hotspots are designed for occasional use, not permanent connectivity. Fixed wireless provides dedicated always-on service.",
        howToPosition: "Hotspots are great for traveling, but for a permanent location you need dedicated service with business support and no data concerns."
      },
      {
        scenario: "Customer prefers to wait for fiber",
        explanation: "Fiber deployment can take 6-18 months. Internet Air provides immediate connectivity.",
        howToPosition: "Start with Internet Air today and transition to fiber when available - or keep it as backup. No long-term commitment locks you in."
      }
    ],
    competitorComparisons: [
      {
        competitor: "T-Mobile 5G Business Internet",
        theirOffer: "$50/mo fixed wireless",
        attAdvantage: "Business-specific service, priority data option, no residential restrictions",
        nuance: "Both are fixed wireless but AT&Ts is purpose-built for business with appropriate support and terms.",
        winningStatement: "AT&T Internet Air is designed for business from the ground up - not a repackaged residential product."
      },
      {
        competitor: "Starlink Business",
        theirOffer: "$140/mo satellite internet with $2,500 equipment",
        attAdvantage: "No equipment purchase, lower monthly cost, lower latency",
        nuance: "Starlink reaches truly remote areas but has high upfront costs and higher latency.",
        winningStatement: "If youre in AT&T 5G coverage, Internet Air delivers faster speeds at lower cost without the $2,500 equipment investment."
      }
    ]
  },
  {
    productId: "hsia-enterprise",
    productName: "AT&T HSIA Enterprise",
    uniqueSellingPoints: [
      "Single contract for ALL locations - simplified procurement",
      "One bill across every site - easier accounting",
      "Enterprise customer care with dedicated support number",
      "Platform ready for SD-WAN and MPLS integration",
      "Speeds up to 5 Gbps symmetrical at every location"
    ],
    notApplesToApples: [
      {
        scenario: "Customer has different providers at each location",
        explanation: "Fragmented provider relationships create management overhead, inconsistent service, and billing complexity.",
        howToPosition: "How many hours does your team spend managing multiple vendors? HSIA-E consolidates everything - one contract, one bill, one phone number for support."
      },
      {
        scenario: "Customer compares individual location pricing",
        explanation: "Per-location pricing may look competitive, but total cost of ownership includes management overhead.",
        howToPosition: "The real cost isnt just the monthly bill - its the time spent managing vendors, reconciling invoices, and escalating issues across providers."
      }
    ],
    competitorComparisons: [
      {
        competitor: "Lumen/CenturyLink Enterprise",
        theirOffer: "Multi-location fiber with managed services",
        attAdvantage: "Larger fiber footprint, unified billing platform, AT&T Guarantee",
        nuance: "Lumen has enterprise capabilities but AT&T leads in fiber building coverage.",
        winningStatement: "AT&T has led in U.S. Fiber Lit Buildings for 9 consecutive years - we can reach more of your locations on our own network."
      },
      {
        competitor: "Comcast Business Enterprise",
        theirOffer: "Enterprise solutions with SD-WAN options",
        attAdvantage: "True fiber infrastructure, not upgraded cable",
        nuance: "Comcast coverage is strong in some markets but relies on coax infrastructure in others.",
        winningStatement: "Verify whether each location gets true fiber. AT&T HSIA-E delivers consistent fiber performance at every site."
      }
    ],
    bundleAdvantages: [
      "Add SD-WAN for intelligent traffic routing across locations",
      "Integrate with AT&T Business Mobility for unified communications",
      "Layer in cybersecurity services for comprehensive protection"
    ]
  },
  // AT&T Dedicated Internet - Enterprise-Grade, Mission-Critical
  {
    productId: "dedicated-internet",
    productName: "AT&T Dedicated Internet",
    uniqueSellingPoints: [
      "America's #1 dedicated internet provider - recognized by Frost Radar",
      "100% uptime guarantee with industry-leading SLAs",
      "AT&T Guarantee with financial credits for outages - first carrier to guarantee both fiber and wireless",
      "AT&T Dynamic Defense Shield INCLUDED at no additional cost",
      "#1 Customer Satisfaction for Large Enterprise AND Medium Business (J.D. Power)",
      "Private, unshared bandwidth - your traffic never competes with other businesses",
      "Symmetrical speeds from 10 Mbps up to 1 Tbps"
    ],
    notApplesToApples: [
      {
        scenario: "Customer compares to Business Fiber pricing",
        explanation: "Business Fiber is shared internet with best-effort reliability. Dedicated Internet provides PRIVATE bandwidth with 100% uptime guarantee, proactive monitoring, and priority restoration.",
        howToPosition: "What's an hour of downtime cost your business? Dedicated Internet is for when there's NO margin for downtime - private bandwidth, 100% uptime guarantee, and proactive monitoring to catch issues before they impact you."
      },
      {
        scenario: "Customer says they don't need dedicated bandwidth",
        explanation: "Shared internet can slow during peak hours when neighbors/businesses compete for bandwidth. Dedicated means guaranteed performance at all times.",
        howToPosition: "With shared internet, you're competing for bandwidth with other businesses. Dedicated Internet means YOUR traffic is never contested - guaranteed performance when it matters most."
      },
      {
        scenario: "Customer thinks security is sold separately",
        explanation: "AT&T Dynamic Defense Shield is included at no additional cost with Dedicated Internet - many competitors charge extra for comparable security.",
        howToPosition: "AT&T Dynamic Defense is INCLUDED - it detects and blocks millions of threats before they reach your business. Competitors charge $500-2000/month extra for similar protection."
      }
    ],
    competitorComparisons: [
      {
        competitor: "Lumen/CenturyLink",
        theirOffer: "Dedicated Internet Access with varying SLAs and pricing",
        attAdvantage: "AT&T is #1 in Customer Satisfaction for Large Enterprise AND Medium Business (J.D. Power); Dynamic Defense included",
        nuance: "Lumen has enterprise capabilities but AT&T leads in customer satisfaction and includes security at no extra cost",
        winningStatement: "AT&T is #1 in Customer Satisfaction for both Large Enterprise and Medium Business. We include Dynamic Defense security at no extra cost - Lumen charges separately."
      },
      {
        competitor: "Comcast Business",
        theirOffer: "Dedicated Internet with 100 Mbps to 100 Gbps speeds",
        attAdvantage: "Symmetrical speeds up to 1 Tbps, Dynamic Defense included, 9x Fiber Leaderboard leader",
        nuance: "Comcast strong in cable footprint but AT&T leads in dedicated fiber coverage and customer satisfaction",
        winningStatement: "AT&T has led the U.S. Business Fiber Leaderboard for 9 consecutive years with the nation's largest fiber footprint. Our Dynamic Defense security is included - Comcast charges extra."
      },
      {
        competitor: "Verizon Business",
        theirOffer: "Dedicated Internet with Secure Cloud Gateway options",
        attAdvantage: "100% uptime guarantee, Dynamic Defense included, #1 customer satisfaction",
        nuance: "Verizon competitive in metro areas but AT&T offers broader national coverage and included security",
        winningStatement: "AT&T Dynamic Defense is included at no extra cost, protecting against millions of threats. We're #1 in customer satisfaction for both Large Enterprise and Medium Business."
      },
      {
        competitor: "Spectrum Enterprise",
        theirOffer: "Fiber Internet Access with dedicated bandwidth",
        attAdvantage: "National footprint, 100% uptime guarantee, Dynamic Defense included",
        nuance: "Spectrum strong in regional cable footprint but AT&T provides true national reach with consistent fiber",
        winningStatement: "For multi-region enterprises, AT&T's national fiber footprint delivers consistent dedicated service everywhere - not just where cable infrastructure exists."
      },
      {
        competitor: "Cogent",
        theirOffer: "Low-cost dedicated internet for bandwidth-focused customers",
        attAdvantage: "Full-service provider with bundling, Dynamic Defense, dedicated account management",
        nuance: "Cogent competes on price but offers limited support and no integrated security",
        winningStatement: "Cogent offers bandwidth, but AT&T delivers a complete solution: dedicated account managers, Dynamic Defense security included, and the ability to bundle voice, mobility, and SD-WAN under one provider."
      }
    ],
    hiddenCosts: [
      {
        competitor: "Lumen/CenturyLink",
        hiddenFee: "Security services priced separately - $500-2000/mo for DDoS protection",
        attApproach: "AT&T Dynamic Defense Shield included at no additional cost"
      },
      {
        competitor: "Comcast Business",
        hiddenFee: "ActiveCore security add-ons charged separately",
        attApproach: "Dynamic Defense protection included in base service"
      },
      {
        competitor: "Most Competitors",
        hiddenFee: "Installation and equipment fees can exceed $5,000",
        attApproach: "Competitive installation with expert-led onboarding included"
      }
    ],
    bundleAdvantages: [
      "Add SD-WAN for intelligent traffic routing and cost optimization",
      "Layer in AT&T Business Mobility for unified communications",
      "Upgrade Dynamic Defense to Advanced/Premium for enhanced threat protection",
      "Single vendor accountability across connectivity, voice, and security"
    ]
  },
  // 24 Hour Internet - Unified SMB Experience
  {
    productId: "24hr-internet-500m",
    productName: "24 Hour Internet 500M",
    uniqueSellingPoints: [
      "Business-grade internet within 24 hours - not weeks",
      "AT&T Guarantee with financial credits for fiber outages over 20 minutes",
      "One order, one bill, one care path - truly unified experience",
      "Wireless delivers immediate connectivity, fiber becomes primary when installed",
      "First scaled end-to-end Small and Mid-Market Business journey",
      "Single app for support, billing, and status updates"
    ],
    notApplesToApples: [
      {
        scenario: "Customer compares to ordering fiber directly",
        explanation: "Traditional fiber ordering involves multi-step processes, separate activations, and potential weeks of waiting. 24 Hour Internet provides immediate connectivity via wireless.",
        howToPosition: "With traditional fiber, you wait weeks for installation. With 24 Hour Internet, you're connected within 24 hours via wireless, and fiber becomes your primary when it's ready - typically under 10 days."
      },
      {
        scenario: "Customer asks why not just get wireless internet",
        explanation: "Wireless-only lacks the performance of fiber for demanding business applications. 24 Hour Internet gives you both - immediate wireless plus fiber performance.",
        howToPosition: "Wireless gets you started immediately, but fiber delivers the symmetrical speeds your business needs for video, cloud, and VoIP. You get both - wireless within 24 hours, then fiber takes over as primary."
      },
      {
        scenario: "Customer has multiple providers today",
        explanation: "Fragmented providers mean multiple bills, support handoffs, and finger-pointing during issues.",
        howToPosition: "How much time does your team spend managing multiple vendor relationships? 24 Hour Internet puts everything - ordering, billing, support - into one unified experience."
      }
    ],
    competitorComparisons: [
      {
        competitor: "Comcast Business",
        theirOffer: "Separate internet and wireless with different ordering, billing, and support",
        attAdvantage: "Unified journey: one order, one bill, one support path for everything",
        nuance: "Comcast may bundle but operates separate billing and support systems",
        winningStatement: "With AT&T 24 Hour Internet, everything is truly unified - one order, one bill, one app. Comcast may offer bundles, but you're still managing separate experiences."
      },
      {
        competitor: "Verizon",
        theirOffer: "Fios and wireless as separate products with separate billing",
        attAdvantage: "Immediate connectivity within 24 hours plus unified billing and care",
        nuance: "Verizon business units operate separately - you get different bills and support paths",
        winningStatement: "AT&T 24 Hour Internet delivers connectivity within 24 hours and keeps everything on one bill with one support number. Verizon's separate divisions mean separate headaches."
      }
    ],
    bundleAdvantages: [
      "Add Business Voice seats at $15/seat - same unified bill",
      "Add mobility lines - same support path",
      "Single app manages everything - no switching between portals"
    ]
  },
  {
    productId: "24hr-internet-1g",
    productName: "24 Hour Internet 1 GIG",
    uniqueSellingPoints: [
      "Gigabit connectivity with 24-hour activation via wireless",
      "AT&T Guarantee with financial credits for fiber outages over 20 minutes",
      "Symmetrical 1 Gbps speeds when fiber becomes primary",
      "One order, one bill, one care path - truly unified experience",
      "Wireless backup ensures business continuity after fiber install",
      "First scaled end-to-end SMB journey at gigabit speeds"
    ],
    notApplesToApples: [
      {
        scenario: "Customer compares to cable gigabit",
        explanation: "Cable 'gigabit' is asymmetrical with ~35 Mbps upload. AT&T delivers true symmetrical speeds plus immediate wireless connectivity.",
        howToPosition: "Cable advertises gigabit but delivers 35 Mbps upload. 24 Hour Internet gives you true symmetrical speeds - uploads match downloads - plus you're connected within 24 hours, not weeks."
      },
      {
        scenario: "Customer says they can wait for fiber installation",
        explanation: "Every day without connectivity is lost productivity. 24 Hour Internet eliminates the wait.",
        howToPosition: "Why wait weeks when you can be online in 24 hours? Start working immediately via wireless, then seamlessly transition to gigabit fiber when it's installed."
      }
    ],
    competitorComparisons: [
      {
        competitor: "Comcast Business",
        theirOffer: "1 Gbps download / 35 Mbps upload with separate wireless products",
        attAdvantage: "True symmetrical speeds, unified journey, 24-hour activation",
        nuance: "Comcast cannot match the unified experience or symmetrical speeds",
        winningStatement: "AT&T 24 Hour Internet delivers true symmetrical speeds with 24-hour activation and one unified bill. Comcast gives you asymmetrical speeds, longer waits, and fragmented billing."
      }
    ]
  },
  // AT&T Wireless/Mobility Products
  {
    productId: "enterprise-mobility-custom",
    productName: "AT&T Custom Key Enterprise Unlimited",
    uniqueSellingPoints: [
      "AT&T Guarantee with network performance commitment for wireless",
      "America's most reliable 5G network for business",
      "Private Mobile Connection (Custom APN) for enterprise security",
      "AT&T Turbo for Business priority data when it matters most",
      "FirstNet - only network built for and dedicated to first responders",
      "On-premises cellular network options for in-building coverage"
    ],
    notApplesToApples: [
      {
        scenario: "Customer compares to T-Mobile or Verizon business plans",
        explanation: "Standard business plans don't include the AT&T Guarantee or Private Mobile Connection options available with AT&T enterprise mobility.",
        howToPosition: "AT&T is the first carrier to guarantee both fiber AND wireless performance. Plus, only AT&T offers Private Mobile Connection for security-sensitive data routing."
      },
      {
        scenario: "Customer says Verizon has better coverage",
        explanation: "Coverage claims vary by region. AT&T's 5G network leads in key metro areas and includes enterprise features unavailable elsewhere.",
        howToPosition: "Coverage depends on your specific locations. We can do a coverage analysis, but AT&T offers the AT&T Guarantee, Private Mobile Connection, and FirstNet access that competitors cannot match."
      }
    ],
    competitorComparisons: [
      {
        competitor: "Verizon Business Unlimited",
        theirOffer: "Business unlimited plans with UWB 5G access",
        attAdvantage: "AT&T Guarantee, Private Mobile Connection, on-premises cellular options",
        nuance: "Verizon UWB is fast but limited in coverage. AT&T provides consistent performance backed by our guarantee.",
        winningStatement: "AT&T is the first carrier to guarantee both fiber and wireless. We back our network with the AT&T Guarantee - Verizon doesn't offer this accountability."
      },
      {
        competitor: "T-Mobile Business Unlimited",
        theirOffer: "Magenta for Business plans with 5G access",
        attAdvantage: "Enterprise security with Private Mobile Connection, dedicated account management, network guarantee",
        nuance: "T-Mobile's network is improving but lacks enterprise security options and dedicated account management at scale.",
        winningStatement: "T-Mobile is consumer-first. AT&T offers true enterprise mobility with Private Mobile Connection, dedicated account teams, and the AT&T Guarantee."
      }
    ],
    bundleAdvantages: [
      "Unified billing across fiber, wireless, and voice",
      "Single vendor accountability with the AT&T Guarantee covering both fiber and wireless",
      "Integration with AT&T Business Fiber for complete connectivity coverage"
    ]
  },
  {
    productId: "business-unlimited-preferred",
    productName: "AT&T Business Unlimited Preferred",
    uniqueSellingPoints: [
      "AT&T Guarantee with network performance commitment",
      "100GB premium data before any deprioritization",
      "AT&T Business Fast Track priority network access",
      "15GB hotspot data included per line",
      "International roaming in 200+ countries",
      "5G access included on compatible devices"
    ],
    notApplesToApples: [
      {
        scenario: "Customer compares to consumer unlimited plans",
        explanation: "Consumer plans lack priority support, business features, and the accountability of the AT&T Guarantee.",
        howToPosition: "Business plans include the AT&T Guarantee, priority business support, and features like Business Fast Track that consumer plans don't offer."
      }
    ],
    competitorComparisons: [
      {
        competitor: "Verizon Business Unlimited Plus",
        theirOffer: "Unlimited business plans with premium network access",
        attAdvantage: "AT&T Guarantee, Business Fast Track, integrated billing with fiber products",
        nuance: "Verizon offers similar features but cannot match AT&T's guarantee or unified billing.",
        winningStatement: "AT&T is the first carrier to guarantee network performance on wireless. We back our promises with the AT&T Guarantee."
      }
    ]
  }
];

export const generalDifferentiators = {
  networkLeadership: [
    "Leader in U.S. Fiber Lit Buildings for 9 consecutive years",
    "Americas most reliable 5G network",
    "FirstNet - the only network built for and dedicated to first responders"
  ],
  attGuarantee: {
    description: "The AT&T Guarantee is our commitment to network reliability with financial accountability",
    components: [
      "Fiber: Credits for outages exceeding 20 minutes",
      "Wireless: Network performance guarantee",
      "Combined: First carrier to guarantee both fiber and wireless"
    ]
  },
  bundleStrategy: {
    message: "Competitors often cant match AT&Ts ability to combine fiber, voice, wireless, and security under one provider",
    advantages: [
      "Single vendor accountability",
      "Unified billing and support",
      "Potential multi-product discounts",
      "Simplified IT management"
    ]
  }
};

export const getProductDifferentiators = (productId: string): ProductDifferentiator | undefined => {
  return competitiveDifferentiation.find(d => d.productId === productId);
};
