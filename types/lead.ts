export interface Lead {
  id?: string;
  name: string;
  phoneNumber: string;
  email?: string;
  propertyId: string;
  propertyName: string;
  preferredDate: string;
  message?: string;
  createdAt: string; // ISO String
}
