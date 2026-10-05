import React, { useState } from 'react';
import { Play, Flame, Shield, Award, Users, Compass, ExternalLink, Sparkles, ChevronRight } from 'lucide-react';

interface CoreIPShowcaseProps {
  onOpenTrailer: (title: string, duration?: string) => void;
  onOpenPlateModal: () => void;
  onOpenCareerModal: () => void;
  onOpenEditions: () => void;
}

export const CoreIPShowcase: React.FC<CoreIPShowcaseProps> = ({
  onOpenTrailer,
  onOpenPlateModal,
  onOpenCareerModal,
  onOpenEditions
}) => {
  const [activeTab, setActiveTab] = useState<'gta-online' | 'red-dead' | 'gta-vi'>('gta-online');

  return (
    <section id="core-ip" className="py-20 bg-[#0e1017] border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-heading font-bold tracking-widest uppercase mb-3">
              Core IP Hubs & Dynamic Worlds
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-white uppercase">
              EXPERIENCE CONTINUOUS LIVING WORLDS
            </h2>
            <p className="mt-2 text-base text-zinc-400 max-w-2xl">
              Deconstructed directly from the Rockstar Games ecosystem: perpetual live-service universes delivering years of content without missing a beat.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 bg-black/70 p-1.5 rounded-lg border border-zinc-800 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('gta-online')}
              className={`px-4 py-2 rounded font-heading font-bold text-sm tracking-wider uppercase transition-all ${
                activeTab === 'gta-online'
                  ? 'bg-amber-400 text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              GTA Online
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('red-dead')}
              className={`px-4 py-2 rounded font-heading font-bold text-sm tracking-wider uppercase transition-all ${
                activeTab === 'red-dead'
                  ? 'bg-amber-400 text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Red Dead Online
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('gta-vi')}
              className={`px-4 py-2 rounded font-heading font-bold text-sm tracking-wider uppercase transition-all ${
                activeTab === 'gta-vi'
                  ? 'bg-amber-400 text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              GTA VI Vault
            </button>
          </div>
        </div>

        {/* TAB 1: GTA ONLINE (PRD Section 4) */}
        {activeTab === 'gta-online' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Visual Imagery */}
                <div className="lg:col-span-6 relative min-h-[340px] lg:min-h-full">
                  <img
                    src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop"
                    alt="GTA Online The Kortz Center Heist"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-heading font-bold tracking-wider uppercase inline-block mb-2">
                      Now Available Worldwide
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white uppercase drop-shadow">
                      The Kortz Center Heist Expansion
                    </h3>
                  </div>
                </div>

                {/* Content & Value Proposition */}
                <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                      <Users className="w-4 h-4 text-amber-400" />
                      Dynamic world for up to 30 players
                    </div>
                    <h3 className="text-2xl sm:text-4xl font-heading font-black text-white uppercase tracking-tight">
                      Grand Theft Auto Online
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-zinc-300 font-body leading-relaxed">
                      Explore GTA Online, a dynamic world for up to 30 players, featuring all updates and content since launch, playable solo or with friends. Rise from street hustle to CEO of a sprawling criminal dynasty.
                    </p>

                    {/* Objection Reversals Callout */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded bg-black/50 border border-zinc-800">
                        <span className="text-amber-400 font-bold block">10+ Years of DLC</span>
                        <span className="text-zinc-400">Zero locked expansions; everything unlocked immediately.</span>
                      </div>
                      <div className="p-3 rounded bg-black/50 border border-zinc-800">
                        <span className="text-amber-400 font-bold block">Solo Session Freedom</span>
                        <span className="text-zinc-400">Run business sell missions in private invite-only lobbies.</span>
                      </div>
                    </div>
                  </div>

                  {/* Primary & Secondary Action Fork */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-zinc-800">
                    <button
                      type="button"
                      onClick={onOpenEditions}
                      className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black font-heading font-bold uppercase text-sm tracking-wider rounded shadow-md shadow-amber-400/20 cursor-pointer"
                    >
                      Jump Into GTA Online
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenTrailer('Grand Theft Auto Online: The Kortz Center Heist', '1:45')}
                      className="px-5 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-heading font-bold uppercase text-sm tracking-wider rounded flex items-center gap-2 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
                      Watch Heist Trailer
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-modules: GTA+ Membership, Custom License Plate Creator, Career Progress (PRD Section 4) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* GTA+ Membership */}
              <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="p-2 rounded bg-amber-400/10 text-amber-400">
                      <Sparkles className="w-5 h-5" />
                    </span>
                    <span className="text-[11px] font-mono text-amber-400 font-bold uppercase">
                      GTA$ 500,000 / Mo
                    </span>
                  </div>
                  <h4 className="text-xl font-heading font-bold text-white uppercase">
                    GTA+ Sovereign Membership
                  </h4>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    The premium membership for GTA Online players. Enjoy automatic cash deposits, free vehicle deliveries at The Vinewood Car Club, and exclusive property bonuses.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-zinc-800/80">
                  <button
                    type="button"
                    onClick={onOpenEditions}
                    className="text-xs font-heading font-bold uppercase text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <span>Learn More About GTA+</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Personalized License Plates Creator */}
              <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="p-2 rounded bg-amber-400/10 text-amber-400">
                      <Award className="w-5 h-5" />
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase">
                      Interactive Tool
                    </span>
                  </div>
                  <h4 className="text-xl font-heading font-bold text-white uppercase">
                    Personalized License Plates
                  </h4>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    Design custom text plates in your browser and order them directly to your Los Santos Customs garage. Show your status across every lobby.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-zinc-800/80">
                  <button
                    type="button"
                    onClick={onOpenPlateModal}
                    className="text-xs font-heading font-bold uppercase text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <span>Launch Plate Creator</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* GTA Online Career Progress */}
              <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="p-2 rounded bg-amber-400/10 text-amber-400">
                      <Shield className="w-5 h-5" />
                    </span>
                    <span className="text-[11px] font-mono text-amber-400 font-bold uppercase">
                      Tiers 1 to 4
                    </span>
                  </div>
                  <h4 className="text-xl font-heading font-bold text-white uppercase">
                    GTA Online Career Progress
                  </h4>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    See all the challenges that you’ve completed in your GTA Online career. Track heist tiers, claim in-game rewards, and show your legacy.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-zinc-800/80">
                  <button
                    type="button"
                    onClick={onOpenCareerModal}
                    className="text-xs font-heading font-bold uppercase text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <span>View Career Progress</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RED DEAD ONLINE (PRD Section 5) */}
        {activeTab === 'red-dead' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-6 relative min-h-[340px] lg:min-h-full">
                  <img
                    src="https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=1200&auto=format&fit=crop"
                    alt="Red Dead Online Frontier"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-heading font-bold tracking-wider uppercase inline-block mb-2">
                      American West Sagas
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white uppercase drop-shadow">
                      Forge Your Outlaw Destiny
                    </h3>
                  </div>
                </div>

                <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                      <Compass className="w-4 h-4 text-amber-400" />
                      Join millions of fellow players
                    </div>
                    <h3 className="text-2xl sm:text-4xl font-heading font-black text-white uppercase tracking-tight">
                      Red Dead Online
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-zinc-300 font-body leading-relaxed">
                      Join millions of fellow players in the American West and experience a world now packed with years’ worth of new features, gameplay, and additional enhancements. Ride alone or form a persistent posse with fellow gunslingers.
                    </p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded bg-black/50 border border-zinc-800">
                        <span className="text-amber-400 font-bold block">Defensive Playstyle</span>
                        <span className="text-zinc-400">Immunity to hostile auto-aim for serene exploration.</span>
                      </div>
                      <div className="p-3 rounded bg-black/50 border border-zinc-800">
                        <span className="text-amber-400 font-bold block">Frontier Roles</span>
                        <span className="text-zinc-400">Moonshiner, Bounty Hunter, Trader, Collector & Naturalist.</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-zinc-800">
                    <button
                      type="button"
                      onClick={onOpenEditions}
                      className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black font-heading font-bold uppercase text-sm tracking-wider rounded shadow-md shadow-amber-400/20 cursor-pointer"
                    >
                      Jump Into Red Dead Online
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenTrailer('Red Dead Online: Blood Money & Frontier Pursuits', '2:15')}
                      className="px-5 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-heading font-bold uppercase text-sm tracking-wider rounded flex items-center gap-2 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
                      Watch Frontier Trailer
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Red Dead Sub-modules: Moonshiners, Wheeler Rawson, Career Tracker */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Frontier Business</span>
                <h4 className="text-xl font-heading font-bold text-white uppercase mt-1">Moonshiner Operations</h4>
                <p className="text-xs text-zinc-400 mt-2">
                  Establish your own bootlegging speakeasy with custom decor, live country band, and dangerous delivery routes.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Catalogue Access</span>
                <h4 className="text-xl font-heading font-bold text-white uppercase mt-1">Wheeler, Rawson & Co.</h4>
                <p className="text-xs text-zinc-400 mt-2">
                  Browse authentic western attire, limited leather coats, handcrafted weaponry, and camp equipment from any browser.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Status Sync</span>
                <h4 className="text-xl font-heading font-bold text-white uppercase mt-1">Track Outlaw Career</h4>
                <p className="text-xs text-zinc-400 mt-2">
                  Monitor your naturalist compendium, bounty hunter rank, and camp supplies directly from the Social Club dashboard.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GTA VI VAULT */}
        {activeTab === 'gta-vi' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border border-amber-500/30">
              <div className="max-w-3xl">
                <span className="px-3 py-1 rounded bg-amber-400 text-black text-xs font-heading font-black tracking-widest uppercase inline-block mb-4">
                  NEXT GENERATION REVELATION
                </span>
                <h3 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase">
                  GRAND THEFT AUTO VI: STATE OF LEONIDA
                </h3>
                <p className="mt-4 text-base sm:text-lg text-zinc-300 font-body leading-relaxed">
                  Head to the neon-lit streets of Vice City and beyond in the biggest, most immersive evolution of the Grand Theft Auto series yet. Engineered exclusively for PlayStation 5 and Xbox Series X|S.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-zinc-900/80 rounded border border-zinc-800">
                    <span className="text-xs text-amber-400 font-mono font-bold block">Next-Gen Physics</span>
                    <p className="text-xs text-zinc-300 mt-1">Breakthrough dynamic water, cloth, and volumetric weather simulations.</p>
                  </div>
                  <div className="p-4 bg-zinc-900/80 rounded border border-zinc-800">
                    <span className="text-xs text-amber-400 font-mono font-bold block">Dual Protagonists</span>
                    <p className="text-xs text-zinc-300 mt-1">A high-stakes criminal duo operating in modern American satire.</p>
                  </div>
                  <div className="p-4 bg-zinc-900/80 rounded border border-zinc-800">
                    <span className="text-xs text-amber-400 font-mono font-bold block">Living AI Density</span>
                    <p className="text-xs text-zinc-300 mt-1">Unprecedented crowd memory, social media integration, and responsive law enforcement.</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={onOpenEditions}
                    className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-heading font-bold uppercase text-base tracking-wider rounded shadow-lg shadow-amber-400/20"
                  >
                    Pre-Order GTA VI Editions
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenTrailer('Grand Theft Auto VI — Extended World Trailer', '4:28')}
                    className="px-6 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-white font-heading font-bold uppercase text-base tracking-wider rounded flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 text-amber-400 fill-current" />
                    Watch Official Trailer 1
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
