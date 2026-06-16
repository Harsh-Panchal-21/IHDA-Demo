"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eraser, Check, PenLine } from "lucide-react"

interface SignaturePadProps {
  onSave: (signatureDataUrl: string, signerName: string) => void
  onCancel: () => void
}

export function SignaturePad({ onSave, onCancel }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)
  const [signerName, setSignerName] = useState("")
  const lastPoint = useRef<{ x: number; y: number } | null>(null)

  // Initialize canvas with proper resolution for crisp lines
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ratio = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * ratio
    canvas.height = rect.height * ratio

    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.scale(ratio, ratio)
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.lineWidth = 2.5
    ctx.strokeStyle = "#1e293b"
  }, [])

  const getPoint = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()

    if ("touches" in e) {
      const touch = e.touches[0] || e.changedTouches[0]
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top }
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }, [])

  const startDrawing = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault()
      setIsDrawing(true)
      lastPoint.current = getPoint(e)
    },
    [getPoint]
  )

  const draw = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDrawing) return
      e.preventDefault()
      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d")
      if (!ctx || !lastPoint.current) return

      const point = getPoint(e)
      ctx.beginPath()
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y)
      ctx.lineTo(point.x, point.y)
      ctx.stroke()
      lastPoint.current = point
      setHasDrawn(true)
    },
    [isDrawing, getPoint]
  )

  const stopDrawing = useCallback(() => {
    setIsDrawing(false)
    lastPoint.current = null
  }, [])

  const handleClear = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasDrawn(false)
  }, [])

  const handleSave = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !hasDrawn) return
    // Composite the signature onto a white background for a clean export
    const exportCanvas = document.createElement("canvas")
    exportCanvas.width = canvas.width
    exportCanvas.height = canvas.height
    const exportCtx = exportCanvas.getContext("2d")
    if (!exportCtx) return
    exportCtx.fillStyle = "#ffffff"
    exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height)
    exportCtx.drawImage(canvas, 0, 0)
    onSave(exportCanvas.toDataURL("image/png"), signerName.trim() || "Signed")
  }, [hasDrawn, onSave, signerName])

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signer-name">Full Legal Name</Label>
        <Input
          id="signer-name"
          placeholder="Type your full name"
          value={signerName}
          onChange={(e) => setSignerName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Draw Your Signature</Label>
        <div className="relative overflow-hidden rounded-lg border-2 border-dashed border-border bg-white">
          <canvas
            ref={canvasRef}
            className="h-48 w-full cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          {!hasDrawn && (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
              <PenLine className="h-8 w-8 opacity-40" />
              <span className="mt-2 text-sm">Sign here using your mouse or finger</span>
            </div>
          )}
          {/* Signature baseline */}
          <div className="pointer-events-none absolute bottom-8 left-6 right-6 border-b border-muted-foreground/30" />
        </div>
        <p className="text-xs text-muted-foreground">
          By signing, you agree this electronic signature is the legal equivalent of your handwritten signature.
        </p>
      </div>

      <div className="flex items-center justify-between gap-2">
        <Button variant="outline" size="sm" onClick={handleClear} disabled={!hasDrawn}>
          <Eraser className="mr-2 h-4 w-4" />
          Clear
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!hasDrawn}>
            <Check className="mr-2 h-4 w-4" />
            Apply Signature
          </Button>
        </div>
      </div>
    </div>
  )
}
