import Link from "next/link"
import { Home, Phone, Mail, MapPin, Facebook, Twitter, Youtube, Linkedin, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      {/* Newsletter Section */}
      <div className="border-b border-border bg-primary/5 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">Stay Updated</h3>
              <p className="text-sm text-muted-foreground">
                Get the latest housing listings and resources delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full max-w-md gap-3">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-background"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <Home className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground">IHDA</span>
                <span className="text-sm text-muted-foreground">Housing Locator</span>
              </div>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Illinois Housing Development Authority - Connecting Illinois residents with safe, 
              affordable housing opportunities since 1967.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/search" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Search Housing
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  My Dashboard
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  About IHDA
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Programs</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/programs/section-8" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Section 8 Vouchers
                </Link>
              </li>
              <li>
                <Link href="/programs/lihtc" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Tax Credit Housing
                </Link>
              </li>
              <li>
                <Link href="/programs/public-housing" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Public Housing
                </Link>
              </li>
              <li>
                <Link href="/programs/senior" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Senior Housing
                </Link>
              </li>
              <li>
                <Link href="/programs/emergency" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Emergency Assistance
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>111 E. Wacker Drive<br />Chicago, IL 60601</span>
              </li>
              <li>
                <a href="tel:1-312-836-5200" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <span>312-836-5200</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@ihda.org" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <span>info@ihda.org</span>
                </a>
              </li>
            </ul>
            <a 
              href="https://www.ihda.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Visit ihda.org
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Illinois Housing Development Authority. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Accessibility
            </Link>
            <Link href="/sitemap" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Sitemap
            </Link>
          </div>
        </div>

        {/* Credit */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Designed and developed by <span className="font-medium text-foreground">King Technology</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
