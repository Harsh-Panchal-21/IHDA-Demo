"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SupportBanner } from "@/components/support-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { 
  AlertTriangle,
  Shield,
  Home,
  FileWarning,
  Bug,
  Send,
  Phone,
  Mail,
  ArrowLeft,
  CheckCircle,
  Info
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const reportTypes = [
  {
    id: "discrimination",
    icon: Shield,
    title: "Housing Discrimination",
    titleKey: "housingDiscrimination",
    description: "Report discrimination based on race, color, religion, sex, national origin, disability, or familial status.",
    descKey: "discriminationDesc",
    forwardTo: "Illinois Department of Human Rights & HUD",
  },
  {
    id: "misleading",
    icon: FileWarning,
    title: "Misleading Listing",
    titleKey: "misleadingListing",
    description: "Report inaccurate information, false advertising, or deceptive practices in property listings.",
    descKey: "misleadingDesc",
    forwardTo: "IHDA Compliance Team",
  },
  {
    id: "conditions",
    icon: Home,
    title: "Poor Housing Conditions",
    titleKey: "poorConditions",
    description: "Report unsafe living conditions, code violations, or failure to maintain habitable premises.",
    descKey: "conditionsDesc",
    forwardTo: "Local Building Inspector & IHDA",
  },
  {
    id: "technical",
    icon: Bug,
    title: "Website Issue",
    titleKey: "websiteIssue",
    description: "Report bugs, errors, or technical problems with the website or listing system.",
    descKey: "technicalDesc",
    forwardTo: "Website Administrator",
  },
]

const discriminationBases = [
  { id: "race", label: "Race or Color" },
  { id: "religion", label: "Religion" },
  { id: "sex", label: "Sex or Gender" },
  { id: "national", label: "National Origin" },
  { id: "disability", label: "Disability" },
  { id: "familial", label: "Familial Status" },
  { id: "other", label: "Other" },
]

export default function ReportPage() {
  const { t } = useLanguage()
  const [reportType, setReportType] = useState<string>("")
  const [submitted, setSubmitted] = useState(false)
  const [selectedBases, setSelectedBases] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleBasisChange = (basisId: string, checked: boolean) => {
    if (checked) {
      setSelectedBases([...selectedBases, basisId])
    } else {
      setSelectedBases(selectedBases.filter(id => id !== basisId))
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col">
        <SupportBanner />
        <Navbar />
        <main className="flex-1">
          <section className="py-20 md:py-32">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-2xl text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="mb-4 text-3xl font-bold text-foreground">{t("reportSubmitted")}</h1>
                <p className="mb-6 text-muted-foreground">
                  {t("reportSubmittedDesc")}
                </p>
                <div className="mb-8 rounded-lg bg-muted/50 p-6 text-left">
                  <h3 className="mb-3 font-semibold">{t("whatHappensNext")}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {t("nextStep1")}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {t("nextStep2")}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {t("nextStep3")}
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button asChild>
                    <Link href="/">{t("returnHome")}</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/support">{t("contactSupport")}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SupportBanner />
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-destructive/5 to-background py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Button asChild variant="ghost" className="mb-6">
              <Link href="/support">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("backToSupport")}
              </Link>
            </Button>
            <div className="mx-auto max-w-3xl">
              <Badge className="mb-4 bg-destructive/10 text-destructive hover:bg-destructive/10">
                <AlertTriangle className="mr-2 h-3.5 w-3.5" />
                {t("fileReport")}
              </Badge>
              <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {t("reportIssueTitle")}
              </h1>
              <p className="text-pretty text-lg text-muted-foreground">
                {t("reportIssueDesc")}
              </p>
            </div>
          </div>
        </section>

        {/* Report Form */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Report Type Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t("selectReportType")}</CardTitle>
                    <CardDescription>{t("selectReportTypeDesc")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={reportType} onValueChange={setReportType} className="grid gap-4 sm:grid-cols-2">
                      {reportTypes.map((type) => (
                        <Label
                          key={type.id}
                          htmlFor={type.id}
                          className={`flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50 ${
                            reportType === type.id ? "border-primary bg-primary/5" : "border-border"
                          }`}
                        >
                          <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <type.icon className="h-4 w-4 text-primary" />
                              <span className="font-medium">{t(type.titleKey) || type.title}</span>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{t(type.descKey) || type.description}</p>
                          </div>
                        </Label>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Discrimination-specific fields */}
                {reportType === "discrimination" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("discriminationDetails")}</CardTitle>
                      <CardDescription>{t("discriminationDetailsDesc")}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label className="mb-3 block font-medium">{t("basisOfDiscrimination")}</Label>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {discriminationBases.map((basis) => (
                            <div key={basis.id} className="flex items-center gap-2">
                              <Checkbox 
                                id={basis.id} 
                                checked={selectedBases.includes(basis.id)}
                                onCheckedChange={(checked) => handleBasisChange(basis.id, checked as boolean)}
                              />
                              <Label htmlFor={basis.id} className="text-sm font-normal">
                                {basis.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>{t("importantNote")}</AlertTitle>
                        <AlertDescription>
                          {t("discriminationForwardNote")}
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                )}

                {/* Property Information */}
                {reportType && reportType !== "technical" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("propertyInformation")}</CardTitle>
                      <CardDescription>{t("propertyInfoDesc")}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FieldGroup>
                        <Field>
                          <FieldLabel>{t("propertyAddress")}</FieldLabel>
                          <Input placeholder={t("enterAddress")} />
                        </Field>
                      </FieldGroup>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FieldGroup>
                          <Field>
                            <FieldLabel>{t("city")}</FieldLabel>
                            <Input placeholder={t("enterCity")} />
                          </Field>
                        </FieldGroup>
                        <FieldGroup>
                          <Field>
                            <FieldLabel>{t("zipCode")}</FieldLabel>
                            <Input placeholder={t("enterZip")} />
                          </Field>
                        </FieldGroup>
                      </div>
                      <FieldGroup>
                        <Field>
                          <FieldLabel>{t("propertyManagerLandlord")}</FieldLabel>
                          <Input placeholder={t("enterName")} />
                        </Field>
                      </FieldGroup>
                    </CardContent>
                  </Card>
                )}

                {/* Issue Details */}
                {reportType && (
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("describeIssue")}</CardTitle>
                      <CardDescription>{t("describeIssueDesc")}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FieldGroup>
                        <Field>
                          <FieldLabel>{t("dateOfIncident")}</FieldLabel>
                          <Input type="date" />
                        </Field>
                      </FieldGroup>
                      <FieldGroup>
                        <Field>
                          <FieldLabel>{t("detailedDescription")}</FieldLabel>
                          <Textarea 
                            placeholder={t("descriptionPlaceholder")}
                            rows={6}
                          />
                        </Field>
                      </FieldGroup>
                      <FieldGroup>
                        <Field>
                          <FieldLabel>{t("uploadEvidence")} ({t("optional")})</FieldLabel>
                          <Input type="file" multiple accept="image/*,.pdf,.doc,.docx" />
                          <p className="mt-1 text-xs text-muted-foreground">
                            {t("acceptedFormats")}
                          </p>
                        </Field>
                      </FieldGroup>
                    </CardContent>
                  </Card>
                )}

                {/* Contact Information */}
                {reportType && (
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("yourContactInfo")}</CardTitle>
                      <CardDescription>{t("contactInfoDesc")}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FieldGroup>
                          <Field>
                            <FieldLabel>{t("firstName")}</FieldLabel>
                            <Input placeholder={t("enterFirstName")} required />
                          </Field>
                        </FieldGroup>
                        <FieldGroup>
                          <Field>
                            <FieldLabel>{t("lastName")}</FieldLabel>
                            <Input placeholder={t("enterLastName")} required />
                          </Field>
                        </FieldGroup>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FieldGroup>
                          <Field>
                            <FieldLabel>{t("email")}</FieldLabel>
                            <Input type="email" placeholder={t("enterEmail")} required />
                          </Field>
                        </FieldGroup>
                        <FieldGroup>
                          <Field>
                            <FieldLabel>{t("phone")}</FieldLabel>
                            <Input type="tel" placeholder={t("enterPhone")} />
                          </Field>
                        </FieldGroup>
                      </div>
                      <FieldGroup>
                        <Field>
                          <FieldLabel>{t("preferredContact")}</FieldLabel>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder={t("selectPreference")} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="email">{t("email")}</SelectItem>
                              <SelectItem value="phone">{t("phone")}</SelectItem>
                              <SelectItem value="both">{t("both")}</SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>
                      </FieldGroup>
                      <div className="flex items-start gap-2">
                        <Checkbox id="anonymous" />
                        <Label htmlFor="anonymous" className="text-sm font-normal">
                          {t("anonymousReport")}
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Submit */}
                {reportType && (
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                    <p className="text-sm text-muted-foreground">
                      {t("reportWillBeForwarded")}: <strong>{reportTypes.find(t => t.id === reportType)?.forwardTo}</strong>
                    </p>
                    <Button type="submit" size="lg" className="gap-2">
                      <Send className="h-4 w-4" />
                      {t("submitReport")}
                    </Button>
                  </div>
                )}
              </form>

              {/* Emergency Contact */}
              <Alert className="mt-8">
                <Phone className="h-4 w-4" />
                <AlertTitle>{t("needImmediateHelp")}</AlertTitle>
                <AlertDescription>
                  {t("emergencyContact")}{" "}
                  <a href="tel:1-800-555-IHDA" className="font-medium text-primary hover:underline">
                    1-800-555-IHDA
                  </a>{" "}
                  {t("or")}{" "}
                  <a href="mailto:support@ihda.org" className="font-medium text-primary hover:underline">
                    support@ihda.org
                  </a>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
