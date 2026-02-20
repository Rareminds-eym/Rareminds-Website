// Course type definitions for SDP
export interface Module {
  id: number;
  title: string;
  duration: string;
  topics: string[];
}

export interface Instructor {
  id: number;
  name: string;
  title: string;
  photo: string;
  bio: string;
}

export interface Course {
  id: number;
  slug: string;
  name: string;
  duration: string;
  level: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  price: number;
  currency: string;
  category: 'service' | 'course';
  serviceType: string;
  courseCategory: string;
  description: string;
  overview: string;
  heroBannerImage?: string;
  programBenefits: string[];
  whatYouLearn: string[];
  whoShouldTake: string[];
  outcomes: string[];
  curriculum?: Module[];
  instructors?: Instructor[];
  brochureUrl?: string;
}
