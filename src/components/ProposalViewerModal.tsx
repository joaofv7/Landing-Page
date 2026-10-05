import React, { useState } from 'react';
import { X, Printer, Copy, Check, ExternalLink, Calendar, FileText, Download } from 'lucide-react';

interface ProposalViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposalId: string;
  htmlContent: string;
  clientName?: string;
  total?: number;
}

export const ProposalViewerModal: React.FC<ProposalViewerModalProps> = ({
  isOpen,
  onClose,
  proposalId,
  htmlContent,
  clientName,
  total
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const CAL_URL = "https://cal.com/joao-correia-lus35m/30min";

  if (!isOpen) return null;

  const handleCopyLink = () => {
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    const url = `${origin}${pathname}#view-proposal-${proposalId}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 300);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#11131a] border border-amber-500/40 rounded-2xl overflow-hidden shadow-2xl my-6 flex flex-col max-h-[92vh]">
        
        {/* Top Action Bar */}
        <div className="px-6 py-4 bg-zinc-900 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-400 text-black flex items-center justify-center font-heading font-black text-lg shadow-sm">
              R★
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-heading font-bold text-white uppercase tracking-wide">
                  Official Proposal Document
                </h3>
                <span className="font-mono text-xs text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  {proposalId}
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Generated for <strong className="text-zinc-200">{clientName || 'Authorized Client'}</strong>
                {total ? ` • Grand Total: €${total.toFixed(2)} (incl. 23% VAT)` : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Copy Shareable Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-heading font-bold uppercase text-zinc-200 transition-colors flex items-center gap-1.5 cursor-pointer border border-zinc-700"
              title="Copy shareable link directly to this proposal"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Link Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Copiar Link</span>
                </>
              )}
            </button>

            {/* Print / Download Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-heading font-bold uppercase text-zinc-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Print document or save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            {/* Copy HTML */}
            <button
              type="button"
              onClick={handleCopyHtml}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-heading font-bold uppercase text-zinc-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="hidden sm:inline">Copy HTML</span>
                </>
              )}
            </button>

            {/* Cal.com CTA */}
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-heading font-black uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-md shadow-amber-400/20 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-black" />
              <span>Review on Cal.com</span>
            </a>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Rendered HTML Document Frame */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0b0c10]">
          <iframe
            title="Generated Proposal HTML"
            srcDoc={htmlContent}
            className="w-full min-h-[580px] h-[65vh] rounded-xl border border-zinc-800 bg-[#0b0c10]"
            sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          />
        </div>

        {/* Footer info bar */}
        <div className="px-6 py-3 bg-zinc-950 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-400 shrink-0">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Stored in Cloud Firestore & Ready for Publisher SLA Signature
          </span>
          <span className="text-[11px] text-zinc-400 font-mono">
            Direct Link: https://cal.com/joao-correia-lus35m/30min
          </span>
        </div>

      </div>
    </div>
  );
};
