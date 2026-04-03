export type RoomTypeCategory = "single" | "double" | "triple" | "studio";

export interface RoomType {
  id?: string;
  propertyId: string;
  type: RoomTypeCategory;
  price: number;
  deposit: number;
  availability: number; // Number of rooms left
  amenities: string[];
}

export interface Property {
  id?: string;
  name: string;
  location: string; // e.g., "Koramangala, Bangalore"
  address: string;
  description: string;
  images: string[];
  amenities: string[]; // Global amenities (WiFi, AC, etc.)
  featured: boolean;
  createdAt: string;
  availabilityBadge?: string; // e.g., "Only 2 rooms left" or "Available from April"
  locationAdvantages?: string[]; // e.g., "5 mins from HITEC City"
  roomTypes?: RoomType[];
}
