export interface TCar {
  _id?: string;
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status: 'available' | 'unavailable';
  features: string[];
  pricePerHour: number;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
