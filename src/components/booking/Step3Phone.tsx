"use client";

import { useState } from "react";
import { useBookingStore } from "@/store/bookingStore";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

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
                <h3 className="mb-4 text-[12px] font-medium tracking-[0.2em] text-[var(--color-accent)] uppercase">КОНТАКТЫ</h3>
                <p className="mb-10 text-[15px] text-[var(--color-muted)] font-light leading-relaxed">
                    Для подтверждения записи мы отправим вам СМС-код. Постоянным клиентам — специальные условия.
                </p>

                <div className="space-y-6">
                    <Input
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="+7 (___) ___-__-__"
                        className="h-16 text-2xl font-medium tracking-tight"
                        type="tel"
                        autoFocus
                    />

                    <label className="flex items-start gap-4 mt-8 cursor-pointer group">
                        <div className="relative flex items-center">
                            <input
                                type="checkbox"
                                defaultChecked
                                className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-[var(--color-border)] bg-[var(--color-surface)] checked:bg-[var(--color-accent)] transition-all"
                            />
                            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <span className="text-[13px] text-[var(--color-muted)] transition-colors font-light leading-tight">
                            Соглашаюсь на обработку персональных данных и получение сервисных СМС.
                        </span>
                    </label>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full px-6 z-40 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/90 to-transparent pt-16 pb-12 pointer-events-none">
                <div className="mx-auto max-w-md pointer-events-auto">
                    <Button
                        disabled={!isValid || loading}
                        onClick={handleSubmit}
                        className="w-full"
                    >
                        {loading ? "Подтверждаем..." : "Записаться"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
