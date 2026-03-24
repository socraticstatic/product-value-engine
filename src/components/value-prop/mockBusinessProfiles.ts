export interface MockBusinessProfile {
  id: string;
  name: string;
  icon: string;
  industry: string;
  businessDescription: string;
  employeeCount: string;
  locations: string;
  painPoints: string[];
  priorities: string[];
  type: 'small-business' | 'mid-market' | 'enterprise';
  marketType: 'smb' | 'enterprise';
  enterpriseGrouping?: string;
}

// SMB Business Profiles
export const SMB_BUSINESS_PROFILES: MockBusinessProfile[] = [
  {
    id: 'dental-practice',
    name: 'Dental Practice',
    icon: '🦷',
    industry: 'Healthcare',
    businessDescription: 'Multi-chair dental practice with cloud imaging',
    employeeCount: '11-50',
    locations: '1',
    painPoints: ['downtime', 'slow-speeds', 'security-concerns'],
    priorities: ['reliability', 'security', 'cost-savings'],
    type: 'small-business',
    marketType: 'smb'
  },
  {
    id: 'retail-boutique',
    name: 'Retail Boutique',
    icon: '🛍️',
    industry: 'Retail',
    businessDescription: 'Multi-location fashion retail chain',
    employeeCount: '11-50',
    locations: '2-5',
    painPoints: ['downtime', 'multiple-vendors', 'high-costs'],
    priorities: ['reliability', 'cost-savings', 'scalability'],
    type: 'small-business',
    marketType: 'smb'
  },
  {
    id: 'law-firm',
    name: 'Law Firm',
    icon: '⚖️',
    industry: 'Professional Services',
    businessDescription: 'Mid-size law firm with sensitive client data',
    employeeCount: '11-50',
    locations: '1',
    painPoints: ['security-concerns', 'slow-speeds', 'poor-support'],
    priorities: ['security', 'reliability', 'support'],
    type: 'small-business',
    marketType: 'smb'
  },
  {
    id: 'restaurant-group',
    name: 'Restaurant Group',
    icon: '🍽️',
    industry: 'Hospitality',
    businessDescription: 'Multi-location restaurant chain with POS systems',
    employeeCount: '51-200',
    locations: '6-20',
    painPoints: ['downtime', 'multiple-vendors', 'scaling'],
    priorities: ['reliability', 'scalability', 'cost-savings'],
    type: 'mid-market',
    marketType: 'smb'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing Facility',
    icon: '🏭',
    industry: 'Manufacturing',
    businessDescription: 'Production facility with IoT equipment',
    employeeCount: '51-200',
    locations: '1',
    painPoints: ['downtime', 'slow-speeds', 'outdated-tech'],
    priorities: ['reliability', 'speed', 'scalability'],
    type: 'mid-market',
    marketType: 'smb'
  },
  {
    id: 'construction',
    name: 'Construction Company',
    icon: '🏗️',
    industry: 'Construction',
    businessDescription: 'General contractor with multiple job sites',
    employeeCount: '11-50',
    locations: '2-5',
    painPoints: ['slow-speeds', 'multiple-vendors', 'scaling'],
    priorities: ['reliability', 'scalability', 'cost-savings'],
    type: 'small-business',
    marketType: 'smb'
  },
  {
    id: 'accounting-firm',
    name: 'Accounting Firm',
    icon: '📊',
    industry: 'Finance',
    businessDescription: 'CPA firm handling sensitive financial data',
    employeeCount: '11-50',
    locations: '1',
    painPoints: ['security-concerns', 'slow-speeds', 'poor-support'],
    priorities: ['security', 'reliability', 'support'],
    type: 'small-business',
    marketType: 'smb'
  },
  {
    id: 'medical-clinic',
    name: 'Medical Clinic',
    icon: '🏥',
    industry: 'Healthcare',
    businessDescription: 'Multi-location clinic with EHR systems',
    employeeCount: '51-200',
    locations: '2-5',
    painPoints: ['downtime', 'security-concerns', 'scaling'],
    priorities: ['reliability', 'security', 'scalability'],
    type: 'mid-market',
    marketType: 'smb'
  },
  {
    id: 'logistics',
    name: 'Logistics Company',
    icon: '🚚',
    industry: 'Transportation',
    businessDescription: 'Fleet and warehouse management operations',
    employeeCount: '201-500',
    locations: '6-20',
    painPoints: ['downtime', 'multiple-vendors', 'scaling'],
    priorities: ['reliability', 'scalability', 'speed'],
    type: 'mid-market',
    marketType: 'smb'
  },
  {
    id: 'school-district',
    name: 'K-12 School District',
    icon: '🏫',
    industry: 'Education',
    businessDescription: 'School district with 1:1 device program',
    employeeCount: '201-500',
    locations: '6-20',
    painPoints: ['slow-speeds', 'security-concerns', 'outdated-tech'],
    priorities: ['reliability', 'security', 'cost-savings'],
    type: 'mid-market',
    marketType: 'smb'
  }
];

