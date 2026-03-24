import { Product, products } from '@/data/products';
import { CustomerProfile } from '@/types/customer';

export interface ProductRecommendation {
  product: Product;
  matchScore: number;
  matchReasons: string[];
}

// Pain point to product capability mapping
const painToCapabilityMap: Record<string, { capabilities: string[]; productIds: string[] }> = {
  'slow-speeds': {
    capabilities: ['Symmetrical speeds', 'fiber', 'low latency', 'high bandwidth'],
    productIds: ['business-fiber-5g', 'business-fiber-1g', 'hsia-enterprise', 'adi-2g']
  },
  'downtime': {
    capabilities: ['5G backup', '99.9% reliability', 'automatic failover', 'redundancy'],
    productIds: ['business-fiber-1g', 'business-fiber-5g', 'internet-air-50m', 'adi-2g']
  },
  'security-concerns': {
    capabilities: ['network security', 'threat detection', 'HIPAA', 'PCI', 'encryption'],
    productIds: ['business-fiber-1g', 'business-fiber-5g', 'hsia-enterprise', 'sd-wan-flex', 'sd-wan-essentials']
  },
  'high-costs': {
    capabilities: ['predictable', 'no hidden fees', 'no equipment fees', 'value'],
    productIds: ['business-fiber-300m', 'business-fiber-1g', 'all-in-one-bundle']
  },
  'poor-support': {
    capabilities: ['24/7 support', 'dedicated support', 'business-priority'],
    productIds: ['hsia-enterprise', 'business-fiber-1g', 'business-fiber-5g']
  },
  'multiple-vendors': {
    capabilities: ['bundle', 'all-in-one', 'unified', 'single provider'],
    productIds: ['all-in-one-bundle', 'hsia-enterprise', 'sd-wan-flex']
  },
  'scaling': {
    capabilities: ['scalable', 'multi-location', 'enterprise'],
    productIds: ['hsia-enterprise', 'business-fiber-5g', 'sd-wan-flex']
  },
  'outdated-tech': {
    capabilities: ['Wi-Fi 6E', '5G', 'future-proofed', 'fiber'],
    productIds: ['business-fiber-1g', 'business-fiber-5g', 'internet-air-50m']
  }
};

// Priority to product benefit mapping
const priorityToBenefitMap: Record<string, { benefits: string[]; productIds: string[] }> = {
  'reliability': {
    benefits: ['99.9% reliability', 'backup', 'uptime', 'SLA'],
    productIds: ['business-fiber-1g', 'business-fiber-5g', 'hsia-enterprise', 'adi-2g']
  },
  'speed': {
    benefits: ['symmetrical', 'Gbps', 'high-speed', 'low latency'],
    productIds: ['business-fiber-5g', 'business-fiber-1g', 'hsia-enterprise', 'adi-2g']
  },
  'security': {
    benefits: ['security', 'threat detection', 'compliance', 'encryption'],
    productIds: ['sd-wan-flex', 'business-fiber-1g', 'hsia-enterprise']
  },
  'cost-savings': {
    benefits: ['no hidden fees', 'predictable', 'value', 'no equipment fees'],
    productIds: ['business-fiber-300m', 'business-fiber-1g', 'all-in-one-bundle']
  },
  'scalability': {
    benefits: ['scalable', 'upgrade', 'multi-location', 'enterprise'],
    productIds: ['hsia-enterprise', 'business-fiber-5g', 'sd-wan-flex']
  },
  'support': {
    benefits: ['24/7 support', 'dedicated', 'business-priority'],
    productIds: ['hsia-enterprise', 'business-fiber-1g']
  }
};

// Business size to appropriate products
const sizeToProductsMap: Record<string, string[]> = {
  '1-10': ['business-fiber-300m', 'business-fiber-1g', 'internet-air-50m', 'all-in-one-bundle'],
  '11-50': ['business-fiber-1g', 'business-fiber-5g', 'all-in-one-bundle'],
  '51-200': ['business-fiber-5g', 'hsia-enterprise', 'adi-2g', 'sd-wan-flex'],
  '201-500': ['hsia-enterprise', 'adi-2g', 'sd-wan-flex', 'sd-wan-essentials'],
  '500+': ['hsia-enterprise', 'adi-2g', 'sd-wan-flex', 'sd-wan-essentials']
};

