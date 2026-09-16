import { StoreLocation } from '@/lib/ecommerce/types';

export const stores: StoreLocation[] = [
  {
    id: 'vijaynagar-store',
    name: 'Big Bakers — Vijaynagar Store',
    area: 'Vijaynagar',
    address: 'No. 18, 17th Cross, MC Layout, Near Vijaynagar Club, Vijaynagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560040',
    phone: '+91 80 2330 4567',
    hours: '8:00 AM – 10:30 PM (Mon – Sun)',
    isOpen: true,
    mapsUrl: 'https://maps.google.com/?q=Vijaynagar+MC+Layout+Bengaluru',
    image: '/images/stores/indiranagar-store.webp',
    features: [
      'Live Baking Kitchen',
      'Custom Celebration Cake Studio',
      'Fresh Pastry Counter',
      'Artisan Snacks & Breads',
      'Express Pickup & Delivery',
    ],
  },
];
