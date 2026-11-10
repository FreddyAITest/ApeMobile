import React, { useState } from 'react';
import { Sparkles, BookOpen } from 'lucide-react';

export default function DemoToolbar({ 
  onQuickLoadDemoOrder, 
  onNavigate,
  activeTab
}) {
  const [showPitchNotes, setShowPitchNotes] = useState(false);

  return (
    <>
      {/* Floating Demo Bar at the bottom right */}
      <aside 
        aria-label="Prototype Testing Tools"
        className="fixed bottom-20 sm:bottom-6 right-4 z-40 bg-slate-900/90 backdrop-blur-md text-white border border-slate-700/80 rounded-2xl shadow-2xl p-2.5 transition-all text-xs"
      >
        <div className="flex items-center gap-2">
          {/* Quick Preset Order */}
          <button
            onClick={onQuickLoadDemoOrder}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold px-2.5 py-1.5 rounded-xl transition-all cursor-pointer"
            title="Preload a typical ADL lunch + sideboard coffee order"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Load Sample Order</span>
          </button>

          {/* Pitch Deck Reference */}
          <button
            onClick={() => setShowPitchNotes(true)}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-2.5 py-1.5 rounded-xl transition-all cursor-pointer"
            title="View Ape Pitch Requirements & Insights"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Pitch Deck Notes</span>
          </button>
        </div>
      </aside>

      {/* Pitch Notes Dialog */}
      {showPitchNotes && (
        <div 
          onClick={() => setShowPitchNotes(false)}
          className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 max-w-lg w-full text-slate-900 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛵</span>
                <h3 className="text-lg font-black text-slate-950">
                  Ape-solutely: Pitch Concept & Prototype Spec
                </h3>
              </div>
              <button
                onClick={() => setShowPitchNotes(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200">
                <h4 className="font-extrabold text-amber-950 mb-1 text-sm">
                  The Problem Solved (from Pitch Deck):
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  Students at the Agile Design Lab (ADL) have 15–30 min breaks, but no on-site Mensa, café or supermarket (supermarket is 10 min away each way). 
                  <strong> 5/5 go hungry, 4/5 rely on coffee to stay focused, 2/5 strict diet (vegan/GF).</strong>
                  Distance, not break length, is the problem.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <h4 className="font-extrabold text-slate-900 mb-1.5 text-sm">
                  Implemented Features in this Prototype:
                </h4>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <div>
                      <strong>Timeslot Pre-Order (12:00, 13:00, 13:45):</strong> Pre-order meals before cut-off so they arrive hot and ready in thermo-boxes right on break.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <div>
                      <strong>Ape Sideboard Upsell Station:</strong> Left-side hatch featuring barista espresso & oat milk flat whites, chilled Berlin Club-Mate, and sealed vegan/GF sweets.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <div>
                      <strong>Live "Delivery is on the Way" Campus Map:</strong> Animated Piaggio Ape travelling from Central Mensa to ADL with ETA and GPS progress.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <div>
                      <strong>Account & MensaCard:</strong> Subsidized pricing tier, NFC card reload, and certified diet-safe locks (pitch C4 criteria).
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setShowPitchNotes(false)}
              className="mt-5 w-full bg-slate-950 hover:bg-slate-900 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Back to Prototype
            </button>
          </div>
        </div>
      )}
    </>
  );
}
