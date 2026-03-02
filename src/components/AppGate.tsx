"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { InstallScreen } from "@/components/InstallScreen";
import { AuthScreen } from "@/components/AuthScreen";

export function AppGate({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuthStore();
    const [mounted, setMounted] = useState(false);
    const [isPwa, setIsPwa] = useState(false);

    useEffect(() => {
        const standalone =
            window.matchMedia("(display-mode: standalone)").matches ||
            (window.navigator as { standalone?: boolean }).standalone === true;
        setIsPwa(standalone);
        setMounted(true);
    }, []);

    // Avoid SSR mismatch
    if (!mounted) return null;

    // In browser (not installed)
    if (!isPwa) return <InstallScreen />;

    // Installed but not authenticated
    if (!isAuthenticated) return <AuthScreen />;

    // Installed + authenticated → show app
    return <>{children}</>;
}
