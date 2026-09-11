import React, { useState, useRef, useEffect, type Dispatch, type SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageCircleQuestion } from "lucide-react";
import { corporateFAQs, type FAQ, type Topic } from "./knowledge";
import { appendExchange, retrieve, type Session } from "./engine";

interface FAQChatbotProps {
  isVisible?: boolean;
  open?: boolean;
  onClose?: () => void;
  session?: Session;
  setSession?: Dispatch<SetStateAction<Session>>;
  defaultTopic?: Topic;
  onOpenChat?: () => void;
}

const FAQChatbot: React.FC<FAQChatbotProps> = ({
  isVisible = true,
  open = true,
  onClose,
  session,
  setSession,
  defaultTopic = "all",
  onOpenChat,
}) => {
  const activeVisibility = isVisible && open;
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatbotWindowRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<FAQ[]>([]);

  // Local session fallback if not provided by parent
  const [localSession, setLocalSession] = useState<Session>(() => ({
    draft: "",
    topic: defaultTopic,
    messages: [
      {
        id: 1,
        speaker: "bot",
        text: "Hello! 👋 I'm your corporate FAQ assistant. How can I help you with our recruitment or training services today?",
      },
    ],
    nextId: 2,
    trimmed: false,
  }));

  const currentSession = session || localSession;
  const updateSession = setSession || setLocalSession;

  // Initialize with initial greeting if messages are empty
  useEffect(() => {
    if (currentSession.messages.length === 0) {
      updateSession((prev) => ({
        ...prev,
        messages: [
          {
            id: 1,
            speaker: "bot",
            text: "Hello! 👋 I'm your corporate FAQ assistant. How can I help you with our recruitment or training services today?",
          },
        ],
        nextId: 2,
      }));
    }
  }, [currentSession.messages.length, updateSession]);

  // Keep chat container scrolled to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [currentSession.messages]);

  const handleSendMessage = (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    const topic = currentSession.topic || defaultTopic;
    const result = retrieve(trimmed, topic);

    updateSession((prev) => appendExchange(prev, trimmed, result));
    setInput("");
    setSuggestions([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setInput(userInput);

    if (userInput.trim().length > 1) {
      const topic = currentSession.topic || defaultTopic;
      const result = retrieve(userInput.trim(), topic);
      if (result.kind === "answer") {
        setSuggestions([result.entry]);
      } else if (result.kind === "suggestions") {
        setSuggestions(result.entries.slice(0, 4));
      } else {
        // Show matching keyword suggestions from corporate knowledge base
        const matches = corporateFAQs.filter(
          (entry) =>
            (topic === "all" || entry.topic === topic) &&
            (entry.question.toLowerCase().includes(userInput.toLowerCase()) ||
              entry.keywords.some((k) => k.toLowerCase().includes(userInput.toLowerCase())))
        );
        setSuggestions(matches.slice(0, 4));
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectFAQ = (entry: FAQ) => {
    setSuggestions([]);
    setInput("");
    // Directly record question and exact answer into the conversation
    updateSession((prev) => appendExchange(prev, entry.question, { kind: "answer", entry }));
  };

  return (
    <AnimatePresence>
      {activeVisibility && (
        <motion.div
          ref={chatbotWindowRef}
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.3 }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-32px)] max-h-[80vh] bg-white shadow-2xl rounded-2xl z-50 overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-[#434343] p-4 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <MessageCircleQuestion className="text-white" size={20} />
              <h2 className="text-lg font-semibold text-white">FAQ Assistant</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 focus:outline-none p-1 transition-colors"
              aria-label="Close Chatbot"
            >
              ✕
            </button>
          </div>

          {/* Chat Container */}
          <div className="p-4 flex-1 flex flex-col min-h-0">
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto space-y-3 mb-3 pr-2 flex flex-col min-h-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            >
              {currentSession.messages.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`p-3 rounded-lg max-w-[85%] shadow-sm ${
                    entry.speaker === "user"
                      ? "bg-yellow-100 self-end ml-auto text-right"
                      : "bg-gray-100 self-start mr-auto text-left"
                  }`}
                >
                  <p className="text-sm text-gray-800 whitespace-pre-wrap">{entry.text}</p>
                  {entry.entry?.link && (
                    <Link
                      to={entry.entry.link.href}
                      onClick={onClose}
                      className="text-xs text-blue-600 hover:text-blue-800 underline font-medium block mt-1.5"
                    >
                      {entry.entry.link.label} →
                    </Link>
                  )}
                  {entry.choices && entry.choices.length > 0 && (
                    <div className="mt-2 space-y-1 text-left">
                      <p className="text-xs font-semibold text-gray-600">Suggested options:</p>
                      {entry.choices.map((choice) => (
                        <button
                          key={choice.id}
                          onClick={() => handleSelectFAQ(choice)}
                          className="block w-full text-left text-xs bg-white text-blue-700 hover:bg-blue-50 border border-blue-200 rounded px-2 py-1 transition-colors"
                        >
                          {choice.question}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex gap-2 relative">
              <div className="flex-1 relative">
                <input
                  type="text"
                  className="w-full border border-gray-200 p-2.5 pr-12 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask a question..."
                  maxLength={1000}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition-colors p-1"
                  aria-label="Send message"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Suggestions Box */}
            {suggestions.length > 0 && (
              <div className="mt-3 bg-gray-50 p-3 rounded-lg border border-gray-100 max-h-[140px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                <p className="font-semibold text-xs text-gray-600 mb-1.5">Suggested Questions:</p>
                <ul className="space-y-1">
                  {suggestions.map((item) => (
                    <li
                      key={item.id}
                      className="cursor-pointer text-blue-600 hover:text-blue-800 text-xs py-0.5 hover:underline"
                      onClick={() => handleSelectFAQ(item)}
                    >
                      {item.question}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact Team Fallback Link */}
            {onOpenChat && (
              <div className="mt-2 text-center">
                <button
                  type="button"
                  onClick={onOpenChat}
                  className="text-xs text-gray-500 hover:text-blue-600 hover:underline transition-colors"
                >
                  Need direct assistance? Talk to our team on WhatsApp →
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FAQChatbot;
