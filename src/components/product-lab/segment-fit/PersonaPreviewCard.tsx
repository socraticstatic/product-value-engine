import { PersonaFitScore, getFitLevel } from '@/utils/personaFitScoring';
import { cn } from '@/lib/utils';
import { Check, AlertCircle } from 'lucide-react';

interface PersonaPreviewCardProps {
  personaFit: PersonaFitScore;
  compact?: boolean;
}

const primaryNeedIcons: Record<string, { icon: string; label: string }> = {
  connectivity: { icon: '📶', label: 'Connectivity' },
  security: { icon: '🔒', label: 'Security' },
  mobility: { icon: '📱', label: 'Mobility' },
  integration: { icon: '🔗', label: 'Integration' },
  innovation: { icon: '💡', label: 'Innovation' },
};

export function PersonaPreviewCard({ personaFit, compact = false }: PersonaPreviewCardProps) {
  const { persona, overallScore } = personaFit;
  const fitLevel = getFitLevel(overallScore);
  const needInfo = primaryNeedIcons[persona.primaryNeed] || { icon: '📍', label: persona.primaryNeed };

  const fitStyles = {
    strong: 'border-green-500/30 bg-green-500/5',
    moderate: 'border-amber-500/30 bg-amber-500/5',
    weak: 'border-muted bg-muted/30',
  };

  const fitBadge = {
    strong: { icon: Check, color: 'text-green-500', label: 'Strong Fit' },
    moderate: { icon: AlertCircle, color: 'text-amber-500', label: 'Moderate' },
    weak: { icon: AlertCircle, color: 'text-muted-foreground', label: 'Weak' },
  };

  const FitIcon = fitBadge[fitLevel].icon;

  if (compact) {
    return (
      <div className={cn(
        'flex items-center gap-2 rounded-lg border p-2 min-w-[140px]',
        fitStyles[fitLevel]
      )}>
        <span className="text-xl">{persona.avatar}</span>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium truncate">{persona.name}</p>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <span>{needInfo.icon}</span>
            <span className="truncate">{needInfo.label}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'flex flex-col rounded-lg border p-3 min-w-[160px] transition-colors hover:bg-muted/50',
      fitStyles[fitLevel]
    )}>
      {/* Avatar & Name */}
      <div className="flex items-start gap-2 mb-2">
        <span className="text-2xl">{persona.avatar}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{persona.name}</p>
          <p className="text-xs text-muted-foreground truncate">{persona.company}</p>
        </div>
      </div>

      {/* Primary Need */}
      <div className="flex items-center gap-1.5 mb-2 px-2 py-1 rounded-md bg-muted/50">
        <span className="text-sm">{needInfo.icon}</span>
        <span className="text-xs font-medium">{needInfo.label}</span>
      </div>

      {/* Fit Status */}
      <div className={cn('flex items-center gap-1 text-xs', fitBadge[fitLevel].color)}>
        <FitIcon className="w-3 h-3" />
        <span>{fitBadge[fitLevel].label}</span>
        <span className="text-muted-foreground ml-auto">{overallScore}%</span>
      </div>
    </div>
  );
}
