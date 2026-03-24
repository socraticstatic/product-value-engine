import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CustomerProfile } from '@/types/customer';
import { products, getProductById } from '@/data/products';
import { CustomerProfileForm } from '@/components/CustomerProfileForm';
import { Battlecard } from '@/components/Battlecard';
import { PersonasWidget } from '@/components/PersonasWidget';
import { CustomerStoriesPage } from '@/components/CustomerStoriesPage';
import { CompetitorClaimsPage } from '@/components/CompetitorClaimsPage';
import { ValuePropGenerator } from '@/components/ValuePropGenerator';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Zap, Users, Target, BookOpen, Sparkles, FileText, Shield, Package, AlertCircle, Star, Calculator, Eye } from 'lucide-react';
import { SolutionsCatalogPage } from '@/components/SolutionsCatalogPage';
import attGlobe from '@/assets/att-globe.png';
import { getIndustryRecommendation } from '@/utils/industryRecommendations';
import { priorityOptions, painPointOptions } from '@/types/customer';
import { EngineNavigation } from '@/components/EngineNavigation';
import { ROIAnalyzerPage } from '@/components/roi-analyzer';
import { useDemoMode } from '@/contexts/DemoModeContext';

type Step = 'profile' | 'battlecard';

// Helper to get user-friendly labels
const getPriorityLabel = (id: string) => priorityOptions.find(p => p.id === id)?.label || id;
const getPainPointLabel = (id: string) => painPointOptions.find(p => p.id === id)?.label || id;
const getSegmentLabel = (type: string) => {
  const labels: Record<string, { label: string; color: string }> = {
    'small-business': { label: 'Small Business', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
    'mid-market': { label: 'Mid-Market', color: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
    'enterprise': { label: 'Enterprise', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' }
  };
  return labels[type] || { label: type, color: 'bg-muted text-muted-foreground' };
};

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [step, setStep] = useState<Step>('profile');
  const [customerProfile, setCustomerProfile] = useState<CustomerProfile | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const activeTab = searchParams.get('tab') || 'home';
  const [expandedSolutionProduct, setExpandedSolutionProduct] = useState<string | null>(null);

  const handleTabChange = (tab: string) => {
    if (tab === 'home') {
      setSearchParams({});
    } else {
      setSearchParams({ tab });
    }
  };

  const handleViewSolution = (productId: string) => {
    setExpandedSolutionProduct(productId);
    handleTabChange('solutions');
  };

  const handleProfileSubmit = (profile: CustomerProfile) => {
    // Add smart defaults for priorities and pain points if empty
    const industryKey = profile.industry?.toLowerCase().replace(/\s+/g, '-') || 'other';
    const recommendation = getIndustryRecommendation(industryKey);
    
    const enrichedProfile: CustomerProfile = {
      ...profile,
      priorities: profile.priorities?.length > 0 
        ? profile.priorities 
        : recommendation.suggestedPriorities.slice(0, 2),
      painPoints: profile.painPoints?.length > 0 
        ? profile.painPoints 
        : recommendation.suggestedPainPoints.slice(0, 2),
    };
    
    setCustomerProfile(enrichedProfile);
    const recommended = getRecommendedProducts(enrichedProfile);
    setSelectedProducts(recommended);
    setStep('battlecard');
  };

  const getRecommendedProducts = (profile: CustomerProfile): string[] => {
    const recommendations: string[] = [];
    // Enterprise multi-location gets HSIA-E as primary connectivity
    if (profile.type === 'enterprise' && profile.locations !== '1') {
      recommendations.push('hsia-enterprise');
    }
    // Non-enterprise: recommend fiber for reliability/speed
    else if (profile.priorities.includes('reliability') || profile.priorities.includes('speed')) {
      recommendations.push('business-fiber-1g');
    }

    // Voice for businesses replacing legacy systems
    if (profile.existingServices?.includes('landline') || profile.existingServices?.includes('pbx')) {
      recommendations.push('business-voice');
    }

    // Mobility for mobile workforce
    if (profile.priorities.includes('mobility') || profile.priorities.includes('remote-work')) {
      recommendations.push('internet-air-business');
    }

    // Bundle for comprehensive needs
    if (profile.budget === 'balanced' || profile.budget === 'performance-focused') {
      recommendations.push('business-complete-bundle');
    }

    // Internet Air for remote locations
    if (profile.priorities.includes('backup-failover')) {
      recommendations.push('internet-air-business');
    }

    // Ensure we have at least fiber as default
    if (recommendations.length === 0) {
      recommendations.push('business-fiber-1g');
    }

    return [...new Set(recommendations)].slice(0, 4);
  };

  const handleReset = () => {
    setStep('profile');
    setCustomerProfile(null);
    setSelectedProducts([]);
  };

  const selectedProductDetails = selectedProducts
    .map(id => getProductById(id))
    .filter(Boolean) as typeof products;

  const { isDemoMode, toggleDemoMode } = useDemoMode();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-[1600px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={attGlobe} alt="AT&T" className="w-10 h-10 rounded-lg" />
              <div>
                <h1 className="text-xl font-display font-bold text-foreground">
                  Product Value Engine
                </h1>
                <p className="text-xs text-muted-foreground">AT&T Business</p>
              </div>
            </div>

            {/* Demo Mode Toggle */}
            <div className="flex items-center gap-2">
              <Eye className={`w-4 h-4 ${isDemoMode ? 'text-primary' : 'text-muted-foreground'}`} />
              <Label htmlFor="demo-mode" className="text-sm text-muted-foreground cursor-pointer">
                Demo Mode
              </Label>
              <Switch 
                id="demo-mode" 
                checked={isDemoMode} 
                onCheckedChange={toggleDemoMode}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-[1600px] mx-auto px-4 py-8">
          <div className="mb-8">
            <EngineNavigation activeTab={activeTab} onTabChange={handleTabChange} />
          </div>
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">

            <TabsContent value="home">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-display font-bold text-foreground">
                  Welcome to the Product Value Engine
                </h2>
              </div>


              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Quick Value Prop */}
                <div className="group p-6 rounded-xl bg-card shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all cursor-pointer border-2 border-primary/20"
                     onClick={() => handleTabChange('quick-value')}>
                  <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Quick Value Prop</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Generate a personalized value proposition in seconds with just a few inputs.
                  </p>
                  <Badge variant="outline" className="mt-3 text-xs text-primary border-primary/30">Fast & Easy</Badge>
                </div>

                {/* Product Value Lab */}
                <div className="group p-6 rounded-xl bg-card shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all cursor-pointer border-2 border-purple-500/20"
                     onClick={() => window.location.href = '/product-lab'}>
                  <div className="p-3 rounded-lg bg-purple-500/10 w-fit mb-4 group-hover:bg-purple-500/20 transition-colors">
                    <Sparkles className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Product Value Lab</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Analyze product-market fit, build multi-product strategies, and get AI feedback on solution positioning.
                  </p>
                  <Badge variant="outline" className="mt-3 text-xs text-purple-500 border-purple-500/30">Advanced</Badge>
                </div>

                {/* Explore Personas */}
                <div className="group p-6 rounded-xl bg-card shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all cursor-pointer"
                     onClick={() => handleTabChange('personas')}>
                  <div className="p-3 rounded-lg bg-warning/10 w-fit mb-4 group-hover:bg-warning/20 transition-colors">
                    <Users className="w-6 h-6 text-warning" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Explore Personas</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Explore Small, Medium, and Enterprise customer segments to better understand buyer motivations and pain points.
                  </p>
                </div>

                {/* Claim Analysis */}
                <div className="group p-6 rounded-xl bg-card shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all cursor-pointer"
                     onClick={() => handleTabChange('claims')}>
                  <div className="p-3 rounded-lg bg-amber-500/10 w-fit mb-4 group-hover:bg-amber-500/20 transition-colors">
                    <Shield className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Claim Analysis</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Input competitor claims and get AI-powered responses to address them effectively.
                  </p>
                </div>

                {/* Customer Use Cases */}
                <div className="group p-6 rounded-xl bg-card shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all cursor-pointer"
                     onClick={() => handleTabChange('stories')}>
                  <div className="p-3 rounded-lg bg-success/10 w-fit mb-4 group-hover:bg-success/20 transition-colors">
                    <BookOpen className="w-6 h-6 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Customer Use Cases</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Browse real-world use cases to understand how businesses solved their challenges.
                  </p>
                </div>

                {/* ROI Analyzer */}
                <div className="group p-6 rounded-xl bg-card shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all cursor-pointer border-2 border-success/20"
                     onClick={() => handleTabChange('roi-analyzer')}>
                  <div className="p-3 rounded-lg bg-success/10 w-fit mb-4 group-hover:bg-success/20 transition-colors">
                    <Calculator className="w-6 h-6 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">ROI Analyzer</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Quantify the financial impact of AT&T solutions with industry benchmarks and AI recommendations.
                  </p>
                  <Badge variant="outline" className="mt-3 text-xs text-success border-success/30">AI-Powered</Badge>
                </div>

                {/* Solutions */}
                <div className="group p-6 rounded-xl bg-card shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all cursor-pointer"
                     onClick={() => handleTabChange('solutions')}>
                  <div className="p-3 rounded-lg bg-blue-500/10 w-fit mb-4 group-hover:bg-blue-500/20 transition-colors">
                    <Package className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Solutions Catalog</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Browse the full AT&T product portfolio with detailed features, pricing, and use cases.
                  </p>
                </div>

                {/* Create Battlecard - moved to end */}
                <div className="group p-6 rounded-xl bg-card shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all cursor-pointer"
                     onClick={() => handleTabChange('battlecard')}>
                  <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Create Battlecard</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Enter customer details to generate personalized talking points, objection handlers, and value propositions.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="quick-value">
              <ValuePropGenerator onCreateBattlecard={() => handleTabChange('battlecard')} />
            </TabsContent>

            
            <TabsContent value="battlecard">
              {step === 'profile' && (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                      Business Customer Discovery
                    </h2>
                    <p className="text-muted-foreground">
                      Enter business details to generate a personalized battlecard
                    </p>
                  </div>

                  {/* Pre-made Battlecards Section */}
                  <div className="mb-10 p-6 rounded-xl bg-muted/30 border border-border">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          Quick Start with Pre-Made Battlecards
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Choose from pre-generated battlecards based on common customer profiles, or scroll down to create your own custom battlecard.
                        </p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* SMB Retail */}
                      <Card 
                        className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all group"
                        onClick={() => {
                          const profile: CustomerProfile = {
                            industry: "Retail",
                            type: "small-business",
                            locations: "2-5",
                            employeeCount: "11-50",
                            budget: "cost-conscious",
                            priorities: ["reliability", "speed"],
                            currentProvider: ["Spectrum"],
                            existingServices: ["cable-internet"],
                            painPoints: ["downtime", "slow-speeds"]
                          };
                          handleProfileSubmit(profile);
                        }}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">🏪</span>
                              <CardTitle className="text-sm group-hover:text-primary transition-colors">SMB Retail</CardTitle>
                            </div>
                            <Badge variant="outline" className={`text-[10px] ${getSegmentLabel('small-business').color}`}>
                              {getSegmentLabel('small-business').label}
                            </Badge>
                          </div>
                          <CardDescription className="text-xs">Small retail business</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-3">
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-xs">2-5 locations</Badge>
                            <Badge variant="outline" className="text-xs">11-50 employees</Badge>
                          </div>
                          <div className="space-y-1.5">
                            <div className="flex items-start gap-1.5">
                              <Star className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                              <span className="text-[11px] text-muted-foreground line-clamp-1">{getPriorityLabel('reliability')}, {getPriorityLabel('speed')}</span>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <AlertCircle className="w-3 h-3 text-destructive mt-0.5 shrink-0" />
                              <span className="text-[11px] text-muted-foreground line-clamp-1">{getPainPointLabel('downtime')}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Mid-Market Healthcare */}
                      <Card 
                        className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all group"
                        onClick={() => {
                          const profile: CustomerProfile = {
                            industry: "Healthcare",
                            type: "mid-market",
                            locations: "6-20",
                            employeeCount: "201-500",
                            budget: "balanced",
                            priorities: ["security", "reliability", "backup-failover"],
                            currentProvider: ["Comcast"],
                            existingServices: ["cable-internet", "voip"],
                            painPoints: ["security-concerns", "no-backup"]
                          };
                          handleProfileSubmit(profile);
                        }}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">🏥</span>
                              <CardTitle className="text-sm group-hover:text-primary transition-colors">Mid-Market Healthcare</CardTitle>
                            </div>
                            <Badge variant="outline" className={`text-[10px] ${getSegmentLabel('mid-market').color}`}>
                              {getSegmentLabel('mid-market').label}
                            </Badge>
                          </div>
                          <CardDescription className="text-xs">Regional medical practice</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-3">
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-xs">6-20 locations</Badge>
                            <Badge variant="outline" className="text-xs">201-500 employees</Badge>
                          </div>
                          <div className="space-y-1.5">
                            <div className="flex items-start gap-1.5">
                              <Star className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                              <span className="text-[11px] text-muted-foreground line-clamp-1">{getPriorityLabel('security')}, {getPriorityLabel('reliability')}</span>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <AlertCircle className="w-3 h-3 text-destructive mt-0.5 shrink-0" />
                              <span className="text-[11px] text-muted-foreground line-clamp-1">{getPainPointLabel('security-concerns')}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Enterprise Manufacturing */}
                      <Card 
                        className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all group"
                        onClick={() => {
                          const profile: CustomerProfile = {
                            industry: "Manufacturing",
                            type: "enterprise",
                            locations: "20+",
                            employeeCount: "500+",
                            budget: "performance-focused",
                            priorities: ["scalability", "security", "speed"],
                            currentProvider: ["Verizon Business"],
                            existingServices: ["fiber-internet", "voip"],
                            painPoints: ["downtime", "scalability-limits"]
                          };
                          handleProfileSubmit(profile);
                        }}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">🏭</span>
                              <CardTitle className="text-sm group-hover:text-primary transition-colors">Enterprise Manufacturing</CardTitle>
                            </div>
                            <Badge variant="outline" className={`text-[10px] ${getSegmentLabel('enterprise').color}`}>
                              {getSegmentLabel('enterprise').label}
                            </Badge>
                          </div>
                          <CardDescription className="text-xs">Large manufacturing company</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-3">
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-xs">20+ locations</Badge>
                            <Badge variant="outline" className="text-xs">500+ employees</Badge>
                          </div>
                          <div className="space-y-1.5">
                            <div className="flex items-start gap-1.5">
                              <Star className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                              <span className="text-[11px] text-muted-foreground line-clamp-1">{getPriorityLabel('scalability')}, {getPriorityLabel('security')}</span>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <AlertCircle className="w-3 h-3 text-destructive mt-0.5 shrink-0" />
                              <span className="text-[11px] text-muted-foreground line-clamp-1">{getPainPointLabel('downtime')}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Remote-First Tech */}
                      <Card 
                        className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all group"
                        onClick={() => {
                          const profile: CustomerProfile = {
                            industry: "Technology",
                            type: "small-business",
                            locations: "1",
                            employeeCount: "11-50",
                            budget: "balanced",
                            priorities: ["remote-work", "mobility", "speed"],
                            currentProvider: ["T-Mobile for Business"],
                            existingServices: ["cable-internet", "wireless"],
                            painPoints: ["slow-speeds", "no-backup"]
                          };
                          handleProfileSubmit(profile);
                        }}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">💻</span>
                              <CardTitle className="text-sm group-hover:text-primary transition-colors">Remote-First Tech</CardTitle>
                            </div>
                            <Badge variant="outline" className={`text-[10px] ${getSegmentLabel('small-business').color}`}>
                              {getSegmentLabel('small-business').label}
                            </Badge>
                          </div>
                          <CardDescription className="text-xs">Distributed tech team</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-3">
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-xs">1 HQ location</Badge>
                            <Badge variant="outline" className="text-xs">Remote team</Badge>
                          </div>
                          <div className="space-y-1.5">
                            <div className="flex items-start gap-1.5">
                              <Star className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                              <span className="text-[11px] text-muted-foreground line-clamp-1">{getPriorityLabel('remote-work')}, {getPriorityLabel('mobility')}</span>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <AlertCircle className="w-3 h-3 text-destructive mt-0.5 shrink-0" />
                              <span className="text-[11px] text-muted-foreground line-clamp-1">{getPainPointLabel('slow-speeds')}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Multi-Location Restaurant */}
                      <Card 
                        className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all group"
                        onClick={() => {
                          const profile: CustomerProfile = {
                            industry: "Hospitality",
                            type: "mid-market",
                            locations: "6-20",
                            employeeCount: "51-200",
                            budget: "cost-conscious",
                            priorities: ["reliability", "backup-failover"],
                            currentProvider: ["Comcast Business"],
                            existingServices: ["cable-internet"],
                            painPoints: ["downtime", "no-backup"]
                          };
                          handleProfileSubmit(profile);
                        }}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">🍽️</span>
                              <CardTitle className="text-sm group-hover:text-primary transition-colors">Multi-Location Restaurant</CardTitle>
                            </div>
                            <Badge variant="outline" className={`text-[10px] ${getSegmentLabel('mid-market').color}`}>
                              {getSegmentLabel('mid-market').label}
                            </Badge>
                          </div>
                          <CardDescription className="text-xs">Restaurant chain</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-3">
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-xs">6-20 locations</Badge>
                            <Badge variant="outline" className="text-xs">51-200 employees</Badge>
                          </div>
                          <div className="space-y-1.5">
                            <div className="flex items-start gap-1.5">
                              <Star className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                              <span className="text-[11px] text-muted-foreground line-clamp-1">{getPriorityLabel('reliability')}, {getPriorityLabel('backup-failover')}</span>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <AlertCircle className="w-3 h-3 text-destructive mt-0.5 shrink-0" />
                              <span className="text-[11px] text-muted-foreground line-clamp-1">{getPainPointLabel('downtime')}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Professional Services */}
                      <Card 
                        className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all group"
                        onClick={() => {
                          const profile: CustomerProfile = {
                            industry: "Professional Services",
                            type: "small-business",
                            locations: "2-5",
                            employeeCount: "11-50",
                            budget: "performance-focused",
                            priorities: ["security", "reliability"],
                            currentProvider: ["Verizon Business"],
                            existingServices: ["fiber-internet", "voip"],
                            painPoints: ["security-concerns", "compliance"]
                          };
                          handleProfileSubmit(profile);
                        }}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">⚖️</span>
                              <CardTitle className="text-sm group-hover:text-primary transition-colors">Professional Services</CardTitle>
                            </div>
                            <Badge variant="outline" className={`text-[10px] ${getSegmentLabel('small-business').color}`}>
                              {getSegmentLabel('small-business').label}
                            </Badge>
                          </div>
                          <CardDescription className="text-xs">Law firm / consulting</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-3">
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-xs">2-5 locations</Badge>
                            <Badge variant="outline" className="text-xs">11-50 employees</Badge>
                          </div>
                          <div className="space-y-1.5">
                            <div className="flex items-start gap-1.5">
                              <Star className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                              <span className="text-[11px] text-muted-foreground line-clamp-1">{getPriorityLabel('security')}, {getPriorityLabel('reliability')}</span>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <AlertCircle className="w-3 h-3 text-destructive mt-0.5 shrink-0" />
                              <span className="text-[11px] text-muted-foreground line-clamp-1">{getPainPointLabel('security-concerns')}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Divider with "Or" */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <div className="flex items-center gap-2 px-4 bg-background">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-muted-foreground">Or create your own custom battlecard</span>
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  </div>

                  <CustomerProfileForm onSubmit={handleProfileSubmit} />
                </>
              )}

              {step === 'battlecard' && customerProfile && (
                <Battlecard 
                  products={selectedProductDetails}
                  customerProfile={customerProfile}
                  onReset={handleReset}
                  onViewSolution={handleViewSolution}
                />
              )}
            </TabsContent>

            <TabsContent value="stories">
              <CustomerStoriesPage />
            </TabsContent>
            
            <TabsContent value="personas" className="max-w-none">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                  Customer Personas & Narratives
                </h2>
                <p className="text-muted-foreground">
                  Learn from mock customer stories across all 7 SMB segments
                </p>
              </div>
              <div className="-mx-4 px-4 lg:-mx-16 lg:px-16">
                <PersonasWidget />
              </div>
            </TabsContent>

            <TabsContent value="claims">
              <CompetitorClaimsPage />
            </TabsContent>

            <TabsContent value="roi-analyzer">
              <ROIAnalyzerPage />
            </TabsContent>

            <TabsContent value="solutions">
              <SolutionsCatalogPage initialExpandedProduct={expandedSolutionProduct} />
            </TabsContent>
          </Tabs>
      </main>
    </div>
  );
};

export default Index;
