import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    once?: boolean;
}

const getVariants = (direction: string): Variants => {
    const directionMap: Record<string, { x?: number; y?: number }> = {
        up: { y: 40 },
        down: { y: -40 },
        left: { x: 40 },
        right: { x: -40 },
        none: {},
    };

    return {
        hidden: {
            opacity: 0,
            ...directionMap[direction],
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
        },
    };
};

export default function AnimatedSection({
    children,
    className = '',
    delay = 0,
    direction = 'up',
    once = true,
}: AnimatedSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once,
        amount: 0.2,
        margin: '-50px'
    });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={getVariants(direction)}
            transition={{
                duration: 0.35,
                delay,
                ease: [0.4, 0, 0.2, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Staggered children animation wrapper
interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
}

export function StaggerContainer({
    children,
    className = '',
    staggerDelay = 0.05,
}: StaggerContainerProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Individual stagger item
interface StaggerItemProps {
    children: ReactNode;
    className?: string;
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Parallax wrapper
interface ParallaxProps {
    children: ReactNode;
    className?: string;
    speed?: number;
}

export function Parallax({ children, className = '' }: ParallaxProps) {
    return (
        <motion.div
            initial={{ y: 0 }}
            whileInView={{ y: 0 }}
            viewport={{ once: false }}
            style={{
                willChange: 'transform',
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
