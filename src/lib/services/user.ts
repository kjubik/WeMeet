import { db } from '$lib/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import type { AuthedUserData } from '$lib/types/user';


export const getUserData = async (uid: string): Promise<AuthedUserData | null> => {
    try {
        const userDoc = await getDoc(doc(db, 'users', uid));

        if (userDoc.exists()) {
            return userDoc.data() as AuthedUserData;
        }
        else {
            return null;
        }
    } catch (error) {
        console.error('Error getting user data:', error);
        return null;
    }
};
