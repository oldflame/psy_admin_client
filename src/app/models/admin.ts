import { GENDER } from '../constants';
export interface Admin {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    gender: GENDER
}