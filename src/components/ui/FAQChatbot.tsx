// src/components/FAQChatbot.tsx

import React, { useState } from "react";
import { MessageCircleQuestion } from "lucide-react"; // Correct import for the message-circle-question icon
import { motion } from "framer-motion"; // For animation
import faqData from "@/constants/faqData";


interface ChatEntry {
  type: "user" | "bot";
  message: string;
}

const FAQChatbot: React.FC = () => {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState<ChatEntry[]>([
    {
      type: "bot",
      message: "Hello! 👋 I'm your FAQ assistant. How can I help you today?",
    },
  ]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false); // Toggle for showing/hiding chatbot

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
      for (const section of faqData) {
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

  return (
    <div>
      {/* Chatbot Toggle Button */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed right-6 top-1/3 -translate-y-1/2 z-50"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen((prev) => !prev)}
          className="group flex items-center gap-3 bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-gray-600 focus:outline-none"
        ><div className="relative">
            <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20"></div>
          <MessageCircleQuestion size={24} className="text-white" />
          </div> {/* FAQ Icon from Lucide */}
        </motion.div>
      </motion.div>

      {/* Chatbot Interface */}
      {isOpen && (
        <div className="max-w-lg mx-auto bg-white shadow-xl p-6 rounded-2xl fixed bottom-20 right-6 w-[300px] z-50">
            {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold focus:outline-none"
            aria-label="Close Chatbot"
          >
            &times;
          </button>
          <h2 className="text-xl font-bold mb-4 text-[#434343]">FAQ Chatbot</h2>
          <div className="h-80 overflow-y-auto space-y-2 mb-4 border p-3 rounded flex flex-col">
            {chatLog.map((entry, index) => (
              <div
                key={index}
                className={`p-2 rounded-md max-w-[80%] ${
                  entry.type === "user"
                    ? "bg-yellow-100 self-end ml-auto text-right"
                    : "bg-gray-100 self-start mr-auto"
                }`}
              >
                {entry.message}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              className="flex-1 border p-2 rounded-md"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask a question..."
            />
            <button
              type="submit"
              className="bg-yellow-400 px-4 py-2 rounded-md text-white font-semibold"
            >
              Ask
            </button>
          </form>

          {suggestions.length > 0 && (
            <div className="mt-2 bg-gray-100 p-2 rounded-md">
              <p className="font-semibold">Suggested Questions:</p>
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="cursor-pointer text-blue-500 hover:text-blue-700"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FAQChatbot;
