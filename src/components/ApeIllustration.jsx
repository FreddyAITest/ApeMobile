import React from 'react';

export default function ApeIllustration({ 
  variant = 'standard', // 'standard' | 'side-open' | 'driving' | 'badge'
  className = 'w-24 h-24',
  color = '#F59E0B' // Classic warm Ape Yellow
}) {
  if (variant === 'badge') {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/20 text-white font-bold text-lg">
          🛵
        </div>
      </div>
    );
  }

  return (
    <div className={`relative inline-block ${className} ${variant === 'driving' ? 'ape-vibrate' : ''}`}>
      <svg
        viewBox="0 0 240 160"
        className="w-full h-full drop-shadow-md select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ground shadow */}
        <ellipse cx="120" cy="144" rx="85" ry="10" fill="#0f172a" fillOpacity="0.12" />

        {/* --- EXHAUST PUFFS (if driving) --- */}
        {variant === 'driving' && (
          <g className="steam-anim">
            <circle cx="28" cy="126" r="5" fill="#cbd5e1" opacity="0.6" />
            <circle cx="16" cy="122" r="7" fill="#e2e8f0" opacity="0.4" />
          </g>
        )}

        {/* --- APE MAIN BODY (Yellow Piaggio Ape) --- */}
        {/* Rear Cargo Box */}
        <rect
          x="34"
          y="48"
          width="110"
          height="74"
          rx="8"
          fill="#F59E0B"
          stroke="#B45309"
          strokeWidth="3.5"
        />

        {/* Cargo Box Detail: Corrugated lines / side panel */}
        <line x1="42" y1="62" x2="136" y2="62" stroke="#D97706" strokeWidth="2.5" strokeDasharray="6 3" />
        <line x1="42" y1="84" x2="136" y2="84" stroke="#D97706" strokeWidth="2.5" strokeDasharray="6 3" />
        <line x1="42" y1="106" x2="136" y2="106" stroke="#D97706" strokeWidth="2.5" strokeDasharray="6 3" />

        {/* --- SIDE HATCH OPEN (Upsell Sideboard Feature!) --- */}
        {variant === 'side-open' ? (
          <g>
            {/* Awning Canopy unfolded */}
            <path
              d="M30 46 L148 46 L154 30 L24 30 Z"
              fill="#DC2626"
            />
            {/* Striped Awning */}
            <path d="M40 30 L46 46 L58 46 L52 30 Z" fill="#F8FAFC" />
            <path d="M68 30 L74 46 L86 46 L80 30 Z" fill="#F8FAFC" />
            <path d="M96 30 L102 46 L114 46 L108 30 Z" fill="#F8FAFC" />
            <path d="M124 30 L130 46 L142 46 L136 30 Z" fill="#F8FAFC" />

            {/* Inner illuminated counter display */}
            <rect x="42" y="56" width="94" height="58" rx="4" fill="#1E293B" />
            
            {/* Heated Box indicator (Red Glow) */}
            <rect x="48" y="62" width="40" height="22" rx="3" fill="#DC2626" fillOpacity="0.85" />
            <text x="52" y="76" fill="#FEF2F2" fontSize="7.5" fontWeight="bold">♨ MENSA 72°C</text>

            {/* Coffee machine icon */}
            <rect x="94" y="62" width="36" height="22" rx="3" fill="#334155" />
            <rect x="99" y="66" width="10" height="12" rx="1" fill="#0284C7" />
            <text x="112" y="76" fill="#FDE68A" fontSize="7" fontWeight="bold">☕ OAT</text>

            {/* Chilled drinks shelf */}
            <rect x="48" y="89" width="82" height="20" rx="3" fill="#0F172A" stroke="#38BDF8" strokeWidth="1" />
            <text x="54" y="102" fill="#38BDF8" fontSize="8" fontWeight="600">❄ MATE & DESSERT BAR</text>
          </g>
        ) : (
          /* Normal Closed Side with Logo */
          <g>
            <rect x="48" y="62" width="82" height="42" rx="4" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
            <text x="54" y="78" fill="#B45309" fontSize="10" fontWeight="800" fontFamily="sans-serif">APE-SOLUTELY</text>
            <text x="54" y="92" fill="#D97706" fontSize="7" fontWeight="700">Mensa Shuttle @ ADL</text>
            <circle cx="120" cy="80" r="6" fill="#22C55E" />
            <path d="M117 80 L119 82 L123 78" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}

        {/* --- DRIVER CABIN (Front) --- */}
        <path
          d="M142 56 L178 56 Q198 56 204 76 L210 108 Q212 118 202 122 L142 122 Z"
          fill="#F59E0B"
          stroke="#B45309"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Windshield */}
        <path
          d="M152 64 L180 64 Q193 64 197 78 L201 94 L152 94 Z"
          fill="#BAE6FD"
          stroke="#0284C7"
          strokeWidth="2"
        />
        {/* Windshield glare */}
        <line x1="160" y1="68" x2="188" y2="86" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.75" />

        {/* Front Round Headlight */}
        <circle cx="212" cy="104" r="8" fill="#FEF08A" stroke="#D97706" strokeWidth="2.5" />
        <circle cx="212" cy="104" r="4" fill="#FFFFFF" />

        {/* Headlight beam if driving */}
        {variant === 'driving' && (
          <polygon points="220,100 240,88 240,120 220,108" fill="#FEF08A" opacity="0.35" />
        )}

        {/* Door handle & mirror */}
        <rect x="162" y="99" width="10" height="3" rx="1.5" fill="#334155" />
        <circle cx="152" cy="68" r="3" fill="#334155" />

        {/* Front Mudguard & Single Front Wheel (Ape 3-wheeler design) */}
        <path d="M190 114 Q204 110 216 118" stroke="#B45309" strokeWidth="4" fill="none" />
        <g className={variant === 'driving' ? 'animate-spin-fast' : ''}>
          <circle cx="204" cy="132" r="14" fill="#1E293B" stroke="#475569" strokeWidth="3" />
          <circle cx="204" cy="132" r="6" fill="#CBD5E1" />
          <circle cx="204" cy="132" r="2" fill="#0F172A" />
        </g>

        {/* Rear Wheel (Sturdy back wheel) */}
        <g className={variant === 'driving' ? 'animate-spin-fast' : ''}>
          <circle cx="68" cy="132" r="15" fill="#1E293B" stroke="#475569" strokeWidth="3.5" />
          <circle cx="68" cy="132" r="6" fill="#CBD5E1" />
          <circle cx="68" cy="132" r="2" fill="#0F172A" />
        </g>

        {/* Rear mudguard */}
        <path d="M50 120 Q68 112 86 120" stroke="#B45309" strokeWidth="3.5" fill="none" />

        {/* Cute Coffee Steam Top Chimney */}
        <path d="M120 48 L120 40 L126 40 L126 48" fill="#94A3B8" />
        <g className="steam-anim">
          <path d="M123 38 Q120 34 125 30 Q128 26 123 22" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      </svg>
    </div>
  );
}
