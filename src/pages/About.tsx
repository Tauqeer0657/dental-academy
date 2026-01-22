import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Clock,
    Users,
    Award,
    Video,
    Calendar,
    MapPin,
    CheckCircle,
    ArrowRight,
    BookOpen,
    Target,
    Zap,
    Shield
} from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import { upcomingEvent } from '../data/mockData';
import { formatDate } from '../lib/utils';

const curriculum = [
    {
        time: '9:00 AM - 10:30 AM',
        title: 'Digital Dentistry Revolution',
        speaker: 'Dr. Aisha Patel',
        topics: ['CAD/CAM Workflow', 'Digital Smile Design', '3D Printing in Dentistry']
    },
    {
        time: '10:45 AM - 12:15 PM',
        title: 'Advanced Implantology',
        speaker: 'Dr. Sarah Mitchell',
        topics: ['Full-Arch Rehabilitation', 'Immediate Loading Protocols', 'Guided Surgery']
    },
    {
        time: '12:15 PM - 1:15 PM',
        title: 'Lunch Break & Networking',
        speaker: '',
        topics: []
    },
    {
        time: '1:15 PM - 2:45 PM',
        title: 'Microscopic Endodontics',
        speaker: 'Dr. James Chen',
        topics: ['Advanced Instrumentation', 'Retreatment Strategies', 'Apical Microsurgery']
    },
    {
        time: '3:00 PM - 4:30 PM',
        title: 'Regenerative Periodontics',
        speaker: 'Dr. Emily Rodriguez',
        topics: ['Growth Factors & PRF', 'Soft Tissue Grafting', 'Bone Regeneration']
    },
    {
        time: '4:45 PM - 6:15 PM',
        title: 'Complex Oral Surgery',
        speaker: 'Dr. Michael Thompson',
        topics: ['Orthognathic Surgery', '3D Surgical Planning', 'TMJ Disorders']
    },
    {
        time: '6:30 PM - 8:00 PM',
        title: 'Panel Discussion & Q&A',
        speaker: 'All Speakers',
        topics: ['Case Presentations', 'Live Q&A', 'Practice Management Tips']
    },
    {
        time: '8:00 PM',
        title: 'Networking Dinner (Optional)',
        speaker: '',
        topics: ['Meet the speakers', 'Network with peers']
    }
];

const whoShouldAttend = [
    { icon: Users, title: 'General Dentists', desc: 'Looking to expand their skill set' },
    { icon: Award, title: 'Specialists', desc: 'Seeking cutting-edge techniques' },
    { icon: BookOpen, title: 'Dental Students', desc: 'Wanting exposure to advanced procedures' },
    { icon: Target, title: 'Practice Owners', desc: 'Aiming to differentiate their practice' },
];

const learningObjectives = [
    'Master the latest digital dentistry workflows and tools',
    'Learn advanced implant placement techniques with minimal complications',
    'Understand microscopic approaches to endodontic treatment',
    'Implement regenerative procedures in your practice',
    'Apply evidence-based protocols for complex cases',
    'Develop strategies for practice growth and patient retention'
];

