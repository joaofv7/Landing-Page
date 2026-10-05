import React from 'react';
import { X, Calendar, Clock, Share2, Bookmark, ArrowRight } from 'lucide-react';
import { NewswirePost } from '../types';

interface ArticleModalProps {
  article: NewswirePost | null;
  onClose: () => void;
  onAction: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose, onAction }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-amber-400 text-black text-[10px] font-heading font-black tracking-widest uppercase">
              {article.category}
            </span>
            <span className="text-xs font-mono text-zinc-400">Rockstar Newswire Dispatch</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-md cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-900">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{article.date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-wide">
            {article.title}
          </h2>

          <p className="text-base text-zinc-300 font-body leading-relaxed font-normal">
            {article.summary}
          </p>

          <div className="p-4 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 leading-relaxed space-y-3">
            <p>
              In addition to these headline features, all players who log in during this event window receive an automatic commemorative apparel drop delivered directly to their wardrobe, alongside 2X GTA$ & RP across all verified creator series and business sales.
            </p>
            <p>
              Tune in to the Rockstar Games Social Club event calendar for full weekly event specifics, podium vehicle rotations at The Diamond Casino & Resort, and exclusive discounts across luxury vehicle and property portfolios.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-900/90 border-t border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Share2 className="w-4 h-4 hover:text-white cursor-pointer" />
            <Bookmark className="w-4 h-4 hover:text-white cursor-pointer" />
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onAction();
            }}
            className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-heading font-bold uppercase text-xs tracking-wider rounded flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>{article.ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
