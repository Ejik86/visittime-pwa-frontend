import { Service, TimeSlot, Appointment } from './types';

const MOCK_SERVICES: Service[] = [
    { id: '1', name: 'Стрижка', description: 'Классическая мужская стрижка', price: 1500, durationMinutes: 60 },
    { id: '2', name: 'Оформление бороды', description: 'Стрижка и моделирование', price: 800, durationMinutes: 30 },
    { id: '3', name: 'Комплекс', description: 'Стрижка + Борода', price: 2000, durationMinutes: 90 },
];

const MOCK_APPOINTMENTS: Appointment[] = [
    { id: '101', serviceId: '1', serviceName: 'Стрижка', date: '2026-03-01', time: '14:00', status: 'upcoming' },
];

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
        return MOCK_APPOINTMENTS;
    }
};
