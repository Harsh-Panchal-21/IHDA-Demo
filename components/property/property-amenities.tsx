import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Sparkles, 
  Accessibility,
  Check
} from "lucide-react"

interface PropertyAmenitiesProps {
  amenities: string[]
  accessibility: string[]
}

export function PropertyAmenities({ amenities, accessibility }: PropertyAmenitiesProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Amenities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-primary" />
            Amenities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {amenities.map((amenity) => (
              <div key={amenity} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm text-muted-foreground">{amenity}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Accessibility Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Accessibility className="h-5 w-5 text-primary" />
            Accessibility Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          {accessibility.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {accessibility.map((feature) => (
                <Badge key={feature} variant="secondary" className="text-sm">
                  {feature}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No specific accessibility features listed. Contact the property manager for more information.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
