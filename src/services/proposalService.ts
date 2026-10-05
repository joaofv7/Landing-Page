/**
 * Rockstar Games Proposal & Quotation Engine
 * 
 * Implements:
 * - Official Knowledge Base Catalog (6 tiers as per specification)
 * - LLM Request Interpretation & Automated Proposal Calculation
 * - Official HTML Proposal Document Generation
 * - Cloud Firestore synchronization (status: processing -> completed)
 */
import { 
  saveInitialProposalToFirestore, 
  updateCompletedProposalInFirestore,
  type StoredProposal 
} from './firebase';

export interface ProposalItem {
  id: string;
  name: string;
  badge?: string;
  price: string;
  numericPrice: number;
  highlight?: boolean;
  description: string;
  deliverables: string[];
}

/**
 * 3. KNOWLEDGE BASE (Official Reference Pricing Catalog)
 */
export const REFERENCE_CATALOG: ProposalItem[] = [
  {
    id: 'gta-vi-standard',
    name: 'GTA VI Standard Edition',
    badge: 'Worldwide Flagship',
    price: '€69.99',
    numericPrice: 69.99,
    highlight: false,
    description: 'Day-one access to the Leonida campaign, Vice City open-world map, and next-gen graphical fidelity.',
    deliverables: [
      'Full Digital License (PlayStation 5, Xbox Series X|S, or PC)',
      'Vice City Explorer Digital Starter Pack',
      'Rockstar Games Social Club exclusive emblem & vehicle skin'
    ]
  },
  {
    id: 'gta-vi-deluxe',
    name: 'GTA VI Vice City Deluxe Edition',
    badge: 'Most Popular',
    price: '€89.99',
    numericPrice: 89.99,
    highlight: true,
    description: 'Full game license plus Vice City Deluxe Starter Pack, exclusive customized supercar fleet, and heist weapon loadouts.',
    deliverables: [
      'Full Digital License with Day-One Allotment Priority',
      'Vice City Deluxe Supercar & Speedboat Bundle',
      'Custom Heist Gear Loadouts & 1,000,000 In-Game Vice Dollars',
      'Social Club Deluxe Founder Emblem & Neon Plate'
    ]
  },
  {
    id: 'leonida-sovereign-box',
    name: "Leonida Sovereign Collector's Box",
    badge: 'Collector Edition',
    price: '€179.99',
    numericPrice: 179.99,
    highlight: false,
    description: 'The ultimate collector package with 72-hour early access, physical hardcover 220-page artbook, steelbook, and bonus GTA$ 2.5M.',
    deliverables: [
      '72-Hour Early Access Priority Launch Queue',
      'Hardcover 220-Page "Leonida & Vice City" Artbook & Steelbook',
      'Exclusive Lucia & Jason In-Game Outfits and Weapon Blueprints',
      'Bonus GTA$ 2,500,000 for GTA Online next-gen migration'
    ]
  },
  {
    id: 'gta-online-enterprise',
    name: 'GTA Online Enterprise Bundle (10M GTA$ + Executive Pack)',
    badge: 'Multiplayer Starter',
    price: '€99.99',
    numericPrice: 99.99,
    highlight: false,
    description: 'Kickstart an illicit corporate empire with high-tier real estate, vehicle fleets, and direct bankroll capital.',
    deliverables: [
      'Direct Bank Wire of 10,000,000 GTA$',
      'Maze Bank West Executive Office + 60-Car Garage Suite',
      'Paleto Bay Gunrunning Bunker + Senora Desert Counterfeit Factory',
      'Access to 10 high-performance supercars & attack helicopters'
    ]
  },
  {
    id: 'rockstar-vip-pass',
    name: 'Rockstar VIP Community & Esports Event Pass',
    badge: 'Pro & Creator Tier',
    price: '€299.99',
    numericPrice: 299.99,
    highlight: false,
    description: 'All-inclusive pass for verified tournament play, creator server prioritization, and physical events.',
    deliverables: [
      'Official sanctioned tournament entry & verified clan badge',
      'Reserved private server instance capacity with zero queue latency',
      'VIP lounge access at Gamescom, TwitchCon & Rockstar pop-ups',
      'Direct contact line to Developer Relations community managers'
    ]
  },
  {
    id: 'enterprise-sponsorship',
    name: 'Enterprise Commercial Sponsorship Tier',
    badge: 'Enterprise B2B',
    price: '€999.00',
    numericPrice: 999.00,
    highlight: false,
    description: 'Commercial licensing tier for brand integrations, branded digital assets, commercial public venue broadcasting, or corporate esports leagues.',
    deliverables: [
      'Dedicated Commercial Account Director & legal SLA contract',
      'Tailored in-game billboard or radio station placement scoping',
      'Multi-seat commercial LAN center / arcade exhibition licensing',
      'Co-branded digital merchandise & promotional campaign rollout'
    ]
  }
];

