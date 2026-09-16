import { Product, CategoryInfo, StoreLocation, CartItem, Order, CustomerContact, DeliveryAddress } from './types';

export interface IEcommerceService {
  getProducts(params?: { category?: string; subcategory?: string; featured?: boolean; search?: string }): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getProductById(id: string): Promise<Product | null>;
  getCategories(): Promise<CategoryInfo[]>;
  getCategoryBySlug(slug: string): Promise<CategoryInfo | null>;
  getStores(): Promise<StoreLocation[]>;
  getStoreById(id: string): Promise<StoreLocation | null>;
  createOrder(payload: { customer: CustomerContact; delivery: DeliveryAddress; items: CartItem[]; paymentMethod: Order['paymentMethod']; subtotal: number; discount: number; deliveryFee: number; total: number }): Promise<Order>;
  getOrderById(id: string): Promise<Order | null>;
}
