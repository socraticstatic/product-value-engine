import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Building2, Users, MapPin, AlertCircle, Target, ArrowRight, ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  BusinessProfile,
  INDUSTRIES,
  BUSINESS_SIZES,
  LOCATIONS,
  PAIN_POINTS,
  PRIORITIES,
  getMarketTypeFromSize
} from './types';

// Pre-made business profiles for quick start - SMB
const SMB_PRESETS: { id: string; name: string; profile: BusinessProfile }[] = [
  {
    id: 'dental-practice',
    name: '🦷 Dental Practice',
    profile: {
      companyName: 'Bright Smile Dental',
      industry: 'healthcare',
      businessSize: '11-50',
      locations: '1',
      painPoints: ['downtime', 'slow-speeds', 'security-concerns'],
      priorities: ['reliability', 'security', 'cost-savings'],
      additionalContext: 'Multi-chair dental practice using cloud-based imaging software and electronic health records. Need reliable connectivity for patient scheduling and insurance claims processing.',
      marketType: 'smb'
    }
  },
  {
    id: 'retail-boutique',
    name: '🛍️ Retail Boutique',
    profile: {
      companyName: 'Urban Style Collective',
      industry: 'retail',
      businessSize: '1-10',
      locations: '2-5',
      painPoints: ['downtime', 'multi-vendor', 'high-costs'],
      priorities: ['reliability', 'cost-savings', 'scalability'],
      additionalContext: 'Multi-location boutique retail chain with POS systems, inventory management, and customer WiFi. Need consistent connectivity across all stores.',
      marketType: 'smb'
    }
  },
  {
    id: 'law-firm',
    name: '⚖️ Law Firm',
    profile: {
      companyName: 'Morrison & Associates',
      industry: 'professional_services',
      businessSize: '11-50',
      locations: '1',
      painPoints: ['security-concerns', 'slow-speeds', 'poor-support'],
      priorities: ['security', 'reliability', 'support'],
      additionalContext: 'Mid-size law firm handling sensitive client data. Heavy use of video conferencing for depositions and client meetings. Cloud-based case management system.',
      marketType: 'smb'
    }
  },
  {
    id: 'restaurant-group',
    name: '🍽️ Restaurant Group',
    profile: {
      companyName: 'Harbor Fresh Restaurants',
      industry: 'hospitality',
      businessSize: '51-200',
      locations: '6-20',
      painPoints: ['downtime', 'multi-vendor', 'high-costs'],
      priorities: ['reliability', 'cost-savings', 'scalability'],
      additionalContext: 'Multi-location restaurant group with POS systems, online ordering integration, and kitchen display systems. Need reliable connectivity during peak dining hours.',
      marketType: 'smb'
    }
  },
  {
    id: 'manufacturing',
    name: '🏭 Manufacturing Facility',
    profile: {
      companyName: 'Precision Parts Inc.',
      industry: 'manufacturing',
      businessSize: '51-200',
      locations: '1',
      painPoints: ['downtime', 'slow-speeds', 'legacy-systems'],
      priorities: ['reliability', 'speed', 'scalability'],
      additionalContext: 'Manufacturing facility with IoT-connected equipment, inventory management systems, and real-time production monitoring. Downtime directly impacts production output.',
      marketType: 'smb'
    }
  },
  {
    id: 'construction-company',
    name: '🏗️ Construction Company',
    profile: {
      companyName: 'BuildRight Construction',
      industry: 'construction',
      businessSize: '11-50',
      locations: '2-5',
      painPoints: ['slow-speeds', 'multi-vendor', 'no-backup'],
      priorities: ['reliability', 'scalability', 'cost-savings'],
      additionalContext: 'Construction company with main office and multiple active job sites. Need reliable connectivity for project management software, video calls with clients, and field team coordination.',
      marketType: 'smb'
    }
  }
];

