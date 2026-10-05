import React, { useState, useEffect } from 'react';
import { 
  X, 
  Layers, 
  Search, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  Eye, 
  ExternalLink, 
  Shield, 
  AlertCircle,
  FileText,
  DollarSign,
  ChevronRight,
  Database,
  Copy,
  Check,
  Mail
} from 'lucide-react';
import { subscribeToProposals, StoredProposal } from '../services/firebase';

interface AdminProposalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProposalHtml: (proposal: StoredProposal) => void;
}

export const AdminProposalsModal: React.FC<AdminProposalsModalProps> = ({
  isOpen,
  onClose,
  onOpenProposalHtml
}) => {
  const [proposals, setProposals] = useState<StoredProposal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'processing'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Real-time Firestore listener with fallback
    const unsubscribe = subscribeToProposals((data) => {
      setProposals(data);
    });

    return () => {
      unsubscribe();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  // Filtered proposals
  const filtered = proposals.filter((p) => {
    const matchesSearch = 
      p.proposalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.requestText && p.requestText.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Metrics
  const totalProposals = proposals.length;
  const completedProposals = proposals.filter(p => p.status === 'completed').length;
  const totalVolume = proposals
    .filter(p => p.total)
    .reduce((sum, p) => sum + (p.total || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-[#0e1017] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl my-6 flex flex-col max-h-[94vh]">
        
        {/* Header Bar */}
        <div className="p-6 bg-zinc-900 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-400 text-black flex items-center justify-center font-heading font-black text-xl shadow-md shadow-amber-400/20">
              R★
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-heading font-black text-white uppercase tracking-tight">
                  Backend Proposals Dashboard
                </h3>
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Firestore Live Sync
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Real-time review and management of official client proposal submissions and automated LLM quotes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleRefresh}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
              title="Refresh real-time data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Stat Cards */}
        <div className="p-6 bg-black/40 border-b border-zinc-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 shrink-0">
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-zinc-400 block mb-1">
              Total Logged Proposals
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-heading font-black text-white">{totalProposals}</span>
              <span className="text-xs text-zinc-400">in Cloud Firestore</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-zinc-400 block mb-1">
              Completed LLM Quotes
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-heading font-black text-emerald-400">{completedProposals}</span>
              <span className="text-xs text-emerald-500/80">Ready with HTML docs</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-zinc-400 block mb-1">
              Total Pipeline Quoted Value
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono font-black text-amber-400">
                €{totalVolume.toFixed(2)}
              </span>
              <span className="text-xs text-zinc-400">incl. 23% VAT</span>
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="px-6 py-4 bg-zinc-950/80 border-b border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Proposal ID, Customer, Email..."
              className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-zinc-400 uppercase font-mono">Filter:</span>
            {(['all', 'completed', 'processing'] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded text-xs font-heading font-bold uppercase tracking-wider transition-colors ${
                  statusFilter === status
                    ? 'bg-amber-400 text-black'
                    : 'bg-zinc-800 text-zinc-300 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Proposals Data Table */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <Database className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <h4 className="text-lg font-heading font-bold text-white uppercase">
                No Proposals Found
              </h4>
              <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                {proposals.length === 0 
                  ? 'Submit your first proposal request using the "Request a Proposal" section on the landing page!'
                  : 'No proposals match the current filter or search criteria.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((item) => {
                const isExpanded = expandedId === item.proposalId;

                return (
                  <div
                    key={item.proposalId}
                    className="rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900/90 transition-colors overflow-hidden"
                  >
                    {/* Primary Row */}
                    <div className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      
                      {/* Left: ID & Customer */}
                      <div className="flex items-start sm:items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-sm font-bold text-amber-400">
                              {item.proposalId}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-heading font-bold uppercase tracking-wider ${
                              item.status === 'completed'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-400/10 text-amber-400 border border-amber-400/30'
                            }`}>
                              {item.status}
                            </span>

                            {/* Email Status Badge required by specification */}
                            {item.emailStatus === 'sent' ? (
                              <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-heading font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" title={`Resend ID: ${item.resendId || 'sent'}`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                SENT via Resend
                              </span>
                            ) : item.emailStatus === 'error' ? (
                              <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-heading font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/30" title={item.emailError || 'Failed to dispatch via Resend'}>
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                                Email Error
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-heading font-bold uppercase tracking-wider bg-zinc-800 text-zinc-400 border border-zinc-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                                Resend Pending
                              </span>
                            )}
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                            <strong className="text-white">{item.name}</strong>
                            <span className="text-zinc-500">•</span>
                            <span className="font-mono text-zinc-400">{item.email}</span>
                          </div>
                        </div>
                      </div>

                      {/* Middle: Date & Total Amount */}
                      <div className="flex flex-wrap items-center gap-6 text-xs">
                        <div>
                          <span className="text-zinc-500 text-[10px] uppercase block">Submission Date</span>
                          <span className="text-zinc-300 font-mono">{item.submissionDate}</span>
                        </div>

                        <div>
                          <span className="text-zinc-500 text-[10px] uppercase block">Total Amount</span>
                          <span className="font-mono text-base font-black text-amber-400">
                            {item.total ? `€${item.total.toFixed(2)}` : 'Calculating...'}
                          </span>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2">
                        {/* Copy Proposal Link Action */}
                        <button
                          type="button"
                          onClick={() => {
                            const origin = window.location.origin;
                            const pathname = window.location.pathname;
                            const url = item.proposalUrl || `${origin}${pathname}#view-proposal-${item.proposalId}`;
                            navigator.clipboard.writeText(url);
                            setCopiedId(item.proposalId);
                            setTimeout(() => setCopiedId(null), 2000);
                          }}
                          className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-heading font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer border border-zinc-700"
                          title="Copy shareable link directly to this proposal"
                        >
                          {copiedId === item.proposalId ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-amber-400" />
                              <span className="hidden sm:inline">Copy Proposal Link</span>
                            </>
                          )}
                        </button>

                        {item.htmlContent ? (
                          <button
                            type="button"
                            onClick={() => onOpenProposalHtml(item)}
                            className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-heading font-black uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shadow-amber-400/20"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Open Proposal HTML</span>
                          </button>
                        ) : (
                          <span className="text-xs text-zinc-500 italic">Processing HTML...</span>
                        )}

                        <button
                          type="button"
                          onClick={() => setExpandedId(isExpanded ? null : item.proposalId)}
                          className="px-2.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition-colors cursor-pointer"
                          title="Toggle details"
                        >
                          <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        </button>
                      </div>

                    </div>

                    {/* Expandable Details Tray */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 border-t border-zinc-800/80 bg-black/40 text-xs space-y-3">
                        <div>
                          <span className="text-[11px] font-heading font-bold uppercase text-zinc-400 tracking-wider block mb-1">
                            Client Free-Text Specifications:
                          </span>
                          <p className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/90 text-zinc-300 font-mono whitespace-pre-line leading-relaxed">
                            {item.requestText}
                          </p>
                        </div>

                        {item.items && item.items.length > 0 && (
                          <div>
                            <span className="text-[11px] font-heading font-bold uppercase text-zinc-400 tracking-wider block mb-1">
                              LLM Extracted Item Breakdown:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                              {item.items.map((prod, idx) => (
                                <div key={idx} className="p-2.5 rounded bg-zinc-950 border border-zinc-850 flex items-center justify-between">
                                  <div>
                                    <span className="font-semibold text-white block">{prod.name}</span>
                                    <span className="text-[11px] text-zinc-400">Qty: {prod.quantity} × €{prod.unitPrice.toFixed(2)}</span>
                                  </div>
                                  <span className="font-mono font-bold text-amber-400">€{prod.lineTotal.toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-zinc-400 text-[11px]">
                          <span>
                            Subtotal: €{item.subtotal?.toFixed(2) || '0.00'} • 23% VAT: €{item.vatAmount?.toFixed(2) || '0.00'} • Grand Total: €{item.total?.toFixed(2) || '0.00'}
                          </span>
                          <a
                            href="https://cal.com/joao-correia-lus35m/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-400 hover:underline flex items-center gap-1"
                          >
                            <span>Schedule Review on Cal.com</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="px-6 py-4 bg-zinc-950 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400 shrink-0">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Encrypted Cloud Firestore Storage • Direct Rockstar Publisher Authority</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
