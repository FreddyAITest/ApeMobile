import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import TimeslotSelector from './TimeslotSelector';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  selectedSlot,
  onSelectSlot,
  onCheckout
}) {
  if (!isOpen) return null;

  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-200 px-4 py-4">
          <div>
            <h2 className="text-base font-black tracking-tight">Your order</h2>
            <p className="text-[11px] text-slate-500">
              {count === 0 ? 'Nothing added yet' : `${count} item${count === 1 ? '' : 's'}`}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-slate-600 transition-colors hover:bg-stone-200"
            aria-label="Close order"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {cartItems.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center px-6 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-2xl">
                🛵
              </div>
              <p className="text-sm font-bold text-slate-800">Your order is empty</p>
              <p className="mt-1 max-w-xs text-xs text-slate-500">
                Add a Mensa dish, a coffee or a treat from the Ape.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-2xl border border-stone-200/80 bg-stone-50/60 p-2.5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-12 w-12 shrink-0 rounded-xl bg-stone-200 object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-xs font-bold text-slate-900">{item.name}</h3>
                    <p className="text-[11px] text-slate-500">€{item.price.toFixed(2)} each</p>
                  </div>

                  <div className="flex shrink-0 items-center rounded-full border border-stone-200 bg-white">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="flex h-7 w-7 items-center justify-center text-slate-600"
                      aria-label={`Decrease ${item.name}`}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-5 text-center text-[11px] font-bold">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center text-slate-600"
                      aria-label={`Increase ${item.name}`}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1 text-slate-400 transition-colors hover:text-rose-600"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}

              <div className="pt-5">
                <TimeslotSelector
                  selectedSlot={selectedSlot}
                  onSelectSlot={onSelectSlot}
                  compact
                />
                <p className="mt-2 text-[11px] text-slate-400">
                  Order by {selectedSlot.cutoff} for pickup in this break.
                </p>
              </div>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="space-y-3 border-t border-stone-200 px-4 py-4">
            <div className="flex items-center justify-between text-sm font-black">
              <span>Total</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Demo checkout · No real payment taken
            </p>
            <button
              type="button"
              onClick={onCheckout}
              className="flex w-full items-center justify-between rounded-full bg-amber-500 px-5 py-3.5 text-sm font-black text-slate-950 transition-colors hover:bg-amber-400"
            >
              <span>Continue to checkout</span>
              <span className="flex items-center gap-1.5">
                €{subtotal.toFixed(2)}
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
