
"use client";

import { useCallback } from 'react';

export function useSound() {
    const playPluck = useCallback(() => {
        try {
            // "Disposable" AudioContext pattern for maximum reliability
            // We create it *inside* the user gesture event handler.
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioCtx) return;

            const ctx = new AudioCtx();
            const t = ctx.currentTime;

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            // A crisp "Pop" sound (Sine wave with rapid pitch drop)
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, t);
            osc.frequency.exponentialRampToValueAtTime(100, t + 0.1);

            gain.gain.setValueAtTime(0.5, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);

            osc.start(t);
            osc.stop(t + 0.1);

            // Cleanup
            setTimeout(() => {
                ctx.close();
            }, 200);

        } catch (e) {
            console.error("Audio playback failed", e);
        }
    }, []);

    const playThump = useCallback(() => { }, []);

    return { playPluck, playThump };
}
