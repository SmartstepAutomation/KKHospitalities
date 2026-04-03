"use client";

import { useState } from "react";
import { Property } from "@/types/property";
import { updatePropertyAction } from "@/app/actions/adminActions";
import { HiPencil, HiCheckCircle } from "react-icons/hi";

export default function AdminClient({ initialProperties }: { initialProperties: Property[] }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [properties, setProperties] = useState(initialProperties);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Property>>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") setIsAuthenticated(true);
    else alert("Incorrect password");
  };

  const handleEditClick = (property: Property) => {
    setEditingId(property.id || null);
    setEditForm(property);
  };

  const handleSave = async () => {
    if (!editingId) return;
    setIsSaving(true);
    
    const res = await updatePropertyAction(editingId, editForm);
    if (res.success) {
      setProperties(prev => prev.map(p => p.id === editingId ? { ...p, ...editForm } as Property : p));
      setEditingId(null);
    } else {
      alert("Failed to save. Check console for details.");
    }
    
    setIsSaving(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-gray-100 max-w-sm w-full flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Admin Login</h2>
            <p className="text-gray-500 font-medium mt-1">Enter password to manage properties</p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008489] font-medium"
            />
            <button 
              type="submit"
              className="w-full bg-[#ff385c] text-white py-3 rounded-xl font-bold hover:bg-[#e03150] transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Properties Inventory</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {properties.map(property => (
          <div key={property.id} className="bg-white border border-gray-200 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row gap-6 shadow-sm">
            <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 relative">
              <img src={property.images?.[0]} className="w-full h-full object-cover" alt="Property" />
              {property.availabilityBadge && (
                <div className="absolute top-2 left-2 bg-[#ff385c] text-white px-2 py-1 flex items-center text-xs font-bold rounded-lg shadow-sm">
                  {property.availabilityBadge}
                </div>
              )}
            </div>
            
            <div className="flex-1 flex flex-col justify-center gap-2">
              <h3 className="text-xl font-black text-gray-900">{property.name}</h3>
              <p className="text-gray-500 font-medium text-sm">{property.address}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-[#008489]/10 text-[#008489] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {property.featured ? 'Featured' : 'Standard'}
                </span>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {property.roomTypes?.length || 0} Room Types
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end md:w-32">
              <button 
                onClick={() => handleEditClick(property)}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-xl font-bold transition-colors"
              >
                <HiPencil /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-end md:items-center">
          <div className="bg-white w-full max-w-2xl md:rounded-[2rem] rounded-t-[2rem] h-[85vh] md:h-auto max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Edit Property</h3>
              <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-gray-900 p-2">✕</button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-bold text-gray-700 text-sm">Property Name</label>
                <input 
                  type="text" 
                  value={editForm.name || ""} 
                  onChange={e => setEditForm({...editForm, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-[#008489] font-medium"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-gray-700 text-sm">Availability Badge (Urgency Banner)</label>
                <input 
                  type="text" 
                  value={editForm.availabilityBadge || ""} 
                  onChange={e => setEditForm({...editForm, availabilityBadge: e.target.value})}
                  placeholder="e.g. Only 1 room left"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-[#008489] font-medium"
                />
                <p className="text-gray-400 text-xs mt-1">Leaves empty to hide badge</p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-gray-700 text-sm">Description</label>
                <textarea 
                  rows={4}
                  value={editForm.description || ""} 
                  onChange={e => setEditForm({...editForm, description: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008489] font-medium"
                />
              </div>

            </div>

            <div className="p-6 border-t border-gray-100 shrink-0 flex gap-4 bg-gray-50/50">
              <button 
                onClick={() => setEditingId(null)}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex-[2] py-3 px-4 flex items-center justify-center gap-2 bg-[#ff385c] hover:bg-[#e03150] text-white rounded-xl font-bold transition-colors disabled:opacity-70"
              >
                {isSaving ? "Saving..." : <><HiCheckCircle /> Save Changes</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
