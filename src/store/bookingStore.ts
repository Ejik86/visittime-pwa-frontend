import { create } from 'zustand';
import { Service } from '@/lib/types';

interface BookingState {
    service: Service | null;
    date: Date | null;
    timeSlot: string;
    phone: string;
    isLoyal: boolean;
    setService: (s: Service | null) => void;
    setDate: (d: Date | null) => void;
    setTimeSlot: (t: string) => void;
    setPhone: (p: string) => void;
    setIsLoyal: (b: boolean) => void;
    reset: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
    service: null,
    date: null,
    timeSlot: '',
    phone: '',
    isLoyal: false,
    setService: (service) => set({ service }),
    setDate: (date) => set({ date, timeSlot: '' }),
    setTimeSlot: (timeSlot) => set({ timeSlot }),
    setPhone: (phone) => set({ phone }),
    setIsLoyal: (isLoyal) => set({ isLoyal }),
    reset: () => set({ service: null, date: null, timeSlot: '', phone: '', isLoyal: false }),
}));
