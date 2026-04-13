import Link from "next/link"
import { Home, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Home className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-foreground">IHDA</span>
                <span className="text-xs text-muted-foreground">Housing Locator</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Illinois Housing Development Authority - Connecting Illinois residents with affordable housing opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Search Housing
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  My Dashboard
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Programs</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/programs/section-8" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Section 8 Vouchers
                </Link>
              </li>
              <li>
                <Link href="/programs/lihtc" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Low Income Housing Tax Credit
                </Link>
              </li>
              <li>
                <Link href="/programs/public-housing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Public Housing
                </Link>
              </li>
              <li>
                <Link href="/programs/emergency" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Emergency Assistance
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>111 E. Wacker Drive, Chicago, IL 60601</span>
              </li>
              <li>
                <a href="tel:1-312-836-5200" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>1-312-836-5200</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@ihda.org" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span>info@ihda.org</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Illinois Housing Development Authority. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Accessibility
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            Designed by King Technology
          </p>
        </div>
      </div>
    </footer>
  )
}
