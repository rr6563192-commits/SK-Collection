export type ProductCategory =
  | 'Shirts'
  | 'T-Shirts'
  | 'Jeans'
  | 'Pants'
  | 'Casual Wear'
  | 'Formal Wear';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  colors: string[];
  sizes: string[];
  stock: number;
  featured: boolean;
  newArrival: boolean;
  trending: boolean;
  specifications: Record<string, string>;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  mobileNumber: string;
  alternateNumber: string;
  houseNumber: string;
  streetArea: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  landmark: string;
  deliveryNotes: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}
