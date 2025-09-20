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
import { useEvents } from '../../hooks/Events/useEvent';
import EventContactForm from './EventContactForm';
import FloatingActionMenu from './StickyButton/FloatingAction';
import InterestedModal from './InterestedModal';
import SingleEventCountdown from './SingleEventCountdown';
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
  Tag,
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
  const { events, loading, error } = useEvents();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [interestedModalOpen, setInterestedModalOpen] = React.useState(false);
  
  console.log('EventDetail rendered, slug:', slug);
  
  // FAQ accordion state
  const [openFaqIdx, setOpenFaqIdx] = React.useState<number | null>(null);
  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  // Find the event by slug
  const event = events.find(e => e.slug === slug);
  
  // Interest tracking state
  const [interestCount, setInterestCount] = React.useState(0);
  const [isLoadingCount, setIsLoadingCount] = React.useState(true);
  const [userAlreadyInterested, setUserAlreadyInterested] = React.useState(false);
  const [isCheckingUserInterest, setIsCheckingUserInterest] = React.useState(false);
  
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
            <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-3">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
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
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight drop-shadow-lg">
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
                <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-12 lg:p-16 border border-white/20 shadow-2xl max-w-5xl mx-auto">
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
            {/* Auto-scroll Carousel Below Banner */}
            {event.events_gallery && event.events_gallery.length > 0 && (
              <EventGallery images={event.events_gallery} />
            )}
          </div>

          {/* Main Content Grid - Optimized Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-12">
            {/* Main Content Area */}
            <div className="xl:col-span-8 space-y-12">
              {/* About Section - Enhanced Layout */}
              <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-8 lg:p-10 border border-white/20 shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight">About This Event</h2>
                </div>
                <div 
                  className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-sm prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-strong:text-slate-800 prose-ul:text-slate-700 prose-ol:text-slate-700"
                  dangerouslySetInnerHTML={{ __html: event.description }}
                />
              </div>
              {/* Speaker Information Card - separate container styled like Event Organizer */}
                {event.speakers_details && Array.isArray(event.speakers_details) && event.speakers_details.length > 0 && (
                  <div className="backdrop-blur-xl bg-white/70 rounded-3xl p-6 border border-white/20 shadow-xl">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">Speaker Details</h3>
                    <div className="space-y-4">
                      {event.speakers_details.map((speaker, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-50/80 to-purple-50/80 border border-indigo-200/30 shadow hover:shadow-lg transition-all">
                          <img
                            src={speaker.photo}
                            alt={speaker.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-300 shadow"
                            onError={e => {
                              (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(speaker.name);
                            }}
                          />
                          <div className="flex-1">
                            <p className="font-bold text-slate-800">{speaker.name}</p>
                            <p className="text-slate-600 text-sm">{speaker.profile}</p>
                            {speaker.linkedIn && (
                              <a
                                href={speaker.linkedIn}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
                              >
                                <ExternalLink className="w-4 h-4" /> LinkedIn
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  )}

              {/* Agenda - Consistent Layout */}
              {event.agenda && (
                <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-8 lg:p-10 border border-white/20 shadow-xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
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


              {/* Speakers - Enhanced Layout */}
              {event.speakers && event.speakers.length > 0 && (
                <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-8 lg:p-10 border border-white/20 shadow-xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight">Featured Speakers</h2>
                  </div>
                </div>
              )}
              {/* Map below Featured Speakers if location exists */}
              {/* Removed location_latitude/location_longitude map as those fields do not exist in Event type */}

              {/* Sponsors - Consistent Layout */}
              {event.sponsors && event.sponsors.length > 0 && (
                <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-8 lg:p-10 border border-white/20 shadow-xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight">Event Sponsors</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {event.sponsors.map((sponsor, index) => (
                      <div key={index} className="bg-gradient-to-r from-white/80 to-white/60 rounded-2xl p-4 border border-white/30 backdrop-blur-sm text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <p className="font-bold text-slate-800 text-sm">{sponsor}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Us About This Event - Modern Professional Layout */}
              <div className="backdrop-blur-xl bg-white/80 rounded-3xl p-6 border border-white/30 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center shadow-lg">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 leading-tight mb-1">Contact Us About This Event</h2>
                    <p className="text-slate-600 text-sm">Have questions or need more information? We're here to help.</p>
                  </div>
                </div>
                
                <div className="bg-white/60 rounded-2xl p-4 border border-slate-200/50 shadow-sm">
                  <EventContactForm
                    eventId={event.id}
                    eventTitle={event.title}
                    onSuccess={() => {
                      toast.success('🎉 Thank you for your inquiry! We\'ll get back to you soon.', {
                        position: 'bottom-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        style: { 
                          background: '#059669', 
                          color: '#fff', 
                          boxShadow: '0 4px 12px rgba(5, 150, 105, 0.15)' 
                        },
                      });
                    }}
                    onError={(error) => {
                      toast.error(`⚠️ ${error}`, {
                        position: 'bottom-right',
                        autoClose: 8000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        style: { 
                          background: '#DC2626', 
                          color: '#fff', 
                          boxShadow: '0 4px 12px rgba(220, 38, 38, 0.15)' 
                        },
                      });
                    }}
                  />
                </div>
              </div>
          </div>

            {/* Modern Sidebar - Properly Positioned */}
            <div className="xl:col-span-4 space-y-8">
              {/* Quick Info Card - Enhanced Sticky Positioning */}
              <div className="backdrop-blur-xl bg-white/70 rounded-3xl p-2 lg:p-4 border border-white/20 shadow-xl sticky top-36">
                <h3 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">Event Details</h3>
                
                <div className="space-y-4">

                {/* Redesigned Event Details Section: icon | details, no colored icon bg */}
                <div className="flex items-center rounded-2xl border border-slate-200/30">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <p className="text-slate-600 text-sm">{formatDate(event.event_date)}</p>
                  </div>
                </div>

                <div className="flex items-center rounded-2xl border border-slate-200/30">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <p className="text-slate-600 text-sm">{formatTime(event.event_time)}</p>
                    <p className="text-sm text-slate-500">{event.duration}</p>
                  </div>
                </div>

                <div className="flex items-center rounded-2xl border border-slate-200/30">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-slate-600 text-sm">{event.location}</p>
                    {event.location_geo && (
                      <button
                        type="button"
                        className="ml-2 px-2 py-1 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 flex items-center gap-1 text-xs text-slate-700"
                        title="Open in Google Maps"
                        onClick={() => {
                          if (event.location_geo && event.location_geo.lat && event.location_geo.lng) {
                            window.open(`https://www.google.com/maps/search/?api=1&query=${event.location_geo.lat},${event.location_geo.lng}`, '_blank', 'noopener');
                          }
                        }}
                      >
                        <MapPin className="w-4 h-4 text-slate-700" />
                        <span>Map</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center rounded-2xl border border-slate-200/30">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <p className="text-slate-600 text-sm">{event.capacity} attendees</p>
                  </div>
                </div>

                {event.registration_deadline && (
                  <div className="flex items-center rounded-2xl border border-slate-200/30">
                    <div className="w-10 h-10 flex items-center justify-center">
                      {/* Calendar/Deadline icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <p className="text-slate-600 text-sm">{formatDate(event.registration_deadline)}</p>
                    </div>
                  </div>
                )}

                {event.price && (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200/30">
                    <div className="w-10 h-10 flex items-center justify-center">
                      {/* Money/Tag icon for pricing */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2zm-5 6h.01" /></svg>
                    </div>
                    <div>
                      <p className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        {event.price === '0' ? 'Free Event' : `$${event.price}`}
                      </p>
                    </div>
                    {/* Register button beside price */}
                    <a
                      href="#register"
                      className="group inline-flex items-center text-slate-700 hover:text-indigo-600 transition-all duration-300 font-medium register-btn text-sm sm:text-base ml-4"
                      onClick={e => { e.preventDefault(); setModalOpen(true); }}
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mr-2 group-hover:scale-110 transition-transform">
                        <Edit3 className="w-4 h-4 text-white" />
                      </div>
                      Register Now
                    </a>
                  </div>
                )}
               </div>
                
            </div>
            
              
                

            {/* Organizer Card */}
            <div className="backdrop-blur-xl bg-white/70 rounded-3xl p-6 border border-white/20 shadow-xl">
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
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-2xl border border-blue-200/30 hover:shadow-md transition-all duration-300 group"
                  >
                    <Mail className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                    <span className="text-blue-700 font-medium">{event.organizer_email}</span>
                  </a>

                  {event.organizer_phone && (
                    <a 
                      href={`tel:${event.organizer_phone}`}
                      className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50/80 to-emerald-50/80 rounded-2xl border border-green-200/30 hover:shadow-md transition-all duration-300 group"
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

            {/* Tags */}
            {event.event_tags && event.event_tags.length > 0 && (
              <div className="backdrop-blur-xl bg-white/70 rounded-3xl p-6 border border-white/20 shadow-xl">
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">Event Tags</h3>
                <div className="flex flex-wrap gap-3">
                  {event.event_tags.map((tag, index) => (
                    <span
                      key={index}
                      className="group inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 border border-indigo-200/50 rounded-2xl font-medium text-indigo-700 transition-all duration-300 hover:shadow-lg hover:scale-105"
                    >
                      <Tag className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                      {tag}
                    </span>
                  ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
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
