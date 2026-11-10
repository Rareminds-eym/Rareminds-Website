import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEMO_SECTORS } from "@/data/galleryDemo";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/lib/supabaseClient";
import "./galleryPage.css";

/**
 * /gallery hub — 3D centre-focus carousel straight from the design:
 *
 * - Six sector cards rotate automatically every three seconds.
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

/** Placeholder CDN paths in the seeds resolve to local design assets. */
const localise = (url: string | null, slug: string) =>
  url?.includes("cdn.rareminds.in/gallery/sector-")
    ? `/gallery/sector-${slug}.jpg`
    : url;

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

const SectorBarrel: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  // Load the sectors, falling back to the design demo data
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const { data, error } = await supabase
          .from("gallery_sectors")
          .select(SECTOR_COLUMNS)
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        if (cancelled) return;
        if (error || !data || data.length === 0) setSectors(DEMO_SECTORS as Sector[]);
        else setSectors(data as Sector[]);
      } catch {
        if (!cancelled) setSectors(DEMO_SECTORS as Sector[]);
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
  const parts = sector?.title.split("–").map((p) => p.trim()) ?? [];
  const labelTop = parts.length > 1 ? parts[0] : null; // gold word
  const labelMain = parts[parts.length - 1] ?? "";

  return (
    <section className="gallery-page">
      <h1 className="gallery-heading">Gallery</h1>

      <div className={`gallery-stage${isMobile ? " is-mobile" : ""}`}>
        {sectors.map((s, index) => {
          const offset = offsetOf(index);
          const distance = Math.abs(offset);
          const isCenter = offset === 0;
          const focused = isCenter && (paused || selected === s.slug);
          const img = localise(s.card_image_url, s.slug);
          const visible = distance <= 2;

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
                opacity: !visible ? 0 : isCenter ? 1 : distance === 1 ? 0.55 : 0.35,
                transform: isMobile
                  ? `translate(-50%, -50%) translateY(${offset * 72}%) scale(${offset === 0 ? 1 : 0.92})`
                  : `translate(-50%, -50%) translateX(${offset * 41}%) scale(${offset === 0 ? 1 : distance === 1 ? 0.56 : 0.5})`,
                filter: isCenter ? "none" : "grayscale(0.45)",
              }}
            >
              {img ? (
                <img
                  src={img}
                  alt=""
                  draggable={false}
                  onError={(e) => {
                    // A dead CDN/stock URL falls back to the local design asset
                    const el = e.currentTarget;
                    const fallback = `/gallery/sector-${s.slug}.jpg`;
                    if (!el.dataset.fallback) {
                      el.dataset.fallback = "1";
                      el.src = fallback;
                    } else {
                      el.style.display = "none";
                    }
                  }}
                />
              ) : (
                <span className="gallery-card-placeholder" />
              )}
              <span className="gallery-card-shade" />
              <span
                className={`gallery-card-label${focused ? " is-visible" : ""}`}
                style={{ transitionDelay: focused ? "150ms" : "0ms" }}
              >
                {labelTop && <em className="gallery-card-label-top">{labelTop}</em>}
                <strong className="gallery-card-label-main">
                  {labelMain || s.title}
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
    </section>
  );
};

export default SectorBarrel;
