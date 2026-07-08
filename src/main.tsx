import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./routes";

// Import required Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import "./index.css";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { AuthProvider } from "./context/AuthContext";

// Extend Window for GTM properties accessed in this file
declare global {
  interface Window {
    google_tag_manager?: Record<string, unknown>;
    dataLayer: Record<string, unknown>[];
  }
}

// Initialize GTM from environment variable before React renders.
// window.dataLayer is pre-initialized in index.html so no events are lost.
const gtmId = import.meta.env.VITE_GTM_ID as string | undefined;

if (gtmId && typeof gtmId === 'string' && gtmId.trim()) {
  // Guard against duplicate initialization (e.g. HMR in development)
  if (!window.google_tag_manager?.[gtmId]) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    document.head?.appendChild(script);
  }
} else if (import.meta.env.DEV) {
  console.warn('[GTM] VITE_GTM_ID is not set. GTM will not be initialized.');
}

// Create a client with optimized caching for smooth back navigation
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh longer
      gcTime: 10 * 60 * 1000, // 10 minutes - keep cached data longer (formerly cacheTime)
      refetchOnMount: false, // Don't refetch when component mounts if data exists
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      refetchOnReconnect: false, // Don't refetch on reconnect
      retry: 1, // Only retry failed requests once
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AuthProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
