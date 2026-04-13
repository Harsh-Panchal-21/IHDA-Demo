import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"

export function CTASection() {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-8 shadow-lg md:p-12">
          <div className="text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
              Ready to Find Your New Home?
            </h2>
            <p className="mb-8 text-pretty text-lg text-muted-foreground">
              Start your search today or speak with a housing specialist who can help guide you 
              through the process.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/search">
                <Button size="lg" className="gap-2">
                  Start Searching
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="tel:1-312-836-5200">
                <Button size="lg" variant="outline" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Call 1-312-836-5200
                </Button>
              </a>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              Available Monday - Friday, 8:00 AM - 5:00 PM CST
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
