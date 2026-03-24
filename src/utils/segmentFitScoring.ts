import { CustomerPersona, customerPersonas, groupingMetadata, GroupingKey } from '@/data/personas';
import { products, Product } from '@/data/products';
import { calculateBundleFits, calculateAllPersonaFits, PersonaFitScore, getFitLevel, FitLevel } from './personaFitScoring';
import { competitiveDifferentiation, ProductDifferentiator } from '@/data/competitiveDifferentiation';

export interface FitBreakdown {
  strong: number;
  moderate: number;
  weak: number;
  total: number;
  summary: string;
}

export interface AddressedNeed {
  need: string;
  status: 'full' | 'partial' | 'not-addressed';
}

export interface CompetitivePosition {
  type: 'win' | 'caution';
  statement: string;
  competitor?: string;
}

export interface EnhancedSegmentFit {
  dimension: GroupingKey;
  value: string;
  label: string;
  color: string;
  description: string;
  personaCount: number;
  salesTip: string;
  personas: PersonaFitScore[];
  
  // New actionable metrics
  fitBreakdown: FitBreakdown;
  addressedNeeds: AddressedNeed[];
  competitivePosition: CompetitivePosition[];
}

export interface DimensionFitResult {
  dimension: GroupingKey;
  dimensionLabel: string;
  dimensionDescription: string;
  segments: EnhancedSegmentFit[];
}

// Segment → Competitive messaging mapping
const segmentCompetitiveMapping: Record<string, {
  highlights: string[];
  wins: CompetitivePosition[];
}> = {
  'early-adopter': {
    highlights: ['Innovation', '5G', 'Roadmap'],
    wins: [
      { type: 'win', statement: 'AT&T leads in fiber and 5G deployment nationwide' },
      { type: 'win', statement: 'Wi-Fi 6E gateway included—latest technology standard' },
      { type: 'caution', statement: 'T-Mobile may undercut on price with fixed wireless', competitor: 'T-Mobile' },
    ]
  },
  'risk-averse': {
    highlights: ['SLAs', 'AT&T Guarantee', 'Case Studies'],
    wins: [
      { type: 'win', statement: 'AT&T Guarantee with financial credits for outages 20+ min' },
      { type: 'win', statement: '99.9% network reliability with 24/7 business support' },
      { type: 'caution', statement: 'Competitor may offer lower upfront cost with hidden fees', competitor: 'Comcast' },
    ]
  },
  'price-shopper': {
    highlights: ['TCO', 'Hidden Costs', 'Bundle Savings'],
    wins: [
      { type: 'win', statement: '5G backup included—competitors charge $50-100/mo extra', competitor: 'Comcast' },
      { type: 'win', statement: 'No equipment fees, no data caps, no annual contract' },
      { type: 'caution', statement: 'T-Mobile 5G fixed wireless at $50/mo for locations without fiber', competitor: 'T-Mobile' },
    ]
  },
  'relationship-buyer': {
    highlights: ['Dedicated Support', 'Single Contact', 'Account Team'],
    wins: [
      { type: 'win', statement: 'Enterprise customer care with dedicated support vs call center queues' },
      { type: 'win', statement: 'Single vendor accountability—no finger-pointing between providers' },
      { type: 'caution', statement: 'Regional cable may have existing relationships', competitor: 'Local Cable' },
    ]
  },
  'rfp-driven': {
    highlights: ['Fiber Coverage', 'Compliance', 'Certifications'],
    wins: [
      { type: 'win', statement: 'Leader in U.S. Fiber Lit Buildings for 9 consecutive years' },
      { type: 'win', statement: '850,000+ fiber-lit buildings nationwide' },
      { type: 'caution', statement: 'Lumen may compete on enterprise SLAs', competitor: 'Lumen' },
    ]
  },
};

/**
 * Get the segment value from a persona for a given dimension
 */
function getPersonaSegmentValue(persona: CustomerPersona, dimension: GroupingKey): string {
  return persona[dimension] as string;
}

/**
 * Calculate fit breakdown from persona scores
 */
