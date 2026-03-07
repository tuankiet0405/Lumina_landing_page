// ============================================
// LUMINA — Shared Animation Constants
// Reference: Design Guideline §5
// ============================================

// Shared Element Transition (Gallery ↔ Modal)
// Spring physics for natural, organic feel
export const sharedTransition = {
    type: "spring",
    stiffness: 200,
    damping: 20,
};

// Scroll Reveal (whileInView animations)
// Ease-out curve for smooth appearance
export const scrollRevealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export const slideInLeftVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export const slideInRightVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

// Staggered Text (Hero section)
// Words slide up one after another
export const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

export const staggerChild = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

// Hover States — fast, responsive
export const hoverTransition = {
    duration: 0.2,
    ease: "easeInOut",
};

// Custom Cursor — smooth follow
export const cursorTransition = {
    type: "spring",
    stiffness: 500,
    damping: 28,
    mass: 0.5,
};

// Backdrop (modal overlay)
export const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

// Detail info slide-up (inside modal)
export const infoSlideUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.2,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: { duration: 0.2 },
    },
};

// Pricing cards stagger
export const cardStaggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

export const cardStaggerChild = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

// Filter button layout transition
export const filterLayoutTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
};
