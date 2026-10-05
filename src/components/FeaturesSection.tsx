import React from 'react';
import { Globe, Clapperboard, Sparkles, Award, Library, ArrowUpRight } from 'lucide-react';
import { CORE_FEATURES } from '../data/mockContent';

interface FeaturesSectionProps {
  onOpenPlateModal: () => void;
  onOpenCareerModal: () => void;
  onOpenEditions: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  onOpenPlateModal,
  onOpenCareerModal,
  onOpenEditions
}) => {
  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-6 h-6 text-amber-400" />;
      case 'Clapperboard':
        return <Clapperboard className="w-6 h-6 text-amber-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-400" />;
      case 'Award':
        return <Award className="w-6 h-6 text-amber-400" />;
      case 'Library':
        return <Library className="w-6 h-6 text-amber-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="features" className="py-20 bg-[#0b0c10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-heading font-bold tracking-widest uppercase mb-3">
            Core Architecture & Capabilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-white uppercase">
            SOLUTIONS ROOTED IN OUTCOMES, NOT JUST FUNCTIONALITY
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            Every layer of the Rockstar ecosystem is meticulously tuned to guarantee immersion, respect your investment of time, and eradicate common multiplayer friction.
          </p>
        </div>

        {/* 5 Core Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_FEATURES.map((feature, idx) => {
            const isWide = idx === 0 || idx === 1;
            return (
              <div
                key={feature.id}
                className={`bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-amber-400/50 rounded-xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-amber-400/5 group ${
                  idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div>
                  {/* Top Bar: Icon + Highlight Stat Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-lg bg-black/60 border border-zinc-800 group-hover:border-amber-400/40 transition-colors">
                      {getFeatureIcon(feature.iconName)}
                    </div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20">
                      {feature.highlightStat}
                    </span>
                  </div>

                  {/* Feature Tag */}
                  <span className="text-[10px] font-heading font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                    {feature.tag}
                  </span>

                  {/* Feature Name */}
                  <h3 className="text-2xl font-heading font-bold text-white uppercase tracking-wide group-hover:text-amber-400 transition-colors">
                    {feature.name}
                  </h3>

                  {/* Outcome-Focused One-Line Benefit (PRD Requirement) */}
                  <div className="my-4 p-3.5 rounded bg-black/40 border-l-2 border-amber-400 text-sm font-semibold text-zinc-200 leading-snug">
                    {feature.outcomeBenefit}
                  </div>

                  {/* Detailed Description */}
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-body">
                    {feature.description}
                  </p>
                </div>

                {/* Quick Action Button within Card */}
                <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="text-xs text-zinc-400 font-mono">Live in Ecosystem</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (feature.id === 'persistent-career-hub') {
                        onOpenCareerModal();
                      } else {
                        onOpenEditions();
                      }
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase text-amber-400 hover:text-amber-300 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>{feature.id === 'persistent-career-hub' ? 'Test Career Hub' : 'Explore Feature'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
