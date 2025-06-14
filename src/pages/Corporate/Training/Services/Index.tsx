import React from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    selectServicesForDisplay, 
    selectServicesLoading, 
    selectServicesError,
    selectServicesCount 
} from '../../../../features/corporateTrainingServicesSlice';
import type { RootState } from '../../../../store';
import { ArrowRight, BookOpen, ChevronRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Service {
    id: string;
    title: string;
    subtitle: string;
    description: string;
}

const LoadingState = () => (
    <div className="min-h-[60vh] container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
            <div className="animate-pulse space-y-8">
                {/* Hero Section Skeleton */}
                <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded-full w-24 mb-8"></div>
                    <div className="h-12 bg-gray-200 rounded-lg w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-1/2 mt-4"></div>
                </div>
                
                {/* Services Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
                            <div className="h-10 w-10 bg-gray-200 rounded-lg mb-4"></div>
                            <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-3"></div>
                            <div className="h-4 bg-gray-200 rounded-full w-full mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded-full w-2/3"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const ErrorState = ({ error }: { error: string }) => (
    <div className="min-h-[60vh] flex items-center justify-center bg-red-50">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center px-4"
        >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-900 mb-3">Service Load Error</h2>
            <p className="text-red-600 mb-6">{error}</p>
            <button 
                onClick={() => window.location.reload()} 
                className="inline-flex items-center px-6 py-3 border border-red-600 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
            >
                Retry Loading Services
            </button>
        </motion.div>
    </div>
);

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
    const icons = [BookOpen, Zap];
    const Icon = icons[index % icons.length];
    const colors = [
        { light: 'from-blue-50 to-indigo-50', dark: 'from-blue-600 to-indigo-600' },
        { light: 'from-indigo-50 to-purple-50', dark: 'from-indigo-600 to-purple-600' },
        { light: 'from-purple-50 to-pink-50', dark: 'from-purple-600 to-pink-600' },
    ];
    const color = colors[index % colors.length];

    // Decorative SVG pattern
    const DecorativePattern = () => (
        <svg className="absolute right-2 bottom-2 w-16 h-16 opacity-10 pointer-events-none" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="28" stroke="#6366f1" strokeWidth="4" />
            <circle cx="32" cy="32" r="16" stroke="#a5b4fc" strokeWidth="2" />
        </svg>
    );

    // Sparkle icon (Lucide Sparkles or custom SVG)
    const Sparkle = () => (
        <svg className="absolute top-3 right-3 w-6 h-6 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.41 1.41M6.34 17.66l-1.41 1.41m12.02 0l1.41-1.41M6.34 6.34L4.93 4.93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    return (
        <Link to={`/corporate/training/services/${service.id}`} className="block h-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 8px 32px 0 rgba(59,130,246,0.10)' }}
                className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden"
            >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${color.light} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500`} />

                {/* Decorative SVG Pattern */}
                <DecorativePattern />

                {/* Sparkle icon on hover */}
                <Sparkle />

                {/* Popular badge for first card */}
                {index === 0 && (
                    <span className="absolute top-3 left-3 z-20 bg-gradient-to-r from-yellow-400 to-pink-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
                        Popular
                    </span>
                )}

                {/* Content */}
                <div className="relative z-10 flex flex-col flex-1">
                    {/* Icon */}
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r ${color.dark} p-2.5 sm:p-3 shadow-lg mb-4 sm:mb-6 text-white transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 mx-auto sm:mx-0`}>
                        <Icon className="w-full h-full" />
                    </div>

                    {/* Title, Subtitle & Description */}
                    <div className="space-y-2 sm:space-y-4 flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 text-center sm:text-left">
                            {service.title}
                        </h3>
                        {service.subtitle && (
                            <div className="text-xs sm:text-sm text-indigo-500 font-semibold text-center sm:text-left">
                                {service.subtitle}
                            </div>
                        )}
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base text-center sm:text-left">
                            {service.description}
                        </p>
                    </div>

                    {/* Action Link */}
                    <div className="mt-6 sm:mt-8 flex items-center justify-center sm:justify-start text-blue-600 font-medium group/link">
                        <span className="mr-2">Explore Service</span>
                        <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                    </div>
                </div>

                {/* Interactive Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-100 rounded-2xl transition-colors duration-500 pointer-events-none" />
            </motion.div>
        </Link>
    );
};

const ServicesPage: React.FC = () => {
    const services = useSelector((state: RootState) => selectServicesForDisplay(state)) as Service[];
    const loading = useSelector((state: RootState) => selectServicesLoading(state));
    const error = useSelector((state: RootState) => selectServicesError(state));
    const servicesCount = useSelector((state: RootState) => selectServicesCount(state));

    if (loading) return <LoadingState />;
    if (error) return <ErrorState error={error} />;

    return (
        <AnimatePresence>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
                {/* Hero Section */}
                <section className="relative py-8 sm:py-10 overflow-hidden">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            {/* Category Label */}
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="inline-flex items-center px-3 py-1.5 bg-blue-50 rounded-full text-blue-600 font-medium text-xs mb-4"
                            >
                                <Zap className="w-3 h-3 mr-1.5" />
                                Enterprise Training Solutions
                            </motion.div>

                            {/* Main Title */}
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                                Transform Your Workforce With Our{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                    Training Services
                                </span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-base text-gray-600 mb-6 leading-relaxed">
                                We offer comprehensive training solutions tailored for enterprise needs.
                                {servicesCount > 0 && (
                                    <span className="block mt-1 text-blue-600 font-medium text-sm">
                                        Explore our {servicesCount} specialized training programs.
                                    </span>
                                )}
                            </p>

                            {/* CTA Buttons */}
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="flex flex-col sm:flex-row gap-2 justify-center"
                            >
                                <button className="corporate-btn-1">
                                    Schedule Consultation
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </button>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Services Grid Section */}
                <section className="py-10 sm:py-20">
                    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {services.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                {services.map((service, idx) => (
                                    <ServiceCard key={service.id || idx} service={service} index={idx} />
                                ))}
                            </div>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20"
                            >
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <BookOpen className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h3>
                                <p className="text-gray-500">
                                    We're developing new training programs to meet your needs.
                                    Check back soon for updates.
                                </p>
                            </motion.div>
                        )}
                    </div>
                </section>

                {/* Bottom CTA Section */}
                <section className="py-10 sm:py-20 relative overflow-hidden">
                    {/* Decorative SVG background */}
                    <div className="absolute inset-0 pointer-events-none z-0">
                        <svg
                            className="w-full h-full"
                            viewBox="0 0 1440 400"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                        >
                            <defs>
                                <linearGradient id="bg-gradient-dark" x1="0" y1="0" x2="1" y2="1">
                                    <stop stopColor="#1e293b" />
                                    <stop offset="1" stopColor="#312e81" />
                                </linearGradient>
                                <radialGradient id="radial-dark" cx="70%" cy="30%" r="80%">
                                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                                    <stop offset="100%" stopColor="#312e81" stopOpacity="0" />
                                </radialGradient>
                            </defs>
                            <rect width="1440" height="400" fill="url(#bg-gradient-dark)" />
                            <circle cx="1200" cy="80" r="180" fill="url(#radial-dark)" />
                            <circle cx="300" cy="320" r="140" fill="url(#radial-dark)" />
                        </svg>
                    </div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-2xl sm:max-w-4xl mx-auto text-center text-white"
                        >
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 leading-tight drop-shadow-lg">
                                Ready to Elevate Your Team's Performance?
                            </h2>
                            <p className="text-base sm:text-xl mb-8 sm:mb-12 opacity-90">
                                Join 500+ enterprises that have transformed their workforce with our training solutions.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                                <button className="corporate-btn-2 bg-white text-black">
                                    Talk to an Expert
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </AnimatePresence>
    );
};

export default ServicesPage;