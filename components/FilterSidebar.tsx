"use client";

import { useState } from "react";
import { HiFilter, HiX } from "react-icons/hi";

export default function FilterSidebar({ onFilterChange }: { onFilterChange: (filters: any) => void }) {
  const [location, setLocation] = useState("all");
  const [priceRange, setPriceRange] = useState(30000);
  const [roomType, setRoomType] = useState("all");

  const handleApply = () => {
    onFilterChange({ location, priceRange, roomType });
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-24 flex flex-col gap-8 h-fit">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
          <HiFilter className="text-[#ff385c]" /> Filters
        </h3>
        <button 
          onClick={() => { setLocation("all"); setRoomType("all"); setPriceRange(30000); }}
          className="text-sm font-bold text-gray-400 hover:text-[#ff385c]"
        >
          Reset
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <label className="font-bold text-gray-700 text-sm uppercase tracking-wider">Location</label>
        <select 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="input-field py-2"
        >
          <option value="all">All Locations</option>
          <option value="Koramangala, Bangalore">Koramangala, BLR</option>
          <option value="Indiranagar, Bangalore">Indiranagar, BLR</option>
          <option value="Hinjewadi, Pune">Hinjewadi, Pune</option>
          <option value="Anjuna, Goa">Anjuna, Goa</option>
        </select>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between font-bold text-gray-700 text-sm uppercase tracking-wider">
          <span>Max Price</span>
          <span className="text-[#ff385c]">₹{priceRange.toLocaleString()}</span>
        </div>
        <input 
          type="range" 
          min="5000" 
          max="50000" 
          step="1000" 
          value={priceRange}
          onChange={(e) => setPriceRange(parseInt(e.target.value))}
          className="w-full accent-[#ff385c]"
        />
      </div>

      <div className="flex flex-col gap-4">
        <label className="font-bold text-gray-700 text-sm uppercase tracking-wider">Room Type</label>
        <div className="grid grid-cols-1 gap-2">
          {["all", "single", "double", "studio"].map((type) => (
            <button
              key={type}
              onClick={() => setRoomType(type)}
              className={`text-left px-4 py-2 rounded-xl border text-sm font-bold transition-all ${
                roomType === type 
                  ? "bg-[#ff385c] text-white border-[#ff385c]" 
                  : "bg-white text-gray-600 border-gray-100 hover:border-gray-300"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={handleApply}
        className="btn-primary mt-4 w-full shadow-lg shadow-[#ff385c]/20"
      >
        Apply Selection
      </button>
    </div>
  );
}
