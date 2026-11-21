import React from 'react';
import { Leaf, Sprout, WheatOff } from 'lucide-react';

export default function DietBadges({ item }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {item.isVegan ? (
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
          <Leaf className="h-3 w-3" />
          Vegan
        </span>
      ) : item.isVeggie ? (
        <span className="inline-flex items-center gap-1 rounded-full border border-lime-200 bg-lime-50 px-2 py-0.5 text-[10px] font-bold text-lime-700">
          <Sprout className="h-3 w-3" />
          Vegetarian
        </span>
      ) : null}

      {item.isGlutenFree && (
        <span className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 text-[10px] font-bold text-sky-700">
          <WheatOff className="h-3 w-3" />
          Gluten-free
        </span>
      )}
    </div>
  );
}
