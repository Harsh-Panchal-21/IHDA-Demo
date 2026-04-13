import { Card, CardContent } from "@/components/ui/card"
import { 
  Building2, 
  Users, 
  ClipboardList, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

const stats = [
  {
    label: "Total Properties",
    value: "2,847",
    change: "+12",
    changeLabel: "this month",
    trend: "up",
    icon: Building2,
    color: "text-blue-600 bg-blue-100",
  },
  {
    label: "Active Applications",
    value: "1,234",
    change: "+89",
    changeLabel: "this week",
    trend: "up",
    icon: ClipboardList,
    color: "text-green-600 bg-green-100",
  },
  {
    label: "Waitlist Total",
    value: "8,456",
    change: "-156",
    changeLabel: "from last month",
    trend: "down",
    icon: Users,
    color: "text-amber-600 bg-amber-100",
  },
  {
    label: "Occupancy Rate",
    value: "94.2%",
    change: "+2.3%",
    changeLabel: "from last quarter",
    trend: "up",
    icon: TrendingUp,
    color: "text-primary bg-primary/10",
  },
]

export function AdminStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className={`rounded-lg p-2 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div className={`flex items-center gap-1 text-xs ${
                stat.trend === "up" ? "text-green-600" : "text-red-600"
              }`}>
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.changeLabel}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
