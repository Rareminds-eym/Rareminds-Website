import { safeGetItem, safeSetItem } from '@/lib/localStorage';
import { CheckCircle2, Cookie, Shield, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CookieConsentProps {
  pageName?: string;
}

export const CookieConsent = ({ pageName = 'this page' }: CookieConsentProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = safeGetItem('cookieConsent');
    if (!cookieConsent) {
      // Show banner after a short delay
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    safeSetItem('cookieConsent', 'accepted');
    handleClose();
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] transition-opacity duration-300 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleClose}
      />

      {/* Cookie Consent Modal */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[95%] max-w-2xl transition-all duration-500 ${
          isClosing ? 'translate-y-[200%] opacity-0 scale-95' : 'translate-y-0 opacity-100 scale-100'
        }`}
      >
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Decorative Top Border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E32A18] via-orange-500 to-[#E32A18]" />
          
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E32A18] rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative px-6 py-8 md:px-8 md:py-10">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200 hover:rotate-90"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with Icon */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-[#E32A18]/20 rounded-2xl blur-xl" />
                <div className="relative bg-gradient-to-br from-[#E32A18] to-orange-600 p-4 rounded-2xl">
                  <Cookie className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  🍪 Cookie Settings
                </h2>
                <p className="text-sm text-gray-500">Enhance your experience on {pageName}</p>
              </div>
            </div>

            {/* Message */}
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies to provide you with the best possible experience. Cookies help us analyze 
                site usage, personalize content, and improve your journey through our platform.
              </p>
              
              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enhanced Experience</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm">
                  <Shield className="w-4 h-4" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Personalized Content</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAccept}
                className="group relative flex-1 bg-gradient-to-r from-[#E32A18] to-orange-600 hover:from-[#c12515] hover:to-orange-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Accept All Cookies
                </span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
              
              <button
                onClick={handleClose}
                className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Decline
              </button>
            </div>

            {/* Privacy Link */}
            <p className="text-xs text-gray-500 mt-4 text-center">
              By accepting, you agree to our use of cookies. 
              <a href="/privacy-policy" className="text-[#E32A18] hover:underline ml-1">
                Learn more
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
