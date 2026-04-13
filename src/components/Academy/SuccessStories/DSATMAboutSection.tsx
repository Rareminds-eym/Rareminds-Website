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

const SECTION_BASE_STYLE = {
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
  backgroundColor: '#ffffff',
  padding: '52px 24px',
} as const;

const DSATMAboutSection: React.FC<DSATMAboutSectionProps> = ({ section }) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const check = () => setIsMobile(window.innerWidth < 768);
    const debouncedCheck = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(check, 150);
    };
    check();
    window.addEventListener("resize", debouncedCheck);
    return () => {
      window.removeEventListener("resize", debouncedCheck);
      clearTimeout(timeoutId);
    };
  }, []);

  const cards: CardData[] = section.content.map((item) => {
    const getInitial = (title: string) => {
      if (title.includes('MBA')) return 'M';
      if (title.includes('Non-Teaching')) return 'N';
      if (title.includes('Civil')) return 'C';
      return title.charAt(0).toUpperCase();
    };

    const parseDescription = (description: string, title: string): BulletItem[] => {
      // Special handling for Tripura - group related items instead of splitting everything
      if (title.includes('Program Delivery') || title.includes('Modules Covered') || title.includes('Multiple Approaches')) {
        
        // For Modules Covered, we want to group items by main categories
        if (title.includes('Modules Covered')) {
          // Split the content into two main groups: Interview Skills and Cross-cultural Communication
          const content = description.trim();
          
          // Find the start of Cross-cultural Communication section
          const crossCulturalStart = content.indexOf('Cross-cultural Communication:');
          
          if (crossCulturalStart > -1) {
            // Split into two parts
            const interviewSkillsPart = content.substring(0, crossCulturalStart).trim();
            const crossCulturalPart = content.substring(crossCulturalStart).trim();
            
            const result = [];
            
            // Add Interview Skills section (remove trailing period if exists)
            if (interviewSkillsPart) {
              let cleanInterviewSkills = interviewSkillsPart.replace(/\.\s*$/, '');
              if (!cleanInterviewSkills.endsWith('.')) {
                cleanInterviewSkills += '.';
              }
              result.push({
                text: cleanInterviewSkills
              });
            }
            
            // Add Cross-cultural Communication section
            if (crossCulturalPart) {
              let cleanCrossCultural = crossCulturalPart.trim();
              if (!cleanCrossCultural.endsWith('.')) {
                cleanCrossCultural += '.';
              }
              result.push({
                text: cleanCrossCultural
              });
            }
            
            return result;
          }
          
          // If no Cross-cultural Communication found, fall back to original splitting
          const sentences = description.split('. ').filter(s => s.trim().length > 0);
          return sentences.map(sentence => ({
            text: sentence.trim().endsWith('.') ? sentence.trim() : sentence.trim() + '.'
          }));
        }
        
        // For other sections, use normal splitting
        const sentences = description.split('. ').filter(s => s.trim().length > 0);
        
        // Fix the "Dr. Subhashini" issue by rejoining split names
        const fixedSentences = [];
        for (let i = 0; i < sentences.length; i++) {
          const current = sentences[i];
          const next = sentences[i + 1];
          
          // If current ends with "Dr" and next starts with a name, combine them
          if (current.trim().endsWith('Dr') && next && next.match(/^[A-Z][a-z]/)) {
            fixedSentences.push(current + '. ' + next);
            i++; // Skip the next sentence since we combined it
          } else {
            fixedSentences.push(current);
          }
        }
        
        return fixedSentences.map(sentence => {
          let trimmed = sentence.trim();
          if (!trimmed.endsWith('.')) {
            trimmed += '.';
          }
          return { text: trimmed };
        });
      }
      
      // Original DSATM parsing logic for complex content
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
      items: parseDescription(item.description, item.title)
    };
  });

  return (
    <section
      style={{
        ...SECTION_BASE_STYLE,
        marginTop: isMobile ? '-90px' : '-35px',
        marginBottom: 0,
      }}
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
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: "20px", // Increased gap between cards
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        {cards.map((card: CardData) => (
          <div
            key={card.title}
            className="border border-teal-200 p-5" // Increased padding
            style={{ ...cardStyle, backgroundColor: '#F3FEF9' }}
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
              {card.items.map((item: BulletItem, i: number) => (
                <li key={`${card.title}-item-${i}`} className="flex items-start gap-2 text-gray-700 text-sm leading-relaxed"> {/* Increased gap, text size, and line height */}
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
