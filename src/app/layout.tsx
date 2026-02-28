import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { BottomNavigation } from "@/components/ui/BottomNavigation";
import { PwaRegistrar } from "@/components/PwaRegistrar";

const font = Inter({ subsets: ["cyrillic", "latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0B0F12",
};

export const metadata: Metadata = {
  title: "Данила Мастер | Онлайн-запись",
  description: "Онлайн-запись в премиальный мужской салон Данила Мастер",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Danilo",
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
