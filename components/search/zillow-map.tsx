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
  Navigation,
  Locate
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Property } from "@/app/search/page"

interface ZillowMapProps {
  properties: Property[]
  selectedProperty: Property | null
  hoveredProperty: string | null
  onPropertySelect: (property: Property) => void
  onPropertyHover: (propertyId: string | null) => void
}

const DEFAULT_CENTER = { lat: 41.8781, lng: -87.6298 }
const DEFAULT_ZOOM = 12

const MAP_STYLES = {
  streets: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  },
  light: {
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a>'
  }
}

export function ZillowMap({
  properties,
  selectedProperty,
  hoveredProperty,
  onPropertySelect,
  onPropertyHover,
}: ZillowMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<Map<string, L.Marker>>(new Map())
  const tileLayerRef = useRef<L.TileLayer | null>(null)
  const leafletRef = useRef<typeof import("leaflet") | null>(null)
  
  const [mapStyle, setMapStyle] = useState<keyof typeof MAP_STYLES>("streets")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [popupProperty, setPopupProperty] = useState<Property | null>(null)
  const [isMapReady, setIsMapReady] = useState(false)
  const [currentZoom, setCurrentZoom] = useState(DEFAULT_ZOOM)
  const isDraggingRef = useRef(false)
  const mouseDownPosRef = useRef<{ x: number; y: number } | null>(null)
  const hasDraggedRef = useRef(false)

  // Create custom price marker icon
  const createPriceIcon = useCallback((property: Property, isActive: boolean) => {
    const L = leafletRef.current
    if (!L) return null

    const bgColor = property.status === "available" 
      ? (isActive ? "#2563eb" : "#16a34a")
      : property.status === "waitlist-open"
      ? (isActive ? "#2563eb" : "#d97706")
      : "#64748b"

    const price = property.rent >= 1000 
      ? `$${(property.rent / 1000).toFixed(1)}k` 
      : `$${property.rent}`

    const scale = isActive ? 1.15 : 1
    const shadow = isActive ? "0 6px 20px rgba(0,0,0,0.4)" : "0 3px 10px rgba(0,0,0,0.3)"

    const html = `
      <div style="
        transform: scale(${scale});
        transform-origin: bottom center;
        transition: transform 0.15s ease;
      ">
        <div style="
          background: ${bgColor};
          color: white;
          padding: 6px 10px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 12px;
          font-family: system-ui, -apple-system, sans-serif;
          box-shadow: ${shadow};
          white-space: nowrap;
          border: 2px solid white;
        ">
          ${price}
        </div>
        <div style="
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid ${bgColor};
          margin: -2px auto 0;
          filter: drop-shadow(0 2px 2px rgba(0,0,0,0.2));
        "></div>
      </div>
    `

    return L.divIcon({
      html,
      className: "custom-price-marker",
      iconSize: [70, 45],
      iconAnchor: [35, 45],
    })
  }, [])

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return

    const initializeMap = async () => {
      const L = await import("leaflet")
      leafletRef.current = L

      // Create map instance
      const map = L.map(mapContainerRef.current!, {
        center: [DEFAULT_CENTER.lat, DEFAULT_CENTER.lng],
        zoom: DEFAULT_ZOOM,
        zoomControl: false,
        attributionControl: true,
      })

      // Add initial tile layer
      const style = MAP_STYLES[mapStyle]
      const tileLayer = L.tileLayer(style.url, {
        attribution: style.attribution,
        maxZoom: 19,
        subdomains: ["a", "b", "c"],
      }).addTo(map)

      tileLayerRef.current = tileLayer

      // Track zoom changes
      map.on("zoomend", () => {
        setCurrentZoom(map.getZoom())
      })

      // Track mouse down/up to detect dragging vs clicking
      const container = map.getContainer()
      
      container.addEventListener("mousedown", (e) => {
        mouseDownPosRef.current = { x: e.clientX, y: e.clientY }
        hasDraggedRef.current = false
        isDraggingRef.current = false
      })

      container.addEventListener("mousemove", (e) => {
        if (mouseDownPosRef.current) {
          const dx = e.clientX - mouseDownPosRef.current.x
          const dy = e.clientY - mouseDownPosRef.current.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          // If moved more than 5 pixels, consider it a drag
          if (distance > 5) {
            hasDraggedRef.current = true
            isDraggingRef.current = true
          }
        }
      })

      container.addEventListener("mouseup", () => {
        mouseDownPosRef.current = null
        // Keep drag state for a moment to prevent click handlers
        setTimeout(() => {
          isDraggingRef.current = false
        }, 50)
      })

      // Close popup on map click (but not after drag)
      map.on("click", () => {
        if (!hasDraggedRef.current) {
          setPopupProperty(null)
        }
        // Reset drag state after click is processed
        setTimeout(() => {
          hasDraggedRef.current = false
        }, 10)
      })

      mapInstanceRef.current = map
      setIsMapReady(true)
    }

    initializeMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
        markersRef.current.clear()
      }
    }
  }, [])

  // Update tile layer when style changes
  useEffect(() => {
    const map = mapInstanceRef.current
    const L = leafletRef.current
    if (!map || !L || !isMapReady) return

    // Remove old tile layer
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current)
    }

    // Add new tile layer
    const style = MAP_STYLES[mapStyle]
    const newTileLayer = L.tileLayer(style.url, {
      attribution: style.attribution,
      maxZoom: 19,
      subdomains: mapStyle === "satellite" ? undefined : ["a", "b", "c"],
    }).addTo(map)

    tileLayerRef.current = newTileLayer
  }, [mapStyle, isMapReady])

  // Create and update markers
  useEffect(() => {
    const map = mapInstanceRef.current
    const L = leafletRef.current
    if (!map || !L || !isMapReady) return

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      map.removeLayer(marker)
    })
    markersRef.current.clear()

    // Create markers for each property
    properties.forEach((property) => {
      const isActive = selectedProperty?.id === property.id || hoveredProperty === property.id
      const icon = createPriceIcon(property, isActive)
      if (!icon) return

      const marker = L.marker([property.lat, property.lng], { 
        icon,
        zIndexOffset: isActive ? 1000 : 0
      })
        .addTo(map)
        .on("click", (e) => {
          // Prevent click if we just finished dragging
          if (hasDraggedRef.current || isDraggingRef.current) {
            return
          }
          L.DomEvent.stopPropagation(e)
          onPropertySelect(property)
          setPopupProperty(property)
        })
        .on("mouseover", () => {
          if (!isDraggingRef.current && !hasDraggedRef.current) {
            onPropertyHover(property.id)
          }
        })
        .on("mouseout", () => {
          onPropertyHover(null)
        })

      markersRef.current.set(property.id, marker)
    })
  }, [properties, selectedProperty, hoveredProperty, isMapReady, createPriceIcon, onPropertySelect, onPropertyHover])

  // Update marker styles on hover/selection change
  useEffect(() => {
    const L = leafletRef.current
    if (!L || !isMapReady) return

    properties.forEach((property) => {
      const marker = markersRef.current.get(property.id)
      if (marker) {
        const isActive = selectedProperty?.id === property.id || hoveredProperty === property.id
        const icon = createPriceIcon(property, isActive)
        if (icon) {
          marker.setIcon(icon)
          marker.setZIndexOffset(isActive ? 1000 : 0)
        }
      }
    })
  }, [selectedProperty, hoveredProperty, properties, isMapReady, createPriceIcon])

  // Pan to hovered property (only when hovering from property list, not map)
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map || !hoveredProperty) return

    // Don't pan if user is dragging
    if (isDraggingRef.current || hasDraggedRef.current) return

    const property = properties.find(p => p.id === hoveredProperty)
    if (property) {
      setPopupProperty(property)
      map.panTo([property.lat, property.lng], { animate: true, duration: 0.3 })
    }
  }, [hoveredProperty, properties])

  // Handle fullscreen resize
  useEffect(() => {
    const map = mapInstanceRef.current
    if (map) {
      setTimeout(() => map.invalidateSize(), 100)
    }
  }, [isFullscreen])

  // Map controls
  const handleZoomIn = useCallback(() => {
    mapInstanceRef.current?.zoomIn()
  }, [])

  const handleZoomOut = useCallback(() => {
    mapInstanceRef.current?.zoomOut()
  }, [])

  const handleReset = useCallback(() => {
    mapInstanceRef.current?.setView([DEFAULT_CENTER.lat, DEFAULT_CENTER.lng], DEFAULT_ZOOM)
  }, [])

  const handleLocate = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          mapInstanceRef.current?.setView(
            [position.coords.latitude, position.coords.longitude],
            14
          )
        },
        () => {
          console.log("[v0] Geolocation permission denied")
        }
      )
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
      if (e.key === "-") handleZoomOut()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isFullscreen, handleZoomIn, handleZoomOut])

  return (
    <div className={`relative h-full w-full ${isFullscreen ? "fixed inset-0 z-50" : ""}`}>
      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      
      {/* Custom styles */}
      <style>{`
        .custom-price-marker {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-control-attribution {
          font-size: 10px !important;
          background: rgba(255,255,255,0.85) !important;
          padding: 2px 6px !important;
        }
        .leaflet-container {
          font-family: inherit;
        }
      `}</style>

      {/* Map Container */}
      <div 
        ref={mapContainerRef} 
        className="absolute inset-0 z-0 bg-slate-100"
      />

      {/* Loading State */}
      {!isMapReady && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-100">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <span className="text-sm font-medium text-muted-foreground">Loading map...</span>
          </div>
        </div>
      )}

      {/* Property Popup Card */}
      {popupProperty && (
        <div className="absolute left-1/2 top-4 z-[1000] w-[320px] -translate-x-1/2 animate-in fade-in slide-in-from-top-2 duration-200">
          <Card className="overflow-hidden shadow-2xl border-0">
            <div className="relative h-40">
              <Image
                src={popupProperty.images[0]}
                alt={popupProperty.title}
                fill
                className="object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={() => setPopupProperty(null)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                <div className="flex items-end justify-between">
                  <span className="text-xl font-bold text-white">
                    ${popupProperty.rent.toLocaleString()}
                    <span className="text-sm font-normal opacity-90">/mo</span>
                  </span>
                  <div className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-xs text-white backdrop-blur-sm">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {popupProperty.rating}
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="mb-1 font-semibold text-foreground line-clamp-1">
                {popupProperty.title}
              </h3>
              <p className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {popupProperty.address}, {popupProperty.city}
              </p>
              <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  {popupProperty.bedrooms === 0 ? "Studio" : `${popupProperty.bedrooms} bed`}
                </span>
                <span className="flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  {popupProperty.bathrooms} bath
                </span>
                <span className="flex items-center gap-1">
                  <Square className="h-4 w-4" />
                  {popupProperty.sqft.toLocaleString()} sqft
                </span>
              </div>
              <Link href={`/property/${popupProperty.id}`}>
                <Button className="w-full gap-2">
                  View Details
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute right-4 top-4 z-[1000] flex flex-col gap-2">
        {/* Zoom Controls */}
        <Card className="overflow-hidden shadow-lg">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-none border-b hover:bg-muted"
            onClick={handleZoomIn}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <div className="flex h-8 items-center justify-center border-b bg-muted/50 text-xs font-medium text-muted-foreground">
            {currentZoom}x
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-none hover:bg-muted"
            onClick={handleZoomOut}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
        </Card>

        {/* Reset */}
        <Button
          variant="secondary"
          size="icon"
          className="h-10 w-10 shadow-lg"
          onClick={handleReset}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        {/* My Location */}
        <Button
          variant="secondary"
          size="icon"
          className="h-10 w-10 shadow-lg"
          onClick={handleLocate}
        >
          <Locate className="h-4 w-4" />
        </Button>

        {/* Map Style */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="h-10 w-10 shadow-lg">
              <Layers className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem
              onClick={() => setMapStyle("streets")}
              className={mapStyle === "streets" ? "bg-accent" : ""}
            >
              Streets
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setMapStyle("light")}
              className={mapStyle === "light" ? "bg-accent" : ""}
            >
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setMapStyle("satellite")}
              className={mapStyle === "satellite" ? "bg-accent" : ""}
            >
              Satellite
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Fullscreen */}
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
      </div>

      {/* Legend */}
      <Card className="absolute bottom-4 left-4 z-[1000] shadow-lg">
        <CardContent className="p-3">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded bg-green-600" />
              <span className="text-muted-foreground">Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded bg-amber-600" />
              <span className="text-muted-foreground">Waitlist</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded bg-slate-500" />
              <span className="text-muted-foreground">Coming Soon</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Property Count */}
      <Card className="absolute left-4 top-4 z-[1000] shadow-lg">
        <CardContent className="px-4 py-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-semibold">{properties.length}</span>
            <span className="text-muted-foreground">properties</span>
          </div>
        </CardContent>
      </Card>

      {/* Fullscreen Exit */}
      {isFullscreen && (
        <Button
          variant="secondary"
          size="sm"
          className="absolute left-4 top-16 z-[1000] gap-2 shadow-lg"
          onClick={() => setIsFullscreen(false)}
        >
          <X className="h-4 w-4" />
          Exit Fullscreen
        </Button>
      )}
    </div>
  )
}
