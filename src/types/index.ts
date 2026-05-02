export interface Restaurant {
  id: string;
  name: string;
  image: string;
  images?: string[];
  rating: number;
  cuisine: string[];
  priceRange: string;
  description: string;
  menu: MenuItem[];
  reviews: Review[];
  availableSlots: string[];
  location: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Booking {
  id: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  date: string;
  time: string;
  guests: number;
  amount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Payment {
  id: string;
  userId: string;
  bookingId: string;
  amount: number;
  paymentStatus: 'success' | 'failed' | 'pending';
  transactionId?: string;
  createdAt: string;
}
