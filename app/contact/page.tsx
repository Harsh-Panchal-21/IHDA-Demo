import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Building2,
  Users,
  HelpCircle
} from "lucide-react"

export const metadata = {
  title: "Contact Us | IHDA Housing Locator",
  description: "Get in touch with the Illinois Housing Development Authority for housing assistance and support.",
}

const offices = [
  {
    name: "Chicago Main Office",
    address: "111 E Wacker Dr, Suite 1000",
    city: "Chicago, IL 60601",
    phone: "312-836-5200",
    fax: "312-832-2170",
    hours: "Mon-Fri: 8:30 AM - 5:00 PM"
  },
  {
    name: "Springfield Office",
    address: "401 N 4th St, Suite 700",
    city: "Springfield, IL 62702",
    phone: "217-782-1122",
    fax: "217-782-1111",
    hours: "Mon-Fri: 8:30 AM - 5:00 PM"
  },
]

const contactReasons = [
  { value: "general", label: "General Inquiry" },
  { value: "application", label: "Application Help" },
  { value: "waitlist", label: "Waitlist Status" },
  { value: "complaint", label: "File a Complaint" },
  { value: "landlord", label: "Landlord Services" },
  { value: "technical", label: "Technical Support" },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background py-16 md:py-24">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
          </div>
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10">
                <MessageSquare className="mr-2 h-3.5 w-3.5" />
                Get In Touch
              </Badge>
              <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Contact Us
              </h1>
              <p className="text-pretty text-lg text-muted-foreground md:text-xl">
                Have questions about affordable housing or need assistance? 
                Our team is here to help you find the resources you need.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-5">
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Send className="h-5 w-5 text-primary" />
                      Send Us a Message
                    </CardTitle>
                    <CardDescription>
                      Fill out the form below and we&apos;ll get back to you within 1-2 business days.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <FieldGroup>
                          <Field>
                            <FieldLabel>First Name</FieldLabel>
                            <Input placeholder="John" />
                          </Field>
                        </FieldGroup>
                        <FieldGroup>
                          <Field>
                            <FieldLabel>Last Name</FieldLabel>
                            <Input placeholder="Doe" />
                          </Field>
                        </FieldGroup>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <FieldGroup>
                          <Field>
                            <FieldLabel>Email</FieldLabel>
                            <Input type="email" placeholder="john@example.com" />
                          </Field>
                        </FieldGroup>
                        <FieldGroup>
                          <Field>
                            <FieldLabel>Phone (Optional)</FieldLabel>
                            <Input type="tel" placeholder="(555) 555-5555" />
                          </Field>
                        </FieldGroup>
                      </div>

                      <FieldGroup>
                        <Field>
                          <FieldLabel>Reason for Contact</FieldLabel>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a reason" />
                            </SelectTrigger>
                            <SelectContent>
                              {contactReasons.map((reason) => (
                                <SelectItem key={reason.value} value={reason.value}>
                                  {reason.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>
                      </FieldGroup>

                      <FieldGroup>
                        <Field>
                          <FieldLabel>Message</FieldLabel>
                          <Textarea 
                            placeholder="Tell us how we can help you..."
                            rows={5}
                          />
                        </Field>
                      </FieldGroup>

                      <Button type="submit" size="lg" className="w-full gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <div className="space-y-6 lg:col-span-2">
                {/* Quick Contact */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Main Line</p>
                        <a href="tel:312-836-5200" className="font-medium text-foreground hover:text-primary">
                          312-836-5200
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <a href="mailto:info@ihda.org" className="font-medium text-foreground hover:text-primary">
                          info@ihda.org
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                        <HelpCircle className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">24/7 Housing Helpline</p>
                        <a href="tel:211" className="font-medium text-foreground hover:text-primary">
                          Dial 211
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Office Hours */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Office Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monday - Friday</span>
                        <span className="font-medium">8:30 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Saturday</span>
                        <span className="font-medium">Closed</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sunday</span>
                        <span className="font-medium">Closed</span>
                      </div>
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground">
                      * Closed on Illinois state holidays
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="bg-muted/30 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">Office Locations</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Visit one of our offices for in-person assistance with your housing needs.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {offices.map((office) => (
                <Card key={office.name}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-3 text-lg font-semibold text-foreground">{office.name}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2 text-muted-foreground">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                            <span>{office.address}<br />{office.city}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <a href={`tel:${office.phone}`} className="hover:text-primary">{office.phone}</a>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {office.hours}
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-4">
                          Get Directions
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
