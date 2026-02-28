import { Service } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
    service: Service;
    isSelected?: boolean;
    onClick?: () => void;
}

export function ServiceCard({ service, isSelected, onClick }: ServiceCardProps) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "flex cursor-pointer flex-col justify-center rounded-2xl p-5 transition-all duration-300 smooth-press text-left",
                isSelected
                    ? "bg-[var(--color-surface)] border border-[var(--color-accent)] ring-1 ring-[var(--color-accent)] shadow-[0_0_15px_rgba(111,143,134,0.15)]"
                    : "glass-panel hover:bg-[var(--color-surface-2)]"
            )}
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-[var(--color-text)] text-lg tracking-wide">{service.name}</h3>
                <span className="font-semibold text-[var(--color-text)] whitespace-nowrap ml-4">{service.price} ₽</span>
            </div>
            {service.description && (
                <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4 pr-10">{service.description}</p>
            )}
            <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-accent)]">
                <div className="flex h-6 items-center px-2.5 rounded bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20">
                    {service.durationMinutes} мин
                </div>
            </div>
        </div>
    );
}
