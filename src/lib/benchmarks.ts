// Industry benchmark data for ROI calculations
// Data sourced from industry research and AT&T business insights
// Values adjusted to produce realistic ROI projections (50-350% range)

export interface IndustryBenchmark {
  id: string;
  name: string;
  avgDowntimeHoursPerYear: number;
  downtimeCostPerHour: number;
  avgDataBreachCost: number;
  productivityLossPercent: number;
  avgEmployeeCost: number; // Annual salary
  avgITSupportCostPerEmployee: number;
  avgNetworkMaintenanceCost: number;
  complianceRiskMultiplier: number;
  customerChurnRiskPercent: number;
  reputationRecoveryMonths: number;
}

// Reduced benchmark values for realistic ROI calculations
// Downtime hours reduced ~40%, productivity loss reduced to 3-8% range
export const industryBenchmarks: Record<string, IndustryBenchmark> = {
  healthcare: {
    id: 'healthcare',
    name: 'Healthcare',
    avgDowntimeHoursPerYear: 52, // Was 87
    downtimeCostPerHour: 8600,
    avgDataBreachCost: 4350000,
    productivityLossPercent: 6, // Was 12
    avgEmployeeCost: 65000,
    avgITSupportCostPerEmployee: 1200,
    avgNetworkMaintenanceCost: 45000,
    complianceRiskMultiplier: 2.5,
    customerChurnRiskPercent: 8,
    reputationRecoveryMonths: 18
  },
  retail: {
    id: 'retail',
    name: 'Retail',
    avgDowntimeHoursPerYear: 57, // Was 95
    downtimeCostPerHour: 5600,
    avgDataBreachCost: 2980000,
    productivityLossPercent: 7, // Was 15
    avgEmployeeCost: 42000,
    avgITSupportCostPerEmployee: 800,
    avgNetworkMaintenanceCost: 35000,
    complianceRiskMultiplier: 1.8,
    customerChurnRiskPercent: 12,
    reputationRecoveryMonths: 12
  },
  finance: {
    id: 'finance',
    name: 'Financial Services',
    avgDowntimeHoursPerYear: 31, // Was 52
    downtimeCostPerHour: 12500,
    avgDataBreachCost: 5720000,
    productivityLossPercent: 5, // Was 10
    avgEmployeeCost: 95000,
    avgITSupportCostPerEmployee: 1500,
    avgNetworkMaintenanceCost: 65000,
    complianceRiskMultiplier: 3.0,
    customerChurnRiskPercent: 15,
    reputationRecoveryMonths: 24
  },
  manufacturing: {
    id: 'manufacturing',
    name: 'Manufacturing',
    avgDowntimeHoursPerYear: 72, // Was 120
    downtimeCostPerHour: 9800,
    avgDataBreachCost: 2450000,
    productivityLossPercent: 8, // Was 18
    avgEmployeeCost: 55000,
    avgITSupportCostPerEmployee: 900,
    avgNetworkMaintenanceCost: 55000,
    complianceRiskMultiplier: 1.5,
    customerChurnRiskPercent: 6,
    reputationRecoveryMonths: 9
  },
  hospitality: {
    id: 'hospitality',
    name: 'Hospitality',
    avgDowntimeHoursPerYear: 47, // Was 78
    downtimeCostPerHour: 4200,
    avgDataBreachCost: 1850000,
    productivityLossPercent: 6, // Was 14
    avgEmployeeCost: 38000,
    avgITSupportCostPerEmployee: 600,
    avgNetworkMaintenanceCost: 28000,
    complianceRiskMultiplier: 1.6,
    customerChurnRiskPercent: 18,
    reputationRecoveryMonths: 8
  },
  professional_services: {
    id: 'professional_services',
    name: 'Professional Services',
    avgDowntimeHoursPerYear: 39, // Was 65
    downtimeCostPerHour: 7200,
    avgDataBreachCost: 3200000,
    productivityLossPercent: 5, // Was 11
    avgEmployeeCost: 85000,
    avgITSupportCostPerEmployee: 1100,
    avgNetworkMaintenanceCost: 40000,
    complianceRiskMultiplier: 2.0,
    customerChurnRiskPercent: 10,
    reputationRecoveryMonths: 15
  },
  construction: {
    id: 'construction',
    name: 'Construction',
    avgDowntimeHoursPerYear: 55, // Was 92
    downtimeCostPerHour: 6500,
    avgDataBreachCost: 1650000,
    productivityLossPercent: 7, // Was 16
    avgEmployeeCost: 52000,
    avgITSupportCostPerEmployee: 700,
    avgNetworkMaintenanceCost: 32000,
    complianceRiskMultiplier: 1.3,
    customerChurnRiskPercent: 5,
    reputationRecoveryMonths: 6
  },
  transportation: {
    id: 'transportation',
    name: 'Transportation & Logistics',
    avgDowntimeHoursPerYear: 66, // Was 110
    downtimeCostPerHour: 8200,
    avgDataBreachCost: 2100000,
    productivityLossPercent: 8, // Was 20
    avgEmployeeCost: 48000,
    avgITSupportCostPerEmployee: 850,
    avgNetworkMaintenanceCost: 48000,
    complianceRiskMultiplier: 1.7,
    customerChurnRiskPercent: 9,
    reputationRecoveryMonths: 10
  },
  education: {
    id: 'education',
    name: 'Education',
    avgDowntimeHoursPerYear: 43, // Was 72
    downtimeCostPerHour: 3800,
    avgDataBreachCost: 2850000,
    productivityLossPercent: 6, // Was 13
    avgEmployeeCost: 58000,
    avgITSupportCostPerEmployee: 950,
    avgNetworkMaintenanceCost: 38000,
    complianceRiskMultiplier: 2.2,
    customerChurnRiskPercent: 7,
    reputationRecoveryMonths: 14
  },
  government: {
    id: 'government',
    name: 'Government',
    avgDowntimeHoursPerYear: 35, // Was 58
    downtimeCostPerHour: 5500,
    avgDataBreachCost: 4100000,
    productivityLossPercent: 4, // Was 9
    avgEmployeeCost: 62000,
    avgITSupportCostPerEmployee: 1050,
    avgNetworkMaintenanceCost: 52000,
    complianceRiskMultiplier: 2.8,
    customerChurnRiskPercent: 3,
    reputationRecoveryMonths: 20
  },
  real_estate: {
    id: 'real_estate',
    name: 'Real Estate',
    avgDowntimeHoursPerYear: 41, // Was 68
    downtimeCostPerHour: 4800,
    avgDataBreachCost: 1950000,
    productivityLossPercent: 5, // Was 12
    avgEmployeeCost: 72000,
    avgITSupportCostPerEmployee: 750,
    avgNetworkMaintenanceCost: 30000,
    complianceRiskMultiplier: 1.4,
    customerChurnRiskPercent: 11,
    reputationRecoveryMonths: 9
  },
  other: {
    id: 'other',
    name: 'Other Industries',
    avgDowntimeHoursPerYear: 48, // Was 80
    downtimeCostPerHour: 5000,
    avgDataBreachCost: 2500000,
    productivityLossPercent: 5, // Was 12
    avgEmployeeCost: 55000,
    avgITSupportCostPerEmployee: 900,
    avgNetworkMaintenanceCost: 35000,
    complianceRiskMultiplier: 1.5,
    customerChurnRiskPercent: 8,
    reputationRecoveryMonths: 12
  }
};

