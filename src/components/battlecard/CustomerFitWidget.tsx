import { useState } from 'react';
import { Product } from '@/data/products';
import { CustomerProfile } from '@/types/customer';
import { BattlecardWidget } from './BattlecardWidget';
import { Target, Users, Star, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DemoBlur } from '@/components/ui/DemoBlur';

interface CustomerFitWidgetProps {
  products: Product[];
  customerProfile: CustomerProfile;
}

export function CustomerFitWidget({ products, customerProfile }: CustomerFitWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const calculateFitScore = (product: Product) => {
    let score = 0;
    let maxScore = 0;

    // Budget fit
    maxScore += 30;
    if (customerProfile.budget === 'cost-conscious' && product.monthlyPrice < 100) score += 30;
    else if (customerProfile.budget === 'balanced' && product.monthlyPrice >= 50 && product.monthlyPrice <= 200) score += 30;
    else if (customerProfile.budget === 'performance-focused' && product.monthlyPrice > 100) score += 30;
    else score += 15;

    // Segment fit
    maxScore += 30;
    if (product.targetSegments?.includes(customerProfile.type)) score += 30;
    else score += 10;

    // Priority match
    const priorityMatches = product.bestFor.filter(bf => {
      const lowerBf = bf.toLowerCase();
      return customerProfile.priorities.some(p => {
        if (p === 'reliability' && lowerBf.includes('reliab')) return true;
        if (p === 'security' && lowerBf.includes('secur')) return true;
        if (p === 'speed' && (lowerBf.includes('speed') || lowerBf.includes('fast'))) return true;
        if (p === 'scalability' && lowerBf.includes('scal')) return true;
        if (p === 'remote-work' && lowerBf.includes('remote')) return true;
        if (p === 'mobility' && lowerBf.includes('mobile')) return true;
        if (p === 'backup-failover' && lowerBf.includes('backup')) return true;
        return false;
      });
    });

    maxScore += 40;
    score += Math.min(40, priorityMatches.length * 15);

    return Math.round((score / maxScore) * 100);
  };

  const productScores = products.map(p => ({
    product: p,
    score: calculateFitScore(p)
  })).sort((a, b) => b.score - a.score);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-muted';
  };

  // Get top score for summary
  const topScore = productScores[0]?.score || 0;
  const topProduct = productScores[0]?.product.name || '';

  return (
    <BattlecardWidget title="Customer Fit Analysis" icon={Target} iconColor="text-primary">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        {/* Collapsed Summary */}
        <CollapsibleTrigger asChild>
          <div className="cursor-pointer">
            {!isExpanded && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${getScoreBg(topScore)}`}>
                    <Star className={`w-3 h-3 ${getScoreColor(topScore)}`} />
                    <span className={`text-sm font-bold ${getScoreColor(topScore)}`}>{topScore}%</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground">{topProduct}</span>
                    <span className="text-sm text-muted-foreground"> — best match</span>
                  </div>
                </div>
                {productScores.length > 1 && (
                  <Badge variant="secondary" className="text-xs">
                    +{productScores.length - 1} more
                  </Badge>
                )}
              </div>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-between mt-3 text-muted-foreground hover:text-foreground"
            >
              <span className="text-xs">{isExpanded ? 'Show less' : 'View all fit scores →'}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="space-y-4 pt-2">
            {productScores.map(({ product, score }) => (
              <div key={product.id} className="p-4 rounded-lg bg-muted/30 border border-border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground">{product.name}</h4>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${getScoreBg(score)}`}>
                    <Star className={`w-3 h-3 ${getScoreColor(score)}`} />
                    <span className={`text-sm font-bold ${getScoreColor(score)}`}>{score}%</span>
                  </div>
                </div>

                <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      score >= 80 ? 'bg-success' : score >= 60 ? 'bg-warning' : 'bg-muted-foreground'
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  {product.bestFor.slice(0, 3).map((bf, idx) => (
                    <span 
                      key={idx}
                      className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full"
                    >
                      <DemoBlur>{bf}</DemoBlur>
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Disclaimer Section */}
            <Collapsible open={showDisclaimer} onOpenChange={setShowDisclaimer}>
              <CollapsibleTrigger asChild>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-between text-xs text-muted-foreground hover:text-foreground"
                >
                  <div className="flex items-center gap-2">
                    <Info className="w-3.5 h-3.5" />
                    <span>How is this score calculated?</span>
                  </div>
                  {showDisclaimer ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-3 p-4 rounded-lg bg-muted/50 border border-border text-sm space-y-3">
                  <p className="text-foreground font-medium">Fit Score Methodology</p>
                  <p className="text-muted-foreground">
                    The Customer Fit Score is calculated based on three weighted factors:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">30%</span>
                      <span><strong className="text-foreground">Budget Alignment:</strong> Compares the customer's budget preference against the product's price point.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">30%</span>
                      <span><strong className="text-foreground">Segment Match:</strong> Evaluates whether the product's target segments align with the customer's business type.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">40%</span>
                      <span><strong className="text-foreground">Priority Alignment:</strong> Matches the customer's stated priorities against the product's key benefits.</span>
                    </li>
                  </ul>
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground italic">
                      Note: This score is an automated recommendation. Always use professional judgment when making final product recommendations.
                    </p>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </BattlecardWidget>
  );
}
