"use client";

import { useEffect, useState } from "react";
import { format, addDays, isSameDay } from "date-fns";
import { ru } from "date-fns/locale";
import { api } from "@/lib/api";
import { TimeSlot } from "@/lib/types";
import { useBookingStore } from "@/store/bookingStore";
import { Skeleton } from "../ui/Skeleton";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";

export function Step2DateTime({ onNext }: { onNext: () => void }) {
    const { date: selectedDate, setDate, timeSlot, setTimeSlot } = useBookingStore();
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [loading, setLoading] = useState(true);

    // Generate 7 days starting from today
    const days = Array.from({ length: 7 }).map((_, i) => addDays(new Date(), i));
    const activeDate = selectedDate || days[0];

    useEffect(() => {
        if (!selectedDate) setDate(days[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        let active = true;
        api.getTimeSlots(format(activeDate, 'yyyy-MM-dd')).then(res => {
            if (active) {
                setSlots(res);
                setLoading(false);
            }
        });
        return () => { active = false; };
    }, [activeDate]);

    return (
        <div className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-500 pb-safe pb-40">
            <div className="mb-10">
                <h3 className="mb-4 text-sm font-bold tracking-wide text-[var(--color-accent)]">ДАТА</h3>
                <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6 relative">
                    {days.map((day) => {
                        const isSelected = selectedDate && isSameDay(day, selectedDate);
                        return (
                            <button
                                key={day.toISOString()}
                                onClick={() => {
                                    setDate(day);
                                    setTimeSlot("");
                                    setLoading(true);
                                }}
                                className={cn(
                                    "flex h-[80px] w-[64px] shrink-0 flex-col items-center justify-center rounded-2xl border transition-all duration-300 smooth-press",
                                    isSelected
                                        ? "border-[var(--color-accent)] bg-[var(--color-surface)] text-[var(--color-accent)] ring-1 ring-[var(--color-accent)]/50 shadow-[0_0_15px_rgba(111,143,134,0.15)]"
                                        : "border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
                                )}
                            >
                                <span className={cn("text-[10px] uppercase tracking-wider mb-2", isSelected ? "text-[var(--color-accent)] font-bold" : "text-[var(--color-muted)] font-medium")}>
                                    {format(day, 'E', { locale: ru })}
                                </span>
                                <span className={cn("text-2xl font-black leading-none", isSelected && "drop-shadow-[0_0_8px_rgba(111,143,134,0.3)]")}>
                                    {format(day, 'd')}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mb-12">
                <h3 className="mb-4 text-sm font-bold tracking-wide text-[var(--color-accent)]">ВРЕМЯ</h3>
                {loading ? (
                    <div className="grid grid-cols-4 gap-3">
                        {[...Array(8)].map((_, i) => (
                            <Skeleton key={i} className="h-14 w-full rounded-xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-4 gap-3">
                        {slots.map((slot) => {
                            const isSelected = timeSlot === slot.time;
                            return (
                                <button
                                    key={slot.time}
                                    disabled={!slot.available}
                                    onClick={() => setTimeSlot(slot.time)}
                                    className={cn(
                                        "flex h-14 items-center justify-center rounded-xl border text-sm font-bold transition-all duration-300 smooth-press",
                                        isSelected
                                            ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[#0B0F12] shadow-[0_0_15px_rgba(111,143,134,0.3)] scale-[1.02]"
                                            : "border-[var(--color-border)] bg-[var(--color-surface-2)] hover:bg-[var(--color-surface)] text-[var(--color-text)]",
                                        !slot.available && "opacity-20 border-transparent bg-[var(--color-surface)] text-[var(--color-muted)] hover:bg-[var(--color-surface)] cursor-not-allowed scale-100"
                                    )}
                                >
                                    {slot.time}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="fixed bottom-0 left-0 w-full px-6 z-40 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)] to-transparent pt-12 pb-8 pointer-events-none">
                <div className="mx-auto max-w-md pointer-events-auto">
                    <Button
                        disabled={!selectedDate || !timeSlot}
                        onClick={onNext}
                        className="w-full h-16"
                        size="lg"
                    >
                        Продолжить
                    </Button>
                </div>
            </div>
        </div>
    );
}
