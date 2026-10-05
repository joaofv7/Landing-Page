import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini AI Client (User-Agent header required by skill guidelines)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Official Knowledge Base Catalog definition for LLM mapping
const KNOWLEDGE_BASE_ITEMS = [
  { name: 'GTA VI Standard Edition', price: 69.99 },
  { name: 'GTA VI Vice City Deluxe Edition', price: 89.99 },
  { name: 'Leonida Sovereign Collector\'s Box', price: 179.99 },
  { name: 'GTA Online Enterprise Bundle (10M GTA$ + Executive Pack)', price: 99.99 },
  { name: 'Rockstar VIP Community & Esports Event Pass', price: 299.99 },
  { name: 'Enterprise Commercial Sponsorship Tier', price: 999.00 }
];

/**
 * 4.b LLM Request Interpretation & Automated Proposal Calculation Endpoint
 */
app.post('/api/calculate-proposal', async (req, res) => {
  try {
    const { name, email, requestText, selectedTier } = req.body;

    if (!requestText || typeof requestText !== 'string') {
      return res.status(400).json({ error: 'Missing request description text.' });
    }

    const systemPrompt = `You are the official Rockstar Games Proposal & Quotation Engine.
Your task is to analyze a client's free-text request description and accurately map it to one or more items from the official Knowledge Base catalog.

OFFICIAL KNOWLEDGE BASE CATALOG:
1. "GTA VI Standard Edition" - Unit Price: €69.99
2. "GTA VI Vice City Deluxe Edition" - Unit Price: €89.99
3. "Leonida Sovereign Collector's Box" - Unit Price: €179.99
4. "GTA Online Enterprise Bundle (10M GTA$ + Executive Pack)" - Unit Price: €99.99
5. "Rockstar VIP Community & Esports Event Pass" - Unit Price: €299.99
6. "Enterprise Commercial Sponsorship Tier" - Unit Price: €999.00

RULES:
- Carefully extract any specified quantities (e.g., "5 copies of GTA VI Standard", "2 collector boxes", "10 enterprise passes"). If no quantity is specified for a matched item, default quantity to 1.
- If the customer mentions esports, tournaments, or VIP creator events, map to "Rockstar VIP Community & Esports Event Pass".
- If the customer mentions corporate sponsorship, billboard, commercial branding, or arcade licensing, map to "Enterprise Commercial Sponsorship Tier".
- If the customer mentions GTA Online cash, executive properties, or multiplayer bundle, map to "GTA Online Enterprise Bundle (10M GTA$ + Executive Pack)".
- If selectedTier is provided ("${selectedTier || ''}") and not contradicted, include it in the calculation.
- If no item matches, default to "GTA VI Standard Edition" with quantity 1.
- Calculate:
  * lineTotal = quantity * unitPrice
  * subtotal = sum of all line totals
  * vatAmount = subtotal * 0.23 (23% VAT standard rate)
  * grandTotal = subtotal + vatAmount
- Provide a brief summaryNotes explaining the pricing rationale.`;

    const userPrompt = `Client Name: ${name || 'Prospective Client'}
Client Email: ${email || 'N/A'}
Selected Tier Hint: ${selectedTier || 'None'}
Free-Text Request Description:
"""
${requestText}
"""

Extract the matched items and compute line totals, subtotal, 23% VAT, and grand total.`;

    let calculatedData = null;

    // Call Gemini API if key is available
    if (process.env.GEMINI_API_KEY) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: userPrompt,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                items: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      quantity: { type: Type.INTEGER },
                      unitPrice: { type: Type.NUMBER },
                      lineTotal: { type: Type.NUMBER },
                    },
                    required: ['name', 'quantity', 'unitPrice', 'lineTotal']
                  }
                },
                subtotal: { type: Type.NUMBER },
                vatAmount: { type: Type.NUMBER },
                grandTotal: { type: Type.NUMBER },
                summaryNotes: { type: Type.STRING }
              },
              required: ['items', 'subtotal', 'vatAmount', 'grandTotal']
            }
          }
        });

        if (response.text) {
          calculatedData = JSON.parse(response.text.trim());
        }
      } catch (geminiError) {
        console.warn('Gemini generateContent error, executing intelligent fallback:', geminiError);
      }
    }

    // Fallback parser if Gemini is unconfigured or failed
    if (!calculatedData || !calculatedData.items || calculatedData.items.length === 0) {
      const lower = requestText.toLowerCase();
      const matched = [];

      KNOWLEDGE_BASE_ITEMS.forEach(item => {
        let isHit = false;
        let q = 1;

        if (item.name.toLowerCase().includes('standard') && (lower.includes('standard') || lower.includes('regular'))) isHit = true;
        if (item.name.toLowerCase().includes('deluxe') && lower.includes('deluxe')) isHit = true;
        if (item.name.toLowerCase().includes('collector') && (lower.includes('collector') || lower.includes('box') || lower.includes('sovereign'))) isHit = true;
        if (item.name.toLowerCase().includes('enterprise bundle') && (lower.includes('online') || lower.includes('10m') || lower.includes('enterprise pack'))) isHit = true;
        if (item.name.toLowerCase().includes('esports') && (lower.includes('vip') || lower.includes('esports') || lower.includes('tournament'))) isHit = true;
        if (item.name.toLowerCase().includes('sponsorship') && (lower.includes('sponsor') || lower.includes('commercial') || lower.includes('b2b'))) isHit = true;

        if (selectedTier && selectedTier.includes(item.name)) isHit = true;

        if (isHit) {
          const qtyRegex = new RegExp(`(?:(\\d+)\\s*(?:copies|units|x)?\\s*)?${item.name.split(' ')[0]}`, 'i');
          const m = lower.match(qtyRegex);
          if (m && m[1]) q = parseInt(m[1], 10) || 1;

          matched.push({
            name: item.name,
            quantity: q,
            unitPrice: item.price,
            lineTotal: Number((q * item.price).toFixed(2))
          });
        }
      });

      if (matched.length === 0) {
        matched.push({
          name: KNOWLEDGE_BASE_ITEMS[0].name,
          quantity: 1,
          unitPrice: KNOWLEDGE_BASE_ITEMS[0].price,
          lineTotal: KNOWLEDGE_BASE_ITEMS[0].price
        });
      }

      const subtotal = Number(matched.reduce((acc, curr) => acc + curr.lineTotal, 0).toFixed(2));
      const vatAmount = Number((subtotal * 0.23).toFixed(2));
      const grandTotal = Number((subtotal + vatAmount).toFixed(2));

      calculatedData = {
        items: matched,
        subtotal,
        vatAmount,
        grandTotal,
        summaryNotes: 'Mapped from Rockstar Knowledge Base catalog.'
      };
    }

    res.json({
      success: true,
      ...calculatedData,
      vatRate: 0.23
    });
  } catch (err: any) {
    console.error('Proposal calculation error:', err);
    res.status(500).json({ error: err.message || 'Failed to calculate proposal.' });
  }
});