// Enterprise presets (NEW)
const ENTERPRISE_PRESETS: { id: string; name: string; profile: BusinessProfile }[] = [
  {
    id: 'enterprise-hospital',
    name: '🏥 Regional Hospital System',
    profile: {
      companyName: 'Mercy Regional Health System',
      industry: 'healthcare',
      businessSize: '5000-10000',
      locations: '21-50',
      painPoints: ['downtime', 'security-concerns', 'regulatory-compliance', 'multi-cloud'],
      priorities: ['reliability', 'security', '24x7-support', 'backup-failover'],
      additionalContext: 'Multi-hospital system with acute care, outpatient facilities, and telehealth services. HIPAA compliance critical. 50+ IT FTEs managing complex IoMT environment.',
      marketType: 'enterprise',
      enterpriseGrouping: 'healthcare'
    }
  },
  {
    id: 'enterprise-hotel',
    name: '🏨 National Hotel Chain',
    profile: {
      companyName: 'Grandview Hospitality Group',
      industry: 'hospitality',
      businessSize: '5000-10000',
      locations: '100-500',
      painPoints: ['multi-vendor', 'global-connectivity', 'it-complexity', 'high-costs'],
      priorities: ['reliability', 'unified-management', 'scalability', 'proactive-monitoring'],
      additionalContext: 'National hotel chain with 200+ properties across 40 states. Guest WiFi, property management systems, and reservation platforms require 24/7 uptime.',
      marketType: 'enterprise',
      enterpriseGrouping: 'hospitality'
    }
  },
  {
    id: 'enterprise-manufacturing',
    name: '🏭 Manufacturing Conglomerate',
    profile: {
      companyName: 'Pacific Manufacturing Group',
      industry: 'manufacturing',
      businessSize: '2000-5000',
      locations: '6-20',
      painPoints: ['downtime', 'legacy-systems', 'it-complexity', 'vendor-consolidation'],
      priorities: ['reliability', 'network-modernization', 'scalability', 'digital-transformation'],
      additionalContext: 'Multi-plant manufacturing operation with OT/IT convergence needs. IoT sensors, SCADA systems, and real-time production analytics across 12 facilities.',
      marketType: 'enterprise',
      enterpriseGrouping: 'industrials'
    }
  },
  {
    id: 'enterprise-financial',
    name: '🏦 Financial Services Enterprise',
    profile: {
      companyName: 'Pinnacle Financial Corporation',
      industry: 'finance',
      businessSize: '2000-5000',
      locations: '51-100',
      painPoints: ['security-concerns', 'regulatory-compliance', 'multi-cloud', 'global-connectivity'],
      priorities: ['security', '24x7-support', 'reliability', 'backup-failover'],
      additionalContext: 'Regional bank with 75 branches and growing digital banking platform. SOC 2 and PCI-DSS compliance mandatory. Zero tolerance for security incidents.',
      marketType: 'enterprise',
      enterpriseGrouping: 'professional-services'
    }
  },
  {
    id: 'enterprise-retail',
    name: '🏬 National Retail Chain',
    profile: {
      companyName: 'ValueMart Stores',
      industry: 'retail',
      businessSize: '10000+',
      locations: '500+',
      painPoints: ['downtime', 'multi-vendor', 'it-complexity', 'vendor-consolidation'],
      priorities: ['reliability', 'unified-management', 'cost-savings', 'scalability'],
      additionalContext: 'National retail chain with 500+ stores. POS reliability is mission-critical. Inventory management, supply chain, and omnichannel fulfillment require consistent connectivity.',
      marketType: 'enterprise',
      enterpriseGrouping: 'retail'
    }
  },
  {
    id: 'enterprise-tech',
    name: '💻 Software Development Company',
    profile: {
      companyName: 'Nexus Software Solutions',
      industry: 'technology',
      businessSize: '2000-5000',
      locations: '6-20',
      painPoints: ['slow-speeds', 'global-connectivity', 'multi-cloud', 'it-complexity'],
      priorities: ['speed', 'scalability', 'digital-transformation', 'global-reach'],
      additionalContext: 'Enterprise software company with distributed engineering teams across 8 global offices. Cloud-native infrastructure with multi-cloud strategy. Developer productivity depends on low-latency connectivity.',
      marketType: 'enterprise',
      enterpriseGrouping: 'technology'
    }
  }
];

// Combined presets
const ALL_PRESETS = [...SMB_PRESETS, ...ENTERPRISE_PRESETS];

interface BusinessIntakeFormProps {
  onSubmit: (profile: BusinessProfile) => void;
  isLoading?: boolean;
}

type Step = 1 | 2 | 3;

