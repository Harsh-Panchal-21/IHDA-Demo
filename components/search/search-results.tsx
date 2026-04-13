"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Heart, 
  Clock, 
  CheckCircle, 
  Grid3X3, 
  List, 
  Accessibility,
  Star,
  ArrowUpDown
} from "lucide-react"
import { Toggle } from "@/components/ui/toggle"

// Extended mock data
const mockListings = [
  {
    id: "1",
    title: "Sunny 2BR Apartment in Lincoln Park",
    address: "2450 N Lincoln Ave, Chicago, IL 60614",
    rent: 1200,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 950,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    status: "available",
    programs: ["Section 8", "LIHTC"],
    accessibility: ["Elevator"],
    rating: 4.8,
    reviews: 24,
    waitTime: null,
  },
  {
    id: "2",
    title: "Modern Studio in Pilsen",
    address: "1856 S Ashland Ave, Chicago, IL 60608",
    rent: 850,
    bedrooms: 0,
    bathrooms: 1,
    sqft: 550,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    status: "waitlist-open",
    programs: ["HCV"],
    accessibility: ["Wheelchair"],
    rating: 4.5,
    reviews: 18,
    waitTime: "3-6 months",
  },
  {
    id: "3",
    title: "Spacious 3BR Family Home",
    address: "5234 W Madison St, Chicago, IL 60644",
    rent: 1450,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1400,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
    status: "available",
    programs: ["Public Housing"],
    accessibility: ["Wheelchair", "Grab Bars"],
    rating: 4.9,
    reviews: 31,
    waitTime: null,
  },
  {
    id: "4",
    title: "Cozy 1BR Near Transit",
    address: "3721 N Halsted St, Chicago, IL 60613",
    rent: 975,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 700,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    status: "waitlist-open",
    programs: ["Section 8", "PBRA"],
    accessibility: [],
    rating: 4.3,
    reviews: 12,
    waitTime: "1-2 months",
  },
  {
    id: "5",
    title: "Updated 2BR in Rogers Park",
    address: "7432 N Sheridan Rd, Chicago, IL 60626",
    rent: 1100,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 900,
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
    status: "coming-soon",
    programs: ["LIHTC"],
    accessibility: ["Elevator"],
    rating: 4.6,
    reviews: 8,
    waitTime: "Coming Q2 2024",
  },
  {
    id: "6",
    title: "Bright 1BR in Wicker Park",
    address: "1543 N Milwaukee Ave, Chicago, IL 60622",
    rent: 1050,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 750,
    image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&h=300&fit=crop",
    status: "available",
    programs: ["HCV", "LIHTC"],
    accessibility: [],
    rating: 4.7,
    reviews: 19,
    waitTime: null,
  },
]

export function SearchResults() {
  const [sortBy, setSortBy] = useState("relevance")
  const [favorites, setFavorites] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    e.stopPropagation()
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((f) => f !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
            <CheckCircle className="mr-1 h-3 w-3" />
            Available
          </Badge>
        )
      case "waitlist-open":
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
            <Clock className="mr-1 h-3 w-3" />
            Waitlist Open
          </Badge>
        )
      case "coming-soon":
        return (
          <Badge variant="secondary">
            <Clock className="mr-1 h-3 w-3" />
            Coming Soon
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Results Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{mockListings.length}</span> properties
          </p>
          <div className="flex items-center rounded-lg border border-border p-1">
            <Toggle
              pressed={viewMode === "list"}
              onPressedChange={() => setViewMode("list")}
              size="sm"
              className="h-7 w-7 p-0"
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </Toggle>
            <Toggle
              pressed={viewMode === "grid"}
              onPressedChange={() => setViewMode("grid")}
              size="sm"
              className="h-7 w-7 p-0"
              aria-label="Grid view"
            >
              <Grid3X3 className="h-4 w-4" />
            </Toggle>
          </div>
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[160px]">
            <ArrowUpDown className="mr-2 h-3.5 w-3.5" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className={viewMode === "grid" ? "grid grid-cols-2 gap-4" : "space-y-4"}>
          {mockListings.map((listing) => (
            <Link key={listing.id} href={`/property/${listing.id}`}>
              <Card className="group cursor-pointer overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg">
                <CardContent className="p-0">
                  <div className={viewMode === "grid" ? "flex flex-col" : "flex"}>
                    {/* Image */}
                    <div className={`relative shrink-0 overflow-hidden ${viewMode === "grid" ? "h-32" : "h-36 w-44"}`}>
                      <Image
                        src={listing.image}
                        alt={listing.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/90 hover:bg-white"
                        onClick={(e) => toggleFavorite(e, listing.id)}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites.includes(listing.id)
                              ? "fill-red-500 text-red-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      </Button>
                      {listing.accessibility.length > 0 && (
                        <div className="absolute bottom-2 left-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Accessibility className="h-3.5 w-3.5" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between p-4">
                      <div>
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <h3 className="line-clamp-1 font-semibold text-foreground group-hover:text-primary">
                            {listing.title}
                          </h3>
                          <span className="shrink-0 text-lg font-bold text-primary">
                            ${listing.rent}
                            <span className="text-xs font-normal text-muted-foreground">/mo</span>
                          </span>
                        </div>
                        <p className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 shrink-0" />
                          <span className="line-clamp-1">{listing.address}</span>
                        </p>
                        <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Bed className="h-3.5 w-3.5" />
                            {listing.bedrooms === 0 ? "Studio" : `${listing.bedrooms} BR`}
                          </span>
                          <span className="flex items-center gap-1">
                            <Bath className="h-3.5 w-3.5" />
                            {listing.bathrooms} BA
                          </span>
                          <span className="flex items-center gap-1">
                            <Square className="h-3.5 w-3.5" />
                            {listing.sqft} sqft
                          </span>
                        </div>
                        {/* Rating */}
                        <div className="mb-3 flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-medium">{listing.rating}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">({listing.reviews} reviews)</span>
                          {listing.waitTime && (
                            <>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">
                                Wait: {listing.waitTime}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {listing.programs.slice(0, 2).map((program) => (
                            <Badge key={program} variant="outline" className="px-2 py-0 text-[10px]">
                              {program}
                            </Badge>
                          ))}
                          {listing.programs.length > 2 && (
                            <Badge variant="outline" className="px-2 py-0 text-[10px]">
                              +{listing.programs.length - 2}
                            </Badge>
                          )}
                        </div>
                        {getStatusBadge(listing.status)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Load More */}
      <div className="border-t border-border p-4">
        <Button variant="outline" className="w-full">
          Load More Properties
        </Button>
      </div>
    </div>
  )
}
