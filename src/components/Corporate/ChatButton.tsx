import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappUrl, validateContact, type ContactDetails } from "./ChatBot/contact";

interface ChatButtonProps {
  isVisible: boolean;
  onClose: () => void;
  details?: ContactDetails;
  setDetails?: React.Dispatch<React.SetStateAction<ContactDetails>>;
}

export const ChatButton: React.FC<ChatButtonProps> = ({
  isVisible,
  onClose,
  details,
  setDetails,
}) => {
  const [localDetails, setLocalDetails] = useState<ContactDetails>({ name: "", email: "" });
  const [errors, setErrors] = useState<Partial<ContactDetails>>({});
  const [popupBlocked, setPopupBlocked] = useState(false);

  const currentDetails = details || localDetails;
  const updateDetails = setDetails || setLocalDetails;

  const handleStartChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const validationErrors = validateContact(currentDetails);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setPopupBlocked(false);
    const url = whatsappUrl(currentDetails);

    try {
      const win = window.open(url, "_blank", "noopener,noreferrer");
      if (!win || win.closed || typeof win.closed === "undefined") {
        setPopupBlocked(true);
      } else {
        onClose();
      }
    } catch {
      setPopupBlocked(true);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-blue-600 p-4 flex justify-between items-center rounded-t-2xl">
            <div className="flex items-center gap-2">
              <MessageCircle className="text-white" size={20} />
              <h3 className="text-lg font-semibold text-white">Live Chat</h3>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-100 transition-colors text-2xl leading-none p-1"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48">
                  <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path>
                  <path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path>
                  <path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path>
                  <path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path>
                  <path fill="#fff" fillRule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clipRule="evenodd"></path>
                </svg>
                <h2 className="text-2xl font-bold text-gray-800">WhatsApp Chat</h2>
              </div>
              <p className="text-gray-500 mt-2 text-center text-sm">
                Enter your details to connect with our team
              </p>
            </div>

            <form onSubmit={handleStartChat} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={currentDetails.name}
                  onChange={(e) => {
                    updateDetails((prev) => ({ ...prev, name: e.target.value }));
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-gray-50/50 text-sm ${
                    errors.name ? "border-red-400" : "border-gray-200"
                  }`}
                  required
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={currentDetails.email}
                  onChange={(e) => {
                    updateDetails((prev) => ({ ...prev, email: e.target.value }));
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-gray-50/50 text-sm ${
                    errors.email ? "border-red-400" : "border-gray-200"
                  }`}
                  required
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              {popupBlocked && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
                  <p>Popup was blocked. Please use the direct link below:</p>
                  <a
                    href={whatsappUrl(currentDetails)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-green-700 hover:underline block mt-1"
                  >
                    Open WhatsApp Chat Directly →
                  </a>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!currentDetails.name.trim() || !currentDetails.email.trim()}
                  className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm shadow-md shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start Chat
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
