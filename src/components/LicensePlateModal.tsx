import React, { useState } from 'react';
import { X, Check, Award, Car, RefreshCw } from 'lucide-react';

interface LicensePlateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LicensePlateModal: React.FC<LicensePlateModalProps> = ({ isOpen, onClose }) => {
  const [plateText, setPlateText] = useState('OUTLAW');
  const [plateStyle, setPlateStyle] = useState<'sa-black' | 'vice-neon' | 'liberty-blue' | 'sa-exempt'>('sa-black');
  const [ordered, setOrdered] = useState(false);

  if (!isOpen) return null;

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = e.target.value.toUpperCase().replace(/[^A-Z0-9 ]/g, '').slice(0, 8);
    setPlateText(sanitized);
    setOrdered(false);
  };

  const handleOrder = () => {
    setOrdered(true);
    setTimeout(() => {
      setOrdered(false);
      onClose();
    }, 2800);
  };

  const getPlateStyles = () => {
    switch (plateStyle) {
      case 'sa-black':
        return {
          bg: 'bg-zinc-950 border-4 border-amber-400',
          text: 'text-amber-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]',
          stateText: 'SAN ANDREAS',
          stateColor: 'text-amber-400'
        };
      case 'vice-neon':
        return {
          bg: 'bg-gradient-to-r from-purple-900 via-pink-900 to-indigo-900 border-4 border-pink-400',
          text: 'text-pink-300 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]',
          stateText: 'VICE CITY',
          stateColor: 'text-pink-400'
        };
      case 'liberty-blue':
        return {
          bg: 'bg-slate-900 border-4 border-sky-400',
          text: 'text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]',
          stateText: 'LIBERTY CITY',
          stateColor: 'text-sky-300'
        };
      case 'sa-exempt':
        return {
          bg: 'bg-zinc-200 border-4 border-zinc-500',
          text: 'text-blue-900 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]',
          stateText: 'SAN ANDREAS EXEMPT',
          stateColor: 'text-red-700'
        };
      default:
        return {
          bg: 'bg-zinc-950 border-4 border-amber-400',
          text: 'text-amber-400',
          stateText: 'SAN ANDREAS',
          stateColor: 'text-amber-400'
        };
    }
  };

  const styles = getPlateStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-amber-400" />
            <h3 className="font-heading font-black text-2xl text-white uppercase tracking-wider">
              PERSONALIZED LICENSE PLATE CREATOR
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live 3D Plate Canvas */}
        <div className="my-8 flex justify-center">
          <div
            className={`w-full max-w-md h-48 rounded-xl p-4 flex flex-col justify-between items-center relative shadow-2xl transition-all ${styles.bg}`}
          >
            {/* Corner bolt holes */}
            <div className="absolute top-3 left-4 w-3.5 h-3.5 rounded-full bg-zinc-800/80 border border-zinc-600 shadow-inner flex items-center justify-center">
              <div className="w-1.5 h-0.5 bg-zinc-400" />
            </div>
            <div className="absolute top-3 right-4 w-3.5 h-3.5 rounded-full bg-zinc-800/80 border border-zinc-600 shadow-inner flex items-center justify-center">
              <div className="w-1.5 h-0.5 bg-zinc-400" />
            </div>
            <div className="absolute bottom-3 left-4 w-3.5 h-3.5 rounded-full bg-zinc-800/80 border border-zinc-600 shadow-inner flex items-center justify-center">
              <div className="w-1.5 h-0.5 bg-zinc-400" />
            </div>
            <div className="absolute bottom-3 right-4 w-3.5 h-3.5 rounded-full bg-zinc-800/80 border border-zinc-600 shadow-inner flex items-center justify-center">
              <div className="w-1.5 h-0.5 bg-zinc-400" />
            </div>

            {/* State Header */}
            <span className={`text-xs font-heading font-black tracking-[0.3em] uppercase ${styles.stateColor}`}>
              {styles.stateText}
            </span>

            {/* Embossed Vanity Text */}
            <div
              className={`font-mono text-4xl sm:text-5xl font-black tracking-widest ${styles.text}`}
              style={{ letterSpacing: '0.25em' }}
            >
              {plateText || '••••••••'}
            </div>

            {/* Bottom Footer Details */}
            <div className="w-full flex justify-between px-6 text-[9px] font-mono text-zinc-500 uppercase">
              <span>LOS SANTOS</span>
              <span>OCT • 2026</span>
            </div>
          </div>
        </div>

        {/* Plate Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Plate Text (Max 8 characters)
            </label>
            <input
              type="text"
              value={plateText}
              onChange={handleTextChange}
              maxLength={8}
              placeholder="ENTER TEXT"
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded text-center text-xl font-mono font-bold text-amber-400 uppercase tracking-widest focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Select Jurisdiction Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPlateStyle('sa-black')}
                className={`p-2 rounded border text-center font-semibold transition-colors ${
                  plateStyle === 'sa-black'
                    ? 'bg-amber-400 text-black border-amber-400'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-800'
                }`}
              >
                San Andreas Gold
              </button>
              <button
                type="button"
                onClick={() => setPlateStyle('vice-neon')}
                className={`p-2 rounded border text-center font-semibold transition-colors ${
                  plateStyle === 'vice-neon'
                    ? 'bg-pink-600 text-white border-pink-500'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-800'
                }`}
              >
                Vice City Neon
              </button>
              <button
                type="button"
                onClick={() => setPlateStyle('liberty-blue')}
                className={`p-2 rounded border text-center font-semibold transition-colors ${
                  plateStyle === 'liberty-blue'
                    ? 'bg-sky-600 text-white border-sky-400'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-800'
                }`}
              >
                Liberty Navy
              </button>
              <button
                type="button"
                onClick={() => setPlateStyle('sa-exempt')}
                className={`p-2 rounded border text-center font-semibold transition-colors ${
                  plateStyle === 'sa-exempt'
                    ? 'bg-zinc-200 text-black border-zinc-400'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-800'
                }`}
              >
                State Exempt
              </button>
            </div>
          </div>
        </div>

        {/* Order Action Button */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
          <span className="text-xs text-zinc-400">
            Pushed instantly to Los Santos Customs
          </span>

          {ordered ? (
            <div className="px-5 py-2.5 bg-emerald-500 text-black font-heading font-bold uppercase text-xs rounded flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Plate Dispatched to Garage!</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleOrder}
              disabled={!plateText.trim()}
              className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-heading font-bold uppercase text-xs tracking-wider rounded transition-colors cursor-pointer"
            >
              Order Plate To Game
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
