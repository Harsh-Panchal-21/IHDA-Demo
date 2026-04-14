"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Wallet,
  CheckCircle,
  ArrowRight,
  Building,
  DollarSign,
  Home,
  Clock,
  Phone,
  Mail,
  ExternalLink,
  Info,
  Star,
  Shield
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

const eligibilityRequirements = [
  "Income at or below 60% of Area Median Income (AMI)",
  "Meet property-specific income requirements (some at 30%, 40%, or 50% AMI)",
  "Pass rental history and background screening",
  "Provide income verification documentation",
  "Household size appropriate for unit size"
]

const programBenefits = [
  { title: "Below Market Rent", desc: "Rent set at affordable rates based on AMI", icon: DollarSign },
  { title: "Quality Housing", desc: "Modern, well-maintained apartment communities", icon: Building },
  { title: "No Voucher Needed", desc: "Apply directly to the property", icon: Home },
  { title: "Long-term Stability", desc: "Properties committed to affordability for 15-30 years", icon: Clock },
]

const propertyFeatures = [
  "Modern appliances and finishes",
  "Community amenities (fitness, pool, etc.)",
  "On-site management and maintenance",
  "Energy-efficient construction",
  "Safe, well-lit communities",
  "Pet-friendly options available"
]

export default function LIHTCPage() {
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
                <Wallet className="mr-1.5 h-3.5 w-3.5" />
                Low-Income Housing Tax Credit
              </Badge>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Tax Credit (LIHTC) Housing
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                The Low-Income Housing Tax Credit program creates affordable rental housing 
                through tax incentives to developers, resulting in quality apartments at below-market rents.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/search?program=lihtc">
                  <Button size="lg" className="gap-2">
                    Find LIHTC Properties
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
              <h2 className="mb-4 text-3xl font-bold">Why Choose LIHTC Housing?</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Tax credit properties offer affordable rents in professionally managed communities
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

        {/* Eligibility Section */}
        <section id="eligibility" className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-4 text-3xl font-bold">Eligibility Requirements</h2>
                <p className="mb-6 text-muted-foreground">
                  LIHTC properties have specific income requirements that vary by property:
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
                    Income Limits (2024) - 60% AMI
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
                      { size: "1 Person", income: "$43,860" },
                      { size: "2 Persons", income: "$50,160" },
                      { size: "3 Persons", income: "$56,400" },
                      { size: "4 Persons", income: "$62,640" },
                      { size: "5 Persons", income: "$67,680" },
                      { size: "6 Persons", income: "$72,660" },
                    ].map((row) => (
                      <div key={row.size} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{row.size}</span>
                        <span className="font-medium">{row.income}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Property Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-4 text-3xl font-bold">Quality You Can Count On</h2>
                <p className="mb-6 text-muted-foreground">
                  LIHTC properties must meet strict quality standards and are regularly inspected 
                  to ensure safe, well-maintained housing.
                </p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {propertyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="bg-primary/5">
                  <CardContent className="pt-6">
                    <Shield className="mb-3 h-8 w-8 text-primary" />
                    <h3 className="mb-2 font-semibold">Compliance Monitored</h3>
                    <p className="text-sm text-muted-foreground">
                      Properties are regularly inspected to ensure quality and fair practices
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-primary/5">
                  <CardContent className="pt-6">
                    <Clock className="mb-3 h-8 w-8 text-primary" />
                    <h3 className="mb-2 font-semibold">Long-term Affordability</h3>
                    <p className="text-sm text-muted-foreground">
                      Properties remain affordable for 15-30 years under program requirements
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <Card className="mx-auto max-w-2xl">
              <CardHeader className="text-center">
                <CardTitle>Ready to Find Your Home?</CardTitle>
                <CardDescription>
                  Browse available LIHTC properties and apply directly to the ones you like
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
                <Link href="/search?program=lihtc">
                  <Button size="lg" className="gap-2">
                    Search LIHTC Properties
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
