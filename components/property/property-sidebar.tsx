"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  Heart, 
  Share2, 
  Phone, 
  Mail, 
  Clock,
  DollarSign,
  ClipboardList,
  CheckCircle
} from "lucide-react"

interface PropertySidebarProps {
  property: {
    rent: number
    securityDeposit: number
    status: string
    waitlistPosition: number | null
    waitlistCount: number
    landlord: {
      name: string
      phone: string
      email: string
      responseTime: string
    }
  }
}

export function PropertySidebar({ property }: PropertySidebarProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would submit to an API
    setApplicationSubmitted(true)
  }

  return (
    <div className="sticky top-24 space-y-6">
      {/* Pricing Card */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary pb-4 text-primary-foreground">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-sm opacity-90">Monthly Rent</p>
              <p className="text-3xl font-bold">${property.rent}</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Security Deposit</p>
              <p className="text-lg font-semibold">${property.securityDeposit}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-4">
          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-2"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
              />
              {isFavorite ? "Saved" : "Save"}
            </Button>
            <Button variant="outline" size="sm" className="flex-1 gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          {/* Status Info */}
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="flex items-center gap-2">
              {property.status === "available" ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-600">Available Now</span>
                </>
              ) : (
                <>
                  <Clock className="h-5 w-5 text-amber-600" />
                  <span className="font-medium text-amber-600">
                    Waitlist Open ({property.waitlistCount} in queue)
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Apply Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full gap-2" size="lg">
                <ClipboardList className="h-4 w-4" />
                {property.status === "available" ? "Apply Now" : "Join Waitlist"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {property.status === "available" ? "Apply for This Property" : "Join the Waitlist"}
                </DialogTitle>
                <DialogDescription>
                  {property.status === "available"
                    ? "Fill out the form below to start your application."
                    : "Join the waitlist to be notified when a unit becomes available."}
                </DialogDescription>
              </DialogHeader>

              {applicationSubmitted ? (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Application Submitted!</h3>
                  <p className="text-muted-foreground">
                    We&apos;ve received your application. You&apos;ll receive an email confirmation shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Submit Application
                  </Button>
                </form>
              )}
            </DialogContent>
          </Dialog>

          {/* Income Calculator Link */}
          <Button variant="outline" className="w-full gap-2">
            <DollarSign className="h-4 w-4" />
            Check Income Eligibility
          </Button>
        </CardContent>
      </Card>

      {/* Contact Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Property Manager</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium text-foreground">{property.landlord.name}</p>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              {property.landlord.responseTime}
            </p>
          </div>

          <div className="space-y-2">
            <a
              href={`tel:${property.landlord.phone}`}
              className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted"
            >
              <Phone className="h-5 w-5 text-primary" />
              <span className="text-sm">{property.landlord.phone}</span>
            </a>
            <a
              href={`mailto:${property.landlord.email}`}
              className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted"
            >
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-sm">{property.landlord.email}</span>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
