import { priorityOptions, painPointOptions } from '@/types/customer';

// Color palette for need tags - using solid backgrounds for better visibility
export const needTagColors: Record<string, { bg: string; text: string; border: string }> = {
  // Priority colors
  'reliability': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
  'security': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
  'speed': { bg: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-300' },
  'scalability': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
  'cost-savings': { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-300' },
  'remote-work': { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-300' },
  'unified-comms': { bg: 'bg-violet-100', text: 'text-violet-700', border: 'border-violet-300' },
  'iot': { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
  'backup-failover': { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-300' },
  'mobility': { bg: 'bg-sky-100', text: 'text-sky-700', border: 'border-sky-300' },
  
  // Pain point colors (using more urgent/warning tones)
  'slow-speeds': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
  'downtime': { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300' },
  'security-concerns': { bg: 'bg-fuchsia-100', text: 'text-fuchsia-700', border: 'border-fuchsia-300' },
  'high-costs': { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' },
  'multiple-vendors': { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-300' },
  'poor-support': { bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-300' },
  'legacy-systems': { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300' },
  'compliance': { bg: 'bg-lime-100', text: 'text-lime-700', border: 'border-lime-300' },
  'scalability-limits': { bg: 'bg-zinc-100', text: 'text-zinc-700', border: 'border-zinc-300' },
  'no-backup': { bg: 'bg-stone-100', text: 'text-stone-700', border: 'border-stone-300' },
};

export function getNeedTagColor(needId: string) {
  return needTagColors[needId] || { bg: 'bg-muted', text: 'text-muted-foreground', border: 'border-border' };
}

// Get customer-centric label for priority (uses the new label field)
export function getPriorityLabel(id: string): string {
  return priorityOptions.find(opt => opt.id === id)?.label || id;
}

// Get technical/internal label for priority
export function getPriorityTechnicalLabel(id: string): string {
  const opt = priorityOptions.find(opt => opt.id === id);
  return opt?.technicalLabel || opt?.label || id;
}

// Get customer-centric label for pain point (uses the new label field)
export function getPainPointLabel(id: string): string {
  return painPointOptions.find(opt => opt.id === id)?.label || id;
}

// Get technical/internal label for pain point
export function getPainPointTechnicalLabel(id: string): string {
  const opt = painPointOptions.find(opt => opt.id === id);
  return opt?.technicalLabel || opt?.label || id;
}

// Map product features to customer needs
export function mapProductToNeeds(productFeatures: string[], talkingPoints: string[], priorities: string[], painPoints: string[]) {
  const matchedPriorities: string[] = [];
  const matchedPainPoints: string[] = [];
  
  const allText = [...productFeatures, ...talkingPoints].join(' ').toLowerCase();
  
  priorities.forEach(priority => {
    const keywords = getPriorityKeywords(priority);
    if (keywords.some(kw => allText.includes(kw))) {
      matchedPriorities.push(priority);
    }
  });
  
  painPoints.forEach(painPoint => {
    const keywords = getPainPointKeywords(painPoint);
    if (keywords.some(kw => allText.includes(kw))) {
      matchedPainPoints.push(painPoint);
    }
  });
  
  return { matchedPriorities, matchedPainPoints };
}

function getPriorityKeywords(priority: string): string[] {
  const keywordMap: Record<string, string[]> = {
    'reliability': ['reliable', 'uptime', 'sla', 'availability', '99.9%'],
    'security': ['secure', 'security', 'encrypt', 'protect', 'firewall', 'ddos'],
    'speed': ['speed', 'fast', 'gbps', 'mbps', 'bandwidth', 'low latency'],
    'scalability': ['scale', 'scalable', 'grow', 'expand', 'flexible'],
    'cost-savings': ['save', 'cost', 'value', 'bundle', 'discount', 'tco'],
    'remote-work': ['remote', 'work from home', 'hybrid', 'mobile workforce'],
    'unified-comms': ['unified', 'communications', 'collaborate', 'video', 'voice'],
    'iot': ['iot', 'connected', 'sensor', 'device', 'm2m'],
    'backup-failover': ['backup', 'failover', 'redundant', 'continuity', 'disaster'],
    'mobility': ['mobile', 'wireless', '5g', '4g', 'cellular'],
  };
  return keywordMap[priority] || [priority];
}

function getPainPointKeywords(painPoint: string): string[] {
  const keywordMap: Record<string, string[]> = {
    'slow-speeds': ['speed', 'fast', 'gbps', 'bandwidth', 'fiber'],
    'downtime': ['uptime', 'reliable', 'sla', 'availability', 'monitoring'],
    'security-concerns': ['secure', 'security', 'protect', 'encrypt', 'threat'],
    'high-costs': ['save', 'cost', 'value', 'bundle', 'efficient'],
    'multiple-vendors': ['single', 'one provider', 'consolidate', 'unified', 'integrated'],
    'poor-support': ['support', '24/7', 'dedicated', 'account manager'],
    'legacy-systems': ['modern', 'upgrade', 'digital', 'transform', 'migration'],
    'compliance': ['compliant', 'hipaa', 'pci', 'soc', 'regulatory'],
    'scalability-limits': ['scale', 'grow', 'expand', 'flexible'],
    'no-backup': ['backup', 'failover', 'redundant', 'continuity'],
  };
  return keywordMap[painPoint] || [painPoint.replace('-', ' ')];
}
