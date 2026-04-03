"use client";

import { useState } from "react";
import { Property, RoomType } from "@/types/property";
import { HiPlus, HiTrash, HiUpload, HiCheckCircle } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { addPropertyAction, updatePropertyAction } from "@/app/actions/adminActions";
import { storageService } from "@/services/storageService";

export default function PropertyForm({ initialData }: { initialData?: Property }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Property>>(initialData || {
    name: "",
    location: "",
    address: "",
    description: "",
    images: [],
    amenities: [],
    featured: false,
    availabilityBadge: "",
    roomTypes: []
  });

  const [newAmenity, setNewAmenity] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    let res;
    if (initialData?.id) {
      res = await updatePropertyAction(initialData.id, formData);
    } else {
      res = await addPropertyAction(formData);
    }

    setLoading(false);
    if ((res as any).success) {
      alert(initialData ? "Property updated successfully!" : "Property created successfully!");
      router.push("/admin/properties");
    } else {
      alert("Failed to save property: " + (res as any).error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploadingImage(true);
    const newImages: string[] = [];
    
    for (let i = 0; i < files.length; i++) {
        const url = await storageService.uploadImage(files[i]);
        if (url) newImages.push(url);
    }
    
    if (newImages.length > 0) {
        setFormData(prev => ({
            ...prev,
            images: [...(prev.images || []), ...newImages]
        }));
    }
    setUploadingImage(false);
  };

  const addAmenity = () => {
    if (!newAmenity.trim()) return;
    setFormData(prev => ({ 
      ...prev, 
      amenities: [...(prev.amenities || []), newAmenity.trim()]
    }));
    setNewAmenity("");
  };

  const removeAmenity = (idx: number) => {
    setFormData(prev => {
      const arr = [...(prev.amenities || [])];
      arr.splice(idx, 1);
      return { ...prev, amenities: arr };
    });
  };

  const addRoomType = () => {
    const newRoom: RoomType = {
      propertyId: formData.id || "temp",
      type: "single",
      price: 15000,
      deposit: 30000,
      availability: 1,
      amenities: []
    };
    setFormData(prev => ({
      ...prev,
      roomTypes: [...(prev.roomTypes || []), newRoom]
    }));
  };

  const removeRoomType = (idx: number) => {
    setFormData(prev => {
      const arr = [...(prev.roomTypes || [])];
      arr.splice(idx, 1);
      return { ...prev, roomTypes: arr };
    });
  };

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-8 w-full max-w-4xl pb-20">
      
      {/* Basic Info */}
      <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col gap-6 w-full">
        <h3 className="text-xl font-black text-gray-900 border-b border-gray-100 pb-4">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-bold text-gray-700 text-sm">Property Name</label>
            <input 
              required
              value={formData.name || ""}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-[#008489]"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-bold text-gray-700 text-sm">Location Area (e.g. HITEC City)</label>
            <input 
              required
              value={formData.location || ""}
              onChange={e => setFormData({...formData, location: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-[#008489]"
            />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2 w-full">
            <label className="font-bold text-gray-700 text-sm">Full Address</label>
            <input 
              required
              value={formData.address || ""}
              onChange={e => setFormData({...formData, address: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-[#008489]"
            />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2 w-full">
            <label className="font-bold text-gray-700 text-sm">Description</label>
            <textarea 
              required rows={4}
              value={formData.description || ""}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-[#008489]"
            />
          </div>
        </div>

        {/* Amenities & Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full pt-4 border-t border-gray-50 mt-2">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-bold text-gray-700 text-sm">Amenities (Press Add)</label>
            <div className="flex items-center gap-2">
               <input 
                 value={newAmenity}
                 onChange={e => setNewAmenity(e.target.value)}
                 className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-[#008489]"
                 placeholder="e.g. WiFi, AC"
               />
               <button type="button" onClick={addAmenity} className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold">Add</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.amenities?.map((amenity, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                  {amenity} <button type="button" onClick={() => removeAmenity(idx)} className="text-red-500 hover:text-red-700"><HiTrash/></button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <label className="font-bold text-gray-700 text-sm flex items-center justify-between">
              Property Images
              {uploadingImage && <span className="text-[#008489] text-xs font-bold">Uploading...</span>}
            </label>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {formData.images?.map((url, idx) => (
                 <div key={idx} className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                    <img src={url} className="w-full h-full object-cover" alt="Property" />
                    <button type="button" 
                      onClick={() => {
                        const arr = [...(formData.images || [])];
                        arr.splice(idx, 1);
                        setFormData({...formData, images: arr});
                      }}
                      className="absolute top-2 right-2 bg-white/90 text-red-500 p-1.5 rounded-lg hover:bg-white shadow">
                      <HiTrash />
                    </button>
                 </div>
               ))}
               <label className="aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-[#008489] transition-colors gap-2 text-gray-400">
                  <HiUpload className="text-2xl" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#008489]">Upload</span>
                  <input type="file" multiple accept="image/*" className="hidden" disabled={uploadingImage} onChange={handleImageUpload} />
               </label>
            </div>
          </div>
        </div>
      </div>

      {/* Room Types */}
      <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col gap-6 w-full">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 w-full">
          <h3 className="text-xl font-black text-gray-900">Room Configurations</h3>
          <button type="button" onClick={addRoomType} className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-gray-200 shrink-0">
            <HiPlus /> Add Room
          </button>
        </div>

        <div className="flex flex-col gap-6 w-full">
          {formData.roomTypes?.map((room, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex flex-col gap-4 relative w-full">
              <button type="button" onClick={() => removeRoomType(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                <HiTrash className="text-xl" />
              </button>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pr-8 w-full">
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-xs text-gray-500 uppercase tracking-widest">Type</label>
                  <select 
                    value={room.type}
                    onChange={(e) => {
                      const arr = [...(formData.roomTypes || [])];
                      arr[idx].type = e.target.value as any;
                      setFormData({...formData, roomTypes: arr});
                    }}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-[#008489] text-sm font-bold"
                  >
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                    <option value="triple">Triple</option>
                    <option value="studio">Studio</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-xs text-gray-500 uppercase tracking-widest">Price / Mo (₹)</label>
                  <input type="number" 
                    value={room.price}
                    onChange={(e) => {
                      const arr = [...(formData.roomTypes || [])];
                      arr[idx].price = Number(e.target.value);
                      setFormData({...formData, roomTypes: arr});
                    }}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-[#008489] text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-xs text-gray-500 uppercase tracking-widest">Deposit (₹)</label>
                  <input type="number" 
                     value={room.deposit}
                     onChange={(e) => {
                       const arr = [...(formData.roomTypes || [])];
                       arr[idx].deposit = Number(e.target.value);
                       setFormData({...formData, roomTypes: arr});
                     }}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-[#008489] text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-xs text-gray-500 uppercase tracking-widest">Rooms Left</label>
                  <input type="number" 
                     value={room.availability}
                     onChange={(e) => {
                       const arr = [...(formData.roomTypes || [])];
                       arr[idx].availability = Number(e.target.value);
                       setFormData({...formData, roomTypes: arr});
                     }}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-[#008489] text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
          {(!formData.roomTypes || formData.roomTypes.length === 0) && (
            <p className="text-gray-400 text-sm font-medium italic">No room types added yet.</p>
          )}
        </div>
      </div>

      {/* Availability Status Config */}
      <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col gap-6 w-full">
         <h3 className="text-xl font-black text-gray-900 border-b border-gray-100 pb-4">Marketing Status</h3>
         <div className="flex flex-col gap-2 w-full max-w-sm">
            <label className="font-bold text-gray-700 text-sm">Availability Badge (Optional)</label>
            <input 
              value={formData.availabilityBadge || ""}
              onChange={e => setFormData({...formData, availabilityBadge: e.target.value})}
              placeholder="e.g. ONLY 2 ROOMS LEFT"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-[#008489]"
            />
            <span className="text-xs text-gray-500 font-medium">Leave blank for default "AVAILABLE" tag.</span>
          </div>
      </div>

      {/* Save Strip */}
      <div className="sticky bottom-6 z-50 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-gray-100 flex flex-col sm:flex-row items-center justify-between w-full gap-4">
        <span className="font-bold text-gray-500 ml-2 hidden sm:block">Ensure all required fields are filled</span>
        <button type="submit" disabled={loading} className="w-full sm:w-auto bg-[#ff385c] hover:bg-[#e03150] disabled:opacity-70 text-white px-8 py-4 sm:py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
          {loading ? "Saving..." : <><HiCheckCircle className="text-xl" /> Save Property</>}
        </button>
      </div>
    </form>
  );
}
