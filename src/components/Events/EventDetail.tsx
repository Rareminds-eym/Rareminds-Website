import React from 'react';
import { useParams, Link } from 'react-router-dom';
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
  Loader2,
  CheckCircle,
  XCircle,
  Share2,
  Heart,
  Bookmark,
  ExternalLink,
  ChevronRight,
  Star,
  Award,
  Zap
} from 'lucide-react';

const EventDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { events, loading, error } = useEvents();

  // Find the event by slug
  const event = events.find(e => e.slug === slug);

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
        <div className="text-center relative z-10">
          <div className="relative mb-8">
            <div className="w-20 h-20 mx-auto">
              <div className="w-20 h-20 border-4 border-transparent border-t-indigo-500 border-r-purple-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-b-cyan-500 border-l-blue-500 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '3s'}}></div>
            </div>
          </div>
          <div className="backdrop-blur-md bg-white/30 rounded-3xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">Loading Event Details</h2>
            <p className="text-gray-600">Crafting the perfect experience for you...</p>
          </div>
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
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Modern Floating Navigation - Properly Aligned */}
      <div className="sticky top-6 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-xl bg-white/80 rounded-2xl border border-white/20 shadow-2xl px-6 py-4 w-fit">
            <Link
              to="/events"
              className="group inline-flex items-center text-slate-700 hover:text-indigo-600 transition-all duration-300 font-medium"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                <ArrowLeft className="w-4 h-4 text-white" />
              </div>
              Back to Events
            </Link>
          </div>
        </div>
      </div>

      {/* Main Container with Proper Alignment */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section with Modern Banner - Improved Spacing */}
          <div className="mb-16 pt-8">
            {(event.event_banner || event.featured_image) ? (
              <div className="relative h-[75vh] min-h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={event.event_banner || event.featured_image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
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
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <span className="font-medium">{formatDate(event.event_date)}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <span className="font-medium">{event.location}</span>
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
          </div>

          {/* Main Content Grid - Optimized Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-12">
            {/* Main Content Area */}
            <div className="xl:col-span-8 space-y-12">
              {/* About Section - Enhanced Layout */}
              <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-8 lg:p-10 border border-white/20 shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight">About This Event</h2>
                </div>
                <div 
                  className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-sm prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-strong:text-slate-800 prose-ul:text-slate-700 prose-ol:text-slate-700"
                  dangerouslySetInnerHTML={{ __html: event.description }}
                />
              </div>

              {/* Requirements - Consistent Layout */}
              {event.requirements && (
                <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-8 lg:p-10 border border-white/20 shadow-xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight">Requirements</h2>
                  </div>
                  <div 
                    className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border border-blue-200/50 rounded-2xl p-6 backdrop-blur-sm prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-sm prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-strong:text-slate-800 prose-ul:text-slate-700 prose-ol:text-slate-700"
                    dangerouslySetInnerHTML={{ __html: event.requirements }}
                  />
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {event.speakers.map((speaker, index) => (
                      <div key={index} className="group bg-gradient-to-r from-white/80 to-white/60 rounded-2xl p-4 border border-white/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm">{speaker}</p>
                            <p className="text-slate-600">Speaker</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
              <div className="backdrop-blur-xl bg-white/70 rounded-3xl p-6 lg:p-8 border border-white/20 shadow-xl sticky top-36">
                <h3 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">Event Details</h3>
                
                <div className="space-y-4">
                <div className="group">
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-2xl border border-blue-200/30 transition-all duration-300 hover:shadow-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">Date</p>
                      <p className="text-slate-600 text-sm">{formatDate(event.event_date)}</p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50/80 to-green-50/80 rounded-2xl border border-emerald-200/30 transition-all duration-300 hover:shadow-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">Time</p>
                      <p className="text-slate-600 text-sm">{formatTime(event.event_time)}</p>
                      <p className="text-sm text-slate-500">{event.duration}</p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50/80 to-pink-50/80 rounded-2xl border border-purple-200/30 transition-all duration-300 hover:shadow-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">Location</p>
                      <p className="text-slate-600 text-sm">{event.location}</p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50/80 to-orange-50/80 rounded-2xl border border-amber-200/30 transition-all duration-300 hover:shadow-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">Capacity</p>
                      <p className="text-slate-600 text-sm">{event.capacity} attendees</p>
                    </div>
                  </div>
                </div>

                {event.price && (
                  <div className="p-3 bg-gradient-to-r from-green-50/80 to-emerald-50/80 rounded-2xl border border-green-200/30">
                    <p className="font-semibold text-slate-800 mb-2 text-sm">Pricing</p>
                    <p className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      {event.price === '0' ? 'Free Event' : `$${event.price}`}
                    </p>
                  </div>
                )}

                {event.registration_deadline && (
                  <div className="p-3 bg-gradient-to-r from-red-50/80 to-rose-50/80 rounded-2xl border border-red-200/30">
                    <p className="font-semibold text-slate-800 mb-2 text-sm">Registration Deadline</p>
                    <p className="text-slate-600 text-sm">{formatDate(event.registration_deadline)}</p>
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