// Business size multipliers for scaling benchmarks
export interface BusinessSizeMultiplier {
  id: string;
  label: string;
  employeeRange: string;
  downtimeMultiplier: number;
  securityRiskMultiplier: number;
  supportCostMultiplier: number;
  avgEmployeeCount: number;
}

export const businessSizeMultipliers: Record<string, BusinessSizeMultiplier> = {
  '1-10': {
    id: '1-10',
    label: '1-10 employees',
    employeeRange: '1-10',
    downtimeMultiplier: 0.4,
    securityRiskMultiplier: 0.3,
    supportCostMultiplier: 0.5,
    avgEmployeeCount: 5
  },
  '11-50': {
    id: '11-50',
    label: '11-50 employees',
    employeeRange: '11-50',
    downtimeMultiplier: 0.7,
    securityRiskMultiplier: 0.5,
    supportCostMultiplier: 0.75,
    avgEmployeeCount: 30
  },
  '51-200': {
    id: '51-200',
    label: '51-200 employees',
    employeeRange: '51-200',
    downtimeMultiplier: 1.0,
    securityRiskMultiplier: 1.0,
    supportCostMultiplier: 1.0,
    avgEmployeeCount: 125
  },
  '201-500': {
    id: '201-500',
    label: '201-500 employees',
    employeeRange: '201-500',
    downtimeMultiplier: 1.5,
    securityRiskMultiplier: 1.5,
    supportCostMultiplier: 1.3,
    avgEmployeeCount: 350
  },
  '501-1000': {
    id: '501-1000',
    label: '501-1000 employees',
    employeeRange: '501-1000',
    downtimeMultiplier: 2.2,
    securityRiskMultiplier: 2.0,
    supportCostMultiplier: 1.6,
    avgEmployeeCount: 750
  },
  '1000+': {
    id: '1000+',
    label: '1000+ employees',
    employeeRange: '1000+',
    downtimeMultiplier: 3.0,
    securityRiskMultiplier: 2.5,
    supportCostMultiplier: 2.0,
    avgEmployeeCount: 1500
  }
};

