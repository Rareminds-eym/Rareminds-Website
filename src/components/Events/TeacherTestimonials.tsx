import { Quote, Star } from 'lucide-react';
import React from 'react';
import { EventSectionContent } from '../../types/Events/event';

interface TeacherTestimonialsProps {
  content?: EventSectionContent | null;
}

const TeacherTestimonials: React.FC<TeacherTestimonialsProps> = ({ content }) => {
  if (!content) return null;

  const heading = content.heading;
  const testimonials = (content.items as Array<{ name: string; designation: string; school: string; location: string; rating: number; review: string }> | undefined) ?? [];

  if (!heading && testimonials.length === 0) return null;

  return (
    <section className="mt-8 sm:mt-12 rounded-3xl bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-8xl">
        {heading && (
          <div className="text-center">
            <h2 className="mt-5 text-xl font-extrabold leading-tight text-slate-950 sm:text-2xl lg:text-3xl">
              {heading}
            </h2>
            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-blue-500" />
          </div>
        )}

        {testimonials.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <article
                key={i}
                className="flex min-h-96 flex-col rounded-3xl bg-white p-7 shadow-lg sm:p-8"
              >
                <Quote className="h-5 w-5 fill-blue-200 text-blue-200" />

                {t.rating > 0 && (
                  <div className="mt-5 flex gap-0.5 text-amber-400" aria-label={`${t.rating} star rating`}>
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <Star key={si} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                )}

                {t.review && (
                  <p className="mt-5 flex-1 text-sm leading-relaxed text-slate-950">{t.review}</p>
                )}

                <div className="mt-8 border-t border-slate-200 pt-7">
                  <div className="flex items-center gap-4">
                    {t.name && (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white bg-indigo-600">
                        {t.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      {t.name && (
                        <h3 className="text-sm font-bold text-slate-950 sm:text-base">{t.name}</h3>
                      )}
                      {(t.designation || t.school || t.location) && (
                        <p className="mt-1 text-xs leading-6 text-slate-600 sm:text-sm">
                          {[t.designation, t.school, t.location].filter(Boolean).join(' - ')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeacherTestimonials;