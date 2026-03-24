// Industry-specific recommendations for smart suggestions in the form

export interface IndustryRecommendation {
  suggestedPainPoints: string[];
  suggestedPriorities: string[];
  commonServices: string[];
  context: string;
}

export const industryRecommendations: Record<string, IndustryRecommendation> = {
  'retail': {
    suggestedPainPoints: ['downtime', 'slow-speeds', 'security-concerns'],
    suggestedPriorities: ['reliability', 'speed', 'security'],
    commonServices: ['fiber-internet', 'voip', 'wireless'],
    context: 'Retail businesses need fast, reliable connectivity to keep checkout lines moving and protect customer payment data.'
  },
  'healthcare': {
    suggestedPainPoints: ['downtime', 'security-concerns', 'compliance'],
    suggestedPriorities: ['reliability', 'security', 'backup-failover'],
    commonServices: ['fiber-internet', 'voip', 'wireless'],
    context: 'Healthcare providers require HIPAA-compliant, always-on connectivity to ensure patient care is never interrupted.'
  },
  'finance': {
    suggestedPainPoints: ['security-concerns', 'downtime', 'compliance'],
    suggestedPriorities: ['security', 'reliability', 'speed'],
    commonServices: ['fiber-internet', 'voip'],
    context: 'Financial services demand bank-grade security, regulatory compliance, and real-time transaction processing.'
  },
  'manufacturing': {
    suggestedPainPoints: ['downtime', 'slow-speeds', 'scalability-limits'],
    suggestedPriorities: ['reliability', 'scalability', 'iot'],
    commonServices: ['fiber-internet', 'wireless'],
    context: 'Manufacturing operations need reliable connectivity for production line monitoring and real-time data from connected equipment.'
  },
  'professional-services': {
    suggestedPainPoints: ['slow-speeds', 'poor-support', 'high-costs'],
    suggestedPriorities: ['speed', 'remote-work', 'unified-comms'],
    commonServices: ['fiber-internet', 'voip', 'wireless'],
    context: 'Professional services firms need fast file sharing, seamless video conferencing, and reliable remote work capabilities.'
  },
  'hospitality': {
    suggestedPainPoints: ['downtime', 'slow-speeds', 'poor-support'],
    suggestedPriorities: ['reliability', 'speed', 'scalability'],
    commonServices: ['fiber-internet', 'voip', 'wireless'],
    context: 'Hospitality businesses need reliable guest WiFi, fast payment processing, and consistent connectivity across properties.'
  },
  'construction': {
    suggestedPainPoints: ['no-backup', 'downtime', 'legacy-systems'],
    suggestedPriorities: ['mobility', 'reliability', 'backup-failover'],
    commonServices: ['wireless', 'voip'],
    context: 'Construction companies need mobile connectivity at job sites, reliable communication between crews, and backup options for remote locations.'
  },
  'transportation': {
    suggestedPainPoints: ['no-backup', 'slow-speeds', 'downtime'],
    suggestedPriorities: ['mobility', 'reliability', 'iot'],
    commonServices: ['wireless', 'voip'],
    context: 'Transportation and logistics companies need real-time fleet tracking, reliable dispatch communication, and mobile connectivity.'
  },
  'education': {
    suggestedPainPoints: ['slow-speeds', 'security-concerns', 'scalability-limits'],
    suggestedPriorities: ['speed', 'security', 'scalability'],
    commonServices: ['fiber-internet', 'voip', 'wireless'],
    context: 'Educational institutions need high-bandwidth connectivity for online learning, secure student data protection, and scalable infrastructure.'
  },
  'government': {
    suggestedPainPoints: ['security-concerns', 'compliance', 'legacy-systems'],
    suggestedPriorities: ['security', 'reliability', 'compliance'],
    commonServices: ['fiber-internet', 'voip'],
    context: 'Government agencies require strict security compliance, reliable citizen services, and modernization of legacy systems.'
  },
  'real-estate': {
    suggestedPainPoints: ['slow-speeds', 'mobility', 'poor-support'],
    suggestedPriorities: ['mobility', 'speed', 'unified-comms'],
    commonServices: ['fiber-internet', 'voip', 'wireless'],
    context: 'Real estate professionals need fast property listing uploads, reliable mobile connectivity, and seamless client communication.'
  },
  'other': {
    suggestedPainPoints: ['downtime', 'slow-speeds', 'high-costs'],
    suggestedPriorities: ['reliability', 'speed', 'cost-savings'],
    commonServices: ['fiber-internet', 'voip'],
    context: 'Every business needs reliable, fast connectivity to serve customers and grow.'
  }
};

export function getIndustryRecommendation(industryId: string): IndustryRecommendation {
  return industryRecommendations[industryId] || industryRecommendations['other'];
}

export function isPainPointRecommended(industryId: string, painPointId: string): boolean {
  const rec = getIndustryRecommendation(industryId);
  return rec.suggestedPainPoints.includes(painPointId);
}

export function isPriorityRecommended(industryId: string, priorityId: string): boolean {
  const rec = getIndustryRecommendation(industryId);
  return rec.suggestedPriorities.includes(priorityId);
}

export function isServiceRecommended(industryId: string, serviceId: string): boolean {
  const rec = getIndustryRecommendation(industryId);
  return rec.commonServices.includes(serviceId);
}
