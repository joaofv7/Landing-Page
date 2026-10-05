import { HeroSlide, UserPersona, FeatureItem, FaqItem, NewswirePost, GameEdition, MerchItem } from '../types';

export const HERO_PROBLEM_STATEMENT = {
  headline: "Own the Empire: Enter the Definitive Living World Phenomenon",
  subheadline: "Break free from hollow games with living 30-player open worlds, evolving criminal dynasties, and cinematic narratives crafted for uncompromising solo or crew dominance.",
  corePainPoint: "Generic entertainment with shallow, repetitive mechanics that isolates players, vs. real cultural belonging in persistent, reactive living worlds."
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'gta-vi-extended',
    badge: 'FLAGSHIP WORLD PREMIERE',
    title: 'GRAND THEFT AUTO VI',
    subtitle: 'An Extended Look — Now Playing. Experience Leonida with next-generation living fidelity and high-stakes criminal storytelling.',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop',
    trailerUrl: 'https://www.youtube.com/watch?v=QdBZY2fkU-0',
    duration: '4:28 4K HDR',
    primaryCtaText: 'Pre-Order Now',
    primaryCtaAction: 'preorder',
    secondaryCtaText: 'Watch Trailer',
    secondaryCtaAction: 'trailer',
    releaseTag: 'Fall 2025 • PS5 & Xbox Series X|S',
    accentColor: '#f59e0b'
  },
  {
    id: 'gta-vi-preorder',
    badge: 'EXCLUSIVE DIGITAL ALLOTMENTS',
    title: 'CLAIM YOUR EMPIRE IN ADVANCE',
    subtitle: 'Pre-order Grand Theft Auto VI today to secure Day-1 Vice City Starter Capital and limited-edition vehicle deliveries.',
    backdropUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1920&auto=format&fit=crop',
    duration: 'All Editions Available',
    primaryCtaText: 'Explore Editions',
    primaryCtaAction: 'editions',
    secondaryCtaText: 'View Digital Perks',
    secondaryCtaAction: 'learn',
    releaseTag: 'Guaranteed Launch Day Allocation',
    accentColor: '#ec4899'
  },
  {
    id: 'gta-online-kortz',
    badge: 'NEW CO-OP HEIST EXPANSION',
    title: 'THE KORTZ CENTER HEIST',
    subtitle: 'Now Available in GTA Online. Infiltrate the Pacific Bluffs cultural fortress with your 4-player crew or execute tactical solo contracts.',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1920&auto=format&fit=crop',
    duration: 'Now Live Worldwide',
    primaryCtaText: 'Jump Into GTA Online',
    primaryCtaAction: 'play',
    secondaryCtaText: 'Watch Trailer',
    secondaryCtaAction: 'trailer',
    releaseTag: 'Free Expansion For All Players',
    accentColor: '#10b981'
  }
];

