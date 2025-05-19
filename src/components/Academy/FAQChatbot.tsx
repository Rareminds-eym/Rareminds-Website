




import React, { useState, useRef, useEffect } from "react";
import { MessageCircleQuestion } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import faqData from "./UI/faqData";

interface ChatEntry {
  type: "user" | "bot";
  message: string;
  id: string;
}

const FAQChatbot: React.FC = () => {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState<ChatEntry[]>([
    {
      type: "bot",
      message: "Hello! 👋 I'm your FAQ assistant. How can I help you today?",
      id: "initial-message"
    },
  ]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatLog]);

  const findAnswer = (question: string): string => {
    for (const section of faqData) {
      for (const q of section.faqs) {
        if (
          q.question.toLowerCase().includes(question.toLowerCase()) ||
          question.toLowerCase().includes(q.question.toLowerCase())
        ) {
          return q.answer;
        }
      }
    }
    return "I'm sorry, I couldn't find an answer to that question. Is there anything else I can help you with?";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userQuestion = input.trim();
    
    // Add user message immediately
    setChatLog((prev) => [
      ...prev,
      { type: "user", message: userQuestion, id: `user-${Date.now()}` },
    ]);
    
    setInput("");
    setSuggestions([]);
    setIsTyping(true);
    
    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = findAnswer(userQuestion);
      setChatLog((prev) => [
        ...prev,
        { type: "bot", message: botResponse, id: `bot-${Date.now()}` },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setInput(userInput);

    if (userInput.trim()) {
      // Filter suggestions based on user input
      const filteredSuggestions: string[] = [];
      for (const section of faqData) {
        for (const q of section.faqs) {
          if (q.question.toLowerCase().includes(userInput.toLowerCase()) && 
              !filteredSuggestions.includes(q.question) &&
              filteredSuggestions.length < 3) {
            filteredSuggestions.push(q.question);
          }
        }
      }
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="z-50">
      {/* Chatbot Toggle Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed bottom-[20%] md:bottom-16 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen((prev) => !prev)}
          className="group flex items-center justify-center  bg-[#434343] text-white p-4 rounded-full shadow-lg hover:bg-gray-600 f hover:shadow-xl focus:outline-none transition-all duration-300"
          aria-label={isOpen ? "Close FAQ Chatbot" : "Open FAQ Chatbot"}
        >
          <div className="relative">
            {!isOpen && (
              <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-white"></div>
            )}
            <MessageCircleQuestion size={24} className="text-white" />
          </div>
        </motion.button>
      </motion.div>

      {/* Chatbot Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-[330px] sm:w-[380px] max-w-[90vw]  text-gray-500 hover:text-gray-800 shadow-2xl rounded-2xl overflow-hidden z-50 border border-gray-200"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r  bg-[#434343]  p-4 rounded-full shadow-lg hover:bg-gray-600 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <MessageCircleQuestion size={20} />
                <span>FAQ Assistant</span>
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                aria-label="Close Chatbot"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Chat Messages */}
            <div 
              ref={chatContainerRef}
              className="h-[320px] overflow-y-auto p-4 space-y-3 flex flex-col bg-gray-50"
            >
              <AnimatePresence>
                {chatLog.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${entry.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`p-3 rounded-xl max-w-[85%] shadow-sm ${
                        entry.type === "user"
                          ? "bg-gradient-to-r from-red-400 to-red-500 text-white rounded-tr-none"
                          : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
                      }`}
                    >
                      {entry.message}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white text-gray-800 border border-gray-200 rounded-xl rounded-tl-none p-3 shadow-sm flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-3 bg-white border-t border-gray-200">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask a question..."
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-gradient-to-r from-red-400 to-red-500 px-4 py-2 rounded-lg text-white font-medium hover:shadow-lg transition-shadow"
                >
                  Ask
                </motion.button>
              </form>

              {/* Suggestions */}
              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 bg-gray-50 rounded-lg overflow-hidden"
                  >
                    <p className="font-medium text-sm text-gray-500 px-3 pt-2">
                      Suggested Questions:
                    </p>
                    <ul className="divide-y divide-gray-100">
                      {suggestions.map((suggestion, index) => (
                        <motion.li
                          key={index}
                          whileHover={{ backgroundColor: "rgba(124, 58, 237, 0.1)" }}
                          className="cursor-pointer px-3 py-2 text-sm text-red-700 hover:text-red-900"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQChatbot;
