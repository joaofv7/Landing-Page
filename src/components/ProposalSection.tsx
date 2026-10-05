import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Layers, 
  Building2, 
  Copy, 
  Check, 
  ArrowRight, 
  AlertCircle,
  Info,
  Calendar,
  ChevronDown,
  Mail,
  Eye,
  FileCheck
} from 'lucide-react';
import { 
  REFERENCE_CATALOG, 
  ProposalWorkflowResult,
  executeProposalWorkflow,
  validateProposalRequest 
} from '../services/proposalService';

interface ProposalSectionProps {
  onOpenGeneratedProposal?: (result: ProposalWorkflowResult) => void;
  onOpenAdminDashboard?: () => void;
}

export const ProposalSection: React.FC<ProposalSectionProps> = ({
  onOpenGeneratedProposal,
  onOpenAdminDashboard
}) => {
  // Form State with exactly 3 mandatory fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [requestText, setRequestText] = useState('');

  // Selected catalog item for guidance / auto-population
  const [selectedCatalogId, setSelectedCatalogId] = useState<string | null>(null);

  // Status & Validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionWorkflowResult, setSubmissionWorkflowResult] = useState<ProposalWorkflowResult | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Ref to form for smooth scrolling
  const formRef = useRef<HTMLDivElement | null>(null);

  // Quick insertion from knowledge base cards
  const handleSelectCatalogItem = (item: typeof REFERENCE_CATALOG[0]) => {
    setSelectedCatalogId(item.id);
    
    const suggestedText = `[Inquiry Target: ${item.name} (${item.price})]\nWe would like an official proposal for ${item.name}.\n- Quantity: 1 unit/license\n- Deployment Schedule: Day-1 Launch Allocation\n- Special Requests / Custom Bundles: Please include standard delivery terms and corporate licensing breakdown.`;

    if (!requestText.trim()) {
      setRequestText(suggestedText);
    } else if (!requestText.includes(item.name)) {
      setRequestText(prev => `${prev.trim()}\n\n[Included Item: ${item.name} (${item.price})]`);
    }

    // Smooth scroll down to form
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const handleClearSelection = () => {
    setSelectedCatalogId(null);
  };

  const handleCopyReference = (refId: string) => {
    navigator.clipboard.writeText(refId);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const selectedItem = REFERENCE_CATALOG.find(i => i.id === selectedCatalogId);
    const selectedTier = selectedItem ? selectedItem.name : undefined;

    // 1. Client-side form validation
    const validation = validateProposalRequest({
      name,
      email,
      requestText
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // 2. Loading state & execution
    setIsSubmitting(true);
    try {
      // Complete backend workflow:
      // a) Save initial proposal to Firestore (status: 'processing')
      // b) LLM Request interpretation & automated proposal calculation via Gemini API
      // c) Generate official HTML proposal document
      // d) Save calculated proposal, items, total, and HTML to Firestore (status: 'completed')
      // e) Return workflow result for screen display
      const result = await executeProposalWorkflow({
        name,
        email,
        requestText,
        selectedTier
      });

      setSubmissionWorkflowResult(result);

      // Smooth scroll to confirmation view
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      setErrors({ form: err.message || 'Failed to submit proposal request. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setRequestText('');
    setSelectedCatalogId(null);
    setSubmissionWorkflowResult(null);
    setErrors({});
  };

  return (
    <section id="proposal" className="py-24 bg-[#0d0e14] border-t border-zinc-800/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[300px] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-heading font-bold tracking-widest uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            AUTOMATED QUOTE & PROPOSAL WORKFLOW
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-white uppercase">
            REQUEST A PROPOSAL / <span className="text-amber-400">CUSTOM QUOTE</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-body leading-relaxed">
            Describe your requirements (e.g., custom editions, GTA Online enterprise packages, corporate esports/streaming events, or exclusive merchandise) and our system will generate a personalized official proposal.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-300">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900/80 border border-zinc-800 text-zinc-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Instant LLM Calculation & HTML Output
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900/80 border border-zinc-800 text-zinc-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Synced in Cloud Firestore Database
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900/80 border border-zinc-800 text-zinc-300">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              Includes 23% VAT & Cal.com Scheduling
            </span>
          </div>
        </div>

        {/* 3. KNOWLEDGE BASE (Pricing Catalog Reference Cards) */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-950/80 border border-zinc-800/90 rounded-2xl p-5 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" />
                <h3 className="font-heading font-bold text-white uppercase text-lg sm:text-xl tracking-wide">
                  Knowledge Base & Reference Pricing Catalog
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Official pricing baselines recognized by our Gemini AI Proposal Engine. Click any card to populate your request.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <span className="text-[11px] font-mono font-semibold px-3 py-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-300 rounded-lg">
                6 Published Tiers
              </span>
            </div>
          </div>

          {/* Cards Grid: Exactly 6 Reference Editions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {REFERENCE_CATALOG.map((item) => {
              const isSelected = selectedCatalogId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectCatalogItem(item)}
                  className={`group relative rounded-xl p-4 cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-zinc-900 border-amber-400 shadow-xl shadow-amber-400/15 ring-2 ring-amber-400 -translate-y-1'
                      : item.highlight
                      ? 'bg-zinc-950/90 border-amber-400/60 hover:border-amber-400 hover:bg-zinc-900/60'
                      : 'bg-zinc-950/70 border-zinc-800/90 hover:border-zinc-700 hover:bg-zinc-900/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[9px] font-heading font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        item.highlight 
                          ? 'bg-amber-400 text-black' 
                          : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                      }`}>
                        {item.badge}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-mono font-bold text-amber-400 flex items-center gap-0.5">
                          <Check className="w-3 h-3" />
                          Added
                        </span>
                      )}
                    </div>

                    <h4 className="font-heading font-bold text-sm text-white group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">
                      {item.name}
                    </h4>

                    {/* Price Tag */}
                    <div className="mt-2 text-lg font-mono font-black text-amber-400">
                      {item.price}
                    </div>

                    {/* Description */}
                    <p className="text-[11px] text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Select Action */}
                  <div className="mt-4 pt-2.5 border-t border-zinc-800">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectCatalogItem(item);
                      }}
                      className={`w-full py-1.5 px-2 rounded-lg text-[11px] font-heading font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                        isSelected
                          ? 'bg-amber-400 text-black'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <span>Add to Request</span>
                          <ChevronDown className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. CLIENT FORM ("Pedido de Proposta" - 3 Mandatory Fields) */}
        <div ref={formRef} id="proposal-form-section" className="max-w-4xl mx-auto">
          
          {/* Success Confirmation State & Generated Proposal Feedback */}
          {submissionWorkflowResult ? (
            <div className="bg-zinc-950 border border-amber-400/50 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all duration-300 animate-fadeIn">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500" />
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <span className="px-3.5 py-1 rounded bg-amber-400/10 border border-amber-400/20 text-amber-400 font-heading text-xs font-bold tracking-widest uppercase mb-2">
                  STORED IN CLOUD FIRESTORE • STATUS: COMPLETED
                </span>

                {/* Success Title */}
                <h3 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-wide uppercase">
                  Proposal Request Submitted & Calculated Successfully!
                </h3>

                {/* Automated quote calculation badge showing grand total with 23% VAT */}
                <div className="mt-4 p-4 rounded-xl bg-amber-400/10 border border-amber-400/30 text-center max-w-xl w-full">
                  <span className="text-xs uppercase font-heading font-bold text-amber-400 tracking-wider block mb-1">
                    Automated Quoted Grand Total (incl. 23% VAT)
                  </span>
                  <div className="text-3xl sm:text-4xl font-mono font-black text-white">
                    €{submissionWorkflowResult.calculation.grandTotal.toFixed(2)}
                  </div>
                  <div className="mt-1 text-xs text-zinc-400 font-mono">
                    Net Subtotal: €{submissionWorkflowResult.calculation.subtotal.toFixed(2)} • VAT (23%): €{submissionWorkflowResult.calculation.vatAmount.toFixed(2)}
                  </div>
                </div>

                {/* Dedicated Email Dispatch Notification required by specification */}
                <div className="mt-4 p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-200 text-sm font-medium flex flex-col sm:flex-row items-center justify-between gap-3 max-w-xl w-full text-left shadow-lg shadow-emerald-950/40">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <span className="font-heading font-bold text-white block">
                        Proposta enviada por email com sucesso para <span className="text-amber-400 font-mono">{submissionWorkflowResult.email}</span> com o link de acesso direto!
                      </span>
                      <span className="text-[11px] text-zinc-400 flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Status Resend API: {submissionWorkflowResult.emailStatus === 'sent' ? 'Enviado (Resend API)' : 'Processado'} {submissionWorkflowResult.resendId ? `• ID: ${submissionWorkflowResult.resendId.slice(0, 14)}...` : ''}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Shareable Proposal URL Bar */}
                <div className="mt-4 p-3 bg-zinc-900/90 border border-zinc-800 rounded-xl max-w-xl w-full flex items-center justify-between gap-2">
                  <div className="overflow-hidden text-left">
                    <span className="text-[10px] uppercase font-mono text-zinc-500 block">Link Direto da Proposta:</span>
                    <span className="text-xs font-mono text-amber-300/90 truncate block">
                      {submissionWorkflowResult.proposalUrl}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(submissionWorkflowResult.proposalUrl);
                      setCopiedRef(true);
                      setTimeout(() => setCopiedRef(false), 2000);
                    }}
                    className="shrink-0 px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-xs font-heading font-bold uppercase text-zinc-200 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedRef ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-amber-400" />
                        <span>Copiar Link</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Reference ID Pill */}
                <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 bg-zinc-900/90 border border-zinc-800 rounded-xl px-5 py-3.5 w-full max-w-md justify-between">
                  <div className="text-left">
                    <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-zinc-400 block">
                      Proposal Reference Code
                    </span>
                    <span className="font-mono text-base font-bold text-amber-400 tracking-wider">
                      {submissionWorkflowResult.proposalId}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyReference(submissionWorkflowResult.proposalId)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 transition-colors cursor-pointer"
                  >
                    {copiedRef ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Extracted Items Breakdown */}
                <div className="mt-6 w-full text-left bg-zinc-900/60 border border-zinc-800/90 rounded-xl p-5 space-y-3 text-sm">
                  <div className="flex justify-between items-center pb-2.5 border-b border-zinc-800">
                    <span className="text-zinc-400">Authorized Recipient:</span>
                    <span className="font-semibold text-white">{submissionWorkflowResult.name}</span>
                  </div>

                  <div className="pb-2.5 border-b border-zinc-800">
                    <span className="text-zinc-400 text-xs uppercase font-mono block mb-2">Itemized Breakdown:</span>
                    <div className="space-y-1.5">
                      {submissionWorkflowResult.calculation.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs bg-zinc-950 p-2 rounded border border-zinc-850">
                          <div>
                            <span className="font-medium text-white">{it.name}</span>
                            <span className="text-zinc-500 ml-2">× {it.quantity} (at €{it.unitPrice.toFixed(2)})</span>
                          </div>
                          <span className="font-mono font-bold text-amber-400">€{it.lineTotal.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-zinc-400 text-xs block mb-1">Original Request Context:</span>
                    <p className="text-xs text-zinc-300 bg-zinc-950/80 p-3 rounded border border-zinc-800 whitespace-pre-line font-mono max-h-32 overflow-y-auto">
                      {submissionWorkflowResult.requestText}
                    </p>
                  </div>
                </div>

                {/* 4.e Direct Clickable Button to View Generated Proposal (HTML) */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenGeneratedProposal) {
                        onOpenGeneratedProposal(submissionWorkflowResult);
                      }
                    }}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-black font-heading font-black text-sm uppercase tracking-wider transition-all shadow-xl shadow-amber-400/25 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <Eye className="w-4 h-4 text-black" />
                    <span>View Your Generated Proposal (HTML)</span>
                  </button>

                  <a
                    href="https://cal.com/joao-correia-lus35m/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-heading font-bold text-sm uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 border border-zinc-700 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Schedule Review on Cal.com</span>
                  </a>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="text-zinc-400 hover:text-white underline cursor-pointer"
                  >
                    Submit Another Proposal Request
                  </button>
                  {onOpenAdminDashboard && (
                    <button
                      type="button"
                      onClick={onOpenAdminDashboard}
                      className="text-amber-400 hover:text-amber-300 underline cursor-pointer font-medium"
                    >
                      Open Backend Proposals Dashboard &rarr;
                    </button>
                  )}
                </div>

              </div>
            </div>
          ) : (
            /* Dedicated, Clearly Visible Form ("Pedido de Proposta" with 3 mandatory fields) */
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative">
              <div className="absolute -top-3.5 left-8 px-4 py-1 bg-amber-400 text-black text-xs font-heading font-black uppercase tracking-wider rounded shadow-md">
                Pedido de Proposta • Official Request
              </div>

              {/* Form Title & Context */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pt-2 pb-6 border-b border-zinc-800/80">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-wide uppercase">
                    Request a Proposal
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1.5">
                    Fill out the 3 mandatory fields below. Our automated system calculates your official proposal with itemized pricing, 23% VAT, and creates your downloadable HTML document.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
              </div>

              {/* Active Selection Banner if user selected a catalog card */}
              {selectedCatalogId && (
                <div className="mb-6 p-4 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-xs font-heading font-bold text-amber-400 uppercase tracking-wider block">
                        Knowledge Base Item Referenced:
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {REFERENCE_CATALOG.find(i => i.id === selectedCatalogId)?.name} ({REFERENCE_CATALOG.find(i => i.id === selectedCatalogId)?.price})
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearSelection}
                    className="text-xs text-zinc-400 hover:text-white underline cursor-pointer shrink-0"
                  >
                    Clear Selection
                  </button>
                </div>
              )}

              {/* General Form Error Banner */}
              {errors.form && (
                <div className="mb-6 p-4 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-center gap-2.5">
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                  <span>{errors.form}</span>
                </div>
              )}

              {/* Form with exactly 3 mandatory fields */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Full Name (text input) */}
                <div>
                  <label 
                    htmlFor="proposal-name" 
                    className="block text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-zinc-200 mb-2"
                  >
                    Full Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="proposal-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                    }}
                    placeholder="e.g. John Doe or Jane Smith"
                    className={`w-full px-4 py-3.5 rounded-xl bg-zinc-900 border ${
                      errors.name 
                        ? 'border-rose-500 ring-1 ring-rose-500' 
                        : 'border-zinc-800 focus:border-amber-400'
                    } text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* 2. Email Address (email input) */}
                <div>
                  <label 
                    htmlFor="proposal-email" 
                    className="block text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-zinc-200 mb-2"
                  >
                    Email Address <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="proposal-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                    }}
                    placeholder="name@organization.com"
                    className={`w-full px-4 py-3.5 rounded-xl bg-zinc-900 border ${
                      errors.email 
                        ? 'border-rose-500 ring-1 ring-rose-500' 
                        : 'border-zinc-800 focus:border-amber-400'
                    } text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* 3. Request Description (textarea / open free-text field) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label 
                      htmlFor="proposal-description" 
                      className="block text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-zinc-200"
                    >
                      Request Description <span className="text-amber-400">*</span>
                    </label>
                    <span className="text-xs text-zinc-500 font-mono">
                      {requestText.length} characters
                    </span>
                  </div>
                  <textarea
                    id="proposal-description"
                    name="requestText"
                    required
                    rows={6}
                    value={requestText}
                    onChange={(e) => {
                      setRequestText(e.target.value);
                      if (errors.requestText) setErrors(prev => ({ ...prev, requestText: '' }));
                    }}
                    placeholder="Freely describe your custom request, desired editions, quantities, or event/sponsorship needs (e.g. 'We need 5 copies of GTA VI Standard Edition and 1 Enterprise Commercial Sponsorship Tier for our esports tournament')..."
                    className={`w-full px-4 py-3.5 rounded-xl bg-zinc-900 border ${
                      errors.requestText 
                        ? 'border-rose-500 ring-1 ring-rose-500' 
                        : 'border-zinc-800 focus:border-amber-400'
                    } text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors resize-y leading-relaxed font-body`}
                  />
                  {errors.requestText && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.requestText}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-zinc-400 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>
                      Our Gemini AI automated quote engine will read your text, extract quantities, calculate unit costs, add 23% VAT, and generate your official proposal.
                    </span>
                  </p>
                </div>

                {/* Submit button: "Submit Proposal Request" */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="submit-proposal-btn"
                    className={`w-full py-4 px-8 rounded-xl font-heading font-black text-base uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer ${
                      isSubmitting
                        ? 'bg-amber-500/50 text-black/60 cursor-not-allowed'
                        : 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-black shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 hover:-translate-y-0.5 active:translate-y-0'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                        <span>Processing & Calculating Proposal via AI...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Proposal Request</span>
                        <Send className="w-4 h-4 text-black" />
                      </>
                    )}
                  </button>
                </div>

                {/* Bottom trust footer */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-2 border-t border-zinc-800/80">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Cloud Firestore Connected • 23% VAT Included</span>
                  </span>
                  <span>
                    Need to discuss requirements live? <a href="https://cal.com/joao-correia-lus35m/30min" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">Book 30-min on Cal.com</a>
                  </span>
                </div>
              </form>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
