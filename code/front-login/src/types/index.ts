export interface User {
    id: string;
    username: string;
    email: string;
    created_at?: string;
    updated_at?: string;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    token: string;
    message?: string;
}

export interface ApiError {
    message: string;
    code?: string;
    details?: any;
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (data: LoginData) => Promise<boolean>;
    register: (data: RegisterData) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
    error: string | null;
}
