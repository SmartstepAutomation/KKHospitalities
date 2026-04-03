"use client";

import { HiPhone, HiChatAlt2, HiCalendar } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

export default function CTAStickyBar({ propertyName }: { propertyName: string }) {
  const whatsappUrl = `https://wa.me/919876543210?text=Hi,%20I'm%20interested%20in%20your%20${encodeURIComponent(propertyName)}%20in%20Hyderabad.`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/90 backdrop-blur-md border-t border-gray-100 p-4 shadow-2xl flex items-center justify-between gap-4">
      <div className="flex flex-col">
        <span className="text-2xl font-black text-gray-900 leading-tight">₹15,000</span>
        <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Starts from</span>
      </div>

      <div className="flex items-center gap-3">
        <a 
          href="tel:+919876543210" 
          className="w-14 h-14 bg-gray-100 text-gray-700 rounded-2xl flex items-center justify-center text-2xl active:scale-95 transition-all"
        >
          <HiPhone />
        </a>
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white px-6 h-14 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-green-200 active:scale-95 transition-all"
        >
          <FaWhatsapp className="text-2xl" /> WhatsApp
        </a>
      </div>
    </div>
  );
}
