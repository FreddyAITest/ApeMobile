import React, { useState } from 'react';
import { Coffee, Plus, Check, Sparkles, Flame, Snowflake, ShieldCheck, Heart } from 'lucide-react';
import { SIDEBOARD_UPSELL_ITEMS } from '../data/menuData';
import ApeIllustration from './ApeIllustration';

export default function SideboardUpsell({ onAddToCart, cartItems }) {
  const [filter, setFilter] = useState('all');

  const filteredItems = SIDEBOARD_UPSELL_ITEMS.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  const getItemCountInCart = (id) => {
    const found = cartItems.find(item => item.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <section className="mt-8 mb-8 bg-gradient-to-br from-amber-500/15 via-orange-500/5 to-amber-100/30 rounded-3xl p-4 sm:p-6 border border-amber-300/80 shadow-sm relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

      {/* Header with Ape Side-Open Illustration */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 relative z-10">
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 bg-white rounded-2xl p-1 shadow-sm border border-amber-200 flex items-center justify-center shrink-0">
            <ApeIllustration variant="side-open" className="w-12 h-12" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                Ape Sideboard Station
              </span>
              <span className="text-amber-800 font-bold text-xs flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Physical Side Hatch Upsell
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Coffee, Chilled Drinks & Sealed Sweets
            </h2>
            <p className="text-xs text-slate-600 max-w-xl">
              Mounted right on the side of our Piaggio Ape! Fresh barista coffee with plant milk, Berlin Club-Mate, and diet-safe certified GF/vegan treats.
            </p>
          </div>
        </div>

        {/* Combo Special Card */}
        <div className="bg-white/90 backdrop-blur-xs border border-amber-300 rounded-2xl p-3 shrink-0 flex items-center gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-base">
            🎁
          </div>
          <div className="text-left text-xs">
            <span className="font-extrabold text-slate-900 block leading-tight">ADL Break Combo</span>
            <span className="text-[11px] text-amber-800">Add Drink + Sweet: <strong className="text-slate-950">Save €1.00</strong></span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 mb-4 relative z-10">
        {[
          { id: 'all', label: 'All Sideboard Items', emoji: '✨' },
          { id: 'coffee', label: 'Fresh Coffee (Oat Milk)', emoji: '☕' },
          { id: 'drink', label: 'Cold Drinks & Mate', emoji: '🥤' },
          { id: 'dessert', label: 'Mensa Sweets & GF', emoji: '🍰' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              filter === tab.id
                ? 'bg-slate-900 text-amber-300 shadow-sm'
                : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200'
            }`}
          >
            <span>{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Carousel / Grid of Sideboard Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
        {filteredItems.map(item => {
          const qty = getItemCountInCart(item.id);

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-3 border border-amber-200/90 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image & Temp Tag */}
                <div className="relative w-full h-28 rounded-xl overflow-hidden mb-2.5 bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    {item.type === 'coffee' ? (
                      <>
                        <Flame className="w-3 h-3 text-amber-400" />
                        <span>Hot Pull</span>
                      </>
                    ) : item.type === 'drink' ? (
                      <>
                        <Snowflake className="w-3 h-3 text-sky-400" />
                        <span>4°C Chilled</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span>Sealed</span>
                      </>
                    )}
                  </div>
                  {item.isGlutenFree && (
                    <span className="absolute top-2 right-2 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                      GF
                    </span>
                  )}
                </div>

                {/* Title & Tag */}
                <div className="mb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wide text-amber-700 block">
                    {item.tag}
                  </span>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Price & Add to Cart button */}
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                <span className="font-extrabold text-slate-950 text-sm">
                  €{item.price.toFixed(2)}
                </span>

                <button
                  onClick={() => onAddToCart(item)}
                  type="button"
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    qty > 0
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                      : 'bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-950 shadow-xs'
                  }`}
                >
                  {qty > 0 ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{qty} added</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
