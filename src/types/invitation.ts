export interface InvitationData {
    eventId: string;
    inviteeId: string;
    inviterId: string;
    status: string;
}

export interface Invitation extends InvitationData {
    id: string;
}
