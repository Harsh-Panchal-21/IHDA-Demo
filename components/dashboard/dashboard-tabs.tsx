"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LayoutDashboard, CalendarDays } from "lucide-react"
import { WaitlistTracker } from "@/components/dashboard/waitlist-tracker"
import { SavedProperties } from "@/components/dashboard/saved-properties"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { ScheduleCalendar } from "@/components/dashboard/schedule-calendar"

export function DashboardTabs() {
  return (
    <Tabs defaultValue="overview" className="mt-8">
      <TabsList>
        <TabsTrigger value="overview" className="gap-2">
          <LayoutDashboard className="h-4 w-4" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="calendar" className="gap-2">
          <CalendarDays className="h-4 w-4" />
          Calendar
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6">
        {/* Main Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Waitlist Tracker - Takes 2 columns */}
          <div className="lg:col-span-2">
            <WaitlistTracker />
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>

        {/* Saved Properties */}
        <div className="mt-8">
          <SavedProperties />
        </div>
      </TabsContent>

      <TabsContent value="calendar" className="mt-6">
        <ScheduleCalendar />
      </TabsContent>
    </Tabs>
  )
}
