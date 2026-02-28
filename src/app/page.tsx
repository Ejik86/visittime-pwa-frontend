import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen relative pb-32">
      {/* Brand Header */}
      <div className="flex items-center justify-center p-6 pt-12">
        <div className="text-2xl font-black tracking-widest uppercase text-[var(--color-text)] drop-shadow-md border-b-2 border-[var(--color-accent)] pb-1 px-2">
          Данила Мастер
        </div>
      </div>

      {/* Hero Content */}
      <div className="px-6 mt-8 flex flex-col relative z-10">
        <h1 className="mb-4 text-[2.5rem] leading-[1.05] font-extrabold tracking-tight text-[var(--color-text)]">
          Онлайн-<span className="text-[var(--color-accent)] drop-shadow-[0_0_15px_rgba(111,143,134,0.3)]">запись</span>
        </h1>
        <p className="text-base text-[var(--color-muted)] font-medium leading-relaxed max-w-[90%] mb-10">
          Выберите услугу и время — подтверждение в один клик.
        </p>

        <Link
          href="/book"
          className="flex h-16 w-full items-center justify-center rounded-2xl bg-[var(--color-accent)] px-8 text-lg font-bold tracking-wide text-[#0B0F12] shadow-[0_4px_25px_rgba(111,143,134,0.25)] transition-all duration-300 hover:bg-[var(--color-accent-2)] active:scale-95 smooth-press"
        >
          Записаться
        </Link>
      </div>

      {/* Info Cards Grid */}
      <div className="px-6 mt-12 grid grid-cols-2 gap-4">
        <div className="glass-panel p-4 rounded-2xl flex flex-col gap-2">
          <MapPin className="h-6 w-6 text-[var(--color-accent)]" />
          <h3 className="font-bold text-sm text-[var(--color-text)] mt-2">Адрес</h3>
          <p className="text-xs text-[var(--color-muted)]">ул. Ленина, 42</p>
        </div>
        <div className="glass-panel p-4 rounded-2xl flex flex-col gap-2">
          <Clock className="h-6 w-6 text-[var(--color-accent)]" />
          <h3 className="font-bold text-sm text-[var(--color-text)] mt-2">Часы работы</h3>
          <p className="text-xs text-[var(--color-muted)]">Ежедневно 10:00 - 22:00</p>
        </div>
      </div>

      <div className="px-6 mt-4">
        <div className="glass-panel p-4 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Phone className="h-6 w-6 text-[var(--color-accent)]" />
            <div>
              <h3 className="font-bold text-sm text-[var(--color-text)]">Контакты</h3>
              <p className="text-xs text-[var(--color-muted)]">+7 (999) 000-00-00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
