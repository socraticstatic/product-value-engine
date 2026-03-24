import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, UserCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ValuePropModeSelectorProps {
  onSelectMode: (mode: 'customer' | 'solution') => void;
}

export function ValuePropModeSelector({ onSelectMode }: ValuePropModeSelectorProps) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Solution-First Mode (Default/Primary) */}
        <Card 
          className={cn(
            "cursor-pointer transition-all hover:shadow-lg hover:border-primary/50",
            "group relative overflow-hidden ring-2 ring-primary/20"
          )}
          onClick={() => onSelectMode('solution')}
        >
          <div className="absolute top-2 right-2">
            <span className="text-xs font-medium bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
              Recommended
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="pb-2 pt-6">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Package className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Start with a Solution</CardTitle>
            </div>
            <CardDescription className="text-sm">
              Select a product and see tailored value propositions across business types
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground text-xs mb-1">Best for:</p>
              <ul className="list-disc list-inside space-y-0.5 text-xs">
                <li>Product demos & presentations</li>
                <li>Comparing value across industries</li>
              </ul>
            </div>
            <Button className="w-full group-hover:bg-primary/90" size="sm">
              Explore Solutions
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Customer-First Mode */}
        <Card 
          className={cn(
            "cursor-pointer transition-all hover:shadow-lg hover:border-primary/50",
            "group relative overflow-hidden"
          )}
          onClick={() => onSelectMode('customer')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="pb-2 pt-6">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <UserCircle className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Start with Customer Priorities/Challenges</CardTitle>
            </div>
            <CardDescription className="text-sm">
              Enter customer details to get AI-recommended products with personalized value props
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground text-xs mb-1">Best for:</p>
              <ul className="list-disc list-inside space-y-0.5 text-xs">
                <li>Discovery conversations</li>
                <li>Custom business profiles</li>
              </ul>
            </div>
            <Button className="w-full group-hover:bg-primary/90" size="sm">
              Assess Customer Needs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
