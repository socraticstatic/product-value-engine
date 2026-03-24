import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Users, MapPin, Sparkles } from 'lucide-react';
import { BUSINESS_SIZES, LOCATIONS } from './types';

interface PersonaAdjustmentSlidersProps {
  currentSize: string;
  currentLocations: string;
  onSizeChange: (size: string) => void;
  onLocationsChange: (locations: string) => void;
  originalSize: string;
  originalLocations: string;
}

// Get index of a size/location in its array
function getSizeIndex(sizeId: string): number {
  return BUSINESS_SIZES.findIndex(s => s.id === sizeId);
}

function getLocationsIndex(locationsId: string): number {
  return LOCATIONS.findIndex(l => l.id === locationsId);
}

// Get label for display
function getSizeLabel(sizeId: string): string {
  return BUSINESS_SIZES.find(s => s.id === sizeId)?.label || sizeId;
}

function getLocationsLabel(locationsId: string): string {
  return LOCATIONS.find(l => l.id === locationsId)?.label || locationsId;
}

export function PersonaAdjustmentSliders({
  currentSize,
  currentLocations,
  onSizeChange,
  onLocationsChange,
  originalSize,
  originalLocations
}: PersonaAdjustmentSlidersProps) {
  const sizeIndex = getSizeIndex(currentSize);
  const locationsIndex = getLocationsIndex(currentLocations);
  
  const isModified = currentSize !== originalSize || currentLocations !== originalLocations;
  const isSizeModified = currentSize !== originalSize;
  const isLocationsModified = currentLocations !== originalLocations;

  const handleSizeSliderChange = (value: number[]) => {
    const newSize = BUSINESS_SIZES[value[0]]?.id;
    if (newSize) {
      onSizeChange(newSize);
    }
  };

  const handleLocationsSliderChange = (value: number[]) => {
    const newLocations = LOCATIONS[value[0]]?.id;
    if (newLocations) {
      onLocationsChange(newLocations);
    }
  };

  const handleReset = () => {
    onSizeChange(originalSize);
    onLocationsChange(originalLocations);
  };

  return (
    <Card className="border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <CardTitle className="text-base">Adjust Scenario</CardTitle>
            {isModified && (
              <Badge variant="outline" className="text-xs border-amber-500/50 text-amber-500 bg-amber-500/10">
                Modified
              </Badge>
            )}
          </div>
          {isModified && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleReset}
              className="h-7 text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset
            </Button>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Drag the sliders to see how ROI changes with different business characteristics
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Business Size Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Business Size</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{getSizeLabel(currentSize)}</span>
              {isSizeModified && (
                <span className="text-xs text-muted-foreground">
                  (was: {getSizeLabel(originalSize)})
                </span>
              )}
            </div>
          </div>
          <Slider
            value={[sizeIndex >= 0 ? sizeIndex : 0]}
            onValueChange={handleSizeSliderChange}
            min={0}
            max={BUSINESS_SIZES.length - 1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground px-1">
            <span>1-10</span>
            <span>51-200</span>
            <span>501-1K</span>
            <span>2K-5K</span>
            <span>10K+</span>
          </div>
        </div>

        {/* Locations Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Locations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{getLocationsLabel(currentLocations)}</span>
              {isLocationsModified && (
                <span className="text-xs text-muted-foreground">
                  (was: {getLocationsLabel(originalLocations)})
                </span>
              )}
            </div>
          </div>
          <Slider
            value={[locationsIndex >= 0 ? locationsIndex : 0]}
            onValueChange={handleLocationsSliderChange}
            min={0}
            max={LOCATIONS.length - 1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground px-1">
            <span>1</span>
            <span>2-5</span>
            <span>6-20</span>
            <span>21-50</span>
            <span>51-100</span>
            <span>100-500</span>
            <span>500+</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
