// Menu data for the Ape-solutely prototype

export const TIMESLOTS = [
  {
    id: 'slot-1',
    label: 'Break 1',
    time: '12:00',
    window: '12:00 – 12:25',
    cutoff: '11:30'
  },
  {
    id: 'slot-2',
    label: 'Break 2',
    time: '13:00',
    window: '13:00 – 13:25',
    cutoff: '12:15'
  },
  {
    id: 'slot-3',
    label: 'Break 3',
    time: '13:45',
    window: '13:45 – 14:10',
    cutoff: '13:00'
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'vegan', name: 'Vegan' },
  { id: 'veggie', name: 'Vegetarian' },
  { id: 'glutenfree', name: 'Gluten-free' }
];

export const MENSA_ITEMS = [
  {
    id: 'm1',
    name: 'Crispy Katsu Tofu Curry',
    subtitle: 'Mensa daily special',
    description:
      'Panko-breaded organic tofu with jasmine rice, Japanese vegetable curry, pickled daikon and sesame greens.',
    price: 3.9,
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    isVegan: true,
    isVeggie: true,
    isGlutenFree: false,
    allergens: ['Gluten', 'Soy', 'Sesame']
  },
  {
    id: 'm2',
    name: 'ADL Power Quinoa Bowl',
    subtitle: 'ADL signature bowl',
    description:
      'Quinoa, roasted sweet potato, broccoli, avocado and a zesty tahini-lemon drizzle.',
    price: 4.2,
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    isVegan: true,
    isVeggie: true,
    isGlutenFree: true,
    allergens: ['Sesame']
  },
  {
    id: 'm3',
    name: 'Spinach & Ricotta Tortelloni',
    subtitle: 'Fresh pasta station',
    description:
      'Hand-folded pasta with wild spinach and ricotta in a slow-cooked tomato-basil sauce.',
    price: 3.7,
    image:
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    isVegan: false,
    isVeggie: true,
    isGlutenFree: false,
    allergens: ['Gluten', 'Egg', 'Milk']
  },
  {
    id: 'm4',
    name: 'Crispy Schnitzel & Herb Wedges',
    subtitle: 'Mensa classic',
    description:
      'Breaded pork escalope with rosemary potato wedges and lingonberry jam.',
    price: 4.5,
    image:
      'https://images.unsplash.com/photo-1788172400221-6d7d417ee75f?auto=format&fit=crop&w=800&q=80',
    isVegan: false,
    isVeggie: false,
    isGlutenFree: false,
    allergens: ['Gluten', 'Egg', 'Milk']
  },
  {
    id: 'm5',
    name: 'Red Lentil Coconut Dahl',
    subtitle: 'Warming one-pot',
    description:
      'Creamy red lentil dahl with coconut milk, baby spinach and steamed basmati rice.',
    price: 3.4,
    image:
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    isVegan: true,
    isVeggie: true,
    isGlutenFree: true,
    allergens: []
  }
];

export const SIDEBOARD_ITEMS = [
  {
    id: 'sb-coffee-1',
    name: 'Oat Flat White',
    subtitle: 'Barista coffee',
    description: 'Double espresso with micro-foamed oat milk.',
    price: 2.2,
    image:
      'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80',
    isVegan: true,
    isVeggie: true,
    isGlutenFree: true,
    allergens: []
  },
  {
    id: 'sb-coffee-2',
    name: 'Espresso Doppio',
    subtitle: 'Quick coffee',
    description: 'Two shots of 100% Arabica, pulled fresh.',
    price: 1.6,
    image:
      'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80',
    isVegan: true,
    isVeggie: true,
    isGlutenFree: true,
    allergens: []
  },
  {
    id: 'sb-drink-1',
    name: 'Club-Mate · 0.5 L',
    subtitle: 'Chilled',
    description: 'Ice-cold classic from the Ape fridge.',
    price: 1.9,
    image:
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    isVegan: true,
    isVeggie: true,
    isGlutenFree: true,
    allergens: []
  },
  {
    id: 'sb-drink-2',
    name: 'Fritz-Kola · 0.33 L',
    subtitle: 'Chilled',
    description: 'Original Hamburg cola with real cola nut extract.',
    price: 1.8,
    image: '/fritz-kola.jpg',
    isVegan: true,
    isVeggie: true,
    isGlutenFree: true,
    allergens: []
  },
  {
    id: 'sb-dessert-1',
    name: 'Cinnamon Franzbrötchen',
    subtitle: 'Bakery',
    description: 'Warm cinnamon pastry, vegan.',
    price: 1.9,
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    isVegan: true,
    isVeggie: true,
    isGlutenFree: false,
    allergens: ['Gluten']
  },
  {
    id: 'sb-dessert-2',
    name: 'Salted Caramel Brownie',
    subtitle: 'Sealed & gluten-free',
    description: 'Dark chocolate brownie with date caramel and sea salt.',
    price: 2.1,
    image:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    isVegan: true,
    isVeggie: true,
    isGlutenFree: true,
    allergens: []
  },
  {
    id: 'sb-dessert-3',
    name: 'Mango Chia Pudding',
    subtitle: 'Chilled',
    description: 'Coconut chia pudding with alphonso mango.',
    price: 2.0,
    image:
      'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80',
    isVegan: true,
    isVeggie: true,
    isGlutenFree: true,
    allergens: []
  }
];