// Location count to appropriate products
const locationToProductsMap: Record<string, string[]> = {
  '1': ['business-fiber-300m', 'business-fiber-1g', 'business-fiber-5g', 'internet-air-50m'],
  '2-5': ['hsia-enterprise', 'business-fiber-1g', 'sd-wan-flex'],
  '6-20': ['hsia-enterprise', 'sd-wan-flex', 'sd-wan-essentials'],
  '20+': ['hsia-enterprise', 'sd-wan-flex', 'sd-wan-essentials']
};

// Industry-specific product preferences
const industryProductPreferences: Record<string, string[]> = {
  'healthcare': ['business-fiber-1g', 'hsia-enterprise', 'sd-wan-flex'],
  'retail': ['business-fiber-1g', 'all-in-one-bundle', 'internet-air-50m'],
  'finance': ['business-fiber-5g', 'hsia-enterprise', 'sd-wan-flex', 'adi-2g'],
  'manufacturing': ['hsia-enterprise', 'business-fiber-5g', 'sd-wan-essentials'],
  'hospitality': ['business-fiber-1g', 'all-in-one-bundle'],
  'professional-services': ['business-fiber-1g', 'business-fiber-300m'],
  'construction': ['internet-air-50m', 'business-fiber-1g'],
  'transportation': ['sd-wan-flex', 'hsia-enterprise'],
  'technology': ['business-fiber-5g', 'hsia-enterprise', 'adi-2g']
};

function normalizeIndustry(industry: string): string {
  return industry.toLowerCase().replace(/[^a-z]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function getProductScore(
  product: Product,
  profile: CustomerProfile
): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];
  
  // Check pain point alignment
  for (const painPoint of profile.painPoints) {
    const mapping = painToCapabilityMap[painPoint];
    if (mapping) {
      if (mapping.productIds.includes(product.id)) {
        // Multiple-vendors is a lower priority inconvenience (15 pts), other pain points get full weight (25 pts)
        const painWeight = painPoint === 'multiple-vendors' ? 15 : 25;
        score += painWeight;
        // Generate human-readable reason
        const painReasons = getPainPointMatchReason(product, painPoint);
        if (painReasons) reasons.push(painReasons);
      }
    }
  }
  
  // Check priority alignment
  for (const priority of profile.priorities) {
    const mapping = priorityToBenefitMap[priority];
    if (mapping) {
      if (mapping.productIds.includes(product.id)) {
        score += 20;
        const priorityReason = getPriorityMatchReason(product, priority);
        if (priorityReason) reasons.push(priorityReason);
      }
    }
  }
  
  // Check size appropriateness
  const sizeProducts = sizeToProductsMap[profile.employeeCount];
  if (sizeProducts?.includes(product.id)) {
    score += 15;
  }
  
  // Check location appropriateness
  const locationProducts = locationToProductsMap[profile.locations];
  if (locationProducts?.includes(product.id)) {
    score += 15;
  }
  
  // Check industry preference
  const normalizedIndustry = normalizeIndustry(profile.industry);
  const industryProducts = industryProductPreferences[normalizedIndustry];
  if (industryProducts?.includes(product.id)) {
    score += 10;
    reasons.push(`Preferred choice for ${profile.industry.toLowerCase()} businesses`);
  }
  
  // Check target segment match
  if (product.targetSegments.includes(profile.type)) {
    score += 10;
  }
  
  return { score, reasons: [...new Set(reasons)].slice(0, 4) }; // Dedupe and limit to 4 reasons
}

