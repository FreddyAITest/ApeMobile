import React from 'react';
import { Plus } from 'lucide-react';
import DietBadges from './DietBadges';

export default function SideboardSection({ items, onSelect, onAdd }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map(item => (
        <article
          key={item.id}
          className="flex items-center gap-3 rounded-2xl border border-stone-200/90 bg-white p-3"
        >
          <button
            type="button"
            onClick={() => onSelect(item)}
            className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-stone-100"
            aria-label={`View details for ${item.name}`}
          >
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </button>

          <div className="min-w-0 flex-1">
            <button
              type="button"
              onClick={() => onSelect(item)}
              className="block truncate text-left text-sm font-bold leading-snug text-slate-900"
            >
              {item.name}
            </button>
            <p className="mt-0.5 truncate text-[11px] text-slate-500">
              {item.description}
            </p>
            <div className="mt-1.5">
              <DietBadges item={item} />
            </div>
            {item.allergens.length > 0 && (
              <p className="mt-1 text-[10px] text-slate-400">
                Contains: {item.allergens.join(', ')}
              </p>
            )}
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2">
            <span className="text-sm font-extrabold text-slate-900">
              €{item.price.toFixed(2)}
            </span>
            <button
              type="button"
              onClick={() => onAdd(item)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-900 text-white transition-colors hover:bg-stone-700"
              aria-label={`Add ${item.name}`}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
