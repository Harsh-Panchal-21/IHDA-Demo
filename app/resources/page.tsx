import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { 
  FileText, 
  Phone, 
  MapPin, 
  Clock, 
  Download, 
  ExternalLink,
  HelpCircle,
  Building2,
  Users,
  Wallet,
  Scale,
  Heart,
  GraduationCap,
  Shield,
  ChevronRight
} from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Resources | IHDA Housing Locator",
  description: "Access housing resources, program information, and support services from the Illinois Housing Development Authority.",
}

const programs = [
  {
    id: "section8",
    title: "Section 8 Housing Choice Voucher",
    description: "Federally funded program that helps low-income families, the elderly, and disabled afford decent, safe housing in the private market.",
    icon: Building2,
    eligibility: ["Very low income (below 50% AMI)", "U.S. citizen or eligible immigrant", "Meet local PHA requirements"],
    benefits: ["Pay only 30% of income toward rent", "Choose your own housing", "Portable to other areas"],
    link: "/programs/section8"
  },
  {
    id: "lihtc",
    title: "Low Income Housing Tax Credit (LIHTC)",
    description: "Properties built with tax credits that offer reduced rents for qualifying households. No voucher needed.",
    icon: Wallet,
    eligibility: ["Income below 60% AMI", "Meet property-specific requirements", "Pass background check"],
    benefits: ["Below-market rents", "Quality housing", "No voucher required"],
    link: "/programs/lihtc"
  },
  {
    id: "public",
    title: "Public Housing",
    description: "Affordable housing owned and operated by local housing authorities for eligible low-income families, elderly, and persons with disabilities.",
    icon: Users,
    eligibility: ["Very low income (below 50% AMI)", "U.S. citizen or eligible immigrant", "Pass PHA screening"],
    benefits: ["Very affordable rents", "Utilities often included", "On-site services"],
    link: "/programs/public"
  },
  {
    id: "senior",
    title: "Senior Housing Programs",
    description: "Specialized housing options for seniors aged 62+ with various support services and accessibility features.",
    icon: Heart,
    eligibility: ["Age 62 or older", "Income eligible", "Independent living capable"],
    benefits: ["Age-appropriate amenities", "Support services", "Community activities"],
    link: "/programs/senior"
  },
]

const faqs = [
  {
    question: "How do I apply for affordable housing?",
    answer: "Start by searching for available properties on our platform. Each listing will have specific application instructions. For most programs, you'll need to provide proof of income, identification, and complete an application form. Our support team can guide you through the process."
  },
  {
    question: "How long are typical waitlists?",
    answer: "Waitlist times vary significantly based on location, property type, and bedroom size needed. Urban areas like Chicago may have longer waits (1-3 years), while suburban and rural areas often have shorter waits. You can check estimated wait times on each property listing."
  },
  {
    question: "What documents do I need to apply?",
    answer: "Common requirements include: valid ID, Social Security cards for all household members, proof of income (pay stubs, tax returns, benefit statements), rental history, and references. Specific requirements vary by program and property."
  },
  {
    question: "Can I apply to multiple waitlists?",
    answer: "Yes! We encourage applying to multiple properties and programs to increase your chances. Our dashboard helps you track all your applications in one place."
  },
  {
    question: "What is Area Median Income (AMI)?",
    answer: "AMI is the midpoint income for a region, used to determine eligibility for housing programs. For example, 'below 60% AMI' means your income must be less than 60% of the median income for your area. Income limits vary by household size and location."
  },
  {
    question: "Are there programs for people with disabilities?",
    answer: "Yes, many properties offer accessible units and priority for persons with disabilities. The Section 811 program specifically serves extremely low-income adults with disabilities. Filter search results by accessibility features to find suitable options."
  },
]