export const TARGET_PERSONAS: UserPersona[] = [
  {
    id: 'solo-connoisseur',
    role: 'The Solo Narrative Connoisseur',
    tagline: 'Craves cinematic masterstrokes over generic open-world busywork',
    avatarIcon: 'Film',
    keyFrustration: 'Fatigued by hollow fetch quests, lifeless copy-paste NPCs, and disjointed campaigns that treat storytelling like an afterthought.',
    desiredOutcome: 'Uncompromising cinematic immersion, reactive AI worlds with emotional depth, and high-stakes criminal storytelling where every choice reverberates.',
    recommendedEntry: 'Grand Theft Auto VI Campaign & Red Dead Redemption II Single-Player',
    quote: '"I don\'t want another 100-hour chore simulator. I want a cinematic epic that pulls me into its pulse and refuses to let go."',
    coreHook: '100% playable solo without online subscription requirements.',
    metrics: [
      { label: 'Narrative Depth', value: 'Cinematic AAA' },
      { label: 'Solo Autonomy', value: 'Zero Required MP' }
    ]
  },
  {
    id: 'syndicate-leader',
    role: 'The Syndicate Strategist',
    tagline: 'Drives high-stakes crews and builds persistent financial empires',
    avatarIcon: 'Crown',
    keyFrustration: 'Apprehension over joining years-old live-services late and being outmatched by legacy veterans or endless paywalls.',
    desiredOutcome: 'Immediate access to all 40+ historical expansions from day one, rapid wealth accumulation via GTA+, and seamless 30-player heist coordination.',
    recommendedEntry: 'GTA Online + GTA+ Sovereign Pass with Enterprise Starter Pack',
    quote: '"Give my crew high-risk heists, bespoke vehicles, and a city where our syndicate name actually carries weight."',
    coreHook: 'All updates & content since launch included free with no missing expansions.',
    metrics: [
      { label: 'Lobby Capacity', value: 'Up to 30 Players' },
      { label: 'Content Included', value: '10+ Years of DLC' }
    ]
  },
  {
    id: 'frontier-outlaw',
    role: 'The Frontier Escapist',
    tagline: 'Seeks slow-burn realism, authentic roleplay, and environmental majesty',
    avatarIcon: 'Compass',
    keyFrustration: 'Fast-food arcade games with frantic cooldowns, zero environmental weight, and synthetic community spaces.',
    desiredOutcome: 'Breathtaking wilderness authenticity, tactical hunting & outlaw tracking, private defensive posses, and immersive moonshiner operations.',
    recommendedEntry: 'Red Dead Online — American West Frontier Experience',
    quote: '"I want the dirt under my boots, campfire silence, and unpredictable emergent shootouts with real outlaws in the wilderness."',
    coreHook: 'Defensive play mode enables peaceful open-world exploration.',
    metrics: [
      { label: 'Community Scale', value: 'Millions Active' },
      { label: 'World Fidelity', value: 'Ultra-Realist Physics' }
    ]
  }
];

export const CORE_FEATURES: FeatureItem[] = [
  {
    id: 'living-worlds',
    name: 'Dynamic 30-Player Living Worlds',
    outcomeBenefit: 'Enter thriving urban and wilderness simulations with zero isolation, packed with all accumulated expansions from day one.',
    description: 'Explore evolving multiplayer metropolises where traffic, emergent police responses, and rival crews create unscripted cinematic drama.',
    iconName: 'Globe',
    tag: 'SCALE & IMMERSION',
    highlightStat: 'Up to 30 Players / Lobby'
  },
  {
    id: 'cinematic-storytelling',
    name: 'Decade-Defining Cinematic Sagas',
    outcomeBenefit: 'Command authentic criminal empires and frontier legends with unmatched dramatic stakes and cultural swagger.',
    description: 'Experience motion-captured performances, branching tactical approaches to heists, and award-winning symphonic scores.',
    iconName: 'Clapperboard',
    tag: 'NARRATIVE PRESTIGE',
    highlightStat: '100% Solo Playable'
  },
  {
    id: 'gta-plus-pass',
    name: 'GTA+ Sovereign Membership',
    outcomeBenefit: 'Gain instant competitive prestige with weekly vehicle early access, recurring monthly capital, and VIP privileges.',
    description: 'Members enjoy automatic GTA$ deposits, complimentary Vinewood Car Club test drives, and exclusive livery and property bonuses.',
    iconName: 'Sparkles',
    tag: 'ELITE STATUS',
    highlightStat: '1-Week Early Access'
  },
  {
    id: 'persistent-career-hub',
    name: 'Persistent Web-to-Game Career Hub',
    outcomeBenefit: 'Track your outlaw pedigree and flex custom vanity plates seamlessly across every device in real time.',
    description: 'Inspect completed heist tiers, monitor your syndicate bank balance, and design customized 3D license plates directly from your browser.',
    iconName: 'Award',
    tag: 'ACCOUNT RETENTION',
    highlightStat: 'Live Game Sync'
  },
  {
    id: 'unfettered-library',
    name: 'Preserved Legacy Vault',
    outcomeBenefit: 'Revisit genre-defining masterworks spanning decades with modernized enhancements and complete digital preservation.',
    description: 'From classic Liberty City stories to contemporary frontier masterpieces, access the industry’s most revered catalogue under one launcher.',
    iconName: 'Library',
    tag: 'HERITAGE & AUTHORITY',
    highlightStat: '25+ Years Legacy'
  }
];

