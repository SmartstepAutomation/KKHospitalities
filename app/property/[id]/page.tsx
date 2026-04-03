import React from 'react';
import { HiLocationMarker, HiCheckCircle, HiHome, HiStar, HiDesktopComputer, HiWifi, HiLightningBolt, HiPhone } from "react-icons/hi";
import { FaWind, FaBroom, FaCar, FaWhatsapp } from "react-icons/fa";
import LeadForm from "@/components/LeadForm";
import CTAStickyBar from "@/components/CTAStickyBar";
import { propertyService } from "@/services/propertyService";
import { Property } from "@/types/property";

// Fallback for demo
const mockProperty: Property = {
  id: "1",
  name: "Luxury Studio in Koramangala",
  location: "Koramangala, Bangalore",
  address: "80 Feet Rd, 4th Block, Bangalore",
  description: "Experience the pinnacle of co-living in the heart of Bangalore's most vibrant neighborhood. Our Koramangala studio offers a perfect blend of privacy and community. Fully-furnished with ergonomic furniture, high-speed WiFi, and 24/7 security. Whether you're a digital nomad or a corporate professional, this is the perfect space for you.",
  images: ["/hero.png", "/room1.png", "/room2.png"],
  amenities: ["High-speed WiFi", "Air Conditioning", "Professional Cleaning", "Power Backup", "Gym Access", "Laundry"],
  featured: true,
  createdAt: new Date().toISOString(),
  roomTypes: [
    { propertyId: "1", type: "single", price: 15000, deposit: 30000, availability: 2, amenities: [] },
    { propertyId: "1", type: "double", price: 9000, deposit: 18000, availability: 4, amenities: [] },
    { propertyId: "1", type: "studio", price: 25000, deposit: 50000, availability: 1, amenities: [] },
  ]
};

const amenityIcons: Record<string, React.ReactNode> = {
  "WiFi": <HiWifi />,
  "High-speed WiFi": <HiWifi />,
  "AC": <FaWind />,
  "Air Conditioning": <FaWind />,
  "Cleaning": <FaBroom />,
  "Professional Cleaning": <FaBroom />,
  "Power Backup": <HiLightningBolt />,
  "Gym Access": <HiCheckCircle />,
  "Laundry": <HiHome />,
  "Parking": <FaCar />,
};

