import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Download, Share2, Heart, ZoomIn, ZoomOut, RotateCw } from "lucide-react";

interface ImageModalProps {
  image: string;
  images?: string[]; // All images for navigation
  open: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, images = [], open, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Find current image index when modal opens
  useEffect(() => {
    if (open && image && images.length > 0) {
      const index = images.findIndex(img => img === image);
      setCurrentImageIndex(index >= 0 ? index : 0);
      setZoom(1);
      setRotation(0);
    }
  }, [open, image, images]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
        case '+':
        case '=':
          setZoom(prev => Math.min(prev + 0.2, 3));
          break;
        case '-':
          setZoom(prev => Math.max(prev - 0.2, 0.5));
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [open, currentImageIndex, images.length]);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (images.length <= 1 || isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => {
      if (direction === 'prev') {
        setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
      } else {
        setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
      }
      setZoom(1);
      setRotation(0);
      setIsAnimating(false);
    }, 150);
  };

  const handleDownload = () => {
    const currentImage = images[currentImageIndex] || image;
    const link = document.createElement('a');
    link.href = currentImage;
    link.download = `gallery-image-${currentImageIndex + 1}.jpg`;
    link.click();
  };

  const handleShare = async () => {
    const currentImage = images[currentImageIndex] || image;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Event Gallery Image',
          url: currentImage
        });
      } catch (error) {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(currentImage);
      }
    } else {
      navigator.clipboard.writeText(currentImage);
    }
  };

  if (!open) return null;

  const currentImage = images.length > 0 ? images[currentImageIndex] : image;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        open ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      style={{
        background: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(10px)'
      }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-60 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-110"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
            disabled={isAnimating}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-60 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-110 disabled:opacity-50"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
            disabled={isAnimating}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-60 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-110 disabled:opacity-50"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-60 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
          <span className="text-white text-sm font-medium">
            {currentImageIndex + 1} / {images.length}
          </span>
        </div>
      )}

      {/* Action buttons */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-60 flex gap-2">
        <button
          onClick={(e) => { e.stopPropagation(); setZoom(prev => Math.max(prev - 0.2, 0.5)); }}
          className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-110"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); setZoom(prev => Math.min(prev + 0.2, 3)); }}
          className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-110"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); setRotation(prev => prev + 90); }}
          className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-110"
          title="Rotate"
        >
          <RotateCw className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleDownload(); }}
          className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-110"
          title="Download"
        >
          <Download className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleShare(); }}
          className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-110"
          title="Share"
        >
          <Share2 className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Main image container */}
      <div 
        className={`relative max-w-[90vw] max-h-[90vh] transition-all duration-300 ${
          isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <img
          src={currentImage}
          alt={`Gallery image ${currentImageIndex + 1}`}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-all duration-500 ease-out"
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
            filter: isLoading ? 'blur(5px)' : 'blur(0px)'
          }}
          onLoad={() => setIsLoading(false)}
          onLoadStart={() => setIsLoading(true)}
        />
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Keyboard shortcuts info */}
      <div className="absolute bottom-4 right-4 z-60 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 opacity-50 hover:opacity-100 transition-opacity">
        <div className="text-white text-xs space-y-1">
          <div>ESC: Close</div>
          <div>←/→: Navigate</div>
          <div>+/-: Zoom</div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
