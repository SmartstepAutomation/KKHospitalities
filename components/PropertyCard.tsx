import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { HiLocationMarker, HiPhone } from "react-icons/hi";
import { Property } from "@/types/property";

export default function PropertyCard({ property }: { property: Property }) {
  // Use first image or a placeholder
  const imageUrl = property.images?.[0] || "/placeholder-room.jpg";
  const whatsappUrl = `https://wa.me/919052909771?text=Hi,%20I'm%20interested%20in%20your%20${encodeURIComponent(property.name)}%20in%20Hyderabad.`;
  
  return (
    <div className="card-premium h-full group flex flex-col">
      <Link href={`/property/${property.id}`} className="block relative aspect-[4/3] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-[#ff385c]">
          {property.location.split(",")[1]?.trim() || property.location}
        </div>
        {property.featured && (
          <div className="absolute top-4 right-4 bg-[#008489] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-md">
            Featured
          </div>
        )}
        {property.availabilityBadge && (
          <div className="absolute bottom-4 left-4 bg-[#ff385c] text-white px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg flex items-center gap-1 animate-pulse">
            🔥 {property.availabilityBadge}
          </div>
        )}
      </Link>

      <div className="p-4 md:p-6 flex flex-col gap-2 md:gap-4 flex-grow">
        <div className="flex items-start justify-between gap-4">
          <Link href={`/property/${property.id}`}>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-[1.2] group-hover:text-[#ff385c] transition-all">
              {property.name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
          <HiLocationMarker className="shrink-0 text-[#ff385c]" />
          <span className="truncate font-medium">{property.address}</span>
        </div>

        <div className="mt-2 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-wider">Starts at</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg md:text-xl font-black text-gray-900">₹15,000</span>
              <span className="text-xs md:text-sm font-normal text-gray-500">/mo</span>
            </div>
          </div>
        </div>
        
        {/* Direct Conversion Buttons */}
        <div className="flex gap-2 mt-auto pt-4">
          <Link 
            href={`/property/${property.id}`}
            className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-bold flex items-center justify-center hover:bg-black transition-all text-sm md:text-base shadow-lg hover:shadow-xl translate-y-0 hover:-translate-y-0.5 active:translate-y-0"
          >
            Explore Rooms
          </Link>
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 flex-shrink-0 bg-[#25D366] text-white py-3 rounded-xl flex items-center justify-center hover:bg-[#1ebd5a] transition-all font-bold shadow-lg hover:shadow-xl translate-y-0 hover:-translate-y-0.5 active:translate-y-0"
          >
            <FaWhatsapp className="text-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
}
