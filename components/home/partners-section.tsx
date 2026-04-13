"use client"

import { Building2, Landmark, Shield, Home, Users, Heart } from "lucide-react"

const partners = [
  { name: "U.S. Dept. of HUD", icon: Landmark },
  { name: "Chicago Housing Authority", icon: Building2 },
  { name: "Illinois DCFS", icon: Shield },
  { name: "Cook County Housing", icon: Home },
  { name: "Chicago Coalition for the Homeless", icon: Users },
  { name: "Habitat for Humanity", icon: Heart },
]

export function PartnersSection() {
  return (
    <section className="border-y border-border bg-muted/20 py-12">
      <div className="container mx-auto px-4">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Trusted by Leading Housing Organizations
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center gap-3 text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              <partner.icon className="h-6 w-6" />
              <span className="text-sm font-medium">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
