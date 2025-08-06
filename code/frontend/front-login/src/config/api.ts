//const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const API_ENDPOINTS = {
    LOGIN: `/backend/auth/login`,
    REGISTER: `/backend/auth/register`,
    ME: `/backend/auth/me`,
    REFRESH: `/backend/auth/refresh`,
} as const;

//export default API_BASE_URL;
