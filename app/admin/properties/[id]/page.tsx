import PropertyForm from "@/components/admin/PropertyForm";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import { propertyService } from "@/services/propertyService";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditPropertyPage({ params }: { params: { id: string } }) {
  const property = await propertyService.getPropertyDetail(params.id);

  if (!property) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-4 border-b border-gray-100 pb-6 w-full">
        <Link href="/admin/properties" className="p-3 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-[#008489] hover:border-[#008489] transition-all">
          <HiArrowLeft className="text-xl" />
        </Link>
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Edit Property</h2>
          <p className="text-gray-500 font-medium mt-1">Updating: {property.name}</p>
        </div>
      </div>

      <PropertyForm initialData={property} />
    </div>
  );
}
