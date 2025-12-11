// Dummy data for NourishNet Food Donation Platform

export type DonationStatus = 'pending' | 'assigned' | 'picked_up' | 'in_transit' | 'delivered';

export interface Donor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
  totalDonations: number;
  joinedDate: string;
}

export interface Rider {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  vehicleNumber: string;
  avatar?: string;
  rating: number;
  totalDeliveries: number;
  status: 'available' | 'busy' | 'offline';
  currentLocation?: string;
}

export interface Organisation {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  type: string;
  logo?: string;
  capacity: number;
  currentOccupancy: number;
  registrationDate: string;
  verified: boolean;
}

export interface Donation {
  id: string;
  donorId: string;
  donor: Donor;
  riderId?: string;
  rider?: Rider;
  organisationId?: string;
  organisation?: Organisation;
  foodItems: FoodItem[];
  status: DonationStatus;
  pickupAddress: string;
  pickupTime: string;
  deliveryTime?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FoodItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: 'cooked' | 'raw' | 'packaged' | 'beverages' | 'dairy' | 'bakery';
  expiryDate?: string;
}

// Dummy Donors
export const donors: Donor[] = [
  {
    id: 'd1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 98765 43210',
    address: '123, MG Road, Bangalore, Karnataka',
    totalDonations: 24,
    joinedDate: '2024-01-15',
  },
  {
    id: 'd2',
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    phone: '+91 87654 32109',
    address: '456, Park Street, Mumbai, Maharashtra',
    totalDonations: 18,
    joinedDate: '2024-02-20',
  },
  {
    id: 'd3',
    name: 'Restaurant Spice Garden',
    email: 'contact@spicegarden.com',
    phone: '+91 76543 21098',
    address: '789, Food Court, Chennai, Tamil Nadu',
    totalDonations: 156,
    joinedDate: '2023-06-10',
  },
];

// Dummy Riders
export const riders: Rider[] = [
  {
    id: 'r1',
    name: 'Amit Kumar',
    email: 'amit.kumar@email.com',
    phone: '+91 65432 10987',
    vehicleType: 'Motorcycle',
    vehicleNumber: 'KA-01-AB-1234',
    rating: 4.8,
    totalDeliveries: 342,
    status: 'available',
    currentLocation: 'Koramangala, Bangalore',
  },
  {
    id: 'r2',
    name: 'Suresh Reddy',
    email: 'suresh.reddy@email.com',
    phone: '+91 54321 09876',
    vehicleType: 'Van',
    vehicleNumber: 'KA-02-CD-5678',
    rating: 4.9,
    totalDeliveries: 567,
    status: 'busy',
    currentLocation: 'Indiranagar, Bangalore',
  },
  {
    id: 'r3',
    name: 'Mohammed Ali',
    email: 'mo.ali@email.com',
    phone: '+91 43210 98765',
    vehicleType: 'Motorcycle',
    vehicleNumber: 'MH-12-EF-9012',
    rating: 4.7,
    totalDeliveries: 234,
    status: 'available',
    currentLocation: 'Andheri, Mumbai',
  },
];

// Dummy Organisations
export const organisations: Organisation[] = [
  {
    id: 'o1',
    name: 'Hope Foundation',
    email: 'contact@hopefoundation.org',
    phone: '+91 32109 87654',
    address: '100, Charity Lane, Bangalore, Karnataka',
    type: 'NGO',
    capacity: 500,
    currentOccupancy: 320,
    registrationDate: '2022-03-15',
    verified: true,
  },
  {
    id: 'o2',
    name: 'City Shelter Home',
    email: 'info@cityshelter.org',
    phone: '+91 21098 76543',
    address: '200, Care Street, Mumbai, Maharashtra',
    type: 'Shelter',
    capacity: 200,
    currentOccupancy: 180,
    registrationDate: '2023-01-20',
    verified: true,
  },
  {
    id: 'o3',
    name: 'Children First Orphanage',
    email: 'hello@childrenfirst.org',
    phone: '+91 10987 65432',
    address: '300, Kids Avenue, Chennai, Tamil Nadu',
    type: 'Orphanage',
    capacity: 150,
    currentOccupancy: 120,
    registrationDate: '2021-08-10',
    verified: true,
  },
  {
    id: 'o4',
    name: 'Elder Care Center',
    email: 'support@eldercare.org',
    phone: '+91 09876 54321',
    address: '400, Senior Lane, Delhi',
    type: 'Old Age Home',
    capacity: 100,
    currentOccupancy: 75,
    registrationDate: '2023-05-25',
    verified: false,
  },
];

