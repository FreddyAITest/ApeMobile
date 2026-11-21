import React from 'react';
import { ShoppingBag } from 'lucide-react';
import ApeIllustration from './ApeIllustration';

export default function Header({ cartCount, onOpenCart }) {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-[#FAFAF8]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-4xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-200 bg-amber-100">
            <ApeIllustration variant="standard" className="h-7 w-7" />
          </div>
          <div>
            <span className="block text-base font-extrabold leading-none tracking-tight text-slate-900">
              Ape-solutely
            </span>
            <span className="mt-0.5 block text-[11px] text-slate-500">
              Mensa shuttle · ADL
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenCart}
          className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-900 transition-colors hover:border-stone-300"
          aria-label="Open your order"
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">Your order</span>
          {cartCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1.5 text-[11px] font-black text-slate-950">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
