import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  CheckCircle,
  Clock,
  Building
} from "lucide-react"

interface PropertyDetailsProps {
  property: {
    title: string
    address: string
    rent: number
    securityDeposit: number
    bedrooms: number
    bathrooms: number
    sqft: number
    yearBuilt: number
    status: string
    programs: string[]
    description: string
    incomeRequirements: {
      maxIncome: number
      minIncome: number
      amiPercentage: number
    }
  }
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="mr-1 h-3 w-3" />
            Available Now
          </Badge>
        )
      case "waitlist-open":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            <Clock className="mr-1 h-3 w-3" />
            Waitlist Open
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary">
            <Clock className="mr-1 h-3 w-3" />
            Coming Soon
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="mb-2 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-balance text-2xl font-bold text-foreground md:text-3xl">
              {property.title}
            </h1>
            <p className="mt-1 flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {property.address}
            </p>
          </div>
          {getStatusBadge(property.status)}
        </div>

        {/* Programs */}
        <div className="mt-4 flex flex-wrap gap-2">
          {property.programs.map((program) => (
            <Badge key={program} variant="outline" className="text-sm">
              {program}
            </Badge>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Bed className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Bedrooms</p>
            <p className="text-lg font-semibold text-foreground">
              {property.bedrooms === 0 ? "Studio" : property.bedrooms}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Bath className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Bathrooms</p>
            <p className="text-lg font-semibold text-foreground">{property.bathrooms}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Square className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Square Feet</p>
            <p className="text-lg font-semibold text-foreground">{property.sqft.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Year Built</p>
            <p className="text-lg font-semibold text-foreground">{property.yearBuilt}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building className="h-5 w-5 text-primary" />
            About This Property
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-muted-foreground leading-relaxed whitespace-pre-line">
            {property.description}
          </div>
        </CardContent>
      </Card>

      {/* Income Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Income Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground">Minimum Annual Income</p>
              <p className="text-lg font-semibold text-foreground">
                ${property.incomeRequirements.minIncome.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground">Maximum Annual Income</p>
              <p className="text-lg font-semibold text-foreground">
                ${property.incomeRequirements.maxIncome.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground">AMI Level</p>
              <p className="text-lg font-semibold text-foreground">
                {property.incomeRequirements.amiPercentage}% AMI
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Income limits are based on household size and Area Median Income (AMI) for the Chicago metropolitan area.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
