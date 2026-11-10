import { z } from 'zod';

export const contactFormSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional().or(z.literal('')),
  company: z.string().min(1, 'Company is required'),
  position: z.string().min(1, 'Position is required'),
  message: z.string().min(1, 'Message is required')
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
