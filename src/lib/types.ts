export interface Service {
    id: string;
    name: string;
    description: string;
    price: number; // Цена для постоянных
    priceRegular: number; // Цена для новых
    durationMinutes: number;
}

export interface TimeSlot {
    time: string;
    available: boolean;
}

export interface Appointment {
    id: string;
    serviceId: string;
    serviceName: string;
    date: string;
    time: string;
    status: 'upcoming' | 'past' | 'cancelled';
}
