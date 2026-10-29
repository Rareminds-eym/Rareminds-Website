import { useState } from "react";
import { ArrowDownToLine, MessageCircle, MoreHorizontal } from "lucide-react";

export const CTAButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-20 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="flex flex-col gap-3">
          <a
            href="#"
            className="flex items-center gap-2 rounded-full bg-white px-4 py-3 text-gray-900 shadow-lg"
          >
            <MessageCircle aria-hidden="true" />
            <span>Chat with Project Director</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 rounded-full bg-white px-4 py-3 text-gray-900 shadow-lg"
          >
            <ArrowDownToLine aria-hidden="true" />
            <span>Download Government Brochure</span>
          </a>
        </div>
      )}
      <button
        type="button"
        aria-label={isOpen ? "Close quick actions" : "Open quick actions"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="rounded-full bg-primary p-4 text-white shadow-lg"
      >
        <MoreHorizontal aria-hidden="true" />
      </button>
    </div>
  );
};
