import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { TourListFilters } from '@/types/tour';
import { CalendarIcon, Filter, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TourFiltersProps {
  filters: TourListFilters;
  onFilterChange: (key: keyof TourListFilters, value: string | number | undefined) => void;
  onClearFilters: () => void;
}

export function TourFilters({ filters, onFilterChange, onClearFilters }: TourFiltersProps) {
  const hasActiveFilters = filters.search || filters.from_date || filters.to_date || 
    filters.from_price || filters.to_price || (filters.status && filters.status.length > 0);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input with Icon */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search tours..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Mobile Filter Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="sm:hidden">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 rounded-full bg-primary w-2 h-2" />
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Filter Tours</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FilterContent
                filters={filters}
                onFilterChange={onFilterChange}
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Desktop Filter Popover */}
        <div className="hidden sm:flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-2 rounded-full bg-primary w-2 h-2" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[320px] p-4" align="end">
              <FilterContent
                filters={filters}
                onFilterChange={onFilterChange}
              />
            </PopoverContent>
          </Popover>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={onClearFilters}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <FilterTag
              label={`Search: ${filters.search}`}
              onRemove={() => onFilterChange('search', undefined)}
            />
          )}
          {filters.from_date && (
            <FilterTag
              label={`From: ${new Date(filters.from_date).toLocaleDateString()}`}
              onRemove={() => onFilterChange('from_date', undefined)}
            />
          )}
          {filters.to_date && (
            <FilterTag
              label={`To: ${new Date(filters.to_date).toLocaleDateString()}`}
              onRemove={() => onFilterChange('to_date', undefined)}
            />
          )}
          {filters.from_price && (
            <FilterTag
              label={`Min Price: $${filters.from_price}`}
              onRemove={() => onFilterChange('from_price', undefined)}
            />
          )}
          {filters.to_price && (
            <FilterTag
              label={`Max Price: $${filters.to_price}`}
              onRemove={() => onFilterChange('to_price', undefined)}
            />
          )}
        </div>
      )}
    </div>
  );
}

function FilterTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-sm">
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="ml-1 text-gray-500 hover:text-gray-700"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{title}</Label>
      {children}
    </div>
  );
}

interface FilterContentProps {
  filters: TourListFilters;
  onFilterChange: (key: keyof TourListFilters, value: string | number | undefined) => void;
}

function FilterContent({
  filters,
  onFilterChange,
}: FilterContentProps) {
  const [isFromDateOpen, setIsFromDateOpen] = useState(false);
  const [isToDateOpen, setIsToDateOpen] = useState(false);

  return (
    <div className="space-y-4">
      <FilterSection title="Date Range">
        <div className="grid grid-cols-2 gap-2">
          <Popover open={isFromDateOpen} onOpenChange={setIsFromDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !filters.from_date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.from_date ? new Date(filters.from_date).toLocaleDateString() : "From"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.from_date ? new Date(filters.from_date) : undefined}
                onSelect={(date) => {
                  onFilterChange('from_date', date?.toISOString().split('T')[0]);
                  setIsFromDateOpen(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover open={isToDateOpen} onOpenChange={setIsToDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !filters.to_date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.to_date ? new Date(filters.to_date).toLocaleDateString() : "To"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.to_date ? new Date(filters.to_date) : undefined}
                onSelect={(date) => {
                  onFilterChange('to_date', date?.toISOString().split('T')[0]);
                  setIsToDateOpen(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </FilterSection>

      <Separator />

      <FilterSection title="Price Range">
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Min price"
            value={filters.from_price || ''}
            onChange={(e) => onFilterChange('from_price', Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Max price"
            value={filters.to_price || ''}
            onChange={(e) => onFilterChange('to_price', Number(e.target.value))}
          />
        </div>
      </FilterSection>
    </div>
  );
} 