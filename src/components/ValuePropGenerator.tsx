import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Zap, Copy, RefreshCw, ArrowRight, Check, Lightbulb, UserCircle, Target, Building2, ChevronDown, ArrowLeft } from 'lucide-react';
import { generateCustomerCentricValueProp } from '@/utils/businessImpactLanguage';
import { recommendProductsForCustomer, ProductRecommendation } from '@/utils/productRecommendation';
import { CustomerProfile } from '@/types/customer';
import { toast } from 'sonner';
import { DemoBlur } from '@/components/ui/DemoBlur';
import { Product } from '@/data/products';
import { ValuePropModeSelector, SolutionValuePropForm, SolutionValuePropGrid } from './value-prop';
import { cn } from '@/lib/utils';

const industries = [
  'Healthcare',
  'Retail',
  'Professional Services',
  'Hospitality',
  'Manufacturing',
  'Education',
  'Finance',
  'Construction',
  'Transportation',
  'Real Estate',
  'Technology',
  'Other'
];

const challenges = [
  { value: 'downtime', label: 'Downtime disrupting business' },
  { value: 'slow-speeds', label: 'Slow internet speeds' },
  { value: 'security-concerns', label: 'Security concerns' },
  { value: 'high-costs', label: 'High/unpredictable costs' },
  { value: 'poor-support', label: 'Poor support from current provider' },
  { value: 'scaling', label: 'Difficulty scaling' },
  { value: 'outdated-tech', label: 'Outdated technology' },
  { value: 'multiple-vendors', label: 'Juggling multiple tech vendors' },
];

const priorities = [
  { value: 'reliability', label: 'Reliability & uptime' },
  { value: 'speed', label: 'Speed & performance' },
  { value: 'security', label: 'Security & compliance' },
  { value: 'cost-savings', label: 'Cost predictability' },
  { value: 'scalability', label: 'Scalability' },
  { value: 'support', label: 'Dedicated support' },
];

const businessSizes = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '500+', label: '500+ employees' },
];

const locationCounts = [
  { value: '1', label: '1 location' },
  { value: '2-5', label: '2-5 locations' },
  { value: '6-20', label: '6-20 locations' },
  { value: '20+', label: '20+ locations' },
];

type ViewState = 
  | 'mode-select'
  | 'customer-form'
  | 'customer-results'
  | 'solution-form'
  | 'solution-results';

interface ValuePropGeneratorProps {
  onCreateBattlecard?: () => void;
}

