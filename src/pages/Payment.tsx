import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    CreditCard,
    Lock,
    Shield,
    ArrowLeft,
    Check,
    AlertCircle
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { formatCurrency } from '../lib/utils';
import { cn } from '../lib/utils';
import { paymentsApi } from '../lib/api';
import type { PricingBreakdown, RegistrationFormData } from '../types';

export default function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [cardName, setCardName] = useState('');

    const { registration, pricing, registrationId } = (location.state as {
        registration: RegistrationFormData;
        pricing: PricingBreakdown;
        registrationId?: string;
    }) || {};

    if (!registration || !pricing) {
        return (
            <main className="pt-24 pb-16 min-h-screen bg-background">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <h1 className="text-2xl font-bold text-text-primary mb-4">Session Expired</h1>
                    <p className="text-text-secondary mb-6">Please start the registration process again.</p>
                    <Link to="/register" className="btn btn-primary">
                        Go to Registration
                    </Link>
                </div>
            </main>
        );
    }

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        return parts.length ? parts.join(' ') : value;
    };

    const formatExpiry = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setError(null);

        try {
            // Call backend to create payment intent
            const paymentResult = await paymentsApi.createIntent(
                registrationId || 'demo-' + Date.now(),
                Math.round(pricing.total * 100) // Convert to cents
            );

            if (paymentResult.success && paymentResult.data) {
                // Confirm the payment
                const confirmResult = await paymentsApi.confirm(
                    registrationId || 'demo-' + Date.now(),
                    paymentResult.data.paymentIntentId
                );

                if (confirmResult.success && confirmResult.data) {
                    // Navigate to success page
                    navigate('/success', {
                        state: {
                            registration,
                            pricing,
                            orderId: confirmResult.data.confirmationNumber || 'DM-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
                            demo: confirmResult.data.demo
                        }
                    });
                } else {
                    throw new Error(confirmResult.error || 'Payment confirmation failed');
                }
            } else {
                throw new Error(paymentResult.error || 'Failed to create payment');
            }
        } catch (err) {
            console.error('Payment error:', err);
            setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');

            // In demo mode, still proceed after a delay
            setTimeout(() => {
                navigate('/success', {
                    state: {
                        registration,
                        pricing,
                        orderId: 'DM-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
                        demo: true
                    }
                });
            }, 1500);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <main className="pt-24 pb-16 min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <AnimatedSection className="text-center mb-12">
                    <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
                        Final Step
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                        Complete Your Payment
                    </h1>
                    <p className="text-text-secondary">
                        Your registration is almost complete. Enter your payment details below.
                    </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Payment Form */}
                    <div className="lg:col-span-2">
                        <AnimatedSection>
                            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-8">
                                {/* Security Badge */}
                                <div className="flex items-center gap-2 text-sm text-text-secondary mb-8 p-3 bg-secondary-50 rounded-lg">
                                    <Shield className="w-5 h-5 text-secondary-600" />
                                    <span>Your payment is secured with 256-bit SSL encryption</span>
                                </div>

                                <div className="space-y-6">
                                    {/* Card Number */}
                                    <div>
                                        <label className="block text-sm font-medium text-text-primary mb-2">
                                            Card Number
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={cardNumber}
                                                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                                maxLength={19}
                                                className="input pl-12"
                                                placeholder="1234 5678 9012 3456"
                                                required
                                            />
                                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                                        </div>
                                    </div>

                                    {/* Cardholder Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-text-primary mb-2">
                                            Cardholder Name
                                        </label>
                                        <input
                                            type="text"
                                            value={cardName}
                                            onChange={(e) => setCardName(e.target.value)}
                                            className="input"
                                            placeholder="John Smith"
                                            required
                                        />
                                    </div>

                                    {/* Expiry and CVC */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-text-primary mb-2">
                                                Expiry Date
                                            </label>
                                            <input
                                                type="text"
                                                value={expiry}
                                                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                                maxLength={5}
                                                className="input"
                                                placeholder="MM/YY"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text-primary mb-2">
                                                CVC
                                            </label>
                                            <input
                                                type="text"
                                                value={cvc}
                                                onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substring(0, 4))}
                                                maxLength={4}
                                                className="input"
                                                placeholder="123"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isProcessing}
                                    whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                                    whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                                    className={cn(
                                        'btn btn-primary w-full mt-8 py-4 text-lg gap-2',
                                        isProcessing && 'opacity-80 cursor-not-allowed'
                                    )}
                                >
                                    {isProcessing ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Lock className="w-5 h-5" />
                                            Pay {formatCurrency(pricing.total)}
                                        </>
                                    )}
                                </motion.button>

                                {/* Back Link */}
                                <div className="text-center mt-6">
                                    <Link
                                        to="/register"
                                        className="inline-flex items-center gap-2 text-text-secondary hover:text-primary-600 transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Back to Registration
                                    </Link>
                                </div>

                                {/* Payment Methods */}
                                <div className="mt-8 pt-6 border-t border-border">
                                    <p className="text-sm text-text-muted text-center mb-4">Accepted Payment Methods</p>
                                    <div className="flex items-center justify-center gap-4">
                                        {['Visa', 'Mastercard', 'Amex', 'PayPal'].map((method) => (
                                            <div
                                                key={method}
                                                className="px-3 py-1.5 bg-background rounded border border-border text-xs font-medium text-text-secondary"
                                            >
                                                {method}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </form>
                        </AnimatedSection>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <AnimatedSection direction="right">
                            <div className="bg-white rounded-2xl shadow-card p-6 sticky top-28">
                                <h3 className="font-bold text-text-primary mb-4">Order Summary</h3>

                                <div className="space-y-3 pb-4 border-b border-border mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-text-secondary">Base Registration</span>
                                        <span className="font-medium">{formatCurrency(pricing.basePrice)}</span>
                                    </div>
                                    {pricing.accommodation > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-text-secondary">Accommodation</span>
                                            <span className="font-medium">+{formatCurrency(pricing.accommodation)}</span>
                                        </div>
                                    )}
                                    {pricing.food !== 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-text-secondary">Food Option</span>
                                            <span className={cn(
                                                'font-medium',
                                                pricing.food < 0 ? 'text-secondary-600' : ''
                                            )}>
                                                {pricing.food < 0 ? `-${formatCurrency(Math.abs(pricing.food))}` : formatCurrency(pricing.food)}
                                            </span>
                                        </div>
                                    )}
                                    {pricing.certificate > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-text-secondary">Hard Copy Certificate</span>
                                            <span className="font-medium">+{formatCurrency(pricing.certificate)}</span>
                                        </div>
                                    )}
                                    {pricing.materialsKit > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-text-secondary">Materials Kit</span>
                                            <span className="font-medium">+{formatCurrency(pricing.materialsKit)}</span>
                                        </div>
                                    )}
                                    {pricing.networkingDinner > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-text-secondary">Networking Dinner</span>
                                            <span className="font-medium">+{formatCurrency(pricing.networkingDinner)}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-lg font-bold text-text-primary">Total</span>
                                    <span className="text-2xl font-bold text-primary-600">
                                        {formatCurrency(pricing.total)}
                                    </span>
                                </div>

                                {/* Registrant Info */}
                                <div className="bg-background rounded-xl p-4 text-sm">
                                    <p className="text-text-muted mb-1">Registrant</p>
                                    <p className="font-medium text-text-primary">{registration.fullName}</p>
                                    <p className="text-text-secondary">{registration.email}</p>
                                </div>

                                {/* Guarantee */}
                                <div className="mt-6 flex items-start gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-4 h-4 text-secondary-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-text-primary">30-Day Money-Back Guarantee</p>
                                        <p className="text-text-secondary">Full refund if not satisfied</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </main>
    );
}
