import { useState } from 'react';
import { motion } from 'framer-motion';
import { pricingPlans } from '../data/pricing';
import { scrollRevealVariants, cardStaggerContainer, cardStaggerChild, hoverTransition } from '../lib/animations';
import { useMagnetic } from '../hooks/useAnimations';

function MagneticButton({ children, className, highlighted }) {
    const { ref, position } = useMagnetic(0.3);

    return (
        <motion.button
            ref={ref}
            className={className}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            whileTap={{ scale: 0.97 }}
        >
            {children}
        </motion.button>
    );
}

export default function Pricing() {
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <section id="services" className="py-16 md:py-24 lg:py-32 px-4 sm:px-6">
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
                        Services & Packages
                    </h2>
                    <p className="font-body text-sm text-lumina-muted tracking-[0.2em] uppercase">
                        Tailored to your vision
                    </p>
                </motion.div>

                {/* Pricing cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
                    variants={cardStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {pricingPlans.map((plan) => (
                        <motion.div
                            key={plan.id}
                            variants={cardStaggerChild}
                            className={`
                relative p-8 lg:p-10 rounded-sm transition-all duration-300 overflow-hidden
                ${plan.highlighted
                                    ? 'bg-lumina-contrast text-lumina-contrast-text scale-[1.02] lg:scale-105 shadow-2xl'
                                    : 'bg-lumina-surface text-lumina-text border border-lumina-muted/20'
                                }
              `}
                            whileHover={{
                                scale: plan.highlighted ? 1.07 : 1.05,
                                transition: hoverTransition,
                            }}
                            onMouseEnter={() => setHoveredId(plan.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Animated gradient border — spins on hover */}
                            {hoveredId === plan.id && !plan.highlighted && (
                                <motion.div
                                    className="absolute -inset-[1px] rounded-sm"
                                    initial={{ opacity: 0, rotate: 0 }}
                                    animate={{ opacity: 1, rotate: 360 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ rotate: { duration: 3, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.3 } }}
                                    style={{
                                        background: 'conic-gradient(from 0deg, #D4AF37, transparent 40%, transparent 60%, #D4AF37)',
                                        zIndex: 0,
                                    }}
                                />
                            )}
                            {/* Inner background to cover gradient border */}
                            {hoveredId === plan.id && !plan.highlighted && (
                                <div className="absolute inset-[1px] bg-lumina-surface rounded-sm z-0" />
                            )}

                            {/* Content (above gradient border) */}
                            <div className="relative z-10">
                                {/* Popular badge */}
                                {plan.highlighted && (
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-4 py-1 bg-lumina-accent text-lumina-bg text-[10px] font-body font-semibold tracking-[0.2em] uppercase rounded-sm">
                                        Most Popular
                                    </div>
                                )}

                                {/* Icon */}
                                <div className="text-3xl mb-6">{plan.icon}</div>

                                {/* Name */}
                                <h3 className={`font-heading text-2xl mb-2 ${plan.highlighted ? 'text-lumina-contrast-text' : 'text-lumina-text'}`}>
                                    {plan.name}
                                </h3>

                                {/* Description */}
                                <p className={`font-body text-sm mb-6 leading-relaxed ${plan.highlighted ? 'text-lumina-contrast-text/70' : 'text-lumina-muted'}`}>
                                    {plan.description}
                                </p>

                                {/* Price */}
                                <div className="mb-8">
                                    <span className={`font-heading text-4xl lg:text-5xl ${plan.highlighted ? 'text-lumina-contrast-text' : 'text-lumina-text'}`}>
                                        {plan.price}
                                    </span>
                                    <span className={`font-body text-sm ml-2 ${plan.highlighted ? 'text-lumina-contrast-text/50' : 'text-lumina-muted'}`}>
                                        / session
                                    </span>
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                stroke={plan.highlighted ? '#D4AF37' : '#A3A3A3'}
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            <span className={`font-body text-sm ${plan.highlighted ? 'text-lumina-contrast-text/80' : 'text-lumina-muted'}`}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Magnetic CTA button */}
                                <MagneticButton
                                    highlighted={plan.highlighted}
                                    className={`
                    w-full py-3 font-body text-xs tracking-[0.2em] uppercase border rounded-sm transition-all duration-200 cursor-pointer
                    ${plan.highlighted
                                            ? 'border-lumina-contrast-text text-lumina-contrast-text hover:bg-lumina-contrast-text hover:text-lumina-contrast'
                                            : 'border-lumina-muted text-lumina-muted hover:border-lumina-text hover:text-lumina-text hover:bg-white/5'
                                        }
                  `}
                                >
                                    Get Started
                                </MagneticButton>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
