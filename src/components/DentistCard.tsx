import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Dentist } from '../types';
import { ArrowRight, Linkedin, BookOpen } from 'lucide-react';

interface DentistCardProps {
    dentist: Dentist;
    index?: number;
}

export default function DentistCard({ dentist, index = 0 }: DentistCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
        >
            <div className="relative bg-white rounded-2xl shadow-card overflow-hidden card-hover">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                    <motion.img
                        src={dentist.profileImageUrl}
                        alt={dentist.name}
                        className="w-full h-full object-cover object-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-text-primary/80 via-transparent to-transparent" />

                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-primary-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                            {dentist.specialty.split('&')[0].trim()}
                        </span>
                    </div>

                    {/* Experience Badge */}
                    <div className="absolute top-4 right-4">
                        <span className="bg-primary-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                            {dentist.yearsExperience}+ Years
                        </span>
                    </div>

                    {/* Name on Image */}
                    <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-1">{dentist.name}</h3>
                        <p className="text-white/80 text-sm">{dentist.credentials}</p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    <p className="text-text-secondary text-sm line-clamp-2 mb-4">
                        {dentist.biography.substring(0, 120)}...
                    </p>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {dentist.topicsCovered.slice(0, 2).map((topic) => (
                            <span
                                key={topic}
                                className="bg-primary-50 text-primary-700 text-xs px-2.5 py-1 rounded-md"
                            >
                                {topic}
                            </span>
                        ))}
                        {dentist.topicsCovered.length > 2 && (
                            <span className="text-text-muted text-xs py-1">
                                +{dentist.topicsCovered.length - 2} more
                            </span>
                        )}
                    </div>

                    {/* Institution */}
                    <div className="flex items-center gap-2 text-sm text-text-secondary mb-4">
                        <BookOpen className="w-4 h-4 text-primary-500" />
                        <span className="truncate">{dentist.institution}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                        <Link
                            to={`/dentists#${dentist.id}`}
                            className="inline-flex items-center gap-2 text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors group/link"
                        >
                            View Profile
                            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>

                        {dentist.socialLinks.linkedin && (
                            <a
                                href={dentist.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center hover:bg-primary-100 transition-colors"
                            >
                                <Linkedin className="w-4 h-4 text-primary-600" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
