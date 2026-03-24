import { useRef, useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, Loader2, Monitor, FileText } from 'lucide-react';
import { toPng } from 'html-to-image';
import { toast } from 'sonner';
import { MultiProductValueProp } from '@/utils/multiProductValueProp';
import { ValuePropSlide } from './ValuePropSlide';
import { ValuePropFlyer } from './ValuePropFlyer';

interface ValuePropExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  valueProp: MultiProductValueProp;
  industryLabel?: string;
}

export function ValuePropExportModal({ open, onOpenChange, valueProp, industryLabel }: ValuePropExportModalProps) {
  const slideRef = useRef<HTMLDivElement>(null);
  const flyerRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState('slide');

  const handleDownload = useCallback(async () => {
    const ref = activeTab === 'slide' ? slideRef : flyerRef;
    if (!ref.current) return;

    setDownloading(true);
    try {
      const dataUrl = await toPng(ref.current, {
        pixelRatio: 2,
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = `att-value-prop-${activeTab}.png`;
      link.href = dataUrl;
      link.click();
      toast.success(`${activeTab === 'slide' ? 'Slide' : 'Flyer'} downloaded!`);
    } catch (err) {
      console.error('Export failed:', err);
      toast.error('Download failed. Try again.');
    } finally {
      setDownloading(false);
    }
  }, [activeTab]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Value Proposition
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="slide" className="gap-1.5">
                <Monitor className="w-3.5 h-3.5" />
                Slide (16:9)
              </TabsTrigger>
              <TabsTrigger value="flyer" className="gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Flyer (Portrait)
              </TabsTrigger>
            </TabsList>
            <Button onClick={handleDownload} disabled={downloading} size="sm">
              {downloading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
              Download PNG
            </Button>
          </div>

          <TabsContent value="slide">
            <div className="relative w-full overflow-hidden rounded-lg border bg-muted" style={{ aspectRatio: '16/9' }}>
              <div style={{ position: 'absolute', width: 1920, height: 1080, left: '50%', top: '50%', transform: 'translate(-50%, -50%) scale(var(--preview-scale))', transformOrigin: 'center center', ['--preview-scale' as string]: '0.44' }}>
                <ValuePropSlide ref={slideRef} valueProp={valueProp} industryLabel={industryLabel} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="flyer">
            <div className="relative w-full overflow-hidden rounded-lg border bg-muted" style={{ aspectRatio: '1080/1536' }}>
              <div style={{ position: 'absolute', width: 1080, height: 1536, left: '50%', top: '50%', transform: 'translate(-50%, -50%) scale(var(--preview-scale))', transformOrigin: 'center center', ['--preview-scale' as string]: '0.52' }}>
                <ValuePropFlyer ref={flyerRef} valueProp={valueProp} industryLabel={industryLabel} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
