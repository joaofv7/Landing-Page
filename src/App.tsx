import React, { useState, useEffect } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { PersonasSection } from './components/PersonasSection';
import { FeaturesSection } from './components/FeaturesSection';
import { CoreIPShowcase } from './components/CoreIPShowcase';
import { NewswireSection } from './components/NewswireSection';
import { StoreMerchSection } from './components/StoreMerchSection';
import { CtaBanner } from './components/CtaBanner';
import { ProposalSection } from './components/ProposalSection';
import { SchedulingSection } from './components/SchedulingSection';
import { FaqSection } from './components/FaqSection';
import { FooterSection } from './components/FooterSection';
import { ChatBotWidget } from './components/ChatBotWidget';

// Modals
import { TrailerModal } from './components/TrailerModal';
import { EditionsModal } from './components/EditionsModal';
import { LicensePlateModal } from './components/LicensePlateModal';
import { CareerTrackerModal } from './components/CareerTrackerModal';
import { SearchModal } from './components/SearchModal';
import { LauncherModal } from './components/LauncherModal';
import { ArticleModal } from './components/ArticleModal';
import { MerchModal } from './components/MerchModal';
import { AdminProposalsModal } from './components/AdminProposalsModal';
import { ProposalViewerModal } from './components/ProposalViewerModal';
import { getProposalById } from './services/firebase';
import { generateProposalHtmlDocument } from './services/proposalService';

import { NewswirePost, MerchItem } from './types';

