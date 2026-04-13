"use client"

import { useState, useEffect, useRef } from "react"
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
  ChevronUp,
  Navigation,
  Maximize2,
  Filter
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Extended mock data with more properties
const mapPins = [
  { id: "1", lat: 41.9216, lng: -87.6513, rent: 1200, title: "Sunny 2BR Apartment in Lincoln Park", bedrooms: 2, bathrooms: 1, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop", status: "available", address: "2450 N Lincoln Ave", programs: ["Section 8", "LIHTC"] },
  { id: "2", lat: 41.8567, lng: -87.6686, rent: 850, title: "Modern Studio in Pilsen", bedrooms: 0, bathrooms: 1, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop", status: "waitlist-open", address: "1856 S Ashland Ave", programs: ["HCV"] },
  { id: "3", lat: 41.8815, lng: -87.7462, rent: 1450, title: "Spacious 3BR Family Home", bedrooms: 3, bathrooms: 2, image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop", status: "available", address: "5234 W Madison St", programs: ["Public Housing"] },
  { id: "4", lat: 41.9438, lng: -87.6491, rent: 975, title: "Cozy 1BR Near Transit", bedrooms: 1, bathrooms: 1, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop", status: "waitlist-open", address: "3721 N Halsted St", programs: ["Section 8", "PBRA"] },
  { id: "5", lat: 42.0087, lng: -87.6614, rent: 1100, title: "Updated 2BR in Rogers Park", bedrooms: 2, bathrooms: 1, image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop", status: "coming-soon", address: "7432 N Sheridan Rd", programs: ["LIHTC"] },
  { id: "6", lat: 41.7943, lng: -87.5907, rent: 925, title: "Affordable 1BR in South Shore", bedrooms: 1, bathrooms: 1, image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&h=300&fit=crop", status: "available", address: "7156 S Shore Dr", programs: ["HCV", "PBRA"] },
  { id: "7", lat: 41.8827, lng: -87.6233, rent: 1650, title: "Luxury 2BR Near Loop", bedrooms: 2, bathrooms: 2, image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400&h=300&fit=crop", status: "available", address: "1200 S Michigan Ave", programs: ["LIHTC"] },
  { id: "8", lat: 41.9103, lng: -87.6779, rent: 1050, title: "Charming 1BR in Bucktown", bedrooms: 1, bathrooms: 1, image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=400&h=300&fit=crop", status: "waitlist-open", address: "2100 N Damen Ave", programs: ["Section 8"] },
  { id: "9", lat: 41.8525, lng: -87.6324, rent: 1325, title: "Modern 2BR in Bridgeport", bedrooms: 2, bathrooms: 1, image: "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=400&h=300&fit=crop", status: "available", address: "3345 S Halsted St", programs: ["Public Housing", "LIHTC"] },
  { id: "10", lat: 41.9676, lng: -87.6592, rent: 775, title: "Budget Studio in Edgewater", bedrooms: 0, bathrooms: 1, image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop", status: "available", address: "5600 N Broadway", programs: ["HCV"] },
]

const mapStyles = [
  { id: "default", label: "Default", color: "#e8e4dc" },
  { id: "satellite", label: "Satellite", color: "#2d4a3e" },
  { id: "terrain", label: "Terrain", color: "#d4c4a8" },
]

export function SearchMap() {
  const [selectedPin, setSelectedPin] = useState<typeof mapPins[0] | null>(null)
  const [hoveredPin, setHoveredPin] = useState<string | null>(null)
  const [zoom, setZoom] = useState(12)
  const [mobileListOpen, setMobileListOpen] = useState(false)
  const [mapStyle, setMapStyle] = useState("default")
  const [center, setCenter] = useState({ lat: 41.8781, lng: -87.6298 })
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showClusters, setShowClusters] = useState(true)
  const mapRef = useRef<HTMLDivElement>(null)

  // Convert lat/lng to percentage positions on our map
  const getPosition = (lat: number, lng: number) => {
    const scale = Math.pow(2, zoom - 10)
    const minLat = center.lat - (0.3 / scale)
    const maxLat = center.lat + (0.3 / scale)
    const minLng = center.lng - (0.4 / scale)
    const maxLng = center.lng + (0.4 / scale)

    const x = ((lng - minLng) / (maxLng - minLng)) * 100
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100

    return { 
      x: Math.max(-10, Math.min(110, x)), 
      y: Math.max(-10, Math.min(110, y)),
      visible: x >= -10 && x <= 110 && y >= -10 && y <= 110
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedPin) {
        setSelectedPin(null)
      }
      if (e.key === "+" || e.key === "=") {
        setZoom(z => Math.min(z + 1, 18))
      }
      if (e.key === "-") {
        setZoom(z => Math.max(z - 1, 8))
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedPin])

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        setZoom(14)
      })
    }
  }

  const getMapBackground = () => {
    switch (mapStyle) {
      case "satellite":
        return "bg-[#1a3a2f]"
      case "terrain":
        return "bg-[#e5dcc8]"
      default:
        return "bg-[#f0ede6]"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-emerald-500 shadow-emerald-500/30"
      case "waitlist-open":
        return "bg-amber-500 shadow-amber-500/30"
      default:
        return "bg-slate-400 shadow-slate-400/30"
    }
  }

  return (
    <div 
      ref={mapRef}
      className={`relative h-full w-full overflow-hidden ${isFullscreen ? "fixed inset-0 z-50" : ""}`}
    >
      {/* Map Background with realistic styling */}
      <div className={`absolute inset-0 ${getMapBackground()} transition-colors duration-500`}>
        {/* Water bodies */}
        <div className={`absolute right-0 top-0 h-full w-[30%] ${
          mapStyle === "satellite" ? "bg-[#1a4d5c]/60" : "bg-[#a8d4e6]/40"
        } transition-colors duration-500`}>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-current opacity-50" />
        </div>

        {/* Grid pattern for streets */}
        <svg className="absolute inset-0 h-full w-full opacity-20" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={mapStyle === "satellite" ? "#ffffff" : "#9ca3af"} strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Major roads */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="50" y1="0" x2="50" y2="100" stroke={mapStyle === "satellite" ? "#ffffff30" : "#d1d5db"} strokeWidth="0.8" />
          <line x1="0" y1="50" x2="70" y2="50" stroke={mapStyle === "satellite" ? "#ffffff30" : "#d1d5db"} strokeWidth="0.8" />
          <line x1="25" y1="0" x2="25" y2="100" stroke={mapStyle === "satellite" ? "#ffffff20" : "#e5e7eb"} strokeWidth="0.5" />
          <line x1="75" y1="0" x2="60" y2="100" stroke={mapStyle === "satellite" ? "#ffffff20" : "#e5e7eb"} strokeWidth="0.5" />
          <path d="M 0 80 Q 30 60 60 40" fill="none" stroke={mapStyle === "satellite" ? "#ffffff25" : "#d1d5db"} strokeWidth="1" />
        </svg>

        {/* Parks / green areas */}
        {mapStyle !== "satellite" && (
          <>
            <div className="absolute left-[15%] top-[20%] h-[12%] w-[15%] rounded-2xl bg-[#b8d4a8]/50" />
            <div className="absolute left-[45%] top-[35%] h-[8%] w-[10%] rounded-xl bg-[#b8d4a8]/40" />
            <div className="absolute left-[20%] top-[60%] h-[10%] w-[12%] rounded-2xl bg-[#b8d4a8]/45" />
          </>
        )}

        {/* Downtown area indicator */}
        <div className="absolute left-[45%] top-[45%] h-[15%] w-[12%] rounded-lg border border-dashed border-primary/20 bg-primary/5" />
      </div>

      {/* Map Pins with enhanced styling */}
      {mapPins.map((pin) => {
        const pos = getPosition(pin.lat, pin.lng)
        if (!pos.visible) return null
        
        const isSelected = selectedPin?.id === pin.id
        const isHovered = hoveredPin === pin.id
        
        return (
          <button
            key={pin.id}
            className={`absolute z-10 transform -translate-x-1/2 -translate-y-full transition-all duration-300 ease-out ${
              isSelected || isHovered ? "z-20 scale-125" : "hover:scale-110"
            }`}
            style={{ 
              left: `${pos.x}%`, 
              top: `${pos.y}%`,
            }}
            onClick={() => setSelectedPin(isSelected ? null : pin)}
            onMouseEnter={() => setHoveredPin(pin.id)}
            onMouseLeave={() => setHoveredPin(null)}
            aria-label={`${pin.title}, $${pin.rent} per month`}
          >
            {/* Pin marker */}
            <div className={`relative ${isSelected ? "animate-bounce" : ""}`}>
              <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 shadow-lg transition-all ${
                getStatusColor(pin.status)
              } ${isSelected || isHovered ? "ring-2 ring-white ring-offset-2" : ""}`}>
                <span className="text-xs font-bold text-white">${pin.rent}</span>
              </div>
              {/* Pin point */}
              <div className={`absolute left-1/2 top-full -ml-1.5 h-0 w-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent ${
                pin.status === "available" 
                  ? "border-t-emerald-500" 
                  : pin.status === "waitlist-open"
                  ? "border-t-amber-500"
                  : "border-t-slate-400"
              }`} />
              {/* Pulse effect for available */}
              {pin.status === "available" && !isSelected && (
                <div className="absolute -inset-1 animate-ping rounded-full bg-emerald-400 opacity-20" />
              )}
            </div>
          </button>
        )
      })}

      {/* Selected Pin Popup - Enhanced */}
      {selectedPin && (
        <div
          className="absolute z-30 w-80 animate-in fade-in slide-in-from-bottom-2 duration-300"
          style={{
            left: `${Math.max(10, Math.min(getPosition(selectedPin.lat, selectedPin.lng).x, 70))}%`,
            top: `${Math.max(5, getPosition(selectedPin.lat, selectedPin.lng).y - 5)}%`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <Card className="overflow-hidden border-0 shadow-2xl">
            <CardContent className="p-0">
              <div className="relative">
                <Image
                  src={selectedPin.image}
                  alt={selectedPin.title}
                  width={320}
                  height={180}
                  className="h-40 w-full object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
                  onClick={() => setSelectedPin(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Badge 
                  className={`absolute left-3 top-3 ${
                    selectedPin.status === "available" 
                      ? "bg-emerald-500 text-white" 
                      : selectedPin.status === "waitlist-open"
                      ? "bg-amber-500 text-white"
                      : "bg-slate-500 text-white"
                  }`}
                >
                  {selectedPin.status === "available" 
                    ? "Available Now" 
                    : selectedPin.status === "waitlist-open"
                    ? "Waitlist Open"
                    : "Coming Soon"}
                </Badge>
                {/* Gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-lg font-bold text-white">${selectedPin.rent}<span className="text-sm font-normal">/mo</span></p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="mb-1 line-clamp-1 font-semibold text-foreground">
                  {selectedPin.title}
                </h3>
                <p className="mb-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {selectedPin.address}
                </p>
                <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Bed className="h-4 w-4" />
                    {selectedPin.bedrooms === 0 ? "Studio" : `${selectedPin.bedrooms} Bed`}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Bath className="h-4 w-4" />
                    {selectedPin.bathrooms} Bath
                  </span>
                </div>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {selectedPin.programs.map((program) => (
                    <Badge key={program} variant="secondary" className="text-xs">
                      {program}
                    </Badge>
                  ))}
                </div>
                <Link href={`/property/${selectedPin.id}`}>
                  <Button className="w-full gap-2">
                    View Full Details
                    <Navigation className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Map Controls - Enhanced */}
      <div className="absolute right-4 top-4 flex flex-col gap-2">
        <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 rounded-none border-b border-border"
            onClick={() => setZoom(z => Math.min(z + 1, 18))}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 rounded-none"
            onClick={() => setZoom(z => Math.max(z - 1, 8))}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>
        
        <Button 
          variant="secondary" 
          size="icon" 
          className="h-10 w-10 shadow-lg"
          onClick={handleLocateMe}
        >
          <Locate className="h-4 w-4" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="h-10 w-10 shadow-lg">
              <Layers className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            {mapStyles.map((style) => (
              <DropdownMenuItem
                key={style.id}
                onClick={() => setMapStyle(style.id)}
                className={mapStyle === style.id ? "bg-accent" : ""}
              >
                <div 
                  className="mr-2 h-4 w-4 rounded border"
                  style={{ backgroundColor: style.color }}
                />
                {style.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button 
          variant="secondary" 
          size="icon" 
          className="h-10 w-10 shadow-lg"
          onClick={() => setIsFullscreen(!isFullscreen)}
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Results count badge */}
      <div className="absolute left-4 top-4 hidden lg:block">
        <Badge variant="secondary" className="gap-2 px-4 py-2 text-sm shadow-lg">
          <MapPin className="h-4 w-4 text-primary" />
          {mapPins.length} properties in this area
        </Badge>
      </div>

      {/* Mobile List Toggle */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:hidden">
        <Sheet open={mobileListOpen} onOpenChange={setMobileListOpen}>
          <SheetTrigger asChild>
            <Button className="gap-2 shadow-xl">
              <List className="h-4 w-4" />
              View {mapPins.length} Properties
              <ChevronUp className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] p-0">
            <SheetHeader className="border-b border-border p-4">
              <SheetTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                Search Results
              </SheetTitle>
            </SheetHeader>
            <div className="flex h-[calc(85vh-60px)] flex-col overflow-hidden">
              <SearchFilters />
              <SearchResults />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Legend - Enhanced */}
      <div className="absolute bottom-4 left-4 hidden rounded-xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur-sm lg:block">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Map Legend</p>
        <div className="space-y-2.5">
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/30" />
            <span className="text-sm text-foreground">Available Now</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full bg-amber-500 shadow-sm shadow-amber-500/30" />
            <span className="text-sm text-foreground">Waitlist Open</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full bg-slate-400 shadow-sm shadow-slate-400/30" />
            <span className="text-sm text-foreground">Coming Soon</span>
          </div>
        </div>
      </div>

      {/* Zoom Level & Coordinates */}
      <div className="absolute bottom-4 right-4 hidden items-center gap-3 lg:flex">
        <Badge variant="outline" className="bg-card/95 backdrop-blur-sm">
          Zoom: {zoom}x
        </Badge>
      </div>

      {/* Fullscreen exit button */}
      {isFullscreen && (
        <Button
          variant="secondary"
          className="absolute left-4 top-4 z-50 gap-2 shadow-lg"
          onClick={() => setIsFullscreen(false)}
        >
          <X className="h-4 w-4" />
          Exit Fullscreen
        </Button>
      )}
    </div>
  )
}
