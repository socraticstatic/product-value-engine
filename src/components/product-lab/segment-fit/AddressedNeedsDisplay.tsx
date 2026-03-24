import { AddressedNeed } from '@/utils/segmentFitScoring';
import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddressedNeedsDisplayProps {
  addressedNeeds: AddressedNeed[];
  compact?: boolean;
}

export function AddressedNeedsDisplay({ addressedNeeds, compact = false }: AddressedNeedsDisplayProps) {
  if (addressedNeeds.length === 0) {
    return null;
  }

  const fullNeeds = addressedNeeds.filter(n => n.status === 'full');
  const partialNeeds = addressedNeeds.filter(n => n.status === 'partial');

  return (
    <div className={cn('space-y-1.5', compact && 'space-y-1')}>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Addresses Needs
        </span>
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {fullNeeds.map((need) => (
          <div key={need.need} className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-success" />
            <span className="text-sm">{need.need}</span>
          </div>
        ))}
        {partialNeeds.map((need) => (
          <div key={need.need} className="flex items-center gap-1 text-muted-foreground">
            <Circle className="w-3 h-3" />
            <span className="text-sm">{need.need} (partial)</span>
          </div>
        ))}
      </div>
    </div>
  );
}
