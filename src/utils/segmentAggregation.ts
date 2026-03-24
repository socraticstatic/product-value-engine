import { PersonaFitScore } from './personaFitScoring';

export interface IndustryDistribution {
  name: string;
  count: number;
  percentage: number;
}

export interface SizeDistribution {
  range: string;
  count: number;
  percentage: number;
}

export interface DecisionStyleDistribution {
  style: string;
  label: string;
  count: number;
  percentage: number;
}

export interface BuyingBehaviorDistribution {
  behavior: string;
  label: string;
  count: number;
  percentage: number;
}

export interface CommonNeed {
  need: string;
  coverage: number; // percentage of personas with this need
  avgImportance: number;
}

export interface SegmentCharacteristics {
  industries: IndustryDistribution[];
  businessSizes: SizeDistribution[];
  decisionStyles: DecisionStyleDistribution[];
  buyingBehaviors: BuyingBehaviorDistribution[];
  commonNeeds: CommonNeed[];
  locationRange: string;
  techSophisticationSummary: string;
}

// Map decision style values to labels
const decisionStyleLabels: Record<string, string> = {
  'owner-operator': 'Owner-Operator',
  'it-led': 'IT-Led',
  'c-suite': 'C-Suite',
  'committee': 'Committee',
};

// Map buying behavior values to labels
const buyingBehaviorLabels: Record<string, string> = {
  'early-adopter': 'Early Adopter',
  'risk-averse': 'Risk-Averse',
  'price-shopper': 'Price Shopper',
  'relationship-buyer': 'Relationship Buyer',
  'rfp-driven': 'RFP-Driven',
};

// Industry icons for display
export const industryIcons: Record<string, string> = {
  'Healthcare': '🏥',
  'Retail': '🛍️',
  'Professional Services': '💼',
  'Hospitality': '🏨',
  'Manufacturing': '🏭',
  'Finance': '🏦',
  'Education': '🎓',
  'Construction': '🏗️',
  'Transportation': '🚚',
  'Real Estate': '🏢',
  'Government': '🏛️',
  'Technology': '💻',
};

/**
 * Aggregate industries from personas
 */
