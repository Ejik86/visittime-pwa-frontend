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
        <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="mb-4">
                <h2 className="text-xl font-medium tracking-tight text-[var(--color-text)]">Выберите услугу</h2>
                <p className="text-sm text-[var(--color-muted)] mt-1 font-light">Нажмите на услугу — перейдёте к выбору времени</p>
            </div>

            <div className="flex flex-col gap-2.5">
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
