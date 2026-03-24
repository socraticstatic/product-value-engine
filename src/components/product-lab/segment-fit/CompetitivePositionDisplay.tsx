import { CompetitivePosition } from '@/utils/segmentFitScoring';
import { Trophy, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompetitivePositionDisplayProps {
  positions: CompetitivePosition[];
  compact?: boolean;
}

export function CompetitivePositionDisplay({ positions, compact = false }: CompetitivePositionDisplayProps) {
  if (positions.length === 0) {
    return null;
  }

  const wins = positions.filter(p => p.type === 'win');
  const cautions = positions.filter(p => p.type === 'caution');

  // In compact mode, show only 2 items
  const displayWins = compact ? wins.slice(0, 1) : wins.slice(0, 2);
  const displayCautions = compact ? cautions.slice(0, 1) : cautions.slice(0, 1);

  return (
    <div className={cn('space-y-1.5', compact && 'space-y-1')}>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Competitive Position
        </span>
      </div>
      <div className="space-y-1">
        {displayWins.map((position, idx) => (
          <div key={`win-${idx}`} className="flex items-start gap-2">
            <Trophy className="w-4 h-4 text-success shrink-0 mt-0.5" />
            <span className={cn('text-sm', compact && 'line-clamp-1')}>
              {position.statement}
            </span>
          </div>
        ))}
        {displayCautions.map((position, idx) => (
          <div key={`caution-${idx}`} className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
            <span className={cn('text-sm text-muted-foreground', compact && 'line-clamp-1')}>
              {position.statement}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
