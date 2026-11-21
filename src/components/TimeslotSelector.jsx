import React from 'react';
import { Check } from 'lucide-react';
import { TIMESLOTS } from '../data/menuData';

export default function TimeslotSelector({ selectedSlot, onSelectSlot, compact = false }) {
  return (
    <div>
      {!compact && (
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-sm font-extrabold tracking-tight text-slate-900">
              Choose your break
            </h2>
            <p className="text-xs text-slate-500">Pickup at the ADL entrance</p>
          </div>
          <span className="text-[11px] font-semibold text-slate-400">
            Order by {selectedSlot.cutoff}
          </span>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        {TIMESLOTS.map(slot => {
          const isSelected = selectedSlot.id === slot.id;

          return (
            <button
              key={slot.id}
              type="button"
              onClick={() => onSelectSlot(slot)}
              aria-pressed={isSelected}
              className={`relative rounded-2xl border px-2 py-3 text-center transition-all ${
                isSelected
                  ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-500/20'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              {isSelected && (
                <Check className="absolute right-2 top-2 h-3.5 w-3.5 text-amber-600" strokeWidth={3} />
              )}
              <span className="block text-base font-extrabold tracking-tight text-slate-900">
                {slot.time}
              </span>
              <span className={`block ${compact ? 'text-[10px]' : 'text-[11px]'} text-slate-500`}>
                {slot.label}
              </span>
              {!compact && (
                <span className="mt-1 block text-[10px] text-slate-400">
                  until {slot.cutoff}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
