/**
 * Firebase & Cloud Firestore Initialization
 * Initialized with the project credentials provided in the specification.
 */
import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  doc, 
  getDoc,
  updateDoc, 
  getDocs, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  type DocumentData
} from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyBghbK0kD9TzOGhLeFiTBK1nEavax2EQXA",
  authDomain: "rockstar-landingpage.firebaseapp.com",
  projectId: "rockstar-landingpage",
  storageBucket: "rockstar-landingpage.firebasestorage.app",
  messagingSenderId: "188371515291",
  appId: "1:188371515291:web:b04c3cb72afab4122e533e"
};

// Singleton App & Firestore Instance
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const proposalsCollection = collection(db, 'proposals');

export interface StoredProposal {
  id: string;
  proposalId: string;
  name: string;
  email: string;
  requestText: string;
  selectedTier?: string;
  status: 'processing' | 'completed' | 'failed';
  items?: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }>;
  subtotal?: number;
  vatRate?: number;
  vatAmount?: number;
  total?: number;
  htmlContent?: string;
  createdAt?: any;
  submissionDate: string;
  source?: 'firestore' | 'local_fallback';
  emailStatus?: 'sent' | 'error' | 'pending';
  resendId?: string;
  sentAt?: string;
  proposalUrl?: string;
  emailError?: string;
}

const LOCAL_STORAGE_KEY = 'rockstar_proposals_store_v2';

/**
 * Get proposals from local cache
 */
export function getLocalProposals(): StoredProposal[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Could not read from local proposals cache', err);
    return [];
  }
}

/**
 * Save proposals to local cache
 */
export function saveLocalProposals(proposals: StoredProposal[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(proposals.slice(0, 50)));
  } catch (err) {
    console.warn('Could not save to local proposals cache', err);
  }
}

/**
 * Upsert a single proposal in local cache
 */
export function upsertLocalProposal(proposal: StoredProposal): void {
  const current = getLocalProposals();
  const index = current.findIndex(p => p.proposalId === proposal.proposalId || p.id === proposal.id);
  if (index >= 0) {
    current[index] = { ...current[index], ...proposal };
  } else {
    current.unshift(proposal);
  }
  saveLocalProposals(current);
}

/**
 * Save initial proposal to Firestore (status: 'processing')
 */
