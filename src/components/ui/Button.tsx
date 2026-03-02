"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { haptic } from "@/lib/haptic";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    size?: "default" | "sm" | "lg";
    hapticStyle?: "light" | "medium" | "heavy" | "success" | "error" | "selection";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "default", hapticStyle = "medium", onClick, ...props }, ref) => {
        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            haptic(hapticStyle);
            onClick?.(e);
        };

        return (
            <button
                ref={ref}
                onClick={handleClick}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent)] disabled:pointer-events-none disabled:opacity-50 smooth-press",
                    {
                        "bg-[var(--color-accent)] text-[var(--color-text)] hover:bg-[var(--color-accent-2)]": variant === "primary",
                        "bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface-2)]": variant === "secondary",
                        "hover:bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-text)]": variant === "ghost",
                        "h-14 px-8 py-3 text-base": size === "default",
                        "h-10 rounded-lg px-4": size === "sm",
                        "h-16 rounded-2xl px-10 text-lg": size === "lg",
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
