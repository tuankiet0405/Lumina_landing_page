import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { images } from '../data/images';
import ImageCard from './ImageCard';
import DetailModal from './DetailModal';
import { scrollRevealVariants, filterLayoutTransition } from '../lib/animations';

const categories = ["All", "Landscape", "Portrait", "Street"];

export default function Gallery() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [selectedId, setSelectedId] = useState(null);

    const filteredImages = activeFilter === "All"
        ? images
        : images.filter(img => img.category === activeFilter.toLowerCase());

    const selectedImage = images.find(img => img.id === selectedId);

    return (
        <section id="works" className="py-16 md:py-24 lg:py-32 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section title */}
                <motion.div
                    className="text-center mb-12 md:mb-16"
                    variants={scrollRevealVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="font-heading text-4xl sm:text-5xl md:text-[48px] text-lumina-text mb-4">
                        Works
                    </h2>
                    <p className="font-body text-sm text-lumina-muted tracking-[0.2em] uppercase">
                        A curated collection of moments
                    </p>
                </motion.div>

                {/* Filter buttons — ghost style with letter-spacing hover */}
                <motion.div
                    className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 md:mb-14"
                    variants={scrollRevealVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {categories.map((cat) => (
                        <motion.button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`
                px-5 py-2 font-body text-xs uppercase transition-all duration-200 rounded-sm border cursor-pointer
                ${activeFilter === cat
                                    ? 'border-lumina-accent text-lumina-accent tracking-[0.3em]'
                                    : 'border-lumina-muted/50 text-lumina-muted tracking-[0.2em] hover:border-lumina-text hover:text-lumina-text hover:bg-white/5 hover:tracking-[0.3em]'
                                }
              `}
                            whileTap={{ scale: 0.95 }}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Image grid — staggered reveal */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredImages.map((image, index) => (
                            <motion.div
                                key={image.id}
                                layout
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        ...filterLayoutTransition,
                                        delay: index * 0.08, // Staggered reveal
                                    },
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.9,
                                    transition: { duration: 0.2 },
                                }}
                            >
                                <ImageCard
                                    image={image}
                                    layoutId={`image-${image.id}`}
                                    onClick={() => setSelectedId(image.id)}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Detail modal */}
                <AnimatePresence>
                    {selectedImage && (
                        <DetailModal
                            image={selectedImage}
                            layoutId={`image-${selectedImage.id}`}
                            onClose={() => setSelectedId(null)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
