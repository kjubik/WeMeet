import { db } from "../../App";
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

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