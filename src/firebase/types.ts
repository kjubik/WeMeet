
export interface User {
    name: string;
    email: string;
}

export interface UserDocument extends User {
    id: string; // This should be the UID from Firebase Authentication
}

export interface Event {
    title: string;
    organizer: string; // User UID
}

export interface EventDocument extends Event {
    id: string;
}
