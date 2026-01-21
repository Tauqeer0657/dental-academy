// Mock data for API fallback (mirrors frontend mock data)

export const dentists = [
    {
        id: 'dr-sarah-mitchell',
        name: 'Dr. Sarah Mitchell',
        credentials: 'DDS, PhD, FACD',
        specialty: 'Cosmetic Dentistry & Smile Design',
        biography: 'Dr. Sarah Mitchell is a world-renowned cosmetic dentist with over 20 years of experience transforming smiles. She pioneered several minimally invasive veneer techniques that are now industry standards.',
        profileImageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
        achievements: [
            'Author of "The Art of Smile Design" (2023)',
            'Featured in Forbes "Top 50 Dentists in America"',
            'Inventor of the Mitchell Veneer Technique',
            'Over 10,000 smile makeovers completed'
        ],
        socialLinks: {
            linkedin: 'https://linkedin.com/in/drmitchell',
            twitter: 'https://twitter.com/drmitchell'
        },
        topicsCovered: ['Veneer Techniques', 'Smile Analysis', 'Digital Smile Design', 'Patient Communication'],
        institution: 'Beverly Hills Aesthetic Dentistry',
        yearsExperience: 20
    },
    {
        id: 'dr-james-chen',
        name: 'Dr. James Chen',
        credentials: 'DMD, MS, Diplomate ABOI',
        specialty: 'Digital Implantology',
        biography: 'Dr. James Chen is a leading authority in digital implant planning and placement. His research on guided surgery protocols has been published in over 50 peer-reviewed journals.',
        profileImageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
        achievements: [
            'Director of NYU Digital Dentistry Program',
            '50+ published research papers',
            'Pioneer in AI-assisted implant planning',
            'Trained over 2,000 dentists globally'
        ],
        socialLinks: {
            linkedin: 'https://linkedin.com/in/drjameschen',
            researchGate: 'https://researchgate.net/profile/drjameschen'
        },
        topicsCovered: ['Guided Implant Surgery', 'Digital Treatment Planning', 'CBCT Analysis', 'Immediate Loading Protocols'],
        institution: 'NYU College of Dentistry',
        yearsExperience: 18
    },
    {
        id: 'dr-emily-rodriguez',
        name: 'Dr. Emily Rodriguez',
        credentials: 'DDS, FAGD, FICOI',
        specialty: 'Full-Arch Reconstruction',
        biography: 'Dr. Emily Rodriguez specializes in complex full-arch rehabilitations and has developed innovative hybrid prosthetic solutions adopted worldwide.',
        profileImageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
        achievements: [
            'Key Opinion Leader for 3 major implant companies',
            'Developed the Rodriguez Protocol for All-on-X',
            'International speaker with 200+ presentations',
            'Host of "The Implant Podcast"'
        ],
        socialLinks: {
            linkedin: 'https://linkedin.com/in/dremilyr',
            twitter: 'https://twitter.com/dremilyr'
        },
        topicsCovered: ['All-on-4 Techniques', 'Zygomatic Implants', 'Prosthetic Design', 'Managing Complications'],
        institution: 'Rodriguez Dental Institute',
        yearsExperience: 15
    },
    {
        id: 'dr-michael-thompson',
        name: 'Dr. Michael Thompson',
        credentials: 'DDS, MSD, Diplomate ABP',
        specialty: 'Periodontics & Regenerative Therapy',
        biography: 'Dr. Michael Thompson is a board-certified periodontist who leads research in tissue regeneration and growth factor applications in dentistry.',
        profileImageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop',
        achievements: [
            'Published 40+ papers on tissue regeneration',
            'Patent holder for novel regenerative membrane',
            'Harvard faculty member',
            'NIH Grant recipient'
        ],
        socialLinks: {
            linkedin: 'https://linkedin.com/in/drmthompson',
            researchGate: 'https://researchgate.net/profile/drmthompson'
        },
        topicsCovered: ['Bone Regeneration', 'Growth Factors', 'Soft Tissue Grafting', 'Peri-implantitis Management'],
        institution: 'Harvard School of Dental Medicine',
        yearsExperience: 22
    },
    {
        id: 'dr-lisa-park',
        name: 'Dr. Lisa Park',
        credentials: 'DDS, MS, DABOI/ID',
        specialty: 'Digital Workflow Integration',
        biography: 'Dr. Lisa Park bridges the gap between technology and clinical practice. She consults for major dental software companies and trains practices worldwide on digital transformation.',
        profileImageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop',
        achievements: [
            'Consultant for 5 major CAD/CAM companies',
            'Author of "Digital Dentistry Masterclass"',
            'TED speaker on future of dentistry',
            'Forbes "30 Under 30" in Healthcare'
        ],
        socialLinks: {
            linkedin: 'https://linkedin.com/in/drlisapark',
            twitter: 'https://twitter.com/drlisapark'
        },
        topicsCovered: ['CAD/CAM Workflows', 'Intraoral Scanning', 'Practice Integration', '3D Printing in Dentistry'],
        institution: 'Digital Dentistry Institute',
        yearsExperience: 12
    }
];

