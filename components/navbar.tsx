"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { 
  Menu, 
  X, 
  Globe, 
  ChevronDown, 
  Home, 
  Search, 
  BookOpen, 
  User,
  Phone,
  Building2,
  Users,
  Wallet,
  Heart,
  Shield,
  HelpCircle,
  FileText,
  LayoutDashboard
} from "lucide-react"
import { cn } from "@/lib/utils"

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "pl", label: "Polski" },
  { code: "zh", label: "中文" },
  { code: "ar", label: "العربية" },
]

const programs = [
  { title: "Section 8 Vouchers", href: "/programs/section-8", description: "Housing choice voucher program", icon: Building2 },
  { title: "Tax Credit Housing", href: "/programs/lihtc", description: "Low income housing tax credit", icon: Wallet },
  { title: "Public Housing", href: "/programs/public-housing", description: "Government-owned housing", icon: Users },
  { title: "Senior Housing", href: "/programs/senior", description: "Housing for ages 62+", icon: Heart },
]

const resources = [
  { title: "Application Guide", href: "/resources#apply", description: "Step-by-step help", icon: FileText },
  { title: "FAQ", href: "/resources#faq", description: "Common questions answered", icon: HelpCircle },
  { title: "Contact Support", href: "/contact", description: "Get personalized help", icon: Phone },
  { title: "Emergency Housing", href: "/resources#emergency", description: "Crisis assistance", icon: Shield },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [language, setLanguage] = useState("en")
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => pathname === path

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b transition-all duration-300",
      isScrolled 
        ? "border-border bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60"
        : "border-transparent bg-background"
    )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-sm">
            <Home className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">IHDA</span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Housing Locator</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  isActive("/") && "bg-accent text-accent-foreground"
                )}>
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/search" className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  isActive("/search") && "bg-accent text-accent-foreground"
                )}>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Programs</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {programs.map((program) => (
                    <li key={program.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={program.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="flex items-center gap-2">
                            <program.icon className="h-4 w-4 text-primary" />
                            <div className="text-sm font-medium leading-none">{program.title}</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {program.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {resources.map((resource) => (
                    <li key={resource.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={resource.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="flex items-center gap-2">
                            <resource.icon className="h-4 w-4 text-primary" />
                            <div className="text-sm font-medium leading-none">{resource.title}</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {resource.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/contact" className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  isActive("/contact") && "bg-accent text-accent-foreground"
                )}>
                  Contact
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                {languages.find((l) => l.code === language)?.label}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={language === lang.code ? "bg-accent" : ""}
                >
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dashboard / Login */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                Account
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  My Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Sign In
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* CTA Button */}
          <Link href="/search">
            <Button size="sm" className="gap-2">
              <Search className="h-4 w-4" />
              Find Housing
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container mx-auto flex flex-col gap-2 px-4 py-6">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                isActive("/") ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              )}
              onClick={() => setIsOpen(false)}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/search"
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                isActive("/search") ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              )}
              onClick={() => setIsOpen(false)}
            >
              <Search className="h-4 w-4" />
              Search Housing
            </Link>
            <Link
              href="/resources"
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                isActive("/resources") ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              )}
              onClick={() => setIsOpen(false)}
            >
              <BookOpen className="h-4 w-4" />
              Resources
            </Link>
            <Link
              href="/contact"
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                isActive("/contact") ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              )}
              onClick={() => setIsOpen(false)}
            >
              <Phone className="h-4 w-4" />
              Contact
            </Link>
            
            <hr className="my-2 border-border" />
            
            {/* Language Dropdown Mobile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Globe className="h-4 w-4" />
                  {languages.find((l) => l.code === language)?.label}
                  <ChevronDown className="ml-auto h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={language === lang.code ? "bg-accent" : ""}
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex flex-col gap-3 pt-2">
              <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  My Dashboard
                </Button>
              </Link>
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full gap-2">
                  <User className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
              <Link href="/search" onClick={() => setIsOpen(false)}>
                <Button className="w-full gap-2">
                  <Search className="h-4 w-4" />
                  Find Housing
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
