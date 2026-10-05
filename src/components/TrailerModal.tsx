import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Check } from 'lucide-react';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  duration?: string;
  onPreOrder: () => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({
  isOpen,
  onClose,
  title,
  duration = '3:45',
  onPreOrder
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      return;
    }
    setIsPlaying(true);
  }, [isOpen]);

  // Simulate video playback progress
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 200);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Top Header Bar */}
        <div className="p-4 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <h3 className="font-heading font-bold text-lg sm:text-xl text-white uppercase tracking-wider">
              {title || 'GRAND THEFT AUTO VI — EXTENDED LOOK'}
            </h3>
            <span className="hidden sm:inline text-xs font-mono text-zinc-400 bg-black/60 px-2 py-0.5 rounded border border-zinc-800">
              4K 60FPS HDR
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas / Player Simulator */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop"
            alt="Trailer Video Canvas"
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isPlaying ? 'opacity-90' : 'opacity-60 brightness-75'
            }`}
          />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Center Play Overlay if paused */}
          {!isPlaying && (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="absolute p-6 rounded-full bg-amber-400/90 text-black hover:scale-110 transition-transform shadow-2xl cursor-pointer"
            >
              <Play className="w-10 h-10 fill-current ml-1" />
            </button>
          )}

          {/* Video Lower Third Title */}
          <div className="absolute top-6 left-6 max-w-md pointer-events-none">
            <span className="px-2 py-0.5 rounded bg-amber-400 text-black text-[10px] font-heading font-black tracking-widest uppercase">
              Official World Premiere
            </span>
            <p className="text-white text-base sm:text-lg font-heading font-bold uppercase mt-1 drop-shadow-md">
              Leonida Living Simulation Engine
            </p>
          </div>

          {/* Video Control Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2">
            {/* Scrubber */}
            <div
              className="w-full h-1.5 bg-zinc-800 hover:h-2.5 rounded-full cursor-pointer relative overflow-hidden transition-all"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                setProgress((clickX / rect.width) * 100);
              }}
            >
              <div
                className="h-full bg-amber-400 rounded-full relative"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-300">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1 hover:text-amber-400 transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1 hover:text-amber-400 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <span className="font-mono text-[11px] text-zinc-400">
                  {Math.floor((progress / 100) * 225)}s / {duration}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onPreOrder();
                  }}
                  className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-black font-heading font-bold uppercase text-xs tracking-wider rounded transition-colors"
                >
                  Pre-Order Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Metadata Bottom Bar */}
        <div className="p-4 bg-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Captured in real time on PlayStation 5 and Xbox Series X</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Replay Video</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Share Broadcast</span>
          </div>
        </div>
      </div>
    </div>
  );
};
