export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'name' | 'price-low' | 'price-high' | 'rating' | 'newest';
}

export interface ShippingInfo {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface PaymentInfo {
  method: 'credit' | 'paypal' | 'apple-pay';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}