// Enterprise Business Profiles (NEW)
export const ENTERPRISE_BUSINESS_PROFILES: MockBusinessProfile[] = [
  {
    id: 'enterprise-hospital-system',
    name: 'Regional Hospital System',
    icon: '🏥',
    industry: 'Healthcare',
    businessDescription: 'Multi-hospital system with acute care and telehealth',
    employeeCount: '5000-10000',
    locations: '21-50',
    painPoints: ['downtime', 'security-concerns', 'regulatory-compliance', 'multi-cloud'],
    priorities: ['reliability', 'security', '24x7-support', 'backup-failover'],
    type: 'enterprise',
    marketType: 'enterprise',
    enterpriseGrouping: 'healthcare'
  },
  {
    id: 'enterprise-hotel-chain',
    name: 'National Hotel Chain',
    icon: '🏨',
    industry: 'Hospitality',
    businessDescription: 'National hotel brand with 200+ properties',
    employeeCount: '5000-10000',
    locations: '100+',
    painPoints: ['multi-vendor', 'global-connectivity', 'it-complexity'],
    priorities: ['reliability', 'unified-management', 'scalability'],
    type: 'enterprise',
    marketType: 'enterprise',
    enterpriseGrouping: 'hospitality'
  },
  {
    id: 'enterprise-manufacturing',
    name: 'Manufacturing Conglomerate',
    icon: '🏭',
    industry: 'Manufacturing',
    businessDescription: 'Multi-plant manufacturing with OT/IT convergence',
    employeeCount: '2000-5000',
    locations: '6-20',
    painPoints: ['downtime', 'legacy-systems', 'it-complexity'],
    priorities: ['reliability', 'network-modernization', 'digital-transformation'],
    type: 'enterprise',
    marketType: 'enterprise',
    enterpriseGrouping: 'industrials'
  },
  {
    id: 'enterprise-financial',
    name: 'Financial Services Enterprise',
    icon: '🏦',
    industry: 'Finance',
    businessDescription: 'Regional bank with digital banking platform',
    employeeCount: '2000-5000',
    locations: '51-100',
    painPoints: ['security-concerns', 'regulatory-compliance', 'multi-cloud'],
    priorities: ['security', '24x7-support', 'reliability'],
    type: 'enterprise',
    marketType: 'enterprise',
    enterpriseGrouping: 'professional-services'
  },
  {
    id: 'enterprise-retail',
    name: 'National Retail Chain',
    icon: '🏬',
    industry: 'Retail',
    businessDescription: 'National retail chain with 500+ stores',
    employeeCount: '10000+',
    locations: '500+',
    painPoints: ['downtime', 'multi-vendor', 'it-complexity'],
    priorities: ['reliability', 'unified-management', 'cost-savings'],
    type: 'enterprise',
    marketType: 'enterprise',
    enterpriseGrouping: 'retail'
  },
  {
    id: 'enterprise-tech',
    name: 'Software Development Company',
    icon: '💻',
    industry: 'Technology',
    businessDescription: 'Enterprise software with global engineering teams',
    employeeCount: '2000-5000',
    locations: '6-20',
    painPoints: ['slow-speeds', 'global-connectivity', 'multi-cloud'],
    priorities: ['speed', 'scalability', 'digital-transformation'],
    type: 'enterprise',
    marketType: 'enterprise',
    enterpriseGrouping: 'technology'
  }
];

// Combined profiles
export const MOCK_BUSINESS_PROFILES: MockBusinessProfile[] = [
  ...SMB_BUSINESS_PROFILES,
  ...ENTERPRISE_BUSINESS_PROFILES
];

// Get personas by industry
export function getBusinessProfilesByIndustry(industry: string): MockBusinessProfile[] {
  return MOCK_BUSINESS_PROFILES.filter(p => p.industry.toLowerCase() === industry.toLowerCase());
}

// Get unique industries
export function getUniqueIndustries(): string[] {
  return [...new Set(MOCK_BUSINESS_PROFILES.map(p => p.industry))];
}

// Get profiles by market type
export function getBusinessProfilesByMarketType(marketType: 'smb' | 'enterprise' | 'all'): MockBusinessProfile[] {
  if (marketType === 'all') return MOCK_BUSINESS_PROFILES;
  return MOCK_BUSINESS_PROFILES.filter(p => p.marketType === marketType);
}

// Get profiles by enterprise grouping
export function getBusinessProfilesByEnterpriseGrouping(grouping: string): MockBusinessProfile[] {
  return ENTERPRISE_BUSINESS_PROFILES.filter(p => p.enterpriseGrouping === grouping);
}
