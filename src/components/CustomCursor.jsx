import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { cursorTransition } from '../lib/animations';

export default function CustomCursor() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const { cursorVariant, cursorText } = useCursor();

    useEffect(() => {
        // Detect touch device
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        setIsTouchDevice(isTouch);
        if (isTouch) return;

        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    if (isTouchDevice) return null;

    const variants = {
        default: {
            width: 8,
            height: 8,
            x: mousePos.x - 4,
            y: mousePos.y - 4,
            backgroundColor: "#F5F5F5",
            mixBlendMode: "difference",
        },
        image: {
            width: 80,
            height: 80,
            x: mousePos.x - 40,
            y: mousePos.y - 40,
            backgroundColor: "rgba(212, 175, 55, 0.9)",
            mixBlendMode: "normal",
        },
        button: {
            width: 50,
            height: 50,
            x: mousePos.x - 25,
            y: mousePos.y - 25,
            backgroundColor: "rgba(245, 245, 245, 0.9)",
            mixBlendMode: "normal",
        },
    };

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center"
            variants={variants}
            animate={cursorVariant}
            transition={cursorTransition}
            style={{ opacity: isVisible ? 1 : 0 }}
        >
            {cursorText && (
                <span
                    className="text-[10px] font-body font-semibold tracking-widest uppercase"
                    style={{
                        color: cursorVariant === 'button' ? '#171717' : '#0A0A0A',
                    }}
                >
                    {cursorText}
                </span>
            )}
        </motion.div>
    );
}
