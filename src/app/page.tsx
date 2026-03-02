import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen relative pb-32 bg-[var(--color-bg)]">
      {/* Brand Header */}
      <div className="flex flex-col items-center justify-center p-6 pt-16">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-text)]">
          Данила Мастер
        </h1>
        <p className="text-[12px] uppercase tracking-[0.2em] text-[var(--color-accent)] mt-1 font-medium">
          Private Barber
        </p>
      </div>

      {/* Hero Content */}
      <div className="px-8 mt-12 flex flex-col items-center text-center">
        <h2 className="mb-4 text-2xl font-medium tracking-tight text-[var(--color-text)]">
          Ваш мастер в Ухте
        </h2>
        <p className="text-[15px] text-[var(--color-muted)] font-light leading-relaxed max-w-[85%] mb-12">
          Спокойная атмосфера, уверенный стиль и внимание к деталям.
        </p>

        <Link href="/book" className="w-full">
          <Button className="w-full">Записаться на стрижку</Button>
        </Link>
      </div>

      {/* Info Cards */}
      <div className="px-8 mt-16 space-y-4">
        <div className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-[var(--color-accent)]" />
            <h3 className="text-sm font-medium text-[var(--color-text)]">Адрес</h3>
          </div>
          <p className="text-sm text-[var(--color-muted)] font-light">ул. Чубюская, 52, кабинет 11-Б</p>
        </div>

        <div className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-[var(--color-accent)]" />
            <h3 className="text-sm font-medium text-[var(--color-text)]">График работы</h3>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-[var(--color-muted)] font-light">Пн–Пт 10:00–20:00</p>
            <p className="text-sm text-[var(--color-muted)] font-light">Сб–Вс 10:00–18:00</p>
          </div>
        </div>

        <div className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Phone className="h-5 w-5 text-[var(--color-accent)]" />
            <div className="space-y-0.5">
              <h3 className="text-sm font-medium text-[var(--color-text)]">Связаться</h3>
              <p className="text-sm text-[var(--color-muted)] font-light">+7 (999) 000-00-00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
