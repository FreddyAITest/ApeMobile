import React, { useState } from 'react';
import { 
  Utensils, 
  Coffee, 
  Navigation, 
  User, 
  Clock, 
  MapPin, 
  Sparkles, 
  Leaf, 
  ShieldCheck, 
  Search, 
  ChevronRight,
  Filter,
  Flame
} from 'lucide-react';

import { TIMESLOTS, CATEGORIES, MENSA_ITEMS, SIDEBOARD_UPSELL_ITEMS, MOCK_USER } from './data/menuData';
import Header from './components/Header';
import TimeslotSelector from './components/TimeslotSelector';
import MenuCard from './components/MenuCard';
import SideboardUpsell from './components/SideboardUpsell';
import ItemModal from './components/ItemModal';
import CartDrawer from './components/CartDrawer';
import LiveTracker from './components/LiveTracker';
import AccountSettings from './components/AccountSettings';
import DemoToolbar from './components/DemoToolbar';
import ApeIllustration from './components/ApeIllustration';

export default function App() {
  // Navigation State: 'home' | 'sideboard' | 'tracker' | 'account'
  const [activeTab, setActiveTab] = useState('home');

  // Core Data States
  const [selectedSlot, setSelectedSlot] = useState(TIMESLOTS[0]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(MOCK_USER);

  // Cart & Orders State
  const [cartItems, setCartItems] = useState([
    // Start with 1 item for immediate delight
    {
      ...MENSA_ITEMS[0],
      quantity: 1,
      unitPrice: MENSA_ITEMS[0].prices.student,
      selectedAddons: [],
      reusableContainer: false
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedModalItem, setSelectedModalItem] = useState(null);
  const [isTimeslotModalOpen, setIsTimeslotModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  // View mode: Toggle phone frame vs full webapp
  const [isMobileView, setIsMobileView] = useState(false);

  // Cart Handlers
  const handleAddToCart = (itemToAdd) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => 
        item.id === itemToAdd.id && 
        JSON.stringify(item.selectedAddons || []) === JSON.stringify(itemToAdd.selectedAddons || [])
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += (itemToAdd.quantity || 1);
        return updated;
      } else {
        return [...prev, { ...itemToAdd, quantity: itemToAdd.quantity || 1 }];
      }
    });
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleOrderSuccess = (newOrder) => {
    setActiveOrder(newOrder);
    setCartItems([]);
    setActiveTab('tracker'); // Seamlessly direct to live tracker map!
  };

  const handleReorder = (pastOrder) => {
    // Add items from past order
    const sampleItem = MENSA_ITEMS[0];
    const sampleDrink = SIDEBOARD_UPSELL_ITEMS[0];
    setCartItems([
      { ...sampleItem, quantity: 1, unitPrice: sampleItem.prices[user.tier] },
      { ...sampleDrink, quantity: 1, unitPrice: sampleDrink.price }
    ]);
    setIsCartOpen(true);
  };

  const handleQuickLoadDemoOrder = () => {
    setCartItems([
      { ...MENSA_ITEMS[1], quantity: 1, unitPrice: MENSA_ITEMS[1].prices[user.tier] }, // ADL Quinoa Bowl
      { ...SIDEBOARD_UPSELL_ITEMS[0], quantity: 1, unitPrice: SIDEBOARD_UPSELL_ITEMS[0].price }, // Oat Flat White
      { ...SIDEBOARD_UPSELL_ITEMS[4], quantity: 1, unitPrice: SIDEBOARD_UPSELL_ITEMS[4].price }  // Salted Caramel Brownie
    ]);
    setIsCartOpen(true);
  };

  // Filtered dishes
  const filteredDishes = MENSA_ITEMS.filter(dish => {
    // Search match
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchName = dish.name.toLowerCase().includes(query);
      const matchDesc = dish.description.toLowerCase().includes(query);
      if (!matchName && !matchDesc) return false;
    }

    // Category match
    if (selectedCategory === 'vegan') return dish.isVegan;
    if (selectedCategory === 'veggie') return dish.isVeggie;
    if (selectedCategory === 'glutenfree') return dish.isGlutenFree;
    return true;
  });

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Core App UI Body
  const renderAppContent = () => (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div>
        {/* Navigation Header */}
        <Header
          selectedSlot={selectedSlot}
          onOpenTimeslots={() => setIsTimeslotModalOpen(true)}
          cartCount={cartTotalCount}
          onOpenCart={() => setIsCartOpen(true)}
          user={user}
          activeTab={activeTab}
          onNavigate={(tab) => setActiveTab(tab)}
        />

        {/* --- TAB 1: PRE-ORDER (HOME / MENSA MENU) --- */}
        {activeTab === 'home' && (
          <main className="max-w-5xl mx-auto px-4 py-5 pb-24">
            {/* Timeslot Selector Banner */}
            <TimeslotSelector
              selectedSlot={selectedSlot}
              onSelectSlot={(slot) => setSelectedSlot(slot)}
              variant="banner"
            />

            {/* --- UPSELL STATION: THE APE SIDEBOARD --- */}
            {/* Requested: "In addition we want to add on one side of the ape a 'upsell' part in which we are adding dessert and drinks" */}
            <SideboardUpsell
              onAddToCart={(item) => handleAddToCart(item)}
              cartItems={cartItems}
            />

            {/* --- MENSA MAIN COURSES SECTION --- */}
            <section className="mt-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-amber-600" />
                    <span>2. Choose Your Mensa Dish</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Freshly cooked at central Mensa • Transported to ADL in thermo-boxes (72°C)
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Mensa meals..."
                    className="pl-9 pr-4 py-1.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full sm:w-56 shadow-2xs"
                  />
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">
                {CATEGORIES.filter(c => c.id !== 'sideboard').map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Dishes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDishes.map(dish => {
                  const inCartItem = cartItems.find(i => i.id === dish.id);
                  const qty = inCartItem ? inCartItem.quantity : 0;

                  return (
                    <MenuCard
                      key={dish.id}
                      item={dish}
                      userTier={user.tier}
                      userDietaryLocks={user.dietaryLocks}
                      cartQuantity={qty}
                      onSelectItem={(item) => setSelectedModalItem(item)}
                      onQuickAdd={(item) => handleAddToCart({
                        ...item,
                        quantity: 1,
                        unitPrice: item.prices[user.tier]
                      })}
                    />
                  );
                })}
              </div>
            </section>
          </main>
        )}

        {/* --- TAB 2: DEDICATED SIDEBOARD VIEW --- */}
        {activeTab === 'sideboard' && (
          <main className="max-w-5xl mx-auto px-4 py-5 pb-24">
            <SideboardUpsell
              onAddToCart={(item) => handleAddToCart(item)}
              cartItems={cartItems}
            />

            {/* Sideboard Context Callout */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Why the Ape Sideboard?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Designed for fast 15-min breaks at the Agile Design Lab
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                4 out of 5 students at the ADL rely on coffee to stay focused, but there is no café nearby. When the Ape arrives with your pre-ordered hot meals, the left hatch opens to serve fresh barista espresso with Oatly oat milk, ice-cold Club-Mate, and certified gluten-free pastries right on site.
              </p>
            </div>
          </main>
        )}

        {/* --- TAB 3: LIVE TRACKER MAP --- */}
        {activeTab === 'tracker' && (
          <main className="py-4 pb-24">
            <LiveTracker
              activeOrder={activeOrder}
              onBackToMenu={() => setActiveTab('home')}
            />
          </main>
        )}

        {/* --- TAB 4: SETTINGS / ACCOUNT --- */}
        {activeTab === 'account' && (
          <main className="py-4 pb-24">
            <AccountSettings
              user={user}
              onUpdateUser={(updated) => setUser(updated)}
              onReorder={handleReorder}
            />
          </main>
        )}
      </div>

      {/* --- BOTTOM MOBILE-FIRST TAB BAR --- */}
      <nav 
        aria-label="Main Navigation"
        className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2 px-4 shadow-lg"
      >
        <div className="max-w-md mx-auto flex items-center justify-around">
          {[
            { id: 'home', label: 'Pre-Order', icon: Utensils },
            { id: 'sideboard', label: 'Ape Sideboard', icon: Coffee },
            { id: 'tracker', label: 'Ape Tracker', icon: Navigation, badge: activeOrder ? 'Live' : null },
            { id: 'account', label: 'Account', icon: User },
          ].map(tab => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all cursor-pointer ${
                  isActive
                    ? 'text-amber-600 font-extrabold'
                    : 'text-slate-500 hover:text-slate-800 font-medium'
                }`}
              >
                <div className="relative">
                  <tab.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
                  {tab.badge && (
                    <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </div>
                <span className="text-[11px] tracking-tight">{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 w-8 h-1 bg-amber-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Modals & Drawers */}
      {selectedModalItem && (
        <ItemModal
          item={selectedModalItem}
          userTier={user.tier}
          onClose={() => setSelectedModalItem(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onAddToCart={handleAddToCart}
        selectedSlot={selectedSlot}
        user={user}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Timeslot Quick-Select Modal */}
      {isTimeslotModalOpen && (
        <div
          onClick={() => setIsTimeslotModalOpen(false)}
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-extrabold text-slate-900 text-base">
                Switch Break Timeslot
              </h3>
              <button
                onClick={() => setIsTimeslotModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>
            <TimeslotSelector
              selectedSlot={selectedSlot}
              onSelectSlot={(slot) => {
                setSelectedSlot(slot);
                setIsTimeslotModalOpen(false);
              }}
              variant="modal"
            />
          </div>
        </div>
      )}

      {/* Floating Demo Control Bar */}
      <DemoToolbar
        isMobileView={isMobileView}
        onToggleMobileView={() => setIsMobileView(!isMobileView)}
        onQuickLoadDemoOrder={handleQuickLoadDemoOrder}
        onNavigate={(tab) => setActiveTab(tab)}
        activeTab={activeTab}
      />
    </div>
  );

  // If in Phone Mockup Preview Mode, wrap in realistic iPhone frame
  if (isMobileView) {
    return (
      <div className="min-h-screen bg-slate-900 py-8 px-4 flex flex-col items-center justify-center">
        {/* Device Wrapper Header */}
        <div className="text-center mb-4 text-white">
          <div className="inline-flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-full text-xs font-semibold text-amber-300 border border-slate-700">
            <span>📱 Mobile App View Mode (Ready for Capacitor / App Store)</span>
          </div>
        </div>

        {/* Realistic iPhone Phone Mockup Shell */}
        <div className="relative w-full max-w-[410px] h-[850px] bg-black rounded-[52px] p-3.5 shadow-2xl ring-1 ring-slate-700 overflow-hidden border-4 border-slate-800">
          {/* Dynamic Island Notch */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-between px-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
          </div>

          {/* Inner Phone Screen */}
          <div className="w-full h-full bg-white rounded-[40px] overflow-y-auto overflow-x-hidden relative no-scrollbar">
            {renderAppContent()}
          </div>

          {/* Home Indicator Bar */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full z-40" />
        </div>
      </div>
    );
  }

  // Normal Fullscreen Webapp
  return renderAppContent();
}
