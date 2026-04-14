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
  RotateCcw,
  Grip
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
  { id: "streets", label: "Streets", url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png" },
  { id: "light", label: "Light", url: "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png" },
  { id: "satellite", label: "Satellite", url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" },
]

const MIN_ZOOM = 10
const MAX_ZOOM = 18
const TILE_SIZE = 256
const DEFAULT_CENTER = { lat: 41.8781, lng: -87.6298 } // Chicago
const DEFAULT_ZOOM = 13

// Convert lat/lng to tile coordinates
function latLngToTile(lat: number, lng: number, zoom: number) {
  const n = Math.pow(2, zoom)
  const x = Math.floor((lng + 180) / 360 * n)
  const latRad = lat * Math.PI / 180
  const y = Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n)
  return { x, y }
}

// Convert lat/lng to pixel coordinates within the map container
function latLngToPixel(lat: number, lng: number, zoom: number, centerLat: number, centerLng: number, containerWidth: number, containerHeight: number) {
  const scale = Math.pow(2, zoom)
  const worldSize = TILE_SIZE * scale
  
  // Convert to world coordinates
  const centerX = ((centerLng + 180) / 360) * worldSize
  const centerLatRad = centerLat * Math.PI / 180
  const centerY = ((1 - Math.log(Math.tan(centerLatRad) + 1 / Math.cos(centerLatRad)) / Math.PI) / 2) * worldSize
  
  const pointX = ((lng + 180) / 360) * worldSize
  const pointLatRad = lat * Math.PI / 180
  const pointY = ((1 - Math.log(Math.tan(pointLatRad) + 1 / Math.cos(pointLatRad)) / Math.PI) / 2) * worldSize
  
  // Convert to container coordinates
  const x = (pointX - centerX) + containerWidth / 2
  const y = (pointY - centerY) + containerHeight / 2
  
  return { x, y }
}

// Convert pixel to lat/lng
function pixelToLatLng(pixelX: number, pixelY: number, zoom: number, centerLat: number, centerLng: number, containerWidth: number, containerHeight: number) {
  const scale = Math.pow(2, zoom)
  const worldSize = TILE_SIZE * scale
  
  // Center world coordinates
  const centerX = ((centerLng + 180) / 360) * worldSize
  const centerLatRad = centerLat * Math.PI / 180
  const centerY = ((1 - Math.log(Math.tan(centerLatRad) + 1 / Math.cos(centerLatRad)) / Math.PI) / 2) * worldSize
  
  // Point world coordinates
  const pointX = centerX + (pixelX - containerWidth / 2)
  const pointY = centerY + (pixelY - containerHeight / 2)
  
  // Convert back to lat/lng
  const lng = (pointX / worldSize) * 360 - 180
  const latRad = Math.atan(Math.sinh(Math.PI * (1 - 2 * pointY / worldSize)))
  const lat = latRad * 180 / Math.PI
  
  return { lat, lng }
}

