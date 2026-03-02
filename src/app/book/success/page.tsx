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
SUMMARY:Данила Мастер – ${service?.name}
DESCRIPTION:Ул. Чубюская, 52, кабинет 11-Б. Ждем вас!
LOCATION:Ул. Чубюская, 52, кабинет 11-Б
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'booking.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex min-h-[90vh] flex-col items-center justify-center animate-in zoom-in-95 duration-700 pb-safe px-8">
            <div className="mb-10 rounded-full bg-[var(--color-surface)] p-8 border border-[var(--color-border)]">
                <CheckCircle2 className="h-12 w-12 text-[var(--color-accent)]" />
            </div>

            <h2 className="mb-4 text-3xl font-medium text-[var(--color-text)] text-center tracking-tight">Запись оформлена</h2>
            <p className="mb-12 text-center text-[var(--color-muted)] font-light leading-relaxed max-w-[260px]">
                Детали предстоящей записи сохранены в вашем профиле.
            </p>

            <div className="w-full rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 mb-10">
                <div className="mb-6 space-y-1 pb-6 border-b border-[var(--color-border)]">
                    <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">Услуга</span>
                    <p className="text-lg font-medium text-[var(--color-text)] tracking-tight">{service?.name || "Услуга"}</p>
                </div>

                <div className="flex items-end justify-between">
                    <div className="space-y-1">
                        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">Дата и время</span>
                        <p className="text-lg font-medium text-[var(--color-text)] tracking-tight">
                            {date ? format(date, 'd MMMM', { locale: ru }) : ''}, {timeSlot}
                        </p>
                    </div>
                    <button
                        onClick={generateICS}
                        className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                        title="Добавить в календарь"
                    >
                        <CalendarPlus className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="w-full">
                <Button onClick={handleDone} className="w-full">
                    Перейти в профиль
                </Button>
            </div>
        </div>
    );
}
