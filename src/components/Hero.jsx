import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { staggerContainer, staggerChild } from '../lib/animations';
import { useTextScramble } from '../hooks/useAnimations';

function AnimatedWord({ children }) {
    return (
        <span className="inline-block overflow-hidden">
            <motion.span
                className="inline-block"
                variants={staggerChild}
            >
                {children}
            </motion.span>
        </span>
    );
}

export default function Hero() {
    const ref = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const bgY = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    // Trigger text scramble after mount
    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const scrambledTitle = useTextScramble('LUMINA', loaded, 40);

    return (
        <section ref={ref} className="relative h-screen w-full overflow-hidden">
            {/* Background with parallax */}
            <motion.div
                className="absolute inset-0 w-full h-full"
                style={{ y: bgY }}
            >
                <img
                    src="/images/hero_background.png"
                    alt="Landscape"
                    className="w-full h-[120%] object-cover"
                />
            </motion.div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <motion.div
                className="relative z-10 h-full flex flex-col items-center justify-center px-4"
                style={{ y: textY, opacity }}
            >
                {/* Staggered title with text scramble */}
                <motion.div
                    className="text-center"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Scramble effect on LUMINA */}
                    <motion.h1
                        className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-[96px] font-medium tracking-tight text-lumina-text mb-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {scrambledTitle || '\u00A0'}
                    </motion.h1>

                    <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4">
                        {["Capturing", "the", "Unseen"].map((word, i) => (
                            <AnimatedWord key={i}>
                                <span className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-lumina-text/90 italic">
                                    {word}
                                </span>
                            </AnimatedWord>
                        ))}
                    </div>

                    <motion.p
                        className="mt-6 sm:mt-8 font-body text-sm sm:text-base tracking-[0.3em] uppercase text-lumina-muted"
                        variants={staggerChild}
                    >
                        Luxury Photography Portfolio
                    </motion.p>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 sm:bottom-12 flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                >
                    <span className="font-body text-xs tracking-[0.2em] uppercase text-lumina-muted">
                        Scroll Down
                    </span>
                    <motion.svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="text-lumina-muted"
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <path
                            d="M10 4L10 16M10 16L4 10M10 16L16 10"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </motion.svg>
                </motion.div>
            </motion.div>
        </section>
    );
}
