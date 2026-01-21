import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Linkedin,
    Twitter,
    BookOpen,
    Award,
    GraduationCap,
    Play,
    ArrowRight
} from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import { dentistsApi } from '../lib/api';
import { dentists as mockDentists } from '../data/mockData';
import { useApi } from '../hooks/useApi';

export default function Dentists() {
    const location = useLocation();

    // Fetch dentists from API with mock fallback
    const { data: dentistsData } = useApi(() => dentistsApi.getAll(), { initialData: mockDentists });
    const dentists = dentistsData || mockDentists;

    useEffect(() => {
        // Scroll to dentist if hash is present
        if (location.hash) {
            const element = document.getElementById(location.hash.slice(1));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }, [location]);

    return (
        <main className="pt-24">
            {/* Hero Section */}
            <section className="bg-gradient-hero section-padding pb-12">
                <div className="max-w-7xl mx-auto text-center">
                    <AnimatedSection>
                        <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
                            Our Expert Speakers
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                            Meet the World's Top 5 Dentists
                        </h1>
                        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                            Learn from pioneers who have shaped modern dentistry. Each speaker brings
                            decades of experience and groundbreaking research to our masterclass.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Dentist Profiles */}
            <section className="section-padding bg-white">
                <div className="max-w-6xl mx-auto">
                    <StaggerContainer className="flex flex-col gap-24">
                        {dentists.map((dentist, index) => (
                            <StaggerItem key={dentist.id}>
                                <motion.article
                                    id={dentist.id}
                                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                        }`}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    {/* Image Section */}
                                    <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                        <div className="relative group">
                                            <motion.div
                                                className="relative overflow-hidden rounded-3xl shadow-xl"
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <img
                                                    src={dentist.profileImageUrl}
                                                    alt={dentist.name}
                                                    className="w-full aspect-[4/5] object-cover"
                                                />
                                                {/* Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-text-primary/60 via-transparent to-transparent" />

                                                {/* Play button for video (if available) */}
                                                {dentist.videoIntroUrl && (
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:bg-white transition-colors"
                                                    >
                                                        <Play className="w-8 h-8 text-primary-600 ml-1" />
                                                    </motion.button>
                                                )}

                                                {/* Name Badge */}
                                                <div className="absolute bottom-6 left-6 right-6">
                                                    <h2 className="text-2xl font-bold text-white mb-1">
                                                        {dentist.name}
                                                    </h2>
                                                    <p className="text-white/80">{dentist.credentials}</p>
                                                </div>
                                            </motion.div>

                                            {/* Floating badges */}
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="absolute -right-4 top-8 bg-white rounded-xl shadow-lg p-4"
                                            >
                                                <div className="text-center">
                                                    <span className="text-2xl font-bold text-primary-600">{dentist.yearsExperience}+</span>
                                                    <p className="text-xs text-text-secondary">Years Exp.</p>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                        {/* Specialty Badge */}
                                        <span className="inline-block bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                                            {dentist.specialty}
                                        </span>

                                        {/* Institution */}
                                        <div className="flex items-center gap-2 text-text-secondary mb-4">
                                            <GraduationCap className="w-5 h-5 text-primary-500" />
                                            <span>{dentist.institution}</span>
                                        </div>

                                        {/* Biography */}
                                        <p className="text-text-secondary text-lg leading-relaxed mb-6">
                                            {dentist.biography}
                                        </p>

                                        {/* Achievements */}
                                        <div className="mb-6">
                                            <h4 className="flex items-center gap-2 font-semibold text-text-primary mb-3">
                                                <Award className="w-5 h-5 text-secondary-500" />
                                                Key Achievements
                                            </h4>
                                            <ul className="space-y-2">
                                                {dentist.achievements.map((achievement, i) => (
                                                    <motion.li
                                                        key={i}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        className="flex items-start gap-2 text-text-secondary"
                                                    >
                                                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                                                        {achievement}
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Topics Covered */}
                                        <div className="mb-6">
                                            <h4 className="flex items-center gap-2 font-semibold text-text-primary mb-3">
                                                <BookOpen className="w-5 h-5 text-accent-500" />
                                                Topics in This Masterclass
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {dentist.topicsCovered.map((topic) => (
                                                    <span
                                                        key={topic}
                                                        className="bg-background px-3 py-1.5 rounded-lg text-sm text-text-secondary border border-border"
                                                    >
                                                        {topic}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Social Links */}
                                        <div className="flex items-center gap-3">
                                            {dentist.socialLinks.linkedin && (
                                                <motion.a
                                                    href={dentist.socialLinks.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center hover:bg-primary-100 transition-colors"
                                                >
                                                    <Linkedin className="w-5 h-5 text-primary-600" />
                                                </motion.a>
                                            )}
                                            {dentist.socialLinks.twitter && (
                                                <motion.a
                                                    href={dentist.socialLinks.twitter}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center hover:bg-primary-100 transition-colors"
                                                >
                                                    <Twitter className="w-5 h-5 text-primary-600" />
                                                </motion.a>
                                            )}
                                        </div>
                                    </div>
                                </motion.article>

                                {/* Divider */}
                                {index < dentists.length - 1 && (
                                    <div className="border-t border-border mt-12" />
                                )}
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-gradient-to-br from-primary-600 to-accent-700 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <AnimatedSection>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Learn Directly from These Experts
                        </h2>
                        <p className="text-primary-100 text-lg mb-8">
                            Don't miss this unique opportunity to learn from 5 world-renowned
                            dental specialists in one comprehensive masterclass.
                        </p>
                        <Link to="/register">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                            >
                                Register for $499
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </Link>
                    </AnimatedSection>
                </div>
            </section>
        </main>
    );
}
