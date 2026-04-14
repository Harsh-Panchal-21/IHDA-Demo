import { Navbar } from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Square,
  Trash2,
  ExternalLink,
  Bell,
  BellOff,
  Share2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { properties } from "@/lib/properties-data"

export const metadata = {
  title: "Saved Properties | IHDA Housing Locator",
  description: "View and manage your saved properties.",
}

// Mock saved properties (using some from our properties data)
const savedPropertyIds = ["1", "3", "5", "11", "13"]
const savedProperties = properties.filter((p) => savedPropertyIds.includes(p.id))

const statusColors = {
  available: "bg-green-100 text-green-800 border-green-200",
  "waitlist-open": "bg-amber-100 text-amber-800 border-amber-200",
  "coming-soon": "bg-blue-100 text-blue-800 border-blue-200",
}

const statusLabels = {
  available: "Available",
  "waitlist-open": "Waitlist Open",
  "coming-soon": "Coming Soon",
}

export default function SavedPropertiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r border-border bg-card lg:block">
          <DashboardSidebar />
        </aside>

        <main className="flex-1 bg-muted/30">
          <div className="container mx-auto max-w-5xl px-4 py-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Saved Properties</h1>
                <p className="mt-1 text-muted-foreground">
                  {savedProperties.length} properties saved
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/search">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Browse More
                </Link>
              </Button>
            </div>

            {savedProperties.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Heart className="h-16 w-16 text-muted-foreground/30" />
                  <h3 className="mt-4 text-lg font-medium">No Saved Properties</h3>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    Start saving properties you&apos;re interested in to compare them later.
                  </p>
                  <Button asChild className="mt-6">
                    <Link href="/search">Search Properties</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {savedProperties.map((property) => (
                  <Card key={property.id} className="overflow-hidden">
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={property.images[0]}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute right-2 top-2 flex gap-1">
                        <Badge
                          variant="outline"
                          className={`${statusColors[property.status]} border`}
                        >
                          {statusLabels[property.status]}
                        </Badge>
                      </div>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute left-2 top-2 h-8 w-8"
                      >
                        <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xl font-bold text-primary">
                            ${property.rent.toLocaleString()}
                            <span className="text-sm font-normal text-muted-foreground">/mo</span>
                          </p>
                          <h3 className="mt-1 font-medium text-foreground line-clamp-1">
                            {property.title}
                          </h3>
                          <p className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            {property.city}, {property.state}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Bed className="h-4 w-4" />
                          {property.bedrooms} bed
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="h-4 w-4" />
                          {property.bathrooms} bath
                        </span>
                        <span className="flex items-center gap-1">
                          <Square className="h-4 w-4" />
                          {property.sqft.toLocaleString()} sqft
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1">
                        {property.programs.slice(0, 2).map((program) => (
                          <Badge key={program} variant="secondary" className="text-xs">
                            {program}
                          </Badge>
                        ))}
                        {property.programs.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{property.programs.length - 2}
                          </Badge>
                        )}
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Button asChild className="flex-1">
                          <Link href={`/property/${property.id}`}>View Details</Link>
                        </Button>
                        <Button variant="outline" size="icon">
                          <Bell className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Price Alerts Section */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Bell className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Price & Availability Alerts</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Get notified when prices drop or units become available at your saved properties.
                    </p>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm">
                        <Bell className="mr-2 h-3.5 w-3.5" />
                        Enable All Alerts
                      </Button>
                      <Button variant="ghost" size="sm">
                        <BellOff className="mr-2 h-3.5 w-3.5" />
                        Manage Alerts
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
