"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import {
  ZoomIn,
  ZoomOut,
  Layers,
  Maximize2,
  Minimize2,
  X,
  Bed,
  Bath,
  Square,
  Star,
  ChevronRight,
  MapPin,
  RotateCcw,
  Navigation
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { Property } from "@/app/search/page"

interface ZillowMapProps {
  properties: Property[]
  selectedProperty: Property | null
  hoveredProperty: string | null
  onPropertySelect: (property: Property) => void
  onPropertyHover: (propertyId: string | null) => void
}

const mapStyles = [
  { id: "streets", label: "Streets" },
  { id: "light", label: "Light" },
  { id: "satellite", label: "Satellite" },
]

const DEFAULT_CENTER = { lat: 41.8781, lng: -87.6298 } // Chicago
const DEFAULT_ZOOM = 12

export function ZillowMap({
  properties,
  selectedProperty,
  hoveredProperty,
  onPropertySelect,
  onPropertyHover,
}: ZillowMapProps) {
  const [mapStyleId, setMapStyleId] = useState("streets")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [popupProperty, setPopupProperty] = useState<Property | null>(null)
  const [zoom, setZoom] = useState(DEFAULT_ZOOM)
  const [center, setCenter] = useState(DEFAULT_CENTER)
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle hoveredProperty from list
  useEffect(() => {
    if (hoveredProperty) {
      const property = properties.find(p => p.id === hoveredProperty)
      if (property) {
        setPopupProperty(property)
        setCenter({ lat: property.lat, lng: property.lng })
      }
    }
  }, [hoveredProperty, properties])

  // Zoom controls
  const handleZoomIn = useCallback(() => {
    setZoom(z => Math.min(z + 1, 18))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom(z => Math.max(z - 1, 10))
  }, [])

  const handleReset = useCallback(() => {
    setZoom(DEFAULT_ZOOM)
    setCenter(DEFAULT_CENTER)
  }, [])

  const handleLocate = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        setZoom(15)
      })
    }
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPopupProperty(null)
        if (isFullscreen) setIsFullscreen(false)
      }
      if (e.key === "+" || e.key === "=") handleZoomIn()
      if (e.key === "-" || e.key === "_") handleZoomOut()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isFullscreen, handleZoomIn, handleZoomOut])

  // Build OpenStreetMap iframe URL
  const getMapUrl = () => {
    const bbox = 0.05 / (zoom / 12)
    const minLat = center.lat - bbox
    const maxLat = center.lat + bbox
    const minLng = center.lng - bbox * 1.5
    const maxLng = center.lng + bbox * 1.5
    
    if (mapStyleId === "satellite") {
      return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d${10000 / zoom}!2d${center.lng}!3d${center.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sus!4v1234567890`
    }
    
    return `https://www.openstreetmap.org/export/embed.html?bbox=${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}&layer=mapnik&marker=${center.lat}%2C${center.lng}`
  }

  return (
    <TooltipProvider>
      <div 
        ref={containerRef}
        className={`relative h-full w-full ${isFullscreen ? "fixed inset-0 z-50 bg-background" : ""}`}
      >
        {/* Map iframe */}
        <iframe
          src={getMapUrl()}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Map"
        />

        {/* Property Markers Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {properties.map((property) => {
            const isSelected = selectedProperty?.id === property.id
            const isHovered = hoveredProperty === property.id
            
            // Calculate approximate position based on map center and zoom
            const scale = Math.pow(2, zoom - 12)
            const dx = (property.lng - center.lng) * 500 * scale
            const dy = -(property.lat - center.lat) * 700 * scale
            
            // Check if marker is within visible bounds
            const isVisible = Math.abs(dx) < 400 && Math.abs(dy) < 300

            if (!isVisible) return null

            return (
              <button
                key={property.id}
                className={`absolute pointer-events-auto transform -translate-x-1/2 -translate-y-full transition-all duration-200 ${
                  isSelected || isHovered ? "z-30 scale-110" : "z-10 hover:z-20 hover:scale-105"
                }`}
                style={{ 
                  left: `calc(50% + ${dx}px)`,
                  top: `calc(50% + ${dy}px)`,
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  onPropertySelect(property)
                  setPopupProperty(property)
                }}
                onMouseEnter={() => {
                  onPropertyHover(property.id)
                  setPopupProperty(property)
                }}
                onMouseLeave={() => {
                  onPropertyHover(null)
                  if (!isSelected) setPopupProperty(null)
                }}
              >
                <div className="relative">
                  <div 
                    className={`flex items-center rounded-full px-3 py-1.5 font-semibold text-sm shadow-lg transition-all ${
                      property.status === "available"
                        ? isSelected || isHovered
                          ? "bg-primary text-primary-foreground"
                          : "bg-emerald-500 text-white"
                        : property.status === "waitlist-open"
                        ? isSelected || isHovered
                          ? "bg-primary text-primary-foreground"
                          : "bg-amber-500 text-white"
                        : "bg-slate-400 text-white"
                    } ${isSelected ? "ring-2 ring-white ring-offset-2 ring-offset-background" : ""}`}
                  >
                    ${property.rent >= 1000 ? `${(property.rent / 1000).toFixed(1)}k` : property.rent}
                  </div>
                  
                  <div 
                    className={`absolute left-1/2 top-full -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent transition-all ${
                      property.status === "available"
                        ? isSelected || isHovered
                          ? "border-t-primary"
                          : "border-t-emerald-500"
                        : property.status === "waitlist-open"
                        ? isSelected || isHovered
                          ? "border-t-primary"
                          : "border-t-amber-500"
                        : "border-t-slate-400"
                    }`}
                  />
                  
                  {property.status === "available" && !isSelected && !isHovered && (
                    <div className="absolute -inset-2 rounded-full bg-emerald-400/30 animate-ping" />
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Property Popup */}
        {popupProperty && (
          <PropertyPopup
            property={popupProperty}
            onClose={() => setPopupProperty(null)}
          />
        )}

        {/* Map Controls - Right Side */}
        <div className="absolute right-4 top-4 flex flex-col gap-2 z-[1000]">
          {/* Zoom Controls */}
          <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-lg">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-none border-b border-border hover:bg-muted"
                  onClick={handleZoomIn}
                  disabled={zoom >= 18}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Zoom in (+)</TooltipContent>
            </Tooltip>
            
            <div className="flex h-8 items-center justify-center bg-muted/50 text-xs font-medium text-muted-foreground">
              {zoom}x
            </div>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-none hover:bg-muted"
                  onClick={handleZoomOut}
                  disabled={zoom <= 10}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Zoom out (-)</TooltipContent>
            </Tooltip>
          </div>

          {/* Reset View */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-10 w-10 shadow-lg"
                onClick={handleReset}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Reset view</TooltipContent>
          </Tooltip>

          {/* My Location */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-10 w-10 shadow-lg"
                onClick={handleLocate}
              >
                <Navigation className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">My location</TooltipContent>
          </Tooltip>

          {/* Map Style Selector */}
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="h-10 w-10 shadow-lg">
                    <Layers className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="left">Map style</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" className="w-32">
              {mapStyles.map((style) => (
                <DropdownMenuItem
                  key={style.id}
                  onClick={() => setMapStyleId(style.id)}
                  className={mapStyleId === style.id ? "bg-accent" : ""}
                >
                  {style.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Fullscreen Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-10 w-10 shadow-lg"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-[1000]">
          <Card className="shadow-lg">
            <CardContent className="p-3">
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-emerald-500" />
                  <span className="text-muted-foreground">Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-amber-500" />
                  <span className="text-muted-foreground">Waitlist</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-slate-400" />
                  <span className="text-muted-foreground">Coming Soon</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Properties Count */}
        <div className="absolute top-4 left-4 z-[1000]">
          <Card className="shadow-lg">
            <CardContent className="px-3 py-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-medium">{properties.length}</span>
                <span className="text-muted-foreground">properties</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fullscreen Exit Button */}
        {isFullscreen && (
          <Button
            variant="secondary"
            size="sm"
            className="absolute left-4 top-16 gap-2 shadow-lg z-[1000]"
            onClick={() => setIsFullscreen(false)}
          >
            <X className="h-4 w-4" />
            Exit Fullscreen
          </Button>
        )}
      </div>
    </TooltipProvider>
  )
}

interface PropertyPopupProps {
  property: Property
  onClose: () => void
}

function PropertyPopup({ property, onClose }: PropertyPopupProps) {
  return (
    <div className="absolute left-1/2 top-4 z-[1001] w-80 -translate-x-1/2 animate-in fade-in slide-in-from-top-2 duration-200">
      <Card className="overflow-hidden border-0 shadow-2xl">
        <CardContent className="p-0">
          <div className="relative h-36">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-7 w-7 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
              <span className="text-lg font-bold text-white">
                ${property.rent.toLocaleString()}<span className="text-sm font-normal">/mo</span>
              </span>
              <div className="flex items-center gap-1 text-white text-xs">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                {property.rating}
              </div>
            </div>
          </div>

          <div className="p-3">
            <h3 className="font-semibold text-foreground line-clamp-1 mb-1">
              {property.title}
            </h3>
            <p className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
              <MapPin className="h-3 w-3" />
              {property.address}, {property.city}
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Bed className="h-3.5 w-3.5" />
                {property.bedrooms === 0 ? "Studio" : `${property.bedrooms} bd`}
              </span>
              <span className="flex items-center gap-1">
                <Bath className="h-3.5 w-3.5" />
                {property.bathrooms} ba
              </span>
              <span className="flex items-center gap-1">
                <Square className="h-3.5 w-3.5" />
                {property.sqft.toLocaleString()} sqft
              </span>
            </div>
            <Link href={`/property/${property.id}`}>
              <Button size="sm" className="w-full gap-1">
                View Details
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
