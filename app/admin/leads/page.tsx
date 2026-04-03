import { leadService } from "@/services/leadService";

export const dynamic = "force-dynamic";

export default async function AdminLeadsList() {
  const leads = await leadService.getAllLeads();

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Leads Inbox</h2>
        <p className="text-gray-500 font-medium mt-1">Review inquiries generated from the website</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-bold text-gray-400 text-xs tracking-widest uppercase">Date</th>
                <th className="px-6 py-4 font-bold text-gray-400 text-xs tracking-widest uppercase">Lead Details</th>
                <th className="px-6 py-4 font-bold text-gray-400 text-xs tracking-widest uppercase">Target Property</th>
                <th className="px-6 py-4 font-bold text-gray-400 text-xs tracking-widest uppercase text-right">Contact Base</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {leads.length > 0 ? leads.map(lead => (
                <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-gray-500">
                    {lead.createdAt?.toDate ? new Date(lead.createdAt.toDate()).toLocaleString() : 'Just now'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-gray-900">{lead.name}</span>
                      <span className="text-sm font-medium text-gray-400">{lead.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-bold">
                    <span className="bg-[#008489]/10 text-[#008489] px-3 py-1 rounded-full text-xs truncate max-w-[200px] block">
                      {lead.propertyName || "General Inquiry"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a 
                      href={`https://wa.me/${lead.phone}?text=Hi%20${lead.name},%20I'm%20reaching%20out%20from%20KK%20Hospitalities%20regarding%20your%20inquiry.`}
                      target="_blank"
                      className="bg-[#25D366] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-[#1ebd5a] transition-colors inline-block"
                    >
                      WhatsApp Reply
                    </a>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-medium">
                    No leads generated yet. Ensure the schedule form is working.
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
