import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * useCounter — Animate a number counting up from 0 to target
 * Used in About section stats
 */
export function useCounter(target, duration = 2000) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isInView || hasAnimated.current) return;
        hasAnimated.current = true;

        const startTime = Date.now();
        const numericTarget = parseInt(target);

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * numericTarget));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, target, duration]);

    return { count, ref };
}

/**
 * useTextScramble — Decode text character by character
 * Used in Hero section title
 */
export function useTextScramble(text, trigger = true, speed = 30) {
    const [displayText, setDisplayText] = useState('');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

    useEffect(() => {
        if (!trigger) return;

        let iteration = 0;
        const totalIterations = text.length * 3;

        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split('')
                    .map((char, index) => {
                        if (char === ' ') return ' ';
                        if (index < iteration / 3) return text[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );

            iteration++;
            if (iteration > totalIterations) {
                setDisplayText(text);
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, trigger, speed]);

    return displayText;
}

/**
 * useMagnetic — Make an element "pull" toward cursor position
 * Used on buttons
 */
export function useMagnetic(strength = 0.3) {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleMouseMove = (e) => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distX = (e.clientX - centerX) * strength;
            const distY = (e.clientY - centerY) * strength;
            setPosition({ x: distX, y: distY });
        };

        const handleMouseLeave = () => {
            setPosition({ x: 0, y: 0 });
        };

        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            el.removeEventListener('mousemove', handleMouseMove);
            el.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);

    return { ref, position };
}
