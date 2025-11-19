import React, { useState } from 'react';
import { Share2, Maximize2, Check, Link as LinkIcon, Facebook, Linkedin, Twitter, Mail } from 'lucide-react';

const Gallery: React.FC = () => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Construct YouTube embed URL with autoplay parameters
  const videoUrl = `https://www.youtube.com/embed/PR0I8bd5cJg?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&showinfo=0&enablejsapi=1`;
  const shareUrl = window.location.href;
  const videoTitle = "Rareminds Video Gallery";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(videoTitle);
    
    const shareLinks: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=Check out this video: ${encodedUrl}`
    };

    if (shareLinks[platform]) {
      window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-6">
            Gallery
          </h1>
        </div>

        {/* Main Video Player Card */}
        <div className="relative bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-3xl hover:border-blue-200">
          {/* Video Container */}
          <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          {/* Interactive Controls Overlay */}
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            {/* Share Button */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 border border-gray-200"
                aria-label="Share video"
              >
                <Share2 className="w-5 h-5" />
              </button>

              {/* Share Menu Dropdown */}
              {showShareMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Share this video</h3>
                  
                  {/* Copy Link */}
                  <button
                    onClick={handleCopyLink}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 mb-2"
                  >
                    {copySuccess ? (
                      <>
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-sm font-medium text-green-600">Link copied!</span>
                      </>
                    ) : (
                      <>
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <LinkIcon className="w-5 h-5 text-gray-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Copy link</span>
                      </>
                    )}
                  </button>

                  <div className="border-t border-gray-100 my-3"></div>

                  {/* Social Share Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-200"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Facebook className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Share on Facebook</span>
                    </button>

                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sky-50 transition-colors duration-200"
                    >
                      <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                        <Twitter className="w-5 h-5 text-sky-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Share on Twitter</span>
                    </button>

                    <button
                      onClick={() => handleShare('linkedin')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-200"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Linkedin className="w-5 h-5 text-blue-700" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Share on LinkedIn</span>
                    </button>

                    <button
                      onClick={() => handleShare('email')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-gray-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Share via Email</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Fullscreen Toggle Button */}
            <button
              onClick={toggleFullscreen}
              className="p-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 border border-gray-200"
              aria-label="Toggle fullscreen"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Fullscreen Modal */}
        {isFullscreen && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-in fade-in duration-300">
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-xl transition-all duration-200"
              aria-label="Close fullscreen"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-full max-w-7xl px-4">
              <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={videoUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
