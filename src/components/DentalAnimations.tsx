import { motion } from 'framer-motion';

interface FloatingToothProps {
    className?: string;
    delay?: number;
    size?: number;
}

export default function FloatingTooth({ className = '', delay = 0, size = 40 }: FloatingToothProps) {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 64 80"
            fill="none"
            className={className}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0.4, 0.7, 0.4],
                y: [0, -12, 0],
                rotate: [-3, 3, -3],
                scale: 1
            }}
            transition={{
                duration: 5,
                delay,
                repeat: Infinity,
                ease: 'easeInOut'
            }}
        >
            {/* Main tooth body - crown */}
            <path
                d="M32 4C20 4 12 14 12 26C12 32 14 38 16 44C18 50 18 54 16 62C16 66 18 70 22 70C26 70 28 66 30 60C31 56 32 56 32 56C32 56 33 56 34 60C36 66 38 70 42 70C46 70 48 66 48 62C46 54 46 50 48 44C50 38 52 32 52 26C52 14 44 4 32 4Z"
                fill="currentColor"
                fillOpacity="0.2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Left root */}
            <path
                d="M22 62C22 66 20 74 18 78"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.6"
            />
            {/* Right root */}
            <path
                d="M42 62C42 66 44 74 46 78"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.6"
            />
            {/* Shine/highlight on crown */}
            <motion.ellipse
                cx="24"
                cy="18"
                rx="5"
                ry="8"
                fill="currentColor"
                fillOpacity="0.15"
            />
            {/* Secondary highlight */}
            <motion.ellipse
                cx="40"
                cy="20"
                rx="3"
                ry="5"
                fill="currentColor"
                fillOpacity="0.1"
            />
        </motion.svg>
    );
}

// Sparkle animation for premium feel
export function AnimatedSparkle({ className = '', delay = 0 }: { className?: string; delay?: number }) {
    return (
        <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5],
                rotate: [0, 180, 360]
            }}
            transition={{
                duration: 3,
                delay,
                repeat: Infinity,
                ease: 'easeInOut'
            }}
        >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </motion.svg>
    );
}

// Floating plus signs for medical/dental theme
export function FloatingPlus({ className = '', delay = 0 }: { className?: string; delay?: number }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0 }}
            animate={{
                opacity: [0.2, 0.5, 0.2],
                y: [0, -20, 0],
                x: [0, 10, 0]
            }}
            transition={{
                duration: 5,
                delay,
                repeat: Infinity,
                ease: 'easeInOut'
            }}
        >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <rect x="8" y="2" width="4" height="16" rx="2" />
                <rect x="2" y="8" width="16" height="4" rx="2" />
            </svg>
        </motion.div>
    );
}

// Animated gradient orb
export function GradientOrb({ className = '', delay = 0 }: { className?: string; delay?: number }) {
    return (
        <motion.div
            className={`rounded-full blur-2xl ${className}`}
            animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
                duration: 6,
                delay,
                repeat: Infinity,
                ease: 'easeInOut'
            }}
        />
    );
}

// Pulsing ring animation
export function PulsingRing({ className = '' }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border-2 border-primary-400"
                    initial={{ opacity: 0.6, scale: 1 }}
                    animate={{ opacity: 0, scale: 2 }}
                    transition={{
                        duration: 2,
                        delay: i * 0.6,
                        repeat: Infinity,
                        ease: 'easeOut'
                    }}
                />
            ))}
        </div>
    );
}

// Animated counter for stats
interface AnimatedCounterProps {
    value: string;
    className?: string;
}

export function AnimatedCounter({ value, className = '' }: AnimatedCounterProps) {

    return (
        <motion.span
            className={className}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {value}
            </motion.span>
        </motion.span>
    );
}
