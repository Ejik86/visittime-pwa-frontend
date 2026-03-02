import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen relative pb-32 bg-[var(--color-bg)]">
      {/* Brand / Hero Section */}
      <div className="relative w-full aspect-[4/5] max-h-[60vh] overflow-hidden mb-8">
        <img
          src="/images/interior_1.jpg"
          alt="Интерьер кабинета"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/40 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-center justify-end text-center">
          <img src="/images/logo1.png" alt="Logo" className="w-20 h-20 mb-4 object-contain opacity-90 drop-shadow-md" />
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-text)] mb-2">
            Данила Мастер
          </h1>
          <p className="text-[13px] uppercase tracking-[0.25em] text-[var(--color-accent)] font-medium">
            Private Barber
          </p>
        </div>
      </div>

      {/* Description & Action */}
      <div className="px-8 mt-4 flex flex-col items-center text-center">
        <h2 className="mb-4 text-2xl font-medium tracking-tight text-[var(--color-text)]">
          Ваш мастер в Ухте
        </h2>
        <p className="text-base text-[var(--color-muted)] font-light leading-relaxed max-w-[90%] mb-10">
          Спокойная атмосфера, уверенный стиль и внимание к деталям.
        </p>

        <Link href="/book" className="w-full">
          <Button className="w-full py-6 text-lg">Записаться на стрижку</Button>
        </Link>
      </div>

      {/* Info Cards */}
      <div className="px-8 mt-14 space-y-4">
        <div className="bg-[var(--color-surface)] p-6 rounded-2xl flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--color-bg)]">
              <MapPin className="h-5 w-5 text-[var(--color-accent)]" />
            </div>
            <h3 className="text-base font-medium text-[var(--color-text)] tracking-wide">Адрес</h3>
          </div>
          <p className="text-[15px] text-[var(--color-muted)] font-light mt-1 pl-12">ул. Чубюская, 52, кабинет 11-Б</p>
        </div>

        <div className="bg-[var(--color-surface)] p-6 rounded-2xl flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--color-bg)]">
              <Clock className="h-5 w-5 text-[var(--color-accent)]" />
            </div>
            <h3 className="text-base font-medium text-[var(--color-text)] tracking-wide">График работы</h3>
          </div>
          <div className="space-y-1.5 mt-1 pl-12">
            <p className="text-[15px] text-[var(--color-muted)] font-light">Пн–Пт 10:00–20:00</p>
            <p className="text-[15px] text-[var(--color-muted)] font-light">Сб–Вс 10:00–18:00</p>
          </div>
        </div>

        <div className="bg-[var(--color-surface)] p-6 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--color-bg)]">
              <Phone className="h-5 w-5 text-[var(--color-accent)]" />
            </div>
            <div className="space-y-1 ml-2">
              <h3 className="text-base font-medium text-[var(--color-text)] tracking-wide">Связаться</h3>
              <p className="text-[15px] text-[var(--color-muted)] font-light">+7 (999) 000-00-00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
