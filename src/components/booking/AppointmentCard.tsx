"use client";

import { Appointment } from "@/lib/types";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { Button } from "../ui/Button";

interface AppointmentCardProps {
    appointment: Appointment;
    onCancel?: (id: string) => void;
    onReschedule?: (id: string) => void;
}

export function AppointmentCard({ appointment, onCancel, onReschedule }: AppointmentCardProps) {
    const isPast = appointment.status === 'past';
    const dateObj = parseISO(appointment.date);

    return (
        <div className="flex flex-col gap-5 rounded-2xl border border-[var(--color-border)] glass-panel p-5 shadow-lg shadow-black/20">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="font-bold text-[var(--color-text)] text-lg tracking-wide mb-1">{appointment.serviceName}</h3>
                    <p className="text-sm font-medium text-[var(--color-muted)]">
                        <span className="text-[var(--color-text)]">{format(dateObj, 'd MMMM, EE', { locale: ru })}</span> • {appointment.time}
                    </p>
                </div>
                <div className={`flex h-7 items-center rounded-md px-2.5 text-[10px] font-bold uppercase tracking-wider ${isPast
                        ? "bg-[var(--color-surface-2)] text-[var(--color-muted)] border border-[var(--color-border)]"
                        : "bg-[var(--color-accent)]/15 text-[var(--color-accent)] border border-[var(--color-accent)]/30 shadow-[0_0_10px_rgba(111,143,134,0.1)]"
                    }`}>
                    {isPast ? "Завершено" : "Активно"}
                </div>
            </div>

            {!isPast && (
                <div className="mt-2 flex gap-3">
                    <Button variant="secondary" size="sm" className="flex-1 py-5" onClick={() => onCancel?.(appointment.id)}>Отменить</Button>
                    <Button variant="primary" size="sm" className="flex-1 py-5" onClick={() => onReschedule?.(appointment.id)}>Перенести</Button>
                </div>
            )}
        </div>
    );
}
