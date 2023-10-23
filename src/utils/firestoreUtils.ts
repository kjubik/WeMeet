import { doc, getDoc, getDocs, addDoc, setDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { User } from './firestoreTypes';

export async function createUser(user: User) {
    await addDoc(collection(db, 'users', user.id? user.id : ''), {
        email: user.email,
        events: {},
    });
  }

export async function getUserById(userId: string) {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
        throw new Error(`User with id ${userId} not found`);
    }
    return userDoc.data();
}

export async function getEventById(eventId: string) {
    const userRef = doc(db, 'users', eventId);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
        throw new Error(`Event with id ${eventId} not found`);
    }
    return userDoc.data();
}
