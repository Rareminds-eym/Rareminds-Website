import React from 'react';
import ReactPlayer from 'react-player';
import { AlertCircle } from 'lucide-react';

interface TeaserVideoModalProps {
  open: boolean;
  videoUrl: string;
  onClose: () => void;
}

const TeaserVideoModal: React.FC<TeaserVideoModalProps> = ({ open, videoUrl, onClose }) => {
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadingTimeout, setLoadingTimeout] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  
  React.useEffect(() => {
    if (open) {
      document.body.classList.add('modal-open');
      setHasError(false);
      setIsLoading(true);
      setLoadingTimeout(false);
      setErrorMessage('');
      
      // Set a timeout for loading state
      const timeout = setTimeout(() => {
        if (isLoading) {
          setLoadingTimeout(true);
          setErrorMessage('Video is taking too long to load. This might be a network issue or the video URL may not be accessible.');
        }
      }, 15000); // 15 second timeout
      
      return () => clearTimeout(timeout);
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [open, videoUrl]);
  
  React.useEffect(() => {
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const handleError = (error?: any) => {
    console.error('Video loading error:', error);
    setHasError(true);
    setIsLoading(false);
    setErrorMessage(error?.message || 'Failed to load video. The video URL might be incorrect or the file may not be accessible.');
  };

  const handleReady = () => {
    console.log('Video ready to play');
    setIsLoading(false);
    setLoadingTimeout(false);
  };
  
  const handleRetry = () => {
    console.log('Retrying video load...');
    setHasError(false);
    setIsLoading(true);
    setLoadingTimeout(false);
    setErrorMessage('');
  };

  // Check if video URL is valid
  const isValidVideoUrl = (url: string) => {
    if (!url) return false;
    
    // Check for common video formats and streaming services
    const videoPatterns = [
      /\.(mp4|webm|ogg|avi|mov|wmv|flv|m4v)$/i, // File extensions
      /^data:video\//i, // Data URLs
      /^blob:/i, // Blob URLs
      /youtube\.com\/watch/i,
      /youtu\.be\//i,
      /vimeo\.com\//i,
      /dailymotion\.com\//i,
      /facebook\.com\/.*\/videos/i,
      /instagram\.com\/p\//i,
      /twitch\.tv\//i
    ];
    
    return videoPatterns.some(pattern => pattern.test(url));
  };
  
  // Check if it's a data URL (base64 video)
  const isDataUrl = (url: string) => {
    return url.startsWith('data:video/');
  };

  const renderVideoPlayer = () => {
    if (!videoUrl) {
      return (
        <div className="flex items-center justify-center w-full h-96 bg-gray-900 rounded-lg">
          <div className="text-center text-white">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
            <p className="text-lg font-medium mb-2">No Video Available</p>
            <p className="text-gray-400">No video has been uploaded for this event yet.</p>
          </div>
        </div>
      );
    }

    if (hasError || loadingTimeout) {
      return (
        <div className="flex items-center justify-center w-full h-96 bg-gray-900 rounded-lg">
          <div className="text-center text-white max-w-lg px-4">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
            <p className="text-lg font-medium mb-2">
              {hasError ? 'Video Failed to Load' : 'Loading Timeout'}
            </p>
            <p className="text-gray-400 mb-4">
              {errorMessage || 'There was an issue loading the video. Please try again later.'}
            </p>
            <div className="text-sm text-gray-500 bg-gray-800 p-3 rounded-lg mb-4 break-all">
              <p className="font-mono">URL: {videoUrl.substring(0, 100)}...</p>
            </div>
            <div className="flex justify-center space-x-3">
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
              {!isDataUrl(videoUrl) && (
                <button
                  onClick={() => window.open(videoUrl, '_blank')}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Open in New Tab
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    // For base64/data URLs, always use native HTML5 video element
    // ReactPlayer doesn't handle large base64 videos well
    if (isDataUrl(videoUrl)) {
      return (
        <div className="relative w-full max-w-2xl">
          <video
            src={videoUrl}
            controls
            className="w-full h-auto rounded-lg bg-black"
            onError={handleError}
            onLoadedData={handleReady}
            onCanPlay={() => {
              console.log('Base64 video can play');
              setIsLoading(false);
            }}
            onLoadStart={() => {
              console.log('Base64 video loading started');
              setIsLoading(true);
            }}
            style={{ maxHeight: '480px' }}
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 rounded-lg">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="mb-2">Loading base64 video...</p>
                <p className="text-sm text-gray-300 mb-4">Processing video data...</p>
                <button
                  onClick={() => {
                    setIsLoading(false);
                    setHasError(true);
                    setErrorMessage('Loading cancelled by user');
                  }}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Check if it's a direct video file that might not be supported by ReactPlayer
    if (isValidVideoUrl(videoUrl) && !ReactPlayer.canPlay(videoUrl)) {
      return (
        <div className="relative w-full max-w-2xl">
          <video
            src={videoUrl}
            controls
            className="w-full h-auto rounded-lg"
            onError={handleError}
            onLoadedData={handleReady}
            style={{ maxHeight: '480px' }}
          >
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/webm" />
            <source src={videoUrl} type="video/ogg" />
            Your browser does not support the video tag.
          </video>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p>Loading video...</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="relative w-full max-w-2xl">
        <ReactPlayer 
          url={videoUrl} 
          controls 
          width="100%" 
          height="480px"
          onError={handleError}
          onReady={handleReady}
          onStart={() => {
            console.log('Video started playing');
            setIsLoading(false);
          }}
          onProgress={() => {
            // Video is progressing, so it's working
            if (isLoading) {
              setIsLoading(false);
            }
          }}
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload',
                crossOrigin: 'anonymous'
              }
            },
            youtube: {
              playerVars: {
                showinfo: 1
              }
            },
            vimeo: {
              playerOptions: {
                responsive: true
              }
            }
          }}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 rounded-lg">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="mb-2">Loading video...</p>
              <p className="text-sm text-gray-300 mb-4">This may take a moment</p>
              <button
                onClick={() => {
                  setIsLoading(false);
                  setHasError(true);
                  setErrorMessage('Loading cancelled by user');
                }}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

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
      <div className="relative flex items-center justify-center w-full px-4">
        {renderVideoPlayer()}
      </div>
    </div>
  );
};

export default TeaserVideoModal;
