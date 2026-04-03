"use client";

import { HiStar, HiCheckCircle, HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "Arjun Reddy",
    role: "Software Engineer, Microsoft",
    content: "Moving to Hyderabad was stressful until I found KK. The Gachibowli setup is incredible—fast WiFi, always clean, and great flatmates.",
    initial: "A",
    color: "bg-teal-500",
    location: "Gachibowli"
  },
  {
    id: 2,
    name: "Neha Sharma",
    role: "Product Manager, Swiggy",
    content: "I checked out 5 different PGs before choosing this. There is simply no comparison. This feels like a premium hotel but with the comfort of home.",
    initial: "N",
    color: "bg-[#ff385c]",
    location: "HITEC City"
  },
  {
    id: 3,
    name: "Siddharth Verma",
    role: "Digital Nomad",
    content: "The co-working space inside the property is a game changer. I've never had such stable internet in a rental before. Zero brokerage was a huge plus.",
    initial: "S",
    color: "bg-purple-600",
    location: "Madhapur"
  },
  {
    id: 4,
    name: "Priya Das",
    role: "Analyst, Deloitte",
    content: "Safe, secure, and very well-maintained. The daily cleaning service is a lifesaver for someone with my schedule. Highly recommended!",
    initial: "P",
    color: "bg-orange-500",
    location: "Financial District"
  },
  {
    id: 5,
    name: "Vikram Malhotra",
    role: "Startup Founder",
    content: "Perfect location. I'm literally 5 minutes away from my office. The community events they organize are a great way to network.",
    initial: "V",
    color: "bg-blue-600",
    location: "Kondapur"
  }
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gray-900 py-12 md:py-20 text-white overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#ff385c]/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#008489]/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center md:text-left mb-12 md:mb-16">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 w-fit mx-auto md:mx-0 mb-6">
             <div className="flex text-yellow-400 text-sm">
               <HiStar /><HiStar /><HiStar /><HiStar /><HiStar />
             </div>
             <span className="text-sm font-black tracking-widest uppercase text-white/90">100+ Happy Tenants</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-sm max-w-4xl">
            Loved by tech pros.
          </h2>
        </div>

        {/* Slider Container with Floating Nav */}
        <div className="relative group/slider">
          {/* Desktop Nav - Floating Overlays */}
          <button 
            onClick={() => scroll('left')}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-30 w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 items-center justify-center hover:bg-[#ff385c] hover:border-[#ff385c] transition-all text-2xl shadow-2xl opacity-0 group-hover/slider:opacity-100 -translate-x-4 group-hover/slider:translate-x-0"
          >
            <HiChevronLeft />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-30 w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 items-center justify-center hover:bg-[#ff385c] hover:border-[#ff385c] transition-all text-2xl shadow-2xl opacity-0 group-hover/slider:opacity-100 translate-x-4 group-hover/slider:translate-x-0"
          >
            <HiChevronRight />
          </button>

          {/* Scrollable Container */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-8 pb-8 [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((item) => (
              <div 
                key={item.id}
                className="flex-none w-[65%] md:w-[340px] snap-center"
              >
                <div className="h-full bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[2.5rem] flex flex-col gap-6 md:gap-8 hover:bg-white/10 transition-all duration-500 group">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-yellow-400 text-xl">
                      <HiStar /><HiStar /><HiStar /><HiStar /><HiStar />
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                      <HiCheckCircle /> Verified Resident
                    </div>
                  </div>

                  <blockquote className="text-lg md:text-xl font-medium leading-relaxed italic text-gray-100 italic relative">
                    <span className="absolute -top-4 -left-2 text-6xl text-[#ff385c]/20 font-serif leading-none">“</span>
                    "{item.content}"
                  </blockquote>

                  <div className="mt-auto flex items-center gap-4 border-t border-white/10 pt-6">
                    <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}>
                      {item.initial}
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-black text-lg text-white">{item.name}</h4>
                      <p className="text-sm text-gray-400 font-bold tracking-tight">{item.role}</p>
                      <div className="flex items-center gap-1 text-[10px] text-[#008489] font-black uppercase tracking-widest mt-1">
                         Resident at {item.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Indicator */}
        <div className="flex md:hidden justify-center gap-2 mt-4">
           {testimonials.map((_, idx) => (
             <div key={idx} className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
           ))}
        </div>
      </div>
    </section>
  );
}
