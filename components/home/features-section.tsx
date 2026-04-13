import { Card, CardContent } from "@/components/ui/card"
import { 
  MapPin, 
  ClipboardList, 
  Bell, 
  Shield, 
  Users, 
  Accessibility 
} from "lucide-react"

const features = [
  {
    icon: MapPin,
    title: "Interactive Map Search",
    description: "Explore housing options visually with our full-screen map interface. Filter by location, amenities, and more.",
  },
  {
    icon: ClipboardList,
    title: "Waitlist Management",
    description: "Apply to housing waitlists online and track your application status in real-time through your dashboard.",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    description: "Receive alerts when new listings match your criteria or when your waitlist status changes.",
  },
  {
    icon: Shield,
    title: "Verified Listings",
    description: "All properties are verified by IHDA to ensure they meet quality and safety standards.",
  },
  {
    icon: Users,
    title: "Case Manager Support",
    description: "Connect with case managers who can help guide you through the housing application process.",
  },
  {
    icon: Accessibility,
    title: "Accessibility First",
    description: "Search specifically for accessible units with features like wheelchair access, grab bars, and more.",
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Everything You Need to Find Housing
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Our platform provides comprehensive tools to help Illinois residents find, apply for, 
            and secure affordable housing.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
