import React, { useState } from 'react';
import { X, Search, Gamepad2, Newspaper, ShoppingBag, HelpCircle, ArrowRight } from 'lucide-react';
import { NEWSWIRE_ITEMS, FAQS, MERCH_ITEMS } from '../data/mockContent';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGame: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectGame }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredNews = NEWSWIRE_ITEMS.filter((n) =>
    n.title.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredFaqs = FAQS.filter((f) =>
    f.question.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredMerch = MERCH_ITEMS.filter((m) =>
    m.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Search Header */}
        <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, newswire updates, FAQs, gear..."
            className="w-full bg-transparent border-none text-white text-base placeholder:text-zinc-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {/* Quick Games Category */}
          <div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-widest block mb-2">
              Featured Flagships
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSelectGame();
                }}
                className="p-3 rounded-lg bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 flex items-center gap-3 text-left transition-colors"
              >
                <Gamepad2 className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white uppercase font-heading">Grand Theft Auto VI</h4>
                  <p className="text-[11px] text-zinc-400">Leonida Pre-Orders & Reveal</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSelectGame();
                }}
                className="p-3 rounded-lg bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 flex items-center gap-3 text-left transition-colors"
              >
                <Gamepad2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white uppercase font-heading">Grand Theft Auto Online</h4>
                  <p className="text-[11px] text-zinc-400">30-Player Living World Hub</p>
                </div>
              </button>
            </div>
          </div>

          {/* Newswire Dispatches */}
          {filteredNews.length > 0 && (
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-widest block mb-2">
                Newswire Dispatches
              </span>
              <div className="space-y-2">
                {filteredNews.map((news) => (
                  <div
                    key={news.id}
                    onClick={onClose}
                    className="p-3 rounded-lg bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/80 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <Newspaper className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-zinc-200 font-medium">{news.title}</span>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-mono">{news.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Answers */}
          {filteredFaqs.length > 0 && (
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-widest block mb-2">
                Support & Objection FAQs
              </span>
              <div className="space-y-2">
                {filteredFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    onClick={onClose}
                    className="p-3 rounded-lg bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/80 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{faq.question}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 line-clamp-1">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-zinc-900/90 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
          <span>Press ESC or click outside to dismiss</span>
          <span className="text-amber-400 font-mono">Rockstar Search Index v2.6</span>
        </div>
      </div>
    </div>
  );
};
