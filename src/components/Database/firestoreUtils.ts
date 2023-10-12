import { db } from "../../App";
import { addDoc, collection, doc, getDoc, getDocs, setDoc, query, where } from 'firebase/firestore';
import { Meeting } from "./firestoreTypes";

export const doesDocumentWithIdExist = async (collectionName: string, documentId: string) => {
  try {
    const userDocRef = doc(db, collectionName, documentId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      return true; // Document exists
    } else {
      return false; // Document does not exist
    }
  } catch (error) {
    console.error('Error checking if user document exists:', error);
    throw error;
  }
};

export const addDocToCollection = async (collectionName: string, documentId: string, data: any) => {
  try {
    const documentRef = doc(db, collectionName, documentId);
    await setDoc(documentRef, data);
    console.log(`Document added to ${collectionName} with ID ${documentId}`);
  } catch (error) {
    console.error(`Error adding document to collection '${collectionName}':`, error);
    throw error;
  }
};

export const createMeeting = async (data: Meeting) => {
  try {
    const documentRef = collection(db, 'meetings');
    await addDoc(documentRef, data);
    console.log(`Meeting created with Auto-ID`);
  } catch (error) {
    console.error(`Error adding document to collection meetings:`, error);
    throw error;
  }
};

export const viewOwnedMeetings = async (userID: string) => {
  try {
    const docRef = collection(db, 'meetings');
    const q = query(docRef, where('owner', '==', userID));
    const querySnapshot = await getDocs(q);

    const documents: any[] = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id:doc.id, ...doc.data()})
    })

    return documents;
  } catch (error) {
    console.error('Error getting documents:', error);
    throw error;
  }
}