import DOMPurify from 'dompurify';
import type { Config } from 'dompurify';
import { safeGetItem, safeSetItem } from '@/lib/localStorage';
import {
  AlertCircle,
  ArrowLeft,
  Award,
  Calendar,
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  Phone,
  User,
  XCircle,
  Zap
} from 'lucide-react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useOptimizedEvents } from '../../hooks/Events/useOptimizedEvents';
import { eventInterestedService } from '../../services/eventInterestedService';
import { Event as AppEvent } from '../../types/Events/event';

import Carousel from './Carousel';
import EventContactForm from './EventContactForm';
import EventMap from './EventMap';
import ImageModal from './ImageModal';
import InterestedModal from './InterestedModal';
import RegistrationModal from './RegistrationModal';
import HeroSection from './HeoSection';
import TrustStatsSection from './TeacherKeyOutcomesSection';
import TeacherTestimonials from './TeacherTestimonials';
import TeacherTrainersSection from './TeacherTrainersSection';
import WebinarCTA from './WebinarCTA';
import SingleEventCountdown from './SingleEventCountdown';
import FloatingActionMenu from './StickyButton/FloatingAction';
import styles from './TeaserVideoButton.module.css';
import TeaserVideoModal from './TeaserVideoModal';

// DOMPurify configuration for safe HTML sanitization
// Strict configuration without div/span/style/class to prevent styling attacks
const DOMPURIFY_CONFIG: Config = {
  ALLOWED_TAGS: ['a', 'b', 'br', 'em', 'i', 'li', 'ol', 'p', 'strong', 'ul', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  ALLOWED_ATTR: ['href', 'title', 'target', 'rel'], // Explicitly exclude 'class' to prevent style injection
  ALLOW_DATA_ATTR: false,
  ALLOW_UNKNOWN_PROTOCOLS: false,
  SAFE_FOR_TEMPLATES: true,
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'style', 'class'], // Block class attributes
  KEEP_CONTENT: true // Preserve text content when stripping disallowed elements
};

// Add security hook for anchor tags
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  // Ensure node is an Element before accessing Element-specific methods
  if (!(node instanceof Element)) return;
  
  // Secure anchor tags - remove javascript: protocols and add security attributes
  if (node.tagName === 'A') {
    const href = node.getAttribute('href') ?? '';
    if (/^javascript:/i.test(href)) node.removeAttribute('href');
    node.setAttribute('rel', 'noopener noreferrer');
  }
  
  // Additional safety: strip any class attributes that might have slipped through
  if (node.hasAttribute('class')) {
    node.removeAttribute('class');
  }
});

