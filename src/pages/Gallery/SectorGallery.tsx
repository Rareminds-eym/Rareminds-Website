import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Image as ImageIcon, Maximize, Pause, Play, Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import "./galleryPage.css";

/**
 * Sector gallery page — rebuilt from the design deck:
 *
 * - Breadcrumb (Home › {Sector} › Gallery), big serif title, description.
 * - Grid of media cards with Photo/Video badges, a play affordance on
 *   videos, hover zoom and a staggered fade-up entrance.
 * - Filter bar: media-type tabs, search with suggestions, topic chips
 *   and four dropdowns (Categories / Names / Years / Locations).
 * - "Showing X of Y" + numbered pagination (Previous / page numbers / Next,
 *   centered under the grid), "No more images or videos".
 * - Lightbox with prev/next arrows, keyboard navigation and a custom
 *   video control bar for hosted videos.
 */

/* ------------------------------------------------------------------ */
/* types & constants                                                   */
/* ------------------------------------------------------------------ */

const PAGE_SIZE = 8; // the design grid shows 8 cards; "Load more" adds more
const SKELETON_KEYS = Array.from({ length: PAGE_SIZE }, (_, i) => `skeleton-${i}`);

export type SectorItem = {
  id: string;
  media_type: "photo" | "video";
  title: string;
  caption: string | null;
  alt_text: string | null;
  image_url: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
  video_provider: "youtube" | "vimeo" | "hosted" | null;
  subtitles_url: string | null;
  duration_seconds: number | null;
  event_year: number | null;
  category: string | null;
  organization_name: string | null;
  location: string | null;
  topics: string[];
};

type SectorInfo = {
  id: string;
  slug: string;
  title: string;
  group_name: string;
  description: string | null;
  parent_path: string;
  gallery_path: string;
  topic_options: string[];
};

type Props = { sector: string };

const ITEM_COLUMNS =
  "id, media_type, title, caption, alt_text, image_url, video_url, thumbnail_url, " +
  "video_provider, subtitles_url, duration_seconds, event_year, institution_type, " +
  "organization_name, location";

