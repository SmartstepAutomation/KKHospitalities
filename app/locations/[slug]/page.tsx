import { Metadata } from 'next';
import { propertyService } from "@/services/propertyService";
import CTAStickyBar from "@/components/CTAStickyBar";
import PropertyCard from "@/components/PropertyCard";
import Head from 'next/head';

// Map SEO slugs to actual locations and nice titles
const locationData: Record<string, { cityFormat: string, h1: string, title: string, subtitle: string }> = {
  "hitec-city": {
    cityFormat: "HITEC City, Hyderabad", // To match DB/Mock location field
    h1: "Premium Co-living & PGs near HITEC City",
    title: "PG flats & Co-living near HITEC City, Hyderabad | KK Hospitalities",
    subtitle: "Fully managed rental homes perfectly positioned for IT professionals working in Mindspace and HITEC City."
  },
  "gachibowli": {
    cityFormat: "Gachibowli, Hyderabad",
    h1: "Luxury Rental Rooms & Co-living in Gachibowli",
    title: "Best PG & Co-living in Gachibowli | KK Hospitalities",
    subtitle: "Experience hassle-free premium coliving steps away from the Financial District and major tech campuses."
  },
  "madhapur": {
    cityFormat: "Madhapur, Hyderabad",
    h1: "Top Rated Co-living Spaces in Madhapur",
    title: "Premium PG & Rooms in Madhapur | KK Hospitalities",
    subtitle: "Live in the vibrant heart of Madhapur with zero brokerage and premium amenities."
  }
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = locationData[params.slug];
  if (!data) return { title: "Co-living in Hyderabad | KK Hospitalities" };

  return {
    title: data.title,
    description: data.subtitle,
    openGraph: {
      title: data.title,
      description: data.subtitle,
    }
  };
}

export default async function LocationPage({ params }: { params: { slug: string } }) {
  const data = locationData[params.slug];
  
  // If slug is not matched, fallback or 404 (for now just fallback)
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1>Location not found</h1>
      </div>
    );
  }

  // Fetch properties specifically for this location
  const allProperties = await propertyService.getAllProperties();
  const properties = allProperties.filter(p => p.location.includes(data.cityFormat.split(',')[0]));

  return (
    <div className="flex flex-col font-sans overflow-x-hidden min-h-screen pb-24 md:pb-0">
      
      {/* Dynamic SEO Hero */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img src={properties[0]?.images?.[0] || "/hero.png"} alt={data.h1} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 flex flex-col gap-6 text-white w-full">
          <div className="bg-[#ff385c]/20 border border-[#ff385c]/40 text-[#ff385c] px-4 py-2 rounded-full w-fit font-bold tracking-wider text-sm uppercase">
            LOCALIZED SHOWCASE
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-[1.1] max-w-3xl mix-blend-lighten tracking-tight">
            {data.h1}
          </h1>
          <p className="text-xl md:text-2xl font-medium text-gray-200 max-w-2xl leading-snug">
            {data.subtitle}
          </p>
        </div>
      </section>

      {/* Trust Strip - Same as Home to reinforce brand */}
      <section className="relative z-20 max-w-6xl mx-auto w-full px-6 -mt-16 mb-16">
        <div className="bg-white rounded-[2rem] shadow-2xl p-6 md:p-10 flex flex-nowrap md:flex-wrap overflow-x-auto snap-x snap-mandatory gap-8 md:gap-16 justify-start md:justify-around hide-scrollbar items-center border border-gray-100">
          {["High-Speed WiFi", "Daily Cleaning", "AC Rooms", "Fully-equipped Kitchen", "Zero Brokerage"].map(benefit => (
            <div key={benefit} className="flex flex-col items-center gap-3 shrink-0 snap-center">
              <div className="bg-[#008489]/10 p-3 rounded-full text-[#008489] text-2xl font-black shrink-0">
                ✓
              </div>
              <span className="font-bold text-gray-800 text-sm md:text-base text-center w-24 md:w-auto tracking-tight">{benefit}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Localized Properties List */}
      <section id="properties" className="max-w-7xl mx-auto px-6 w-full py-16 flex flex-col gap-12">
        <div className="flex flex-col gap-4 text-center items-center">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Available in {data.cityFormat.split(',')[0]}</h2>
          <p className="text-xl text-gray-500 font-medium max-w-2xl">
            Book a visit directly through our WhatsApp offline process with zero brokerage fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.length > 0 ? properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          )) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 text-gray-500 font-bold text-xl">
              No rooms currently available in this specific location. Please contact us for upcoming availability!
            </div>
          )}
        </div>
      </section>

      {/* Global CTA */}
      <CTAStickyBar propertyName={`General Inquiry for ${data.cityFormat}`} />
    </div>
  );
}
