import React, { useState } from 'react';
import { X, Download, ShieldCheck, HardDrive, Check, Monitor } from 'lucide-react';

interface LauncherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LauncherModal: React.FC<LauncherModalProps> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-400 text-black flex items-center justify-center font-heading text-xl font-bold rounded">
              R★
            </div>
            <div>
              <h3 className="font-heading font-black text-2xl text-white uppercase tracking-wider">
                ROCKSTAR GAMES LAUNCHER
              </h3>
              <p className="text-[11px] font-mono text-zinc-400 uppercase">Unified PC Gateway & Library</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-6 space-y-4">
          <p className="text-sm text-zinc-300 leading-relaxed font-body">
            Download the official Rockstar Games Launcher for Windows to access your complete digital PC collection, automatic game updates, and seamless cloud save synchronization.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded bg-zinc-900 border border-zinc-800 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Cloud Saves</span>
                <span className="text-zinc-400">Never lose progress across multiple PC setups.</span>
              </div>
            </div>

            <div className="p-3 rounded bg-zinc-900 border border-zinc-800 flex items-start gap-2.5">
              <HardDrive className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Automatic Patching</span>
                <span className="text-zinc-400">Zero wait times on weekly content drops.</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded bg-black/60 border border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
            <span>Version: 1.0.84 • 112MB Installer</span>
            <span>Windows 10 / 11 (64-Bit)</span>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
          <span className="text-xs text-zinc-400">100% Free & Secure Official Download</span>

          {downloaded ? (
            <div className="px-6 py-2.5 bg-emerald-500 text-black font-heading font-bold uppercase text-xs rounded flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Installer Ready In Downloads!</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-heading font-bold uppercase text-xs tracking-wider rounded flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Preparing Package...' : 'Download for Windows'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
