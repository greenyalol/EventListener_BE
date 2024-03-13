export interface Auth {
    email: string;
    password: string;
    city?: string;
    firstName?: string;
    imageURL?: string;
    lastName?: string;
    phone?: string;
    interests?: string[];
    savedEvents: string[];
    createdEvents: string[];
    joinedEvents: string[];
    bio?: string;
}