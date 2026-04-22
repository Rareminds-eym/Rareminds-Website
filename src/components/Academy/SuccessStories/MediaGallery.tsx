import { useState, useRef, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";

interface MediaItem {
  id: string;
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
    url.includes("pexels.com/download/video/") ||
    url.includes(".webm")
  );
};

const getMediaUrl = (item: MediaItem): string => {
  return item.item1 || item.item2 || item.item3 || "";
};

const ITEM_GAP = 10;

// Mobile scroll constants
const MOBILE_ITEM_WIDTH = 110; // px - width of each media item on mobile
const MOBILE_ITEM_GAP = 12;    // px - spacing between items on mobile

export const MediaGallery = ({ media, title = "Media Gallery", compact = false }: MediaGalleryProps) => {
  const uid = useId();
  const mobileScrollId = `mobile-scroll-inner-${uid.replace(/:/g, "")}`;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollInnerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
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
    const el = document.getElementById(mobileScrollId);
    if (el && media.length > 0) {
      const totalWidth = media.length * (MOBILE_ITEM_WIDTH + MOBILE_ITEM_GAP);
      el.style.setProperty("--scroll-width", `${totalWidth}px`);
    }
  }, [media, mobileScrollId]);

  if (!media || media.length === 0) return null;

  return (
    <div className={`w-screen relative bg-white ${compact ? 'pt-10 pb-6 mt-1 md:mt-2' : 'pt-16 pb-28 -mt-32 md:-mt-24 mb-2 md:mb-5'} md:pt-20 md:pb-24 pt-6 pb-6 px-4 md:px-8`} style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <h2 className={`font-bold text-gray-900 text-center ${compact ? 'text-2xl md:text-4xl mb-8 mt-2' : 'text-3xl md:text-5xl mb-6 mt-2'} md:mb-12 md:-mt-10`}>{title}</h2>

        {/* ── DESKTOP LAYOUT ── */}
        <div className="hidden md:flex gap-10 items-start max-w-5xl mx-auto">

          {/* LEFT: Main player */}
          <div ref={leftPanelRef} className="flex-1 min-w-0 max-w-4xl">
            <div
              className="relative w-full aspect-video bg-gray-900 rounded-lg shadow-sm overflow-hidden cursor-pointer group"
              onClick={() => !isSelectedVideo && setIsModalOpen(true)}
            >
              {isSelectedVideo ? (
                <video key={selectedUrl} src={selectedUrl} className="w-full h-full object-cover" controls />
              ) : (
                <>
                  <img src={selectedUrl} alt="Selected media" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">Click to expand</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* RIGHT: Thumbnail sidebar */}
          <div
            className="flex-shrink-0 overflow-hidden rounded-lg w-56"
            style={{ height: sidebarHeight > 0 ? `${sidebarHeight}px` : "auto" }}
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
                  className="flex flex-col animate-scroll-vertical gap-2.5"
                >
                  {[...media, ...media].map((item, index) => {
                    const itemUrl = getMediaUrl(item);
                    const itemIsVideo = isVideo(itemUrl);
                    const actualIndex = index % media.length;
                    const isActive = actualIndex === selectedIndex;
                    const isDuplicate = index >= media.length;

                    return (
                      <button
                        key={`desktop-${item.id}-${isDuplicate ? 'dup' : 'orig'}`}
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
                            <video src={itemUrl} className="w-full h-full object-cover" muted preload="metadata" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <Play className="w-7 h-7 text-white fill-white drop-shadow-md" />
                            </div>
                          </>
                        ) : (
                          <img src={itemUrl} alt={`Media ${actualIndex + 1}`} className="w-full h-full object-cover" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── MOBILE LAYOUT ── */}
        <div className="flex md:hidden flex-col items-center gap-4">

          <div className="w-[85%] max-w-sm">
            <div
              className="relative w-full aspect-video bg-gray-900 rounded-lg shadow-sm overflow-hidden cursor-pointer group"
              onClick={() => !isSelectedVideo && setIsModalOpen(true)}
            >
              {isSelectedVideo ? (
                <video key={selectedUrl} src={selectedUrl} className="w-full h-full object-cover" controls />
              ) : (
                <>
                  <img src={selectedUrl} alt="Selected media" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">Click to expand</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div
            className="w-full overflow-hidden px-4"
            onTouchStart={() => {
              const el = document.getElementById(mobileScrollId);
              if (el) el.style.animationPlayState = "paused";
            }}
            onTouchEnd={() => {
              const el = document.getElementById(mobileScrollId);
              if (el) el.style.animationPlayState = "running";
            }}
          >
            <div
              id={mobileScrollId}
              className="flex gap-3 animate-scroll-horizontal"
              style={{ width: "max-content" }}
            >
              {[...media, ...media].map((item, index) => {
                const itemUrl = getMediaUrl(item);
                const itemIsVideo = isVideo(itemUrl);
                const actualIndex = index % media.length;
                const isActive = actualIndex === selectedIndex;
                const isDuplicate = index >= media.length;

                return (
                  <button
                    key={`mobile-${item.id}-${isDuplicate ? 'dup' : 'orig'}`}
                    onClick={() => setSelectedIndex(actualIndex)}
                    className={`relative flex-shrink-0 rounded-lg overflow-hidden transition-all h-18 ${
                      isActive ? "ring-2 ring-blue-500" : "ring-1 ring-gray-200"
                    }`}
                    style={{ width: `${MOBILE_ITEM_WIDTH}px` }}
                  >
                    {itemIsVideo ? (
                      <>
                        <video src={itemUrl} className="w-full h-full object-cover" muted preload="metadata" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play className="w-5 h-5 text-white fill-white drop-shadow-md" />
                        </div>
                      </>
                    ) : (
                      <img src={itemUrl} alt={`Media ${actualIndex + 1}`} className="w-full h-full object-cover" />
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
                <video src={selectedUrl} className="w-full object-contain" controls autoPlay />
              ) : (
                <img src={selectedUrl} alt="Modal media" className="w-full object-contain" />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaGallery;