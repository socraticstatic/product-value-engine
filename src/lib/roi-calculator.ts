// ROI calculation formulas and product cost models
// Adjusted for realistic ROI projections (50-350% range)
import { getScaledBenchmarks, getBenchmarkByIndustry, businessSizeMultipliers, locationMultipliers } from './benchmarks';

export interface ROIComponent {
  category: string;
  label: string;
  currentCost: number;
  projectedCost: number;
  savings: number;
  description: string;
}

export interface ProductROI {
  productName: string;
  productId: string;
  totalAnnualSavings: number;
  totalRiskAvoidance: number;
  paybackMonths: number;
  components: ROIComponent[];
  estimatedMonthlyCost: number;
  estimatedAnnualCost: number;
  netROI: number;
  roiPercentage: number;
}

export interface ROISummary {
  totalCurrentCosts: number;
  totalProjectedCosts: number;
  totalAnnualSavings: number;
  totalRiskAvoidance: number;
  avgPaybackMonths: number;
  avgROIPercentage: number;
  fiveYearValue: number;
  products: ProductROI[];
}

// Product cost estimates (monthly) by product category
// Improvement percentages reduced ~60% for realistic projections
export const productCostEstimates: Record<string, {
  baseMonthly: number;
  perLocationAdder: number;
  perEmployeeAdder: number;
  implementationCost: number;
  reliabilityImprovement: number;
  productivityImprovement: number;
  securityImprovement: number;
  supportCostReduction: number;
}> = {
  'business-fiber-300m': {
    baseMonthly: 70,
    perLocationAdder: 0,
    perEmployeeAdder: 0,
    implementationCost: 0,
    reliabilityImprovement: 0.12, // Was 0.30
    productivityImprovement: 0.06, // Was 0.15
    securityImprovement: 0.04, // Was 0.10
    supportCostReduction: 0.04 // Was 0.10
  },
  'business-fiber-1g': {
    baseMonthly: 160,
    perLocationAdder: 0,
    perEmployeeAdder: 0,
    implementationCost: 0,
    reliabilityImprovement: 0.20, // Was 0.50
    productivityImprovement: 0.10, // Was 0.25
    securityImprovement: 0.06, // Was 0.15
    supportCostReduction: 0.06 // Was 0.15
  },
  'business-fiber-5g': {
    baseMonthly: 285,
    perLocationAdder: 0,
    perEmployeeAdder: 0,
    implementationCost: 0,
    reliabilityImprovement: 0.22, // Was 0.55
    productivityImprovement: 0.14, // Was 0.35
    securityImprovement: 0.06, // Was 0.15
    supportCostReduction: 0.06 // Was 0.15
  },
  'hsia-enterprise': {
    baseMonthly: 200,
    perLocationAdder: 150,
    perEmployeeAdder: 0,
    implementationCost: 500,
    reliabilityImprovement: 0.22, // Was 0.55
    productivityImprovement: 0.12, // Was 0.30
    securityImprovement: 0.08, // Was 0.20
    supportCostReduction: 0.14 // Was 0.35
  },
  'internet-air-business': {
    baseMonthly: 60,
    perLocationAdder: 50,
    perEmployeeAdder: 0,
    implementationCost: 0,
    reliabilityImprovement: 0.25, // Was 0.70 (backup value)
    productivityImprovement: 0.04, // Was 0.10
    securityImprovement: 0.02, // Was 0.05
    supportCostReduction: 0.02 // Was 0.05
  },
  '24hour-internet-500m': {
    baseMonthly: 120,
    perLocationAdder: 100,
    perEmployeeAdder: 0,
    implementationCost: 0,
    reliabilityImprovement: 0.26, // Was 0.65
    productivityImprovement: 0.08, // Was 0.20
    securityImprovement: 0.04, // Was 0.10
    supportCostReduction: 0.10 // Was 0.25
  },
  '24hour-internet-1g': {
    baseMonthly: 180,
    perLocationAdder: 150,
    perEmployeeAdder: 0,
    implementationCost: 0,
    reliabilityImprovement: 0.28, // Was 0.70
    productivityImprovement: 0.10, // Was 0.25
    securityImprovement: 0.06, // Was 0.15
    supportCostReduction: 0.12 // Was 0.30
  },
  'business-voice': {
    baseMonthly: 25,
    perLocationAdder: 0,
    perEmployeeAdder: 15,
    implementationCost: 200,
    reliabilityImprovement: 0.08, // Was 0.20
    productivityImprovement: 0.06, // Was 0.15
    securityImprovement: 0.04, // Was 0.10
    supportCostReduction: 0.08 // Was 0.20
  },
  'business-complete-bundle': {
    baseMonthly: 220,
    perLocationAdder: 0,
    perEmployeeAdder: 5,
    implementationCost: 0,
    reliabilityImprovement: 0.22, // Was 0.55
    productivityImprovement: 0.12, // Was 0.30
    securityImprovement: 0.08, // Was 0.20
    supportCostReduction: 0.10 // Was 0.25
  },
  'att-phone-advanced': {
    baseMonthly: 40,
    perLocationAdder: 0,
    perEmployeeAdder: 25,
    implementationCost: 500,
    reliabilityImprovement: 0.10, // Was 0.25
    productivityImprovement: 0.08, // Was 0.20
    securityImprovement: 0.06, // Was 0.15
    supportCostReduction: 0.10 // Was 0.25
  },
  'activearmor-security': {
    baseMonthly: 15,
    perLocationAdder: 0,
    perEmployeeAdder: 3,
    implementationCost: 100,
    reliabilityImprovement: 0.04, // Was 0.10
    productivityImprovement: 0.02, // Was 0.05
    securityImprovement: 0.16, // Was 0.40
    supportCostReduction: 0.04 // Was 0.10
  },
  // Default for unknown products
  'default': {
    baseMonthly: 100,
    perLocationAdder: 50,
    perEmployeeAdder: 2,
    implementationCost: 250,
    reliabilityImprovement: 0.10, // Was 0.25
    productivityImprovement: 0.06, // Was 0.15
    securityImprovement: 0.04, // Was 0.10
    supportCostReduction: 0.06 // Was 0.15
  }
};

