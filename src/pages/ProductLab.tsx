import { ProductLabDashboard } from '@/components/product-lab/ProductLabDashboard';
import { EngineNavigation } from '@/components/EngineNavigation';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Eye } from 'lucide-react';
import { useDemoMode } from '@/contexts/DemoModeContext';
import attGlobe from '@/assets/att-globe.png';

const ProductLab = () => {
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
              <Label htmlFor="demo-mode-lab" className="text-sm text-muted-foreground cursor-pointer">
                Demo Mode
              </Label>
              <Switch 
                id="demo-mode-lab" 
                checked={isDemoMode} 
                onCheckedChange={toggleDemoMode}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-[1600px] mx-auto px-4 py-8">
        <div className="mb-8">
          <EngineNavigation activeTab="product-lab" />
        </div>
        <ProductLabDashboard />
      </main>
    </div>
  );
};

export default ProductLab;
