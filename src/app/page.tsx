import Link from "next/link";
import { MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="relative h-screen flex flex-col overflow-hidden bg-[var(--color-bg)]">
      {/* Full-screen photo background */}
      <div className="absolute inset-0">
        <img
          src="/images/interior_1.jpg"
          alt="Интерьер"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay: top lighter, bottom darker for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/85" />
      </div>

      {/* Content on top of photo */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full pb-[calc(6rem+env(safe-area-inset-bottom))] pt-16 px-8">

        {/* Logo + Brand */}
        <div className="flex flex-col items-center text-center mt-6">
          <img
            src="/images/logo1.png"
            alt="Данила Мастер"
            className="w-28 h-28 object-contain mb-6 drop-shadow-2xl"
          />
          <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg">
            Данила Мастер
          </h1>
        </div>

        {/* Bottom info + CTA */}
        <div className="w-full flex flex-col gap-4">
          {/* Info chips */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <MapPin className="h-4 w-4 text-[var(--color-accent-2)] shrink-0" />
              <span>ул. Чубюская, 52, кабинет 11-Б</span>
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Clock className="h-4 w-4 text-[var(--color-accent-2)] shrink-0" />
              <span>Пн–Пт 10:00–20:00 &nbsp;·&nbsp; Сб–Вс 10:00–18:00</span>
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Phone className="h-4 w-4 text-[var(--color-accent-2)] shrink-0" />
              <span>+7 (999) 000-00-00</span>
            </div>
          </div>

          <Link href="/book" className="w-full mt-2">
            <Button className="w-full py-5 text-base">Записаться</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
