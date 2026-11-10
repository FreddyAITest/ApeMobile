// Data model for Ape-solutely Mensa Pre-order Service

export const TIMESLOTS = [
  {
    id: 'slot-1',
    time: '12:00 - 12:25',
    breakName: 'Break 1 • Morning Wrap',
    label: '12:00 Break',
    cutoffTime: '11:30',
    spotsLeft: 6,
    status: 'popular',
    description: 'Perfect after first 9:00 - 12:00 design sprint. Ape arrives 11:55 at ADL door.'
  },
  {
    id: 'slot-2',
    time: '13:00 - 13:25',
    breakName: 'Break 2 • Prime Lunch',
    label: '13:00 Break',
    cutoffTime: '12:15',
    spotsLeft: 14,
    status: 'available',
    description: 'Main lunch break. Ape arrives 12:55 with fresh hot thermal containers.'
  },
  {
    id: 'slot-3',
    time: '13:45 - 14:10',
    breakName: 'Break 3 • Afternoon Energy',
    label: '13:45 Break',
    cutoffTime: '13:00',
    spotsLeft: 18,
    status: 'available',
    description: 'Late lunch / afternoon fuel before user testing sessions.'
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Dishes', icon: 'Sparkles' },
  { id: 'mains', name: 'Mensa Mains', icon: 'Utensils' },
  { id: 'vegan', name: '100% Vegan', icon: 'Leaf' },
  { id: 'veggie', name: 'Vegetarian', icon: 'Salad' },
  { id: 'glutenfree', name: 'Gluten-Safe', icon: 'ShieldCheck' },
  { id: 'sideboard', name: 'Ape Sideboard (Coffee & Treats)', icon: 'Coffee' },
];

export const MENSA_ITEMS = [
  // --- Mensa Mains ---
  {
    id: 'm1',
    name: 'Crispy Katsu Tofu Curry & Jasmine Rice',
    subtitle: 'Mensa Daily Special • Green Seal',
    category: 'mains',
    isVegan: true,
    isVeggie: true,
    isGlutenFree: false,
    rating: 4.9,
    reviewsCount: 142,
    prices: {
      student: 3.90,
      staff: 5.50,
      guest: 7.20
    },
    kcal: 590,
    protein: '22g',
    tags: ['Vegan', 'Chef Pick', 'High Protein'],
    description: 'Crispy panko-breaded organic tofu served on fragrant steamed jasmine rice, slow-cooked Japanese golden vegetable curry, with house-pickled daikon and sesame greens.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    thermoBox: 'Box A1 • Kept at 72°C',
    customizations: [
      { id: 'extra-rice', name: 'Extra Jasmine Rice', price: 0.80 },
      { id: 'chili-crisp', name: 'Crispy Chili Garlic Oil', price: 0.50 },
      { id: 'side-kimchi', name: 'House Radish Kimchi', price: 1.20 }
    ]
  },
  {
    id: 'm2',
    name: 'ADL Power Quinoa & Roasted Veggie Bowl',
    subtitle: 'Agile Design Lab Signature Bowl',
    category: 'mains',
    isVegan: true,
    isVeggie: true,
    isGlutenFree: true,
    rating: 4.8,
    reviewsCount: 98,
    prices: {
      student: 4.20,
      staff: 5.80,
      guest: 7.50
    },
    kcal: 510,
    protein: '19g',
    tags: ['Vegan', 'Gluten-Safe', 'Clean Fuel'],
    description: 'Tricolor Peruvian quinoa with turmeric roasted sweet potatoes, charred broccoli florets, creamy avocado puree, edamame beans, and zesty tahini-lemon drizzle.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    thermoBox: 'Box A2 • Kept at 68°C',
    customizations: [
      { id: 'smoked-tempeh', name: 'Smoked Tempeh Strips', price: 1.50 },
      { id: 'extra-avocado', name: 'Extra Avocado Scoop', price: 1.00 }
    ]
  },
  {
    id: 'm3',
    name: 'Spinach & Ricotta Tortelloni in Basil Pomodoro',
    subtitle: 'Fresh Pasta Station',
    category: 'mains',
    isVegan: false,
    isVeggie: true,
    isGlutenFree: false,
    rating: 4.7,
    reviewsCount: 164,
    prices: {
      student: 3.70,
      staff: 5.20,
      guest: 6.90
    },
    kcal: 620,
    protein: '24g',
    tags: ['Vegetarian', 'Comfort Food'],
    description: 'Large hand-folded pasta dumplings stuffed with wild spinach and creamy ricotta, simmered in a slow-reduced San Marzano tomato-basil sauce with aged Grana Padano flakes.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    thermoBox: 'Box A3 • Kept at 74°C',
    customizations: [
      { id: 'extra-parmesan', name: 'Extra Grana Padano Cheese', price: 0.60 },
      { id: 'garlic-bread', name: 'Herbed Garlic Focaccia', price: 1.00 }
    ]
  },
  {
    id: 'm4',
    name: 'Crispy Mensa Schnitzel & Rosemary Herb Wedges',
    subtitle: 'Classic Bavarian Mensa Tradition',
    category: 'mains',
    isVegan: false,
    isVeggie: false,
    isGlutenFree: false,
    rating: 4.6,
    reviewsCount: 220,
    prices: {
      student: 4.50,
      staff: 6.10,
      guest: 7.90
    },
    kcal: 740,
    protein: '35g',
    tags: ['Classic', 'Popular'],
    description: 'Golden breaded pork escalope (tender Wiener style) with roasted rosemary potato wedges, tart lingonberry jam, and fresh lemon wedge.',
    image: 'https://images.unsplash.com/photo-1599921841143-819025383852?auto=format&fit=crop&w=800&q=80',
    thermoBox: 'Box A4 • Kept at 75°C',
    customizations: [
      { id: 'extra-lemon-jam', name: 'Extra Cranberry Dip', price: 0.50 },
      { id: 'fresh-cucumber-salad', name: 'Dill Cucumber Salad', price: 1.10 }
    ]
  },
  {
    id: 'm5',
    name: 'Red Lentil & Coconut Dahl with Cumin Flatbread',
    subtitle: 'Warming Ayurvedic Stew',
    category: 'mains',
    isVegan: true,
    isVeggie: true,
    isGlutenFree: true,
    rating: 4.8,
    reviewsCount: 89,
    prices: {
      student: 3.40,
      staff: 4.90,
      guest: 6.50
    },
    kcal: 480,
    protein: '21g',
    tags: ['Vegan', 'Gluten-Safe', 'Budget Hero'],
    description: 'Creamy red lentil dahl simmered with fresh ginger, mustard seeds, turmeric, and rich coconut milk. Served with baby spinach and coriander (flatbread served separately for GF).',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    thermoBox: 'Box A5 • Kept at 76°C',
    customizations: [
      { id: 'coconut-yoghurt', name: 'Swirl of Coconut Yogurt', price: 0.60 },
      { id: 'extra-bread', name: 'Warm Cumin Roti', price: 0.80 }
    ]
  }
];

// --- Ape Sideboard (Upsell Station: Coffee, Drinks, Desserts & Grab-and-Go) ---
export const SIDEBOARD_UPSELL_ITEMS = [
  {
    id: 'sb-coffee-1',
    name: 'Oat Milk Flat White (Double Shot)',
    subtitle: 'Barista Machine on the Ape',
    type: 'coffee',
    isVegan: true,
    isVeggie: true,
    isGlutenFree: true,
    price: 2.20,
    prepTime: 'Fresh pull on arrival',
    tag: 'Student Favorite',
    description: 'Locally roasted Fairtrade espresso pulled fresh from the Ape’s side espresso machine with micro-foamed Oatly Barista oat milk.',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80',
    temperature: 'Hot Barista Drink'
  },
  {
    id: 'sb-coffee-2',
    name: 'Classic Espresso Doppio (100% Arabica)',
    subtitle: 'Quick 30s Focus Booster',
    type: 'coffee',
    isVegan: true,
    isVeggie: true,
    isGlutenFree: true,
    price: 1.60,
    prepTime: 'Instant pickup',
    tag: 'Quick Fuel',
    description: 'Rich crema, notes of dark chocolate and roasted hazelnut. Ready to sip immediately at the ADL stand.',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80',
    temperature: 'Hot Barista Drink'
  },
  {
    id: 'sb-drink-1',
    name: 'Chilled Club-Mate (0.5L Bottle)',
    subtitle: 'The ADL Sprint Staple',
    type: 'drink',
    isVegan: true,
    isVeggie: true,
    isGlutenFree: true,
    price: 1.90,
    prepTime: 'Chilled in Ape Fridge',
    tag: 'High Caffeine',
    description: 'Ice-cold classic Berlin Club-Mate kept in the Ape’s sub-zero compartment. Pop the cap and code/design.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    temperature: 'Chilled 4°C'
  },
  {
    id: 'sb-drink-2',
    name: 'Fritz-Kola Original (0.33L Glass Bottle)',
    subtitle: 'Vielviel Koffein • Hamburg Classic',
    type: 'drink',
    isVegan: true,
    isVeggie: true,
    isGlutenFree: true,
    price: 1.80,
    prepTime: 'Chilled in Ape Fridge',
    tag: 'High Caffeine',
    description: 'Ice-cold original Fritz-Kola with real cola nut extract and extra caffeine. Crown-capped glass bottle straight from the side chiller.',
    image: '/fritz-kola.jpg',
    temperature: 'Chilled 4°C'
  },
  {
    id: 'sb-dessert-1',
    name: 'Warm Cinnamon Swirl Pastry (Franzbrötchen)',
    subtitle: 'Mensa Bakery Special',
    type: 'dessert',
    isVegan: true,
    isVeggie: true,
    isGlutenFree: false,
    price: 1.90,
    prepTime: 'Kept warm in Ape display',
    tag: 'Mensa Baked',
    description: 'Caramelized cinnamon crust with soft buttery-vegan pastry. Smells incredible as the Ape side hatch opens.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    temperature: 'Warm Display 45°C'
  },
  {
    id: 'sb-dessert-2',
    name: 'Gluten-Free Salted Caramel Brownie Cup',
    subtitle: 'Diet-Safe Sealed C4 Compliant',
    type: 'dessert',
    isVegan: true,
    isVeggie: true,
    isGlutenFree: true,
    price: 2.10,
    prepTime: 'Individually sealed',
    tag: 'Diet-Safe (GF/Vegan)',
    description: 'Certified 100% gluten-free and vegan dark chocolate fudge brownie topped with sea salt flakes and date caramel. Sealed tamper-evident container.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    temperature: 'Ambient / Sealed'
  },
  {
    id: 'sb-dessert-3',
    name: 'Mango & Coconut Chia Pudding Cup',
    subtitle: 'Refreshing Fruit Layer',
    type: 'dessert',
    isVegan: true,
    isVeggie: true,
    isGlutenFree: true,
    price: 2.00,
    prepTime: 'Chilled in Ape Fridge',
    tag: 'Refreshing & Light',
    description: 'Alphonso mango coulis layered with organic coconut-milk soaked chia seeds and toasted coconut chips. Light afternoon lift.',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80',
    temperature: 'Chilled 4°C'
  }
];

// Delivery Route / Campus Map points
export const CAMPUS_WAYPOINTS = [
  { id: 'mensa', name: 'Central Mensa Kitchen Hub', x: 12, y: 78, type: 'start', description: 'Food prepared & loaded into thermo-boxes' },
  { id: 'boulevard', name: 'Campus Academic Boulevard', x: 34, y: 62, type: 'waypoint', description: 'Passing Faculty of Engineering' },
  { id: 'library', name: 'Central Library Roundabout', x: 55, y: 48, type: 'waypoint', description: 'Ape cruising at 25 km/h' },
  { id: 'park', name: 'Innovation Garden Path', x: 74, y: 35, type: 'waypoint', description: 'Approaching the Design Quarter' },
  { id: 'adl', name: 'Agile Design Lab (ADL) Door', x: 88, y: 22, type: 'destination', description: 'Awning parked • Ready for 2-min pickup' }
];

export const MOCK_USER = {
  name: 'Elias Sch.',
  studentId: 'ST-884219',
  labCohort: 'ADL Master Studio 2026',
  campusCardBalance: 18.40,
  tier: 'student', // student | staff | guest
  dietaryLocks: {
    vegan: false,
    glutenFree: false,
    lactoseFree: false,
    nutFree: false
  },
  defaultTimeslot: 'slot-1',
  recentOrders: [
    {
      id: 'ORD-8821',
      date: 'Yesterday, 12:00 Break',
      timeslot: '12:00 - 12:25',
      items: ['Crispy Katsu Tofu Curry', 'Oat Milk Flat White'],
      total: 6.10,
      status: 'Completed',
      box: 'Ape Box #B1'
    },
    {
      id: 'ORD-7619',
      date: 'Nov 6, 13:00 Break',
      timeslot: '13:00 - 13:25',
      items: ['ADL Power Quinoa Bowl', 'Club-Mate'],
      total: 6.10,
      status: 'Completed',
      box: 'Ape Box #A3'
    }
  ]
};
