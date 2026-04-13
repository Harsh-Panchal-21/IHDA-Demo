"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts"

const data = [
  { name: "Occupied", value: 2680, color: "hsl(var(--primary))" },
  { name: "Available", value: 89, color: "hsl(142 76% 36%)" },
  { name: "Under Maintenance", value: 45, color: "hsl(48 96% 53%)" },
  { name: "Pending Review", value: 33, color: "hsl(var(--muted-foreground))" },
]

const regionData = [
  { region: "Chicago", occupancy: 96.2 },
  { region: "Springfield", occupancy: 91.8 },
  { region: "Peoria", occupancy: 89.5 },
  { region: "Rockford", occupancy: 93.1 },
  { region: "Other", occupancy: 88.7 },
]

export function OccupancyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Pie Chart */}
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend 
                  verticalAlign="bottom"
                  formatter={(value) => (
                    <span className="text-sm text-muted-foreground">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Regional Breakdown */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">By Region</h4>
            {regionData.map((region) => (
              <div key={region.region} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{region.region}</span>
                  <span className="font-medium text-foreground">{region.occupancy}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div 
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${region.occupancy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
