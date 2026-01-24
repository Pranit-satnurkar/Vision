
export const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 100 } },
} as const;

export const STAGGER_CHILD_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", damping: 20, stiffness: 100 } },
} as const;

export const HOVER_SCALE_VARIANTS = {
    hover: { scale: 1.05, transition: { type: "spring", damping: 10, stiffness: 200 } },
} as const;
