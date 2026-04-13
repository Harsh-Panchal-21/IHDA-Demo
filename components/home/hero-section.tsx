"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, ArrowRight, Building2, Users, Shield, ChevronRight } from "lucide-react"

const stats = [
  { value: "50K+", label: "Housing Units" },
  { value: "102", label: "Counties Served" },
  { value: "24/7", label: "Support Available" },
]

const popularCities = [
  { name: "Chicago", count: 2847 },
  { name: "Springfield", count: 423 },
  { name: "Peoria", count: 312 },
  { name: "Rockford", count: 289 },
  { name: "Aurora", count: 245 },
]

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentStat, setCurrentStat] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
        <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[80px]" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                              linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Content */}
          <div className={`flex flex-col justify-center transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            {/* Trust Badge */}
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Official IHDA Housing Portal</span>
            </div>

            {/* Main Heading */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="block text-balance">Find Your Perfect</span>
              <span className="block bg-gradient-to-r from-primary via-primary to-emerald-600 bg-clip-text text-transparent">
                Affordable Home
              </span>
              <span className="block text-balance">in Illinois</span>
            </h1>

            {/* Subheading */}
            <p className="mb-8 max-w-xl text-pretty text-lg text-muted-foreground md:text-xl">
              Access thousands of verified affordable housing listings across Illinois. 
              Apply to waitlists, track your applications, and connect with housing resources 
              all in one place.
            </p>

            {/* Search Bar - Enhanced */}
            <div className="mb-8">
              <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-2 shadow-xl sm:flex-row">
                <div className="relative flex-1">
                  <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
                  <Input
                    type="text"
                    placeholder="Enter city, ZIP code, or address..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-14 border-0 bg-transparent pl-12 text-lg shadow-none focus-visible:ring-0"
                  />
                </div>
                <Link href={`/search${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ""}`}>
                  <Button size="lg" className="h-14 w-full gap-2 px-8 text-base sm:w-auto">
                    <Search className="h-5 w-5" />
                    Search
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Search Tags */}
            <div className="mb-8">
              <p className="mb-3 text-sm text-muted-foreground">Popular locations:</p>
              <div className="flex flex-wrap gap-2">
                {popularCities.map((city) => (
                  <Link
                    key={city.name}
                    href={`/search?city=${city.name.toLowerCase()}`}
                    className="group flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <span className="text-sm font-medium">{city.name}</span>
                    <Badge variant="secondary" className="text-xs group-hover:bg-primary-foreground/20">
                      {city.count}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/search">
                <Button size="lg" className="gap-2 text-base">
                  Explore All Listings
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/resources">
                <Button size="lg" variant="outline" className="gap-2 text-base">
                  Housing Programs
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className={`relative hidden lg:block transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            {/* Main Image Card */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/20 to-emerald-500/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
                  alt="Beautiful affordable housing in Illinois"
                  width={800}
                  height={600}
                  className="h-[400px] w-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <Badge className="mb-3 bg-emerald-500 text-white">Featured Property</Badge>
                  <h3 className="mb-2 text-xl font-semibold text-white">Modern 2BR in Lincoln Park</h3>
                  <p className="flex items-center gap-2 text-white/80">
                    <MapPin className="h-4 w-4" />
                    Chicago, IL 60614
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Stats Cards */}
            <div className="absolute -left-8 top-1/4 z-10 animate-float">
              <div className="rounded-2xl border border-border bg-card p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">50,000+</p>
                    <p className="text-sm text-muted-foreground">Housing Units</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 bottom-1/4 z-10 animate-float-delayed">
              <div className="rounded-2xl border border-border bg-card p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                    <Users className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">100K+</p>
                    <p className="text-sm text-muted-foreground">Families Helped</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mini Property Cards */}
            <div className="absolute -bottom-4 left-1/4 z-10">
              <div className="flex gap-2 rounded-xl border border-border bg-card p-2 shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=100&h=100&fit=crop"
                  alt="Property"
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />
                <Image
                  src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=100&h=100&fit=crop"
                  alt="Property"
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />
                <Image
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=100&fit=crop"
                  alt="Property"
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />
                <div className="flex h-[60px] w-[60px] items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="text-sm font-semibold">+47</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className={`mt-16 grid grid-cols-2 gap-4 border-t border-border pt-12 md:grid-cols-4 transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary md:text-4xl">50K+</p>
            <p className="mt-1 text-sm text-muted-foreground">Available Units</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground md:text-4xl">102</p>
            <p className="mt-1 text-sm text-muted-foreground">Counties Covered</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground md:text-4xl">15+</p>
            <p className="mt-1 text-sm text-muted-foreground">Subsidy Programs</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-600 md:text-4xl">24/7</p>
            <p className="mt-1 text-sm text-muted-foreground">Support Available</p>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </section>
  )
}
