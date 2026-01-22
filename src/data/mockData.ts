import type { Dentist, WebinarEvent, Review, PricingOption } from '../types';

// Placeholder dentist data - Replace with real data
export const dentists: Dentist[] = [
    {
        id: '1',
        name: 'Dr. Sarah Mitchell',
        credentials: 'DDS, PhD, FACD',
        specialty: 'Prosthodontics & Implantology',
        biography: 'Dr. Sarah Mitchell is a world-renowned prosthodontist with over 20 years of experience in complex dental reconstructions. She has pioneered several innovative techniques in full-mouth rehabilitation and is a sought-after speaker at international dental conferences. Her research on digital dentistry has been published in over 50 peer-reviewed journals.',
        profileImageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
        achievements: [
            'Pierre Fauchard Academy Fellow',
            'American College of Dentists Fellow',
            'Published 50+ research papers',
            'Developed the Mitchell Implant Technique'
        ],
        socialLinks: {
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com',
            researchGate: 'https://researchgate.net'
        },
        topicsCovered: ['Full-mouth Rehabilitation', 'Digital Implant Planning', 'Esthetic Prosthodontics'],
        institution: 'Harvard School of Dental Medicine',
        yearsExperience: 20
    },
    {
        id: '2',
        name: 'Dr. James Chen',
        credentials: 'DMD, MS, FICOI',
        specialty: 'Endodontics & Microsurgery',
        biography: 'Dr. James Chen is a distinguished endodontist and microsurgery expert. He leads the Endodontics department at UCLA and has trained over 500 dentists worldwide in advanced root canal techniques. His expertise in using surgical microscopes has revolutionized minimally invasive endodontic procedures.',
        profileImageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
        achievements: [
            'UCLA Outstanding Faculty Award',
            'International Congress of Oral Implantologists Fellow',
            'Inventor of the Chen Retreatment System',
            'Author of "Modern Endodontics"'
        ],
        socialLinks: {
            linkedin: 'https://linkedin.com',
            researchGate: 'https://researchgate.net'
        },
        topicsCovered: ['Microscopic Endodontics', 'Root Canal Retreatment', 'Apical Surgery'],
        institution: 'UCLA School of Dentistry',
        yearsExperience: 18
    },
    {
        id: '3',
        name: 'Dr. Emily Rodriguez',
        credentials: 'DDS, MSD, Diplomate ABP',
        specialty: 'Periodontics & Regeneration',
        biography: 'Dr. Emily Rodriguez is a board-certified periodontist specializing in regenerative procedures and soft tissue grafting. She is a pioneer in using growth factors and stem cells for periodontal regeneration. Her clinic in Miami serves as a teaching center for advanced periodontal techniques.',
        profileImageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face',
        achievements: [
            'American Board of Periodontology Diplomate',
            'AAP Award for Innovation in Periodontics',
            'Featured in Top 40 Under 40 Dentists',
            'TED Talk speaker on Dental Regeneration'
        ],
        socialLinks: {
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com'
        },
        topicsCovered: ['Regenerative Periodontics', 'Soft Tissue Grafting', 'Periodontal Plastic Surgery'],
        institution: 'University of Miami',
        yearsExperience: 15
    },
    {
        id: '4',
        name: 'Dr. Michael Thompson',
        credentials: 'BDS, MDS, FDSRCS',
        specialty: 'Oral & Maxillofacial Surgery',
        biography: 'Dr. Michael Thompson is a dual-qualified oral and maxillofacial surgeon with expertise in orthognathic surgery and facial reconstruction. He has performed over 3,000 complex surgical procedures and leads the Craniofacial Surgery Unit at Johns Hopkins Hospital. His work on 3D-printed surgical guides has transformed surgical planning.',
        profileImageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face',
        achievements: [
            'Royal College of Surgeons Fellow',
            'Pioneer in Virtual Surgical Planning',
            'Johns Hopkins Excellence in Surgery Award',
            'Published 80+ surgical case studies'
        ],
        socialLinks: {
            linkedin: 'https://linkedin.com',
            researchGate: 'https://researchgate.net'
        },
        topicsCovered: ['Orthognathic Surgery', 'Facial Trauma', '3D Surgical Planning'],
        institution: 'Johns Hopkins Hospital',
        yearsExperience: 22
    },
    {
        id: '5',
        name: 'Dr. Aisha Patel',
        credentials: 'BDS, MDS, FICOI',
        specialty: 'Cosmetic & Digital Dentistry',
        biography: 'Dr. Aisha Patel is a leading cosmetic dentist and digital dentistry expert. She founded the Digital Smile Institute and has trained thousands of dentists in CAD/CAM technology and smile design. Her innovative approach to combining aesthetics with technology has made her one of the most influential dentists of her generation.',
        profileImageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=face',
        achievements: [
            'Founder of Digital Smile Institute',
            'Winner of Smile Design Award 2023',
            'Author of "The Digital Smile Revolution"',
            'Key Opinion Leader for Cerec & Invisalign'
        ],
        socialLinks: {
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com'
        },
        topicsCovered: ['Digital Smile Design', 'CAD/CAM Dentistry', 'Veneer Techniques'],
        institution: 'Digital Smile Institute',
        yearsExperience: 16
    }
];

