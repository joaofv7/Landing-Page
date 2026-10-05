export interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  backdropUrl: string;
  trailerUrl?: string;
  duration?: string;
  primaryCtaText: string;
  primaryCtaAction: 'preorder' | 'play' | 'editions';
  secondaryCtaText: string;
  secondaryCtaAction: 'trailer' | 'editions' | 'learn';
  releaseTag: string;
  accentColor: string;
}

export interface UserPersona {
  id: string;
  role: string;
  tagline: string;
  avatarIcon: string;
  keyFrustration: string;
  desiredOutcome: string;
  recommendedEntry: string;
  quote: string;
  coreHook: string;
  metrics: { label: string; value: string }[];
}

export interface FeatureItem {
  id: string;
  name: string;
  outcomeBenefit: string;
  description: string;
  iconName: string;
  tag: string;
  highlightStat: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'GTA VI' | 'GTA Online' | 'Accounts & Safety';
  objectionResolved: string;
}

export interface NewswirePost {
  id: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  summary: string;
  imageUrl: string;
  featured?: boolean;
  ctaText: string;
}

export interface GameEdition {
  id: string;
  name: string;
  price: string;
  badge?: string;
  popular?: boolean;
  includes: string[];
  exclusivePerks: string[];
  platformSupport: string[];
}

export interface MerchItem {
  id: string;
  name: string;
  category: string;
  price: string;
  imageUrl: string;
  status: 'In Stock' | 'Limited Edition' | 'Pre-Order';
  description: string;
}
