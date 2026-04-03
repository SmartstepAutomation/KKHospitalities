"use client";

import { useState } from "react";
import { HiXCircle, HiCheckCircle, HiArrowRight } from "react-icons/hi";

const comparisons = [
  {
    id: "traditional",
    title: "Traditional PGs",
    isNegative: true,
    points: [
      "Cramped spaces",
      "Poor maintenance & cleaning",
      "Unhealthy, repetitive food",
      "Unresponsive owners"
    ]
  },
  {
    id: "kk",
    title: "KK Hospitalities",
    isNegative: false,
    isPreferred: true,
    badge: "The Smart Choice",
    points: [
      "Spacious, aesthetic interiors",
      "Professional daily cleaning",
      "Fully-equipped modern kitchens",
      "Community of IT professionals",
      "24/7 dedicated support"
    ]
  },
  {
    id: "flat",
    title: "Renting a Flat",
    isNegative: true,
    points: [
      "High brokerage & deposit",
      "Buying furniture & appliances",
      "Setting up WiFi, gas, maids",
      "Dealing with flatmates"
    ]
  }
];

export default function WhyChooseUs() {
  const [activeTab, setActiveTab] = useState("kk");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="why-us" className="bg-gray-50 py-12 md:py-20 scroll-mt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12 md:gap-20">
        <div className="text-center flex flex-col gap-4 max-w-2xl mx-auto">
          <span className="text-[#ff385c] font-black uppercase tracking-widest text-xs bg-[#ff385c]/10 px-4 py-1.5 rounded-full w-fit mx-auto">
            Comparison
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Why Choose KK?</h2>
          <p className="text-lg md:text-xl text-gray-500 font-medium">Stop settling for average PGs or dealing with flatmate drama.</p>
        </div>

        {/* Mobile Tabs */}
        <div className="flex md:hidden bg-gray-100 p-1 rounded-2xl mb-8">
          {comparisons.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === item.id 
                  ? "bg-white text-gray-900 shadow-md" 
                  : "text-gray-500"
              }`}
            >
              {item.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {comparisons.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`
                group relative bg-white p-8 md:p-10 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col
                ${activeTab === item.id ? "flex" : "hidden md:flex"}
                ${item.isPreferred 
                  ? "border-[#ff385c] shadow-2xl scale-100 md:scale-105 z-20 md:-translate-y-4" 
                  : "border-gray-100 shadow-sm md:opacity-60 md:hover:opacity-100 hover:border-gray-200 z-10"}
                ${hoveredId && hoveredId !== item.id ? "md:blur-[2px] md:scale-95 md:opacity-40" : ""}
                ${hoveredId === item.id ? "md:scale-105 md:opacity-100 md:z-30 md:shadow-2xl" : ""}
              `}
            >
              {item.isPreferred && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ff385c] text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase shadow-lg shadow-[#ff385c]/30 animate-pulse">
                  {item.badge}
                </div>
              )}

              <div className="mb-8 md:mb-10 border-b border-gray-100 pb-6">
                <h3 className={`text-xl md:text-2xl font-black ${item.isPreferred ? "text-gray-900" : "text-gray-400"}`}>
                  {item.title}
                </h3>
              </div>

              <ul className="flex flex-col gap-4 flex-grow">
                {item.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    {item.isNegative ? (
                      <HiXCircle className="text-red-400 text-2xl shrink-0 mt-0.5" />
                    ) : (
                      <HiCheckCircle className="text-emerald-500 text-2xl shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm md:text-base font-bold tracking-tight leading-snug ${item.isPreferred ? "text-gray-800" : "text-gray-400"}`}>
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              {item.isPreferred && (
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <a href="#contact" className="flex items-center justify-center gap-2 text-[#ff385c] font-black text-sm uppercase tracking-widest hover:gap-4 transition-all">
                    Choose Excellence <HiArrowRight />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