// Dummy Donations
export const donations: Donation[] = [
  {
    id: 'don1',
    donorId: 'd1',
    donor: donors[0],
    riderId: 'r1',
    rider: riders[0],
    organisationId: 'o1',
    organisation: organisations[0],
    foodItems: [
      { id: 'f1', name: 'Rice', quantity: 10, unit: 'kg', category: 'raw' },
      { id: 'f2', name: 'Dal', quantity: 5, unit: 'kg', category: 'raw' },
    ],
    status: 'delivered',
    pickupAddress: '123, MG Road, Bangalore, Karnataka',
    pickupTime: '2024-12-04T10:00:00',
    deliveryTime: '2024-12-04T11:30:00',
    notes: 'Please handle with care',
    createdAt: '2024-12-04T09:00:00',
    updatedAt: '2024-12-04T11:30:00',
  },
  {
    id: 'don2',
    donorId: 'd3',
    donor: donors[2],
    riderId: 'r2',
    rider: riders[1],
    organisationId: 'o2',
    organisation: organisations[1],
    foodItems: [
      { id: 'f3', name: 'Biryani', quantity: 50, unit: 'plates', category: 'cooked' },
      { id: 'f4', name: 'Raita', quantity: 5, unit: 'liters', category: 'dairy' },
    ],
    status: 'in_transit',
    pickupAddress: '789, Food Court, Chennai, Tamil Nadu',
    pickupTime: '2024-12-05T14:00:00',
    notes: 'Hot food - deliver quickly',
    createdAt: '2024-12-05T13:00:00',
    updatedAt: '2024-12-05T14:30:00',
  },
  {
    id: 'don3',
    donorId: 'd2',
    donor: donors[1],
    riderId: 'r3',
    rider: riders[2],
    organisationId: 'o3',
    organisation: organisations[2],
    foodItems: [
      { id: 'f5', name: 'Bread', quantity: 20, unit: 'loaves', category: 'bakery' },
      { id: 'f6', name: 'Milk', quantity: 10, unit: 'liters', category: 'dairy' },
      { id: 'f7', name: 'Juice', quantity: 15, unit: 'bottles', category: 'beverages' },
    ],
    status: 'picked_up',
    pickupAddress: '456, Park Street, Mumbai, Maharashtra',
    pickupTime: '2024-12-05T09:00:00',
    createdAt: '2024-12-05T08:00:00',
    updatedAt: '2024-12-05T09:15:00',
  },
  {
    id: 'don4',
    donorId: 'd1',
    donor: donors[0],
    organisationId: 'o1',
    organisation: organisations[0],
    foodItems: [
      { id: 'f8', name: 'Vegetables', quantity: 15, unit: 'kg', category: 'raw' },
    ],
    status: 'pending',
    pickupAddress: '123, MG Road, Bangalore, Karnataka',
    pickupTime: '2024-12-06T11:00:00',
    createdAt: '2024-12-05T16:00:00',
    updatedAt: '2024-12-05T16:00:00',
  },
  {
    id: 'don5',
    donorId: 'd3',
    donor: donors[2],
    riderId: 'r1',
    rider: riders[0],
    organisationId: 'o4',
    organisation: organisations[3],
    foodItems: [
      { id: 'f9', name: 'Roti', quantity: 100, unit: 'pieces', category: 'cooked' },
      { id: 'f10', name: 'Sabzi', quantity: 10, unit: 'kg', category: 'cooked' },
    ],
    status: 'assigned',
    pickupAddress: '789, Food Court, Chennai, Tamil Nadu',
    pickupTime: '2024-12-05T18:00:00',
    createdAt: '2024-12-05T15:00:00',
    updatedAt: '2024-12-05T15:30:00',
  },
];

// Stats for Admin Dashboard
export const adminStats = {
  totalDonations: 1247,
  totalDonors: 89,
  totalRiders: 23,
  totalOrganisations: 15,
  foodSaved: '15,680 kg',
  mealsServed: '52,340',
  activeDonations: 12,
  monthlyGrowth: '+18%',
};

// Chart data for analytics
export const monthlyDonations = [
  { month: 'Jan', donations: 85 },
  { month: 'Feb', donations: 92 },
  { month: 'Mar', donations: 78 },
  { month: 'Apr', donations: 110 },
  { month: 'May', donations: 125 },
  { month: 'Jun', donations: 98 },
  { month: 'Jul', donations: 132 },
  { month: 'Aug', donations: 145 },
  { month: 'Sep', donations: 138 },
  { month: 'Oct', donations: 156 },
  { month: 'Nov', donations: 168 },
  { month: 'Dec', donations: 120 },
];

export const categoryDistribution = [
  { name: 'Cooked Food', value: 45 },
  { name: 'Raw Ingredients', value: 25 },
  { name: 'Packaged Food', value: 15 },
  { name: 'Bakery Items', value: 10 },
  { name: 'Beverages', value: 5 },
];

// Get status color helper
export const getStatusColor = (status: DonationStatus) => {
  const colors = {
    pending: 'warning',
    assigned: 'info',
    picked_up: 'info',
    in_transit: 'primary',
    delivered: 'success',
  };
  return colors[status] || 'muted';
};

// Get status label helper
export const getStatusLabel = (status: DonationStatus) => {
  const labels = {
    pending: 'Pending',
    assigned: 'Assigned',
    picked_up: 'Picked Up',
    in_transit: 'In Transit',
    delivered: 'Delivered',
  };
  return labels[status] || status;
};
