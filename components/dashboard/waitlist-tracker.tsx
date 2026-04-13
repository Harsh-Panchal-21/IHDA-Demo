"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Clock, 
  MapPin, 
  Calendar,
  ArrowRight,
  RefreshCw
} from "lucide-react"

const waitlistItems = [
  {
    id: "1",
    propertyName: "Sunny 2BR Apartment in Lincoln Park",
    address: "2450 N Lincoln Ave, Chicago, IL 60614",
    position: 12,
    totalInQueue: 45,
    appliedDate: "2024-01-15",
    estimatedWait: "3-6 months",
    status: "active",
    lastUpdated: "2 days ago",
  },
  {
    id: "2",
    propertyName: "Modern Studio in Pilsen",
    address: "1856 S Ashland Ave, Chicago, IL 60608",
    position: 5,
    totalInQueue: 28,
    appliedDate: "2024-02-01",
    estimatedWait: "1-2 months",
    status: "active",
    lastUpdated: "1 week ago",
  },
]

export function WaitlistTracker() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Waitlist Tracker
        </CardTitle>
        <Button variant="ghost" size="sm" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {waitlistItems.map((item) => {
          const progressPercentage = ((item.totalInQueue - item.position + 1) / item.totalInQueue) * 100
          
          return (
            <div
              key={item.id}
              className="rounded-lg border border-border p-4 transition-colors hover:border-primary/30"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <Link 
                    href={`/property/${item.id}`}
                    className="font-semibold text-foreground hover:text-primary"
                  >
                    {item.propertyName}
                  </Link>
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {item.address}
                  </p>
                </div>
                <Badge variant="outline" className="shrink-0">
                  {item.status === "active" ? "Active" : "Pending"}
                </Badge>
              </div>

              {/* Position & Progress */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Your Position</span>
                  <span className="font-semibold text-foreground">
                    #{item.position} of {item.totalInQueue}
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{Math.round(progressPercentage)}% to top</span>
                  <span>Est. wait: {item.estimatedWait}</span>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Applied: {new Date(item.appliedDate).toLocaleDateString()}
                </span>
                <span>Last updated: {item.lastUpdated}</span>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <Link href={`/property/${item.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    View Property
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                  Withdraw
                </Button>
              </div>
            </div>
          )
        })}

        {waitlistItems.length === 0 && (
          <div className="py-8 text-center">
            <Clock className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="mb-2 font-semibold text-foreground">No Active Waitlists</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              You haven&apos;t joined any waitlists yet.
            </p>
            <Link href="/search">
              <Button>Browse Properties</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
