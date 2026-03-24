import { useState } from 'react';
import { personaBattlecards, PersonaBattlecard } from '@/data/personaBattlecards';
import { getProductById } from '@/data/products';
import { Battlecard } from './Battlecard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ArrowLeft, 
  Building2, 
  Users, 
  MapPin, 
  DollarSign, 
  FileText, 
  Sparkles,
  GitCompare,
  X,
  Grid3X3,
  LayoutList
} from 'lucide-react';

type ViewMode = 'grid' | 'compare' | 'single';

export function BattlecardDashboard() {
  const [selectedBattlecard, setSelectedBattlecard] = useState<PersonaBattlecard | null>(null);
  const [compareSelection, setCompareSelection] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const handleToggleCompare = (personaId: string) => {
    setCompareSelection(prev => {
      if (prev.includes(personaId)) {
        return prev.filter(id => id !== personaId);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, personaId];
    });
  };

  const handleStartCompare = () => {
    if (compareSelection.length >= 2) {
      setViewMode('compare');
    }
  };

  const handleSelectBattlecard = (battlecard: PersonaBattlecard) => {
    setSelectedBattlecard(battlecard);
    setViewMode('single');
  };

  const handleBack = () => {
    setSelectedBattlecard(null);
    setViewMode('grid');
  };

  const handleExitCompare = () => {
    setViewMode('grid');
    setCompareSelection([]);
  };

  const getSegmentColor = (segmentId: number): string => {
    const colors = [
      'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
      'bg-blue-500/10 text-blue-600 border-blue-500/20',
      'bg-purple-500/10 text-purple-600 border-purple-500/20',
      'bg-amber-500/10 text-amber-600 border-amber-500/20',
      'bg-rose-500/10 text-rose-600 border-rose-500/20',
      'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
      'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
    ];
    return colors[(segmentId - 1) % colors.length];
  };

  // Single battlecard view
  if (viewMode === 'single' && selectedBattlecard) {
    const products = selectedBattlecard.recommendedProductIds
      .map(id => getProductById(id))
      .filter(Boolean) as any[];

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-4xl">{selectedBattlecard.persona.avatar}</span>
            <div>
              <h3 className="font-semibold text-foreground">{selectedBattlecard.persona.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedBattlecard.persona.company}</p>
            </div>
          </div>
        </div>
        <Battlecard
          products={products}
          customerProfile={selectedBattlecard.customerProfile}
          onReset={handleBack}
        />
      </div>
    );
  }

  // Comparison view
  if (viewMode === 'compare') {
    const selectedCards = personaBattlecards.filter(bc => compareSelection.includes(bc.persona.id));

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={handleExitCompare} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <Badge variant="secondary" className="gap-1.5">
              <GitCompare className="w-3.5 h-3.5" />
              Comparing {selectedCards.length} Personas
            </Badge>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-220px)]">
          <div className={`grid gap-6 ${selectedCards.length === 2 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 lg:grid-cols-3'}`}>
            {selectedCards.map(battlecard => {
              const products = battlecard.recommendedProductIds
                .map(id => getProductById(id))
                .filter(Boolean) as any[];

              return (
                <div key={battlecard.persona.id} className="space-y-4">
                  <Card className="border-2 border-primary/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{battlecard.persona.avatar}</span>
                        <div>
                          <CardTitle className="text-lg">{battlecard.persona.name}</CardTitle>
                          <CardDescription>{battlecard.persona.company}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className={`${getSegmentColor(battlecard.persona.segmentId)} w-fit mt-2`}>
                        {battlecard.persona.segmentName}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Key Stats */}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="p-2 rounded-lg bg-muted/50">
                          <p className="text-xs text-muted-foreground">Employees</p>
                          <p className="font-medium">{battlecard.persona.employeeCount}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-muted/50">
                          <p className="text-xs text-muted-foreground">Locations</p>
                          <p className="font-medium">{battlecard.persona.locations}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-muted/50">
                          <p className="text-xs text-muted-foreground">Budget</p>
                          <p className="font-medium">{battlecard.persona.techBudget}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-muted/50">
                          <p className="text-xs text-muted-foreground">Tech Level</p>
                          <p className="font-medium capitalize">{battlecard.persona.techSophistication}</p>
                        </div>
                      </div>

                      {/* Top Needs */}
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Top Needs</h4>
                        <div className="space-y-1.5">
                          {battlecard.persona.topNeeds.slice(0, 3).map(need => (
                            <div key={need.need} className="flex items-center justify-between text-sm">
                              <span>{need.need}</span>
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-primary rounded-full" 
                                    style={{ width: `${need.importance}%` }} 
                                  />
                                </div>
                                <span className="text-xs text-muted-foreground w-8">{need.importance}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Lead Products */}
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Lead Products</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {battlecard.persona.leadProducts.map(product => (
                            <Badge key={product} variant="secondary" className="text-xs">
                              {product.replace('AT&T ', '')}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Key Talking Points */}
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Key Talking Points</h4>
                        <ul className="space-y-1.5">
                          {battlecard.persona.keyTalkingPoints.slice(0, 3).map((point, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-0.5">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Sales Approach */}
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Sales Approach</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {battlecard.persona.salesApproach}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Grid3X3 className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground">
              Persona Battlecards
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Select personas to compare or click to view full battlecard
          </p>
        </div>

        {compareSelection.length >= 2 && (
          <Button onClick={handleStartCompare} className="gap-2 shrink-0">
            <GitCompare className="w-4 h-4" />
            Compare ({compareSelection.length})
          </Button>
        )}
      </div>

      {/* Selection indicator */}
      {compareSelection.length > 0 && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
          <span className="text-sm text-muted-foreground">Selected for comparison:</span>
          <div className="flex items-center gap-2 flex-wrap">
            {compareSelection.map(id => {
              const bc = personaBattlecards.find(b => b.persona.id === id);
              return bc ? (
                <Badge key={id} variant="secondary" className="gap-1.5 pr-1">
                  <span>{bc.persona.avatar}</span>
                  <span>{bc.persona.name}</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleToggleCompare(id); }}
                    className="ml-1 p-0.5 rounded-full hover:bg-muted"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ) : null;
            })}
          </div>
          {compareSelection.length < 2 && (
            <span className="text-xs text-muted-foreground ml-2">(Select at least 2 to compare)</span>
          )}
        </div>
      )}

      {/* Grid of all personas */}
      <ScrollArea className="h-[calc(100vh-340px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pr-4">
          {personaBattlecards.map(battlecard => {
            const isSelected = compareSelection.includes(battlecard.persona.id);
            
            return (
              <Card
                key={battlecard.persona.id}
                className={`cursor-pointer transition-all duration-200 group relative ${
                  isSelected 
                    ? 'ring-2 ring-primary shadow-lg' 
                    : 'hover:shadow-lg hover:border-primary/30'
                }`}
              >
                {/* Checkbox for compare */}
                <div 
                  className="absolute top-3 right-3 z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => handleToggleCompare(battlecard.persona.id)}
                    disabled={!isSelected && compareSelection.length >= 3}
                    className="h-5 w-5"
                  />
                </div>

                <div onClick={() => handleSelectBattlecard(battlecard)}>
                  <CardHeader className="pb-2 pr-10">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{battlecard.persona.avatar}</span>
                      <div className="min-w-0">
                        <CardTitle className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
                          {battlecard.persona.name}
                        </CardTitle>
                        <CardDescription className="text-xs truncate">
                          {battlecard.persona.title}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0 space-y-3">
                    <p className="text-sm font-medium text-foreground truncate">
                      {battlecard.persona.company}
                    </p>

                    <Badge 
                      variant="outline" 
                      className={`${getSegmentColor(battlecard.persona.segmentId)} text-xs`}
                    >
                      {battlecard.persona.segmentName}
                    </Badge>
                    
                    <div className="grid grid-cols-2 gap-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-3 h-3 shrink-0" />
                        <span className="truncate">{battlecard.persona.industry}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 shrink-0" />
                        <span>{battlecard.persona.employeeCount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">{battlecard.persona.locations}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3 shrink-0" />
                        <span className="truncate">{battlecard.persona.techBudget}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {battlecard.persona.leadProducts.slice(0, 2).map(product => (
                        <Badge key={product} variant="secondary" className="text-xs py-0">
                          {product.replace('AT&T ', '').split(' ')[0]}
                        </Badge>
                      ))}
                      {battlecard.persona.leadProducts.length > 2 && (
                        <Badge variant="outline" className="text-xs py-0">
                          +{battlecard.persona.leadProducts.length - 2}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