const resources = [
  {
    title: "Application Checklist",
    description: "Complete list of documents needed for housing applications",
    icon: FileText,
    type: "PDF",
    size: "245 KB"
  },
  {
    title: "Income Limits Guide 2024",
    description: "Current income limits by county and household size",
    icon: Wallet,
    type: "PDF",
    size: "189 KB"
  },
  {
    title: "Tenant Rights Handbook",
    description: "Know your rights as a tenant in Illinois",
    icon: Scale,
    type: "PDF",
    size: "1.2 MB"
  },
  {
    title: "Housing Program Comparison",
    description: "Side-by-side comparison of all housing programs",
    icon: Building2,
    type: "PDF",
    size: "312 KB"
  },
]

const contacts = [
  {
    title: "IHDA Main Office",
    phone: "312-836-5200",
    hours: "Mon-Fri 8:30 AM - 5:00 PM",
    address: "111 E Wacker Dr, Chicago, IL 60601"
  },
  {
    title: "Housing Counseling",
    phone: "1-800-569-4287",
    hours: "24/7 Helpline",
    address: "HUD-approved counseling agencies"
  },
  {
    title: "Emergency Housing",
    phone: "211",
    hours: "24/7",
    address: "Illinois 211 for crisis housing"
  },
]

export default function ResourcesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background py-16 md:py-24">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
          </div>
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10">
                Resources & Support
              </Badge>
              <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Housing Resources & Programs
              </h1>
              <p className="text-pretty text-lg text-muted-foreground md:text-xl">
                Everything you need to know about affordable housing in Illinois. 
                Learn about programs, get help with applications, and access support services.
              </p>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">Housing Programs</h2>
              <p className="max-w-2xl text-muted-foreground">
                Learn about the different affordable housing programs available in Illinois and find the right one for your situation.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {programs.map((program) => (
                <Card key={program.id} className="group overflow-hidden transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <program.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{program.title}</CardTitle>
                        <CardDescription className="mt-2">{program.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="eligibility" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                        <TabsTrigger value="benefits">Benefits</TabsTrigger>
                      </TabsList>
                      <TabsContent value="eligibility" className="mt-4">
                        <ul className="space-y-2">
                          {program.eligibility.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </TabsContent>
                      <TabsContent value="benefits" className="mt-4">
                        <ul className="space-y-2">
                          {program.benefits.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </TabsContent>
                    </Tabs>
                    <div className="mt-6">
                      <Link href={program.link}>
                        <Button variant="outline" className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground">
                          Learn More
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-muted/30 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <div className="mb-12 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
                  <HelpCircle className="h-4 w-4" />
                  Frequently Asked Questions
                </div>
                <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
                  Common Questions
                </h2>
                <p className="text-muted-foreground">
                  Find answers to the most frequently asked questions about affordable housing.
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Downloads & Contact Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Downloads */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-foreground">Downloadable Resources</h2>
                <div className="space-y-4">
                  {resources.map((resource, index) => (
                    <Card key={index} className="group cursor-pointer transition-all hover:shadow-md">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary">
                          <resource.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground">{resource.description}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary">{resource.type}</Badge>
                          <p className="mt-1 text-xs text-muted-foreground">{resource.size}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="shrink-0">
                          <Download className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-foreground">Contact & Support</h2>
                <div className="space-y-4">
                  {contacts.map((contact, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <h3 className="mb-4 text-lg font-semibold text-foreground">{contact.title}</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <Phone className="h-4 w-4 text-primary" />
                            <a href={`tel:${contact.phone}`} className="hover:text-primary">
                              {contact.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <Clock className="h-4 w-4 text-primary" />
                            {contact.hours}
                          </div>
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            {contact.address}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Emergency Banner */}
                <Card className="mt-6 border-destructive/50 bg-destructive/5">
                  <CardContent className="flex items-center gap-4 p-6">
                    <Shield className="h-10 w-10 shrink-0 text-destructive" />
                    <div>
                      <h3 className="font-semibold text-foreground">Housing Emergency?</h3>
                      <p className="text-sm text-muted-foreground">
                        If you are facing immediate homelessness, call 211 or visit your local emergency services.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
