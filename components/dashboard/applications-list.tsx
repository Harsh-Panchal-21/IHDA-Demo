"use client"

import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  MapPin,
  Calendar,
  Download,
  Eye,
  MessageSquare,
  Building2,
  Send,
  Home,
} from "lucide-react"
import Link from "next/link"

interface Step {
  name: string
  completed: boolean
  date: string
}

interface Application {
  id: string
  property: string
  address: string
  status: "under-review" | "waitlist" | "approved" | "denied"
  submittedDate: string
  lastUpdate: string
  program: string
  progress: number
  steps: Step[]
  notes: string
  waitlistPosition?: number
  estimatedWait?: string
  moveInDate?: string
  denialReason?: string
}

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

// Timezone-safe date formatter to avoid hydration mismatches.
function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number)
  if (!year || !month || !day) return isoDate
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return `${months[month - 1]} ${day}, ${year}`
}

interface ConversationMessage {
  id: string
  from: "you" | "agency"
  text: string
  date: string
}

export function ApplicationsList({ applications }: { applications: Application[] }) {
  const [detailsApp, setDetailsApp] = useState<Application | null>(null)
  const [messageApp, setMessageApp] = useState<Application | null>(null)
  const [appealApp, setAppealApp] = useState<Application | null>(null)

  // Per-application conversation threads, keyed by app id.
  const [threads, setThreads] = useState<Record<string, ConversationMessage[]>>({})
  const [messageText, setMessageText] = useState("")
  const [appealText, setAppealText] = useState("")
  const [appealSubmitted, setAppealSubmitted] = useState<Record<string, boolean>>({})

  const activeApplications = applications.filter(
    (app) => app.status === "under-review" || app.status === "waitlist"
  )
  const completedApplications = applications.filter(
    (app) => app.status === "approved" || app.status === "denied"
  )

  const handleDownload = useCallback((app: Application) => {
    const status = statusConfig[app.status]
    const lines = [
      "IHDA HOUSING LOCATOR - APPLICATION SUMMARY",
      "==========================================",
      "",
      `Application ID:   ${app.id}`,
      `Property:         ${app.property}`,
      `Address:          ${app.address}`,
      `Program:          ${app.program}`,
      `Status:           ${status.label}`,
      `Submitted:        ${formatDate(app.submittedDate)}`,
      `Last Updated:     ${formatDate(app.lastUpdate)}`,
      `Progress:         ${app.progress}%`,
      "",
      "APPLICATION TIMELINE",
      "--------------------",
      ...app.steps.map(
        (s) => `[${s.completed ? "x" : " "}] ${s.name} — ${s.date}`
      ),
      "",
    ]
    if (app.status === "waitlist") {
      lines.push(`Waitlist Position: #${app.waitlistPosition}`, `Estimated Wait: ${app.estimatedWait}`, "")
    }
    if (app.status === "approved" && app.moveInDate) {
      lines.push(`Move-in Date: ${formatDate(app.moveInDate)}`, "")
    }
    if (app.status === "denied") {
      lines.push(`Denial Reason: ${app.denialReason}`, "")
    }
    lines.push("NOTES", "-----", app.notes, "", `Generated: ${new Date().toLocaleString()}`)

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${app.id}-summary.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [])

  const handleSendMessage = useCallback(() => {
    if (!messageApp || !messageText.trim()) return
    const now = new Date().toISOString().slice(0, 10)
    const newMsg: ConversationMessage = {
      id: `msg-${Date.now()}`,
      from: "you",
      text: messageText.trim(),
      date: now,
    }
    // Simulate an automated agency acknowledgement reply.
    const reply: ConversationMessage = {
      id: `msg-${Date.now() + 1}`,
      from: "agency",
      text: "Thank you for your message. A housing specialist will review your inquiry and respond within 2 business days.",
      date: now,
    }
    setThreads((prev) => ({
      ...prev,
      [messageApp.id]: [...(prev[messageApp.id] || []), newMsg, reply],
    }))
    setMessageText("")
  }, [messageApp, messageText])

  const handleSubmitAppeal = useCallback(() => {
    if (!appealApp || !appealText.trim()) return
    setAppealSubmitted((prev) => ({ ...prev, [appealApp.id]: true }))
    setAppealText("")
  }, [appealApp, appealText])

  return (
    <>
      {/* Summary Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          icon={FileText}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          value={applications.length}
          label="Total Applications"
        />
        <SummaryCard
          icon={Clock}
          iconBg="bg-amber-100"
          iconColor="text-amber-600"
          value={applications.filter((a) => a.status === "under-review").length}
          label="Under Review"
        />
        <SummaryCard
          icon={CheckCircle}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          value={applications.filter((a) => a.status === "approved").length}
          label="Approved"
        />
        <SummaryCard
          icon={Building2}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          value={applications.filter((a) => a.status === "waitlist").length}
          label="On Waitlist"
        />
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active ({activeApplications.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedApplications.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeApplications.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No Active Applications"
              description="Start by searching for properties and submitting an application."
              action={
                <Button asChild className="mt-4">
                  <Link href="/search">Search Properties</Link>
                </Button>
              }
            />
          ) : (
            activeApplications.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                onViewDetails={() => setDetailsApp(app)}
                onDownload={() => handleDownload(app)}
                onMessage={() => setMessageApp(app)}
                onAppeal={() => setAppealApp(app)}
                appealSubmitted={!!appealSubmitted[app.id]}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedApplications.length === 0 ? (
            <EmptyState
              icon={CheckCircle}
              title="No Completed Applications"
              description="Your completed applications will appear here."
            />
          ) : (
            completedApplications.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                onViewDetails={() => setDetailsApp(app)}
                onDownload={() => handleDownload(app)}
                onMessage={() => setMessageApp(app)}
                onAppeal={() => setAppealApp(app)}
                appealSubmitted={!!appealSubmitted[app.id]}
              />
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* View Details Dialog */}
      <Dialog open={!!detailsApp} onOpenChange={(open) => !open && setDetailsApp(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          {detailsApp && (
            <>
              <DialogHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className={statusConfig[detailsApp.status].color}>
                    {statusConfig[detailsApp.status].label}
                  </Badge>
                  <Badge variant="secondary">{detailsApp.program}</Badge>
                  <span className="text-xs text-muted-foreground">ID: {detailsApp.id}</span>
                </div>
                <DialogTitle className="mt-2">{detailsApp.property}</DialogTitle>
                <DialogDescription className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {detailsApp.address}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 rounded-lg border bg-muted/30 p-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Submitted</p>
                    <p className="font-medium">{formatDate(detailsApp.submittedDate)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Updated</p>
                    <p className="font-medium">{formatDate(detailsApp.lastUpdate)}</p>
                  </div>
                  {detailsApp.status === "waitlist" && (
                    <>
                      <div>
                        <p className="text-muted-foreground">Waitlist Position</p>
                        <p className="font-medium">#{detailsApp.waitlistPosition}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Estimated Wait</p>
                        <p className="font-medium">{detailsApp.estimatedWait}</p>
                      </div>
                    </>
                  )}
                  {detailsApp.status === "approved" && detailsApp.moveInDate && (
                    <div>
                      <p className="text-muted-foreground">Move-in Date</p>
                      <p className="font-medium">{formatDate(detailsApp.moveInDate)}</p>
                    </div>
                  )}
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-muted-foreground">{detailsApp.progress}%</span>
                  </div>
                  <Progress value={detailsApp.progress} className="h-2" />
                </div>

                {/* Full timeline */}
                <div>
                  <h4 className="mb-4 font-medium">Application Timeline</h4>
                  <ol className="relative space-y-5 border-l border-border pl-6">
                    {detailsApp.steps.map((step, index) => (
                      <li key={index} className="relative">
                        <span
                          className={`absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-background ${
                            step.completed ? "bg-green-500" : "bg-muted-foreground/30"
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle className="h-3.5 w-3.5 text-white" />
                          ) : (
                            <Clock className="h-3.5 w-3.5 text-white" />
                          )}
                        </span>
                        <div className="flex items-center justify-between">
                          <p
                            className={`text-sm font-medium ${
                              step.completed ? "text-foreground" : "text-muted-foreground"
                            }`}
                          >
                            {step.name}
                          </p>
                          <span className="text-xs text-muted-foreground">{step.date}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm font-medium">Notes</p>
                  <p className="mt-1 text-sm text-muted-foreground">{detailsApp.notes}</p>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => handleDownload(detailsApp)}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Summary
                </Button>
                <Button onClick={() => setDetailsApp(null)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Message Dialog */}
      <Dialog open={!!messageApp} onOpenChange={(open) => !open && setMessageApp(null)}>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
          {messageApp && (
            <>
              <DialogHeader>
                <DialogTitle>Message Housing Agency</DialogTitle>
                <DialogDescription>
                  Regarding {messageApp.property} (ID: {messageApp.id})
                </DialogDescription>
              </DialogHeader>

              <div className="max-h-64 space-y-3 overflow-y-auto rounded-lg border bg-muted/30 p-3">
                {(threads[messageApp.id] || []).length === 0 ? (
                  <p className="py-6 text-center text-sm text-muted-foreground">
                    No messages yet. Start the conversation below.
                  </p>
                ) : (
                  (threads[messageApp.id] || []).map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.from === "you" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                          msg.from === "you"
                            ? "bg-primary text-primary-foreground"
                            : "bg-card text-card-foreground ring-1 ring-border"
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p
                          className={`mt-1 text-[10px] ${
                            msg.from === "you" ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`}
                        >
                          {msg.from === "you" ? "You" : "Housing Agency"} • {formatDate(msg.date)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message-input">Your message</Label>
                <Textarea
                  id="message-input"
                  placeholder="Type your message to the housing agency..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows={3}
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setMessageApp(null)}>
                  Close
                </Button>
                <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Appeal Dialog */}
      <Dialog open={!!appealApp} onOpenChange={(open) => !open && setAppealApp(null)}>
        <DialogContent className="max-w-lg">
          {appealApp && (
            <>
              <DialogHeader>
                <DialogTitle>File an Appeal</DialogTitle>
                <DialogDescription>
                  Appeal the decision for {appealApp.property} (ID: {appealApp.id})
                </DialogDescription>
              </DialogHeader>

              {appealSubmitted[appealApp.id] ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="mt-4 font-medium">Appeal Submitted</h3>
                  <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                    Your appeal has been received. The housing agency will review your case and respond
                    within 30 days.
                  </p>
                </div>
              ) : (
                <>
                  <div className="rounded-lg bg-red-50 p-3 text-sm">
                    <p className="font-medium text-red-800">Original Decision</p>
                    <p className="text-red-600">{appealApp.denialReason}</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appeal-input">Reason for appeal</Label>
                    <Textarea
                      id="appeal-input"
                      placeholder="Explain why you believe this decision should be reconsidered, and include any new information..."
                      value={appealText}
                      onChange={(e) => setAppealText(e.target.value)}
                      rows={5}
                    />
                  </div>
                </>
              )}

              <DialogFooter>
                {appealSubmitted[appealApp.id] ? (
                  <Button onClick={() => setAppealApp(null)}>Done</Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => setAppealApp(null)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSubmitAppeal} disabled={!appealText.trim()}>
                      Submit Appeal
                    </Button>
                  </>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

function SummaryCard({
  icon: Icon,
  iconBg,
  iconColor,
  value,
  label,
}: {
  icon: typeof FileText
  iconBg: string
  iconColor: string
  value: number
  label: string
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBg}`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          <div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: typeof FileText
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <Icon className="h-12 w-12 text-muted-foreground/50" />
        <h3 className="mt-4 font-medium">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        {action}
      </CardContent>
    </Card>
  )
}

function ApplicationCard({
  application,
  onViewDetails,
  onDownload,
  onMessage,
  onAppeal,
  appealSubmitted,
}: {
  application: Application
  onViewDetails: () => void
  onDownload: () => void
  onMessage: () => void
  onAppeal: () => void
  appealSubmitted: boolean
}) {
  const status = statusConfig[application.status]
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
                Submitted: {formatDate(application.submittedDate)}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                Updated: {formatDate(application.lastUpdate)}
              </div>
            </div>

            {application.status === "waitlist" && (
              <div className="rounded-lg bg-blue-50 p-3">
                <p className="text-sm font-medium text-blue-800">
                  Waitlist Position: #{application.waitlistPosition}
                </p>
                <p className="text-xs text-blue-600">Estimated wait: {application.estimatedWait}</p>
              </div>
            )}

            {application.status === "approved" && application.moveInDate && (
              <div className="rounded-lg bg-green-50 p-3">
                <p className="text-sm font-medium text-green-800">
                  Move-in Date: {formatDate(application.moveInDate)}
                </p>
                <p className="text-xs text-green-600">
                  Please contact the property manager to complete move-in paperwork.
                </p>
              </div>
            )}

            {application.status === "denied" && (
              <div className="rounded-lg bg-red-50 p-3">
                <p className="text-sm font-medium text-red-800">Reason: {application.denialReason}</p>
                <p className="text-xs text-red-600">You may appeal this decision within 30 days.</p>
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
                <button
                  onClick={onViewDetails}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  +{application.steps.length - 4} more steps
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-4">
          <Button variant="outline" size="sm" onClick={onViewDetails}>
            <Eye className="mr-1.5 h-3.5 w-3.5" />
            View Details
          </Button>
          <Button variant="outline" size="sm" onClick={onDownload}>
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Download
          </Button>
          <Button variant="outline" size="sm" onClick={onMessage}>
            <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
            Message
          </Button>
          {application.status === "approved" && (
            <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
              <Home className="mr-1.5 h-3.5 w-3.5" />
              Move-in Info
            </Button>
          )}
          {application.status === "denied" && (
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700"
              onClick={onAppeal}
              disabled={appealSubmitted}
            >
              <AlertCircle className="mr-1.5 h-3.5 w-3.5" />
              {appealSubmitted ? "Appeal Filed" : "File Appeal"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
