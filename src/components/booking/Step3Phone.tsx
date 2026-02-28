"use client";

import { useState } from "react";
import { useBookingStore } from "@/store/bookingStore";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";

export function Step3Phone() {
    const { phone, setPhone, service, date, timeSlot } = useBookingStore();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Custom simple mask for +7 (XXX) XXX-XX-XX
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, '');
        let formatted = '+7';
        if (val.length > 1) formatted += ` (${val.substring(1, 4)}`;
        if (val.length >= 5) formatted += `) ${val.substring(4, 7)}`;
        if (val.length >= 8) formatted += `-${val.substring(7, 9)}`;
        if (val.length >= 10) formatted += `-${val.substring(9, 11)}`;
        setPhone(formatted);
    };

    const isValid = phone.replace(/\D/g, '').length === 11;

    const handleSubmit = async () => {
        if (!isValid) return;
        setLoading(true);
        try {
            await api.confirmBooking({ phone, serviceId: service?.id, date, timeSlot });
            router.push("/book/success");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-500 pb-safe pb-40">
            <div className="mb-12">
                <h3 className="mb-4 text-sm font-bold tracking-wide text-[var(--color-accent)]">КОНТАКТЫ</h3>
                <p className="mb-8 text-sm text-[var(--color-muted)] leading-relaxed">
                    Укажите номер телефона для подтверждения записи по СМС и получения напоминаний.
                </p>

                <div className="relative">
                    <input
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="+7 (___) ___-__-__"
                        className="flex h-16 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 text-2xl font-bold tracking-widest text-[var(--color-text)] transition-all duration-300 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] focus:outline-none"
                        type="tel"
                        autoFocus
                    />
                </div>

                <label className="flex items-start gap-4 mt-8 cursor-pointer group">
                    <input type="checkbox" defaultChecked className="mt-1 w-5 h-5 rounded border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]" />
                    <span className="text-xs text-[var(--color-muted)] group-hover:text-gray-300 transition-colors">
                        Соглашаюсь на обработку персональных данных и получение сервисных СМС или сообщений в мессенджерах.
                    </span>
                </label>
            </div>

            <div className="fixed bottom-0 left-0 w-full px-6 z-40 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)] to-transparent pt-12 pb-8 pointer-events-none">
                <div className="mx-auto max-w-md pointer-events-auto">
                    <Button
                        disabled={!isValid || loading}
                        onClick={handleSubmit}
                        className="w-full h-16 text-lg"
                    >
                        {loading ? "Подтверждаем..." : "Подтвердить запись"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
