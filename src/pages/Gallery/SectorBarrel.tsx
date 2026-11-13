import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/lib/supabaseClient";
import "./galleryPage.css";

/**
 * /gallery hub — 3D centre-focus carousel straight from the design:
 *
 * - Active sector cards rotate automatically every three seconds.
 * - Side cards peek in from the screen edges, dimmed and desaturated.
 * - Hovering pauses the rotation and reveals the sector label
 *   (a gold group word over a big white serif title) with a gold ring
 *   around the focused card; the caption below shows the sector name.
 * - Clicking opens that sector's gallery (/gallery/<slug>).
 */

const SECTOR_COLUMNS =
  "id, slug, title, group_name, description, card_image_url, parent_path, gallery_path, topic_options, sort_order";

const AUTO_ROTATE_MS = 3000;
const OPEN_DELAY_MS = 500;

type Sector = {
  id: string;
  slug: string;
  title: string;
  group_name: string;
  description: string | null;
  card_image_url: string | null;
  parent_path: string;
  gallery_path: string;
  topic_options: string[];
  sort_order: number;
};

const getSectorLabels = (title: string, groupName: string) => {
  const parts = title.split(/\s*[-–—]\s*/).filter(Boolean);
  const top =
    parts.length > 1
      ? parts[0]
      : groupName && groupName.toLowerCase() !== title.toLowerCase()
        ? groupName
        : null;
  const main = parts.length > 1 ? parts.slice(1).join(" – ") : title;
  return { top, main };
};

const SectorBarrel: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const { data, error } = await supabase
          .from("gallery_sectors")
          .select(SECTOR_COLUMNS)
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        if (error) throw new Error(error.message);
        if (!cancelled) setSectors((data ?? []) as Sector[]);
      } catch (e) {
        console.error("Failed to load gallery sectors:", e);
        if (!cancelled) {
          setSectors([]);
          setError("No gallery content is available right now. Please try again later.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const openTimerRef = React.useRef<number | null>(null);
  // Never leave a pending navigation timer behind
  useEffect(
    () => () => {
      if (openTimerRef.current !== null) window.clearTimeout(openTimerRef.current);
    },
    []
  );

  // `active` intentionally restarts the timer after manual sector navigation.
  // biome-ignore lint/correctness/useExhaustiveDependencies: Reset the rotation interval whenever the active sector changes.
  useEffect(() => {
    if (paused || selected || sectors.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActive((i) => (i + 1) % sectors.length);
    }, AUTO_ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [paused, selected, sectors.length, active]);

  /** Bring the card sitting `dir` steps from the centre into focus. */
  const step = (dir: -1 | 1) => {
    if (selected || sectors.length < 2) return;
    setActive((i) => (i + dir + sectors.length) % sectors.length);
  };

  const openSector = (index: number, slug: string) => {
    if (index !== active) setActive(index); // side card: centre it first
    setSelected(slug);
    if (openTimerRef.current !== null) window.clearTimeout(openTimerRef.current);
    openTimerRef.current = window.setTimeout(
      () => navigate(`/gallery/${slug}`),
      OPEN_DELAY_MS
    );
  };

  // 0 = centre, -1 = left, 1 = right, …
  const offsetOf = (index: number) => {
    const n = sectors.length;
    let diff = (((index - active) % n) + n) % n;
    if (diff > n / 2) diff -= n;
    return diff;
  };

  const sector = sectors[active];

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-8 pb-10 md:px-14 md:py-11 md:pb-14">
      <h1 className="mb-[6px] font-[Georgia,Times_New_Roman,serif] text-xl font-bold text-[#111] md:text-[26px]">
        Gallery
      </h1>

      {loading || error || sectors.length === 0 ? (
        <p className="gallery-caption" role={error ? "alert" : "status"}>
          {loading
            ? "Loading gallery sectors…"
            : error ?? "No gallery content is available right now. Please try again later."}
        </p>
      ) : (
        <>
          <div className={`gallery-stage${isMobile ? " is-mobile" : ""}`}>
            {sectors.map((s, index) => {
              const offset = offsetOf(index);
              const distance = Math.abs(offset);
              const isCenter = offset === 0;
              const focused = isCenter && (paused || selected === s.slug);
              const visible = distance <= 2;
              const { top: cardTop, main: cardMain } = getSectorLabels(s.title, s.group_name);
              const hasImage = Boolean(s.card_image_url) && !failedImages[s.id];

              return (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Open the ${s.title} gallery`}
                  onClick={() => openSector(index, s.slug)}
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                  className={`gallery-card${focused ? " is-focused" : ""}`}
                  style={{
                    zIndex: 10 - distance,
                    pointerEvents: visible ? "auto" : "none",
                    opacity: !visible ? 0 : isCenter ? 1 : distance === 1 ? 0.72 : 0.45,
                    transform: isMobile
                      ? `translate(-50%, -50%) translateY(${offset * 72}%) scale(${offset === 0 ? 1 : 0.92})`
                      : `translate(-50%, -50%) translateX(${offset * 41}%) scale(${offset === 0 ? 1 : distance === 1 ? 0.56 : 0.5})`,
                    filter: isCenter ? "none" : "grayscale(0.35)",
                  }}
                >
                  {hasImage ? (
                    <img
                      src={s.card_image_url!}
                      alt={s.title}
                      draggable={false}
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [s.id]: true }))
                      }
                    />
                  ) : (
                    <div className="gallery-card-placeholder gallery-empty-card">
                      <div className="gallery-empty-card-inner">
                        <div className="gallery-empty-card-icon">
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                            <circle cx="9" cy="9" r="2" />
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                          </svg>
                        </div>
                        <span className="gallery-empty-card-badge">
                          {s.group_name || "Sector"}
                        </span>
                      </div>
                    </div>
                  )}
                  <span className="gallery-card-shade" />
                  <span
                    className={`gallery-card-label ${
                      focused || isCenter || !hasImage ? "is-visible" : ""
                    }${!hasImage ? " is-empty-card" : ""}`}
                    style={{ transitionDelay: focused ? "150ms" : "0ms" }}
                  >
                    {cardTop && <em className="gallery-card-label-top">{cardTop}</em>}
                    <strong className="gallery-card-label-main">
                      {cardMain}
                    </strong>
                  </span>
                </button>
              );
            })}
          </div>

          <p className="gallery-caption" aria-live="polite">
            {paused && sector ? sector.title : "Hover a card to pause"}
          </p>

          <nav className="gallery-arrows" aria-label="Rotate the gallery barrel">
            <button
              type="button"
              className="gallery-arrow"
              aria-label="Rotate to the previous sector"
              onClick={() => step(-1)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M19 12H5M5 12l6-6M5 12l6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className="gallery-arrow"
              aria-label="Rotate to the next sector"
              onClick={() => step(1)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14M19 12l-6-6M19 12l-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </nav>
        </>
      )}
    </section>
  );
};

export default SectorBarrel;