function aggregateIndustries(personas: PersonaFitScore[]): IndustryDistribution[] {
  const counts: Record<string, number> = {};
  
  personas.forEach(fit => {
    const industry = fit.persona.industry;
    counts[industry] = (counts[industry] || 0) + 1;
  });

  const total = personas.length;
  return Object.entries(counts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Parse employee count string and categorize into ranges
 */
function categorizeEmployeeCount(employeeCount: string): string {
  // Extract numbers from strings like "11-50", "100-499", etc.
  const match = employeeCount.match(/(\d+)/);
  if (!match) return 'Unknown';
  
  const num = parseInt(match[1], 10);
  
  if (num <= 10) return '1-10 employees';
  if (num <= 50) return '11-50 employees';
  if (num <= 200) return '51-200 employees';
  if (num <= 500) return '201-500 employees';
  return '500+ employees';
}

/**
 * Aggregate business sizes from personas
 */
function aggregateBusinessSizes(personas: PersonaFitScore[]): SizeDistribution[] {
  const counts: Record<string, number> = {};
  
  personas.forEach(fit => {
    const sizeCategory = categorizeEmployeeCount(fit.persona.employeeCount);
    counts[sizeCategory] = (counts[sizeCategory] || 0) + 1;
  });

  const total = personas.length;
  
  // Define order for consistent display
  const sizeOrder = ['1-10 employees', '11-50 employees', '51-200 employees', '201-500 employees', '500+ employees'];
  
  return sizeOrder
    .filter(size => counts[size])
    .map(range => ({
      range,
      count: counts[range],
      percentage: Math.round((counts[range] / total) * 100),
    }));
}

/**
 * Aggregate decision styles from personas
 */
function aggregateDecisionStyles(personas: PersonaFitScore[]): DecisionStyleDistribution[] {
  const counts: Record<string, number> = {};
  
  personas.forEach(fit => {
    const style = fit.persona.decisionStyle;
    counts[style] = (counts[style] || 0) + 1;
  });

  const total = personas.length;
  return Object.entries(counts)
    .map(([style, count]) => ({
      style,
      label: decisionStyleLabels[style] || style,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Aggregate buying behaviors from personas
 */
function aggregateBuyingBehaviors(personas: PersonaFitScore[]): BuyingBehaviorDistribution[] {
  const counts: Record<string, number> = {};
  
  personas.forEach(fit => {
    const behavior = fit.persona.buyingBehavior;
    counts[behavior] = (counts[behavior] || 0) + 1;
  });

  const total = personas.length;
  return Object.entries(counts)
    .map(([behavior, count]) => ({
      behavior,
      label: buyingBehaviorLabels[behavior] || behavior,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Aggregate common needs across all personas
 */
function aggregateCommonNeeds(personas: PersonaFitScore[]): CommonNeed[] {
  const needData: Record<string, { count: number; totalImportance: number }> = {};
  
  personas.forEach(fit => {
    fit.persona.topNeeds.forEach(need => {
      if (!needData[need.need]) {
        needData[need.need] = { count: 0, totalImportance: 0 };
      }
      needData[need.need].count++;
      needData[need.need].totalImportance += need.importance;
    });
  });

  const total = personas.length;
  return Object.entries(needData)
    .map(([need, data]) => ({
      need,
      coverage: Math.round((data.count / total) * 100),
      avgImportance: Math.round(data.totalImportance / data.count),
    }))
    .sort((a, b) => b.coverage - a.coverage || b.avgImportance - a.avgImportance)
    .slice(0, 6);
}

/**
 * Get location range summary
 */
function getLocationRange(personas: PersonaFitScore[]): string {
  const locations: number[] = [];
  
  personas.forEach(fit => {
    const match = fit.persona.locations.match(/(\d+)/);
    if (match) {
      locations.push(parseInt(match[1], 10));
    }
  });

  if (locations.length === 0) return 'Unknown';
  
  const min = Math.min(...locations);
  const max = Math.max(...locations);
  
  if (min === max) return `${min} location${min === 1 ? '' : 's'}`;
  return `${min}-${max} locations`;
}

/**
 * Get tech sophistication summary
 */
function getTechSophisticationSummary(personas: PersonaFitScore[]): string {
  const counts: Record<string, number> = { low: 0, medium: 0, high: 0 };
  
  personas.forEach(fit => {
    counts[fit.persona.techSophistication]++;
  });

  const total = personas.length;
  const dominant = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])[0];
  
  const percentage = Math.round((dominant[1] / total) * 100);
  
  const labels: Record<string, string> = {
    low: 'Low Tech',
    medium: 'Medium Tech',
    high: 'High Tech',
  };

  return `${percentage}% ${labels[dominant[0]]}`;
}

/**
 * Main function to aggregate segment characteristics from personas
 */
export function aggregateSegmentCharacteristics(personas: PersonaFitScore[]): SegmentCharacteristics {
  if (personas.length === 0) {
    return {
      industries: [],
      businessSizes: [],
      decisionStyles: [],
      buyingBehaviors: [],
      commonNeeds: [],
      locationRange: 'N/A',
      techSophisticationSummary: 'N/A',
    };
  }

  return {
    industries: aggregateIndustries(personas),
    businessSizes: aggregateBusinessSizes(personas),
    decisionStyles: aggregateDecisionStyles(personas),
    buyingBehaviors: aggregateBuyingBehaviors(personas),
    commonNeeds: aggregateCommonNeeds(personas),
    locationRange: getLocationRange(personas),
    techSophisticationSummary: getTechSophisticationSummary(personas),
  };
}

/**
 * Get a concise business profile summary string
 */
export function getBusinessProfileSummary(characteristics: SegmentCharacteristics): string {
  const parts: string[] = [];
  
  // Size range
  if (characteristics.businessSizes.length > 0) {
    const sizes = characteristics.businessSizes.slice(0, 2).map(s => s.range.replace(' employees', ''));
    parts.push(sizes.join(' to '));
  }
  
  // Location range
  if (characteristics.locationRange && characteristics.locationRange !== 'N/A') {
    parts.push(`across ${characteristics.locationRange}`);
  }
  
  return parts.join(' ');
}

/**
 * Get primary decision style for display
 */
export function getPrimaryDecisionStyle(characteristics: SegmentCharacteristics): string {
  if (characteristics.decisionStyles.length === 0) return 'Various';
  
  const top = characteristics.decisionStyles[0];
  if (characteristics.decisionStyles.length === 1) return top.label;
  
  const second = characteristics.decisionStyles[1];
  if (top.percentage > 60) return top.label;
  
  return `${top.label} / ${second.label}`;
}
