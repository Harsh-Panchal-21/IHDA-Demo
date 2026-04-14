"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Wallet,
  Users,
  Heart,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Phone
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

const programs = [
  {
    title: "Section 8 (Housing Choice Voucher)",
    description: "Rental assistance vouchers that help low-income families afford housing in the private market. You find your own apartment and the voucher pays a portion of your rent.",
    icon: Building2,
    href: "/programs/section-8",
    color: "bg-blue-500",
    features: ["Pay only 30% of income", "Choose your own housing", "Portable between areas"],
    eligibility: "Income at or below 50% AMI"
  },
  {
    title: "Tax Credit (LIHTC) Housing",
    description: "Affordable apartments built through tax incentives to developers. These properties offer below-market rents in quality, professionally managed communities.",
    icon: Wallet,
    href: "/programs/lihtc",
    color: "bg-emerald-500",
    features: ["Below-market rent", "Modern amenities", "No voucher needed"],
    eligibility: "Income at or below 60% AMI"
  },
  {
    title: "Public Housing",
    description: "Government-owned housing managed by local housing authorities. Rent is based on your income and maintenance is included.",
    icon: Users,
    href: "/programs/public-housing",
    color: "bg-amber-500",
    features: ["Income-based rent", "Maintenance included", "Community services"],
    eligibility: "Income at or below 80% AMI"
  },
  {
    title: "Senior Housing",
    description: "Age-restricted communities designed for seniors (55+ or 62+), offering independent living with supportive services and accessibility features.",
    icon: Heart,
    href: "/programs/senior",
    color: "bg-rose-500",
    features: ["Age-appropriate design", "Social activities", "Supportive services"],
    eligibility: "Age 55+ or 62+, income limits vary"
  },
]

const faqs = [
  {
    q: "How do I know which program is right for me?",
    a: "It depends on your income, family size, and needs. Section 8 offers the most flexibility in choosing where to live. Tax credit properties offer quality apartments at fixed affordable rents. Public housing offers the lowest rents based on income. Senior housing is for those 55+ or 62+."
  },
  {
    q: "Can I apply to multiple programs?",
    a: "Yes! We recommend applying to multiple programs to increase your chances of finding housing quickly. You can be on waitlists for Section 8, public housing, and apply to LIHTC properties simultaneously."
  },
  {
    q: "How long are the waitlists?",
    a: "Wait times vary by location and program. Section 8 and public housing waitlists can be months to years. LIHTC properties often have shorter waits or immediate availability."
  },
]

export default function ProgramsPage() {
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
                Housing Assistance Programs
              </Badge>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Find the Right Program for You
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                Illinois offers several affordable housing programs to help families, seniors, 
                and individuals find safe, quality housing within their budget.
              </p>
              <Link href="/search">
                <Button size="lg" className="gap-2">
                  Search Available Housing
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2">
              {programs.map((program) => (
                <Card key={program.title} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="mb-3 flex items-center gap-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${program.color}`}>
                        <program.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{program.title}</CardTitle>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {program.eligibility}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      {program.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="mb-4 space-y-2">
                      {program.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link href={program.href}>
                      <Button variant="outline" className="w-full gap-2">
                        Learn More
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Frequently Asked Questions</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Common questions about housing assistance programs
              </p>
            </div>
            <div className="mx-auto max-w-3xl space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <h3 className="mb-2 font-semibold">{faq.q}</h3>
                        <p className="text-sm text-muted-foreground">{faq.a}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="mx-auto max-w-2xl text-center">
              <CardContent className="pt-8 pb-8">
                <h2 className="mb-4 text-2xl font-bold">Need Help Choosing?</h2>
                <p className="mb-6 text-muted-foreground">
                  Our housing counselors can help you understand your options and guide you through the application process.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Button variant="outline" className="gap-2">
                    <Phone className="h-4 w-4" />
                    1-800-555-IHDA
                  </Button>
                  <Link href="/contact">
                    <Button className="gap-2">
                      Contact Us
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
