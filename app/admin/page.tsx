import { propertyService } from "@/services/propertyService";
import { leadService } from "@/services/leadService";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const properties = await propertyService.getAllProperties();
  const leads = await leadService.getAllLeads();
  const recentLeads = await leadService.getRecentLeads(5);

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Overview</h2>
        <p className="text-gray-500 font-medium">Welcome back. Here is what is happening with your properties.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <span className="text-8xl">🏢</span>
          </div>
          <span className="text-gray-500 font-bold uppercase tracking-widest text-sm relative z-10 w-fit line-clamp-1">Total Properties</span>
          <span className="text-5xl font-black text-gray-900 relative z-10">{properties.length}</span>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <span className="text-8xl">📞</span>
          </div>
          <span className="text-gray-500 font-bold uppercase tracking-widest text-sm relative z-10 w-fit line-clamp-1">Total Leads</span>
          <span className="text-5xl font-black text-[#008489] relative z-10">{leads.length}</span>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm flex flex-col w-full">
        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <h3 className="text-lg font-black text-gray-900">Recent Leads</h3>
          <a href="/admin/leads" className="text-sm font-bold text-[#008489] hover:text-[#006e72] transition-colors">View All &rarr;</a>
        </div>
        
        <div className="flex flex-col w-full">
          {recentLeads.length > 0 ? recentLeads.map((lead: any, i: number) => (
            <div key={lead.id || i} className="px-8 py-5 border-b border-gray-50 flex items-center justify-between hover:bg-gray-50 transition-colors w-full">
              <div className="flex flex-col">
                <span className="font-bold text-gray-900">{lead.name}</span>
                <span className="text-sm text-gray-500 font-medium">For: {lead.propertyName} • {lead.phone}</span>
              </div>
              <span className="text-xs font-bold text-gray-400">
                {lead.createdAt?.toDate ? new Date(lead.createdAt.toDate()).toLocaleDateString() : 'Just now'}
              </span>
            </div>
          )) : (
            <div className="px-8 py-10 text-center text-gray-500 font-medium w-full">
              No recent leads found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
