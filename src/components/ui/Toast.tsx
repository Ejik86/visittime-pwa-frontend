"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used within ToastProvider");
    return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 4000);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[100] mx-auto flex w-full max-w-md flex-col items-center gap-2 px-6">
                {toasts.map(t => (
                    <div
                        key={t.id}
                        className="pointer-events-auto flex w-full animate-in slide-in-from-bottom-5 items-center justify-between rounded-2xl bg-[var(--color-surface)] backdrop-blur-xl border border-[var(--color-border)] px-5 py-4 text-[var(--color-text)] shadow-2xl shadow-black/80"
                    >
                        <div className="flex items-center gap-3">
                            {t.type === 'success' && <CheckCircle className="h-5 w-5 text-[var(--color-accent)]" />}
                            {t.type === 'error' && <AlertCircle className="h-5 w-5 text-red-500" />}
                            <span className="text-sm font-medium tracking-wide">{t.message}</span>
                        </div>
                        <button
                            onClick={() => setToasts(p => p.filter(x => x.id !== t.id))}
                            className="rounded-full p-1 text-[var(--color-muted)] hover:bg-white/10 hover:text-white transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
