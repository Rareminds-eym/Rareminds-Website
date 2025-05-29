// src/components/FAQChatbot.tsx

import React, { useState, useRef, useEffect } from "react";
import { MessageCircleQuestion } from "lucide-react"; // Correct import for the message-circle-question icon
import { motion } from "framer-motion"; // For animation
import { useFAQ } from '@/hooks/useFAQ';

interface ChatEntry {
  type: "user" | "bot";
  message: string;
}

interface FAQChatbotProps {
  open?: boolean;
  onClose?: () => void;
}

const FAQChatbot: React.FC<FAQChatbotProps> = ({ open = true, onClose }) => {
  const faqsFromRedux = useFAQ();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatbotWindowRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState<ChatEntry[]>([
    {
      type: "bot",
      message: "Hello! 👋 I'm your FAQ assistant. How can I help you today?",
    },
  ]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(open); // Toggle for showing/hiding chatbot

  const findAnswer = (question: string): string => {
    for (const section of faqsFromRedux) {
      for (const q of section.faqs) {
        if (
          q.question.toLowerCase().includes(question.toLowerCase()) ||
          question.toLowerCase().includes(q.question.toLowerCase())
        ) {
          return q.answer;
        }
      }
    }
    return "I'm sorry, I couldn't find an answer to that question.";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userQuestion = input.trim();
    const botResponse = findAnswer(userQuestion);

    setChatLog((prev) => [
      ...prev,
      { type: "user", message: userQuestion },
      { type: "bot", message: botResponse },
    ]);
    setInput("");
    setSuggestions([]); // Clear suggestions after submitting
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setInput(userInput);

    if (userInput.trim()) {
      // Filter suggestions based on user input
      const filteredSuggestions = [];
      for (const section of faqsFromRedux) {
        for (const q of section.faqs) {
          if (q.question.toLowerCase().includes(userInput.toLowerCase())) {
            filteredSuggestions.push(q.question);
          }
        }
      }
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setSuggestions([]); // Clear suggestions when a suggestion is clicked
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatLog]);

  // Close chatbot when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        chatbotWindowRef.current &&
        !chatbotWindowRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Sync open prop with local isOpen state
  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <div>
      {/* Chatbot Toggle Button */}
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed right-10 bottom-6 z-50"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen((prev) => !prev)}
          className="group flex items-center gap-3 bg-[#434343] text-white p-4 rounded-full shadow-lg hover:bg-gray-600 focus:outline-none"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20"></div>
            <MessageCircleQuestion size={24} />
          </div>
        </motion.div>
      </motion.div>

      {/* Chatbot Interface */}
      {isOpen && (
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
          className="fixed bottom-24 right-6 w-[350px] max-h-[80vh] bg-white shadow-2xl rounded-2xl z-50 overflow-hidden flex flex-col"
        >
          <div className="bg-[#434343] p-4 flex justify-between items-center shrink-0">
            <h2 className="text-lg font-semibold text-white">FAQ Assistant</h2>
            <button
              onClick={onClose ? onClose : () => setIsOpen(false)}
              className="text-white hover:text-gray-200 focus:outline-none"
              aria-label="Close Chatbot"
            >
              ✕
            </button>
          </div>
          
          <div className="p-4 flex-1 flex flex-col min-h-0">
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2 flex flex-col min-h-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            >
              {chatLog.map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`p-3 rounded-lg max-w-[85%] shadow-sm ${
                    entry.type === "user"
                      ? "bg-yellow-100 self-end ml-auto text-right"
                      : "bg-gray-100 self-start mr-auto"
                  }`}
                >
                  {entry.message}
                </motion.div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  className="w-full border border-gray-200 p-2.5 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask a question..."
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

            {suggestions.length > 0 && (
              <div className="mt-3 bg-gray-50 p-3 rounded-lg border border-gray-100 max-h-[150px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                <p className="font-semibold text-sm mb-2">Suggested Questions:</p>
                <ul className="space-y-1.5">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="cursor-pointer text-blue-600 hover:text-blue-700 text-sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FAQChatbot;
