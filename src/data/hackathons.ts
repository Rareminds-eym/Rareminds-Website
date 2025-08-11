export interface Hackathon {
  id: string;
  name: string;
  slug: string;
  description: string;
  date: string;
  participants: string;
  prize: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  registrationLink?: string;
}

export const hackathons: Hackathon[] = [
  {
    id: '1',
    name: 'CAPAthon',
    slug: 'capathon',
    description: 'Build innovative solutions for capacity building and professional development in academic environments.',
    date: 'March 15-17, 2024',
    participants: '500+ students',
    prize: '₹1,00,000',
    status: 'upcoming',
    registrationLink: '#'
  },
  {
    id: '2',
    name: 'CodeCare 2.0',
    slug: 'codecare-2-0',
    description: 'Create innovative healthcare solutions to improve accessibility, patient care, and medical technology.',
    date: 'April 20-22, 2024',
    participants: '300+ students',
    prize: '₹75,000',
    status: 'upcoming',
    registrationLink: '#'
  },
  {
    id: '3',
    name: 'Safe Bite 2.0',
    slug: 'safe-bite-2-0',
    description: 'Develop solutions for food security, safety monitoring, and nutritional awareness in communities.',
    date: 'May 10-12, 2024',
    participants: '400+ students',
    prize: '₹80,000',
    status: 'upcoming',
    registrationLink: '#'
  }
];

export const getHackathonBySlug = (slug: string): Hackathon | undefined => {
  return hackathons.find(hackathon => hackathon.slug === slug);
};
