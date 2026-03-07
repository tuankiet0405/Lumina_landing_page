import { useState } from 'react';
import { motion } from 'framer-motion';
import { scrollRevealVariants } from '../lib/animations';
import { useMagnetic } from '../hooks/useAnimations';

function MagneticSubmitButton() {
    const { ref, position } = useMagnetic(0.25);

    return (
        <motion.button
            ref={ref}
            type="submit"
            className="px-10 py-4 border border-lumina-muted text-lumina-text font-body text-xs tracking-[0.2em] uppercase rounded-sm
                 hover:border-lumina-text hover:bg-white/10 transition-all duration-200 cursor-pointer"
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            whileTap={{ scale: 0.98 }}
        >
            Send Request
        </motion.button>
    );
}

export default function Contact() {
    const [focusedField, setFocusedField] = useState(null);

    const fields = [
        { id: 'name', label: 'Name', type: 'text' },
        { id: 'email', label: 'Email', type: 'email' },
    ];

    return (
        <section id="contact" className="py-16 md:py-24 lg:py-32 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
                {/* Section title */}
                <motion.div
                    className="text-center mb-12 md:mb-16"
                    variants={scrollRevealVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="font-heading text-4xl sm:text-5xl md:text-[48px] text-lumina-text mb-4">
                        Get in Touch
                    </h2>
                    <p className="font-body text-sm text-lumina-muted tracking-[0.2em] uppercase">
                        Let's create something extraordinary
                    </p>
                </motion.div>

                {/* Form */}
                <motion.form
                    className="space-y-8"
                    variants={scrollRevealVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {fields.map((field) => (
                            <div key={field.id} className="relative">
                                <label
                                    htmlFor={field.id}
                                    className={`
                    font-body text-xs tracking-[0.15em] uppercase transition-all duration-300
                    ${focusedField === field.id ? 'text-lumina-accent' : 'text-lumina-muted'}
                  `}
                                >
                                    {field.label}
                                </label>
                                <input
                                    id={field.id}
                                    type={field.type}
                                    className="w-full bg-transparent font-body text-base text-lumina-text py-3 border-b border-lumina-muted/50 focus:outline-none transition-all duration-300"
                                    style={{
                                        borderBottomColor: focusedField === field.id ? '#D4AF37' : undefined,
                                    }}
                                    onFocus={() => setFocusedField(field.id)}
                                    onBlur={() => setFocusedField(null)}
                                />
                                {/* Animated underline */}
                                <motion.div
                                    className="absolute bottom-0 left-0 h-[1px] bg-lumina-accent"
                                    initial={{ width: '0%' }}
                                    animate={{ width: focusedField === field.id ? '100%' : '0%' }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                />
                                {/* Focus pulse glow */}
                                {focusedField === field.id && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-[2px]"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                        style={{
                                            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                                            filter: 'blur(2px)',
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Message */}
                    <div className="relative">
                        <label
                            htmlFor="message"
                            className={`
                font-body text-xs tracking-[0.15em] uppercase transition-all duration-300
                ${focusedField === 'message' ? 'text-lumina-accent' : 'text-lumina-muted'}
              `}
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows={4}
                            className="w-full bg-transparent font-body text-base text-lumina-text py-3 border-b border-lumina-muted/50 focus:outline-none resize-none transition-all duration-300"
                            style={{
                                borderBottomColor: focusedField === 'message' ? '#D4AF37' : undefined,
                            }}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                        />
                        <motion.div
                            className="absolute bottom-0 left-0 h-[1px] bg-lumina-accent"
                            initial={{ width: '0%' }}
                            animate={{ width: focusedField === 'message' ? '100%' : '0%' }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        />
                        {focusedField === 'message' && (
                            <motion.div
                                className="absolute bottom-0 left-0 right-0 h-[2px]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0.3, 0.8, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                style={{
                                    background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                                    filter: 'blur(2px)',
                                }}
                            />
                        )}
                    </div>

                    {/* Magnetic submit button */}
                    <MagneticSubmitButton />
                </motion.form>
            </div>
        </section>
    );
}
