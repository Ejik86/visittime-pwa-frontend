import { Service } from "@/lib/types";
import { cn } from "@/lib/utils";
import { hapticLight } from "@/lib/haptic";

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
            onClick={() => { hapticLight(); onClick?.(); }}
            className={cn(
                "flex cursor-pointer flex-row items-center overflow-hidden rounded-xl transition-all duration-200 smooth-press border h-[90px]",
                isSelected
                    ? "bg-[var(--color-surface)] border-[var(--color-accent)]"
                    : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-muted)]"
            )}
        >
            {/* Photo */}
            {service.imageUrl && (
                <div className="relative h-full w-[90px] shrink-0 overflow-hidden">
                    <img
                        src={service.imageUrl}
                        alt={service.name}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-surface)]/80" />
                </div>
            )}

            {/* Text */}
            <div className="flex flex-1 flex-col justify-center px-4 gap-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-medium text-[var(--color-text)] text-base tracking-tight truncate">
                        {service.name}
                    </h3>
                    <span className="text-base font-medium text-[var(--color-text)] shrink-0">
                        {displayPrice} ₽
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-[var(--color-accent)] uppercase tracking-wider">
                        {service.durationMinutes} мин
                    </span>
                    {service.description && (
                        <span className="text-[12px] text-[var(--color-muted)] font-light truncate">
                            · {service.description}
                        </span>
                    )}
                </div>

                {isLoyal && (
                    <span className="text-[9px] self-start bg-[var(--color-accent)]/10 text-[var(--color-accent)] px-2 py-0.5 rounded-sm border border-[var(--color-accent)]/20 uppercase tracking-widest font-medium">
                        Свой клиент
                    </span>
                )}
            </div>
        </div>
    );
}
