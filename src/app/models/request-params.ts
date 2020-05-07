import { GENDER } from '../constants';
export interface RegisterAdminParams {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    mobile: string,
    gender: GENDER
}