import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const faqCategories = [
    { id: 'registration', name: 'Registration' },
    { id: 'payment', name: 'Payment' },
    { id: 'technical', name: 'Technical' },
    { id: 'certificates', name: 'Certificates' },
    { id: 'refunds', name: 'Refunds' },
];

const faqs = [
    {
        category: 'registration',
        question: 'How do I register for the training session?',
        answer: 'Simply click the "Register Now" button on any page and complete the 4-step registration form. You\'ll receive a confirmation email with your access details immediately after successful payment.'
    },
    {
        category: 'registration',
        question: 'Can I register multiple attendees from my practice?',
        answer: 'Yes! We offer group discounts for 3 or more registrations from the same institution. Contact us at groups@ltdentalacademy.com for special pricing.'
    },
    {
        category: 'registration',
        question: 'Is early bird pricing available?',
        answer: 'Yes, we offer 20% off for registrations made 30 or more days before the event. The discount is automatically applied at checkout.'
    },
    {
        category: 'registration',
        question: 'Can I change my registration details after signing up?',
        answer: 'Yes, you can update your registration details up to 48 hours before the event by logging into your account or contacting our support team.'
    },
    {
        category: 'payment',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. For institutional purchases, we can also provide invoicing options.'
    },
    {
        category: 'payment',
        question: 'Is the payment secure?',
        answer: 'Absolutely. We use Stripe for payment processing, which is PCI DSS Level 1 certified—the highest level of payment security. Your card details are never stored on our servers.'
    },
    {
        category: 'payment',
        question: 'Can I pay in installments?',
        answer: 'We currently don\'t offer installment plans. However, we recommend using a credit card that offers payment flexibility if needed.'
    },
    {
        category: 'technical',
        question: 'Where is the training session held?',
        answer: 'This is a live, in-person 12-hour training session. The venue details and full address will be shared via email after your registration is confirmed.'
    },
    {
        category: 'technical',
        question: 'What should I bring to the training session?',
        answer: 'Please bring a notebook for taking notes, your professional ID or registration confirmation, and any questions you have for our expert speakers. All training materials will be provided at the venue.'
    },
    {
        category: 'technical',
        question: 'Can I watch on multiple devices?',
        answer: 'Your registration allows access from one device at a time. If you need to switch devices during the event, simply log in from the new device.'
    },
    {
        category: 'technical',
        question: 'What if I experience technical difficulties during the event?',
        answer: 'Our tech support team will be available throughout the event via live chat. We also provide a technical support hotline number in your confirmation email.'
    },
    {
        category: 'certificates',
        question: 'Will I receive a certificate of completion?',
        answer: 'Yes! All attendees who complete the full 12-hour session receive a digital certificate. You can also opt for a printed, framed certificate for an additional $25.'
    },
    {
        category: 'certificates',
        question: 'How many CE credits does this course provide?',
        answer: 'This masterclass is approved for up to 12 CE credits. Credits are recognized by ADA CERP, AGD PACE, and most state dental boards.'
    },
    {
        category: 'certificates',
        question: 'When will I receive my certificate?',
        answer: 'Digital certificates are emailed within 48 hours of event completion. Printed certificates are shipped within 7-10 business days.'
    },
    {
        category: 'refunds',
        question: 'What is your refund policy?',
        answer: 'We offer a full refund if you cancel 14 or more days before the event. Cancellations within 14 days receive a 50% refund or full credit toward a future event.'
    },
    {
        category: 'refunds',
        question: 'What if the event is cancelled?',
        answer: 'In the unlikely event of cancellation, all registrants will receive a full refund within 5-7 business days.'
    },
    {
        category: 'refunds',
        question: 'Can I transfer my registration to someone else?',
        answer: 'Yes, registration transfers are allowed up to 48 hours before the event at no additional charge. Contact our support team to process the transfer.'
    }
];

function FAQItem({ faq, isOpen, onClick }: { faq: typeof faqs[0]; isOpen: boolean; onClick: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl border border-border overflow-hidden"
        >
            <button
                onClick={onClick}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-background-alt transition-colors"
            >
                <span className="font-medium text-text-primary pr-4">{faq.question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                >
                    <ChevronDown className="w-5 h-5 text-text-secondary" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-6 pb-5 text-text-secondary">
                            {faq.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function FAQ() {
    const [activeCategory, setActiveCategory] = useState('registration');
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFaqs = faqs.filter(faq => {
        const matchesCategory = faq.category === activeCategory;
        const matchesSearch = searchQuery === '' ||
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return searchQuery ? matchesSearch : matchesCategory;
    });

    return (
        <main className="pt-24">
            {/* Hero Section */}
            <section className="bg-gradient-hero section-padding pb-12">
                <div className="max-w-7xl mx-auto text-center">
                    <AnimatedSection>
                        <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
                            Help Center
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-8">
                            Find answers to common questions about registration, payment, technical
                            requirements, and more.
                        </p>

                        {/* Search */}
                        <div className="max-w-xl mx-auto relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                            <input
                                type="text"
                                placeholder="Search for answers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input pl-12"
                            />
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="section-padding bg-background">
                <div className="max-w-4xl mx-auto">
                    {/* Category Tabs */}
                    {!searchQuery && (
                        <AnimatedSection className="mb-8">
                            <div className="flex flex-wrap gap-2 justify-center">
                                {faqCategories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => {
                                            setActiveCategory(category.id);
                                            setOpenIndex(0);
                                        }}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category.id
                                            ? 'bg-primary-500 text-white shadow-md'
                                            : 'bg-white text-text-secondary hover:bg-primary-50 border border-border'
                                            }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </AnimatedSection>
                    )}

                    {/* FAQ List */}
                    <div className="space-y-3">
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq, index) => (
                                <FAQItem
                                    key={`${faq.category}-${index}`}
                                    faq={faq}
                                    isOpen={openIndex === index}
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                />
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-text-secondary">No results found for "{searchQuery}"</p>
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="text-primary-600 font-medium mt-2 hover:underline"
                                >
                                    Clear search
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Still have questions */}
            <section className="section-padding bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <AnimatedSection>
                        <h2 className="text-2xl font-bold text-text-primary mb-4">
                            Still Have Questions?
                        </h2>
                        <p className="text-text-secondary mb-6">
                            Can't find what you're looking for? Our team is here to help.
                        </p>
                        <Link to="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-primary gap-2"
                            >
                                Contact Support
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </Link>
                    </AnimatedSection>
                </div>
            </section>
        </main>
    );
}
