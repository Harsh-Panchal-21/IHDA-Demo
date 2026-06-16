"use client"

import { useState, useRef, useCallback, useMemo, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SignaturePad } from "@/components/dashboard/signature-pad"
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
  Search,
  X,
  CloudUpload,
  PenLine,
  FileSpreadsheet,
  FileType2,
  ChevronDown,
  FileSignature,
} from "lucide-react"

type DocStatus = "verified" | "pending" | "action-required"

interface DocItem {
  id: string
  name: string
  category: string
  status: DocStatus
  uploadedDate: string
  fileType: "pdf" | "image" | "other" | "signature"
  fileSize: string
  required: boolean
  note?: string
  // For real uploaded files
  url?: string
  mimeType?: string
  // For e-signatures
  signerName?: string
}

const CATEGORIES = [
  { value: "identification", label: "Identification" },
  { value: "income", label: "Proof of Income" },
  { value: "financial", label: "Financial" },
  { value: "rental", label: "Rental History" },
  { value: "signature", label: "Signed Documents" },
  { value: "other", label: "Other" },
]

const requiredDocuments = [
  { name: "Government-issued Photo ID", category: "identification" },
  { name: "Proof of Income (last 3 months)", category: "income" },
  { name: "Bank Statements (last 3 months)", category: "financial" },
  { name: "Social Security Card", category: "identification" },
  { name: "Rental History / Landlord Reference", category: "rental" },
]

const statusConfig: Record<DocStatus, { label: string; color: string; icon: typeof CheckCircle }> = {
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

const initialDocuments: DocItem[] = [
  {
    id: "seed-1",
    name: "Government-issued ID",
    category: "identification",
    status: "verified",
    uploadedDate: "2024-01-10",
    fileType: "pdf",
    fileSize: "2.4 MB",
    required: true,
  },
  {
    id: "seed-2",
    name: "Proof of Income - Pay Stub",
    category: "income",
    status: "verified",
    uploadedDate: "2024-01-12",
    fileType: "pdf",
    fileSize: "1.2 MB",
    required: true,
  },
  {
    id: "seed-3",
    name: "Bank Statement - December 2023",
    category: "financial",
    status: "pending",
    uploadedDate: "2024-01-15",
    fileType: "pdf",
    fileSize: "3.1 MB",
    required: true,
  },
  {
    id: "seed-4",
    name: "Rental History Letter",
    category: "rental",
    status: "action-required",
    uploadedDate: "2024-01-14",
    fileType: "pdf",
    fileSize: "428 KB",
    required: true,
    note: "Document is blurry. Please re-upload a clearer copy.",
  },
]

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"]

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function getFileType(mime: string): "pdf" | "image" | "other" {
  if (mime === "application/pdf") return "pdf"
  if (mime.startsWith("image/")) return "image"
  return "other"
}

// Timezone-safe date formatter — parses "YYYY-MM-DD" as a local date to
// avoid server/client hydration mismatches from UTC offset shifts.
function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number)
  if (!year || !month || !day) return isoDate
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ]
  return `${months[month - 1]} ${day}, ${year}`
}

// Visual styling per file type for the document thumbnails.
function getFileTypeStyle(fileType: DocItem["fileType"]): {
  icon: typeof FileText
  iconClass: string
  bgClass: string
  label: string
} {
  switch (fileType) {
    case "signature":
      return {
        icon: FileSignature,
        iconClass: "text-violet-600",
        bgClass: "bg-violet-100",
        label: "Signature",
      }
    case "image":
      return {
        icon: FileImage,
        iconClass: "text-blue-600",
        bgClass: "bg-blue-100",
        label: "Image",
      }
    case "pdf":
      return {
        icon: FileText,
        iconClass: "text-red-600",
        bgClass: "bg-red-100",
        label: "PDF",
      }
    default:
      return {
        icon: FileText,
        iconClass: "text-slate-600",
        bgClass: "bg-slate-100",
        label: "File",
      }
  }
}