// Maximum downtime cost caps by business size (prevents runaway calculations)
export const maxDowntimeCostBySize: Record<string, number> = {
  '1-10': 15000,
  '11-50': 50000,
  '51-200': 150000,
  '201-500': 400000,
  '501-1000': 800000,
  '1000+': 1500000
};

// Maximum productivity loss caps by business size
export const maxProductivityLossBySize: Record<string, number> = {
  '1-10': 8000,
  '11-50': 30000,
  '51-200': 100000,
  '201-500': 250000,
  '501-1000': 500000,
  '1000+': 900000
};

// Location multipliers for multi-site businesses
export interface LocationMultiplier {
  id: string;
  label: string;
  locationRange: string;
  complexityMultiplier: number;
  avgLocationCount: number;
}

export const locationMultipliers: Record<string, LocationMultiplier> = {
  '1': {
    id: '1',
    label: 'Single location',
    locationRange: '1',
    complexityMultiplier: 1.0,
    avgLocationCount: 1
  },
  '2-5': {
    id: '2-5',
    label: '2-5 locations',
    locationRange: '2-5',
    complexityMultiplier: 1.3,
    avgLocationCount: 3
  },
  '6-20': {
    id: '6-20',
    label: '6-20 locations',
    locationRange: '6-20',
    complexityMultiplier: 1.7,
    avgLocationCount: 12
  },
  '21-50': {
    id: '21-50',
    label: '21-50 locations',
    locationRange: '21-50',
    complexityMultiplier: 2.2,
    avgLocationCount: 35
  },
  '50+': {
    id: '50+',
    label: '50+ locations',
    locationRange: '50+',
    complexityMultiplier: 3.0,
    avgLocationCount: 75
  }
};

// Pain point impact factors (reduced for realistic calculations)
export interface PainPointImpact {
  id: string;
  label: string;
  downtimeImpact: number; // Additive impact (not multiplicative)
  productivityImpact: number;
  securityImpact: number;
  description: string;
}

export const painPointImpacts: Record<string, PainPointImpact> = {
  downtime: {
    id: 'downtime',
    label: 'Frequent Downtime',
    downtimeImpact: 0.25, // Adds 25% (was 1.5x multiplier)
    productivityImpact: 0.10,
    securityImpact: 0.0,
    description: 'Network outages disrupting business operations'
  },
  'slow-speeds': {
    id: 'slow-speeds',
    label: 'Slow Network Speeds',
    downtimeImpact: 0.05,
    productivityImpact: 0.20,
    securityImpact: 0.0,
    description: 'Slow connectivity affecting employee productivity'
  },
  'security-concerns': {
    id: 'security-concerns',
    label: 'Security Vulnerabilities',
    downtimeImpact: 0.0,
    productivityImpact: 0.05,
    securityImpact: 0.40,
    description: 'Concerns about data breaches and cyber threats'
  },
  'no-backup': {
    id: 'no-backup',
    label: 'No Backup Connectivity',
    downtimeImpact: 0.35,
    productivityImpact: 0.15,
    securityImpact: 0.05,
    description: 'Single point of failure for internet connectivity'
  },
  'poor-support': {
    id: 'poor-support',
    label: 'Poor Provider Support',
    downtimeImpact: 0.15,
    productivityImpact: 0.10,
    securityImpact: 0.0,
    description: 'Long wait times and unresolved issues with current provider'
  },
  'high-costs': {
    id: 'high-costs',
    label: 'High Operating Costs',
    downtimeImpact: 0.0,
    productivityImpact: 0.0,
    securityImpact: 0.0,
    description: 'Current solutions are too expensive for value delivered'
  },
  'legacy-systems': {
    id: 'legacy-systems',
    label: 'Outdated Infrastructure',
    downtimeImpact: 0.20,
    productivityImpact: 0.25,
    securityImpact: 0.20,
    description: 'Legacy systems limiting business capabilities'
  },
  'multi-vendor': {
    id: 'multi-vendor',
    label: 'Multi-Vendor Complexity',
    downtimeImpact: 0.10,
    productivityImpact: 0.15,
    securityImpact: 0.10,
    description: 'Managing multiple providers across locations'
  }
};

