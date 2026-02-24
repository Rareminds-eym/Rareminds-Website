// Service type definitions for SDP
import { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  icon: LucideIcon;
  name: string;
  subtitle?: string;
  description: string;
  whatitis: string;
  image: string;
  color: string;
  duration: string;
  mode: string;
  servicesimg: string;
  focus: string;
  benefits: string[];
}
