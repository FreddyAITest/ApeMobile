import React, { useState } from 'react';
import { 
  CreditCard, 
  User, 
  ShieldCheck, 
  Leaf, 
  Bell, 
  Clock, 
  Receipt, 
  Plus, 
  Check, 
  ChevronRight, 
  Sparkles,
  Smartphone,
  MapPin,
  RefreshCw
} from 'lucide-react';
import ApeIllustration from './ApeIllustration';

export default function AccountSettings({ 
  user, 
  onUpdateUser, 
  onReorder 
}) {
  const [topupAmount, setTopupAmount] = useState(20);
  const [showTopupModal, setShowTopupModal] = useState(false);
  const [topupSuccess, setTopupSuccess] = useState(false);

  const handleToggleDiet = (key) => {
    onUpdateUser({
      ...user,
      dietaryLocks: {
        ...user.dietaryLocks,
        [key]: !user.dietaryLocks[key]
      }
    });
  };

  const handleSelectTier = (tier) => {
    onUpdateUser({
      ...user,
      tier
    });
  };

  const handleTopup = () => {
    onUpdateUser({
      ...user,
      campusCardBalance: user.campusCardBalance + topupAmount
    });
    setTopupSuccess(true);
    setTimeout(() => {
      setTopupSuccess(false);
      setShowTopupModal(false);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-slate-950 tracking-tight">
          Student Account & Mensa Card
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Manage your MensaCard balance, dietary safety filters, and ADL break preferences
        </p>
      </div>

      {/* --- DIGITAL MENSACARD WALLET CARD --- */}
      <div className="relative rounded-3xl p-6 text-white shadow-xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between h-48 sm:h-52">
          {/* Card Top Row */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold text-lg">
                🛵
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 tracking-wider uppercase block">
                  CampusCard • Mensa Direct
                </span>
                <span className="text-sm font-extrabold text-slate-100">
                  Studierendenwerk ADL
                </span>
              </div>
            </div>

            {/* Contactless / NFC waves */}
            <div className="flex items-center gap-1 text-slate-400">
              <span className="text-xs font-mono">NFC</span>
              <Smartphone className="w-4 h-4 text-amber-400 animate-pulse" />
            </div>
          </div>

          {/* Card Middle: Balance */}
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Available Lunch Balance
            </span>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-baseline gap-2">
              <span>€{user.campusCardBalance.toFixed(2)}</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                Active & Subsidized
              </span>
            </div>
          </div>

          {/* Card Bottom Row */}
          <div className="flex items-end justify-between text-xs pt-2 border-t border-slate-700/60">
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">STUDENT</span>
              <span className="font-extrabold text-slate-200">{user.name}</span>
              <span className="text-[11px] text-slate-400 font-mono ml-2">ID: {user.studentId}</span>
            </div>

            <button
              onClick={() => setShowTopupModal(true)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Top Up</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- PRICE TIER SELECTION --- */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm">
        <h2 className="text-base font-extrabold text-slate-900 mb-1">
          Mensa Pricing Tier
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Select your university role to see corresponding subsidized meal prices
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'student', title: 'Student', desc: 'Full campus subsidy (e.g. €3.90)', badge: 'Active Rate' },
            { id: 'staff', title: 'Staff / Faculty', desc: 'Employee rate (e.g. €5.50)', badge: null },
            { id: 'guest', title: 'Guest / Visitor', desc: 'Standard external rate (e.g. €7.20)', badge: null },
          ].map(t => {
            const isSelected = user.tier === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleSelectTier(t.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20 font-bold'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-extrabold text-slate-900 text-sm">{t.title}</span>
                  {isSelected && <Check className="w-4 h-4 text-amber-600" />}
                </div>
                <p className="text-[11px] text-slate-500">{t.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* --- DIETARY FILTERS (Pitch C4 Requirement: Diet-safe sealed vegan/GF) --- */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h2 className="text-base font-extrabold text-slate-900">
            Dietary Preferences & Allergy Locks
          </h2>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Enable dietary locks to automatically verify meal safety and highlight certified sealed items (pitch C4 compliant)
        </p>

        <div className="space-y-3">
          {[
            { 
              key: 'vegan', 
              label: 'Strict Vegan', 
              desc: 'Only plant-based meals and oat milk coffees', 
              icon: Leaf,
              color: 'emerald' 
            },
            { 
              key: 'glutenFree', 
              label: 'Gluten-Free / Coeliac Safe', 
              desc: 'Sealed tamper-evident containers prepared in certified clean area', 
              icon: ShieldCheck,
              color: 'sky' 
            },
            { 
              key: 'lactoseFree', 
              label: 'Lactose-Free Coffee & Dishes', 
              desc: 'Always use oat or soy milk at the Ape barista bar', 
              icon: Sparkles,
              color: 'amber' 
            },
            { 
              key: 'nutFree', 
              label: 'Nut Allergy Warning Flag', 
              desc: 'Alert when items may contain trace hazelnuts or peanuts', 
              icon: ShieldCheck,
              color: 'rose' 
            },
          ].map(filter => {
            const isEnabled = user.dietaryLocks[filter.key];

            return (
              <div
                key={filter.key}
                onClick={() => handleToggleDiet(filter.key)}
                className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  isEnabled 
                    ? 'bg-emerald-50/60 border-emerald-400 font-semibold' 
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isEnabled ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <filter.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{filter.label}</span>
                    <span className="text-[11px] text-slate-500">{filter.desc}</span>
                  </div>
                </div>

                <div className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  isEnabled ? 'bg-emerald-600' : 'bg-slate-300'
                }`}>
                  <div className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                    isEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- ORDER HISTORY --- */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm">
        <h2 className="text-base font-extrabold text-slate-900 mb-1">
          Recent Ape Break Pre-Orders
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Your digital Mensa receipts and 1-click reorder
        </p>

        <div className="space-y-3">
          {user.recentOrders.map(order => (
            <div 
              key={order.id}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-extrabold text-slate-900">{order.id}</span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                    {order.date}
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    {order.status}
                  </span>
                </div>
                <p className="text-slate-600 font-medium">
                  {order.items.join(' + ')}
                </p>
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  Picked up at ADL door • {order.box}
                </span>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                <span className="font-extrabold text-slate-950 text-sm">
                  €{order.total.toFixed(2)}
                </span>
                <button
                  onClick={() => onReorder(order)}
                  className="bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3 text-amber-600" />
                  <span>Reorder</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- TOP-UP MODAL --- */}
      {showTopupModal && (
        <div 
          onClick={() => setShowTopupModal(false)}
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-3 font-bold text-xl">
              💳
            </div>

            <h3 className="text-lg font-black text-slate-950 mb-1">
              Top Up CampusCard
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Instant reload via Apple Pay, PayPal, or SEPA Bank Transfer
            </p>

            {/* Amount Selection */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[10, 20, 50].map(amt => (
                <button
                  key={amt}
                  onClick={() => setTopupAmount(amt)}
                  className={`py-3 rounded-2xl border font-black text-sm transition-all cursor-pointer ${
                    topupAmount === amt
                      ? 'bg-amber-500 border-amber-600 text-slate-950 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  +€{amt}
                </button>
              ))}
            </div>

            <div className="bg-slate-50 rounded-2xl p-3 text-xs text-slate-600 mb-5 text-left border border-slate-100">
              <div className="flex justify-between mb-1">
                <span>Current Balance:</span>
                <span className="font-bold text-slate-900">€{user.campusCardBalance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-700">
                <span>New Balance:</span>
                <span>€{(user.campusCardBalance + topupAmount).toFixed(2)}</span>
              </div>
            </div>

            {topupSuccess ? (
              <div className="bg-emerald-50 text-emerald-800 font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Top-up Successful! Balance Updated</span>
              </div>
            ) : (
              <button
                onClick={handleTopup}
                className="w-full bg-slate-950 hover:bg-slate-900 active:scale-[0.99] text-white font-black py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <span>Authorize €{topupAmount.toFixed(2)} Reload</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