export const NEWSWIRE_ITEMS: NewswirePost[] = [
  {
    id: 'news-1',
    title: 'Grand Theft Auto VI: An Extended Look — Now Playing',
    date: 'August 27, 2026',
    category: 'GTA VI',
    readTime: '3 min read',
    summary: 'Dive into our extended look at the sun-soaked state of Leonida, showcasing breakthrough volumetric lighting, crowd density, and character dynamics.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    featured: true,
    ctaText: 'Watch Extended Look'
  },
  {
    id: 'news-2',
    title: 'Pre-Order Grand Theft Auto VI and Secure Exclusive Founder Allotments',
    date: 'June 24, 2026',
    category: 'GTA VI',
    readTime: '2 min read',
    summary: 'Reserve your physical or digital edition today. Pre-orders include the Vice City Sovereign Vehicle Pack and 1,000,000 in-game launch capital.',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    featured: false,
    ctaText: 'View Pre-Order Perks'
  },
  {
    id: 'news-3',
    title: 'GTA+ Members Enjoy One Week of Early Access to the New Pegassi Horus Supercar',
    date: 'September 10, 2026',
    category: 'GTA Online',
    readTime: '2 min read',
    summary: 'Claim the razor-sharp Pegassi Horus at the Vinewood Car Club showroom before it hits Legendary Motorsport next week, plus 2X GTA$ on Nightclub Sales.',
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop',
    featured: false,
    ctaText: 'Claim Membership Perk'
  },
  {
    id: 'news-4',
    title: 'Compete Across Entrepreneurial Endeavors in the GTA Online Business Rivalries Event',
    date: 'September 03, 2026',
    category: 'GTA Online',
    readTime: '4 min read',
    summary: 'Double rewards on Bunker Deliveries, Special Cargo, and Biker Enterprises throughout this week, alongside 40% off executive office upgrades.',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop',
    featured: false,
    ctaText: 'Read Event Details'
  },
  {
    id: 'news-5',
    title: 'Introducing nopixel V: Groundbreaking Community Roleplay Partnership',
    date: 'August 14, 2026',
    category: 'Community',
    readTime: '5 min read',
    summary: 'Expanding support for dedicated creator communities and roleplay frameworks with enhanced server infrastructure and official mod creator tools.',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
    featured: false,
    ctaText: 'Explore Partnership'
  },
  {
    id: 'news-6',
    title: 'Red Dead Online: Moonshiners Bonanza & Frontier Discovery Week',
    date: 'July 30, 2026',
    category: 'Red Dead',
    readTime: '3 min read',
    summary: 'Enjoy 3X RDO$ and XP on all Moonshine Sales, free fast travel across Saint Denis and Valentine, and Wheeler, Rawson & Co. limited catalogue items.',
    imageUrl: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=800&auto=format&fit=crop',
    featured: false,
    ctaText: 'Saddle Up Today'
  }
];

