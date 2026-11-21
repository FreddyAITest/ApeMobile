import React, { useState } from 'react';
import { QrCode, ChevronRight } from 'lucide-react';
import Header from './components/Header';
import TimeslotSelector from './components/TimeslotSelector';
import MenuCard from './components/MenuCard';
import SideboardSection from './components/SideboardSection';
import ItemModal from './components/ItemModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderConfirmation from './components/OrderConfirmation';
import { CATEGORIES, MENSA_ITEMS, SIDEBOARD_ITEMS, TIMESLOTS } from './data/menuData';

const STORAGE_KEY = 'ape-solutely-active-order';

function readStoredPickup() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function App() {
  const [selectedSlot, setSelectedSlot] = useState(TIMESLOTS[0]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [activePickup, setActivePickup] = useState(readStoredPickup);

  const matchesCategory = item => {
    if (selectedCategory === 'vegan') return item.isVegan;
    if (selectedCategory === 'veggie') return item.isVeggie;
    if (selectedCategory === 'glutenfree') return item.isGlutenFree;
    return true;
  };

  const dishes = MENSA_ITEMS.filter(matchesCategory);
  const sideboard = SIDEBOARD_ITEMS.filter(matchesCategory);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (item, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(entry => entry.id === item.id);

      if (existing) {
        return prev.map(entry =>
          entry.id === item.id
            ? { ...entry, quantity: entry.quantity + quantity }
            : entry
        );
      }

      return [...prev, { ...item, quantity }];
    });
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }

    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = id => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleConfirmOrder = ({ name, paymentMethod }) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const id = `APE-${Math.floor(1000 + Math.random() * 9000)}`;
    const pickupCode = String(Math.floor(1000 + Math.random() * 9000));
    const token =
      globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
    const compartment = ['A1', 'A2', 'B1', 'B3'][Math.floor(Math.random() * 4)];

    const order = {
      id,
      items: cartItems,
      total,
      slot: selectedSlot,
      customerName: name,
      paymentMethod,
      pickupCode,
      compartment,
      qrPayload: `https://ape-solutely.example/pickup/${id}?code=${pickupCode}&token=${token}`
    };

    setConfirmedOrder(order);
    setActivePickup(order);
    setCartItems([]);
    setIsCheckoutOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
    } catch {
      // Storage can be unavailable in private mode; the flow still works.
    }
  };

  const handleBackToMenu = () => {
    setConfirmedOrder(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowPickup = () => {
    if (!activePickup) return;
    setConfirmedOrder(activePickup);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearPickup = () => {
    setActivePickup(null);
    setConfirmedOrder(null);

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors.
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF8] text-slate-900">
      <Header cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />

      {confirmedOrder ? (
        <OrderConfirmation
          order={confirmedOrder}
          onBack={handleBackToMenu}
          onClear={handleClearPickup}
        />
      ) : (
        <main className="mx-auto w-full max-w-4xl px-4 pb-20 sm:px-6">
          {activePickup && (
            <button
              type="button"
              onClick={handleShowPickup}
              className="mt-6 flex w-full items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-left transition-colors hover:bg-amber-100/70"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-amber-700">
                <QrCode className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-slate-900">
                  Pickup reserved
                </p>
                <p className="truncate text-[10px] text-amber-800">
                  {activePickup.slot.window} · {activePickup.id}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-amber-700" />
            </button>
          )}

          <section className="pb-8 pt-10 sm:pb-10 sm:pt-14">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Mensa shuttle for the Agile Design Lab
            </span>

            <h1 className="mt-4 max-w-xl text-3xl font-black leading-[1.1] tracking-tight sm:text-4xl">
              Lunch, right at your break.
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-600">
              Pre-order a Mensa dish, coffee or treat. The Ape parks at the ADL
              entrance and hands it over — hot, chilled or sealed.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-600">
              <span className="rounded-full border border-stone-200 bg-white px-2.5 py-1">
                Pickup at the ADL door
              </span>
              <span className="rounded-full border border-stone-200 bg-white px-2.5 py-1">
                Vegan & gluten-free options
              </span>
            </div>
          </section>

          <section className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5">
            <TimeslotSelector
              selectedSlot={selectedSlot}
              onSelectSlot={setSelectedSlot}
            />
          </section>

          <section className="pt-10">
            <div>
              <h2 className="text-xl font-black tracking-tight">Today's menu</h2>
              <p className="mt-1 text-xs text-slate-500">
                Student prices · fresh from the Mensa kitchen
              </p>
            </div>

            <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
              {CATEGORIES.map(category => {
                const isActive = selectedCategory === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    aria-pressed={isActive}
                    className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                      isActive
                        ? 'bg-slate-900 text-white'
                        : 'border border-stone-200 bg-white text-slate-600 hover:border-stone-300'
                    }`}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>

            {dishes.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-extrabold tracking-tight">Mensa dishes</h3>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  {dishes.map(dish => (
                    <MenuCard
                      key={dish.id}
                      item={dish}
                      onSelect={setSelectedItem}
                      onAdd={item => handleAddToCart(item)}
                    />
                  ))}
                </div>
              </div>
            )}

            {sideboard.length > 0 && (
              <div className="mt-10">
                <h3 className="text-sm font-extrabold tracking-tight">Coffee & treats</h3>
                <p className="mt-1 text-xs text-slate-500">From the Ape sideboard</p>
                <div className="mt-3">
                  <SideboardSection
                    items={sideboard}
                    onSelect={setSelectedItem}
                    onAdd={item => handleAddToCart(item)}
                  />
                </div>
              </div>
            )}

            {dishes.length === 0 && sideboard.length === 0 && (
              <div className="mt-8 rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center">
                <p className="text-sm font-bold text-slate-800">Nothing matches this filter.</p>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className="mt-2 text-xs font-semibold text-amber-700 hover:underline"
                >
                  Show all items
                </button>
              </div>
            )}
          </section>
        </main>
      )}

      <footer className="mt-auto border-t border-stone-200/80">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-1.5 px-4 py-6 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>Ape-solutely · Mensa shuttle for the Agile Design Lab</span>
          <span>Prototype · Allergen information is indicative. Please ask on site.</span>
        </div>
      </footer>

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        selectedSlot={selectedSlot}
        onSelectSlot={setSelectedSlot}
        onCheckout={handleOpenCheckout}
      />

      {isCheckoutOpen && (
        <CheckoutModal
          cartItems={cartItems}
          selectedSlot={selectedSlot}
          onClose={() => setIsCheckoutOpen(false)}
          onConfirm={handleConfirmOrder}
        />
      )}
    </div>
  );
}
