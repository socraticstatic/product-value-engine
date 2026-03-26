import { products, Product } from '@/data/products';

export type JourneyStage = 'learn' | 'buy' | 'get' | 'use' | 'pay' | 'support';

export interface JourneyStageInfo {
  id: JourneyStage;
  label: string;
  description: string;
  icon: string;
}

export interface StageRequirement {
  requirement: string;
  priority: 'critical' | 'high' | 'medium';
  owner: string;
}

export interface ProductJourneyRequirements {
  productId: string;
  productName: string;
  stages: Record<JourneyStage, StageRequirement[]>;
}

export const journeyStages: JourneyStageInfo[] = [
  { id: 'learn', label: 'Learn', description: 'Discovery & education', icon: '📖' },
  { id: 'buy', label: 'Buy', description: 'Purchase & decision', icon: '🛒' },
  { id: 'get', label: 'Get', description: 'Provisioning & onboarding', icon: '📦' },
  { id: 'use', label: 'Use', description: 'Day-to-day experience', icon: '⚡' },
  { id: 'pay', label: 'Pay', description: 'Billing & invoicing', icon: '💳' },
  { id: 'support', label: 'Support', description: 'Service & resolution', icon: '🛟' },
];

// Category-level CX requirements that apply to product categories
const categoryRequirements: Record<string, Record<JourneyStage, StageRequirement[]>> = {
  'Connectivity': {
    learn: [
      { requirement: 'Speed test tool to assess current vs. needed bandwidth', priority: 'critical', owner: 'Digital' },
      { requirement: 'Coverage/availability checker by address', priority: 'critical', owner: 'Digital' },
      { requirement: 'ROI calculator comparing fiber vs. alternatives', priority: 'high', owner: 'Marketing' },
      { requirement: 'Industry-specific use case content (video, cloud apps)', priority: 'medium', owner: 'Content' },
    ],
    buy: [
      { requirement: 'Transparent pricing with no hidden fees', priority: 'critical', owner: 'Product' },
      { requirement: 'Contract flexibility options (1yr, 2yr, month-to-month)', priority: 'high', owner: 'Product' },
      { requirement: 'Bundle discount visibility when adding products', priority: 'high', owner: 'Sales Ops' },
      { requirement: 'Site survey scheduling within 48 hours', priority: 'medium', owner: 'Operations' },
    ],
    get: [
      { requirement: 'Self-service install tracking portal', priority: 'critical', owner: 'Digital' },
      { requirement: 'Dedicated project manager for multi-location installs', priority: 'high', owner: 'Operations' },
      { requirement: 'Same-day or next-day activation SLA for single-site', priority: 'high', owner: 'Operations' },
      { requirement: 'Network readiness checklist sent pre-install', priority: 'medium', owner: 'Operations' },
    ],
    use: [
      { requirement: 'Real-time speed and uptime monitoring dashboard', priority: 'critical', owner: 'Product' },
      { requirement: 'Automatic failover notification when backup activates', priority: 'critical', owner: 'Engineering' },
      { requirement: 'Proactive alerts for degradation before outage', priority: 'high', owner: 'NOC' },
      { requirement: 'Self-service bandwidth upgrade without truck roll', priority: 'medium', owner: 'Product' },
    ],
    pay: [
      { requirement: 'Unified bill across all AT&T products', priority: 'critical', owner: 'Billing' },
      { requirement: 'Cost breakdown by location for multi-site', priority: 'high', owner: 'Billing' },
      { requirement: 'Auto-pay discount and paperless billing options', priority: 'medium', owner: 'Billing' },
    ],
    support: [
      { requirement: '24/7 business-grade support with <2 min hold time', priority: 'critical', owner: 'Care' },
      { requirement: 'Dedicated account team for enterprise accounts', priority: 'high', owner: 'Account Mgmt' },
      { requirement: 'Self-service troubleshooting with guided diagnostics', priority: 'high', owner: 'Digital' },
      { requirement: 'Proactive outage notifications with ETA', priority: 'medium', owner: 'NOC' },
    ],
  },
  'Voice': {
    learn: [
      { requirement: 'Feature comparison: Business Voice vs. UCaaS vs. legacy', priority: 'critical', owner: 'Marketing' },
      { requirement: 'Number porting timeline and process documentation', priority: 'high', owner: 'Content' },
      { requirement: 'Demo environment for call management features', priority: 'medium', owner: 'Sales Eng' },
    ],
    buy: [
      { requirement: 'Per-line pricing transparency with volume discounts', priority: 'critical', owner: 'Product' },
      { requirement: 'Number porting guarantee (no downtime)', priority: 'critical', owner: 'Operations' },
      { requirement: 'Integration compatibility check with existing PBX/CRM', priority: 'high', owner: 'Sales Eng' },
    ],
    get: [
      { requirement: 'Guided self-service setup for call routing and IVR', priority: 'high', owner: 'Digital' },
      { requirement: 'Pre-configured phones shipped ready to plug in', priority: 'high', owner: 'Operations' },
      { requirement: 'Training resources for admin and end-users', priority: 'medium', owner: 'Enablement' },
    ],
    use: [
      { requirement: 'Call quality monitoring and analytics dashboard', priority: 'critical', owner: 'Product' },
      { requirement: 'Mobile app parity for remote/hybrid workers', priority: 'high', owner: 'Product' },
      { requirement: 'Self-service call flow changes without IT support', priority: 'medium', owner: 'Product' },
    ],
    pay: [
      { requirement: 'Per-line itemized billing', priority: 'high', owner: 'Billing' },
      { requirement: 'Usage alerts for international or toll calls', priority: 'medium', owner: 'Billing' },
    ],
    support: [
      { requirement: 'Priority escalation for total voice outages', priority: 'critical', owner: 'Care' },
      { requirement: 'Remote diagnostics for call quality issues', priority: 'high', owner: 'Tech Support' },
    ],
  },
  'Security': {
    learn: [
      { requirement: 'Threat landscape briefing tailored to industry', priority: 'critical', owner: 'Marketing' },
      { requirement: 'Compliance mapping (HIPAA, PCI, SOC2) documentation', priority: 'high', owner: 'Product' },
      { requirement: 'Security assessment or vulnerability scan offering', priority: 'medium', owner: 'Sales Eng' },
    ],
    buy: [
      { requirement: 'Clear SLA definitions for threat detection & response', priority: 'critical', owner: 'Product' },
      { requirement: 'Compliance certification documentation included', priority: 'high', owner: 'Legal' },
      { requirement: 'Trial or POC period for security products', priority: 'medium', owner: 'Sales' },
    ],
    get: [
      { requirement: 'Security baseline configuration out of box', priority: 'critical', owner: 'Engineering' },
      { requirement: 'Onboarding security review with AT&T specialist', priority: 'high', owner: 'Security Ops' },
    ],
    use: [
      { requirement: 'Real-time threat dashboard with actionable alerts', priority: 'critical', owner: 'Product' },
      { requirement: 'Automated threat blocking without manual intervention', priority: 'critical', owner: 'Engineering' },
      { requirement: 'Monthly security posture reports', priority: 'high', owner: 'Security Ops' },
    ],
    pay: [
      { requirement: 'Transparent pricing — no per-incident charges', priority: 'high', owner: 'Product' },
    ],
    support: [
      { requirement: '24/7 SOC-level support for critical threats', priority: 'critical', owner: 'Security Ops' },
      { requirement: 'Incident response playbook and escalation path', priority: 'high', owner: 'Security Ops' },
    ],
  },
  'Bundle': {
    learn: [
      { requirement: 'Total cost of ownership calculator for bundle vs. à la carte', priority: 'critical', owner: 'Marketing' },
      { requirement: 'Single-page bundle overview with all included products', priority: 'high', owner: 'Content' },
    ],
    buy: [
      { requirement: 'Single contract for all bundled products', priority: 'critical', owner: 'Legal' },
      { requirement: 'Bundle discount clearly shown vs. individual pricing', priority: 'critical', owner: 'Product' },
      { requirement: 'Flexible add/remove products mid-term', priority: 'high', owner: 'Product' },
    ],
    get: [
      { requirement: 'Coordinated multi-product installation schedule', priority: 'critical', owner: 'Operations' },
      { requirement: 'Single onboarding point of contact', priority: 'high', owner: 'Account Mgmt' },
    ],
    use: [
      { requirement: 'Unified management portal across all products', priority: 'critical', owner: 'Product' },
      { requirement: 'Cross-product analytics (e.g., network + voice + security)', priority: 'high', owner: 'Product' },
    ],
    pay: [
      { requirement: 'One bill for entire bundle', priority: 'critical', owner: 'Billing' },
      { requirement: 'Clear line-item breakdown within unified bill', priority: 'high', owner: 'Billing' },
    ],
    support: [
      { requirement: 'Single support number for all bundled products', priority: 'critical', owner: 'Care' },
      { requirement: 'Cross-product troubleshooting (no "that\'s not our department")', priority: 'critical', owner: 'Care' },
    ],
  },
};

