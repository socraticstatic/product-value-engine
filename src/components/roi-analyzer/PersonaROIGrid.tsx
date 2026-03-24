import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, RefreshCw, TrendingUp, ArrowUpDown, DollarSign, Clock } from 'lucide-react';
import { MOCK_PERSONAS, MockPersona } from './mockPersonas';
import { PersonaSelectorBar } from './PersonaSelectorBar';
import { PersonaReportView } from './PersonaReportView';
import { calculateROISummary, ROISummary, formatCurrency } from '@/lib/roi-calculator';

interface PersonaROIGridProps {
  selectedProducts: { id: string; name: string }[];
  onBack: () => void;
  onReset: () => void;
}

type SortOption = 'roi' | 'savings' | 'payback';

interface PersonaAdjustment {
  size: string;
  locations: string;
}

interface PersonaResult {
  persona: MockPersona;
  roiSummary: ROISummary;
  adjustedSize?: string;
  adjustedLocations?: string;
}

export function PersonaROIGrid({ selectedProducts, onBack, onReset }: PersonaROIGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>('roi');
  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null);
  const [personaAdjustments, setPersonaAdjustments] = useState<Record<string, PersonaAdjustment>>({});

  // Handle size change for a specific persona
  const handleSizeChange = (personaId: string, size: string) => {
    setPersonaAdjustments(prev => ({
      ...prev,
      [personaId]: {
        ...prev[personaId],
        size,
        locations: prev[personaId]?.locations || MOCK_PERSONAS.find(p => p.id === personaId)?.profile.locations || '1'
      }
    }));
  };

  // Handle locations change for a specific persona
  const handleLocationsChange = (personaId: string, locations: string) => {
    setPersonaAdjustments(prev => ({
      ...prev,
      [personaId]: {
        ...prev[personaId],
        locations,
        size: prev[personaId]?.size || MOCK_PERSONAS.find(p => p.id === personaId)?.profile.businessSize || '1-10'
      }
    }));
  };

  // Calculate ROI for all personas using adjusted values when available
  const personaResults: PersonaResult[] = useMemo(() => {
    return MOCK_PERSONAS.map(persona => {
      const adjustments = personaAdjustments[persona.id];
      const effectiveSize = adjustments?.size || persona.profile.businessSize;
      const effectiveLocations = adjustments?.locations || persona.profile.locations;

      const roiSummary = calculateROISummary(
        selectedProducts,
        persona.profile.industry,
        effectiveSize,
        effectiveLocations,
        persona.profile.painPoints
      );
      return { 
        persona, 
        roiSummary,
        adjustedSize: adjustments?.size,
        adjustedLocations: adjustments?.locations
      };
    });
  }, [selectedProducts, personaAdjustments]);

  // Sort results based on selected option
  const sortedResults = useMemo(() => {
    return [...personaResults].sort((a, b) => {
      switch (sortBy) {
        case 'roi':
          return b.roiSummary.avgROIPercentage - a.roiSummary.avgROIPercentage;
        case 'savings':
          return b.roiSummary.totalAnnualSavings - a.roiSummary.totalAnnualSavings;
        case 'payback':
          return a.roiSummary.avgPaybackMonths - b.roiSummary.avgPaybackMonths;
        default:
          return 0;
      }
    });
  }, [personaResults, sortBy]);

  // Default to best fit persona (first after sorting)
  const activePersonaId = selectedPersonaId || sortedResults[0]?.persona.id;
  const selectedResult = sortedResults.find(r => r.persona.id === activePersonaId) || sortedResults[0];

  // Calculate aggregate stats
  const avgROI = Math.round(
    personaResults.reduce((sum, r) => sum + r.roiSummary.avgROIPercentage, 0) / personaResults.length
  );
  const avgSavings = Math.round(
    personaResults.reduce((sum, r) => sum + r.roiSummary.totalAnnualSavings, 0) / personaResults.length
  );
  const avgPayback = (
    personaResults.reduce((sum, r) => sum + r.roiSummary.avgPaybackMonths, 0) / personaResults.length
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Change Products
        </Button>
        <Button variant="outline" onClick={onReset}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Start Over
        </Button>
      </div>

      {/* Selected Products Summary */}
      <Card className="bg-muted/30">
        <CardContent className="py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Analyzing:</span>
            {selectedProducts.map(p => (
              <Badge key={p.id} variant="secondary">
                {p.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Aggregate Stats Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="py-4 text-center">
            <TrendingUp className="w-5 h-5 mx-auto text-primary mb-2" />
            <p className="text-xl font-bold">{avgROI}%</p>
            <p className="text-xs text-muted-foreground">Avg. ROI Across Personas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <DollarSign className="w-5 h-5 mx-auto text-success mb-2" />
            <p className="text-xl font-bold">{formatCurrency(avgSavings)}</p>
            <p className="text-xs text-muted-foreground">Avg. Annual Savings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <Clock className="w-5 h-5 mx-auto text-primary mb-2" />
            <p className="text-xl font-bold">{avgPayback} mo</p>
            <p className="text-xs text-muted-foreground">Avg. Payback Period</p>
          </CardContent>
        </Card>
      </div>

      {/* Sort Controls */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="roi">Highest ROI %</SelectItem>
              <SelectItem value="savings">Highest Savings</SelectItem>
              <SelectItem value="payback">Fastest Payback</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm text-muted-foreground">
          Click a persona below to see their full ROI report
        </p>
      </div>

      {/* Persona Selector Bar */}
      <Card className="py-2">
        <PersonaSelectorBar
          personas={sortedResults}
          selectedPersonaId={activePersonaId}
          onSelectPersona={setSelectedPersonaId}
        />
      </Card>

      {/* Full Report for Selected Persona */}
      {selectedResult && (
        <PersonaReportView
          persona={selectedResult.persona}
          roiSummary={selectedResult.roiSummary}
          adjustedSize={selectedResult.adjustedSize}
          adjustedLocations={selectedResult.adjustedLocations}
          onSizeChange={(size) => handleSizeChange(selectedResult.persona.id, size)}
          onLocationsChange={(locations) => handleLocationsChange(selectedResult.persona.id, locations)}
        />
      )}
    </div>
  );
}
