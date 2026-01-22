import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Play,
    Clock,
    Users,
    Award,
    Video,
    MessageCircle,
    FileCheck,
    Calendar,
    Globe,
    ChevronDown
} from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import CountdownTimer from '../components/CountdownTimer';
import TestimonialCarousel from '../components/TestimonialCarousel';
import DentistCard from '../components/DentistCard';
import FloatingTooth, { FloatingPlus } from '../components/DentalAnimations';
// Import both API and mock data for fallback
import { dentistsApi, eventsApi, reviewsApi } from '../lib/api';
import { dentists as mockDentists, upcomingEvent as mockEvent, reviews as mockReviews } from '../data/mockData';
import { formatDate } from '../lib/utils';
import { useApi } from '../hooks/useApi';

// Hero section highlights
const heroStats = [
    { value: '5', label: 'World-Class Dentists' },
    { value: '12h', label: 'Intensive Training' },
    { value: '5000+', label: 'Dentists Trained' },
    { value: '4.9', label: 'Average Rating' },
];

// Feature highlights
const highlights = [
    {
        icon: Clock,
        title: '12 Hours of Live Instruction',
        description: 'Comprehensive training covering the latest techniques and technologies in modern dentistry.',
    },
    {
        icon: MessageCircle,
        title: 'Interactive Q&A Sessions',
        description: 'Direct access to ask questions and get personalized answers from our expert speakers.',
    },
    {
        icon: Award,
        title: 'Certificate of Completion',
        description: 'Receive a professional certificate and CE credits upon completing the masterclass.',
    },
    {
        icon: Users,
        title: 'Networking Opportunities',
        description: 'Connect with fellow dental professionals and expand your professional network.',
    },
    {
        icon: Video,
        title: 'Recorded Session Access',
        description: 'Full access to recordings for 6 months after the event for review at your pace.',
    },
    {
        icon: FileCheck,
        title: 'Workshop Materials',
        description: 'Comprehensive course materials, guides, and templates to implement what you learn.',
    },
];

