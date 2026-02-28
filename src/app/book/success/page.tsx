"use client";

import { CheckCircle2, CalendarPlus } from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function SuccessPage() {
    const { service, date, timeSlot } = useBookingStore();
    const router = useRouter();

    const handleDone = () => {
        useBookingStore.getState().reset();
        router.push("/account");
    };

    const generateICS = () => {
        if (!date || !timeSlot) return;

        // Simple ICS generation in browser
        const start = new Date(date);
        const [hours, minutes] = timeSlot.split(":");
        start.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);

        const end = new Date(start);
        end.setMinutes(start.getMinutes() + (service?.durationMinutes || 60));

        const formatDate = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, '');

        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${formatDate(start)}
DTEND:${formatDate(end)}
SUMMARY:Запись в Данила Мастер - ${service?.name}
DESCRIPTION:Ваша премиальная услуга в барбершопе
LOCATION:Данила Мастер
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'danila_master_booking.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex min-h-[90vh] flex-col items-center justify-center animate-in zoom-in-95 duration-700 pb-safe px-6">
            <div className="mb-8 rounded-full bg-[var(--color-surface)] p-6 border border-[var(--color-border)] relative">
                <div className="absolute inset-0 rounded-full bg-[var(--color-accent)]/10 blur-xl" />
                <CheckCircle2 className="h-16 w-16 text-[var(--color-accent)] relative z-10" />
            </div>

            <h2 className="mb-3 text-3xl font-black text-white text-center leading-tight tracking-tight">Ждем вас</h2>
            <p className="mb-10 text-center text-[var(--color-muted)] max-w-[280px]">
                Детали предстоящей записи сохранены в личном кабинете.
            </p>

            <div className="w-full rounded-2xl glass-panel p-6 shadow-xl shadow-black mb-8 relative overflow-hidden">
                <div className="absolute left-0 top-0 w-1 h-full bg-[var(--color-accent)]" />
                <div className="mb-5 flex flex-col gap-1 border-b border-[var(--color-border)] pb-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Услуга</span>
                    <span className="font-semibold text-white tracking-wide">{service?.name || "Неизвестная услуга"}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Дата и Время</span>
                        <span className="font-semibold text-white tracking-wide capitalize">
                            {date ? format(date, 'd MMMM, EE', { locale: ru }) : ''} <span className="text-[var(--color-muted)] mx-2">•</span> {timeSlot}
                        </span>
                    </div>
                    <button
                        onClick={generateICS}
                        className="h-12 w-12 flex items-center justify-center rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/50 transition-colors"
                        title="Добавить в календарь"
                    >
                        <CalendarPlus className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="w-full flex flex-col gap-3">
                <Button onClick={handleDone} size="lg" className="w-full">
                    Перейти в Кабинет
                </Button>
            </div>
        </div>
    );
}
