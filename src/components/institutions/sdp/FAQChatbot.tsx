// src/components/FAQChatbot.tsx

import React, { useState } from "react";
import faqData from "@/utils/faqData";

interface ChatEntry {
  type: "user" | "bot";
  message: string;
}

interface FAQChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQChatbot: React.FC<FAQChatbotProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState<ChatEntry[]>([
    {
      type: "bot",
      message: "Hello! 👋 I'm your FAQ assistant. How can I help you today?",
    },
  ]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

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
      const filteredSuggestions: string[] = [];
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

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-[280px] bg-[#222B33] text-white rounded-lg shadow-2xl z-50 p-2">
      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-gray-300 hover:text-white text-xl font-bold focus:outline-none"
      >
        &times;
      </button>
      <div className="flex items-center mb-3 justify-center">
        <img src="/RMLogo.webp" alt="Logo" className="w-8 h-8 object-contain" />
        <h2 className="text-xl font-semibold ">FAQ</h2>
      </div>

      <div className="h-64 overflow-y-auto bg-[#d0e3fa] rounded p-2 mb-3 space-y-2">
        {chatLog.map((entry, idx) => (
          <div
            key={idx}
            className={`p-2 text-sm rounded-md max-w-[80%] ${
              entry.type === "user"
                ? "bg-yellow-200 text-black ml-auto text-right"
                : "bg-white text-black mr-auto"
            }`}
          >
            {entry.message}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask a question..."
          className="flex-1 p-2 rounded-md text-black text-sm"
        />
        <button
          type="submit"
          className="bg-blue-400 hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium text-white"
        >
          Ask
        </button>
      </form>

      {suggestions.length > 0 && (
        <div className="mt-2 bg-[#ffffbd] p-2 rounded text-sm">
          <p className="font-medium mb-1 text-yellow-500">Suggested:</p>
          <ul className="space-y-1">
            {suggestions.slice(0, 4).map((sug, idx) => (
              <li
                key={idx}
                onClick={() => handleSuggestionClick(sug)}
                className="cursor-pointer text-black hover:text-black-400"
              >
                • {sug}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FAQChatbot;