const timeFormat = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  return `${m}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
};

/** Every searchable word of one media item (title, caption, alt text,
 *  organization, location). Both the grid search and the suggestion
 *  dropdown match against this, so one search checks all photos AND
 *  videos of the sector. */
const mediaHaystack = (it: SectorItem) =>
  `${it.title} ${it.caption ?? ""} ${it.alt_text ?? ""} ${it.organization_name ?? ""} ${it.location ?? ""}`
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const hasRealMedia = (it: { image_url?: string | null; thumbnail_url?: string | null; video_url?: string | null }) => {
  const url = it.image_url || it.thumbnail_url || it.video_url;
  if (!url || typeof url !== "string") return false;
  return url.trim().length > 0;
};

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */

const SectorGallery: React.FC<Props> = ({ sector }) => {
  const [info, setInfo] = useState<SectorInfo | null>(null);
  const [sectorOptions, setSectorOptions] = useState<
    Array<Pick<SectorInfo, "slug" | "title">>
  >([]);
  const [items, setItems] = useState<SectorItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [failedItemImages, setFailedItemImages] = useState<Record<string, boolean>>({});

  /* filters */
  const [tab, setTab] = useState<"all" | "photo" | "video">("all");
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<string | null>(null);
  const [name, setName] = useState("All");
  const [year, setYear] = useState("All");
  const [location, setLocation] = useState("All");

  /* paging + lightbox */
  const [page, setPage] = useState(1); // 1-based pager, 8 cards per page
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        // Load active sectors for both this page and its sector navigator.
        const { data: sectorRows, error: sectorError } = await supabase
          .from("gallery_sectors")
          .select(
            "id, slug, title, group_name, description, parent_path, gallery_path, topic_options",
          )
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        if (sectorError) throw new Error(sectorError.message);
        const availableSectors = sectorRows ?? [];
        const sectorRow = availableSectors.find((row) => row.slug === sector);
        if (!sectorRow) throw new Error("Gallery not found.");

        setInfo(sectorRow as SectorInfo);
        setSectorOptions(availableSectors.map(({ slug, title }) => ({ slug, title })));

        // Placement rows join the published items.
        //    Never use select('*') on gallery_item_sectors: two columns are private.
        const { data, error: itemsError } = await supabase
          .from("gallery_item_sectors")
          .select(`topics, sort_order, gallery_items(${ITEM_COLUMNS})`)
          .eq("sector_id", (sectorRow as SectorInfo).id)
          .order("sort_order", { ascending: true });

        if (itemsError) {
          console.warn("Could not load gallery items for sector:", itemsError.message);
          if (!cancelled) setItems([]);
        } else if (!cancelled) {
          const rows = (data ?? []) as unknown as Array<{
            topics: string[];
            sort_order: number;
            gallery_items: Record<string, unknown> | null;
          }>;

          setItems(
            rows
              .map((row) => {
                const it = (row.gallery_items ?? {}) as Record<string, unknown>;
                return {
                  id: String(it.id ?? ""),
                  media_type: (it.media_type as SectorItem["media_type"]) ?? "photo",
                  title: String(it.title ?? ""),
                  caption: (it.caption as string | null) ?? null,
                  alt_text: (it.alt_text as string | null) ?? null,
                  image_url: (it.image_url as string | null) ?? null,
                  video_url: (it.video_url as string | null) ?? null,
                  thumbnail_url: (it.thumbnail_url as string | null) ?? null,
                  video_provider: (it.video_provider as SectorItem["video_provider"]) ?? null,
                  subtitles_url: (it.subtitles_url as string | null) ?? null,
                  duration_seconds: (it.duration_seconds as number | null) ?? null,
                  event_year: (it.event_year as number | null) ?? null,
                  category: (it.institution_type as string | null) ?? null,
                  organization_name: (it.organization_name as string | null) ?? null,
                  location: (it.location as string | null) ?? null,
                  topics: row.topics ?? [],
                } as SectorItem;
              })
              .filter((it) => Boolean(it.title && hasRealMedia(it))),
          );
        }
      } catch (e) {
        console.error("Failed to load sector gallery:", e);
        if (!cancelled) {
          setInfo(null);
          setSectorOptions([]);
          setItems([]);
          setError("Content not available, please try again later.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [sector]);

  /* reset pagination whenever filters change */
  // biome-ignore lint/correctness/useExhaustiveDependencies: Filter changes intentionally reset the current page.
  useEffect(() => setPage(1), [tab, query, topic, name, year, location]);

  /* the Categories dropdown navigates between sector galleries, so every
     filter starts clean on the newly opened sector */
  // biome-ignore lint/correctness/useExhaustiveDependencies: Changing sectors intentionally resets all sector-specific filters.
  useEffect(() => {
    setPage(1);
    setTopic(null);
    setQuery("");
    setName("All");
    setYear("All");
    setLocation("All");
    setTab("all");
  }, [sector]);

  const availableItems = useMemo(
    () => items.filter((it) => !failedItemImages[it.id]),
    [items, failedItemImages],
  );

  /* derived lists */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    /* A live search looks at EVERY photo and video of this sector. The
       tab chips and dropdown filters only constrain the unsearched view
       so a match is never hidden by the filter the visitor had on. */
    if (q) return availableItems.filter((it) => mediaHaystack(it).includes(q));

    return availableItems.filter((it) => {
      if (tab !== "all" && it.media_type !== tab) return false;
      if (topic && !(it.topics ?? []).includes(topic)) return false;
      if (name !== "All" && it.organization_name !== name) return false;
      if (year !== "All" && String(it.event_year ?? "") !== year) return false;
      if (location !== "All" && it.location !== location) return false;
      return true;
    });
  }, [availableItems, tab, topic, query, name, year, location]);

  const counts = useMemo(
    () => ({
      all: availableItems.length,
      photo: availableItems.filter((it) => it.media_type === "photo").length,
      video: availableItems.filter((it) => it.media_type === "video").length,
    }),
    [availableItems],
  );

  /* dropdown options merged with values found in the data */
  const options = useMemo(() => {
    const fromItems = (values: (string | null)[]) => [
      "All",
      ...new Set(values.filter((value): value is string => Boolean(value))),
    ];
    return {
      names: fromItems(availableItems.map((it) => it.organization_name)),
      years: fromItems(availableItems.map((it) => (it.event_year ? String(it.event_year) : null))),
      locations: fromItems(availableItems.map((it) => it.location)),
    };
  }, [availableItems]);

  /* pager state (Previous / numbers / Next, centered under the grid) */
  const pageCount = Math.max(Math.ceil(filtered.length / PAGE_SIZE), 1);
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const pageStart = (page - 1) * PAGE_SIZE; // first card of the current page
  const pageItems = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  const goToPage = (n: number) => {
    const next = Math.min(Math.max(n, 1), pageCount);
    if (next === page) return;
    setPage(next);
    /* after paging, land the viewport exactly on the filter row
       (Categories / Names / Years / Locations) with the top of the grid
       right below it. The double rAF + timeout lets React commit the new
       page before the position is measured. */
    const land = () => {
      // Keep the Previous/Next pager buttons visible in the viewport after
      // paging, so the visitor can keep stepping through pages without
      // scrolling back down to find them.
      const pager = document.querySelector<HTMLElement>("[data-gallery-pager]");
      if (pager) {
        pager.scrollIntoView({ behavior: "smooth", block: "nearest" });
        return;
      }
      const bar = document.querySelector<HTMLElement>("[data-gallery-filter-bar]");
      if (!bar) return;
      const top = bar.getBoundingClientRect().top + window.scrollY - 6;
      window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    };
    requestAnimationFrame(() => {
      requestAnimationFrame(land);
    });
    window.setTimeout(land, 120);
  };

  /* lightbox keyboard shortcuts + scroll lock */
  const move = useCallback(
    (step: number) => {
      setLightbox((i) =>
        i === null ? null : (i + step + filtered.length) % Math.max(filtered.length, 1),
      );
    },
    [filtered.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, move]);

  const sectorTitle = info?.title ?? sector;

  if (error && !loading) {
    return (
      <p className="max-w-[620px] py-16 text-center text-[15px] leading-[1.5] text-gray-600">
        {error}
      </p>
    );
  }

  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-10 pt-2 text-[#111] md:px-14 md:pb-16 md:pt-5">
      {loading ? (
        /* skeleton while the query runs */
        <div className="grid grid-cols-2 gap-4 min-[768px]:grid-cols-3 min-[768px]:gap-7 min-[1025px]:grid-cols-4" aria-busy="true">
          {skeletonGrid()}
        </div>
      ) : (
        <>
          {/* breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 py-4 pb-2.5 text-[13px] text-gray-500 md:pt-[26px]" aria-label="Breadcrumb">
            <a className="text-gray-800 no-underline hover:underline" href="/">Home</a>
            <span className="text-gray-400">›</span>
            <span>{sectorTitle}</span>
            <span className="text-gray-400">›</span>
            <span className="text-gray-500">Gallery</span>
          </nav>

          {/* title + description */}
          <h1 className="my-[6px] mb-[10px] font-[Georgia,Times_New_Roman,serif] text-[30px] font-bold leading-[1.1] text-[#0a0a0a] md:text-[44px]">{sectorTitle}</h1>
          {info?.description ? <p className="max-w-[620px] text-[15px] leading-[1.5] text-gray-600">{info.description}</p> : null}

          {/* gallery heading */}
          <div className="mb-[18px] mt-[34px] flex items-baseline justify-between">
            <h2 className="font-[Georgia,Times_New_Roman,serif] text-[26px] font-bold text-[#0a0a0a]">
              Gallery
            </h2>
            <span className="text-[13px] text-[#4b5563]">{items.length} items</span>
          </div>

          {/* filter bar */}
          <FilterBar
            tab={tab}
            setTab={setTab}
            query={query}
            setQuery={setQuery}
            topic={topic}
            setTopic={setTopic}
            name={name}
            setName={setName}
            year={year}
            setYear={setYear}
            location={location}
            setLocation={setLocation}
            counts={counts}
            options={options}
            chips={info?.topic_options ?? []}
            items={availableItems}
            sectorLabel={info?.title ?? sector}
            sectorOptions={sectorOptions}
          />

          {/* grid of media cards (current page only) */}
          <div className="grid grid-cols-2 gap-4 min-[768px]:grid-cols-3 min-[768px]:gap-7 min-[1025px]:grid-cols-4">
            {filtered.length === 0 ? (
              <p
                className="col-span-full py-10 text-center text-[13px] text-[#4b5563]"
                role="status"
              >
                {query.trim()
                  ? `No photos or videos match “${query.trim()}” in this sector`
                  : "No photos or videos match your selected filters."}
              </p>
            ) : (
              pageItems.map((it, i) => (
                <motion.article
                  key={it.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.07,
                    ease: "easeOut",
                  }}
                >
                  <button
                    type="button"
                    className="group relative block aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-[14px] border-0 bg-gray-200 p-0 text-left"
                    onClick={() => setLightbox(pageStart + i)}
                    aria-label={`Open ${it.title}`}
                  >
                    <img
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      src={it.thumbnail_url ?? it.image_url ?? "/gallery/media-01.jpg"}
                      alt={it.alt_text ?? it.title}
                      loading="lazy"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (!img.dataset.fallback) {
                          img.dataset.fallback = "1";
                          if (it.image_url && it.image_url !== img.src) img.src = it.image_url;
                          else img.src = "/gallery/media-01.jpg";
                        } else img.classList.add("invisible");
                      }}
                    />
                    <span className="absolute left-[10px] top-[10px] z-[2] rounded-full bg-[rgba(17,17,17,0.82)] px-3 py-[5px] text-[11px] leading-[1.2] tracking-[0.02em] text-white">
                      {it.media_type === "video" ? "Video" : "Photo"}
                    </span>
                    {it.media_type === "video" ? (
                      <span className="absolute left-1/2 top-1/2 flex h-[46px] w-[46px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(255,255,255,0.92)] text-[#111] transition-[transform,background-color] duration-300 group-hover:scale-[1.08] group-hover:bg-white">
                        <Play size={18} className="ml-0.5" />
                      </span>
                    ) : null}
                  </button>
                  <h3 className="mt-[10px] text-[13.5px] leading-[1.35] text-gray-900">
                    {it.title}
                  </h3>
                </motion.article>
              ))
            )}
          </div>

          {/* pager (Previous / numbers / Next, centered under the grid) */}
          {filtered.length > 0 ? (
            <nav
              className="mt-7 flex flex-wrap items-center justify-center gap-[14px]"
              data-gallery-pager
              aria-label="Gallery pages"
            >
              <button
                type="button"
                className="flex min-w-28 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-[10px] border border-gray-200 bg-white px-[26px] py-3 text-[15px] font-medium leading-[1.2] text-gray-900 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow,background-color,opacity] duration-200 enabled:hover:border-[#e3c583] enabled:hover:bg-[#fffdf6] enabled:hover:shadow-[0_2px_8px_rgba(227,197,131,0.45)] enabled:active:translate-y-px disabled:cursor-default disabled:bg-gray-50 disabled:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e3c583]"
                disabled={page === 1}
                onClick={() => goToPage(page - 1)}
                aria-label="Previous page"
              >
                <ChevronLeft size={13} />
                <span>Previous</span>
              </button>

              {pages.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`min-w-[46px] cursor-pointer rounded-[10px] border border-gray-200 bg-white px-0 py-3 text-[15px] text-gray-800 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] duration-200 hover:border-[#e3c583] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e3c583]${n === page ? " min-w-9 cursor-default border-0 bg-transparent px-1 font-medium text-gray-700 shadow-none" : ""}`}
                  aria-current={n === page ? "page" : undefined}
                  aria-label={n === page ? `Page ${n}, current page` : `Go to page ${n}`}
                  onClick={() => goToPage(n)}
                >
                  {n}
                </button>
              ))}

              <button
                type="button"
                className="flex min-w-28 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-[10px] border border-gray-200 bg-white px-[26px] py-3 text-[15px] font-medium leading-[1.2] text-gray-900 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow,background-color,opacity] duration-200 enabled:hover:border-[#e3c583] enabled:hover:bg-[#fffdf6] enabled:hover:shadow-[0_2px_8px_rgba(227,197,131,0.45)] enabled:active:translate-y-px disabled:cursor-default disabled:bg-gray-50 disabled:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e3c583]"
                disabled={page === pageCount}
                onClick={() => goToPage(page + 1)}
                aria-label="Next page"
              >
                <span>Next</span>
                <ChevronRight size={13} />
              </button>
            </nav>
          ) : null}

          {/* back CTA — returns to the rotating six-sector hub */}
          <BackCta />
        </>
      )}

      {/* lightbox */}
      {lightbox !== null && filtered[lightbox] ? (
        <Lightbox
          item={filtered[lightbox]}
          index={lightbox}
          total={filtered.length}
          sectorLabel={sectorTitle}
          onClose={() => setLightbox(null)}
          onPrev={() => move(-1)}
          onNext={() => move(1)}
        />
      ) : null}
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* skeleton grid                                                       */
/* ------------------------------------------------------------------ */

