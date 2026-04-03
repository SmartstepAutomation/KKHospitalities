"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp, FaChevronUp } from "react-icons/fa";

export default function FloatingActions() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const whatsappUrl = "https://wa.me/919876543210?text=Hi,%20I'm%20interested%20in%20KK%20Hospitalities%20co-living%20in%20Hyderabad.";

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-4 items-end">
      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`bg-white text-gray-900 w-12 h-12 rounded-full shadow-2xl flex items-center justify-center border border-gray-100 hover:bg-gray-50 transition-all duration-300 transform ${
          showScroll ? "scale-100 translate-y-0 opacity-100" : "scale-0 translate-y-10 opacity-0 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <FaChevronUp className="text-xl" />
      </button>

      {/* Floating WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#1ebd5a] transition-all duration-300 transform hover:scale-110 active:scale-95 group relative"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp className="text-3xl" />
        {/* Tooltip for desktop */}
        <span className="absolute right-16 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">
          Chat with us
        </span>
      </a>
    </div>
  );
}
