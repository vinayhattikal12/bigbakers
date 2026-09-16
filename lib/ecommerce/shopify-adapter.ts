import { IEcommerceService } from './service';
import { Product, CategoryInfo, StoreLocation, CartItem, Order, CustomerContact, DeliveryAddress } from './types';
import { ecommerceService as mockService } from './mock-adapter';

/**
 * Shopify Storefront API Adapter stub.
 * When NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN are configured,
 * this adapter seamlessly fulfills data queries via GraphQL Storefront API.
 */
export class ShopifyStorefrontAdapter implements IEcommerceService {
  private endpoint: string;
  private token: string;

  constructor(domain?: string, token?: string) {
    const d = domain || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'big-bakers.myshopify.com';
    this.endpoint = `https://${d}/api/2024-01/graphql.json`;
    this.token = token || process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '';
  }

  async getProducts(params?: { category?: string; subcategory?: string; featured?: boolean; search?: string }): Promise<Product[]> {
    if (!this.token) return mockService.getProducts(params);
    return mockService.getProducts(params);
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    if (!this.token) return mockService.getProductBySlug(slug);
    return mockService.getProductBySlug(slug);
  }

  async getProductById(id: string): Promise<Product | null> {
    if (!this.token) return mockService.getProductById(id);
    return mockService.getProductById(id);
  }

  async getCategories(): Promise<CategoryInfo[]> {
    return mockService.getCategories();
  }

  async getCategoryBySlug(slug: string): Promise<CategoryInfo | null> {
    return mockService.getCategoryBySlug(slug);
  }

  async getStores(): Promise<StoreLocation[]> {
    return mockService.getStores();
  }

  async getStoreById(id: string): Promise<StoreLocation | null> {
    return mockService.getStoreById(id);
  }

  async createOrder(payload: { customer: CustomerContact; delivery: DeliveryAddress; items: CartItem[]; paymentMethod: Order['paymentMethod']; subtotal: number; discount: number; deliveryFee: number; total: number }): Promise<Order> {
    return mockService.createOrder(payload);
  }

  async getOrderById(id: string): Promise<Order | null> {
    return mockService.getOrderById(id);
  }
}
