import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Maximize, Pause, Play, Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import {
  DEMO_SECTORS,
  FILTER_OPTIONS,
  demoSectorItems,
  type DemoMedia,
} from "@/data/galleryDemo";
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

/** Demo video source for the hosted-player fallback (public sample clip). */
const DEMO_VIDEO_URL =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

/** The Categories dropdown is a sector navigator: every sector gallery
 *  path shows all six sectors here, and picking an option navigates to
 *  that sector's /gallery/<slug> path (the barrel's rotation order). */
const SECTOR_NAV_OPTIONS: Array<{ label: string; path: string }> = [
  { label: "School Teacher", path: "/gallery/school-teachers" },
  { label: "Universities", path: "/gallery/universities" },
  { label: "Government", path: "/gallery/government" },
  { label: "Corporate Training", path: "/gallery/corporate-training" },
  { label: "Corporate Recruitment", path: "/gallery/corporate-recruitment" },
  { label: "School Students", path: "/gallery/school-students" },
];

/** Display label for the current sector's path (title-cases any slug
 *  that is not part of the navigator list, e.g. a db-only sector). */
const sectorNavLabel = (slug: string) =>
  SECTOR_NAV_OPTIONS.find((o) => o.path === `/gallery/${slug}`)?.label ??
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

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

/** Maps one design demo row into a SectorItem. */
function mapDemoItem(demo: DemoMedia, topics: string[], _sortOrder: number): SectorItem {
  return {
    id: demo.title,
    media_type: demo.media_type,
    title: demo.title,
    caption: null,
    alt_text: demo.title,
    image_url: `/gallery/${demo.slug}.jpg`,
    video_url: demo.media_type === "video" ? DEMO_VIDEO_URL : null,
    thumbnail_url: `/gallery/${demo.slug}.jpg`,
    video_provider: demo.media_type === "video" ? "hosted" : null,
    subtitles_url: null,
    duration_seconds: demo.media_type === "video" ? 135 : null,
    event_year: demo.event_year,
    category: demo.category,
    organization_name: demo.organization_name,
    location: demo.location,
    topics,
  };
}

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */

