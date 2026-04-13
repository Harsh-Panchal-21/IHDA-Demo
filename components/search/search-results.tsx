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
import { MapPin, Bed, Bath, Square, Heart, Clock, CheckCircle } from "lucide-react"

// Mock data for listings
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
  },
]

export function SearchResults() {
  const [sortBy, setSortBy] = useState("relevance")
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (id: string) => {
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
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="mr-1 h-3 w-3" />
            Available
          </Badge>
        )
      case "waitlist-open":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
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
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{mockListings.length}</span> properties found
        </p>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {mockListings.map((listing) => (
            <Link key={listing.id} href={`/property/${listing.id}`}>
              <Card className="group cursor-pointer overflow-hidden transition-all hover:border-primary/50 hover:shadow-md">
                <CardContent className="p-0">
                  <div className="flex">
                    {/* Image */}
                    <div className="relative h-32 w-40 shrink-0">
                      <Image
                        src={listing.image}
                        alt={listing.title}
                        fill
                        className="object-cover"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1 h-8 w-8 rounded-full bg-background/80 hover:bg-background"
                        onClick={(e) => {
                          e.preventDefault()
                          toggleFavorite(listing.id)
                        }}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites.includes(listing.id)
                              ? "fill-red-500 text-red-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      </Button>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between p-3">
                      <div>
                        <div className="mb-1 flex items-start justify-between gap-2">
                          <h3 className="line-clamp-1 text-sm font-semibold text-foreground group-hover:text-primary">
                            {listing.title}
                          </h3>
                          <span className="shrink-0 text-sm font-bold text-primary">
                            ${listing.rent}/mo
                          </span>
                        </div>
                        <p className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span className="line-clamp-1">{listing.address}</span>
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Bed className="h-3 w-3" />
                            {listing.bedrooms === 0 ? "Studio" : `${listing.bedrooms} BR`}
                          </span>
                          <span className="flex items-center gap-1">
                            <Bath className="h-3 w-3" />
                            {listing.bathrooms} BA
                          </span>
                          <span className="flex items-center gap-1">
                            <Square className="h-3 w-3" />
                            {listing.sqft} sqft
                          </span>
                        </div>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {listing.programs.slice(0, 2).map((program) => (
                            <Badge key={program} variant="outline" className="text-[10px] px-1.5 py-0">
                              {program}
                            </Badge>
                          ))}
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
    </div>
  )
}
