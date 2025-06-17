import { useEffect, useState } from 'react';

interface VideoItem {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    publishedAt: string;
  };
}

const YouTubeFeed = () => {  
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;       // 🔑 API key from .env file
  const channelId = 'UClkBtwJsScYxFzNoFdlifeA';  // 📺 Channel ID
  const maxResults = 20; // Fetch more results to ensure we have enough after filtering
  // Only using "student" as keyword to be very specific
  const studentKeyword = 'student';
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);        // Search specifically for "student" videos to improve initial results
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}&q=${studentKeyword}`
        );
        
        if (!res.ok) {
          throw new Error(`YouTube API returned status ${res.status}`);
        }
        
        const data = await res.json();        if (data.items) {
          // Strict filtering to ensure we ONLY get videos with "student" in the title
          const filteredVideos = data.items.filter(
            (item: VideoItem) => {
              if (item.id.kind !== 'youtube#video') return false;
              
              const title = item.snippet.title.toLowerCase();
              
              // Only include videos that have "student" in the title
              // This is the strictest filter to avoid any teacher/faculty content
              return title.includes(studentKeyword);
            }
          );
          
          setVideos(filteredVideos);
        }      } catch (error) {
        console.error('YouTube API Error:', error);
        // Just log the error, don't display it to users
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);  // Don't render anything if there are no videos and we're not loading
  if (!loading && videos.length === 0) {
    return null;
  }
  
  return (
    <div className="youtube-container max-w-5xl mx-auto flex flex-col items-center p-8">
      <h2 className="text-3xl font-bold  text-center mb-4 p-6">Our Latest Highlights </h2>
      
      {loading && <p>Loading student videos...</p>}
      
      <div
        className={`grid gap-4 w-full justify-center 
          grid-cols-1
          ${videos.slice(0, 3).length === 2 ? 'md:grid-cols-2' : ''}
          ${videos.slice(0, 3).length === 3 ? 'md:grid-cols-3' : ''}
        `}
      >
        {videos.slice(0, 3).map((video) => (
          <div key={video.id.videoId} className="video-card border rounded-lg overflow-hidden shadow-md">
            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              frameBorder="0"
              allowFullScreen
              title={video.snippet.title}
              className="w-full"
            ></iframe>
            <div className="p-3">
              <h3 className="font-semibold text-lg mb-1 line-clamp-2">{video.snippet.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(video.snippet.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      <a
        href="https://www.youtube.com/channel/UClkBtwJsScYxFzNoFdlifeA"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        See More
      </a>
    </div>
  );
};

export default YouTubeFeed;
