import { Card, CardContent } from "@/components/ui/card"
import { ClipboardList, Clock, Heart, Bell } from "lucide-react"

const stats = [
  {
    label: "Active Applications",
    value: "2",
    description: "Applications in progress",
    icon: ClipboardList,
    color: "text-blue-600 bg-blue-100",
  },
  {
    label: "Waitlist Position",
    value: "#12",
    description: "Best position across all lists",
    icon: Clock,
    color: "text-amber-600 bg-amber-100",
  },
  {
    label: "Saved Properties",
    value: "8",
    description: "Properties you have saved",
    icon: Heart,
    color: "text-red-600 bg-red-100",
  },
  {
    label: "Notifications",
    value: "3",
    description: "Unread notifications",
    icon: Bell,
    color: "text-green-600 bg-green-100",
  },
]

export function DashboardOverview() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Welcome back, John</h1>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
                </div>
                <div className={`rounded-lg p-2 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
