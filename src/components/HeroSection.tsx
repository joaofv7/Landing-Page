import React, { useState, useEffect } from 'react';
import { Play, ChevronLeft, ChevronRight, Sparkles, Flame, ShieldAlert, ArrowRight, Radio } from 'lucide-react';
import { HERO_SLIDES, HERO_PROBLEM_STATEMENT } from '../data/mockContent';

interface HeroSectionProps {
  onOpenTrailer: (title: string, duration?: string) => void;
  onOpenEditions: () => void;
  onJumpIntoOnline: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenTrailer,
  onOpenEditions,
  onJumpIntoOnline
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slide = HERO_SLIDES[currentSlideIndex];

  // Auto-advance hero slides every 7 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrimaryAction = () => {
    if (slide.primaryCtaAction === 'preorder' || slide.primaryCtaAction === 'editions') {
      onOpenEditions();
    } else {
      onJumpIntoOnline();
    }
  };

  const handleSecondaryAction = () => {
    if (slide.secondaryCtaAction === 'trailer') {
      onOpenTrailer(slide.title, slide.duration);
    } else if (slide.secondaryCtaAction === 'editions') {
      onOpenEditions();
    } else {
      onOpenEditions();
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-black text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Media Layer with Cinematic Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={slide.backdropUrl}
          alt={slide.title}
          className="w-full h-full object-cover object-center transform scale-105 transition-all duration-1000 ease-out brightness-[0.45]"
        />
        {/* Dark gradients for text legibility & cinema feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Top Banner: PRD Problem Statement & Contrast Anchor */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-amber-400/30 text-xs font-semibold text-zinc-300 backdrop-blur-md shadow-lg">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="text-amber-400 uppercase tracking-wider font-heading text-sm">
            The Entertainment Paradigm
          </span>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-300 hidden sm:inline">
            Tired of lifeless chore simulators? Enter living, reactive worlds.
          </span>
          <span className="text-zinc-300 sm:hidden">Enter living worlds.</span>
        </div>
      </div>

      {/* Main Hero Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          {/* Slide Flagship Badge */}
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-heading font-black tracking-widest uppercase bg-amber-400 text-black shadow-md shadow-amber-400/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {slide.badge}
            </span>
            <span className="text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider">
              {slide.releaseTag}
            </span>
          </div>

          {/* Headline (Max 10 Words) */}
          <h1
            id="hero-headline"
            className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black tracking-tight leading-[0.9] text-white drop-shadow-md uppercase"
          >
            {slide.title}
          </h1>

          {/* Emotional Subheadline (Max 25 Words) */}
          <p
            id="hero-subheadline"
            className="text-lg sm:text-xl text-zinc-200 font-body leading-relaxed max-w-2xl font-normal drop-shadow"
          >
            {slide.subtitle}
          </p>

          {/* Value Stack & Micro-Persuasion Pillars */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-300 pt-2">
            <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1 rounded border border-zinc-800 backdrop-blur-sm">
              <span className="text-amber-400 font-bold">✓</span>
              <span>All 40+ Online Expansions Included Free</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1 rounded border border-zinc-800 backdrop-blur-sm">
              <span className="text-amber-400 font-bold">✓</span>
              <span>Playable 100% Solo or With Friends</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1 rounded border border-zinc-800 backdrop-blur-sm">
              <span className="text-amber-400 font-bold">✓</span>
              <span>Zero-Friction Cloud Progress Transfer</span>
            </div>
          </div>

          {/* Action-Oriented Dual CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            {/* Primary Action Button */}
            <button
              type="button"
              id="hero-primary-cta"
              onClick={handlePrimaryAction}
              className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-black font-heading font-extrabold text-xl tracking-wider uppercase rounded-md shadow-xl shadow-amber-400/25 flex items-center gap-3 transition-all transform active:scale-95 group cursor-pointer"
            >
              <Flame className="w-5 h-5 text-black group-hover:rotate-12 transition-transform" />
              <span>{slide.primaryCtaText}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary Action Button */}
            <button
              type="button"
              id="hero-secondary-cta"
              onClick={handleSecondaryAction}
              className="px-6 py-4 bg-zinc-900/80 hover:bg-zinc-800 text-white font-heading font-bold text-lg tracking-wider uppercase rounded-md border border-zinc-700 backdrop-blur-md flex items-center gap-3 transition-all group cursor-pointer"
            >
              <Play className="w-4 h-4 text-amber-400 fill-amber-400 group-hover:scale-110 transition-transform" />
              <span>{slide.secondaryCtaText}</span>
              {slide.duration && (
                <span className="text-xs font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded ml-1">
                  {slide.duration}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Controls & Real-Time Living Proof Bar */}
      <div className="relative z-10 border-t border-zinc-800/80 bg-[#0b0c10]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Live Ecosystem Pulse Bar */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span className="font-mono text-zinc-300 font-semibold">
                190,000,000+ COPIES DISTRIBUTED
              </span>
            </div>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-zinc-400 hidden sm:inline">
              Active Living Servers Across PS5, Xbox Series X|S & PC
            </span>
          </div>

          {/* Carousel Slide Indicators & Nav Arrows */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlideIndex
                      ? 'w-8 bg-amber-400'
                      : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                  title={`Go to slide ${idx + 1}: ${s.title}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1 border-l border-zinc-800 pl-3">
              <button
                type="button"
                onClick={handlePrev}
                id="hero-prev-slide-btn"
                className="p-1.5 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                title="Previous Flagship Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                id="hero-next-slide-btn"
                className="p-1.5 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                title="Next Flagship Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