export function ZillowMap({
  properties,
  selectedProperty,
  hoveredProperty,
  onPropertySelect,
  onPropertyHover,
}: ZillowMapProps) {
  const [zoom, setZoom] = useState(DEFAULT_ZOOM)
  const [center, setCenter] = useState(DEFAULT_CENTER)
  const [mapStyleId, setMapStyleId] = useState("streets")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [popupProperty, setPopupProperty] = useState<Property | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [dragStartCenter, setDragStartCenter] = useState(DEFAULT_CENTER)
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 })
  const [tiles, setTiles] = useState<{ x: number; y: number; url: string }[]>([])
  const [tileOffset, setTileOffset] = useState({ x: 0, y: 0 })
  
  const containerRef = useRef<HTMLDivElement>(null)

  // Update container size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setContainerSize({ width: rect.width, height: rect.height })
      }
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [isFullscreen])

  // Calculate tiles to display
  useEffect(() => {
    const currentStyle = mapStyles.find(s => s.id === mapStyleId) || mapStyles[0]
    const scale = Math.pow(2, zoom)
    const worldSize = TILE_SIZE * scale
    
    // Center in world pixels
    const centerX = ((center.lng + 180) / 360) * worldSize
    const centerLatRad = center.lat * Math.PI / 180
    const centerY = ((1 - Math.log(Math.tan(centerLatRad) + 1 / Math.cos(centerLatRad)) / Math.PI) / 2) * worldSize
    
    // Calculate tile range needed
    const tilesX = Math.ceil(containerSize.width / TILE_SIZE) + 2
    const tilesY = Math.ceil(containerSize.height / TILE_SIZE) + 2
    
    const centerTileX = Math.floor(centerX / TILE_SIZE)
    const centerTileY = Math.floor(centerY / TILE_SIZE)
    
    const startTileX = centerTileX - Math.floor(tilesX / 2)
    const startTileY = centerTileY - Math.floor(tilesY / 2)
    
    // Calculate pixel offset for smooth positioning
    const offsetX = (centerX % TILE_SIZE) - containerSize.width / 2 + (tilesX / 2) * TILE_SIZE
    const offsetY = (centerY % TILE_SIZE) - containerSize.height / 2 + (tilesY / 2) * TILE_SIZE
    
    setTileOffset({ x: -offsetX, y: -offsetY })
    
    const newTiles: { x: number; y: number; url: string }[] = []
    const maxTile = Math.pow(2, Math.floor(zoom))
    
    for (let y = 0; y < tilesY; y++) {
      for (let x = 0; x < tilesX; x++) {
        const tileX = startTileX + x
        const tileY = startTileY + y
        
        // Wrap tiles horizontally, skip invalid vertical tiles
        const wrappedX = ((tileX % maxTile) + maxTile) % maxTile
        if (tileY >= 0 && tileY < maxTile) {
          const url = currentStyle.url
            .replace("{z}", Math.floor(zoom).toString())
            .replace("{x}", wrappedX.toString())
            .replace("{y}", tileY.toString())
          newTiles.push({ x, y, url })
        }
      }
    }
    
    setTiles(newTiles)
  }, [center, zoom, containerSize, mapStyleId])

  // Get pixel position for a property
  const getPropertyPosition = useCallback((lat: number, lng: number) => {
    const pos = latLngToPixel(lat, lng, zoom, center.lat, center.lng, containerSize.width, containerSize.height)
    return {
      x: pos.x,
      y: pos.y,
      visible: pos.x >= -50 && pos.x <= containerSize.width + 50 && pos.y >= -50 && pos.y <= containerSize.height + 50
    }
  }, [zoom, center, containerSize])

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
    
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    
    // Get mouse position relative to container
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    // Get lat/lng at mouse position
    const mouseLatLng = pixelToLatLng(mouseX, mouseY, zoom, center.lat, center.lng, containerSize.width, containerSize.height)
    
    // Calculate new zoom
    const delta = e.deltaY > 0 ? -0.5 : 0.5
    const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom + delta))
    
    if (newZoom === zoom) return
    
    // Get the new pixel position of the mouse lat/lng at the new zoom
    const newMousePixel = latLngToPixel(mouseLatLng.lat, mouseLatLng.lng, newZoom, center.lat, center.lng, containerSize.width, containerSize.height)
    
    // Calculate the new center so that the mouse lat/lng stays under the cursor
    const newCenterLatLng = pixelToLatLng(
      containerSize.width / 2 + (newMousePixel.x - mouseX),
      containerSize.height / 2 + (newMousePixel.y - mouseY),
      newZoom,
      center.lat,
      center.lng,
      containerSize.width,
      containerSize.height
    )
    
    setZoom(newZoom)
    setCenter(newCenterLatLng)
  }, [zoom, center, containerSize])

  // Drag to pan
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return
    const target = e.target as HTMLElement
    if (target.closest('button') || target.closest('a')) return
    
    e.preventDefault()
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
    setDragStartCenter({ ...center })
  }, [center])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    
    const dx = e.clientX - dragStart.x
    const dy = e.clientY - dragStart.y
    
    const newCenter = pixelToLatLng(
      containerSize.width / 2 - dx,
      containerSize.height / 2 - dy,
      zoom,
      dragStartCenter.lat,
      dragStartCenter.lng,
      containerSize.width,
      containerSize.height
    )
    
    setCenter(newCenter)
  }, [isDragging, dragStart, dragStartCenter, zoom, containerSize])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Touch support
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const target = e.target as HTMLElement
      if (target.closest('button') || target.closest('a')) return
      
      const touch = e.touches[0]
      setIsDragging(true)
      setDragStart({ x: touch.clientX, y: touch.clientY })
      setDragStartCenter({ ...center })
    }
  }, [center])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return
    
    const touch = e.touches[0]
    const dx = touch.clientX - dragStart.x
    const dy = touch.clientY - dragStart.y
    
    const newCenter = pixelToLatLng(
      containerSize.width / 2 - dx,
      containerSize.height / 2 - dy,
      zoom,
      dragStartCenter.lat,
      dragStartCenter.lng,
      containerSize.width,
      containerSize.height
    )
    
    setCenter(newCenter)
  }, [isDragging, dragStart, dragStartCenter, zoom, containerSize])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
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
      
      // Arrow keys for panning
      const panPixels = 100
      if (e.key === "ArrowUp") {
        setCenter(c => pixelToLatLng(containerSize.width / 2, containerSize.height / 2 - panPixels, zoom, c.lat, c.lng, containerSize.width, containerSize.height))
      }
      if (e.key === "ArrowDown") {
        setCenter(c => pixelToLatLng(containerSize.width / 2, containerSize.height / 2 + panPixels, zoom, c.lat, c.lng, containerSize.width, containerSize.height))
      }
      if (e.key === "ArrowLeft") {
        setCenter(c => pixelToLatLng(containerSize.width / 2 - panPixels, containerSize.height / 2, zoom, c.lat, c.lng, containerSize.width, containerSize.height))
      }
      if (e.key === "ArrowRight") {
        setCenter(c => pixelToLatLng(containerSize.width / 2 + panPixels, containerSize.height / 2, zoom, c.lat, c.lng, containerSize.width, containerSize.height))
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isFullscreen, handleZoomIn, handleZoomOut, zoom, containerSize])

  // Handle location
  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        setZoom(15)
      })
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

  const zoomPercentage = Math.round(((zoom - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM)) * 100)

  return (
    <TooltipProvider>
      <div 
        ref={containerRef}
        className={`relative h-full w-full overflow-hidden select-none ${isFullscreen ? "fixed inset-0 z-50 bg-background" : ""}`}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {/* Map Tiles */}
        <div 
          className="absolute"
          style={{
            transform: `translate(${tileOffset.x}px, ${tileOffset.y}px)`,
            willChange: "transform"
          }}
        >
          {tiles.map((tile) => (
            <img
              key={`${tile.x}-${tile.y}-${Math.floor(zoom)}`}
              src={tile.url}
              alt=""
              className="absolute"
              style={{
                left: tile.x * TILE_SIZE,
                top: tile.y * TILE_SIZE,
                width: TILE_SIZE,
                height: TILE_SIZE,
              }}
              draggable={false}
            />
          ))}
        </div>

        {/* Property Pins */}
        {properties.map((property) => {
          const pos = getPropertyPosition(property.lat, property.lng)
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
                left: pos.x, 
                top: pos.y,
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
            position={getPropertyPosition(popupProperty.lat, popupProperty.lng)}
            containerSize={containerSize}
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
                  onClick={() => setMapStyleId(style.id)}
                  className={mapStyleId === style.id ? "bg-accent" : ""}
                >
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
          <div className="absolute left-4 top-14">
            <Badge variant="outline" className="gap-1.5 px-2 py-1 text-xs bg-card/90 backdrop-blur-sm shadow">
              <Grip className="h-3 w-3" />
              Drag to pan | Scroll to zoom
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

        {/* Zoom level indicator */}
        <div className="absolute bottom-4 right-4 rounded-md border border-border bg-card/95 px-2 py-1 text-xs text-muted-foreground shadow-lg backdrop-blur-sm">
          Zoom: {zoom.toFixed(1)}
        </div>

        {/* Attribution */}
        <div className="absolute bottom-4 right-24 rounded-md bg-card/80 px-2 py-0.5 text-[10px] text-muted-foreground backdrop-blur-sm">
          OpenStreetMap
        </div>

        {/* Fullscreen Exit */}
        {isFullscreen && (
          <Button
            variant="secondary"
            size="sm"
            className="absolute left-4 top-24 gap-2 shadow-lg"
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
  containerSize: { width: number; height: number }
  onClose: () => void
}

function PropertyPopup({ property, position, containerSize, onClose }: PropertyPopupProps) {
  // Adjust position to keep popup within bounds
  const popupWidth = 288
  const popupHeight = 260
  
  let adjustedX = position.x
  let adjustedY = position.y - 10
  
  // Keep within horizontal bounds
  if (adjustedX - popupWidth / 2 < 10) {
    adjustedX = popupWidth / 2 + 10
  } else if (adjustedX + popupWidth / 2 > containerSize.width - 10) {
    adjustedX = containerSize.width - popupWidth / 2 - 10
  }
  
  // Keep within vertical bounds
  if (adjustedY - popupHeight < 10) {
    adjustedY = position.y + popupHeight + 40 // Show below pin instead
  }

  return (
    <div
      className="absolute z-40 w-72 animate-in fade-in zoom-in-95 duration-200 pointer-events-auto"
      style={{
        left: adjustedX,
        top: adjustedY,
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
