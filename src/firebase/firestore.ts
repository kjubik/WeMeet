import { db } from './firebaseConfig';
import { User, Event } from './types';
import { collection, doc, getDocs, addDoc, runTransaction, setDoc } from 'firebase/firestore';

export const getUsers = async (): Promise<User[]> => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User));
}

export const createUser = async (user: User) => {
  await setDoc(doc(db, "users", user.id), {name: user.name, email: user.email});
}

export const getEvents = async (): Promise<Event[]> => {
  const querySnapshot = await getDocs(collection(db, "events"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Event));
}

export const createEvent = async (event: Omit<Event, 'id'>, userId: string | undefined) => {
  try {
    await runTransaction(db, async (_transaction) => {
      const newEvent = await addDoc(collection(db, "events"), event);
      await setDoc(doc(db, `users/${userId}/events`, newEvent.id), event);
    });
    console.log("Event created successfully!");
  }
  catch (error) {
    console.error("Error creating the event:", error);
    throw error;
  }
}
