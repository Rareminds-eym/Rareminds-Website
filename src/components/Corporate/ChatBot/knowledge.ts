export type Topic = 'all' | 'recruitment' | 'training';
export interface FAQ {
  id: string;
  topic: Exclude<Topic, 'all'>;
  question: string;
  aliases: string[];
  keywords: string[];
  answer: string;
  link: { label: string; href: string };
  source: string;
}

// Repository-grounded navigation guidance. Pricing, schedules and guarantees are
// deliberately referred to the team rather than inferred from marketing copy.
export const knowledgeReview = {
  owner: 'Corporate content team',
  sourceCheckedOn: '2026-09-11',
  nextReviewOn: '2026-12-11',
  businessApproval: 'Pending business review; no pricing or delivery commitments included',
};
export const corporateFAQs: FAQ[] = [
  {
    id: 'recruitment-services', topic: 'recruitment',
    question: 'Do you provide recruitment services?',
    aliases: ['Can you help us hire employees?', 'We need recruitment support', 'What recruitment services do you offer?'],
    keywords: ['recruitment', 'hiring', 'hire', 'recruiters'],
    answer: 'Explore our corporate recruitment services and share the roles you need to fill with the recruitment team. They can discuss the scope and next steps for your organisation.',
    link: { label: 'Explore recruitment', href: '/corporate/recruitment' },
    source: 'src/pages/Corporate/Recruitment/Index.tsx',
  },
  {
    id: 'recruitment-quote', topic: 'recruitment',
    question: 'How much does recruitment cost?',
    aliases: ['Can I get a recruitment quote?', 'What are your hiring fees?'],
    keywords: ['recruitment price', 'recruitment cost', 'hiring fees', 'recruitment quote'],
    answer: 'Please share your hiring requirements with the recruitment team to discuss pricing. This assistant cannot confirm a fee or hiring timeline.',
    link: { label: 'Contact recruitment', href: '/corporate/recruitment/contact' },
    source: 'src/routes.tsx',
  },
  {
    id: 'employee-training', topic: 'training',
    question: 'Can you train our employees?',
    aliases: ['Do you offer corporate training?', 'What training programs do you offer?', 'What courses do you offer?'],
    keywords: ['employee training', 'corporate training', 'staff training', 'upskilling', 'courses', 'programs'],
    answer: 'Browse our corporate training catalogue to explore programs for your team. For help choosing a program, share your learning goals with the training team.',
    link: { label: 'Explore training programs', href: '/corporate/training/services' },
    source: 'src/components/Corporate/Training/Services.tsx',
  },
  {
    id: 'leadership-training', topic: 'training',
    question: 'Do you offer leadership training?',
    aliases: ['Can you train new managers?', 'Do you have management courses?'],
    keywords: ['leadership', 'managers', 'management', 'leadership courses'],
    answer: 'Our published training content includes First-Time Manager to People Leader and Strategic Thinking and Decision Making. Ask the training team about the current program options for your managers.',
    link: { label: 'Discuss leadership training', href: '/corporate/training/contact' },
    source: 'src/pages/Corporate/Training/Services/serviceData.ts',
  },
  {
    id: 'custom-training', topic: 'training',
    question: 'Can training be customised for our team?',
    aliases: ['Can you customize a training program?', 'Do you offer customised courses?'],
    keywords: ['custom', 'customized', 'customised', 'tailored', 'customisation', 'customization'],
    answer: 'Share your team’s learning goals with the training team to discuss program customisation. The team will confirm the scope that fits your requirements.',
    link: { label: 'Discuss your requirements', href: '/corporate/training/contact' },
    source: 'src/pages/Corporate/Training/Services/serviceData.ts',
  },
  {
    id: 'training-delivery', topic: 'training',
    question: 'How are courses delivered?',
    aliases: ['How are your courses delivered?', 'Is training online or in person?', 'Can training be delivered remotely?'],
    keywords: ['delivery', 'delivered', 'online', 'remote', 'onsite', 'in person'],
    answer: 'Please check the delivery options for your selected program with the training team. This assistant cannot confirm a delivery format, location or schedule for your team.',
    link: { label: 'Check delivery options', href: '/corporate/training/contact' },
    source: 'src/routes.tsx',
  },
  {
    id: 'training-quote', topic: 'training',
    question: 'How much does corporate training cost?',
    aliases: ['Can I get a training quote?', 'What are your course fees?'],
    keywords: ['training cost', 'training price', 'course fees', 'training quote'],
    answer: 'Contact the training team with your program interests and team requirements to request pricing. This assistant cannot confirm prices, discounts or availability.',
    link: { label: 'Request training information', href: '/corporate/training/contact' },
    source: 'src/routes.tsx',
  },
];

export function normalize(value: string): string {
  return value.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
}
export function validateKnowledge(entries: FAQ[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const phrases = new Map<string, string>();
  for (const entry of entries) {
    if (!entry.id || ids.has(entry.id)) errors.push(`Duplicate or missing ID: ${entry.id}`);
    ids.add(entry.id);
    if (!['training', 'recruitment'].includes(entry.topic) || !entry.answer.trim() || !entry.source.trim()) errors.push(`Incomplete entry: ${entry.id}`);
    if (!/^\/corporate\/(training|recruitment)(\/contact|\/services)?$/.test(entry.link.href) || !entry.link.label.trim()) errors.push(`Invalid link: ${entry.id}`);
    for (const phrase of [entry.question, ...entry.aliases]) {
      const key = normalize(phrase);
      if (!key || (phrases.has(key) && phrases.get(key) !== entry.id)) errors.push(`Ambiguous question: ${phrase}`);
      phrases.set(key, entry.id);
    }
  }
  return errors;
}
