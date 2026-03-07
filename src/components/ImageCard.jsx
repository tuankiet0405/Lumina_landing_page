import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { hoverTransition } from '../lib/animations';

export default function ImageCard({ image, layoutId, onClick }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const ref = useRef(null);

    return (
        <motion.div
            ref={ref}
            layoutId={layoutId}
            onClick={onClick}
            className="relative overflow-hidden rounded-md group cursor-pointer"
            whileHover={{ scale: 1.03 }}
            transition={hoverTransition}
        >
            {/* Shimmer placeholder */}
            {!imageLoaded && (
                <div className="absolute inset-0 bg-lumina-surface animate-pulse" />
            )}

            <motion.img
                src={image.url}
                alt={image.title}
                className={`w-full h-64 sm:h-72 md:h-80 object-cover transition-all duration-700 group-hover:brightness-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                // Subtle parallax on hover (image shifts opposite to mouse)
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Title on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="font-heading text-lg text-lumina-text">{image.title}</h3>
                <p className="font-body text-xs text-lumina-muted tracking-wide">{image.location}</p>
            </div>
        </motion.div>
    );
}
