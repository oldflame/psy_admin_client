export interface Location {
    _id: string;
    name: string;
    code: string;
    description: string;
    tags: string[];
    address: string;
    city: string;
    state: string;
    pincode: string;
    mobile: string;
    email: string;
    isDeleted: boolean;
}