export default async function PropertyDetail({ params }: { params: { id: string } }) {
  let property: Property | null = null;
  try {
    property = await propertyService.getPropertyDetail(params.id);
    if (!property) property = mockProperty; // Fallback for demo
  } catch (e) {
    property = mockProperty;
  }

  if (!property) return <div>Property not found</div>;

  const whatsappUrl = `https://wa.me/919052909771?text=Hi,%20I'm%20interested%20in%20your%20${encodeURIComponent(property.name)}%20in%20Hyderabad.`;

  return (
    <div className="flex flex-col pb-0">
      {/* Image Gallery */}
      <section className="w-full max-w-7xl mx-auto">
        {/* Mobile Gallery (Horizontal Scroll) */}
        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 w-full h-[300px] pb-4 [&::-webkit-scrollbar]:hidden">
          {property.images?.map((img, idx) => (
            <div key={idx} className="flex-none w-[85%] h-full relative rounded-3xl overflow-hidden shadow-lg snap-center">
              <img src={img} className="w-full h-full object-cover" alt={`${property.name} ${idx + 1}`} />
              <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-bold tracking-widest backdrop-blur-md">
                {idx + 1} / {property.images?.length || 1}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Gallery (Asymmetrical Grid) */}
        <div className="hidden md:grid grid-cols-4 gap-4 px-6 w-full">
          <div className="col-span-2 relative rounded-3xl overflow-hidden shadow-lg h-full">
            <img src={property.images?.[0]} className="w-full h-full object-cover" alt={property.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          <div className="flex flex-col gap-4 h-full">
            <img src={property.images?.[1] || property.images?.[0]} className="h-1/2 w-full object-cover rounded-3xl shadow-lg" alt="Gallery 2" />
            <img src={property.images?.[2] || property.images?.[0]} className="h-1/2 w-full object-cover rounded-3xl shadow-lg" alt="Gallery 3" />
          </div>
          <div className="relative h-full rounded-3xl overflow-hidden shadow-lg group cursor-pointer">
            <img src={property.images?.[0]} className="w-full h-full object-cover blur-sm group-hover:blur-none transition-all" alt="View All" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xl font-black group-hover:scale-110 transition-transform">
              View All Photos
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 w-full mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
        <div className="md:col-span-8 flex flex-col gap-8 md:gap-10">
          {/* Header Info */}
          <div className="flex flex-col gap-4 border-b border-gray-100 pb-4 md:pb-6">
            <div className="flex items-center gap-2">
              <span className="bg-[#ff385c]/10 text-[#ff385c] px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-widest">
                {property.location}
              </span>
              <div className="flex items-center gap-1 text-[#008489] font-bold text-sm">
                <HiStar /> 4.9 · 12 Reviews
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-5xl font-black text-gray-900 tracking-tight">{property.name}</h1>
              {property.availabilityBadge && (
                <div className="bg-[#ff385c]/10 text-[#ff385c] px-4 py-2 rounded-xl text-sm font-black uppercase tracking-widest w-fit flex items-center gap-2 border border-[#ff385c]/20">
                  🔥 {property.availabilityBadge}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-2 text-xl text-gray-500 font-medium italic">
                <HiLocationMarker /> {property.address}
              </p>
              
              {/* Micro-Location Advantage */}
              <div className="flex items-center gap-2 bg-blue-50/50 text-blue-700 w-fit px-4 py-2 rounded-xl mt-2 border border-blue-100 font-bold text-sm shadow-sm">
                📍 {
                  property.location?.toLowerCase().includes('hitec') ? '2 mins from major tech parks like Mindspace & Cyber Towers' :
                  property.location?.toLowerCase().includes('gachibowli') ? 'Extremely close to DLF Cyber City and leading IT campuses' :
                  property.location?.toLowerCase().includes('madhapur') ? 'Walking distance to key corporate offices and Inorbit Mall' :
                  'Premium neighborhood with top connectivity'
                }
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-6">
            <h3 className="text-3xl font-black text-gray-900">About this space</h3>
            <p className="text-lg text-gray-600 leading-relaxed font-medium">
              {property.description}
            </p>
          </div>

          {/* Pricing / Room Types */}
          <div className="flex flex-col gap-4 md:gap-6">
            <h3 className="text-2xl md:text-3xl font-black text-gray-900">Choose your share</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {property.roomTypes?.map((room, idx) => (
                <div key={idx} className="border-2 border-gray-100 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] flex flex-col gap-6 hover:border-[#ff385c] transition-all group shadow-sm hover:shadow-xl">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs md:text-sm font-black uppercase tracking-widest text-[#ff385c]">
                      {room.type}
                    </span>
                    <h4 className="text-3xl font-black text-gray-900">₹{room.price.toLocaleString()}</h4>
                    <span className="text-gray-500 font-bold">/ Month</span>
                  </div>
                  <ul className="flex flex-col gap-4 border-t border-gray-100 pt-6">
                    <li className="flex items-center gap-2 text-gray-700 font-semibold italic text-sm">
                      <HiCheckCircle className="text-[#008489]" /> ₹{room.deposit.toLocaleString()} Deposit
                    </li>
                    <li className="flex items-center gap-2 text-gray-700 font-semibold italic text-sm">
                      <HiCheckCircle className="text-[#008489]" /> {room.availability} rooms left
                    </li>
                  </ul>
                  <div className="flex gap-2">
                    <a 
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#25D366] text-white p-4 rounded-2xl font-bold hover:bg-[#1ebd5a] transition-all flex items-center justify-center gap-2"
                    >
                      <FaWhatsapp className="text-xl" /> WhatsApp
                    </a>
                    <a 
                      href="tel:+919052909771"
                      className="w-14 bg-gray-100 text-gray-700 p-4 rounded-2xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center"
                    >
                      <HiPhone className="text-xl" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-col gap-6 bg-gray-50 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem]">
            <h3 className="text-2xl md:text-3xl font-black text-gray-900">What this place offers</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {property.amenities.map((amenity, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white text-[#008489] rounded-2xl shadow-sm flex items-center justify-center text-2xl md:text-3xl">
                    {amenityIcons[amenity] || <HiCheckCircle />}
                  </div>
                  <span className="font-bold text-gray-800 tracking-tight">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location Advantage */}
          {property.locationAdvantages && property.locationAdvantages.length > 0 && (
            <div className="flex flex-col gap-6">
              <h3 className="text-3xl font-black text-gray-900">Why this location?</h3>
              <div className="bg-[#008489]/5 p-8 rounded-[2rem] border border-[#008489]/20">
                <ul className="flex flex-col gap-4">
                  {property.locationAdvantages.map((advantage, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-lg text-gray-800 font-bold">
                      <HiCheckCircle className="text-[#008489] text-2xl shrink-0" />
                      {advantage}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Location Map */}
          <div className="flex flex-col gap-6">
            <h3 className="text-3xl font-black text-gray-900">Location</h3>
            <p className="text-lg text-gray-600 font-medium">{property.address}</p>
            <div className="w-full h-[400px] rounded-[3rem] overflow-hidden border border-gray-100 shadow-sm relative filter brightness-[0.95]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121825.86469601344!2d78.36199415!3d17.4429944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93b2a2656365%3A0x6bba8d7c49aeab8f!2sHITEC%20City%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1711234567890!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-80 mix-blend-multiply"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Sidebar Sticky Form */}
        <div className="md:col-span-4 relative h-full">
          <div className="sticky top-24 flex flex-col gap-6">
            <LeadForm propertyId={property.id || "1"} propertyName={property.name} />
            <div className="bg-[#ff385c]/10 rounded-3xl p-6 border border-[#ff385c]/20 flex flex-col gap-4 text-center">
              <h4 className="font-black text-[#ff385c]">Need instant answers?</h4>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white p-4 rounded-xl font-bold hover:bg-[#1ebd5a] transition-all flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="text-xl" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <CTAStickyBar propertyName={property.name} />

      {/* Final Spacer */}
      <div className="h-24 md:hidden"></div>
    </div>
  );
}
