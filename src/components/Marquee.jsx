import { motion } from 'framer-motion';

const items = [
    "LANDSCAPE", "•", "PORTRAIT", "•", "STREET", "•",
    "EDITORIAL", "•", "FINE ART", "•", "COMMERCIAL", "•",
    "LANDSCAPE", "•", "PORTRAIT", "•", "STREET", "•",
    "EDITORIAL", "•", "FINE ART", "•", "COMMERCIAL", "•",
];

export default function Marquee() {
    return (
        <div className="py-8 md:py-12 overflow-hidden border-y border-lumina-muted/10">
            <motion.div
                className="flex whitespace-nowrap gap-8"
                animate={{ x: [0, -1920] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 25,
                        ease: "linear",
                    },
                }}
            >
                {items.map((item, i) => (
                    <span
                        key={i}
                        className={`
              font-body text-sm md:text-base tracking-[0.3em] uppercase shrink-0
              ${item === '•' ? 'text-lumina-accent' : 'text-lumina-muted/60'}
            `}
                    >
                        {item}
                    </span>
                ))}
                {/* Duplicate for seamless loop */}
                {items.map((item, i) => (
                    <span
                        key={`dup-${i}`}
                        className={`
              font-body text-sm md:text-base tracking-[0.3em] uppercase shrink-0
              ${item === '•' ? 'text-lumina-accent' : 'text-lumina-muted/60'}
            `}
                    >
                        {item}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
