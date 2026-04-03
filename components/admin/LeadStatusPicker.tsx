"use client";

import { useState } from "react";
import { leadService } from "@/services/leadService";

interface LeadStatusPickerProps {
  leadId: string;
  initialStatus?: string;
  onUpdate?: (newStatus: string) => void;
}

const STATUS_OPTS = [
  { value: "new", label: "New", bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
  { value: "contacted", label: "Contacted", bg: "bg-purple-100", text: "text-purple-700", dot: "bg-purple-500" },
  { value: "booked", label: "Booked", bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  { value: "lost", label: "Lost", bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-500" },
];

export default function LeadStatusPicker({ leadId, initialStatus = "new", onUpdate }: LeadStatusPickerProps) {
  const [status, setStatus] = useState(initialStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const currentOpt = STATUS_OPTS.find(opt => opt.value === status) || STATUS_OPTS[0];

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setIsUpdating(true);
    
    try {
      const success = await leadService.updateLeadStatus(leadId, newStatus);
      if (success) {
        setStatus(newStatus);
        if (onUpdate) onUpdate(newStatus);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="relative inline-flex items-center group">
      <div className={`
        flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all
        ${currentOpt.bg} ${currentOpt.text}
        ${isUpdating ? "opacity-50" : "opacity-100"}
      `}>
        <span className={`w-2 h-2 rounded-full ${currentOpt.dot} animate-pulse`}></span>
        {currentOpt.label}
        
        <select 
          value={status}
          onChange={handleStatusChange}
          disabled={isUpdating}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        >
          {STATUS_OPTS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
