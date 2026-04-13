import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowRight, Clock } from "lucide-react"
import Link from "next/link"

const applications = [
  {
    id: "1",
    applicant: "Maria Garcia",
    initials: "MG",
    property: "Lincoln Park 2BR",
    submittedAt: "2 hours ago",
    status: "pending",
  },
  {
    id: "2",
    applicant: "James Wilson",
    initials: "JW",
    property: "Pilsen Studio",
    submittedAt: "5 hours ago",
    status: "under-review",
  },
  {
    id: "3",
    applicant: "Sarah Johnson",
    initials: "SJ",
    property: "Rogers Park 2BR",
    submittedAt: "1 day ago",
    status: "approved",
  },
  {
    id: "4",
    applicant: "Michael Brown",
    initials: "MB",
    property: "Hyde Park 1BR",
    submittedAt: "1 day ago",
    status: "pending",
  },
  {
    id: "5",
    applicant: "Emily Davis",
    initials: "ED",
    property: "West Loop Studio",
    submittedAt: "2 days ago",
    status: "rejected",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return <Badge variant="outline">Pending</Badge>
    case "under-review":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Under Review</Badge>
    case "approved":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>
    case "rejected":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>
    default:
      return null
  }
}

export function RecentApplications() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Applications</CardTitle>
        <Link href="/admin/applications">
          <Button variant="ghost" size="sm" className="gap-2">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {app.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">{app.applicant}</p>
                  <p className="text-xs text-muted-foreground">{app.property}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {app.submittedAt}
                  </p>
                </div>
                {getStatusBadge(app.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