// Webinar event data
export const upcomingEvent: WebinarEvent = {
    id: 'webinar-2026-feb',
    name: 'Master Class in Modern Dentistry 2026',
    date: '2026-02-15',
    time: '09:00',
    durationHours: 12,
    platform: 'In-Person',
    maxCapacity: 500,
    currentRegistrations: 342,
    basePrice: 499,
    status: 'upcoming',
    description: 'Join the world\'s top 5 dentists for an intensive 12-hour masterclass covering the latest techniques and technologies in modern dentistry.'
};

// Testimonials/Reviews
export const reviews: Review[] = [
    {
        id: '1',
        attendeeName: 'Dr. Robert Williams',
        attendeeCredential: 'DDS, Private Practice Owner',
        attendeePhotoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        reviewText: 'This was the most comprehensive dental education event I\'ve ever attended. The speakers were world-class and the interactive Q&A sessions were invaluable. I\'ve already implemented several techniques in my practice.',
        eventDate: '2025-11-15',
        verified: true
    },
    {
        id: '2',
        attendeeName: 'Dr. Lisa Chang',
        attendeeCredential: 'DMD, Prosthodontist',
        attendeePhotoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        reviewText: 'Absolutely transformative experience! Dr. Mitchell\'s session on digital implant planning alone was worth the entire registration fee. The networking opportunities were exceptional.',
        eventDate: '2025-11-15',
        verified: true
    },
    {
        id: '3',
        attendeeName: 'Dr. Ahmed Hassan',
        attendeeCredential: 'BDS, MDS, Endodontist',
        attendeePhotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        reviewText: 'The quality of instruction was unparalleled. Every minute of the 12 hours was packed with actionable insights. The materials kit and certificate were beautiful bonuses.',
        eventDate: '2025-08-20',
        verified: true
    },
    {
        id: '4',
        attendeeName: 'Dr. Maria Santos',
        attendeeCredential: 'DDS, Periodontist',
        attendeePhotoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        reviewText: 'As a specialist, I was skeptical about what I could learn from a general masterclass. I was completely wrong - the advanced techniques shared here opened new horizons for my practice.',
        eventDate: '2025-08-20',
        verified: true
    },
    {
        id: '5',
        attendeeName: 'Dr. David Kim',
        attendeeCredential: 'DMD, General Dentist',
        attendeePhotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        reviewText: 'Best investment in my dental career. The knowledge I gained has directly translated to better patient outcomes and increased practice revenue. Highly recommend!',
        eventDate: '2025-05-10',
        verified: true
    }
];

// Pricing options
export const pricingOptions: PricingOption[] = [
    { id: 'acc-single', type: 'accommodation', name: 'Single Room', price: 200, description: 'Private single room accommodation' },
    { id: 'acc-shared', type: 'accommodation', name: 'Shared Room', price: 150, description: 'Shared room (2 people)' },
    { id: 'acc-none', type: 'accommodation', name: 'No Accommodation', price: 0, description: 'Arrange your own accommodation' },
    { id: 'food-halal', type: 'food', name: 'Halal', price: 0, description: 'Halal meals included' },
    { id: 'food-veg', type: 'food', name: 'Vegetarian', price: 0, description: 'Vegetarian meals included' },
    { id: 'food-vegan', type: 'food', name: 'Vegan', price: 0, description: 'Vegan meals included' },
    { id: 'food-none', type: 'food', name: 'No Food', price: -50, description: 'Opt out for $50 discount' },
    { id: 'cert-hard', type: 'extras', name: 'Hard Copy Certificate', price: 25, description: 'Printed and framed certificate' },
    { id: 'cert-digital', type: 'extras', name: 'Digital Certificate', price: 0, description: 'PDF certificate included' },
    { id: 'kit', type: 'extras', name: 'Workshop Materials Kit', price: 75, description: 'Physical materials and tools kit' },
    { id: 'dinner', type: 'extras', name: 'Networking Dinner', price: 100, description: 'Exclusive dinner with speakers' }
];

// Countries list for registration
export const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
    'France', 'India', 'China', 'Japan', 'Brazil', 'Mexico', 'South Korea',
    'Italy', 'Spain', 'Netherlands', 'Sweden', 'Switzerland', 'Singapore',
    'United Arab Emirates', 'Saudi Arabia', 'South Africa', 'New Zealand',
    'Ireland', 'Belgium', 'Austria', 'Norway', 'Denmark', 'Finland', 'Other'
];

export const countryCodes = [
    { code: '+1', country: 'US/CA' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'IN' },
    { code: '+61', country: 'AU' },
    { code: '+49', country: 'DE' },
    { code: '+33', country: 'FR' },
    { code: '+81', country: 'JP' },
    { code: '+86', country: 'CN' },
    { code: '+971', country: 'UAE' },
    { code: '+65', country: 'SG' },
    { code: '+55', country: 'BR' },
    { code: '+27', country: 'ZA' },
];
