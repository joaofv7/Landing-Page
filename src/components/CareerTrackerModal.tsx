import React, { useState } from 'react';
import { X, Shield, Award, CheckCircle2, Lock, Flame, Sparkles } from 'lucide-react';

interface CareerTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CareerTrackerModal: React.FC<CareerTrackerModalProps> = ({ isOpen, onClose }) => {
  const [claimed, setClaimed] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const tiers = [
    {
      tier: 'Tier 1: Street Hustler',
      progress: '100%',
      completed: true,
      reward: 'Custom Vintage Tee & GTA$ 100,000',
      id: 't1'
    },
    {
      tier: 'Tier 2: Enterprise Executive',
      progress: '100%',
      completed: true,
      reward: 'Nightclub VIP Livery & GTA$ 250,000',
      id: 't2'
    },
    {
      tier: 'Tier 3: Heist Mastermind',
      progress: '78%',
      completed: false,
      reward: 'Kortz Tactical Outfits & GTA$ 500,000',
      id: 't3'
    },
    {
      tier: 'Tier 4: Syndicate Sovereign',
      progress: '45%',
      completed: false,
      reward: 'Armored Enus Paragon R & GTA$ 1,000,000',
      id: 't4'
    }
  ];

  const handleClaim = (id: string) => {
    setClaimed((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <h3 className="font-heading font-black text-2xl text-white uppercase tracking-wider">
              GTA ONLINE CAREER PROGRESS HUB
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Player Snapshot */}
        <div className="my-6 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center font-heading text-xl font-bold text-black shadow">
              R★
            </div>
            <div>
              <span className="text-white font-bold text-base">SyndicateBoss_Leonida</span>
              <p className="text-xs text-amber-400 font-mono">Rank 148 • 28/40 Challenges Done</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-zinc-400 text-xs block">Syndicate Vault</span>
            <span className="text-emerald-400 font-bold font-mono text-base">GTA$ 18,420,000</span>
          </div>
        </div>

        {/* Tier Achievements */}
        <div className="space-y-3">
          {tiers.map((t) => (
            <div
              key={t.id}
              className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 flex items-center justify-between gap-4"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  {t.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Lock className="w-4 h-4 text-zinc-500 shrink-0" />
                  )}
                  <span className="font-heading font-bold text-white text-base uppercase">
                    {t.tier}
                  </span>
                  <span className="text-xs font-mono text-amber-400 font-semibold ml-auto">
                    {t.progress}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 pl-6">
                  Reward: <span className="text-zinc-200">{t.reward}</span>
                </p>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden ml-6 max-w-[calc(100%-24px)]">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: t.progress }}
                  />
                </div>
              </div>

              {t.completed && (
                <button
                  type="button"
                  onClick={() => handleClaim(t.id)}
                  disabled={claimed[t.id]}
                  className={`px-3 py-1.5 rounded text-xs font-heading font-bold uppercase tracking-wider shrink-0 ${
                    claimed[t.id]
                      ? 'bg-zinc-800 text-zinc-500'
                      : 'bg-amber-400 hover:bg-amber-300 text-black'
                  }`}
                >
                  {claimed[t.id] ? 'Claimed' : 'Claim Reward'}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <span>Synced directly to PlayStation 5 & Xbox Series X|S</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded font-heading font-bold uppercase tracking-wider"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
