import React, { useRef, useState, useEffect } from "react";
import { CalendarDaysIcon, ClockIcon, MapPinIcon, TagIcon } from "@heroicons/react/24/outline";
import { Ticket, BadgeIndianRupee } from "lucide-react";

interface HeroSectionProps {
  content?: {
    title?: string;
    description?: string;
    benefits?: string[];
  };
  zohoFormUrl?: string;
  eventDate?: string;
  eventTime?: string;
  location?: string;
  price?: number;
}

const WebinarSection: React.FC<HeroSectionProps> = ({
  content,
  zohoFormUrl,
  eventDate,
  eventTime,
  location,
  price,
}) => {
  const title       = content?.title;
  const description = content?.description;
  const benefits    = content?.benefits ?? [];

  // Dynamically track iframe height so it expands to full content — no scrollbar
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState<number>(700);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Zoho forms sometimes post their height via postMessage
      if (event.data && typeof event.data === "object" && event.data.height) {
        setIframeHeight(Number(event.data.height));
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const tryReadHeight = () => {
      try {
        const body = iframe.contentDocument?.body;
        const html = iframe.contentDocument?.documentElement;
        if (body && html) {
          const h = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.scrollHeight,
            html.offsetHeight
          );
          if (h > 100) setIframeHeight(h);
        }
      } catch {
        // cross-origin — rely on postMessage fallback above
      }
    };

    iframe.addEventListener("load", tryReadHeight);
    return () => iframe.removeEventListener("load", tryReadHeight);
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return null;
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <section id="webinar-form" className="bg-gray-50 py-8 lg:py-16 rounded-3xl">
      {/* Price Banner */}
      {price !== undefined && (
        <div className="w-full bg-amber-50 border-y border-amber-200 py-2 px-4 text-center text-sm text-amber-800 font-medium mb-6 flex items-center justify-center gap-2">
          {price === 0
            ? <Ticket className="w-4 h-4 shrink-0" />
            : <BadgeIndianRupee className="w-4 h-4 shrink-0" />}
          {price === 0
            ? "This webinar is completely Free — Register now to secure your spot!"
            : `Registration Fee: ₹${price} — Reserve your seat today!`}
        </div>
      )}

      <div className="max-w-full mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-12">

        {/* Left Content */}
        <div className="text-black mt-4 lg:mt-28 lg:ml-12">
          {title && (
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mt-4 lg:mt-8">
              {title}
            </h1>
          )}

          {description && (
            <p className="mt-4 lg:mt-6 text-sm sm:text-base text-gray-700">
              {description}
            </p>
          )}

          {benefits.length > 0 && (
            <ul className="mt-6 lg:mt-8 space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm sm:text-base">
                  <span className="text-gray-900 text-xl mt-0.5">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          )}

          {(eventDate || eventTime || location || price !== undefined) && (
            <div className="mt-6 lg:mt-8 flex flex-wrap gap-2 lg:gap-3">
              {eventDate && (
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm text-gray-800">
                  <CalendarDaysIcon className="text-gray-500 shrink-0 w-4 h-4" />
                  {formatDate(eventDate)}
                </span>
              )}
              {eventTime && (
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm text-gray-800">
                  <ClockIcon className="text-gray-500 shrink-0 w-4 h-4" />
                  {formatTime(eventTime)} IST
                </span>
              )}
              {location && (
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm text-gray-800">
                  <MapPinIcon className="text-gray-500 shrink-0 w-4 h-4" />
                  {location}
                </span>
              )}
              {price !== undefined && (
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm text-gray-800">
                  <TagIcon className="text-gray-500 shrink-0 w-4 h-4" />
                  {price === 0 ? "Free" : `₹${price}`}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Zoho Form — no overflow-hidden, iframe expands to full height */}
        <div className="bg-white rounded-2xl shadow-xl">
          {zohoFormUrl ? (
            <iframe
              ref={iframeRef}
              src={zohoFormUrl}
              title="Registration Form"
              width="100%"
              height={iframeHeight}
              className="block w-full border-0 overflow-hidden"
              scrolling="no"
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center h-64 lg:h-96 text-gray-400 text-sm">
              Registration form not configured.
            </div>
          )}
        </div>

      </div>

      {/* Sticky bottom bar — mobile only */}
      {price !== undefined && (
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
          <a
            href="#webinar-form"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("webinar-form")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center justify-center gap-2 w-full py-4 bg-indigo-600 hover:bg-indigo-600 text-white font-bold text-base shadow-lg transition-colors"
          >
            {price === 0 ? "Reserve My Free Seat →" : `Reserve My Seat — ₹${price} →`}
          </a>
        </div>
      )}
    </section>
  );
};

export default WebinarSection;