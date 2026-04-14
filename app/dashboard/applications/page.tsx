import { Navbar } from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  MapPin,
  Calendar,
  ChevronRight,
  Download,
  Eye,
  MessageSquare,
  Building2,
} from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "My Applications | IHDA Housing Locator",
  description: "Track and manage your housing applications.",
}

// Mock application data
const applications = [
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
    notes: "Your household income exceeds the maximum limit for this program. You may appeal this decision within 30 days.",
  },
]

const statusConfig = {
  "under-review": {
    label: "Under Review",
    color: "bg-amber-100 text-amber-800 border-amber-200",
    icon: Clock,
  },
  waitlist: {
    label: "On Waitlist",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: Clock,
  },
  approved: {
    label: "Approved",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle,
  },
  denied: {
    label: "Denied",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: XCircle,
  },
}

export default function ApplicationsPage() {
  const activeApplications = applications.filter(
    (app) => app.status === "under-review" || app.status === "waitlist"
  )
  const completedApplications = applications.filter(
    (app) => app.status === "approved" || app.status === "denied"
  )

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

            {/* Summary Cards */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{applications.length}</p>
                      <p className="text-xs text-muted-foreground">Total Applications</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {applications.filter((a) => a.status === "under-review").length}
                      </p>
                      <p className="text-xs text-muted-foreground">Under Review</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {applications.filter((a) => a.status === "approved").length}
                      </p>
                      <p className="text-xs text-muted-foreground">Approved</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                      <Building2 className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {applications.filter((a) => a.status === "waitlist").length}
                      </p>
                      <p className="text-xs text-muted-foreground">On Waitlist</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="active" className="space-y-6">
              <TabsList>
                <TabsTrigger value="active">
                  Active ({activeApplications.length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({completedApplications.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4">
                {activeApplications.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground/50" />
                      <h3 className="mt-4 font-medium">No Active Applications</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Start by searching for properties and submitting an application.
                      </p>
                      <Button asChild className="mt-4">
                        <Link href="/search">Search Properties</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  activeApplications.map((app) => (
                    <ApplicationCard key={app.id} application={app} />
                  ))
                )}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {completedApplications.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <CheckCircle className="h-12 w-12 text-muted-foreground/50" />
                      <h3 className="mt-4 font-medium">No Completed Applications</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Your completed applications will appear here.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  completedApplications.map((app) => (
                    <ApplicationCard key={app.id} application={app} />
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

function ApplicationCard({ application }: { application: (typeof applications)[0] }) {
  const status = statusConfig[application.status as keyof typeof statusConfig]
  const StatusIcon = status.icon

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          {/* Property Info */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={status.color}>
                <StatusIcon className="mr-1 h-3 w-3" />
                {status.label}
              </Badge>
              <Badge variant="secondary">{application.program}</Badge>
              <span className="text-xs text-muted-foreground">ID: {application.id}</span>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">{application.property}</h3>
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {application.address}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                Submitted: {new Date(application.submittedDate).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                Updated: {new Date(application.lastUpdate).toLocaleDateString()}
              </div>
            </div>

            {application.status === "waitlist" && (
              <div className="rounded-lg bg-blue-50 p-3">
                <p className="text-sm font-medium text-blue-800">
                  Waitlist Position: #{application.waitlistPosition}
                </p>
                <p className="text-xs text-blue-600">
                  Estimated wait: {application.estimatedWait}
                </p>
              </div>
            )}

            {application.status === "approved" && (
              <div className="rounded-lg bg-green-50 p-3">
                <p className="text-sm font-medium text-green-800">
                  Move-in Date: {new Date(application.moveInDate!).toLocaleDateString()}
                </p>
                <p className="text-xs text-green-600">
                  Please contact the property manager to complete move-in paperwork.
                </p>
              </div>
            )}

            {application.status === "denied" && (
              <div className="rounded-lg bg-red-50 p-3">
                <p className="text-sm font-medium text-red-800">
                  Reason: {application.denialReason}
                </p>
                <p className="text-xs text-red-600">
                  You may appeal this decision within 30 days.
                </p>
              </div>
            )}
          </div>

          {/* Progress Section */}
          <div className="w-full lg:w-72">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{application.progress}%</span>
            </div>
            <Progress value={application.progress} className="h-2" />

            <div className="mt-4 space-y-2">
              {application.steps.slice(0, 4).map((step, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  {step.completed ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                  )}
                  <span className={step.completed ? "text-foreground" : "text-muted-foreground"}>
                    {step.name}
                  </span>
                </div>
              ))}
              {application.steps.length > 4 && (
                <p className="text-xs text-muted-foreground">
                  +{application.steps.length - 4} more steps
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-4">
          <Button variant="outline" size="sm">
            <Eye className="mr-1.5 h-3.5 w-3.5" />
            View Details
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
            Message
          </Button>
          {application.status === "denied" && (
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
              <AlertCircle className="mr-1.5 h-3.5 w-3.5" />
              File Appeal
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
