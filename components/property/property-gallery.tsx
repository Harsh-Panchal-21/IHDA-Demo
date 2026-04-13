"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, Grid3X3, X } from "lucide-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

interface PropertyGalleryProps {
  images: string[]
  title: string
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <section className="relative bg-muted">
        {/* Desktop Gallery Grid */}
        <div className="container mx-auto hidden gap-2 p-4 md:grid md:grid-cols-4 md:grid-rows-2">
          {/* Main Image */}
          <div 
            className="relative col-span-2 row-span-2 cursor-pointer overflow-hidden rounded-l-xl"
            onClick={() => {
              setCurrentIndex(0)
              setLightboxOpen(true)
            }}
          >
            <Image
              src={images[0]}
              alt={`${title} - Main Image`}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              priority
            />
          </div>

          {/* Secondary Images */}
          {images.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className={`relative cursor-pointer overflow-hidden ${
                index === 1 ? "rounded-tr-xl" : index === 3 ? "rounded-br-xl" : ""
              }`}
              onClick={() => {
                setCurrentIndex(index + 1)
                setLightboxOpen(true)
              }}
            >
              <Image
                src={image}
                alt={`${title} - Image ${index + 2}`}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
              {index === 3 && images.length > 5 && (
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/60">
                  <span className="text-lg font-semibold text-background">
                    +{images.length - 5} more
                  </span>
                </div>
              )}
            </div>
          ))}

          {/* View All Button */}
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-6 right-6 gap-2"
            onClick={() => {
              setCurrentIndex(0)
              setLightboxOpen(true)
            }}
          >
            <Grid3X3 className="h-4 w-4" />
            View All Photos
          </Button>
        </div>

        {/* Mobile Gallery */}
        <div className="relative md:hidden">
          <div className="relative aspect-[4/3]">
            <Image
              src={images[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Mobile Navigation */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
            <Button
              variant="secondary"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={prevImage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-background/60"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            <Button
              variant="secondary"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={nextImage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl border-0 bg-background/95 p-0 backdrop-blur">
          <VisuallyHidden>
            <DialogTitle>Property Image Gallery</DialogTitle>
          </VisuallyHidden>
          <div className="relative">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 z-10 h-10 w-10 rounded-full bg-background/80"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Main Image */}
            <div className="relative aspect-video">
              <Image
                src={images[currentIndex]}
                alt={`${title} - Image ${currentIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            {/* Navigation */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-background/80"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-background/80"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto p-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg ${
                    index === currentIndex ? "ring-2 ring-primary" : "opacity-60"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Counter */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 rounded-full bg-foreground/80 px-3 py-1 text-sm text-background">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
