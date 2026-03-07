import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const navLinks = [
    { label: 'Works', href: '#works' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        // Hide on scroll down, show on scroll up
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 50);
    });

    return (
        <motion.nav
            className={`
        fixed top-0 left-0 right-0 z-40 px-6 py-4 transition-colors duration-300
        ${scrolled ? 'bg-lumina-bg/80 backdrop-blur-md border-b border-lumina-muted/10' : 'bg-transparent'}
      `}
            initial={{ y: 0 }}
            animate={{ y: hidden ? -100 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <motion.a
                    href="#"
                    className="font-heading text-xl text-lumina-text"
                    whileHover={{ scale: 1.05 }}
                >
                    Lumina
                </motion.a>

                {/* Links */}
                <div className="hidden sm:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="group relative font-body text-xs tracking-[0.2em] uppercase text-lumina-muted hover:text-lumina-text transition-colors duration-200"
                        >
                            {link.label}
                            {/* Underline slide animation */}
                            <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-lumina-accent group-hover:w-full transition-all duration-300 ease-out" />
                        </a>
                    ))}
                </div>

                {/* CTA */}
                <motion.a
                    href="#contact"
                    className="hidden sm:inline-block px-5 py-2 border border-lumina-muted/50 font-body text-xs tracking-[0.2em] uppercase text-lumina-muted hover:border-lumina-text hover:text-lumina-text hover:bg-white/5 transition-all duration-200 rounded-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Book Now
                </motion.a>

                {/* Mobile menu button */}
                <button className="sm:hidden text-lumina-muted hover:text-lumina-text transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
            </div>
        </motion.nav>
    );
}
