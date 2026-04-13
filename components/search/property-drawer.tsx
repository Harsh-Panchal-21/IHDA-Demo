"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  X,
  Heart,
  Share2,
  MapPin,
  Bed,
  Bath,
  Square,
  Star,
  Calendar,
  Car,
  Shirt,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  ExternalLink,
  Accessibility,
  Building2,
  Shield,
  Info
} from "lucide-react"
import type { Property } from "@/app/search/page"

interface PropertyDrawerProps {
  property: Property | null
  open: boolean
  onClose: () => void
}

export function PropertyDrawer({ property, open, onClose }: PropertyDrawerProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  if (!property) return null

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-xl p-0 overflow-hidden">
        <div className="flex h-full flex-col">
          {/* Header with Image */}
          <div className="relative">
            {/* Image Carousel */}
            <div className="relative aspect-[16/10] bg-muted">
              <Image
                src={property.images[currentImage]}
                alt={property.title}
                fill
                className="object-cover"
              />
              
              {/* Image Navigation */}
              {property.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
                    {currentImage + 1} / {property.images.length}
                  </div>
                </>
              )}

              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-3 top-3 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Status Badge */}
              <div className="absolute left-3 top-3">
                <StatusBadge status={property.status} />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Thumbnail Strip */}
            {property.images.length > 1 && (
              <div className="absolute bottom-3 right-3 flex gap-1.5">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`h-12 w-12 overflow-hidden rounded-md border-2 transition-all ${
                      idx === currentImage
                        ? "border-white"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Price and Actions */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">${property.rent}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-sm">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{property.rating}</span>
                    <span className="text-muted-foreground">({property.reviews} reviews)</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isFavorite ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Title & Address */}
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {property.title}
              </h2>
              <p className="flex items-center gap-2 text-muted-foreground mb-6">
                <MapPin className="h-4 w-4" />
                {property.address}, {property.city}, {property.state} {property.zip}
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-4 gap-4 p-4 rounded-xl bg-muted/50 mb-6">
                <div className="text-center">
                  <Bed className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                  <p className="font-semibold">{property.bedrooms === 0 ? "Studio" : property.bedrooms}</p>
                  <p className="text-xs text-muted-foreground">Beds</p>
                </div>
                <div className="text-center">
                  <Bath className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                  <p className="font-semibold">{property.bathrooms}</p>
                  <p className="text-xs text-muted-foreground">Baths</p>
                </div>
                <div className="text-center">
                  <Square className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                  <p className="font-semibold">{property.sqft.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Sq Ft</p>
                </div>
                <div className="text-center">
                  <Calendar className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                  <p className="font-semibold">{property.yearBuilt}</p>
                  <p className="text-xs text-muted-foreground">Built</p>
                </div>
              </div>

              {/* Wait Time Alert */}
              {property.waitTime && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 mb-6">
                  <Clock className="h-5 w-5 text-amber-600 shrink-0" />
                  <div>
                    <p className="font-medium text-amber-900">Estimated Wait Time</p>
                    <p className="text-sm text-amber-700">{property.waitTime}</p>
                  </div>
                </div>
              )}

              <Separator className="my-6" />

              {/* Housing Programs */}
              <div className="mb-6">
                <h3 className="flex items-center gap-2 font-semibold text-foreground mb-3">
                  <Shield className="h-5 w-5 text-primary" />
                  Accepted Housing Programs
                </h3>
                <div className="flex flex-wrap gap-2">
                  {property.programs.map((program) => (
                    <Badge key={program} variant="secondary" className="px-3 py-1">
                      {program}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h3 className="flex items-center gap-2 font-semibold text-foreground mb-3">
                  <Building2 className="h-5 w-5 text-primary" />
                  Amenities
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Shirt className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Laundry</p>
                      <p className="text-xs text-muted-foreground">{property.laundry}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Car className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Parking</p>
                      <p className="text-xs text-muted-foreground">{property.parking}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <span className="text-xl">🐕</span>
                    <div>
                      <p className="text-sm font-medium">Pets</p>
                      <p className="text-xs text-muted-foreground">{property.pets ? "Allowed" : "Not Allowed"}</p>
                    </div>
                  </div>
                  {property.accessibility.length > 0 && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Accessibility className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Accessibility</p>
                        <p className="text-xs text-muted-foreground">{property.accessibility.join(", ")}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Income Requirements */}
              <div className="mb-6 p-4 rounded-xl border border-border">
                <h3 className="flex items-center gap-2 font-semibold text-foreground mb-3">
                  <Info className="h-5 w-5 text-primary" />
                  Income Requirements
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Income limits vary by household size and housing program. Generally:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Maximum income: 50-80% of Area Median Income (AMI)</li>
                  <li>• Rent typically should not exceed 30% of monthly income</li>
                  <li>• Some units have minimum income requirements</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-border bg-card p-4">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Button variant="outline" className="gap-2">
                <Phone className="h-4 w-4" />
                Call
              </Button>
              <Button variant="outline" className="gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Button>
            </div>
            <Link href={`/property/${property.id}`} className="block">
              <Button className="w-full gap-2">
                View Full Details
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function StatusBadge({ status }: { status: Property["status"] }) {
  switch (status) {
    case "available":
      return (
        <Badge className="bg-emerald-500 text-white hover:bg-emerald-600 gap-1.5 px-3 py-1">
          <CheckCircle className="h-3.5 w-3.5" />
          Available Now
        </Badge>
      )
    case "waitlist-open":
      return (
        <Badge className="bg-amber-500 text-white hover:bg-amber-600 gap-1.5 px-3 py-1">
          <Clock className="h-3.5 w-3.5" />
          Waitlist Open
        </Badge>
      )
    case "coming-soon":
      return (
        <Badge className="bg-slate-500 text-white hover:bg-slate-600 gap-1.5 px-3 py-1">
          <Clock className="h-3.5 w-3.5" />
          Coming Soon
        </Badge>
      )
    default:
      return null
  }
}
