import React from 'react';
import { EventSectionContent } from '../../types/Events/event';

interface TeacherTrainersSectionProps {
  content?: EventSectionContent | null;
}

const TeacherTrainersSection: React.FC<TeacherTrainersSectionProps> = ({ content }) => {
  if (!content) return null;

  const heading    = content.heading;
  const subheading = content.subheading;
  const cards = (content.items as Array<{ title: string; description: string }> | undefined) ?? [];

  return (
    <section className="bg-gray-50 px-6 py-16 sm:px-10 sm:py-20 rounded-3xl">
      {(heading || subheading) && (
        <div className="mx-auto max-w-3xl text-center">
          {heading && (
            <h2 className="text-xl font-extrabold leading-tight text-slate-900 sm:text-2xl lg:text-3xl">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="mt-4 text-base text-slate-500 sm:text-lg">{subheading}</p>
          )}
          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-indigo-500" />
        </div>
      )}

      {cards.length > 0 && (
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <div
              key={i}
              className="group flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              {card.title && (
                <h3 className="text-base font-bold text-gray-900">{card.title}</h3>
              )}
              {card.description && (
                <p className="text-sm leading-relaxed text-gray-700">{card.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TeacherTrainersSection;