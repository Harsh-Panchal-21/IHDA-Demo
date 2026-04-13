import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Activity, 
  CheckCircle, 
  Clock, 
  Bell, 
  FileText,
  ArrowUp,
  Home
} from "lucide-react"

const activities = [
  {
    id: "1",
    type: "position_update",
    title: "Waitlist Position Updated",
    description: "You moved from #15 to #12 for Lincoln Park apartment",
    time: "2 hours ago",
    icon: ArrowUp,
    color: "text-green-600 bg-green-100",
  },
  {
    id: "2",
    type: "notification",
    title: "New Property Match",
    description: "A new 2BR apartment in your price range is available",
    time: "1 day ago",
    icon: Bell,
    color: "text-blue-600 bg-blue-100",
  },
  {
    id: "3",
    type: "application",
    title: "Application Received",
    description: "Your application for Pilsen studio was received",
    time: "3 days ago",
    icon: FileText,
    color: "text-primary bg-primary/10",
  },
  {
    id: "4",
    type: "document",
    title: "Document Verified",
    description: "Your income verification has been approved",
    time: "1 week ago",
    icon: CheckCircle,
    color: "text-green-600 bg-green-100",
  },
  {
    id: "5",
    type: "saved",
    title: "Property Saved",
    description: "You saved Rogers Park 2BR to your favorites",
    time: "1 week ago",
    icon: Home,
    color: "text-amber-600 bg-amber-100",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={`flex gap-3 ${
                index !== activities.length - 1 ? "border-b border-border pb-4" : ""
              }`}
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${activity.color}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {activity.description}
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
