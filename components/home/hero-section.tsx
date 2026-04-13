"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, ArrowRight } from "lucide-react"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-primary">
            <MapPin className="h-4 w-4" />
            <span>Illinois Housing Development Authority</span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Find Affordable Housing
            <span className="block text-primary">Across Illinois</span>
          </h1>

          {/* Subheading */}
          <p className="mb-10 text-pretty text-lg text-muted-foreground md:text-xl">
            Search thousands of affordable housing listings, apply to waitlists, and access resources 
            to help you find your next home. IHDA is here to help Illinois residents find safe, 
            affordable housing.
          </p>

          {/* Search Bar */}
          <div className="mx-auto mb-8 max-w-2xl">
            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-2 shadow-lg sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter city, county, or ZIP code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 border-0 bg-transparent pl-12 text-base shadow-none focus-visible:ring-0"
                />
              </div>
              <Link href={`/search${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ""}`}>
                <Button size="lg" className="h-12 w-full gap-2 px-8 sm:w-auto">
                  <Search className="h-4 w-4" />
                  Search
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <span className="text-muted-foreground">Popular searches:</span>
            <Link
              href="/search?city=chicago"
              className="rounded-full border border-border bg-card px-4 py-2 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Chicago
            </Link>
            <Link
              href="/search?city=springfield"
              className="rounded-full border border-border bg-card px-4 py-2 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Springfield
            </Link>
            <Link
              href="/search?city=peoria"
              className="rounded-full border border-border bg-card px-4 py-2 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Peoria
            </Link>
            <Link
              href="/search?city=rockford"
              className="rounded-full border border-border bg-card px-4 py-2 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Rockford
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/search">
              <Button size="lg" className="gap-2">
                Explore All Listings
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/resources">
              <Button size="lg" variant="outline" className="gap-2">
                Learn About Programs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
