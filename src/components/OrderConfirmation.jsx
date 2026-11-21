import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import {
  CheckCircle2,
  Clock,
  MapPin,
  ArrowLeft,
  Download,
  Lock,
  Box
} from 'lucide-react';

const PAYMENT_LABELS = {
  mensacard: 'MensaCard',
  applepay: 'Apple Pay',
  card: 'Card'
};

export default function OrderConfirmation({ order, onBack, onClear }) {
  const [qrDataUrl, setQrDataUrl] = useState('');

  useEffect(() => {
    let isActive = true;

    QRCode.toDataURL(order.qrPayload, {
      width: 640,
      margin: 1,
      errorCorrectionLevel: 'M',
      color: { dark: '#0F172A', light: '#FFFFFF' }
    })
      .then(url => {
        if (isActive) setQrDataUrl(url);
      })
      .catch(() => {
        if (isActive) setQrDataUrl('');
      });

    return () => {
      isActive = false;
    };
  }, [order.qrPayload]);

  return (
    <main className="mx-auto w-full max-w-lg px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-2xl font-black tracking-tight text-slate-900">
          Your lunch is booked.
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Thanks, {order.customerName}. Order {order.id}.
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Pickup QR code
          </span>

          <div className="mt-3 flex h-52 w-52 items-center justify-center rounded-2xl border border-stone-200 bg-white p-3">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="Pickup QR code" className="h-full w-full" />
            ) : (
              <span className="text-xs text-slate-400">Generating QR…</span>
            )}
          </div>

          <p className="mt-3 text-xs font-semibold text-slate-700">
            Show this code at the Ape
          </p>
          <p className="mt-1 font-mono text-xs font-bold tracking-widest text-slate-950">
            {order.id} · PIN {order.pickupCode}
          </p>
          <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-800">
            <Box className="h-3 w-3" />
            Heated box {order.compartment}
          </p>
        </div>

        <div className="mt-5 space-y-3 border-t border-stone-100 pt-5">
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-4 w-4 text-amber-600" />
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Pickup
              </span>
              <p className="text-xs font-bold text-slate-900">{order.slot.window}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 text-amber-600" />
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Where
              </span>
              <p className="text-xs font-bold text-slate-900">
                ADL main entrance · Ape awning
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Lock className="mt-0.5 h-4 w-4 text-amber-600" />
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Paid with
              </span>
              <p className="text-xs font-bold text-slate-900">
                {PAYMENT_LABELS[order.paymentMethod] || 'Card'} · €{order.total.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-stone-200 bg-white p-4">
        <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          In your box
        </h2>
        <div className="mt-2 space-y-1.5">
          {order.items.map(item => (
            <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-700">
                <strong className="font-bold text-slate-900">{item.quantity}×</strong>{' '}
                {item.name}
              </span>
              <span className="shrink-0 font-semibold text-slate-900">
                €{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        {qrDataUrl && (
          <a
            href={qrDataUrl}
            download={`${order.id}-pickup-qr.png`}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-stone-300 bg-white py-3 text-sm font-bold text-slate-900 transition-colors hover:border-stone-400"
          >
            <Download className="h-4 w-4" />
            Save QR
          </a>
        )}
        <button
          type="button"
          onClick={onBack}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-900 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to menu
        </button>
      </div>

      <p className="mt-4 text-center text-[11px] leading-relaxed text-slate-500">
        This is a prototype. The QR code is generated locally, saved on this
        device, and does not unlock a real box.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-3 w-full text-center text-[11px] font-semibold text-slate-400 transition-colors hover:text-slate-700"
      >
        Picked up? Clear saved order
      </button>
    </main>
  );
}
