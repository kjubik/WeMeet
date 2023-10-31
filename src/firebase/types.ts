
export interface User {
    id: string;         // This should be the UID from Firebase Authentication
    username: string;
    name: string;
    email: string;
    events: string[];    // events in which the user is participating
}

export interface Event {
    id: string;
    title: string;
    description: string;
    organizer: string | undefined;
    participants: (string | undefined)[];
}
