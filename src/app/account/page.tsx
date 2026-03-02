"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Appointment } from "@/lib/types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { AppointmentCard } from "@/components/booking/AppointmentCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { LogOut, CalendarDays, Archive } from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";

export default function AccountPage() {
    const router = useRouter();
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const [step, setStep] = useState<"phone" | "code" | "auth">("phone");
    const [loading, setLoading] = useState(false);

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
        if (step === "auth") {
            loadAppointments();
        }
    }, [step, loadAppointments]);

    const handlePhoneSubmit = async () => {
        if (phone.length < 11) return;
        setLoading(true);
        await api.requestPhoneCode(phone);
        setLoading(false);
        setStep("code");
    };

    const handleCodeSubmit = () => {
        if (code.length !== 4) return;
        setLoadingAppts(true);
        setStep("auth");
    };

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

    // ─── Login screens ─────────────────────────────────────────────
    if (step !== "auth") {
        return (
            <div className="flex h-screen flex-col items-center justify-center px-8 pb-24 bg-[var(--color-bg)]">
                <img src="/images/logo2.png" alt="Данила Мастер" className="h-12 object-contain mb-8 opacity-80" />

                <h2 className="mb-2 text-2xl font-semibold text-[var(--color-text)] tracking-tight">Личный кабинет</h2>
                <p className="mb-8 text-center text-sm text-[var(--color-muted)] font-light max-w-[260px]">
                    Войдите, чтобы управлять своими записями
                </p>

                <div className="w-full bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)]">
                    {step === "phone" ? (
                        <div className="flex flex-col gap-4">
                            <Input
                                type="tel"
                                placeholder="+7 (999) 000-00-00"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <Button disabled={phone.length < 11 || loading} onClick={handlePhoneSubmit}>
                                {loading ? "Отправка..." : "Получить код"}
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <p className="text-sm text-[var(--color-muted)] text-center font-light">
                                Код отправлен на {phone}
                            </p>
                            <Input
                                type="tel"
                                maxLength={4}
                                placeholder="····"
                                className="text-center text-3xl tracking-[0.5em] font-bold"
                                value={code}
                                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                                autoFocus
                            />
                            <Button disabled={code.length !== 4} onClick={handleCodeSubmit}>
                                Войти
                            </Button>
                            <button
                                onClick={() => setStep("phone")}
                                className="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors text-center"
                            >
                                Изменить номер
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // ─── Auth screens ──────────────────────────────────────────────
    const upcoming = appointments.filter(a => a.status === 'upcoming');
    const history = appointments.filter(a => a.status === 'past' || a.status === 'cancelled');

    return (
        <div className="flex h-screen flex-col bg-[var(--color-bg)] overflow-hidden">
            {/* Header */}
            <div className="shrink-0 flex h-14 items-center justify-between px-5 bg-[var(--color-bg)]/90 backdrop-blur-xl border-b border-[var(--color-border)]">
                <img src="/images/logo2.png" alt="Данила Мастер" className="h-5 object-contain opacity-75" />
                <button
                    onClick={() => { setStep("phone"); setCode(""); setPhone(""); }}
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
