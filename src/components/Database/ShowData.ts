import { db } from "../../App";
import { collection, getDocs } from 'firebase/firestore';

// Function to get all document IDs from the "users" collection
export const getAllUserDocumentIds = async () => {
  const userCollectionRef = collection(db, 'users');
  const querySnapshot = await getDocs(userCollectionRef);

  const documentIds: string[] = [];

  querySnapshot.forEach((doc) => {
    // Assuming that the document IDs are the same as the document names
    documentIds.push(doc.id);
  });

  return documentIds;
};