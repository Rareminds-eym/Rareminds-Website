/**
 * Minimal ambient declaration for `@react-google-maps/api` and the Google Maps
 * JavaScript API. The package is not installed in this project (MapSection.tsx
 * is currently unmounted dead code, but still imported by
 * src/pages/Academia/projects/[name].tsx), so these loose types keep
 * `tsc --noEmit` passing.
 *
 * NOTE: To fully restore map functionality, install:
 *   - @react-google-maps/api
 *   - @types/google.maps (optional, for richer types)
 * and delete this file.
 */

declare module "@react-google-maps/api" {
  import type * as React from "react";

  export interface GoogleMapProps {
    mapContainerStyle?: React.CSSProperties | Record<string, string | number>;
    zoom?: number;
    center?: { lat: number; lng: number };
    options?: Record<string, unknown>;
    onLoad?: (map: google.maps.Map) => void;
    children?: React.ReactNode;
    [key: string]: unknown;
  }

  export interface MarkerProps {
    position: { lat: number; lng: number };
    onClick?: () => void;
    icon?: unknown;
    [key: string]: unknown;
  }

  export interface InfoWindowProps {
    position: { lat: number; lng: number };
    onCloseClick?: () => void;
    children?: React.ReactNode;
    [key: string]: unknown;
  }

  export interface LoadScriptOptions {
    googleMapsApiKey: string;
    [key: string]: unknown;
  }

  export function useLoadScript(options: LoadScriptOptions): {
    isLoaded: boolean;
    loadError: Error | undefined;
  };

  export const GoogleMap: React.FC<GoogleMapProps>;
  export const Marker: React.FC<MarkerProps>;
  export const InfoWindow: React.FC<InfoWindowProps>;
}

declare namespace google {
  namespace maps {
    export type Map = any;
    export class Size {
      constructor(width: number, height: number);
      width: number;
      height: number;
    }
  }
}

declare var google: any;

interface Window {
  google: any;
}
