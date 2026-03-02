"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Appointment } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { AppointmentCard } from "@/components/booking/AppointmentCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { LogOut, CalendarDays, Archive } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useBookingStore } from "@/store/bookingStore";

export default function AccountPage() {
    const router = useRouter();
    const { logout, phone } = useAuthStore();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loadingAppts, setLoadingAppts] = useState(true);
    const [activeTab, setActiveTab] = useState<"upcoming" | "history">("upcoming");

    const loadAppointments = useCallback(async () => {
        setLoadingAppts(true);
        const res = await api.getAppointments();
        setAppointments(res);
        setLoadingAppts(false);
    }, []);

    useEffect(() => {
        loadAppointments();
    }, [loadAppointments]);

    const handleCancel = async (id: string) => {
        await api.cancelAppointment(id);
        await loadAppointments();
    };

    const handleReschedule = (id: string) => {
        const appt = appointments.find(a => a.id === id);
        if (appt) {
            const service = { id: appt.serviceId, name: appt.serviceName, description: '', price: 0, priceRegular: 0, durationMinutes: 60 };
            useBookingStore.getState().setService(service);
        }
        router.push("/book");
    };

    // ─── Auth screens ──────────────────────────────────────────────
    const upcoming = appointments.filter(a => a.status === 'upcoming');
    const history = appointments.filter(a => a.status === 'past' || a.status === 'cancelled');

    return (
        <div className="flex h-screen flex-col bg-[var(--color-bg)] overflow-hidden">
            {/* Header */}
            <div className="shrink-0 flex h-14 items-center justify-between px-5 bg-[var(--color-bg)]/90 backdrop-blur-xl border-b border-[var(--color-border)]">
                <img src="/images/logo2.png" alt="Данила Мастер" className="h-5 object-contain opacity-75" />
                <button
                    onClick={() => logout()}
                    className="flex items-center gap-1.5 text-xs text-[var(--color-muted)] hover:text-white transition-colors"
                >
                    <LogOut className="h-3.5 w-3.5" />
                    Выйти
                </button>
            </div>

            {/* Tabs */}
            <div className="shrink-0 flex border-b border-[var(--color-border)] px-5">
                <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`flex items-center gap-2 py-3 pr-5 text-sm transition-colors border-b-2 ${activeTab === "upcoming" ? "border-[var(--color-accent)] text-[var(--color-text)]" : "border-transparent text-[var(--color-muted)]"}`}
                >
                    <CalendarDays className="h-4 w-4" />
                    Записи
                    {upcoming.length > 0 && (
                        <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-accent)] text-[9px] font-bold text-white">
                            {upcoming.length}
                        </span>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab("history")}
                    className={`flex items-center gap-2 py-3 px-5 text-sm transition-colors border-b-2 ${activeTab === "history" ? "border-[var(--color-accent)] text-[var(--color-text)]" : "border-transparent text-[var(--color-muted)]"}`}
                >
                    <Archive className="h-4 w-4" />
                    История
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 pb-24">
                {loadingAppts ? (
                    <div className="flex flex-col gap-3">
                        <Skeleton className="h-20 w-full rounded-xl" />
                        <Skeleton className="h-20 w-full rounded-xl" />
                    </div>
                ) : activeTab === "upcoming" ? (
                    upcoming.length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {upcoming.map(a => (
                                <AppointmentCard
                                    key={a.id}
                                    appointment={a}
                                    onCancel={handleCancel}
                                    onReschedule={handleReschedule}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 gap-4">
                            <div className="p-5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)]">
                                <CalendarDays className="h-7 w-7 text-[var(--color-muted)]" />
                            </div>
                            <p className="text-sm text-[var(--color-muted)] text-center font-light">Нет активных записей</p>
                            <Button onClick={() => router.push("/book")} className="mt-2">
                                Записаться
                            </Button>
                        </div>
                    )
                ) : (
                    history.length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {history.map(a => (
                                <AppointmentCard key={a.id} appointment={a} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="p-5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] mb-4">
                                <Archive className="h-7 w-7 text-[var(--color-muted)]" />
                            </div>
                            <p className="text-sm text-[var(--color-muted)] font-light">История пуста</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
