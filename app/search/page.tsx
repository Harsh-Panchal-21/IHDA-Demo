"use client"

import { useState, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { ZillowMap } from "@/components/search/zillow-map"
import { PropertyList } from "@/components/search/property-list"
import { SearchHeader } from "@/components/search/search-header"
import { PropertyDrawer } from "@/components/search/property-drawer"
import { properties, type Property } from "@/lib/properties-data"

export type { Property }

// City coordinates for map centering
const CITY_COORDS: Record<string, { lat: number; lng: number; zoom: number }> = {
  "chicago": { lat: 41.8781, lng: -87.6298, zoom: 12 },
  "springfield": { lat: 39.7817, lng: -89.6501, zoom: 13 },
  "peoria": { lat: 40.6936, lng: -89.5890, zoom: 13 },
  "rockford": { lat: 42.2711, lng: -89.0940, zoom: 13 },
  "naperville": { lat: 41.7508, lng: -88.1535, zoom: 13 },
  "aurora": { lat: 41.7606, lng: -88.3201, zoom: 13 },
  "joliet": { lat: 41.5250, lng: -88.0817, zoom: 13 },
  "elgin": { lat: 42.0354, lng: -88.2826, zoom: 13 },
  "champaign": { lat: 40.1164, lng: -88.2434, zoom: 13 },
  "decatur": { lat: 39.8403, lng: -88.9548, zoom: 13 },
  "evanston": { lat: 42.0451, lng: -87.6877, zoom: 14 },
  "waukegan": { lat: 42.3636, lng: -87.8448, zoom: 13 },
  "cicero": { lat: 41.8456, lng: -87.7539, zoom: 14 },
  "bloomington": { lat: 40.4842, lng: -88.9937, zoom: 13 },
}

export default function SearchPage() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchLocation, setSearchLocation] = useState("Chicago, IL")
  const [mapCenter, setMapCenter] = useState({ lat: 41.8781, lng: -87.6298 })
  const [mapZoom, setMapZoom] = useState(12)
  const [filters, setFilters] = useState({
    minRent: 0,
    maxRent: 5000,
    bedrooms: "any",
    bathrooms: "any",
    programs: [] as string[],
    status: "all",
  })

  const handlePropertySelect = useCallback((property: Property) => {
    setSelectedProperty(property)
    setDrawerOpen(true)
  }, [])

  const handlePropertyHover = useCallback((propertyId: string | null) => {
    setHoveredProperty(propertyId)
  }, [])

  const handleCloseDrawer = useCallback(() => {
    setDrawerOpen(false)
    setTimeout(() => setSelectedProperty(null), 300)
  }, [])

  const handleLocationSearch = useCallback((location: string) => {
    setSearchLocation(location)
    
    // Close any open drawer and reset selection when changing location
    setDrawerOpen(false)
    setSelectedProperty(null)
    setHoveredProperty(null)
    
    // Extract city name from search query
    const cityName = location.toLowerCase().split(",")[0].trim()
    
    // Check if we have coordinates for this city
    const cityCoords = CITY_COORDS[cityName]
    if (cityCoords) {
      setMapCenter({ lat: cityCoords.lat, lng: cityCoords.lng })
      setMapZoom(cityCoords.zoom)
    }
  }, [])

  // Extract current search city
  const searchCity = searchLocation.toLowerCase().split(",")[0].trim()

  // Filter properties based on filters and location
  const filteredProperties = properties.filter((property) => {
    // Filter by city/location
    if (searchCity && searchCity !== "all" && searchCity !== "illinois") {
      if (property.city.toLowerCase() !== searchCity) return false
    }
    
    // Filter by rent
    if (property.rent < filters.minRent || property.rent > filters.maxRent) return false
    
    // Filter by bedrooms
    if (filters.bedrooms !== "any") {
      if (filters.bedrooms === "4+") {
        if (property.bedrooms < 4) return false
      } else if (property.bedrooms !== parseInt(filters.bedrooms)) {
        return false
      }
    }
    
    // Filter by bathrooms
    if (filters.bathrooms !== "any") {
      if (filters.bathrooms === "3+") {
        if (property.bathrooms < 3) return false
      } else if (property.bathrooms !== parseInt(filters.bathrooms)) {
        return false
      }
    }
    
    // Filter by programs
    if (filters.programs.length > 0) {
      if (!filters.programs.some(p => property.programs.includes(p))) return false
    }
    
    // Filter by status
    if (filters.status !== "all" && property.status !== filters.status) return false
    
    return true
  })

  return (
    <div className="flex h-screen flex-col bg-background">
      <Navbar />
      
      {/* Search Header */}
      <SearchHeader 
        filters={filters} 
        onFiltersChange={setFilters} 
        propertyCount={filteredProperties.length}
        searchLocation={searchLocation}
        onLocationSearch={handleLocationSearch}
      />
      
      {/* Main Content - Split View */}
      <div className="flex flex-1 overflow-hidden">
        {/* Property List - Left Side */}
        <div className="w-full lg:w-[480px] xl:w-[520px] shrink-0 overflow-hidden border-r border-border">
          <PropertyList
            properties={filteredProperties}
            selectedProperty={selectedProperty}
            hoveredProperty={hoveredProperty}
            onPropertySelect={handlePropertySelect}
            onPropertyHover={handlePropertyHover}
          />
        </div>

        {/* Map - Right Side */}
        <div className="hidden flex-1 lg:block">
          <ZillowMap
            properties={filteredProperties}
            selectedProperty={selectedProperty}
            hoveredProperty={hoveredProperty}
            onPropertySelect={handlePropertySelect}
            onPropertyHover={handlePropertyHover}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>
      </div>

      {/* Property Detail Drawer */}
      <PropertyDrawer
        property={selectedProperty}
        open={drawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  )
}
