import { cn } from "@/lib/utils";

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]", className)}
            {...props}
        />
    );
}

export { Skeleton };
