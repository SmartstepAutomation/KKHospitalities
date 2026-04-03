export interface Lead {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  propertyId: string;
  propertyName: string;
  preferredDate?: string;
  message?: string;
  status?: 'new' | 'contacted' | 'booked' | 'lost';
  createdAt?: any; 
}
