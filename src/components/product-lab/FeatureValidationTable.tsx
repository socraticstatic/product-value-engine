import { Product } from '@/data/products';
import { CustomerPersona, customerPersonas } from '@/data/personas';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { CheckCircle2, AlertCircle, XCircle, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureValidationTableProps {
  product: Product;
}

type RelevanceLevel = 'high' | 'medium' | 'low' | 'none';

interface FeatureAnalysis {
  feature: string;
  personaRelevance: Record<string, RelevanceLevel>;
  competitiveAdvantage: 'unique' | 'strong' | 'parity' | 'weak';
  messagingStrength: 'strong' | 'moderate' | 'needs-work';
}

function analyzeFeatureRelevance(feature: string, persona: CustomerPersona): RelevanceLevel {
  const featureLower = feature.toLowerCase();
  const needsText = persona.topNeeds.map(n => n.need.toLowerCase()).join(' ');
  const painText = persona.painPoints.map(p => p.toLowerCase()).join(' ');

  const relevanceKeywords: Record<string, string[]> = {
    reliability: ['reliability', 'uptime', '99.9%', 'sla', 'guarantee'],
    speed: ['speed', 'gbps', 'mbps', 'symmetrical', 'fast'],
    backup: ['backup', '5g backup', 'failover', 'continuity'],
    security: ['security', 'protection', 'threat', 'encryption'],
    support: ['support', '24/7', 'service', 'help'],
    price: ['no fees', 'no contract', 'included', 'free'],
  };

  let matchScore = 0;

  Object.entries(relevanceKeywords).forEach(([category, keywords]) => {
    const featureHasKeyword = keywords.some(k => featureLower.includes(k));
    const personaNeedsCategory = needsText.includes(category) || painText.includes(category);
    
    if (featureHasKeyword && personaNeedsCategory) {
      matchScore += 2;
    } else if (featureHasKeyword) {
      matchScore += 0.5;
    }
  });

  if (matchScore >= 2) return 'high';
  if (matchScore >= 1) return 'medium';
  if (matchScore >= 0.5) return 'low';
  return 'none';
}

function analyzeCompetitiveAdvantage(feature: string): 'unique' | 'strong' | 'parity' | 'weak' {
  const featureLower = feature.toLowerCase();
  
  if (
    featureLower.includes('5g backup') ||
    featureLower.includes('at&t guarantee') ||
    featureLower.includes('utility line') ||
    featureLower.includes('leader in')
  ) {
    return 'unique';
  }
  
  if (
    featureLower.includes('symmetrical') ||
    featureLower.includes('no contract') ||
    featureLower.includes('no equipment fees') ||
    featureLower.includes('wi-fi 6e')
  ) {
    return 'strong';
  }
  
  if (
    featureLower.includes('24/7') ||
    featureLower.includes('security') ||
    featureLower.includes('free installation')
  ) {
    return 'parity';
  }
  
  return 'parity';
}

function analyzeMessagingStrength(feature: string): 'strong' | 'moderate' | 'needs-work' {
  if (
    feature.includes('ONLY') ||
    feature.includes('built-in') ||
    feature.includes('included') ||
    feature.includes('guarantee')
  ) {
    return 'strong';
  }
  
  if (
    feature.includes('reliable') ||
    feature.includes('support') ||
    feature.includes('security')
  ) {
    return 'moderate';
  }
  
  return 'needs-work';
}

const relevanceIcons = {
  high: { icon: CheckCircle2, color: 'text-success', label: 'High' },
  medium: { icon: AlertCircle, color: 'text-warning', label: 'Medium' },
  low: { icon: Minus, color: 'text-muted-foreground', label: 'Low' },
  none: { icon: XCircle, color: 'text-destructive/50', label: 'None' },
};

const advantageBadges = {
  unique: { color: 'bg-primary/10 text-primary border-primary/30', label: 'Unique' },
  strong: { color: 'bg-success/10 text-success border-success/30', label: 'Strong' },
  parity: { color: 'bg-muted text-muted-foreground border-border', label: 'Parity' },
  weak: { color: 'bg-destructive/10 text-destructive border-destructive/30', label: 'Weak' },
};

const messagingBadges = {
  strong: { color: 'bg-success/10 text-success border-success/30', label: 'Strong' },
  moderate: { color: 'bg-warning/10 text-warning border-warning/30', label: 'Moderate' },
  'needs-work': { color: 'bg-destructive/10 text-destructive border-destructive/30', label: 'Needs Work' },
};

// Helper function to generate relevance explanation
function getRelevanceExplanation(
  relevance: RelevanceLevel, 
  feature: string, 
  persona: CustomerPersona
): string {
  const needsText = persona.topNeeds.slice(0, 3).map(n => n.need).join(', ');
  
  if (relevance === 'high') {
    return `This feature directly addresses ${persona.segmentName}'s top priorities: ${needsText}.`;
  } else if (relevance === 'medium') {
    return `Partial alignment with this segment's needs. May resonate with some buyers in ${persona.industry}.`;
  } else if (relevance === 'low') {
    return `Limited connection to ${persona.segmentName}'s stated priorities.`;
  }
  return `This feature doesn't align with ${persona.segmentName}'s primary needs or pain points.`;
}

// Segment Column Header with hover card
interface SegmentColumnHeaderProps {
  persona: CustomerPersona;
}

function SegmentColumnHeader({ persona }: SegmentColumnHeaderProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex flex-col items-center gap-1 cursor-pointer hover:bg-muted/50 rounded p-1 -m-1 transition-colors">
          <span className="text-lg">{persona.avatar}</span>
          <span className="text-xs truncate max-w-[80px]">
            Seg {persona.segmentId}
          </span>
          <span className="text-xs text-muted-foreground truncate max-w-[80px]">
            {persona.industry}
          </span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-72" side="bottom">
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-sm">{persona.segmentName}</p>
            <p className="text-xs text-muted-foreground">{persona.industry}</p>
          </div>
          
          <div>
            <p className="text-xs font-medium mb-1">Top Needs</p>
            <div className="space-y-1">
              {persona.topNeeds.slice(0, 3).map((need, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span>{need.need}</span>
                  <span className="text-muted-foreground">{need.importance}%</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-xs font-medium mb-1">Key Pain Points</p>
            <ul className="text-xs space-y-0.5 text-muted-foreground">
              {persona.painPoints.slice(0, 3).map((pain, i) => (
                <li key={i}>• {pain}</li>
              ))}
            </ul>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

// Relevance Cell with hover explanation
interface RelevanceCellProps {
  relevance: RelevanceLevel;
  feature: string;
  persona: CustomerPersona;
}

function RelevanceCell({ relevance, feature, persona }: RelevanceCellProps) {
  const config = relevanceIcons[relevance];
  const Icon = config.icon;
  const explanation = getRelevanceExplanation(relevance, feature, persona);
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex justify-center cursor-pointer">
          <Icon className={cn('w-4 h-4', config.color)} />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-64" side="top">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Icon className={cn('w-4 h-4', config.color)} />
            <span className="font-medium text-sm">{config.label} Relevance</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {explanation}
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export function FeatureValidationTable({ product }: FeatureValidationTableProps) {
  // Take first 4 personas for the grid
  const displayPersonas = customerPersonas.slice(0, 4);
  
  // Combine talking points and value props as the "features" to analyze
  // These are more sales-oriented than technical features
  const solutionAttributes = [
    ...product.talkingPoints.slice(0, 5),
    ...product.valueProps.slice(0, 5),
  ];
  
  // Analyze each attribute
  const featureAnalyses: FeatureAnalysis[] = solutionAttributes.map(feature => {
    const personaRelevance: Record<string, RelevanceLevel> = {};
    displayPersonas.forEach(persona => {
      personaRelevance[persona.id] = analyzeFeatureRelevance(feature, persona);
    });

    return {
      feature,
      personaRelevance,
      competitiveAdvantage: analyzeCompetitiveAdvantage(feature),
      messagingStrength: analyzeMessagingStrength(feature),
    };
  });

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[300px]">Talking Point / Value Prop</TableHead>
            {displayPersonas.map(persona => (
              <TableHead key={persona.id} className="text-center w-[100px]">
                <SegmentColumnHeader persona={persona} />
              </TableHead>
            ))}
            <TableHead className="text-center">Competitive</TableHead>
            <TableHead className="text-center">Messaging</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {featureAnalyses.map((analysis, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium text-sm">
                {analysis.feature.length > 60 
                  ? analysis.feature.substring(0, 60) + '...' 
                  : analysis.feature}
              </TableCell>
              {displayPersonas.map(persona => {
                const relevance = analysis.personaRelevance[persona.id];
                return (
                  <TableCell key={persona.id} className="text-center">
                    <RelevanceCell 
                      relevance={relevance} 
                      feature={analysis.feature} 
                      persona={persona} 
                    />
                  </TableCell>
                );
              })}
              <TableCell className="text-center">
                <Badge 
                  variant="outline" 
                  className={`text-xs ${advantageBadges[analysis.competitiveAdvantage].color}`}
                >
                  {advantageBadges[analysis.competitiveAdvantage].label}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <Badge 
                  variant="outline" 
                  className={`text-xs ${messagingBadges[analysis.messagingStrength].color}`}
                >
                  {messagingBadges[analysis.messagingStrength].label}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
