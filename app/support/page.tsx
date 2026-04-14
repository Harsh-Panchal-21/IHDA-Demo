"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SupportBanner } from "@/components/support-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  Globe,
  Search,
  Building2,
  Users,
  FileText,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  CheckCircle,
  Headphones,
  Shield
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const supportChannels = [
  {
    icon: Phone,
    title: "Phone Support",
    titleKey: "phoneSupport",
    description: "Speak directly with a housing specialist",
    descKey: "phoneSupportDesc",
    contact: "1-800-555-IHDA",
    subtext: "Toll-free, 7 days a week",
    subtextKey: "tollFree7Days",
    action: "tel:1-800-555-IHDA",
    actionLabel: "Call Now",
    actionLabelKey: "callNow",
  },
  {
    icon: Mail,
    title: "Email Support",
    titleKey: "emailSupport",
    description: "Get detailed assistance via email",
    descKey: "emailSupportDesc",
    contact: "support@ihda.org",
    subtext: "Response within 24-48 hours",
    subtextKey: "emailResponseTime",
    action: "mailto:support@ihda.org",
    actionLabel: "Send Email",
    actionLabelKey: "sendEmail",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    titleKey: "liveChat",
    description: "Chat with us in real-time",
    descKey: "liveChatDesc",
    contact: "Available on website",
    subtext: "Mon-Fri 9AM-5PM CST",
    subtextKey: "liveChatHours",
    action: "#chat",
    actionLabel: "Start Chat",
    actionLabelKey: "startChat",
  },
]

const supportAreas = [
  {
    icon: Search,
    title: "Housing Search Help",
    titleKey: "housingSearchHelp",
    description: "Assistance with searching for properties, using filters, understanding listings, and navigating the website.",
    descKey: "housingSearchHelpDesc",
    items: [
      "How to search for properties",
      "Understanding listing information",
      "Using map and filter features",
      "Saving and comparing properties"
    ],
    itemsKey: ["searchHelp1", "searchHelp2", "searchHelp3", "searchHelp4"]
  },
  {
    icon: Building2,
    title: "Landlord & Property Manager Support",
    titleKey: "landlordSupport",
    description: "Help with listing creation, property updates, account management, and tenant applications.",
    descKey: "landlordSupportDesc",
    items: [
      "Creating and editing property listings",
      "Managing waitlists and applications",
      "Updating property information",
      "Account and profile management"
    ],
    itemsKey: ["landlordHelp1", "landlordHelp2", "landlordHelp3", "landlordHelp4"]
  },
  {
    icon: FileText,
    title: "Application Assistance",
    titleKey: "applicationAssistance",
    description: "Support with applying to properties, checking eligibility, and understanding program requirements.",
    descKey: "applicationAssistanceDesc",
    items: [
      "Completing housing applications",
      "Understanding eligibility requirements",
      "Document submission help",
      "Checking application status"
    ],
    itemsKey: ["appHelp1", "appHelp2", "appHelp3", "appHelp4"]
  },
  {
    icon: AlertTriangle,
    title: "Report Issues",
    titleKey: "reportIssues",
    description: "Report housing discrimination, misleading listings, poor housing conditions, or website errors.",
    descKey: "reportIssuesDesc",
    items: [
      "Housing discrimination complaints",
      "Misleading or inaccurate listings",
      "Poor housing conditions",
      "Website technical issues"
    ],
    itemsKey: ["reportHelp1", "reportHelp2", "reportHelp3", "reportHelp4"],
    link: "/support/report",
    linkLabel: "File a Report"
  },
]

const languages = [
  { name: "English", native: "English", available: true },
  { name: "Spanish", native: "Español", available: true },
  { name: "Polish", native: "Polski", available: true },
  { name: "Chinese", native: "中文", available: true },
  { name: "Arabic", native: "العربية", available: true },
]

