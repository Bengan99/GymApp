export interface Member {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    memberSince: string;
    isActive: boolean;
}

export interface CreateMember {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
}