export default function About() {
    return (
        <main className="pt-24">
            {/* Hero Section */}
            <section className="bg-gradient-hero section-padding pb-12">
                <div className="max-w-7xl mx-auto text-center">
                    <AnimatedSection>
                        <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
                            Event Details
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                            {upcomingEvent.name}
                        </h1>
                        <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-8">
                            A comprehensive 12-hour masterclass covering the most in-demand topics
                            in modern dentistry, delivered by world-renowned experts.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-text-secondary">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-primary-500" />
                                <span>{formatDate(upcomingEvent.date)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-primary-500" />
                                <span>9:00 AM - 9:00 PM EST</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-primary-500" />
                                <span>Live In-Person Training</span>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Event Format Section */}
            <section className="section-padding bg-white">
                <div className="max-w-6xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                            Event Format & Schedule
                        </h2>
                        <p className="text-text-secondary max-w-2xl mx-auto">
                            A carefully structured program designed for maximum learning and engagement
                        </p>
                    </AnimatedSection>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

                        <StaggerContainer className="space-y-8">
                            {curriculum.map((item, index) => (
                                <StaggerItem key={index}>
                                    <motion.div
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                        className={`relative flex items-start gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                            }`}
                                    >
                                        {/* Content */}
                                        <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'} pl-12 md:pl-0`}>
                                            <div className={`bg-white rounded-2xl shadow-card p-6 ${item.speaker ? '' : 'bg-primary-50 border-2 border-dashed border-primary-200'}`}>
                                                <span className="text-sm text-primary-600 font-semibold">{item.time}</span>
                                                <h3 className="text-lg font-bold text-text-primary mt-1 mb-2">{item.title}</h3>
                                                {item.speaker && (
                                                    <p className="text-text-secondary text-sm mb-3">by {item.speaker}</p>
                                                )}
                                                {item.topics.length > 0 && (
                                                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                                                        {item.topics.map((topic, i) => (
                                                            <span key={i} className="text-xs bg-background px-2 py-1 rounded text-text-secondary">
                                                                {topic}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Dot */}
                                        <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-md -translate-x-1/2 mt-2 z-10" />

                                        {/* Spacer for alternating layout */}
                                        <div className="hidden md:block flex-1" />
                                    </motion.div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </div>
            </section>

            {/* Who Should Attend */}
            <section className="section-padding bg-background">
                <div className="max-w-6xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                            Who Should Attend?
                        </h2>
                        <p className="text-text-secondary max-w-2xl mx-auto">
                            This masterclass is designed for dental professionals at all stages of their career
                        </p>
                    </AnimatedSection>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {whoShouldAttend.map((item) => (
                            <StaggerItem key={item.title}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="bg-white rounded-2xl p-6 text-center shadow-card h-full"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center mx-auto mb-4">
                                        <item.icon className="w-7 h-7 text-primary-600" />
                                    </div>
                                    <h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
                                    <p className="text-sm text-text-secondary">{item.desc}</p>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Learning Objectives */}
            <section className="section-padding bg-white" id="ce-credits">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <AnimatedSection>
                            <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
                                Learning Objectives
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                                What You'll Learn
                            </h2>
                            <div className="space-y-4">
                                {learningObjectives.map((objective, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start gap-3"
                                    >
                                        <CheckCircle className="w-6 h-6 text-secondary-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-text-secondary">{objective}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </AnimatedSection>

                        <AnimatedSection direction="right">
                            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-8 border border-primary-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center">
                                        <Award className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-text-primary">CE Credits</h3>
                                        <p className="text-sm text-text-secondary">Continuing Education</p>
                                    </div>
                                </div>
                                <p className="text-text-secondary mb-6">
                                    Upon completion, receive a certificate of attendance eligible for
                                    up to <span className="font-semibold text-primary-600">12 CE credits</span>.
                                    Credits are recognized by major dental associations.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <span className="bg-white px-3 py-1.5 rounded-lg text-sm text-text-secondary border border-border">ADA CERP</span>
                                    <span className="bg-white px-3 py-1.5 rounded-lg text-sm text-text-secondary border border-border">AGD PACE</span>
                                    <span className="bg-white px-3 py-1.5 rounded-lg text-sm text-text-secondary border border-border">State Approved</span>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* What to Bring */}
            <section className="section-padding bg-background">
                <div className="max-w-4xl mx-auto text-center">
                    <AnimatedSection>
                        <h2 className="text-3xl font-bold text-text-primary mb-8">
                            What to Bring
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-2xl p-6 shadow-card">
                                <Zap className="w-8 h-8 text-primary-500 mx-auto mb-3" />
                                <h4 className="font-semibold text-text-primary mb-2">Notebook</h4>
                                <p className="text-sm text-text-secondary">Take notes during the 12-hour live session</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-card">
                                <Video className="w-8 h-8 text-primary-500 mx-auto mb-3" />
                                <h4 className="font-semibold text-text-primary mb-2">ID Card</h4>
                                <p className="text-sm text-text-secondary">Professional ID or registration confirmation</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-card">
                                <Shield className="w-8 h-8 text-primary-500 mx-auto mb-3" />
                                <h4 className="font-semibold text-text-primary mb-2">Enthusiasm</h4>
                                <p className="text-sm text-text-secondary">Come ready to learn and network!</p>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-gradient-to-br from-primary-600 to-accent-700 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <AnimatedSection>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Transform Your Practice?
                        </h2>
                        <p className="text-primary-100 text-lg mb-8">
                            Secure your spot today and join thousands of dental professionals
                            who have elevated their skills.
                        </p>
                        <Link to="/register">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                            >
                                Register Now for $499
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </Link>
                    </AnimatedSection>
                </div>
            </section>
        </main>
    );
}
