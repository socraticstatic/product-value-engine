// ROI Analyzer TypeScript interfaces

export interface BusinessProfile {
  companyName: string;
  industry: string;
  businessSize: string;
  locations: string;
  painPoints: string[];
  priorities: string[];
  additionalContext: string;
  marketType?: 'smb' | 'enterprise';
  enterpriseGrouping?: string;
}

export interface Recommendation {
  productName: string;
  productId: string;
  category: string;
  matchScore: number;
  description: string;
  whyRecommended: string;
  industryUseCase: string;
  estimatedSavings: string;
  paybackPeriod: string;
  valueDrivers: string[];
  riskOfInaction: string;
  potentialLoss: string;
  riskExamples: string[];
}

export interface AnalysisResult {
  recommendations: Recommendation[];
  summary: string;
  industryInsights: string;
}

// Market Types - SMB vs Enterprise
export const MARKET_TYPES = [
  { id: 'smb', label: 'SMB', description: '1-1,999 employees' },
  { id: 'enterprise', label: 'Enterprise', description: '2,000+ employees, complex IT' }
];

// Enterprise Industry Groupings from 2025 Enterprise Marketplace Segmentation
export const ENTERPRISE_INDUSTRY_GROUPINGS = [
  { 
    id: 'healthcare', 
    label: 'Healthcare',
    subVerticals: ['Hospitals', 'Medical Imaging', 'Nursing/Assisted Living', 'Pharmaceuticals'],
    keyDynamics: ['HIPAA compliance', 'IoMT devices', 'Telemedicine', '24/7 connectivity'],
  },
  { 
    id: 'hospitality', 
    label: 'Hospitality',
    subVerticals: ['Entertainment', 'Hotels/Accommodation', 'Recreation', 'Transportation'],
    keyDynamics: ['Guest experience', 'Multi-property management', 'POS systems', 'Seasonal peaks'],
  },
  { 
    id: 'industrials', 
    label: 'Industrials',
    subVerticals: ['Agriculture', 'Construction', 'Manufacturing', 'Utilities/Mining/O&G', 'Transportation & Warehousing'],
    keyDynamics: ['OT/IT convergence', 'IoT sensors', 'Remote sites', 'Safety systems'],
  },
  { 
    id: 'professional-services', 
    label: 'Professional Services',
    subVerticals: ['Finance/Banking/Insurance', 'Health Insurance', 'Professional & Technical Services'],
    keyDynamics: ['Regulatory compliance', 'Data security', 'Client confidentiality', 'Remote work'],
  },
  { 
    id: 'retail', 
    label: 'Retail',
    subVerticals: ['Food Services', 'Retail Trade'],
    keyDynamics: ['POS reliability', 'Inventory management', 'Omnichannel', 'Customer WiFi'],
  },
  { 
    id: 'technology', 
    label: 'Technology',
    subVerticals: ['Software Developers/Publishers'],
    keyDynamics: ['Cloud connectivity', 'Developer productivity', 'Global collaboration', 'Scalability'],
  }
];

export const INDUSTRIES = [
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'retail', label: 'Retail' },
  { id: 'finance', label: 'Financial Services' },
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'hospitality', label: 'Hospitality' },
  { id: 'professional_services', label: 'Professional Services' },
  { id: 'construction', label: 'Construction' },
  { id: 'transportation', label: 'Transportation & Logistics' },
  { id: 'education', label: 'Education' },
  { id: 'government', label: 'Government' },
  { id: 'real_estate', label: 'Real Estate' },
  { id: 'technology', label: 'Technology' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'agriculture', label: 'Agriculture' },
  { id: 'utilities', label: 'Utilities/Energy' },
  { id: 'other', label: 'Other' }
];

export const BUSINESS_SIZES = [
  { id: '1-10', label: '1-10 employees', marketType: 'smb' },
  { id: '11-50', label: '11-50 employees', marketType: 'smb' },
  { id: '51-200', label: '51-200 employees', marketType: 'smb' },
  { id: '201-500', label: '201-500 employees', marketType: 'smb' },
  { id: '501-1000', label: '501-1000 employees', marketType: 'smb' },
  { id: '1000-1999', label: '1000-1999 employees', marketType: 'smb' },
  { id: '2000-5000', label: '2,000-5,000 employees', marketType: 'enterprise' },
  { id: '5000-10000', label: '5,000-10,000 employees', marketType: 'enterprise' },
  { id: '10000+', label: '10,000+ employees', marketType: 'enterprise' }
];

export const LOCATIONS = [
  { id: '1', label: 'Single location' },
  { id: '2-5', label: '2-5 locations' },
  { id: '6-20', label: '6-20 locations' },
  { id: '21-50', label: '21-50 locations' },
  { id: '51-100', label: '51-100 locations' },
  { id: '100-500', label: '100-500 locations' },
  { id: '500+', label: '500+ locations' }
];

