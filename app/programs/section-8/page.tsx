"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Building2,
  CheckCircle,
  ArrowRight,
  FileText,
  Users,
  DollarSign,
  Home,
  Clock,
  Phone,
  Mail,
  ExternalLink,
  Info,
  AlertCircle
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

const eligibilityRequirements = [
  "Income at or below 50% of Area Median Income (AMI)",
  "U.S. citizenship or eligible immigration status",
  "Pass criminal background check",
  "Provide required documentation (ID, Social Security, income verification)",
  "Meet family composition requirements"
]

const programBenefits = [
  { title: "Rent Subsidy", desc: "Pay only 30% of your income toward rent", icon: DollarSign },
  { title: "Housing Choice", desc: "Choose from approved private market units", icon: Home },
  { title: "Portability", desc: "Transfer voucher if you move to another area", icon: Building2 },
  { title: "Stability", desc: "Long-term assistance for qualifying families", icon: Users },
]

const applicationSteps = [
  { step: 1, title: "Check Eligibility", desc: "Review income limits and requirements for your area" },
  { step: 2, title: "Find Open Waitlist", desc: "Search for housing authorities with open waitlists" },
  { step: 3, title: "Submit Application", desc: "Complete application with required documentation" },
  { step: 4, title: "Wait for Selection", desc: "Applications selected by lottery or date order" },
  { step: 5, title: "Attend Briefing", desc: "Learn about program rules and responsibilities" },
  { step: 6, title: "Find Housing", desc: "Search for approved units within voucher limits" },
]

export default function Section8Page() {
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
                <Building2 className="mr-1.5 h-3.5 w-3.5" />
                Housing Choice Voucher Program
              </Badge>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Section 8 Housing
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                The Housing Choice Voucher (Section 8) program helps low-income families, 
                the elderly, and disabled individuals afford decent, safe housing in the private market.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/search?program=section8">
                  <Button size="lg" className="gap-2">
                    Find Section 8 Housing
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
                The Section 8 program provides flexible housing assistance that puts you in control
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
                  To qualify for Section 8 housing assistance, applicants must meet the following criteria:
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
                    Income Limits (2024)
                  </CardTitle>
                  <CardDescription>
                    Chicago-Naperville-Elgin Metropolitan Area
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
                      { size: "3 Persons", income: "$47,000" },
                      { size: "4 Persons", income: "$52,200" },
                      { size: "5 Persons", income: "$56,400" },
                      { size: "6 Persons", income: "$60,550" },
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

        {/* How to Apply Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">How to Apply</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Follow these steps to apply for Section 8 housing assistance
              </p>
            </div>
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {applicationSteps.map((step) => (
                  <div key={step.step} className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="bg-amber-50 py-8 dark:bg-amber-950/20">
          <div className="container mx-auto px-4">
            <div className="flex items-start gap-4">
              <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-amber-600" />
              <div>
                <h3 className="font-semibold text-amber-900 dark:text-amber-100">Waitlist Notice</h3>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Due to high demand, most housing authorities have waiting lists that can take months or years. 
                  We recommend applying to multiple authorities and exploring other housing programs while waiting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="mx-auto max-w-2xl">
              <CardHeader className="text-center">
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>
                  Our housing counselors can help you navigate the application process
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
                <Separator className="my-2" />
                <Link href="/search?program=section8">
                  <Button className="gap-2">
                    Search Available Section 8 Units
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
