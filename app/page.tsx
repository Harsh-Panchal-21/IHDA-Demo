import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturesSection } from "@/components/home/features-section"
import { FeaturedListings } from "@/components/home/featured-listings"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { StatsSection } from "@/components/home/stats-section"
import { PartnersSection } from "@/components/home/partners-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturedListings />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <StatsSection />
        <PartnersSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
