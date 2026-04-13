import React, { useMemo } from 'react';
import { BookOpen, Target } from 'lucide-react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

interface ModulesSectionProps {
  modules: {
    title: string;
    content: string;
  };
  approaches: {
    title: string;
    content: string;
  };
  projectName?: string;
  intervention?: {
    title: string;
    content: string;
  };
}

const splitSentences = (text: string): string[] =>
  text.replace(/([^A-Z(]).\s+(?=[A-Z])/g, '$1.|||').split('|||').filter(s => s.trim().length > 0);

const ModulesSection: React.FC<ModulesSectionProps> = ({ modules, approaches, projectName, intervention }) => {
  // Default handling for all programs (Tripura now uses dedicated layout)
  const modulesList = splitSentences(modules.content);
  const approachesList = splitSentences(approaches.content);

  const isMobile = useMediaQuery('(max-width: 767px)');

  const gridStyle = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
    gap: '32px',
  }), [isMobile]);

  return (
    <div className="bg-white py-8 md:py-16 -mt-8">
      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-10 text-center">
        Modules Covered & Approaches
      </h2>

      {projectName === 'Global International School' && intervention && (
        <div className="max-w-4xl mx-auto mb-6 md:mb-12 px-4">
          <div className="text-center">
            <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-4">
              {intervention.title}
            </h3>
            <p className="text-base md:text-sm text-gray-700 leading-relaxed">
              {intervention.content}
            </p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">

          <div
            style={gridStyle}
          >

            {/* LEFT CARD — Modules Covered */}
            <div className="relative p-10">
              <div
                className="absolute inset-0"
                style={{
                  background: '#EFF6FF',
                  clipPath: 'polygon(8% 6%, 100% 0%, 100% 100%, 8% 94%)',
                }}
              />
              <div className="relative z-10 ml-6" style={{ maxWidth: '200%' }}>
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {modules.title}
                </h3>
                <ul className="space-y-2">
                  {modulesList.map((item, index) => (
                    <li key={`module-${index}-${item.slice(0, 15)}`} className="text-sm text-gray-600 leading-relaxed flex items-start">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{item.trim().replace(/\.$/, '')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT CARD — Multiple Approaches */}
            <div className="relative p-10">
              <div
                className="absolute inset-0"
                style={{
                  background: '#EFF6FF',
                  clipPath: 'polygon(0% 0%, 92% 6%, 92% 94%, 0% 100%)',
                }}
              />
              <div className="relative z-10" style={{ maxWidth: '250%' }}>
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {approaches.title}
                </h3>
                <ul className="space-y-2">
                  {approachesList.map((item, index) => (
                    <li key={`approach-${index}-${item.slice(0, 15)}`} className="text-sm text-gray-600 leading-relaxed flex items-start">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{item.trim().replace(/\.$/, '')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ModulesSection;
