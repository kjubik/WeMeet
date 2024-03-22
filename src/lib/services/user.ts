import { db } from '$lib/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import type { AuthedUserData } from '$lib/types/user';

/*
Why I'll use `const` instead of `function`:
1. It makes the function immutable, so you don't have to worry about that function being changed by some other piece of code.
2. You can use fat arrow syntax, which is shorter & cleaner.
3. Using arrow functions takes care of this binding for you.
https://stackoverflow.com/questions/33040703/proper-use-of-const-for-defining-functions
*/

export const getUserData = async (uid: string): Promise<AuthedUserData | null> => {
    try {
        const userDoc = await getDoc(doc(db, 'user', uid));

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
