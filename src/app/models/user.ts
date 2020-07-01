import { GENDER } from '../constants';
export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    gender: GENDER;
    birthdate:Date;
    ethnicity:string;
    race:number;
    isActive:number
}