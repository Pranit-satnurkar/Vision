"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface SecretDoorProps {
    isOpen: boolean;
    onToggle: () => void;
}

export default function SecretDoor({ isOpen, onToggle }: SecretDoorProps) {
    return (
        <div className="relative w-8 h-12 cursor-pointer" onClick={onToggle} title="A suspicious looking door...">
            {/* Door Frame */}
            <div className="absolute inset-0 border-2 border-stone-600 bg-stone-800" />

            {/* The Door Itself */}
            <motion.div
                className="absolute inset-0 bg-amber-900 border border-amber-950 origin-left"
                animate={{
                    rotateY: isOpen ? -120 : 0
                }}
                transition={{ duration: 0.5, type: "spring" }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Knob */}
                <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-yellow-600 shadow-sm" />

                {/* Wood Texture details */}
                <div className="w-full h-full opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#000_2px,#000_4px)]" />
            </motion.div>

            {/* Darkness inside */}
            <div className="absolute inset-0 bg-black -z-10 flex items-end justify-center">
                {/* Cat eyes glowing in the dark if open */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isOpen ? 1 : 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-1 mb-2"
                >
                    <div className="w-1 h-1 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_5px_yellow]" />
                    <div className="w-1 h-1 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_5px_yellow]" />
                </motion.div>
            </div>
        </div>
    );
}
