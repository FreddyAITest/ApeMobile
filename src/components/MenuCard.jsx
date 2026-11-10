import React from 'react';
import { Plus, Flame, Star, ShieldCheck, Leaf, Utensils, Check } from 'lucide-react';

export default function MenuCard({ 
  item, 
  userTier = 'student', 
  onSelectItem, 
  onQuickAdd,
  cartQuantity = 0,
  userDietaryLocks
}) {
  const currentPrice = item.prices[userTier] || item.prices.student;

  // Check if item violates user dietary preference lock
  const isDietViolated = (userDietaryLocks?.vegan && !item.isVegan) ||
                         (userDietaryLocks?.glutenFree && !item.isGlutenFree);

  return (
    <div className={`bg-white rounded-3xl p-4 border transition-all duration-200 flex flex-col justify-between group ${
      isDietViolated 
        ? 'opacity-60 border-slate-200 bg-slate-50/50' 
        : 'border-slate-200/90 hover:border-amber-400 hover:shadow-lg hover:-translate-y-0.5'
    }`}>
      <div>
        {/* Top Image Container */}
        <div 
          onClick={() => onSelectItem(item)}
          className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-100 cursor-pointer mb-3.5"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Thermo-box badge */}
          <div className="absolute top-2.5 left-2.5 bg-slate-900/85 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Flame className="w-3 h-3 text-amber-400" />
            <span>{item.thermoBox}</span>
          </div>

          {/* Dietary Shield / Vegan pill */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
            {item.isVegan && (
              <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                <Leaf className="w-3 h-3" />
                <span>Vegan</span>
              </span>
            )}
            {item.isGlutenFree && (
              <span className="bg-sky-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                <ShieldCheck className="w-3 h-3" />
                <span>GF</span>
              </span>
            )}
          </div>

          {/* Nutrition Floating Pill */}
          <div className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-slate-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-2">
            <span>{item.kcal} kcal</span>
            <span className="w-1 h-1 rounded-full bg-slate-400" />
            <span className="text-amber-800 font-bold">{item.protein} protein</span>
          </div>
        </div>

        {/* Content details */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
              {item.subtitle}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{item.rating}</span>
              <span className="text-slate-400 font-normal">({item.reviewsCount})</span>
            </div>
          </div>

          <h3 
            onClick={() => onSelectItem(item)}
            className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors cursor-pointer leading-snug"
          >
            {item.name}
          </h3>

          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {item.tags.map(tag => (
              <span 
                key={tag}
                className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing & Add to Order */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        {/* Tier Price & Alt info */}
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-slate-950">
              €{currentPrice.toFixed(2)}
            </span>
            <span className="text-[11px] text-slate-500 uppercase font-semibold">
              /{userTier}
            </span>
          </div>
          <div className="text-[10px] text-slate-400">
            {userTier === 'student' ? 'Student MensaCard Rate' : `${userTier.toUpperCase()} rate`}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onSelectItem(item)}
            type="button"
            className="text-xs text-slate-600 hover:text-slate-900 font-bold px-2.5 py-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Customize
          </button>

          <button
            onClick={() => onQuickAdd(item)}
            type="button"
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              cartQuantity > 0
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                : 'bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 shadow-sm shadow-amber-500/20'
            }`}
          >
            {cartQuantity > 0 ? (
              <>
                <Check className="w-4 h-4" />
                <span>{cartQuantity} in Box</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add to Box</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
