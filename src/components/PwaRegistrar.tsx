"use client";

import { useEffect } from "react";

export function PwaRegistrar() {
    useEffect(() => {
        if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
            // Small delay to prioritize page load
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').catch((err) => {
                    console.error('SW registration failed: ', err);
                });
            });
        } else if ('serviceWorker' in navigator && window.location.hostname === 'localhost') {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').catch((err) => {
                    console.error('SW registration failed: ', err);
                });
            });
        }
    }, []);

    return null;
}
