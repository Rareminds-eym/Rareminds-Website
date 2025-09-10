import React from 'react';
import ReactPlayer from 'react-player';

interface TeaserVideoModalProps {
  open: boolean;
  videoUrl: string;
  onClose: () => void;
}

const TeaserVideoModal: React.FC<TeaserVideoModalProps> = ({ open, videoUrl, onClose }) => {
  React.useEffect(() => {
    if (open) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      data-modal="teaser-video-modal"
      className="fixed inset-0 z-[99999] flex items-center justify-center transition-all duration-300 modal-overlay"
      style={{
        background: 'rgba(0, 0, 0, 0.98)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}
    >
      {/* Additional backdrop layer for better coverage */}
      <div className="absolute inset-0 bg-black/95 modal-backdrop" style={{ zIndex: -1 }} />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[10000] w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-110"
      >
        <span className="text-white text-3xl">&times;</span>
      </button>
      <div className="relative flex items-center justify-center w-full max-w-2xl">
        <ReactPlayer url={videoUrl || ''} controls width="100%" height="480px" />
      </div>
    </div>
  );
};

export default TeaserVideoModal;
