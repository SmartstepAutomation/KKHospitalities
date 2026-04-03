import { propertyService } from "@/services/propertyService";
import Link from "next/link";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi";

export const dynamic = "force-dynamic";

export default async function AdminPropertiesList() {
  const properties = await propertyService.getAllProperties();

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex items-center justify-between w-full">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Properties</h2>
          <p className="text-gray-500 font-medium mt-1">Manage your co-living inventory</p>
        </div>
        <Link 
          href="/admin/properties/new"
          className="bg-[#008489] text-white px-5 py-3 rounded-xl font-bold hover:bg-[#006e72] transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap shrink-0"
        >
          <HiPlus className="text-xl" /> <span className="hidden md:inline">Add Property</span>
        </Link>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-bold text-gray-400 text-xs tracking-widest uppercase">Property Name</th>
                <th className="px-6 py-4 font-bold text-gray-400 text-xs tracking-widest uppercase">Location</th>
                <th className="px-6 py-4 font-bold text-gray-400 text-xs tracking-widest uppercase">Status</th>
                <th className="px-6 py-4 font-bold text-gray-400 text-xs tracking-widest uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {properties.length > 0 ? properties.map(p => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                        {p.images && p.images[0] && <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 line-clamp-1">{p.name}</span>
                        <span className="text-xs text-gray-500 font-bold bg-gray-100 px-2 py-0.5 rounded w-fit mt-1">
                          {p.roomTypes?.length || 0} ROOM TYPES
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">
                    <div className="line-clamp-1">{p.location}</div>
                  </td>
                  <td className="px-6 py-4">
                    {p.availabilityBadge ? (
                      <span className="bg-[#ff385c]/10 text-[#ff385c] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex whitespace-nowrap">
                        {p.availabilityBadge}
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex whitespace-nowrap">
                        Available
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/admin/properties/${p.id}`}
                        className="p-2 text-gray-400 hover:text-[#008489] hover:bg-[#008489]/10 rounded-lg transition-colors flex items-center justify-center shrink-0"
                      >
                        <HiPencil className="text-xl" />
                      </Link>
                      <button 
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center shrink-0"
                      >
                        <HiTrash className="text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-medium">
                    No properties currently active. Add one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
