
"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);

    // Mouse position
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring animation for the follower
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            // Strictly check for touch capability to prevent ghost triggers
            if (window.matchMedia("(pointer: coarse)").matches) return;

            cursorX.set(e.clientX - 16); // Center the 32px cursor
            cursorY.set(e.clientY - 16);
            if (!isVisible) setIsVisible(true);
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [cursorX, cursorY, isVisible]);

    // Don't show on touch devices roughly
    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) {
            setIsVisible(false);
        }
    }, []);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 border border-[#556b2f] rounded-full pointer-events-none z-[9999]"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
            }}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[#556b2f] rounded-full" />
        </motion.div>
    );
}
