"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";

interface MediaItem {
  item1?: string;
  item2?: string;
  item3?: string;
}

interface MediaGalleryProps {
  media: MediaItem[];
  title?: string;
}

const isVideo = (url?: string): boolean => {
  if (!url) return false;
  return (
    url.includes("youtube.com") ||
    url.includes("youtu.be") ||
    url.includes(".mp4") ||
    url.includes(".webm")
  );
};

const getMediaUrl = (item: MediaItem): string => {
  return item.item1 || item.item2 || item.item3 || "";
};

const ITEM_GAP = 10; // px gap between thumbnails

export const MediaGallery = ({ media, title = "Media Gallery" }: MediaGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollInnerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const [sidebarHeight, setSidebarHeight] = useState(0);
  const [itemHeight, setItemHeight] = useState(140);

  const selectedMedia = media[selectedIndex];
  const selectedUrl = getMediaUrl(selectedMedia);
  const isSelectedVideo = isVideo(selectedUrl);

  // Measure left panel height → make sidebar exactly the same height
  useEffect(() => {
    const updateHeights = () => {
      if (leftPanelRef.current) {
        const h = leftPanelRef.current.getBoundingClientRect().height;
        setSidebarHeight(h);
        // Show 3 items in the visible window; compute each item's height to fill it
        const visibleCount = 3;
        const computed = Math.floor((h - ITEM_GAP * (visibleCount - 1)) / visibleCount);
        setItemHeight(computed > 80 ? computed : 80);
      }
    };

    // Wait for layout paint then measure
    const rafId = requestAnimationFrame(updateHeights);
    window.addEventListener("resize", updateHeights);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateHeights);
    };
  }, []);

  // Set CSS variable for seamless scroll animation
  useEffect(() => {
    if (scrollInnerRef.current && media.length > 0 && itemHeight > 0) {
      const totalHeight = media.length * (itemHeight + ITEM_GAP);
      scrollInnerRef.current.style.setProperty("--scroll-height", `${totalHeight}px`);
    }
  }, [media, itemHeight]);

  if (!media || media.length === 0) return null;

  return (
    <div className="w-full bg-white pt-6 pb-0 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-2 text-center">{title}</h2>

        {/* Gallery row — flex so both children share the same row */}
        <div className="flex gap-10 items-start max-w-5xl mx-auto">

          {/* ── LEFT: Main player ── */}
          <div ref={leftPanelRef} className="flex-1 min-w-0" style={{ maxWidth: "68%" }}>
            <div
              className="relative w-full aspect-video bg-gray-900 rounded-lg shadow-sm overflow-hidden cursor-pointer group"
              onClick={() => !isSelectedVideo && setIsModalOpen(true)}
            >
              {isSelectedVideo ? (
                <video
                  key={selectedUrl}
                  src={selectedUrl}
                  className="w-full h-full object-cover"
                  controls
                />
              ) : (
                <>
                  <img
                    src={selectedUrl}
                    alt="Selected media"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                      Click to expand
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ── RIGHT: Thumbnail sidebar ── exact same height as left panel */}
          <div
            className="flex-shrink-0 overflow-hidden rounded-lg"
            style={{
              width: "220px",
              height: sidebarHeight > 0 ? `${sidebarHeight}px` : "auto",
            }}
          >
            {sidebarHeight > 0 && (
              <div
                className="h-full overflow-hidden"
                onMouseEnter={() => {
                  if (scrollInnerRef.current)
                    scrollInnerRef.current.style.animationPlayState = "paused";
                }}
                onMouseLeave={() => {
                  if (scrollInnerRef.current)
                    scrollInnerRef.current.style.animationPlayState = "running";
                }}
              >
                <div
                  ref={scrollInnerRef}
                  className="scroll-inner flex flex-col"
                  style={{ gap: `${ITEM_GAP}px` }}
                >
                  {/* Original set + duplicate for seamless infinite loop */}
                  {[...media, ...media].map((item, index) => {
                    const itemUrl = getMediaUrl(item);
                    const itemIsVideo = isVideo(itemUrl);
                    const actualIndex = index % media.length;
                    const isActive = actualIndex === selectedIndex;

                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedIndex(actualIndex)}
                        className={`relative w-full rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                          isActive
                            ? "ring-2 ring-blue-500"
                            : "ring-1 ring-gray-200 hover:ring-blue-300 hover:brightness-110"
                        }`}
                        style={{ height: `${itemHeight}px` }}
                      >
                        {itemIsVideo ? (
                          <>
                            <video
                              src={itemUrl}
                              className="w-full h-full object-cover"
                              muted
                              preload="metadata"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <Play className="w-7 h-7 text-white fill-white drop-shadow-md" />
                            </div>
                          </>
                        ) : (
                          <img
                            src={itemUrl}
                            alt={`Media ${actualIndex + 1}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              {isSelectedVideo ? (
                <video
                  src={selectedUrl}
                  className="w-full object-contain"
                  controls
                  autoPlay
                />
              ) : (
                <img
                  src={selectedUrl}
                  alt="Modal media"
                  className="w-full object-contain"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll animation */}
      <style>{`
        @keyframes scrollVertical {
          0%   { transform: translateY(0); }
          100% { transform: translateY(calc(-1 * var(--scroll-height, 0px))); }
        }
        .scroll-inner {
          animation: scrollVertical 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MediaGallery;