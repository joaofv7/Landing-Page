import React, { useState } from 'react';
import { Flame, ShieldCheck, Check, ArrowRight, Play, Mail, Sparkles, Send } from 'lucide-react';
import { LIVE_SERVICE_STATUSES } from '../data/mockContent';

interface CtaBannerProps {
  onOpenEditions: () => void;
  onOpenTrailer: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenEditions, onOpenTrailer }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
  };

  return (
    <section id="cta-banner" className="py-20 bg-black relative overflow-hidden border-t border-zinc-800">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main High-Impact Conversion Card */}
        <div className="rounded-2xl bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-[#0b0c10] border border-amber-500/30 p-8 sm:p-14 text-center shadow-2xl relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-400 text-xs font-heading font-black tracking-widest uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Guaranteed Day-1 Allocation
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black text-white uppercase tracking-tight max-w-4xl mx-auto leading-[0.95]">
            DO NOT MISS THE NEXT ERA OF LIVING WORLDS
          </h2>

          <p className="mt-6 text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto font-body font-normal leading-relaxed">
            Lock in your pre-order to secure exclusive Day-1 Vice City Capital, or jump straight into the evolving 30-player GTA Online ecosystem today.
          </p>

          {/* Action-Oriented CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              id="cta-primary-button"
              onClick={onOpenEditions}
              className="w-full sm:w-auto px-10 py-4 bg-amber-400 hover:bg-amber-300 text-black font-heading font-black text-xl tracking-wider uppercase rounded-md shadow-xl shadow-amber-400/25 flex items-center justify-center gap-3 transition-all transform active:scale-95 cursor-pointer"
            >
              <Flame className="w-5 h-5" />
              <span>Pre-Order Grand Theft Auto VI</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              type="button"
              id="cta-secondary-button"
              onClick={onOpenTrailer}
              className="w-full sm:w-auto px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-heading font-bold text-lg tracking-wider uppercase rounded-md border border-zinc-700 flex items-center justify-center gap-3 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Watch Extended Reveal</span>
            </button>
          </div>

          {/* Trust Guarantees & Friction Removal */}
          <div className="mt-10 pt-8 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-zinc-400">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Pre-Order Refund Guarantee Before Release</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-amber-400" />
              <span>Zero-Friction Social Club Cross-Cloud Sync</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Official 24/7 Server Uptime Monitoring</span>
            </div>
          </div>
        </div>

        {/* Lead Capture Newsletter Box (PRD Section 8) */}
        <div className="mt-12 rounded-xl bg-zinc-900/60 border border-zinc-800 p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-heading font-bold uppercase tracking-widest text-amber-400 mb-2">
              <Mail className="w-4 h-4" />
              Direct Studio Dispatch
            </div>
            <h3 className="text-2xl font-heading font-bold text-white uppercase">
              Subscribe to the Rockstar Newsletter
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Sign up for our email newsletter to get the latest game announcements, special events, GTA Online bonuses, and offers from Rockstar Games.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/40 rounded-lg text-emerald-300 text-xs font-medium flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>You are on the priority dispatch list. Welcome to Social Club.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="px-4 py-3 bg-black/70 border border-zinc-700 rounded text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400 flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black font-heading font-bold uppercase text-sm tracking-wider rounded flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Subscribe Now</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Live Service Status Tracker Strip (PRD Section 9) */}
        <div className="mt-8 p-4 rounded-lg bg-zinc-950 border border-zinc-850">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="font-heading font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Rockstar Services Status: All Platforms Operational
            </span>
            <div className="flex flex-wrap items-center gap-4 text-zinc-400 font-mono text-[11px]">
              {LIVE_SERVICE_STATUSES.slice(0, 3).map((s, idx) => (
                <span key={idx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {s.name.split(' ')[0]}: {s.ping}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
