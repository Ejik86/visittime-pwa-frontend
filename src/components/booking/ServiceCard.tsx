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
                "flex cursor-pointer flex-col overflow-hidden rounded-xl transition-all duration-300 smooth-press text-left border",
                isSelected
                    ? "bg-[var(--color-surface)] border-[var(--color-accent)] shadow-lg shadow-[var(--color-accent)]/5"
                    : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-muted)]"
            )}
        >
            <div className="flex">
                {service.imageUrl && (
                    <div className="w-1/3 min-h-[140px] relative shrink-0">
                        <img
                            src={service.imageUrl}
                            alt={service.name}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-surface)] opacity-90" />
                    </div>
                )}

                <div className="flex-1 p-5 lg:p-6 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-[var(--color-text)] text-lg tracking-tight leading-tight">{service.name}</h3>
                        <span className="font-medium text-[var(--color-text)] whitespace-nowrap ml-3">{displayPrice} ₽</span>
                    </div>

                    {service.description && (
                        <p className="text-[13px] text-[var(--color-muted)] font-light leading-relaxed mb-4">{service.description}</p>
                    )}

                    <div className="flex items-center gap-3 mt-auto">
                        <span className="text-[11px] font-medium text-[var(--color-accent)] uppercase tracking-wider">
                            {service.durationMinutes} мин
                        </span>
                        {isLoyal && (
                            <span className="text-[9px] bg-[var(--color-accent)]/10 text-[var(--color-accent)] px-2 py-0.5 rounded-sm border border-[var(--color-accent)]/20 uppercase tracking-widest font-medium">
                                Свой клиент
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
