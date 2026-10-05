import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, Radio, Filter, ExternalLink } from 'lucide-react';
import { NEWSWIRE_ITEMS } from '../data/mockContent';
import { NewswirePost } from '../types';

interface NewswireSectionProps {
  onSelectArticle: (post: NewswirePost) => void;
}

export const NewswireSection: React.FC<NewswireSectionProps> = ({ onSelectArticle }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'GTA VI', 'GTA Online', 'Community', 'Red Dead'];

  const filteredItems =
    selectedCategory === 'All'
      ? NEWSWIRE_ITEMS
      : NEWSWIRE_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="newswire" className="py-20 bg-[#0b0c10] border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-heading font-bold tracking-widest uppercase mb-3">
              <Radio className="w-3 h-3 animate-pulse text-red-400" />
              Social Proof & Recency Pulse
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-white uppercase">
              ROCKSTAR NEWSWIRE
            </h2>
            <p className="mt-2 text-base text-zinc-400 max-w-2xl">
              Real-time dispatches directly from our development studios. Updated every single week with major expansions, double rewards, and community breakthroughs.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Newswire Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((post, idx) => {
            const isFeatured = post.featured;
            return (
              <div
                key={post.id}
                className={`group bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-amber-400/50 rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-amber-400/5 ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div>
                  {/* Card Image */}
                  <div className="relative aspect-video sm:h-56 w-full overflow-hidden bg-zinc-950">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-sm text-amber-400 text-[10px] font-heading font-black tracking-widest uppercase border border-amber-400/30">
                        {post.category}
                      </span>
                      {isFeatured && (
                        <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                          FLAGSHIP
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 mb-3">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>{post.date}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-white uppercase group-hover:text-amber-400 transition-colors leading-tight">
                      {post.title}
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-zinc-400 line-clamp-3 leading-relaxed font-body">
                      {post.summary}
                    </p>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="p-6 pt-0 border-t border-zinc-800/60 mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onSelectArticle(post)}
                    className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 group-hover:translate-x-1 transition-all"
                  >
                    <span>{post.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Verified Dispatch</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
