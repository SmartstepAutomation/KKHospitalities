import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, limit, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { isFirebaseConfigured } from "@/lib/firebase";
import { Lead } from "@/types/lead";

const LEADS_COLLECTION = "leads";

export const leadService = {
  // Add a new lead
  addLead: async (data: any): Promise<boolean> => {
    if (!isFirebaseConfigured || !db) {
      console.log("Demo Mode: Lead simulated", data);
      return true;
    }

    try {
      await addDoc(collection(db, LEADS_COLLECTION), {
        ...data,
        status: 'new',
        createdAt: serverTimestamp(),
      });
      return true;
    } catch (e) {
      console.error("Error adding lead", e);
      return false;
    }
  },

  // Get all leads (Admin)
  getAllLeads: async () => {
    if (!isFirebaseConfigured || !db) return [];
    
    try {
      const q = query(collection(db, LEADS_COLLECTION), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead));
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  // Get recent leads (Admin)
  getRecentLeads: async (count: number = 5) => {
    if (!isFirebaseConfigured || !db) return [];
    
    try {
      const q = query(collection(db, LEADS_COLLECTION), orderBy("createdAt", "desc"), limit(count));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead));
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  // Update lead status
  updateLeadStatus: async (leadId: string, status: string): Promise<boolean> => {
    if (!isFirebaseConfigured || !db) {
      console.log(`Demo Mode: Status updated to ${status} for lead ${leadId}`);
      return true;
    }

    try {
      const docRef = doc(db, LEADS_COLLECTION, leadId);
      await updateDoc(docRef, { status });
      return true;
    } catch (e) {
      console.error("Error updating lead status", e);
      return false;
    }
  }
};
