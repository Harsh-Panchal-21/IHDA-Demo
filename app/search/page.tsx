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
]

export default function SearchPage() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
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

  return (
    <div className="flex h-screen flex-col bg-background">
      <Navbar />
      
      {/* Search Header */}
      <SearchHeader filters={filters} onFiltersChange={setFilters} propertyCount={properties.length} />
      
      {/* Main Content - Split View */}
      <div className="flex flex-1 overflow-hidden">
        {/* Property List - Left Side */}
        <div className="w-full lg:w-[480px] xl:w-[520px] shrink-0 overflow-hidden border-r border-border">
          <PropertyList
            properties={properties}
            selectedProperty={selectedProperty}
            hoveredProperty={hoveredProperty}
            onPropertySelect={handlePropertySelect}
            onPropertyHover={handlePropertyHover}
          />
        </div>

        {/* Map - Right Side */}
        <div className="hidden flex-1 lg:block">
          <ZillowMap
            properties={properties}
            selectedProperty={selectedProperty}
            hoveredProperty={hoveredProperty}
            onPropertySelect={handlePropertySelect}
            onPropertyHover={handlePropertyHover}
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