export async function saveInitialProposalToFirestore(data: {
  proposalId: string;
  name: string;
  email: string;
  requestText: string;
  selectedTier?: string;
}): Promise<string> {
  const submissionDate = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const proposalRecord: StoredProposal = {
    id: data.proposalId,
    proposalId: data.proposalId,
    name: data.name,
    email: data.email,
    requestText: data.requestText,
    selectedTier: data.selectedTier || 'Custom Scoping',
    status: 'processing',
    submissionDate,
    source: 'firestore'
  };

  // Always keep in local cache as resilience layer
  upsertLocalProposal({ ...proposalRecord, source: 'local_fallback' });

  try {
    const docRef = await addDoc(proposalsCollection, {
      ...proposalRecord,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (err) {
    console.warn('Firestore write warning (using resilient fallback cache):', err);
    return data.proposalId;
  }
}

/**
 * Update completed proposal in Firestore with calculated totals, generated HTML view, and email dispatch status
 */
export async function updateCompletedProposalInFirestore(
  docIdOrProposalId: string,
  update: {
    status: 'completed';
    items: Array<{ name: string; quantity: number; unitPrice: number; lineTotal: number }>;
    subtotal: number;
    vatRate: number;
    vatAmount: number;
    total: number;
    htmlContent: string;
    emailStatus?: 'sent' | 'error' | 'pending';
    resendId?: string;
    sentAt?: string;
    proposalUrl?: string;
    emailError?: string;
  }
): Promise<void> {
  // Update local cache first
  const current = getLocalProposals();
  const found = current.find(p => p.id === docIdOrProposalId || p.proposalId === docIdOrProposalId);
  if (found) {
    upsertLocalProposal({
      ...found,
      ...update,
      status: 'completed'
    });
  }

  try {
    // Attempt Firestore update
    const docRef = doc(db, 'proposals', docIdOrProposalId);
    await updateDoc(docRef, {
      ...update,
      status: 'completed',
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore updateDoc warning (synced to local cache):', err);
  }
}

/**
 * Fetch a specific proposal by Proposal ID or Document ID
 */
export async function getProposalById(proposalId: string): Promise<StoredProposal | null> {
  const cleanId = (proposalId || '').replace(/^#?view-proposal-/, '').trim().toLowerCase();
  if (!cleanId) return null;

  // Check local cache first
  const localList = getLocalProposals();
  const cached = localList.find(p => 
    (p.proposalId && p.proposalId.toLowerCase() === cleanId) || 
    (p.id && p.id.toLowerCase() === cleanId)
  );
  if (cached && cached.htmlContent) {
    return cached;
  }

  // Attempt direct Firestore doc lookup first
  try {
    const directDocRef = doc(db, 'proposals', cleanId);
    const directDocSnap = await getDoc(directDocRef);
    if (directDocSnap.exists()) {
      const data = directDocSnap.data() as DocumentData;
      const directMatch: StoredProposal = {
        id: directDocSnap.id,
        proposalId: data.proposalId || directDocSnap.id,
        name: data.name || '',
        email: data.email || '',
        requestText: data.requestText || '',
        selectedTier: data.selectedTier,
        status: data.status || 'completed',
        items: data.items || [],
        subtotal: data.subtotal || 0,
        vatRate: data.vatRate || 0.23,
        vatAmount: data.vatAmount || 0,
        total: data.total || 0,
        htmlContent: data.htmlContent || '',
        submissionDate: data.submissionDate || new Date().toLocaleDateString(),
        source: 'firestore',
        emailStatus: data.emailStatus,
        resendId: data.resendId,
        sentAt: data.sentAt,
        proposalUrl: data.proposalUrl,
        emailError: data.emailError
      };
      upsertLocalProposal(directMatch);
      return directMatch;
    }
  } catch (directErr) {
    // Continue to full query
  }

  // Attempt Firestore query
  try {
    const q = query(proposalsCollection);
    const snapshot = await getDocs(q);
    let matched: StoredProposal | null = null;
    snapshot.forEach(docSnap => {
      const data = docSnap.data() as DocumentData;
      const pid = (data.proposalId || docSnap.id || '').toLowerCase();
      const did = (docSnap.id || '').toLowerCase();
      if (pid === cleanId || did === cleanId) {
        matched = {
          id: docSnap.id,
          proposalId: data.proposalId || docSnap.id,
          name: data.name || '',
          email: data.email || '',
          requestText: data.requestText || '',
          selectedTier: data.selectedTier,
          status: data.status || 'completed',
          items: data.items || [],
          subtotal: data.subtotal || 0,
          vatRate: data.vatRate || 0.23,
          vatAmount: data.vatAmount || 0,
          total: data.total || 0,
          htmlContent: data.htmlContent || '',
          submissionDate: data.submissionDate || new Date().toLocaleDateString(),
          source: 'firestore',
          emailStatus: data.emailStatus,
          resendId: data.resendId,
          sentAt: data.sentAt,
          proposalUrl: data.proposalUrl,
          emailError: data.emailError
        };
      }
    });

    if (matched) {
      upsertLocalProposal(matched);
      return matched;
    }
  } catch (err) {
    console.warn('Firestore fetch getProposalById error:', err);
  }

  return cached || null;
}

/**
 * Real-time listener for proposals (Firestore onSnapshot with fallback cache)
 */
export function subscribeToProposals(callback: (proposals: StoredProposal[]) => void): () => void {
  let unsubscribeFirestore = () => {};

  try {
    const q = query(proposalsCollection, orderBy('createdAt', 'desc'));
    unsubscribeFirestore = onSnapshot(
      q,
      (snapshot) => {
        const firestoreList: StoredProposal[] = [];
        snapshot.forEach((d) => {
          const data = d.data() as DocumentData;
          firestoreList.push({
            id: d.id,
            proposalId: data.proposalId || d.id,
            name: data.name || '',
            email: data.email || '',
            requestText: data.requestText || '',
            selectedTier: data.selectedTier,
            status: data.status || 'completed',
            items: data.items || [],
            subtotal: data.subtotal || 0,
            vatRate: data.vatRate || 0.23,
            vatAmount: data.vatAmount || 0,
            total: data.total || 0,
            htmlContent: data.htmlContent || '',
            submissionDate: data.submissionDate || new Date().toLocaleDateString(),
            source: 'firestore',
            emailStatus: data.emailStatus,
            resendId: data.resendId,
            sentAt: data.sentAt,
            proposalUrl: data.proposalUrl,
            emailError: data.emailError
          });
        });

        // Merge with local fallback cache to ensure any transient proposals appear seamlessly
        const localList = getLocalProposals();
        const mergedMap = new Map<string, StoredProposal>();
        
        // Put local first
        localList.forEach(p => mergedMap.set(p.proposalId, p));
        // Overwrite with Firestore authoritative
        firestoreList.forEach(p => mergedMap.set(p.proposalId, p));

        const result = Array.from(mergedMap.values());
        callback(result);
      },
      (error) => {
        console.warn('Firestore subscription failed, falling back to local store cache:', error);
        callback(getLocalProposals());
      }
    );
  } catch (err) {
    console.warn('Firestore listener initialization error:', err);
    callback(getLocalProposals());
  }

  // Also listen for storage events across tabs
  const handleStorageChange = () => {
    callback(getLocalProposals());
  };
  window.addEventListener('storage', handleStorageChange);

  return () => {
    unsubscribeFirestore();
    window.removeEventListener('storage', handleStorageChange);
  };
}
