const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\VinayHattikal\\.gemini\\antigravity\\brain\\8ca32ca8-9aaa-4d8b-b9eb-340ef3a3fee1';
const files = fs.readdirSync(brainDir);

function findLatest(prefix) {
  const matching = files.filter(f => f.startsWith(prefix) && (f.endsWith('.jpg') || f.endsWith('.png')));
  if (!matching.length) return null;
  matching.sort();
  return path.join(brainDir, matching[matching.length - 1]);
}

const mappings = [
  // Hero & Story
  { src: findLatest('hero_bakery_craft'), dest: 'public/images/hero/bakery-hero.webp' },
  { src: findLatest('hero_bakery_craft'), dest: 'public/images/hero/hero-craft.webp' },
  { src: findLatest('hero_bakery_craft'), dest: 'public/images/story/story-hero.webp' },
  { src: findLatest('hero_bakery_craft'), dest: 'public/images/bakery/craft-hero.webp' },

  // Cakes
  { src: findLatest('belgian_truffle_cake'), dest: 'public/images/cakes/belgian-truffle.webp' },
  { src: findLatest('belgian_truffle_cake'), dest: 'public/images/cakes/belgian-truffle-hero.webp' },
  { src: findLatest('belgian_truffle_cake'), dest: 'public/images/cakes/belgian-truffle-slice.webp' },
  { src: findLatest('belgian_truffle_cake'), dest: 'public/images/cakes/belgian-truffle-detail.webp' },
  { src: findLatest('belgian_truffle_cake'), dest: 'public/images/cakes/black-forest.webp' },
  { src: findLatest('belgian_truffle_cake'), dest: 'public/images/cakes/black-forest-detail.webp' },

  { src: findLatest('red_velvet_cake'), dest: 'public/images/cakes/red-velvet.webp' },
  { src: findLatest('red_velvet_cake'), dest: 'public/images/cakes/red-velvet-slice.webp' },

  { src: findLatest('lotus_biscoff_cake'), dest: 'public/images/cakes/lotus-biscoff-cake.webp' },
  { src: findLatest('lotus_biscoff_cake'), dest: 'public/images/cakes/mango-mousse.webp' },

  // Desserts
  { src: findLatest('biscoff_cheesecake'), dest: 'public/images/desserts/biscoff-cheesecake.webp' },
  { src: findLatest('biscoff_cheesecake'), dest: 'public/images/desserts/biscoff-slice.webp' },
  { src: findLatest('classic_tiramisu'), dest: 'public/images/desserts/tiramisu.webp' },
  { src: findLatest('tres_leches_cake'), dest: 'public/images/desserts/tres-leches.webp' },
  { src: findLatest('belgian_truffle_cake'), dest: 'public/images/desserts/brownie.webp' },

  // Treats
  { src: findLatest('glazed_donut'), dest: 'public/images/treats/glazed-donut.webp' },
  { src: findLatest('red_velvet_cake'), dest: 'public/images/treats/cupcake.webp' },
  { src: findLatest('glazed_donut'), dest: 'public/images/treats/choc-cookie.webp' },
  { src: findLatest('tres_leches_cake'), dest: 'public/images/treats/sugar-candies.webp' },

  // Snacks
  { src: findLatest('peri_peri_makhana'), dest: 'public/images/snacks/peri-peri-makhana.webp' },
  { src: findLatest('bengaluru_namkeen'), dest: 'public/images/snacks/namkeen.webp' },
  { src: findLatest('sourdough_bread'), dest: 'public/images/snacks/sourdough-bread.webp' },

  // Stores
  { src: findLatest('store_flagship'), dest: 'public/images/stores/indiranagar-store.webp' },
  { src: findLatest('store_flagship'), dest: 'public/images/stores/koramangala-store.webp' },
  { src: findLatest('store_flagship'), dest: 'public/images/stores/whitefield-store.webp' },
  { src: findLatest('store_flagship'), dest: 'public/images/stores/jayanagar-store.webp' },
];

let copied = 0;
mappings.forEach(m => {
  if (m.src && fs.existsSync(m.src)) {
    fs.mkdirSync(path.dirname(m.dest), { recursive: true });
    fs.copyFileSync(m.src, m.dest);
    copied++;
  } else {
    console.warn('Missing source for', m.dest);
  }
});

console.log('Successfully synced ' + copied + ' photography assets into /public/images/');
