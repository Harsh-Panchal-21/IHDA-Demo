import { Navbar } from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DocumentManager } from "@/components/dashboard/document-manager"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export const metadata = {
  title: "Documents | IHDA Housing Locator",
  description: "Upload and manage your housing application documents.",
}

export default function DocumentsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r border-border bg-card lg:block">
          <DashboardSidebar />
        </aside>

        <main className="flex-1 bg-muted/30">
          <div className="container mx-auto max-w-5xl px-4 py-8">
            <DocumentManager />

            {/* Upload Tips */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-lg">Document Upload Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    Accepted formats: PDF, JPG, PNG, WEBP (max 10MB per file)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    Ensure documents are clear and all text is readable
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    Do not crop out any important information
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    Use color scans when possible for better clarity
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    Your documents are encrypted and stored securely
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
