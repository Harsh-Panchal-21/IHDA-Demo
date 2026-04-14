"use client"

import { Phone, Mail, Clock, Globe, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function SupportBanner() {
  const { t, language } = useLanguage()
  const [isVisible, setIsVisible] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const dismissed = sessionStorage.getItem("supportBannerDismissed")
    if (dismissed) setIsVisible(false)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    sessionStorage.setItem("supportBannerDismissed", "true")
  }

  if (!mounted || !isVisible) return null

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            {/* Toll-Free Phone */}
            <a 
              href="tel:1-800-555-IHDA" 
              className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="font-medium">1-800-555-IHDA</span>
              <span className="hidden text-primary-foreground/70 sm:inline">({t("tollFree")})</span>
            </a>

            {/* Email */}
            <a 
              href="mailto:support@ihda.org" 
              className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
            >
              <Mail className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">support@ihda.org</span>
            </a>

            {/* Hours */}
            <span className="hidden items-center gap-1.5 text-primary-foreground/80 md:flex">
              <Clock className="h-3.5 w-3.5" />
              <span>{t("supportHours")}</span>
            </span>

            {/* Languages */}
            <span className="hidden items-center gap-1.5 text-primary-foreground/80 lg:flex">
              <Globe className="h-3.5 w-3.5" />
              <span>{t("languagesAvailable")}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/support" 
              className="hidden text-xs underline underline-offset-2 transition-opacity hover:opacity-80 sm:inline"
            >
              {t("getHelp")}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              onClick={handleDismiss}
            >
              <X className="h-3.5 w-3.5" />
              <span className="sr-only">{t("close")}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
