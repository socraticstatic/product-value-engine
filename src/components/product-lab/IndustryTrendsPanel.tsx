import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TrendingUp, Zap, Swords, ChevronDown, Globe } from 'lucide-react';
import { getIndustryTrends, type TechTrend } from '@/data/industryTechTrends';
import type { CustomerPersona } from '@/data/personas';
import { useState } from 'react';

interface IndustryTrendsPanelProps {
  persona: CustomerPersona | undefined;
  compact?: boolean;
}

const impactColors: Record<string, string> = {
  high: 'bg-destructive/10 text-destructive border-destructive/30',
  medium: 'bg-primary/10 text-primary border-primary/30',
  low: 'bg-muted text-muted-foreground border-border',
};

const categoryConfig = {
  industry: { icon: Globe, label: 'Industry Trends', color: 'text-primary' },
  emerging: { icon: Zap, label: 'Emerging Tech', color: 'text-warning' },
  competitive: { icon: Swords, label: 'Market Shifts', color: 'text-info' },
};

function TrendItem({ trend }: { trend: TechTrend }) {
  const priorityLabels = trend.relevantPriorities?.slice(0, 2);
  return (
    <div className="flex items-start gap-2 text-sm">
      <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${
        trend.impact === 'high' ? 'bg-destructive' : trend.impact === 'medium' ? 'bg-primary' : 'bg-muted-foreground'
      }`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm leading-snug">{trend.trend}</p>
        {priorityLabels && priorityLabels.length > 0 && (
          <div className="flex gap-1 mt-1">
            {priorityLabels.map(p => (
              <Badge key={p} variant="outline" className="text-[10px] h-4 px-1.5 capitalize">
                {p.replace(/-/g, ' ')}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <Badge variant="outline" className={`text-[10px] shrink-0 ${impactColors[trend.impact]}`}>
        {trend.impact}
      </Badge>
    </div>
  );
}

function TrendCategory({ category, trends }: { category: 'industry' | 'emerging' | 'competitive'; trends: TechTrend[] }) {
  const [open, setOpen] = useState(true);
  const config = categoryConfig[category];
  const Icon = config.icon;

  if (trends.length === 0) return null;

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center gap-2 w-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        <Icon className={`w-4 h-4 ${config.color}`} />
        <span className="flex-1 text-left">{config.label}</span>
        <Badge variant="secondary" className="text-[10px] h-4">{trends.length}</Badge>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? '' : '-rotate-90'}`} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-2.5 mt-2 pl-1">
          {trends.map((trend, i) => (
            <TrendItem key={i} trend={trend} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function IndustryTrendsPanel({ persona, compact = false }: IndustryTrendsPanelProps) {
  const trendsData = useMemo(() => {
    if (!persona) return null;
    return getIndustryTrends(persona.industry);
  }, [persona]);

  if (!persona || !trendsData) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full text-center py-12">
          <div>
            <TrendingUp className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              Select a persona to see industry trends
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    const topTrends = [
      ...trendsData.industryTrends.filter(t => t.impact === 'high').slice(0, 1),
      ...trendsData.emergingTech.filter(t => t.impact === 'high').slice(0, 1),
      ...trendsData.competitiveShifts.filter(t => t.impact === 'high').slice(0, 1),
    ];

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <TrendingUp className="w-4 h-4" />
          Industry Trends
        </div>
        <div className="space-y-2">
          {topTrends.map((trend, i) => (
            <TrendItem key={i} trend={trend} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 border-b shrink-0">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <div>
            <CardTitle className="text-base">Industry Intelligence</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">{persona.industry}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2 italic">
          "{trendsData.headline}"
        </p>
      </CardHeader>
      <ScrollArea className="flex-1">
        <CardContent className="p-4 space-y-5">
          <TrendCategory category="industry" trends={trendsData.industryTrends} />
          <TrendCategory category="emerging" trends={trendsData.emergingTech} />
          <TrendCategory category="competitive" trends={trendsData.competitiveShifts} />
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
