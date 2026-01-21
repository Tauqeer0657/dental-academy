import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    MessageCircle,
    CheckCircle
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { cn } from '../lib/utils';

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema)
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Form submitted:', data);
        setIsSubmitting(false);
        setIsSubmitted(true);
        reset();
    };

    return (
        <main className="pt-24">
            {/* Hero Section */}
            <section className="bg-gradient-hero section-padding pb-12">
                <div className="max-w-7xl mx-auto text-center">
                    <AnimatedSection>
                        <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
                            Get in Touch
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                            Contact Us
                        </h1>
                        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                            Have questions about the masterclass? We're here to help.
                            Reach out and our team will get back to you shortly.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Contact Content */}
            <section className="section-padding bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        {/* Contact Info */}
                        <AnimatedSection className="lg:col-span-2">
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold text-text-primary mb-6">
                                        Contact Information
                                    </h3>
                                    <div className="space-y-6">
                                        <a
                                            href="mailto:info@dentalmasters.com"
                                            className="flex items-start gap-4 group"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                                                <Mail className="w-5 h-5 text-primary-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-text-primary">Email</p>
                                                <p className="text-text-secondary group-hover:text-primary-600 transition-colors">
                                                    info@dentalmasters.com
                                                </p>
                                            </div>
                                        </a>

                                        <a
                                            href="tel:+1-800-DENTIST"
                                            className="flex items-start gap-4 group"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                                                <Phone className="w-5 h-5 text-primary-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-text-primary">Phone</p>
                                                <p className="text-text-secondary group-hover:text-primary-600 transition-colors">
                                                    +1-800-DENTIST
                                                </p>
                                            </div>
                                        </a>

                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                                                <MapPin className="w-5 h-5 text-primary-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-text-primary">Address</p>
                                                <p className="text-text-secondary">
                                                    123 Medical Center Drive<br />
                                                    Boston, MA 02115
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                                                <Clock className="w-5 h-5 text-primary-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-text-primary">Office Hours</p>
                                                <p className="text-text-secondary">
                                                    Mon - Fri: 9:00 AM - 6:00 PM EST<br />
                                                    Sat: 10:00 AM - 2:00 PM EST
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Live Chat */}
                                <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 border border-primary-100">
                                    <div className="flex items-center gap-3 mb-3">
                                        <MessageCircle className="w-6 h-6 text-primary-600" />
                                        <h4 className="font-semibold text-text-primary">Live Chat</h4>
                                    </div>
                                    <p className="text-text-secondary text-sm mb-4">
                                        Need immediate help? Start a live chat with our support team.
                                    </p>
                                    <button className="text-primary-600 font-medium text-sm hover:underline">
                                        Start Chat →
                                    </button>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Contact Form */}
                        <AnimatedSection direction="right" className="lg:col-span-3">
                            <div className="bg-white rounded-3xl shadow-card p-8">
                                {isSubmitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-secondary-100 flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle className="w-10 h-10 text-secondary-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-text-primary mb-3">
                                            Message Sent!
                                        </h3>
                                        <p className="text-text-secondary mb-6">
                                            Thank you for reaching out. We'll get back to you within 24 hours.
                                        </p>
                                        <button
                                            onClick={() => setIsSubmitted(false)}
                                            className="text-primary-600 font-medium hover:underline"
                                        >
                                            Send another message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <>
                                        <h3 className="text-xl font-bold text-text-primary mb-6">
                                            Send us a Message
                                        </h3>
                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                                                    Your Name
                                                </label>
                                                <input
                                                    id="name"
                                                    type="text"
                                                    {...register('name')}
                                                    className={cn('input', errors.name && 'border-error focus:border-error')}
                                                    placeholder="Dr. John Smith"
                                                />
                                                {errors.name && (
                                                    <p className="mt-1 text-sm text-error">{errors.name.message}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                                                    Email Address
                                                </label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    {...register('email')}
                                                    className={cn('input', errors.email && 'border-error focus:border-error')}
                                                    placeholder="john@example.com"
                                                />
                                                {errors.email && (
                                                    <p className="mt-1 text-sm text-error">{errors.email.message}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
                                                    Subject
                                                </label>
                                                <input
                                                    id="subject"
                                                    type="text"
                                                    {...register('subject')}
                                                    className={cn('input', errors.subject && 'border-error focus:border-error')}
                                                    placeholder="Question about registration"
                                                />
                                                {errors.subject && (
                                                    <p className="mt-1 text-sm text-error">{errors.subject.message}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                                                    Message
                                                </label>
                                                <textarea
                                                    id="message"
                                                    rows={5}
                                                    {...register('message')}
                                                    className={cn('input resize-none', errors.message && 'border-error focus:border-error')}
                                                    placeholder="How can we help you?"
                                                />
                                                {errors.message && (
                                                    <p className="mt-1 text-sm text-error">{errors.message.message}</p>
                                                )}
                                            </div>

                                            <motion.button
                                                type="submit"
                                                disabled={isSubmitting}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="btn btn-primary w-full gap-2"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Send Message
                                                        <Send className="w-4 h-4" />
                                                    </>
                                                )}
                                            </motion.button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="h-96 bg-background-alt relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <MapPin className="w-12 h-12 text-primary-300 mx-auto mb-4" />
                        <p className="text-text-muted">Interactive map would be displayed here</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
