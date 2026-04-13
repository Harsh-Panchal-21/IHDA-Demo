"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Search, RotateCcw, SlidersHorizontal } from "lucide-react"

const subsidyPrograms = [
  { id: "section8", label: "Section 8 Vouchers" },
  { id: "lihtc", label: "Low Income Housing Tax Credit" },
  { id: "public", label: "Public Housing" },
  { id: "hcv", label: "Housing Choice Voucher" },
  { id: "pbra", label: "Project-Based Rental Assistance" },
]

const accessibilityFeatures = [
  { id: "wheelchair", label: "Wheelchair Accessible" },
  { id: "elevator", label: "Elevator Access" },
  { id: "grab-bars", label: "Grab Bars" },
  { id: "roll-in-shower", label: "Roll-in Shower" },
  { id: "visual-alerts", label: "Visual Alerts" },
  { id: "hearing-impaired", label: "Hearing Impaired Features" },
]

export function SearchFilters() {
  const [location, setLocation] = useState("")
  const [rentRange, setRentRange] = useState([0, 2000])
  const [bedrooms, setBedrooms] = useState("")
  const [bathrooms, setBathrooms] = useState("")
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([])
  const [selectedAccessibility, setSelectedAccessibility] = useState<string[]>([])
  const [availability, setAvailability] = useState("")

  const handleProgramChange = (programId: string, checked: boolean) => {
    if (checked) {
      setSelectedPrograms([...selectedPrograms, programId])
    } else {
      setSelectedPrograms(selectedPrograms.filter((id) => id !== programId))
    }
  }

  const handleAccessibilityChange = (featureId: string, checked: boolean) => {
    if (checked) {
      setSelectedAccessibility([...selectedAccessibility, featureId])
    } else {
      setSelectedAccessibility(selectedAccessibility.filter((id) => id !== featureId))
    }
  }

  const resetFilters = () => {
    setLocation("")
    setRentRange([0, 2000])
    setBedrooms("")
    setBathrooms("")
    setSelectedPrograms([])
    setSelectedAccessibility([])
    setAvailability("")
  }

  return (
    <div className="flex flex-col border-b border-border">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-2 text-muted-foreground">
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      {/* Search Input */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="City, county, or ZIP code"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Filter Sections */}
      <div className="max-h-[calc(100vh-400px)] overflow-y-auto">
        <Accordion type="multiple" defaultValue={["rent", "rooms", "programs"]} className="px-4">
          {/* Rent Range */}
          <AccordionItem value="rent">
            <AccordionTrigger className="text-sm font-medium">
              Rent Range
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-4">
                <Slider
                  value={rentRange}
                  onValueChange={setRentRange}
                  max={3000}
                  step={50}
                  className="mt-2"
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">${rentRange[0]}</span>
                  <span className="text-muted-foreground">${rentRange[1]}+</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Bedrooms & Bathrooms */}
          <AccordionItem value="rooms">
            <AccordionTrigger className="text-sm font-medium">
              Bedrooms & Bathrooms
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Bedrooms</Label>
                  <Select value={bedrooms} onValueChange={setBedrooms}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="1">1 BR</SelectItem>
                      <SelectItem value="2">2 BR</SelectItem>
                      <SelectItem value="3">3 BR</SelectItem>
                      <SelectItem value="4">4+ BR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Bathrooms</Label>
                  <Select value={bathrooms} onValueChange={setBathrooms}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1 BA</SelectItem>
                      <SelectItem value="1.5">1.5 BA</SelectItem>
                      <SelectItem value="2">2 BA</SelectItem>
                      <SelectItem value="2.5">2.5+ BA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Subsidy Programs */}
          <AccordionItem value="programs">
            <AccordionTrigger className="text-sm font-medium">
              Subsidy Programs
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-3">
                {subsidyPrograms.map((program) => (
                  <div key={program.id} className="flex items-center gap-3">
                    <Checkbox
                      id={program.id}
                      checked={selectedPrograms.includes(program.id)}
                      onCheckedChange={(checked) => 
                        handleProgramChange(program.id, checked as boolean)
                      }
                    />
                    <Label htmlFor={program.id} className="text-sm cursor-pointer">
                      {program.label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Accessibility */}
          <AccordionItem value="accessibility">
            <AccordionTrigger className="text-sm font-medium">
              Accessibility Features
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-3">
                {accessibilityFeatures.map((feature) => (
                  <div key={feature.id} className="flex items-center gap-3">
                    <Checkbox
                      id={feature.id}
                      checked={selectedAccessibility.includes(feature.id)}
                      onCheckedChange={(checked) => 
                        handleAccessibilityChange(feature.id, checked as boolean)
                      }
                    />
                    <Label htmlFor={feature.id} className="text-sm cursor-pointer">
                      {feature.label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Availability */}
          <AccordionItem value="availability">
            <AccordionTrigger className="text-sm font-medium">
              Availability
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <Select value={availability} onValueChange={setAvailability}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="available">Available Now</SelectItem>
                  <SelectItem value="waitlist-open">Waitlist Open</SelectItem>
                  <SelectItem value="coming-soon">Coming Soon</SelectItem>
                </SelectContent>
              </Select>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Apply Button */}
      <div className="border-t border-border p-4">
        <Button className="w-full gap-2">
          <Search className="h-4 w-4" />
          Apply Filters
        </Button>
      </div>
    </div>
  )
}
