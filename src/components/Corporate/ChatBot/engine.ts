import { corporateFAQs, normalize, type FAQ, type Topic } from './knowledge';
export const QUESTION_LIMIT = 1000;
export const HISTORY_LIMIT = 100;
export type Result =
  | { kind: 'answer'; entry: FAQ }
  | { kind: 'suggestions'; entries: FAQ[] }
  | { kind: 'greeting' | 'no_match' };
const stopWords = new Set(['a', 'an', 'the', 'are', 'is', 'do', 'does', 'you', 'your', 'our', 'us', 'we', 'i', 'can', 'how', 'what', 'for', 'of', 'to', 'in', 'please', 'me', 'about']);
const tokens = (text: string) => normalize(text).split(' ').filter(word => word.length > 1 && !stopWords.has(word));

export function retrieve(question: string, topic: Topic = 'all', entries: FAQ[] = corporateFAQs): Result {
  const query = normalize(question);
  if (!query || question.length > QUESTION_LIMIT) return { kind: 'no_match' };
  if (/^(hi|hello|hey|good morning|good afternoon|good evening)( there)?$/.test(query)) return { kind: 'greeting' };
  // A conservative FAQ lookup cannot safely interpret negation or arbitrary languages.
  if (/[^\p{Script=Latin}\p{N}\s]/u.test(query) || /\b(no|not|never|dont|don t|cannot|can t|without)\b/.test(query)) return { kind: 'no_match' };
  const exact = entries.find(entry => [entry.question, ...entry.aliases].some(phrase => normalize(phrase) === query));
  if (exact) return { kind: 'answer', entry: exact };
  const words = tokens(query);
  if (!words.length) return { kind: 'no_match' };
  const ranked = entries.map(entry => {
    const vocabulary = new Set(tokens([entry.question, ...entry.aliases, ...entry.keywords].join(' ')));
    const hits = words.filter(word => vocabulary.has(word)).length;
    return { entry, hits, score: hits / words.length };
  }).filter(item => item.hits > 0 && item.score >= 0.5)
    .sort((a, b) => b.score - a.score || b.hits - a.hits || Number(b.entry.topic === topic) - Number(a.entry.topic === topic) || a.entry.id.localeCompare(b.entry.id));
  // Non-exact matches are choices, never unverified factual answers.
  return ranked.length ? { kind: 'suggestions', entries: ranked.slice(0, 5).map(item => item.entry) } : { kind: 'no_match' };
}

export interface Message {
  id: number;
  speaker: 'user' | 'bot';
  text: string;
  entry?: FAQ;
  choices?: FAQ[];
}
export interface Session { draft: string; topic: Topic | null; messages: Message[]; nextId: number; trimmed: boolean }
export const initialSession = (): Session => ({ draft: '', topic: null, messages: [], nextId: 1, trimmed: false });
export function appendExchange(session: Session, question: string, result: Result): Session {
  const response = result.kind === 'answer' ? result.entry.answer
    : result.kind === 'suggestions' ? 'Which of these questions would you like help with?'
    : result.kind === 'greeting' ? 'Hello! I can help you explore corporate recruitment and training. Choose a topic or ask a question.'
    : 'I could not confidently match that question. Try a recruitment or training question in English, or contact our team for help.';
  const messages: Message[] = [...session.messages,
    { id: session.nextId, speaker: 'user', text: question },
    { id: session.nextId + 1, speaker: 'bot', text: response,
      ...(result.kind === 'answer' ? { entry: result.entry } : {}),
      ...(result.kind === 'suggestions' ? { choices: result.entries } : {}) }];
  return { ...session, draft: '', nextId: session.nextId + 2, messages: messages.slice(-HISTORY_LIMIT), trimmed: session.trimmed || messages.length > HISTORY_LIMIT };
}