// Default requirements for categories not explicitly mapped
const defaultRequirements: Record<JourneyStage, StageRequirement[]> = {
  learn: [
    { requirement: 'Clear product positioning vs. alternatives', priority: 'high', owner: 'Marketing' },
    { requirement: 'Industry-specific use cases and case studies', priority: 'medium', owner: 'Content' },
  ],
  buy: [
    { requirement: 'Transparent, predictable pricing', priority: 'critical', owner: 'Product' },
    { requirement: 'Easy-to-understand service agreements', priority: 'high', owner: 'Legal' },
  ],
  get: [
    { requirement: 'Clear activation timeline and milestones', priority: 'critical', owner: 'Operations' },
    { requirement: 'Welcome kit with quick-start guide', priority: 'medium', owner: 'Enablement' },
  ],
  use: [
    { requirement: 'Intuitive management portal', priority: 'critical', owner: 'Product' },
    { requirement: 'Performance monitoring and alerts', priority: 'high', owner: 'Product' },
  ],
  pay: [
    { requirement: 'Consolidated billing option', priority: 'high', owner: 'Billing' },
    { requirement: 'Flexible payment methods', priority: 'medium', owner: 'Billing' },
  ],
  support: [
    { requirement: 'Business-hours support with escalation path', priority: 'high', owner: 'Care' },
    { requirement: 'Online knowledge base and FAQs', priority: 'medium', owner: 'Digital' },
  ],
};

