import { CustomerProfile, painPointOptions, industryOptions } from '@/types/customer';
import { Badge } from '@/components/ui/badge';
import { User, AlertTriangle } from 'lucide-react';

interface CustomerSummaryBarProps {
  customerProfile: CustomerProfile;
}

export function CustomerSummaryBar({ customerProfile }: CustomerSummaryBarProps) {
  const getCustomerTypeLabel = () => {
    switch (customerProfile.type) {
      case 'small-business': return 'Small Business';
      case 'mid-market': return 'Mid-Market';
      case 'enterprise': return 'Enterprise';
    }
  };

  const getIndustryLabel = () => {
    return industryOptions.find(opt => opt.id === customerProfile.industry)?.label || customerProfile.industry;
  };

  const getLocationLabel = () => {
    if (customerProfile.locations === '1') return '1 Location';
    return `${customerProfile.locations} Locations`;
  };

  const topPainPoint = customerProfile.painPoints[0];
  const topPainPointLabel = topPainPoint 
    ? painPointOptions.find(p => p.id === topPainPoint)?.label 
    : null;

  return (
    <div className="px-4 py-3 bg-muted/40 border-b border-border">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap flex-1">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            <span className="font-semibold text-sm text-foreground">{getCustomerTypeLabel()}</span>
          </div>
          <span className="text-muted-foreground text-xs">•</span>
          <span className="text-sm text-foreground">{getIndustryLabel()}</span>
          <span className="text-muted-foreground text-xs">•</span>
          <span className="text-sm text-muted-foreground">{customerProfile.employeeCount} employees</span>
          <span className="text-muted-foreground text-xs">•</span>
          <span className="text-sm text-muted-foreground">{getLocationLabel()}</span>
          
          {customerProfile.currentProvider && customerProfile.currentProvider.length > 0 && (
            <>
              <span className="text-muted-foreground text-xs">•</span>
              <Badge variant="secondary" className="text-xs">
                From: {customerProfile.currentProvider.join(', ')}
              </Badge>
            </>
          )}
        </div>
        
        {topPainPointLabel && (
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30 text-xs shrink-0">
            <AlertTriangle className="w-3 h-3 mr-1" />
            {topPainPointLabel}
          </Badge>
        )}
      </div>
    </div>
  );
}