export interface ProposalCalculationItem {
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface ProposalCalculationResult {
  items: ProposalCalculationItem[];
  subtotal: number;
  vatRate: number;
  vatAmount: number;
  grandTotal: number;
  summaryNotes: string;
}

export interface ProposalWorkflowResult {
  success: boolean;
  docId: string;
  proposalId: string;
  name: string;
  email: string;
  requestText: string;
  submissionDate: string;
  calculation: ProposalCalculationResult;
  htmlContent: string;
  emailDispatched: boolean;
  calComLink: string;
  proposalUrl: string;
  emailStatus: 'sent' | 'error';
  resendId?: string;
  sentAt?: string;
  emailError?: string;
}

/**
 * Heuristic fallback parser when LLM endpoint is unreachable
 */
export function parseProposalLocally(requestText: string, selectedTierName?: string): ProposalCalculationResult {
  const text = (requestText || '').toLowerCase();
  const matchedItems: ProposalCalculationItem[] = [];

  // Match items based on keywords and extract quantities
  REFERENCE_CATALOG.forEach(cat => {
    let matched = false;
    let qty = 1;

    // Check tier name match
    if (selectedTierName && selectedTierName.includes(cat.name)) {
      matched = true;
    }

    // Keyword detection
    if (cat.id === 'gta-vi-standard' && (text.includes('standard') || text.includes('base game') || text.includes('regular'))) {
      matched = true;
    } else if (cat.id === 'gta-vi-deluxe' && (text.includes('deluxe') || text.includes('vice city deluxe'))) {
      matched = true;
    } else if (cat.id === 'leonida-sovereign-box' && (text.includes('collector') || text.includes('box') || text.includes('sovereign') || text.includes('artbook'))) {
      matched = true;
    } else if (cat.id === 'gta-online-enterprise' && (text.includes('enterprise') || text.includes('10m') || text.includes('online bundle') || text.includes('executive'))) {
      matched = true;
    } else if (cat.id === 'rockstar-vip-pass' && (text.includes('vip') || text.includes('esports') || text.includes('tournament') || text.includes('pass'))) {
      matched = true;
    } else if (cat.id === 'enterprise-sponsorship' && (text.includes('sponsorship') || text.includes('sponsor') || text.includes('commercial') || text.includes('b2b') || text.includes('licensing'))) {
      matched = true;
    }

    if (matched) {
      // Look for quantities near keywords, e.g. "5 copies", "3x", "quantity: 10"
      const qtyRegex = new RegExp(`(?:(\\d+)\\s*(?:copies|units|x|pieces|sets|licenses|passes)?\\s*(?:of\\s*)?)?${cat.name.split(' ')[0]}`, 'i');
      const match = text.match(qtyRegex);
      if (match && match[1]) {
        const parsed = parseInt(match[1], 10);
        if (parsed > 0 && parsed <= 500) qty = parsed;
      }

      // Check general number in text if single item matched
      const genericQtyMatch = text.match(/(\d+)\s*(?:copies|units|licenses|tickets|passes)/i);
      if (genericQtyMatch && genericQtyMatch[1]) {
        const parsed = parseInt(genericQtyMatch[1], 10);
        if (parsed > 0 && parsed <= 500) qty = parsed;
      }

      const lineTotal = Number((qty * cat.numericPrice).toFixed(2));
      matchedItems.push({
        name: cat.name,
        quantity: qty,
        unitPrice: cat.numericPrice,
        lineTotal
      });
    }
  });

  // Default fallback if no specific edition detected
  if (matchedItems.length === 0) {
    const fallbackItem = selectedTierName 
      ? REFERENCE_CATALOG.find(c => c.name === selectedTierName) || REFERENCE_CATALOG[0]
      : REFERENCE_CATALOG[0];

    matchedItems.push({
      name: fallbackItem.name,
      quantity: 1,
      unitPrice: fallbackItem.numericPrice,
      lineTotal: fallbackItem.numericPrice
    });
  }

  const subtotal = Number(matchedItems.reduce((acc, curr) => acc + curr.lineTotal, 0).toFixed(2));
  const vatRate = 0.23; // 23% VAT Portugal / EU standard
  const vatAmount = Number((subtotal * vatRate).toFixed(2));
  const grandTotal = Number((subtotal + vatAmount).toFixed(2));

  return {
    items: matchedItems,
    subtotal,
    vatRate,
    vatAmount,
    grandTotal,
    summaryNotes: `Extracted ${matchedItems.length} catalog tier(s) matching request specifications.`
  };
}

/**
 * Call Server API for LLM calculation using Gemini API (@google/genai SDK)
 */
export async function calculateProposalWithLLM(
  name: string,
  email: string,
  requestText: string,
  selectedTier?: string
): Promise<ProposalCalculationResult> {
  try {
    const response = await fetch('/api/calculate-proposal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        requestText,
        selectedTier,
        catalog: REFERENCE_CATALOG
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.success && data.items && data.items.length > 0) {
        return {
          items: data.items,
          subtotal: Number(data.subtotal.toFixed(2)),
          vatRate: 0.23,
          vatAmount: Number(data.vatAmount.toFixed(2)),
          grandTotal: Number(data.grandTotal.toFixed(2)),
          summaryNotes: data.summaryNotes || 'Calculated via Rockstar AI Proposal Engine.'
        };
      }
    }
  } catch (err) {
    console.warn('Backend LLM API call fallback to client parser:', err);
  }

