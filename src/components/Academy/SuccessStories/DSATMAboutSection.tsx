import React from "react";
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { parseDescription, getInitialFromTitle, type BulletItem } from '../../../utils/textParsing';

interface CardData {
  initial: string;
  title: string;
  subtitle?: string;
  items: BulletItem[];
}

interface DSATMAboutSectionProps {
  section: {
    title: string;
    content: Array<{
      title: string;
      description: string;
    }>;
  };
}

const DSATMAboutSection: React.FC<DSATMAboutSectionProps> = ({ section }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  const cards: CardData[] = section.content.map((item, index) => {
    return {
      initial: getInitialFromTitle(item.title),
      title: item.title,
      subtitle: item.title.includes('Civil') ? "3-Day Experiential Workshop · 4th & 6th Semester" : undefined,
      items: parseDescription(item.description, item.title, index)
    };
  });

  return (
    <section
      className={`w-screen -ml-[calc(50vw-50%)] bg-white px-6 py-[52px] mb-0 ${
        isMobile ? '-mt-[90px]' : '-mt-[35px]'
      }`}
    >
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4"> {/* Increased back */}
        {section.title}
      </h2>
      <p className="text-center text-gray-500 text-sm mb-10"> {/* Increased margin */}
        The collaboration featured a series of industry-relevant training modules designed for diverse learner groups:
      </p>

      {/* Cards Grid — 3 cols desktop, 1 col mobile */}
      <div
        className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-5 max-w-[1200px] mx-auto`}
      >
        {cards.map((card: CardData, idx: number) => (
          <div
            key={`card-${idx}-${card.initial}`}
            className="border border-teal-200 p-5 rounded-[15px_15px_80px_15px] bg-[#F3FEF9]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-3"> {/* Increased gap and margin */}
              <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0"> {/* Increased icon size and text */}
                {card.initial}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm"> {/* Increased text size */}
                  {card.title}
                </p>
                {card.subtitle && (
                  <p className="text-gray-500 text-xs">{card.subtitle}</p>
                )}
              </div>
            </div>

            {/* Bullet Items */}
            <ul className="space-y-1"> {/* Increased spacing */}
              {card.items.map((item: BulletItem) => (
                <li key={item.id} className="flex items-start gap-2 text-gray-700 text-sm leading-relaxed"> {/* Increased gap, text size, and line height */}
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    {item.label && (
                      <span className="font-semibold">{item.label} </span>
                    )}
                    <span className="text-gray-600">{item.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DSATMAboutSection;
