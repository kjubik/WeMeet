import { db } from '$lib/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import type { EventData } from '$lib/types/event';


export const getEventData = async (eventId: string): Promise<EventData | null> => {
    try {
        const eventDoc = await getDoc(doc(db, 'event', eventId));

        if (eventDoc.exists()) {
            return eventDoc.data() as EventData;
        }
        else {
            return null;
        }
    } catch (error) {
        console.error('Error getting document:', error);
        return null;
    }
};
