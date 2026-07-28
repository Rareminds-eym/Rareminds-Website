import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * HashScrollHandler - Handles automatic scrolling to hash targets on page load and navigation.
 * 
 * Implements a bounded retry mechanism (up to 20 frames) to handle cases where the target
 * element hasn't been rendered yet when the component first mounts.
 * 
 * Uses scrollMarginTop CSS property on target sections to account for fixed headers.
 */
const HashScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    // Only proceed if there's a hash in the URL
    if (!location.hash) return;

    let hash: string;
    try {
      // Safely decode the hash, removing the leading '#'
      hash = decodeURIComponent(location.hash.slice(1));
    } catch {
      // If decoding fails (malformed URI), use the raw hash
      hash = location.hash.slice(1);
    }

    if (!hash) return;

    // Bounded retry scroll check using requestAnimationFrame
    let attempts = 0;
    const maxAttempts = 20; // ~333ms at 60fps, enough for most lazy-loaded content

    const tryScroll = () => {
      const target = document.getElementById(hash);
      
      if (target) {
        // Element found - scroll to it smoothly
        target.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
        return; // Success - stop trying
      }

      // Element not found yet - retry if we haven't exceeded max attempts
      attempts++;
      if (attempts < maxAttempts) {
        requestAnimationFrame(tryScroll);
      }
    };

    // Start the scroll attempt on next frame (allows initial render to complete)
    requestAnimationFrame(tryScroll);
  }, [location.pathname, location.hash]);

  return null;
};

export default HashScrollHandler;
