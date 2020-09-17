export interface User {
    id?: number;
    FirstName: string;
    LastName: string;
    Address: string;
    City: string;
    ZipCode: number;
    Phone: string;
    Email: string;
    CheckIn?: Date;
}