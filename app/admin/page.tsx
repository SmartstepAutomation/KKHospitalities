import { propertyService } from "@/services/propertyService";
import { leadService } from "@/services/leadService";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const properties = await propertyService.getAllProperties();
  const leads = await leadService.getAllLeads();
  const recentLeads = await leadService.getRecentLeads(5);

  // Group leads by day for the last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    return d;
  }).reverse();

  const chartData = last7Days.map(date => {
    const dayLeads = leads.filter(l => {
      const leadDate = l.createdAt?.toDate ? new Date(l.createdAt.toDate()) : new Date();
      return leadDate.toDateString() === date.toDateString();
    });
    return {
      label: date.toLocaleDateString([], { weekday: 'short' }),
      count: dayLeads.length
    };
  });

  const maxLeads = Math.max(...chartData.map(d => d.count), 5);

  return (
    <div className="flex flex-col gap-10 w-full animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-black text-gray-900 tracking-tight">Executive Overview</h2>
        <p className="text-gray-500 font-medium text-lg">Performance and operations monitoring hub.</p>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        <div className="group relative bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden transition-all hover:scale-[1.02]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 group-hover:bg-[#008489]/5 transition-colors"></div>
          <div className="relative z-10 flex flex-col gap-1">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Portfolio Size</span>
            <span className="text-6xl font-black text-gray-900 leading-none">{properties.length}</span>
            <span className="text-sm font-bold text-gray-500 mt-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              Live Properties
            </span>
          </div>
        </div>

        <div className="group relative bg-[#ff385c] p-8 rounded-[2.5rem] shadow-xl shadow-[#ff385c]/20 overflow-hidden transition-all hover:scale-[1.02]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative z-10 flex flex-col gap-1">
            <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] mb-2">Total Outreach</span>
            <span className="text-6xl font-black text-white leading-none">{leads.length}</span>
            <span className="text-sm font-bold text-white/80 mt-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              Inbound Leads
            </span>
          </div>
        </div>

        {/* Mini Analytics Chart Card */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 flex flex-col gap-6">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">7-Day Volume</span>
          <div className="flex items-end justify-between h-24 gap-3">
            {chartData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  className="w-full bg-[#008489]/10 group-hover:bg-[#008489] rounded-lg transition-all duration-500 relative"
                  style={{ height: `${(d.count / maxLeads) * 100}%`, minHeight: '4px' }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[10px] font-black text-[#008489] transition-opacity">
                    {d.count}
                  </div>
                </div>
                <span className="text-[10px] font-black text-gray-400 uppercase">{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 w-full">
        <div className="xl:col-span-2 bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-200/40 flex flex-col">
          <div className="px-10 py-8 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between">
            <h3 className="text-xl font-black text-gray-900">Priority Lead Stream</h3>
            <a href="/admin/leads" className="px-5 py-2 bg-white border border-gray-200 rounded-xl text-xs font-black uppercase tracking-wider text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
              View All Pipeline
            </a>
          </div>
          
          <div className="flex flex-col">
            {recentLeads.length > 0 ? recentLeads.map((lead: any, i: number) => (
              <div key={lead.id || i} className="px-10 py-6 border-b border-gray-50 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-[#008489]/10 rounded-2xl flex items-center justify-center text-xl font-black text-[#008489]">
                    {lead.name.charAt(0)}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-black text-gray-900 text-lg leading-tight">{lead.name}</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      Interested in {lead.propertyName || "General Inquiry"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-black text-gray-900">{lead.phone}</span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    {lead.createdAt?.toDate ? new Date(lead.createdAt.toDate()).toLocaleDateString([], { month: 'short', day: 'numeric' }) : 'Today'}
                  </span>
                </div>
              </div>
            )) : (
              <div className="px-10 py-12 text-center text-gray-400 font-bold uppercase tracking-widest text-sm">
                No recent activity
              </div>
            )}
          </div>
        </div>

        {/* Quick Tips / Sidebar */}
        <div className="flex flex-col gap-6">
          <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-20">
              <span className="text-6xl">🚀</span>
            </div>
            <h4 className="text-xl font-black mb-2">Pro Tip</h4>
            <p className="text-gray-400 font-medium text-sm leading-relaxed mb-6">
              Use the WhatsApp Reply feature in the leads inbox to reduce your follow-up time by up to 50%.
            </p>
            <a href="/admin/leads" className="block text-center py-4 bg-[#ff385c] rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#ff5a78] transition-colors">
              Check Pipeline
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
