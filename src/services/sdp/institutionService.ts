// Institution-related services
import { Building2, LucideIcon } from 'lucide-react';

export interface InstitutionType {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  path: string;
  color: string;
  bgGradient: string;
  iconBg: string;
}

// Get available institution types
export const getInstitutionTypes = (): InstitutionType[] => {
  return [
    
    {
      id: 'college',
      title: 'COLLEGE',
      icon: Building2,
      description: 'Advanced solutions tailored for college institutions',
      path: '/universities/sdp/college/categories',
      color: 'from-purple-600 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50',
      iconBg: 'from-purple-100 to-pink-200'
    }
  ];
};

// Future: Fetch institution grades/levels
// export const getInstitutionGrades = async (institutionId: string) => {
//   const response = await fetch(`/api/institutions/${institutionId}/grades`);
//   return response.json();
// };