export default function SupportPage() {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col">
      <SupportBanner />
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
          </div>
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10">
                <Headphones className="mr-2 h-3.5 w-3.5" />
                {t("customerSupport")}
              </Badge>
              <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                {t("howCanWeHelp")}
              </h1>
              <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
                {t("supportPageDesc")}
              </p>

              {/* Support Availability Banner */}
              <div className="mx-auto max-w-2xl rounded-xl border border-primary/20 bg-primary/5 p-6">
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="font-medium">{t("availableHours")}</span>
                  </div>
                  <div className="hidden h-6 w-px bg-border sm:block" />
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    <span className="font-medium">{t("multilingualSupport")}</span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {t("excludingHolidays")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Channels */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
                {t("contactUs")}
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                {t("chooseContactMethod")}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {supportChannels.map((channel) => (
                <Card key={channel.title} className="relative overflow-hidden">
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-primary/5" />
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <channel.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{t(channel.titleKey) || channel.title}</CardTitle>
                    <CardDescription>{t(channel.descKey) || channel.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-lg font-semibold text-foreground">{channel.contact}</p>
                      <p className="text-sm text-muted-foreground">{t(channel.subtextKey) || channel.subtext}</p>
                    </div>
                    <Button asChild className="w-full">
                      <a href={channel.action}>
                        {t(channel.actionLabelKey) || channel.actionLabel}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Support Areas */}
        <section className="bg-muted/30 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
                {t("whatWeCanHelpWith")}
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                {t("supportAreasDesc")}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {supportAreas.map((area) => (
                <Card key={area.title}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <area.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="mb-1">{t(area.titleKey) || area.title}</CardTitle>
                        <CardDescription>{t(area.descKey) || area.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="mb-4 space-y-2">
                      {area.items.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                          {t(area.itemsKey[index]) || item}
                        </li>
                      ))}
                    </ul>
                    {area.link && (
                      <Button asChild variant="outline" className="mt-2">
                        <Link href={area.link}>
                          {area.linkLabel}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Language Support */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="bg-primary p-8 text-primary-foreground">
                    <Globe className="mb-4 h-10 w-10" />
                    <h3 className="mb-2 text-2xl font-bold">{t("multilingualSupportTitle")}</h3>
                    <p className="mb-4 text-primary-foreground/80">
                      {t("multilingualSupportDesc")}
                    </p>
                    <div className="space-y-2">
                      {languages.map((lang) => (
                        <div key={lang.name} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          <span>{lang.name}</span>
                          <span className="text-primary-foreground/60">({lang.native})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-8">
                    <h4 className="mb-4 text-lg font-semibold">{t("supportHoursTitle")}</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-border pb-2">
                        <span className="text-muted-foreground">{t("everyDay")}</span>
                        <span className="font-medium">9:00 AM - 5:00 PM CST</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{t("holidays")}</span>
                        <span className="font-medium text-destructive">{t("closed")}</span>
                      </div>
                    </div>
                    <div className="mt-6 rounded-lg bg-muted/50 p-4">
                      <p className="text-sm text-muted-foreground">
                        <strong>{t("note")}:</strong> {t("holidayNote")}
                      </p>
                    </div>
                    <Button asChild className="mt-6 w-full">
                      <a href="tel:1-800-555-IHDA">
                        <Phone className="mr-2 h-4 w-4" />
                        {t("callNow")}: 1-800-555-IHDA
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Administrator Contact */}
        <section className="bg-muted/30 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Shield className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
                {t("needEscalation")}
              </h2>
              <p className="mb-8 text-muted-foreground">
                {t("escalationDesc")}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="mb-2 font-semibold">{t("websiteAdministrator")}</h4>
                    <p className="mb-3 text-sm text-muted-foreground">{t("technicalIssues")}</p>
                    <a href="mailto:admin@ihda.org" className="text-primary hover:underline">
                      admin@ihda.org
                    </a>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h4 className="mb-2 font-semibold">{t("complianceOffice")}</h4>
                    <p className="mb-3 text-sm text-muted-foreground">{t("discriminationComplaints")}</p>
                    <a href="mailto:compliance@ihda.org" className="text-primary hover:underline">
                      compliance@ihda.org
                    </a>
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
