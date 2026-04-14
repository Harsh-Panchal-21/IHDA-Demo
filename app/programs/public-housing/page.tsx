"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  CheckCircle,
  ArrowRight,
  Building2,
  DollarSign,
  Home,
  Clock,
  Phone,
  Mail,
  ExternalLink,
  Info,
  Shield,
  Wrench,
  MapPin
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

const eligibilityRequirements = [
  "Income at or below 80% of Area Median Income (most residents at 30% AMI or below)",
  "U.S. citizenship or eligible immigration status",
  "Pass criminal background check",
  "Good rental history (or valid explanation for issues)",
  "Meet family composition requirements for unit size"
]

const programBenefits = [
  { title: "Income-Based Rent", desc: "Pay approximately 30% of your adjusted income", icon: DollarSign },
  { title: "Maintenance Included", desc: "Repairs and upkeep handled by housing authority", icon: Wrench },
  { title: "Community Services", desc: "Access to resident programs and support services", icon: Users },
  { title: "Stable Housing", desc: "No time limits on how long you can stay", icon: Home },
]

const housingTypes = [
  { name: "Family Developments", desc: "Multi-bedroom units for families with children" },
  { name: "Senior Buildings", desc: "Age-restricted communities for elderly residents" },
  { name: "Scattered Sites", desc: "Single-family homes and small buildings throughout the city" },
  { name: "Mixed-Income Communities", desc: "Developments with market-rate and affordable units" }
]

export default function PublicHousingPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">
                <Users className="mr-1.5 h-3.5 w-3.5" />
                Housing Authority Program
              </Badge>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Public Housing
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                Public housing provides safe, affordable rental housing for eligible low-income families, 
                seniors, and persons with disabilities. Housing authorities own and manage these properties.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/search?program=public-housing">
                  <Button size="lg" className="gap-2">
                    Find Public Housing
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#eligibility">
                  <Button variant="outline" size="lg" className="gap-2">
                    Check Eligibility
                    <Info className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Program Benefits</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Public housing offers stable, affordable housing with support services
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {programBenefits.map((benefit) => (
                <Card key={benefit.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Housing Types */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Types of Public Housing</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Public housing comes in many forms to meet different needs
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {housingTypes.map((type) => (
                <Card key={type.name}>
                  <CardContent className="flex items-start gap-4 pt-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{type.name}</h3>
                      <p className="text-sm text-muted-foreground">{type.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Eligibility Section */}
        <section id="eligibility" className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-4 text-3xl font-bold">Eligibility Requirements</h2>
                <p className="mb-6 text-muted-foreground">
                  Public housing serves the lowest-income residents in our communities:
                </p>
                <ul className="space-y-4">
                  {eligibilityRequirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Income Limits (2024) - 80% AMI
                  </CardTitle>
                  <CardDescription>
                    Chicago-Naperville-Elgin Metropolitan Area
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Household Size</span>
                      <span className="font-medium">Max Income</span>
                    </div>
                    {[
                      { size: "1 Person", income: "$58,450" },
                      { size: "2 Persons", income: "$66,800" },
                      { size: "3 Persons", income: "$75,150" },
                      { size: "4 Persons", income: "$83,500" },
                      { size: "5 Persons", income: "$90,200" },
                      { size: "6 Persons", income: "$96,900" },
                    ].map((row) => (
                      <div key={row.size} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{row.size}</span>
                        <span className="font-medium">{row.income}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Note: Most residents must have income at or below 30% AMI at admission
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <Card className="mx-auto max-w-2xl">
              <CardHeader className="text-center">
                <CardTitle>Apply for Public Housing</CardTitle>
                <CardDescription>
                  Contact your local housing authority to apply or check waitlist status
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="outline" className="gap-2">
                    <Phone className="h-4 w-4" />
                    1-800-555-IHDA
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Mail className="h-4 w-4" />
                    housing@ihda.org
                  </Button>
                </div>
                <Link href="/search?program=public-housing">
                  <Button size="lg" className="gap-2">
                    Search Public Housing
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
