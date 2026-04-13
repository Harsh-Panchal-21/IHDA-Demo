import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { SearchMap } from "@/components/search/search-map"
import { SearchFilters } from "@/components/search/search-filters"
import { SearchResults } from "@/components/search/search-results"
import { Spinner } from "@/components/ui/spinner"

export const metadata = {
  title: "Search Housing | IHDA Housing Locator",
  description: "Search affordable housing listings across Illinois with our interactive map.",
}

export default function SearchPage() {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Filters & Results */}
        <aside className="hidden w-[420px] flex-col border-r border-border bg-card lg:flex">
          <Suspense fallback={<div className="flex h-full items-center justify-center"><Spinner /></div>}>
            <SearchFilters />
            <SearchResults />
          </Suspense>
        </aside>

        {/* Main - Map */}
        <main className="relative flex-1">
          <Suspense fallback={<div className="flex h-full items-center justify-center bg-muted"><Spinner /></div>}>
            <SearchMap />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
