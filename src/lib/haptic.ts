/**
 * Haptic feedback utility for PWA.
 *
 * Android: uses the Web Vibration API (navigator.vibrate).
 * iOS Safari PWA: Apple heavily restricts vibrate API in pure PWAs without Cordova/Capacitor plugins.
 * Telegram mini-apps have native SDK bridges for haptics. Pure PWAs don't.
 * We try multiple fallback strategies for iOS.
 */

type HapticStyle = "light" | "medium" | "heavy" | "success" | "error" | "selection";

const PATTERNS: Record<HapticStyle, number | number[]> = {
    selection: 5,
    light: 10,
    medium: 20,
    heavy: 35,
    success: [10, 40, 10],
    error: [30, 20, 30],
};

function vibrateAndroid(style: HapticStyle) {
    if (typeof navigator === "undefined" || !("vibrate" in navigator)) return;
    try {
        navigator.vibrate(PATTERNS[style]);
    } catch {
        // Silently ignore
    }
}

/**
 * Strategy 1: The iOS 17.4+ native `input switch` hack.
 * WebKit binds Taptic Engine to inputs with `switch` attribute.
 */
let ioshackLabel: HTMLLabelElement | null = null;
let ioshackInput: HTMLInputElement | null = null;

function setupIosHack() {
    if (typeof document === 'undefined') return;
    if (ioshackLabel) return;

    ioshackInput = document.createElement('input');
    ioshackInput.type = 'checkbox';
    // @ts-ignore - non-standard attribute
    ioshackInput.setAttribute('switch', '');
    ioshackInput.id = 'pwa-haptic-input';
    ioshackInput.style.position = 'absolute';
    ioshackInput.style.opacity = '0.0001';
    ioshackInput.style.width = '1px';
    ioshackInput.style.height = '1px';
    ioshackInput.style.pointerEvents = 'none';

    ioshackLabel = document.createElement('label');
    ioshackLabel.htmlFor = 'pwa-haptic-input';
    ioshackLabel.style.position = 'absolute';
    ioshackLabel.style.opacity = '0.0001';
    ioshackLabel.style.width = '1px';
    ioshackLabel.style.height = '1px';
    ioshackLabel.style.pointerEvents = 'none';

    document.body.appendChild(ioshackInput);
    document.body.appendChild(ioshackLabel);
}

const fireIosHack = () => {
    setupIosHack();
    if (ioshackLabel) ioshackLabel.click();
};

function vibrateIos(style: HapticStyle) {
    // Fire the raw hack based on severity
    fireIosHack();

    // Fallback patterns for heavier feedback (may be throttled by iOS)
    if (style === 'medium') {
        setTimeout(fireIosHack, 40);
    } else if (style === 'heavy') {
        setTimeout(fireIosHack, 40);
        setTimeout(fireIosHack, 80);
    } else if (style === 'success') {
        setTimeout(fireIosHack, 80);
        setTimeout(fireIosHack, 150);
    } else if (style === 'error') {
        setTimeout(fireIosHack, 50);
        setTimeout(fireIosHack, 100);
    }
}

function isIos(): boolean {
    if (typeof navigator === "undefined") return false;
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

/** Main haptic function — call this everywhere */
export function haptic(style: HapticStyle = "light") {
    if (isIos()) {
        vibrateIos(style);
    } else {
        vibrateAndroid(style);
    }
}

export const hapticLight = () => haptic("light");
export const hapticMedium = () => haptic("medium");
export const hapticHeavy = () => haptic("heavy");
export const hapticSuccess = () => haptic("success");
export const hapticError = () => haptic("error");
export const hapticSelection = () => haptic("selection");
