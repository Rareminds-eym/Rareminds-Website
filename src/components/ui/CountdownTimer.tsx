import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, Calendar } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string;
  type: 'registration' | 'event';
  className?: string;
  showIcon?: boolean;
  compact?: boolean;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  targetDate, 
  type = 'registration',
  className = '',
  showIcon = true,
  compact = false
}) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0
  });

  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsExpired(true);
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          total: 0
        });
        return;
      }

      setIsExpired(false);
      setTimeRemaining({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        total: difference
      });
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isExpired) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <AlertCircle className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} text-red-500`} />
        <span className={`font-semibold text-red-600 ${compact ? 'text-sm' : 'text-base'}`}>
          {type === 'registration' ? 'Registration Closed' : 'Event Started'}
        </span>
      </div>
    );
  }

  const formatTime = (value: number, unit: string): string => {
    if (compact && value === 0) return '';
    return `${value.toString().padStart(2, '0')}${compact ? unit.charAt(0) : ` ${unit}${value !== 1 ? 's' : ''}`}`;
  };

  const timeUnits = [
    { value: timeRemaining.days, unit: 'day', shortUnit: 'd', show: timeRemaining.days > 0 || !compact },
    { value: timeRemaining.hours, unit: 'hour', shortUnit: 'h', show: true },
    { value: timeRemaining.minutes, unit: 'minute', shortUnit: 'm', show: true },
    { value: timeRemaining.seconds, unit: 'second', shortUnit: 's', show: !compact || timeRemaining.days === 0 }
  ];

  const displayUnits = timeUnits.filter(unit => unit.show && (unit.value > 0 || timeUnits.length === 1));

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {showIcon && (
          <Clock className="w-4 h-4 text-orange-500" />
        )}
        <div className="flex items-center gap-1">
          {displayUnits.map((unit, index) => (
            <span key={unit.unit} className="text-sm font-mono text-gray-700">
              {formatTime(unit.value, unit.shortUnit)}
              {index < displayUnits.length - 1 && ':'}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-2 mb-2">
        {showIcon && (
          type === 'registration' ? 
            <Clock className="w-5 h-5 text-orange-500" /> :
            <Calendar className="w-5 h-5 text-blue-500" />
        )}
        <span className="text-sm font-medium text-gray-600">
          {type === 'registration' ? 'Registration ends in:' : 'Event starts in:'}
        </span>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {timeUnits.map((unit) => (
          <div key={unit.unit} className="text-center">
            <div className="bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg px-2 py-3 border">
              <div className="text-lg font-bold text-gray-800 font-mono">
                {unit.value.toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {unit.unit}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;