function getRequirementsForCategory(category: string): Record<JourneyStage, StageRequirement[]> {
  // Try exact match, then partial
  if (categoryRequirements[category]) return categoryRequirements[category];
  
  for (const key of Object.keys(categoryRequirements)) {
    if (category.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(category.toLowerCase())) {
      return categoryRequirements[key];
    }
  }
  return defaultRequirements;
}

export function getProductJourneyRequirements(productIds: string[]): ProductJourneyRequirements[] {
  return productIds
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => !!p)
    .map(product => ({
      productId: product.id,
      productName: product.name,
      stages: getRequirementsForCategory(product.category),
    }));
}

export interface ConsolidatedJourney {
  stages: Record<JourneyStage, { requirements: Array<StageRequirement & { sources: string[] }>; criticalCount: number }>;
  multiProductInsights: string[];
}

export function getConsolidatedJourneyRequirements(productIds: string[]): ConsolidatedJourney {
  const perProduct = getProductJourneyRequirements(productIds);
  const isMulti = productIds.length > 1;

  const stages = {} as ConsolidatedJourney['stages'];

  for (const stage of journeyStages) {
    const seen = new Map<string, StageRequirement & { sources: string[] }>();

    for (const pj of perProduct) {
      for (const req of pj.stages[stage.id]) {
        const key = req.requirement;
        if (seen.has(key)) {
          seen.get(key)!.sources.push(pj.productName);
        } else {
          seen.set(key, { ...req, sources: [pj.productName] });
        }
      }
    }

    // Add bundle-level requirements if multi-product
    if (isMulti && categoryRequirements['Bundle']) {
      for (const req of categoryRequirements['Bundle'][stage.id]) {
        const key = req.requirement;
        if (!seen.has(key)) {
          seen.set(key, { ...req, sources: ['Bundle'] });
        }
      }
    }

    const requirements = Array.from(seen.values()).sort((a, b) => {
      const p = { critical: 0, high: 1, medium: 2 };
      return p[a.priority] - p[b.priority];
    });

    stages[stage.id] = {
      requirements,
      criticalCount: requirements.filter(r => r.priority === 'critical').length,
    };
  }

  const multiProductInsights: string[] = [];
  if (isMulti) {
    multiProductInsights.push(
      'Coordinated installation across products reduces customer effort and speeds time-to-value',
      'Unified billing eliminates multi-vendor invoice complexity',
      'Single support contact prevents cross-product finger-pointing',
      'Combined management portal enables holistic visibility',
    );
  }

  return { stages, multiProductInsights };
}
