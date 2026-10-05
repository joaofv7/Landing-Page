import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Calendar, 
  HardDrive, 
  ShieldCheck, 
  ChevronRight, 
  RotateCcw, 
  ExternalLink,
  Bot
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  action?: {
    label: string;
    href?: string;
    onClickScrollId?: string;
  };
}

const QUICK_REPLIES = [
  "How do I link my Social Club account?",
  "Launcher won't open / error 1000.50",
  "Schedule a 1-on-1 support meeting",
  "Request a custom quote & proposal",
  "GTA VI pre-order editions & delivery",
  "What perks do GTA+ members get?"
];

const CAL_URL = "https://cal.com/joao-correia-lus35m/30min";

export const ChatBotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: "Welcome to Rockstar Games Support Dispatch. I'm your automated assistant. How can we optimize your gaming ecosystem today?",
      timestamp: 'Just now'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages, isTyping]);

  const generateBotReply = (query: string): { 
    text: string; 
    action?: { label: string; href?: string; onClickScrollId?: string } 
  } => {
    const q = query.toLowerCase().trim();

    // 1. GREETINGS & INTRODUCTIONS
    if (/^(hi|hello|hey|greetings|sup|yo|good (morning|afternoon|evening)|howdy)\b/i.test(q) || q === 'help' || q === 'who are you') {
      return {
        text: "Greetings! I'm your dedicated Rockstar Games Support Dispatch Assistant. I can assist you with Grand Theft Auto VI release & pre-orders, Social Club account linking, Rockstar Games Launcher diagnostics, or booking a private 1-on-1 technical consultation on our Cal.com calendar (https://cal.com/joao-correia-lus35m/30min). What can I help you resolve?",
        action: {
          label: "Book 1-on-1 Support Session",
          href: CAL_URL,
          onClickScrollId: "scheduling"
        }
      };
    }

    // 2. GTA VI / NEW GAME / RELEASES / TRAILER / EDITIONS
    if (
      q.includes('gta vi') || 
      q.includes('gta 6') || 
      q.includes('grand theft auto vi') || 
      q.includes('grand theft auto 6') || 
      q.includes('new game') || 
      q.includes('upcoming') || 
      q.includes('release') || 
      q.includes('trailer') || 
      q.includes('vice city') || 
      q.includes('leonida') || 
      q.includes('lucia') || 
      q.includes('jason') || 
      q.includes('pre-order') || 
      q.includes('preorder') || 
      q.includes('edition') || 
      q.includes('deluxe') || 
      q.includes('collector')
    ) {
      return {
        text: "Grand Theft Auto VI heads to the state of Leonida, encompassing the neon-soaked streets of Vice City and beyond in the biggest, most immersive evolution of the Grand Theft Auto series yet! Digital pre-orders are live with three editions: Standard ($69.99), Vice City Deluxe ($89.99 with bonus vehicles and heist gear), and the Sovereign Collector's Box ($179.99). All digital pre-orders feature our 100% unconditional refund guarantee prior to official launch day.",
        action: {
          label: "Explore GTA VI Editions",
          onClickScrollId: "hero"
        }
      };
    }

    // 3. MEETINGS / 1-ON-1 SUPPORT / CAL.COM / CALLS / SCHEDULING
    if (
      q.includes('schedule') || 
      q.includes('meeting') || 
      q.includes('call') || 
      q.includes('cal.com') || 
      q.includes('cal') || 
      q.includes('30min') || 
      q.includes('30 min') || 
      q.includes('consultation') || 
      q.includes('talk to') || 
      q.includes('human') || 
      q.includes('screenshare') || 
      q.includes('screen share') || 
      q.includes('book') || 
      q.includes('booking') || 
      q.includes('appointment') || 
      q.includes('reschedule')
    ) {
      return {
        text: "You can schedule a complimentary 30-minute 1-on-1 technical support session with a certified Rockstar Games support engineer! We utilize Cal.com for seamless real-time calendar synchronization. Book directly via https://cal.com/joao-correia-lus35m/30min or use our embedded scheduler on this page. During your private session, an engineer can provide live screen-sharing diagnostics for complex PC issues, assist with Social Club account recovery, or configure cloud save transfers.",
        action: {
          label: "Open Cal.com Scheduler (New Tab)",
          href: CAL_URL,
          onClickScrollId: "scheduling"
        }
      };
    }

    // 4. PROPOSALS / CUSTOM QUOTES / COMMERCIAL & ENTERPRISE LICENSING
    if (
      q.includes('proposal') || 
      q.includes('quote') || 
      q.includes('commercial') || 
      q.includes('enterprise bundle') || 
      q.includes('pricing table') || 
      q.includes('sponsorship') || 
      q.includes('esports event') || 
      q.includes('custom edition') || 
      q.includes('licensing') || 
      q.includes('b2b') || 
      q.includes('corporate')
    ) {
      return {
        text: "You can submit a customized proposal request through our official 'Request a Proposal' portal on this page! Standard baselines include: GTA VI Standard Edition (€79.99), GTA VI Collector's Vice Edition (€149.99), GTA Online Enterprise Bundle (€99.99), Rockstar VIP Community & Esports Event Pass (€299.99), and Commercial In-Game Sponsorship Tier (starting from €999.00). Submit your Full Name, Email, and description, and our automated system will calculate your personalized proposal.",
        action: {
          label: "Request a Proposal Now",
          onClickScrollId: "proposal"
        }
      };
    }

    // 4. TECHNICAL ISSUES / LAUNCHER CRASHES / ERROR 1000.50 / CORRUPTIONS
    if (
      q.includes('launcher') || 
      q.includes('error') || 
      q.includes('crash') || 
      q.includes('freeze') || 
      q.includes('bug') || 
      q.includes('issue') || 
      q.includes('1000.50') || 
      q.includes('infinite loading') || 
      q.includes('stuck') || 
      q.includes("won't open") || 
      q.includes("wont open") || 
      q.includes('wont launch') || 
      q.includes("won't launch") || 
      q.includes('failed to initialize') || 
      q.includes('integrity') || 
      q.includes('verify') || 
      q.includes('cache')
    ) {
      return {
        text: "Here are immediate troubleshooting steps to resolve Rockstar Games Launcher crashes, freezes, and Error 1000.50:\n\n1. Run As Administrator: Right-click the Launcher desktop icon and select 'Run as Administrator'.\n2. Verify File Integrity: Open Launcher Settings > 'My Installed Games', choose your game, and click 'Verify Integrity' to repair corrupted binaries.\n3. Clear Cache: Press Win+R, type '%localappdata%\\Rockstar Games\\Launcher' and delete temporary profile cache files.\n4. Check Server Status: Ensure Rockstar Authentication services are green.\n\nStill stuck? Book a 30-minute screen-share session with our engineering team at https://cal.com/joao-correia-lus35m/30min!",
        action: {
          label: "Schedule Launcher Support Session",
          href: CAL_URL,
          onClickScrollId: "scheduling"
        }
      };
    }

    // 5. GTA ONLINE / MULTIPLAYER / SOLO VS FRIENDS / SOCIAL CLUB ACCOUNTS
    if (
      q.includes('gta online') || 
      q.includes('online') || 
      q.includes('multiplayer') || 
      q.includes('multi-player') || 
      q.includes('solo') || 
      q.includes('alone') || 
      q.includes('friends') || 
      q.includes('crew') || 
      q.includes('syndicate') || 
      q.includes('heist') || 
      q.includes('invite only') || 
      q.includes('passive') || 
      q.includes('griefer') || 
      q.includes('account') || 
      q.includes('link') || 
      q.includes('social club') || 
      q.includes('psn') || 
      q.includes('xbox') || 
      q.includes('steam') || 
      q.includes('epic') || 
      q.includes('crossplay') || 
      q.includes('cross-play') || 
      q.includes('cloud save')
    ) {
      if (q.includes('solo') || q.includes('alone') || q.includes('friends') || q.includes('invite only')) {
        return {
          text: "In GTA Online, you are never forced into chaotic public lobbies! You can launch an 'Invite-Only Session' directly from the pause menu, where 100% of executive business sales, VIP contracts, and Heist preparations are fully playable solo or exclusively with your chosen crew, with zero griefing.",
          action: {
            label: "Explore GTA Online Features",
            onClickScrollId: "core-ip"
          }
        };
      }

      if (q.includes('link') || q.includes('account') || q.includes('psn') || q.includes('xbox') || q.includes('steam') || q.includes('epic')) {
        return {
          text: "To link your gaming accounts to Rockstar Games Social Club: 1) Visit socialclub.rockstargames.com and sign in. 2) Go to Settings > 'Linked Accounts'. 3) Authenticate your PlayStation Network, Xbox Network, Steam, or Epic Games account. Once linked, all game progress, cloud saves, exclusive newswire bonuses, and GTA+ perks sync automatically across your profile!",
          action: {
            label: "Read Account Linking FAQ",
            onClickScrollId: "faq"
          }
        };
      }

      return {
        text: "GTA Online features a thriving 30-player persistent world with over 40 major expansions included at no additional cost. Connect your Social Club profile to track your Career Progress, join player-run Crews, design custom vanity license plates, and participate in weekly 2X GTA$ community events.",
        action: {
          label: "View Core IP Showcase",
          onClickScrollId: "core-ip"
        }
      };
    }

    // 6. GTA+ / MEMBERSHIP / SHARK CARDS / SUBSCRIPTION
    if (
      q.includes('gta+') || 
      q.includes('plus') || 
      q.includes('membership') || 
      q.includes('subscription') || 
      q.includes('shark card') || 
      q.includes('vinewood')
    ) {
      return {
        text: "GTA+ is the premier membership program on PlayStation 5 and Xbox Series X|S. Members receive a recurring monthly bonus of GTA$ 500,000 deposited directly into their Maze Bank account, free monthly supercars at The Vinewood Car Club, 100-vehicle Vinewood Club Garage storage, 15% extra bonus cash on Shark Cards, and complimentary access to a rotating library of classic Rockstar titles.",
        action: {
          label: "Check GTA+ Perks in Features",
          onClickScrollId: "features"
        }
      };
    }

    // 7. RED DEAD REDEMPTION / RDR2 / FRONTIER
    if (
      q.includes('red dead') || 
      q.includes('rdr') || 
      q.includes('rdr2') || 
      q.includes('arthur') || 
      q.includes('frontier') || 
      q.includes('cowboy') || 
      q.includes('western')
    ) {
      return {
        text: "Red Dead Redemption 2 and Red Dead Online offer America's unforgiving heartland. Enjoy Arthur Morgan's 60+ hour cinematic saga, or carve your own path across the frontier as a specialist Bounty Hunter, Collector, Moonshiner, or Trader. Single-player story campaigns remain fully playable offline!",
        action: {
          label: "View Red Dead in IP Showcase",
          onClickScrollId: "core-ip"
        }
      };
    }

    // 8. REFUNDS, PRE-ORDER GUARANTEE & OFFLINE PLAY
    if (
      q.includes('refund') || 
      q.includes('cancel') || 
      q.includes('money back') || 
      q.includes('guarantee') || 
      q.includes('offline') || 
      q.includes('no internet')
    ) {
      return {
        text: "Rockstar Games offers a 100% unconditional refund policy on all digital pre-orders purchased directly through the Rockstar Store anytime prior to game release. Additionally, all single-player story campaigns (GTA V, GTA VI story mode, and RDR2) can be played completely offline following initial one-time license activation.",
        action: {
          label: "View Support & Pre-Order FAQ",
          onClickScrollId: "faq"
        }
      };
    }

    // 9. D2C STORE, MERCHANDISE & APPAREL
    if (
      q.includes('merch') || 
      q.includes('store') || 
      q.includes('shirt') || 
      q.includes('hoodie') || 
      q.includes('apparel') || 
      q.includes('jacket') || 
      q.includes('buy gear') || 
      q.includes('shipping')
    ) {
      return {
        text: "Official Rockstar Games Store apparel and collectibles ship worldwide directly from our New York logistics hub within 24 hours. Check out our heavy-gauge embroidered hoodies, varsity jackets, Vice City neon caps, and commemorative physical vinyl collections.",
        action: {
          label: "Browse Merch & Apparel",
          onClickScrollId: "store-merch"
        }
      };
    }

    // 10. DYNAMIC CONVERSATIONAL FALLBACK
    // Parses and acknowledges the user's specific inquiry keywords naturally
    const cleanWord = q.replace(/[^a-zA-Z0-9\s]/g, '').split(' ').slice(0, 4).join(' ');
    return {
      text: `Regarding your inquiry about "${cleanWord || 'this topic'}": Our support knowledge base covers this thoroughly! You can explore our dedicated FAQ below for detailed guides on account linking and launcher fixes, or schedule a direct 30-minute video session with our engineering team on Cal.com (https://cal.com/joao-correia-lus35m/30min).`,
      action: {
        label: "Schedule Support Call (Cal.com)",
        href: CAL_URL,
        onClickScrollId: "scheduling"
      }
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate realistic typing delay
    setTimeout(() => {
      const replyData = generateBotReply(query);
      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'bot',
        text: replyData.text,
        timestamp: 'Just now',
        action: replyData.action
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 650);
  };

  const handleActionClick = (action?: ChatMessage['action']) => {
    if (!action) return;
    if (action.href) {
      window.open(action.href, '_blank', 'noopener,noreferrer');
      return;
    }
    if (action.onClickScrollId) {
      const el = document.getElementById(action.onClickScrollId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `msg-reset-${Date.now()}`,
        sender: 'bot',
        text: "Chat refreshed. How can we help you with account linking, launcher errors, or meeting schedules today?",
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <>
      {/* Floating Action Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            id="chatbot-trigger-button"
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open Rockstar Games Support Chat"
            className="group relative flex items-center gap-3 p-4 sm:px-5 sm:py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-heading font-black rounded-full shadow-2xl shadow-amber-400/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border-2 border-black"
          >
            {/* Live Indicator Dot */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-black" />
            </span>

            <div className="w-6 h-6 flex items-center justify-center font-black text-sm">
              R★
            </div>
            
            <span className="hidden sm:inline text-xs uppercase tracking-wider">
              Support Chat
            </span>
          </button>
        )}
      </div>

      {/* Floating Chat Window */}
      {isOpen && (
        <div 
          id="chatbot-window"
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[410px] h-[560px] max-h-[85vh] bg-[#0e1017] border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-400 text-black flex items-center justify-center font-heading font-black text-lg shadow">
                R★
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
                    Rockstar Support Agent
                  </h3>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-400/20 text-emerald-400 text-[10px] font-mono font-bold">
                    ONLINE
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 font-mono">
                  Social Club & Tech Dispatch
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-zinc-400">
              <button
                type="button"
                onClick={handleResetChat}
                title="Restart conversation"
                className="p-1.5 hover:text-white hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat window"
                className="p-1.5 hover:text-white hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Support Banner */}
          <div className="px-4 py-2 bg-amber-400/10 border-b border-amber-400/20 flex items-center justify-between text-[11px] text-amber-300">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Need 1-on-1 screen-share?
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('scheduling');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                    setIsOpen(false);
                  }
                }}
                className="font-bold underline hover:text-white cursor-pointer"
              >
                In-Page
              </button>
              <span className="text-zinc-600">•</span>
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline hover:text-white inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Cal.com</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          {/* Message History Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 font-body text-xs bg-[#0b0c10]/70">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-amber-400 text-black font-medium rounded-br-xs'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Action Buttons */}
                  {msg.action && (
                    <div className="mt-3 pt-2.5 border-t border-zinc-800 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleActionClick(msg.action)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-400 hover:bg-amber-300 text-black font-heading font-bold text-[11px] uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                      >
                        <span>{msg.action.label}</span>
                        {msg.action.href ? <ExternalLink className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      </button>

                      {msg.action.onClickScrollId && msg.action.href && (
                        <button
                          type="button"
                          onClick={() => {
                            const el = document.getElementById(msg.action!.onClickScrollId!);
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth' });
                              setIsOpen(false);
                            }
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] uppercase font-mono tracking-wider transition-colors cursor-pointer"
                        >
                          <span>View On Page</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-zinc-500 font-mono mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 p-3 max-w-[120px] rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="text-[10px] font-mono ml-1">Typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies Chips */}
          <div className="p-2.5 bg-zinc-950 border-t border-zinc-800/80 shrink-0">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block px-1 mb-1.5">
              Quick Inquiries:
            </span>
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {QUICK_REPLIES.map((qr, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(qr)}
                  className="px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-amber-400 hover:text-black border border-zinc-800 text-zinc-300 text-[11px] whitespace-nowrap transition-colors cursor-pointer shrink-0"
                >
                  {qr}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about accounts, launcher, meetings..."
              className="flex-1 bg-zinc-950 border border-zinc-750 focus:border-amber-400 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              className="p-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-black rounded-lg transition-colors cursor-pointer shrink-0"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
