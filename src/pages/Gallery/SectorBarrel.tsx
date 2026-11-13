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
        <p
          className="mt-7 text-center text-base text-gray-800 md:mt-[42px] md:text-xl"
          role={error ? "alert" : "status"}
        >
          {loading
            ? "Loading gallery sectors…"
            : error ?? "No gallery content is available right now. Please try again later."}
        </p>
      ) : (
        <>
          <div className="relative mt-12 h-[560px] md:mt-24 md:h-[426px]">
            {sectors.map((s, index) => {
              const offset = offsetOf(index);
              const distance = Math.abs(offset);
              const isCenter = offset === 0;
              const focused = isCenter && (paused || selected === s.slug);
              const visible = distance <= 2;
              const { top: cardTop, main: cardMain } = getSectorLabels(s.title, s.group_name);
              const hasImage = Boolean(s.card_image_url) && !failedImages[s.id];
              const labelVisible = focused || isCenter || !hasImage;

              return (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Open the ${s.title} gallery`}
                  onClick={() => openSector(index, s.slug)}
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                  className={`absolute left-1/2 top-1/2 aspect-video w-[86%] max-w-none cursor-pointer overflow-hidden rounded-[20px] border-0 bg-gray-300 p-0 transition-[transform,opacity,filter,box-shadow,border] duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] md:w-[762px] md:max-w-[56%] md:rounded-[28px] ${
                    focused
                      ? "border-2 border-[#f0d9a6] shadow-[0_28px_70px_rgba(0,0,0,0.32)] ring-1 ring-[rgba(240,217,166,0.6)]"
                      : "shadow-[0_24px_60px_rgba(0,0,0,0.28)]"
                  }`}
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
                      className="absolute inset-0 block h-full w-full object-cover"
                      src={s.card_image_url!}
                      alt={s.title}
                      draggable={false}
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [s.id]: true }))
                      }
                    />
                  ) : (
                    <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_25%,#334155_0%,#1e293b_55%,#0f172a_100%)]">
                      <div className="flex -translate-y-6 flex-col items-center gap-3 opacity-[0.85]">
                        <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-[rgba(240,217,166,0.35)] bg-[rgba(255,255,255,0.08)] text-[#f0d9a6]">
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
                        <span className="rounded-full border border-[rgba(240,217,166,0.25)] bg-[rgba(0,0,0,0.4)] px-[14px] py-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#f0d9a6]">
                          {s.group_name || "Sector"}
                        </span>
                      </div>
                    </div>
                  )}
                  <span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.55),rgba(0,0,0,0.10)_45%,rgba(0,0,0,0)_70%)]" />
                  <span
                    className={`absolute bottom-[18px] left-4 z-[2] flex flex-col items-start gap-0.5 text-left transition-[opacity,transform] duration-[450ms] md:bottom-[74px] md:left-[26px] ${
                      labelVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-[10px] opacity-0"
                    } ${focused ? "delay-[150ms]" : "delay-0"}`}
                  >
                    {cardTop && (
                      <em className="font-[Georgia,Times_New_Roman,serif] text-[15px] not-italic leading-[1.1] text-[#f0d9a6] [text-shadow:0_1px_8px_rgba(0,0,0,0.45)] md:text-[22px]">
                        {cardTop}
                      </em>
                    )}
                    <strong className="font-[Georgia,Times_New_Roman,serif] text-[28px] font-bold leading-[1.05] text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.55)] md:text-[46px]">
                      {cardMain}
                    </strong>
                  </span>
                </button>
              );
            })}
          </div>

          <p
            className="mt-7 text-center text-base text-gray-800 md:mt-[42px] md:text-xl"
            aria-live="polite"
          >
            {paused && sector ? sector.title : "Hover a card to pause"}
          </p>

          <nav
            className="mt-[14px] flex items-center justify-center gap-4 md:mt-[18px]"
            aria-label="Rotate the gallery barrel"
          >
            <button
              type="button"
              className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-full border border-[#e3c583] bg-[#f0d9a6] text-[#111] transition-[background-color,box-shadow,transform] duration-200 hover:bg-[#e3c583] hover:shadow-[0_2px_10px_rgba(227,197,131,0.55)] active:scale-[0.94] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#e3c583] md:h-[46px] md:w-[46px]"
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
              className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-full border border-[#e3c583] bg-[#f0d9a6] text-[#111] transition-[background-color,box-shadow,transform] duration-200 hover:bg-[#e3c583] hover:shadow-[0_2px_10px_rgba(227,197,131,0.55)] active:scale-[0.94] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#e3c583] md:h-[46px] md:w-[46px]"
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
