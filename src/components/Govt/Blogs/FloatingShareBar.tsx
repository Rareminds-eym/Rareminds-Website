import { Share, MessageSquare, Heart } from "lucide-react";

interface FloatingShareBarProps {
  title: string;
  url: string;
}

const FloatingShareBar = ({ title, url }: FloatingShareBarProps) => {
  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="floating-share hidden lg:flex">
      <button
        onClick={shareOnLinkedIn}
        className="share-button"
        title="Share on LinkedIn"
      >
        <Share className="w-5 h-5" />
      </button>
      
      <button
        onClick={shareOnWhatsApp}
        className="share-button"
        title="Share on WhatsApp"
      >
        <MessageSquare className="w-5 h-5" />
      </button>
      
      <button
        onClick={shareOnTwitter}
        className="share-button"
        title="Share on Twitter"
      >
        <Heart className="w-5 h-5" />
      </button>
    </div>
  );
};

export default FloatingShareBar;
