import React, { useState } from 'react';
import { X, Check, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { MerchItem } from '../types';

interface MerchModalProps {
  item: MerchItem | null;
  onClose: () => void;
}

export const MerchModal: React.FC<MerchModalProps> = ({ item, onClose }) => {
  const [selectedSize, setSelectedSize] = useState('L');
  const [purchased, setPurchased] = useState(false);

  if (!item) return null;

  const isApparel = item.category === 'Apparel';

  const handleCheckout = () => {
    setPurchased(true);
    setTimeout(() => {
      setPurchased(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <span className="text-xs font-mono text-amber-400 font-bold uppercase">
            Official Rockstar Warehouse Dispatch
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-md cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
          <div className="aspect-square rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                {item.category} • {item.status}
              </span>
              <h3 className="text-2xl font-heading font-black text-white uppercase mt-1">
                {item.name}
              </h3>
              <p className="text-2xl font-mono font-bold text-amber-400 mt-2">
                {item.price}
              </p>
              <p className="text-xs text-zinc-300 mt-3 font-body leading-relaxed">
                {item.description}
              </p>
            </div>

            {isApparel && (
              <div>
                <span className="text-xs font-mono text-zinc-400 block mb-1.5 uppercase">
                  Select Size
                </span>
                <div className="flex gap-2">
                  {['S', 'M', 'L', 'XL', '2XL'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`w-9 h-9 rounded text-xs font-bold font-mono transition-colors ${
                        selectedSize === size
                          ? 'bg-amber-400 text-black'
                          : 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2 text-[11px] text-zinc-400 border-t border-zinc-800/80 pt-3">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                <span>Dispatches from New York Hub within 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Authentic Rockstar Games Official Gear</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
          <span className="text-xs text-zinc-400">Taxes & customs included</span>
          {purchased ? (
            <div className="px-6 py-2.5 bg-emerald-500 text-black font-heading font-bold uppercase text-xs rounded flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Order Placed Successfully!</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleCheckout}
              className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-heading font-bold uppercase text-xs tracking-wider rounded flex items-center gap-2 cursor-pointer transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Proceed to Fast Checkout</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
