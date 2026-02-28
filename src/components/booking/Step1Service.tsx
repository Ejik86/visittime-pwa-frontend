"use client";

import { Service } from "@/lib/types";
import { useBookingStore } from "@/store/bookingStore";
import { ServiceCard } from "./ServiceCard";

interface Step1Props {
    services: Service[];
    onNext: () => void;
}

export function Step1Service({ services, onNext }: Step1Props) {
    const { service, setService } = useBookingStore();

    return (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-500 pb-32">
            <div className="mb-6">
                <h2 className="text-xl font-bold tracking-wide text-[var(--color-text)]">Выберите услугу</h2>
                <p className="text-sm text-[var(--color-muted)] mt-2">Мастер подберет стиль индивидуально</p>
            </div>

            <div className="flex flex-col gap-3">
                {services.map((s) => (
                    <ServiceCard
                        key={s.id}
                        service={s}
                        isSelected={service?.id === s.id}
                        onClick={() => {
                            setService(s);
                            setTimeout(onNext, 250);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
