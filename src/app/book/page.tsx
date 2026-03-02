"use client";

import { useState, useEffect } from "react";
import { Service } from "@/lib/types";
import { api } from "@/lib/api";
import { ChevronLeft } from "lucide-react";
import { Step1Service } from "@/components/booking/Step1Service";
import { Step2DateTime } from "@/components/booking/Step2DateTime";
import { Step3Phone } from "@/components/booking/Step3Phone";

export default function BookPage() {
    const [step, setStep] = useState(1);
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        let active = true;
        api.getServices().then(res => {
            if (active) setServices(res);
        });
        return () => { active = false; };
    }, []);

    const handleNext = () => setStep((s) => Math.min(s + 1, 3));
    const handleBack = () => setStep((s) => Math.max(s - 1, 1));

    return (
        <div className="flex h-screen flex-col bg-[var(--color-bg)] overflow-hidden">
            {/* Header */}
            <div className="shrink-0 flex h-14 items-center px-4 bg-[var(--color-bg)]/90 backdrop-blur-xl border-b border-[var(--color-border)]">
                {step > 1 ? (
                    <button
                        onClick={handleBack}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface)] hover:text-white smooth-press"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                ) : <div className="w-9" />}
                <div className="flex-1 flex flex-col items-center justify-center">
                    <img src="/images/logo2.png" alt="Данила Мастер" className="h-5 object-contain opacity-75 mb-0.5" />
                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--color-muted)]">
                        {step === 1 && "Услуга"}
                        {step === 2 && "Дата и Время"}
                        {step === 3 && "Контакты"}
                    </span>
                </div>
                <div className="w-9" />
            </div>

            {/* Progress bar */}
            <div className="shrink-0 h-[2px] w-full bg-[var(--color-surface)]">
                <div
                    className="h-full bg-[var(--color-accent)] transition-all duration-500 ease-out"
                    style={{ width: `${(step / 3) * 100}%` }}
                />
            </div>

            {/* Scrollable content area — stops above bottom nav */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-5 pb-24">
                {step === 1 && <Step1Service services={services} onNext={handleNext} />}
                {step === 2 && <Step2DateTime onNext={handleNext} />}
                {step === 3 && <Step3Phone />}
            </div>
        </div>
    );
}
