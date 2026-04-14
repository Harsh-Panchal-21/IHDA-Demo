"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  Accessibility,
  Car,
  Shirt
} from "lucide-react"
import type { Property } from "@/app/search/page"

interface PropertyListProps {
  properties: Property[]
  selectedProperty: Property | null
  hoveredProperty: string | null
  onPropertyHover: (propertyId: string | null) => void
}

export function PropertyList({
  properties,
  selectedProperty,
  hoveredProperty,
  onPropertyHover,
}: PropertyListProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-4">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isSelected={selectedProperty?.id === property.id}
            isHovered={hoveredProperty === property.id}
            onHover={(hover) => onPropertyHover(hover ? property.id : null)}
          />
        ))}
      </div>
    </div>
  )
}

interface PropertyCardProps {
  property: Property
  isSelected: boolean
  isHovered: boolean
  onHover: (hover: boolean) => void
}

function PropertyCard({ property, isSelected, isHovered, onHover }: PropertyCardProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImage((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <Link href={`/property/${property.id}`}>
      <Card
        className={`group cursor-pointer overflow-hidden transition-all duration-200 ${
          isSelected
            ? "ring-2 ring-primary shadow-lg"
            : isHovered
            ? "ring-1 ring-primary/50 shadow-md"
            : "hover:shadow-md"
        }`}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
      {/* Image Carousel */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={property.images[currentImage]}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Image Navigation */}
        {property.images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            {/* Image Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {property.images.map((_, idx) => (
                <button
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentImage
                      ? "w-4 bg-white"
                      : "w-1.5 bg-white/60"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImage(idx)
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3 h-9 w-9 rounded-full bg-white/90 shadow-md hover:bg-white"
          onClick={toggleFavorite}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
            }`}
          />
        </Button>

        {/* Status Badge */}
        <div className="absolute left-3 top-3">
          <StatusBadge status={property.status} />
        </div>

        {/* Accessibility Badge */}
        {property.accessibility.length > 0 && (
          <div className="absolute left-3 bottom-3">
            <Badge className="bg-primary/90 text-white gap-1">
              <Accessibility className="h-3 w-3" />
              ADA
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price & Rating */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className="text-2xl font-bold text-foreground">${property.rent}</span>
            <span className="text-muted-foreground">/mo</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-medium">{property.rating}</span>
            <span className="text-muted-foreground">({property.reviews})</span>
          </div>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
          <span className="flex items-center gap-1.5">
            <Bed className="h-4 w-4" />
            <span className="font-medium text-foreground">
              {property.bedrooms === 0 ? "Studio" : `${property.bedrooms}`}
            </span>
            {property.bedrooms > 0 && " bd"}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4" />
            <span className="font-medium text-foreground">{property.bathrooms}</span> ba
          </span>
          <span className="flex items-center gap-1.5">
            <Square className="h-4 w-4" />
            <span className="font-medium text-foreground">{property.sqft.toLocaleString()}</span> sqft
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
          {property.title}
        </h3>

        {/* Address */}
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="line-clamp-1">{property.address}, {property.city}, {property.state} {property.zip}</span>
        </p>

        {/* Amenities */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          {property.pets && (
            <span className="flex items-center gap-1">
              <span className="text-base">🐕</span> Pets OK
            </span>
          )}
          <span className="flex items-center gap-1">
            <Shirt className="h-3.5 w-3.5" />
            {property.laundry}
          </span>
          <span className="flex items-center gap-1">
            <Car className="h-3.5 w-3.5" />
            {property.parking}
          </span>
        </div>

        {/* Programs */}
        <div className="flex flex-wrap gap-1.5">
          {property.programs.map((program) => (
            <Badge key={program} variant="outline" className="text-xs px-2 py-0.5">
              {program}
            </Badge>
          ))}
        </div>

        {/* Wait Time */}
        {property.waitTime && (
          <p className="mt-3 text-xs text-amber-600 font-medium">
            Est. wait: {property.waitTime}
          </p>
        )}
      </div>
      </Card>
    </Link>
  )
}

function StatusBadge({ status }: { status: Property["status"] }) {
  switch (status) {
    case "available":
      return (
        <Badge className="bg-emerald-500 text-white hover:bg-emerald-600 gap-1 shadow-sm">
          <CheckCircle className="h-3 w-3" />
          Available
        </Badge>
      )
    case "waitlist-open":
      return (
        <Badge className="bg-amber-500 text-white hover:bg-amber-600 gap-1 shadow-sm">
          <Clock className="h-3 w-3" />
          Waitlist Open
        </Badge>
      )
    case "coming-soon":
      return (
        <Badge className="bg-slate-500 text-white hover:bg-slate-600 gap-1 shadow-sm">
          <Clock className="h-3 w-3" />
          Coming Soon
        </Badge>
      )
    default:
      return null
  }
}
