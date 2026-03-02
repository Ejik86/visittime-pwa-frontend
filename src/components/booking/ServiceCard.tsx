import { Service } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
    service: Service;
    isSelected?: boolean;
    isLoyal?: boolean;
    onClick?: () => void;
}

export function ServiceCard({ service, isSelected, isLoyal, onClick }: ServiceCardProps) {
    const displayPrice = isLoyal ? service.price : service.priceRegular;

    return (
        <div
            onClick={onClick}
            className={cn(
                "flex cursor-pointer flex-col justify-center rounded-xl p-6 transition-all duration-300 smooth-press text-left border",
                isSelected
                    ? "bg-[var(--color-surface)] border-[var(--color-accent)]"
                    : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-muted)]"
            )}
        >
            <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-[var(--color-text)] text-lg tracking-tight">{service.name}</h3>
                <span className="font-medium text-[var(--color-text)] whitespace-nowrap ml-4">{displayPrice} ₽</span>
            </div>

            {service.description && (
                <p className="text-[14px] text-[var(--color-muted)] font-light leading-relaxed mb-4 pr-6">{service.description}</p>
            )}

            <div className="flex items-center gap-2">
                <span className="text-[12px] font-medium text-[var(--color-accent)] uppercase tracking-wider">
                    {service.durationMinutes} мин
                </span>
                {isLoyal && (
                    <span className="text-[10px] bg-[var(--color-accent)]/10 text-[var(--color-accent)] px-2 py-0.5 rounded-full border border-[var(--color-accent)]/20 uppercase tracking-widest font-medium">
                        Свой клиент
                    </span>
                )}
            </div>
        </div>
    );
}
