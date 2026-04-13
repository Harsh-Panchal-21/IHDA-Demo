import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Users } from "lucide-react"
import Link from "next/link"

const properties = [
  {
    id: "1",
    name: "Lincoln Park Apartments",
    address: "2450 N Lincoln Ave",
    units: 48,
    available: 3,
    waitlist: 156,
    status: "active",
  },
  {
    id: "2",
    name: "Pilsen Family Homes",
    address: "1856 S Ashland Ave",
    units: 24,
    available: 0,
    waitlist: 89,
    status: "waitlist-only",
  },
  {
    id: "3",
    name: "Rogers Park Senior Living",
    address: "7432 N Sheridan Rd",
    units: 72,
    available: 5,
    waitlist: 234,
    status: "active",
  },
  {
    id: "4",
    name: "West Madison Complex",
    address: "5234 W Madison St",
    units: 36,
    available: 2,
    waitlist: 67,
    status: "active",
  },
]

export function PropertyOverview() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Property Overview</CardTitle>
        <Link href="/admin/properties">
          <Button variant="ghost" size="sm" className="gap-2">
            Manage All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className="rounded-lg border border-border p-3 transition-colors hover:border-primary/30"
            >
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <p className="font-medium text-foreground">{property.name}</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {property.address}
                  </p>
                </div>
                <Badge 
                  variant={property.status === "active" ? "default" : "secondary"}
                  className={property.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                >
                  {property.status === "active" ? "Active" : "Waitlist Only"}
                </Badge>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-muted/50 p-2">
                  <p className="text-lg font-bold text-foreground">{property.units}</p>
                  <p className="text-xs text-muted-foreground">Total Units</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-2">
                  <p className="text-lg font-bold text-green-600">{property.available}</p>
                  <p className="text-xs text-muted-foreground">Available</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-2">
                  <p className="flex items-center justify-center gap-1 text-lg font-bold text-foreground">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    {property.waitlist}
                  </p>
                  <p className="text-xs text-muted-foreground">Waitlist</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
