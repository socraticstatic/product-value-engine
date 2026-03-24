import { PersonaFitScore } from '@/utils/personaFitScoring';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface SegmentNeedsBarProps {
  personas: PersonaFitScore[];
  maxNeeds?: number;
}

const needIcons: Record<string, string> = {
  price: '💰',
  cost: '💰',
  reliability: '📶',
  coverage: '📶',
  security: '🔒',
  support: '🛟',
  customer: '🛟',
  speed: '⚡',
  innovation: '💡',
  integration: '🔗',
  mobility: '📱',
  contract: '📋',
  billing: '📋',
};

function getNeedIcon(need: string): string {
  const needLower = need.toLowerCase();
  for (const [key, icon] of Object.entries(needIcons)) {
    if (needLower.includes(key)) {
      return icon;
    }
  }
  return '📍';
}

export function SegmentNeedsBar({ personas, maxNeeds = 4 }: SegmentNeedsBarProps) {
  // Aggregate needs across all personas in the segment
  const needFrequency: Record<string, { count: number; avgImportance: number }> = {};

  personas.forEach(fit => {
    fit.persona.topNeeds.forEach(need => {
      if (!needFrequency[need.need]) {
        needFrequency[need.need] = { count: 0, avgImportance: 0 };
      }
      needFrequency[need.need].count++;
      needFrequency[need.need].avgImportance += need.importance;
    });
  });

  // Calculate coverage percentage and sort by frequency
  const totalPersonas = personas.length;
  const aggregatedNeeds = Object.entries(needFrequency)
    .map(([need, data]) => ({
      need,
      coverage: Math.round((data.count / totalPersonas) * 100),
      avgImportance: Math.round(data.avgImportance / data.count),
    }))
    .sort((a, b) => b.coverage - a.coverage || b.avgImportance - a.avgImportance)
    .slice(0, maxNeeds);

  if (aggregatedNeeds.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground">Common Needs in This Segment</p>
      <div className="grid grid-cols-2 gap-2">
        {aggregatedNeeds.map(({ need, coverage }) => (
          <div key={need} className="flex flex-col gap-1 p-2 rounded-md bg-muted/30">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">{getNeedIcon(need)}</span>
              <span className="text-xs font-medium truncate flex-1">{need}</span>
              <span className="text-xs text-muted-foreground">{coverage}%</span>
            </div>
            <Progress 
              value={coverage} 
              className={cn(
                "h-1.5",
                coverage >= 70 ? "[&>div]:bg-green-500" : 
                coverage >= 40 ? "[&>div]:bg-amber-500" : 
                "[&>div]:bg-muted-foreground"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
