
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { History, Clock } from "lucide-react";
import { useState } from "react";
import bio from "@/data/bio.json";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function TimeTravelButton() {
    const [isTravelling, setIsTravelling] = useState(false);
    const oldPortfolioUrl = bio.socialLinks.portfolio;

    const handleTravel = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsTravelling(true);

        // Delay navigation for animation
        setTimeout(() => {
            window.location.href = oldPortfolioUrl;
        }, 1500);
    };

    return (
        <>
            {/* The Button */}
            <div className="fixed bottom-8 right-8 z-50">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                size="icon"
                                variant="outline"
                                className="h-12 w-12 rounded-full border-2 border-foreground/20 bg-background/80 backdrop-blur shadow-xl hover:border-foreground transition-all group"
                                onClick={handleTravel}
                            >
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="group-hover:animate-reverse-spin" // Speed up on hover maybe?
                                >
                                    <History className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
                                </motion.div>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="font-mono text-xs">
                            <p>Travel to v1.0 (Old Site)</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            {/* The Warp Effect Overlay */}
            <AnimatePresence>
                {isTravelling && (
                    <motion.div
                        initial={{ clipPath: "circle(0% at 100% 100%)" }}
                        animate={{ clipPath: "circle(150% at 100% 100%)" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "circIn" }}
                        className="fixed inset-0 z-[100] bg-foreground flex items-center justify-center"
                    >
                        <div className="text-center space-y-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Clock className="w-16 h-16 text-background mx-auto animate-spin-slow" />
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="text-background font-mono text-2xl font-bold uppercase tracking-[0.5em]"
                            >
                                Rewinding...
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.7 }}
                                transition={{ delay: 1 }}
                                className="text-background/70 font-mono text-sm"
                            >
                                Destination: 2023
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
