import { useState, useRef, useEffect } from 'react';

interface ExpandableTextProps {
  text: string;
  maxLines?: number;
  className?: string;
}

export default function ExpandableText({
  text,
  maxLines = 3,
  className = ''
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  // Accurate overflow detection
  useEffect(() => {
    const checkTruncation = () => {
      if (measureRef.current) {
        // Use a hidden element to measure the actual content height
        const scrollHeight = measureRef.current.scrollHeight;
        const clientHeight = measureRef.current.clientHeight;
        
        // Only show button if content actually overflows
        setIsTruncated(scrollHeight > clientHeight + 2); // +2px tolerance for rounding
      }
    };

    // Check after render and after fonts load
    const timer = setTimeout(checkTruncation, 100);
    checkTruncation();
    
    // Recheck on window resize
    window.addEventListener('resize', checkTruncation);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkTruncation);
    };
  }, [text, maxLines]);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full">
      {/* Hidden measurement element - always clamped to detect overflow */}
      <div
        ref={measureRef}
        className={`${className}`}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          pointerEvents: 'none',
          display: '-webkit-box',
          WebkitLineClamp: maxLines,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          width: textRef.current?.offsetWidth || '100%'
        }}
        aria-hidden="true"
      >
        {text}
      </div>

      {/* Visible text content */}
      <div
        ref={textRef}
        className={`${className} ${isExpanded ? '' : 'line-clamp-' + maxLines}`}
        style={
          isExpanded
            ? { display: 'block' }
            : {
                display: '-webkit-box',
                WebkitLineClamp: maxLines,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }
        }
      >
        {text}
      </div>

      {/* Conditional Text Link - ONLY shows if overflow detected */}
      {isTruncated && (
        <span
          onClick={toggleExpand}
          className="inline text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline cursor-pointer transition-colors"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleExpand(e as any);
            }
          }}
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </span>
      )}
    </div>
  );
}
