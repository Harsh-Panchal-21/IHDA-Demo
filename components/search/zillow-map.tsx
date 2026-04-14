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

const DEFAULT_CENTER = { lat: 41.8781, lng: -87.6298 } // Chicago
const DEFAULT_ZOOM = 13

export function ZillowMap({
  properties,
  selectedProperty,
  hoveredProperty,
  onPropertySelect,
  onPropertyHover,
}: ZillowMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<Map<string, L.Marker>>(new Map())
  const [mapStyleId, setMapStyleId] = useState("streets")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [popupProperty, setPopupProperty] = useState<Property | null>(null)
  const [isMapReady, setIsMapReady] = useState(false)
  const [currentZoom, setCurrentZoom] = useState(DEFAULT_ZOOM)

  // Define L type for TypeScript
  type L = typeof import("leaflet")
  const LRef = useRef<L | null>(null)

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return

    const initMap = async () => {
      const L = await import("leaflet")
      LRef.current = L

      // Fix default marker icon issue
      delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      })

      // Create map
      const map = L.map(mapRef.current!, {
        center: [DEFAULT_CENTER.lat, DEFAULT_CENTER.lng],
        zoom: DEFAULT_ZOOM,
        zoomControl: false,
        attributionControl: true,
      })

      // Add tile layer - OpenStreetMap with street names
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map)

      // Track zoom changes
      map.on("zoomend", () => {
        setCurrentZoom(map.getZoom())
      })

      leafletMapRef.current = map
      setIsMapReady(true)
    }

    initMap()

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [])

  // Change map style
  useEffect(() => {
    if (!leafletMapRef.current || !LRef.current) return
    const L = LRef.current
    const map = leafletMapRef.current

    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer)
      }
    })

    // Add new tile layer based on style
    let tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    let attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'

    if (mapStyleId === "light") {
      tileUrl = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
    } else if (mapStyleId === "satellite") {
      tileUrl = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      attribution = '&copy; <a href="https://www.esri.com/">Esri</a>'
    }

    L.tileLayer(tileUrl, {
      attribution,
      maxZoom: 19,
    }).addTo(map)
  }, [mapStyleId])

  // Create custom marker icon
  const createMarkerIcon = useCallback((property: Property, isActive: boolean) => {
    if (!LRef.current) return null
    const L = LRef.current

    const bgColor = property.status === "available" 
      ? (isActive ? "#3b82f6" : "#22c55e")
      : property.status === "waitlist-open"
      ? (isActive ? "#3b82f6" : "#f59e0b")
      : "#94a3b8"

    const priceText = property.rent >= 1000 
      ? `$${(property.rent / 1000).toFixed(1)}k` 
      : `$${property.rent}`

    const html = `
      <div style="
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
      ">
        <div style="
          background: ${bgColor};
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 13px;
          font-family: system-ui, -apple-system, sans-serif;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          white-space: nowrap;
          ${isActive ? "transform: scale(1.1); box-shadow: 0 6px 20px rgba(0,0,0,0.35);" : ""}
          transition: all 0.2s ease;
        ">
          ${priceText}
        </div>
        <div style="
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 10px solid ${bgColor};
          margin-top: -1px;
        "></div>
        ${property.status === "available" && !isActive ? `
          <div style="
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 50px;
            height: 30px;
            background: ${bgColor};
            opacity: 0.3;
            border-radius: 20px;
            animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          "></div>
        ` : ""}
      </div>
    `

    return L.divIcon({
      html,
      className: "custom-marker",
      iconSize: [80, 50],
      iconAnchor: [40, 50],
    })
  }, [])

  // Add/update markers
  useEffect(() => {
    if (!leafletMapRef.current || !LRef.current || !isMapReady) return
    const L = LRef.current
    const map = leafletMapRef.current

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      map.removeLayer(marker)
    })
    markersRef.current.clear()

    // Add markers for each property
    properties.forEach((property) => {
      const isActive = selectedProperty?.id === property.id || hoveredProperty === property.id
      const icon = createMarkerIcon(property, isActive)
      if (!icon) return

      const marker = L.marker([property.lat, property.lng], { icon })
        .addTo(map)
        .on("click", () => {
          onPropertySelect(property)
          setPopupProperty(property)
        })
        .on("mouseover", () => {
          onPropertyHover(property.id)
        })
        .on("mouseout", () => {
          onPropertyHover(null)
        })

      markersRef.current.set(property.id, marker)
    })
  }, [properties, selectedProperty, hoveredProperty, isMapReady, createMarkerIcon, onPropertySelect, onPropertyHover])

  // Update marker icons when hover/selection changes
  useEffect(() => {
    if (!LRef.current || !isMapReady) return

    properties.forEach((property) => {
      const marker = markersRef.current.get(property.id)
      if (marker) {
        const isActive = selectedProperty?.id === property.id || hoveredProperty === property.id
        const icon = createMarkerIcon(property, isActive)
        if (icon) {
          marker.setIcon(icon)
        }
      }
    })
  }, [selectedProperty, hoveredProperty, properties, isMapReady, createMarkerIcon])

  // Pan to hovered property
  useEffect(() => {
    if (!leafletMapRef.current || !hoveredProperty) return
    const property = properties.find(p => p.id === hoveredProperty)
    if (property) {
      setPopupProperty(property)
      // Smooth pan to property
      leafletMapRef.current.panTo([property.lat, property.lng], { animate: true, duration: 0.5 })
    }
  }, [hoveredProperty, properties])

  // Zoom controls
  const handleZoomIn = useCallback(() => {
    if (leafletMapRef.current) {
      leafletMapRef.current.zoomIn()
    }
  }, [])

  const handleZoomOut = useCallback(() => {
    if (leafletMapRef.current) {
      leafletMapRef.current.zoomOut()
    }
  }, [])

  const handleReset = useCallback(() => {
    if (leafletMapRef.current) {
      leafletMapRef.current.setView([DEFAULT_CENTER.lat, DEFAULT_CENTER.lng], DEFAULT_ZOOM)
    }
  }, [])

  const handleLocate = useCallback(() => {
    if (navigator.geolocation && leafletMapRef.current) {
      navigator.geolocation.getCurrentPosition((position) => {
        leafletMapRef.current?.setView(
          [position.coords.latitude, position.coords.longitude],
          15
        )
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

  // Handle fullscreen resize
  useEffect(() => {
    if (leafletMapRef.current) {
      setTimeout(() => {
        leafletMapRef.current?.invalidateSize()
      }, 100)
    }
  }, [isFullscreen])

  return (
    <TooltipProvider>
      <div 
        className={`relative h-full w-full ${isFullscreen ? "fixed inset-0 z-50 bg-background" : ""}`}
      >
        {/* Leaflet CSS */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
          integrity="sha512-h9FcoyWjHcOcmEVkxOfTLnmZFWIH0iZhZT1H2TbOq55xssQGEJHEaIm+PgoUaZbRvQTNTluNOEfb1ZRy6D3BOw=="
          crossOrigin="anonymous"
        />

        {/* Custom marker animation */}
        <style>{`
          @keyframes ping {
            0% { transform: translateX(-50%) scale(1); opacity: 0.3; }
            75%, 100% { transform: translateX(-50%) scale(2); opacity: 0; }
          }
          .custom-marker {
            background: transparent !important;
            border: none !important;
          }
          .leaflet-control-attribution {
            font-size: 10px !important;
            background: rgba(255,255,255,0.8) !important;
          }
        `}</style>

        {/* Map Container */}
        <div 
          ref={mapRef} 
          className="absolute inset-0 z-0"
          style={{ background: "#e5e7eb" }}
        />

        {/* Loading State */}
        {!isMapReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <span className="text-sm text-muted-foreground">Loading map...</span>
            </div>
          </div>
        )}

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
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Zoom in (+)</TooltipContent>
            </Tooltip>
            
            <div className="flex h-8 items-center justify-center bg-muted/50 text-xs font-medium text-muted-foreground">
              {currentZoom}x
            </div>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-none hover:bg-muted"
                  onClick={handleZoomOut}
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
              <DropdownMenuItem
                onClick={() => setMapStyleId("streets")}
                className={mapStyleId === "streets" ? "bg-accent" : ""}
              >
                Streets
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setMapStyleId("light")}
                className={mapStyleId === "light" ? "bg-accent" : ""}
              >
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setMapStyleId("satellite")}
                className={mapStyleId === "satellite" ? "bg-accent" : ""}
              >
                Satellite
              </DropdownMenuItem>
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