function skeletonGrid() {
  return SKELETON_KEYS.map((key, i) => (
    <div key={key}>
      <div className="aspect-[4/3] animate-[g-pulse_1.4s_ease-in-out_infinite] rounded-[14px] bg-gray-200" style={{ animationDelay: `${i * 0.09}s` }} />
      <div className="mt-[10px] h-3 w-[55%] animate-[g-pulse_1.4s_ease-in-out_infinite] rounded-md bg-gray-200" style={{ animationDelay: `${i * 0.09}s` }} />
    </div>
  ));
}

/* ------------------------------------------------------------------ */
/* filter bar                                                          */
/* ------------------------------------------------------------------ */

type FilterValues = {
  tab: "all" | "photo" | "video";
  query: string;
  topic: string | null;
  name: string;
  year: string;
  location: string;
};

type FilterBarProps = {
  tab: FilterValues["tab"];
  setTab: (t: FilterValues["tab"]) => void;
  query: FilterValues["query"];
  setQuery: (q: FilterValues["query"]) => void;
  topic: FilterValues["topic"];
  setTopic: (t: FilterValues["topic"]) => void;
  name: FilterValues["name"];
  setName: (v: FilterValues["name"]) => void;
  year: FilterValues["year"];
  setYear: (v: FilterValues["year"]) => void;
  location: FilterValues["location"];
  setLocation: (v: FilterValues["location"]) => void;
  counts: { all: number; photo: number; video: number };
  options: { names: string[]; years: string[]; locations: string[] };
  chips: string[];
  /** Every photo and video of the sector — the suggestion dropdown
   *  searches across this whole collection, not just the filtered set. */
  items: SectorItem[];
  /** Display label of the sector this gallery belongs to (shown as the
   *  Categories dropdown value). */
  sectorLabel: string;
  sectorOptions: Array<Pick<SectorInfo, "slug" | "title">>;
};

