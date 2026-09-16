import { IEcommerceService } from './service';
import { Product, CategoryInfo, StoreLocation, CartItem, Order, CustomerContact, DeliveryAddress } from './types';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { stores } from '@/data/stores';

class MockEcommerceAdapter implements IEcommerceService {
  async getProducts(params?: { category?: string; subcategory?: string; featured?: boolean; search?: string }): Promise<Product[]> {
    let result = [...products];

    if (params?.category && params.category !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === params.category?.toLowerCase());
    }

    if (params?.subcategory && params.subcategory !== 'All' && !params.subcategory.startsWith('All ')) {
      result = result.filter(p => p.subcategory.toLowerCase() === params.subcategory?.toLowerCase());
    }

    if (params?.featured) {
      result = result.filter(p => p.featured);
    }

    if (params?.search) {
      const q = params.search.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.ingredients.some(i => i.toLowerCase().includes(q))
      );
    }

    return result;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const found = products.find(p => p.slug === slug);
    return found || null;
  }

  async getProductById(id: string): Promise<Product | null> {
    const found = products.find(p => p.id === id);
    return found || null;
  }

  async getCategories(): Promise<CategoryInfo[]> {
    return categories;
  }

  async getCategoryBySlug(slug: string): Promise<CategoryInfo | null> {
    const found = categories.find(c => c.slug === slug);
    return found || null;
  }

  async getStores(): Promise<StoreLocation[]> {
    return stores;
  }

  async getStoreById(id: string): Promise<StoreLocation | null> {
    const found = stores.find(s => s.id === id);
    return found || null;
  }

  async createOrder(payload: { customer: CustomerContact; delivery: DeliveryAddress; items: CartItem[]; paymentMethod: Order['paymentMethod']; subtotal: number; discount: number; deliveryFee: number; total: number }): Promise<Order> {
    const orderNumber = 'BB-' + Math.floor(100000 + Math.random() * 900000);
    const id = 'ord_' + Date.now();
    const order: Order = {
      id,
      orderNumber,
      createdAt: new Date().toISOString(),
      customer: payload.customer,
      delivery: payload.delivery,
      items: payload.items,
      subtotal: payload.subtotal,
      discount: payload.discount,
      deliveryFee: payload.deliveryFee,
      total: payload.total,
      paymentMethod: payload.paymentMethod,
      paymentStatus: 'completed',
      orderStatus: 'confirmed',
    };

    if (typeof window !== 'undefined') {
      try {
        const existing = JSON.parse(localStorage.getItem('big_bakers_orders') || '[]');
        existing.unshift(order);
        localStorage.setItem('big_bakers_orders', JSON.stringify(existing));
      } catch (e) {
        console.error('Failed to persist order to localStorage', e);
      }
    }

    return order;
  }

  async getOrderById(id: string): Promise<Order | null> {
    if (typeof window !== 'undefined') {
      try {
        const existing: Order[] = JSON.parse(localStorage.getItem('big_bakers_orders') || '[]');
        return existing.find(o => o.id === id || o.orderNumber === id) || null;
      } catch (e) {
        return null;
      }
    }
    return null;
  }
}

export const ecommerceService = new MockEcommerceAdapter();
