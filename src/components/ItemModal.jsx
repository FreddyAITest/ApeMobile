import React, { useEffect, useRef, useState } from 'react';
import { X, Flame, ShieldCheck, Plus, Minus, Check, Sparkles, AlertCircle } from 'lucide-react';

export default function ItemModal({ item, userTier, onClose, onAddToCart }) {
  const dialogRef = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [reusableContainer, setReusableContainer] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  const handleClose = () => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.close();
    }
    onClose();
  };

  const toggleAddon = (addon) => {
    if (selectedAddons.some(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  if (!item) return null;

  const basePrice = item.prices ? (item.prices[userTier] || item.prices.student) : item.price;
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const discount = reusableContainer ? 0.30 : 0;
  const totalPrice = Math.max(0, (basePrice + addonsTotal - discount) * quantity);

  const handleConfirm = () => {
    onAddToCart({
      ...item,
      selectedAddons,
      reusableContainer,
      unitPrice: basePrice + addonsTotal - discount,
      quantity
    });
    handleClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="modal-dish-title"
      className="p-0 rounded-3xl max-w-lg w-full bg-white shadow-2xl border border-slate-200 overflow-hidden backdrop:bg-slate-900/60 backdrop:backdrop-blur-xs text-slate-900"
    >
      <div className="relative max-h-[90vh] overflow-y-auto">
        {/* Header Image */}
        <div className="relative h-56 w-full bg-slate-900">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleClose}
            type="button"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {item.thermoBox && (
            <div className="absolute bottom-3 left-3 bg-slate-900/90 text-amber-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{item.thermoBox}</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              {item.subtitle || 'Mensa Selection'}
            </span>
            <div className="flex items-center gap-1.5">
              {item.isVegan && (
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Vegan
                </span>
              )}
              {item.isGlutenFree && (
                <span className="bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Gluten-Free (C4 Safe)
                </span>
              )}
            </div>
          </div>

          <h2 id="modal-dish-title" className="text-xl sm:text-2xl font-black text-slate-950 leading-tight">
            {item.name}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            {item.description}
          </p>

          {/* Nutritional / Diet details */}
          {item.kcal && (
            <div className="flex items-center gap-4 my-4 p-3 bg-slate-50 rounded-2xl text-xs text-slate-700 border border-slate-100">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Energy</span>
                <span className="font-extrabold text-slate-900">{item.kcal} kcal</span>
              </div>
              <div className="w-px h-6 bg-slate-200" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Protein</span>
                <span className="font-extrabold text-slate-900">{item.protein}</span>
              </div>
              <div className="w-px h-6 bg-slate-200" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Ape Transport</span>
                <span className="font-extrabold text-amber-700">Heated Box</span>
              </div>
            </div>
          )}

          {/* Customization Addons */}
          {item.customizations && item.customizations.length > 0 && (
            <div className="mt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                Customize Your Meal
              </h3>
              <div className="space-y-2">
                {item.customizations.map(addon => {
                  const isChecked = selectedAddons.some(a => a.id === addon.id);

                  return (
                    <label
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked 
                          ? 'bg-amber-50/70 border-amber-400 font-semibold' 
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isChecked ? 'bg-amber-500 border-amber-600 text-slate-950' : 'border-slate-300'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs text-slate-800">{addon.name}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-950">+€{addon.price.toFixed(2)}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Zero waste reusable container discount */}
          <div className="mt-4 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">🌱</span>
              <div>
                <span className="text-xs font-bold text-emerald-950 block">Bring own Tupperware / ADL Bowl</span>
                <span className="text-[11px] text-emerald-700">Receive dish in exchangeable heated container (-€0.30)</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setReusableContainer(!reusableContainer)}
              className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                reusableContainer ? 'bg-emerald-600 border-emerald-700 text-white' : 'border-emerald-300 bg-white'
              }`}
            >
              {reusableContainer && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-slate-100 p-4 sm:p-5 flex items-center justify-between gap-3 shadow-lg">
          {/* Quantity stepper */}
          <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              type="button"
              className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 shadow-2xs font-bold transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-black text-slate-900">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              type="button"
              className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 shadow-2xs font-bold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to order button */}
          <button
            onClick={handleConfirm}
            type="button"
            className="flex-1 bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-slate-950 font-black px-4 py-3 rounded-2xl flex items-center justify-between text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-all cursor-pointer"
          >
            <span>Add to Ape Box</span>
            <span>€{totalPrice.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </dialog>
  );
}
