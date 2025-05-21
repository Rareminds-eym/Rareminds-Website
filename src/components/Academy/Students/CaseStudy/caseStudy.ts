export interface Snapshot {
  parameter: string;
  details: string;
}

export interface Intervention {
  title: string;
  description: string;
}

export interface Outcome {
  statistic: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
}

export interface TransformationPoint {
  title: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  header: string;
  subheader: string;
  snapshot: Snapshot[];
  challenge: string;
  interventions: Intervention[];
  outcomes: Outcome[];
  media: {
    images?: string[];
    videos?: string[];
  };
  testimonials: Testimonial[];
  transformation: TransformationPoint[];
  callToAction: string;
}