export default function Home() {
    // Fetch data from API with mock fallback
    const { data: dentistsData } = useApi(() => dentistsApi.getAll(), { initialData: mockDentists });
    const { data: eventData } = useApi(() => eventsApi.getUpcoming(), { initialData: mockEvent });
    const { data: reviewsData } = useApi(() => reviewsApi.getFeatured(), { initialData: mockReviews });

    // Use API data or fallback to mock data
    const dentists = dentistsData || mockDentists;
    const upcomingEvent = eventData || mockEvent;
    const reviews = reviewsData || mockReviews;

    return (
        <main className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center bg-gradient-hero">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl"
                        animate={{
                            x: [0, 50, 0],
                            y: [0, 30, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200/30 rounded-full blur-3xl"
                        animate={{
                            x: [0, -30, 0],
                            y: [0, -50, 0],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-200/20 rounded-full blur-3xl"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Floating dental elements */}
                    <FloatingTooth className="absolute top-32 right-[15%] text-primary-400" size={55} delay={0} />
                    <FloatingTooth className="absolute top-[40%] left-[8%] text-accent-400" size={40} delay={1.5} />
                    <FloatingTooth className="absolute bottom-[25%] right-[10%] text-secondary-400" size={50} delay={2.5} />
                    <FloatingTooth className="absolute top-[20%] left-[20%] text-primary-300" size={35} delay={3} />
                    <FloatingTooth className="absolute bottom-[35%] left-[5%] text-primary-200" size={30} delay={4} />

                    {/* Medical plus signs */}
                    <FloatingPlus className="absolute top-[30%] right-[20%] text-primary-300" delay={1} />
                    <FloatingPlus className="absolute bottom-[40%] left-[25%] text-accent-300" delay={2.5} />
                    <FloatingPlus className="absolute top-[60%] right-[25%] text-secondary-300" delay={3.5} />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                    <div className="text-center">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary-200 rounded-full px-4 py-2 mb-8"
                        >
                            <span className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-text-secondary">
                                Next Event: {formatDate(upcomingEvent.date)}
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
                        >
                            Learn from the{' '}
                            <span className="text-gradient">World's Top 5</span>
                            <br />
                            <span className="text-text-primary">Dentists</span>
                        </motion.h1>

                        {/* Subheading */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10"
                        >
                            Join our exclusive 12-hour live masterclass and transform your dental practice
                            with cutting-edge techniques from world-renowned specialists.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                        >
                            <Link to="/register">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn btn-primary text-base px-8 py-4 gap-2"
                                >
                                    Register Now
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </Link>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-secondary text-base px-8 py-4 gap-2"
                            >
                                <Play className="w-5 h-5" />
                                Watch Preview
                            </motion.button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
                        >
                            {heroStats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50"
                                >
                                    <div className="text-3xl font-bold text-primary-600 mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-text-secondary">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: [0, 10, 0] }}
                        transition={{
                            opacity: { delay: 1 },
                            y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
                        }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    >
                        <ChevronDown className="w-8 h-8 text-text-muted" />
                    </motion.div>
                </div>
            </section>

            {/* Featured Dentists Section */}
            <section className="section-padding bg-white" id="dentists">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
                            Meet Your Instructors
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                            World-Class Dental Experts
                        </h2>
                        <p className="text-text-secondary max-w-2xl mx-auto">
                            Learn from the best in the industry. Our speakers are pioneers in their
                            respective fields with decades of combined experience.
                        </p>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {dentists.slice(0, 3).map((dentist, index) => (
                            <DentistCard key={dentist.id} dentist={dentist} index={index} />
                        ))}
                    </div>

                    {/* View All Button */}
                    <AnimatedSection className="text-center mt-12">
                        <Link to="/dentists">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-secondary gap-2"
                            >
                                View All 5 Speakers
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </Link>
                    </AnimatedSection>
                </div>
            </section>

            {/* Highlights Section */}
            <section className="section-padding bg-background">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
                            What You'll Get
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                            A Complete Learning Experience
                        </h2>
                        <p className="text-text-secondary max-w-2xl mx-auto">
                            Everything you need for an immersive, transformative educational experience
                            that will elevate your practice.
                        </p>
                    </AnimatedSection>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {highlights.map((highlight) => (
                            <StaggerItem key={highlight.title}>
                                <motion.div
                                    whileHover={{ y: -8 }}
                                    className="bg-white rounded-2xl p-8 shadow-card h-full"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center mb-6">
                                        <highlight.icon className="w-7 h-7 text-primary-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-text-primary mb-3">
                                        {highlight.title}
                                    </h3>
                                    <p className="text-text-secondary">
                                        {highlight.description}
                                    </p>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section-padding bg-white" id="testimonials">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
                            Testimonials
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                            What Past Attendees Say
                        </h2>
                        <p className="text-text-secondary max-w-2xl mx-auto">
                            Hear from dental professionals who have transformed their practice
                            after attending our masterclass.
                        </p>
                    </AnimatedSection>

                    <AnimatedSection>
                        <TestimonialCarousel reviews={reviews} />
                    </AnimatedSection>

                    {/* Trust Badges */}
                    <AnimatedSection className="mt-16 text-center">
                        <p className="text-text-muted text-sm mb-6">Trusted by dentists from</p>
                        <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
                            {['Harvard Dental', 'UCLA', 'NYU Dentistry', 'UPenn Dental', 'Columbia Dental'].map((name) => (
                                <span key={name} className="text-text-secondary font-semibold text-lg">
                                    {name}
                                </span>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Event Details & Countdown Section */}
            <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 text-white">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-12">
                        <span className="inline-block text-primary-200 font-semibold text-sm uppercase tracking-wider mb-4">
                            Mark Your Calendar
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {upcomingEvent.name}
                        </h2>
                        <p className="text-primary-100 max-w-2xl mx-auto">
                            Don't miss this opportunity to learn from the best. Register now to secure your spot!
                        </p>
                    </AnimatedSection>

                    {/* Countdown */}
                    <AnimatedSection className="mb-16">
                        <CountdownTimer targetDate={upcomingEvent.date} />
                    </AnimatedSection>

                    {/* Event Info Cards */}
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <StaggerItem>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                                <Calendar className="w-8 h-8 text-primary-200 mx-auto mb-3" />
                                <h4 className="font-semibold text-white mb-1">Date</h4>
                                <p className="text-primary-100">{formatDate(upcomingEvent.date)}</p>
                            </div>
                        </StaggerItem>
                        <StaggerItem>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                                <Clock className="w-8 h-8 text-primary-200 mx-auto mb-3" />
                                <h4 className="font-semibold text-white mb-1">Duration</h4>
                                <p className="text-primary-100">{upcomingEvent.durationHours} Hours Live</p>
                            </div>
                        </StaggerItem>
                        <StaggerItem>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                                <Globe className="w-8 h-8 text-primary-200 mx-auto mb-3" />
                                <h4 className="font-semibold text-white mb-1">Format</h4>
                                <p className="text-primary-100">Live In-Person Training</p>
                            </div>
                        </StaggerItem>
                    </StaggerContainer>

                    {/* CTA */}
                    <AnimatedSection className="text-center mt-12">
                        <Link to="/register">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                            >
                                Secure Your Spot
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </Link>
                        <p className="text-primary-200 text-sm mt-4">
                            {upcomingEvent.maxCapacity - upcomingEvent.currentRegistrations} spots remaining out of {upcomingEvent.maxCapacity}
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="section-padding bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <AnimatedSection>
                        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                            Ready to Transform Your Practice?
                        </h2>
                        <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of dental professionals who have elevated their skills
                            and grown their practices through our masterclass.
                        </p>
                        <Link to="/register">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-primary text-lg px-10 py-5 gap-2"
                            >
                                Register Now for $499
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </Link>
                        <p className="text-text-muted text-sm mt-4">
                            30-day money-back guarantee • Instant access confirmed
                        </p>
                    </AnimatedSection>
                </div>
            </section>
        </main>
    );
}