// ROI calculation constants
const MAX_ROI_PERCENTAGE = 350; // Cap at 350% for credibility
const MIN_PAYBACK_MONTHS = 2; // Floor at 2 months

// Get product cost estimate or default
function getProductCost(productId: string) {
  return productCostEstimates[productId] || productCostEstimates['default'];
}

// Calculate ROI for a single product
export function calculateProductROI(
  productId: string,
  productName: string,
  industryKey: string,
  businessSize: string,
  locations: string,
  painPoints: string[]
): ProductROI {
  const productCost = getProductCost(productId);
  const benchmark = getBenchmarkByIndustry(industryKey);
  const sizeMultiplier = businessSizeMultipliers[businessSize] || businessSizeMultipliers['51-200'];
  const locationMultiplier = locationMultipliers[locations] || locationMultipliers['1'];
  
  const scaledBenchmarks = getScaledBenchmarks(industryKey, businessSize, locations, painPoints);
  const employeeCount = sizeMultiplier.avgEmployeeCount;
  const locationCount = locationMultiplier.avgLocationCount;

  // Calculate monthly cost
  const monthlyCost = 
    productCost.baseMonthly + 
    (productCost.perLocationAdder * locationCount) +
    (productCost.perEmployeeAdder * employeeCount);
  
  const annualCost = monthlyCost * 12 + productCost.implementationCost;

  // Calculate savings components
  const components: ROIComponent[] = [];

  // 1. Downtime reduction savings
  const currentDowntimeCost = scaledBenchmarks.annualDowntimeCost;
  const projectedDowntimeCost = currentDowntimeCost * (1 - productCost.reliabilityImprovement);
  const downtimeSavings = currentDowntimeCost - projectedDowntimeCost;
  
  components.push({
    category: 'reliability',
    label: 'Downtime Reduction',
    currentCost: currentDowntimeCost,
    projectedCost: projectedDowntimeCost,
    savings: downtimeSavings,
    description: `Reduce downtime by ${Math.round(productCost.reliabilityImprovement * 100)}% with improved reliability`
  });

  // 2. Productivity improvement
  const currentProductivityLoss = scaledBenchmarks.annualProductivityLoss;
  const projectedProductivityLoss = currentProductivityLoss * (1 - productCost.productivityImprovement);
  const productivitySavings = currentProductivityLoss - projectedProductivityLoss;

  components.push({
    category: 'productivity',
    label: 'Productivity Gains',
    currentCost: currentProductivityLoss,
    projectedCost: projectedProductivityLoss,
    savings: productivitySavings,
    description: `Boost productivity by ${Math.round(productCost.productivityImprovement * 100)}% with faster, more reliable connectivity`
  });

  // 3. Security risk reduction
  const currentSecurityRisk = scaledBenchmarks.annualSecurityRisk;
  const projectedSecurityRisk = currentSecurityRisk * (1 - productCost.securityImprovement);
  const securitySavings = currentSecurityRisk - projectedSecurityRisk;

  components.push({
    category: 'security',
    label: 'Security Risk Reduction',
    currentCost: currentSecurityRisk,
    projectedCost: projectedSecurityRisk,
    savings: securitySavings,
    description: `Reduce security risk exposure by ${Math.round(productCost.securityImprovement * 100)}%`
  });

  // 4. Support cost reduction
  const currentSupportCost = scaledBenchmarks.annualSupportCost;
  const projectedSupportCost = currentSupportCost * (1 - productCost.supportCostReduction);
  const supportSavings = currentSupportCost - projectedSupportCost;

  components.push({
    category: 'support',
    label: 'IT Support Savings',
    currentCost: currentSupportCost,
    projectedCost: projectedSupportCost,
    savings: supportSavings,
    description: `Reduce IT support overhead by ${Math.round(productCost.supportCostReduction * 100)}% with better infrastructure`
  });

  // Calculate totals
  const totalAnnualSavings = downtimeSavings + productivitySavings + supportSavings;
  const totalRiskAvoidance = securitySavings;
  const netROI = totalAnnualSavings + totalRiskAvoidance - annualCost;
  
  // Apply ROI cap for credibility
  const rawRoiPercentage = annualCost > 0 ? ((netROI / annualCost) * 100) : 0;
  const roiPercentage = Math.min(rawRoiPercentage, MAX_ROI_PERCENTAGE);
  
  // Calculate payback with minimum floor
  const monthlySavings = totalAnnualSavings / 12;
  const rawPaybackMonths = monthlySavings > 0 ? annualCost / monthlySavings : 999;
  const paybackMonths = Math.max(rawPaybackMonths, MIN_PAYBACK_MONTHS);

  return {
    productName,
    productId,
    totalAnnualSavings: Math.round(totalAnnualSavings),
    totalRiskAvoidance: Math.round(totalRiskAvoidance),
    paybackMonths: Math.round(paybackMonths * 10) / 10,
    components,
    estimatedMonthlyCost: Math.round(monthlyCost),
    estimatedAnnualCost: Math.round(annualCost),
    netROI: Math.round(netROI),
    roiPercentage: Math.round(roiPercentage)
  };
}

