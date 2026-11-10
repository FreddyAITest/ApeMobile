import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Clock, MapPin, CreditCard, Sparkles, Coffee, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SIDEBOARD_UPSELL_ITEMS } from '../data/menuData';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onAddToCart,
  selectedSlot,
  user,
  onOrderSuccess
}) {
  const [paymentMethod, setPaymentMethod] = useState('mensacard');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const itemPrice = item.unitPrice || (item.prices ? item.prices[user.tier] : item.price);
    return sum + (itemPrice * item.quantity);
  }, 0);

  // Check if user already added coffee or dessert
  const hasCoffeeOrDrink = cartItems.some(i => i.type === 'coffee' || i.type === 'drink');
  const hasDessert = cartItems.some(i => i.type === 'dessert');

  // Quick upsell recommendation
  const recommendedUpsell = !hasCoffeeOrDrink 
    ? SIDEBOARD_UPSELL_ITEMS.find(i => i.id === 'sb-coffee-1') 
    : (!hasDessert ? SIDEBOARD_UPSELL_ITEMS.find(i => i.id === 'sb-dessert-2') : null);

  const handleCheckout = () => {
    setIsSubmitting(true);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      // ignore
    }

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderSuccess({
        id: `APE-${Math.floor(1000 + Math.random() * 9000)}`,
        items: cartItems,
        total: subtotal,
        timeslot: selectedSlot,
        date: 'Today, ' + selectedSlot.time,
        box: `Compartment ${['A-1', 'A-2', 'B-1', 'B-3'][Math.floor(Math.random() * 4)]}`,
        pickupPin: `${Math.floor(1000 + Math.random() * 9000)}`,
        orderTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-950 flex items-center gap-2">
              <span>Your Ape Lunch Box</span>
              <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>Delivered to <strong>ADL Front Door</strong></span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Timeslot Confirmation Box */}
        <div className="p-3 mx-4 mt-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-amber-950 block">{selectedSlot.breakName}</span>
              <span className="text-amber-800 text-[11px]">Pick up between {selectedSlot.time}</span>
            </div>
          </div>
          <span className="bg-amber-200 text-amber-900 text-[10px] font-black uppercase px-2 py-0.5 rounded">
            Heated Box
          </span>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center text-2xl mb-3">
                🛵
              </div>
              <p className="font-bold text-slate-800 text-sm">Your Ape Box is empty</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Select your Mensa favorite and add an oat flat white or chilled Club-Mate from the Ape sideboard.
              </p>
            </div>
          ) : (
            cartItems.map((item) => {
              const itemPrice = item.unitPrice || (item.prices ? item.prices[user.tier] : item.price);
              
              return (
                <div 
                  key={item.id + (item.selectedAddons ? JSON.stringify(item.selectedAddons) : '')}
                  className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-13 h-13 rounded-xl object-cover shrink-0 bg-slate-200"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900 text-xs truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        €{itemPrice.toFixed(2)} each
                        {item.reusableContainer && (
                          <span className="text-emerald-600 block text-[10px] font-bold">
                            🌱 Own bowl (-€0.30)
                          </span>
                        )}
                        {item.selectedAddons && item.selectedAddons.length > 0 && (
                          <span className="text-slate-400 block text-[10px] truncate">
                            +{item.selectedAddons.map(a => a.name).join(', ')}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center border border-slate-300 rounded-lg bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-slate-900">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}

          {/* Quick Upsell Recommendation from the Ape Sideboard */}
          {cartItems.length > 0 && recommendedUpsell && (
            <div className="mt-4 p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-amber-800 tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Sideboard Upsell Suggestion</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <img
                    src={recommendedUpsell.image}
                    alt={recommendedUpsell.name}
                    className="w-10 h-10 rounded-lg object-cover bg-amber-200"
                  />
                  <div>
                    <h5 className="font-bold text-xs text-slate-900 leading-tight">
                      {recommendedUpsell.name}
                    </h5>
                    <span className="text-[11px] text-amber-900 font-extrabold">
                      +€{recommendedUpsell.price.toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onAddToCart(recommendedUpsell)}
                  className="bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-950 text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-xs transition-all flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer: Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-white space-y-4">
            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal ({user.tier} pricing)</span>
                <span className="font-medium text-slate-900">€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Ape Shuttle Delivery to ADL</span>
                <span className="font-bold text-emerald-600">FREE (Campus Subsidized)</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-950 pt-2 border-t border-slate-100">
                <span>Total to Pay</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Pay With
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mensacard')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    paymentMethod === 'mensacard'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-500/30'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="text-left truncate">
                    <span className="block leading-none text-xs">MensaCard</span>
                    <span className="text-[10px] text-emerald-700">€{user.campusCardBalance.toFixed(2)}</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('applepay')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    paymentMethod === 'applepay'
                      ? 'bg-slate-900 border-slate-950 text-white font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="text-base"></span>
                  <div className="text-left">
                    <span className="block leading-none text-xs">Apple / Card</span>
                    <span className="text-[10px] text-slate-400">Instant</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-slate-950 font-black py-3.5 px-4 rounded-2xl flex items-center justify-between text-sm shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
            >
              <span>{isSubmitting ? 'Reserving Ape Box...' : 'Confirm Pre-Order for ADL'}</span>
              <div className="flex items-center gap-1.5 font-black">
                <span>€{subtotal.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
