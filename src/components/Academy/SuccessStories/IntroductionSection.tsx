import { motion } from "framer-motion";
import { useState, useCallback, useMemo } from "react";

// Constants
const WHITESPACE_PATTERN = /\s+/;
const BASE_CLASSES = 'text-3xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-8';

interface ImageItem {
  id: string;
  url: string;
  alt?: string;
}

interface IntroductionSectionProps {
  title: string;
  content: string;
  images?: ImageItem[];
}

function IntroductionSection({ title, content, images = [] }: IntroductionSectionProps) {
  const [failedImages, setFailedImages] = useState<Set<string>>(() => new Set());

  const handleImageError = useCallback((imageUrl: string) => {
    setFailedImages(prev => {
      if (prev.has(imageUrl)) return prev;
      const next = new Set(prev);
      next.add(imageUrl);
      return next;
    });
  }, []);

  // Extract title className logic for better readability
  const isOneWord = title.trim().split(WHITESPACE_PATTERN).length === 1;
  const hasImages = images.length > 0;

  const titleClasses = useMemo(() => {
    if (isOneWord) return `${BASE_CLASSES} text-center`;
    if (hasImages) return `${BASE_CLASSES} text-center md:text-left leading-relaxed`;
    return `${BASE_CLASSES} text-center leading-relaxed`;
  }, [isOneWord, hasImages]);

  const gridClasses = useMemo(() => 
    `grid gap-20 items-center ${hasImages ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`, 
    [hasImages]
  );

  const contentClasses = useMemo(() => 
    hasImages ? 'pl-0 lg:pl-8' : 'text-center max-w-4xl mx-auto', 
    [hasImages]
  );

  return (
    <div className="w-full bg-white py-16">
      <div className="w-full px-4 sm:px-8 lg:px-32">
        <div className={gridClasses}>

          {/* Left side - Content */}
          <div className={contentClasses}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className={titleClasses}
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              className={`text-sm md:text-base text-gray-600 leading-relaxed ${images.length > 0 ? 'text-justify md:text-left' : 'text-center'
                }`}
            >
              {content}
            </motion.p>
          </div>

          {/* Right side - Images (only show if images exist) */}
          {images.length > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {images.slice(0, 2).map((image, index) => {
                  if (failedImages.has(image.url)) return null;
                  return (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="rounded-xl overflow-hidden"
                    >
                      <img
                        src={image.url}
                        alt={image.alt || `Training Session ${index + 1}`}
                        className="w-full h-48 object-cover"
                        onError={() => handleImageError(image.url)}
                      />
                    </motion.div>
                  );
                })}
              </div>

              {images.length > 2 && images[2] && !failedImages.has(images[2].url) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                  viewport={{ once: true }}
                  className="rounded-xl overflow-hidden"
                >
                  <img
                    src={images[2].url}
                    alt={images[2].alt || "Training Session 3"}
                    className="w-full h-40 object-cover"
                    onError={() => handleImageError(images[2].url)}
                  />
                </motion.div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default IntroductionSection;