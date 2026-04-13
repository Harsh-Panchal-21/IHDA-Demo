"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, MessageCircle, Clock } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-primary py-20 md:py-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-white/10 blur-[100px]" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-white/10 blur-[100px]" />

      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              {t("ctaTitle")}
            </h2>
            <p className="mb-8 max-w-xl text-pretty text-lg text-white/80 lg:mx-0">
              {t("ctaSubtitle")}
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Link href="/search">
                <Button size="lg" variant="secondary" className="gap-2 text-primary">
                  {t("startSearch")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="tel:1-312-836-5200">
                <Button size="lg" variant="outline" className="gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                  <Phone className="h-4 w-4" />
                  {t("callNow")}
                </Button>
              </a>
            </div>

            {/* Support Info */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
              <div className="flex items-center gap-2 text-white/70">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{t("mondayFriday")} 8:00 AM - 5:00 PM</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">{t("contactSupport")}</span>
              </div>
            </div>
          </div>

          {/* Image / Visual */}
          <div className="relative hidden lg:block">
            <div className="absolute -inset-4 rounded-3xl bg-white/10 blur-xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-1 shadow-2xl backdrop-blur-sm">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop"
                alt="Happy family in their new affordable home"
                width={600}
                height={400}
                className="rounded-2xl object-cover"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 rounded-2xl border border-white/20 bg-white p-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-foreground">100,000+</p>
                  <p className="text-sm text-muted-foreground">{t("familiesHoused")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
