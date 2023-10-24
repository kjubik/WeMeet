import { db } from './firebaseConfig';
import { User, Event } from './types';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

export const getUsers = async (): Promise<User[]> => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User));
}

export const getEvents = async (): Promise<Event[]> => {
  const querySnapshot = await getDocs(collection(db, "events"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Event));
}

export const createEvent = async (event: Event) => {
  await setDoc(doc(db, "events"), event);
}

export const createUser = async (user: User) => {
  await setDoc(doc(db, "users"), user);
}
