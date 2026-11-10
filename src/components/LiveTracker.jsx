import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  Navigation, 
  CheckCircle2, 
  Flame, 
  QrCode, 
  PhoneCall, 
  RotateCcw, 
  Play, 
  Pause, 
  ChevronRight, 
  Sparkles,
  ShieldCheck,
  Coffee,
  Info
} from 'lucide-react';
import ApeIllustration from './ApeIllustration';

export default function LiveTracker({ activeOrder, onBackToMenu }) {
  // Stages: 0 = Confirmed, 1 = Packed, 2 = On the Way, 3 = Arrived at ADL
  const [currentStage, setCurrentStage] = useState(2); // default to "On the way" for maximum excitement
  const [progress, setProgress] = useState(55); // 0 to 100% along the path
  const [isPlaying, setIsPlaying] = useState(true);
  const [showQrModal, setShowQrModal] = useState(false);

  // Auto-advance progress when stage === 2 (driving)
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentStage(3); // Ape arrived at ADL!
          return 100;
        }
        return prev + 1.5;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Route Waypoints along SVG map coordinate space
  // Path curve: (40, 260) -> (140, 210) -> (260, 180) -> (380, 110) -> (460, 60)
  const calculateApePosition = (pct) => {
    const t = pct / 100;
    // Cubic bezier or multi-point spline
    // Start: Mensa (45, 250), Mid1: (150, 200), Mid2: (290, 160), End: ADL (450, 65)
    const x = Math.pow(1 - t, 3) * 50 + 
              3 * Math.pow(1 - t, 2) * t * 160 + 
              3 * (1 - t) * Math.pow(t, 2) * 310 + 
              Math.pow(t, 3) * 445;

    const y = Math.pow(1 - t, 3) * 240 + 
              3 * Math.pow(1 - t, 2) * t * 210 + 
              3 * (1 - t) * Math.pow(t, 2) * 140 + 
              Math.pow(t, 3) * 75;

    return { x, y };
  };

  const apePos = calculateApePosition(progress);

  const etaMinutes = currentStage === 3 
    ? 0 
    : Math.max(1, Math.round((100 - progress) / 20));

  const orderData = activeOrder || {
    id: 'APE-4288',
    date: 'Today, 12:00 Break',
    timeslot: { time: '12:00 - 12:25', breakName: 'Break 1 • Morning Wrap' },
    box: 'Compartment A-2 (Heated)',
    pickupPin: '4288',
    total: 6.10,
    items: [
      { name: 'Crispy Katsu Tofu Curry', quantity: 1, thermoBox: 'Box A-2' },
      { name: 'Oat Milk Flat White', quantity: 1 }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-5">
      {/* Top Banner: ETA & Status */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-orange-400 rounded-3xl p-4 sm:p-6 text-slate-950 shadow-lg relative overflow-hidden">
        <div className="absolute right-2 -bottom-4 opacity-15 pointer-events-none">
          <ApeIllustration variant="side-open" className="w-56 h-56" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-slate-950/15 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-black tracking-wide uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
              <span>Live Campus Shuttle Tracking</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-none">
              {currentStage === 3 ? (
                '🏁 The Ape Has Arrived at ADL!'
              ) : currentStage === 2 ? (
                `🛵 Ape on the way • Arriving in ~${etaMinutes} min`
              ) : currentStage === 1 ? (
                '📦 Meals Packed in Heated Ape Boxes'
              ) : (
                '👨‍🍳 Order Confirmed at Mensa Kitchen'
              )}
            </h1>

            <p className="text-xs sm:text-sm font-semibold text-slate-900/80 mt-1.5 flex items-center gap-2">
              <span>Destination: <strong>Agile Design Lab (Front Awning)</strong></span>
              <span>•</span>
              <span>Slot: <strong>{orderData.timeslot?.time || '12:00 - 12:25'}</strong></span>
            </p>
          </div>

          {/* Quick Pickup PIN Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-white/60 shadow-md text-center shrink-0">
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">
              Pickup Code
            </span>
            <span className="text-2xl font-black font-mono tracking-widest text-slate-950 block">
              #{orderData.pickupPin}
            </span>
            <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
              {orderData.box}
            </span>
          </div>
        </div>
      </div>

      {/* --- LIVE INTERACTIVE CAMPUS MAP --- */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
        {/* Map Header Toolbar */}
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-amber-600 animate-pulse" />
            <span className="font-extrabold text-slate-900">Campus GPS Route: Mensa Hub → ADL</span>
          </div>

          {/* Interactive Simulation Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1 bg-white hover:bg-slate-100 border border-slate-300 px-2.5 py-1 rounded-lg text-slate-700 font-bold transition-colors"
              title={isPlaying ? 'Pause simulation' : 'Play simulation'}
            >
              {isPlaying ? <Pause className="w-3 h-3 text-amber-600" /> : <Play className="w-3 h-3 text-emerald-600" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              onClick={() => {
                setProgress(0);
                setCurrentStage(2);
                setIsPlaying(true);
              }}
              className="flex items-center gap-1 bg-white hover:bg-slate-100 border border-slate-300 px-2 py-1 rounded-lg text-slate-700 font-bold transition-colors"
              title="Restart route"
            >
              <RotateCcw className="w-3 h-3 text-slate-500" />
              <span>Restart</span>
            </button>
          </div>
        </div>

        {/* Vector Campus Map Visualization */}
        <div className="relative w-full h-[320px] sm:h-[380px] bg-[#E8F0EA] overflow-hidden select-none">
          <svg
            viewBox="0 0 500 300"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Campus Lawn / Grass Patterns */}
            <rect width="500" height="300" fill="#E3EDE4" />

            {/* River / Pond */}
            <path
              d="M0 80 Q100 110 180 70 T350 40 L350 0 L0 0 Z"
              fill="#BFDBFE"
              opacity="0.8"
            />

            {/* Campus Pathways (Light grey sidewalks) */}
            <path
              d="M30 240 Q120 180 250 220 T460 260"
              stroke="#CBD5E1"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M260 0 L260 300"
              stroke="#CBD5E1"
              strokeWidth="8"
              strokeDasharray="4 4"
              fill="none"
              opacity="0.6"
            />

            {/* MAIN DELIVERY ROAD (Asphalt curve with dashed center line) */}
            <path
              id="apeRoute"
              d="M 50 240 C 160 210, 310 140, 445 75"
              stroke="#475569"
              strokeWidth="20"
              strokeLinecap="round"
              fill="none"
            />
            {/* Road White Dash Line */}
            <path
              d="M 50 240 C 160 210, 310 140, 445 75"
              stroke="#F8FAFC"
              strokeWidth="2"
              strokeDasharray="8 8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Travelled Path Highlight (Amber glowing trail) */}
            <path
              d="M 50 240 C 160 210, 310 140, 445 75"
              stroke="#F59E0B"
              strokeWidth="6"
              strokeDasharray="380"
              strokeDashoffset={380 - (progress / 100) * 380}
              strokeLinecap="round"
              fill="none"
              className="drop-shadow-sm"
            />

            {/* --- CAMPUS BUILDINGS --- */}
            {/* Building 1: Central Mensa (Starting point) */}
            <g transform="translate(20, 190)">
              <rect width="70" height="50" rx="8" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" className="shadow" />
              <rect x="5" y="5" width="60" height="12" rx="3" fill="#F87171" />
              <text x="35" y="14" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle">CENTRAL MENSA</text>
              <text x="35" y="32" fill="#475569" fontSize="6" fontWeight="bold" textAnchor="middle">Kitchen Hub</text>
              <circle cx="65" cy="42" r="5" fill="#22C55E" />
              <text x="65" y="44" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle">✓</text>
            </g>

            {/* Building 2: Central University Library (Midpoint) */}
            <g transform="translate(190, 80)">
              <rect width="80" height="55" rx="6" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />
              <rect x="5" y="5" width="70" height="10" rx="2" fill="#0284C7" />
              <text x="40" y="13" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" textAnchor="middle">CAMPUS LIBRARY</text>
              <circle cx="40" cy="35" r="12" fill="#E2E8F0" />
              <text x="40" y="38" fill="#64748B" fontSize="8" textAnchor="middle">📚</text>
            </g>

            {/* Building 3: Science & Innovation Lab */}
            <g transform="translate(320, 180)">
              <rect width="65" height="45" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
              <text x="32" y="18" fill="#64748B" fontSize="6" fontWeight="bold" textAnchor="middle">Engineering</text>
              <text x="32" y="30" fill="#94A3B8" fontSize="5" textAnchor="middle">Faculty B</text>
            </g>

            {/* Building 4: AGile Design LAB (ADL) — DESTINATION */}
            <g transform="translate(400, 20)">
              {/* Radar pulse around ADL */}
              <circle cx="45" cy="45" r="40" fill="#F59E0B" fillOpacity="0.15" className="animate-ping" />
              <circle cx="45" cy="45" r="30" fill="#F59E0B" fillOpacity="0.2" />

              <rect width="90" height="60" rx="10" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="3" />
              <rect x="5" y="5" width="80" height="14" rx="4" fill="#0F172A" />
              <text x="45" y="15" fill="#FDE68A" fontSize="7.5" fontWeight="900" textAnchor="middle">AGILE DESIGN LAB</text>
              <text x="45" y="32" fill="#0369A1" fontSize="7" fontWeight="bold" textAnchor="middle">ADL FRONT DOOR</text>
              <text x="45" y="46" fill="#15803D" fontSize="6" fontWeight="bold" textAnchor="middle">● Ape Awning Stand</text>
            </g>

            {/* Trees & Park Elements */}
            <circle cx="120" cy="140" r="14" fill="#86EFAC" />
            <circle cx="126" cy="136" r="10" fill="#4ADE80" />
            <circle cx="150" cy="155" r="11" fill="#4ADE80" />
            <circle cx="370" cy="140" r="15" fill="#86EFAC" />
            <circle cx="280" cy="250" r="16" fill="#4ADE80" />

            {/* --- MOVING APE VEHICLE ON MAP --- */}
            <g transform={`translate(${apePos.x - 22}, ${apePos.y - 20})`}>
              {/* Pulsing indicator ring */}
              <circle cx="22" cy="20" r="22" fill="#F59E0B" fillOpacity="0.3" className="animate-pulse" />
              {/* Mini Ape SVG */}
              <foreignObject x="0" y="0" width="48" height="40">
                <div className="w-full h-full flex items-center justify-center">
                  <ApeIllustration variant="driving" className="w-11 h-11" />
                </div>
              </foreignObject>
            </g>
          </svg>

          {/* Floating Live Badge on Map */}
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-2 rounded-xl border border-slate-200 shadow-md text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-extrabold text-slate-900">
                Ape Current Speed: 24 km/h
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Passing Central Library • Thermo box maintained at 72°C
            </p>
          </div>

          {/* Floating Time to Break pill */}
          <div className="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-xs text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Break begins in 8 min</span>
          </div>
        </div>

        {/* 4-Step Progress Stepper */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {[
              { step: 0, label: '1. Confirmed', sub: 'Mensa Kitchen', icon: CheckCircle2, pct: 15 },
              { step: 1, label: '2. Packed', sub: 'Heated Box A-2', icon: Flame, pct: 35 },
              { step: 2, label: '3. On the Way', sub: 'Cruising to ADL', icon: Navigation, pct: 70 },
              { step: 3, label: '4. Parked at ADL', sub: 'Ready for 2m pickup', icon: MapPin, pct: 100 },
            ].map((s) => {
              const isPast = currentStage > s.step;
              const isCurrent = currentStage === s.step;

              return (
                <button
                  key={s.step}
                  onClick={() => {
                    setCurrentStage(s.step);
                    setProgress(s.pct);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    isCurrent 
                      ? 'bg-amber-500/15 border-amber-500 ring-2 ring-amber-500/20 font-bold' 
                      : isPast
                        ? 'bg-emerald-50/70 border-emerald-300 text-slate-800'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <s.icon className={`w-3.5 h-3.5 ${
                      isCurrent ? 'text-amber-600' : isPast ? 'text-emerald-600' : 'text-slate-400'
                    }`} />
                    <span className="font-extrabold text-slate-900 truncate">{s.label}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block truncate">{s.sub}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- READY FOR PICKUP AT THE ADL DOOR --- */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                Guaranteed Fast Pickup
              </span>
              <span className="text-xs text-slate-500">Back in studio in ≤ 5 mins!</span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-950">
              Pickup Instructions at ADL
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Walk to the ADL main entrance awning. Scan this QR code or show PIN <strong className="text-slate-950">#{orderData.pickupPin}</strong> to unlock your heated compartment.
            </p>
          </div>

          <button
            onClick={() => setShowQrModal(true)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-sm transition-all shrink-0 cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-amber-300" />
            <span>Show Large Pickup QR</span>
          </button>
        </div>

        {/* Order Contents Summary */}
        <div className="mt-4 pt-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            Your Pre-Ordered Meal in the Ape
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {orderData.items.map((item, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-black">
                    {item.quantity}x
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">{item.name}</span>
                    <span className="text-[10px] text-amber-700 font-semibold">
                      {item.thermoBox || 'Sideboard Chilled/Barista'}
                    </span>
                  </div>
                </div>
                <span className="text-emerald-700 font-bold text-[11px] bg-emerald-100/70 px-2 py-0.5 rounded-full">
                  Hot & Ready
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 text-xs">
          <button
            onClick={onBackToMenu}
            className="text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>← Back to Mensa Menu</span>
          </button>

          <div className="flex items-center gap-2 text-slate-500">
            <span>Need assistance?</span>
            <button 
              onClick={() => alert("Connecting to Ape Driver via Campus Intercom...")}
              className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Ape Driver</span>
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Light Dismiss Modal */}
      {showQrModal && (
        <div 
          onClick={() => setShowQrModal(false)}
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150"
          >
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 block mb-1">
              Contactless Ape Unlock
            </span>
            <h3 className="text-xl font-black text-slate-950 mb-3">
              Scan at the Ape Door
            </h3>

            {/* Realistic High-Res QR Code Representation */}
            <div className="w-48 h-48 mx-auto bg-slate-900 p-3 rounded-2xl flex items-center justify-center shadow-inner my-4">
              <div className="w-full h-full bg-white rounded-xl p-3 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="w-10 h-10 border-4 border-slate-900 rounded-sm p-1 flex items-center justify-center">
                    <div className="w-4 h-4 bg-slate-900 rounded-xs" />
                  </div>
                  <div className="w-10 h-10 border-4 border-slate-900 rounded-sm p-1 flex items-center justify-center">
                    <div className="w-4 h-4 bg-slate-900 rounded-xs" />
                  </div>
                </div>
                {/* Center Ape Brand Logo */}
                <div className="text-center font-mono text-[9px] font-black text-amber-600 bg-amber-100 py-1 rounded">
                  APE-#{orderData.pickupPin}
                </div>
                <div className="flex justify-between items-end">
                  <div className="w-10 h-10 border-4 border-slate-900 rounded-sm p-1 flex items-center justify-center">
                    <div className="w-4 h-4 bg-slate-900 rounded-xs" />
                  </div>
                  <div className="text-[10px] font-mono font-bold text-slate-600">
                    BOX {orderData.box.split(' ')[1] || 'A-2'}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 mb-4">
              <span>PIN: </span>
              <strong className="text-base font-mono text-slate-950 font-black">
                {orderData.pickupPin}
              </strong>
              <span className="block text-[11px] text-amber-800 font-bold mt-0.5">
                {orderData.box}
              </span>
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
