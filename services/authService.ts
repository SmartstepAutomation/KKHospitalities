import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const ADMINS_COLLECTION = "admins";

export const authService = {
  checkIsAdmin: async (email: string | null | undefined): Promise<boolean> => {
    if (!email || !db) return false;
    
    try {
      const q = query(
        collection(db, ADMINS_COLLECTION), 
        where("email", "==", email.toLowerCase())
      );
      const querySnapshot = await getDocs(q);
      
      // If a document matches the exact email, user is an admin
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
  }
};
