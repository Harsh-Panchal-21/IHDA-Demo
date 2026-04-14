import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PropertyGallery } from "@/components/property/property-gallery"
import { PropertyDetails } from "@/components/property/property-details"
import { PropertySidebar } from "@/components/property/property-sidebar"
import { PropertyAmenities } from "@/components/property/property-amenities"
import { PropertyLocation } from "@/components/property/property-location"
import { SimilarProperties } from "@/components/property/similar-properties"
import { getPropertyById, type Property } from "@/lib/properties-data"

// Transform the property data for the detail page
function transformPropertyForDetail(property: Property) {
  return {
    id: property.id,
    title: property.title,
    address: `${property.address}, ${property.city}, ${property.state} ${property.zip}`,
    rent: property.rent,
    securityDeposit: property.rent,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    sqft: property.sqft,
    yearBuilt: property.yearBuilt,
    status: property.status,
    waitlistPosition: property.status === "waitlist-open" ? Math.floor(Math.random() * 50) + 1 : null,
    waitlistCount: property.status === "waitlist-open" ? Math.floor(Math.random() * 100) + 50 : 0,
    programs: property.programs,
    accessibility: property.accessibility,
    amenities: [
      property.laundry !== "None" ? `${property.laundry} Laundry` : null,
      property.parking !== "None" ? `${property.parking} Parking` : null,
      property.pets ? "Pet Friendly" : null,
      "Central Air",
      "Updated Kitchen",
      "Near Public Transit",
    ].filter(Boolean) as string[],
    description: property.description || `This ${property.bedrooms === 0 ? "studio" : `${property.bedrooms}-bedroom`} apartment is located in ${property.city}, ${property.state}. The property features ${property.sqft} square feet of living space with ${property.bathrooms} bathroom(s). ${property.laundry} laundry and ${property.parking.toLowerCase()} parking available.`,
    images: property.images,
    landlord: {
      name: `${property.city} Housing Authority`,
      phone: "(555) 555-0123",
      email: `contact@${property.city.toLowerCase().replace(/\s/g, "")}housing.com`,
      responseTime: "Usually responds within 24 hours",
    },
    incomeRequirements: {
      maxIncome: property.rent * 12 * 5,
      minIncome: property.rent * 12 * 2,
      amiPercentage: 60,
    },
    coordinates: {
      lat: property.lat,
      lng: property.lng,
    },
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const property = getPropertyById(id)
  
  if (!property) {
    return {
      title: "Property Not Found | IHDA Housing Locator",
    }
  }
  
  return {
    title: `${property.title} | IHDA Housing Locator`,
    description: `${property.bedrooms === 0 ? "Studio" : `${property.bedrooms} bedroom`}, ${property.bathrooms} bathroom apartment for $${property.rent}/month in ${property.city}, ${property.state}`,
  }
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const baseProperty = getPropertyById(id)

  if (!baseProperty) {
    notFound()
  }

  const property = transformPropertyForDetail(baseProperty)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Gallery Section */}
        <PropertyGallery images={property.images} title={property.title} />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Details */}
            <div className="space-y-8 lg:col-span-2">
              <PropertyDetails property={property} />
              <PropertyAmenities 
                amenities={property.amenities} 
                accessibility={property.accessibility}
              />
              <PropertyLocation 
                address={property.address}
                coordinates={property.coordinates}
              />
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <PropertySidebar property={property} />
            </div>
          </div>

          {/* Similar Properties */}
          <SimilarProperties currentId={property.id} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
