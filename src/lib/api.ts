import { Service, TimeSlot, Appointment } from './types';

const MOCK_SERVICES: Service[] = [
    { id: '1', name: 'Стрижка мужская', description: 'Классическая техника, подбор формы', price: 800, priceRegular: 1000, durationMinutes: 45, imageUrl: '/images/service_1.jpg' },
    { id: '2', name: 'С переходом от нуля', description: 'Fade, плавный переход, четкие линии', price: 1200, priceRegular: 1500, durationMinutes: 60, imageUrl: '/images/service_2.jpg' },
    { id: '3', name: 'Стрижка под насадки', description: 'Быстро, аккуратно, одной-двумя насадками', price: 600, priceRegular: 800, durationMinutes: 30, imageUrl: '/images/service_3.jpg' },
    { id: '4', name: 'Оформление бороды', description: 'Коррекция формы, работа с контуром', price: 600, priceRegular: 800, durationMinutes: 30, imageUrl: '/images/service_4.jpg' },
    { id: '5', name: 'Стрижка + борода', description: 'Полный комплекс процедур', price: 1600, priceRegular: 2000, durationMinutes: 90, imageUrl: '/images/service_5.jpg' },
];

const MOCK_APPOINTMENTS: Appointment[] = [
    { id: '101', serviceId: '1', serviceName: 'Стрижка мужская', date: '2026-03-10', time: '14:00', status: 'upcoming', price: 800 },
    { id: '102', serviceId: '2', serviceName: 'С переходом от нуля', date: '2026-03-15', time: '16:00', status: 'upcoming', price: 1200 },
    { id: '103', serviceId: '5', serviceName: 'Стрижка + борода', date: '2026-02-15', time: '11:00', status: 'past', price: 1600 },
    { id: '104', serviceId: '4', serviceName: 'Оформление бороды', date: '2026-01-22', time: '13:00', status: 'past', price: 600 },
];

// In-memory store for mock state mutations
let _appointments = [...MOCK_APPOINTMENTS];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
    getServices: async (): Promise<Service[]> => {
        await delay(300);
        return MOCK_SERVICES;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getTimeSlots: async (_date: string): Promise<TimeSlot[]> => {
        await delay(400);
        const slots: TimeSlot[] = [];
        for (let h = 10; h <= 20; h++) {
            slots.push({ time: `${h}:00`, available: Math.random() > 0.3 });
            if (h !== 20) {
                slots.push({ time: `${h}:30`, available: Math.random() > 0.3 });
            }
        }
        return slots;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    requestPhoneCode: async (_phone: string): Promise<{ success: boolean }> => {
        await delay(600);
        return { success: true };
    },

    confirmBooking: async (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _data: { phone: string; serviceId?: string; date: Date | null; timeSlot: string }
    ): Promise<{ success: boolean, appointmentId: string }> => {
        await delay(800);
        return { success: true, appointmentId: Math.random().toString(36).substring(2, 9) };
    },

    getAppointments: async (): Promise<Appointment[]> => {
        await delay(400);
        return [..._appointments];
    },

    cancelAppointment: async (id: string): Promise<{ success: boolean }> => {
        await delay(500);
        _appointments = _appointments.map(a =>
            a.id === id ? { ...a, status: 'cancelled' as const, cancelledAt: new Date().toISOString() } : a
        );
        return { success: true };
    },
};
