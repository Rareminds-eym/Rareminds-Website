import { useEffect, useRef, useState } from "react";

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  embedUrl: string;
}

interface RotatingCubeProps {
  youtubeLinks?: string[];
  channelId?: string;
}

export const RotatingCube = ({ youtubeLinks, channelId }: RotatingCubeProps) => {
  const cubeRef = useRef<HTMLDivElement>(null);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);

  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}` : url;
  };

  // Get YouTube video ID from embed URL
  const getVideoId = (embedUrl: string) => {
    const match = embedUrl.match(/(?:embed\/|v=)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  // Handle face click to open video in fullscreen
  const handleFaceClick = (video: YouTubeVideo) => {
    if (video.embedUrl.includes('youtube.com')) {
      const videoId = getVideoId(video.embedUrl);
      if (videoId) {
        // Open YouTube video in new tab
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
      }
    } else {
      // For sample videos, open in new tab
      window.open(video.embedUrl, '_blank');
    }
  };

  // Fetch YouTube videos from channel
  const fetchYouTubeVideos = async (channelId: string) => {
    setLoading(true);
    try {
      // Note: You'll need to add your YouTube API key to your project
      const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || 'YOUR_YOUTUBE_API_KEY';
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=6&type=video`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch YouTube videos');
      }

      const data = await response.json();
      const videoData: YouTubeVideo[] = data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        embedUrl: `https://www.youtube.com/embed/${item.id.videoId}?autoplay=1&mute=1&loop=1&playlist=${item.id.videoId}`
      }));

      setVideos(videoData);
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      // Fallback to sample videos if API fails
      setVideos([
        {
          id: '1',
          title: 'Sample Video 1',
          thumbnail: '',
          embedUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        },
        {
          id: '2',
          title: 'Sample Video 2',
          thumbnail: '',
          embedUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
        },
        {
          id: '3',
          title: 'Sample Video 3',
          thumbnail: '',
          embedUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        },
        {
          id: '4',
          title: 'Sample Video 4',
          thumbnail: '',
          embedUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
        },
        {
          id: '5',
          title: 'Sample Video 5',
          thumbnail: '',
          embedUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
        },
        {
          id: '6',
          title: 'Sample Video 6',
          thumbnail: '',
          embedUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (youtubeLinks && youtubeLinks.length > 0) {
      // Use provided YouTube links
      const videoData = youtubeLinks.slice(0, 6).map((link, index) => ({
        id: `custom-${index}`,
        title: `Video ${index + 1}`,
        thumbnail: '',
        embedUrl: getEmbedUrl(link)
      }));
      setVideos(videoData);
    } else if (channelId) {
      // Fetch videos from YouTube channel
      fetchYouTubeVideos(channelId);
    } else {
      // Use sample videos as fallback
      setVideos([
        {
          id: '1',
          title: 'Sample Video 1',
          thumbnail: '',
          embedUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        },
        {
          id: '2',
          title: 'Sample Video 2',
          thumbnail: '',
          embedUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
        },
        {
          id: '3',
          title: 'Sample Video 3',
          thumbnail: '',
          embedUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        },
        {
          id: '4',
          title: 'Sample Video 4',
          thumbnail: '',
          embedUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
        },
        {
          id: '5',
          title: 'Sample Video 5',
          thumbnail: '',
          embedUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
        },
        {
          id: '6',
          title: 'Sample Video 6',
          thumbnail: '',
          embedUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
        }
      ]);
    }
  }, [youtubeLinks, channelId]);

  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube) return;

    let animationId: number;
    let rotation = { x: 0, y: 0 };

    const animate = () => {
      // Slower rotation - approximately 10 seconds per face (36 degrees per second for Y axis)
      rotation.x += 0.1;
      rotation.y += 0.36;
      
      cube.style.transform = `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="relative w-64 h-64 lg:w-80 lg:h-80 flex items-center justify-center">
        <div className="text-white">Loading videos...</div>
      </div>
    );
  }

  return (
    <div className="relative w-64 h-64 lg:w-80 lg:h-80">
      {/* 3D Cube */}
      <div
        ref={cubeRef}
        className="w-full h-full relative preserve-3d"
        style={{
          transformStyle: "preserve-3d",
          transform: "perspective(1000px) rotateX(15deg) rotateY(15deg)"
        }}
      >
        {/* Front face */}
        <div 
          className="absolute inset-0 border-2 border-white/30 shadow-2xl overflow-hidden rounded-lg cursor-pointer hover:border-white/50 transition-colors"
          style={{ transform: "translateZ(80px)" }}
          onClick={() => videos[0] && handleFaceClick(videos[0])}
        >
          {videos[0]?.embedUrl.includes('youtube.com') ? (
            <iframe
              className="w-full h-full pointer-events-none"
              src={videos[0].embedUrl}
              title={videos[0].title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video 
              className="w-full h-full object-cover pointer-events-none"
              autoPlay 
              loop 
              muted
              playsInline
            >
              <source src={videos[0]?.embedUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        
        {/* Back face */}
        <div 
          className="absolute inset-0 border-2 border-white/30 shadow-2xl overflow-hidden rounded-lg cursor-pointer hover:border-white/50 transition-colors"
          style={{ transform: "rotateY(180deg) translateZ(80px)" }}
          onClick={() => videos[1] && handleFaceClick(videos[1])}
        >
          {videos[1]?.embedUrl.includes('youtube.com') ? (
            <iframe
              className="w-full h-full pointer-events-none"
              src={videos[1].embedUrl}
              title={videos[1].title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video 
              className="w-full h-full object-cover pointer-events-none"
              autoPlay 
              loop 
              muted
              playsInline
            >
              <source src={videos[1]?.embedUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        
        {/* Right face */}
        <div 
          className="absolute inset-0 border-2 border-white/30 shadow-2xl overflow-hidden rounded-lg cursor-pointer hover:border-white/50 transition-colors"
          style={{ transform: "rotateY(90deg) translateZ(80px)" }}
          onClick={() => videos[2] && handleFaceClick(videos[2])}
        >
          {videos[2]?.embedUrl.includes('youtube.com') ? (
            <iframe
              className="w-full h-full pointer-events-none"
              src={videos[2].embedUrl}
              title={videos[2].title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video 
              className="w-full h-full object-cover pointer-events-none"
              autoPlay 
              loop 
              muted
              playsInline
            >
              <source src={videos[2]?.embedUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        
        {/* Left face */}
        <div 
          className="absolute inset-0 border-2 border-white/30 shadow-2xl overflow-hidden rounded-lg cursor-pointer hover:border-white/50 transition-colors"
          style={{ transform: "rotateY(-90deg) translateZ(80px)" }}
          onClick={() => videos[3] && handleFaceClick(videos[3])}
        >
          {videos[3]?.embedUrl.includes('youtube.com') ? (
            <iframe
              className="w-full h-full pointer-events-none"
              src={videos[3].embedUrl}
              title={videos[3].title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video 
              className="w-full h-full object-cover pointer-events-none"
              autoPlay 
              loop 
              muted
              playsInline
            >
              <source src={videos[3]?.embedUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        
        {/* Top face */}
        <div 
          className="absolute inset-0 border-2 border-white/30 shadow-2xl overflow-hidden rounded-lg cursor-pointer hover:border-white/50 transition-colors"
          style={{ transform: "rotateX(90deg) translateZ(80px)" }}
          onClick={() => videos[4] && handleFaceClick(videos[4])}
        >
          {videos[4]?.embedUrl.includes('youtube.com') ? (
            <iframe
              className="w-full h-full pointer-events-none"
              src={videos[4].embedUrl}
              title={videos[4].title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video 
              className="w-full h-full object-cover pointer-events-none"
              autoPlay 
              loop 
              muted
              playsInline
            >
              <source src={videos[4]?.embedUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        
        {/* Bottom face */}
        <div 
          className="absolute inset-0 border-2 border-white/30 shadow-2xl overflow-hidden rounded-lg cursor-pointer hover:border-white/50 transition-colors"
          style={{ transform: "rotateX(-90deg) translateZ(80px)" }}
          onClick={() => videos[5] && handleFaceClick(videos[5])}
        >
          {videos[5]?.embedUrl.includes('youtube.com') ? (
            <iframe
              className="w-full h-full pointer-events-none"
              src={videos[5].embedUrl}
              title={videos[5].title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video 
              className="w-full h-full object-cover pointer-events-none"
              autoPlay 
              loop 
              muted
              playsInline
            >
              <source src={videos[5]?.embedUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-lg blur-xl scale-110 -z-10"></div>
    </div>
  );
};
