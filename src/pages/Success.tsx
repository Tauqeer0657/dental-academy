import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    CheckCircle,
    Download,
    Calendar,
    Mail,
    ArrowRight,
    Clock,
    Video
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { formatCurrency, formatDate } from '../lib/utils';
import { upcomingEvent } from '../data/mockData';
import type { PricingBreakdown, RegistrationFormData } from '../types';

export default function Success() {
    const location = useLocation();
    const { registration, pricing, orderId } = (location.state as {
        registration: RegistrationFormData;
        pricing: PricingBreakdown;
        orderId: string;
    }) || {};

    if (!registration || !pricing || !orderId) {
        return (
            <main className="pt-24 pb-16 min-h-screen bg-background">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <h1 className="text-2xl font-bold text-text-primary mb-4">Page Not Found</h1>
                    <p className="text-text-secondary mb-6">This page is only accessible after completing a registration.</p>
                    <Link to="/" className="btn btn-primary">
                        Go to Home
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="pt-24 pb-16 min-h-screen bg-gradient-hero">
            <div className="max-w-2xl mx-auto px-4">
                {/* Success Animation */}
                <AnimatedSection className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="w-24 h-24 rounded-full bg-secondary-100 flex items-center justify-center mx-auto mb-6"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: 'spring' }}
                        >
                            <CheckCircle className="w-12 h-12 text-secondary-600" />
                        </motion.div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
                    >
                        Registration Complete!
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-text-secondary text-lg"
                    >
                        Thank you, {registration.fullName.split(' ')[0]}! Your spot is confirmed.
                    </motion.p>
                </AnimatedSection>

                {/* Order Details Card */}
                <AnimatedSection>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white rounded-2xl shadow-card overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-primary-100">Order Confirmation</p>
                                    <p className="text-xl font-bold">{orderId}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-primary-100">Amount Paid</p>
                                    <p className="text-xl font-bold">{formatCurrency(pricing.total)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Event Details */}
                        <div className="p-6 border-b border-border">
                            <h3 className="font-bold text-text-primary mb-4">{upcomingEvent.name}</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2 text-text-secondary">
                                    <Calendar className="w-4 h-4 text-primary-500" />
                                    <span>{formatDate(upcomingEvent.date)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-text-secondary">
                                    <Clock className="w-4 h-4 text-primary-500" />
                                    <span>9:00 AM - 9:00 PM EST</span>
                                </div>
                                <div className="flex items-center gap-2 text-text-secondary">
                                    <Video className="w-4 h-4 text-primary-500" />
                                    <span>Via {upcomingEvent.platform}</span>
                                </div>
                                <div className="flex items-center gap-2 text-text-secondary">
                                    <Mail className="w-4 h-4 text-primary-500" />
                                    <span>{registration.email}</span>
                                </div>
                            </div>
                        </div>

                        {/* What's Next */}
                        <div className="p-6">
                            <h4 className="font-semibold text-text-primary mb-4">What's Next?</h4>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs font-semibold text-primary-600">1</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-text-primary">Check Your Email</p>
                                        <p className="text-sm text-text-secondary">
                                            We've sent a confirmation email to {registration.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs font-semibold text-primary-600">2</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-text-primary">Add to Calendar</p>
                                        <p className="text-sm text-text-secondary">
                                            Download the calendar invite to never miss the event
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs font-semibold text-primary-600">3</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-text-primary">Join on Event Day</p>
                                        <p className="text-sm text-text-secondary">
                                            You'll receive the {upcomingEvent.platform} link 24 hours before
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="p-6 bg-background flex flex-wrap gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn btn-primary gap-2 flex-1"
                            >
                                <Download className="w-4 h-4" />
                                Download Receipt
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn btn-secondary gap-2 flex-1"
                            >
                                <Calendar className="w-4 h-4" />
                                Add to Calendar
                            </motion.button>
                        </div>
                    </motion.div>
                </AnimatedSection>

                {/* Back to Home */}
                <AnimatedSection className="text-center mt-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-primary-600 font-medium hover:gap-3 transition-all"
                    >
                        Return to Home
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </AnimatedSection>
            </div>
        </main>
    );
}
