import { Navbar } from "@/components/navbar"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminStats } from "@/components/admin/admin-stats"
import { ApplicationsChart } from "@/components/admin/applications-chart"
import { OccupancyChart } from "@/components/admin/occupancy-chart"
import { RecentApplications } from "@/components/admin/recent-applications"
import { PropertyOverview } from "@/components/admin/property-overview"

export const metadata = {
  title: "Admin Dashboard | IHDA Housing Locator",
  description: "Administrative dashboard for managing housing listings, applications, and waitlists.",
}

export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden w-64 border-r border-border bg-card lg:block">
          <AdminSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-muted/30">
          <div className="container mx-auto max-w-7xl px-4 py-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Overview of housing program metrics and management</p>
            </div>

            {/* Stats */}
            <AdminStats />

            {/* Charts Row */}
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <ApplicationsChart />
              <OccupancyChart />
            </div>

            {/* Tables Row */}
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <RecentApplications />
              <PropertyOverview />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
