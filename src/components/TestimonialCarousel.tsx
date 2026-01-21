import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import type { Review } from '../types';

interface TestimonialCarouselProps {
    reviews: Review[];
    autoPlayInterval?: number;
}

export default function TestimonialCarousel({
    reviews,
    autoPlayInterval = 5000
}: TestimonialCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const intervalRef = useRef<number | null>(null);

    const startAutoPlay = () => {
        intervalRef.current = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % reviews.length);
        }, autoPlayInterval);
    };

    const stopAutoPlay = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    useEffect(() => {
        startAutoPlay();
        return () => stopAutoPlay();
    }, []);

    const goTo = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
        stopAutoPlay();
        startAutoPlay();
    };

    const goNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
        stopAutoPlay();
        startAutoPlay();
    };

    const goPrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
        stopAutoPlay();
        startAutoPlay();
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -300 : 300,
            opacity: 0,
        }),
    };

    const currentReview = reviews[currentIndex];

    return (
        <div className="relative max-w-4xl mx-auto">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center z-10 shadow-lg">
                <Quote className="w-6 h-6 text-white" />
            </div>

            {/* Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 pt-10 overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        className="text-center"
                    >
                        {/* Stars */}
                        <div className="flex justify-center gap-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Star
                                        className={`w-5 h-5 ${i < currentReview.rating
                                            ? 'text-yellow-400 fill-yellow-400'
                                            : 'text-gray-200'
                                            }`}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* Review Text */}
                        <p className="text-lg md:text-xl text-text-primary leading-relaxed mb-8 max-w-2xl mx-auto">
                            "{currentReview.reviewText}"
                        </p>

                        {/* Reviewer Info */}
                        <div className="flex flex-col items-center">
                            <img
                                src={currentReview.attendeePhotoUrl}
                                alt={currentReview.attendeeName}
                                className="w-16 h-16 rounded-full object-cover border-4 border-primary-100 mb-3"
                            />
                            <h4 className="font-semibold text-text-primary">
                                {currentReview.attendeeName}
                            </h4>
                            <p className="text-sm text-text-secondary">
                                {currentReview.attendeeCredential}
                            </p>
                            {currentReview.verified && (
                                <span className="mt-2 text-xs bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full font-medium">
                                    Verified Attendee
                                </span>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                    onClick={goPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border border-border flex items-center justify-center hover:bg-primary-50 transition-colors"
                    aria-label="Previous testimonial"
                >
                    <ChevronLeft className="w-5 h-5 text-text-secondary" />
                </button>
                <button
                    onClick={goNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border border-border flex items-center justify-center hover:bg-primary-50 transition-colors"
                    aria-label="Next testimonial"
                >
                    <ChevronRight className="w-5 h-5 text-text-secondary" />
                </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
                {reviews.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goTo(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                            ? 'w-8 bg-primary-500'
                            : 'w-2 bg-border hover:bg-primary-200'
                            }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
