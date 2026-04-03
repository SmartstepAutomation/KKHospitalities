"use client";

import { useState } from "react";
import { HiUser, HiPhone, HiChatAlt2, HiCheckCircle } from "react-icons/hi";
import { leadService } from "@/services/leadService";

export default function LeadForm({ propertyId, propertyName }: { propertyId: string, propertyName: string }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await leadService.addLead({
        name,
        phone: phoneNumber,
        propertyId,
        propertyName,
        preferredDate,
      });
      setIsSubmitted(true);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#008489]/10 text-[#008489] p-8 rounded-3xl border border-[#008489]/20 flex flex-col items-center gap-4 text-center">
        <HiCheckCircle className="text-6xl" />
        <h3 className="text-2xl font-black">Lead Received!</h3>
        <p className="font-medium">Our property manager will call you back within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-6 sticky top-24">
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-black text-gray-900 leading-tight">Schedule a<br />Visit</h3>
        <p className="text-sm text-gray-500 font-medium">Pick a date and we'll call you to confirm the time.</p>
      </div>

      <div className="flex flex-col gap-2 relative">
        <label className="text-sm font-bold text-gray-700 uppercase tracking-widest pl-1">Full Name</label>
        <HiUser className="absolute left-4 top-[2.4rem] text-gray-400" />
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Jane Doe" 
          className="input-field pl-10"
        />
      </div>

      <div className="flex flex-col gap-2 relative">
        <label className="text-sm font-bold text-gray-700 uppercase tracking-widest pl-1">Phone Number</label>
        <HiPhone className="absolute left-4 top-[2.4rem] text-gray-400" />
        <input 
          type="tel" 
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          placeholder="+91 98765 43210" 
          className="input-field pl-10"
        />
      </div>

      <div className="flex flex-col gap-2 relative">
        <label className="text-sm font-bold text-gray-700 uppercase tracking-widest pl-1">Preferred Date</label>
        <HiChatAlt2 className="absolute left-4 top-[2.4rem] text-gray-400" />
        <input 
          type="date" 
          value={preferredDate}
          onChange={(e) => setPreferredDate(e.target.value)}
          required
          className="input-field pl-10"
        />
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="btn-primary w-full py-4 text-lg mt-2 shadow-xl shadow-[#ff385c]/20"
      >
        {isSubmitting ? "Scheduling..." : "Schedule Visit"}
      </button>

      <p className="text-xs text-center text-gray-400 px-4">
        By submitting, you agree to our Terms & Conditions and represent that you are interested in this property.
      </p>
    </form>
  );
}
