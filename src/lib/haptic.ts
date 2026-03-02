/**
 * Haptic feedback utility for PWA.
 *
 * Android: uses the Web Vibration API (navigator.vibrate).
 * iOS Safari: Vibration API is not supported natively in PWA mode.
 * The AudioContext trick below triggers a silent burst that on some
 * iOS devices causes a subtle taptic response (system-level).
 */

type HapticStyle = "light" | "medium" | "heavy" | "success" | "error" | "selection";

// Vibration patterns (ms): duration or [on, off, on, ...]
const PATTERNS: Record<HapticStyle, number | number[]> = {
    selection: 5,
    light: 10,
    medium: 20,
    heavy: 35,
    success: [10, 40, 10],
    error: [30, 20, 30],
};

/** Fires native vibration on Android / supported browsers */
function vibrateAndroid(style: HapticStyle) {
    if (typeof navigator === "undefined" || !("vibrate" in navigator)) return;
    try {
        navigator.vibrate(PATTERNS[style]);
    } catch {
        // Silently ignore — some browsers disable it in certain contexts
    }
}

/**
 * iOS native Taptic Engine trick (iOS 17.4+):
 * iOS Safari now supports `<input type="checkbox" switch>`.
 * Toggling this specific input type fires a real system haptic tick.
 * We can programmatically click a hidden label connected to it.
 */
function vibrateIos(style: HapticStyle) {
    if (typeof document === 'undefined') return;

    let testInput = document.getElementById('ios-haptic-input') as HTMLInputElement | null;
    let testLabel = document.getElementById('ios-haptic-label') as HTMLLabelElement | null;

    if (!testInput || !testLabel) {
        testInput = document.createElement('input');
        testInput.type = 'checkbox';
        testInput.setAttribute('switch', ''); // The magic attribute
        testInput.id = 'ios-haptic-input';
        // Must be in DOM and "visible" enough to not be optimized out
        testInput.style.position = 'fixed';
        testInput.style.left = '-9999px';
        testInput.style.opacity = '0';

        testLabel = document.createElement('label');
        testLabel.id = 'ios-haptic-label';
        testLabel.htmlFor = 'ios-haptic-input';
        testLabel.style.position = 'fixed';
        testLabel.style.left = '-9999px';

        document.body.appendChild(testInput);
        document.body.appendChild(testLabel);
    }

    const trigger = () => testLabel?.click();

    // Different patterns using the single haptic tick
    trigger(); // Base tick

    if (style === 'medium') {
        setTimeout(trigger, 40);
    } else if (style === 'heavy') {
        setTimeout(trigger, 40);
        setTimeout(trigger, 80);
    } else if (style === 'success') {
        setTimeout(trigger, 80);
        setTimeout(trigger, 200);
    } else if (style === 'error') {
        setTimeout(trigger, 50);
        setTimeout(trigger, 100);
        setTimeout(trigger, 150);
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

// Convenience shortcuts
export const hapticLight = () => haptic("light");
export const hapticMedium = () => haptic("medium");
export const hapticHeavy = () => haptic("heavy");
export const hapticSuccess = () => haptic("success");
export const hapticError = () => haptic("error");
export const hapticSelection = () => haptic("selection");
