"use client";

import { motion } from "framer-motion";
import { STAGGER_CHILD_VARIANTS } from "@/lib/animations";

export default function Stagger({
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
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: 0.1,
                        delayChildren: delay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div variants={STAGGER_CHILD_VARIANTS} className={className}>
            {children}
        </motion.div>
    );
}
