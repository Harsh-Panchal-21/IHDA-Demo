import { Navbar } from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Upload,
  Download,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  FileImage,
  File,
  FolderOpen,
  Plus,
  Search,
  Filter,
} from "lucide-react"
import { Input } from "@/components/ui/input"

export const metadata = {
  title: "Documents | IHDA Housing Locator",
  description: "Upload and manage your housing application documents.",
}

// Mock documents data
const documents = [
  {
    id: "1",
    name: "Government-issued ID",
    type: "identification",
    status: "verified",
    uploadedDate: "2024-01-10",
    fileType: "pdf",
    fileSize: "2.4 MB",
    required: true,
  },
  {
    id: "2",
    name: "Proof of Income - Pay Stub",
    type: "income",
    status: "verified",
    uploadedDate: "2024-01-12",
    fileType: "pdf",
    fileSize: "1.2 MB",
    required: true,
  },
  {
    id: "3",
    name: "Bank Statement - December 2023",
    type: "financial",
    status: "pending",
    uploadedDate: "2024-01-15",
    fileType: "pdf",
    fileSize: "3.1 MB",
    required: true,
  },
  {
    id: "4",
    name: "Social Security Card",
    type: "identification",
    status: "verified",
    uploadedDate: "2024-01-10",
    fileType: "image",
    fileSize: "856 KB",
    required: true,
  },
  {
    id: "5",
    name: "Rental History Letter",
    type: "rental",
    status: "action-required",
    uploadedDate: "2024-01-14",
    fileType: "pdf",
    fileSize: "428 KB",
    required: true,
    note: "Document is blurry. Please re-upload a clearer copy.",
  },
]

const requiredDocuments = [
  { name: "Government-issued Photo ID", uploaded: true },
  { name: "Proof of Income (last 3 months)", uploaded: true },
  { name: "Bank Statements (last 3 months)", uploaded: true },
  { name: "Social Security Card", uploaded: true },
  { name: "Rental History / Landlord Reference", uploaded: true },
  { name: "Birth Certificates (all household members)", uploaded: false },
  { name: "Proof of Citizenship/Immigration Status", uploaded: false },
]

const statusConfig = {
  verified: {
    label: "Verified",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle,
  },
  pending: {
    label: "Pending Review",
    color: "bg-amber-100 text-amber-800 border-amber-200",
    icon: Clock,
  },
  "action-required": {
    label: "Action Required",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: AlertCircle,
  },
}

export default function DocumentsPage() {
  const uploadedCount = requiredDocuments.filter((d) => d.uploaded).length
  const totalRequired = requiredDocuments.length
  const completionPercentage = Math.round((uploadedCount / totalRequired) * 100)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r border-border bg-card lg:block">
          <DashboardSidebar />
        </aside>

        <main className="flex-1 bg-muted/30">
          <div className="container mx-auto max-w-5xl px-4 py-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">My Documents</h1>
                <p className="mt-1 text-muted-foreground">
                  Upload and manage documents for your applications
                </p>
              </div>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </div>

            {/* Document Completion Status */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Document Checklist</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {uploadedCount} of {totalRequired} required documents uploaded
                    </p>
                    <Progress value={completionPercentage} className="mt-3 h-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{completionPercentage}%</div>
                    <div className="text-xs text-muted-foreground">Complete</div>
                  </div>
                </div>

                <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {requiredDocuments.map((doc, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 rounded-lg border p-3 ${
                        doc.uploaded
                          ? "border-green-200 bg-green-50"
                          : "border-amber-200 bg-amber-50"
                      }`}
                    >
                      {doc.uploaded ? (
                        <CheckCircle className="h-4 w-4 shrink-0 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
                      )}
                      <span
                        className={`text-sm ${
                          doc.uploaded ? "text-green-800" : "text-amber-800"
                        }`}
                      >
                        {doc.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Search and Filter */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search documents..." className="pl-9" />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>

            {/* Document List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Uploaded Documents</CardTitle>
                <CardDescription>
                  {documents.length} documents uploaded
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc) => {
                    const status = statusConfig[doc.status as keyof typeof statusConfig]
                    const StatusIcon = status.icon
                    const FileIcon = doc.fileType === "image" ? FileImage : FileText

                    return (
                      <div
                        key={doc.id}
                        className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                            <FileIcon className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{doc.name}</h4>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                              <span>{doc.fileSize}</span>
                              <span>•</span>
                              <span>Uploaded {new Date(doc.uploadedDate).toLocaleDateString()}</span>
                            </div>
                            {doc.note && (
                              <p className="mt-2 text-sm text-red-600">{doc.note}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={status.color}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {status.label}
                          </Badge>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Upload Tips */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-lg">Document Upload Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    Accepted formats: PDF, JPG, PNG (max 10MB per file)
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
