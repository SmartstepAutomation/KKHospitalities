import Link from "next/link";
import { HiHome, HiPhone, HiMail, HiLocationMarker } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 px-6 md:px-10 py-10 md:py-16 text-gray-600">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        <div className="flex flex-col gap-4 md:gap-6">
          <Link href="/" className="flex items-center gap-2 text-2xl font-black text-[#ff385c]">
            <HiHome className="text-3xl" />
            <span>KK Hospitalities</span>
          </Link>
          <p className="leading-relaxed text-sm md:text-base">
            Premium co-living rentals for modern professionals. Elevate your stay with KK Hospitalities.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:gap-6">
          <h4 className="text-lg md:text-xl font-bold text-gray-900">Quick Links</h4>
          <ul className="flex flex-col gap-4 text-sm md:text-base">
            <li><Link href="/" className="hover:text-[#ff385c] transition-colors">Home</Link></li>
            <li><Link href="/#properties" className="hover:text-[#ff385c] transition-colors">Properties</Link></li>
            <li><Link href="/#how-it-works" className="hover:text-[#ff385c] transition-colors">How it Works</Link></li>
            <li><Link href="/#why-us" className="hover:text-[#ff385c] transition-colors">Why Choose Us</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-4 md:gap-6">
          <h4 className="text-lg md:text-xl font-bold text-gray-900">Locations</h4>
          <ul className="flex flex-col gap-4 text-sm md:text-base">
            <li><Link href="/#properties" className="hover:text-[#ff385c] transition-colors">HITEC City</Link></li>
            <li><Link href="/#properties" className="hover:text-[#ff385c] transition-colors">Gachibowli</Link></li>
            <li><Link href="/#properties" className="hover:text-[#ff385c] transition-colors">Madhapur</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-4 md:gap-6">
          <h4 className="text-lg md:text-xl font-bold text-gray-900">Contact Us</h4>
          <ul className="flex flex-col gap-4 text-sm md:text-base">
            <li className="flex items-center gap-3"><HiPhone className="text-xl text-[#008489]" /> +91 98765 43210</li>
            <li className="flex items-center gap-3"><HiMail className="text-xl text-[#008489]" /> info@kkhospitalities.com</li>
            <li className="flex items-center gap-3 items-start">
              <HiLocationMarker className="text-xl text-[#008489] shrink-0 mt-0.5" /> 
              <span>Madhapur, Hyderabad, <br />Telangana 500081</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 md:pt-16 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 mt-8 md:mt-16 text-xs md:text-sm">
        <p>© 2026 KK Hospitalities. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="hover:underline">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
