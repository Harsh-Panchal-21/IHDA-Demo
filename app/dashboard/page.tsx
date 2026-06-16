import { Navbar } from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { NotificationBanner } from "@/components/dashboard/notification-banner"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"

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

            {/* Tabbed content: Overview + Calendar */}
            <DashboardTabs />
          </div>
        </main>
      </div>
    </div>
  )
}
