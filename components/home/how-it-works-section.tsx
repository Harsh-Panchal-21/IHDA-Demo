"use client"

import { Badge } from "@/components/ui/badge"
import { Search, FileText, Home, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export function HowItWorksSection() {
  const { t } = useLanguage()

  const steps = [
    {
      icon: Search,
      step: "01",
      titleKey: "step1Title",
      descKey: "step1Desc",
      color: "bg-primary",
    },
    {
      icon: FileText,
      step: "02",
      titleKey: "step2Title",
      descKey: "step2Desc",
      color: "bg-emerald-500",
    },
    {
      icon: Home,
      step: "03",
      titleKey: "step3Title",
      descKey: "step3Desc",
      color: "bg-amber-500",
    },
    {
      icon: CheckCircle,
      step: "04",
      titleKey: "step4Title",
      descKey: "step4Desc",
      color: "bg-rose-500",
    },
  ]

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      {/* Background decoration */}
      <div className="absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10">
            {t("howItWorks")}
          </Badge>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t("howItWorks")}
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            {t("heroSubtitle")}
          </p>
        </div>

        {/* Steps - Desktop Timeline */}
        <div className="relative hidden lg:block">
          {/* Connection Line */}
          <div className="absolute left-0 right-0 top-[72px] h-1 bg-gradient-to-r from-primary via-emerald-500 via-amber-500 to-rose-500" />
          
          <div className="grid grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <div key={index} className="relative">
                {/* Step Circle */}
                <div className="relative mx-auto mb-8">
                  <div className={`relative mx-auto flex h-36 w-36 items-center justify-center rounded-full border-4 border-background ${item.color} shadow-xl`}>
                    <div className="flex flex-col items-center text-white">
                      <item.icon className="mb-1 h-8 w-8" />
                      <span className="text-2xl font-bold">{item.step}</span>
                    </div>
                  </div>
                  {/* Connector dot */}
                  <div className={`absolute -bottom-4 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-background ${item.color}`} />
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(item.descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Steps - Mobile/Tablet */}
        <div className="space-y-8 lg:hidden">
          {steps.map((item, index) => (
            <div key={index} className="flex gap-6">
              {/* Left - Icon */}
              <div className="relative flex flex-col items-center">
                <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${item.color} text-white shadow-lg`}>
                  <item.icon className="h-7 w-7" />
                </div>
                {index < steps.length - 1 && (
                  <div className="mt-2 h-full w-0.5 bg-border" />
                )}
              </div>

              {/* Right - Content */}
              <div className="flex-1 pb-8">
                <div className="mb-2 flex items-center gap-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-bold text-white ${item.color}`}>
                    {item.step}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {t(item.titleKey)}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(item.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link href="/search">
            <Button size="lg" className="gap-2">
              {t("getStarted")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
