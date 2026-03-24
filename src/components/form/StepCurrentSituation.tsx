import { CustomerProfile, existingServiceOptions, competitorOptions } from '@/types/customer';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Building2, Layers, Lightbulb } from 'lucide-react';
import { getIndustryRecommendation, isServiceRecommended } from '@/utils/industryRecommendations';
import { Badge } from '@/components/ui/badge';

interface StepCurrentSituationProps {
  profile: CustomerProfile;
  onUpdate: (updates: Partial<CustomerProfile>) => void;
}

export function StepCurrentSituation({ profile, onUpdate }: StepCurrentSituationProps) {
  const industryRec = getIndustryRecommendation(profile.industry);

  const handleServiceToggle = (serviceId: string) => {
    const newServices = profile.existingServices.includes(serviceId)
      ? profile.existingServices.filter(s => s !== serviceId)
      : [...profile.existingServices, serviceId];
    onUpdate({ existingServices: newServices });
  };

  const handleProviderToggle = (provider: string) => {
    const newProviders = profile.currentProvider.includes(provider)
      ? profile.currentProvider.filter(p => p !== provider)
      : [...profile.currentProvider, provider];
    onUpdate({ currentProvider: newProviders });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">Current Situation</h3>
        <p className="text-sm text-muted-foreground">
          Understanding their current setup helps position AT&T as the better choice.
        </p>
      </div>

      {/* Current Provider */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-foreground">
          <Building2 className="w-4 h-4 text-muted-foreground" />
          Current Provider(s)
          {profile.currentProvider.length > 0 && (
            <Badge variant="secondary" className="ml-1">{profile.currentProvider.length} selected</Badge>
          )}
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {competitorOptions.map(provider => {
            const isSelected = profile.currentProvider.includes(provider);
            return (
              <label
                key={provider}
                className={`relative flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-background border-border hover:border-primary/50'
                }`}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => handleProviderToggle(provider)}
                  className="border-primary data-[state=checked]:bg-primary"
                />
                <span className="text-sm font-medium">{provider}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Budget Orientation */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-foreground">
          <Layers className="w-4 h-4 text-muted-foreground" />
          Budget Orientation
        </Label>
        <Select
          value={profile.budget}
          onValueChange={(value: CustomerProfile['budget']) => onUpdate({ budget: value })}
        >
          <SelectTrigger className="bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cost-conscious">
              <div className="flex flex-col items-start">
                <span>Every Dollar Counts</span>
                <span className="text-xs text-muted-foreground">Looking to minimize spend</span>
              </div>
            </SelectItem>
            <SelectItem value="balanced">
              <div className="flex flex-col items-start">
                <span>Best Value</span>
                <span className="text-xs text-muted-foreground">Balance between cost and capability</span>
              </div>
            </SelectItem>
            <SelectItem value="performance-focused">
              <div className="flex flex-col items-start">
                <span>Performance First</span>
                <span className="text-xs text-muted-foreground">Willing to invest for the best solution</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Existing Services */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-foreground">
          <Layers className="w-4 h-4 text-muted-foreground" />
          Existing Services
        </Label>
        
        {profile.industry && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <Lightbulb className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">Tip:</span> {industryRec.context}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {existingServiceOptions.map(option => {
            const isRecommended = isServiceRecommended(profile.industry, option.id);
            const isSelected = profile.existingServices.includes(option.id);
            
            return (
              <label
                key={option.id}
                className={`relative flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'bg-accent/10 border-accent text-accent-foreground'
                    : 'bg-background border-border hover:border-accent/50'
                }`}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => handleServiceToggle(option.id)}
                  className="border-accent data-[state=checked]:bg-accent"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">{option.label}</span>
                  {isRecommended && profile.industry && (
                    <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 w-fit border-primary/30 text-primary">
                      Common
                    </Badge>
                  )}
                </div>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
