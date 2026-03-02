import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { BottomNavigation } from "@/components/ui/BottomNavigation";
import { PwaRegistrar } from "@/components/PwaRegistrar";

const font = Outfit({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0F1113",
};

export const metadata: Metadata = {
  title: "Данила Мастер | Кабинет частного мастера",
  description: "Премиальный сервис мужских стрижек в Ухте",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Данила Мастер",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${font.className} bg-[var(--color-bg)] text-[var(--color-text)] antialiased`}>
        <PwaRegistrar />
        <ToastProvider>
          <main className="mx-auto min-h-screen max-w-md bg-[var(--color-bg)] pb-24 shadow-2xl shadow-black/50 relative">
            {children}
          </main>
          <BottomNavigation />
        </ToastProvider>
      </body>
    </html>
  );
}
