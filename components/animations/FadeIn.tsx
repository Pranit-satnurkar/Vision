"use client";

import { motion } from "framer-motion";
import { FADE_UP_ANIMATION_VARIANTS } from "@/lib/animations";

export default function FadeIn({
    children,
    className,
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                ...FADE_UP_ANIMATION_VARIANTS,
                show: {
                    ...FADE_UP_ANIMATION_VARIANTS.show,
                    transition: { ...FADE_UP_ANIMATION_VARIANTS.show.transition, delay },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
