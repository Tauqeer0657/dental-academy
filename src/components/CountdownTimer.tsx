import { useState, useEffect } from 'react';
import { calculateTimeLeft } from '../lib/utils';

interface CountdownTimerProps {
    targetDate: Date | string;
    className?: string;
}

export default function CountdownTimer({ targetDate, className = '' }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const timeUnits = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
    ];

    return (
        <div className={`flex items-center justify-center gap-3 sm:gap-4 ${className}`}>
            {timeUnits.map((unit, index) => (
                <div key={unit.label} className="flex items-center gap-3 sm:gap-4">
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-white shadow-lg border border-border flex items-center justify-center">
                                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary font-display">
                                    {String(unit.value).padStart(2, '0')}
                                </span>
                            </div>
                            {/* Glow effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 blur-xl -z-10" />
                        </div>
                        <span className="mt-2 text-xs sm:text-sm text-text-secondary font-medium">
                            {unit.label}
                        </span>
                    </div>

                    {/* Separator dots */}
                    {index < timeUnits.length - 1 && (
                        <div className="flex flex-col gap-2 pb-6">
                            <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                            <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
