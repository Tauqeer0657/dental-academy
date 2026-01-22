import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import {
    ArrowRight,
    ArrowLeft,
    Check,
    User,
    Settings,
    Package,
    CreditCard,
    Clock,
    Users
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { cn, formatCurrency } from '../lib/utils';
import { countries, countryCodes, upcomingEvent as mockEvent } from '../data/mockData';
import { registrationsApi, eventsApi } from '../lib/api';
import { useApi } from '../hooks/useApi';
import type { RegistrationFormData, PricingBreakdown } from '../types';

// Form validation schema
const registrationSchema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email'),
    phone: z.string().min(10, 'Please enter a valid phone number'),
    countryCode: z.string().min(1, 'Required'),
    country: z.string().min(1, 'Please select a country'),
    profession: z.enum(['dentist', 'student', 'hygienist', 'other']),
    experienceYears: z.number().min(0).max(60),
    licenseNumber: z.string().optional(),
    accommodationType: z.enum(['single', 'shared', 'none']),
    foodPreference: z.enum(['halal', 'vegetarian', 'vegan', 'none']),
    dietaryRestrictions: z.string().optional(),
    certificateType: z.enum(['hardcopy', 'digital']),
    materialsKit: z.boolean(),
    networkingDinner: z.boolean(),
    promoCode: z.string().optional(),
    agreedToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms'),
});

const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Preferences', icon: Settings },
    { id: 3, title: 'Extras', icon: Package },
    { id: 4, title: 'Review', icon: CreditCard },
];

const professionOptions = [
    { value: 'dentist', label: 'Dentist' },
    { value: 'student', label: 'Dental Student' },
    { value: 'hygienist', label: 'Dental Hygienist' },
    { value: 'other', label: 'Other' },
];

