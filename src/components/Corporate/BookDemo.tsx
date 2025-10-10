import React from "react";
import { PopupButton } from "react-calendly";
import { Calendar, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

interface BookDemoProps {
    isVisible: boolean;
    onClose: () => void;
}

export const BookDemo: React.FC<BookDemoProps> = ({ isVisible, onClose }) => {
    const location = useLocation();
    const isOnCorporateSkillPassport = location.pathname === "/corporate/skill-passport";
    const root = document.getElementById('root');

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`fixed z-50 bg-white rounded-xl shadow-2xl p-6 w-[400px] ${isOnCorporateSkillPassport ? "left-16 bottom-5" : "bottom-40 right-24"}`}
                >
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-blue-600" />
                            <h3 className="text-lg font-semibold text-gray-900">Book a Demo</h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                            aria-label="Close booking dialog"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {root && (
                        <PopupButton
                            url="https://calendly.com/rareminds-marketing/30min"
                            text="Book a Demo Call"
                            rootElement={root}
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        />
                    )}

                    <p className="mt-4 text-sm text-gray-600 text-center">
                        Pick a convenient time for a quick demo of our solutions
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    )
} 