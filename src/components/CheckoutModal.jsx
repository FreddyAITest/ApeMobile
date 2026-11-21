import React, { useEffect, useState } from 'react';
import {
  X,
  Clock,
  MapPin,
  Wallet,
  Smartphone,
  CreditCard,
  Loader2,
  Lock
} from 'lucide-react';

const PAYMENT_METHODS = [
  {
    id: 'mensacard',
    label: 'MensaCard',
    hint: 'Campus balance',
    icon: Wallet
  },
  {
    id: 'applepay',
    label: 'Apple Pay',
    hint: 'Instant',
    icon: Smartphone
  },
  {
    id: 'card',
    label: 'Card',
    hint: 'Visa · Mastercard',
    icon: CreditCard
  }
];

export default function CheckoutModal({ cartItems, selectedSlot, onClose, onConfirm }) {
  const [name, setName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('mensacard');
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (!isProcessing) return;

    const timer = setTimeout(() => {
      onConfirm({ name: name.trim(), paymentMethod });
    }, 1400);

    return () => clearTimeout(timer);
  }, [isProcessing, name, paymentMethod, onConfirm]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        onClick={isProcessing ? undefined : onClose}
        className="fixed inset-0 bg-slate-900/45 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <div>
            <h2 className="text-base font-black tracking-tight">
              {isProcessing ? 'Confirming order' : 'Checkout'}
            </h2>
            <p className="text-[11px] text-slate-500">
              {isProcessing ? 'Please wait a moment' : `${count} item${count === 1 ? '' : 's'} · ${selectedSlot.window}`}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-slate-600 transition-colors hover:bg-stone-200 disabled:opacity-40"
            aria-label="Close checkout"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {isProcessing ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
            <p className="mt-4 text-sm font-bold text-slate-900">Processing payment…</p>
            <p className="mt-1 text-xs text-slate-500">
              Reserving your heated box at the Ape.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
              <div className="space-y-3 rounded-2xl border border-stone-200 bg-stone-50/60 p-4">
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 text-amber-600" />
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Pickup
                    </span>
                    <p className="text-xs font-bold text-slate-900">
                      {selectedSlot.window} · {selectedSlot.label}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-amber-600" />
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Where
                    </span>
                    <p className="text-xs font-bold text-slate-900">
                      ADL main entrance · Ape awning
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="pickup-name"
                  className="text-[11px] font-bold uppercase tracking-wider text-slate-500"
                >
                  Name for pickup
                </label>
                <input
                  id="pickup-name"
                  type="text"
                  value={name}
                  onChange={event => setName(event.target.value)}
                  placeholder="e.g. Alex"
                  autoComplete="name"
                  className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Pay with
                </span>
                <div className="mt-2 space-y-2">
                  {PAYMENT_METHODS.map(method => {
                    const Icon = method.icon;
                    const isActive = paymentMethod === method.id;

                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        aria-pressed={isActive}
                        className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-all ${
                          isActive
                            ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-500/20'
                            : 'border-stone-200 bg-white hover:border-stone-300'
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 ${isActive ? 'text-amber-600' : 'text-slate-400'}`}
                        />
                        <span className="flex-1">
                          <span className="block text-xs font-bold text-slate-900">
                            {method.label}
                          </span>
                          <span className="block text-[10px] text-slate-500">{method.hint}</span>
                        </span>
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                            isActive ? 'border-amber-500 bg-amber-500' : 'border-stone-300'
                          }`}
                        >
                          {isActive && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <p className="rounded-xl bg-stone-100 px-3 py-2 text-[10px] leading-relaxed text-slate-500">
                Demo checkout · No real payment is taken.
              </p>
            </div>

            <div className="border-t border-stone-200 px-5 py-4">
              <div className="mb-3 flex items-center justify-between text-sm font-black">
                <span>Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsProcessing(true)}
                disabled={!name.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-3.5 text-sm font-black text-slate-950 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-slate-400"
              >
                <Lock className="h-4 w-4" />
                Pay €{total.toFixed(2)} & reserve
              </button>
              {!name.trim() && (
                <p className="mt-2 text-center text-[10px] text-slate-400">
                  Add your name to continue.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
