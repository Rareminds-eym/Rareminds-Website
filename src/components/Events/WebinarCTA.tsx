import React from 'react';
import { EventSectionContent } from '../../types/Events/event';

interface WebinarCTAProps {
  content?: EventSectionContent | null;
}

const WebinarCTA: React.FC<WebinarCTAProps> = ({ content }) => {
  if (!content) return null;

  const quote  = content.text;
  const button = content.button;
  const badges = content.badges ?? [];

  if (!quote && !button && badges.length === 0) return null;

  return (
    <section className="rounded-3xl bg-gray-50 px-4 py-10 text-center sm:px-10 sm:py-20">
      <div className="mx-auto mb-12 h-px w-24 rounded-full bg-slate-200" />

      {quote && (
        <h2 className="text-xl font-extrabold leading-snug text-slate-950 sm:text-2xl lg:text-3xl">
          {quote}
        </h2>
      )}

      {button && (
        <div className="mt-8">
          <button
            type="button"
            onClick={() => document.getElementById('webinar-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-2 sm:px-8 sm:py-4 text-base font-bold text-white shadow-md transition-colors duration-200 hover:bg-orange-600"
          >
            {button}
          </button>
        </div>
      )}

      {badges.length > 0 && (
        <p className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
          {badges.map((badge, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {badge.label}
              {i < badges.length - 1 && <span className="ml-3 text-slate-300">•</span>}
            </span>
          ))}
        </p>
      )}
    </section>
  );
};

export default WebinarCTA;