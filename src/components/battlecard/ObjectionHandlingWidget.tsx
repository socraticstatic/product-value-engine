import { useState } from 'react';
import { Product } from '@/data/products';
import { CustomerProfile } from '@/types/customer';
import { BattlecardWidget } from './BattlecardWidget';
import { ShieldAlert, ChevronDown, ChevronUp, MessageCircleQuestion } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { DemoBlur } from '@/components/ui/DemoBlur';

interface ObjectionHandlingWidgetProps {
  products: Product[];
  customerProfile: CustomerProfile;
}

export function ObjectionHandlingWidget({ products }: ObjectionHandlingWidgetProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  // Collect all objection handling tips
  const allObjections = products.flatMap(p => 
    p.objectionHandling.map(o => ({ ...o, productName: p.name }))
  );

  // Remove demo mode early return - render real UI with blur applied

  return (
    <BattlecardWidget title="Objection Handling" icon={ShieldAlert} iconColor="text-destructive">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-2">
              <MessageCircleQuestion className="w-4 h-4 text-destructive" />
              <span className="text-sm font-medium text-foreground">
                {allObjections.length} common objections with responses
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="mt-3">
          <div className="space-y-3">
            {allObjections.map((item, idx) => (
              <div 
                key={idx}
                className="rounded-lg border border-border overflow-hidden"
              >
                  <button
                    onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-3 bg-muted/30 hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">
                        "<DemoBlur>{item.objection}</DemoBlur>"
                      </span>
                    </div>
                  {expandedIdx === idx ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
                
                {expandedIdx === idx && (
                  <div className="p-3 bg-background animate-fade-in">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <span className="font-semibold text-primary">Response: </span>
                      <DemoBlur>{item.response}</DemoBlur>
                    </p>
                    <span className="inline-block mt-2 text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">
                      {item.productName}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </BattlecardWidget>
  );
}