// Utility function for sanitizing HTML content
const sanitizeHtml = (html?: string): string => {
  if (!html) return '';
  return DOMPurify.sanitize(html, DOMPURIFY_CONFIG);
};

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
  const [contactModalOpen, setContactModalOpen] = React.useState(false);
  const [fullEventData, setFullEventData] = React.useState<AppEvent | null>(null);
  const [loadingFullDetails, setLoadingFullDetails] = React.useState(false);
  
  // Debug: Log when modalOpen changes
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🎭 EventDetail: Registration modal state changed to:', modalOpen);
    }
  }, [modalOpen]);
  
  // Global message listener for Zoho form (in case HeroSection isn't rendered)
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🌐 EventDetail: Setting up global message listener for Zoho forms');
    }
    
    const handleGlobalMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'ZOHO_IFRAME_LOADED') {
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ EventDetail Global: Iframe loaded and communication working!');
        }
        return;
      }
      
      if (event.data && event.data.type === 'ZOHO_FORM_SUBMITTING') {
        if (process.env.NODE_ENV === 'development') {
          console.log('🌐 EventDetail: Received ZOHO_FORM_SUBMITTING at global level:', event.data);
          console.log('🎫 EventDetail: Opening registration modal from global listener');
        }
        setModalOpen(true);
      }
    };
    
    window.addEventListener('message', handleGlobalMessage);
    return () => window.removeEventListener('message', handleGlobalMessage);
  }, []);

  React.useEffect(() => {
    if (contactModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [contactModalOpen]);

  // Gallery Modal States
  const [galleryModalOpen, setGalleryModalOpen] = React.useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = React.useState<string>('');
  // Toggle to reveal all images beyond the initial 6
  const [showAllGallery, setShowAllGallery] = React.useState(false);

  // Track mobile viewport to control gallery count
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    if ((mq as any).addEventListener) (mq as any).addEventListener('change', onChange);
    else (mq as any).addListener(onChange);
    return () => {
      if ((mq as any).removeEventListener) (mq as any).removeEventListener('change', onChange);
      else (mq as any).removeListener(onChange);
    };
  }, []);

  // Gallery modal handlers
  const handleGalleryImageClick = (image: string) => {
    setSelectedGalleryImage(image);
    setGalleryModalOpen(true);
  };

  const handleGalleryModalClose = () => {
    setGalleryModalOpen(false);
    setSelectedGalleryImage('');
  };

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
        setLoadingFullDetails(true);

        try {
          const fullData = await loadFullEventDetails(minimalEvent.id);
          if (fullData) {
            setFullEventData(fullData);
          }
        } catch (err) {
          toast.error('Could not load full event details. Showing limited info.', {
            position: 'bottom-right', autoClose: 4000, hideProgressBar: true,
          });
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
      toast.error('Failed to load interest count. Please refresh.', {
        position: 'bottom-right', autoClose: 3000, hideProgressBar: true,
      });
      setInterestCount(0);
    }
    finally {
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

    const storedInterests = safeGetItem('userEventInterests');
    if (storedInterests) {
      try {
        const interests = JSON.parse(storedInterests);
        setUserAlreadyInterested(interests.includes(event.id));
      } catch (error) {
        toast.warn('Could not read your interest preferences. Resetting...', {
          position: 'bottom-right', autoClose: 3000,
        });
        safeSetItem('userEventInterests', JSON.stringify([]));
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
      const storedInterests = safeGetItem('userEventInterests');
      let interests = [];
      if (storedInterests) {
        try {
          interests = JSON.parse(storedInterests);
        } catch (error) {
          toast.warn('Preference storage was corrupted. Resetting...', {
            position: 'bottom-right', autoClose: 2000,
          });
          interests = [];
        }
      }
      if (!interests.includes(event.id)) {
        interests.push(event.id);
        safeSetItem('userEventInterests', JSON.stringify(interests));
      }
      setUserAlreadyInterested(true);
    }

    // Reload the interest count after successful submission
    loadInterestCount();
  };

  const handleInterestedError = (error: string) => {
    // Show user-friendly error message
    if (error.includes('already registered') || error.includes('already interested')) {
      // User already showed interest - update UI state
      setUserAlreadyInterested(true);

      // Store in localStorage to persist the state
      if (event?.id) {
        const storedInterests = safeGetItem('userEventInterests');
        let interests = [];
        if (storedInterests) {
          try {
            interests = JSON.parse(storedInterests);
          } catch (parseError) {
            toast.warn('Preference storage issue detected. Resetting...', {
              position: 'bottom-right', autoClose: 2000,
            });
            interests = [];
          }
        }
        if (!interests.includes(event.id)) {
          interests.push(event.id);
          safeSetItem('userEventInterests', JSON.stringify(interests));
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

  const aboutText = event?.eventSections?.find(s => s.section_key === 'about')?.content?.text;
  const hasAbout = aboutText
    ? DOMPurify.sanitize(aboutText).replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim().length > 0
    : false;

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
        eventPrice={(event.price ?? 0) * quantity}
        ticketQuantity={quantity}
        pricePerTicket={event.price ?? 0}
      />

      <InterestedModal
        open={interestedModalOpen}
        onClose={() => setInterestedModalOpen(false)}
        eventId={event.id ?? ""}
        eventTitle={event.title}
        onSuccess={handleInterestedSuccess}
        onError={handleInterestedError}
      />

      {contactModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 py-6 bg-slate-900/60 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setContactModalOpen(false)} aria-hidden="true"></div>
          <div className="relative w-full max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Send an Enquiry</h2>
                  <p className="text-sm text-slate-500">We’ll get back to you shortly about {event.title}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setContactModalOpen(false)}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                  aria-label="Close enquiry form"
                >
                  <span className="text-2xl leading-none">×</span>
                </button>
              </div>
              <div className="px-6 py-6">
                <EventContactForm
                  eventId={event.id ?? ""}
                  eventTitle={event.title}
                  onSuccess={() => toast.success('Enquiry submitted successfully!')}
                  onError={(error) => toast.error(error)}
                  onClose={() => setContactModalOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Modern Floating Navigation - Properly Aligned */}
      <div className="relative mt-2 -mb-5 sm:mt-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex flex-row justify-between items-center gap-2 sm:gap-0" style={{ zIndex: 10 }}>
            <button
              type="button"
              onClick={() => {
                if (window.history.length > 1) {
                  window.history.back();
                } else {
                  window.location.href = '/events';
                }
              }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/90 hover:bg-white text-gray-700 border border-gray-200 shadow-sm backdrop-blur-sm"
              aria-label="GO Back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">GO Back</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container with Proper Alignment */}
      <div className="relative z-10 mt-8 sm:mt-0">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${event.category?.toLowerCase() === 'webinar' ? 'pt-10 sm:pt-14' : ''}`}>
          {/* Hero Section with Modern Banner - Improved Spacing */}
          {event.category?.toLowerCase() !== 'webinar' && (
            <div className="mb-12 pt-0 sm:pt-8 sm:mb-16">
              {(event.media_metadata?.event_banner?.trim() || event.media_metadata?.featured_image?.trim() || event.media_metadata?.mobile_featured_image?.trim()) ? (
                <div className="space-y-6">
                  {/* Responsive Hero Banner */}
                  <div
                    className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] sm:left-auto sm:right-auto sm:ml-0 sm:mr-0 sm:w-full rounded-none sm:rounded-3xl overflow-hidden shadow-none sm:shadow-2xl h-[45vh] sm:h-[60vh] lg:h-[70vh] min-h-[300px] max-h-[450px] sm:max-h-none"
                    style={{
                      backgroundImage: `url(${isMobile && event.media_metadata?.mobile_featured_image
                        ? event.media_metadata.mobile_featured_image
                        : event.media_metadata?.event_banner || event.media_metadata?.featured_image
                        })`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center center',
                      backgroundRepeat: 'no-repeat',
                      backgroundAttachment: 'scroll',
                    }}
                  >
                    {/* Gradient overlay for readability - stronger on mobile */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent sm:from-black/70 sm:via-black/20 sm:to-transparent"></div>

                    {/* Watch Teaser - Top Left (if available) */}
                    {event.media_metadata?.teaser_video && (
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
                        <button
                          onClick={() => window.open(event.media_metadata!.teaser_video!, '_blank')}
                          className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 bg-red-600/90 hover:bg-red-700/90 text-white rounded-md sm:rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-red-400/30"
                        >
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                          <span className="hidden sm:inline">Watch Teaser</span>
                          <span className="sm:hidden">Teaser</span>
                        </button>
                      </div>
                    )}

                    {/* Event Title - Bottom Left of Image */}
                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto">
                      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight sm:leading-[1.1] tracking-tight drop-shadow-xl">
                        {event.title || "Event Name"}
                      </h1>
                    </div>
                  </div>

                  {/* Tags and Interest Section - Below Image */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
                    {/* Tags Section */}
                    <div className="flex flex-wrap gap-2 sm:gap-3 w-full">
                      {event.content_metadata?.event_tags && event.content_metadata.event_tags.length > 0 ? (
                        event.content_metadata.event_tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="px-3 py-1.5 bg-black text-white text-xs sm:text-sm font-medium rounded-full hover:bg-gray-800 transition-all duration-300 cursor-default" title={`Tag: ${tag}`}>
                            {tag.trim()}
                          </span>
                        ))
                      ) : (
                        <>
                          {event.category && <span className="px-3 py-1.5 bg-black text-white text-xs sm:text-sm font-medium rounded-full hover:bg-gray-800 transition-all duration-300">{event.category}</span>}
                          {event.location_metadata?.address && <span className="px-3 py-1.5 bg-black text-white text-xs sm:text-sm font-medium rounded-full hover:bg-gray-800 transition-all duration-300">{event.location_metadata.address.split(',')[0].trim()}</span>}
                          {event.status && <span className="px-3 py-1.5 bg-black text-white text-xs sm:text-sm font-medium rounded-full capitalize hover:bg-gray-800 transition-all duration-300">{event.status}</span>}
                        </>
                      )}
                      {event.content_metadata?.event_tags && event.content_metadata.event_tags.length > 3 && (
                        <span className="px-3 py-1.5 bg-gray-700 text-white text-xs sm:text-sm font-medium rounded-full cursor-default">
                          +{event.content_metadata.event_tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Interest Section - Bottom Right (outside image) */}
                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end flex-nowrap">
                      {/* Interest Counter with Thumbs Up */}
                      <div className="flex items-center gap-2 text-gray-700">
                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        <span className="text-base sm:text-lg font-semibold text-gray-600 whitespace-nowrap">
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
                        className={`ml-auto w-auto shrink-0 px-4 py-1.5 text-sm sm:text-base rounded-full border sm:border-2 font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${userAlreadyInterested
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
                <div className="text-center py-12 sm:py-20 relative px-4 sm:px-0">
                  <div className="backdrop-blur-xl bg-white/60 rounded-2xl sm:rounded-3xl p-6 sm:p-12 lg:p-16 border border-white/20 max-w-5xl mx-auto">
                    <div className={`inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold mb-6 sm:mb-8 ${getStatusColor(event.status)}`}>
                      {getStatusIcon(event.status)}
                      <span className="ml-2 capitalize">{event.status}</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight sm:leading-[1.1] tracking-tight px-2 sm:px-0">
                      {event.title}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-12 font-medium">{event.category}</p>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-4 sm:gap-8 md:gap-12 text-slate-700">
                      <div className="flex items-center justify-center sm:justify-start">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-slate-200 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600" />
                        </div>
                        <span className="text-sm md:text-base font-medium">{formatDate(event.event_date)}</span>
                      </div>
                      <div className="flex items-center justify-center sm:justify-start">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-slate-200 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600" />
                        </div>
                        <span className="text-sm md:text-base font-medium">{event.location_metadata?.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}


          {/* Layout: 8/4 when main sections exist, 2x2 cards + full-width content when they don't */}
          {(() => {
            const hasHighlights = (() => {
              const items = event.eventSections?.find(s => s.section_key === 'highlights')?.content?.items as Array<{ text: string }> | undefined;
              return !!(items && items.length > 0);
            })();
            const hasAgenda = !!event.eventSections?.find(s => s.section_key === 'agenda')?.content?.text;
            const hasSpeakers = (() => {
              const items = (event.eventSections?.find(s => s.section_key === 'speakers')?.content?.items ?? []) as unknown[];
              return items.length > 0;
            })();
            const hasGallery = (() => {
              const items = (event.eventSections?.find(s => s.section_key === 'gallery')?.content?.items ?? []) as Array<{ image_url?: string }>;
              return items.some(i => i.image_url);
            })();
            const hasSponsors = !!(event.content_metadata?.sponsors && event.content_metadata.sponsors.length > 0);
            const hasMainContent = hasAbout || hasHighlights || hasAgenda || hasSpeakers || hasGallery || hasSponsors;
            const hasRichLeftContent = (hasAbout || hasHighlights || hasAgenda) && (hasSpeakers || hasGallery || hasSponsors);

            // Right sidebar: only show if there's real data for any of the 4 cards
            const isWebinar = event.category?.toLowerCase() === 'webinar';

            const hasInfoData = !isWebinar && !!(event.category || event.event_date || event.event_time || event.location_metadata?.address);
            const hasRegistrationData = !isWebinar && !!(event.registration_deadline || (event.price !== undefined && event.price !== null));
            const hasOrganizerData = !isWebinar && !!(event.organizer_metadata?.name || event.organizer_metadata?.email);
            const hasLocationData = !isWebinar && !!(event.location_metadata?.lat && event.location_metadata?.lng);
            const hasSidebarContent = hasInfoData || hasRegistrationData || hasOrganizerData || hasLocationData;

            // Shared sidebar card JSX used in both layouts
            const parseDeadlineEndOfDay = (dateStr: string): Date => {
              if (!dateStr) return new Date(0);
              const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(dateStr));
              if (!match) return new Date(dateStr);
              const y = parseInt(match[1], 10), m = parseInt(match[2], 10), d = parseInt(match[3], 10);
              return new Date(y, (m || 1) - 1, d || 1, 23, 59, 59, 999);
            };
            const getRegStatus = () => {
              if (!event.registration_deadline) return { isClosed: true, buttonText: 'NO REGISTRATION DEADLINE' };
              const now = new Date();
              const isOpen = parseDeadlineEndOfDay(event.registration_deadline).getTime() > now.getTime() && new Date(event.event_date).getTime() > now.getTime();
              return { isClosed: !isOpen, buttonText: isOpen ? 'REGISTER NOW' : 'REGISTRATION CLOSED' };
            };
            const regStatus = getRegStatus();
            const rc = regStatus.isClosed;

            const infoCard = (
              <div className="rm-card overflow-hidden">
                <div className="p-4 md:p-6 pb-0 md:pb-0">
                  <h3 className="rm-section-title">Information</h3>
                  <div className="mt-2 h-1 w-16 bg-indigo-600 rounded-full"></div>
                </div>
                <div className="p-4 pt-4 md:px-6 md:pt-4">
                  <div className="space-y-3 md:space-y-4">
                    {event.category && (
                      <div className="flex"><strong className="text-gray-900 font-semibold text-sm sm:text-lg w-24 flex-shrink-0">Category:</strong><span className="text-gray-700 text-base sm:text-lg ml-4 sm:ml-6">{event.category}</span></div>
                    )}
                    {event.event_date && (
                      <div className="flex"><strong className="text-gray-900 font-semibold text-sm sm:text-lg w-24 flex-shrink-0">Date:</strong><span className="text-gray-700 text-base sm:text-lg ml-4 sm:ml-6">{formatDate(event.event_date).replace(/^\w+,\s*/, '')}</span></div>
                    )}
                    {event.event_time && (
                      <div className="flex"><strong className="text-gray-900 font-semibold text-sm sm:text-lg w-24 flex-shrink-0">Time:</strong><span className="text-gray-700 text-base sm:text-lg ml-4 sm:ml-6">{formatTime(event.event_time)}{event.duration ? ` - ${Math.floor(event.duration / 60)}h${event.duration % 60 > 0 ? ` ${event.duration % 60}m` : ''}` : ''}</span></div>
                    )}
                    {event.content_metadata?.capacity && (
                      <div className="flex"><strong className="text-gray-900 font-semibold text-sm sm:text-lg w-24 flex-shrink-0">Attendees:</strong><span className="text-gray-700 text-base sm:text-lg ml-4 sm:ml-6">{event.content_metadata.capacity}</span></div>
                    )}
                    {event.location_metadata?.address && (
                      <div className="flex"><strong className="text-gray-900 font-semibold text-sm sm:text-lg w-24 flex-shrink-0">Location:</strong><span className="text-gray-700 text-base sm:text-lg ml-4 sm:ml-6">{event.location_metadata.address.split(',')[0]?.trim()}</span></div>
                    )}
                    {event.content_metadata?.languages && event.content_metadata.languages.length > 0 && (
                      <div className="flex"><strong className="text-gray-900 font-semibold text-sm sm:text-lg w-24 flex-shrink-0">Languages:</strong><span className="text-gray-700 text-base sm:text-lg ml-4 sm:ml-6">{event.content_metadata.languages.join(', ')}</span></div>
                    )}
                  </div>
                </div>
              </div>
            );

            const registrationCard = (
              <div className="rm-card p-4 md:p-6">
                <h3 className="rm-section-title">Registration</h3>
                <div className="mt-2 h-1 w-16 bg-indigo-600 rounded-full"></div>
                <div className="flex items-center justify-between mt-6">
                  <div className="text-2xl font-extrabold text-slate-900">
                    {(() => {
                      const p = event.price ?? 0;
                      if (p === 0) return 'FREE';
                      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(p);
                    })()}
                  </div>
                  <div className="flex items-center gap-3">
                    <button aria-label="Decrease quantity" onClick={rc ? undefined : () => setQuantity(q => Math.max(1, q - 1))} disabled={rc} className={`w-8 h-8 rounded-full text-lg leading-none flex items-center justify-center ${rc ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>−</button>
                    <span className={`min-w-[1.5rem] text-center font-semibold ${rc ? 'text-gray-400' : 'text-slate-700'}`}>{String(quantity).padStart(2, '0')}</span>
                    <button aria-label="Increase quantity" onClick={rc ? undefined : () => setQuantity(q => Math.min(99, q + 1))} disabled={rc} className={`w-8 h-8 rounded-full text-lg leading-none flex items-center justify-center ${rc ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>+</button>
                  </div>
                </div>
                <div className="my-5 border-t border-slate-200" />
                <div className="flex items-baseline justify-between mb-3">
                  <span className={`text-lg font-semibold ${rc ? 'text-gray-400' : 'text-slate-800'}`}>Quantity:</span>
                  <span className={`text-lg font-mono ${rc ? 'text-gray-400' : 'text-slate-700'}`}>{String(quantity).padStart(2, '0')}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className={`text-lg font-semibold ${rc ? 'text-gray-400' : 'text-slate-800'}`}>Total Cost:</span>
                  <span className={`text-2xl font-extrabold ${rc ? 'text-gray-400' : 'text-emerald-600'}`}>
                    {(() => {
                      const p = event.price ?? 0;
                      if (p === 0) return 'FREE';
                      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(p * quantity);
                    })()}
                  </span>
                </div>
                <div className="space-y-3 mt-6">
                  <button onClick={rc ? undefined : () => setModalOpen(true)} disabled={rc} className={`w-full font-semibold py-4 rounded-2xl transition-all duration-300 ${rc ? 'bg-gray-400 cursor-not-allowed text-gray-600' : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-[0.99]'}`}>{regStatus.buttonText}</button>
                  <button onClick={rc ? undefined : () => setContactModalOpen(true)} disabled={rc} className={`w-full py-4 font-semibold rounded-2xl transition-all duration-300 ${rc ? 'bg-red-300 cursor-not-allowed text-red-100' : 'bg-red-600 hover:bg-red-700 text-white active:scale-[0.99]'}`}>Enquiry</button>
                </div>
              </div>
            );

            const organizerCard = (
              <div className="rm-card p-4 md:p-6">
                <h3 className="rm-section-title mb-4 sm:mb-6">Event Organizer</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center"><User className="w-6 h-6 text-white" /></div>
                    <div><p className="font-bold text-slate-800">{event.organizer_metadata?.name}</p><p className="text-slate-600 text-sm">Event Organizer</p></div>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-slate-200">
                    <a href={`mailto:${event.organizer_metadata?.email}`} className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-2xl border border-blue-200/30 transition-all duration-300 group">
                      <Mail className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                      <span className="text-blue-700 font-medium">{event.organizer_metadata?.email}</span>
                    </a>
                    {event.organizer_metadata?.phone && (
                      <a href={`tel:${event.organizer_metadata.phone}`} className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50/80 to-emerald-50/80 rounded-2xl border border-green-200/30 transition-all duration-300 group">
                        <Phone className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                        <span className="text-green-700 font-medium">{event.organizer_metadata.phone}</span>
                      </a>
                    )}
                    {event.content_metadata?.additional_contact_info && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-slate-50/80 to-gray-50/80 rounded-2xl border border-slate-200/30">
                        <p className="text-slate-700 text-sm leading-relaxed">{event.content_metadata.additional_contact_info}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );

            const mapCard = event.location_metadata?.address ? (
              <EventMap location={event.location_metadata.address} locationGeo={event.location_metadata.lat && event.location_metadata.lng ? { lat: event.location_metadata.lat, lng: event.location_metadata.lng } : undefined} eventTitle={event.title} />
            ) : null;

            if (hasMainContent && hasRichLeftContent) {
              // ── 8/4 when sidebar has content, full-width when it doesn't ──
              return (
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-8 xl:gap-12">
                  {/* Left: main content */}
                  <div className={`${hasSidebarContent ? 'xl:col-span-8' : 'xl:col-span-12'} space-y-6`}>
                    {(hasAbout || hasHighlights) && (
                      <div className="rm-card p-4 sm:p-8 lg:p-10">
                        {/* Header Section with Title, Status Badge, and Share Button */}
                        {hasAbout && (
                          <>
                            <div className="flex items-start justify-between mb-4 sm:mb-8">
                              <div className="flex items-center gap-3 sm:gap-4">
                                <h2 className="rm-section-title">About The Event</h2>
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
                            <div className="mb-6 sm:mb-12">
                              <div
                                className="text-gray-700 leading-relaxed prose prose-base md:prose-lg prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-strong:text-slate-800 prose-ul:text-slate-700 prose-ol:text-slate-700"
                                dangerouslySetInnerHTML={{ __html: sanitizeHtml(event.eventSections?.find(s => s.section_key === 'about')?.content?.text) }}
                              />
                            </div>
                          </>
                        )}

                        {/* Key Highlights Section */}
                        {hasHighlights && (
                          <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Key Highlights</h3>
                            <div className="text-gray-700 leading-relaxed">
                              {(() => {
                                const rawItems = event.eventSections?.find(s => s.section_key === 'highlights')?.content?.items as Array<{ id: string; text: string }> | undefined;
                                if (!rawItems || rawItems.length === 0) return null;
                                return (
                                  <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                                    {rawItems.map((item) => (
                                      <li key={item.id} className="flex items-start">
                                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 shrink-0"></span>
                                        {item.text}
                                      </li>
                                    ))}
                                  </ul>
                                );
                              })()}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Agenda - Consistent Layout */}
                    {(() => {
                      const agendaText = event.eventSections?.find(s => s.section_key === 'agenda')?.content?.text;
                      return agendaText ? (
                        <div className="rm-card p-4 sm:p-8 lg:p-10">
                          <div className="flex items-center gap-4 mb-6 sm:mb-8">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <h2 className="rm-section-title">Event Agenda</h2>
                          </div>
                          <div
                            className="bg-gradient-to-r from-green-50/80 to-emerald-50/80 border border-green-200/50 rounded-2xl p-6 backdrop-blur-sm prose prose-base md:prose-lg prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-strong:text-slate-800 prose-ul:text-slate-700 prose-ol:text-slate-700"
                            dangerouslySetInnerHTML={{ __html: sanitizeHtml(agendaText) }}
                          />
                        </div>
                      ) : null;
                    })()}


                    {/* Speakers - Redesigned Section (MOVED FIRST) */}
                    {!isWebinar && (() => {
                      const speakersItems = (event.eventSections?.find(s => s.section_key === 'speakers')?.content?.items ?? []) as Array<{ name: string; photo: string; description?: string; profile?: string; role?: string; linkedin?: string }>;
                      const speakersList = speakersItems.map(sd => ({
                        name: sd.name,
                        title: sd.role || 'Speaker',
                        description: sd.description || sd.profile,
                        photo: sd.photo,
                        linkedIn: sd.linkedin
                      }));
                      const hasAnyDescription = speakersList.some(s => s.description);
                      return speakersList.length > 0 ? (
                        <div className="rm-card -mt-2 md:-mt-4 relative p-4 md:p-8 lg:p-10 border-white/30 overflow-hidden">
                          <div className="relative flex items-center justify-between mb-4 md:mb-6">
                            <h2 className="rm-section-title">{speakersList.length === 1 ? 'Speaker' : 'Speakers'}</h2>
                            {speakersList.length > 1 && (
                              <div className="flex items-center gap-3">
                                <button aria-label="Previous" onClick={() => scrollSpeakers('left')} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 shadow-sm">
                                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <button aria-label="Next" onClick={() => scrollSpeakers('right')} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 shadow-sm">
                                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                </button>
                              </div>
                            )}
                          </div>
                          {hasAnyDescription ? (
                            /* Horizontal layout — one full-width card per speaker, scrollable */
                            <div ref={speakersScrollRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" style={{ scrollBehavior: 'smooth' }}>
                              {speakersList.map((spk, id) => (
                                <div key={id} className="min-w-full snap-start">
                                  <div className="flex flex-col sm:flex-row gap-6 bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
                                    <div className="flex flex-col items-center sm:items-start gap-3 sm:w-56 shrink-0">
                                      <div className="w-32 h-32 rounded-full overflow-hidden bg-[#eef2f7] border border-gray-200">
                                        <img src={spk.photo} alt={spk.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(spk.name)}&background=E5E7EB&color=334155&size=128`; }} />
                                      </div>
                                      <div className="text-center sm:text-left">
                                        <h3 className="text-base font-bold text-slate-900 leading-tight">{spk.name}</h3>
                                        <p className="text-[#5B6CF6] text-sm font-medium mt-0.5">{spk.title}</p>
                                        {spk.linkedIn && (
                                          <button className="mt-2 w-8 h-8 rounded-full bg-[#0A66C2] flex items-center justify-center hover:brightness-110 transition-all shadow-sm" onClick={() => window.open(spk.linkedIn, '_blank')} aria-label="View LinkedIn profile">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                    {spk.description && (
                                      <div className="flex-1 flex items-center">
                                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">{spk.description}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            /* Vertical card layout — original style, horizontal scroll rail */
                            <div ref={speakersScrollRef} className="relative flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" style={{ scrollBehavior: 'smooth' }}>
                              {speakersList.map((spk, id) => (
                                <div key={id} className="min-w-[280px] max-w-[300px] w-[300px] snap-start">
                                  <div className="relative bg-white border border-gray-200 h-full" style={{ borderRadius: '24px', clipPath: 'polygon(0 0, calc(100% - 36px) 0, 100% 36px, 100% 100%, 36px 100%, 0 calc(100% - 36px))' }}>
                                    <div className="p-4 lg:p-6">
                                      <div className="relative mb-6">
                                        <div className="w-52 h-52 mx-auto bg-[#eef2f7] rounded-[20px] overflow-hidden">
                                          <img src={spk.photo} alt={spk.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(spk.name)}&background=E5E7EB&color=334155&size=192`; }} />
                                        </div>
                                        {spk.linkedIn && (
                                          <div className="absolute right-3 top-3">
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer bg-[#0A66C2] hover:brightness-110 shadow-md" onClick={() => window.open(spk.linkedIn, '_blank')} aria-label="View LinkedIn profile" role="button">
                                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      <div className="text-center">
                                        <h3 className="text-lg font-bold tracking-tight text-slate-900 mb-2">{spk.name}</h3>
                                        {spk.title && <p className="text-slate-700 text-sm">{spk.title}</p>}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : null;
                    })()}

                    {/* Event Gallery Section */}
                    {(() => {
                      const rawGallery = (event.eventSections?.find(s => s.section_key === 'gallery')?.content?.items ?? []) as Array<{ id?: string; image_url?: string; caption?: string }>;
                      const galleryItems = rawGallery.map(item => item.image_url ?? '').filter(Boolean);
                      return galleryItems.length > 0 ? (
                        <div className="rm-card -mt-2 md:-mt-4 p-4 sm:p-8 lg:p-10">
                          <div className="flex items-center gap-4 mb-6 sm:mb-8">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-500 rounded-2xl flex items-center justify-center">
                              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <h2 className="rm-section-title">Event Gallery</h2>
                          </div>

                          {/* Gallery Images */}
                          <div className={`${showAllGallery ? 'max-h-[700px] overflow-y-auto pr-2 custom-scrollbar' : ''}`}>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                              {(showAllGallery ? galleryItems : galleryItems.slice(0, Math.min(isMobile ? 4 : 10, galleryItems.length))).map((image, id) => (
                                <div
                                  key={id}
                                  className="relative group cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 transform hover:scale-105 ring-1 ring-gray-200/50"
                                  onClick={() => handleGalleryImageClick(image)}
                                >
                                  <div className="aspect-square">
                                    <img
                                      src={image}
                                      alt={`Event gallery image ${id + 1}`}
                                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/api/placeholder/400/400';
                                      }}
                                    />
                                  </div>
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                                    <span className="text-white text-xs font-medium bg-black/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
                                      View Full Size
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {(isMobile ? galleryItems.length > 4 : galleryItems.length > 10) && (
                            <div className="mt-6 text-center">
                              <button
                                aria-expanded={showAllGallery}
                                onClick={() => setShowAllGallery(prev => !prev)}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105"
                              >
                                {showAllGallery ? 'Show Less' : (isMobile ? 'View More' : `View All ${galleryItems.length} Images`)}
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      ) : null;
                    })()}
                    {/* Map below Featured Speakers if location exists */}
                    {/* Removed location_latitude/location_longitude map as those fields do not exist in Event type */}

                    {/* Sponsors - Consistent Layout */}
                    {event.content_metadata?.sponsors && event.content_metadata.sponsors.length > 0 && (
                      <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-4 sm:p-8 lg:p-10 border border-white/20">
                        <div className="flex items-center gap-4 mb-6 sm:mb-8">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-500 rounded-2xl flex items-center justify-center">
                            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <h2 className="rm-section-title">Event Sponsors</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {event.content_metadata.sponsors.map((sponsor, index) => (
                            <div key={index} className="bg-gradient-to-r from-white/80 to-white/60 rounded-2xl p-4 border border-white/30 backdrop-blur-sm text-center transition-all duration-300 transform hover:-translate-y-1">
                              <p className="font-normal text-slate-800 text-sm md:text-base">{sponsor}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>{/* end xl:col-span-8 */}

                  {/* Right: sidebar — col-span-4, only when sidebar has real data */}
                  {hasSidebarContent && (
                    <div className="xl:col-span-4 space-y-8 hidden xl:block">
                      <div className="sticky top-36 space-y-8">
                        {hasInfoData && infoCard}
                        {hasRegistrationData && registrationCard}
                        {hasOrganizerData && organizerCard}
                        {hasLocationData && mapCard}
                      </div>
                    </div>
                  )}
                  {/* Mobile sidebar — only when sidebar has real data */}
                  {hasSidebarContent && (
                    <div className="xl:hidden space-y-4">
                      {hasInfoData && infoCard}
                      {hasRegistrationData && registrationCard}
                      {hasOrganizerData && organizerCard}
                      {hasLocationData && mapCard}
                    </div>
                  )}
                </div>
              );
            } else if (hasMainContent && !hasRichLeftContent) {
              // ── MAIN CONTENT but NOT rich (e.g. only About/Highlights without Speakers/Gallery/Sponsors) ──
              return (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    {hasInfoData && infoCard}
                    {hasRegistrationData && registrationCard}
                    {hasOrganizerData && organizerCard}
                    {hasLocationData && mapCard}
                  </div>
                  <div className="space-y-6">
                    {(hasAbout || hasHighlights) && (
                      <div className="rm-card p-4 sm:p-8 lg:p-10">
                        {hasAbout && (
                          <>
                            <div className="flex items-start justify-between mb-4 sm:mb-8">
                              <div className="flex items-center gap-3 sm:gap-4">
                                <h2 className="rm-section-title">About The Event</h2>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(event.status)}`}>
                                  {getStatusIcon(event.status)}<span className="ml-2">{event.status}</span>
                                </span>
                              </div>
                              <button onClick={() => { if (navigator.share) { navigator.share({ title: event.title, text: `Check out this event: ${event.title}`, url: window.location.href }); } else { navigator.clipboard.writeText(window.location.href); alert('Link copied to clipboard!'); } }} className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 shrink-0" title="Share this event">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>
                              </button>
                            </div>
                            <div className="mb-6 sm:mb-12">
                              <div className="text-gray-700 leading-relaxed prose prose-base md:prose-lg prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-strong:text-slate-800 prose-ul:text-slate-700 prose-ol:text-slate-700" dangerouslySetInnerHTML={{ __html: sanitizeHtml(event.eventSections?.find(s => s.section_key === 'about')?.content?.text) }} />
                            </div>
                          </>
                        )}
                        {hasHighlights && (
                          <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Key Highlights</h3>
                            {(() => {
                              const rawItems = event.eventSections?.find(s => s.section_key === 'highlights')?.content?.items as Array<{ id: string; text: string }> | undefined;
                              if (!rawItems || rawItems.length === 0) return null;
                              return (<ul className="space-y-2 text-gray-700 text-sm md:text-base">{rawItems.map(item => (<li key={item.id} className="flex items-start"><span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 shrink-0"></span>{item.text}</li>))}</ul>);
                            })()}
                          </div>
                        )}
                      </div>
                    )}

                    {(() => {
                      const agendaText = event.eventSections?.find(s => s.section_key === 'agenda')?.content?.text;
                      return agendaText ? (
                        <div className="rm-card p-4 sm:p-8 lg:p-10">
                          <div className="flex items-center gap-4 mb-6 sm:mb-8">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <h2 className="rm-section-title">Event Agenda</h2>
                          </div>
                          <div className="bg-gradient-to-r from-green-50/80 to-emerald-50/80 border border-green-200/50 rounded-2xl p-6 backdrop-blur-sm prose prose-base md:prose-lg prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-strong:text-slate-800 prose-ul:text-slate-700 prose-ol:text-slate-700" dangerouslySetInnerHTML={{ __html: sanitizeHtml(agendaText) }} />
                        </div>
                      ) : null;
                    })()}

                    {!isWebinar && (() => {
                      const speakersItems = (event.eventSections?.find(s => s.section_key === 'speakers')?.content?.items ?? []) as Array<{ name: string; photo: string; description?: string; profile?: string; role?: string; linkedin?: string }>;
                      const speakersList = speakersItems.map(sd => ({ name: sd.name, title: sd.role || 'Speaker', description: sd.description || sd.profile, photo: sd.photo, linkedIn: sd.linkedin }));
                      const hasAnyDescription = speakersList.some(s => s.description);
                      return speakersList.length > 0 ? (
                        <div className="rm-card -mt-2 md:-mt-4 relative p-4 md:p-8 lg:p-10 border-white/30 overflow-hidden">
                          <div className="relative flex items-center justify-between mb-4 md:mb-6">
                            <h2 className="rm-section-title">{speakersList.length === 1 ? 'Speaker' : 'Speakers'}</h2>
                            {speakersList.length > 1 && (
                              <div className="flex items-center gap-3">
                                <button aria-label="Previous" onClick={() => scrollSpeakers('left')} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 shadow-sm"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg></button>
                                <button aria-label="Next" onClick={() => scrollSpeakers('right')} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 shadow-sm"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg></button>
                              </div>
                            )}
                          </div>
                          {hasAnyDescription ? (
                            <div ref={speakersScrollRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" style={{ scrollBehavior: 'smooth' }}>
                              {speakersList.map((spk, id) => (
                                <div key={id} className="min-w-full snap-start">
                                  <div className="flex flex-col sm:flex-row gap-6 bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
                                    <div className="flex flex-col items-center sm:items-start gap-3 sm:w-56 shrink-0">
                                      <div className="w-32 h-32 rounded-full overflow-hidden bg-[#eef2f7] border border-gray-200">
                                        <img src={spk.photo} alt={spk.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(spk.name)}&background=E5E7EB&color=334155&size=128`; }} />
                                      </div>
                                      <div className="text-center sm:text-left">
                                        <h3 className="text-base font-bold text-slate-900 leading-tight">{spk.name}</h3>
                                        <p className="text-[#5B6CF6] text-sm font-medium mt-0.5">{spk.title}</p>
                                        {spk.linkedIn && (
                                          <button className="mt-2 w-8 h-8 rounded-full bg-[#0A66C2] flex items-center justify-center hover:brightness-110 transition-all shadow-sm" onClick={() => window.open(spk.linkedIn, '_blank')} aria-label="View LinkedIn profile">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                    {spk.description && (
                                      <div className="flex-1 flex items-center">
                                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">{spk.description}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div ref={speakersScrollRef} className="relative flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" style={{ scrollBehavior: 'smooth' }}>
                              {speakersList.map((spk, id) => (
                                <div key={id} className="min-w-[280px] max-w-[300px] w-[300px] snap-start">
                                  <div className="relative bg-white border border-gray-200 h-full" style={{ borderRadius: '24px', clipPath: 'polygon(0 0, calc(100% - 36px) 0, 100% 36px, 100% 100%, 36px 100%, 0 calc(100% - 36px))' }}>
                                    <div className="p-4 lg:p-6">
                                      <div className="relative mb-6">
                                        <div className="w-52 h-52 mx-auto bg-[#eef2f7] rounded-[20px] overflow-hidden">
                                          <img src={spk.photo} alt={spk.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(spk.name)}&background=E5E7EB&color=334155&size=192`; }} />
                                        </div>
                                        {spk.linkedIn && (
                                          <div className="absolute right-3 top-3">
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer bg-[#0A66C2] hover:brightness-110 shadow-md" onClick={() => window.open(spk.linkedIn, '_blank')} aria-label="View LinkedIn profile" role="button">
                                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      <div className="text-center">
                                        <h3 className="text-lg font-bold tracking-tight text-slate-900 mb-2">{spk.name}</h3>
                                        {spk.title && <p className="text-slate-700 text-sm">{spk.title}</p>}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : null;
                    })()}

                    {(() => {
                      const rawGallery = (event.eventSections?.find(s => s.section_key === 'gallery')?.content?.items ?? []) as Array<{ id?: string; image_url?: string; caption?: string }>;
                      const galleryItems = rawGallery.map(item => item.image_url ?? '').filter(Boolean);
                      return galleryItems.length > 0 ? (
                        <div className="rm-card -mt-2 md:-mt-4 p-4 sm:p-8 lg:p-10">
                          <div className="flex items-center gap-4 mb-6 sm:mb-8">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-500 rounded-2xl flex items-center justify-center">
                              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                            <h2 className="rm-section-title">Event Gallery</h2>
                          </div>
                          <div className={`${showAllGallery ? 'max-h-[700px] overflow-y-auto pr-2 custom-scrollbar' : ''}`}>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                              {(showAllGallery ? galleryItems : galleryItems.slice(0, Math.min(isMobile ? 4 : 10, galleryItems.length))).map((image, id) => (
                                <div key={id} className="relative group cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 transform hover:scale-105 ring-1 ring-gray-200/50" onClick={() => handleGalleryImageClick(image)}>
                                  <div className="aspect-square">
                                    <img src={image} alt={`Event gallery image ${id + 1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" onError={(e) => { (e.target as HTMLImageElement).src = '/api/placeholder/400/400'; }} />
                                  </div>
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                                    <span className="text-white text-xs font-medium bg-black/30 px-2.5 py-1 rounded-full backdrop-blur-sm">View Full Size</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          {(isMobile ? galleryItems.length > 4 : galleryItems.length > 10) && (
                            <div className="mt-6 text-center">
                              <button aria-expanded={showAllGallery} onClick={() => setShowAllGallery(prev => !prev)} className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105">
                                {showAllGallery ? 'Show Less' : (isMobile ? 'View More' : `View All ${galleryItems.length} Images`)}
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                              </button>
                            </div>
                          )}
                        </div>
                      ) : null;
                    })()}

                    {event.content_metadata?.sponsors && event.content_metadata.sponsors.length > 0 && (
                      <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-4 sm:p-8 lg:p-10 border border-white/20">
                        <div className="flex items-center gap-4 mb-6 sm:mb-8">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-500 rounded-2xl flex items-center justify-center">
                            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <h2 className="rm-section-title">Event Sponsors</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {event.content_metadata.sponsors.map((sponsor, index) => (
                            <div key={index} className="bg-gradient-to-r from-white/80 to-white/60 rounded-2xl p-4 border border-white/30 backdrop-blur-sm text-center transition-all duration-300 transform hover:-translate-y-1">
                              <p className="font-normal text-slate-800 text-sm md:text-base">{sponsor}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              );
            } else {
              // ── NO MAIN CONTENT: 2x2 cards grid + full-width About ──
              return (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    {hasInfoData && infoCard}
                    {hasRegistrationData && registrationCard}
                    {hasOrganizerData && organizerCard}
                    {hasLocationData && mapCard}
                  </div>
                  <div className="space-y-6">
                    {/* About The Event */}
                    {(hasAbout || hasHighlights) && (
                      <div className="rm-card p-4 sm:p-8 lg:p-10">
                        {hasAbout && (
                          <>
                            <div className="flex items-start justify-between mb-4 sm:mb-8">
                              <div className="flex items-center gap-3 sm:gap-4">
                                <h2 className="rm-section-title">About The Event</h2>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(event.status)}`}>
                                  {getStatusIcon(event.status)}<span className="ml-2">{event.status}</span>
                                </span>
                              </div>
                              <button onClick={() => { if (navigator.share) { navigator.share({ title: event.title, text: `Check out this event: ${event.title}`, url: window.location.href }); } else { navigator.clipboard.writeText(window.location.href); alert('Link copied to clipboard!'); } }} className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 shrink-0" title="Share this event">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>
                              </button>
                            </div>
                            <div className="mb-6 sm:mb-12">
                              <div className="text-gray-700 leading-relaxed prose prose-base md:prose-lg prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: sanitizeHtml(event.eventSections?.find(s => s.section_key === 'about')?.content?.text) }} />
                            </div>
                          </>
                        )}
                      {hasHighlights && (
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Key Highlights</h3>
                        {(() => {
                          const rawItems = event.eventSections?.find(s => s.section_key === 'highlights')?.content?.items as Array<{ id: string; text: string }> | undefined;
                          if (!rawItems || rawItems.length === 0) return null;
                          return (<ul className="space-y-2 text-gray-700 text-sm md:text-base">{rawItems.map(item => (<li key={item.id} className="flex items-start"><span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 shrink-0"></span>{item.text}</li>))}</ul>);
                        })()}
                      </div>
                      )}
                    </div>
                    )}
                  </div>
                </>
              );
            }
          })()}

          {/* Dynamic Event Sections */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {event.eventSections?.find(s => s.section_key === 'hero') && (
              <div className="mt-8">
                <HeroSection
                  content={event.eventSections.find(s => s.section_key === 'hero')?.content as { title?: string; description?: string; benefits?: string[] } | undefined}
                  formId={event.form_id}
                  eventDate={event.event_date}
                  eventTime={event.event_time}
                  location={event.location_metadata?.address}
                  price={event.price}
                  eventType={event.event_type}
                  eventId={event.id}
                  eventName={event.title}
                  duration={event.duration}
                  onRegisterClick={() => {
                    if (process.env.NODE_ENV === 'development') {
                      console.log('🎯 EventDetail: onRegisterClick called - opening registration modal');
                    }
                    setModalOpen(true);
                  }}
                />
              </div>
            )}
            <TrustStatsSection content={event.eventSections?.find(s => s.section_key === 'stats')?.content} />
            <TeacherTrainersSection content={event.eventSections?.find(s => s.section_key === 'features')?.content} />
            {/* Speakers section — webinar only, shown here after trainers */}
            {event.category?.toLowerCase() === 'webinar' && (() => {
              const speakersItems = (event.eventSections?.find(s => s.section_key === 'speakers')?.content?.items ?? []) as Array<{ name: string; photo: string; description?: string; role?: string; linkedin?: string }>;
              const speakersList = speakersItems.map(sd => ({
                name: sd.name,
                role: sd.role || 'Speaker',
                photo: sd.photo,
                description: sd.description,
                linkedIn: sd.linkedin
              }));
              return speakersList.length > 0 ? (
                <div className="rm-card mt-8 md:mt-12 relative p-4 md:p-8 lg:p-10 border-white/30 overflow-hidden">
                  {/* Header with title + arrows */}
                  <div className={`relative flex items-center mb-4 md:mb-6 ${speakersList.length === 1 ? 'justify-center' : 'justify-between'}`}>
                    <h2 className="rm-section-title text-center w-full">
                      {speakersList.length === 1 ? 'Speaker' : 'Speakers'}
                    </h2>
                    {speakersList.length > 1 && (
                      <div className="hidden md:flex items-center gap-3">
                        <button
                          aria-label="Previous"
                          onClick={() => speakersScrollRef.current?.scrollBy({ left: -600, behavior: 'smooth' })}
                          className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 shadow-sm"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button
                          aria-label="Next"
                          onClick={() => speakersScrollRef.current?.scrollBy({ left: 600, behavior: 'smooth' })}
                          className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 shadow-sm"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Scrollable rail — one card = full width */}
                  <div
                    ref={speakersScrollRef}
                    className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    style={{ scrollBehavior: 'smooth' }}
                  >
                    {speakersList.map((spk, id) => (
                      <div key={id} className="min-w-full snap-start">
                        <div className="flex flex-col sm:flex-row gap-8 bg-white rounded-2xl border border-gray-100 p-6 md:p-10 shadow-sm">
                          {/* Left: photo + name + role */}
                          <div className="flex flex-col items-center sm:items-start gap-3 sm:w-64 shrink-0">
                            <div className="w-40 h-40 rounded-full overflow-hidden bg-[#eef2f7] border border-gray-200">
                              <img
                                src={spk.photo}
                                alt={spk.name}
                                className="w-full h-full object-cover"
                                onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(spk.name)}&background=E5E7EB&color=334155&size=112`; }}
                              />
                            </div>
                            <div className="text-center sm:text-left">
                              <h3 className="text-base font-bold text-slate-900 leading-tight">{spk.name}</h3>
                              <p className="text-[#5B6CF6] text-sm font-medium mt-0.5">{spk.role}</p>
                              {spk.linkedIn && (
                                <button
                                  className="mt-2 w-8 h-8 rounded-full bg-[#0A66C2] flex items-center justify-center hover:brightness-110 transition-all shadow-sm"
                                  onClick={() => window.open(spk.linkedIn, '_blank')}
                                  aria-label="View LinkedIn profile"
                                >
                                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                </button>
                              )}
                            </div>
                          </div>
                          {/* Right: description */}
                          {spk.description && (
                            <div className="flex-1 flex items-center">
                              <p className="text-gray-600 text-sm md:text-lg leading-relaxed text-center md:text-left">{spk.description}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile arrows */}
                  {speakersList.length > 1 && (
                    <div className="md:hidden flex justify-center gap-3 mt-4">
                      <button
                        aria-label="Previous"
                        onClick={() => speakersScrollRef.current?.scrollBy({ left: -600, behavior: 'smooth' })}
                        className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-slate-700 hover:bg-slate-50"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <button
                        aria-label="Next"
                        onClick={() => speakersScrollRef.current?.scrollBy({ left: 600, behavior: 'smooth' })}
                        className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-slate-700 hover:bg-slate-50"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </div>
                  )}
                </div>
              ) : null;
            })()}
            <TeacherTestimonials content={event.eventSections?.find(s => s.section_key === 'testimonials')?.content} />
            <div className="mt-8"><WebinarCTA content={event.eventSections?.find(s => s.section_key === 'cta')?.content} /></div>
          </div>

          {/* FAQ */}
          {(() => {
            const faqItems = (event.eventSections?.find(s => s.section_key === 'faq')?.content?.items ?? []) as Array<{ question: string; answer: string }>;
            return faqItems.length > 0 ? (
              <div className="mt-6 mb-8 sm:mt-12 sm:mb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                  <div className="rm-card px-2 py-3 sm:p-6 lg:p-8">
                    <div className="text-center mb-4 sm:mb-8"><h2 className="rm-section-title mx-auto text-xl sm:text-2xl">Frequently Asked Questions</h2></div>
                    <div className="max-w-4xl mx-auto">
                      {faqItems.map((faqItem, id) => (
                        <div key={id}>
                          <button className="w-full text-left py-4 sm:py-6 flex items-center justify-between focus:outline-none group hover:bg-gray-50/30 transition-colors duration-200" onClick={() => toggleFaq(id)}>
                            <span className="text-lg sm:text-xl text-gray-900 pr-6 sm:pr-8 leading-tight">{faqItem.question}</span>
                            <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 border-2 border-gray-400 rounded-sm flex items-center justify-center bg-white group-hover:border-gray-600 transition-colors duration-200">
                              <span className="text-lg sm:text-xl font-normal text-gray-600 group-hover:text-gray-800">{openFaqIdx === id ? '−' : '+'}</span>
                            </div>
                          </button>
                          {openFaqIdx === id && (<div className="pb-4 sm:pb-6"><p className="text-gray-700 leading-relaxed text-base md:text-lg">{faqItem.answer}</p></div>)}
                          {id < faqItems.length - 1 && (<div className="border-b-2 border-gray-300 w-full"></div>)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null;
          })()}

        </div>
      </div>

      {/* Gallery Modal */}
      <ImageModal
        image={selectedGalleryImage}
        images={((event?.eventSections?.find(s => s.section_key === 'gallery')?.content?.items ?? []) as Array<{ image_url?: string }>).map(item => item.image_url ?? '').filter(Boolean)}
        open={galleryModalOpen}
        onClose={handleGalleryModalClose}
      />
    </div>
  );
};

export default EventDetail;

interface EventGalleryProps {
  images: string[];
}

export function EventGallery({ images }: EventGalleryProps) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string>('');

  const handleImageClick = (img: string) => { setSelectedImage(img); setModalOpen(true); };
  const handleClose = () => { setModalOpen(false); setSelectedImage(''); };

  return (
    <>
      <Carousel images={images} onImageClick={handleImageClick} />
      <ImageModal image={selectedImage} images={images} open={modalOpen} onClose={handleClose} />
    </>
  );
}
