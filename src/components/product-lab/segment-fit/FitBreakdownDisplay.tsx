import { FitBreakdown } from '@/utils/segmentFitScoring';
import { cn } from '@/lib/utils';

interface FitBreakdownDisplayProps {
  fitBreakdown: FitBreakdown;
  compact?: boolean;
}

export function FitBreakdownDisplay({ fitBreakdown, compact = false }: FitBreakdownDisplayProps) {
  const { strong, moderate, weak, summary } = fitBreakdown;

  // Generate visual dots
  const dots = [];
  for (let i = 0; i < strong; i++) {
    dots.push({ type: 'strong', key: `strong-${i}` });
  }
  for (let i = 0; i < moderate; i++) {
    dots.push({ type: 'moderate', key: `moderate-${i}` });
  }
  for (let i = 0; i < weak; i++) {
    dots.push({ type: 'weak', key: `weak-${i}` });
  }

  return (
    <div className={cn('space-y-1.5', compact && 'space-y-1')}>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Fit Breakdown
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-0.5">
          {dots.map((dot) => (
            <span
              key={dot.key}
              className={cn(
                'inline-block w-2.5 h-2.5 rounded-full',
                dot.type === 'strong' && 'bg-success',
                dot.type === 'moderate' && 'bg-warning',
                dot.type === 'weak' && 'bg-muted-foreground/30'
              )}
            />
          ))}
        </div>
        <span className={cn('text-sm', compact ? 'text-muted-foreground' : 'font-medium')}>
          {summary}
        </span>
      </div>
    </div>
  );
}