export const PAIN_POINTS = [
  { id: 'downtime', label: 'Frequent Downtime', description: 'Network outages disrupting operations' },
  { id: 'slow-speeds', label: 'Slow Network Speeds', description: 'Connectivity affecting productivity' },
  { id: 'security-concerns', label: 'Security Vulnerabilities', description: 'Cyber threats and data exposure' },
  { id: 'no-backup', label: 'No Backup Connectivity', description: 'Single point of failure' },
  { id: 'poor-support', label: 'Poor Provider Support', description: 'Long wait times, unresolved issues' },
  { id: 'high-costs', label: 'High Operating Costs', description: 'Overpaying for current solutions' },
  { id: 'legacy-systems', label: 'Outdated Infrastructure', description: 'Legacy systems limiting growth' },
  { id: 'multi-vendor', label: 'Multi-Vendor Complexity', description: 'Managing multiple providers' },
  // Enterprise-specific pain points
  { id: 'multi-cloud', label: 'Multi-Cloud Complexity', description: 'Managing hybrid/multi-cloud environments', marketType: 'enterprise' },
  { id: 'global-connectivity', label: 'Global Connectivity Gaps', description: 'Inconsistent performance across regions', marketType: 'enterprise' },
  { id: 'regulatory-compliance', label: 'Regulatory Compliance', description: 'Meeting industry-specific regulations', marketType: 'enterprise' },
  { id: 'it-complexity', label: 'IT Environment Complexity', description: 'Managing complex infrastructure at scale', marketType: 'enterprise' },
  { id: 'vendor-consolidation', label: 'Vendor Consolidation Needs', description: 'Too many point solutions and vendors', marketType: 'enterprise' }
];

export const PRIORITIES = [
  { id: 'reliability', label: 'Reliability', description: 'Consistent, always-on connectivity' },
  { id: 'speed', label: 'Speed & Performance', description: 'Fast upload/download for cloud apps' },
  { id: 'security', label: 'Security', description: 'Protection from cyber threats' },
  { id: 'cost-savings', label: 'Cost Savings', description: 'Reduce operating expenses' },
  { id: 'backup-failover', label: 'Backup & Failover', description: 'Business continuity protection' },
  { id: 'unified-management', label: 'Unified Management', description: 'Single vendor, one bill' },
  { id: 'scalability', label: 'Scalability', description: 'Room to grow' },
  { id: 'support', label: 'Better Support', description: 'Responsive, expert assistance' },
  // Enterprise-specific priorities
  { id: '24x7-support', label: '24/7 Dedicated Support', description: 'Round-the-clock expert assistance', marketType: 'enterprise' },
  { id: 'proactive-monitoring', label: 'Proactive Monitoring', description: 'AI-driven issue detection and prevention', marketType: 'enterprise' },
  { id: 'digital-transformation', label: 'Digital Transformation', description: 'Enable AI, automation, and innovation', marketType: 'enterprise' },
  { id: 'network-modernization', label: 'Network Modernization', description: 'SD-WAN, SASE, edge computing', marketType: 'enterprise' },
  { id: 'global-reach', label: 'Global Reach', description: 'Consistent experience worldwide', marketType: 'enterprise' }
];

// Enterprise insights from 2025 Enterprise Marketplace Segmentation report
export const ENTERPRISE_INSIGHTS = {
  keyStats: {
    seekBestConnectivity: '85-87%', // seek best connectivity regardless of cost
    movingToCloud: '76-92%', // actively moving to cloud
    aiOpportunity: '74-91%', // view AI as opportunity for growth
    cybersecurityInvestment: '60-76%', // willing to invest regardless of cost
  },
  topEvaluationCriteria: [
    '24/7 support availability',
    'Diversity of purchase channels',
    'Proactive support and monitoring',
    'Industry-specific expertise',
    'Partner ecosystem integration'
  ],
  differentiators: [
    'Speak their industry language',
    'Understand their specific challenges',
    'Proactive vs reactive support',
    'Strategic partnership mindset'
  ]
};

// Helper to get sizes by market type
export function getSizesByMarketType(marketType: 'smb' | 'enterprise' | 'all'): typeof BUSINESS_SIZES {
  if (marketType === 'all') return BUSINESS_SIZES;
  return BUSINESS_SIZES.filter(s => s.marketType === marketType);
}

// Helper to determine market type from business size
export function getMarketTypeFromSize(businessSize: string): 'smb' | 'enterprise' {
  const enterpriseSizes = ['2000-5000', '5000-10000', '10000+'];
  return enterpriseSizes.includes(businessSize) ? 'enterprise' : 'smb';
}
