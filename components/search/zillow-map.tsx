"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import {
  ZoomIn,
  ZoomOut,
  Locate,
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
  Navigation2,
  Move,
  RotateCcw
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
  { id: "streets", label: "Streets", bg: "#f8f4f0" },
  { id: "satellite", label: "Satellite", bg: "#1a3a2f" },
  { id: "light", label: "Light", bg: "#fafafa" },
]

const MIN_ZOOM = 8
const MAX_ZOOM = 18
const DEFAULT_CENTER = { lat: 41.8781, lng: -87.6298 }
const DEFAULT_ZOOM = 12

export function ZillowMap({
  properties,
  selectedProperty,
  hoveredProperty,
  onPropertySelect,
  onPropertyHover,
}: ZillowMapProps) {
  const [zoom, setZoom] = useState(DEFAULT_ZOOM)
  const [center, setCenter] = useState(DEFAULT_CENTER)
  const [mapStyle, setMapStyle] = useState("streets")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [popupProperty, setPopupProperty] = useState<Property | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [dragStartCenter, setDragStartCenter] = useState(DEFAULT_CENTER)
  
  const mapRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Calculate position for each property pin
  const getPosition = useCallback((lat: number, lng: number) => {
    const scale = Math.pow(2, zoom - 10)
    const latRange = 0.35 / scale
    const lngRange = 0.5 / scale
    
    const minLat = center.lat - latRange
    const maxLat = center.lat + latRange
    const minLng = center.lng - lngRange
    const maxLng = center.lng + lngRange

    const x = ((lng - minLng) / (maxLng - minLng)) * 100
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100

    return { 
      x: Math.max(-10, Math.min(110, x)), 
      y: Math.max(-10, Math.min(110, y)),
      visible: x >= -10 && x <= 110 && y >= -10 && y <= 110
    }
  }, [zoom, center])

  // Convert screen position to lat/lng
  const screenToLatLng = useCallback((screenX: number, screenY: number, rect: DOMRect) => {
    const scale = Math.pow(2, zoom - 10)
    const latRange = 0.35 / scale
    const lngRange = 0.5 / scale
    
    const x = (screenX - rect.left) / rect.width
    const y = (screenY - rect.top) / rect.height
    
    const lng = center.lng - lngRange + (x * 2 * lngRange)
    const lat = center.lat + latRange - (y * 2 * latRange)
    
    return { lat, lng }
  }, [zoom, center])

  // Zoom functions
  const handleZoomIn = useCallback(() => {
    setZoom(z => Math.min(z + 1, MAX_ZOOM))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom(z => Math.max(z - 1, MIN_ZOOM))
  }, [])

  const handleReset = useCallback(() => {
    setZoom(DEFAULT_ZOOM)
    setCenter(DEFAULT_CENTER)
  }, [])

  // Mouse wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    
    const rect = mapRef.current?.getBoundingClientRect()
    if (!rect) return
    
    // Get mouse position relative to map
    const mouseLatLng = screenToLatLng(e.clientX, e.clientY, rect)
    
    // Calculate new zoom
    const delta = e.deltaY > 0 ? -1 : 1
    const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom + delta * 0.5))
    
    if (newZoom === zoom) return
    
    // Adjust center to zoom towards mouse position
    const zoomFactor = Math.pow(2, newZoom - zoom)
    const newCenter = {
      lat: mouseLatLng.lat - (mouseLatLng.lat - center.lat) / zoomFactor,
      lng: mouseLatLng.lng - (mouseLatLng.lng - center.lng) / zoomFactor
    }
    
    setZoom(newZoom)
    setCenter(newCenter)
  }, [zoom, center, screenToLatLng])

  // Drag to pan
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return // Only left click
    if ((e.target as HTMLElement).closest('button')) return // Ignore button clicks
    
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
    setDragStartCenter({ ...center })
  }, [center])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !mapRef.current) return
    
    const rect = mapRef.current.getBoundingClientRect()
    const scale = Math.pow(2, zoom - 10)
    const latRange = 0.35 / scale
    const lngRange = 0.5 / scale
    
    const dx = e.clientX - dragStart.x
    const dy = e.clientY - dragStart.y
    
    const lngDelta = (dx / rect.width) * 2 * lngRange
    const latDelta = (dy / rect.height) * 2 * latRange
    
    setCenter({
      lat: dragStartCenter.lat + latDelta,
      lng: dragStartCenter.lng - lngDelta
    })
  }, [isDragging, dragStart, dragStartCenter, zoom])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Touch support
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0]
      setIsDragging(true)
      setDragStart({ x: touch.clientX, y: touch.clientY })
      setDragStartCenter({ ...center })
    }
  }, [center])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1 || !mapRef.current) return
    
    const touch = e.touches[0]
    const rect = mapRef.current.getBoundingClientRect()
    const scale = Math.pow(2, zoom - 10)
    const latRange = 0.35 / scale
    const lngRange = 0.5 / scale
    
    const dx = touch.clientX - dragStart.x
    const dy = touch.clientY - dragStart.y
    
    const lngDelta = (dx / rect.width) * 2 * lngRange
    const latDelta = (dy / rect.height) * 2 * latRange
    
    setCenter({
      lat: dragStartCenter.lat + latDelta,
      lng: dragStartCenter.lng - lngDelta
    })
  }, [isDragging, dragStart, dragStartCenter, zoom])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPopupProperty(null)
        if (isFullscreen) setIsFullscreen(false)
      }
      if (e.key === "+" || e.key === "=") handleZoomIn()
      if (e.key === "-" || e.key === "_") handleZoomOut()
      // Arrow keys for panning
      const panAmount = 0.02 / Math.pow(2, zoom - 10)
      if (e.key === "ArrowUp") setCenter(c => ({ ...c, lat: c.lat + panAmount }))
      if (e.key === "ArrowDown") setCenter(c => ({ ...c, lat: c.lat - panAmount }))
      if (e.key === "ArrowLeft") setCenter(c => ({ ...c, lng: c.lng - panAmount }))
      if (e.key === "ArrowRight") setCenter(c => ({ ...c, lng: c.lng + panAmount }))
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isFullscreen, handleZoomIn, handleZoomOut, zoom])

  // Handle location
  const handleLocate = () => {
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

  // Get style classes based on map style
  const getMapClasses = () => {
    switch (mapStyle) {
      case "satellite":
        return "bg-[#1a3628]"
      case "light":
        return "bg-[#fafafa]"
      default:
        return "bg-[#f5f1eb]"
    }
  }

  // Highlight property from list hover
  useEffect(() => {
    if (hoveredProperty) {
      const property = properties.find(p => p.id === hoveredProperty)
      if (property) {
        setPopupProperty(property)
      }
    }
  }, [hoveredProperty, properties])

  // Zoom percentage display
  const zoomPercentage = Math.round(((zoom - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM)) * 100)

  return (
    <TooltipProvider>
      <div 
        ref={containerRef}
        className={`relative h-full w-full overflow-hidden select-none ${isFullscreen ? "fixed inset-0 z-50" : ""}`}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Map Background */}
        <div 
          ref={mapRef}
          className={`absolute inset-0 transition-colors duration-300 ${getMapClasses()} ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Water (Lake Michigan) */}
          <div 
            className={`absolute right-0 top-0 h-full w-[35%] transition-colors duration-300 ${
              mapStyle === "satellite" 
                ? "bg-[#0d4f5f]" 
                : mapStyle === "light"
                ? "bg-[#d4e9f7]"
                : "bg-[#aad3e5]"
            }`}
            style={{
              transform: `translateX(${(center.lng + 87.5) * 50}%)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/20" />
          </div>

          {/* Street Grid - scales with zoom */}
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            <defs>
              <pattern 
                id="streets-grid" 
                width={60 * (zoom / 12)} 
                height={60 * (zoom / 12)} 
                patternUnits="userSpaceOnUse"
              >
                <path 
                  d={`M ${60 * (zoom / 12)} 0 L 0 0 0 ${60 * (zoom / 12)}`}
                  fill="none" 
                  stroke={mapStyle === "satellite" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"} 
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#streets-grid)" />
          </svg>

          {/* Major Roads */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line 
              x1="0" y1="30" x2="65" y2="30" 
              stroke={mapStyle === "satellite" ? "#3d6a5e" : "#e8e5df"}
              strokeWidth={0.8 * (12 / zoom)} 
            />
            <line 
              x1="0" y1="50" x2="65" y2="50" 
              stroke={mapStyle === "satellite" ? "#3d6a5e" : "#e8e5df"}
              strokeWidth={0.8 * (12 / zoom)} 
            />
            <line 
              x1="0" y1="70" x2="65" y2="70" 
              stroke={mapStyle === "satellite" ? "#3d6a5e" : "#e8e5df"}
              strokeWidth={0.8 * (12 / zoom)} 
            />
            <line 
              x1="30" y1="0" x2="30" y2="100" 
              stroke={mapStyle === "satellite" ? "#4a7a6e" : "#ddd9d3"}
              strokeWidth={1.2 * (12 / zoom)} 
            />
            <line 
              x1="50" y1="0" x2="50" y2="100" 
              stroke={mapStyle === "satellite" ? "#4a7a6e" : "#ddd9d3"}
              strokeWidth={1.2 * (12 / zoom)} 
            />
            <path 
              d="M 65 0 Q 62 50 65 100" 
              fill="none" 
              stroke={mapStyle === "satellite" ? "#5a8a7e" : "#ccc8c2"}
              strokeWidth={1.5 * (12 / zoom)} 
            />
          </svg>

          {/* Parks */}
          {mapStyle !== "satellite" && (
            <>
              <div className="absolute left-[18%] top-[22%] h-[10%] w-[14%] rounded-2xl bg-[#c5e1b5]/60" />
              <div className="absolute left-[42%] top-[45%] h-[8%] w-[8%] rounded-xl bg-[#c5e1b5]/50" />
              <div className="absolute left-[25%] top-[65%] h-[6%] w-[10%] rounded-lg bg-[#c5e1b5]/50" />
            </>
          )}

          {/* Downtown indicator */}
          <div className="absolute left-[40%] top-[42%] h-[16%] w-[14%] rounded-lg border border-dashed border-muted-foreground/10 bg-muted/5" />
        </div>

        {/* Property Pins */}
        {properties.map((property) => {
          const pos = getPosition(property.lat, property.lng)
          if (!pos.visible) return null
          
          const isSelected = selectedProperty?.id === property.id
          const isHovered = hoveredProperty === property.id
          
          return (
            <button
              key={property.id}
              className={`absolute transform -translate-x-1/2 -translate-y-full transition-all duration-200 ${
                isSelected || isHovered ? "z-30 scale-110" : "z-10 hover:z-20 hover:scale-105"
              }`}
              style={{ 
                left: `${pos.x}%`, 
                top: `${pos.y}%`,
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

        {/* Property Popup */}
        {popupProperty && (
          <PropertyPopup
            property={popupProperty}
            position={getPosition(popupProperty.lat, popupProperty.lng)}
            onClose={() => setPopupProperty(null)}
          />
        )}

        {/* Map Controls */}
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          {/* Zoom Controls */}
          <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-lg">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-none border-b border-border hover:bg-muted disabled:opacity-50"
                  onClick={handleZoomIn}
                  disabled={zoom >= MAX_ZOOM}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Zoom in (+)</p>
              </TooltipContent>
            </Tooltip>
            
            {/* Zoom level indicator */}
            <div className="flex h-8 items-center justify-center border-b border-border bg-muted/50 text-xs font-medium text-muted-foreground">
              {zoomPercentage}%
            </div>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-none hover:bg-muted disabled:opacity-50"
                  onClick={handleZoomOut}
                  disabled={zoom <= MIN_ZOOM}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Zoom out (-)</p>
              </TooltipContent>
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
            <TooltipContent side="left">
              <p>Reset view</p>
            </TooltipContent>
          </Tooltip>

          {/* Locate */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-10 w-10 shadow-lg"
                onClick={handleLocate}
              >
                <Locate className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>My location</p>
            </TooltipContent>
          </Tooltip>

          {/* Map Style */}
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="h-10 w-10 shadow-lg">
                    <Layers className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Map style</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" className="w-32">
              {mapStyles.map((style) => (
                <DropdownMenuItem
                  key={style.id}
                  onClick={() => setMapStyle(style.id)}
                  className={mapStyle === style.id ? "bg-accent" : ""}
                >
                  <div 
                    className="mr-2 h-4 w-4 rounded border border-border"
                    style={{ backgroundColor: style.bg }}
                  />
                  {style.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Fullscreen */}
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
              <p>{isFullscreen ? "Exit fullscreen" : "Fullscreen"}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Property Count Badge */}
        <div className="absolute left-4 top-4">
          <Badge variant="secondary" className="gap-2 px-3 py-1.5 text-sm shadow-lg bg-card">
            <Navigation2 className="h-4 w-4 text-primary" />
            {properties.length} homes
          </Badge>
        </div>

        {/* Drag hint */}
        {!isDragging && (
          <div className="absolute left-4 top-16">
            <Badge variant="outline" className="gap-1.5 px-2 py-1 text-xs bg-card/80 backdrop-blur-sm">
              <Move className="h-3 w-3" />
              Drag to pan
            </Badge>
          </div>
        )}

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 rounded-lg border border-border bg-card/95 p-3 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-amber-500" />
              <span>Waitlist</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-slate-400" />
              <span>Coming Soon</span>
            </div>
          </div>
        </div>

        {/* Zoom level indicator bottom right */}
        <div className="absolute bottom-4 right-4 rounded-md border border-border bg-card/95 px-2 py-1 text-xs text-muted-foreground shadow-lg backdrop-blur-sm">
          Zoom: {zoom.toFixed(1)}x
        </div>

        {/* Fullscreen Exit */}
        {isFullscreen && (
          <Button
            variant="secondary"
            size="sm"
            className="absolute left-4 top-28 gap-2 shadow-lg"
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
  position: { x: number; y: number }
  onClose: () => void
}

function PropertyPopup({ property, position, onClose }: PropertyPopupProps) {
  const adjustedX = Math.max(20, Math.min(position.x, 65))
  const adjustedY = Math.max(10, position.y - 5)

  return (
    <div
      className="absolute z-40 w-72 animate-in fade-in zoom-in-95 duration-200 pointer-events-auto"
      style={{
        left: `${adjustedX}%`,
        top: `${adjustedY}%`,
        transform: "translate(-50%, -100%)",
      }}
    >
      <Card className="overflow-hidden border-0 shadow-2xl">
        <CardContent className="p-0">
          <div className="relative h-32">
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
                ${property.rent}<span className="text-sm font-normal">/mo</span>
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
                {property.sqft} sqft
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