export const GAME_EDITIONS: GameEdition[] = [
  {
    id: 'standard-edition',
    name: 'Standard Edition',
    price: '$69.99',
    badge: 'FULL CAMPAIGN & ONLINE',
    popular: false,
    includes: [
      'Grand Theft Auto VI Full Story Campaign',
      'Instant Access to the evolving Next-Gen GTA Online',
      'Day-1 Performance Optimization on PS5 & Xbox Series X|S',
      'Standard Digital Manual & Map Guide'
    ],
    exclusivePerks: [
      'Pre-Order Bonus: $500,000 Vice City Starting Capital'
    ],
    platformSupport: ['PlayStation 5', 'Xbox Series X|S', 'PC via Rockstar Launcher']
  },
  {
    id: 'deluxe-edition',
    name: 'Vice City Deluxe Edition',
    price: '$89.99',
    badge: 'MOST POPULAR FOR CREWS',
    popular: true,
    includes: [
      'Grand Theft Auto VI Full Story Campaign',
      'Next-Gen GTA Online Access',
      'Vice City Executive Property Voucher (Waterfront Penthouse)',
      '3 Exclusive Supercars delivered to your garage at launch',
      'Custom Weapons Loadout Skin Pack (Chrome & Neon)'
    ],
    exclusivePerks: [
      '$2,500,000 Bonus GTA Online Capital',
      '30-Day Complimentary GTA+ Membership Trial',
      'Early Access to 2 Heist Planning Boards'
    ],
    platformSupport: ['PlayStation 5', 'Xbox Series X|S', 'PC via Rockstar Launcher']
  },
  {
    id: 'collectors-edition',
    name: 'Leonida Sovereign Collector’s Box',
    price: '$179.99',
    badge: 'ULTIMATE COLLECTOR TIER',
    popular: false,
    includes: [
      'Everything in the Vice City Deluxe Edition',
      'Physical Embossed SteelBook Case with Lenticular Cover',
      'Embroidered Vice City Syndicate Bomber Jacket Patch',
      'Die-Cast 1:24 Scale Pegassi Hypercar Replica',
      'Full-Size Cloth Map of Leonida with UV Secret Markings'
    ],
    exclusivePerks: [
      '$5,000,000 Launch Capital + Sovereign Golden License Plate',
      'Lifetime VIP Lounge access at Vinewood Car Club',
      'Numbered Certificate of Authenticity signed by Development Leads'
    ],
    platformSupport: ['PlayStation 5', 'Xbox Series X|S']
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: "I am arriving late to GTA Online; will legacy players dominate me?",
    answer: "Not at all. Every new player receives the Criminal Enterprise Starter benefits, granting you immediate access to executive businesses, high-end apartments, weapons, and ten vehicles valued at over GTA$10,000,000. Furthermore, all 40+ historical updates (heists, contracts, clubs) are immediately playable at your own pace, and you can play in Invite-Only sessions alone or exclusively with friends with full business progression.",
    category: 'GTA Online',
    objectionResolved: "Fear of being outclassed or ganked by 10-year veterans."
  },
  {
    id: 'faq-2',
    question: "Which Grand Theft Auto VI edition is right for me?",
    answer: "If you primarily care about the blockbuster single-player campaign and standard online play, the Standard Edition covers everything. If you plan to play multiplayer with friends or start with premium real estate and instant supercar garage deliveries, the Vice City Deluxe Edition delivers the highest conversion value with 30 days of GTA+ and $2.5M capital.",
    category: 'GTA VI',
    objectionResolved: "Confusion over pre-order value and tier fragmentation."
  },
  {
    id: 'faq-3',
    question: "Can I play the story campaigns entirely offline without an active internet subscription?",
    answer: "Yes. Both Grand Theft Auto V / VI and Red Dead Redemption II feature complete, standalone single-player story campaigns that do not require an active PlayStation Plus or Xbox Game Pass Core subscription once downloaded and authenticated.",
    category: 'General',
    objectionResolved: "Concern about mandatory online DRM and recurring subscription burdens."
  },
  {
    id: 'faq-4',
    question: "What exactly does a GTA+ Membership include each month?",
    answer: "GTA+ is a flexible monthly subscription providing recurring GTA$500,000 deposits, complimentary vehicle claims at The Vinewood Car Club, one-week early access to new vehicle drops, exclusive property discounts, member-only livery wraps, and on-demand rotation access to classic Rockstar Games titles via the GTA+ Games Library.",
    category: 'GTA Online',
    objectionResolved: "Unclear ROI on the premium monthly subscription."
  },
  {
    id: 'faq-5',
    question: "Will my character profile and progression migrate to new consoles and PC?",
    answer: "Yes. Through the unified Rockstar Games Social Club account system, your multiplayer career data, unlocked vehicles, bank accounts, and rank migrate smoothly across hardware generations through one-time profile transfers.",
    category: 'Accounts & Safety',
    objectionResolved: "Fear of losing hundreds of hours of game progression across upgrades."
  },
  {
    id: 'faq-6',
    question: "How frequently does the studio publish updates and Newswire events?",
    answer: "Every Thursday, the Rockstar Newswire publishes updated event weeks featuring double and triple GTA$ & RP bonuses, discounts, and podium vehicle rotations. Major content expansions (heists, new storylines, and businesses) release every season with comprehensive roadmaps.",
    category: 'General',
    objectionResolved: "Doubt about whether the game will remain active and supported long-term."
  },
  {
    id: 'faq-7',
    question: "Can Red Dead Online be enjoyed purely solo without hostile player griefing?",
    answer: "Absolutely. Red Dead Online features a dedicated 'Defensive Playing Style' toggle that prevents hostile lock-on, drastically reduces incoming player damage, and stops other players from hogtying or grieving you. In addition, Moonshiner, Collector, and Trader story missions can be engaged solo or in private locked posses.",
    category: 'General',
    objectionResolved: "Aversion to forced PVP and griefers in open-world games."
  },
  {
    id: 'faq-8',
    question: "What is the digital pre-order refund and cancellation policy?",
    answer: "Any pre-order placed directly through the Rockstar Games Store or authorized digital console marketplaces can be cancelled for a 100% full refund at any moment prior to the official release date, guaranteed with zero administrative penalty.",
    category: 'GTA VI',
    objectionResolved: "Financial purchase risk and fear of buyer's remorse."
  },
  {
    id: 'faq-9',
    question: "Where can I monitor live server status and scheduled maintenance?",
    answer: "Our dedicated Service Status dashboard tracks real-time uptime across PlayStation Network, Xbox Network, PC Rockstar Games Launcher, Social Club, and FiveM servers. Uptime records are continuously refreshed every 60 seconds with full transparent incident logging.",
    category: 'Accounts & Safety',
    objectionResolved: "Worry about server outages and lack of technical transparency."
  },
  {
    id: 'faq-10',
    question: "How do the web License Plate Creator and Career Progress trackers connect to my game?",
    answer: "By linking your console or PC gamer tag to your Rockstar Games account, the web-based License Plate Creator pushes your personalized vanity text directly to Los Santos Customs in real time. Career Progress automatically tallies your in-game tier achievements and unlocks in-game apparel rewards directly from your browser.",
    category: 'Accounts & Safety',
    objectionResolved: "Skepticism about whether website features actually impact the in-game experience."
  },
  {
    id: 'faq-11',
    question: "Are physical merchandise and apparel shipped worldwide?",
    answer: "Yes. The official Rockstar Games D2C Store ships authentic apparel, metal collector pins, and lifestyle gear worldwide from our distribution hubs in New York, London, Paris, and Amsterdam, with full end-to-end tracking and customs clearance handled at checkout.",
    category: 'General',
    objectionResolved: "Hesitation about international merchandise authenticity and delivery."
  },
  {
    id: 'faq-12',
    question: "What anti-cheat systems and fair play protections are implemented in PC lobbies?",
    answer: "We deploy proactive kernel-level anti-tamper protections, automated telemetry outlier detection, and dedicated lobby segregation to ensure legitimate players enjoy clean, competitive environments. Additionally, our official partnership with community creators (Cfx.re / nopixel) ensures safe dedicated roleplay servers.",
    category: 'Accounts & Safety',
    objectionResolved: "Security concerns regarding PC lobby exploiters and disruptive mods."
  }
];

