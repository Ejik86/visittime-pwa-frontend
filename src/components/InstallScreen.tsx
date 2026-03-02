"use client";

import { useState } from "react";
import { Share, Plus, Smartphone, CheckCircle2 } from "lucide-react";

const steps = [
    {
        icon: Share,
        title: "Нажмите «Поделиться»",
        description: "Иконка в нижней панели браузера Safari",
        platform: "ios" as const,
    },
    {
        icon: Plus,
        title: "Выберите «На экран «Домой»»",
        description: "Прокрутите меню вниз и нажмите эту опцию",
        platform: "ios" as const,
    },
    {
        icon: Smartphone,
        title: "Нажмите «Добавить»",
        description: "Приложение появится на рабочем столе",
        platform: "ios" as const,
    },
];

const androidSteps = [
    {
        icon: Smartphone,
        title: "Нажмите «⋮» в браузере Chrome",
        description: "Кнопка меню в правом верхнем углу",
    },
    {
        icon: Plus,
        title: "«Добавить на главный экран»",
        description: "Прокрутите вниз и выберите этот пункт",
    },
    {
        icon: CheckCircle2,
        title: "Нажмите «Установить»",
        description: "Приложение появится на рабочем столе",
    },
];

export function InstallScreen() {
    const [tab, setTab] = useState<"ios" | "android">("ios");

    const currentSteps = tab === "ios" ? steps : androidSteps;

    return (
        <div className="flex h-screen flex-col bg-[var(--color-bg)] overflow-hidden">
            {/* Header */}
            <div className="flex flex-col items-center pt-16 pb-8 px-8 shrink-0">
                <img
                    src="/images/logo1.png"
                    alt="Данила Мастер"
                    className="w-24 h-24 object-contain mb-6 opacity-90"
                />
                <h1 className="text-2xl font-semibold text-[var(--color-text)] tracking-tight text-center mb-2">
                    Данила Мастер
                </h1>
                <p className="text-sm text-[var(--color-muted)] font-light text-center leading-relaxed max-w-[260px]">
                    Установите приложение на экран «Домой», чтобы получить доступ
                </p>
            </div>

            {/* Platform tabs */}
            <div className="flex mx-8 mb-6 bg-[var(--color-surface)] rounded-xl p-1 shrink-0">
                <button
                    onClick={() => setTab("ios")}
                    className={`flex-1 py-2 text-sm rounded-lg font-medium transition-all ${tab === "ios"
                            ? "bg-[var(--color-bg)] text-[var(--color-text)] shadow-sm"
                            : "text-[var(--color-muted)]"
                        }`}
                >
                    iPhone (Safari)
                </button>
                <button
                    onClick={() => setTab("android")}
                    className={`flex-1 py-2 text-sm rounded-lg font-medium transition-all ${tab === "android"
                            ? "bg-[var(--color-bg)] text-[var(--color-text)] shadow-sm"
                            : "text-[var(--color-muted)]"
                        }`}
                >
                    Android (Chrome)
                </button>
            </div>

            {/* Steps */}
            <div className="flex-1 px-8 overflow-y-auto no-scrollbar">
                <div className="flex flex-col gap-4">
                    {currentSteps.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <div
                                key={i}
                                className="flex items-center gap-4 bg-[var(--color-surface)] rounded-xl p-4 border border-[var(--color-border)]"
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/30">
                                    <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-[10px] font-medium text-[var(--color-accent)] uppercase tracking-wider">{i + 1}</span>
                                        <h3 className="text-sm font-medium text-[var(--color-text)]">{step.title}</h3>
                                    </div>
                                    <p className="text-[13px] text-[var(--color-muted)] font-light">{step.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-6 mb-10 p-4 rounded-xl border border-dashed border-[var(--color-border)] text-center">
                    <p className="text-xs text-[var(--color-muted)] font-light leading-relaxed">
                        После установки откройте приложение с рабочего стола — вы попадёте на экран входа
                    </p>
                </div>
            </div>
        </div>
    );
}
