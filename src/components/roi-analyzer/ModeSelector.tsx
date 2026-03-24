import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardList, Search, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModeSelectorProps {
  onSelectMode: (mode: 'business-needs' | 'solution-explorer') => void;
}

export function ModeSelector({ onSelectMode }: ModeSelectorProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Business Needs Mode */}
        <Card 
          className={cn(
            "cursor-pointer transition-all hover:shadow-lg hover:border-primary/50",
            "group relative overflow-hidden"
          )}
          onClick={() => onSelectMode('business-needs')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <ClipboardList className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl">Start with Business Needs</CardTitle>
            </div>
            <CardDescription className="text-base">
              Enter your customer's business details to get AI-powered product recommendations with ROI analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Best for:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Discovery conversations</li>
                <li>Needs assessment</li>
                <li>Custom business profiles</li>
              </ul>
            </div>
            <Button className="w-full group-hover:bg-primary/90">
              Get Recommendations
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Solution Explorer Mode */}
        <Card 
          className={cn(
            "cursor-pointer transition-all hover:shadow-lg hover:border-primary/50",
            "group relative overflow-hidden"
          )}
          onClick={() => onSelectMode('solution-explorer')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Search className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl">Start with a Solution</CardTitle>
            </div>
            <CardDescription className="text-base">
              Select specific product(s) to see ROI projections across different business types and industries
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Best for:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Product demos</li>
                <li>Comparing value across segments</li>
                <li>Quick ROI visualization</li>
              </ul>
            </div>
            <Button className="w-full group-hover:bg-primary/90">
              Explore Solutions
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
