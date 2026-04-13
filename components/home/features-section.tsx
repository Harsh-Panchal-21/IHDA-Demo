"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import { 
  MapPin, 
  ClipboardList, 
  Bell, 
  Shield, 
  Users, 
  Accessibility,
  Zap,
  Globe,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

export function FeaturesSection() {
  const { t } = useLanguage()

  const features = [
    {
      icon: MapPin,
      titleKey: "feature1Title",
      descKey: "feature1Desc",
      highlight: t("mapView"),
      link: "/search",
    },
    {
      icon: ClipboardList,
      titleKey: "feature2Title",
      descKey: "feature2Desc",
      highlight: t("myApplications"),
      link: "/dashboard",
    },
    {
      icon: Bell,
      titleKey: "feature3Title",
      descKey: "feature3Desc",
      highlight: t("notifications"),
      link: "/dashboard",
    },
    {
      icon: Shield,
      titleKey: "feature4Title",
      descKey: "feature4Desc",
      highlight: t("verified"),
      link: "/resources",
    },
    {
      icon: Users,
      titleKey: "contactSupport",
      descKey: "contactSupportDesc",
      highlight: t("contact"),
      link: "/contact",
    },
    {
      icon: Accessibility,
      titleKey: "accessibility",
      descKey: "mobilityFeatures",
      highlight: t("wheelchairAccessible"),
      link: "/search?accessible=true",
    },
  ]

  const stats = [
    { icon: Zap, value: "< 1 min", labelKey: "searchHousing" },
    { icon: Globe, value: "102", labelKey: "counties" },
    { icon: Users, value: "100K+", labelKey: "familiesHoused" },
  ]

  return (
    <section className="relative overflow-hidden bg-muted/30 py-20 md:py-28">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/5 blur-[100px]" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-emerald-500/5 blur-[100px]" />

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10">
            <Zap className="mr-2 h-3.5 w-3.5" />
            {t("features")}
          </Badge>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t("whyChooseUs")}
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            {t("heroSubtitle")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Link key={index} href={feature.link}>
              <Card 
                className="group h-full border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.highlight}
                    </Badge>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    {t(feature.descKey)}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    {t("learnMore")}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-3 gap-8 rounded-2xl border border-border bg-card p-8 shadow-lg">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground md:text-3xl">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{t(stat.labelKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
