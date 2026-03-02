"use client";

import { useState } from "react";
import { ChevronLeft, User } from "lucide-react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { hapticMedium, hapticSuccess, hapticSelection, hapticLight } from "@/lib/haptic";

type AuthStep = "phone" | "code";

function formatPhone(raw: string): string {
    const digits = raw.replace(/\D/g, "").slice(0, 11);
    if (digits.length === 0) return "";
    let result = "+7";
    if (digits.length > 1) result += " (" + digits.slice(1, 4);
    if (digits.length > 4) result += ") " + digits.slice(4, 7);
    if (digits.length > 7) result += "-" + digits.slice(7, 9);
    if (digits.length > 9) result += "-" + digits.slice(9, 11);
    return result;
}

export function AuthScreen() {
    const { setAuthenticated } = useAuthStore();
    const [step, setStep] = useState<AuthStep>("phone");
    const [rawPhone, setRawPhone] = useState("7");
    const [code, setCode] = useState<string[]>(["", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [timer, setTimer] = useState(0);

    const phoneDisplay = formatPhone(rawPhone);
    const phoneDigits = rawPhone.replace(/\D/g, "");
    const phoneReady = phoneDigits.length === 11 && agreed;

    const handlePhoneSubmit = async () => {
        if (!phoneReady) return;
        hapticMedium();
        setLoading(true);
        await api.requestPhoneCode(rawPhone);
        setLoading(false);
        setStep("code");
        // Start 30s timer
        setTimer(30);
        const interval = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) { clearInterval(interval); return 0; }
                return prev - 1;
            });
        }, 1000);
    };

    const handleCodeDigit = (digit: string, idx: number) => {
        hapticSelection();
        const updated = [...code];
        updated[idx] = digit;
        setCode(updated);
        if (digit && idx < 3) {
            const next = document.getElementById(`code-${idx + 1}`);
            next?.focus();
        }
        if (updated.every(d => d !== "") && updated.join("").length === 4) {
            const full = updated.join("");
            handleCodeSubmit(full);
        }
    };

    const handleCodeSubmit = async (codeStr: string) => {
        if (codeStr.length !== 4) return;
        setLoading(true);
        await new Promise(r => setTimeout(r, 600));
        hapticSuccess();
        setAuthenticated(rawPhone);
        setLoading(false);
    };

    const handleBackspace = (idx: number) => {
        const updated = [...code];
        if (updated[idx]) {
            updated[idx] = "";
            setCode(updated);
        } else if (idx > 0) {
            updated[idx - 1] = "";
            setCode(updated);
            const prev = document.getElementById(`code-${idx - 1}`);
            prev?.focus();
        }
    };

    if (step === "code") {
        return (
            <div className="flex h-screen flex-col bg-[var(--color-bg)]">
                {/* Header */}
                <div className="flex items-center h-14 px-4 border-b border-[var(--color-border)] shrink-0">
                    <button
                        onClick={() => { setStep("phone"); setCode(["", "", "", ""]); }}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-muted)] hover:bg-[var(--color-surface)] transition-colors"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <span className="flex-1 text-center text-sm font-medium text-[var(--color-text)]">Вход</span>
                    <div className="w-9" />
                </div>

                <div className="flex-1 px-8 pt-10 flex flex-col">
                    <h2 className="text-2xl font-semibold text-[var(--color-text)] tracking-tight mb-2">Код из СМС</h2>
                    <p className="text-sm text-[var(--color-muted)] font-light mb-10">
                        Отправили на {phoneDisplay}
                    </p>

                    {/* 4-digit code inputs */}
                    <div className="flex gap-3 mb-8">
                        {code.map((digit, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center">
                                <input
                                    id={`code-${i}`}
                                    type="tel"
                                    maxLength={1}
                                    value={digit}
                                    onChange={e => handleCodeDigit(e.target.value.replace(/\D/g, "").slice(-1), i)}
                                    onKeyDown={e => e.key === "Backspace" && handleCodeDigit("", i) && handleBackspace(i)}
                                    className="w-full h-14 text-center text-3xl font-bold bg-transparent text-[var(--color-text)] outline-none border-b-2 border-[var(--color-border)] focus:border-[var(--color-accent)] transition-colors caret-transparent"
                                    autoFocus={i === 0}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Resend timer */}
                    <p className="text-xs text-[var(--color-muted)] text-center font-light mb-8">
                        {timer > 0
                            ? `Получить новый код можно через 0:${String(timer).padStart(2, "0")}`
                            : <button className="text-[var(--color-accent)] hover:opacity-80" onClick={handlePhoneSubmit}>Отправить код повторно</button>
                        }
                    </p>

                    {/* Confirm button */}
                    <button
                        disabled={code.some(d => !d) || loading}
                        onClick={() => handleCodeSubmit(code.join(""))}
                        className="w-full py-4 rounded-xl bg-[var(--color-accent)] text-white font-medium text-base disabled:opacity-40 transition-opacity"
                    >
                        {loading ? "Проверяем..." : "Подтвердить"}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen flex-col bg-[var(--color-bg)]">
            {/* Top logo area */}
            <div className="flex-1 flex flex-col items-center justify-center px-8">
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-surface)] border border-[var(--color-border)]">
                    <User className="h-9 w-9 text-[var(--color-accent)]" />
                </div>
                <h2 className="text-2xl font-semibold text-[var(--color-text)] tracking-tight mb-3 text-center">
                    Добро пожаловать!
                </h2>
                <p className="text-sm text-[var(--color-muted)] font-light text-center leading-relaxed max-w-[260px]">
                    Введите ваш номер телефона для использования приложения
                </p>
            </div>

            {/* Phone input area */}
            <div className="px-8 pb-8 shrink-0">
                {/* Phone display */}
                <div
                    className="w-full py-4 px-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-lg font-medium tracking-wide mb-4"
                >
                    {phoneDisplay || "+7"}
                </div>

                {/* Agreement */}
                <label className="flex items-start gap-2 mb-5 cursor-pointer">
                    <div
                        onClick={() => setAgreed(!agreed)}
                        className={`shrink-0 mt-0.5 flex h-4 w-4 items-center justify-center rounded border transition-colors ${agreed ? "bg-[var(--color-accent)] border-[var(--color-accent)]" : "border-[var(--color-muted)]"}`}
                    >
                        {agreed && <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 10 8"><path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </div>
                    <span className="text-xs text-[var(--color-muted)] font-light leading-relaxed">
                        Я согласен(а) на обработку{" "}
                        <span className="text-[var(--color-accent)]">персональных данных</span>
                    </span>
                </label>

                {/* CTA */}
                <button
                    disabled={!phoneReady || loading}
                    onClick={handlePhoneSubmit}
                    className="w-full py-4 rounded-xl bg-[var(--color-accent)] text-white font-medium text-base disabled:opacity-40 transition-all active:scale-[0.98] mb-6"
                >
                    {loading ? "Отправка..." : "Получить код"}
                </button>

                {/* Numpad */}
                <div className="grid grid-cols-3 gap-2">
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "⌫"].map(key => (
                        <button
                            key={key}
                            onClick={() => {
                                if (key === "⌫") {
                                    setRawPhone(p => p.length > 1 ? p.slice(0, -1) : p);
                                } else if (key !== "*") {
                                    setRawPhone(p => {
                                        const digits = p.replace(/\D/g, "");
                                        if (digits.length >= 11) return p;
                                        return p + key;
                                    });
                                }
                            }}
                            className={`py-4 rounded-xl text-lg font-medium transition-all active:scale-95 ${key === "*" ? "opacity-0 pointer-events-none" : "bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-2)]"}`}
                        >
                            {key}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
