import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Users, 
  Building2, 
  Target, 
  MessageSquare, 
  AlertTriangle, 
  Package,
  TrendingUp,
  ChevronRight,
  ChevronDown,
  User,
  Briefcase,
  Play,
  Filter,
  LayoutGrid,
  Layers,
  Lightbulb,
  Zap
} from 'lucide-react';
import { 
  customerPersonas, 
  getAllSegments, 
  groupingMetadata,
  type CustomerPersona,
  type GroupingKey
} from '@/data/personas';
import { RolePlayChat } from './RolePlayChat';
import { PersonaBuyingCard } from './PersonaBuyingCard';
import { QuickMatchTool } from './QuickMatchTool';
import { 
  getProductsFromNames, 
  getRelevantStories, 
  getAllIndustriesFromPersonas 
} from '@/utils/personaProductMapping';

type ViewMode = 'buying' | 'list' | 'grouped' | 'quickmatch';

const groupingOptions: { key: GroupingKey; label: string; icon: string }[] = [
  { key: 'valueTier', label: 'Value Tier', icon: '💎' },
  { key: 'buyingBehavior', label: 'Buying Behavior', icon: '🛒' },
  { key: 'mindset', label: 'Mindset', icon: '🧠' },
  { key: 'primaryNeed', label: 'Primary Need', icon: '🎯' },
  { key: 'decisionStyle', label: 'Decision Style', icon: '👥' },
  { key: 'productAffinity', label: 'Product Affinity', icon: '📦' },
];

