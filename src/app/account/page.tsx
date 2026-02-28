"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Appointment } from "@/lib/types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { AppointmentCard } from "@/components/booking/AppointmentCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { LogOut } from "lucide-react";

export default function AccountPage() {
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const [step, setStep] = useState<"phone" | "code" | "auth">("phone");
    const [loading, setLoading] = useState(false);

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loadingAppts, setLoadingAppts] = useState(true);

    useEffect(() => {
        if (step === "auth") {
            let active = true;
            api.getAppointments().then(res => {
                if (active) {
                    setAppointments(res);
                    setLoadingAppts(false);
                }
            });
            return () => { active = false; };
        }
    }, [step]);

    const handlePhoneSubmit = async () => {
        if (phone.length < 11) return;
        setLoading(true);
        await api.requestPhoneCode(phone);
        setLoading(false);
        setStep("code");
    };

    const handleCodeSubmit = () => {
        if (code.length !== 4) return;
        // Mock login success
        setLoadingAppts(true);
        setStep("auth");
    };

    if (step !== "auth") {
        return (
            <div className="flex min-h-[80vh] flex-col items-center justify-center p-6 pb-24">
                <h2 className="mb-2 text-2xl font-black text-white">Вход в кабинет</h2>
                <p className="mb-8 text-center text-sm text-[var(--color-muted)] max-w-[280px]">
                    Авторизуйтесь, чтобы управлять своими записями
                </p>

                <div className="w-full glass-panel p-6 rounded-3xl pb-8 shadow-xl">
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
                            <Input
                                type="tel"
                                maxLength={4}
                                placeholder="Код из СМС"
                                className="text-center text-2xl tracking-[0.5em] font-bold"
                                value={code}
                                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                                autoFocus
                            />
                            <Button disabled={code.length !== 4} onClick={handleCodeSubmit}>
                                Войти
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    const upcoming = appointments.filter(a => a.status === 'upcoming');
    const past = appointments.filter(a => a.status === 'past');

    return (
        <div className="flex flex-col pb-safe pb-24 relative min-h-screen">
            <div className="sticky top-0 z-50 flex h-16 items-center justify-between px-6 pt-2 pb-2 bg-[var(--color-bg)]/80 backdrop-blur-xl border-b border-[var(--color-border)]">
                <h1 className="text-lg font-bold tracking-wide text-[var(--color-text)]">Кабинет</h1>
                <button
                    onClick={() => setStep("phone")}
                    className="flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-white transition-colors"
                >
                    <LogOut className="h-4 w-4" /> Выйти
                </button>
            </div>

            <div className="px-6 py-6 flex flex-col gap-8">
                <div>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] mb-4">Предстоящие записи</h2>
                    {loadingAppts ? (
                        <div className="flex flex-col gap-4">
                            <Skeleton className="h-[140px] w-full" />
                        </div>
                    ) : upcoming.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {upcoming.map(a => <AppointmentCard key={a.id} appointment={a} />)}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 px-4 rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]/50">
                            <p className="text-sm text-[var(--color-muted)] text-center">У вас нет активных записей</p>
                        </div>
                    )}
                </div>

                {past.length > 0 && (
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--color-muted)] mb-4">История</h2>
                        <div className="flex flex-col gap-4 opacity-70">
                            {past.map(a => <AppointmentCard key={a.id} appointment={a} />)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
