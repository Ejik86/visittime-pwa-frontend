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
 * iOS silent AudioContext trick:
 * Creates a 1ms zero-amplitude oscillator burst.
 * On some iOS versions this triggers the system taptic engine.
 * Works best when the PWA is opened from Home Screen.
 */
let _audioCtx: AudioContext | null = null;

function vibrateIos(style: HapticStyle) {
    try {
        if (!_audioCtx) {
            _audioCtx = new (window.AudioContext || (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext!)();
        }
        const ctx = _audioCtx;
        if (ctx.state === "suspended") ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        // Different frequency "feel" per style
        const freqMap: Record<HapticStyle, number> = {
            selection: 0,
            light: 0,
            medium: 0,
            heavy: 0,
            success: 0,
            error: 0,
        };
        osc.frequency.value = freqMap[style];
        gain.gain.value = 0; // Silent — just tickles the audio pipeline

        const now = ctx.currentTime;
        const durMap: Record<HapticStyle, number> = {
            selection: 0.005,
            light: 0.01,
            medium: 0.02,
            heavy: 0.035,
            success: 0.04,
            error: 0.05,
        };
        osc.start(now);
        osc.stop(now + durMap[style]);
    } catch {
        // Silently fail
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
