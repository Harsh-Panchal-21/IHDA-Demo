"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, Globe, ChevronDown, Home, Search, BookOpen, User } from "lucide-react"

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "pl", label: "Polski" },
  { code: "zh", label: "中文" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [language, setLanguage] = useState("en")

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Home className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-foreground">IHDA</span>
            <span className="text-xs text-muted-foreground">Housing Locator</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link
            href="/search"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Search className="h-4 w-4" />
            Search
          </Link>
          <Link
            href="/resources"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <BookOpen className="h-4 w-4" />
            Resources
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="hidden items-center gap-4 md:flex">
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

          {/* Login Button */}
          <Link href="/login">
            <Button variant="outline" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              Login
            </Button>
          </Link>

          {/* CTA Button */}
          <Link href="/search">
            <Button size="sm" className="gap-2">
              Find Housing
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container mx-auto flex flex-col gap-4 px-4 py-6">
            <Link
              href="/"
              className="flex items-center gap-3 text-sm font-medium text-foreground"
              onClick={() => setIsOpen(false)}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/search"
              className="flex items-center gap-3 text-sm font-medium text-foreground"
              onClick={() => setIsOpen(false)}
            >
              <Search className="h-4 w-4" />
              Search Housing
            </Link>
            <Link
              href="/resources"
              className="flex items-center gap-3 text-sm font-medium text-foreground"
              onClick={() => setIsOpen(false)}
            >
              <BookOpen className="h-4 w-4" />
              Resources
            </Link>
            <hr className="border-border" />
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
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full gap-2">
                  <User className="h-4 w-4" />
                  Login
                </Button>
              </Link>
              <Link href="/search" onClick={() => setIsOpen(false)}>
                <Button className="w-full">Find Housing</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
