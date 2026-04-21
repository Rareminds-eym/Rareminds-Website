import React from 'react';
import { BookOpen, Target } from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  description: string;
}

interface ModulesSectionProps {
  modules: {
    title: string;
    items: ContentItem[];
  };
  approaches: {
    title: string;
    items: ContentItem[];
  };
  intervention?: {
    title: string;
    content: string;
  };
}

const ModulesSection: React.FC<ModulesSectionProps> = ({ modules, approaches, intervention }) => {
  return (
    <div className="bg-white py-8 md:py-16 -mt-8">
      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-10 text-center">
        Modules Covered & Approaches
      </h2>

      {/* Intervention block — rendered whenever the prop is provided */}
      {intervention && (
        <div className="max-w-4xl mx-auto mb-6 md:mb-12 px-4 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            {intervention.title}
          </h3>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            {intervention.content}
          </p>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">{modules.title}</h3>
                <ul className="space-y-2">
                  {modules.items.map((item) => (
                    <li key={item.id} className="text-sm text-gray-600 leading-relaxed flex items-start">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span>{item.title}{item.description ? ` — ${item.description}` : ''}</span>
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">{approaches.title}</h3>
                <ul className="space-y-2">
                  {approaches.items.map((item) => (
                    <li key={item.id} className="text-sm text-gray-600 leading-relaxed flex items-start">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span>{item.title}{item.description ? ` — ${item.description}` : ''}</span>
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
