import React from 'react';
import { GraduationCap, Laptop, ChartBar, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';




// Props interface for scroll function
interface EducationSectionProps {
  scrollToContact: () => void;
}


// Button component
interface CtaButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}






const CtaButton = ({ children, className, onClick }: CtaButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-8 py-3 font-semibold text-white rounded-full",
        "bg-education-orange hover:bg-orange-600 transition-colors",
        "shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all",
        "focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
};

// Feature item component
const FeatureItem = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-5xl mb-5 text-education-purple">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
  );
};

// Main component
const EducationSection = ({ scrollToContact }: EducationSectionProps) => {
  return (
    <section className="w-full bg-gradient-to-br from-white to-gray-100 py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 opacity-25"
        style={{
          backgroundImage: `url("/images/academy/bg.svg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10 pt-6 pb-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-black lg:text-5xl font-bold mb-4 bg-clip-text bg-education-gradient">
            Teach the way tomorrow learns. Lead the shift.
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Empower Gen Z through active, real-world learning.
          </p>
        </div>

        {/* Feature Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
          <FeatureItem
            icon={<GraduationCap strokeWidth={1.5} size={40} />}
            title="Gen Z is empowered through active, real-world learning."
          />
          <FeatureItem
            icon={<Laptop strokeWidth={1.5} size={40} />}
            title="NEP prioritises learner-led, outcome-driven methods."
          />
          <FeatureItem
            icon={<ChartBar strokeWidth={1.5} size={40} />}
            title="Digital classrooms require tech-confident faculty."
          />
          <FeatureItem
            icon={<Brain strokeWidth={1.5} size={40} />}
            title="Classrooms thrive when emotional intelligence shapes learning."
          />
        </div>

        {/* CTA Button */}
        <div className="flex flex-col items-center justify-center h-auto text-center">
          <button
            onClick={scrollToContact}
            className="bg-gradient-to-r from-red-400 to-red-500 text-white px-6 py-2 h-[60px] rounded-md shadow-md"
          >
            Lead the Change at your Institution
          </button>
          <p className="mt-4 text-gray-600">
            Connect with us to empower your faculty for tomorrow's classroom.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
