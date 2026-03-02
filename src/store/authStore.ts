import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    isAuthenticated: boolean;
    phone: string;
    isLoyal: boolean;
    setAuthenticated: (phone: string) => void;
    setIsLoyal: (b: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            phone: '',
            isLoyal: false,
            setAuthenticated: (phone) => set({ isAuthenticated: true, phone }),
            setIsLoyal: (isLoyal) => set({ isLoyal }),
            logout: () => set({ isAuthenticated: false, phone: '' }),
        }),
        {
            name: 'dm-auth',
        }
    )
);
