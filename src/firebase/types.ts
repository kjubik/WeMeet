
export interface User {
    id: string; // This should be the UID from Firebase Authentication
    name: string;
    email: string;
}

export interface Event {
    id: string;
    title: string;
    organizer: string; // User UID
}