const SectorGallery: React.FC<Props> = ({ sector }) => {
  const [info, setInfo] = useState<SectorInfo | null>(null);
  const [items, setItems] = useState<SectorItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        // 1. The sector row (RLS public policy returns active ones)
        const { data: sectorRow, error: sectorError } = await supabase
          .from("gallery_sectors")
          .select(
            "id, slug, title, group_name, description, parent_path, gallery_path, topic_options",
          )
          .eq("slug", sector)
          .maybeSingle();

        if (sectorError || !sectorRow) throw new Error(sectorError?.message ?? "Gallery not found.");

        // 2. Placement rows join the published items.
        //    Never use select('*') on gallery_item_sectors: two columns are private.
        const { data, error: itemsError } = await supabase
          .from("gallery_item_sectors")
          .select(`topics, sort_order, gallery_items(${ITEM_COLUMNS})`)
          .eq("sector_id", (sectorRow as SectorInfo).id)
          .order("sort_order", { ascending: true });

        if (itemsError) throw new Error(itemsError.message);

        const rows = (data ?? []) as unknown as Array<{
          topics: string[];
          sort_order: number;
          gallery_items: Record<string, unknown> | null;
        }>;

        setInfo(sectorRow as SectorInfo);
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
            .filter((it) => it.title),
        );
      } catch (e) {
        // Database unavailable / nothing yet — fall back to the design demo data
        const demoSector = DEMO_SECTORS.find((s) => s.slug === sector);
        if (!demoSector) {
          setError(e instanceof Error ? e.message : "Gallery not found.");
        } else {
          setInfo({
            id: demoSector.slug,
            slug: demoSector.slug,
            title: demoSector.title,
            group_name: demoSector.title,
            description: demoSector.description,
            parent_path: demoSector.parent_path,
            gallery_path: demoSector.gallery_path,
            topic_options: demoSector.topic_options,
          });
          setItems(
            demoSectorItems(sector).map((row) => mapDemoItem(row.item, row.topics, row.sort_order)),
          );
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
  useEffect(() => setPage(1), [tab, query, topic, name, year, location]);

  /* the Categories dropdown navigates between sector galleries, so every
     filter starts clean on the newly opened sector */
  useEffect(() => {
    setPage(1);
    setTopic(null);
    setQuery("");
    setName("All");
    setYear("All");
    setLocation("All");
    setTab("all");
  }, [sector]);

  /* derived lists */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    /* A live search looks at EVERY photo and video of this sector. The
       tab chips and dropdown filters only constrain the unsearched view
       so a match is never hidden by the filter the visitor had on. */
    if (q) return items.filter((it) => mediaHaystack(it).includes(q));

    return items.filter((it) => {
      if (tab !== "all" && it.media_type !== tab) return false;
      if (topic && !(it.topics ?? []).includes(topic)) return false;
      if (name !== "All" && it.organization_name !== name) return false;
      if (year !== "All" && String(it.event_year ?? "") !== year) return false;
      if (location !== "All" && it.location !== location) return false;
      return true;
    });
  }, [items, tab, topic, query, name, year, location]);

  const counts = useMemo(
    () => ({
      all: items.length,
      photo: items.filter((it) => it.media_type === "photo").length,
      video: items.filter((it) => it.media_type === "video").length,
    }),
    [items],
  );

  /* dropdown options merged with values found in the data */
  const options = useMemo(() => {
    const merge = (base: string[], extra: (string | null)[]) => {
      const set = new Set(base);
      extra.forEach((v) => v && set.add(v));
      return ["All", ...[...set]];
    };
    return {
      names: merge(FILTER_OPTIONS.names, items.map((it) => it.organization_name)),
      years: merge(FILTER_OPTIONS.years, items.map((it) => (it.event_year ? String(it.event_year) : null))),
      locations: merge(FILTER_OPTIONS.locations, items.map((it) => it.location)),
    };
  }, [items]);

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
      const pager = document.querySelector(".g-pager");
      if (pager) {
        pager.scrollIntoView({ behavior: "smooth", block: "nearest" });
        return;
      }
      const bar = document.querySelector(".filter-bar");
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
    return <p className="g-sub py-16 text-center">{error}</p>;
  }

  return (
    <section className="g-sector">
      {loading ? (
        /* skeleton while the query runs */
        <div className="g-grid" aria-busy="true">
          {skeletonGrid()}
        </div>
      ) : (
        <>
          {/* breadcrumb */}
          <nav className="g-crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="sep">›</span>
            <span>{sectorTitle}</span>
            <span className="sep">›</span>
            <span className="text-gray-500">Gallery</span>
          </nav>

          {/* title + description */}
          <h1 className="g-title">{sectorTitle}</h1>
          {info?.description ? <p className="g-sub">{info.description}</p> : null}

          {/* gallery heading */}
          <div className="g-head">
            <h2>Gallery</h2>
            <span className="count">{items.length} items</span>
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
            items={items}
            sectorLabel={sectorNavLabel(sector)}
          />

          {/* grid of media cards (current page only) */}
          <div className="g-grid">
            {filtered.length === 0 ? (
              <p className="col-span-full py-10 text-center text-[13px] text-[#4b5563]">
                {query.trim()
                  ? `No photos or videos match “${query.trim()}” in this sector`
                  : "No images or videos"}
              </p>
            ) : (
              pageItems.map((it, i) => (
                <motion.article
                  key={`${it.id}-${i}`}
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
                    className="g-card"
                    onClick={() => setLightbox(pageStart + i)}
                    aria-label={`Open ${it.title}`}
                  >
                    <img
                      src={it.thumbnail_url ?? it.image_url ?? "/gallery/media-01.jpg"}
                      alt={it.alt_text ?? it.title}
                      loading="lazy"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (!img.dataset.fallback) {
                          img.dataset.fallback = "1";
                          if (it.image_url && it.image_url !== img.src) img.src = it.image_url;
                          else img.src = "/gallery/media-01.jpg";
                        } else img.style.visibility = "hidden";
                      }}
                    />
                    <span className="g-card-badge">
                      {it.media_type === "video" ? "Video" : "Photo"}
                    </span>
                    {it.media_type === "video" ? (
                      <span className="g-card-play">
                        <Play size={18} className="ml-0.5" />
                      </span>
                    ) : null}
                  </button>
                  <h3 className="g-card-title">{it.title}</h3>
                </motion.article>
              ))
            )}
          </div>

          {/* pager (Previous / numbers / Next, centered under the grid) */}
          {filtered.length > 0 ? (
            <nav className="g-pager" aria-label="Gallery pages">
              <button
                type="button"
                className="g-pager__btn"
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
                  className={`g-pager__num${n === page ? " is-active" : ""}`}
                  aria-current={n === page ? "page" : undefined}
                  aria-label={n === page ? `Page ${n}, current page` : `Go to page ${n}`}
                  onClick={() => goToPage(n)}
                >
                  {n}
                </button>
              ))}

              <button
                type="button"
                className="g-pager__btn"
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
  return Array.from({ length: PAGE_SIZE }, (_, i) => (
    <div key={i}>
      <div className="g-skeleton" style={{ animationDelay: `${i * 0.09}s` }} />
      <div className="g-skeleton-title" style={{ animationDelay: `${i * 0.09}s` }} />
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
    <div className="filter-bar">
      <div className="filter-bar__controls">
        <div className="chips" role="tablist" aria-label="Media type">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={p.tab === t.key}
              className={`chip${p.tab === t.key ? " is-active" : ""}`}
              onClick={() => p.setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="search" ref={searchRef}>
          <input
            type="text"
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
              className="search__clear"
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
            className="search__go"
            aria-label="Search"
            onClick={() => submit(draft)}
          >
            <Search size={15} />
          </button>

          {suggestOn ? (
            <div className="suggest" role="listbox" aria-label="Search suggestions">
              {suggestions.length > 0 ? (
                <>
                  <div className="suggest__head">
                    {q ? "Media titles in this sector" : "All photos & videos in this sector"}
                  </div>
                  {suggestions.map((it, i) => (
                    <div
                      key={it.id}
                      role="option"
                      aria-selected={i === 0}
                      tabIndex={0}
                      className={`suggest__opt${i === 0 ? " is-first" : ""}`}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => submit(it.title)}
                      onKeyDown={(e) => e.key === "Enter" && submit(it.title)}
                    >
                      <span className="suggest__title">{it.title}</span>
                      <span className="suggest__type">
                        {it.media_type === "photo" ? "Photo" : "Video"}
                      </span>
                    </div>
                  ))}
                </>
              ) : (
                <div className="suggest__head">
                  No photos or videos match “{draft.trim()}” in this sector
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* topic chips */}
      {p.chips.length > 0 ? (
        <div className="topic-chips">
          {p.chips.map((c) => (
            <button
              key={c}
              type="button"
              className={`topic-chip${p.topic === c ? " is-active" : ""}`}
              aria-pressed={p.topic === c}
              onClick={() => p.setTopic(p.topic === c ? null : c)}
            >
              {c}
            </button>
          ))}
        </div>
      ) : null}

      <div className="dd-row">
        <SectorNavDrop value={p.sectorLabel} z={4} />
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
  z: number;
}> = ({ value, z }) => {
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
    <div className="dd" ref={ref} style={{ zIndex: open ? 20 : z }}>
      <span className="dd__label">Categories</span>
      <button
        type="button"
        className={`dd__btn${open ? " is-open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="dd__value is-strong">{value}</span>
        {open ? <ChevronUp size={15} className="dd__icon" /> : <ChevronDown size={15} className="dd__icon" />}
      </button>

      {open ? (
        <div className="dd__menu" role="listbox" aria-label="Categories">
          {SECTOR_NAV_OPTIONS.map((o) => {
            const selected = o.label === value;
            return (
              <button
                key={o.path}
                type="button"
                role="option"
                aria-selected={selected}
                className={`dd__opt${selected ? " is-selected" : ""}`}
                onClick={() => {
                  setOpen(false);
                  navigate(o.path);
                }}
              >
                <span>{o.label}</span>
                {selected ? <Check size={15} className="dd__icon" /> : null}
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
    <div className={`dd${hasValue ? " has-value" : ""}`} ref={ref} style={{ zIndex: open ? 20 : z }}>
      <span className="dd__label">{label}</span>
      <button
        type="button"
        className={`dd__btn${open ? " is-open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={`dd__value${hasValue ? " is-strong" : ""}`}>{value}</span>
        {open ? <ChevronUp size={15} className="dd__icon" /> : <ChevronDown size={15} className="dd__icon" />}
      </button>

      {open ? (
        <div className="dd__menu" role="listbox" aria-label={label}>
          {options.map((o) => {
            const selected = o === value;
            return (
              <button
                key={o}
                type="button"
                role="option"
                aria-selected={selected}
                className={`dd__opt${selected ? " is-selected" : ""}`}
                onClick={() => {
                  onChange(o);
                  setOpen(false);
                }}
              >
                <span>{o}</span>
                {selected ? <Check size={15} className="dd__icon" /> : null}
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
  <div className="g-back">
    <h2>Back to the sectors</h2>
    <Link to="/gallery" className="g-back__btn">
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
  const isVideo = item.media_type === "video" && item.video_provider === "hosted";

  return (
    <motion.div
      className="g-lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      {/* top bar */}
      <div className="g-lb-bar">
        <span className="g-lb-badge">{isVideo ? "Video" : "Photo"}</span>
        <span className="g-lb-name">{item.title}</span>
        <span className="g-lb-counter hidden sm:inline">
          {index + 1} / {total}
        </span>
        <button type="button" className="g-lb-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
      </div>

      {/* media */}
      <div className="g-lb-media-wrap">
        {isVideo ? (
          <VideoPlayer
            src={item.video_url ?? DEMO_VIDEO_URL}
            poster={item.thumbnail_url ?? undefined}
            duration={item.duration_seconds}
            subtitles={item.subtitles_url}
          />
        ) : (
          <div className="g-lb-media">
            <img
              src={item.image_url ?? item.thumbnail_url ?? "/gallery/media-01.jpg"}
              alt={item.alt_text ?? item.title}
              onError={(e) => {
                const img = e.currentTarget;
                if (!img.dataset.fallback) {
                  img.dataset.fallback = "1";
                  img.src = item.thumbnail_url ?? "/gallery/media-01.jpg";
                } else img.style.visibility = "hidden";
              }}
            />
          </div>
        )}

        {/* prev / next */}
        <button type="button" className="g-lb-arrow g-lb-arrow--left" onClick={onPrev} aria-label="Previous">
          <ChevronDown size={20} style={{ transform: "rotate(90deg)" }} />
        </button>
        <button type="button" className="g-lb-arrow g-lb-arrow--right" onClick={onNext} aria-label="Next">
          <ChevronDown size={20} style={{ transform: "rotate(-90deg)" }} />
        </button>

        {/* mobile counter */}
        <span className="g-lb-mobile-count">
          {index + 1} / {total}
        </span>
      </div>

      {/* meta */}
      <div className="g-lb-meta">
        <p className="name">{item.title}</p>
        <p className="info">
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
    if (!v || !v.duration) return;
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
      <div className="g-lb-media">
        {poster ? <img src={poster} alt="" /> : null}
        <div className="g-lb-note">Video unavailable</div>
      </div>
    );
  }

  const total = ref.current?.duration || duration || 0;

  return (
    <div className="g-lb-media" ref={wrapRef}>
      <video
        ref={ref}
        src={src}
        poster={poster ?? undefined}
        preload="metadata"
        onEnded={() => setPlaying(false)}
      >
        {subtitles ? <track kind="subtitles" src={subtitles} /> : null}
      </video>

      <div className="g-lb-controls">
        <button type="button" className="g-lc-btn" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <div className="g-lc-track" onClick={seek} role="slider" aria-label="Seek">
          {total > 0 ? (
            <span className="g-lc-fill" style={{ width: `${(current / total) * 100}%` }} />
          ) : null}
        </div>
        <span className="g-lc-time">
          {timeFormat(current)} / {total > 0 ? timeFormat(total) : "0:00"}
        </span>
        <button type="button" className="g-lc-btn" onClick={full} aria-label="Fullscreen">
          <Maximize size={16} />
        </button>
      </div>
    </div>
  );
};

export default SectorGallery;