export function PersonasWidget() {
  const [selectedPersona, setSelectedPersona] = useState<CustomerPersona | null>(null);
  const [rolePlayPersona, setRolePlayPersona] = useState<CustomerPersona | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('buying');
  const [segmentFilter, setSegmentFilter] = useState<string>('all');
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [marketTypeFilter, setMarketTypeFilter] = useState<string>('all');
  const [selectedGrouping, setSelectedGrouping] = useState<GroupingKey>('valueTier');
  
  const segments = getAllSegments();
  const industries = useMemo(() => getAllIndustriesFromPersonas(customerPersonas), []);

  // Filter personas
  const filteredPersonas = useMemo(() => {
    return customerPersonas.filter(persona => {
      const matchesSegment = segmentFilter === 'all' || persona.segmentId.toString() === segmentFilter;
      const matchesIndustry = industryFilter === 'all' || persona.industry === industryFilter;
      const matchesMarketType = marketTypeFilter === 'all' || 
        (marketTypeFilter === 'smb' && (!persona.marketType || persona.marketType === 'smb')) ||
        (marketTypeFilter === 'enterprise' && persona.marketType === 'enterprise');
      return matchesSegment && matchesIndustry && matchesMarketType;
    });
  }, [segmentFilter, industryFilter, marketTypeFilter]);

  // Group personas by selected grouping
  const groupedPersonas = useMemo(() => {
    const grouped = new Map<string, CustomerPersona[]>();
    const metadata = groupingMetadata[selectedGrouping];
    
    // Initialize groups in the order defined in metadata
    Object.keys(metadata.options).forEach(key => {
      grouped.set(key, []);
    });
    
    filteredPersonas.forEach(persona => {
      const groupValue = persona[selectedGrouping] as string;
      if (!grouped.has(groupValue)) {
        grouped.set(groupValue, []);
      }
      grouped.get(groupValue)!.push(persona);
    });
    
    return grouped;
  }, [filteredPersonas, selectedGrouping]);

  const getTechSophColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'medium': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'high': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getGroupColor = (groupKey: GroupingKey, value: string) => {
    const metadata = groupingMetadata[groupKey] as { options: Record<string, { color: string }> };
    return metadata.options[value]?.color || 'bg-muted text-muted-foreground';
  };

  const getGroupLabel = (groupKey: GroupingKey, value: string) => {
    const metadata = groupingMetadata[groupKey] as { options: Record<string, { label: string }> };
    return metadata.options[value]?.label || value;
  };

  const getGroupDescription = (groupKey: GroupingKey, value: string) => {
    const metadata = groupingMetadata[groupKey] as { options: Record<string, { description: string }> };
    return metadata.options[value]?.description || '';
  };

  const getSalesTip = (groupKey: GroupingKey, value: string) => {
    const metadata = groupingMetadata[groupKey] as { salesTips: Record<string, string> };
    return metadata.salesTips[value] || '';
  };

  // Show role-play chat if active
  if (rolePlayPersona) {
    return <RolePlayChat persona={rolePlayPersona} onClose={() => setRolePlayPersona(null)} />;
  }

  if (selectedPersona) {
    return (
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">{selectedPersona.avatar}</div>
              <div>
                <CardTitle className="text-xl text-foreground">{selectedPersona.name}</CardTitle>
                <p className="text-muted-foreground">{selectedPersona.title}</p>
                <p className="text-sm text-primary">{selectedPersona.company}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                type="button"
                onClick={() => setRolePlayPersona(selectedPersona)}
                className="gap-2"
              >
                <Play className="w-4 h-4" />
                Practice Pitch
              </Button>
              <Button 
                type="button"
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedPersona(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ← Back
              </Button>
            </div>
          </div>
          
          {/* Primary badges - simplified */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              Segment {selectedPersona.segmentId}
            </Badge>
            <Badge variant="outline" className={getGroupColor('valueTier', selectedPersona.valueTier)}>
              {getGroupLabel('valueTier', selectedPersona.valueTier)}
            </Badge>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{selectedPersona.estimatedAnnualValue}/yr</span>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="bg-muted/50 rounded-lg p-4 mb-6 border-l-4 border-primary">
            <p className="text-foreground italic">"{selectedPersona.quote}"</p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="needs">Needs</TabsTrigger>
              <TabsTrigger value="approach">Approach</TabsTrigger>
              <TabsTrigger value="objections">Objections</TabsTrigger>
              <TabsTrigger value="groupings">Groupings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    Company Profile
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Industry</span>
                      <span className="text-foreground">{selectedPersona.industry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Employees</span>
                      <span className="text-foreground">{selectedPersona.employeeCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Locations</span>
                      <span className="text-foreground">{selectedPersona.locations}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Revenue</span>
                      <span className="text-foreground">{selectedPersona.revenue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tech Budget</span>
                      <span className="text-foreground">{selectedPersona.techBudget}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IT Staff</span>
                      <span className="text-foreground">{selectedPersona.itStaff}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Est. Annual Value</span>
                      <span className="text-foreground font-medium">{selectedPersona.estimatedAnnualValue}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Buyer Characteristics
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Decision Maker</span>
                      <span className="text-foreground">{selectedPersona.decisionMaker}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Research Method</span>
                      <span className="text-foreground text-right text-xs">{selectedPersona.researchMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current Provider</span>
                      <span className="text-foreground">{selectedPersona.currentProvider}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-muted-foreground text-sm">Key Influencers:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedPersona.influencers.map((inf, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {inf}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="needs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Top Needs
                  </h4>
                  <div className="space-y-2">
                    {selectedPersona.topNeeds.map((need, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-foreground">{need.need}</span>
                            <span className="text-muted-foreground">{need.importance}%</span>
                          </div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${need.importance}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Pain Points
                  </h4>
                  <ul className="space-y-2">
                    {selectedPersona.painPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="approach">
              <div className="space-y-4">
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    Sales Approach
                  </h4>
                  <p className="text-sm text-muted-foreground">{selectedPersona.salesApproach}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-emerald-400 flex items-center gap-1">
                      <Package className="w-3 h-3" /> Lead With
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {selectedPersona.leadProducts.map((prod, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                          {prod}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-blue-400 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> Suggest
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {selectedPersona.suggestProducts.map((prod, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/30">
                          {prod}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-red-400 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Avoid
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {selectedPersona.avoidProducts.length > 0 ? selectedPersona.avoidProducts.map((prod, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-red-500/10 text-red-400 border-red-500/30">
                          {prod}
                        </Badge>
                      )) : (
                        <span className="text-xs text-muted-foreground">Full product suite appropriate</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    Key Talking Points
                  </h4>
                  <ul className="space-y-2">
                    {selectedPersona.keyTalkingPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm bg-muted/50 rounded-lg p-3">
                        <span className="text-primary font-bold">{idx + 1}.</span>
                        <span className="text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="objections">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Objections to Prepare For
                </h4>
                {selectedPersona.objectionsToPrepareFor.map((objection, idx) => {
                  const [obj, response] = objection.split('—');
                  return (
                    <div key={idx} className="bg-muted/50 rounded-lg p-4 border border-border">
                      <p className="text-sm font-medium text-amber-400 mb-2">{obj}</p>
                      <p className="text-sm text-foreground">→ {response}</p>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="groupings">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Understand this persona through multiple lenses to tailor your approach.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {groupingOptions.map(({ key, label, icon }) => {
                    const value = selectedPersona[key] as string;
                    const tip = getSalesTip(key, value);
                    const isValueTier = key === 'valueTier';
                    
                    return (
                      <div key={key} className="bg-muted/30 rounded-lg p-3 border border-border">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-sm">{icon}</span>
                          <span className="text-xs text-muted-foreground">{label}</span>
                        </div>
                        <p className={`text-sm font-medium ${isValueTier ? getGroupColor(key, value).split(' ')[1] : 'text-foreground'}`}>
                          {getGroupLabel(key, value)}
                        </p>
                        {tip && (
                          <Collapsible>
                            <CollapsibleTrigger asChild>
                              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mt-2">
                                <Lightbulb className="w-3 h-3" />
                                <span>Tip</span>
                              </button>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <p className="text-xs text-muted-foreground mt-1.5">{tip}</p>
                            </CollapsibleContent>
                          </Collapsible>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Users className="w-5 h-5 text-primary" />
              Persona Buying Intelligence
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Understand what each persona buys, why they buy it, and see relevant success stories.
            </p>
          </div>
          
          {/* View Toggle */}
          <div className="flex gap-2">
            <Button 
              type="button"
              variant={viewMode === 'buying' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('buying')}
              className="gap-1"
            >
              <LayoutGrid className="w-4 h-4" />
              Buying Guide
            </Button>
            <Button 
              type="button"
              variant={viewMode === 'grouped' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grouped')}
              className="gap-1"
            >
              <Layers className="w-4 h-4" />
              Group By
            </Button>
            <Button 
              type="button"
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              Segment List
            </Button>
            <Button 
              type="button"
              variant={viewMode === 'quickmatch' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('quickmatch')}
              className="gap-1 bg-primary/20 hover:bg-primary/30 border-primary/50"
            >
              <Zap className="w-4 h-4" />
              Quick Match
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-3 mt-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filter by:</span>
          </div>
          
          <Select value={marketTypeFilter} onValueChange={setMarketTypeFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Markets" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Markets</SelectItem>
              <SelectItem value="smb">SMB</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>

          <Select value={segmentFilter} onValueChange={setSegmentFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Segments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Segments</SelectItem>
              {segments.map((segment) => (
                <SelectItem key={segment.id} value={segment.id.toString()}>
                  Seg {segment.id}: {segment.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {viewMode === 'grouped' && (
            <Select value={selectedGrouping} onValueChange={(v) => setSelectedGrouping(v as GroupingKey)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Group by..." />
              </SelectTrigger>
              <SelectContent>
                {groupingOptions.map(({ key, label, icon }) => (
                  <SelectItem key={key} value={key}>
                    {icon} {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          
          {(segmentFilter !== 'all' || industryFilter !== 'all' || marketTypeFilter !== 'all') && (
            <Button 
              type="button"
              variant="ghost" 
              size="sm"
              onClick={() => { setSegmentFilter('all'); setIndustryFilter('all'); setMarketTypeFilter('all'); }}
              className="text-muted-foreground"
            >
              Clear filters
            </Button>
          )}
          
          <span className="text-sm text-muted-foreground ml-auto">
            {filteredPersonas.length} persona{filteredPersonas.length !== 1 ? 's' : ''}
          </span>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="pr-4">
          {viewMode === 'quickmatch' ? (
            // Quick Match Tool
            <QuickMatchTool 
              onSelectPersona={(persona) => {
                setSelectedPersona(persona);
                setViewMode('buying');
              }}
              onPracticePitch={setRolePlayPersona}
              onClose={() => setViewMode('buying')}
            />
          ) : viewMode === 'buying' ? (
            // Buying Intelligence View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPersonas.map((persona) => {
                const products = getProductsFromNames(persona.leadProducts);
                const stories = getRelevantStories(persona);
                
                return (
                  <PersonaBuyingCard
                    key={persona.id}
                    persona={persona}
                    products={products}
                    relevantStories={stories}
                    onViewFullProfile={setSelectedPersona}
                    onPracticePitch={setRolePlayPersona}
                  />
                );
              })}
              
              {filteredPersonas.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No personas match the current filters.
                </div>
              )}
            </div>
          ) : viewMode === 'grouped' ? (
            // Grouped View - Clean and minimal
            <div className="space-y-6">
              {Array.from(groupedPersonas.entries()).map(([groupValue, personas]) => {
                if (personas.length === 0) return null;
                
                const metadata = groupingMetadata[selectedGrouping] as { 
                  options: Record<string, { color: string; label: string; description: string }>;
                  salesTips: Record<string, string>;
                };
                const groupInfo = metadata.options[groupValue];
                const salesTip = metadata.salesTips[groupValue];
                const isValueTierGrouping = selectedGrouping === 'valueTier';
                
                return (
                  <div key={groupValue} className="space-y-3">
                    {/* Clean header */}
                    <div className="flex items-center gap-3 pb-2 border-b border-border">
                      <span className="font-medium text-foreground">
                        {groupInfo?.label || groupValue}
                      </span>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        {personas.length}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {groupInfo?.description}
                      </span>
                    </div>
                    
                    {/* Collapsible sales tip */}
                    {salesTip && (
                      <Collapsible>
                        <CollapsibleTrigger asChild>
                          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                            <Lightbulb className="w-3.5 h-3.5" />
                            <span>Sales tip</span>
                            <ChevronDown className="w-3 h-3" />
                          </button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <p className="text-sm text-muted-foreground mt-2 pl-5 border-l-2 border-primary/30">
                            {salesTip}
                          </p>
                        </CollapsibleContent>
                      </Collapsible>
                    )}
                    
                    {/* Persona cards - minimal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {personas.map((persona) => (
                        <button
                          key={persona.id}
                          onClick={() => setSelectedPersona(persona)}
                          className="w-full text-left p-3 rounded-lg bg-muted/30 border border-border hover:border-primary/50 hover:bg-muted/50 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{persona.avatar}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground text-sm">{persona.name}</span>
                                {/* Only show value tier badge if NOT grouping by value tier */}
                                {!isValueTierGrouping && (
                                  <Badge variant="outline" className={`text-xs scale-90 ${getGroupColor('valueTier', persona.valueTier)}`}>
                                    {getGroupLabel('valueTier', persona.valueTier)}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">{persona.title} • {persona.company}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Original Segment List View
            <div className="space-y-6">
              {segments
                .filter(segment => segmentFilter === 'all' || segment.id.toString() === segmentFilter)
                .map((segment) => {
                  const personas = filteredPersonas.filter(p => p.segmentId === segment.id);
                  if (personas.length === 0) return null;
                  
                  return (
                    <div key={segment.id} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                          Segment {segment.id}
                        </Badge>
                        <span className="text-sm font-medium text-foreground">{segment.name}</span>
                      </div>
                      
                      <div className="grid gap-3">
                        {personas.map((persona) => (
                          <button
                            key={persona.id}
                            onClick={() => setSelectedPersona(persona)}
                            className="w-full text-left p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/50 hover:bg-muted transition-all group"
                          >
                            <div className="flex items-start gap-3">
                              <div className="text-3xl">{persona.avatar}</div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-foreground">{persona.name}</span>
                                  <Badge variant="outline" className={`text-xs ${getTechSophColor(persona.techSophistication)}`}>
                                    {persona.techSophistication} tech
                                  </Badge>
                                  <Badge variant="outline" className={`text-xs ${getGroupColor('valueTier', persona.valueTier)}`}>
                                    {getGroupLabel('valueTier', persona.valueTier)}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{persona.title} at {persona.company}</p>
                                <p className="text-xs text-muted-foreground mt-1">{persona.industry} • {persona.employeeCount} employees • {persona.locations} location(s)</p>
                                <p className="text-xs text-foreground/70 mt-2 italic line-clamp-2">"{persona.quote}"</p>
                              </div>
                              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
