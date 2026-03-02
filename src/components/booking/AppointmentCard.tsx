"use client";

import { Appointment } from "@/lib/types";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { useState } from "react";
import { Calendar, Clock, AlertTriangle } from "lucide-react";
import { hapticError, hapticMedium, hapticLight } from "@/lib/haptic";

interface AppointmentCardProps {
    appointment: Appointment;
    onCancel?: (id: string) => void;
    onReschedule?: (id: string) => void;
}

export function AppointmentCard({ appointment, onCancel, onReschedule }: AppointmentCardProps) {
    const isPast = appointment.status === 'past';
    const isCancelled = appointment.status === 'cancelled';
    const isActive = appointment.status === 'upcoming';
    const dateObj = parseISO(appointment.date);
    const [confirming, setConfirming] = useState(false);
    const [cancelling, setCancelling] = useState(false);

    const handleCancelClick = () => { hapticLight(); setConfirming(true); };
    const handleCancelConfirm = async () => {
        hapticError();
        setCancelling(true);
        await onCancel?.(appointment.id);
        setCancelling(false);
        setConfirming(false);
    };

    return (
        <div className={`rounded-xl border overflow-hidden transition-opacity ${isCancelled ? 'opacity-50' : ''} ${isActive ? 'border-[var(--color-accent)]/30 bg-[var(--color-surface)]' : 'border-[var(--color-border)] bg-[var(--color-surface)]'}`}>
            <div className="p-4">
                {/* Status badge */}
                <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium text-[var(--color-text)] text-base tracking-tight leading-tight">
                        {appointment.serviceName}
                    </h3>
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm ml-3 shrink-0 ${isActive ? 'bg-[var(--color-accent)]/15 text-[var(--color-accent)] border border-[var(--color-accent)]/30' :
                        isCancelled ? 'bg-[var(--color-surface-2)] text-[var(--color-muted)] border border-[var(--color-border)]' :
                            'bg-[var(--color-surface-2)] text-[var(--color-muted)] border border-[var(--color-border)]'
                        }`}>
                        {isActive ? 'Активно' : isCancelled ? 'Отменено' : 'Завершено'}
                    </span>
                </div>

                {/* Date + time */}
                <div className="flex items-center gap-4 text-sm text-[var(--color-muted)]">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                        <span className="capitalize">{format(dateObj, 'd MMMM', { locale: ru })}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                        <span>{appointment.time}</span>
                    </div>
                    {appointment.price && (
                        <span className="ml-auto font-medium text-[var(--color-text)]">{appointment.price} ₽</span>
                    )}
                </div>
            </div>

            {/* Action buttons for active */}
            {isActive && !confirming && (
                <div className="flex border-t border-[var(--color-border)]">
                    <button
                        onClick={handleCancelClick}
                        className="flex-1 py-3 text-sm text-[var(--color-muted)] hover:text-red-400 hover:bg-red-400/5 transition-colors"
                    >
                        Отменить
                    </button>
                    <div className="w-px bg-[var(--color-border)]" />
                    <button
                        onClick={() => { hapticMedium(); onReschedule?.(appointment.id); }}
                        className="flex-1 py-3 text-sm text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-colors font-medium"
                    >
                        Перенести
                    </button>
                </div>
            )}

            {/* Cancel confirmation */}
            {confirming && (
                <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)] p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
                        <p className="text-sm text-[var(--color-text)]">Отменить эту запись?</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setConfirming(false)}
                            disabled={cancelling}
                            className="flex-1 py-2.5 text-sm rounded-lg border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                        >
                            Назад
                        </button>
                        <button
                            onClick={handleCancelConfirm}
                            disabled={cancelling}
                            className="flex-1 py-2.5 text-sm rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                            {cancelling ? 'Отмена...' : 'Да, отменить'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