/**
 * Real Email Dispatch via Resend API (resend.com)
 * Endpoint: https://api.resend.com/emails
 * Authorization: Bearer re_KtvW52vw_2XUPzNzzQ26FTLBsTtNFL63y
 */
app.post('/api/send-proposal-email', async (req, res) => {
  try {
    const { to, subject, html, proposalId, proposalUrl } = req.body;

    if (!to || !html) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters: to and html are mandatory.'
      });
    }

    const resendApiKey = process.env.RESEND_API_KEY || 're_KtvW52vw_2XUPzNzzQ26FTLBsTtNFL63y';
    // Using standard unverified sender address supported by Resend test keys
    const fromAddress = 'Rockstar Games Publishing <onboarding@resend.dev>';

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [to],
        subject: subject || `Proposta Oficial Rockstar Games [${proposalId || 'RSTAR'}]`,
        html: html
      })
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.warn('[Resend API Warning]:', resendData);
      return res.status(resendResponse.status).json({
        success: false,
        error: resendData.message || 'Resend API rejected the email request.',
        details: resendData
      });
    }

    console.log('[Resend Email Dispatched]: ID', resendData.id, 'to', to);
    return res.json({
      success: true,
      resendId: resendData.id,
      sentAt: new Date().toISOString(),
      proposalUrl: proposalUrl
    });
  } catch (err: any) {
    console.error('Error dispatching proposal email via Resend:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Failed to dispatch email via Resend API.'
    });
  }
});

// Setup Vite middleware for development, or static hosting for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
} else {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { 
      middlewareMode: true,
      hmr: process.env.DISABLE_HMR !== 'true'
    },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(port, () => {
  console.log(`Rockstar Games server active on port ${port}`);
});
