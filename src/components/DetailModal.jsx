import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { sharedTransition, backdropVariants, infoSlideUpVariants } from '../lib/animations';

export default function DetailModal({ image, layoutId, onClose }) {
    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                variants={backdropVariants}
                onClick={onClose}
            />

            {/* Content container */}
            <div
                className="relative z-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-10 max-w-5xl w-full max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Image — shared element */}
                <motion.div
                    layoutId={layoutId}
                    transition={sharedTransition}
                    className="flex-shrink-0 w-full lg:w-3/5 rounded-md overflow-hidden"
                >
                    <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-auto max-h-[60vh] lg:max-h-[75vh] object-cover rounded-md"
                    />
                </motion.div>

                {/* Info panel — slide up */}
                <motion.div
                    className="w-full lg:w-2/5 text-left"
                    variants={infoSlideUpVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-lumina-text mb-3">
                        {image.title}
                    </h2>

                    <div className="flex items-center gap-2 mb-4">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-lumina-accent">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span className="font-body text-sm text-lumina-muted">{image.location}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-6">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-lumina-accent">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                            <circle cx="12" cy="13" r="4" />
                        </svg>
                        <span className="font-body text-xs text-lumina-muted tracking-wide">{image.camera}</span>
                    </div>

                    <p className="font-body text-sm sm:text-base text-lumina-muted leading-relaxed mb-8">
                        {image.description}
                    </p>

                    {/* Close button */}
                    <motion.button
                        onClick={onClose}
                        className="inline-flex items-center gap-2 px-6 py-3 border border-lumina-muted text-lumina-text font-body text-xs tracking-[0.2em] uppercase
                       hover:border-lumina-text hover:bg-white/10 transition-all duration-200 rounded-sm cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Close
                    </motion.button>
                </motion.div>

                {/* X button — top right */}
                <motion.button
                    className="absolute -top-2 -right-2 sm:top-0 sm:right-0 w-10 h-10 flex items-center justify-center text-lumina-muted hover:text-lumina-text transition-colors duration-200 cursor-pointer"
                    onClick={onClose}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </motion.button>
            </div>
        </motion.div>
    );
}
