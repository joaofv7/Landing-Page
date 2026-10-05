import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search, ShieldCheck, Calendar, UserCheck, HardDrive, ExternalLink } from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'Account Linking' | 'Launcher Support' | 'Meetings & Sessions' | 'Entitlements' | 'Support Policies';
  question: string;
  answer: string;
  takeaway: string;
  iconType: 'account' | 'launcher' | 'meeting' | 'entitlement' | 'policy';
}

const PRIMARY_FAQS: FaqItem[] = [
  {
    id: 'faq-account-linking',
    category: 'Account Linking',
    question: 'How do I link my PlayStation, Xbox, Steam, or Epic Games account to Rockstar Games Social Club?',
    answer: 'To link your console or PC platform: 1) Sign in to your Rockstar Games Social Club profile at socialclub.rockstargames.com. 2) Click your avatar in the upper-right corner and select "Settings" > "Linked Accounts". 3) Click "Link Account" adjacent to your desired platform (PlayStation Network, Xbox Live, Steam, Epic Games, or Twitch). 4) Complete the secure external provider authorization. Once authenticated, your cross-platform career stats, exclusive rewards, GTA+ benefits, and cloud saves synchronize automatically across all connected devices.',
    takeaway: 'One Social Club profile securely connects all your console and PC gaming progress.',
    iconType: 'account'
  },
  {
    id: 'faq-launcher-support',
    category: 'Launcher Support',
    question: 'What steps resolve Rockstar Games Launcher crashes, update stalls, or Error Code 1000.50?',
    answer: 'For Launcher connectivity or startup issues: 1) Right-click the Rockstar Games Launcher desktop icon and choose "Run as Administrator". 2) Open Launcher Settings > "My Installed Games", select your title, and click "Verify Game File Integrity" to repair missing binaries without re-downloading the entire game. 3) If Error 1000.50 or infinite loading persists, close the launcher from Task Manager and delete the temporary cache folder at %localappdata%\\Rockstar Games\\Launcher. 4) If you still experience issues, book a direct 30-minute support session with our engineering team using the scheduler above.',
    takeaway: 'Verifying game file integrity and purging the local cache clears 99% of launcher errors.',
    iconType: 'launcher'
  },
  {
    id: 'faq-meetings-scheduling',
    category: 'Meetings & Sessions',
    question: 'How does the 30-minute 1-on-1 technical support meeting work, and what should I prepare?',
    answer: 'Our dedicated scheduling service powered by Cal.com connects you in a private, 1-on-1 video or audio session with a certified Rockstar Games support engineer. During the 30 minutes, our specialist can assist with live screen-sharing diagnostics for elusive PC crashes, manual Social Club account recovery, syndicate/crew configuration, or multi-platform cloud save transfers. Before joining, please have your Social Club GamerTag, primary email address, platform IDs (PSN/Xbox/Steam), and any error codes ready.',
    takeaway: 'Direct, screen-share technical resolution with zero wait lines.',
    iconType: 'meeting'
  },
  {
    id: 'faq-entitlements-sync',
    category: 'Entitlements',
    question: 'When I pre-order Grand Theft Auto VI or buy GTA+, how are entitlements synced to my game?',
    answer: 'All direct digital pre-orders and subscription entitlements are automatically registered server-side to your Social Club account at the exact moment of purchase. You do not need to enter manual 16-digit license keys. When you log in to Grand Theft Auto VI or GTA Online on your linked PlayStation 5, Xbox Series X|S, or PC, the game validates your digital entitlement certificate instantaneously. Furthermore, all digital pre-orders carry a 100% money-back guarantee anytime prior to official launch.',
    takeaway: 'Automatic server-side digital rights verification with zero license keys needed.',
    iconType: 'entitlement'
  },
  {
    id: 'faq-rescheduling-policy',
    category: 'Meetings & Sessions',
    question: 'Can I reschedule or cancel a booked technical support meeting, and is there any fee?',
    answer: 'Yes. All technical support sessions are 100% complimentary and feature flexible self-service scheduling. If your availability shifts, click the "Reschedule" or "Cancel" link inside the Google Calendar invitation or confirmation email sent immediately after booking. You can select another open slot up to 15 minutes before your scheduled appointment with zero penalties or service fees.',
    takeaway: 'Zero-cost official support with instant self-service rescheduling.',
    iconType: 'policy'
  },
  {
    id: 'faq-proposals-quotes',
    category: 'Entitlements',
    question: 'How do I request an official proposal or corporate quote for custom editions and bulk licensing?',
    answer: 'You can use the dedicated "Request a Proposal" section above to detail your requirements across GTA VI editions, GTA Online enterprise bundles, corporate esports events, or commercial sponsorships. Simply provide your Full Name, Email, and Request Description to receive an official proposal reference code and automated quote breakdown.',
    takeaway: 'Streamlined 3-field request portal with official publisher proposal reference code generation.',
    iconType: 'policy'
  }
];

