import { db, isFirebaseConfigured } from "@/lib/firebase";
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  limit,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";
import { Property, RoomType } from "@/types/property";

const PROPERTIES_COLLECTION = "properties";
const ROOM_TYPES_COLLECTION = "roomTypes";

// High-conversion Hyderabad specific mock data
let MOCK_PROPERTIES: Property[] = [
  {
    id: "1",
    name: "The Executive Suites at HITEC City",
    location: "HITEC City, Hyderabad",
    address: "Near Mindspace IT Park, HITEC City",
    description: "Experience the pinnacle of co-living in the heart of Bangalore's most vibrant neighborhood. Fully-furnished with ergonomic furniture, high-speed WiFi, and 24/7 security. Whether you're a digital nomad or a corporate professional, this is the perfect space for you.",
    images: ["/room1.png", "/room2.png", "/room3.png"],
    amenities: ["High-speed WiFi", "AC", "Daily Cleaning", "Fully Equipped Kitchen"],
    featured: true,
    availabilityBadge: "Only 2 rooms left",
    locationAdvantages: ["5 mins walk to Mindspace IT Park", "Near Inorbit Mall", "Premium gated society neighborhood"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Gachibowli Tech Hub Living",
    location: "Gachibowli, Hyderabad",
    address: "Financial District, Gachibowli",
    description: "Hassle-free premium co-living near major tech campuses. Fully managed so you can focus on your work.",
    images: ["/room2.png"],
    amenities: ["High-speed WiFi", "AC", "Daily Cleaning", "Power Backup"],
    featured: true,
    availabilityBadge: "Available from next month",
    locationAdvantages: ["Right in Financial District", "Near Microsoft & Amazon campuses", "Surrounded by tech parks"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Madhapur Premium Studios",
    location: "Madhapur, Hyderabad",
    address: "Ayyappa Society, Madhapur",
    description: "Vibrant neighborhood, stunning interiors, and a community of like-minded professionals.",
    images: ["/hero.png"],
    amenities: ["High-speed WiFi", "AC", "Gym Access", "Lounge"],
    featured: true,
    availabilityBadge: "Filling fast",
    locationAdvantages: ["Heart of Madhapur tech hub", "Walking distance to metro", "Vibrant cafes and nightlife nearby"],
    createdAt: new Date().toISOString(),
  }
];

export const propertyService = {
  // Fetch all properties
  getAllProperties: async (): Promise<Property[]> => {
    if (!isFirebaseConfigured || !db) return MOCK_PROPERTIES;
    
    try {
      const q = query(collection(db, PROPERTIES_COLLECTION), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const props = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Property));
      return props.length > 0 ? props : MOCK_PROPERTIES;
    } catch (e) {
      return MOCK_PROPERTIES;
    }
  },

  // Fetch featured properties
  getFeaturedProperties: async (count: number = 3): Promise<Property[]> => {
    if (!isFirebaseConfigured || !db) return MOCK_PROPERTIES.slice(0, count);

    try {
      const q = query(
        collection(db, PROPERTIES_COLLECTION), 
        where("featured", "==", true), 
        limit(count)
      );
      const querySnapshot = await getDocs(q);
      const props = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Property));
      return props.length > 0 ? props : MOCK_PROPERTIES.slice(0, count);
    } catch (e) {
      return MOCK_PROPERTIES.slice(0, count);
    }
  },

  // Fetch property by ID with its room types
  getPropertyDetail: async (id: string): Promise<Property | null> => {
    if (!isFirebaseConfigured || !db) return MOCK_PROPERTIES.find(p => p.id === id) || MOCK_PROPERTIES[0];

    const docRef = doc(db, PROPERTIES_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    const property = { id: docSnap.id, ...docSnap.data() } as Property;

    // Fetch associated room types
    const roomQ = query(collection(db, ROOM_TYPES_COLLECTION), where("propertyId", "==", id));
    const roomSnap = await getDocs(roomQ);
    property.roomTypes = roomSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as RoomType));

    return property;
  },

  // Search/Filter properties
  filterProperties: async (filters: { location?: string, type?: string, maxPrice?: number }): Promise<Property[]> => {
    if (!isFirebaseConfigured || !db) return MOCK_PROPERTIES;

    let q = query(collection(db, PROPERTIES_COLLECTION));

    if (filters.location && filters.location !== "all") {
      q = query(q, where("location", "==", filters.location));
    }

    const querySnapshot = await getDocs(q);
    let properties = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Property));

    return properties;
  },

  // Update property
  updateProperty: async (id: string, data: Partial<Property>): Promise<boolean> => {
    if (!isFirebaseConfigured || !db) {
      const idx = MOCK_PROPERTIES.findIndex(p => p.id === id);
      if (idx !== -1) {
        MOCK_PROPERTIES[idx] = { ...MOCK_PROPERTIES[idx], ...data };
        return true;
      }
      return false;
    }

    try {
      const docRef = doc(db, PROPERTIES_COLLECTION, id);
      await updateDoc(docRef, data);
      return true;
    } catch (e) {
      console.error("Error updating property in Firestore", e);
      return false;
    }
  },

  // Add new property
  addProperty: async (data: Partial<Property>): Promise<string | null> => {
    if (!isFirebaseConfigured || !db) {
      const newProp = { id: Math.random().toString(), ...data, createdAt: new Date().toISOString() } as Property;
      MOCK_PROPERTIES.unshift(newProp);
      return newProp.id || null;
    }
    
    try {
      const docRef = await addDoc(collection(db, PROPERTIES_COLLECTION), {
        ...data,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (e) {
      console.error("Error adding property to Firestore", e);
      return null;
    }
  },

  // Delete property
  deleteProperty: async (id: string): Promise<boolean> => {
    if (!isFirebaseConfigured || !db) {
      MOCK_PROPERTIES = MOCK_PROPERTIES.filter(p => p.id !== id);
      return true;
    }
    
    try {
      await deleteDoc(doc(db, PROPERTIES_COLLECTION, id));
      return true;
    } catch (e) {
      console.error("Error deleting property from Firestore", e);
      return false;
    }
  }
};
