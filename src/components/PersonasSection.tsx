import React, { useState } from 'react';
import { Film, Crown, Compass, ArrowRight, CheckCircle2, AlertCircle, Quote } from 'lucide-react';
import { TARGET_PERSONAS } from '../data/mockContent';
import { UserPersona } from '../types';

interface PersonasSectionProps {
  onSelectEdition: () => void;
  onJumpIntoOnline: () => void;
}

export const PersonasSection: React.FC<PersonasSectionProps> = ({
  onSelectEdition,
  onJumpIntoOnline
}) => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>(TARGET_PERSONAS[0].id);

  const activePersona = TARGET_PERSONAS.find((p) => p.id === selectedPersonaId) || TARGET_PERSONAS[0];

  const getPersonaIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film':
        return <Film className="w-6 h-6 text-amber-400" />;
      case 'Crown':
        return <Crown className="w-6 h-6 text-amber-400" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-amber-400" />;
      default:
        return <Film className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="personas" className="py-20 bg-[#0e1017] border-t border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-heading font-bold tracking-widest uppercase mb-3">
            Target Audience & Tailored Entry
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-white uppercase">
            ENGINEERED FOR THREE TYPES OF PLAYERS
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-400 leading-relaxed">
            Whether you prioritize cinematic solo storytelling, ruthless syndicate dominance, or rugged frontier escapism, our living worlds adapt seamlessly to your style.
          </p>
        </div>

        {/* Persona Selector Tabs (Desktop & Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {TARGET_PERSONAS.map((persona) => {
            const isSelected = persona.id === selectedPersonaId;
            return (
              <button
                key={persona.id}
                type="button"
                id={`persona-tab-${persona.id}`}
                onClick={() => setSelectedPersonaId(persona.id)}
                className={`text-left p-5 rounded-lg border transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-zinc-900 border-amber-400/80 shadow-lg shadow-amber-400/10 scale-[1.02]'
                    : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400" />
                )}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-md bg-black/60 border border-zinc-800">
                    {getPersonaIcon(persona.avatarIcon)}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-white tracking-wide">
                      {persona.role}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">
                      {persona.tagline}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Persona Deep-Dive Card */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left column: Key Frustration vs Desired Outcome */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded bg-amber-400/20 text-amber-400">
                  {getPersonaIcon(activePersona.avatarIcon)}
                </span>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-wide">
                    {activePersona.role}
                  </h3>
                  <p className="text-sm text-amber-400 font-semibold">
                    {activePersona.tagline}
                  </p>
                </div>
              </div>

              {/* Persona Quote */}
              <div className="relative pl-6 border-l-2 border-amber-400 italic text-zinc-300 text-sm sm:text-base">
                <Quote className="w-5 h-5 text-amber-400/40 absolute -left-2.5 -top-2" />
                {activePersona.quote}
              </div>

              {/* Frustration & Desired Outcome Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Frustration */}
                <div className="p-4 rounded-lg bg-red-950/20 border border-red-900/40">
                  <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <AlertCircle className="w-4 h-4" />
                    Key Frustration
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {activePersona.keyFrustration}
                  </p>
                </div>

                {/* Desired Outcome */}
                <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/40">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Desired Outcome
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {activePersona.desiredOutcome}
                  </p>
                </div>
              </div>

              {/* Core Hook */}
              <div className="p-3 bg-black/50 rounded border border-zinc-800 text-xs flex items-center justify-between">
                <span className="text-zinc-400">Target Resolution:</span>
                <span className="text-amber-400 font-semibold">{activePersona.coreHook}</span>
              </div>
            </div>

            {/* Right column: Tailored Entry Action & Outcome Metrics */}
            <div className="lg:col-span-5 bg-black/60 p-6 rounded-lg border border-zinc-800/80 space-y-6">
              <h4 className="text-xs uppercase font-heading tracking-widest text-zinc-400">
                Recommended Solution Pathway
              </h4>

              <div className="p-4 bg-zinc-900/80 rounded border border-zinc-700">
                <p className="text-xs text-zinc-400 uppercase font-mono">Suggested Entry Title</p>
                <p className="text-lg font-bold text-white mt-1">
                  {activePersona.recommendedEntry}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {activePersona.metrics.map((m, i) => (
                  <div key={i} className="p-3 bg-zinc-900/50 rounded border border-zinc-800">
                    <span className="text-[10px] text-zinc-400 uppercase block">{m.label}</span>
                    <span className="text-sm font-bold text-amber-400 font-mono mt-0.5 block">{m.value}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={activePersona.id === 'syndicate-leader' ? onJumpIntoOnline : onSelectEdition}
                  className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 text-black font-heading font-extrabold tracking-wider uppercase rounded text-base flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-amber-400/20"
                >
                  <span>
                    {activePersona.id === 'syndicate-leader' ? 'Activate GTA Online Crew' : 'Explore Tailored Editions'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
