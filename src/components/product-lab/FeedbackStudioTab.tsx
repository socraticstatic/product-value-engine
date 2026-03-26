import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PersonaFeedbackChat } from './PersonaFeedbackChat';
import { PersonaProfileSnapshot } from './PersonaProfileSnapshot';
import { IndustryTrendsPanel } from './IndustryTrendsPanel';
import { ProductSelector } from './ProductSelector';
import { customerPersonas } from '@/data/personas';

interface FeedbackStudioTabProps {
  selectedProducts: string[];
  onProductsChange: (products: string[]) => void;
  focusArea: 'feature-gaps' | 'value-clarity' | 'market-position' | 'overall';
  setFocusArea: (area: 'feature-gaps' | 'value-clarity' | 'market-position' | 'overall') => void;
  competitorContext: string;
  setCompetitorContext: (context: string) => void;
}

export function FeedbackStudioTab({
  selectedProducts,
  onProductsChange,
  focusArea,
  setFocusArea,
  competitorContext,
  setCompetitorContext,
}: FeedbackStudioTabProps) {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('');
  const selectedPersona = customerPersonas.find(p => p.id === selectedPersonaId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <p className="text-lg font-semibold text-foreground">
          Chat with a mock segment/persona to get real-time feedback and insight on solution offerings
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
      {/* Left Column: Settings & Persona Profile */}
      <div className="lg:col-span-1 space-y-4">
        {/* Research Settings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Research Settings</CardTitle>
            <CardDescription className="text-xs">
              Configure your evaluation context
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Persona Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Persona</label>
              <Select value={selectedPersonaId} onValueChange={setSelectedPersonaId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose persona..." />
                </SelectTrigger>
                <SelectContent>
                  {customerPersonas.map(persona => (
                    <SelectItem key={persona.id} value={persona.id}>
                      <div className="flex items-center gap-2">
                        <span>{persona.avatar}</span>
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{persona.name}</span>
                          <span className="text-xs text-muted-foreground">
                            Seg {persona.segmentId} · {persona.industry}
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Research Objective */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Research Objective</label>
              <Select value={focusArea} onValueChange={(v: string) => setFocusArea(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overall">General Feedback</SelectItem>
                  <SelectItem value="feature-gaps">Feature Gap Analysis</SelectItem>
                  <SelectItem value="value-clarity">Value Proposition Clarity</SelectItem>
                  <SelectItem value="market-position">Industry Positioning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {focusArea === 'market-position' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Competitor Context</label>
                <Select value={competitorContext} onValueChange={setCompetitorContext}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select competitor..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Comcast">Comcast</SelectItem>
                    <SelectItem value="Verizon">Verizon</SelectItem>
                    <SelectItem value="T-Mobile">T-Mobile</SelectItem>
                    <SelectItem value="Spectrum">Spectrum</SelectItem>
                    <SelectItem value="RingCentral">RingCentral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Product Selection */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Products to Evaluate</CardTitle>
            <CardDescription className="text-xs">
              Select products for feedback collection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProductSelector
              mode="multi"
              selectedProducts={selectedProducts}
              onSelectionChange={onProductsChange}
            />
          </CardContent>
        </Card>
      </div>

      {/* Center: Feedback Collection Interface */}
      <div className="lg:col-span-2">
        <PersonaFeedbackChat
          selectedProducts={selectedProducts}
          focusArea={focusArea}
          competitorContext={competitorContext}
          selectedPersonaId={selectedPersonaId}
        />
      </div>

      {/* Right Column: Persona Profile Snapshot */}
      <div className="lg:col-span-1">
        <div className="sticky top-4 space-y-4">
          <PersonaProfileSnapshot persona={selectedPersona} />
          <IndustryTrendsPanel persona={selectedPersona} />
        </div>
      </div>
      </div>
    </div>
  );
}
