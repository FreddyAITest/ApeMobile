import React, { useEffect, useRef, useState } from 'react';
import { X, Plus, Minus, Info } from 'lucide-react';
import DietBadges from './DietBadges';

export default function ItemModal({ item, onClose, onAddToCart }) {
  const dialogRef = useRef(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  const handleClose = () => {
    dialogRef.current?.close();
    onClose();
  };

  if (!item) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="item-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-3xl border border-stone-200 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-900/50 backdrop:backdrop-blur-sm"
    >
      <div className="relative max-h-[90vh] overflow-y-auto">
        <div className="relative h-44 w-full bg-stone-100">
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm backdrop-blur transition-colors hover:bg-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5">
          <h2 id="item-title" className="text-xl font-black leading-tight tracking-tight">
            {item.name}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>

          <div className="mt-4">
            <DietBadges item={item} />
          </div>

          <div className="mt-5 rounded-2xl border border-stone-200 bg-stone-50 p-3.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <Info className="h-3.5 w-3.5" />
              Allergens
            </div>
            <p className="mt-1 text-xs font-semibold text-slate-800">
              {item.allergens.length > 0
                ? item.allergens.join(', ')
                : 'No major allergens listed.'}
            </p>
            <p className="mt-1 text-[10px] leading-relaxed text-slate-400">
              Information is indicative. Please ask the staff on site.
            </p>
          </div>
        </div>

        <div className="sticky bottom-0 flex items-center justify-between gap-3 border-t border-stone-100 bg-white p-4">
          <div className="flex items-center rounded-full border border-stone-200 bg-stone-50 p-1">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-black">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm"
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              onAddToCart(item, quantity);
              handleClose();
            }}
            className="flex flex-1 items-center justify-between rounded-full bg-amber-500 px-4 py-3 text-xs font-black text-slate-950 transition-colors hover:bg-amber-400"
          >
            <span>Add to order</span>
            <span>€{(item.price * quantity).toFixed(2)}</span>
          </button>
        </div>
      </div>
    </dialog>
  );
}
