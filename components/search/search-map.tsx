"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  Bed, 
  Bath, 
  X, 
  ZoomIn, 
  ZoomOut, 
  Locate,
  Layers,
  List,
  ChevronUp
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SearchFilters } from "./search-filters"
import { SearchResults } from "./search-results"

// Mock pin data with coordinates
const mapPins = [
  { id: "1", lat: 41.9216, lng: -87.6513, rent: 1200, title: "Sunny 2BR Apartment in Lincoln Park", bedrooms: 2, bathrooms: 1, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop", status: "available" },
  { id: "2", lat: 41.8567, lng: -87.6686, rent: 850, title: "Modern Studio in Pilsen", bedrooms: 0, bathrooms: 1, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop", status: "waitlist-open" },
  { id: "3", lat: 41.8815, lng: -87.7462, rent: 1450, title: "Spacious 3BR Family Home", bedrooms: 3, bathrooms: 2, image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop", status: "available" },
  { id: "4", lat: 41.9438, lng: -87.6491, rent: 975, title: "Cozy 1BR Near Transit", bedrooms: 1, bathrooms: 1, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop", status: "waitlist-open" },
  { id: "5", lat: 42.0087, lng: -87.6614, rent: 1100, title: "Updated 2BR in Rogers Park", bedrooms: 2, bathrooms: 1, image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop", status: "coming-soon" },
]

export function SearchMap() {
  const [selectedPin, setSelectedPin] = useState<typeof mapPins[0] | null>(null)
  const [zoom, setZoom] = useState(12)
  const [mobileListOpen, setMobileListOpen] = useState(false)

  // Convert lat/lng to percentage positions on our map image
  const getPosition = (lat: number, lng: number) => {
    // Chicago area bounds (approximate)
    const minLat = 41.65
    const maxLat = 42.1
    const minLng = -87.95
    const maxLng = -87.5

    const x = ((lng - minLng) / (maxLng - minLng)) * 100
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100

    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) }
  }

  return (
    <div className="relative h-full w-full">
      {/* Map Background - Styled placeholder */}
      <div className="absolute inset-0 bg-[#e8e4dc]">
        {/* Grid overlay for map feel */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, #c5c0b8 1px, transparent 1px),
              linear-gradient(to bottom, #c5c0b8 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Major road lines */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Horizontal roads */}
          <line x1="0" y1="30" x2="100" y2="30" stroke="#d4cfc5" strokeWidth="0.8" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#d4cfc5" strokeWidth="1" />
          <line x1="0" y1="70" x2="100" y2="70" stroke="#d4cfc5" strokeWidth="0.8" />
          {/* Vertical roads */}
          <line x1="25" y1="0" x2="25" y2="100" stroke="#d4cfc5" strokeWidth="0.8" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="#d4cfc5" strokeWidth="1" />
          <line x1="75" y1="0" x2="75" y2="100" stroke="#d4cfc5" strokeWidth="0.8" />
          {/* Diagonal (highway feel) */}
          <line x1="0" y1="100" x2="60" y2="20" stroke="#bdb8ad" strokeWidth="1.5" />
        </svg>

        {/* Lake Michigan representation (right side) */}
        <div className="absolute right-0 top-0 h-full w-1/4 bg-[#b8d4e3] opacity-40" />
        
        {/* Parks/green areas */}
        <div className="absolute left-[15%] top-[25%] h-[8%] w-[12%] rounded-lg bg-[#c5d4b8] opacity-50" />
        <div className="absolute left-[60%] top-[45%] h-[10%] w-[8%] rounded-lg bg-[#c5d4b8] opacity-50" />
      </div>

      {/* Map Pins */}
      {mapPins.map((pin) => {
        const pos = getPosition(pin.lat, pin.lng)
        return (
          <button
            key={pin.id}
            className={`absolute z-10 transform -translate-x-1/2 -translate-y-full transition-all duration-200 hover:z-20 hover:scale-110 ${
              selectedPin?.id === pin.id ? "z-20 scale-110" : ""
            }`}
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            onClick={() => setSelectedPin(pin)}
          >
            <div className={`flex items-center gap-1 rounded-full px-2 py-1 shadow-lg ${
              pin.status === "available" 
                ? "bg-primary text-primary-foreground" 
                : pin.status === "waitlist-open"
                ? "bg-amber-500 text-white"
                : "bg-muted text-muted-foreground"
            }`}>
              <span className="text-xs font-semibold">${pin.rent}</span>
            </div>
            <div className={`mx-auto h-2 w-2 -mt-0.5 rotate-45 ${
              pin.status === "available" 
                ? "bg-primary" 
                : pin.status === "waitlist-open"
                ? "bg-amber-500"
                : "bg-muted"
            }`} />
          </button>
        )
      })}

      {/* Selected Pin Popup */}
      {selectedPin && (
        <div
          className="absolute z-30 w-72 transform -translate-x-1/2"
          style={{
            left: `${getPosition(selectedPin.lat, selectedPin.lng).x}%`,
            top: `${getPosition(selectedPin.lat, selectedPin.lng).y - 8}%`,
          }}
        >
          <Card className="overflow-hidden shadow-xl">
            <CardContent className="p-0">
              <div className="relative">
                <Image
                  src={selectedPin.image}
                  alt={selectedPin.title}
                  width={288}
                  height={160}
                  className="h-32 w-full object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-7 w-7 rounded-full bg-background/80 hover:bg-background"
                  onClick={() => setSelectedPin(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Badge 
                  className={`absolute left-2 top-2 ${
                    selectedPin.status === "available" 
                      ? "bg-green-100 text-green-800" 
                      : selectedPin.status === "waitlist-open"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {selectedPin.status === "available" 
                    ? "Available" 
                    : selectedPin.status === "waitlist-open"
                    ? "Waitlist Open"
                    : "Coming Soon"}
                </Badge>
              </div>
              <div className="p-3">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="line-clamp-1 text-sm font-semibold text-foreground">
                    {selectedPin.title}
                  </h3>
                  <span className="shrink-0 text-sm font-bold text-primary">
                    ${selectedPin.rent}/mo
                  </span>
                </div>
                <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Bed className="h-3 w-3" />
                    {selectedPin.bedrooms === 0 ? "Studio" : `${selectedPin.bedrooms} BR`}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="h-3 w-3" />
                    {selectedPin.bathrooms} BA
                  </span>
                </div>
                <Link href={`/property/${selectedPin.id}`}>
                  <Button size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute right-4 top-4 flex flex-col gap-2">
        <Button variant="secondary" size="icon" className="h-10 w-10 shadow-md" onClick={() => setZoom(z => Math.min(z + 1, 18))}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" className="h-10 w-10 shadow-md" onClick={() => setZoom(z => Math.max(z - 1, 8))}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" className="h-10 w-10 shadow-md">
          <Locate className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" className="h-10 w-10 shadow-md">
          <Layers className="h-4 w-4" />
        </Button>
      </div>

      {/* Mobile List Toggle */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:hidden">
        <Sheet open={mobileListOpen} onOpenChange={setMobileListOpen}>
          <SheetTrigger asChild>
            <Button className="gap-2 shadow-lg">
              <List className="h-4 w-4" />
              View List
              <ChevronUp className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] p-0">
            <SheetHeader className="border-b border-border p-4">
              <SheetTitle>Search Results</SheetTitle>
            </SheetHeader>
            <div className="flex h-[calc(85vh-60px)] flex-col overflow-hidden">
              <SearchFilters />
              <SearchResults />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 hidden rounded-lg border border-border bg-card p-3 shadow-md lg:block">
        <p className="mb-2 text-xs font-medium text-foreground">Legend</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-amber-500" />
            <span className="text-xs text-muted-foreground">Waitlist Open</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-muted" />
            <span className="text-xs text-muted-foreground">Coming Soon</span>
          </div>
        </div>
      </div>

      {/* Zoom Level Indicator */}
      <div className="absolute bottom-4 right-4 hidden rounded-md bg-card px-2 py-1 text-xs text-muted-foreground shadow-sm lg:block">
        Zoom: {zoom}x
      </div>
    </div>
  )
}
