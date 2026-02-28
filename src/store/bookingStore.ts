import { create } from 'zustand';
import { Service } from '@/lib/types';

interface BookingState {
    service: Service | null;
    date: Date | null;
    timeSlot: string;
    phone: string;
    setService: (s: Service) => void;
    setDate: (d: Date | null) => void;
    setTimeSlot: (t: string) => void;
    setPhone: (p: string) => void;
    reset: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
    service: null,
    date: null,
    timeSlot: '',
    phone: '',
    setService: (service) => set({ service }),
    setDate: (date) => set({ date, timeSlot: '' }),
    setTimeSlot: (timeSlot) => set({ timeSlot }),
    setPhone: (phone) => set({ phone }),
    reset: () => set({ service: null, date: null, timeSlot: '', phone: '' }),
}));
