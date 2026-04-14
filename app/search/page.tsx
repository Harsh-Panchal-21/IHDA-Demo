"use client"

import { useState, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { ZillowMap } from "@/components/search/zillow-map"
import { PropertyList } from "@/components/search/property-list"
import { SearchHeader } from "@/components/search/search-header"
import { PropertyDrawer } from "@/components/search/property-drawer"

export type Property = {
  id: string
  title: string
  address: string
  city: string
  state: string
  zip: string
  rent: number
  bedrooms: number
  bathrooms: number
  sqft: number
  lat: number
  lng: number
  images: string[]
  status: "available" | "waitlist-open" | "coming-soon"
  programs: string[]
  accessibility: string[]
  rating: number
  reviews: number
  waitTime: string | null
  yearBuilt: number
  pets: boolean
  laundry: string
  parking: string
}

// Enhanced mock data
const properties: Property[] = [
  {
    id: "1",
    title: "Sunny 2BR Apartment",
    address: "2450 N Lincoln Ave",
    city: "Chicago",
    state: "IL",
    zip: "60614",
    rent: 1200,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 950,
    lat: 41.9216,
    lng: -87.6513,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    ],
    status: "available",
    programs: ["Section 8", "LIHTC"],
    accessibility: ["Elevator"],
    rating: 4.8,
    reviews: 24,
    waitTime: null,
    yearBuilt: 2018,
    pets: true,
    laundry: "In-unit",
    parking: "Garage",
  },
  {
    id: "2",
    title: "Modern Studio in Pilsen",
    address: "1856 S Ashland Ave",
    city: "Chicago",
    state: "IL",
    zip: "60608",
    rent: 850,
    bedrooms: 0,
    bathrooms: 1,
    sqft: 550,
    lat: 41.8567,
    lng: -87.6686,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    ],
    status: "waitlist-open",
    programs: ["HCV"],
    accessibility: ["Wheelchair"],
    rating: 4.5,
    reviews: 18,
    waitTime: "3-6 months",
    yearBuilt: 2020,
    pets: false,
    laundry: "In-building",
    parking: "Street",
  },
  {
    id: "3",
    title: "Spacious 3BR Family Home",
    address: "5234 W Madison St",
    city: "Chicago",
    state: "IL",
    zip: "60644",
    rent: 1450,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1400,
    lat: 41.8815,
    lng: -87.7462,
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop",
    ],
    status: "available",
    programs: ["Public Housing"],
    accessibility: ["Wheelchair", "Grab Bars"],
    rating: 4.9,
    reviews: 31,
    waitTime: null,
    yearBuilt: 2015,
    pets: true,
    laundry: "In-unit",
    parking: "Driveway",
  },
  {
    id: "4",
    title: "Cozy 1BR Near Transit",
    address: "3721 N Halsted St",
    city: "Chicago",
    state: "IL",
    zip: "60613",
    rent: 975,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 700,
    lat: 41.9438,
    lng: -87.6491,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    ],
    status: "waitlist-open",
    programs: ["Section 8", "PBRA"],
    accessibility: [],
    rating: 4.3,
    reviews: 12,
    waitTime: "1-2 months",
    yearBuilt: 2019,
    pets: true,
    laundry: "In-building",
    parking: "Street",
  },
  {
    id: "5",
    title: "Updated 2BR in Rogers Park",
    address: "7432 N Sheridan Rd",
    city: "Chicago",
    state: "IL",
    zip: "60626",
    rent: 1100,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 900,
    lat: 42.0087,
    lng: -87.6614,
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    ],
    status: "coming-soon",
    programs: ["LIHTC"],
    accessibility: ["Elevator"],
    rating: 4.6,
    reviews: 8,
    waitTime: "Coming Q2 2024",
    yearBuilt: 2022,
    pets: true,
    laundry: "In-unit",
    parking: "Lot",
  },
  {
    id: "6",
    title: "Affordable 1BR in South Shore",
    address: "7156 S Shore Dr",
    city: "Chicago",
    state: "IL",
    zip: "60649",
    rent: 925,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 680,
    lat: 41.7943,
    lng: -87.5907,
    images: [
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop",
    ],
    status: "available",
    programs: ["HCV", "PBRA"],
    accessibility: [],
    rating: 4.4,
    reviews: 15,
    waitTime: null,
    yearBuilt: 2017,
    pets: false,
    laundry: "In-building",
    parking: "Street",
  },
  {
    id: "7",
    title: "Luxury 2BR Near Loop",
    address: "1200 S Michigan Ave",
    city: "Chicago",
    state: "IL",
    zip: "60605",
    rent: 1650,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    lat: 41.8827,
    lng: -87.6233,
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    ],
    status: "available",
    programs: ["LIHTC"],
    accessibility: ["Elevator", "Wheelchair"],
    rating: 4.9,
    reviews: 42,
    waitTime: null,
    yearBuilt: 2021,
    pets: true,
    laundry: "In-unit",
    parking: "Garage",
  },
  {
    id: "8",
    title: "Charming 1BR in Bucktown",
    address: "2100 N Damen Ave",
    city: "Chicago",
    state: "IL",
    zip: "60647",
    rent: 1050,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 750,
    lat: 41.9103,
    lng: -87.6779,
    images: [
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    ],
    status: "waitlist-open",
    programs: ["Section 8"],
    accessibility: [],
    rating: 4.7,
    reviews: 28,
    waitTime: "2-4 months",
    yearBuilt: 2016,
    pets: true,
    laundry: "In-unit",
    parking: "Street",
  },
  {
    id: "9",
    title: "Modern 2BR in Bridgeport",
    address: "3345 S Halsted St",
    city: "Chicago",
    state: "IL",
    zip: "60608",
    rent: 1325,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 980,
    lat: 41.8525,
    lng: -87.6324,
    images: [
      "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
    ],
    status: "available",
    programs: ["Public Housing", "LIHTC"],
    accessibility: ["Elevator"],
    rating: 4.5,
    reviews: 19,
    waitTime: null,
    yearBuilt: 2019,
    pets: true,
    laundry: "In-building",
    parking: "Lot",
  },
  {
    id: "10",
    title: "Budget Studio in Edgewater",
    address: "5600 N Broadway",
    city: "Chicago",
    state: "IL",
    zip: "60660",
    rent: 775,
    bedrooms: 0,
    bathrooms: 1,
    sqft: 480,
    lat: 41.9676,
    lng: -87.6592,
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop",
    ],
    status: "available",
    programs: ["HCV"],
    accessibility: [],
    rating: 4.2,
    reviews: 9,
    waitTime: null,
    yearBuilt: 2014,
    pets: false,
    laundry: "In-building",
    parking: "Street",
  },
  // Springfield, IL Properties
  {
    id: "11",
    title: "Capitol View 2BR Apartment",
    address: "301 E Capitol Ave",
    city: "Springfield",
    state: "IL",
    zip: "62701",
    rent: 895,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 920,
    lat: 39.7990,
    lng: -89.6437,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    ],
    status: "available",
    programs: ["Section 8", "LIHTC"],
    accessibility: ["Elevator"],
    rating: 4.6,
    reviews: 18,
    waitTime: null,
    yearBuilt: 2017,
    pets: true,
    laundry: "In-unit",
    parking: "Lot",
  },
  {
    id: "12",
    title: "Downtown Springfield Studio",
    address: "524 E Monroe St",
    city: "Springfield",
    state: "IL",
    zip: "62701",
    rent: 650,
    bedrooms: 0,
    bathrooms: 1,
    sqft: 500,
    lat: 39.7983,
    lng: -89.6390,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    ],
    status: "waitlist-open",
    programs: ["HCV"],
    accessibility: [],
    rating: 4.3,
    reviews: 12,
    waitTime: "2-3 months",
    yearBuilt: 2019,
    pets: false,
    laundry: "In-building",
    parking: "Street",
  },
  {
    id: "13",
    title: "Lincoln Park Family Home",
    address: "1820 S 5th St",
    city: "Springfield",
    state: "IL",
    zip: "62703",
    rent: 1150,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1350,
    lat: 39.7712,
    lng: -89.6467,
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop",
    ],
    status: "available",
    programs: ["Public Housing", "PBRA"],
    accessibility: ["Wheelchair", "Grab Bars"],
    rating: 4.8,
    reviews: 26,
    waitTime: null,
    yearBuilt: 2020,
    pets: true,
    laundry: "In-unit",
    parking: "Driveway",
  },
  {
    id: "14",
    title: "Westside 1BR Near Shopping",
    address: "3201 W Jefferson St",
    city: "Springfield",
    state: "IL",
    zip: "62702",
    rent: 725,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 680,
    lat: 39.7817,
    lng: -89.6892,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    ],
    status: "available",
    programs: ["Section 8"],
    accessibility: [],
    rating: 4.4,
    reviews: 15,
    waitTime: null,
    yearBuilt: 2016,
    pets: true,
    laundry: "In-building",
    parking: "Lot",
  },
  {
    id: "15",
    title: "Historic District 2BR",
    address: "612 S 6th St",
    city: "Springfield",
    state: "IL",
    zip: "62703",
    rent: 975,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 880,
    lat: 39.7923,
    lng: -89.6442,
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop",
    ],
    status: "coming-soon",
    programs: ["LIHTC"],
    accessibility: ["Elevator"],
    rating: 4.7,
    reviews: 8,
    waitTime: "Coming Q2 2024",
    yearBuilt: 2023,
    pets: true,
    laundry: "In-unit",
    parking: "Garage",
  },
  {
    id: "16",
    title: "Eastside Senior Living",
    address: "2400 E Sangamon Ave",
    city: "Springfield",
    state: "IL",
    zip: "62702",
    rent: 695,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 620,
    lat: 39.8015,
    lng: -89.6102,
    images: [
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&h=600&fit=crop",
    ],
    status: "waitlist-open",
    programs: ["Section 202", "PBRA"],
    accessibility: ["Wheelchair", "Grab Bars", "Elevator"],
    rating: 4.9,
    reviews: 34,
    waitTime: "6-12 months",
    yearBuilt: 2018,
    pets: false,
    laundry: "In-building",
    parking: "Lot",
  },
]

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