export function BusinessIntakeForm({ onSubmit, isLoading = false }: BusinessIntakeFormProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [selectedMarketType, setSelectedMarketType] = useState<'smb' | 'enterprise' | 'all'>('all');
  const [profile, setProfile] = useState<BusinessProfile>({
    companyName: '',
    industry: '',
    businessSize: '',
    locations: '',
    painPoints: [],
    priorities: [],
    additionalContext: ''
  });

  // Get filtered presets based on selected market type
  const filteredPresets = selectedMarketType === 'all' 
    ? ALL_PRESETS 
    : ALL_PRESETS.filter(p => p.profile.marketType === selectedMarketType);

  // Get filtered sizes based on selected market type
  const filteredSizes = selectedMarketType === 'all'
    ? BUSINESS_SIZES
    : BUSINESS_SIZES.filter(s => s.marketType === selectedMarketType);

  // Get filtered pain points and priorities (show all + market-specific)
  const filteredPainPoints = PAIN_POINTS.filter(p => 
    !('marketType' in p) || p.marketType === profile.marketType || profile.marketType === undefined
  );
  
  const filteredPriorities = PRIORITIES.filter(p => 
    !('marketType' in p) || p.marketType === profile.marketType || profile.marketType === undefined
  );

  const handlePresetSelect = (presetId: string) => {
    const preset = ALL_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setSelectedPreset(presetId);
      setProfile(preset.profile);
      // Update market type filter to match preset
      if (preset.profile.marketType) {
        setSelectedMarketType(preset.profile.marketType);
      }
    }
  };

  const handleMarketTypeChange = (type: 'smb' | 'enterprise' | 'all') => {
    setSelectedMarketType(type);
    setSelectedPreset(null);
    // Reset business size if it doesn't match new market type
    if (type !== 'all' && profile.businessSize) {
      const sizeMatch = BUSINESS_SIZES.find(s => s.id === profile.businessSize);
      if (sizeMatch && sizeMatch.marketType !== type) {
        setProfile(prev => ({ ...prev, businessSize: '', marketType: type as 'smb' | 'enterprise' }));
      } else {
        setProfile(prev => ({ ...prev, marketType: type as 'smb' | 'enterprise' }));
      }
    } else if (type === 'all') {
      setProfile(prev => ({ ...prev, marketType: undefined }));
    } else {
      setProfile(prev => ({ ...prev, marketType: type }));
    }
  };

  const handleSizeChange = (size: string) => {
    const marketType = getMarketTypeFromSize(size);
    setProfile(prev => ({ ...prev, businessSize: size, marketType }));
  };

  const isStep1Valid = profile.companyName && profile.industry && profile.businessSize && profile.locations;
  const isStep2Valid = profile.painPoints.length > 0;
  const isStep3Valid = profile.priorities.length > 0;

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const handleSubmit = () => {
    if (isStep1Valid && isStep2Valid && isStep3Valid) {
      onSubmit(profile);
    }
  };

  const togglePainPoint = (id: string) => {
    setProfile(prev => ({
      ...prev,
      painPoints: prev.painPoints.includes(id)
        ? prev.painPoints.filter(p => p !== id)
        : [...prev.painPoints, id]
    }));
  };

  const togglePriority = (id: string) => {
    setProfile(prev => ({
      ...prev,
      priorities: prev.priorities.includes(id)
        ? prev.priorities.filter(p => p !== id)
        : [...prev.priorities, id]
    }));
  };

  const progressPercent = ((currentStep - 1) / 2) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((step) => (
            <div 
              key={step}
              className={cn(
                "flex items-center gap-2 text-sm font-medium",
                currentStep >= step ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
                currentStep > step 
                  ? "bg-primary text-primary-foreground" 
                  : currentStep === step 
                    ? "bg-primary/10 text-primary border-2 border-primary"
                    : "bg-muted text-muted-foreground"
              )}>
                {currentStep > step ? <CheckCircle2 className="w-5 h-5" /> : step}
              </div>
              <span className="hidden sm:inline">
                {step === 1 ? 'Business Info' : step === 2 ? 'Pain Points' : 'Priorities'}
              </span>
            </div>
          ))}
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Step 1: Business Info */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Tell us about your company or use a preset</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Market Type Selector */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Market Segment</Label>
              <div className="flex gap-2">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'smb', label: 'SMB (1-1,999 employees)' },
                  { id: 'enterprise', label: 'Enterprise (2,000+)' }
                ].map(type => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleMarketTypeChange(type.id as 'smb' | 'enterprise' | 'all')}
                    className={cn(
                      "px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all flex-1",
                      selectedMarketType === type.id
                        ? type.id === 'enterprise'
                          ? "border-purple-500 bg-purple-500/10 text-purple-400"
                          : "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-muted-foreground/50"
                    )}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Start Presets */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <Label className="text-sm font-medium">Quick Start - Select a Business Type</Label>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {filteredPresets.map(preset => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handlePresetSelect(preset.id)}
                    className={cn(
                      "p-3 rounded-lg border-2 text-left transition-all text-sm",
                      selectedPreset === preset.id
                        ? preset.profile.marketType === 'enterprise'
                          ? "border-purple-500 bg-purple-500/5"
                          : "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    )}
                  >
                    <span className="font-medium">{preset.name}</span>
                    {preset.profile.marketType === 'enterprise' && (
                      <Badge className="ml-1 text-[9px] px-1 py-0 bg-purple-500/15 text-purple-400 border-purple-500/30">
                        ENT
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
              {selectedPreset && (
                <p className="text-xs text-muted-foreground">
                  ✓ Pre-filled with sample {ALL_PRESETS.find(p => p.id === selectedPreset)?.name} details
                </p>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or enter your details</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                placeholder="Enter your company name"
                value={profile.companyName}
                onChange={(e) => {
                  setSelectedPreset(null);
                  setProfile(prev => ({ ...prev, companyName: e.target.value }));
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select 
                value={profile.industry} 
                onValueChange={(value) => setProfile(prev => ({ ...prev, industry: value }))}
              >
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map(ind => (
                    <SelectItem key={ind.id} value={ind.id}>{ind.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessSize" className="flex items-center gap-2">
                  <Users className="w-4 h-4" /> Business Size
                </Label>
                <Select 
                  value={profile.businessSize} 
                  onValueChange={handleSizeChange}
                >
                  <SelectTrigger id="businessSize">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredSizes.map(size => (
                      <SelectItem key={size.id} value={size.id}>
                        {size.label}
                        {size.marketType === 'enterprise' && (
                          <span className="ml-1 text-purple-400 text-xs">(Enterprise)</span>
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="locations" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Locations
                </Label>
                <Select 
                  value={profile.locations} 
                  onValueChange={(value) => setProfile(prev => ({ ...prev, locations: value }))}
                >
                  <SelectTrigger id="locations">
                    <SelectValue placeholder="Select locations" />
                  </SelectTrigger>
                  <SelectContent>
                    {LOCATIONS.map(loc => (
                      <SelectItem key={loc.id} value={loc.id}>{loc.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleNext} disabled={!isStep1Valid}>
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Pain Points */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <AlertCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <CardTitle>Current Challenges</CardTitle>
                <CardDescription>Select the pain points affecting your business</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-3">
              {filteredPainPoints.map(point => (
                <button
                  key={point.id}
                  onClick={() => togglePainPoint(point.id)}
                  className={cn(
                    "p-4 rounded-lg border-2 text-left transition-all",
                    profile.painPoints.includes(point.id)
                      ? "border-destructive bg-destructive/5"
                      : "border-border hover:border-muted-foreground/50"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{point.label}</p>
                        {'marketType' in point && point.marketType === 'enterprise' && (
                          <Badge className="text-[9px] px-1 py-0 bg-purple-500/15 text-purple-400 border-purple-500/30">
                            Enterprise
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{point.description}</p>
                    </div>
                    {profile.painPoints.includes(point.id) && (
                      <CheckCircle2 className="w-5 h-5 text-destructive shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {profile.painPoints.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {profile.painPoints.map(id => {
                  const point = PAIN_POINTS.find(p => p.id === id);
                  return point ? (
                    <Badge key={id} variant="destructive" className="text-xs">
                      {point.label}
                    </Badge>
                  ) : null;
                })}
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button onClick={handleNext} disabled={!isStep2Valid}>
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Priorities */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle>Business Priorities</CardTitle>
                <CardDescription>What matters most to your business?</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-3">
              {filteredPriorities.map(priority => (
                <button
                  key={priority.id}
                  onClick={() => togglePriority(priority.id)}
                  className={cn(
                    "p-4 rounded-lg border-2 text-left transition-all",
                    profile.priorities.includes(priority.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/50"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{priority.label}</p>
                        {'marketType' in priority && priority.marketType === 'enterprise' && (
                          <Badge className="text-[9px] px-1 py-0 bg-purple-500/15 text-purple-400 border-purple-500/30">
                            Enterprise
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{priority.description}</p>
                    </div>
                    {profile.priorities.includes(priority.id) && (
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {profile.priorities.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {profile.priorities.map(id => {
                  const priority = PRIORITIES.find(p => p.id === id);
                  return priority ? (
                    <Badge key={id} className="text-xs">
                      {priority.label}
                    </Badge>
                  ) : null;
                })}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="context">Additional Context (Optional)</Label>
              <Textarea
                id="context"
                placeholder="Any specific challenges or requirements..."
                value={profile.additionalContext}
                onChange={(e) => setProfile(prev => ({ ...prev, additionalContext: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button onClick={handleSubmit} disabled={!isStep3Valid || isLoading}>
                {isLoading ? 'Analyzing...' : 'Analyze Business'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
