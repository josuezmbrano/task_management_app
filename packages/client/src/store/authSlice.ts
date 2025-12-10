import { create } from 'zustand';

interface UserState {
    user: {
        public_id: string
        username: string;
        firstname: string;
        lastname: string;
        session_public_id: string;
    } | null
    
    isLoggedIn: boolean
}

interface UserActions {
    setUser: (credentials: UserState['user']) => void
    setIsLoggedIn: (status: boolean) => void
}

export const createUserSlice = create<UserState & UserActions>((set) => ({
    user: null,
    isLoggedIn: false,
    loadingSucceded: false,
    setUser: (credentials) => set(({ user: credentials })),
    setIsLoggedIn: (status) => set(({ isLoggedIn: status})),
}))