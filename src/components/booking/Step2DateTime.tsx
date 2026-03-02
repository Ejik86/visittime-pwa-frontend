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
import { hapticSelection } from "@/lib/haptic";

export function Step2DateTime({ onNext }: { onNext: () => void }) {
    const { date: selectedDate, setDate, timeSlot, setTimeSlot } = useBookingStore();
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [loading, setLoading] = useState(true);

    const days = Array.from({ length: 14 }).map((_, i) => addDays(new Date(), i));
    const activeDate = selectedDate || days[0];

    useEffect(() => {
        if (!selectedDate) setDate(days[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        let active = true;
        setLoading(true);
        api.getTimeSlots(format(activeDate, 'yyyy-MM-dd')).then(res => {
            if (active) {
                setSlots(res);
                setLoading(false);
            }
        });
        return () => { active = false; };
    }, [activeDate]);

    return (
        <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Date picker */}
            <div>
                <h3 className="mb-3 text-[11px] font-semibold tracking-[0.18em] text-[var(--color-accent)] uppercase">Дата</h3>
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4">
                    {days.map((day) => {
                        const isSelected = selectedDate && isSameDay(day, selectedDate);
                        return (
                            <button
                                key={day.toISOString()}
                                onClick={() => {
                                    hapticSelection();
                                    setDate(day);
                                    setTimeSlot("");
                                    setLoading(true);
                                }}
                                className={cn(
                                    "flex h-[68px] w-[52px] shrink-0 flex-col items-center justify-center rounded-xl border transition-all duration-200 smooth-press",
                                    isSelected
                                        ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                                        : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)]"
                                )}
                            >
                                <span className={cn("text-[9px] uppercase tracking-wider font-medium mb-0.5", isSelected ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]")}>
                                    {format(day, 'EEE', { locale: ru })}
                                </span>
                                <span className="text-xl font-semibold leading-none">
                                    {format(day, 'd')}
                                </span>
                                <span className={cn("text-[9px] mt-0.5", isSelected ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]")}>
                                    {format(day, 'MMM', { locale: ru })}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Time picker */}
            <div>
                <h3 className="mb-3 text-[11px] font-semibold tracking-[0.18em] text-[var(--color-accent)] uppercase">Время</h3>
                {loading ? (
                    <div className="grid grid-cols-4 gap-2">
                        {[...Array(12)].map((_, i) => (
                            <Skeleton key={i} className="h-11 w-full rounded-xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-4 gap-2">
                        {slots.map((slot) => {
                            const isSelected = timeSlot === slot.time;
                            return (
                                <button
                                    key={slot.time}
                                    disabled={!slot.available}
                                    onClick={() => { hapticSelection(); setTimeSlot(slot.time); }}
                                    className={cn(
                                        "flex h-11 items-center justify-center rounded-xl border text-sm font-medium transition-all duration-200 smooth-press",
                                        isSelected
                                            ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                                            : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]",
                                        !slot.available && "opacity-20 cursor-not-allowed border-transparent"
                                    )}
                                >
                                    {slot.time}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Continue button — always visible */}
            <div className="pt-2 pb-4">
                <Button
                    disabled={!selectedDate || !timeSlot}
                    onClick={onNext}
                    className="w-full py-4"
                >
                    Продолжить
                </Button>
            </div>
        </div>
    );
}
