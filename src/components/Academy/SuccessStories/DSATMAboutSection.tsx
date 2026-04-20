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

interface ContentItem {
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

const cardStyle: React.CSSProperties = {
  borderRadius: "15px 15px 80px 15px",
};

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

const DSATMAboutSection: React.FC<DSATMAboutSectionProps> = ({ section }) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const cards: CardData[] = section.content.map((item) => ({
    initial: item.title?.trim()?.charAt(0)?.toUpperCase() || "?",
    title: item.title,
    // First tag (if any) is used as the card subtitle
    subtitle: item.tags?.[0],
    items: parseDescription(item.description),
  }));

  const cols = Math.min(cards.length, 3);

  return (
    <section
      style={{
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        backgroundColor: "#ffffff",
        padding: "52px 24px",
        marginTop: isMobile ? "-90px" : "-35px",
        marginBottom: "0px",
      }}
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : `repeat(${cols}, 1fr)`,
          gap: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className="border border-teal-200 p-5"
            style={{ ...cardStyle, backgroundColor: "#F3FEF9" }}
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
              {card.items.map((item, i) => (
                <li
                  key={i}
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
