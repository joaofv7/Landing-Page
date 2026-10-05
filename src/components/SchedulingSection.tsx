import React, { useState } from 'react';
import { Calendar, Clock, Video, ShieldCheck, ExternalLink, RefreshCw, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';

export const SchedulingSection: React.FC = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const CAL_URL = "https://cal.com/joao-correia-lus35m/30min";

  return (
    <section id="scheduling" className="py-20 bg-[#0b0c10] border-t border-zinc-800 relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-heading font-bold tracking-widest uppercase mb-4 shadow-sm">
            <Calendar className="w-3.5 h-3.5" />
            DIRECT 1-ON-1 TECHNICAL SUPPORT
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-white uppercase">
            SCHEDULE A MEETING / TECHNICAL SUPPORT SESSION
          </h2>
          
          <p className="mt-3 text-base sm:text-lg text-zinc-400 font-body leading-relaxed">
            Connect directly with a dedicated Rockstar Games technical specialist. Resolve Social Club account linking, fix launcher installation bottlenecks, or receive personalized configuration guidance in a private 30-minute session.
          </p>

          {/* Value Highlights Pill Row */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900/90 border border-zinc-800">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>30-Minute Video Consultation</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900/90 border border-zinc-800">
              <Video className="w-4 h-4 text-amber-400" />
              <span>Live Screen-Share Assistance</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900/90 border border-zinc-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified Support Engineers</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900/90 border border-zinc-800">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Zero-Cost Official Service</span>
            </div>
          </div>
        </div>

        {/* Cal.com Scheduling Container */}
        <div className="max-w-4xl mx-auto bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Top Widget Bar */}
          <div className="px-6 py-4 bg-zinc-900/90 border-b border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-amber-400 text-black flex items-center justify-center font-heading font-black text-lg">
                R★
              </div>
              <div>
                <span className="text-sm font-heading font-bold text-white uppercase tracking-wider block">
                  Cal.com Live Reservation Gateway
                </span>
                <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Real-Time Calendar Availability Synchronized
                </span>
              </div>
            </div>

            {/* Required Fallback Button */}
            <a
              id="cal-fallback-button"
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black font-heading font-bold text-xs uppercase tracking-wider rounded-md shadow-md shadow-amber-400/20 transition-all transform active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <span>Open Scheduler in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Iframe Loading Skeleton State */}
          <div className="relative min-h-[680px] w-full bg-[#0e1017]">
            {!iframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4 bg-zinc-950/80 backdrop-blur-xs z-10">
                <div className="w-12 h-12 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                <div>
                  <p className="text-white font-heading font-bold text-lg uppercase tracking-wider">
                    Loading Official Cal.com Booking Matrix...
                  </p>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-1">
                    Fetching real-time available time slots across all global timezones.
                  </p>
                </div>
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-400 hover:text-amber-300 font-mono underline inline-flex items-center gap-1 mt-2"
                >
                  Click here if the schedule does not load automatically
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {/* Embedded Cal.com Inline Widget */}
            <iframe
              src={CAL_URL}
              title="Cal.com Technical Support 30-Minute Session"
              width="100%"
              height="700px"
              frameBorder="0"
              allow="camera; microphone; autoplay; fullscreen"
              className="w-full min-h-[680px] border-none bg-transparent"
              onLoad={() => setIframeLoaded(true)}
            />
          </div>

          {/* Fallback & Preparation Advice Bar */}
          <div className="px-6 py-4 bg-zinc-900/90 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Meeting invitations with secure Google Meet / video access details are sent immediately upon confirmation.
              </span>
            </div>
            
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors font-medium flex items-center gap-1.5 shrink-0"
            >
              <span>Trouble viewing inline? Open in full window</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Preparation Tips Checklist */}
        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-amber-400 font-mono font-bold block mb-1">01. PREPARE CREDENTIALS</span>
            <p className="text-zinc-300">
              Have your Social Club GamerTag and linked console / PC accounts (PSN ID, Xbox Gamertag, Steam ID) accessible.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-amber-400 font-mono font-bold block mb-1">02. ERROR SCREENSHOTS</span>
            <p className="text-zinc-300">
              Take note of any specific error codes (e.g., Code 1000.50, entitlement mismatch, or cloud save conflicts).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-amber-400 font-mono font-bold block mb-1">03. RESCHEDULE FLEXIBILITY</span>
            <p className="text-zinc-300">
              Plans changed? You can reschedule or cancel at any time with a single click from your confirmation email.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
