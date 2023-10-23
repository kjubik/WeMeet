import { Timestamp } from "@firebase/firestore";

export type User = {
    id: string | null;      // setting these to 'string | null' seems to be dumb, but it resolves issues in sign up and registration
    email: string | null; 
    events: Event[];
}

export type Event = {
    id: string;
    name: string;
    startDate: Timestamp;
    endDate: Timestamp;
    owner: string;
    participants: User[];
}
