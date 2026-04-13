import { Search, FileText, Home, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Search Properties",
    description: "Use our interactive map and filters to find housing that matches your needs and budget.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Apply Online",
    description: "Submit your application and required documents through our secure online portal.",
  },
  {
    icon: Home,
    step: "03",
    title: "Join Waitlist",
    description: "Get placed on the waitlist and track your position in real-time through your dashboard.",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Move In",
    description: "Once approved, complete your lease and move into your new affordable home.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            How It Works
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Finding affordable housing in Illinois is simple with our streamlined process.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="absolute left-0 right-0 top-16 hidden h-0.5 bg-border lg:block" />
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, index) => (
              <div key={index} className="relative text-center">
                {/* Step Number Badge */}
                <div className="relative mx-auto mb-6">
                  <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border-2 border-border bg-card shadow-sm">
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-medium text-primary">STEP</span>
                      <span className="text-2xl font-bold text-foreground">{item.step}</span>
                    </div>
                  </div>
                  {/* Icon */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                      <item.icon className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
