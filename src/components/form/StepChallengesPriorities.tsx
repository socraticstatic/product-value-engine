import { CustomerProfile, painPointOptions, priorityOptions } from '@/types/customer';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, Target, Sparkles, Lightbulb, PenLine } from 'lucide-react';
import { getIndustryRecommendation, isPainPointRecommended, isPriorityRecommended } from '@/utils/industryRecommendations';
import { Badge } from '@/components/ui/badge';
import { getBusinessImpact, getCustomerCentricSolution } from '@/utils/businessImpactLanguage';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface StepChallengesPrioritiesProps {
  profile: CustomerProfile;
  onUpdate: (updates: Partial<CustomerProfile>) => void;
}

export function StepChallengesPriorities({ profile, onUpdate }: StepChallengesPrioritiesProps) {
  const industryRec = getIndustryRecommendation(profile.industry);
  const industryLabel = profile.industry 
    ? profile.industry.charAt(0).toUpperCase() + profile.industry.slice(1).replace('-', ' ')
    : 'your industry';

  const handlePainPointToggle = (painPointId: string) => {
    const newPainPoints = profile.painPoints.includes(painPointId)
      ? profile.painPoints.filter(p => p !== painPointId)
      : [...profile.painPoints, painPointId];
    onUpdate({ painPoints: newPainPoints });
  };

  const handlePriorityToggle = (priorityId: string) => {
    const newPriorities = profile.priorities.includes(priorityId)
      ? profile.priorities.filter(p => p !== priorityId)
      : [...profile.priorities, priorityId];
    onUpdate({ priorities: newPriorities });
  };

  const applySuggestions = () => {
    onUpdate({
      painPoints: [...new Set([...profile.painPoints, ...industryRec.suggestedPainPoints])],
      priorities: [...new Set([...profile.priorities, ...industryRec.suggestedPriorities])]
    });
  };

  // Sort options to show recommended first
  const sortedPainPoints = [...painPointOptions].sort((a, b) => {
    const aRec = isPainPointRecommended(profile.industry, a.id);
    const bRec = isPainPointRecommended(profile.industry, b.id);
    if (aRec && !bRec) return -1;
    if (!aRec && bRec) return 1;
    return 0;
  });

  const sortedPriorities = [...priorityOptions].sort((a, b) => {
    const aRec = isPriorityRecommended(profile.industry, a.id);
    const bRec = isPriorityRecommended(profile.industry, b.id);
    if (aRec && !bRec) return -1;
    if (!aRec && bRec) return 1;
    return 0;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">Challenges & Priorities</h3>
        <p className="text-sm text-muted-foreground">
          Select what matters most to this customer. We'll customize the battlecard language accordingly.
        </p>
      </div>

      {/* Industry Smart Suggestions */}
      {profile.industry && (
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Common for {industryLabel} businesses
                </p>
                <p className="text-xs text-muted-foreground">
                  Based on typical needs, we've highlighted common pain points and priorities.
                </p>
              </div>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={applySuggestions}
              className="flex-shrink-0"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              Apply All
            </Button>
          </div>
        </div>
      )}

      {/* Pain Points */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-foreground">
          <AlertCircle className="w-4 h-4 text-destructive" />
          Current Pain Points
          {profile.painPoints.length > 0 && (
            <Badge variant="secondary" className="ml-1">{profile.painPoints.length} selected</Badge>
          )}
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sortedPainPoints.map(option => {
            const isRecommended = isPainPointRecommended(profile.industry, option.id);
            const isSelected = profile.painPoints.includes(option.id);
            const impact = getBusinessImpact(option.id, profile.industry);
            const solution = getCustomerCentricSolution(option.id, profile.industry);
            
            return (
              <label
                key={option.id}
                className={`relative flex flex-col p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'bg-destructive/10 border-destructive'
                    : isRecommended && profile.industry
                      ? 'bg-background border-primary/30 hover:border-destructive/50'
                      : 'bg-background border-border hover:border-destructive/50'
                }`}
              >
                <div className="flex items-start gap-2">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => handlePainPointToggle(option.id)}
                    className="border-destructive data-[state=checked]:bg-destructive mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-foreground">{option.label}</span>
                      {isRecommended && profile.industry && (
                        <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 border-primary/50 text-primary bg-primary/5">
                          Common
                        </Badge>
                      )}
                    </div>
                    {isSelected && (
                      <div className="mt-1.5 text-xs space-y-1 animate-fade-in">
                        <div className="text-destructive/80">→ {impact}</div>
                        <div className="text-primary">✓ {solution}</div>
                      </div>
                    )}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
        
        {/* Custom Challenge Input */}
        <div className="mt-3 p-3 rounded-lg border border-dashed border-border bg-muted/30">
          <Label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <PenLine className="w-3 h-3" />
            Or describe a specific challenge
          </Label>
          <Textarea
            placeholder="e.g., Our point-of-sale system loses connection during peak hours..."
            value={profile.customChallenge || ''}
            onChange={(e) => onUpdate({ customChallenge: e.target.value })}
            className="min-h-[60px] text-sm resize-none"
            maxLength={500}
          />
        </div>
      </div>
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-foreground">
          <Target className="w-4 h-4 text-primary" />
          Business Priorities
          {profile.priorities.length > 0 && (
            <Badge variant="secondary" className="ml-1">{profile.priorities.length} selected</Badge>
          )}
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sortedPriorities.map(option => {
            const isRecommended = isPriorityRecommended(profile.industry, option.id);
            const isSelected = profile.priorities.includes(option.id);
            
            return (
              <label
                key={option.id}
                className={`relative flex items-start gap-2 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'bg-primary/10 border-primary text-primary'
                    : isRecommended && profile.industry
                      ? 'bg-background border-primary/30 hover:border-primary/50'
                      : 'bg-background border-border hover:border-primary/50'
                }`}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => handlePriorityToggle(option.id)}
                  className="border-primary data-[state=checked]:bg-primary mt-0.5"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium leading-tight">{option.label}</span>
                  {isRecommended && profile.industry && (
                    <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 w-fit border-primary/50 text-primary bg-primary/5">
                      Common
                    </Badge>
                  )}
                </div>
              </label>
            );
          })}
        </div>
        
        {/* Custom Priority Input */}
        <div className="mt-3 p-3 rounded-lg border border-dashed border-border bg-muted/30">
          <Label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <PenLine className="w-3 h-3" />
            Or describe a specific priority
          </Label>
          <Input
            placeholder="e.g., Need 24/7 support with dedicated account manager..."
            value={profile.customPriority || ''}
            onChange={(e) => onUpdate({ customPriority: e.target.value })}
            className="text-sm"
            maxLength={200}
          />
        </div>
      </div>
    </div>
  );
}
