import { CategoryInfo } from '@/lib/ecommerce/types';

export const categories: CategoryInfo[] = [
  {
    id: 'cakes',
    slug: 'cakes',
    title: 'Celebration & Pastry Cakes',
    tagline: 'Cakes For Every Chapter Of Your Story',
    description: 'Handcrafted signature gateaux, rich Belgian chocolate truffles, and delicate pastry sponges baked fresh with premium cocoa and dairy cream.',
    heroImage: '/images/cakes/belgian-truffle-hero.webp',
    accentColor: '#C68B59',
    subcategories: ['All Cakes', 'Celebration Cakes', 'Pastry Cakes', 'Signature Truffles', 'Eggless Specials'],
  },
  {
    id: 'desserts',
    slug: 'desserts',
    title: 'Artisan Desserts',
    tagline: 'One More Bite...',
    description: 'Silky cheesecakes, authentic Italian tiramisu, infused saffron tres leches, and warm molten chocolate brownie slabs.',
    heroImage: '/images/desserts/biscoff-cheesecake.webp',
    accentColor: '#9B1D20',
    subcategories: ['All Desserts', 'Cheesecakes', 'Tiramisu & Mousse', 'Tres Leches', 'Fudgy Brownies'],
  },
  {
    id: 'treats',
    slug: 'treats',
    title: 'Little Treats & Candies',
    tagline: 'Little Moments. Big Smiles.',
    description: 'Glazed donuts, artisan cupcakes, chunky chocolate cookies, vintage fruit candies, and buttery golden tea cakes.',
    heroImage: '/images/treats/glazed-donut.webp',
    accentColor: '#F7D1D8',
    subcategories: ['All Treats', 'Donuts', 'Cupcakes', 'Artisan Cookies', 'Sugar Candies', 'Tea Cakes'],
  },
  {
    id: 'snacks',
    slug: 'snacks',
    title: 'Savory Snacks & Breads',
    tagline: 'Not Just Snacks. It\'s Still Delicious.',
    description: 'Slow-roasted flavored makhana, traditional Bengaluru spiced mixtures, and freshly baked sourdough & sandwich breads.',
    heroImage: '/images/snacks/peri-peri-makhana.webp',
    accentColor: '#6E8B6E',
    subcategories: ['All Snacks', 'Makhana (Foxnuts)', 'Namkeens & Mixtures', 'Artisan Breads', 'Savory Bites'],
  },
];
