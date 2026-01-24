
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function GradientBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl"></div>

            {/* Orb 1 - Top Left (Blue/Purple) */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-blue-500/10 blur-[100px]"
            />

            {/* Orb 2 - Bottom Right (Green/Teal) */}
            <motion.div
                animate={{
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.5, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
                className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-green-500/10 blur-[100px]"
            />

            {/* Orb 3 - Center (Violet) */}
            <motion.div
                animate={{
                    x: [0, 50, -50, 0],
                    y: [0, 100, -100, 0],
                    opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-purple-500/10 blur-[120px]"
            />
        </div>
    );
}