const FilterBar: React.FC<FilterBarProps> = (p) => {
  const [draft, setDraft] = useState(p.query);
  const [suggestOn, setSuggestOn] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => setDraft(p.query), [p.query]);

  /* click-outside closes the suggestions panel */
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSuggestOn(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const submit = (q: string) => {
    const text = q.trim();
    p.setQuery(text);
    if (text) {
      /* searching looks through the sector's TOTAL media, so drop the
         active tab / dropdown filters that could hide a match */
      p.setTab("all");
      p.setTopic(null);
      p.setName("All");
      p.setYear("All");
      p.setLocation("All");
    }
    setSuggestOn(false);
  };

  const q = draft.trim().toLowerCase();
  /* suggestions always cover the whole sector: photos and videos alike */
  const suggestions = p.items
    .filter((it) => !q || mediaHaystack(it).includes(q))
    .slice(0, 8);

  const tabs: Array<{ key: FilterValues["tab"]; label: string }> = [
    { key: "all", label: `All ${p.counts.all}` },
    { key: "photo", label: `Photos ${p.counts.photo}` },
    { key: "video", label: `Videos ${p.counts.video}` },
  ];

  return (
    <div className="flex flex-col gap-4" data-gallery-filter-bar>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex flex-wrap gap-[10px]" role="tablist" aria-label="Media type">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={p.tab === t.key}
              className={`cursor-pointer whitespace-nowrap rounded-full border border-gray-200 bg-white px-[18px] py-[9px] text-[13px] text-gray-800 transition-[background-color,border-color,color,box-shadow] duration-200${p.tab === t.key ? " border-[#f0d9a6] bg-[#f0d9a6] font-semibold text-[#111] shadow-[0_1px_6px_rgba(227,197,131,0.55)]" : " hover:border-[#e3c583]"}`}
              onClick={() => p.setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="relative w-full min-[641px]:w-[300px] min-[641px]:max-w-full" ref={searchRef}>
          <input
            type="text"
            className="w-full rounded-[10px] border border-gray-200 bg-white py-[11px] pl-4 pr-16 text-[13px] text-[#111] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-gray-400 focus:border-[#e3c583] focus:shadow-[0_1px_6px_rgba(227,197,131,0.4)]"
            value={draft}
            placeholder="Search title or caption"
            aria-label="Search title or caption"
            onFocus={() => setSuggestOn(true)}
            onChange={(e) => {
              setDraft(e.target.value);
              setSuggestOn(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit(draft);
              if (e.key === "Escape") setSuggestOn(false);
            }}
          />
          {draft ? (
            <button
              type="button"
              className="absolute right-9 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent p-1.5 text-gray-500 hover:text-[#111]"
              aria-label="Clear search"
              onClick={() => {
                setDraft("");
                submit("");
              }}
            >
              <X size={15} />
            </button>
          ) : null}
          <button
            type="button"
            className="absolute right-1 top-1/2 flex h-[30px] w-[30px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border-0 bg-[#f0d9a6] text-[#111] hover:bg-[#e3c583]"
            aria-label="Search"
            onClick={() => submit(draft)}
          >
            <Search size={15} />
          </button>

          {suggestOn ? (
            <div className="absolute left-0 top-[calc(100%+6px)] z-[30] w-full min-w-[280px] rounded-xl border border-gray-200 bg-white p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.12)]" role="listbox" aria-label="Search suggestions">
              {suggestions.length > 0 ? (
                <>
                  <div className="px-[10px] py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.04em] text-gray-400">
                    {q ? "Media titles in this sector" : "All photos & videos in this sector"}
                  </div>
                  {suggestions.map((it, i) => (
                    <div
                      key={it.id}
                      role="option"
                      aria-selected={i === 0}
                      tabIndex={0}
                      className={`flex cursor-pointer items-center justify-between gap-[10px] rounded-lg px-[10px] py-2 hover:bg-gray-100${i === 0 ? " bg-gray-100" : ""}`}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => submit(it.title)}
                      onKeyDown={(e) => e.key === "Enter" && submit(it.title)}
                    >
                      <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-[#111]">{it.title}</span>
                      <span className="shrink-0 text-xs text-gray-500">
                        {it.media_type === "photo" ? "Photo" : "Video"}
                      </span>
                    </div>
                  ))}
                </>
              ) : (
                <div className="px-[10px] py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.04em] text-gray-400">
                  No photos or videos match “{draft.trim()}” in this sector
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* topic chips */}
      {p.chips.length > 0 ? (
        <div className="flex flex-wrap gap-[10px]">
          {p.chips.map((c) => (
            <button
              key={c}
              type="button"
              className={`cursor-pointer rounded-full border border-gray-200 bg-white px-[15px] py-[7px] text-[13px] text-gray-700 transition-[background-color,border-color,color] duration-200${p.topic === c ? " border-[#f0d9a6] bg-[#f0d9a6] font-semibold text-[#111]" : " hover:border-[#e3c583] hover:bg-[#fffdf6]"}`}
              aria-pressed={p.topic === c}
              onClick={() => p.setTopic(p.topic === c ? null : c)}
            >
              {c}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mb-[19px] flex flex-wrap gap-x-5 gap-y-[14px]">
        <SectorNavDrop
          value={p.sectorLabel}
          options={p.sectorOptions}
          z={4}
        />
        <Drop label="Names" value={p.name} options={p.options.names} onChange={p.setName} z={3} />
        <Drop label="Years" value={p.year} options={p.options.years} onChange={p.setYear} z={2} />
        <Drop
          label="Locations"
          value={p.location}
          options={p.options.locations}
          onChange={p.setLocation}
          z={1}
        />
      </div>
    </div>
  );
};

/** Categories dropdown — shown on every sector gallery path. Lists all
 *  six sector galleries and navigates to a /gallery/<slug> path on
 *  selection. The value shows the sector whose gallery is currently open,
 *  ticked in the menu. */
const SectorNavDrop: React.FC<{
  value: string;
  options: Array<Pick<SectorInfo, "slug" | "title">>;
  z: number;
}> = ({ value, options, z }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="relative flex min-w-40 flex-[1_1_160px] flex-col gap-1.5" ref={ref} style={{ zIndex: open ? 20 : z }}>
      <span className="text-xs text-gray-500">Categories</span>
      <button
        type="button"
        className={`inline-flex cursor-pointer items-center justify-between gap-[10px] rounded-[10px] border bg-white px-[14px] py-[10px] text-left text-[13px] text-gray-500 transition-[border-color,background-color,box-shadow] duration-200${open ? " border-[#e3c583] shadow-[0_1px_6px_rgba(227,197,131,0.45)] hover:border-[#e3c583]" : " border-gray-200 hover:border-gray-300"}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="font-semibold text-[#111]">{value}</span>
        {open ? <ChevronUp size={15} className="shrink-0 text-gray-500" /> : <ChevronDown size={15} className="shrink-0 text-gray-500" />}
      </button>

      {open ? (
        <div
          className="absolute left-0 top-[calc(100%+6px)] flex max-h-[260px] min-w-full flex-col gap-0.5 overflow-y-auto rounded-xl border border-gray-200 bg-white p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
          role="listbox"
          aria-label="Categories"
        >
          {options.map((o) => {
            const selected = o.title === value;
            return (
              <button
                key={o.slug}
                type="button"
                role="option"
                aria-selected={selected}
                className={`flex cursor-pointer items-center justify-between gap-[10px] whitespace-nowrap rounded-lg border-0 bg-transparent px-[10px] py-2 text-left text-[13px] text-gray-700${selected ? " bg-[#f0d9a6] font-semibold text-[#111] hover:bg-[#f0d9a6]" : " hover:bg-gray-100"}`}
                onClick={() => {
                  setOpen(false);
                  navigate(`/gallery/${o.slug}`);
                }}
              >
                <span>{o.title}</span>
                {selected ? <Check size={15} className="shrink-0 text-gray-500" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

const Drop: React.FC<{
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  z: number;
}> = ({ label, value, options, onChange, z }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const hasValue = value !== "All";

  return (
    <div className="relative flex min-w-40 flex-[1_1_160px] flex-col gap-1.5" ref={ref} style={{ zIndex: open ? 20 : z }}>
      <span className="text-xs text-gray-500">{label}</span>
      <button
        type="button"
        className={`inline-flex cursor-pointer items-center justify-between gap-[10px] rounded-[10px] border px-[14px] py-[10px] text-left text-[13px] transition-[border-color,background-color,box-shadow] duration-200${hasValue ? " border-[#e3c583] bg-[#fdf6e4] text-[#111] hover:border-[#e3c583]" : open ? " border-[#e3c583] bg-white text-gray-500 shadow-[0_1px_6px_rgba(227,197,131,0.45)] hover:border-[#e3c583]" : " border-gray-200 bg-white text-gray-500 hover:border-gray-300"}${open && hasValue ? " shadow-[0_1px_6px_rgba(227,197,131,0.45)]" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={hasValue ? "font-semibold text-[#111]" : ""}>{value}</span>
        {open ? <ChevronUp size={15} className="shrink-0 text-gray-500" /> : <ChevronDown size={15} className="shrink-0 text-gray-500" />}
      </button>

      {open ? (
        <div className="absolute left-0 top-[calc(100%+6px)] flex max-h-[260px] min-w-full flex-col gap-0.5 overflow-y-auto rounded-xl border border-gray-200 bg-white p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.12)]" role="listbox" aria-label={label}>
          {options.map((o) => {
            const selected = o === value;
            return (
              <button
                key={o}
                type="button"
                role="option"
                aria-selected={selected}
                className={`flex cursor-pointer items-center justify-between gap-[10px] whitespace-nowrap rounded-lg border-0 bg-transparent px-[10px] py-2 text-left text-[13px] text-gray-700${selected ? " bg-[#f0d9a6] font-semibold text-[#111] hover:bg-[#f0d9a6]" : " hover:bg-gray-100"}`}
                onClick={() => {
                  onChange(o);
                  setOpen(false);
                }}
              >
                <span>{o}</span>
                {selected ? <Check size={15} className="shrink-0 text-gray-500" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* back CTA                                                            */
/* ------------------------------------------------------------------ */

const BackCta: React.FC = () => (
  <div className="mt-14 flex flex-wrap items-center justify-between gap-5 pt-[10px] pb-1 md:mt-[88px]">
    <h2 className="font-[Georgia,Times_New_Roman,serif] text-[22px] font-bold text-[#0a0a0a] md:text-[30px]">Back to the sectors</h2>
    <Link to="/gallery" className="rounded-lg bg-[#f0d9a6] px-[18px] py-[11px] text-[13px] text-[#111] no-underline transition-colors duration-200 hover:bg-[#e3c583]">
      Back to sectors
    </Link>
  </div>
);

/* ------------------------------------------------------------------ */
/* lightbox                                                            */
/* ------------------------------------------------------------------ */

const Lightbox: React.FC<{
  item: SectorItem;
  index: number;
  total: number;
  sectorLabel: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}> = ({ item, index, total, sectorLabel, onClose, onPrev, onNext }) => {
  const [imgBroken, setImgBroken] = useState(false);
  useEffect(() => {
    setImgBroken(false);
  }, [item.id]);

  const isVideo =
    item.media_type === "video" &&
    item.video_provider === "hosted" &&
    !!item.video_url;

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col overflow-hidden bg-[#0a0a0b]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      {/* top bar */}
      <div className="flex items-center gap-3 px-4 pb-1 pt-[14px] text-white md:px-[22px] md:pb-1.5 md:pt-[18px]">
        <span className="shrink-0 rounded-full bg-[rgba(255,255,255,0.14)] px-3 py-[5px] text-[11px] tracking-[0.02em] text-gray-100">{isVideo ? "Video" : "Photo"}</span>
        <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-medium">{item.title}</span>
        <span className="ml-auto hidden text-[13px] text-gray-200 sm:inline">
          {index + 1} / {total}
        </span>
        <button type="button" className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.06)] text-white transition-colors duration-200 hover:bg-[rgba(255,255,255,0.16)]" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
      </div>

      {/* media */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        {isVideo ? (
          <VideoPlayer
            src={item.video_url}
            poster={item.thumbnail_url ?? undefined}
            duration={item.duration_seconds}
            subtitles={item.subtitles_url}
          />
        ) : item.media_type === "video" ? (
          <div className="relative flex h-full w-full items-center justify-center">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(17,17,17,0.85)] px-4 py-2 text-[13px] text-gray-200">
              Video unavailable
            </div>
          </div>
        ) : (
          <div className="relative flex h-full w-full items-center justify-center">
            <img
              className="block h-full w-full object-contain"
              src={item.image_url ?? item.thumbnail_url ?? "/gallery/media-01.jpg"}
              alt={item.alt_text ?? item.title}
              onError={(e) => {
                const img = e.currentTarget;
                if (!img.dataset.fallback) {
                  img.dataset.fallback = "1";
                  img.src = item.thumbnail_url ?? "/gallery/media-01.jpg";
                } else img.classList.add("invisible");
              }}
            />
          </div>
        )}

        {/* prev / next */}
        <button type="button" className="absolute bottom-[14px] left-4 z-10 flex h-[42px] w-[42px] -translate-y-0 cursor-pointer items-center justify-center rounded-full border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] text-gray-100 transition-colors duration-200 hover:bg-[rgba(255,255,255,0.2)] md:bottom-auto md:left-[46px] md:top-1/2 md:-translate-y-1/2" onClick={onPrev} aria-label="Previous">
          <ChevronDown size={20} style={{ transform: "rotate(90deg)" }} />
        </button>
        <button type="button" className="absolute bottom-[14px] right-4 z-10 flex h-[42px] w-[42px] -translate-y-0 cursor-pointer items-center justify-center rounded-full border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] text-gray-100 transition-colors duration-200 hover:bg-[rgba(255,255,255,0.2)] md:bottom-auto md:right-[46px] md:top-1/2 md:-translate-y-1/2" onClick={onNext} aria-label="Next">
          <ChevronDown size={20} style={{ transform: "rotate(-90deg)" }} />
        </button>

        {/* mobile counter */}
        <span className="absolute bottom-[26px] left-1/2 -translate-x-1/2 text-[13px] text-gray-200 md:hidden">
          {index + 1} / {total}
        </span>
      </div>

      {/* meta */}
      <div className="px-[22px] pb-[76px] pt-3 text-white md:pb-[26px]">
        <p className="text-base leading-[1.3]">{item.title}</p>
        <p className="mt-1 text-[13px] text-gray-400">
          {sectorLabel} · {isVideo ? "Video" : "Photo"}
          <span className="sm:hidden"> · {index + 1} of {total}</span>
        </p>
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* custom hosted video player (play / progress / time / fullscreen)     */
/* ------------------------------------------------------------------ */

const VideoPlayer: React.FC<{
  src: string;
  poster?: string;
  duration: number | null;
  subtitles?: string | null;
}> = ({ src, poster, duration, subtitles }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const onTime = () => setCurrent(v.currentTime);
    const onEnd = () => setPlaying(false);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnd);
    v.addEventListener("error", () => setBroken(true));
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = ref.current;
    const track = e.currentTarget;
    if (!v?.duration) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    v.currentTime = ratio * v.duration;
    setCurrent(v.currentTime);
  };

  const full = () => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void wrap.requestFullscreen();
  };

  if (broken) {
    // graceful fallback: the thumbnail with a small note
    return (
      <div className="relative h-auto max-h-full w-full max-w-[1100px] aspect-video overflow-hidden rounded-[14px] bg-[#111]">
        {poster ? <img className="block h-full w-full object-contain" src={poster} alt="" /> : null}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(17,17,17,0.85)] px-4 py-2 text-[13px] text-gray-200">Video unavailable</div>
      </div>
    );
  }

  const total = ref.current?.duration || duration || 0;

  return (
    <div className="relative h-auto max-h-full w-full max-w-[1100px] aspect-video overflow-hidden rounded-[14px] bg-[#111]" ref={wrapRef}>
      {/* biome-ignore lint/a11y/useMediaCaption: The current gallery schema only supplies optional subtitle URLs, not caption tracks. */}
      <video
        className="block h-full w-full object-contain"
        ref={ref}
        src={src}
        poster={poster ?? undefined}
        preload="metadata"
        onEnded={() => setPlaying(false)}
      >
        {/* Subtitle tracks are supplied by content authors when available. */}
        {subtitles ? <track kind="subtitles" src={subtitles} /> : null}
      </video>

      <div className="absolute inset-x-0 bottom-0 flex items-center gap-[14px] bg-[linear-gradient(to_top,rgba(0,0,0,0.6),rgba(0,0,0,0))] px-4 py-[10px] text-white">
        <button type="button" className="flex cursor-pointer border-0 bg-transparent p-1 text-white" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <div
          className="relative h-1 flex-1 cursor-pointer rounded-full bg-[rgba(255,255,255,0.28)]"
          onClick={seek}
          onKeyDown={(event) => {
            const video = ref.current;
            if (!video?.duration) return;
            if (event.key === "ArrowLeft") video.currentTime = Math.max(0, video.currentTime - 5);
            else if (event.key === "ArrowRight") video.currentTime = Math.min(video.duration, video.currentTime + 5);
            else if (event.key === "Home") video.currentTime = 0;
            else if (event.key === "End") video.currentTime = video.duration;
            else return;
            setCurrent(video.currentTime);
          }}
          role="slider"
          tabIndex={0}
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={current}
          aria-valuetext={`${timeFormat(current)} of ${timeFormat(total)}`}
        >
          {total > 0 ? (
            <span className="absolute inset-y-0 left-0 rounded-full bg-[#f0d9a6]" style={{ width: `${(current / total) * 100}%` }} />
          ) : null}
        </div>
        <span className="whitespace-nowrap text-xs text-gray-100">
          {timeFormat(current)} / {total > 0 ? timeFormat(total) : "0:00"}
        </span>
        <button type="button" className="flex cursor-pointer border-0 bg-transparent p-1 text-white" onClick={full} aria-label="Fullscreen">
          <Maximize size={16} />
        </button>
      </div>
    </div>
  );
};

export default SectorGallery;
