import React from 'react';
import { Clock, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { TIMESLOTS } from '../data/menuData';

export default function TimeslotSelector({ 
  selectedSlot, 
  onSelectSlot, 
  variant = 'banner' // 'banner' | 'modal'
}) {
  return (
    <div className={variant === 'modal' ? 'p-1' : 'mb-6'}>
      {/* Pitch Problem/Solution Context Pill */}
      {variant === 'banner' && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-l-4 border-amber-500 p-3 rounded-r-xl mb-4 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-amber-950 mb-0.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>ADL 15–30 Min Break Guarantee</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Mensa is 10 min walk away? Pick your break slot below. The Ape collects all meals at the Mensa and parks hot & ready right at the <strong className="text-slate-900">ADL door</strong> with coffee on board!
          </p>
        </div>
      )}

      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>1. Select Your Break Timeslot</span>
          </h2>
          <p className="text-xs text-slate-500">Meals arrive in heated thermo-boxes 5 min before break begins</p>
        </div>
        <span className="text-[11px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full">
          Pre-Order Today
        </span>
      </div>

      {/* Grid of the 3 Timeslots */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {TIMESLOTS.map((slot) => {
          const isSelected = selectedSlot.id === slot.id;

          return (
            <button
              key={slot.id}
              onClick={() => onSelectSlot(slot)}
              type="button"
              className={`relative text-left p-3.5 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20 shadow-md'
                  : 'bg-white hover:bg-slate-50/80 border-slate-200 shadow-xs'
              }`}
            >
              {/* Top Row: Time & Badge */}
              <div className="flex items-start justify-between gap-1 mb-1.5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    {slot.breakName}
                  </span>
                  <div className="text-lg font-extrabold text-slate-950 flex items-center gap-1.5">
                    {slot.time}
                  </div>
                </div>
                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                )}
              </div>

              {/* Description */}
              <p className="text-[11px] text-slate-600 leading-tight mb-2.5">
                {slot.description}
              </p>

              {/* Footer: Cutoff & Capacity */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px]">
                <div className="flex items-center gap-1 text-amber-900 font-bold bg-amber-200/60 px-1.5 py-0.5 rounded">
                  <Clock className="w-3 h-3 text-amber-700" />
                  <span>Cut-off: {slot.cutoffTime}</span>
                </div>
                <span className="text-slate-500 font-medium">
                  {slot.spotsLeft} meals left
                </span>
              </div>

              {/* Selected corner accent */}
              {isSelected && (
                <div className="absolute -top-2 -right-1 bg-amber-500 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                  Active Slot
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
