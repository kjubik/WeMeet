import { db } from './firebaseConfig';
import { User, Event } from './types';
import { collection, doc, getDocs, getDoc, addDoc, runTransaction, setDoc, deleteDoc, updateDoc, query, where } from 'firebase/firestore';


export const getUsers = async (): Promise<User[]> => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User));
}


export const getUser = async (userId: string): Promise<User> => {
  const docRef = doc(db, "users", userId);
  const querySnapshot = await getDoc(docRef);
  return { id: querySnapshot.id, ...querySnapshot.data() } as User;
}


export const createUser = async (user: User) => {
  await setDoc(doc(db, "users", user.id), {name: user.name, email: user.email});
}


export const searchUserByUsername = async (username: string): Promise<string | null> => {
  try {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("username", "==", username));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }
    
    const userId = querySnapshot.docs[0].id;
    return userId;
  }
  catch (error) {
    throw error;
  }
}


export const getEvents = async (): Promise<Event[]> => {
  const querySnapshot = await getDocs(collection(db, "events"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Event));
}


export const getUserEvents = async (userId: string): Promise<Event[]> => {
  const querySnapshot = await getDocs(collection(db, `users/${userId}/events`));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Event));
  
}


export const createEvent = async (event: Omit<Event, 'id'>, userId: string | undefined) => {
  try {
    await runTransaction(db, async (_transaction) => {
      const newEvent = await addDoc(collection(db, "events"), event);

      await setDoc(doc(db, `users/${userId}/events`, newEvent.id), event);

      for (const inviteeId of event.invitees) {
        await inviteUserToEvent(inviteeId, newEvent.id);
      }
    });
    console.log("Event created successfully!");
  }
  catch (error) {
    console.error("Error creating the event:", error);
    throw error;
  }
}


export const deleteEvent = async (eventId: string, userId: string | undefined) => {
  try {
    await runTransaction(db, async (_transaction) => {
      await deleteDoc(doc(db, `users/${userId}/events`, eventId));
      await deleteDoc(doc(db, "events", eventId));
    });
  }
  catch (error) {
    console.error("Error deleting the event:", error);
    throw error;
  }
}


export const inviteUserToEvent = async (userId: string, eventId: string) => {
  try {
    const docRef = doc(db, `users/${userId}`);
    const userDoc = await getDoc(docRef);
    const user = userDoc.data() as User;
    await updateDoc(docRef, {
      eventInvites: [...user.eventInvites, eventId]
    });
  }
  catch (error) {
    console.error("Error inviting to the event:", error);
    throw error;
  }
}


export const inviteUsersToEventSQL = async (eventId: string, userId: string) => {
  try {
    await runTransaction(db, async (_transaction) => {
      await addDoc(collection(db, "mapEventsUsers"), {eventId, userId});
    });
    console.log("Event created successfully!");
  } catch (error) {
    console.error("Error creating the event:", error);
    throw error;
  }
}
