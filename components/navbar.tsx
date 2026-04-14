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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { 
  Menu, 
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
  LayoutDashboard,
  Check,
  LogIn
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage, languages } from "@/lib/language-context"

const programs = [
  { titleKey: "section8", descKey: "section8Desc", href: "/programs/section-8", icon: Building2 },
  { titleKey: "taxCredit", descKey: "taxCreditDesc", href: "/programs/lihtc", icon: Wallet },
  { titleKey: "publicHousing", descKey: "publicHousingDesc", href: "/programs/public-housing", icon: Users },
  { titleKey: "seniorHousing", descKey: "seniorHousingDesc", href: "/programs/senior", icon: Heart },
]

const resources = [
  { titleKey: "applicationGuide", descKey: "applicationGuideDesc", href: "/resources#apply", icon: FileText },
  { titleKey: "faq", descKey: "faqDesc", href: "/resources#faq", icon: HelpCircle },
  { titleKey: "contactSupport", descKey: "contactSupportDesc", href: "/support", icon: Phone },
  { titleKey: "emergencyHousing", descKey: "emergencyHousingDesc", href: "/resources#emergency", icon: Shield },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { language, setLanguage, t, currentLanguage } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => pathname === path

  const NavLink = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActive(href) ? "text-primary" : "text-muted-foreground",
        className
      )}
    >
      {children}
    </Link>
  )

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled 
        ? "border-b border-border bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80"
        : "bg-background"
    )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Home className="h-4.5 w-4.5 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-tight text-foreground">IHDA</span>
            <span className="text-[10px] font-medium text-muted-foreground">Housing Locator</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink href="/" className="px-3 py-2">{t("home")}</NavLink>
          <NavLink href="/search" className="px-3 py-2">{t("search")}</NavLink>
          
          {/* Programs Dropdown */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                {t("programs")}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-2" align="start">
              <div className="grid gap-1">
                {programs.map((program) => (
                  <Link
                    key={program.href}
                    href={program.href}
                    className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <program.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{t(program.titleKey)}</div>
                      <div className="text-xs text-muted-foreground">{t(program.descKey)}</div>
                    </div>
                  </Link>
                ))}
                <div className="mt-2 border-t pt-2">
                  <Link
                    href="/programs"
                    className="flex items-center gap-2 rounded-lg p-3 text-sm font-medium text-primary transition-colors hover:bg-accent"
                  >
                    View All Programs
                    <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
                  </Link>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Resources Dropdown */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                {t("resources")}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-2" align="start">
              <div className="grid gap-1">
                {resources.map((resource) => (
                  <Link
                    key={resource.href}
                    href={resource.href}
                    className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <resource.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{t(resource.titleKey)}</div>
                      <div className="text-xs text-muted-foreground">{t(resource.descKey)}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <NavLink href="/contact" className="px-3 py-2">{t("contact")}</NavLink>
        </nav>

        {/* Right Side Actions */}
        <div className="hidden items-center gap-2 lg:flex">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 gap-2 px-3">
                <Globe className="h-4 w-4" />
                <span className="hidden xl:inline">{currentLanguage.nativeLabel}</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                {t("language")}
              </div>
              <DropdownMenuSeparator />
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className="flex items-center justify-between"
                >
                  <span>{lang.nativeLabel}</span>
                  {language === lang.code && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 gap-2 px-3">
                <User className="h-4 w-4" />
                <span className="hidden xl:inline">{t("account")}</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  {t("myDashboard")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  {t("signIn")}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* CTA Button */}
          <Link href="/search">
            <Button size="sm" className="h-9 gap-2">
              <Search className="h-4 w-4" />
              {t("findHousing")}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm p-0">
            <SheetHeader className="border-b p-4">
              <SheetTitle className="flex items-center gap-2 text-left">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Home className="h-4 w-4 text-primary-foreground" />
                </div>
                <span>IHDA Housing</span>
              </SheetTitle>
            </SheetHeader>
            
            <div className="flex flex-col">
              {/* Main Navigation */}
              <nav className="flex flex-col p-2">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive("/") ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  )}
                >
                  <Home className="h-4 w-4" />
                  {t("home")}
                </Link>
                <Link
                  href="/search"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive("/search") ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  )}
                >
                  <Search className="h-4 w-4" />
                  {t("searchHousing")}
                </Link>
                <Link
                  href="/resources"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive("/resources") ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  )}
                >
                  <BookOpen className="h-4 w-4" />
                  {t("resources")}
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive("/contact") ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  )}
                >
                  <Phone className="h-4 w-4" />
                  {t("contact")}
                </Link>
              </nav>

              <div className="border-t" />

              {/* Language Section */}
              <div className="p-4">
                <p className="mb-2 text-xs font-medium text-muted-foreground">{t("language")}</p>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={cn(
                        "flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors",
                        language === lang.code
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border hover:bg-accent"
                      )}
                    >
                      <span>{lang.nativeLabel}</span>
                      {language === lang.code && (
                        <Check className="h-3.5 w-3.5" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t" />

              {/* Account Section */}
              <div className="flex flex-col gap-2 p-4">
                <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    {t("myDashboard")}
                  </Button>
                </Link>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <LogIn className="h-4 w-4" />
                    {t("signIn")}
                  </Button>
                </Link>
                <Link href="/search" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full gap-2">
                    <Search className="h-4 w-4" />
                    {t("findHousing")}
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
