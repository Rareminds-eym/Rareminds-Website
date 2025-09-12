import React from 'react';
import { motion } from 'framer-motion';
import { ChatButton } from "../universities/ChatButton";
import styles from './TeaserVideoButton.module.css';
import TeaserVideoModal from './TeaserVideoModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, Link } from 'react-router-dom';
import Carousel from './Carousel';
import ImageModal from './ImageModal';
import RegistrationModal from './RegistrationModal';
import { useEvents } from '../../hooks/Events/useEvent';
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
  // ...existing code...
  const { teaserVideo } = props;
  const isYouTube = teaserVideo && (teaserVideo.includes('youtube.com') || teaserVideo.includes('youtu.be'));
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
    if (!teaserVideo) {
      toast.error('No video posted yet', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        style: { background: '#fff', color: '#d90429', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
        icon: false,
      });
      return;
    }
    if (isYouTube) {
      window.open(teaserVideo, '_blank');
    } else {
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
            title={teaserVideo ? (isYouTube ? 'Watch on YouTube' : 'Watch Teaser') : 'No video posted yet'}
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
      {/* Modal for non-YouTube video */}
      {!isYouTube && teaserVideo && (
        <TeaserVideoModal open={showPlayer} videoUrl={teaserVideo} onClose={() => setShowPlayer(false)} />
      )}
    </>
  );
};

const EventDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { events, loading, error } = useEvents();
  const [modalOpen, setModalOpen] = React.useState(false);
  // WhatsApp Chat modal state
  const [chatOpen, setChatOpen] = React.useState(false);
  console.log('EventDetail rendered, slug:', slug);
  
  // FAQ accordion state
  const [openFaqIdx, setOpenFaqIdx] = React.useState<number | null>(null);
  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  // Find the event by slug
  const event = events.find(e => e.slug === slug);
  console.log('Event found:', event);
  if (event) {
    console.log('event.location_type:', event.location_type);
    console.log('event.location_geo:', event.location_geo);
    console.log('event.location:', event.location);
  }

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
      {/* WhatsApp Floating Button with animation */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ y: [0, -27, 0] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 1.5,
            ease: "easeInOut"
          }}
          onClick={() => setChatOpen(true)}
          className="bg-green-200/50 hover:bg-green-300 text-white rounded-full shadow-lg p-2 flex items-center justify-center transition-all duration-200"
          title="Chat on WhatsApp"
        >
          {/* WhatsApp SVG icon - larger size */}
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
            <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path>
            <path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path>
          </svg>
        </motion.button>
        <ChatButton isVisible={chatOpen} onClose={() => setChatOpen(false)} />
      </div>
              
      <RegistrationModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        eventId={event.id ?? ""} 
        eventName={event.title} 
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
              <div className="relative h-[40vh] min-h-[250px] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={event.event_banner || event.featured_image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                {/* Animated Teaser Video Button - moved to bottom right */}
                <div className="absolute bottom-6 right-6 z-20">
                  <TeaserVideoButton teaserVideo={event.teaser_video} />
                </div>
                {/* Properly Aligned Content */}
                <div className="absolute bottom-0 left-0 right-0">
                  <div className="p-8 md:p-12 lg:p-16">
                    <div className="max-w-4xl">
                      <div className={`inline-flex items-center px-4 py-2 rounded-2xl text-sm font-semibold mb-6 ${getStatusColor(event.status)}`}>
                        {getStatusIcon(event.status)}
                        <span className="ml-2 capitalize">{event.status}</span>
                      </div>
                      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                        {event.title}
                      </h1>
                      <div className="flex flex-wrap items-center gap-6 md:gap-8 text-white/90 text-sm md:text-base">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                            <Tag className="w-4 h-4" />
                          </div>
                          <span className="font-medium">{event.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
