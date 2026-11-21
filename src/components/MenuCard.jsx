import React from 'react';
import { Plus } from 'lucide-react';
import DietBadges from './DietBadges';

export default function MenuCard({ item, onSelect, onAdd }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white">
      <button
        type="button"
        onClick={() => onSelect(item)}
        className="h-40 w-full overflow-hidden bg-stone-100 text-left"
        aria-label={`View details for ${item.name}`}
      >
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </button>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <button
            type="button"
            onClick={() => onSelect(item)}
            className="text-left text-[15px] font-extrabold leading-snug tracking-tight text-slate-900"
          >
            {item.name}
          </button>
          <span className="shrink-0 text-sm font-extrabold text-slate-900">
            €{item.price.toFixed(2)}
          </span>
        </div>

        <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
          {item.description}
        </p>

        <div className="mt-3">
          <DietBadges item={item} />
        </div>

        {item.allergens.length > 0 && (
          <p className="mt-2 text-[11px] text-slate-400">
            Contains: {item.allergens.join(', ')}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <button
            type="button"
            onClick={() => onSelect(item)}
            className="text-[11px] font-semibold text-slate-500 underline-offset-2 hover:text-slate-900 hover:underline"
          >
            Details
          </button>
          <button
            type="button"
            onClick={() => onAdd(item)}
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-slate-700"
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
