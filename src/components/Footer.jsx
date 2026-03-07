const socialLinks = [
    { name: 'Instagram', icon: '📸', href: '#' },
    { name: 'Twitter', icon: '𝕏', href: '#' },
    { name: 'YouTube', icon: '▶', href: '#' },
    { name: 'Behance', icon: '🅱', href: '#' },
];

const navLinks = ['Works', 'About', 'Services', 'Contact'];

export default function Footer() {
    return (
        <footer className="bg-lumina-surface py-12 md:py-16 px-4 sm:px-6 border-t border-lumina-muted/10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-12">
                    {/* Brand */}
                    <div>
                        <h3 className="font-heading text-2xl text-lumina-text mb-3">Lumina</h3>
                        <p className="font-body text-sm text-lumina-muted leading-relaxed">
                            Capturing the unseen beauty of our world through the art of photography.
                        </p>
                    </div>

                    {/* Navigation — underline slide links */}
                    <div>
                        <p className="font-body text-xs tracking-[0.2em] uppercase text-lumina-muted mb-4">
                            Navigation
                        </p>
                        <ul className="space-y-2">
                            {navLinks.map((link) => (
                                <li key={link}>
                                    <a
                                        href={`#${link.toLowerCase()}`}
                                        className="group relative inline-block font-body text-sm text-lumina-muted hover:text-lumina-text transition-colors duration-200"
                                    >
                                        {link}
                                        {/* Underline slide left → right */}
                                        <span className="absolute left-0 -bottom-0.5 h-[1px] w-0 bg-lumina-accent group-hover:w-full transition-all duration-300 ease-out" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <p className="font-body text-xs tracking-[0.2em] uppercase text-lumina-muted mb-4">
                            Follow
                        </p>
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="w-10 h-10 flex items-center justify-center border border-lumina-muted/30 rounded-sm text-lumina-muted hover:border-lumina-accent hover:text-lumina-accent hover:bg-lumina-accent/5 transition-all duration-300 text-sm"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-lumina-muted/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-body text-xs text-lumina-muted">
                        © 2026 Lumina. All rights reserved.
                    </p>
                    <p className="font-body text-xs text-lumina-muted/50">
                        Made with React & Framer Motion
                    </p>
                </div>
            </div>
        </footer>
    );
}