export const ValuePropGenerator = ({ onCreateBattlecard }: ValuePropGeneratorProps) => {
  // View state
  const [viewState, setViewState] = useState<ViewState>('mode-select');
  
  // Customer mode state
  const [industry, setIndustry] = useState<string>('');
  const [businessDescription, setBusinessDescription] = useState<string>('');
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [employeeCount, setEmployeeCount] = useState<string>('11-50');
  const [locations, setLocations] = useState<string>('1');
  const [generatedProp, setGeneratedProp] = useState<string>('');
  const [allRecommendations, setAllRecommendations] = useState<ProductRecommendation[]>([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState<ProductRecommendation | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);
  
  // Solution mode state
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  
  const handleModeSelect = (mode: 'customer' | 'solution') => {
    if (mode === 'customer') {
      setViewState('customer-form');
    } else {
      setViewState('solution-form');
    }
  };

  const getCustomerType = (): 'small-business' | 'mid-market' | 'enterprise' => {
    if (['201-500', '500+'].includes(employeeCount) || locations === '20+') {
      return 'enterprise';
    }
    if (['51-200'].includes(employeeCount) || ['6-20'].includes(locations)) {
      return 'mid-market';
    }
    return 'small-business';
  };

  const toggleChallenge = (value: string) => {
    setSelectedChallenges(prev => 
      prev.includes(value) 
        ? prev.filter(c => c !== value)
        : prev.length < 3 
          ? [...prev, value]
          : prev
    );
  };

  const togglePriority = (value: string) => {
    setSelectedPriorities(prev => 
      prev.includes(value) 
        ? prev.filter(p => p !== value)
        : prev.length < 3 
          ? [...prev, value]
          : prev
    );
  };

  const handleGenerate = () => {
    if (!industry || selectedChallenges.length === 0 || selectedPriorities.length === 0) {
      toast.error('Please select an industry, at least one challenge, and at least one priority');
      return;
    }

    setIsGenerating(true);
    setShowAlternatives(false);

    const customerType = getCustomerType();
    
    const profile: CustomerProfile = {
      type: customerType,
      industry,
      businessDescription: businessDescription || undefined,
      employeeCount: employeeCount as CustomerProfile['employeeCount'],
      locations: locations as CustomerProfile['locations'],
      painPoints: selectedChallenges,
      priorities: selectedPriorities,
      currentProvider: ['Multiple Providers'],
      existingServices: [],
      budget: 'balanced',
    };

    const recommendations = recommendProductsForCustomer(profile);

    setTimeout(() => {
      if (recommendations.length === 0) {
        toast.error('Could not find a suitable product recommendation');
        setIsGenerating(false);
        return;
      }

      setAllRecommendations(recommendations);
      const topRec = recommendations[0];
      setSelectedRecommendation(topRec);

      const valueProp = generateCustomerCentricValueProp(
        {
          industry,
          businessDescription: businessDescription || undefined,
          painPoints: selectedChallenges,
          priorities: selectedPriorities,
          employeeCount,
          locations,
          type: customerType,
        },
        topRec.product
      );

      setGeneratedProp(valueProp);
      setIsGenerating(false);
      setViewState('customer-results');
    }, 600);
  };

  const handleSelectProduct = (rec: ProductRecommendation) => {
    setSelectedRecommendation(rec);
    setShowAlternatives(false);

    const customerType = getCustomerType();
    const valueProp = generateCustomerCentricValueProp(
      {
        industry,
        businessDescription: businessDescription || undefined,
        painPoints: selectedChallenges,
        priorities: selectedPriorities,
        employeeCount,
        locations,
        type: customerType,
      },
      rec.product
    );
    setGeneratedProp(valueProp);
  };

  const handleCopy = async () => {
    const textToCopy = selectedRecommendation 
      ? `Recommended Solution: ${selectedRecommendation.product.name}\n\n${generatedProp}`
      : generatedProp;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setViewState('mode-select');
    setIndustry('');
    setBusinessDescription('');
    setSelectedChallenges([]);
    setSelectedPriorities([]);
    setEmployeeCount('11-50');
    setLocations('1');
    setGeneratedProp('');
    setAllRecommendations([]);
    setSelectedRecommendation(null);
    setShowAlternatives(false);
    setSelectedProducts([]);
  };

  const handleBackToModeSelect = () => {
    setViewState('mode-select');
  };

  const handleSolutionSelect = (products: Product[]) => {
    setSelectedProducts(products);
    setViewState('solution-results');
  };

  const alternativeProducts = allRecommendations.filter(
    rec => rec.product.id !== selectedRecommendation?.product.id
  );

  const canGenerate = industry && selectedChallenges.length > 0 && selectedPriorities.length > 0;

  // Render header
  const renderHeader = () => {
    const getSubtitle = () => {
      switch (viewState) {
        case 'mode-select':
          return 'Choose how you want to generate value propositions';
        case 'customer-form':
          return 'Enter customer details to get personalized recommendations';
        case 'customer-results':
          return 'Your tailored value proposition';
        case 'solution-form':
          return 'Select a product to see value propositions across business types';
        case 'solution-results':
          return 'Value propositions tailored for different businesses';
        default:
          return '';
      }
    };

    return (
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full mb-2">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">Value Proposition Generator</span>
        </div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-1">
          {viewState === 'mode-select' ? 'Quick Value Prop' : 'Generate Value Propositions'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {getSubtitle()}
        </p>
      </div>
    );
  };

  return (
    <div className={cn(
      "mx-auto space-y-4",
      viewState === 'solution-results' ? "max-w-7xl" : "max-w-5xl"
    )}>
      {renderHeader()}

      {/* Mode Selection */}
      {viewState === 'mode-select' && (
        <ValuePropModeSelector onSelectMode={handleModeSelect} />
      )}

      {/* Solution Form */}
      {viewState === 'solution-form' && (
        <SolutionValuePropForm 
          onSubmit={handleSolutionSelect}
          onBack={handleBackToModeSelect}
        />
      )}

      {/* Solution Results */}
      {viewState === 'solution-results' && selectedProducts.length > 0 && (
        <SolutionValuePropGrid
          products={selectedProducts}
          onBack={() => setViewState('solution-form')}
          onReset={handleReset}
        />
      )}

      {/* Customer Form */}
      {viewState === 'customer-form' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex justify-center">
            <Button variant="outline" onClick={handleBackToModeSelect}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Mode Selection
            </Button>
          </div>

          <Card className="border-border/50 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <UserCircle className="w-5 h-5 text-primary" />
                About the Customer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Industry Selection */}
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-sm font-medium">
                  Industry <span className="text-destructive">*</span>
                </Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(ind => (
                      <SelectItem key={ind} value={ind}>
                        {ind}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Business Description */}
              <div className="space-y-2">
                <Label htmlFor="business" className="text-sm font-medium">
                  What kind of business? <span className="text-muted-foreground text-xs">(optional)</span>
                </Label>
                <Input
                  id="business"
                  placeholder="e.g., dental practice, donut shop, law firm, auto repair shop"
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                />
              </div>

              {/* Context Section */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    Business Size
                  </Label>
                  <Select value={employeeCount} onValueChange={setEmployeeCount}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {businessSizes.map(size => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Locations</Label>
                  <Select value={locations} onValueChange={setLocations}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {locationCounts.map(loc => (
                        <SelectItem key={loc.value} value={loc.value}>
                          {loc.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Challenges Section */}
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-destructive" />
                Top Business Challenges <span className="text-destructive">*</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">Select up to 3 challenges</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {challenges.map(ch => (
                  <div
                    key={ch.value}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedChallenges.includes(ch.value)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => toggleChallenge(ch.value)}
                  >
                    <Checkbox
                      checked={selectedChallenges.includes(ch.value)}
                      onCheckedChange={() => toggleChallenge(ch.value)}
                      className="pointer-events-none"
                    />
                    <span className="text-sm">{ch.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Priority Section */}
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Business Priorities <span className="text-destructive">*</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {priorities.map(pr => (
                  <div
                    key={pr.value}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedPriorities.includes(pr.value)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => togglePriority(pr.value)}
                  >
                    <Checkbox
                      checked={selectedPriorities.includes(pr.value)}
                      className="pointer-events-none"
                    />
                    <span className="text-sm">{pr.label}</span>
                  </div>
                ))}
              </div>
              {selectedPriorities.length > 0 && (
                <p className="text-xs text-muted-foreground mt-2">
                  {selectedPriorities.length}/3 selected
                </p>
              )}
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={!canGenerate || isGenerating}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Finding the right solution...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Generate Value Proposition
              </>
            )}
          </Button>
        </div>
      )}

      {/* Customer Results */}
      {viewState === 'customer-results' && selectedRecommendation && generatedProp && (
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Product Recommendation - now uses real content with blur */}
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-primary">
                <Lightbulb className="w-5 h-5" />
                Recommended Solution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {selectedRecommendation.product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {selectedRecommendation.product.price}
                  </p>
                </div>
                {alternativeProducts.length > 0 && (
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAlternatives(!showAlternatives)}
                      className="flex items-center gap-1"
                    >
                      Try Different
                      <ChevronDown className={`w-4 h-4 transition-transform ${showAlternatives ? 'rotate-180' : ''}`} />
                    </Button>
                    
                    {showAlternatives && (
                      <div className="absolute right-0 top-full mt-2 w-72 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                        <div className="p-2 bg-muted/50 border-b border-border">
                          <p className="text-xs font-medium text-muted-foreground">Alternative Solutions</p>
                        </div>
                        <div className="p-2 space-y-2 max-h-64 overflow-y-auto">
                          {alternativeProducts.map((altRec, idx) => (
                            <button
                              key={altRec.product.id}
                              onClick={() => handleSelectProduct(altRec)}
                              className="w-full text-left p-3 rounded-md hover:bg-muted/50 transition-colors border border-border/50"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <p className="font-medium text-sm text-foreground">{altRec.product.name}</p>
                                  <p className="text-xs text-muted-foreground">{altRec.product.price}</p>
                                </div>
                                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                                  #{idx + 2} match
                                </span>
                              </div>
                            {altRec.matchReasons.length > 0 && (
                                <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
                                  <DemoBlur>{altRec.matchReasons[0]}</DemoBlur>
                                </p>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {selectedRecommendation.matchReasons.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Why this fits:</p>
                  <ul className="space-y-1.5">
                    {selectedRecommendation.matchReasons.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span><DemoBlur>{reason}</DemoBlur></span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Value Proposition */}
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Your Value Proposition
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none">
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  <DemoBlur>{generatedProp}</DemoBlur>
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="flex-1 sm:flex-none"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy to Clipboard
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewState('customer-form')}
                  className="flex-1 sm:flex-none"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Modify Details
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="flex-1 sm:flex-none"
                >
                  Start Over
                </Button>
              </div>

              {onCreateBattlecard && (
                <div className="pt-4 border-t border-border/50">
                  <Button
                    variant="link"
                    onClick={onCreateBattlecard}
                    className="text-primary p-0 h-auto"
                  >
                    Want more detail? Create Full Battlecard
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
