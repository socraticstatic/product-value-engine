import { CustomerProfile, industryOptions } from '@/types/customer';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Briefcase, Users, MapPin, Store } from 'lucide-react';

interface StepBusinessInfoProps {
  profile: CustomerProfile;
  onUpdate: (updates: Partial<CustomerProfile>) => void;
}

export function StepBusinessInfo({ profile, onUpdate }: StepBusinessInfoProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">Tell us about your customer</h3>
        <p className="text-sm text-muted-foreground">
          This helps us tailor the battlecard language to their specific situation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Business Segment */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-foreground">
            <Building2 className="w-4 h-4 text-muted-foreground" />
            Business Segment
          </Label>
          <Select
            value={profile.type}
            onValueChange={(value: CustomerProfile['type']) => onUpdate({ type: value })}
          >
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small-business" className="py-3">
                <div className="flex flex-col items-start">
                  <span>Small Business</span>
                  <span className="text-xs text-muted-foreground">1-50 employees, every dollar counts</span>
                </div>
              </SelectItem>
              <SelectItem value="mid-market" className="py-3">
                <div className="flex flex-col items-start">
                  <span>Mid-Market</span>
                  <span className="text-xs text-muted-foreground">51-500 employees, scaling operations</span>
                </div>
              </SelectItem>
              <SelectItem value="enterprise" className="py-3">
                <div className="flex flex-col items-start">
                  <span>Enterprise</span>
                  <span className="text-xs text-muted-foreground">500+ employees, business-grade needs</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-foreground">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
            Industry
          </Label>
          <Select
            value={profile.industry}
            onValueChange={(value) => onUpdate({ industry: value })}
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {industryOptions.map(industry => (
                <SelectItem key={industry.id} value={industry.id}>{industry.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Business Description */}
        <div className="space-y-2 md:col-span-2">
          <Label className="flex items-center gap-2 text-foreground">
            <Store className="w-4 h-4 text-muted-foreground" />
            What kind of business?
            <span className="text-xs text-muted-foreground font-normal">(optional)</span>
          </Label>
          <Input
            value={profile.businessDescription || ''}
            onChange={(e) => onUpdate({ businessDescription: e.target.value.slice(0, 100) })}
            placeholder="e.g., donut shop, dental practice, auto body shop"
            className="bg-background"
            maxLength={100}
          />
          <p className="text-xs text-muted-foreground">
            Being specific helps us tailor the conversation to their actual business
          </p>
        </div>

        {/* Employee Count */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-foreground">
            <Users className="w-4 h-4 text-muted-foreground" />
            Employee Count
          </Label>
          <Select
            value={profile.employeeCount}
            onValueChange={(value: CustomerProfile['employeeCount']) => onUpdate({ employeeCount: value })}
          >
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1-10 Employees</SelectItem>
              <SelectItem value="11-50">11-50 Employees</SelectItem>
              <SelectItem value="51-200">51-200 Employees</SelectItem>
              <SelectItem value="201-500">201-500 Employees</SelectItem>
              <SelectItem value="500+">500+ Employees</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Number of Locations */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-foreground">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            Number of Locations
          </Label>
          <Select
            value={profile.locations}
            onValueChange={(value: CustomerProfile['locations']) => onUpdate({ locations: value })}
          >
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Single Location</SelectItem>
              <SelectItem value="2-5">2-5 Locations</SelectItem>
              <SelectItem value="6-20">6-20 Locations</SelectItem>
              <SelectItem value="20+">20+ Locations</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
