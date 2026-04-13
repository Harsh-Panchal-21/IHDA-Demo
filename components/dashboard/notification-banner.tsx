"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Bell, ArrowRight } from "lucide-react"
import Link from "next/link"

export function NotificationBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="mb-6 flex items-center justify-between gap-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Bell className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="font-medium text-foreground">
            Great news! Your waitlist position improved
          </p>
          <p className="text-sm text-muted-foreground">
            You moved up 3 spots on the Lincoln Park apartment waitlist.
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Link href="/property/1">
          <Button size="sm" className="gap-2">
            View Details
            <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
