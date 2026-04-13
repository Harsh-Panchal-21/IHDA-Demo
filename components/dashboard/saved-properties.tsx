"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MapPin, Bed, Bath, Trash2, ArrowRight } from "lucide-react"

const savedProperties = [
  {
    id: "1",
    title: "Sunny 2BR Apartment in Lincoln Park",
    address: "2450 N Lincoln Ave, Chicago, IL 60614",
    rent: 1200,
    bedrooms: 2,
    bathrooms: 1,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    status: "available",
    savedDate: "2024-01-10",
  },
  {
    id: "3",
    title: "Spacious 3BR Family Home",
    address: "5234 W Madison St, Chicago, IL 60644",
    rent: 1450,
    bedrooms: 3,
    bathrooms: 2,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
    status: "available",
    savedDate: "2024-01-08",
  },
  {
    id: "5",
    title: "Updated 2BR in Rogers Park",
    address: "7432 N Sheridan Rd, Chicago, IL 60626",
    rent: 1100,
    bedrooms: 2,
    bathrooms: 1,
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
    status: "coming-soon",
    savedDate: "2024-01-05",
  },
]

export function SavedProperties() {
  const [properties, setProperties] = useState(savedProperties)

  const removeProperty = (id: string) => {
    setProperties(properties.filter((p) => p.id !== id))
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Saved Properties
        </CardTitle>
        <Link href="/dashboard/saved">
          <Button variant="ghost" size="sm" className="gap-2">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {properties.slice(0, 3).map((property) => (
            <div
              key={property.id}
              className="group overflow-hidden rounded-lg border border-border transition-all hover:border-primary/30 hover:shadow-md"
            >
              {/* Image */}
              <div className="relative aspect-[4/3]">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <Badge
                  className={`absolute left-2 top-2 ${
                    property.status === "available"
                      ? "bg-green-100 text-green-800"
                      : property.status === "waitlist-open"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {property.status === "available"
                    ? "Available"
                    : property.status === "waitlist-open"
                    ? "Waitlist Open"
                    : "Coming Soon"}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => removeProperty(property.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-3">
                <div className="mb-2 flex items-start justify-between">
                  <Link
                    href={`/property/${property.id}`}
                    className="line-clamp-1 font-semibold text-foreground hover:text-primary"
                  >
                    {property.title}
                  </Link>
                  <span className="shrink-0 font-bold text-primary">
                    ${property.rent}/mo
                  </span>
                </div>

                <p className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span className="line-clamp-1">{property.address}</span>
                </p>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Bed className="h-3 w-3" />
                    {property.bedrooms} BR
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="h-3 w-3" />
                    {property.bathrooms} BA
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {properties.length === 0 && (
          <div className="py-8 text-center">
            <Heart className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="mb-2 font-semibold text-foreground">No Saved Properties</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Start saving properties you&apos;re interested in.
            </p>
            <Link href="/search">
              <Button>Browse Properties</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
