"use server";

import { propertyService } from "@/services/propertyService";
import { Property } from "@/types/property";
import { revalidatePath } from "next/cache";

export async function updatePropertyAction(id: string, data: Partial<Property>) {
  try {
    const success = await propertyService.updateProperty(id, data);
    if (success) {
      // Revalidate to ensure the UI updates
      revalidatePath("/");
      revalidatePath(`/property/${id}`);
      revalidatePath("/admin");
    }
    return { success };
  } catch (error) {
    console.error("Error updating property:", error);
    return { success: false, error: "Failed to update property" };
  }
}

export async function addPropertyAction(data: Partial<Property>) {
  try {
    const newId = await propertyService.addProperty(data);
    if (newId) {
      revalidatePath("/");
      revalidatePath("/admin/properties");
    }
    return { success: !!newId, id: newId };
  } catch (error) {
    console.error("Error adding property:", error);
    return { success: false, error: "Failed to add property" };
  }
}

export async function deletePropertyAction(id: string) {
  try {
    const success = await propertyService.deleteProperty(id);
    if (success) {
      revalidatePath("/");
      revalidatePath("/admin/properties");
    }
    return { success };
  } catch (error) {
    console.error("Error deleting property:", error);
    return { success: false, error: "Failed to delete property" };
  }
}
