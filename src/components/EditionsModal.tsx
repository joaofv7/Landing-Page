import React, { useState } from 'react';
import { X, Check, Flame, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';
import { GAME_EDITIONS } from '../data/mockContent';
import { GameEdition } from '../types';

interface EditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditionsModal: React.FC<EditionsModalProps> = ({ isOpen, onClose }) => {
  const [selectedEditionId, setSelectedEditionId] = useState<string>('deluxe-edition');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('PlayStation 5');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#0e1017] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="p-6 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider">
              OFFICIAL ALLOTMENTS • LAUNCH ALLOCATION GUARANTEED
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-tight mt-0.5">
              EXPLORE GRAND THEFT AUTO VI EDITIONS
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Platform Selector */}
        <div className="px-6 py-4 bg-black/60 border-b border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400 uppercase">Select Target Platform:</span>
            {['PlayStation 5', 'Xbox Series X|S', 'PC via Rockstar Launcher'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setSelectedPlatform(p)}
                className={`px-3 py-1 rounded text-xs font-heading font-bold uppercase tracking-wider transition-colors ${
                  selectedPlatform === p
                    ? 'bg-amber-400 text-black'
                    : 'bg-zinc-800 text-zinc-300 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Refundable Anytime Prior to Release</span>
          </div>
        </div>

        {/* Editions Comparison Cards */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {GAME_EDITIONS.map((edition) => {
            const isSelected = edition.id === selectedEditionId;
            return (
              <div
                key={edition.id}
                onClick={() => setSelectedEditionId(edition.id)}
                className={`rounded-xl border p-6 flex flex-col justify-between transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-zinc-900 border-amber-400 shadow-xl shadow-amber-400/10'
                    : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/70'
                }`}
              >
                {edition.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-400 text-black text-[10px] font-heading font-black uppercase tracking-wider shadow">
                    RECOMMENDED
                  </div>
                )}

                <div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                    {edition.badge}
                  </span>
                  <h4 className="text-2xl font-heading font-bold text-white uppercase">
                    {edition.name}
                  </h4>
                  <div className="mt-2 text-3xl font-heading font-black text-amber-400">
                    {edition.price}
                  </div>

                  {/* What is included */}
                  <div className="mt-6 space-y-2.5 text-xs">
                    <p className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">Included Core Content:</p>
                    {edition.includes.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-zinc-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>

                  {/* Exclusive Perks */}
                  <div className="mt-6 pt-4 border-t border-zinc-800 space-y-2 text-xs">
                    <p className="text-[11px] font-mono text-amber-400 uppercase font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Exclusive Allotments:
                    </p>
                    {edition.exclusivePerks.map((perk, i) => (
                      <div key={i} className="p-2 rounded bg-amber-400/5 border border-amber-400/20 text-amber-200">
                        {perk}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-800">
                  <div className={`w-full py-2 text-center rounded text-xs font-heading font-bold uppercase tracking-wider ${
                    isSelected ? 'bg-amber-400 text-black' : 'bg-zinc-800 text-zinc-300'
                  }`}>
                    {isSelected ? 'Selected Edition' : 'Choose Edition'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Proposal / Corporate Quote Callout Strip */}
        <div className="px-6 py-3 bg-zinc-950 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-zinc-400">
            Need enterprise packages, esports tournament licensing, or custom corporate editions?
          </span>
          <a
            href="#proposal"
            onClick={onClose}
            className="text-amber-400 hover:text-amber-300 font-heading font-bold uppercase tracking-wider underline flex items-center gap-1 shrink-0"
          >
            <span>Request a Custom Proposal / Quote</span>
            <span>&rarr;</span>
          </a>
        </div>

        {/* Bottom Actions & Conversion Lock */}
        <div className="p-6 bg-zinc-900/90 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white">
              Selected: <span className="text-amber-400">{GAME_EDITIONS.find(e => e.id === selectedEditionId)?.name}</span> for <span className="text-white">{selectedPlatform}</span>
            </p>
            <p className="text-xs text-zinc-400">
              Direct digital license registered to your Rockstar Social Club account upon release.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {isSuccess ? (
              <div className="px-6 py-3 bg-emerald-500 text-black font-heading font-bold uppercase rounded flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>Pre-Order Confirmed! Check Email</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full sm:w-auto px-8 py-3 bg-amber-400 hover:bg-amber-300 text-black font-heading font-extrabold uppercase text-base tracking-wider rounded shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Flame className="w-4 h-4" />
                <span>Confirm Digital Pre-Order</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
