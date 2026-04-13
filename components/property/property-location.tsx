import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation, Train, ShoppingBag, GraduationCap } from "lucide-react"

interface PropertyLocationProps {
  address: string
  coordinates: {
    lat: number
    lng: number
  }
}

const nearbyPlaces = [
  { icon: Train, name: "CTA Brown Line - Diversey", distance: "0.3 mi" },
  { icon: ShoppingBag, name: "Lincoln Park Shopping District", distance: "0.5 mi" },
  { icon: GraduationCap, name: "DePaul University", distance: "0.8 mi" },
  { icon: Navigation, name: "Lincoln Park Zoo", distance: "1.2 mi" },
]

export function PropertyLocation({ address }: PropertyLocationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="h-5 w-5 text-primary" />
          Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Map Placeholder */}
        <div className="relative h-64 w-full overflow-hidden rounded-lg bg-muted">
          {/* Styled map placeholder */}
          <div className="absolute inset-0 bg-[#e8e4dc]">
            {/* Grid overlay */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #c5c0b8 1px, transparent 1px),
                  linear-gradient(to bottom, #c5c0b8 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }}
            />
            
            {/* Roads */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="0" y1="50" x2="100" y2="50" stroke="#d4cfc5" strokeWidth="2" />
              <line x1="50" y1="0" x2="50" y2="100" stroke="#d4cfc5" strokeWidth="2" />
              <line x1="25" y1="0" x2="25" y2="100" stroke="#d4cfc5" strokeWidth="1" />
              <line x1="75" y1="0" x2="75" y2="100" stroke="#d4cfc5" strokeWidth="1" />
            </svg>

            {/* Green areas */}
            <div className="absolute left-[60%] top-[20%] h-[20%] w-[25%] rounded-lg bg-[#c5d4b8] opacity-50" />
            
            {/* Center pin */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-lg">
                  <MapPin className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="h-3 w-3 -mt-1 rotate-45 bg-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
          <div>
            <p className="font-medium text-foreground">{address}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              Get Directions
            </a>
          </div>
        </div>

        {/* Nearby Places */}
        <div>
          <h4 className="mb-3 text-sm font-medium text-foreground">Nearby</h4>
          <div className="space-y-3">
            {nearbyPlaces.map((place) => (
              <div key={place.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                    <place.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">{place.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{place.distance}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