export function DocumentManager() {
  const [documents, setDocuments] = useState<DocItem[]>(initialDocuments)
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isDragging, setIsDragging] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [previewDoc, setPreviewDoc] = useState<DocItem | null>(null)
  const [deleteDoc, setDeleteDoc] = useState<DocItem | null>(null)
  const [signatureOpen, setSignatureOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      documents.forEach((doc) => {
        if (doc.url) URL.revokeObjectURL(doc.url)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return
    setUploadError(null)

    const newDocs: DocItem[] = []
    for (const file of Array.from(files)) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setUploadError(`"${file.name}" is not a supported file type. Use PDF, JPG, PNG, or WEBP.`)
        continue
      }
      if (file.size > MAX_FILE_SIZE) {
        setUploadError(`"${file.name}" exceeds the 10MB size limit.`)
        continue
      }
      newDocs.push({
        id: `upload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: file.name,
        category: "other",
        status: "pending",
        uploadedDate: new Date().toISOString().slice(0, 10),
        fileType: getFileType(file.type),
        fileSize: formatBytes(file.size),
        required: false,
        url: URL.createObjectURL(file),
        mimeType: file.type,
      })
    }

    if (newDocs.length > 0) {
      setDocuments((prev) => [...newDocs, ...prev])
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles]
  )

  const handleDownload = useCallback((doc: DocItem) => {
    if (doc.url) {
      const a = document.createElement("a")
      a.href = doc.url
      a.download = doc.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } else {
      // Seed/demo document - generate a placeholder text file
      const blob = new Blob(
        [`IHDA Housing Locator\nDocument: ${doc.name}\nStatus: ${doc.status}\nUploaded: ${doc.uploadedDate}\n\nThis is a demo document.`],
        { type: "text/plain" }
      )
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${doc.name}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }, [])

  const handleCategoryChange = useCallback((id: string, category: string) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, category } : doc))
    )
  }, [])

  const confirmDelete = useCallback(() => {
    if (!deleteDoc) return
    setDocuments((prev) => prev.filter((doc) => doc.id !== deleteDoc.id))
    if (deleteDoc.url) URL.revokeObjectURL(deleteDoc.url)
    setDeleteDoc(null)
  }, [deleteDoc])

  const handleSaveSignature = useCallback((dataUrl: string, signerName: string) => {
    // Convert data URL to blob to estimate size and create an object URL
    const byteString = atob(dataUrl.split(",")[1])
    const arrayBuffer = new ArrayBuffer(byteString.length)
    const intArray = new Uint8Array(arrayBuffer)
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i)
    }
    const blob = new Blob([arrayBuffer], { type: "image/png" })
    const url = URL.createObjectURL(blob)

    setDocuments((prev) => [
      {
        id: `sig-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: `E-Signature - ${signerName}`,
        category: "signature",
        status: "verified" as DocStatus,
        uploadedDate: new Date().toISOString().slice(0, 10),
        fileType: "signature" as const,
        fileSize: formatBytes(blob.size),
        required: false,
        url,
        mimeType: "image/png",
        signerName,
      },
      ...prev,
    ])
    setSignatureOpen(false)
  }, [])

  const triggerFileDownload = useCallback((content: string, filename: string, mime: string) => {
    const blob = new Blob([content], { type: mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [])

  const exportToCSV = useCallback(() => {
    const headers = ["Document Name", "Category", "Status", "File Type", "File Size", "Uploaded Date"]
    const escape = (val: string) => `"${val.replace(/"/g, '""')}"`
    const rows = documents.map((doc) => {
      const categoryLabel = CATEGORIES.find((c) => c.value === doc.category)?.label || doc.category
      return [
        doc.name,
        categoryLabel,
        statusConfig[doc.status].label,
        doc.fileType,
        doc.fileSize,
        formatDate(doc.uploadedDate),
      ].map((v) => escape(String(v))).join(",")
    })
    const csv = [headers.map(escape).join(","), ...rows].join("\n")
    // Prepend BOM so Excel reads UTF-8 correctly
    triggerFileDownload("\uFEFF" + csv, "documents.csv", "text/csv;charset=utf-8")
  }, [documents, triggerFileDownload])

  const exportToWord = useCallback(() => {
    const generated = new Date().toLocaleString()
    const tableRows = documents
      .map((doc) => {
        const categoryLabel = CATEGORIES.find((c) => c.value === doc.category)?.label || doc.category
        return `<tr>
          <td>${doc.name}</td>
          <td>${categoryLabel}</td>
          <td>${statusConfig[doc.status].label}</td>
          <td>${doc.fileSize}</td>
          <td>${formatDate(doc.uploadedDate)}</td>
        </tr>`
      })
      .join("")

    const html = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8"><title>Documents Report</title></head>
<body style="font-family: Arial, sans-serif;">
  <h1 style="color:#1e293b;">IHDA Housing Locator</h1>
  <h2>Document Report</h2>
  <p style="color:#64748b;">Generated: ${generated}</p>
  <table border="1" cellspacing="0" cellpadding="8" style="border-collapse:collapse; width:100%;">
    <thead>
      <tr style="background:#f1f5f9;">
        <th align="left">Document Name</th>
        <th align="left">Category</th>
        <th align="left">Status</th>
        <th align="left">File Size</th>
        <th align="left">Uploaded</th>
      </tr>
    </thead>
    <tbody>${tableRows}</tbody>
  </table>
  <p style="margin-top:24px; color:#64748b; font-size:12px;">Total documents: ${documents.length}</p>
</body>
</html>`
    triggerFileDownload(html, "documents.doc", "application/msword")
  }, [documents, triggerFileDownload])

  const exportToJSON = useCallback(() => {
    const data = documents.map((doc) => ({
      name: doc.name,
      category: CATEGORIES.find((c) => c.value === doc.category)?.label || doc.category,
      status: statusConfig[doc.status].label,
      fileType: doc.fileType,
      fileSize: doc.fileSize,
      uploadedDate: doc.uploadedDate,
    }))
    triggerFileDownload(JSON.stringify(data, null, 2), "documents.json", "application/json")
  }, [documents, triggerFileDownload])

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [documents, search, categoryFilter])

  // Checklist completion based on categories present
  const checklist = useMemo(() => {
    return requiredDocuments.map((req) => {
      const uploaded = documents.some(
        (doc) => doc.category === req.category
      )
      return { ...req, uploaded }
    })
  }, [documents])

  const uploadedCount = checklist.filter((c) => c.uploaded).length
  const completionPercentage = Math.round((uploadedCount / checklist.length) * 100)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Documents</h1>
          <p className="mt-1 text-muted-foreground">
            Upload, sign, and manage documents for your applications
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" disabled={documents.length === 0}>
                <Download className="mr-2 h-4 w-4" />
                Export
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Export document list</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={exportToCSV}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Excel / CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToWord}>
                <FileType2 className="mr-2 h-4 w-4" />
                Word Document
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToJSON}>
                <FileText className="mr-2 h-4 w-4" />
                JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" onClick={() => setSignatureOpen(true)}>
            <PenLine className="mr-2 h-4 w-4" />
            Sign Document
          </Button>
          <Button onClick={() => fileInputRef.current?.click()}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png,.webp"
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files)
          e.target.value = ""
        }}
      />

      {/* Upload Dropzone */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload documents by clicking or dragging files here"
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            fileInputRef.current?.click()
          }
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50"
        }`}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <CloudUpload className="h-7 w-7 text-primary" />
        </div>
        <h3 className="mt-4 font-semibold text-foreground">
          Drag &amp; drop files here, or click to browse
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Supports PDF, JPG, PNG, WEBP — up to 10MB per file
        </p>
      </div>

      {uploadError && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span className="flex-1">{uploadError}</span>
          <button onClick={() => setUploadError(null)} aria-label="Dismiss error">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Completion Status */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Document Checklist</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {uploadedCount} of {checklist.length} required document types provided
              </p>
              <Progress value={completionPercentage} className="mt-3 h-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{completionPercentage}%</div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {checklist.map((doc, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 rounded-lg border p-3 ${
                  doc.uploaded ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"
                }`}
              >
                {doc.uploaded ? (
                  <CheckCircle className="h-4 w-4 shrink-0 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
                )}
                <span className={`text-sm ${doc.uploaded ? "text-green-800" : "text-amber-800"}`}>
                  {doc.name}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-52">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Document List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Uploaded Documents</CardTitle>
          <CardDescription>
            {filteredDocuments.length} of {documents.length} documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredDocuments.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center">
              <FileText className="h-10 w-10 text-muted-foreground/50" />
              <p className="mt-3 font-medium text-foreground">No documents found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search or upload a new document.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDocuments.map((doc) => {
                const status = statusConfig[doc.status]
                const StatusIcon = status.icon
                const typeStyle = getFileTypeStyle(doc.fileType)
                const FileIcon = typeStyle.icon
                const hasThumbnail =
                  !!doc.url && (doc.fileType === "image" || doc.fileType === "signature")

                return (
                  <div
                    key={doc.id}
                    className="group flex flex-col gap-4 rounded-xl border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-start gap-4">
                      {/* Thumbnail / type badge */}
                      <button
                        type="button"
                        onClick={() => setPreviewDoc(doc)}
                        aria-label={`Preview ${doc.name}`}
                        className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg ring-1 ring-border transition-transform hover:scale-105"
                      >
                        {hasThumbnail ? (
                          <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={doc.url || "/placeholder.svg"}
                              alt={doc.name}
                              className="h-full w-full object-cover"
                            />
                            <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity group-hover:bg-black/30 group-hover:opacity-100">
                              <Eye className="h-4 w-4 text-white" />
                            </span>
                          </>
                        ) : (
                          <span
                            className={`flex h-full w-full items-center justify-center ${typeStyle.bgClass}`}
                          >
                            <FileIcon className={`h-6 w-6 ${typeStyle.iconClass}`} />
                          </span>
                        )}
                      </button>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="truncate font-semibold text-foreground">{doc.name}</h4>
                          {doc.required && (
                            <Badge variant="secondary" className="shrink-0 text-[10px]">
                              Required
                            </Badge>
                          )}
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                          <span className="font-medium uppercase tracking-wide">
                            {typeStyle.label}
                          </span>
                          <span aria-hidden>•</span>
                          <span>{doc.fileSize}</span>
                          <span aria-hidden>•</span>
                          <span>Uploaded {formatDate(doc.uploadedDate)}</span>
                        </div>
                        {doc.note && (
                          <p className="mt-2 flex items-start gap-1.5 rounded-md bg-red-50 p-2 text-xs text-red-700">
                            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                            <span>{doc.note}</span>
                          </p>
                        )}
                        <div className="mt-2">
                          <Select
                            value={doc.category}
                            onValueChange={(val) => handleCategoryChange(doc.id, val)}
                          >
                            <SelectTrigger className="h-7 w-44 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {CATEGORIES.map((cat) => (
                                <SelectItem key={cat.value} value={cat.value}>
                                  {cat.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2 border-t pt-3 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0 lg:flex-row lg:items-center">
                      <Badge variant="outline" className={status.color}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {status.label}
                      </Badge>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          aria-label={`Preview ${doc.name}`}
                          onClick={() => setPreviewDoc(doc)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          aria-label={`Download ${doc.name}`}
                          onClick={() => handleDownload(doc)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                          aria-label={`Delete ${doc.name}`}
                          onClick={() => setDeleteDoc(doc)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={!!previewDoc} onOpenChange={(open) => !open && setPreviewDoc(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <div className="flex items-start gap-3 pr-8">
              {previewDoc && (
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${getFileTypeStyle(previewDoc.fileType).bgClass}`}
                >
                  {(() => {
                    const Icon = getFileTypeStyle(previewDoc.fileType).icon
                    return <Icon className={`h-5 w-5 ${getFileTypeStyle(previewDoc.fileType).iconClass}`} />
                  })()}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <DialogTitle className="truncate">{previewDoc?.name}</DialogTitle>
                <DialogDescription className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-medium uppercase tracking-wide">
                    {previewDoc && getFileTypeStyle(previewDoc.fileType).label}
                  </span>
                  <span aria-hidden>•</span>
                  <span>{previewDoc?.fileSize}</span>
                  <span aria-hidden>•</span>
                  <span>Uploaded {previewDoc && formatDate(previewDoc.uploadedDate)}</span>
                </DialogDescription>
              </div>
              {previewDoc && (
                <Badge variant="outline" className={`${statusConfig[previewDoc.status].color} shrink-0`}>
                  {(() => {
                    const SIcon = statusConfig[previewDoc.status].icon
                    return <SIcon className="mr-1 h-3 w-3" />
                  })()}
                  {statusConfig[previewDoc.status].label}
                </Badge>
              )}
            </div>
          </DialogHeader>
          <div className="flex max-h-[60vh] items-center justify-center overflow-auto rounded-lg border bg-muted/30 p-2">
            {previewDoc?.url && (previewDoc.fileType === "image" || previewDoc.fileType === "signature") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewDoc.url || "/placeholder.svg"}
                alt={previewDoc.name}
                className="mx-auto max-h-[58vh] w-auto rounded-md object-contain shadow-sm"
              />
            ) : previewDoc?.url && previewDoc.fileType === "pdf" ? (
              <iframe
                src={previewDoc.url}
                title={previewDoc.name}
                className="h-[58vh] w-full rounded-md"
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <FileText className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <p className="mt-4 font-medium text-foreground">Preview not available</p>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  This is a demo document without a stored file. Uploaded files show a live preview here.
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => previewDoc && handleDownload(previewDoc)}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button onClick={() => setPreviewDoc(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* E-Signature Dialog */}
      <Dialog open={signatureOpen} onOpenChange={setSignatureOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Sign Document</DialogTitle>
            <DialogDescription>
              Draw your signature below. It will be saved to your documents as a verified e-signature.
            </DialogDescription>
          </DialogHeader>
          {signatureOpen && (
            <SignaturePad
              onSave={handleSaveSignature}
              onCancel={() => setSignatureOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteDoc} onOpenChange={(open) => !open && setDeleteDoc(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete document?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deleteDoc?.name}&quot;? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
