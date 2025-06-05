import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const usePageTracking = (): void => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", "G-4NJ7P2SNWH", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
};