function getPainPointMatchReason(product: Product, painPoint: string): string | null {
  const painReasonMap: Record<string, Record<string, string>> = {
    'slow-speeds': {
      'business-fiber-5g': 'Delivers up to 5 Gbps symmetrical speeds for maximum performance',
      'business-fiber-1g': 'Provides gigabit symmetrical speeds for fast uploads and downloads',
      'hsia-enterprise': 'Business-grade speeds up to 5 Gbps across all locations',
      'adi-2g': 'Dedicated 2 Gbps connection with guaranteed bandwidth'
    },
    'downtime': {
      'business-fiber-1g': 'Built-in 5G backup ensures you stay connected if primary line fails',
      'business-fiber-5g': 'Includes automatic 5G failover at no extra cost',
      'internet-air-50m': 'Wireless backup option with rapid deployment',
      'adi-2g': 'Dedicated internet with 99.99% uptime SLA'
    },
    'security-concerns': {
      'business-fiber-1g': 'Built-in network security and threat detection included',
      'business-fiber-5g': 'Enterprise security features protect your business data',
      'hsia-enterprise': 'Platform-ready for SD-WAN security augmentation',
      'sd-wan-flex': 'Advanced security with threat protection and encryption'
    },
    'high-costs': {
      'business-fiber-300m': 'Simple $70/mo pricing with no hidden fees',
      'business-fiber-1g': 'Includes 5G backup that competitors charge $50-100/mo extra for',
      'all-in-one-bundle': 'Bundle savings on internet, phone, and security'
    },
    'poor-support': {
      'hsia-enterprise': 'Single contact number for all sites with dedicated enterprise support',
      'business-fiber-1g': '24/7 business-priority support with personalized portal'
    },
    'multiple-vendors': {
      'all-in-one-bundle': 'One bill, one number to call, one team that owns the fix — no more vendor finger-pointing',
      'hsia-enterprise': 'Single contract and unified billing simplifies vendor management across all locations',
      'sd-wan-flex': 'Unified network management means one provider owns your connectivity end to end'
    },
    'scaling': {
      'hsia-enterprise': 'Designed for multi-location growth with unified management',
      'business-fiber-5g': 'Future-proofed with fiber\'s multi-decade lifespan',
      'sd-wan-flex': 'Scales seamlessly as you add locations'
    }
  };
  
  return painReasonMap[painPoint]?.[product.id] || null;
}

function getPriorityMatchReason(product: Product, priority: string): string | null {
  const priorityReasonMap: Record<string, Record<string, string>> = {
    'reliability': {
      'business-fiber-1g': 'AT&T Guarantee with credits for downtime over 20 minutes',
      'business-fiber-5g': '99.9% network reliability with automatic 5G backup',
      'hsia-enterprise': 'Business-grade reliability across all locations',
      'adi-2g': '99.99% uptime SLA for mission-critical operations'
    },
    'speed': {
      'business-fiber-5g': 'Maximum 5 Gbps symmetrical for demanding workloads',
      'business-fiber-1g': 'Full gigabit speeds with low latency for cloud apps',
      'adi-2g': 'Dedicated 2 Gbps with guaranteed performance'
    },
    'security': {
      'sd-wan-flex': 'Business-grade security with threat protection',
      'business-fiber-1g': 'Built-in network security included at no extra cost'
    },
    'cost-savings': {
      'business-fiber-300m': 'Entry-level fiber at $70/mo with no hidden fees',
      'all-in-one-bundle': 'Bundle pricing reduces overall technology costs'
    },
    'scalability': {
      'hsia-enterprise': 'Single agreement scales across unlimited locations',
      'sd-wan-flex': 'Add sites and bandwidth as you grow'
    },
    'support': {
      'hsia-enterprise': 'Dedicated enterprise support with single contact number',
      'business-fiber-1g': '24/7 business-priority support'
    }
  };
  
  return priorityReasonMap[priority]?.[product.id] || null;
}

export function recommendProductsForCustomer(profile: CustomerProfile): ProductRecommendation[] {
  const scoredProducts: ProductRecommendation[] = [];
  
  for (const product of products) {
    const { score, reasons } = getProductScore(product, profile);
    
    if (score > 0) {
      scoredProducts.push({
        product,
        matchScore: score,
        matchReasons: reasons
      });
    }
  }
  
  // Sort by score descending
  scoredProducts.sort((a, b) => b.matchScore - a.matchScore);
  
  // Return top 3 recommendations
  return scoredProducts.slice(0, 3);
}

export function getTopRecommendation(profile: CustomerProfile): ProductRecommendation | null {
  const recommendations = recommendProductsForCustomer(profile);
  return recommendations.length > 0 ? recommendations[0] : null;
}
