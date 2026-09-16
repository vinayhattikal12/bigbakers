# Big Bakers 🎂✨
### *Bite Into Happiness* — Bengaluru's Premier Artisanal Patisserie & Bakery Experience

An ultra-modern, high-performance artisanal bakery e-commerce platform featuring interactive 3D video-scrubbing, physics-based UI animations, and a rich e-commerce shopping experience.

---

## 🚀 Key Features

- **🎬 Cinematic 3D Canvas Scrubbing:** Seamless interactive storytelling powered by GSAP ScrollTrigger and HTML5 2D Canvas scrubbing across 3 distinct bakery scenes (900+ high-res WebP frames).
- **🛍️ Complete E-Commerce Workflow:** 
  - Dynamic pricing based on portion / weight (`500g`, `1kg`, `1.5kg`, `2kg`).
  - Custom celebration messaging piped onto cakes.
  - Slide-over Cart Drawer & dedicated cart page with persistent LocalStorage state.
  - Coupon discount engine & free shipping threshold calculations.
  - Multi-step checkout with delivery slot selection and payment method simulation.
- **✨ 3D Parabolic "Fly-to-Cart" Animation:** Hardware-accelerated cubic-bezier physics with golden drop-shadows and shopping bag impact bounce.
- **🍰 Rich Product Anatomy & Sensory Profiles:** Interactive layer-by-layer breakdown and sweetness/richness/crunch flavor meters.
- **📍 Store Locator & Brand Story:** Flagship store in MC Layout, Vijaynagar, Bengaluru with opening hours, directions, and culinary heritage.
- **🔌 Shopify GraphQL Ready:** Hexagonal architecture with plug-and-play Shopify Storefront API adapter.
- **♿ Full Accessibility:** `prefers-reduced-motion` detection with a dedicated static hero fallback.
- **🔍 SEO & Local Search Optimized:** Dynamic `sitemap.xml`, `robots.txt`, and Schema.org `Bakery` JSON-LD structured data.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation & 3D:** [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/), [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll:** [Lenis](https://lenis.darkroom.engineering/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/vinayhattikal12/bigbakers.git
cd bigbakers
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```
big_3d/
├── app/                  # Next.js App Router (pages, layout, metadata)
├── components/
│   ├── cinematic/        # Canvas scrubbing & narrative hero
│   ├── ecommerce/        # Product cards, cart drawer, fly-to-cart, layer anatomy
│   ├── layout/           # Header, footer, smooth scroll wrapper
│   └── ui/               # Reusable UI primitives (Buttons, Badges)
├── data/                 # Catalogs (products, categories, stores)
├── lib/
│   ├── context/          # CartContext & WishlistContext
│   ├── ecommerce/        # Shopify & Mock adapters, types
│   └── utils/            # Formatters & class merger
├── public/
│   ├── cinematic/        # Extracted 3D scene frames (scene1, scene2, scene3)
│   └── images/           # High-resolution product & hero images
└── scripts/              # Asset sync and frame extraction tools
```

---

## 📜 License

Private © Big Bakers Bengaluru. All rights reserved.
