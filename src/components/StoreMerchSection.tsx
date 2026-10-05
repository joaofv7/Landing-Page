import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Check, Tag } from 'lucide-react';
import { MERCH_ITEMS } from '../data/mockContent';
import { MerchItem } from '../types';

interface StoreMerchSectionProps {
  onQuickView: (item: MerchItem) => void;
}

export const StoreMerchSection: React.FC<StoreMerchSectionProps> = ({ onQuickView }) => {
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const handleAddToCart = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAddedItems((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [id]: false }));
    }, 2500);
  };

  return (
    <section id="store" className="py-20 bg-[#0e1017] border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-heading font-bold tracking-widest uppercase mb-3">
              <Tag className="w-3.5 h-3.5" />
              Rockstar Warehouse • Direct-to-Consumer
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-white uppercase">
              OFFICIAL COLLECTIBLES & APPAREL
            </h2>
            <p className="mt-2 text-base text-zinc-400 max-w-2xl">
              Authentic premium merchandise engineered in limited allocations. Shipped worldwide from New York, London, and Paris.
            </p>
          </div>

          <a
            href="#hero"
            className="inline-flex items-center gap-2 text-sm font-heading font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300"
          >
            <span>View Complete Warehouse Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Merch Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MERCH_ITEMS.map((item) => {
            const isAdded = !!addedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() => onQuickView(item)}
                className="group bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-amber-400/50 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square w-full bg-zinc-950 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-zinc-300 text-[10px] font-heading font-bold uppercase tracking-wider border border-zinc-800">
                        {item.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded bg-amber-400 text-black text-[10px] font-heading font-black uppercase tracking-wider">
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-heading font-bold text-lg text-white uppercase group-hover:text-amber-400 transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="mt-3 text-lg font-mono font-bold text-amber-400">
                      {item.price}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(item.id, e)}
                    className={`w-full py-2.5 px-3 rounded text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      isAdded
                        ? 'bg-emerald-500 text-white'
                        : 'bg-zinc-800 hover:bg-amber-400 hover:text-black text-zinc-200'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        Add to Order
                      </>
                    )}
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