// Calculate ROI summary for multiple products
export function calculateROISummary(
  productIds: { id: string; name: string }[],
  industryKey: string,
  businessSize: string,
  locations: string,
  painPoints: string[]
): ROISummary {
  const products = productIds.map(p => 
    calculateProductROI(p.id, p.name, industryKey, businessSize, locations, painPoints)
  );

  const scaledBenchmarks = getScaledBenchmarks(industryKey, businessSize, locations, painPoints);
  const totalCurrentCosts = 
    scaledBenchmarks.annualDowntimeCost + 
    scaledBenchmarks.annualProductivityLoss + 
    scaledBenchmarks.annualSecurityRisk + 
    scaledBenchmarks.annualSupportCost;

  const totalAnnualSavings = products.reduce((sum, p) => sum + p.totalAnnualSavings, 0);
  const totalRiskAvoidance = products.reduce((sum, p) => sum + p.totalRiskAvoidance, 0);
  const totalProjectedCosts = products.reduce((sum, p) => sum + p.estimatedAnnualCost, 0);
  
  const avgPaybackMonths = products.length > 0 
    ? products.reduce((sum, p) => sum + p.paybackMonths, 0) / products.length 
    : 0;
  
  // Apply cap to average ROI as well
  const rawAvgROI = products.length > 0
    ? products.reduce((sum, p) => sum + p.roiPercentage, 0) / products.length
    : 0;
  const avgROIPercentage = Math.min(rawAvgROI, MAX_ROI_PERCENTAGE);

  const fiveYearValue = (totalAnnualSavings + totalRiskAvoidance) * 5 - totalProjectedCosts * 5;

  return {
    totalCurrentCosts: Math.round(totalCurrentCosts),
    totalProjectedCosts: Math.round(totalProjectedCosts),
    totalAnnualSavings: Math.round(totalAnnualSavings),
    totalRiskAvoidance: Math.round(totalRiskAvoidance),
    avgPaybackMonths: Math.round(avgPaybackMonths * 10) / 10,
    avgROIPercentage: Math.round(avgROIPercentage),
    fiveYearValue: Math.round(fiveYearValue),
    products
  };
}

// Format currency for display
export function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount.toLocaleString()}`;
}

// Format currency with full precision
export function formatCurrencyFull(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
