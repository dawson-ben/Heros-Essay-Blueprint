import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, serverTimestamp, query, where, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { EssayDraft } from './types';

const getEssaysCollectionRef = (userId: string) => collection(db, `users/${userId}/essays`);
const getEssayDocRef = (userId: string, essayId: string) => doc(db, `users/${userId}/essays`, essayId);

export const fetchEssays = async (userId: string): Promise<EssayDraft[]> => {
  try {
    const q = query(getEssaysCollectionRef(userId), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      } as EssayDraft;
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, `users/${userId}/essays`);
    return [];
  }
};

export const fetchEssay = async (userId: string, essayId: string): Promise<EssayDraft | null> => {
  try {
    const snapshot = await getDoc(getEssayDocRef(userId, essayId));
    if (!snapshot.exists()) return null;
    const data = snapshot.data();
    return {
      id: snapshot.id,
      ...data,
      createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    } as EssayDraft;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `users/${userId}/essays/${essayId}`);
    return null;
  }
};

export const createEssay = async (userId: string, essay: Omit<EssayDraft, 'id' | 'createdAt' | 'updatedAt'>): Promise<EssayDraft> => {
  const essayId = crypto.randomUUID(); // Good enough for IDs
  try {
    const payload = {
      ...essay,
      userId,
      schemaVersion: 1,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(getEssayDocRef(userId, essayId), payload);
    return { 
      id: essayId, 
      ...essay, 
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `users/${userId}/essays/${essayId}`);
    throw error;
  }
};

export const updateEssay = async (userId: string, essayId: string, essayUpdate: Partial<EssayDraft>): Promise<void> => {
  try {
    const payload = {
      ...essayUpdate,
      userId,
      schemaVersion: 1,
      updatedAt: serverTimestamp(),
    };
    // remove id if it exists
    delete (payload as any).id;
    delete (payload as any).createdAt;
    
    await updateDoc(getEssayDocRef(userId, essayId), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `users/${userId}/essays/${essayId}`);
    throw error;
  }
};

export const deleteEssay = async (userId: string, essayId: string): Promise<void> => {
  try {
    await deleteDoc(getEssayDocRef(userId, essayId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `users/${userId}/essays/${essayId}`);
    throw error;
  }
};
