"use client";

import { useState } from "react";
import { useBookingStore } from "@/store/bookingStore";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useAuthStore } from "@/store/authStore";

export function Step3Phone() {
    const { phone: authPhone } = useAuthStore();
    const { setPhone, service, date, timeSlot } = useBookingStore();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Use the authenticated phone from authStore
    const displayPhone = authPhone
        ? authPhone.replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5')
        : "";

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await api.confirmBooking({ phone: authPhone, serviceId: service?.id, date, timeSlot });
            router.push("/book/success");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h3 className="mb-1 text-[11px] font-semibold tracking-[0.18em] text-[var(--color-accent)] uppercase">Ваши данные</h3>
                <p className="text-sm text-[var(--color-muted)] font-light">Запись будет привязана к вашему номеру</p>
            </div>

            {/* Summary */}
            {service && (
                <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-[var(--color-muted)] font-light">Услуга</span>
                        <span className="text-sm font-medium text-[var(--color-text)]">{service.name}</span>
                    </div>
                    {date && (
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-[var(--color-muted)] font-light">Дата</span>
                            <span className="text-sm font-medium text-[var(--color-text)]">
                                {date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                            </span>
                        </div>
                    )}
                    {timeSlot && (
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-[var(--color-muted)] font-light">Время</span>
                            <span className="text-sm font-medium text-[var(--color-text)]">{timeSlot}</span>
                        </div>
                    )}
                    {service.price && (
                        <div className="flex justify-between items-center border-t border-[var(--color-border)] pt-2 mt-1">
                            <span className="text-sm text-[var(--color-muted)] font-light">Стоимость</span>
                            <span className="text-sm font-semibold text-[var(--color-accent)]">{service.price} ₽</span>
                        </div>
                    )}
                </div>
            )}

            {/* Phone (from auth, readonly) */}
            <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-4">
                <p className="text-[11px] text-[var(--color-muted)] uppercase tracking-wider mb-1 font-medium">Телефон</p>
                <p className="text-base font-medium text-[var(--color-text)]">{displayPhone || authPhone}</p>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative flex items-center mt-0.5">
                    <input
                        type="checkbox"
                        defaultChecked
                        className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-[var(--color-border)] bg-[var(--color-surface)] checked:bg-[var(--color-accent)] transition-all"
                    />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <span className="text-xs text-[var(--color-muted)] font-light leading-relaxed">
                    Соглашаюсь на обработку персональных данных и получение СМС-уведомлений
                </span>
            </label>

            <div className="pt-1 pb-4">
                <Button
                    disabled={loading}
                    onClick={handleSubmit}
                    className="w-full py-4"
                >
                    {loading ? "Подтверждаем..." : "Подтвердить запись"}
                </Button>
            </div>
        </div>
    );
}
