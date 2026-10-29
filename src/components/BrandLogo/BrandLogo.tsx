import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { useCompanySettings } from "../../hooks/useCompanySettings";

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
  const { settings, isLoading, errorMessage } = useCompanySettings();
  const [logoLoadFailed, setLogoLoadFailed] = useState(false);
  const settingsError = errorMessage || (!isLoading && !settings ? 'Company settings are unavailable.' : null);
  const logoError = settings?.logo_url && logoLoadFailed ? 'Company logo could not be loaded.' : null;

  return (
    <Link
      to={to}
      aria-label={brandName ? undefined : alt}
      className={cn("flex items-center gap-2 text-xl font-bold", linkClassName)}
    >
      {isLoading && (
        <span className={cn("inline-block h-8 w-40 rounded bg-slate-100", logoClassName)} role="status" aria-label="Loading company logo" />
      )}
      {(settingsError || logoError) && !isLoading && (
        <span className="text-sm font-semibold text-red-600">{settingsError || logoError}</span>
      )}
      {settings?.logo_url && !logoError && !isLoading && (
        <img
          src={settings.logo_url}
          alt={alt}
          width="256"
          height="76"
          className={cn("w-40 h-auto sm:w-64 aspect-[4258/1263]", logoClassName)}
          decoding="async"
          fetchPriority="high"
          onError={() => setLogoLoadFailed(true)}
        />
      )}
      {brandName && <span className="text-xl font-bold">{brandName}</span>}
    </Link>
  );
}
