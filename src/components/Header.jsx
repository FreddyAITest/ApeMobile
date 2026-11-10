import React from 'react';
import { Clock, MapPin, ShoppingBag, CreditCard, Sparkles } from 'lucide-react';
import ApeIllustration from './ApeIllustration';

export default function Header({ 
  selectedSlot, 
  onOpenTimeslots, 
  cartCount, 
  onOpenCart, 
  user,
  activeTab,
  onNavigate
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro-bar: Location & Cut-off reminder */}
      <div className="bg-amber-500 text-slate-900 px-4 py-1.5 text-xs font-semibold flex items-center justify-between">
        <div className="flex items-center gap-1.5 truncate">
          <MapPin className="w-3.5 h-3.5 text-slate-950 shrink-0" />
          <span className="truncate">Destination: <strong className="text-black">Agile Design Lab (ADL) Front Door</strong></span>
        </div>
        <div className="hidden sm:flex items-center gap-1 bg-amber-400/90 text-amber-950 px-2 py-0.5 rounded-full text-[11px] font-bold">
          <Clock className="w-3 h-3" />
          <span>Cut-off: {selectedSlot.cutoffTime}</span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand & Logo */}
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center border border-amber-300 group-hover:bg-amber-200 transition-colors">
            <ApeIllustration variant="standard" className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 leading-none">
                Ape-solutely
              </span>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                Mensa
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Break Shuttle for the ADL</p>
          </div>
        </button>

        {/* Center / Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Timeslot Quick-Chip */}
          <button
            onClick={onOpenTimeslots}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 border border-slate-300/80 px-2.5 py-1.5 rounded-xl transition-all text-xs font-semibold text-slate-800"
            title="Change your break timeslot"
          >
            <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <div className="text-left">
              <span className="hidden xs:inline text-slate-500 font-normal text-[10px] block leading-none">Slot:</span>
              <span className="font-bold text-slate-900 leading-none">{selectedSlot.time.split(' ')[0]} Break</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </button>

          {/* Mensa Card Quick Balance */}
          <button 
            onClick={() => onNavigate('account')}
            className="hidden md:flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 px-2.5 py-1.5 rounded-xl text-xs font-bold text-emerald-800 transition-colors"
            title="MensaCard Balance"
          >
            <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
            <span>€{user.campusCardBalance.toFixed(2)}</span>
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 px-3.5 py-2 rounded-xl font-bold text-xs shadow-sm transition-all"
            aria-label="View shopping cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Lunch Box</span>
            {cartCount > 0 && (
              <span className="bg-slate-950 text-amber-300 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
