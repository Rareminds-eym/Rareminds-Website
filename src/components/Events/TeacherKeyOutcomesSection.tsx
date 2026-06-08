import React from 'react';
import { EventSectionContent } from '../../types/Events/event';

interface TrustStatsSectionProps {
  content?: EventSectionContent | null;
}

const TrustStatsSection: React.FC<TrustStatsSectionProps> = ({ content }) => {
  if (!content) return null;

  const heading = content.heading;
  const stats   = (content.items as Array<{ value: string; label: string }> | undefined) ?? [];
  const badges  = content.badges ?? [];

  return (
    <section className="bg-white px-6 py-24 sm:px-10 sm:py-32 mb-10 sm:mb-12 mt-10 rounded-3xl">
      {heading && (
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-extrabold leading-tight text-slate-900 sm:text-2xl lg:text-3xl">
            {heading}
          </h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-indigo-600" />
        </div>
      )}

      {stats.length > 0 && (
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 py-8 shadow-sm border-b-4 border-b-indigo-600"
            >
              {stat.value && (
                <span className="text-xl font-extrabold text-slate-900 sm:text-3xl">{stat.value}</span>
              )}
              {stat.label && (
                <span className="text-sm text-gray-700">{stat.label}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {badges.length > 0 && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {badges.map((badge, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
            >
              {badge.label}
            </span>
          ))}
        </div>
      )}
    </section>
  );
};

export default TrustStatsSection;