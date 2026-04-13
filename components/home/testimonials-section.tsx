"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Maria Rodriguez",
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    quote: "The IHDA Housing Locator made finding affordable housing so much easier. Within weeks, I found a beautiful apartment for my family that fits our budget perfectly.",
    rating: 5,
    program: "Section 8 Voucher",
    date: "Moved in March 2024"
  },
  {
    id: 2,
    name: "James Thompson",
    location: "Springfield, IL",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    quote: "After being on multiple waitlists, the tracking feature here helped me stay organized. I finally got approved and moved into a great place near my work.",
    rating: 5,
    program: "LIHTC Housing",
    date: "Moved in January 2024"
  },
  {
    id: 3,
    name: "Patricia Williams",
    location: "Peoria, IL",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    quote: "As a senior on a fixed income, I was worried about finding accessible housing. This platform connected me with resources I didn't know existed.",
    rating: 5,
    program: "Senior Housing",
    date: "Moved in November 2023"
  },
  {
    id: 4,
    name: "Michael Chen",
    location: "Rockford, IL",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    quote: "The application process was straightforward, and the support team answered all my questions. Highly recommend for anyone looking for affordable housing.",
    rating: 5,
    program: "Public Housing",
    date: "Moved in February 2024"
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const next = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="relative overflow-hidden bg-muted/30 py-20 md:py-28">
      {/* Background decoration */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/5 blur-[100px]" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-500/5 blur-[100px]" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <Star className="h-4 w-4 fill-primary" />
            Success Stories
          </div>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Hear From Our Community
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Real stories from Illinois residents who found their perfect home through the IHDA Housing Locator.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative mx-auto max-w-4xl">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full shrink-0 px-4">
                  <Card className="border-0 bg-card shadow-xl">
                    <CardContent className="p-8 md:p-12">
                      <div className="flex flex-col items-center text-center">
                        {/* Quote Icon */}
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                          <Quote className="h-7 w-7 text-primary" />
                        </div>

                        {/* Quote */}
                        <blockquote className="mb-8 text-xl leading-relaxed text-foreground md:text-2xl">
                          &quot;{testimonial.quote}&quot;
                        </blockquote>

                        {/* Rating */}
                        <div className="mb-6 flex gap-1">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>

                        {/* Author Info */}
                        <div className="flex flex-col items-center">
                          <div className="relative mb-4">
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              width={80}
                              height={80}
                              className="rounded-full object-cover ring-4 ring-primary/10"
                            />
                          </div>
                          <p className="text-lg font-semibold text-foreground">{testimonial.name}</p>
                          <p className="text-muted-foreground">{testimonial.location}</p>
                          <div className="mt-3 flex items-center gap-2">
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                              {testimonial.program}
                            </span>
                            <span className="text-xs text-muted-foreground">{testimonial.date}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute -left-4 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded-full shadow-lg md:-left-6"
            onClick={prev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute -right-4 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded-full shadow-lg md:-right-6"
            onClick={next}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false)
                  setCurrentIndex(index)
                }}
                className={`h-2.5 rounded-full transition-all ${
                  index === currentIndex 
                    ? "w-8 bg-primary" 
                    : "w-2.5 bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
