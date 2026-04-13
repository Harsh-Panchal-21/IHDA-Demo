"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts"

const data = [
  { month: "Jan", applications: 245, approved: 180, rejected: 35 },
  { month: "Feb", applications: 312, approved: 220, rejected: 42 },
  { month: "Mar", applications: 278, approved: 195, rejected: 38 },
  { month: "Apr", applications: 389, approved: 285, rejected: 52 },
  { month: "May", applications: 456, approved: 340, rejected: 58 },
  { month: "Jun", applications: 398, approved: 290, rejected: 48 },
]

export function ApplicationsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar 
                dataKey="applications" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
                name="Total Applications"
              />
              <Bar 
                dataKey="approved" 
                fill="hsl(142 76% 36%)" 
                radius={[4, 4, 0, 0]}
                name="Approved"
              />
              <Bar 
                dataKey="rejected" 
                fill="hsl(0 84% 60%)" 
                radius={[4, 4, 0, 0]}
                name="Rejected"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
