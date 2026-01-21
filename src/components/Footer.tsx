import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Twitter,
    Instagram,
    Youtube,
    ArrowUpRight
} from 'lucide-react';

const footerLinks = {
    company: [
        { name: 'About Us', path: '/about' },
        { name: 'Our Dentists', path: '/dentists' },
        { name: 'Testimonials', path: '/#testimonials' },
        { name: 'Contact', path: '/contact' },
    ],
    resources: [
        { name: 'FAQ', path: '/faq' },
        { name: 'Event Details', path: '/about' },
        { name: 'CE Credits', path: '/about#ce-credits' },
        { name: 'Past Events', path: '/about#past-events' },
    ],
    legal: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Refund Policy', path: '/refund' },
        { name: 'Cookie Policy', path: '/cookies' },
    ],
};

const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-text-primary text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">D</span>
                            </div>
                            <span className="font-display font-semibold text-2xl">
                                DentalMasters
                            </span>
                        </Link>
                        <p className="text-text-muted mb-6 max-w-sm">
                            Premium dental education from the world's leading practitioners.
                            Join our 12-hour masterclass and transform your practice.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <a
                                href="mailto:info@dentalmasters.com"
                                className="flex items-center gap-3 text-text-muted hover:text-white transition-colors"
                            >
                                <Mail className="w-5 h-5 text-primary-400" />
                                info@dentalmasters.com
                            </a>
                            <a
                                href="tel:+1-800-DENTIST"
                                className="flex items-center gap-3 text-text-muted hover:text-white transition-colors"
                            >
                                <Phone className="w-5 h-5 text-primary-400" />
                                +1-800-DENTIST
                            </a>
                            <div className="flex items-start gap-3 text-text-muted">
                                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                                <span>123 Medical Center Drive, Boston, MA 02115</span>
                            </div>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-text-muted hover:text-white transition-colors inline-flex items-center gap-1 group"
                                    >
                                        {link.name}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-text-muted hover:text-white transition-colors inline-flex items-center gap-1 group"
                                    >
                                        {link.name}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-text-muted hover:text-white transition-colors inline-flex items-center gap-1 group"
                                    >
                                        {link.name}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-text-muted text-sm">
                            © {currentYear} DentalMasters. All rights reserved.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5 text-text-muted" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
