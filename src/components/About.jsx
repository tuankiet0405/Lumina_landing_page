import { motion } from 'framer-motion';
import { slideInLeftVariants, slideInRightVariants } from '../lib/animations';
import { useCounter } from '../hooks/useAnimations';

function StatItem({ number, label }) {
    const { count, ref } = useCounter(number, 2000);
    const suffix = number.toString().includes('+') ? '+' : '';

    return (
        <div ref={ref} className="text-center lg:text-left">
            <p className="font-heading text-2xl sm:text-3xl text-lumina-accent mb-1">
                {count}{suffix}
            </p>
            <p className="font-body text-xs text-lumina-muted tracking-wider uppercase">
                {label}
            </p>
        </div>
    );
}

export default function About() {
    return (
        <section id="about" className="py-16 md:py-24 lg:py-32 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                    {/* Image — clip-path mask reveal */}
                    <motion.div
                        className="lg:col-span-5"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <div className="relative overflow-hidden">
                            <motion.div
                                variants={{
                                    hidden: { clipPath: 'inset(0 100% 0 0)' },
                                    visible: {
                                        clipPath: 'inset(0 0% 0 0)',
                                        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                                    },
                                }}
                            >
                                <img
                                    src="/images/photographer_portrait.png"
                                    alt="Photographer"
                                    className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover rounded-md"
                                />
                            </motion.div>
                            {/* Accent border overlay */}
                            <motion.div
                                className="absolute -bottom-4 -right-4 w-full h-full border border-lumina-accent/30 rounded-md -z-10"
                                variants={slideInLeftVariants}
                            />
                        </div>
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        className="lg:col-span-7"
                        variants={slideInRightVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <p className="font-body text-xs tracking-[0.3em] uppercase text-lumina-accent mb-4">
                            Behind the Lens
                        </p>

                        <h2 className="font-heading text-4xl sm:text-5xl md:text-[48px] text-lumina-text mb-6 lg:mb-8 leading-tight">
                            Where Light
                            <br />
                            Meets Story
                        </h2>

                        <p className="font-body text-base sm:text-lg text-lumina-muted leading-relaxed mb-6">
                            For over a decade, I've traveled the world with one simple mission: to find beauty in the
                            overlooked and poetry in the ordinary. Each photograph is not just an image — it's a
                            moment preserved, a feeling crystallized, a story waiting to be told.
                        </p>

                        <p className="font-body text-base sm:text-lg text-lumina-muted leading-relaxed mb-8">
                            My work sits at the intersection of fine art and documentary photography. I believe the
                            most powerful images are the ones that make you feel something before you even understand
                            what you're looking at.
                        </p>

                        {/* Stats with counter animation */}
                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-lumina-muted/20">
                            <StatItem number="12" label="Years Experience" />
                            <StatItem number="40" label="Countries" />
                            <StatItem number="200" label="Projects" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