interface FaqSectionProps {
  onOpenSupport?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenSupport }) => {
  // First item open by default for immediate preview
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-account-linking': true
  });
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = PRIMARY_FAQS.filter((faq) => {
    const q = searchQuery.toLowerCase();
    return (
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q) ||
      faq.category.toLowerCase().includes(q) ||
      faq.takeaway.toLowerCase().includes(q)
    );
  });

  return (
    <section id="faq" className="py-20 bg-[#0e1017] border-t border-zinc-800 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-heading font-bold tracking-widest uppercase mb-3.5">
            <HelpCircle className="w-3.5 h-3.5" />
            FREQUENTLY ASKED QUESTIONS
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-white uppercase">
            ACCOUNT, LAUNCHER & SUPPORT FAQ
          </h2>
          
          <p className="mt-3 text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Essential answers regarding Social Club account linking, Rockstar Games Launcher diagnostics, entitlement delivery, and 1-on-1 technical support sessions.
          </p>
        </div>

        {/* Search Filter Bar */}
        <div className="relative mb-8">
          <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search account linking, launcher errors, meetings, or entitlements..."
            className="w-full pl-12 pr-4 py-3.5 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
          />
        </div>

        {/* 4 to 5 Common Questions Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-zinc-900/50 rounded-xl border border-zinc-800 text-zinc-400 text-sm">
              No matching questions found for "{searchQuery}". You can schedule a direct technical support meeting above.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = !!openIds[faq.id];
              return (
                <div
                  key={faq.id}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-amber-400/60 bg-zinc-900 shadow-lg shadow-amber-400/5'
                      : 'border-zinc-800 bg-zinc-900/70 hover:border-zinc-700'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-1.5 flex-1 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-amber-400/10 text-amber-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                          {faq.category}
                        </span>
                      </div>
                      
                      <h3 className="font-heading font-bold text-lg sm:text-xl text-white uppercase tracking-wide leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <div className={`p-2 rounded-full bg-zinc-800 text-amber-400 shrink-0 transition-transform duration-200 mt-1 ${
                      isOpen ? 'rotate-180 bg-amber-400 text-black' : ''
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 pt-1 border-t border-zinc-800/80 animate-in fade-in duration-200">
                      <p className="text-sm text-zinc-300 font-body leading-relaxed">
                        {faq.answer}
                      </p>
                      
                      <div className="mt-4 pt-3.5 border-t border-zinc-800/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-zinc-400 font-mono">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="text-zinc-300 font-medium">Core Takeaway: {faq.takeaway}</span>
                        </div>

                        {faq.category === 'Meetings & Sessions' && (
                          <div className="flex items-center gap-2.5 mt-1 sm:mt-0">
                            <a
                              href="#scheduling"
                              className="text-amber-400 hover:text-amber-300 underline font-bold flex items-center gap-1"
                            >
                              <span>Go to Scheduler</span>
                            </a>
                            <span className="text-zinc-600 hidden sm:inline">•</span>
                            <a
                              href="https://cal.com/joao-correia-lus35m/30min"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-zinc-400 hover:text-amber-400 underline font-bold flex items-center gap-1"
                            >
                              <span>Open Cal.com</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Direct Link to Scheduling Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/30 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-black flex items-center justify-center font-black font-heading text-xl shrink-0 shadow">
              <Calendar className="w-6 h-6 text-black" />
            </div>
            <div>
              <h4 className="font-heading font-black text-xl text-white uppercase tracking-wide">
                Still Experiencing Unresolved Technical Hurdles?
              </h4>
              <p className="text-xs text-zinc-400 mt-1 max-w-lg">
                Skip the ticket queues. Reserve your complimentary 30-minute 1-on-1 technical session with our certified engineering specialists.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            <a
              href="#scheduling"
              className="w-full sm:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black font-heading font-extrabold uppercase text-xs tracking-wider rounded-lg shadow-lg shadow-amber-400/20 whitespace-nowrap text-center transition-all cursor-pointer"
            >
              Book 30-Min Session
            </a>
            <a
              href="https://cal.com/joao-correia-lus35m/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-heading font-bold uppercase text-xs tracking-wider rounded-lg border border-zinc-700 whitespace-nowrap text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Direct Cal.com Link</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
