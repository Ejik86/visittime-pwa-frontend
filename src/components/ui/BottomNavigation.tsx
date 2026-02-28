"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarDays, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNavigation() {
    const pathname = usePathname();

    const links = [
        { href: "/", label: "Главная", icon: Home },
        { href: "/book", label: "Запись", icon: CalendarDays },
        { href: "/account", label: "Кабинет", icon: User },
    ];

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full border-t border-[var(--color-border)] bg-[var(--color-bg)]/80 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-md items-center justify-around px-6">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex w-16 flex-col items-center justify-center gap-1 transition-all duration-300 active:scale-95",
                                isActive ? "text-[var(--color-accent)]" : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
                            )}
                        >
                            <Icon
                                className={cn("h-6 w-6 transition-all duration-300", isActive && "drop-shadow-[0_0_8px_rgba(111,143,134,0.4)]")}
                                strokeWidth={isActive ? 2.5 : 2}
                            />
                            <span className={cn("text-[10px] uppercase tracking-wider", isActive ? "font-bold" : "font-medium")}>
                                {link.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
