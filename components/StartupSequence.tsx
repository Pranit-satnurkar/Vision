
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import bio from "@/data/bio.json";

export default function StartupSequence() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Hard limit: 2 seconds max
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Grid Lines Drawing Animation */}
                    <div className="absolute inset-0 w-full h-full pointer-events-none">
                        {/* Center Vertical Line */}
                        <motion.div
                            initial={{ height: "0%" }}
                            animate={{ height: "100%" }}
                            transition={{ duration: 1, ease: "circInOut" }}
                            className="absolute left-[33.33%] top-0 w-px bg-primary/20"
                        />

                        {/* Horizontal Lines */}
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.2, ease: "circInOut", delay: 0.2 }}
                            className="absolute top-[20%] left-0 h-px bg-primary/20"
                        />
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.2, ease: "circInOut", delay: 0.4 }}
                            className="absolute bottom-[20%] right-0 h-px bg-primary/20"
                        />
                    </div>

                    {/* System Boot Text */}
                    <div className="relative z-10 font-mono text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-xs uppercase tracking-[0.5em] text-muted-foreground mb-4"
                        >
                            System_Boot_Seq
                        </motion.div>

                        <motion.h1
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="text-4xl md:text-6xl font-black tracking-tighter"
                        >
                            {bio.name.split(" ")[0]}
                            <span className="text-primary">.</span>
                        </motion.h1>

                        {/* Loading Bar */}
                        <div className="mt-8 h-1 w-48 bg-secondary mx-auto overflow-hidden rounded-full">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "0%" }}
                                transition={{ duration: 1.5, ease: "linear" }}
                                className="h-full w-full bg-primary"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
