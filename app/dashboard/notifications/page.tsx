import { Navbar } from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  BellOff,
  CheckCircle,
  Clock,
  FileText,
  Home,
  AlertCircle,
  Mail,
  Smartphone,
  Trash2,
  Check,
  Building2,
  Calendar,
  DollarSign,
} from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Notifications | IHDA Housing Locator",
  description: "View and manage your notifications.",
}

// Mock notifications
const notifications = [
  {
    id: "1",
    type: "application",
    title: "Application Status Updated",
    message: "Your application for Capitol View 2BR Apartment has moved to the income verification stage.",
    timestamp: "2024-01-20T10:30:00",
    read: false,
    link: "/dashboard/applications",
  },
  {
    id: "2",
    type: "waitlist",
    title: "Waitlist Position Changed",
    message: "Your position on the Lincoln Park Family Home waitlist has moved from #25 to #23.",
    timestamp: "2024-01-19T15:45:00",
    read: false,
    link: "/dashboard/applications",
  },
  {
    id: "3",
    type: "property",
    title: "New Property Match",
    message: "A new 2BR apartment matching your search criteria is now available in Springfield.",
    timestamp: "2024-01-18T09:00:00",
    read: false,
    link: "/property/11",
  },
  {
    id: "4",
    type: "document",
    title: "Document Request",
    message: "Please upload your latest pay stub for the Capitol View application.",
    timestamp: "2024-01-17T14:20:00",
    read: true,
    link: "/dashboard/documents",
  },
  {
    id: "5",
    type: "reminder",
    title: "Application Deadline Reminder",
    message: "Your application for Sunny 2BR Apartment expires in 7 days. Please complete all required steps.",
    timestamp: "2024-01-15T08:00:00",
    read: true,
    link: "/dashboard/applications",
  },
  {
    id: "6",
    type: "system",
    title: "Welcome to IHDA Housing Locator",
    message: "Thank you for creating an account. Start by searching for available properties in your area.",
    timestamp: "2024-01-10T12:00:00",
    read: true,
    link: "/search",
  },
]

const typeConfig = {
  application: {
    icon: FileText,
    color: "text-blue-600 bg-blue-100",
  },
  waitlist: {
    icon: Clock,
    color: "text-amber-600 bg-amber-100",
  },
  property: {
    icon: Home,
    color: "text-green-600 bg-green-100",
  },
  document: {
    icon: FileText,
    color: "text-purple-600 bg-purple-100",
  },
  reminder: {
    icon: AlertCircle,
    color: "text-red-600 bg-red-100",
  },
  system: {
    icon: Bell,
    color: "text-gray-600 bg-gray-100",
  },
}

function formatRelativeTime(timestamp: string) {
  const now = new Date()
  const date = new Date(timestamp)
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return "Just now"
  if (diffInHours < 24) return `${diffInHours}h ago`
  if (diffInHours < 48) return "Yesterday"
  if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
  return date.toLocaleDateString()
}

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r border-border bg-card lg:block">
          <DashboardSidebar />
        </aside>

        <main className="flex-1 bg-muted/30">
          <div className="container mx-auto max-w-4xl px-4 py-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
                <p className="mt-1 text-muted-foreground">
                  {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Check className="mr-2 h-4 w-4" />
                  Mark All Read
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" className="space-y-6">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">
                  Unread {unreadCount > 0 && `(${unreadCount})`}
                </TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="properties">Properties</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-3">
                {notifications.map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))}
              </TabsContent>

              <TabsContent value="unread" className="space-y-3">
                {notifications.filter((n) => !n.read).length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <CheckCircle className="h-12 w-12 text-green-500" />
                      <h3 className="mt-4 font-medium">All Caught Up!</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        You have no unread notifications.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  notifications
                    .filter((n) => !n.read)
                    .map((notification) => (
                      <NotificationCard key={notification.id} notification={notification} />
                    ))
                )}
              </TabsContent>

              <TabsContent value="applications" className="space-y-3">
                {notifications
                  .filter((n) => n.type === "application" || n.type === "waitlist" || n.type === "document")
                  .map((notification) => (
                    <NotificationCard key={notification.id} notification={notification} />
                  ))}
              </TabsContent>

              <TabsContent value="properties" className="space-y-3">
                {notifications
                  .filter((n) => n.type === "property")
                  .map((notification) => (
                    <NotificationCard key={notification.id} notification={notification} />
                  ))}
              </TabsContent>
            </Tabs>

            {/* Notification Preferences */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-lg">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-medium">
                      <Mail className="h-4 w-4" />
                      Email Notifications
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Application updates</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Waitlist changes</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">New property matches</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Price drop alerts</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Document requests</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-medium">
                      <Smartphone className="h-4 w-4" />
                      SMS Notifications
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Application approved/denied</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Waitlist movement</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Urgent document requests</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Appointment reminders</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Weekly digest</span>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Button>Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

function NotificationCard({ notification }: { notification: (typeof notifications)[0] }) {
  const config = typeConfig[notification.type as keyof typeof typeConfig]
  const Icon = config.icon

  return (
    <Link href={notification.link}>
      <Card
        className={`cursor-pointer transition-colors hover:bg-muted/50 ${
          !notification.read ? "border-l-4 border-l-primary" : ""
        }`}
      >
        <CardContent className="flex gap-4 p-4">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h4 className={`font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                {notification.title}
              </h4>
              <span className="shrink-0 text-xs text-muted-foreground">
                {formatRelativeTime(notification.timestamp)}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {notification.message}
            </p>
          </div>
          {!notification.read && (
            <div className="flex h-2 w-2 shrink-0 items-center justify-center rounded-full bg-primary" />
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
