import { ETHNICITY } from 'src/app/constants';
export interface User {
    _id: string;
    birthdate: string;
    isActive: boolean;
    createdAt: string;
    email:string;
    firstName:string;
    lastName:string;
    gender:string;
    race:string;
    ethnicity:string;
}