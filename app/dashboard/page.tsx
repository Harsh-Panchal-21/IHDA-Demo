import { Navbar } from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { WaitlistTracker } from "@/components/dashboard/waitlist-tracker"
import { SavedProperties } from "@/components/dashboard/saved-properties"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { NotificationBanner } from "@/components/dashboard/notification-banner"

export const metadata = {
  title: "My Dashboard | IHDA Housing Locator",
  description: "Track your housing applications, waitlist status, and saved properties.",
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <aside className="hidden w-64 border-r border-border bg-card lg:block">
          <DashboardSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-muted/30">
          <div className="container mx-auto max-w-6xl px-4 py-8">
            {/* Notification Banner */}
            <NotificationBanner />

            {/* Overview Cards */}
            <DashboardOverview />

            {/* Main Grid */}
            <div className="mt-8 grid gap-8 lg:grid-cols-3">
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
          </div>
        </main>
      </div>
    </div>
  )
}
