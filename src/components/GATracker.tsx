// src/components/GATracker.tsx
import React from "react";
import { usePageTracking } from "../hooks/usePageTracking";

const GATracker: React.FC = () => {
  usePageTracking();
  return null; // no UI needed
};

export default GATracker;