export const upcomingEvent = {
    id: 'master-class-2026',
    name: 'Master Class in Modern Dentistry 2026',
    description: 'Join the world\'s top 5 dental experts for an intensive 12-hour masterclass covering the latest techniques in cosmetic dentistry, implantology, and digital workflows.',
    date: '2026-04-15',
    startTime: '09:00',
    endTime: '21:00',
    timezone: 'America/New_York',
    platform: 'Zoom (Virtual)',
    basePrice: 499,
    earlyBirdPrice: 399,
    earlyBirdDeadline: '2026-01-31',
    maxCapacity: 500,
    currentRegistrations: 342,
    ceCredits: 12,
    features: [
        'Live Q&A sessions with all speakers',
        'Downloadable presentation materials',
        'Certificate of completion (12 CE credits)',
        'Access to recordings for 6 months',
        'Private community access'
    ],
    status: 'upcoming'
};

export const testimonials = [
    {
        id: 'review-1',
        attendeeName: 'Dr. Ahmed Hassan',
        attendeeCredential: 'DDS, Private Practice Owner',
        attendeePhotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        rating: 5,
        reviewText: 'This masterclass completely transformed my approach to cosmetic cases. Dr. Mitchell\'s veneer techniques alone have increased my case acceptance by 40%!',
        verified: true,
        isApproved: true,
        isFeatured: true
    },
    {
        id: 'review-2',
        attendeeName: 'Dr. Maria Santos',
        attendeeCredential: 'DMD, Prosthodontist',
        attendeePhotoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        rating: 5,
        reviewText: 'The digital implant planning module by Dr. Chen was worth the entire investment. I\'ve reduced my surgery time by 30% using his guided protocols.',
        verified: true,
        isApproved: true,
        isFeatured: true
    },
    {
        id: 'review-3',
        attendeeName: 'Dr. Robert Kim',
        attendeeCredential: 'DDS, General Dentist',
        attendeePhotoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        rating: 5,
        reviewText: 'Best continuing education investment I\'ve ever made. All five speakers delivered practical, immediately applicable techniques.',
        verified: true,
        isApproved: true,
        isFeatured: true
    },
    {
        id: 'review-4',
        attendeeName: 'Dr. Jennifer Walsh',
        attendeeCredential: 'DDS, MS, Periodontist',
        attendeePhotoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
        rating: 5,
        reviewText: 'Dr. Thompson\'s regenerative protocols have become my new standard of care. The evidence-based approach was exactly what I needed.',
        verified: true,
        isApproved: true,
        isFeatured: true
    },
    {
        id: 'review-5',
        attendeeName: 'Dr. David Miller',
        attendeeCredential: 'DMD, Oral Surgeon',
        attendeePhotoUrl: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&h=100&fit=crop',
        rating: 5,
        reviewText: 'The networking opportunities were incredible. I\'ve formed lasting collaborations with colleagues from around the world.',
        verified: true,
        isApproved: true,
        isFeatured: true
    }
];

export const pricingOptions = {
    accommodation: {
        single: { label: 'Single Room', price: 200, description: 'Private room for one person' },
        shared: { label: 'Shared Room', price: 150, description: 'Room shared with another attendee' },
        none: { label: 'No Accommodation', price: 0, description: 'I\'ll arrange my own stay' }
    },
    food: {
        halal: { label: 'Halal', price: 0 },
        vegetarian: { label: 'Vegetarian', price: 0 },
        vegan: { label: 'Vegan', price: 0 },
        none: { label: 'No Food', price: -50 }
    }
};
