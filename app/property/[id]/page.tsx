import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PropertyGallery } from "@/components/property/property-gallery"
import { PropertyDetails } from "@/components/property/property-details"
import { PropertySidebar } from "@/components/property/property-sidebar"
import { PropertyAmenities } from "@/components/property/property-amenities"
import { PropertyLocation } from "@/components/property/property-location"
import { SimilarProperties } from "@/components/property/similar-properties"

// Mock property data
const getProperty = async (id: string) => {
  // In production, this would fetch from database
  return {
    id,
    title: "Sunny 2BR Apartment in Lincoln Park",
    address: "2450 N Lincoln Ave, Chicago, IL 60614",
    rent: 1200,
    securityDeposit: 1200,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 950,
    yearBuilt: 1985,
    status: "available",
    waitlistPosition: null,
    waitlistCount: 0,
    programs: ["Section 8", "LIHTC"],
    accessibility: ["Elevator", "Wide Doorways"],
    amenities: [
      "In-Unit Laundry",
      "Central Air",
      "Hardwood Floors",
      "Updated Kitchen",
      "Off-Street Parking",
      "Storage Unit",
      "Pet Friendly",
      "Near Public Transit",
    ],
    description: `This beautifully updated 2-bedroom apartment is located in the heart of Lincoln Park, one of Chicago's most desirable neighborhoods. The unit features stunning hardwood floors throughout, a modern kitchen with stainless steel appliances, and large windows that flood the space with natural light.

The apartment includes in-unit laundry, central air conditioning, and access to off-street parking. Located just steps from public transit, shops, restaurants, and Lincoln Park itself, this is an ideal home for anyone looking for city living with a neighborhood feel.

This property accepts Section 8 vouchers and is part of the Low Income Housing Tax Credit (LIHTC) program.`,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
    ],
    landlord: {
      name: "Lincoln Park Properties LLC",
      phone: "(312) 555-0123",
      email: "contact@lpproperties.com",
      responseTime: "Usually responds within 24 hours",
    },
    incomeRequirements: {
      maxIncome: 72000,
      minIncome: 28800,
      amiPercentage: 60,
    },
    coordinates: {
      lat: 41.9216,
      lng: -87.6513,
    },
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const property = await getProperty(id)
  
  return {
    title: `${property.title} | IHDA Housing Locator`,
    description: `${property.bedrooms} bedroom, ${property.bathrooms} bathroom apartment for $${property.rent}/month in ${property.address}`,
  }
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const property = await getProperty(id)

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