// Helper function to get benchmark by industry key
export function getBenchmarkByIndustry(industryKey: string): IndustryBenchmark {
  const normalizedKey = industryKey.toLowerCase().replace(/\s+/g, '_').replace(/-/g, '_');
  return industryBenchmarks[normalizedKey] || industryBenchmarks.other;
}

// Helper function to calculate scaled benchmark values
// Uses additive pain point scaling with caps for realistic results
export function getScaledBenchmarks(
  industryKey: string,
  businessSize: string,
  locations: string,
  painPoints: string[]
): {
  annualDowntimeCost: number;
  annualProductivityLoss: number;
  annualSecurityRisk: number;
  annualSupportCost: number;
} {
  const benchmark = getBenchmarkByIndustry(industryKey);
  const sizeMultiplier = businessSizeMultipliers[businessSize] || businessSizeMultipliers['51-200'];
  const locationMultiplier = locationMultipliers[locations] || locationMultipliers['1'];

  // Calculate pain point multipliers using ADDITIVE scaling with diminishing returns
  // Instead of multiplicative compounding, we add impacts and cap the total
  const downtimePainMultiplier = Math.min(
    1 + painPoints.reduce((sum, point) => {
      const impact = painPointImpacts[point];
      return sum + (impact?.downtimeImpact || 0);
    }, 0),
    1.8 // Maximum 80% increase from pain points
  );

  const productivityPainMultiplier = Math.min(
    1 + painPoints.reduce((sum, point) => {
      const impact = painPointImpacts[point];
      return sum + (impact?.productivityImpact || 0);
    }, 0),
    1.6 // Maximum 60% increase from pain points
  );

  const securityPainMultiplier = Math.min(
    1 + painPoints.reduce((sum, point) => {
      const impact = painPointImpacts[point];
      return sum + (impact?.securityImpact || 0);
    }, 0),
    1.8 // Maximum 80% increase from pain points
  );

  // Calculate base downtime cost with multipliers
  let annualDowntimeCost = 
    benchmark.avgDowntimeHoursPerYear * 
    benchmark.downtimeCostPerHour * 
    sizeMultiplier.downtimeMultiplier * 
    locationMultiplier.complexityMultiplier *
    downtimePainMultiplier;

  // Apply business size cap to prevent unrealistic values
  const maxDowntime = maxDowntimeCostBySize[businessSize] || 150000;
  annualDowntimeCost = Math.min(annualDowntimeCost, maxDowntime);

  // Calculate productivity loss
  const employeeCount = sizeMultiplier.avgEmployeeCount;
  let annualProductivityLoss = 
    (benchmark.avgEmployeeCost * (benchmark.productivityLossPercent / 100)) * 
    employeeCount *
    productivityPainMultiplier;

  // Apply productivity cap
  const maxProductivity = maxProductivityLossBySize[businessSize] || 100000;
  annualProductivityLoss = Math.min(annualProductivityLoss, maxProductivity);

  // Calculate security risk with reduced annualized probability (5% instead of 15%)
  const annualSecurityRisk = 
    benchmark.avgDataBreachCost * 
    sizeMultiplier.securityRiskMultiplier * 
    (benchmark.complianceRiskMultiplier / 2) *
    securityPainMultiplier *
    0.05; // Reduced annualized probability factor (was 0.15)

  // Support costs remain straightforward
  const annualSupportCost = 
    benchmark.avgITSupportCostPerEmployee * 
    employeeCount * 
    sizeMultiplier.supportCostMultiplier +
    benchmark.avgNetworkMaintenanceCost * 
    locationMultiplier.avgLocationCount;

  return {
    annualDowntimeCost: Math.round(annualDowntimeCost),
    annualProductivityLoss: Math.round(annualProductivityLoss),
    annualSecurityRisk: Math.round(annualSecurityRisk),
    annualSupportCost: Math.round(annualSupportCost)
  };
}
