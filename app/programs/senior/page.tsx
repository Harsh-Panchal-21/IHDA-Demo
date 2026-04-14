"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
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
  Users,
  Accessibility,
  Coffee,
  Bus,
  Stethoscope
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

const eligibilityRequirements = [
  "Age 62 or older (some properties allow 55+)",
  "Income at or below program limits (typically 50-60% AMI)",
  "Pass background and rental history screening",
  "Able to live independently (or with approved services)",
  "Meet citizenship or eligible immigration status requirements"
]

const programBenefits = [
  { title: "Affordable Rent", desc: "Income-based or below-market rents", icon: DollarSign },
  { title: "Age-Appropriate Design", desc: "Accessibility features and safety modifications", icon: Accessibility },
  { title: "Community Activities", desc: "Social events and programs for residents", icon: Users },
  { title: "Supportive Services", desc: "Access to health and wellness resources", icon: Stethoscope },
]

const communityFeatures = [
  { title: "Community Rooms", desc: "Spaces for activities and socializing", icon: Coffee },
  { title: "Transportation", desc: "Shuttle services to shopping and medical appointments", icon: Bus },
  { title: "Safety Features", desc: "Emergency call systems and secure entry", icon: Shield },
  { title: "On-site Services", desc: "Service coordinators and wellness programs", icon: Heart },
]

const housingPrograms = [
  { 
    name: "Section 202", 
    desc: "HUD program specifically for very low-income seniors (62+)", 
    features: ["Rent based on 30% of income", "Service coordinator on-site", "Federally funded"]
  },
  { 
    name: "LIHTC Senior", 
    desc: "Tax credit properties designated for seniors (55+ or 62+)", 
    features: ["Below-market fixed rents", "Modern amenities", "Professionally managed"]
  },
  { 
    name: "Public Housing Senior", 
    desc: "Housing authority properties for elderly residents", 
    features: ["Income-based rent", "Maintenance included", "Community services"]
  },
]

export default function SeniorHousingPage() {
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
                <Heart className="mr-1.5 h-3.5 w-3.5" />
                Senior Living Programs
              </Badge>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Senior Housing
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                Affordable housing communities designed for seniors, offering independent living 
                with supportive services, accessibility features, and vibrant community life.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/search?program=senior">
                  <Button size="lg" className="gap-2">
                    Find Senior Housing
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#programs">
                  <Button variant="outline" size="lg" className="gap-2">
                    Explore Programs
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
              <h2 className="mb-4 text-3xl font-bold">Why Senior Housing?</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Purpose-built communities that support independent living and active lifestyles
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

        {/* Programs Section */}
        <section id="programs" className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Senior Housing Programs</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Several programs provide affordable housing options for seniors
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {housingPrograms.map((program) => (
                <Card key={program.name}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      {program.name}
                    </CardTitle>
                    <CardDescription>{program.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {program.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Community Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-4 text-3xl font-bold">Community Features</h2>
                <p className="mb-6 text-muted-foreground">
                  Senior housing communities offer amenities and services designed for comfort, 
                  safety, and social engagement.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {communityFeatures.map((feature) => (
                    <div key={feature.title} className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <feature.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Eligibility Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {eligibilityRequirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          {index + 1}
                        </span>
                        <span className="text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Income Limits */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <Card className="mx-auto max-w-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Income Limits for Senior Housing (2024)
                </CardTitle>
                <CardDescription>
                  Based on 50% Area Median Income - Chicago Metropolitan Area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Household Size</span>
                    <span className="font-medium">Max Income (50% AMI)</span>
                  </div>
                  {[
                    { size: "1 Person", income: "$36,550" },
                    { size: "2 Persons", income: "$41,800" },
                  ].map((row) => (
                    <div key={row.size} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{row.size}</span>
                      <span className="font-medium">{row.income}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Income limits vary by program and location. Some properties may have higher or lower limits.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="mx-auto max-w-2xl">
              <CardHeader className="text-center">
                <CardTitle>Find Your Senior Community</CardTitle>
                <CardDescription>
                  Browse available senior housing and find your perfect home
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
                    senior@ihda.org
                  </Button>
                </div>
                <Link href="/search?program=senior">
                  <Button size="lg" className="gap-2">
                    Search Senior Housing
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
