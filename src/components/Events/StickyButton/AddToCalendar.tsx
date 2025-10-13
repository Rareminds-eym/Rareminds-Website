import React from "react";
import { Calendar, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Event } from '../../../types/Events/event';
 
interface AddToCalendarProps {
    isVisible: boolean;
    onClose: () => void;
    currentEvent?: Event;
}

const formatDateForCalendar = (dateStr: string, timeStr: string) => {
    // Combine date and time for calendar formatting
    const eventDate = new Date(`${dateStr}T${timeStr}`);
    return eventDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

const formatEndDateForCalendar = (dateStr: string, timeStr: string, duration: string) => {
    // Parse duration and calculate end time
    const eventDate = new Date(`${dateStr}T${timeStr}`);
    
    // Extract duration (assuming format like "2 hours", "1.5 hours", "90 minutes")
    const durationMatch = duration.match(/(\d+(?:\.\d+)?)\s*(hour|minute)s?/i);
    if (durationMatch) {
        const value = parseFloat(durationMatch[1]);
        const unit = durationMatch[2].toLowerCase();
        
        if (unit.startsWith('hour')) {
            eventDate.setHours(eventDate.getHours() + value);
        } else if (unit.startsWith('minute')) {
            eventDate.setMinutes(eventDate.getMinutes() + value);
        }
    } else {
        // Default to 1 hour if duration can't be parsed
        eventDate.setHours(eventDate.getHours() + 1);
    }
    
    return eventDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

export const AddToCalendar: React.FC<AddToCalendarProps> = ({ isVisible, onClose, currentEvent }) => {
    if (!currentEvent) return null;

    const startDate = formatDateForCalendar(currentEvent.event_date, currentEvent.event_time);
    const endDate = formatEndDateForCalendar(currentEvent.event_date, currentEvent.event_time, currentEvent.duration);
    
    // Clean HTML from description for calendar
    const cleanDescription = currentEvent.description.replace(/<[^>]*>/g, '').substring(0, 200) + '...';
    
    const generateGoogleCalendarUrl = () => {
        const params = new URLSearchParams({
            action: 'TEMPLATE',
            text: currentEvent.title,
            dates: `${startDate}/${endDate}`,
            details: cleanDescription,
            location: currentEvent.location,
            trp: 'false',
            sprop: 'website:rareminds.com'
        });
        return `https://calendar.google.com/calendar/render?${params.toString()}`;
    };

    const generateOutlookUrl = () => {
        const params = new URLSearchParams({
            subject: currentEvent.title,
            startdt: startDate,
            enddt: endDate,
            body: cleanDescription,
            location: currentEvent.location,
            allday: 'false',
            uid: currentEvent.id || 'event-' + Date.now()
        });
        return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
    };

    const generateICSFile = () => {
        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Rareminds//Event Calendar//EN',
            'BEGIN:VEVENT',
            `UID:${currentEvent.id || 'event-' + Date.now()}@rareminds.com`,
            `DTSTART:${startDate}`,
            `DTEND:${endDate}`,
            `SUMMARY:${currentEvent.title}`,
            `DESCRIPTION:${cleanDescription}`,
            `LOCATION:${currentEvent.location}`,
            `ORGANIZER:CN=${currentEvent.organizer_name}:MAILTO:${currentEvent.organizer_email}`,
            'STATUS:CONFIRMED',
            'BEGIN:VALARM',
            'TRIGGER:-PT15M',
            'ACTION:DISPLAY',
            'DESCRIPTION:Event reminder',
            'END:VALARM',
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${currentEvent.title.replace(/[^a-z0-9]/gi, '_')}.ics`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const calendarOptions = [
        {
            name: 'Google Calendar',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
            ),
            onClick: () => window.open(generateGoogleCalendarUrl(), '_blank'),
            color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
        },
        {
            name: 'Apple Calendar',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
            ),
            onClick: generateICSFile,
            color: 'bg-gray-50 hover:bg-gray-100 border-gray-200'
        },
        {
            name: 'Outlook Calendar',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#0078d4" d="M7 9c0-1.5 1-3 3-3s3 1.5 3 3-1 3-3 3-3-1.5-3-3z"/>
                    <path fill="#0078d4" d="M13 3.5a8.5 8.5 0 0 0-3 16.4c.5.1 1-.3 1-.8V17c-2.4-.6-3-2.4-3-2.4-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.7-.9-3.7-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.2.8 2.1 0 3.1-1.9 3.8-3.7 4 .3.3.6.8.6 1.5v2.2c0 .5.5.9 1 .8A8.5 8.5 0 0 0 13 3.5z"/>
                </svg>
            ),
            onClick: () => window.open(generateOutlookUrl(), '_blank'),
            color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200'
        }
    ];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed bottom-24 right-4 z-50 bg-white rounded-xl shadow-2xl p-4 sm:p-6 w-[90vw] max-w-[400px]"
                >
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-red-600" />
                            <h3 className="text-lg font-semibold text-gray-900">Add to Calendar</h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                            aria-label="Close calendar dialog"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-100">
                        <h4 className="font-semibold text-gray-900 mb-1">{currentEvent.title}</h4>
                        <p className="text-sm text-gray-600">
                            {new Date(currentEvent.event_date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })} at {currentEvent.event_time}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                            📍 {currentEvent.location} | ⏱️ {currentEvent.duration}
                        </p>
                    </div>
                   
                    <div className="space-y-3">
                        <p className="text-sm font-medium text-gray-700">Choose your calendar app:</p>
                        
                        {calendarOptions.map((option, index) => (
                            <motion.button
                                key={option.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => {
                                    option.onClick();
                                    onClose();
                                }}
                                className={`w-full p-3 rounded-lg border-2 ${option.color} transition-all duration-200 flex items-center gap-3 hover:scale-[1.02]`}
                            >
                                {option.icon}
                                <span className="font-medium text-gray-700">{option.name}</span>
                                <ExternalLink className="w-4 h-4 ml-auto text-gray-500" />
                            </motion.button>
                        ))}
                    </div>
                   
                    <p className="mt-4 text-xs text-gray-500 text-center">
                        Event will be added with a 15-minute reminder
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    )
} 