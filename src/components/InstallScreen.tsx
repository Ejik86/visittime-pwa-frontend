"use client";

import { useEffect, useState } from "react";

type Platform = "ios" | "android" | "other";

function detectPlatform(): Platform {
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
    if (/Android/i.test(ua)) return "android";
    return "other";
}

// iOS share icon (native look)
function ShareIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 1v10M6 5l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 11v6a1 1 0 001 1h12a1 1 0 001-1v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

// Three dots menu icon (Android)
function MenuDotsIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
            <circle cx="9" cy="3" r="1.5" /><circle cx="9" cy="9" r="1.5" /><circle cx="9" cy="15" r="1.5" />
        </svg>
    );
}

function PlusBoxIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
            <path d="M10 6v8M6 10h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

function HomeIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <rect x="7.5" y="11" width="5" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
    );
}

const steps = {
    ios: [
        {
            icon: ShareIcon,
            label: "Нажмите",
            action: "«Поделиться»",
            hint: "Кнопка внизу браузера Safari",
        },
        {
            icon: PlusBoxIcon,
            label: "Выберите",
            action: "\u00abНа экран \u2018Домой\u2019\u00bb",
            hint: "Прокрутите список действий вниз",
        },
        {
            icon: HomeIcon,
            label: "Нажмите",
            action: "«Добавить»",
            hint: "Приложение появится на рабочем столе",
        },
    ],
    android: [
        {
            icon: MenuDotsIcon,
            label: "Нажмите",
            action: "«⋮» в Chrome",
            hint: "Меню в правом верхнем углу браузера",
        },
        {
            icon: PlusBoxIcon,
            label: "Выберите",
            action: "«Добавить на главный экран»",
            hint: "Пролистайте меню вниз, найдите пункт",
        },
        {
            icon: HomeIcon,
            label: "Нажмите",
            action: "«Установить»",
            hint: "Иконка появится на рабочем столе",
        },
    ],
    other: [
        {
            icon: ShareIcon,
            label: "Откройте",
            action: "меню браузера",
            hint: "Safari (iPhone) или Chrome (Android)",
        },
        {
            icon: PlusBoxIcon,
            label: "Найдите",
            action: "«Добавить на главный экран»",
            hint: "Обычно в списке действий или меню",
        },
        {
            icon: HomeIcon,
            label: "Нажмите",
            action: "«Установить» или «Добавить»",
            hint: "Иконка приложения появится на рабочем столе",
        },
    ],
};

export function InstallScreen() {
    const [platform, setPlatform] = useState<Platform>("ios");

    useEffect(() => {
        setPlatform(detectPlatform());
    }, []);

    const currentSteps = steps[platform];

    const platformLabel = platform === "ios"
        ? "Safari · iPhone"
        : platform === "android"
            ? "Chrome · Android"
            : "Ваш браузер";

    return (
        <div className="fixed inset-0 flex flex-col bg-[var(--color-bg)] overflow-hidden select-none">

            {/* Top section — logo + title */}
            <div className="flex flex-col items-center justify-center pt-12 pb-6 px-8 shrink-0">
                <div className="relative mb-5">
                    <img
                        src="/images/logo1.png"
                        alt="Данила Мастер"
                        className="w-20 h-20 object-contain"
                        draggable={false}
                    />
                </div>
                <h1 className="text-2xl font-semibold text-[var(--color-text)] tracking-tight text-center mb-1">
                    Данила Мастер
                </h1>
                <p className="text-[13px] text-[var(--color-muted)] font-light text-center">
                    Добавьте приложение на главный экран
                </p>
            </div>

            {/* Platform badge */}
            <div className="flex justify-center mb-5 shrink-0">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                    <span className="text-[11px] font-medium text-[var(--color-muted)] tracking-wide">{platformLabel}</span>
                </div>
            </div>

            {/* Steps — main content */}
            <div className="flex-1 flex flex-col justify-center px-6 gap-3">
                {currentSteps.map((step, i) => {
                    const Icon = step.icon;
                    return (
                        <div
                            key={i}
                            className="flex items-center gap-4 bg-[var(--color-surface)] rounded-2xl p-4 border border-[var(--color-border)]"
                        >
                            {/* Step number */}
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/20">
                                <span className="text-sm font-bold text-[var(--color-accent)]">{i + 1}</span>
                            </div>

                            {/* Text */}
                            <div className="flex-1 min-w-0">
                                <p className="text-[15px] font-medium text-[var(--color-text)] leading-snug">
                                    {step.label}{" "}
                                    <span className="text-[var(--color-accent)]">{step.action}</span>
                                </p>
                                <p className="text-[12px] text-[var(--color-muted)] font-light mt-0.5 leading-relaxed">
                                    {step.hint}
                                </p>
                            </div>

                            {/* Icon */}
                            <div className="shrink-0 text-[var(--color-muted)]">
                                <Icon />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bottom note */}
            <div className="shrink-0 px-8 pb-10 pt-4">
                <div className="flex items-center gap-2 justify-center">
                    <div className="flex-1 h-px bg-[var(--color-border)]" />
                    <p className="text-[11px] text-[var(--color-muted)] font-light text-center px-3">
                        После установки откройте приложение с рабочего стола
                    </p>
                    <div className="flex-1 h-px bg-[var(--color-border)]" />
                </div>
            </div>
        </div>
    );
}
