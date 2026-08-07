import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

/** Single source of truth for the brand logo asset. */
export const BRAND_LOGO_PATH = "/RareMinds-ISO-Logo.webp";

export interface BrandLogoProps {
  /** Extra classes on the logo <img> (default "w-40 h-auto sm:w-64"). */
  logoClassName?: string;
  /** Extra classes appended to the wrapping <Link>. */
  linkClassName?: string;
  /** Wordmark text shown next to the icon; pass "" to hide. */
  brandName?: string;
  /** Alt text for the logo image. */
  alt?: string;
  /** Link destination (default "/"). */
  to?: string;
}

/**
 * Reusable brand lockup: logo icon + wordmark wrapped in a Router <Link>.
 * Used across all header variants so the brand is defined in one place.
 */
export default function BrandLogo({
  logoClassName,
  linkClassName,
  brandName = "RareMinds",
  alt = "Rareminds Logo",
  to = "/",
}: BrandLogoProps) {
  return (
    <Link
      to={to}
      aria-label={brandName ? undefined : alt}
      className={cn("flex items-center gap-2 text-xl font-bold", linkClassName)}
    >
      <img
        src={BRAND_LOGO_PATH}
        alt={alt}
        className={cn("w-40 h-auto sm:w-64", logoClassName)}
        decoding="async"
        fetchPriority="high"
      />
      {brandName && <span className="text-xl font-bold">{brandName}</span>}
    </Link>
  );
}
