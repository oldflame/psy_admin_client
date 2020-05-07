export enum GENDER {
    MALE = 'M',
    FEMALE = 'F',
    OTHERS = 'O'
}

export const AUTH_API = {
    LOGIN: "/api/login",
    REGISTER: "/api/register"
};

export const ADMIN_API = {
    GET_ALL_ADMINS: "/api/account/admin",
    APPROVE_ADMIN: "/api/account/admin/approveAdmin/{newAdminID}"
}

export enum HTTP_RESPONSE_STATUS {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    SERVER_ERROR = 500
}