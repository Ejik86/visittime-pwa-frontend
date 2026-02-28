"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "default", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] disabled:pointer-events-none disabled:opacity-50 smooth-press",
                    {
                        "bg-[var(--color-accent)] text-[#0B0F12] hover:bg-[var(--color-accent-2)] shadow-[0_4px_20px_rgba(111,143,134,0.15)]": variant === "primary",
                        "bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface-2)]": variant === "secondary",
                        "hover:bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-text)]": variant === "ghost",
                        "h-14 px-8 py-3 text-base": size === "default",
                        "h-10 rounded-xl px-4": size === "sm",
                        "h-16 rounded-3xl px-10 text-lg": size === "lg",
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
