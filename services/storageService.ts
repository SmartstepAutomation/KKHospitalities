import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid'; // we need to install uuid or just use crypto

export const storageService = {
  uploadImage: async (file: File, folder: string = "properties"): Promise<string | null> => {
    if (!storage) {
      console.warn("Firebase storage not configured.");
      return null;
    }

    try {
      // Use crypto.randomUUID() if available or Math.random
      const fileId = typeof crypto !== 'undefined' && crypto.randomUUID 
        ? crypto.randomUUID() 
        : Math.random().toString(36).substring(2, 15);
        
      const fileExtension = file.name.split('.').pop();
      const storageRef = ref(storage, `${folder}/${fileId}.${fileExtension}`);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  }
};
