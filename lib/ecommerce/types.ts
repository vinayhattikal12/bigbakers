export type DietaryType = 'veg' | 'non-veg' | 'eggless' | 'vegan';

export interface ProductWeightOption {
  weight: string;
  price: number;
  isDefault?: boolean;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: 'cakes' | 'desserts' | 'treats' | 'snacks' | 'bakery';
  subcategory: string;
  description: string;
  longDescription?: string;
  price: number;
  originalPrice?: number;
  heroImage: string;
  gallery: string[];
  dietary: DietaryType;
  weights: ProductWeightOption[];
  ingredients: string[];
  allergens: string[];
  rating: number;
  reviewCount: number;
  featured?: boolean;
  bestseller?: boolean;
  freshlyBaked?: boolean;
  availability: boolean;
  prepTimeMinutes?: number;
  shelfLife?: string;
  storageInstructions?: string;
  reviews?: ProductReview[];
}

export interface CategoryInfo {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  heroImage: string;
  accentColor: string;
  subcategories: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedWeight: string;
  price: number;
  quantity: number;
  customMessage?: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  area: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  hours: string;
  isOpen: boolean;
  mapsUrl: string;
  image: string;
  features: string[];
}

export interface CustomerContact {
  fullName: string;
  email: string;
  phone: string;
}

export interface DeliveryAddress {
  addressLine1: string;
  apartment?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  deliveryDate?: string;
  deliverySlot?: string;
  instructions?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: CustomerContact;
  delivery: DeliveryAddress;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  paymentStatus: 'pending' | 'completed' | 'failed';
  orderStatus: 'confirmed' | 'baking' | 'out_for_delivery' | 'delivered';
}
