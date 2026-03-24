import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Users, AlertCircle, Target, PenLine } from 'lucide-react';
import { MockPersona } from './mockPersonas';
import { INDUSTRIES, BUSINESS_SIZES, LOCATIONS, PAIN_POINTS, PRIORITIES, ENTERPRISE_INDUSTRY_GROUPINGS } from './types';

interface PersonaProfileSummaryProps {
  persona: MockPersona;
  adjustedSize?: string;
  adjustedLocations?: string;
}

function getLabelById(id: string, list: { id: string; label: string }[]): string {
  return list.find(item => item.id === id)?.label || id;
}

function getPainPointLabel(id: string): string {
  const painPoint = PAIN_POINTS.find(p => p.id === id);
  return painPoint?.label || id;
}

function getPriorityLabel(id: string): string {
  const priority = PRIORITIES.find(p => p.id === id);
  return priority?.label || id;
}

function getEnterpriseGroupingLabel(id: string): string {
  const grouping = ENTERPRISE_INDUSTRY_GROUPINGS.find(g => g.id === id);
  return grouping?.label || id;
}

export function PersonaProfileSummary({ persona, adjustedSize, adjustedLocations }: PersonaProfileSummaryProps) {
  const { profile } = persona;
  const isEnterprise = persona.marketType === 'enterprise';

  return (
    <Card className="bg-gradient-to-br from-muted/30 to-muted/50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{persona.icon}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl">{profile.companyName}</CardTitle>
              {isEnterprise && (
                <Badge className="bg-purple-500/15 text-purple-400 border-purple-500/30">
                  <Building2 className="w-3 h-3 mr-1" />
                  Enterprise
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{persona.name}</p>
            {isEnterprise && profile.enterpriseGrouping && (
              <p className="text-xs text-purple-400 mt-0.5">
                {getEnterpriseGroupingLabel(profile.enterpriseGrouping)} Sector
              </p>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Business Details */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Industry</p>
              <p className="text-sm font-medium">{getLabelById(profile.industry, INDUSTRIES)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className={`w-4 h-4 ${adjustedSize ? 'text-amber-500' : 'text-muted-foreground'}`} />
            <div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                Size
                {adjustedSize && <PenLine className="w-3 h-3 text-amber-500" />}
              </p>
              <p className="text-sm font-medium">
                {getLabelById(adjustedSize || profile.businessSize, BUSINESS_SIZES)}
              </p>
              {adjustedSize && adjustedSize !== profile.businessSize && (
                <p className="text-[10px] text-amber-500">
                  was: {getLabelById(profile.businessSize, BUSINESS_SIZES)}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className={`w-4 h-4 ${adjustedLocations ? 'text-amber-500' : 'text-muted-foreground'}`} />
            <div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                Locations
                {adjustedLocations && <PenLine className="w-3 h-3 text-amber-500" />}
              </p>
              <p className="text-sm font-medium">
                {getLabelById(adjustedLocations || profile.locations, LOCATIONS)}
              </p>
              {adjustedLocations && adjustedLocations !== profile.locations && (
                <p className="text-[10px] text-amber-500">
                  was: {getLabelById(profile.locations, LOCATIONS)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Context */}
        {profile.additionalContext && (
          <p className="text-sm text-muted-foreground border-l-2 border-primary/30 pl-3">
            {profile.additionalContext}
          </p>
        )}

        {/* Pain Points & Priorities */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Pain Points</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {profile.painPoints.map(pp => (
                <Badge key={pp} variant="outline" className="text-xs border-destructive/30 text-destructive">
                  {getPainPointLabel(pp)}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-primary" />
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Priorities</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {profile.priorities.map(pr => (
                <Badge key={pr} variant="outline" className="text-xs border-primary/30 text-primary">
                  {getPriorityLabel(pr)}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
