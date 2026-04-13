"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  MapPin, 
  ArrowRight, 
  ChevronRight,
  Home,
  Building2,
  Users,
  TrendingUp,
  Sparkles
} from "lucide-react"

const popularSearches = [
  { name: "Chicago", count: "2,847" },
  { name: "Springfield", count: "423" },
  { name: "Peoria", count: "312" },
  { name: "Rockford", count: "289" },
  { name: "Aurora", count: "245" },
]

const propertyTypes = [
  { label: "Apartments", icon: Building2, count: "12,450" },
  { label: "Houses", icon: Home, count: "3,280" },
  { label: "Senior Living", icon: Users, count: "1,890" },
]

const featuredImages = [
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
]

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % featuredImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50" />
        
        {/* Subtle Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Gradient Orbs */}
        <div className="absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Left Content */}
          <div className={`transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            {/* Badge */}
            <div className="mb-6">
              <Badge variant="outline" className="gap-2 px-4 py-2 text-sm font-medium border-primary/20 bg-primary/5 text-primary">
                <Sparkles className="h-4 w-4" />
                Illinois Housing Development Authority
              </Badge>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6">
              <span className="block text-balance">Discover Your</span>
              <span className="block text-primary">Affordable Home</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-lg mb-8 text-pretty">
              Search thousands of verified affordable housing listings across Illinois. 
              Find your perfect home with transparent pricing and real-time availability.
            </p>

            {/* Search Box - Zillow Style */}
            <div className="relative mb-8">
              <div className="flex flex-col sm:flex-row gap-2 p-2 rounded-2xl bg-white border border-border shadow-xl shadow-slate-200/50">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter an address, city, or ZIP code"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-14 pl-12 pr-4 border-0 text-base bg-transparent focus-visible:ring-0 shadow-none"
                  />
                </div>
                <Link href={`/search${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ""}`}>
                  <Button size="lg" className="h-14 px-8 text-base w-full sm:w-auto">
                    Search
                  </Button>
                </Link>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mb-10">
              <p className="text-sm text-muted-foreground mb-3">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((city) => (
                  <Link
                    key={city.name}
                    href={`/search?city=${city.name.toLowerCase()}`}
                  >
                    <Button variant="outline" size="sm" className="gap-2 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                      <MapPin className="h-3.5 w-3.5" />
                      {city.name}
                      <span className="text-xs text-muted-foreground group-hover:text-primary-foreground/80">
                        {city.count}
                      </span>
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            {/* Property Types */}
            <div className="grid grid-cols-3 gap-4">
              {propertyTypes.map((type) => (
                <Link key={type.label} href={`/search?type=${type.label.toLowerCase()}`}>
                  <div className="group p-4 rounded-xl border border-border bg-white hover:border-primary hover:shadow-md transition-all cursor-pointer">
                    <type.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary mb-2 transition-colors" />
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">{type.label}</p>
                    <p className="text-sm text-muted-foreground">{type.count} listings</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Content - Image Grid */}
          <div className={`hidden lg:block transition-all duration-1000 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={featuredImages[currentImage]}
                  alt="Featured affordable housing"
                  width={600}
                  height={400}
                  className="w-full h-[400px] object-cover transition-all duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Image Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <Badge className="bg-emerald-500 text-white mb-3">Available Now</Badge>
                  <h3 className="text-xl font-semibold text-white mb-1">Modern 2BR in Lincoln Park</h3>
                  <p className="flex items-center gap-2 text-white/90 text-sm">
                    <MapPin className="h-4 w-4" />
                    Chicago, IL 60614
                  </p>
                </div>

                {/* Image Navigation Dots */}
                <div className="absolute bottom-6 right-6 flex gap-2">
                  {featuredImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentImage
                          ? "w-6 bg-white"
                          : "w-2 bg-white/50 hover:bg-white/75"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -left-6 top-1/4 animate-float">
                <div className="rounded-2xl bg-white border border-border p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">50K+</p>
                      <p className="text-sm text-muted-foreground">Housing Units</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/3 animate-float-delayed">
                <div className="rounded-2xl bg-white border border-border p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                      <TrendingUp className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">98%</p>
                      <p className="text-sm text-muted-foreground">Success Rate</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini Property Preview */}
              <div className="absolute -bottom-4 left-1/4 bg-white border border-border rounded-xl p-2 shadow-lg flex gap-2">
                <Image
                  src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=80&h=80&fit=crop"
                  alt=""
                  width={56}
                  height={56}
                  className="rounded-lg object-cover"
                />
                <Image
                  src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=80&h=80&fit=crop"
                  alt=""
                  width={56}
                  height={56}
                  className="rounded-lg object-cover"
                />
                <Image
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=80&h=80&fit=crop"
                  alt=""
                  width={56}
                  height={56}
                  className="rounded-lg object-cover"
                />
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary">
                  <span className="text-sm font-semibold text-primary-foreground">+99</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className={`mt-20 transition-all duration-1000 delay-400 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-border shadow-lg">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-1">50,000+</p>
              <p className="text-sm text-muted-foreground">Available Units</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground mb-1">102</p>
              <p className="text-sm text-muted-foreground">Counties Served</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground mb-1">15+</p>
              <p className="text-sm text-muted-foreground">Housing Programs</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600 mb-1">100K+</p>
              <p className="text-sm text-muted-foreground">Families Helped</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
