"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef, RefObject } from "react";

export default function Kat({ constraintsRef }: { constraintsRef: RefObject<any> }) {
    const [position, setPosition] = useState({ x: 50, y: -20 }); // Start near the door
    const [direction, setDirection] = useState(1); // 1 = right, -1 = left
    const [isSleeping, setIsSleeping] = useState(false);
    const [mood, setMood] = useState<"happy" | "playful" | "sleepy">("playful");
    const [isMoving, setIsMoving] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);
    const controls = useAnimation();

    // Organic Skeletal Cat
    const SkeletalCat = () => {
        // Variants for organic movement
        const legWalk = {
            walk: { rotate: [-15, 15, -15], transition: { repeat: Infinity, duration: 0.5, ease: "linear" as const } },
            idle: { rotate: 0 }
        };

        return (
            <div className="relative w-20 h-16 drop-shadow-md">
                {/* Shadow */}
                <div className="absolute bottom-2 left-2 w-16 h-2 bg-black/20 rounded-full blur-sm" />

                {/* Tail (Curved SVG) */}
                <motion.svg className="absolute bottom-4 left-0 w-8 h-12 overflow-visible" style={{ originX: 1, originY: 1 }}
                    animate={mood === "happy" ? { rotate: [-10, 10, -10] } : { rotate: [-5, 5, -5] }}
                    transition={{ repeat: Infinity, duration: mood === "happy" ? 0.5 : 2, ease: "easeInOut" }}
                >
                    <path d="M25 40 Q 15 20, 5 10" stroke="#E5E5E5" strokeWidth="6" strokeLinecap="round" fill="none" />
                </motion.svg>

                {/* Back Leg (Left) */}
                <motion.div className="absolute bottom-2 left-3 origin-top" variants={legWalk} animate={isMoving ? "walk" : "idle"}>
                    <svg width="12" height="20" viewBox="0 0 12 20">
                        <path d="M2 0 Q 0 10, 2 20" stroke="#D4D4D4" strokeWidth="6" strokeLinecap="round" />
                    </svg>
                </motion.div>

                {/* Back Leg (Right) */}
                <motion.div className="absolute bottom-2 left-5 origin-top" variants={legWalk} animate={isMoving ? "walk" : "idle"} style={{ opacity: 0.9 }}>
                    <svg width="12" height="20" viewBox="0 0 12 20">
                        <path d="M2 0 Q 6 10, 2 20" stroke="#C0C0C0" strokeWidth="6" strokeLinecap="round" />
                    </svg>
                </motion.div>

                {/* Body (Organic Shape) */}
                <motion.div
                    className="absolute bottom-4 left-2"
                    animate={isMoving ? { y: [0, -1, 0] } : { scale: [1, 1.01, 1] }}
                    transition={{ repeat: Infinity, duration: isMoving ? 0.3 : 2 }}
                >
                    <svg width="50" height="35" viewBox="0 0 50 35">
                        <path d="M5 20 Q 15 5, 25 5 H 40 Q 50 10, 45 25 Q 35 35, 15 30 Z" fill="#F5F5F5" />
                    </svg>
                </motion.div>

                {/* Front Leg (Left) */}
                <motion.div className="absolute bottom-2 right-6 origin-top"
                    animate={isMoving ? { rotate: [15, -15, 15] } : { rotate: 0 }}
                    transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
                >
                    <svg width="12" height="20" viewBox="0 0 12 20">
                        <path d="M2 0 Q 0 10, 2 20" stroke="#D4D4D4" strokeWidth="6" strokeLinecap="round" />
                    </svg>
                </motion.div>

                {/* Front Leg (Right) */}
                <motion.div className="absolute bottom-2 right-4 origin-top"
                    animate={isMoving ? { rotate: [-15, 15, -15] } : { rotate: 0 }}
                    transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
                    style={{ opacity: 0.9 }}
                >
                    <svg width="12" height="20" viewBox="0 0 12 20">
                        <path d="M2 0 Q 6 10, 2 20" stroke="#C0C0C0" strokeWidth="6" strokeLinecap="round" />
                    </svg>
                </motion.div>

                {/* Head (SVG) */}
                <motion.div
                    className="absolute bottom-8 right-[-5px] origin-bottom-left"
                    animate={isMoving ? { rotate: [-2, 2, -2] } : { rotate: 0 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                >
                    <svg width="36" height="32" viewBox="0 0 36 32" className="drop-shadow-sm">
                        {/* Ears */}
                        <path d="M2 10 L 6 0 L 14 6 Z" fill="#F5F5F5" stroke="#E5E5E5" />
                        <path d="M22 6 L 30 0 L 34 10 Z" fill="#F5F5F5" stroke="#E5E5E5" />
                        {/* Face Shape */}
                        <ellipse cx="18" cy="18" rx="16" ry="13" fill="#FFFFFF" />
                        {/* Eyes */}
                        {mood === "sleepy" ? (
                            <>
                                <path d="M10 16 Q 13 18, 16 16" stroke="#555" strokeWidth="2" fill="none" />
                                <path d="M20 16 Q 23 18, 26 16" stroke="#555" strokeWidth="2" fill="none" />
                            </>
                        ) : (
                            <>
                                <motion.ellipse cx="12" cy="16" rx="2" ry="3" fill="#222"
                                    animate={isBlinking ? { scaleY: 0.1 } : { scaleY: 1 }}
                                />
                                <motion.ellipse cx="24" cy="16" rx="2" ry="3" fill="#222"
                                    animate={isBlinking ? { scaleY: 0.1 } : { scaleY: 1 }}
                                />
                            </>
                        )}
                        {/* Nose/Mouth */}
                        <path d="M16 22 L 18 24 L 20 22" stroke="#FFA6C9" strokeWidth="2" strokeLinecap="round" fill="none" />
                        <circle cx="18" cy="21" r="1.5" fill="#FFA6C9" />
                        {/* Whiskers */}
                        <path d="M5 20 L 0 18 M 5 22 L 0 23" stroke="#DDD" strokeWidth="1" />
                        <path d="M31 20 L 36 18 M 31 22 L 36 23" stroke="#DDD" strokeWidth="1" />
                    </svg>
                </motion.div>
            </div>
        );
    };

    // Movement Logic
    useEffect(() => {
        if (isSleeping) return;

        const moveCat = async () => {
            // Random destination within somewhat reasonable bounds of the parent container
            const randomX = Math.random() * 300;
            const randomY = Math.random() * -200; // Move up from bottom

            const newDirection = randomX > position.x ? 1 : -1;
            setDirection(newDirection);

            setIsMoving(true);

            await controls.start({
                x: randomX,
                y: randomY,
                transition: { duration: 2 + Math.random() * 3, ease: "easeInOut" }
            });

            setIsMoving(false);
            setPosition({ x: randomX, y: randomY });
        };

        const interval = setInterval(() => {
            if (mood === "playful" && Math.random() > 0.3) {
                moveCat();
            } else if (mood === "sleepy") {
                setIsSleeping(true);
            }

            // Random Blinking
            if (Math.random() > 0.7) {
                setIsBlinking(true);
                setTimeout(() => setIsBlinking(false), 200);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [isSleeping, mood, controls, position.x]);

    // Interaction
    const handlePet = () => {
        setMood("happy");
        setIsSleeping(false);
        controls.start({
            y: position.y - 10,
            transition: { repeat: 3, repeatType: "reverse", duration: 0.2 }
        }).then(() => {
            // Return to ground
            controls.start({ y: position.y });
        });
    };

    // Follow Mouse (Simplistic "Laser Pointer" effect if close)
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Logic to chase cursor if close would go here
            // For now, let's keep it simple: wandering
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Entrance Animation
    useEffect(() => {
        controls.start({ scale: 1, transition: { duration: 0.5 } });
    }, [controls]);

    return (
        <motion.div
            className="absolute bottom-10 left-10 cursor-pointer z-50 pointer-events-auto"
            animate={controls}
            initial={{ x: 0, y: 0 }} // Removed scale: 0 to fix disappearance bug
            drag
            dragConstraints={constraintsRef}
            onClick={handlePet}
            style={{
                scaleX: direction,
            }}
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }} // Scale applied to inner Child
                transition={{ duration: 0.3 }}
            >
                {mood === "happy" && (
                    <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: -20 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-4 left-1/2 -translate-x-1/2 text-pink-500 font-bold text-xs"
                    >
                        ♥ Purr...
                    </motion.div>
                )}
                <SkeletalCat />
            </motion.div>
        </motion.div>
    );
}
