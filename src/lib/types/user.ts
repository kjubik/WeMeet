export interface AuthedUserData {
    email: string;
    username: string;
    displayName: string;
    // maybe add avatarUrl later?
}

export interface AuthedUser extends AuthedUserData {
    id: string;
}

