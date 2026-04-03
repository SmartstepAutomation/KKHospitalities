import { leadService } from "@/services/leadService";
import LeadStatusPicker from "@/components/admin/LeadStatusPicker";
import { HiPhone } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

export const dynamic = "force-dynamic";

export default async function AdminLeadsList() {
  const leads = await leadService.getAllLeads();

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2 text-left">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Leads Inbox</h2>
          <p className="text-gray-500 font-medium">Manage and track your website inquiries</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-4 py-2 rounded-xl">
            {leads.length} Total Leads
          </span>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left min-w-[900px]">
            <thead className="bg-gray-50/50 border-b border-gray-100 uppercase text-[10px] font-black tracking-[0.2em] text-gray-400">
              <tr>
                <th className="px-8 py-5">Date / Time</th>
                <th className="px-8 py-5">Lead Info</th>
                <th className="px-8 py-5">Target Property</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right whitespace-nowrap">Contact Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {leads.length > 0 ? leads.map(lead => (
                <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6 text-sm font-bold text-gray-500">
                    {lead.createdAt?.toDate ? new Date(lead.createdAt.toDate()).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : 'Just now'}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1">
                      <span className="font-black text-gray-900 text-base">{lead.name}</span>
                      <span className="text-xs font-bold text-[#008489] uppercase tracking-wider">{lead.phone}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="inline-block bg-gray-100 text-gray-600 px-4 py-1.5 rounded-xl text-xs font-black uppercase border border-gray-200">
                      {lead.propertyName || "General Inquiry"}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <LeadStatusPicker leadId={lead.id!} initialStatus={lead.status || "new"} />
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a 
                        href={`tel:${lead.phone}`}
                        className="p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-[#008489] hover:text-white transition-all shadow-sm"
                        title="Call Lead"
                      >
                        <HiPhone className="text-xl" />
                      </a>
                      <a 
                        href={`https://wa.me/${lead.phone.replace(/\D/g, '')}?text=Hi%20${lead.name},%20I'm%20reaching%20out%20from%20KK%20Hospitalities%20regarding%20your%20inquiry.`}
                        target="_blank"
                        className="bg-[#25D366] text-white p-2.5 rounded-xl shadow-sm hover:bg-[#1ebd5a] transition-all flex items-center justify-center"
                        title="WhatsApp Reply"
                      >
                        <FaWhatsapp className="text-xl" />
                      </a>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-8 py-16 text-center text-gray-400 font-bold uppercase tracking-widest">
                    No leads generated yet
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
