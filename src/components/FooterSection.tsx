import React from 'react';
import { Globe } from 'lucide-react';

interface FooterSectionProps {
  onOpenAdminProposals?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenAdminProposals }) => {
  return (
    <footer className="bg-black text-zinc-400 border-t border-zinc-800 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-zinc-900">
          {/* Brand & Global Cities (PRD Section 10) */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-10 h-10 bg-amber-400 text-black flex items-center justify-center font-heading text-2xl font-black rounded shadow-md">
              R<span className="text-sm -mt-2">★</span>
            </div>
            <div>
              <span className="font-heading text-lg font-bold uppercase tracking-wider text-white">
                ROCKSTAR GAMES
              </span>
              <p className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mt-0.5">
                New York • London • Paris • Bogotá • MCMXCVIII
              </p>
            </div>
          </div>

          {/* Social Network Hub */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-zinc-400 text-xs font-heading font-bold uppercase tracking-wider">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">
              Instagram
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">
              X (Twitter)
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">
              YouTube
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">
              TikTok
            </a>
            <a href="https://twitch.tv" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">
              Twitch
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">
              Discord
            </a>
          </div>
        </div>

        {/* Legal Authority & Navigation */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left text-zinc-400">
          <div className="space-y-2 max-w-2xl text-[11px]">
            <p>
              Rockstar Games, Inc. © 1998–2026. Rockstar Games, Grand Theft Auto, Grand Theft Auto Online, Red Dead Redemption, and the R* logo are trademarks and/or registered trademarks of Take-Two Interactive Software.
            </p>
            <p className="text-zinc-400">
              The ratings icon is a registered trademark of the Entertainment Software Association. All other marks and trademarks are properties of their respective owners.
            </p>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-end gap-4 text-zinc-400 text-xs">
            {onOpenAdminProposals && (
              <button
                type="button"
                onClick={onOpenAdminProposals}
                className="text-amber-400 hover:text-amber-300 font-medium transition-colors cursor-pointer"
              >
                ★ Admin Proposals
              </button>
            )}
            <a href="#hero" className="hover:text-zinc-200 transition-colors">Corporate</a>
            <a href="#hero" className="hover:text-zinc-200 transition-colors">Privacy Policy</a>
            <a href="#hero" className="hover:text-zinc-200 transition-colors">Legal Notices</a>
            <a href="#hero" className="hover:text-zinc-200 transition-colors">Do Not Sell My Info</a>
            <a href="#hero" className="hover:text-zinc-200 transition-colors">Cookie Settings</a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5" />
            <span>English (United States)</span>
          </div>
          <div>
            Built with React & Tailwind CSS • Conversion Architecture Deconstruction
          </div>
        </div>
      </div>
    </footer>
  );
};
