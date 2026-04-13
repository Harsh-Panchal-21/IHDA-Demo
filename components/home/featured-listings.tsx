"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Heart, 
  ArrowRight,
  CheckCircle,
  Clock,
  Sparkles
} from "lucide-react"

const featuredListings = [
  {
    id: "1",
    title: "Modern 2BR in Lincoln Park",
    address: "2450 N Lincoln Ave, Chicago, IL 60614",
    rent: 1200,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 950,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
    status: "available",
    programs: ["Section 8", "LIHTC"],
    featured: true,
  },
  {
    id: "2",
    title: "Cozy Studio in Pilsen",
    address: "1856 S Ashland Ave, Chicago, IL 60608",
    rent: 850,
    bedrooms: 0,
    bathrooms: 1,
    sqft: 550,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
    status: "waitlist-open",
    programs: ["HCV"],
    featured: true,
  },
  {
    id: "3",
    title: "Spacious 3BR Family Home",
    address: "5234 W Madison St, Chicago, IL 60644",
    rent: 1450,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1400,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop",
    status: "available",
    programs: ["Public Housing"],
    featured: false,
  },
  {
    id: "4",
    title: "Updated 1BR Near Transit",
    address: "3721 N Halsted St, Chicago, IL 60613",
    rent: 975,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 700,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    status: "available",
    programs: ["Section 8", "PBRA"],
    featured: false,
  },
]

export function FeaturedListings() {
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Featured Properties
            </div>
            <h2 className="mb-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Available Now
            </h2>
            <p className="max-w-xl text-muted-foreground">
              Explore our top affordable housing options with immediate availability or open waitlists.
            </p>
          </div>
          <Link href="/search">
            <Button variant="outline" className="gap-2">
              View All Listings
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Listings Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredListings.map((listing) => (
            <Link key={listing.id} href={`/property/${listing.id}`}>
              <Card className="group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={listing.image}
                      alt={listing.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Status Badge */}
                    <Badge 
                      className={`absolute left-3 top-3 ${
                        listing.status === "available" 
                          ? "bg-emerald-500 text-white" 
                          : "bg-amber-500 text-white"
                      }`}
                    >
                      {listing.status === "available" ? (
                        <><CheckCircle className="mr-1 h-3 w-3" /> Available</>
                      ) : (
                        <><Clock className="mr-1 h-3 w-3" /> Waitlist Open</>
                      )}
                    </Badge>

                    {/* Featured Badge */}
                    {listing.featured && (
                      <Badge className="absolute right-3 top-3 bg-primary text-primary-foreground">
                        <Sparkles className="mr-1 h-3 w-3" /> Featured
                      </Badge>
                    )}

                    {/* Favorite Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-3 bottom-3 h-9 w-9 rounded-full bg-white/90 text-foreground backdrop-blur-sm hover:bg-white"
                      onClick={(e) => toggleFavorite(e, listing.id)}
                    >
                      <Heart 
                        className={`h-4 w-4 transition-colors ${
                          favorites.includes(listing.id) 
                            ? "fill-red-500 text-red-500" 
                            : ""
                        }`} 
                      />
                    </Button>

                    {/* Price */}
                    <div className="absolute bottom-3 left-3">
                      <p className="text-2xl font-bold text-white">
                        ${listing.rent}
                        <span className="text-sm font-normal opacity-80">/mo</span>
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="mb-1 line-clamp-1 font-semibold text-foreground group-hover:text-primary">
                      {listing.title}
                    </h3>
                    <p className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="line-clamp-1">{listing.address}</span>
                    </p>

                    {/* Features */}
                    <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        {listing.bedrooms === 0 ? "Studio" : `${listing.bedrooms} Bed`}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        {listing.bathrooms} Bath
                      </span>
                      <span className="flex items-center gap-1">
                        <Square className="h-4 w-4" />
                        {listing.sqft}
                      </span>
                    </div>

                    {/* Programs */}
                    <div className="flex flex-wrap gap-1">
                      {listing.programs.map((program) => (
                        <Badge key={program} variant="secondary" className="text-xs">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link href="/search">
            <Button size="lg" className="gap-2">
              Explore All Properties
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