export default function Register() {
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();

    // Fetch event from API
    const { data: eventData } = useApi(() => eventsApi.getUpcoming(), { initialData: mockEvent });
    const upcomingEvent = eventData || mockEvent;

    const [pricing, setPricing] = useState<PricingBreakdown>({
        basePrice: 499,
        accommodation: 0,
        food: 0,
        certificate: 0,
        materialsKit: 0,
        networkingDinner: 0,
        discount: 0,
        total: 499,
    });

    const methods = useForm<RegistrationFormData>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            countryCode: '+1',
            country: '',
            profession: 'dentist',
            experienceYears: 0,
            licenseNumber: '',
            accommodationType: 'none',
            foodPreference: 'halal',
            dietaryRestrictions: '',
            certificateType: 'digital',
            materialsKit: false,
            networkingDinner: false,
            promoCode: '',
            agreedToTerms: false,
        },
        mode: 'onChange',
    });

    const { trigger, handleSubmit, formState: { errors } } = methods;

    // Watch specific fields needed for UI display and pricing
    const accommodationType = methods.watch('accommodationType');
    const foodPreference = methods.watch('foodPreference');
    const certificateType = methods.watch('certificateType');
    const materialsKit = methods.watch('materialsKit');
    const networkingDinner = methods.watch('networkingDinner');
    const fullName = methods.watch('fullName');
    const email = methods.watch('email');
    const phone = methods.watch('phone');
    const countryCode = methods.watch('countryCode');
    const country = methods.watch('country');

    // Create formValues object for display purposes
    const formValues = {
        accommodationType,
        foodPreference,
        certificateType,
        materialsKit,
        networkingDinner,
        fullName,
        email,
        phone,
        countryCode,
        country,
    };

    // Load saved data from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem('registration-form');
        if (savedData) {
            const parsed = JSON.parse(savedData);
            Object.keys(parsed).forEach((key) => {
                methods.setValue(key as keyof RegistrationFormData, parsed[key]);
            });
        }
    }, [methods]);

    // Calculate pricing whenever relevant form values change
    useEffect(() => {
        const basePrice = upcomingEvent.basePrice || 499;
        const accommodationPrices = { single: 200, shared: 150, none: 0 };
        const foodPrices = { halal: 0, vegetarian: 0, vegan: 0, none: -50 };

        const newPricing: PricingBreakdown = {
            basePrice: basePrice,
            accommodation: accommodationPrices[accommodationType as keyof typeof accommodationPrices] || 0,
            food: foodPrices[foodPreference as keyof typeof foodPrices] || 0,
            certificate: certificateType === 'hardcopy' ? 25 : 0,
            materialsKit: materialsKit ? 75 : 0,
            networkingDinner: networkingDinner ? 100 : 0,
            discount: 0,
            total: 0,
        };

        newPricing.total =
            newPricing.basePrice +
            newPricing.accommodation +
            newPricing.food +
            newPricing.certificate +
            newPricing.materialsKit +
            newPricing.networkingDinner -
            newPricing.discount;

        setPricing(newPricing);
    }, [accommodationType, foodPreference, certificateType, materialsKit, networkingDinner, upcomingEvent.basePrice]);

    // Save to localStorage when form values change
    useEffect(() => {
        const currentValues = methods.getValues();
        localStorage.setItem('registration-form', JSON.stringify(currentValues));
    }, [accommodationType, foodPreference, certificateType, materialsKit, networkingDinner, fullName, email, phone, countryCode, country, methods]);

    const validateStep = async (step: number): Promise<boolean> => {
        const fieldsPerStep: Record<number, (keyof RegistrationFormData)[]> = {
            1: ['fullName', 'email', 'phone', 'countryCode', 'country', 'profession', 'experienceYears'],
            2: ['accommodationType', 'foodPreference'],
            3: ['certificateType', 'materialsKit', 'networkingDinner'],
            4: ['agreedToTerms'],
        };
        return trigger(fieldsPerStep[step]);
    };

    const nextStep = async () => {
        const isValid = await validateStep(currentStep);
        if (isValid && currentStep < 4) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const onSubmit = async (data: RegistrationFormData) => {
        const navigateToPayment = (state: object) => {
            localStorage.removeItem('registration-form');
            // Use setTimeout to ensure navigation happens after current render cycle
            setTimeout(() => {
                navigate('/payment', { state, replace: true });
            }, 0);
        };

        try {
            // Submit to backend API
            const result = await registrationsApi.create({
                ...data,
                agreedToTerms: true
            });

            if (result.success && result.data) {
                navigateToPayment({
                    registration: data,
                    pricing: result.data.pricing || pricing,
                    registrationId: result.data.registrationId,
                    confirmationNumber: result.data.confirmationNumber
                });
                return; // Exit early to prevent finally from running setState
            } else {
                throw new Error(result.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            // Fallback: still navigate to payment with local data
            navigateToPayment({ registration: data, pricing });
            return; // Exit early to prevent finally from running setState
        }
    };

    return (
        <main className="pt-24 pb-16 min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <AnimatedSection className="text-center mb-12">
                    <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
                        Step {currentStep} of 4
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                        {steps[currentStep - 1].title}
                    </h1>
                    <p className="text-text-secondary">
                        Complete the registration process to secure your spot
                    </p>
                </AnimatedSection>

                {/* Progress Steps */}
                <div className="mb-12">
                    <div className="flex items-center justify-between max-w-xl mx-auto">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex items-center">
                                <motion.div
                                    initial={false}
                                    animate={{
                                        scale: currentStep === step.id ? 1.1 : 1,
                                        backgroundColor: currentStep >= step.id ? 'var(--color-primary-500)' : 'var(--color-background-alt)',
                                    }}
                                    className={cn(
                                        'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
                                        currentStep >= step.id ? 'text-white' : 'text-text-muted'
                                    )}
                                >
                                    {currentStep > step.id ? (
                                        <Check className="w-5 h-5" />
                                    ) : (
                                        <step.icon className="w-5 h-5" />
                                    )}
                                </motion.div>
                                {index < steps.length - 1 && (
                                    <div className={cn(
                                        'w-12 sm:w-20 h-1 mx-2',
                                        currentStep > step.id ? 'bg-primary-500' : 'bg-background-alt'
                                    )} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between max-w-xl mx-auto mt-3">
                        {steps.map((step) => (
                            <span
                                key={step.id}
                                className={cn(
                                    'text-xs font-medium transition-colors',
                                    currentStep >= step.id ? 'text-primary-600' : 'text-text-muted'
                                )}
                            >
                                {step.title}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Form */}
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Form Area */}
                            <div className="lg:col-span-2">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentStep}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-white rounded-2xl shadow-card p-8"
                                    >
                                        {/* Step 1: Personal Information */}
                                        {currentStep === 1 && (
                                            <div className="space-y-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-text-primary mb-2">
                                                        Full Name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        {...methods.register('fullName')}
                                                        className={cn('input', errors.fullName && 'border-error')}
                                                        placeholder="Dr. John Smith"
                                                    />
                                                    {errors.fullName && (
                                                        <p className="mt-1 text-sm text-error">{errors.fullName.message}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-text-primary mb-2">
                                                        Email Address *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        {...methods.register('email')}
                                                        className={cn('input', errors.email && 'border-error')}
                                                        placeholder="john@clinic.com"
                                                    />
                                                    {errors.email && (
                                                        <p className="mt-1 text-sm text-error">{errors.email.message}</p>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-3 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-text-primary mb-2">
                                                            Code
                                                        </label>
                                                        <select
                                                            {...methods.register('countryCode')}
                                                            className="input"
                                                        >
                                                            {countryCodes.map((cc) => (
                                                                <option key={cc.code} value={cc.code}>
                                                                    {cc.code} ({cc.country})
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <label className="block text-sm font-medium text-text-primary mb-2">
                                                            Phone Number *
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            {...methods.register('phone')}
                                                            className={cn('input', errors.phone && 'border-error')}
                                                            placeholder="555-123-4567"
                                                        />
                                                        {errors.phone && (
                                                            <p className="mt-1 text-sm text-error">{errors.phone.message}</p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-text-primary mb-2">
                                                        Country *
                                                    </label>
                                                    <select
                                                        {...methods.register('country')}
                                                        className={cn('input', errors.country && 'border-error')}
                                                    >
                                                        <option value="">Select a country</option>
                                                        {countries.map((country) => (
                                                            <option key={country} value={country}>{country}</option>
                                                        ))}
                                                    </select>
                                                    {errors.country && (
                                                        <p className="mt-1 text-sm text-error">{errors.country.message}</p>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-text-primary mb-2">
                                                            Profession *
                                                        </label>
                                                        <select
                                                            {...methods.register('profession')}
                                                            className="input"
                                                        >
                                                            {professionOptions.map((option) => (
                                                                <option key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-text-primary mb-2">
                                                            Years of Experience
                                                        </label>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="60"
                                                            {...methods.register('experienceYears', { valueAsNumber: true })}
                                                            className="input"
                                                            placeholder="5"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-text-primary mb-2">
                                                        License Number (optional)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        {...methods.register('licenseNumber')}
                                                        className="input"
                                                        placeholder="DDS-12345"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 2: Event Preferences */}
                                        {currentStep === 2 && (
                                            <div className="space-y-8">
                                                <div>
                                                    <label className="block text-sm font-medium text-text-primary mb-4">
                                                        Accommodation
                                                    </label>
                                                    <div className="space-y-3">
                                                        {[
                                                            { value: 'single', label: 'Single Room', price: 200, desc: 'Private room for one person' },
                                                            { value: 'shared', label: 'Shared Room', price: 150, desc: 'Room shared with another attendee' },
                                                            { value: 'none', label: 'No Accommodation', price: 0, desc: 'I\'ll arrange my own stay' },
                                                        ].map((option) => (
                                                            <label
                                                                key={option.value}
                                                                className={cn(
                                                                    'flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all',
                                                                    formValues.accommodationType === option.value
                                                                        ? 'border-primary-500 bg-primary-50'
                                                                        : 'border-border hover:border-primary-200'
                                                                )}
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <input
                                                                        type="radio"
                                                                        value={option.value}
                                                                        {...methods.register('accommodationType')}
                                                                        className="w-4 h-4 text-primary-500"
                                                                    />
                                                                    <div>
                                                                        <p className="font-medium text-text-primary">{option.label}</p>
                                                                        <p className="text-sm text-text-secondary">{option.desc}</p>
                                                                    </div>
                                                                </div>
                                                                <span className={cn(
                                                                    'font-semibold',
                                                                    option.price > 0 ? 'text-primary-600' : 'text-text-muted'
                                                                )}>
                                                                    {option.price > 0 ? `+${formatCurrency(option.price)}` : 'Included'}
                                                                </span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-text-primary mb-4">
                                                        Food Preference
                                                    </label>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {[
                                                            { value: 'halal', label: 'Halal', price: 0 },
                                                            { value: 'vegetarian', label: 'Vegetarian', price: 0 },
                                                            { value: 'vegan', label: 'Vegan', price: 0 },
                                                            { value: 'none', label: 'No Food', price: -50 },
                                                        ].map((option) => (
                                                            <label
                                                                key={option.value}
                                                                className={cn(
                                                                    'flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all',
                                                                    formValues.foodPreference === option.value
                                                                        ? 'border-primary-500 bg-primary-50'
                                                                        : 'border-border hover:border-primary-200'
                                                                )}
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <input
                                                                        type="radio"
                                                                        value={option.value}
                                                                        {...methods.register('foodPreference')}
                                                                        className="w-4 h-4 text-primary-500"
                                                                    />
                                                                    <span className="font-medium text-text-primary">{option.label}</span>
                                                                </div>
                                                                <span className={cn(
                                                                    'text-sm font-medium',
                                                                    option.price < 0 ? 'text-secondary-600' : 'text-text-muted'
                                                                )}>
                                                                    {option.price < 0 ? `-${formatCurrency(Math.abs(option.price))}` : 'Included'}
                                                                </span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-text-primary mb-2">
                                                        Dietary Restrictions (optional)
                                                    </label>
                                                    <textarea
                                                        {...methods.register('dietaryRestrictions')}
                                                        rows={3}
                                                        className="input resize-none"
                                                        placeholder="Any allergies or special dietary requirements..."
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 3: Additional Options */}
                                        {currentStep === 3 && (
                                            <div className="space-y-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-text-primary mb-4">
                                                        Certificate Type
                                                    </label>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {[
                                                            { value: 'digital', label: 'Digital Only', price: 0, desc: 'PDF certificate' },
                                                            { value: 'hardcopy', label: 'Hard Copy', price: 25, desc: 'Printed & framed' },
                                                        ].map((option) => (
                                                            <label
                                                                key={option.value}
                                                                className={cn(
                                                                    'p-4 rounded-xl border-2 cursor-pointer transition-all text-center',
                                                                    formValues.certificateType === option.value
                                                                        ? 'border-primary-500 bg-primary-50'
                                                                        : 'border-border hover:border-primary-200'
                                                                )}
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    value={option.value}
                                                                    {...methods.register('certificateType')}
                                                                    className="sr-only"
                                                                />
                                                                <p className="font-medium text-text-primary">{option.label}</p>
                                                                <p className="text-sm text-text-secondary">{option.desc}</p>
                                                                <p className={cn(
                                                                    'mt-2 font-semibold',
                                                                    option.price > 0 ? 'text-primary-600' : 'text-text-muted'
                                                                )}>
                                                                    {option.price > 0 ? `+${formatCurrency(option.price)}` : 'Included'}
                                                                </p>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-text-primary mb-4">
                                                        Additional Add-ons
                                                    </label>
                                                    <div className="space-y-3">
                                                        <label
                                                            className={cn(
                                                                'flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all',
                                                                formValues.materialsKit
                                                                    ? 'border-primary-500 bg-primary-50'
                                                                    : 'border-border hover:border-primary-200'
                                                            )}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <input
                                                                    type="checkbox"
                                                                    {...methods.register('materialsKit')}
                                                                    className="w-5 h-5 rounded text-primary-500"
                                                                />
                                                                <div>
                                                                    <p className="font-medium text-text-primary">Workshop Materials Kit</p>
                                                                    <p className="text-sm text-text-secondary">Physical tools and materials kit delivered to you</p>
                                                                </div>
                                                            </div>
                                                            <span className="font-semibold text-primary-600">+{formatCurrency(75)}</span>
                                                        </label>

                                                        <label
                                                            className={cn(
                                                                'flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all',
                                                                formValues.networkingDinner
                                                                    ? 'border-primary-500 bg-primary-50'
                                                                    : 'border-border hover:border-primary-200'
                                                            )}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <input
                                                                    type="checkbox"
                                                                    {...methods.register('networkingDinner')}
                                                                    className="w-5 h-5 rounded text-primary-500"
                                                                />
                                                                <div>
                                                                    <p className="font-medium text-text-primary">Networking Dinner</p>
                                                                    <p className="text-sm text-text-secondary">Exclusive dinner event with speakers</p>
                                                                </div>
                                                            </div>
                                                            <span className="font-semibold text-primary-600">+{formatCurrency(100)}</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-text-primary mb-2">
                                                        Promo Code (optional)
                                                    </label>
                                                    <div className="flex gap-3">
                                                        <input
                                                            type="text"
                                                            {...methods.register('promoCode')}
                                                            className="input flex-1"
                                                            placeholder="Enter code"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary"
                                                        >
                                                            Apply
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 4: Review */}
                                        {currentStep === 4 && (
                                            <div className="space-y-6">
                                                <div className="bg-background rounded-xl p-6">
                                                    <h3 className="font-semibold text-text-primary mb-4">Personal Information</h3>
                                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                                        <div>
                                                            <p className="text-text-muted">Name</p>
                                                            <p className="font-medium text-text-primary">{formValues.fullName}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-text-muted">Email</p>
                                                            <p className="font-medium text-text-primary">{formValues.email}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-text-muted">Phone</p>
                                                            <p className="font-medium text-text-primary">{formValues.countryCode} {formValues.phone}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-text-muted">Country</p>
                                                            <p className="font-medium text-text-primary">{formValues.country}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-background rounded-xl p-6">
                                                    <h3 className="font-semibold text-text-primary mb-4">Selected Options</h3>
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex justify-between">
                                                            <span className="text-text-secondary">Accommodation</span>
                                                            <span className="font-medium capitalize">{formValues.accommodationType}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-text-secondary">Food</span>
                                                            <span className="font-medium capitalize">{formValues.foodPreference}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-text-secondary">Certificate</span>
                                                            <span className="font-medium capitalize">{formValues.certificateType}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-text-secondary">Materials Kit</span>
                                                            <span className="font-medium">{formValues.materialsKit ? 'Yes' : 'No'}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-text-secondary">Networking Dinner</span>
                                                            <span className="font-medium">{formValues.networkingDinner ? 'Yes' : 'No'}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <label className={cn(
                                                    'flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer',
                                                    errors.agreedToTerms ? 'border-error bg-error/5' : 'border-border'
                                                )}>
                                                    <input
                                                        type="checkbox"
                                                        {...methods.register('agreedToTerms')}
                                                        className="w-5 h-5 mt-0.5 rounded text-primary-500"
                                                    />
                                                    <div className="text-sm">
                                                        <p className="text-text-primary">
                                                            I agree to the{' '}
                                                            <Link to="/terms" className="text-primary-600 hover:underline">Terms of Service</Link>
                                                            {' '}and{' '}
                                                            <Link to="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>
                                                        </p>
                                                        {errors.agreedToTerms && (
                                                            <p className="mt-1 text-error">{errors.agreedToTerms.message}</p>
                                                        )}
                                                    </div>
                                                </label>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>

                                {/* Navigation Buttons */}
                                <div className="flex justify-between mt-8">
                                    <motion.button
                                        type="button"
                                        onClick={prevStep}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={cn(
                                            'btn btn-secondary gap-2',
                                            currentStep === 1 && 'invisible'
                                        )}
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Back
                                    </motion.button>

                                    {currentStep < 4 ? (
                                        <motion.button
                                            type="button"
                                            onClick={nextStep}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="btn btn-primary gap-2"
                                        >
                                            Continue
                                            <ArrowRight className="w-4 h-4" />
                                        </motion.button>
                                    ) : (
                                        <motion.button
                                            type="submit"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="btn btn-primary gap-2"
                                        >
                                            Proceed to Payment
                                            <CreditCard className="w-4 h-4" />
                                        </motion.button>
                                    )}
                                </div>
                            </div>

                            {/* Pricing Sidebar */}
                            <div className="lg:col-span-1">
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
                                        {pricing.discount > 0 && (
                                            <div className="flex justify-between text-sm text-secondary-600">
                                                <span>Promo Discount</span>
                                                <span className="font-medium">-{formatCurrency(pricing.discount)}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-lg font-bold text-text-primary">Total</span>
                                        <span className="text-2xl font-bold text-primary-600">
                                            {formatCurrency(pricing.total)}
                                        </span>
                                    </div>

                                    <div className="space-y-3 text-sm text-text-secondary">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span>12 hours of live training</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4" />
                                            <span>{upcomingEvent.maxCapacity - upcomingEvent.currentRegistrations} spots left</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </main>
    );
}