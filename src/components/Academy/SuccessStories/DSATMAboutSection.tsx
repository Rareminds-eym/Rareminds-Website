

import React from "react";

interface BulletItem {
  label?: string;
  text: string;
}

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

const cardStyle: React.CSSProperties = {
  borderRadius: "15px 15px 80px 15px",
};

const DSATMAboutSection: React.FC<DSATMAboutSectionProps> = ({ section }) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const cards: CardData[] = section.content.map((item) => {
    const getInitial = (title: string) => {
      if (title.includes('MBA')) return 'M';
      if (title.includes('Non-Teaching')) return 'N';
      if (title.includes('Civil')) return 'C';
      return title.charAt(0).toUpperCase();
    };

    const parseDescription = (description: string): BulletItem[] => {
      const sentences = description.split(/\.\s+/).filter(s => s.trim().length > 0);
      return sentences.map(sentence => {
        const trimmed = sentence.trim();
        const colonIndex = trimmed.indexOf(':');
        if (colonIndex > 0 && colonIndex < 50) {
          return {
            label: trimmed.substring(0, colonIndex + 1),
            text: trimmed.substring(colonIndex + 1).trim()
          };
        } else {
          const match = trimmed.match(/^([^(]+)\s*(\([^)]+\))\s*[–-]\s*(.+)$/);
          if (match) {
            return {
              label: `${match[1].trim()} ${match[2]}`,
              text: match[3].trim()
            };
          } else {
            return {
              text: trimmed.endsWith('.') ? trimmed : trimmed + '.'
            };
          }
        }
      });
    };

    return {
      initial: getInitial(item.title),
      title: item.title,
      subtitle: item.title.includes('Civil') ? "3-Day Experiential Workshop · 4th & 6th Semester" : undefined,
      items: parseDescription(item.description)
    };
  });

  return (
    <section
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        backgroundColor: '#ffffff',
        padding: '64px 32px',
        marginTop: '-35px',
        marginBottom: '0',
      }}
    >
      {/* Title */}
      <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-5">
        {section.title}
      </h2>
      <p className="text-center text-gray-500 text-sm mb-14">
        The collaboration featured a series of industry-relevant training modules designed for diverse learner groups:
      </p>

      {/* Cards Grid — 3 cols desktop, 1 col mobile */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", // ← only change
          gap: "24px",
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        {cards.map((card: CardData, index: number) => (
          <div
            key={index}
            className="border border-teal-200 p-6"
            style={{ ...cardStyle, backgroundColor: '#F3FEF9' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {card.initial}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">{card.title}</p>
                {card.subtitle && (
                  <p className="text-gray-500 text-xs">{card.subtitle}</p>
                )}
              </div>
            </div>

            {/* Bullet Items */}
            <ul className="space-y-2">
              {card.items.map((item: BulletItem, i: number) => (
                <li key={i} className="flex items-start gap-2 text-gray-700 text-sm leading-relaxed">
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