import { CustomerProfile } from '@/types/customer';
import { getNuancedBusinessImpact, getNuancedSolution, getNuancedPriority } from '@/utils/businessImpactLanguage';
import { ChevronDown, ChevronUp, Sparkles, ArrowRight, AlertCircle, Target } from 'lucide-react';
import { useState } from 'react';

interface LivePreviewProps {
  profile: CustomerProfile;
}

export function LivePreview({ profile }: LivePreviewProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const hasContent = profile.painPoints.length > 0 || profile.priorities.length > 0 || 
    profile.customChallenge?.trim() || profile.customPriority?.trim();

  if (!hasContent) {
    return (
      <div className="border border-dashed border-muted-foreground/30 rounded-lg p-4 bg-muted/30">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm">Select pain points and priorities to see a preview of your battlecard</span>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-primary/30 rounded-lg bg-primary/5 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 hover:bg-primary/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Live Preview</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 animate-fade-in">
          {/* Pain Points Preview */}
          {profile.painPoints.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-destructive">
                <AlertCircle className="w-3 h-3" />
                <span>How We'll Address Your Challenges</span>
              </div>
              <div className="space-y-2">
                {profile.painPoints.slice(0, 2).map(painPoint => (
                  <div key={painPoint} className="bg-background rounded-md p-3 border border-border">
                    <div className="text-xs text-destructive/80 mb-1">
                      {getNuancedBusinessImpact(painPoint, profile)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <ArrowRight className="w-3 h-3 flex-shrink-0" />
                      <span>{getNuancedSolution(painPoint, profile)}</span>
                    </div>
                  </div>
                ))}
                {profile.painPoints.length > 2 && (
                  <div className="text-xs text-muted-foreground pl-2">
                    +{profile.painPoints.length - 2} more challenges will be addressed
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Custom Challenge Preview */}
          {profile.customChallenge?.trim() && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-amber-600">
                <AlertCircle className="w-3 h-3" />
                <span>Your Specific Challenge</span>
              </div>
              <div className="bg-background rounded-md p-3 border border-amber-200 text-sm text-foreground italic">
                "{profile.customChallenge}"
              </div>
            </div>
          )}

          {/* Priorities Preview */}
          {profile.priorities.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-primary">
                <Target className="w-3 h-3" />
                <span>Your Priority Outcomes</span>
              </div>
              <div className="space-y-1">
                {profile.priorities.slice(0, 2).map(priority => {
                  const priorityInfo = getNuancedPriority(priority, profile);
                  return (
                    <div key={priority} className="bg-background rounded-md p-2 border border-border text-sm">
                      <span className="font-medium text-foreground">{priorityInfo.label}:</span>
                      <span className="text-muted-foreground ml-1">{priorityInfo.outcome}</span>
                    </div>
                  );
                })}
                {profile.priorities.length > 2 && (
                  <div className="text-xs text-muted-foreground pl-2">
                    +{profile.priorities.length - 2} more priorities covered
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Custom Priority Preview */}
          {profile.customPriority?.trim() && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                <Target className="w-3 h-3" />
                <span>Your Specific Priority</span>
              </div>
              <div className="bg-background rounded-md p-3 border border-emerald-200 text-sm text-foreground italic">
                "{profile.customPriority}"
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
