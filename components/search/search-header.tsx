"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { 
  SlidersHorizontal, 
  MapPin, 
  ChevronDown,
  X,
  DollarSign,
  Bed,
  Accessibility,
  Shield
} from "lucide-react"

type Filters = {
  minRent: number
  maxRent: number
  bedrooms: string
  bathrooms: string
  programs: string[]
  status: string
}

interface SearchHeaderProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  propertyCount: number
  searchLocation: string
  onLocationSearch: (location: string) => void
}

const programs = [
  "Section 8",
  "HCV",
  "LIHTC",
  "Public Housing",
  "PBRA",
  "HOME",
  "RAD",
]

const accessibilityOptions = [
  "wheelchairAccessible",
  "hearingAccessible",
  "visualAccessible",
  "mobilityFeatures",
]

export function SearchHeader({ filters, onFiltersChange, propertyCount, searchLocation, onLocationSearch }: SearchHeaderProps) {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState(searchLocation)
  const [priceRange, setPriceRange] = useState([filters.minRent, filters.maxRent])
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>(filters.programs)
  const [selectedAccessibility, setSelectedAccessibility] = useState<string[]>([])

  const activeFilterCount = [
    filters.bedrooms !== "any" ? 1 : 0,
    filters.bathrooms !== "any" ? 1 : 0,
    filters.minRent > 0 || filters.maxRent < 5000 ? 1 : 0,
    filters.programs.length > 0 ? 1 : 0,
    filters.status !== "all" ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

  return (
    <div className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center gap-3 p-3">
        {/* Location Search */}
        <form 
          className="relative flex-1 max-w-md"
          onSubmit={(e) => {
            e.preventDefault()
            onLocationSearch(searchQuery)
          }}
        >
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onBlur={() => onLocationSearch(searchQuery)}
            placeholder={t("searchPlaceholder")}
            className="pl-9 pr-4 h-10 bg-background"
          />
        </form>

        {/* Quick Filters */}
        <div className="hidden md:flex items-center gap-2">
          {/* Price */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 h-10">
                <DollarSign className="h-4 w-4" />
                {t("price")}
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{t("priceRange")}</h4>
                  <span className="text-sm text-muted-foreground">
                    ${priceRange[0]} - ${priceRange[1]}
                  </span>
                </div>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={5000}
                  step={50}
                  className="py-4"
                />
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Label className="text-xs text-muted-foreground">{t("minPrice")}</Label>
                    <Input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="h-9"
                    />
                  </div>
                  <div className="flex-1">
                    <Label className="text-xs text-muted-foreground">{t("maxPrice")}</Label>
                    <Input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="h-9"
                    />
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  size="sm"
                  onClick={() => onFiltersChange({ ...filters, minRent: priceRange[0], maxRent: priceRange[1] })}
                >
                  {t("apply")}
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Beds & Baths */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 h-10">
                <Bed className="h-4 w-4" />
                {t("bedsAndBaths")}
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72" align="start">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">{t("bedrooms")}</Label>
                  <div className="flex gap-1 mt-2">
                    {["any", "0", "1", "2", "3", "4+"].map((bed) => (
                      <Button
                        key={bed}
                        variant={filters.bedrooms === bed ? "default" : "outline"}
                        size="sm"
                        className="flex-1 h-9"
                        onClick={() => onFiltersChange({ ...filters, bedrooms: bed })}
                      >
                        {bed === "any" ? t("anyBeds") : bed === "0" ? t("studio") : bed}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">{t("bathrooms")}</Label>
                  <div className="flex gap-1 mt-2">
                    {["any", "1", "2", "3+"].map((bath) => (
                      <Button
                        key={bath}
                        variant={filters.bathrooms === bath ? "default" : "outline"}
                        size="sm"
                        className="flex-1 h-9"
                        onClick={() => onFiltersChange({ ...filters, bathrooms: bath })}
                      >
                        {bath === "any" ? t("anyBaths") : bath}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Housing Programs */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 h-10">
                <Shield className="h-4 w-4" />
                {t("programs")}
                {selectedPrograms.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                    {selectedPrograms.length}
                  </Badge>
                )}
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64" align="start">
              <div className="space-y-3">
                <h4 className="font-medium">{t("programs")}</h4>
                <div className="space-y-2">
                  {programs.map((program) => (
                    <label
                      key={program}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedPrograms.includes(program)}
                        onCheckedChange={(checked) => {
                          const newPrograms = checked
                            ? [...selectedPrograms, program]
                            : selectedPrograms.filter((p) => p !== program)
                          setSelectedPrograms(newPrograms)
                          onFiltersChange({ ...filters, programs: newPrograms })
                        }}
                      />
                      <span className="text-sm">{program}</span>
                    </label>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Accessibility */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 h-10">
                <Accessibility className="h-4 w-4" />
                {t("accessibility")}
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64" align="start">
              <div className="space-y-3">
                <h4 className="font-medium">{t("accessibility")}</h4>
                <div className="space-y-2">
                  {accessibilityOptions.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedAccessibility.includes(option)}
                        onCheckedChange={(checked) => {
                          setSelectedAccessibility(
                            checked
                              ? [...selectedAccessibility, option]
                              : selectedAccessibility.filter((o) => o !== option)
                          )
                        }}
                      />
                      <span className="text-sm">{t(option)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Status */}
          <Select
            value={filters.status}
            onValueChange={(value) => onFiltersChange({ ...filters, status: value })}
          >
            <SelectTrigger className="w-[160px] h-10">
              <SelectValue placeholder={t("available")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("viewAll")}</SelectItem>
              <SelectItem value="available">{t("available")}</SelectItem>
              <SelectItem value="waitlist-open">{t("waitlistOpen")}</SelectItem>
              <SelectItem value="coming-soon">{t("comingSoon")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Mobile Filters Button */}
        <Button variant="outline" size="sm" className="md:hidden gap-2 h-10">
          <SlidersHorizontal className="h-4 w-4" />
          {t("filters")}
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="h-5 px-1.5">
              {activeFilterCount}
            </Badge>
          )}
        </Button>

        {/* All Filters Button */}
        <Button variant="outline" size="sm" className="hidden md:flex gap-2 h-10">
          <SlidersHorizontal className="h-4 w-4" />
          {t("moreFilters")}
        </Button>

        {/* Save Search */}
        <Button variant="ghost" size="sm" className="hidden lg:flex h-10">
          {t("saveProperty")}
        </Button>
      </div>

      {/* Active Filters Bar */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 px-3 pb-3 flex-wrap">
          <span className="text-sm text-muted-foreground">{t("filters")}:</span>
          {filters.bedrooms !== "any" && (
            <Badge variant="secondary" className="gap-1">
              {filters.bedrooms === "0" ? t("studio") : `${filters.bedrooms} ${t("beds")}`}
              <button onClick={() => onFiltersChange({ ...filters, bedrooms: "any" })}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {(filters.minRent > 0 || filters.maxRent < 5000) && (
            <Badge variant="secondary" className="gap-1">
              ${filters.minRent} - ${filters.maxRent}
              <button onClick={() => onFiltersChange({ ...filters, minRent: 0, maxRent: 5000 })}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedPrograms.map((program) => (
            <Badge key={program} variant="secondary" className="gap-1">
              {program}
              <button onClick={() => {
                const newPrograms = selectedPrograms.filter((p) => p !== program)
                setSelectedPrograms(newPrograms)
                onFiltersChange({ ...filters, programs: newPrograms })
              }}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <button
            className="text-sm text-primary hover:underline"
            onClick={() => {
              setSelectedPrograms([])
              setPriceRange([0, 5000])
              onFiltersChange({
                minRent: 0,
                maxRent: 5000,
                bedrooms: "any",
                bathrooms: "any",
                programs: [],
                status: "all",
              })
            }}
          >
            {t("clearAll")}
          </button>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between px-3 pb-2 border-t border-border pt-2">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{propertyCount}</span> {t("propertiesFound")}
        </p>
        <Select defaultValue="recommended">
          <SelectTrigger className="w-[160px] h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">{t("relevance")}</SelectItem>
            <SelectItem value="price-low">{t("priceLowHigh")}</SelectItem>
            <SelectItem value="price-high">{t("priceHighLow")}</SelectItem>
            <SelectItem value="newest">{t("newest")}</SelectItem>
            <SelectItem value="sqft">{t("squareFeet")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
