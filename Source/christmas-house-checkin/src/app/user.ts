export interface User {
    id?: number;
    firstname: string;
    lastname: string;
    address: string;
    city: string;
    zipcode: number;
    phone: string;
    email: string;
    checkin?: Date;
}