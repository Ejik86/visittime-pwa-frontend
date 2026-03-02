export interface Service {
    id: string;
    name: string;
    description: string;
    price: number; // Цена для постоянных
    priceRegular: number; // Цена для новых
    durationMinutes: number;
    imageUrl?: string;
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
    price?: number;
    status: 'upcoming' | 'past' | 'cancelled';
    cancelledAt?: string;
}
