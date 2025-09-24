import React from 'react';
import { motion } from 'framer-motion';
import styles from './TeaserVideoButton.module.css';
import TeaserVideoModal from './TeaserVideoModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, Link } from 'react-router-dom';
import Carousel from './Carousel';
import ImageModal from './ImageModal';
import RegistrationModal from './RegistrationModal';
import { useOptimizedEvents } from '../../hooks/Events/useOptimizedEvents';
import EventContactForm from './EventContactForm';
import FloatingActionMenu from './StickyButton/FloatingAction';
import InterestedModal from './InterestedModal';
import SingleEventCountdown from './SingleEventCountdown';
import EventMap from './EventMap';
import CountdownTimer from '../ui/CountdownTimer';
import { eventInterestedService } from '../../services/eventInterestedService';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Mail, 
  Phone, 
  User, 
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  XCircle,
  ExternalLink,
  Star,
  Award,
  Zap,
  Edit3,
  Plus,
  Minus
} from 'lucide-react';

// Animated Teaser Video Button Component
export const TeaserVideoButton: React.FC<{ teaserVideo?: string }> = (props) => {
  const { teaserVideo } = props;
  
  // Enhanced video URL validation
  const getVideoType = (url?: string) => {
    if (!url) return null;
    
    // Trim whitespace and check for empty string
    const cleanUrl = url.trim();
    if (!cleanUrl) return null;
    
    // YouTube patterns
    if (cleanUrl.includes('youtube.com') || cleanUrl.includes('youtu.be')) {
      return 'youtube';
    }
    
    // Other streaming services
    if (cleanUrl.includes('vimeo.com')) return 'vimeo';
    if (cleanUrl.includes('dailymotion.com')) return 'dailymotion';
    if (cleanUrl.includes('facebook.com') && cleanUrl.includes('video')) return 'facebook';
    if (cleanUrl.includes('instagram.com')) return 'instagram';
    if (cleanUrl.includes('tiktok.com')) return 'tiktok';
    
    // Check for direct video file extensions
    const videoExtensions = /\.(mp4|webm|ogg|avi|mov|wmv|flv|m4v)(\?.*)?$/i;
    if (videoExtensions.test(cleanUrl)) {
      return 'direct';
    }
    
    // Check for blob or data URLs (uploaded files)
    if (cleanUrl.startsWith('blob:')) return 'blob';
    if (cleanUrl.startsWith('data:video/')) return 'data';
    
    // Check if it looks like a URL
    try {
      new URL(cleanUrl);
      // If it's a web URL, try to detect if it's likely a video
      if (cleanUrl.includes('video') || cleanUrl.includes('stream') || cleanUrl.includes('media')) {
        return 'web-video';
      }
      return 'url';
    } catch {
      // Not a valid URL, might be a relative path
      return 'path';
    }
  };
  
  const videoType = getVideoType(teaserVideo);
  const isExternalVideo = ['youtube', 'vimeo', 'dailymotion', 'facebook', 'instagram', 'tiktok'].includes(videoType || '');
  const [showPlayer, setShowPlayer] = React.useState(false);
  
  React.useEffect(() => {
    if (showPlayer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showPlayer]);

  const handleClick = () => {
    console.log('TeaserVideoButton clicked:', { teaserVideo, videoType });
    
    if (!teaserVideo || !videoType) {
      toast.error('No video posted yet', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        style: { background: '#fff', color: '#d90429', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
        icon: false,
      });
      return;
    }
    
    if (isExternalVideo) {
      // Open external videos in new tab
      window.open(teaserVideo, '_blank');
    } else {
      // Show modal for direct video files or other URLs
      setShowPlayer(true);
    }
  };

  return (
    <>
      <ToastContainer />
      {/* Hide everything except modal when showPlayer is true */}
      {!showPlayer && (
        <div className="flex flex-col items-end">
          <button
            className={styles.teaserButton}
            onClick={handleClick}
            title={teaserVideo ? (isExternalVideo ? `Watch on ${videoType}` : 'Watch Teaser') : 'No video posted yet'}
            type="button"
          >
            <span className={styles.teaserText}>Watch Teaser</span>
            {/* YouTube icon SVG, shown on hover */}
            <svg className={styles.teaserIcon} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.633 3.5 12 3.5 12 3.5s-7.633 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 7.94 0 12 0 12s0 4.06.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.367 20.5 12 20.5 12 20.5s7.633 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 16.06 24 12 24 12s0-4.06-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </button>
        </div>
      )}
      {/* Modal for non-external videos */}
      {!isExternalVideo && teaserVideo && (
        <TeaserVideoModal open={showPlayer} videoUrl={teaserVideo} onClose={() => setShowPlayer(false)} />
      )}
    </>
  );
};

const EventDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { events, loading, error, refetch, loadFullEventDetails } = useOptimizedEvents();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [interestedModalOpen, setInterestedModalOpen] = React.useState(false);
  const [fullEventData, setFullEventData] = React.useState<Event | null>(null);
  const [loadingFullDetails, setLoadingFullDetails] = React.useState(false);
  
  // Gallery Modal States
  const [galleryModalOpen, setGalleryModalOpen] = React.useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = React.useState<string>('');
  // Toggle to reveal all images beyond the initial 6
  const [showAllGallery, setShowAllGallery] = React.useState(false);
  
  // Gallery modal handlers
  const handleGalleryImageClick = (image: string) => {
    setSelectedGalleryImage(image);
    setGalleryModalOpen(true);
  };
  
  const handleGalleryModalClose = () => {
    setGalleryModalOpen(false);
    setSelectedGalleryImage('');
  };
  
  console.log('EventDetail rendered, slug:', slug);
  
  // FAQ accordion state
  const [openFaqIdx, setOpenFaqIdx] = React.useState<number | null>(null);
  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  // Find the event by slug (initially minimal data)
  const minimalEvent = events.find(e => e.slug === slug);
  
  // Use full event data if loaded, otherwise use minimal event data
  const event = fullEventData || minimalEvent;
  
  // Load full event details when minimal event is available
  React.useEffect(() => {
    const loadFullDetails = async () => {
      if (minimalEvent && minimalEvent.id && !fullEventData && !loadingFullDetails) {
        console.log('📋 Loading full event details for:', minimalEvent.title);
        setLoadingFullDetails(true);
        
        try {
          const fullData = await loadFullEventDetails(minimalEvent.id);
          if (fullData) {
            setFullEventData(fullData);
            console.log('✅ Full event details loaded');
          }
        } catch (err) {
          console.error('❌ Failed to load full event details:', err);
        } finally {
          setLoadingFullDetails(false);
        }
      }
    };
    
    loadFullDetails();
  }, [minimalEvent, fullEventData, loadingFullDetails, loadFullEventDetails]);
  
  // Interest tracking state
  const [interestCount, setInterestCount] = React.useState(0);
  const [isLoadingCount, setIsLoadingCount] = React.useState(true);
  const [userAlreadyInterested, setUserAlreadyInterested] = React.useState(false);
  const [isCheckingUserInterest, setIsCheckingUserInterest] = React.useState(false);
  
  // Registration quantity state
  const [quantity, setQuantity] = React.useState<number>(1);
  
  // Speakers scroll ref
  const speakersScrollRef = React.useRef<HTMLDivElement>(null);
  const scrollSpeakers = (dir: 'left' | 'right') => {
    if (!speakersScrollRef.current) return;
    speakersScrollRef.current.scrollBy({ left: dir === 'left' ? -360 : 360, behavior: 'smooth' });
  };
  
  // Define loadInterestCount first
  const loadInterestCount = React.useCallback(async () => {
    if (!event?.id) return;
    
    setIsLoadingCount(true);
    try {
      const count = await eventInterestedService.getInterestedCount(event.id);
      setInterestCount(count);
    } catch (error) {
      console.error('Error loading interest count:', error);
      setInterestCount(0);
    } finally {
      setIsLoadingCount(false);
    }
  }, [event?.id]);
  
  // Load interest count when component mounts or event changes
  React.useEffect(() => {
    if (event?.id) {
      loadInterestCount();
    }
  }, [event?.id, loadInterestCount]);
  
  // Check if user has shown interest (using localStorage for persistence)
  const checkUserInterest = React.useCallback(() => {
    if (!event?.id) return;
    
    const storedInterests = localStorage.getItem('userEventInterests');
    if (storedInterests) {
      try {
        const interests = JSON.parse(storedInterests);
        setUserAlreadyInterested(interests.includes(event.id));
      } catch (error) {
        console.error('Error parsing stored interests:', error);
      }
    }
  }, [event?.id]);

  // Load user interest status when event changes
  React.useEffect(() => {
    checkUserInterest();
  }, [checkUserInterest]);
  
  const handleInterestedSuccess = () => {
    // Mark user as interested in localStorage
    if (event?.id) {
      const storedInterests = localStorage.getItem('userEventInterests');
      let interests = [];
      if (storedInterests) {
        try {
          interests = JSON.parse(storedInterests);
        } catch (error) {
          console.error('Error parsing stored interests:', error);
        }
      }
      if (!interests.includes(event.id)) {
        interests.push(event.id);
        localStorage.setItem('userEventInterests', JSON.stringify(interests));
      }
      setUserAlreadyInterested(true);
    }
    
    // Reload the interest count after successful submission
    loadInterestCount();
    console.log('Interest saved successfully!');
  };
  
  const handleInterestedError = (error: string) => {
    console.error('Error saving interest:', error);
    
    // Show user-friendly error message
    if (error.includes('already registered') || error.includes('already interested')) {
      // User already showed interest - update UI state
      setUserAlreadyInterested(true);
      
      // Store in localStorage to persist the state
      if (event?.id) {
        const storedInterests = localStorage.getItem('userEventInterests');
        let interests = [];
        if (storedInterests) {
          try {
            interests = JSON.parse(storedInterests);
          } catch (parseError) {
            console.error('Error parsing stored interests:', parseError);
          }
        }
        if (!interests.includes(event.id)) {
          interests.push(event.id);
          localStorage.setItem('userEventInterests', JSON.stringify(interests));
        }
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-gradient-to-r from-emerald-500/10 to-green-500/10 text-emerald-700 border border-emerald-200/50 backdrop-blur-sm';
      case 'ongoing':
        return 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-700 border border-blue-200/50 backdrop-blur-sm';
      case 'completed':
        return 'bg-gradient-to-r from-gray-500/10 to-slate-500/10 text-gray-700 border border-gray-200/50 backdrop-blur-sm';
      case 'cancelled':
        return 'bg-gradient-to-r from-red-500/10 to-rose-500/10 text-red-700 border border-red-200/50 backdrop-blur-sm';
      default:
        return 'bg-gradient-to-r from-gray-500/10 to-slate-500/10 text-gray-700 border border-gray-200/50 backdrop-blur-sm';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Zap className="w-4 h-4" />;
      case 'ongoing':
        return <Clock className="w-4 h-4 animate-pulse" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="flex flex-col items-center justify-center text-center relative z-10">
          <div className="relative mb-8 flex items-center justify-center">
            <div className="w-20 h-20 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-transparent border-t-indigo-500 border-r-purple-500 rounded-full animate-spin"></div>
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-3">Loading Event Details</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="text-center relative z-10 max-w-md mx-auto px-6">
          <div className="backdrop-blur-md bg-white/40 rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-3">Error Loading Events</h2>
            <p className="text-gray-600 mb-2">An error occurred while loading the events.</p>
            <p className="text-sm text-gray-500 mb-6">{error}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => refetch()}
                className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <svg className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
              <Link
                to="/events"
                className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="text-center relative z-10 max-w-md mx-auto px-6">
          <div className="backdrop-blur-md bg-white/40 rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent mb-3">Event Not Found</h2>
            <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or may have been removed.</p>
            <Link
              to="/events"
              className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-2xl hover:from-gray-700 hover:to-gray-900 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 relative overflow-hidden">
      {/* Events Floating Action Menu */}
      <FloatingActionMenu currentEvent={event} />
              
      <RegistrationModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        eventId={event.id ?? ""} 
        eventName={event.title} 
      />
      
      <InterestedModal 
        open={interestedModalOpen}
        onClose={() => setInterestedModalOpen(false)}
        eventId={event.id ?? ""}
        eventTitle={event.title}
        onSuccess={handleInterestedSuccess}
        onError={handleInterestedError}
      />

      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Modern Floating Navigation - Properly Aligned */}
      <div className="sticky top-6 z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex flex-row justify-between items-center gap-2 sm:gap-0" style={{ zIndex: 10 }}>
            {/* Removed Back to Events and Register buttons from top navigation */}
          </div>
        </div>
      </div>

      {/* Main Container with Proper Alignment */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section with Modern Banner - Improved Spacing */}
          <div className="mb-16 pt-8">
            {(event.event_banner || event.featured_image) ? (
              <div className="space-y-6">
                {/* Hero Image Container */}
                <div className="relative h-[60vh] min-h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={event.event_banner || event.featured_image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Enhanced Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Watch Teaser Button - Top Right */}
                  <div className="absolute top-6 right-6 z-20">
                    <button
                      onClick={() => {
                        if (event.teaser_video) {
                          window.open(event.teaser_video, '_blank');
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600/90 hover:bg-red-700/90 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-red-400/30"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      Watch Teaser
                    </button>
                  </div>
                  
                  {/* Event Title - Bottom Left of Image */}
                  <div className="absolute bottom-6 left-6">
                    <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold text-white leading-[1.1] tracking-tight drop-shadow-lg">
                      {event.title || "Event Name"}
                    </h1>
                  </div>
                </div>

                {/* Tags and Interest Section - Below Image */}
                <div className="flex items-center justify-between pt-4">
                  {/* Tags Section - Bottom Left (outside image) */}
                  <div className="flex flex-wrap gap-3">
                    {event.event_tags && event.event_tags.length > 0 ? (
                      // Display actual event tags from database
                      event.event_tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all duration-300 cursor-default"
                          title={`Tag: ${tag}`}
                        >
                          {tag.trim()}
                        </span>
                      ))
                    ) : (
                      // Fallback: Show relevant event information as tags when no database tags exist
                      <>
                        {event.category && (
                          <span className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all duration-300">
                            {event.category}
                          </span>
                        )}
                        {event.location && (
                          <span className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all duration-300">
                            {event.location.split(',')[0].trim()}
                          </span>
                        )}
                        {event.status && (
                          <span className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full capitalize hover:bg-gray-800 transition-all duration-300">
                            {event.status}
                          </span>
                        )}
                      </>
                    )}
                    
                    {/* Show additional tags indicator if there are more than 3 */}
                    {event.event_tags && event.event_tags.length > 3 && (
                      <span className="px-4 py-2 bg-gray-700 text-white text-sm font-medium rounded-full cursor-default">
                        +{event.event_tags.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  {/* Interest Section - Bottom Right (outside image) */}
                  <div className="flex items-center gap-4">
                    {/* Interest Counter with Thumbs Up */}
                    <div className="flex items-center gap-2 text-gray-700">
                      <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      <span className="text-lg font-semibold text-gray-600">
                        {isLoadingCount ? (
                          <span className="animate-pulse">Loading...</span>
                        ) : (
                          `${interestCount} are interested`
                        )}
                      </span>
                    </div>
                    
                    {/* I'm Interested Button */}
                    <button 
                      onClick={() => {
                        if (userAlreadyInterested) {
                          // Show a message that they're already interested
                          alert('You are already interested in this event!');
                          return;
                        }
                        setInterestedModalOpen(true);
                      }}
                      disabled={isLoadingCount}
                      className={`px-6 py-2 rounded-full border-2 font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                        userAlreadyInterested
                          ? 'border-green-400 bg-green-500 text-white cursor-default'
                          : 'border-red-400 bg-white text-red-500 hover:bg-red-50'
                      }`}
                    >
                      {userAlreadyInterested ? "✓ Already Interested" : "I'm Interested"}
                    </button>
                  </div>
                </div>
                
                {/* Event Registration Countdown Section - Shows countdown to registration deadline */}
                {event.registration_deadline && (
                  <div className="mt-8">
                    <SingleEventCountdown event={event} />
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-20 relative">
                <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-12 lg:p-16 border border-white/20 max-w-5xl mx-auto">
                  <div className={`inline-flex items-center px-4 py-2 rounded-2xl text-sm font-semibold mb-8 ${getStatusColor(event.status)}`}>
                    {getStatusIcon(event.status)}
                    <span className="ml-2 capitalize">{event.status}</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6 leading-[1.1] tracking-tight">
                    {event.title}
                  </h1>
                  <p className="text-lg md:text-xl text-slate-600 mb-12 font-medium">{event.category}</p>
                  <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-slate-700">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center mr-3">
                        <Calendar className="w-4 h-4 text-slate-600" />
                      </div>
                      <span className="text-sm md:text-base font-medium">{formatDate(event.event_date)}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center mr-3">
                        <MapPin className="w-4 h-4 text-slate-600" />
                      </div>
                      <span className="text-sm md:text-base font-medium">{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>


          {/* Main Content Grid - Optimized Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-12">
            {/* Main Content Area */}
            <div className="xl:col-span-8 space-y-6">
              {/* About The Event Section - Match Reference Layout */}
              <div className="backdrop-blur-xl bg-white/90 rounded-3xl p-8 lg:p-10 border border-white/20">
                {/* Header Section with Title, Status Badge, and Share Button */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-bold text-gray-900 leading-tight">About The Event</h2>
                    {/* Dynamic Status Badge */}
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(event.status)}`}>
                      {getStatusIcon(event.status)}
                      <span className="ml-2">{event.status}</span>
                    </span>
                  </div>
                  {/* Share Button */}
                  <button 
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: event.title,
                          text: `Check out this event: ${event.title}`,
                          url: window.location.href
                        });
                      } else {
                        // Fallback to copy link
                        navigator.clipboard.writeText(window.location.href);
                        // Note: toast is not imported, using alert as fallback
                        alert('Link copied to clipboard!');
                      }
                    }}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 shrink-0"
                    title="Share this event"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>
                </div>
                
                {/* Event Description */}
                <div className="mb-12">
                  <div 
                    className="text-gray-700 leading-relaxed prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-strong:text-slate-800 prose-ul:text-slate-700 prose-ol:text-slate-700"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
                </div>
                
                {/* Key Highlights Section */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Highlights</h3>
                  <div className="text-gray-700 leading-relaxed">
                    {event.key_highlights && event.key_highlights.length > 0 ? (
                      <ul className="space-y-2 text-gray-600">
                        {event.key_highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 shrink-0"></span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      // Fallback content when no key_highlights are available
                      <>
                        <p className="mb-4 text-gray-600">
                          Join us for an engaging and informative event featuring industry experts and networking opportunities.
                        </p>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 shrink-0"></span>
                            Expert speakers from leading organizations
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 shrink-0"></span>
                            Interactive workshops and discussions
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 shrink-0"></span>
                            Networking opportunities with peers
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 shrink-0"></span>
                            Professional development insights
                          </li>
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Agenda - Consistent Layout */}
              {event.agenda && (
                <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-8 lg:p-10 border border-white/20">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight">Event Agenda</h2>
                  </div>
                  <div 
                    className="bg-gradient-to-r from-green-50/80 to-emerald-50/80 border border-green-200/50 rounded-2xl p-6 backdrop-blur-sm prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-sm prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-strong:text-slate-800 prose-ul:text-slate-700 prose-ol:text-slate-700"
                    dangerouslySetInnerHTML={{ __html: event.agenda }}
                  />
                </div>
              )}


              {/* Speakers - Redesigned Section (MOVED FIRST) */}
              {(event.speakers_details && event.speakers_details.length > 0) || (event.speakers && event.speakers.length > 0) ? (
                <div 
                  className="-mt-2 md:-mt-4 relative rounded-3xl p-6 lg:p-10 border border-white/30 overflow-hidden"
                >

                  <div className="relative flex items-center justify-between mb-6">
                    <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">Speakers</h2>
                    <div className="hidden md:flex items-center gap-3">
                      <button 
                        aria-label="Previous"
                        onClick={() => scrollSpeakers('left')} 
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                      </button>
                      <button 
                        aria-label="Next"
                        onClick={() => scrollSpeakers('right')} 
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                      </button>
                    </div>
                  </div>

                  {/* Cards rail */}
                  <div 
                    ref={speakersScrollRef}
                    className="relative flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory"
                    style={{ scrollBehavior: 'smooth' }}
                  >
                    {((event.speakers_details && event.speakers_details.length > 0)
                      ? event.speakers_details.map(sd => ({
                          name: sd.name,
                          title: sd.profile,
                          photo: sd.photo,
                          linkedIn: sd.linkedIn,
                        }))
                      : (event.speakers || []).map((s: string) => ({
                          name: s,
                          title: 'Speaker',
                          photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(s)}&background=E5E7EB&color=334155`,
                        }))
                    ).map((spk, idx) => (
                      <div key={idx} className="min-w-[280px] max-w-[300px] w-[300px] snap-start">
                        <div className="relative bg-white border border-gray-200 h-full"
                             style={{
                               borderRadius: '24px',
                               clipPath: 'polygon(0 0, calc(100% - 36px) 0, 100% 36px, 100% 100%, 36px 100%, 0 calc(100% - 36px))'
                             }}>
                          
                          {/* Main card content */}
                          <div className="p-4 lg:p-6">
                            {/* Speaker photo */}
                            <div className="relative mb-6">
                              <div className="w-52 h-52 mx-auto bg-[#eef2f7] rounded-[20px] overflow-hidden">
                                <img
                                  src={spk.photo}
                                  alt={spk.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => { 
                                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(spk.name)}&background=E5E7EB&color=334155&size=192`; 
                                  }}
                                />
                              </div>
                              
                              {/* Social media icons - LinkedIn only */}
                              <div className="absolute right-3 top-3 flex flex-col gap-3">
                                {/* LinkedIn */}
                                {spk.linkedIn && (
                                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                                       onClick={() => window.open(spk.linkedIn, '_blank')}>
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Speaker info */}
                            <div className="text-center">
                              <h3 className="text-lg font-bold tracking-tight text-slate-900 mb-2">{spk.name}</h3>
                              {spk.title && <p className="text-slate-700 text-sm">{spk.title}</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile arrows */}
                  <div className="md:hidden flex justify-center gap-3 mt-4 relative z-10">
                    <button 
                      aria-label="Previous"
                      onClick={() => scrollSpeakers('left')} 
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                    </button>
                    <button 
                      aria-label="Next"
                      onClick={() => scrollSpeakers('right')} 
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Event Gallery Section (MOVED SECOND) */}
              {event.events_gallery && event.events_gallery.length > 0 && (
                <div className="-mt-2 md:-mt-4 backdrop-blur-xl bg-white/60 rounded-3xl p-8 lg:p-10 border border-white/20">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 leading-tight">Event Gallery</h2>
                  </div>
                  
                  {/* Gallery Images */}
                  <div className={`${showAllGallery ? 'max-h-[700px] overflow-y-auto pr-2 custom-scrollbar' : ''}`}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                      {(showAllGallery ? event.events_gallery : event.events_gallery.slice(0, Math.min(10, event.events_gallery.length))).map((image, index) => (
                        <div 
                          key={index} 
                          className="relative group cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 transform hover:scale-105 ring-1 ring-gray-200/50"
                          onClick={() => handleGalleryImageClick(image)}
                        >
                          <div className="aspect-square">
                            <img
                              src={image}
                              alt={`Event gallery image ${index + 1}`}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/api/placeholder/400/400';
                              }}
                            />
                          </div>
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                            <span className="text-white text-xs font-medium bg-black/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
                              View Full Size
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Show more button if there are more than 10 images */}
                  {event.events_gallery.length > 10 && (
                    <div className="mt-6 text-center">
                      <button 
                        aria-expanded={showAllGallery}
                        onClick={() => setShowAllGallery(prev => !prev)}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105"
                      >
                        {showAllGallery ? 'Show Less' : `View All ${event.events_gallery.length} Images`}
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              )}
              {/* Map below Featured Speakers if location exists */}
              {/* Removed location_latitude/location_longitude map as those fields do not exist in Event type */}

              {/* Sponsors - Consistent Layout */}
              {event.sponsors && event.sponsors.length > 0 && (
                <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-8 lg:p-10 border border-white/20">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight">Event Sponsors</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {event.sponsors.map((sponsor, index) => (
                      <div key={index} className="bg-gradient-to-r from-white/80 to-white/60 rounded-2xl p-4 border border-white/30 backdrop-blur-sm text-center transition-all duration-300 transform hover:-translate-y-1">
                        <p className="font-bold text-slate-800 text-sm">{sponsor}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

          </div>

            {/* Modern Sidebar - Properly Positioned */}
            <div className="xl:col-span-4 space-y-8">
              {/* 1. Information Card - First */}
              <div className="backdrop-blur-xl bg-white/95 rounded-3xl border border-white/20 sticky top-36 overflow-hidden">
                {/* Blue Information Header */}
                <div className="bg-blue-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white">Information</h3>
                </div>
                
                {/* Content Section */}
                <div className="p-6">
                  {/* Information Fields - Table-like layout with proper spacing */}
                  <div className="space-y-4">
                    {/* Category */}
                    <div className="flex">
                      <strong className="text-gray-900 font-semibold text-lg w-24 flex-shrink-0">Category:</strong>
                      <span className="text-gray-700 text-lg ml-6">{event.category || 'Workshop'}</span>
                    </div>

                    {/* Date */}
                    <div className="flex">
                      <strong className="text-gray-900 font-semibold text-lg w-24 flex-shrink-0">Date:</strong>
                      <span className="text-gray-700 text-lg ml-6">{formatDate(event.event_date).replace(/^\w+,\s*/, '')}</span>
                    </div>

                    {/* Time */}
                    <div className="flex">
                      <strong className="text-gray-900 font-semibold text-lg w-24 flex-shrink-0">Time:</strong>
                      <span className="text-gray-700 text-lg ml-6">
                        {formatTime(event.event_time)}{event.duration ? ` - ${event.duration}` : ''}
                      </span>
                    </div>

                    {/* Attendees */}
                    <div className="flex">
                      <strong className="text-gray-900 font-semibold text-lg w-24 flex-shrink-0">Attendees:</strong>
                      <span className="text-gray-700 text-lg ml-6">{event.capacity || '50'}</span>
                    </div>

                    {/* Location */}
                    <div className="flex">
                      <strong className="text-gray-900 font-semibold text-lg w-24 flex-shrink-0">Location:</strong>
                      <span className="text-gray-700 text-lg ml-6">{event.location?.split(',')[0]?.trim() || 'Bangalore'}</span>
                    </div>

                    {/* Languages */}
                    <div className="flex">
                      <strong className="text-gray-900 font-semibold text-lg w-24 flex-shrink-0">Languages:</strong>
                      <span className="text-gray-700 text-lg ml-6">
                        {event.languages && event.languages.length > 0 
                          ? event.languages.join(', ') 
                          : 'Kannada, English'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Registration Card - Second */}
              <div className="backdrop-blur-xl bg-white/95 rounded-3xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold text-slate-900">Registration</h3>
                <div className="mt-2 h-1 w-16 bg-indigo-600 rounded-full"></div>

                {/* Price and Stepper - Using exact same logic as countdown banner */}
                {(() => {
                  // EXACT SAME LOGIC FROM SingleEventCountdown.tsx
                  const parseDeadlineEndOfDay = (dateStr: string): Date => {
                    if (!dateStr) return new Date(0);
                    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(dateStr));
                    if (!match) return new Date(dateStr);
                    const y = parseInt(match[1], 10);
                    const m = parseInt(match[2], 10);
                    const d = parseInt(match[3], 10);
                    return new Date(y, (m || 1) - 1, d || 1, 23, 59, 59, 999);
                  };
                  
                  const getRegistrationStatus = () => {
                    if (!event.registration_deadline) return { isClosed: true };
                    
                    const now = new Date();
                    const deadlineDate = parseDeadlineEndOfDay(event.registration_deadline);
                    const eventDate = new Date(event.event_date);
                    
                    const isRegistrationDeadlinePassed = deadlineDate.getTime() <= now.getTime();
                    const isEventPassed = eventDate.getTime() <= now.getTime();
                    const isOpen = !isRegistrationDeadlinePassed && !isEventPassed;
                    
                    return { isClosed: !isOpen };
                  };
                  
                  const registrationClosed = getRegistrationStatus().isClosed;
                  
                  return (
                    <div className="flex items-center justify-between mt-6">
                      <div className="text-2xl font-extrabold text-slate-900">
                        {(() => {
                          const priceStr = (event.price ?? '0').toString().toLowerCase();
                          if (priceStr === 'free' || priceStr === '0' || priceStr === '') {
                            return 'FREE';
                          }
                          const numeric = parseFloat(priceStr.replace(/[^\d.]/g, '')) || 0;
                          return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(numeric);
                        })()}
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          aria-label="Decrease quantity"
                          onClick={registrationClosed ? undefined : () => setQuantity(q => Math.max(1, q - 1))}
                          disabled={registrationClosed}
                          className={`w-8 h-8 rounded-full text-lg leading-none flex items-center justify-center ${
                            registrationClosed 
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          −
                        </button>
                        <span className={`min-w-[1.5rem] text-center font-semibold ${
                          registrationClosed ? 'text-gray-400' : 'text-slate-700'
                        }`}>
                          {String(quantity).padStart(2, '0')}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          onClick={registrationClosed ? undefined : () => setQuantity(q => Math.min(99, q + 1))}
                          disabled={registrationClosed}
                          className={`w-8 h-8 rounded-full text-lg leading-none flex items-center justify-center ${
                            registrationClosed 
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })()}

                <div className="my-5 border-t border-slate-200" />

                {/* Quantity row - Using exact same logic as countdown banner */}
                {(() => {
                  // EXACT SAME LOGIC FROM SingleEventCountdown.tsx
                  const parseDeadlineEndOfDay = (dateStr: string): Date => {
                    if (!dateStr) return new Date(0);
                    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(dateStr));
                    if (!match) return new Date(dateStr);
                    const y = parseInt(match[1], 10);
                    const m = parseInt(match[2], 10);
                    const d = parseInt(match[3], 10);
                    return new Date(y, (m || 1) - 1, d || 1, 23, 59, 59, 999);
                  };
                  
                  const getRegistrationStatus = () => {
                    if (!event.registration_deadline) return { isClosed: true };
                    
                    const now = new Date();
                    const deadlineDate = parseDeadlineEndOfDay(event.registration_deadline);
                    const eventDate = new Date(event.event_date);
                    
                    const isRegistrationDeadlinePassed = deadlineDate.getTime() <= now.getTime();
                    const isEventPassed = eventDate.getTime() <= now.getTime();
                    const isOpen = !isRegistrationDeadlinePassed && !isEventPassed;
                    
                    return { isClosed: !isOpen };
                  };
                  
                  const registrationClosed = getRegistrationStatus().isClosed;
                  
                  return (
                    <>
                      <div className="flex items-baseline justify-between mb-3">
                        <span className={`text-lg font-semibold ${
                          registrationClosed ? 'text-gray-400' : 'text-slate-800'
                        }`}>Quantity:</span>
                        <span className={`text-lg font-mono ${
                          registrationClosed ? 'text-gray-400' : 'text-slate-700'
                        }`}>{String(quantity).padStart(2, '0')}</span>
                      </div>

                      {/* Total cost row */}
                      <div className="flex items-baseline justify-between">
                        <span className={`text-lg font-semibold ${
                          registrationClosed ? 'text-gray-400' : 'text-slate-800'
                        }`}>Total Cost:</span>
                        <span className={`text-2xl font-extrabold ${
                          registrationClosed ? 'text-gray-400' : 'text-emerald-600'
                        }`}>
                          {(() => {
                            const priceStr = (event.price ?? '0').toString().toLowerCase();
                            if (priceStr === 'free' || priceStr === '0' || priceStr === '') {
                              return 'FREE';
                            }
                            const numeric = parseFloat(priceStr.replace(/[^\d.]/g, '')) || 0;
                            const total = numeric * quantity;
                            return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(total);
                          })()}
                        </span>
                      </div>
                    </>
                  );
                })()}

                {/* Countdown Timer */}
                {(() => {
                  const now = new Date();
                  const eventDate = new Date(event.event_date);
                  const registrationDeadline = event.registration_deadline ? new Date(event.registration_deadline) : null;
                  
                  // Show registration countdown if registration is still open and deadline exists
                  if (registrationDeadline && registrationDeadline > now && event.status === 'upcoming') {
                    return (
                      <div className="mt-6 p-4 bg-gradient-to-r from-orange-50/80 to-yellow-50/80 rounded-2xl border border-orange-200/50">
                        <CountdownTimer 
                          targetDate={event.registration_deadline!}
                          type="registration"
                          compact={false}
                          className=""
                        />
                      </div>
                    );
                  }
                  
                  // Show event countdown if event is upcoming and no registration deadline or registration closed
                  if (eventDate > now && event.status === 'upcoming') {
                    const isRegistrationClosed = event.registration_status === 'closed' || 
                      event.registration_status === 'full' || 
                      (event.registration_deadline && new Date(event.registration_deadline) <= now);
                      
                    if (isRegistrationClosed || !event.registration_deadline) {
                      return (
                        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-2xl border border-blue-200/50">
                          <CountdownTimer 
                            targetDate={event.event_date}
                            type="event"
                            compact={false}
                            className=""
                          />
                        </div>
                      );
                    }
                  }
                  
                  return null;
                })()}

                {/* Registration Button - Using EXACT SAME LOGIC as Countdown Banner */}
                {(() => {
                  // EXACT SAME LOGIC FROM SingleEventCountdown.tsx
                  const parseDeadlineEndOfDay = (dateStr: string): Date => {
                    if (!dateStr) return new Date(0);
                    // Extract just the date portion (YYYY-MM-DD) even if a time exists
                    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(dateStr));
                    if (!match) return new Date(dateStr); // fallback
                    const y = parseInt(match[1], 10);
                    const m = parseInt(match[2], 10);
                    const d = parseInt(match[3], 10);
                    // Construct local date at 23:59:59.999
                    return new Date(y, (m || 1) - 1, d || 1, 23, 59, 59, 999);
                  };
                  
                  const getRegistrationStatus = () => {
                    console.log('🗣️ BUTTON: Using EXACT countdown banner logic');
                    
                    if (!event.registration_deadline) {
                      console.log('❌ BUTTON: No registration deadline set');
                      return {
                        isClosed: true,
                        buttonText: 'NO REGISTRATION DEADLINE'
                      };
                    }
                    
                    const now = new Date();
                    const deadlineDate = parseDeadlineEndOfDay(event.registration_deadline);
                    const eventDate = new Date(event.event_date);
                    
                    console.log('📅 BUTTON Countdown Logic:', {
                      now: now.toISOString(),
                      now_local: now.toLocaleString(),
                      deadline_raw: event.registration_deadline,
                      deadline_parsed: deadlineDate.toISOString(),
                      deadline_local: deadlineDate.toLocaleString(),
                      event_date: eventDate.toISOString(),
                      registration_deadline_passed: deadlineDate.getTime() <= now.getTime(),
                      event_passed: eventDate.getTime() <= now.getTime()
                    });
                    
                    const isRegistrationDeadlinePassed = deadlineDate.getTime() <= now.getTime();
                    const isEventPassed = eventDate.getTime() <= now.getTime();
                    const isOpen = !isRegistrationDeadlinePassed && !isEventPassed;
                    
                    console.log('🎯 BUTTON Final Decision:', {
                      isRegistrationDeadlinePassed,
                      isEventPassed,
                      isOpen
                    });
                    
                    if (!isOpen) {
                      console.log('❌ BUTTON: Registration is CLOSED');
                      return {
                        isClosed: true,
                        buttonText: 'REGISTRATION CLOSED'
                      };
                    }
                    
                    console.log('✅ BUTTON: Registration is OPEN');
                    return {
                      isClosed: false,
                      buttonText: 'REGISTER NOW'
                    };
                  };

                  const status = getRegistrationStatus();
                  
                  return (
                    <button
                      onClick={status.isClosed ? undefined : () => setModalOpen(true)}
                      disabled={status.isClosed}
                      className={`w-full mt-6 font-semibold py-4 rounded-2xl transition-all duration-300 ${
                        status.isClosed
                          ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white transition-transform active:scale-[0.99]'
                      }`}
                    >
                      {status.buttonText}
                    </button>
                  );
                })()}
              </div>

              {/* 3. Event Organizer Card - Third */}
              <div className="backdrop-blur-xl bg-white/70 rounded-3xl p-6 border border-white/20">
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">Event Organizer</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{event.organizer_name}</p>
                      <p className="text-slate-600 text-sm">Event Organizer</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-200">
                    <a 
                      href={`mailto:${event.organizer_email}`}
                      className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-2xl border border-blue-200/30 transition-all duration-300 group"
                    >
                      <Mail className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                      <span className="text-blue-700 font-medium">{event.organizer_email}</span>
                    </a>

                    {event.organizer_phone && (
                      <a 
                        href={`tel:${event.organizer_phone}`}
                        className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50/80 to-emerald-50/80 rounded-2xl border border-green-200/30 transition-all duration-300 group"
                      >
                        <Phone className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                        <span className="text-green-700 font-medium">{event.organizer_phone}</span>
                      </a>
                    )}
                  </div>

                  {event.additional_contact_info && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-slate-50/80 to-gray-50/80 rounded-2xl border border-slate-200/30">
                      <p className="text-slate-700 text-sm leading-relaxed">{event.additional_contact_info}</p>
                    </div>
                  )}
                </div>
              </div>

            {/* 4. Event Location - Fourth */}
            {event.location && (
              <EventMap
                location={event.location}
                locationGeo={event.location_geo}
                eventTitle={event.title}
              />
            )}

            </div>
          </div>
          
          {/* FAQ Section - Centered Outside Grid for Full Width */}
          {event.faq && event.faq.length > 0 && (
            <div className="mt-16">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="backdrop-blur-xl bg-white/90 rounded-3xl p-8 lg:p-10 border border-white/20">
                  {/* FAQ Header - Perfectly Centered */}
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mx-auto">Frequently Asked Questions</h2>
                  </div>
                  
                  {/* FAQ Items Container - Centered */}
                  <div className="max-w-4xl mx-auto">
                    {event.faq.map((faqItem, index) => (
                      <div key={index} className="">
                        {/* Question Button */}
                        <button
                          className="w-full text-left py-8 flex items-center justify-between focus:outline-none group hover:bg-gray-50/30 transition-colors duration-200"
                          onClick={() => toggleFaq(index)}
                        >
                          <span className="text-2xl text-gray-900 pr-8 leading-tight">
                            {faqItem.question}
                          </span>
                          
                          {/* Plus/Minus Icon - Square Style */}
                          <div className="flex-shrink-0 w-8 h-8 border-2 border-gray-400 rounded-sm flex items-center justify-center bg-white group-hover:border-gray-600 transition-colors duration-200">
                            <span className="text-xl font-normal text-gray-600 group-hover:text-gray-800">
                              {openFaqIdx === index ? '−' : '+'}
                            </span>
                          </div>
                        </button>
                        
                        {/* Answer Section */}
                        {openFaqIdx === index && (
                          <div className="pb-8 px-0">
                            <div className="">
                              <p className="text-gray-700 leading-relaxed text-lg">
                                {faqItem.answer}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {/* Full Width Divider Line - Match Reference */}
                        {index < event.faq.length - 1 && (
                          <div className="border-b-2 border-gray-300 w-full"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>
      
      {/* Gallery Modal */}
      <ImageModal 
        image={selectedGalleryImage} 
        images={event?.events_gallery || []}
        open={galleryModalOpen} 
        onClose={handleGalleryModalClose} 
      />
    </div>
  );
};

export default EventDetail;

// Gallery and Modal logic
interface EventGalleryProps {
  images: string[];
}

export function EventGallery({ images }: EventGalleryProps) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string>("");

  const handleImageClick = (img: string) => {
    setSelectedImage(img);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedImage("");
  };

  return (
    <>
      <Carousel images={images} onImageClick={handleImageClick} />
      <ImageModal 
        image={selectedImage} 
        images={images}
        open={modalOpen} 
        onClose={handleClose} 
      />
    </>
  );
}
