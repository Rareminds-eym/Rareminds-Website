interface BulletItem {
  label?: string;
  text: string;
}

interface CardData {
  id: string;   
  initial: string;
  title: string;
  subtitle?: string;
  items: BulletItem[];
}

interface ContentItem {
  id: string;
  title: string;
  description: string;
  tags?: string[];
}

interface DSATMAboutSectionProps {
  section: {
    title: string;
    preamble?: string;
    content: ContentItem[];
  };
}

// Split a description string into bullet items.
// Handles "Label: text" and "Name (detail) – text" patterns.
// Does NOT special-case any program names or titles.
function parseDescription(description: string): BulletItem[] {
  // Split on ". " but avoid splitting on abbreviations like "Dr. " by
  // only splitting when the next word starts with a capital letter that
  // is followed by more lowercase letters (i.e. a real sentence start).
  const sentences = description
    .split(/\.\s+(?=[A-Z][a-z])/)
    .flatMap((s) => s.split(/\n+/))
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return sentences.map((sentence) => {
    const trimmed = sentence.endsWith(".") ? sentence : sentence + ".";
    const colonIndex = trimmed.indexOf(":");
    if (colonIndex > 0 && colonIndex < 50) {
      return {
        label: trimmed.substring(0, colonIndex + 1),
        text: trimmed.substring(colonIndex + 1).trim(),
      };
    }
    const match = trimmed.match(/^([^(]+)\s*(\([^)]+\))\s*[–-]\s*(.+)$/);
    if (match) {
      return {
        label: `${match[1].trim()} ${match[2]}`,
        text: match[3].trim(),
      };
    }
    return { text: trimmed };
  });
}

const DSATMAboutSection = ({ section }: DSATMAboutSectionProps): JSX.Element => {
  const cards: CardData[] = section.content.map((item) => ({
    id: item.id, 
    initial: item.title?.trim()?.charAt(0)?.toUpperCase() || "?",
    title: item.title,
    // First tag (if any) is used as the card subtitle
    subtitle: item.tags?.[0],
    items: parseDescription(item.description),
  }));

  const cols = Math.min(cards.length, 3);

  // Generate grid classes based on number of cards (responsive with Tailwind)
  const getGridClasses = () => {
    const baseClasses = "grid gap-5 max-w-6xl mx-auto";
    // Mobile: always 1 column, Desktop: dynamic based on card count
    if (cols === 1) return `${baseClasses} grid-cols-1`;
    if (cols === 2) return `${baseClasses} grid-cols-1 md:grid-cols-2`;
    return `${baseClasses} grid-cols-1 md:grid-cols-3`;
  };

  return (
    <section 
      className="bg-white w-screen px-6 py-12 mb-0 -mt-20 md:-mt-8 -ml-breakout"
    >
      {/* Title */}
      <h2 className="text-3xl md:text-5xl font-extrabold text-center text-gray-900 mb-12">
        {section.title}
      </h2>

      {/* Preamble — only rendered when provided */}
      {section.preamble && (
        <p className="text-center text-gray-500 text-sm mb-10">
          {section.preamble}
        </p>
      )}

      {/* Cards Grid */}
      <div className={getGridClasses()}>
        {cards.map((card) => (
          <div
            key={card.id}
            className="border border-teal-200 p-5 bg-green-50 card-asymmetric"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
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
            <ul className="space-y-1">
              {card.items.map((item, index) => (
                <li
                  key={`${card.id}-${index}`}
                  className="flex items-start gap-2 text-gray-700 text-sm leading-relaxed"
                >
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
