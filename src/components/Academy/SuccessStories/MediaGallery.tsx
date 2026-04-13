import { useState, useRef, useEffect } from "react";
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
  compact?: boolean;
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

const ALLOWED_PROTOCOLS = ['https:', 'http:'];
const sanitizeUrl = (url: string): string => {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    return ALLOWED_PROTOCOLS.includes(parsed.protocol) ? url : '';
  } catch {
    return '';
  }
};

const getMediaUrl = (item: MediaItem): string => {
  return sanitizeUrl(item.item1 || item.item2 || item.item3 || '');
};

const ITEM_GAP = 10;

export const MediaGallery = ({ media, title = "Media Gallery", compact = false }: MediaGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollInnerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [sidebarHeight, setSidebarHeight] = useState(0);
  const [itemHeight, setItemHeight] = useState(140);

  const selectedMedia = media[selectedIndex];
  const selectedUrl = getMediaUrl(selectedMedia);
  const isSelectedVideo = isVideo(selectedUrl);

  useEffect(() => {
    const updateHeights = () => {
      if (leftPanelRef.current) {
        const h = leftPanelRef.current.getBoundingClientRect().height;
        setSidebarHeight(h);
        const visibleCount = 3;
        const computed = Math.floor((h - ITEM_GAP * (visibleCount - 1)) / visibleCount);
        setItemHeight(computed > 80 ? computed : 80);
      }
    };

    const rafId = requestAnimationFrame(updateHeights);
    window.addEventListener("resize", updateHeights);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateHeights);
    };
  }, []);

  useEffect(() => {
    if (scrollInnerRef.current && media.length > 0 && itemHeight > 0) {
      const totalHeight = media.length * (itemHeight + ITEM_GAP);
      scrollInnerRef.current.style.setProperty("--scroll-height", `${totalHeight}px`);
    }
  }, [media, itemHeight]);

  useEffect(() => {
    if (mobileScrollRef.current && media.length > 0) {
      // Each item is 110px wide + 12px gap (gap-3)
      const totalWidth = media.length * (110 + 12);
      mobileScrollRef.current.style.setProperty("--scroll-width", `${totalWidth}px`);
    }
  }, [media]);

  if (!media || media.length === 0) return null;

  return (
    <div className={`w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white ${compact ? 'pt-10 pb-6 mt-1 md:mt-2' : 'pt-16 pb-28 -mt-32 md:-mt-24 mb-2 md:mb-5'} md:pt-20 md:pb-24 pt-6 pb-6 px-4 md:px-8`}>
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <h2 className={`font-bold text-gray-900 text-center ${compact ? 'text-2xl md:text-4xl mb-8 mt-2' : 'text-3xl md:text-5xl mb-6 mt-2'} md:mb-12 md:-mt-10`}>{title}</h2>

        {/* ── DESKTOP LAYOUT (md and above) ── */}
        <div className="hidden md:flex gap-10 items-start max-w-5xl mx-auto">

          {/* LEFT: Main player */}
          <div ref={leftPanelRef} className="flex-1 min-w-0 max-w-[68%]">
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

          {/* RIGHT: Thumbnail sidebar */}
          <div
            className="flex-shrink-0 overflow-hidden rounded-lg w-[220px]"
            style={{
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
                  {[...media, ...media].map((item, index) => {
                    const loopRound = Math.floor(index / media.length);
                    const itemUrl = getMediaUrl(item);
                    const itemIsVideo = isVideo(itemUrl);
                    const actualIndex = index % media.length;
                    const isActive = actualIndex === selectedIndex;

                    return (
                      <button
                        key={`${loopRound}-${actualIndex}`}
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
                              aria-label={`Video thumbnail ${actualIndex + 1}`}
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

        {/* ── MOBILE LAYOUT (below md) ── */}
        <div className="flex md:hidden flex-col items-center gap-4">

          {/* Main player — reduced width & height, centered */}
          <div className="w-[85%] max-w-sm">
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

          {/* Horizontal auto-scrolling thumbnails */}
          <div
            className="w-full overflow-hidden px-4"
            onTouchStart={() => {
              if (mobileScrollRef.current) mobileScrollRef.current.style.animationPlayState = "paused";
            }}
            onTouchEnd={() => {
              if (mobileScrollRef.current) mobileScrollRef.current.style.animationPlayState = "running";
            }}
          >
            <div
              id="mobile-scroll-inner"
              ref={mobileScrollRef}
              className="mobile-scroll-inner flex gap-3"
              style={{ width: "max-content" }}
            >
              {[...media, ...media].map((item, index) => {
                const loopRound = Math.floor(index / media.length);
                const itemUrl = getMediaUrl(item);
                const itemIsVideo = isVideo(itemUrl);
                const actualIndex = index % media.length;
                const isActive = actualIndex === selectedIndex;

                return (
                  <button
                    key={`${loopRound}-${actualIndex}`}
                    onClick={() => setSelectedIndex(actualIndex)}
                    className={`relative flex-shrink-0 rounded-lg overflow-hidden transition-all w-[110px] h-[72px] ${
                      isActive
                        ? "ring-2 ring-blue-500"
                        : "ring-1 ring-gray-200"
                    }`}
                  >
                    {itemIsVideo ? (
                      <>
                        <video
                          src={itemUrl}
                          className="w-full h-full object-cover"
                          muted
                          preload="metadata"
                          aria-label={`Video thumbnail ${actualIndex + 1}`}
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play className="w-5 h-5 text-white fill-white drop-shadow-md" />
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
        @keyframes scrollHorizontal {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-1 * var(--scroll-width, 0px))); }
        }
        .mobile-scroll-inner {
          animation: scrollHorizontal 20s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default MediaGallery;