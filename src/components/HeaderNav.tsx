import React, { useState } from 'react';
import { Search, User, Shield, Menu, X, Download, Flame, Database } from 'lucide-react';

interface HeaderNavProps {
  onOpenSearch: () => void;
  onOpenLauncher: () => void;
  onOpenEditions: () => void;
  onOpenCareer: () => void;
  onOpenPlateModal: () => void;
  onOpenAdminProposals?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onOpenSearch,
  onOpenLauncher,
  onOpenEditions,
  onOpenCareer,
  onOpenPlateModal,
  onOpenAdminProposals
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [playerDrawerOpen, setPlayerDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0b0c10]/95 backdrop-blur-md border-b border-zinc-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Brand Emblem & Logo */}
            <div className="flex items-center gap-6">
              <a href="#" className="flex items-center gap-3 group" id="rockstar-logo-link">
                <div className="w-10 h-10 bg-amber-400 text-black flex items-center justify-center font-heading text-2xl font-black rounded-md shadow-md shadow-amber-400/20 group-hover:scale-105 transition-transform">
                  R<span className="text-sm -mt-2">★</span>
                </div>
                <div className="hidden sm:block text-left">
                  <span className="font-heading text-xl font-bold tracking-wider text-white group-hover:text-amber-400 transition-colors">
                    ROCKSTAR GAMES
                  </span>
                  <span className="block text-[10px] text-zinc-400 font-medium tracking-widest uppercase">
                    Official Entertainment Portal
                  </span>
                </div>
              </a>

              {/* Desktop Nav Links */}
              <nav className="hidden lg:flex items-center space-x-1 pl-4 border-l border-zinc-800 text-sm font-medium">
                <a
                  href="#hero"
                  className="px-3 py-2 text-zinc-300 hover:text-amber-400 hover:bg-zinc-800/50 rounded-md transition-colors"
                >
                  Games
                </a>
                <a
                  href="#core-ip"
                  className="px-3 py-2 text-zinc-300 hover:text-amber-400 hover:bg-zinc-800/50 rounded-md transition-colors"
                >
                  GTA Online
                </a>
                <a
                  href="#personas"
                  className="px-3 py-2 text-zinc-300 hover:text-amber-400 hover:bg-zinc-800/50 rounded-md transition-colors"
                >
                  Audience
                </a>
                <a
                  href="#features"
                  className="px-3 py-2 text-zinc-300 hover:text-amber-400 hover:bg-zinc-800/50 rounded-md transition-colors"
                >
                  Features
                </a>
                <a
                  href="#newswire"
                  className="px-3 py-2 text-zinc-300 hover:text-amber-400 hover:bg-zinc-800/50 rounded-md transition-colors"
                >
                  Newswire
                </a>
                <a
                  href="#store"
                  className="px-3 py-2 text-zinc-300 hover:text-amber-400 hover:bg-zinc-800/50 rounded-md transition-colors"
                >
                  Store
                </a>
                <a
                  href="#proposal"
                  className="px-3 py-2 text-zinc-300 hover:text-amber-400 hover:bg-zinc-800/50 rounded-md transition-colors"
                >
                  Proposal
                </a>
                <a
                  href="#scheduling"
                  className="px-3 py-2 text-amber-400 hover:text-amber-300 hover:bg-zinc-800/50 rounded-md transition-colors font-semibold"
                >
                  Schedule
                </a>
                <a
                  href="#faq"
                  className="px-3 py-2 text-zinc-300 hover:text-amber-400 hover:bg-zinc-800/50 rounded-md transition-colors"
                >
                  FAQ & Support
                </a>
              </nav>
            </div>

            {/* Utility Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                id="header-search-btn"
                onClick={onOpenSearch}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                title="Search games, newswire and support"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                type="button"
                id="header-profile-btn"
                onClick={() => setPlayerDrawerOpen(true)}
                className="p-2 text-zinc-400 hover:text-amber-400 hover:bg-zinc-800 rounded-md transition-colors flex items-center gap-1.5 text-xs font-semibold"
                title="Open Social Club Profile"
              >
                <User className="w-5 h-5" />
                <span className="hidden xl:inline text-zinc-300">Social Club</span>
              </button>

              <button
                type="button"
                id="header-admin-proposals-btn"
                onClick={onOpenAdminProposals}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider font-heading font-bold text-zinc-300 hover:text-amber-400 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-400/40 rounded transition-colors cursor-pointer"
                title="Backend Proposals Dashboard (Cloud Firestore)"
              >
                <Database className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin Proposals</span>
              </button>

              <button
                type="button"
                id="header-launcher-btn"
                onClick={onOpenLauncher}
                className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 text-xs uppercase tracking-wider font-heading font-bold text-zinc-200 bg-zinc-800 hover:bg-zinc-700 hover:text-white border border-zinc-700 rounded transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                Get Launcher
              </button>

              <button
                type="button"
                id="header-preorder-cta"
                onClick={onOpenEditions}
                className="flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider font-heading font-bold text-black bg-amber-400 hover:bg-amber-300 rounded shadow-md shadow-amber-400/20 transition-all transform active:scale-95"
              >
                <Flame className="w-4 h-4" />
                Pre-Order GTA VI
              </button>

              {/* Mobile menu button */}
              <button
                type="button"
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-800 bg-[#0e1017] px-4 pt-3 pb-6 space-y-2">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:bg-zinc-800 hover:text-amber-400"
            >
              Flagship Showcase
            </a>
            <a
              href="#personas"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:bg-zinc-800 hover:text-amber-400"
            >
              Target Audience Personas
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:bg-zinc-800 hover:text-amber-400"
            >
              Core Features & Outcomes
            </a>
            <a
              href="#core-ip"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:bg-zinc-800 hover:text-amber-400"
            >
              GTA & Red Dead Ecosystem
            </a>
            <a
              href="#newswire"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:bg-zinc-800 hover:text-amber-400"
            >
              Live Newswire Pulse
            </a>
            <a
              href="#store"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:bg-zinc-800 hover:text-amber-400"
            >
              Merch & Apparel
            </a>
            <a
              href="#proposal"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:bg-zinc-800 hover:text-amber-400"
            >
              Request a Proposal / Quote
            </a>
            <a
              href="#scheduling"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-amber-400 hover:bg-zinc-800 hover:text-amber-300 font-semibold"
            >
              Schedule 1-on-1 Support
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:bg-zinc-800 hover:text-amber-400"
            >
              FAQ (Account, Launcher & Meetings)
            </a>
            <div className="pt-4 border-t border-zinc-800 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminProposals?.();
                }}
                className="w-full text-left px-3 py-2 text-sm text-amber-400 hover:bg-zinc-800 rounded-md font-semibold flex items-center justify-between"
              >
                <span>Backend Proposals Dashboard</span>
                <span className="text-xs font-mono bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">Live Firestore</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPlateModal();
                }}
                className="w-full text-left px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 rounded-md"
              >
                Personalized License Plate Builder
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCareer();
                }}
                className="w-full text-left px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 rounded-md"
              >
                GTA Online Career Progress
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLauncher();
                }}
                className="w-full text-center px-4 py-2 bg-zinc-800 text-white rounded font-heading uppercase text-sm tracking-wider font-bold"
              >
                Download Rockstar Launcher
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Social Club Quick Profile Drawer */}
      {playerDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-sm bg-[#12141c] border-l border-zinc-800 p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-400" />
                  <span className="font-heading text-xl font-bold tracking-wider text-white">
                    SOCIAL CLUB STATUS
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPlayerDrawerOpen(false)}
                  className="text-zinc-400 hover:text-white p-1 rounded-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-zinc-900/90 border border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center font-heading text-xl font-bold text-black shadow-lg">
                    R★
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">OutlawSyndicate_01</h3>
                    <p className="text-xs text-amber-400 font-semibold">Rank 148 • Crew Leader</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-black/50 p-2.5 rounded border border-zinc-800">
                    <span className="text-zinc-400 block">Bank Balance</span>
                    <span className="text-emerald-400 font-bold text-sm">GTA$ 18,420,000</span>
                  </div>
                  <div className="bg-black/50 p-2.5 rounded border border-zinc-800">
                    <span className="text-zinc-400 block">GTA+ Status</span>
                    <span className="text-amber-400 font-bold text-sm">Active Sovereign</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2 text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setPlayerDrawerOpen(false);
                    onOpenCareer();
                  }}
                  className="w-full text-left px-3 py-2.5 rounded bg-zinc-800/60 hover:bg-zinc-800 text-zinc-200 font-medium flex items-center justify-between"
                >
                  <span>View Career Progress Hub</span>
                  <span className="text-xs text-amber-400 font-mono">Tier 4</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPlayerDrawerOpen(false);
                    onOpenPlateModal();
                  }}
                  className="w-full text-left px-3 py-2.5 rounded bg-zinc-800/60 hover:bg-zinc-800 text-zinc-200 font-medium flex items-center justify-between"
                >
                  <span>License Plate Customizer</span>
                  <span className="text-xs text-zinc-400 font-mono">Custom 3D</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPlayerDrawerOpen(false);
                    onOpenEditions();
                  }}
                  className="w-full text-left px-3 py-2.5 rounded bg-zinc-800/60 hover:bg-zinc-800 text-zinc-200 font-medium flex items-center justify-between"
                >
                  <span>GTA VI Pre-Order Allotment</span>
                  <span className="text-xs text-emerald-400 font-mono">Eligible</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 text-center">
              <p className="text-xs text-zinc-400 mb-3">
                Synchronized across PlayStation 5, Xbox Series X|S, and PC Launcher.
              </p>
              <button
                type="button"
                onClick={() => setPlayerDrawerOpen(false)}
                className="w-full py-2 bg-amber-400 text-black font-heading font-bold text-sm tracking-wider uppercase rounded hover:bg-amber-300"
              >
                Close Player Hub
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