  // Graceful high-fidelity local heuristic parser
  return parseProposalLocally(requestText, selectedTier);
}

/**
 * 4.c Generate the Official Rockstar Games HTML Proposal Document
 */
export function generateProposalHtmlDocument(params: {
  proposalId: string;
  name: string;
  email: string;
  submissionDate: string;
  requestText: string;
  calculation: ProposalCalculationResult;
  calComLink: string;
}): string {
  const { proposalId, name, email, submissionDate, requestText, calculation, calComLink } = params;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Official Proposal ${proposalId} - Rockstar Games</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #0b0c10;
      color: #e5e7eb;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      padding: 40px 20px;
      line-height: 1.5;
    }
    .proposal-card {
      max-width: 820px;
      margin: 0 auto;
      background: #11131a;
      border: 1px solid #27272a;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
    }
    .header-bar {
      background: linear-gradient(135deg, #18181b 0%, #09090b 100%);
      border-bottom: 2px solid #f59e0b;
      padding: 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .logo-badge {
      width: 44px;
      height: 44px;
      background: #f59e0b;
      color: #000;
      font-weight: 900;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
    }
    .brand-title {
      font-size: 20px;
      font-weight: 900;
      letter-spacing: 1.5px;
      color: #ffffff;
      text-transform: uppercase;
    }
    .brand-sub {
      font-size: 11px;
      color: #a1a1aa;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    .doc-meta {
      text-align: right;
    }
    .ref-code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      color: #f59e0b;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 1px;
    }
    .doc-date {
      font-size: 12px;
      color: #71717a;
      margin-top: 4px;
    }
    .content-body {
      padding: 36px 32px;
    }
    .section-title {
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #f59e0b;
      margin-bottom: 12px;
    }
    .client-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      background: #181920;
      border: 1px solid #27272a;
      border-radius: 10px;
      padding: 18px;
      margin-bottom: 28px;
    }
    .meta-item label {
      display: block;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #71717a;
      margin-bottom: 4px;
    }
    .meta-item span {
      font-size: 14px;
      font-weight: 600;
      color: #ffffff;
    }
    .notes-box {
      background: #14151c;
      border-left: 3px solid #f59e0b;
      padding: 14px 18px;
      border-radius: 0 8px 8px 0;
      margin-bottom: 28px;
    }
    .notes-box p {
      font-size: 12px;
      color: #d4d4d8;
      font-style: italic;
      white-space: pre-line;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 28px;
      font-size: 13px;
    }
    th {
      background: #1c1d25;
      color: #a1a1aa;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 1px;
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid #27272a;
    }
    td {
      padding: 14px 16px;
      border-bottom: 1px solid #22232c;
      color: #f4f4f5;
    }
    .text-center { text-align: center; }
    .text-right { text-align: right; }
    .totals-area {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 32px;
    }
    .totals-table {
      width: 320px;
    }
    .totals-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      font-size: 13px;
      color: #a1a1aa;
      border-bottom: 1px solid #22232c;
    }
    .totals-row.grand-total {
      border-top: 2px solid #f59e0b;
      border-bottom: none;
      padding-top: 12px;
      margin-top: 6px;
      font-size: 18px;
      font-weight: 900;
      color: #ffffff;
    }
    .totals-row.grand-total span:last-child {
      color: #f59e0b;
      font-family: ui-monospace, monospace;
    }
    .terms-box {
      border: 1px solid #27272a;
      border-radius: 10px;
      padding: 16px;
      background: #0d0e14;
      font-size: 11px;
      color: #71717a;
      line-height: 1.6;
      margin-bottom: 28px;
    }
    .cta-area {
      text-align: center;
      padding-top: 8px;
    }
    .btn-cal {
      display: inline-block;
      background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
      color: #000000;
      font-weight: 900;
      text-decoration: none;
      padding: 14px 28px;
      border-radius: 10px;
      font-size: 13px;
      letter-spacing: 1px;
      text-transform: uppercase;
      box-shadow: 0 4px 20px rgba(245, 158, 11, 0.35);
      transition: transform 0.15s ease;
    }
    .btn-cal:hover {
      transform: translateY(-1px);
    }
    .footer-seal {
      margin-top: 24px;
      font-size: 11px;
      color: #52525b;
      text-align: center;
    }
    @media print {
      body { background: #fff; color: #000; padding: 0; }
      .proposal-card { border: none; box-shadow: none; background: #fff; color: #000; }
      .header-bar { background: #f4f4f5; border-bottom: 2px solid #000; color: #000; }
      .brand-title { color: #000; }
      .client-grid, .notes-box, th { background: #f4f4f5; color: #000; border-color: #e4e4e7; }
      td { color: #000; border-color: #e4e4e7; }
      .totals-row.grand-total { color: #000; border-color: #000; }
      .totals-row.grand-total span:last-child { color: #000; }
      .btn-cal { display: none; }
    }
  </style>
</head>
<body>
  <div class="proposal-card">
    <div class="header-bar">
      <div class="brand">
        <div class="logo-badge">R★</div>
        <div>
          <div class="brand-title">Rockstar Games</div>
          <div class="brand-sub">Official Enterprise Proposal & Quote</div>
        </div>
      </div>
      <div class="doc-meta">
        <div class="ref-code">${proposalId}</div>
        <div class="doc-date">Issued: ${submissionDate}</div>
      </div>
    </div>

    <div class="content-body">
      <div class="section-title">Client Information</div>
      <div class="client-grid">
        <div class="meta-item">
          <label>Recipient Name</label>
          <span>${name}</span>
        </div>
        <div class="meta-item">
          <label>Authorized Contact Email</label>
          <span>${email}</span>
        </div>
      </div>

      <div class="section-title">Client Specifications & Context</div>
      <div class="notes-box">
        <p>"${requestText}"</p>
      </div>

      <div class="section-title">Selected Catalog Editions & Items</div>
      <table>
        <thead>
          <tr>
            <th>Edition / Item Description</th>
            <th class="text-center">Qty</th>
            <th class="text-right">Unit Price</th>
            <th class="text-right">Line Total</th>
          </tr>
        </thead>
        <tbody>
          ${calculation.items.map(item => `
            <tr>
              <td><strong>${item.name}</strong></td>
              <td class="text-center">${item.quantity}</td>
              <td class="text-right">€${item.unitPrice.toFixed(2)}</td>
              <td class="text-right">€${item.lineTotal.toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="totals-area">
        <div class="totals-table">
          <div class="totals-row">
            <span>Subtotal (Net)</span>
            <span>€${calculation.subtotal.toFixed(2)}</span>
          </div>
          <div class="totals-row">
            <span>VAT / Taxes (23%)</span>
            <span>€${calculation.vatAmount.toFixed(2)}</span>
          </div>
          <div class="totals-row grand-total">
            <span>Grand Total</span>
            <span>€${calculation.grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div class="terms-box">
        <strong>Terms & SLA:</strong> This proposal is valid for 30 calendar days from issuance. Day-One physical/digital launch allotments are reserved under Rockstar Games Social Club enterprise licensing. 100% money-back guarantee applies prior to official title release date.
      </div>

      <div class="cta-area">
        <a href="${calComLink}" target="_blank" rel="noopener noreferrer" class="btn-cal">
          📅 Confirm & Schedule Review Call via Cal.com
        </a>
      </div>

      <div class="footer-seal">
        Rockstar Games Entertainment Publishing • Confidential & Direct Publisher SLA
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * 3. PROFESSIONAL & STRUCTURED EMAIL TEMPLATE (HTML)
 * Dispatched email body with executive, dark-themed Rockstar Games design
 */
export function generateProposalEmailBodyHtml(params: {
  proposalId: string;
  name: string;
  email: string;
  submissionDate: string;
  requestText: string;
  calculation: ProposalCalculationResult;
  proposalUrl: string;
  calComLink: string;
}): string {
  const { proposalId, name, email, submissionDate, requestText, calculation, proposalUrl, calComLink } = params;

  return `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Proposta Oficial Rockstar Games - ${proposalId}</title>
</head>
<body style="margin:0; padding:0; background-color:#0b0c10; font-family:'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#e4e4e7;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#0b0c10; padding:30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table width="640" border="0" cellpadding="0" cellspacing="0" style="max-width:640px; width:100%; background-color:#12141c; border:1px solid #27272a; border-radius:14px; overflow:hidden; box-shadow:0 20px 40px rgba(0,0,0,0.8);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background:linear-gradient(135deg, #181920 0%, #0d0e14 100%); padding:28px 32px; border-bottom:3px solid #f59e0b;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50" valign="middle">
                    <div style="width:44px; height:44px; background-color:#f59e0b; color:#000000; font-weight:900; font-size:24px; line-height:44px; text-align:center; border-radius:8px;">
                      R★
                    </div>
                  </td>
                  <td valign="middle" style="padding-left:14px;">
                    <div style="font-size:18px; font-weight:900; letter-spacing:1px; color:#ffffff; text-transform:uppercase;">
                      Rockstar Games Publishing
                    </div>
                    <div style="font-size:11px; color:#a1a1aa; letter-spacing:2px; text-transform:uppercase;">
                      Divisão de Licenciamento & Propostas Oficiais
                    </div>
                  </td>
                  <td align="right" valign="middle">
                    <div style="font-family:monospace; color:#f59e0b; font-weight:700; font-size:13px;">
                      ${proposalId}
                    </div>
                    <div style="font-size:11px; color:#71717a;">
                      ${submissionDate}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding:32px;">
              
              <!-- Formal Greeting -->
              <h2 style="margin:0 0 16px 0; font-size:20px; font-weight:700; color:#ffffff;">
                Exmo(a). Sr(a). ${name},
              </h2>

              <p style="margin:0 0 24px 0; font-size:14px; line-height:1.6; color:#d4d4d8;">
                Acusamos a receção do seu pedido de proposta comercial. A nossa equipa e o motor automatizado da Rockstar Games processaram os requisitos solicitados com base no catálogo de licenciamento oficial.
              </p>

              <!-- Reference Details Box -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#181920; border:1px solid #27272a; border-radius:8px; padding:16px; margin-bottom:24px;">
                <tr>
                  <td width="50%" style="padding:6px 12px;">
                    <span style="font-size:10px; color:#71717a; text-transform:uppercase; letter-spacing:1px; display:block;">Código da Proposta</span>
                    <strong style="font-size:13px; color:#f59e0b; font-family:monospace;">${proposalId}</strong>
                  </td>
                  <td width="50%" style="padding:6px 12px;">
                    <span style="font-size:10px; color:#71717a; text-transform:uppercase; letter-spacing:1px; display:block;">Data de Emissão</span>
                    <strong style="font-size:13px; color:#ffffff;">${submissionDate}</strong>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding:6px 12px;">
                    <span style="font-size:10px; color:#71717a; text-transform:uppercase; letter-spacing:1px; display:block;">Destinatário Autorizado</span>
                    <strong style="font-size:13px; color:#ffffff;">${name}</strong>
                  </td>
                  <td width="50%" style="padding:6px 12px;">
                    <span style="font-size:10px; color:#71717a; text-transform:uppercase; letter-spacing:1px; display:block;">Email Registado</span>
                    <strong style="font-size:13px; color:#ffffff;">${email}</strong>
                  </td>
                </tr>
              </table>

              <!-- Client Request Excerpt -->
              <div style="background-color:#14151c; border-left:3px solid #f59e0b; padding:12px 16px; border-radius:0 6px 6px 0; margin-bottom:24px;">
                <span style="font-size:11px; text-transform:uppercase; color:#a1a1aa; font-weight:700; display:block; margin-bottom:4px;">
                  Resumo dos Requisitos Submetidos:
                </span>
                <p style="margin:0; font-size:12px; color:#e4e4e7; font-style:italic;">
                  "${requestText}"
                </p>
              </div>

              <!-- Executive Summary Table -->
              <div style="margin-bottom:24px;">
                <span style="font-size:11px; text-transform:uppercase; color:#f59e0b; font-weight:800; letter-spacing:1px; display:block; margin-bottom:8px;">
                  Discriminação dos Itens & Cotação Oficial
                </span>
                <table width="100%" border="0" cellpadding="10" cellspacing="0" style="border-collapse:collapse; background-color:#161722; border:1px solid #27272a; border-radius:8px; overflow:hidden;">
                  <thead>
                    <tr style="background-color:#1f202c; border-bottom:1px solid #27272a;">
                      <th align="left" style="font-size:11px; text-transform:uppercase; color:#a1a1aa; letter-spacing:1px;">Item / Edição</th>
                      <th align="center" style="font-size:11px; text-transform:uppercase; color:#a1a1aa; letter-spacing:1px;" width="60">Qtd</th>
                      <th align="right" style="font-size:11px; text-transform:uppercase; color:#a1a1aa; letter-spacing:1px;" width="90">Unitário</th>
                      <th align="right" style="font-size:11px; text-transform:uppercase; color:#a1a1aa; letter-spacing:1px;" width="95">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${calculation.items.map(item => `
                      <tr style="border-bottom:1px solid #22232c;">
                        <td style="font-size:12px; color:#ffffff; font-weight:600;">${item.name}</td>
                        <td align="center" style="font-size:12px; color:#d4d4d8;">${item.quantity}</td>
                        <td align="right" style="font-size:12px; color:#d4d4d8;">€${item.unitPrice.toFixed(2)}</td>
                        <td align="right" style="font-size:12px; color:#ffffff; font-weight:700;">€${item.lineTotal.toFixed(2)}</td>
                      </tr>
                    `).join('')}
                    <!-- Subtotal, VAT, Total -->
                    <tr>
                      <td colspan="3" align="right" style="padding-top:12px; font-size:12px; color:#a1a1aa;">Subtotal Líquido:</td>
                      <td align="right" style="padding-top:12px; font-size:12px; color:#ffffff; font-weight:600;">€${calculation.subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colspan="3" align="right" style="font-size:12px; color:#a1a1aa;">IVA (23%):</td>
                      <td align="right" style="font-size:12px; color:#ffffff; font-weight:600;">€${calculation.vatAmount.toFixed(2)}</td>
                    </tr>
                    <tr style="border-top:2px solid #f59e0b;">
                      <td colspan="3" align="right" style="padding-top:10px; font-size:15px; font-weight:900; color:#ffffff; text-transform:uppercase;">Total Global:</td>
                      <td align="right" style="padding-top:10px; font-size:16px; font-weight:900; color:#f59e0b; font-family:monospace;">€${calculation.grandTotal.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Primary Call To Action Button -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin:30px 0 24px 0;">
                <tr>
                  <td align="center">
                    <a href="${proposalUrl}" target="_blank" style="display:inline-block; background-color:#f59e0b; color:#000000; font-family:'Segoe UI', Arial, sans-serif; font-size:14px; font-weight:900; text-decoration:none; padding:16px 36px; border-radius:8px; text-transform:uppercase; letter-spacing:1px; box-shadow:0 4px 18px rgba(245,158,11,0.4);">
                      VISUALIZAR PROPOSTA OFICIAL (HTML)
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Direct Link Copy Fallback -->
              <p style="margin:0 0 24px 0; font-size:11px; text-align:center; color:#71717a; word-break:break-all;">
                Se o botão acima não funcionar, copie este link para o navegador:<br>
                <a href="${proposalUrl}" style="color:#f59e0b; text-decoration:underline;">${proposalUrl}</a>
              </p>

              <!-- Secondary Call to Action (Cal.com) -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#161720; border:1px solid #27272a; border-radius:8px; padding:16px; margin-bottom:28px;">
                <tr>
                  <td style="font-size:12px; color:#d4d4d8; text-align:center;">
                    Deseja rever esta cotação ou colocar questões com um responsável técnico?<br>
                    <a href="${calComLink}" target="_blank" style="color:#f59e0b; font-weight:700; text-decoration:underline; font-size:13px; display:inline-block; margin-top:6px;">
                      📅 Agendar Sessão de Revisão no Cal.com (30 min)
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Terms & SLA -->
              <p style="margin:0 0 16px 0; font-size:11px; line-height:1.5; color:#71717a;">
                <strong>Termos & Validade:</strong> Esta proposta é válida por 30 dias a partir da data de emissão. A garantia de alocação no primeiro dia de lançamento (Day-One) encontra-se abrangida pelo Acordo de Nível de Serviço (SLA) da Rockstar Games.
              </p>

            </td>
          </tr>

          <!-- Legal Footer -->
          <tr>
            <td style="background-color:#0d0e14; border-top:1px solid #27272a; padding:20px 32px; text-align:center;">
              <p style="margin:0; font-size:10px; color:#52525b; line-height:1.4;">
                Rockstar Games Publishing • Confidential & Protected Communication<br>
                Take-Two Interactive Software • New York • London • Paris
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Trigger real email dispatch using the Resend API (resend.com)
 * Uses public CORS proxy and server-side route to bypass browser CORS limitations
 */
export async function sendProposalEmailViaResend(params: {
  to: string;
  proposalId: string;
  subject: string;
  html: string;
  proposalUrl: string;
}): Promise<{
  success: boolean;
  resendId?: string;
  sentAt?: string;
  error?: string;
}> {
  const RESEND_API_KEY = 're_KtvW52vw_2XUPzNzzQ26FTLBsTtNFL63y';
  const fromAddress = 'Rockstar Games Publishing <onboarding@resend.dev>';
  const emailPayload = {
    from: fromAddress,
    to: [params.to],
    subject: params.subject,
    html: params.html
  };

  let lastError = '';

  // 1. Try public CORS proxy as explicitly required by specification: https://corsproxy.io/?url=...
  try {
    const corsProxyEndpoint = `https://corsproxy.io/?url=${encodeURIComponent('https://api.resend.com/emails')}`;
    const proxyResponse = await fetch(corsProxyEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailPayload)
    });

    const proxyData = await proxyResponse.json();
    if (proxyResponse.ok && proxyData.id) {
      console.log('[Resend Email Dispatched via CORS Proxy]: ID', proxyData.id, 'to', params.to);
      return {
        success: true,
        resendId: proxyData.id,
        sentAt: new Date().toISOString()
      };
    } else {
      lastError = proxyData.message || proxyData.error || 'CORS Proxy: Resend returned error status.';
      console.warn('[CORS Proxy Resend Warning]:', proxyData);
    }
  } catch (proxyErr: any) {
    lastError = proxyErr.message || 'CORS proxy request failed.';
    console.warn('[CORS Proxy failed, falling back to server route]:', proxyErr);
  }

  // 2. Try server-side endpoint proxy (/api/send-proposal-email)
  try {
    const response = await fetch('/api/send-proposal-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: params.to,
        subject: params.subject,
        html: params.html,
        proposalId: params.proposalId,
        proposalUrl: params.proposalUrl
      })
    });

    const data = await response.json();
    if (response.ok && data.success) {
      console.log('[Resend Email Dispatched via Server Proxy]: ID', data.resendId, 'to', params.to);
      return {
        success: true,
        resendId: data.resendId,
        sentAt: data.sentAt || new Date().toISOString()
      };
    } else {
      lastError = data.error || lastError;
      console.warn('Server endpoint send-proposal-email response:', data);
    }
  } catch (err: any) {
    lastError = err.message || lastError;
    console.warn('Server endpoint send-proposal-email error, attempting direct fallback:', err);
  }

  // 3. Direct fallback to https://api.resend.com/emails
  try {
    const directRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailPayload)
    });

    const directData = await directRes.json();
    if (directRes.ok && directData.id) {
      console.log('[Resend Email Dispatched Directly]: ID', directData.id, 'to', params.to);
      return {
        success: true,
        resendId: directData.id,
        sentAt: new Date().toISOString()
      };
    }
    lastError = directData.message || directData.error || lastError;
  } catch (directErr: any) {
    lastError = directErr.message || lastError;
  }

  // Log exact error in browser console as requested
  console.error('[Resend Email Dispatch Error]:', lastError);

  return {
    success: false,
    error: lastError || 'Failed to dispatch email via Resend API.'
  };
}

/**
 * 4. COMPLETE WORKFLOW: Save initial -> LLM Calculate -> Generate HTML -> Dispatch Email via Resend -> Update Firestore
 */
export async function executeProposalWorkflow(formData: {
  name: string;
  email: string;
  requestText: string;
  selectedTier?: string;
}): Promise<ProposalWorkflowResult> {
  const { name, email, requestText, selectedTier } = formData;
  const calComLink = "https://cal.com/joao-correia-lus35m/30min";

  // Generate unique proposal ID
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  const proposalId = `RSTAR-PROP-${randomSuffix}`;

  const submissionDate = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // 2. Direct proposal link generation with clean hash parameter: #view-proposal-${proposalId}
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const proposalUrl = `${origin}${pathname}#view-proposal-${proposalId}`;

  // Step 4.a: Save initial submission to Firestore with status: "processing"
  let docId = proposalId;
  try {
    docId = await saveInitialProposalToFirestore({
      proposalId,
      name,
      email,
      requestText,
      selectedTier
    });
  } catch (err) {
    console.warn('Initial save to Firestore handled via fallback:', err);
  }

  // Step 4.b: Use Gemini API / LLM to interpret free-text and extract structured pricing
  const calculation = await calculateProposalWithLLM(name, email, requestText, selectedTier);

  // Step 4.c: Generate official HTML proposal document
  const htmlContent = generateProposalHtmlDocument({
    proposalId,
    name,
    email,
    submissionDate,
    requestText,
    calculation,
    calComLink
  });

  // Step 4.c (cont.): Generate structured email body & dispatch via Resend API
  const emailHtml = generateProposalEmailBodyHtml({
    proposalId,
    name,
    email,
    submissionDate,
    requestText,
    calculation,
    proposalUrl,
    calComLink
  });

  const emailResult = await sendProposalEmailViaResend({
    to: email,
    proposalId,
    subject: `Proposta Oficial Rockstar Games [${proposalId}] - ${name}`,
    html: emailHtml,
    proposalUrl
  });

  const emailStatus: 'sent' | 'error' = emailResult.success ? 'sent' : 'error';
  const sentAt = emailResult.sentAt || new Date().toISOString();

  // Step 4.d: Save calculated proposal, items, total, and HTML back into Firestore (status: "completed")
  try {
    await updateCompletedProposalInFirestore(docId, {
      status: 'completed',
      items: calculation.items,
      subtotal: calculation.subtotal,
      vatRate: calculation.vatRate,
      vatAmount: calculation.vatAmount,
      total: calculation.grandTotal,
      htmlContent,
      emailStatus,
      resendId: emailResult.resendId,
      sentAt,
      proposalUrl,
      emailError: emailResult.error
    });
  } catch (err) {
    console.warn('Update proposal in Firestore handled via fallback:', err);
  }

  return {
    success: true,
    docId,
    proposalId,
    name,
    email,
    requestText,
    submissionDate,
    calculation,
    htmlContent,
    emailDispatched: emailResult.success,
    calComLink,
    proposalUrl,
    emailStatus,
    resendId: emailResult.resendId,
    sentAt,
    emailError: emailResult.error
  };
}

/**
 * Validate proposal form inputs
 */
export function validateProposalRequest(data: { name: string; email: string; requestText: string }): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Full Name is required (minimum 2 characters).';
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!data.requestText || data.requestText.trim().length < 8) {
    errors.requestText = 'Please describe your request (minimum 8 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
