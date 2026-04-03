"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { HiMenuAlt3, HiOutlineX, HiHome } from "react-icons/hi";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-black text-[#ff385c]">
          <HiHome className="text-3xl" />
          <span className="tracking-tighter">KK Hospitalities</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-semibold text-gray-700">
          <Link href="/" className="hover:text-[#ff385c] transition-colors">Home</Link>
          <Link href="/#properties" className="hover:text-[#ff385c] transition-colors">Properties</Link>
          <Link href="/#why-us" className="hover:text-[#ff385c] transition-colors">Why Choose Us</Link>
          <Link href="/#how-it-works" className="hover:text-[#ff385c] transition-colors">How it Works</Link>
          <Link href="/#contact" className="bg-[#ff385c] text-white px-5 py-2.5 rounded-full hover:bg-[#e31c5f] shadow-md transition-all">
            Book Visit
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-3xl text-gray-900"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <HiOutlineX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute top-0 left-0 right-0 bg-white shadow-2xl transition-all duration-300 origin-top transform",
          isMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col p-8 gap-6 text-xl font-bold text-gray-800">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/#properties" onClick={() => setIsMenuOpen(false)}>Properties</Link>
          <Link href="/#why-us" onClick={() => setIsMenuOpen(false)}>Why Choose Us</Link>
          <Link href="/#how-it-works" onClick={() => setIsMenuOpen(false)}>How it Works</Link>
          <Link 
            href="/#contact" 
            className="bg-[#ff385c] text-white p-4 rounded-2xl text-center shadow-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Book Visit
          </Link>
        </div>
      </div>
    </header>
  );
}
