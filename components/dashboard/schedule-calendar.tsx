"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  CalendarDays,
  Clock,
  MapPin,
  Video,
  FileText,
  Home,
  Bell,
  Plus,
  ChevronRight,
} from "lucide-react"

type EventType = "viewing" | "deadline" | "appointment" | "interview"

interface ScheduleEvent {
  id: string
  date: string // YYYY-MM-DD
  title: string
  time: string
  location: string
  type: EventType
  mode?: "in-person" | "virtual"
}

const TYPE_CONFIG: Record<
  EventType,
  { label: string; icon: typeof Home; dot: string; badge: string; iconWrap: string }
> = {
  viewing: {
    label: "Property Viewing",
    icon: Home,
    dot: "bg-blue-500",
    badge: "border-blue-200 bg-blue-50 text-blue-700",
    iconWrap: "bg-blue-100 text-blue-600",
  },
  deadline: {
    label: "Deadline",
    icon: FileText,
    dot: "bg-red-500",
    badge: "border-red-200 bg-red-50 text-red-700",
    iconWrap: "bg-red-100 text-red-600",
  },
  appointment: {
    label: "Appointment",
    icon: CalendarDays,
    dot: "bg-emerald-500",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
    iconWrap: "bg-emerald-100 text-emerald-600",
  },
  interview: {
    label: "Interview",
    icon: Video,
    dot: "bg-amber-500",
    badge: "border-amber-200 bg-amber-50 text-amber-700",
    iconWrap: "bg-amber-100 text-amber-600",
  },
}

// Build dates relative to today so the calendar always looks active
function isoOffset(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

const EVENTS: ScheduleEvent[] = [
  {
    id: "1",
    date: isoOffset(0),
    title: "Lincoln Park 2BR Apartment Tour",
    time: "10:00 AM",
    location: "2100 N Lincoln Ave, Chicago",
    type: "viewing",
    mode: "in-person",
  },
  {
    id: "2",
    date: isoOffset(0),
    title: "Income Verification Due",
    time: "11:59 PM",
    location: "IHDA Portal Upload",
    type: "deadline",
  },
  {
    id: "3",
    date: isoOffset(2),
    title: "Eligibility Interview with Case Worker",
    time: "2:30 PM",
    location: "Zoom Video Call",
    type: "interview",
    mode: "virtual",
  },
  {
    id: "4",
    date: isoOffset(5),
    title: "Pilsen Studio Viewing",
    time: "9:15 AM",
    location: "1800 S Halsted St, Chicago",
    type: "viewing",
    mode: "in-person",
  },
  {
    id: "5",
    date: isoOffset(9),
    title: "Lease Signing Appointment",
    time: "1:00 PM",
    location: "IHDA Office, 111 E Wacker Dr",
    type: "appointment",
    mode: "in-person",
  },
  {
    id: "6",
    date: isoOffset(14),
    title: "Recertification Documents Due",
    time: "5:00 PM",
    location: "IHDA Portal Upload",
    type: "deadline",
  },
]

function formatLongDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })
}

function toIso(d: Date): string {
  // Local-date safe ISO (avoids UTC shift)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

export function ScheduleCalendar() {
  const [selected, setSelected] = useState<Date>(new Date())

  const eventsByDate = useMemo(() => {
    const map = new Map<string, ScheduleEvent[]>()
    for (const ev of EVENTS) {
      const list = map.get(ev.date) ?? []
      list.push(ev)
      map.set(ev.date, list)
    }
    return map
  }, [])

  const selectedIso = toIso(selected)
  const dayEvents = eventsByDate.get(selectedIso) ?? []

  const upcoming = useMemo(() => {
    const todayIso = toIso(new Date())
    return [...EVENTS]
      .filter((e) => e.date >= todayIso)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 4)
  }, [])

  // Dates that have events, for calendar modifiers
  const eventDays = useMemo(
    () => EVENTS.map((e) => new Date(e.date + "T00:00:00")),
    [],
  )

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Calendar + selected day */}
      <Card className="lg:col-span-3">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            Schedule
          </CardTitle>
          <Button size="sm" variant="outline">
            <Plus className="mr-1 h-4 w-4" />
            Add Event
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selected}
                onSelect={(d) => d && setSelected(d)}
                showOutsideDays
                modifiers={{ hasEvent: eventDays }}
                modifiersClassNames={{
                  hasEvent:
                    "relative after:absolute after:bottom-1 after:left-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:rounded-full after:bg-primary",
                }}
                className="rounded-lg border [--cell-size:--spacing(10)]"
              />
            </div>

            {/* Selected day events */}
            <div className="min-w-0 flex-1">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                  {formatLongDate(selected)}
                </h3>
                <Badge variant="secondary" className="text-xs">
                  {dayEvents.length} {dayEvents.length === 1 ? "event" : "events"}
                </Badge>
              </div>

              {dayEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-10 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <CalendarDays className="h-6 w-6 text-muted-foreground/50" />
                  </div>
                  <p className="mt-3 text-sm font-medium text-foreground">No events scheduled</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Select a highlighted date to see your events
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {dayEvents.map((ev) => {
                    const cfg = TYPE_CONFIG[ev.type]
                    const Icon = cfg.icon
                    return (
                      <div
                        key={ev.id}
                        className="rounded-lg border bg-card p-3 transition-colors hover:border-primary/40"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${cfg.iconWrap}`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-medium text-foreground">{ev.title}</p>
                              <Badge variant="outline" className={`shrink-0 text-[10px] ${cfg.badge}`}>
                                {cfg.label}
                              </Badge>
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {ev.time}
                              </span>
                              <span className="flex items-center gap-1">
                                {ev.mode === "virtual" ? (
                                  <Video className="h-3 w-3" />
                                ) : (
                                  <MapPin className="h-3 w-3" />
                                )}
                                {ev.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming events */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Upcoming
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcoming.map((ev) => {
              const cfg = TYPE_CONFIG[ev.type]
              const Icon = cfg.icon
              const evDate = new Date(ev.date + "T00:00:00")
              return (
                <button
                  key={ev.id}
                  type="button"
                  onClick={() => setSelected(evDate)}
                  className="flex w-full items-center gap-3 rounded-lg border bg-card p-3 text-left transition-all hover:border-primary/40 hover:shadow-sm"
                >
                  <div className="flex flex-col items-center justify-center rounded-md bg-muted px-2.5 py-1.5">
                    <span className="text-[10px] font-medium uppercase text-muted-foreground">
                      {evDate.toLocaleDateString("en-US", { month: "short" })}
                    </span>
                    <span className="text-lg font-bold leading-none text-foreground">
                      {evDate.getDate()}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{ev.title}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
                      {cfg.label} • {ev.time}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