export default function App() {
  // Modal states
  const [trailerModalOpen, setTrailerModalOpen] = useState(false);
  const [trailerTitle, setTrailerTitle] = useState('GRAND THEFT AUTO VI — EXTENDED LOOK');
  const [trailerDuration, setTrailerDuration] = useState('4:28');

  const [editionsModalOpen, setEditionsModalOpen] = useState(false);
  const [plateModalOpen, setPlateModalOpen] = useState(false);
  const [careerModalOpen, setCareerModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [launcherModalOpen, setLauncherModalOpen] = useState(false);

  // Backend Proposals & HTML Viewer states
  const [adminProposalsOpen, setAdminProposalsOpen] = useState(false);
  const [proposalViewerOpen, setProposalViewerOpen] = useState(false);
  const [activeProposalView, setActiveProposalView] = useState<{
    proposalId: string;
    htmlContent: string;
    clientName?: string;
    total?: number;
  } | null>(null);

  const [selectedArticle, setSelectedArticle] = useState<NewswirePost | null>(null);
  const [selectedMerch, setSelectedMerch] = useState<MerchItem | null>(null);

  const handleOpenTrailer = (title?: string, duration?: string) => {
    if (title) setTrailerTitle(title);
    if (duration) setTrailerDuration(duration);
    setTrailerModalOpen(true);
  };

  const handleJumpIntoOnline = () => {
    setEditionsModalOpen(true);
  };

  const handleOpenProposalViewer = (data: {
    proposalId: string;
    htmlContent: string;
    clientName?: string;
    total?: number;
  }) => {
    setActiveProposalView(data);
    setProposalViewerOpen(true);
  };

  // Requirement 2: Detect permanent shareable proposal URL (#view-proposal-${proposalId}) and open full HTML proposal view
  useEffect(() => {
    const attemptLoadProposal = async (id: string, attemptsLeft = 5) => {
      const cleanId = id.replace(/^#?view-proposal-/, '').trim();
      if (!cleanId) return;

      const found = await getProposalById(cleanId);
      if (found) {
        let html = found.htmlContent;
        if (!html) {
          const calculation = {
            items: found.items && found.items.length > 0 ? found.items : [
              { name: 'GTA VI Standard Edition', quantity: 1, unitPrice: 69.99, lineTotal: 69.99 }
            ],
            subtotal: found.subtotal || 69.99,
            vatRate: found.vatRate || 0.23,
            vatAmount: found.vatAmount || 16.10,
            grandTotal: found.total || 86.09,
            summaryNotes: 'Rockstar Games Official Quotation'
          };
          html = generateProposalHtmlDocument({
            proposalId: found.proposalId,
            name: found.name,
            email: found.email,
            submissionDate: found.submissionDate,
            requestText: found.requestText,
            calculation,
            calComLink: 'https://cal.com/joao-correia-lus35m/30min'
          });
        }

        console.log('[Direct Proposal Link Loaded]: Automatically opening proposal', found.proposalId);
        handleOpenProposalViewer({
          proposalId: found.proposalId,
          htmlContent: html,
          clientName: found.name,
          total: found.total
        });
        return;
      }

      if (attemptsLeft > 0) {
        setTimeout(() => attemptLoadProposal(cleanId, attemptsLeft - 1), 600);
      }
    };

    const handleUrlHashAndQuery = () => {
      const hash = window.location.hash || '';
      const search = window.location.search || '';
      const href = window.location.href || '';

      let targetId: string | null = null;

      if (hash.includes('view-proposal-')) {
        targetId = hash.split('view-proposal-')[1]?.split('?')[0].split('&')[0];
      } else if (href.includes('view-proposal-')) {
        targetId = href.split('view-proposal-')[1]?.split('?')[0].split('&')[0].split('#')[0];
      } else if (hash.includes('#proposal?id=')) {
        targetId = hash.split('#proposal?id=')[1]?.split('&')[0];
      } else if (search.includes('proposalId=')) {
        targetId = new URLSearchParams(search).get('proposalId');
      } else if (search.includes('id=')) {
        targetId = new URLSearchParams(search).get('id');
      }

      if (targetId) {
        attemptLoadProposal(targetId);
      }
    };

    // Trigger on load
    handleUrlHashAndQuery();

    // Listeners for hashchange and DOMContentLoaded
    window.addEventListener('hashchange', handleUrlHashAndQuery);
    window.addEventListener('DOMContentLoaded', handleUrlHashAndQuery);

    return () => {
      window.removeEventListener('hashchange', handleUrlHashAndQuery);
      window.removeEventListener('DOMContentLoaded', handleUrlHashAndQuery);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#f3f4f6] font-body selection:bg-amber-400 selection:text-black">
      {/* 1. Header & Utility Navigation */}
      <HeaderNav
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenLauncher={() => setLauncherModalOpen(true)}
        onOpenEditions={() => setEditionsModalOpen(true)}
        onOpenCareer={() => setCareerModalOpen(true)}
        onOpenPlateModal={() => setPlateModalOpen(true)}
        onOpenAdminProposals={() => setAdminProposalsOpen(true)}
      />

      <main>
        {/* 2. Hero Section with Problem Statement, Headline & Carousel */}
        <HeroSection
          onOpenTrailer={handleOpenTrailer}
          onOpenEditions={() => setEditionsModalOpen(true)}
          onJumpIntoOnline={handleJumpIntoOnline}
        />

        {/* 3. Target Audience Section (3 Personas with Role, Frustration, Outcome) */}
        <PersonasSection
          onSelectEdition={() => setEditionsModalOpen(true)}
          onJumpIntoOnline={handleJumpIntoOnline}
        />

        {/* 4. Core Solutions / Services (5 Core Features with Outcome-Focused Benefits & Icons) */}
        <FeaturesSection
          onOpenPlateModal={() => setPlateModalOpen(true)}
          onOpenCareerModal={() => setCareerModalOpen(true)}
          onOpenEditions={() => setEditionsModalOpen(true)}
        />

        {/* 5. Core IP Hubs (GTA Online, Red Dead Online, GTA VI Vault) */}
        <CoreIPShowcase
          onOpenTrailer={handleOpenTrailer}
          onOpenPlateModal={() => setPlateModalOpen(true)}
          onOpenCareerModal={() => setCareerModalOpen(true)}
          onOpenEditions={() => setEditionsModalOpen(true)}
        />

        {/* 6. Rockstar Newswire (Live Pulse & Social Proof Ticker) */}
        <NewswireSection
          onSelectArticle={(article) => setSelectedArticle(article)}
        />

        {/* 7. D2C Store & Merchandising Grid */}
        <StoreMerchSection
          onQuickView={(item) => setSelectedMerch(item)}
        />

        {/* 8. Conversion CTA Section (Action-Oriented Buttons & Newsletter) */}
        <CtaBanner
          onOpenEditions={() => setEditionsModalOpen(true)}
          onOpenTrailer={() => handleOpenTrailer('Grand Theft Auto VI Extended World Reveal', '4:28')}
        />

        {/* 9. Request a Proposal / Custom Quote Section with 3-field form & Knowledge Base */}
        <ProposalSection
          onOpenGeneratedProposal={(result) => handleOpenProposalViewer({
            proposalId: result.proposalId,
            htmlContent: result.htmlContent,
            clientName: result.name,
            total: result.calculation.grandTotal
          })}
          onOpenAdminDashboard={() => setAdminProposalsOpen(true)}
        />

        {/* 10. Dedicated Scheduling Section (Cal.com 30-min Technical Support) */}
        <SchedulingSection />

        {/* 10. Complete Accordion FAQ Section (Account Linking, Launcher Support, Meetings & Entitlements) */}
        <FaqSection
          onOpenSupport={() => {
            const el = document.getElementById('scheduling');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </main>

      {/* 11. Footer & Legal Authority */}
      <FooterSection onOpenAdminProposals={() => setAdminProposalsOpen(true)} />

      {/* 12. Floating Interactive Support ChatBot Widget */}
      <ChatBotWidget />

      {/* Modals & Interactive Overlays */}
      <TrailerModal
        isOpen={trailerModalOpen}
        onClose={() => setTrailerModalOpen(false)}
        title={trailerTitle}
        duration={trailerDuration}
        onPreOrder={() => setEditionsModalOpen(true)}
      />

      <EditionsModal
        isOpen={editionsModalOpen}
        onClose={() => setEditionsModalOpen(false)}
      />

      <LicensePlateModal
        isOpen={plateModalOpen}
        onClose={() => setPlateModalOpen(false)}
      />

      <CareerTrackerModal
        isOpen={careerModalOpen}
        onClose={() => setCareerModalOpen(false)}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectGame={() => setEditionsModalOpen(true)}
      />

      <LauncherModal
        isOpen={launcherModalOpen}
        onClose={() => setLauncherModalOpen(false)}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onAction={() => setEditionsModalOpen(true)}
      />

      <MerchModal
        item={selectedMerch}
        onClose={() => setSelectedMerch(null)}
      />

      {/* Backend Proposals Dashboard (Admin View - Cloud Firestore Sync) */}
      <AdminProposalsModal
        isOpen={adminProposalsOpen}
        onClose={() => setAdminProposalsOpen(false)}
        onOpenProposalHtml={(proposal) => handleOpenProposalViewer({
          proposalId: proposal.proposalId,
          htmlContent: proposal.htmlContent || '',
          clientName: proposal.name,
          total: proposal.total
        })}
      />

      {/* Generated HTML Proposal Document Viewer */}
      {activeProposalView && (
        <ProposalViewerModal
          isOpen={proposalViewerOpen}
          onClose={() => setProposalViewerOpen(false)}
          proposalId={activeProposalView.proposalId}
          htmlContent={activeProposalView.htmlContent}
          clientName={activeProposalView.clientName}
          total={activeProposalView.total}
        />
      )}
    </div>
  );
}