export function calculateFitBreakdown(personas: PersonaFitScore[]): FitBreakdown {
  const strong = personas.filter(p => p.overallScore >= 70).length;
  const moderate = personas.filter(p => p.overallScore >= 45 && p.overallScore < 70).length;
  const weak = personas.filter(p => p.overallScore < 45).length;
  const total = personas.length;

  const summary = total > 0 
    ? `${strong} of ${total} strong fit`
    : 'No personas in segment';

  return { strong, moderate, weak, total, summary };
}

/**
 * Get common needs across segment personas and check product coverage
 */
export function getAddressedNeedsForSegment(
  productIds: string[],
  segmentPersonas: PersonaFitScore[]
): AddressedNeed[] {
  // Aggregate all needs from segment personas with frequency
  const needFrequency: Record<string, { count: number; avgImportance: number }> = {};
  
  segmentPersonas.forEach(fit => {
    fit.persona.topNeeds.forEach(need => {
      if (!needFrequency[need.need]) {
        needFrequency[need.need] = { count: 0, avgImportance: 0 };
      }
      needFrequency[need.need].count++;
      needFrequency[need.need].avgImportance += need.importance;
    });
  });

  // Get top 5 needs by frequency and importance
  const topNeeds = Object.entries(needFrequency)
    .map(([need, data]) => ({
      need,
      score: data.count * (data.avgImportance / data.count),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(n => n.need);

  // Check product coverage for each need
  const bundleProducts = productIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as Product[];

  const productKeywords = bundleProducts.flatMap(p => [
    ...p.features,
    ...p.valueProps,
    ...p.talkingPoints,
    ...(p.businessDifferentiators || []),
  ]).join(' ').toLowerCase();

  return topNeeds.map(need => {
    const needLower = need.toLowerCase();
    
    // Check for full or partial match
    let status: 'full' | 'partial' | 'not-addressed' = 'not-addressed';
    
    if (
      (needLower.includes('price') && (productKeywords.includes('no hidden') || productKeywords.includes('included'))) ||
      (needLower.includes('reliab') && productKeywords.includes('99.9%')) ||
      (needLower.includes('security') && productKeywords.includes('security')) ||
      (needLower.includes('support') && productKeywords.includes('24/7')) ||
      (needLower.includes('speed') && productKeywords.includes('symmetrical'))
    ) {
      status = 'full';
    } else if (
      (needLower.includes('price') && productKeywords.includes('pricing')) ||
      (needLower.includes('contract') && productKeywords.includes('no annual')) ||
      productKeywords.includes(needLower.split(' ')[0])
    ) {
      status = 'partial';
    }

    return { need, status };
  });
}

/**
 * Get competitive position for a buying behavior segment
 */
export function getCompetitivePositionForSegment(
  productIds: string[],
  segmentDimension: GroupingKey,
  segmentValue: string
): CompetitivePosition[] {
  // Only apply competitive mapping to buyingBehavior dimension
  if (segmentDimension === 'buyingBehavior') {
    const mapping = segmentCompetitiveMapping[segmentValue];
    if (mapping) {
      return mapping.wins;
    }
  }

  // For other dimensions, pull from product competitive data
  const bundleProducts = productIds
    .map(id => competitiveDifferentiation.find(p => p.productId === id))
    .filter(Boolean) as ProductDifferentiator[];

  if (bundleProducts.length === 0) {
    return [
      { type: 'win', statement: 'Leader in U.S. Fiber Lit Buildings for 9 consecutive years' },
    ];
  }

  // Extract top competitive statements from products
  const positions: CompetitivePosition[] = [];
  
  bundleProducts.forEach(product => {
    // Add unique selling points as wins
    product.uniqueSellingPoints.slice(0, 1).forEach(usp => {
      positions.push({ type: 'win', statement: usp });
    });

    // Add competitor comparisons
    product.competitorComparisons.slice(0, 1).forEach(comp => {
      positions.push({
        type: 'win',
        statement: comp.winningStatement,
        competitor: comp.competitor,
      });
    });
  });

  // Limit to 3 positions
  return positions.slice(0, 3);
}

/**
 * Aggregate persona fit scores by a specific dimension with enhanced metrics
 */
export function aggregatePersonasBySegment(
  personaFits: PersonaFitScore[],
  dimension: GroupingKey,
  productIds: string[]
): EnhancedSegmentFit[] {
  const metadata = groupingMetadata[dimension];
  const segments: Record<string, PersonaFitScore[]> = {};

  // Group personas by dimension value
  personaFits.forEach(fit => {
    const value = getPersonaSegmentValue(fit.persona, dimension);
    if (!segments[value]) {
      segments[value] = [];
    }
    segments[value].push(fit);
  });

  // Calculate enhanced metrics for each segment
  return Object.entries(metadata.options).map(([value, optionMeta]) => {
    const segmentPersonas = segments[value] || [];
    
    const fitBreakdown = calculateFitBreakdown(segmentPersonas);
    const addressedNeeds = getAddressedNeedsForSegment(productIds, segmentPersonas);
    const competitivePosition = getCompetitivePositionForSegment(productIds, dimension, value);

    return {
      dimension,
      value,
      label: optionMeta.label,
      color: optionMeta.color,
      description: optionMeta.description,
      personaCount: segmentPersonas.length,
      salesTip: metadata.salesTips[value as keyof typeof metadata.salesTips] || '',
      personas: segmentPersonas,
      fitBreakdown,
      addressedNeeds,
      competitivePosition,
    };
  }).sort((a, b) => b.fitBreakdown.strong - a.fitBreakdown.strong);
}

/**
 * Calculate segment fit for a single product
 */
export function calculateSegmentFitForProduct(
  productId: string,
  dimension: GroupingKey
): DimensionFitResult {
  const product = products.find(p => p.id === productId);
  if (!product) {
    return {
      dimension,
      dimensionLabel: groupingMetadata[dimension].label,
      dimensionDescription: groupingMetadata[dimension].description,
      segments: [],
    };
  }

  const personaFits = calculateAllPersonaFits(product);
  const segments = aggregatePersonasBySegment(personaFits, dimension, [productId]);

  return {
    dimension,
    dimensionLabel: groupingMetadata[dimension].label,
    dimensionDescription: groupingMetadata[dimension].description,
    segments,
  };
}

/**
 * Calculate segment fit for a bundle of products
 */
export function calculateSegmentFitForBundle(
  productIds: string[],
  dimension: GroupingKey
): DimensionFitResult {
  if (productIds.length === 0) {
    return {
      dimension,
      dimensionLabel: groupingMetadata[dimension].label,
      dimensionDescription: groupingMetadata[dimension].description,
      segments: [],
    };
  }

  const personaFits = calculateBundleFits(productIds);
  const segments = aggregatePersonasBySegment(personaFits, dimension, productIds);

  return {
    dimension,
    dimensionLabel: groupingMetadata[dimension].label,
    dimensionDescription: groupingMetadata[dimension].description,
    segments,
  };
}

/**
 * Calculate segment fit across all dimensions for products
 */
export function calculateAllDimensionFits(
  productIds: string[]
): DimensionFitResult[] {
  const dimensions: GroupingKey[] = [
    'buyingBehavior',
    'valueTier',
    'decisionStyle',
    'mindset',
    'primaryNeed',
    'productAffinity',
  ];

  return dimensions.map(dimension => 
    productIds.length === 1
      ? calculateSegmentFitForProduct(productIds[0], dimension)
      : calculateSegmentFitForBundle(productIds, dimension)
  );
}

/**
 * Get sales tip for a specific segment
 */
export function getSegmentSalesTip(dimension: GroupingKey, value: string): string {
  const metadata = groupingMetadata[dimension];
  return metadata.salesTips[value as keyof typeof metadata.salesTips] || '';
}

/**
 * Get all available dimensions for filtering
 */
export function getAvailableDimensions(): { key: GroupingKey; label: string }[] {
  return (Object.keys(groupingMetadata) as GroupingKey[]).map(key => ({
    key,
    label: groupingMetadata[key].label,
  }));
}
