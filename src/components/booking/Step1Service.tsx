"use client";

import { Service } from "@/lib/types";
import { useBookingStore } from "@/store/bookingStore";
import { ServiceCard } from "./ServiceCard";
import { cn } from "@/lib/utils";

interface Step1Props {
    services: Service[];
    onNext: () => void;
}

export function Step1Service({ services, onNext }: Step1Props) {
    const { service, setService, isLoyal, setIsLoyal } = useBookingStore();

    return (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-500 pb-32">
            <div className="mb-8">
                <h2 className="text-2xl font-medium tracking-tight text-[var(--color-text)]">Выберите услугу</h2>
                <p className="text-[15px] text-[var(--color-muted)] mt-2 font-light">Мастер подберет технику под ваш тип волос</p>

                {/* Temporary Loyalty Toggle for Demo/UX */}
                <div className="mt-6 flex items-center justify-between bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)]">
                    <span className="text-sm font-medium text-[var(--color-text)]">Я постоянный клиент</span>
                    <button
                        onClick={() => setIsLoyal(!isLoyal)}
                        className={cn(
                            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
                            isLoyal ? "bg-[var(--color-accent)]" : "bg-[var(--color-surface-2)]"
                        )}
                    >
                        <span
                            className={cn(
                                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                isLoyal ? "translate-x-6" : "translate-x-1"
                            )}
                        />
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {services.map((s) => (
                    <ServiceCard
                        key={s.id}
                        service={s}
                        isLoyal={isLoyal}
                        isSelected={service?.id === s.id}
                        onClick={() => {
                            setService(s);
                            setTimeout(onNext, 300);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
