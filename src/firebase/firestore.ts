import { db } from './firebaseConfig';
import { Event, UserDocument, EventDocument } from './types';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

export const getUsers = async (): Promise<UserDocument[]> => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as UserDocument));
}

export const createUser = async (user: UserDocument) => {
  await setDoc(doc(db, "users", user.id), {name: user.name, email: user.email});
}

export const getEvents = async (): Promise<EventDocument[]> => {
  const querySnapshot = await getDocs(collection(db, "events"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as EventDocument));
}

export const createEvent = async (event: Omit<Event, 'id'>) => {
  await setDoc(doc(db, "events"), event);
}