export const MERCH_ITEMS: MerchItem[] = [
  {
    id: 'merch-1',
    name: 'Rockstar Games Heritage Chenille Hoodie',
    category: 'Apparel',
    price: '$88.00',
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop',
    status: 'In Stock',
    description: 'Heavyweight 450GSM cotton fleece featuring embossed chenille R* emblem on chest.'
  },
  {
    id: 'merch-2',
    name: 'Vice City Retro Enamel Pin Set (Collector Edition)',
    category: 'Collectibles',
    price: '$32.00',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop',
    status: 'Limited Edition',
    description: 'Gold-plated cloissone pins commemorating iconic Vice City and San Andreas motifs.'
  },
  {
    id: 'merch-3',
    name: 'Rockstar x BAGGU Heavy-Duty Ripstop Tote',
    category: 'Accessories',
    price: '$45.00',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
    status: 'In Stock',
    description: 'Durable recycled nylon tote bag with reinforced straps and screenprinted monogram.'
  },
  {
    id: 'merch-4',
    name: 'The Music of Red Dead Redemption II (2xLP Vinyl)',
    category: 'Collectibles',
    price: '$54.00',
    imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=600&auto=format&fit=crop',
    status: 'In Stock',
    description: 'Translucent red vinyl pressed with the award-winning score produced by Daniel Lanois.'
  }
];

export const LIVE_SERVICE_STATUSES = [
  { name: 'GTA Online (PS5 / Xbox Series / PC)', status: 'Operational', ping: '18ms' },
  { name: 'Red Dead Online Ecosystem', status: 'Operational', ping: '22ms' },
  { name: 'Rockstar Games Social Club & Auth', status: 'Operational', ping: '12ms' },
  { name: 'Rockstar Games Store & Pre-Order API', status: 'Operational', ping: '15ms' },
  { name: 'FiveM & Dedicated Roleplay Fabric', status: 'Operational', ping: '24ms' }
];
