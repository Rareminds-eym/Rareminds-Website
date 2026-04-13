/**
 * Text parsing utilities for Success Stories components
 */

/**
 * Splits text into sentences using a regex pattern.
 * Handles edge cases like "Dr." and other abbreviations.
 * 
 * @param text - The text to split
 * @returns Array of sentences
 */
export const splitIntoSentences = (text: string): string[] => {
  return text
    .replace(/\.\s+(?=[A-Z])/g, '.|||')
    .split('|||')
    .filter(Boolean);
};

/**
 * Combines sentences into paragraphs (2 sentences per paragraph).
 * 
 * @param text - The text to process
 * @returns Array of paragraph strings
 */
export const splitIntoParagraphs = (text: string): string[] => {
  const sentences = splitIntoSentences(text);
  
  return sentences.reduce((acc: string[], sentence: string, i: number, arr: string[]) => {
    if (i % 2 === 0) {
      const combined = arr[i + 1] ? sentence + ' ' + arr[i + 1] : sentence;
      acc.push(combined);
    }
    return acc;
  }, []);
};

/**
 * Parses description text into structured bullet items.
 * Handles special formatting like "Label: text" and "Title (subtitle) - description".
 * 
 * @param description - The description text to parse
 * @param title - The section title (used for special handling)
 * @param cardIndex - Index of the card (for unique IDs)
 * @returns Array of bullet items with optional labels
 */
export interface BulletItem {
  id: string;
  label?: string;
  text: string;
}

// Constants for special section titles
export const SPECIAL_SECTIONS = {
  PROGRAM_DELIVERY: 'Program Delivery',
  MODULES_COVERED: 'Modules Covered',
  MULTIPLE_APPROACHES: 'Multiple Approaches',
} as const;

// Constants for initial mappings
export const INITIAL_MAPPINGS: Record<string, string> = {
  MBA: 'M',
  'Non-Teaching': 'N',
  Civil: 'C',
} as const;

export const parseDescription = (
  description: string,
  title: string,
  cardIndex: number
): BulletItem[] => {
  // Special handling for specific sections
  if (
    title.includes(SPECIAL_SECTIONS.PROGRAM_DELIVERY) ||
    title.includes(SPECIAL_SECTIONS.MODULES_COVERED) ||
    title.includes(SPECIAL_SECTIONS.MULTIPLE_APPROACHES)
  ) {
    // For Modules Covered, group items by main categories
    if (title.includes(SPECIAL_SECTIONS.MODULES_COVERED)) {
      const content = description.trim();
      const crossCulturalStart = content.indexOf('Cross-cultural Communication:');

      if (crossCulturalStart > -1) {
        const interviewSkillsPart = content.substring(0, crossCulturalStart).trim();
        const crossCulturalPart = content.substring(crossCulturalStart).trim();

        const result: BulletItem[] = [];

        if (interviewSkillsPart) {
          let cleanInterviewSkills = interviewSkillsPart.replace(/\.\s*$/, '');
          if (!cleanInterviewSkills.endsWith('.')) {
            cleanInterviewSkills += '.';
          }
          result.push({
            id: `${cardIndex}-interview-0`,
            text: cleanInterviewSkills,
          });
        }

        if (crossCulturalPart) {
          let cleanCrossCultural = crossCulturalPart.trim();
          if (!cleanCrossCultural.endsWith('.')) {
            cleanCrossCultural += '.';
          }
          result.push({
            id: `${cardIndex}-crosscultural-0`,
            text: cleanCrossCultural,
          });
        }

        return result;
      }

      const sentences = description.split('. ').filter((s) => s.trim().length > 0);
      return sentences.map((sentence, idx) => ({
        id: `${cardIndex}-s-${idx}`,
        text: sentence.trim().endsWith('.') ? sentence.trim() : sentence.trim() + '.',
      }));
    }

    // For other sections, use normal splitting with Dr. fix
    const sentences = description.split('. ').filter((s) => s.trim().length > 0);

    // Fix the "Dr. Name" issue by rejoining split names
    const fixedSentences: string[] = [];
    for (let i = 0; i < sentences.length; i++) {
      const current = sentences[i];
      const next = sentences[i + 1];

      if (current.trim().endsWith('Dr') && next && next.match(/^[A-Z][a-z]/)) {
        fixedSentences.push(current + '. ' + next);
        i++; // Skip the next sentence since we combined it
      } else {
        fixedSentences.push(current);
      }
    }

    return fixedSentences.map((sentence, fIdx) => {
      let trimmed = sentence.trim();
      if (!trimmed.endsWith('.')) {
        trimmed += '.';
      }
      return { id: `${cardIndex}-f-${fIdx}`, text: trimmed };
    });
  }

  // Original DSATM parsing logic for complex content
  const sentences = description.split(/\.\s+/).filter((s) => s.trim().length > 0);
  return sentences.map((sentence, sIdx) => {
    const trimmed = sentence.trim();
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex > 0 && colonIndex < 50) {
      return {
        id: `${cardIndex}-colon-${sIdx}`,
        label: trimmed.substring(0, colonIndex + 1),
        text: trimmed.substring(colonIndex + 1).trim(),
      };
    } else {
      const match = trimmed.match(/^([^(]+)\s*(\([^)]+\))\s*[–-]\s*(.+)$/);
      if (match) {
        return {
          id: `${cardIndex}-match-${sIdx}`,
          label: `${match[1].trim()} ${match[2]}`,
          text: match[3].trim(),
        };
      } else {
        return {
          id: `${cardIndex}-else-${sIdx}`,
          text: trimmed.endsWith('.') ? trimmed : trimmed + '.',
        };
      }
    }
  });
};

/**
 * Gets the initial letter for a card title.
 * 
 * @param title - The card title
 * @returns Single character initial
 */
export const getInitialFromTitle = (title: string): string => {
  for (const [key, value] of Object.entries(INITIAL_MAPPINGS)) {
    if (title.includes(key)) return value;
  }
  return title.charAt(0).toUpperCase();
};
