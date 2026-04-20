
import { motion } from "framer-motion";

interface ImageItem {
  id?: string;
  url: string;
  alt?: string;
}

interface IntroductionSectionProps {
  title: string;
  content: string;
  images?: ImageItem[];
}

function IntroductionSection({ title, content, images = [] }: IntroductionSectionProps) {
  return (
    <div className="w-full bg-white py-16">
      <div className="w-full px-4 sm:px-8 lg:px-32">
        <div className={`grid gap-20 items-center ${images.length > 0 ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>

          {/* Left side - Content */}
          <div className={`${images.length > 0 ? 'pl-0 lg:pl-8' : 'text-center max-w-4xl mx-auto'}`}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`text-3xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-8 ${
                title.trim().split(/\s+/).length === 1 ? 'text-center' : 
                images.length > 0 ? 'text-center md:text-left leading-relaxed' : 'text-center leading-relaxed'
              }`}
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              className={`text-sm md:text-base text-gray-600 leading-relaxed ${
                images.length > 0 ? 'text-justify md:text-left' : 'text-center'
              }`}
            >
              {content}
            </motion.p>
          </div>

          {/* Right side - Images (only show if images exist) */}
          {images.length > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {images.slice(0, 2).map((image, index) => (
                  <motion.div
                    key={image.id || `image-${index}`}
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
                      onError={(e) => {
                        // Hide parent container if image fails to load
                        const target = e.target as HTMLImageElement;
                        const parent = target.parentElement;
                        if (parent) {
                          parent.style.display = 'none';
                        }
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {images[2] && (
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
                    onError={(e) => {
                      // Hide parent container if image fails to load
                      const target = e.target as HTMLImageElement;
                      const parent = target.parentElement;
                      if (parent) {
                        parent.style.display = 'none';
                      }
                    }}
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