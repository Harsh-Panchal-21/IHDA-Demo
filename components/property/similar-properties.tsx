import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SimilarPropertiesProps {
  currentId: string
}

// Mock similar properties
const similarProperties = [
  {
    id: "2",
    title: "Modern Studio in Pilsen",
    address: "1856 S Ashland Ave, Chicago, IL 60608",
    rent: 850,
    bedrooms: 0,
    bathrooms: 1,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    status: "waitlist-open",
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
  },
  {
    id: "4",
    title: "Cozy 1BR Near Transit",
    address: "3721 N Halsted St, Chicago, IL 60613",
    rent: 975,
    bedrooms: 1,
    bathrooms: 1,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    status: "waitlist-open",
  },
]

export function SimilarProperties({ currentId }: SimilarPropertiesProps) {
  const filtered = similarProperties.filter((p) => p.id !== currentId)

  return (
    <section className="mt-12 border-t border-border pt-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Similar Properties</h2>
        <Link href="/search">
          <Button variant="ghost" className="gap-2">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((property) => (
          <Link key={property.id} href={`/property/${property.id}`}>
            <Card className="group overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg">
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative aspect-[4/3]">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Badge
                    className={`absolute left-3 top-3 ${
                      property.status === "available"
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {property.status === "available" ? "Available" : "Waitlist Open"}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="line-clamp-1 font-semibold text-foreground group-hover:text-primary">
                      {property.title}
                    </h3>
                    <span className="shrink-0 font-bold text-primary">
                      ${property.rent}/mo
                    </span>
                  </div>

                  <p className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span className="line-clamp-1">{property.address}</span>
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      {property.bedrooms === 0 ? "Studio" : `${property.bedrooms} BR`}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      {property.bathrooms} BA
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
