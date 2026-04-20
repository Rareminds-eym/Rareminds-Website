import { useEffect, useState } from "react";

export const useIsMobile = (breakpoint: number = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Safety for SSR / lint tools
    if (typeof window === "undefined") return;

    const media = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handleChange = () => setIsMobile(media.matches);

    handleChange(); // initial check
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [breakpoint]);

  return isMobile;
};