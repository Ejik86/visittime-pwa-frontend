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
        <div className="flex min-h-screen flex-col bg-[var(--color-bg)] pb-20">
            {/* Brand Elegant Header */}
            <div className="sticky top-0 z-50 flex h-16 items-center px-4 pt-2 pb-2 bg-[var(--color-bg)]/80 backdrop-blur-xl">
                {step > 1 ? (
                    <button
                        onClick={handleBack}
                        className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface)] hover:text-white smooth-press"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                ) : <div className="w-10" />}
                <h1 className="flex-1 text-center text-sm font-bold tracking-[0.2em] uppercase text-[var(--color-text)]">
                    {step === 1 && "Услуга"}
                    {step === 2 && "Дата и Время"}
                    {step === 3 && "Контакты"}
                </h1>
                <div className="w-10" />
            </div>

            {/* Thin Progress Bar */}
            <div className="h-[2px] w-full bg-[var(--color-surface)] relative mt-2">
                <div
                    className="absolute left-0 top-0 h-full bg-[var(--color-accent)] shadow-[0_0_10px_rgba(111,143,134,0.8)] transition-all duration-500 ease-out"
                    style={{ width: `${(step / 3) * 100}%` }}
                />
            </div>

            {/* Content */}
            <div className="flex-1 px-6 pt-8">
                {step === 1 && <Step1Service services={services} onNext={handleNext} />}
                {step === 2 && <Step2DateTime onNext={handleNext} />}
                {step === 3 && <Step3Phone />}
            </div>
        </div>
    );
}
