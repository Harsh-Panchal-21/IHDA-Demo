import { Navbar } from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { ApplicationsList } from "@/components/dashboard/applications-list"

export const metadata = {
  title: "My Applications | IHDA Housing Locator",
  description: "Track and manage your housing applications.",
}

type AppStatus = "under-review" | "waitlist" | "approved" | "denied"

interface Application {
  id: string
  property: string
  address: string
  status: AppStatus
  submittedDate: string
  lastUpdate: string
  program: string
  progress: number
  steps: { name: string; completed: boolean; date: string }[]
  notes: string
  waitlistPosition?: number
  estimatedWait?: string
  moveInDate?: string
  denialReason?: string
}

const applications: Application[] = [
  {
    id: "APP-2024-001",
    property: "Capitol View 2BR Apartment",
    address: "301 E Capitol Ave, Springfield, IL 62701",
    status: "under-review",
    submittedDate: "2024-01-15",
    lastUpdate: "2024-01-20",
    program: "Section 8",
    progress: 60,
    steps: [
      { name: "Application Submitted", completed: true, date: "Jan 15, 2024" },
      { name: "Documents Verified", completed: true, date: "Jan 18, 2024" },
      { name: "Background Check", completed: true, date: "Jan 20, 2024" },
      { name: "Income Verification", completed: false, date: "Pending" },
      { name: "Final Review", completed: false, date: "Pending" },
      { name: "Decision", completed: false, date: "Pending" },
    ],
    notes: "Waiting for income verification documents from employer.",
  },
  {
    id: "APP-2024-002",
    property: "Lincoln Park Family Home",
    address: "1820 S 5th St, Springfield, IL 62703",
    status: "waitlist",
    submittedDate: "2024-01-10",
    lastUpdate: "2024-01-12",
    program: "Public Housing",
    progress: 100,
    waitlistPosition: 23,
    estimatedWait: "4-6 months",
    steps: [
      { name: "Application Submitted", completed: true, date: "Jan 10, 2024" },
      { name: "Documents Verified", completed: true, date: "Jan 11, 2024" },
      { name: "Eligibility Confirmed", completed: true, date: "Jan 12, 2024" },
      { name: "Added to Waitlist", completed: true, date: "Jan 12, 2024" },
    ],
    notes: "You are #23 on the waitlist. Estimated wait time: 4-6 months.",
  },
  {
    id: "APP-2024-003",
    property: "Sunny 2BR Apartment",
    address: "2450 N Lincoln Ave, Chicago, IL 60614",
    status: "approved",
    submittedDate: "2023-12-01",
    lastUpdate: "2024-01-05",
    program: "LIHTC",
    progress: 100,
    moveInDate: "2024-02-01",
    steps: [
      { name: "Application Submitted", completed: true, date: "Dec 1, 2023" },
      { name: "Documents Verified", completed: true, date: "Dec 5, 2023" },
      { name: "Background Check", completed: true, date: "Dec 10, 2023" },
      { name: "Income Verification", completed: true, date: "Dec 15, 2023" },
      { name: "Final Review", completed: true, date: "Dec 20, 2023" },
      { name: "Approved", completed: true, date: "Jan 5, 2024" },
    ],
    notes: "Congratulations! Your move-in date is scheduled for February 1, 2024.",
  },
  {
    id: "APP-2023-045",
    property: "Downtown Loft",
    address: "123 W Madison St, Chicago, IL 60602",
    status: "denied",
    submittedDate: "2023-11-15",
    lastUpdate: "2023-12-10",
    program: "Section 8",
    progress: 100,
    steps: [
      { name: "Application Submitted", completed: true, date: "Nov 15, 2023" },
      { name: "Documents Verified", completed: true, date: "Nov 20, 2023" },
      { name: "Background Check", completed: true, date: "Nov 25, 2023" },
      { name: "Income Verification", completed: true, date: "Dec 1, 2023" },
      { name: "Final Review", completed: true, date: "Dec 8, 2023" },
      { name: "Denied", completed: true, date: "Dec 10, 2023" },
    ],
    denialReason: "Income exceeds program limits",
    notes:
      "Your household income exceeds the maximum limit for this program. You may appeal this decision within 30 days.",
  },
]

export default function ApplicationsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r border-border bg-card lg:block">
          <DashboardSidebar />
        </aside>

        <main className="flex-1 bg-muted/30">
          <div className="container mx-auto max-w-5xl px-4 py-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground">My Applications</h1>
              <p className="mt-1 text-muted-foreground">
                Track and manage your housing applications
              </p>
            </div>

            <ApplicationsList applications={applications} />
          </div>
        </main>
      </div>
    </div>
  )
}
