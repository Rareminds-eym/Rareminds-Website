/**
 * Gallery demo dataset — mirrors the gallery.pdf design frame-for-frame.
 *
 * The design ships 12 media items ("Media title 01" … "Media title 12":
 * 8 photos + 4 videos) shown as "12 items", plus 6 sector cards that
 * rotate on the /gallery hub. Dropdown attribute lists (Categories /
 * Names / Years / Locations) and the per-sector topic chips come straight
 * from the design frames.
 *
 * Every item/sector also carries the same slug the Supabase seeds use, so
 * the components can fall back to this data when the database is empty or
 * unreachable, and the placeholder CDN paths in the seeds resolve to the
 * local `public/gallery` assets extracted from the design.
 */

export type DemoCategory =
  | "College"
  | "Government Body"
  | "Naan Mudhalvan"
  | "Organization"
  | "School"
  | "University";

export type DemoLocation = "Karnataka" | "Pan India" | "Tamil Nadu" | "Tripura";

export type DemoMedia = {
  /** e.g. "media-01" — thumbnail asset /gallery/media-01.jpg */
  slug: string;
  media_type: "photo" | "video";
  title: string;
  /** topic tags — every value must exist in a sector's topic_options */
  topics: string[];
  category: DemoCategory;
  organization_name: string;
  event_year: number | null;
  location: DemoLocation;
};

const t = (...topics: string[]) => topics;

export const DEMO_ITEMS: DemoMedia[] = [
  {
    slug: "media-01",
    media_type: "photo",
    title: "Media title 01",
    topics: t("Campus programs", "Learning", "Teacher workshops", "Initiatives", "Learning workshops"),
    category: "College",
    organization_name: "Acharya",
    event_year: 2025,
    location: "Karnataka",
  },
  {
    slug: "media-02",
    media_type: "photo",
    title: "Media title 02",
    topics: t("Learning", "Educator development", "Outreach", "Leadership"),
    category: "School",
    organization_name: "Global International School",
    event_year: 2024,
    location: "Karnataka",
  },
  {
    slug: "media-07",
    media_type: "video",
    title: "Media title 03",
    topics: t("Hackathons", "Activities", "Classroom innovation", "Program collaboration", "Workplace upskilling"),
    category: "University",
    organization_name: "Visvesvaraya Technological University",
    event_year: 2023,
    location: "Karnataka",
  },
  {
    slug: "media-04",
    media_type: "photo",
    title: "Media title 04",
    topics: t("Campus programs", "Projects", "Teacher workshops", "Initiatives", "Learning workshops"),
    category: "Government Body",
    organization_name: "Tripura",
    event_year: 2019,
    location: "Tripura",
  },
  {
    slug: "media-05",
    media_type: "photo",
    title: "Media title 05",
    topics: t("Hackathons", "Showcases", "Educator development", "Outreach", "Leadership"),
    category: "Organization",
    organization_name: "Naan Mudhalvan 2025 Upskilling Program (Powered by Rareminds)",
    event_year: 2023,
    location: "Pan India",
  },
  {
    slug: "media-11",
    media_type: "video",
    title: "Media title 06",
    topics: t("Learning", "Activities", "Teacher workshops", "Program collaboration", "Workplace upskilling"),
    category: "University",
    organization_name: "VELS",
    event_year: 2024,
    location: "Tamil Nadu",
  },
  {
    slug: "media-01",
    media_type: "photo",
    title: "Media title 07",
    topics: t("Campus programs", "Projects", "Initiatives", "Learning workshops"),
    category: "School",
    organization_name: "TNSDC Schools",
    event_year: 2025,
    location: "Tamil Nadu",
  },
  {
    slug: "media-02",
    media_type: "photo",
    title: "Media title 08",
    topics: t("Hackathons", "Showcases", "Outreach"),
    category: "Government Body",
    organization_name: "TNSDC ITI (Spoken English)",
    event_year: 2019,
    location: "Tripura",
  },
  {
    slug: "media-04",
    media_type: "video",
    title: "Media title 09",
    topics: t("Learning", "Classroom innovation", "Program collaboration"),
    category: "College",
    organization_name: "PES",
    event_year: 2019,
    location: "Pan India",
  },
  {
    slug: "media-05",
    media_type: "photo",
    title: "Media title 10",
    topics: t("Campus programs", "Activities", "Teacher workshops", "Initiatives", "Workplace upskilling"),
    category: "Organization",
    organization_name: "Naan Mudhalvan 4th sem 2025 Upskilling Program (Powered by Rareminds)",
    event_year: 2025,
    location: "Karnataka",
  },
  {
    slug: "media-11",
    media_type: "photo",
    title: "Media title 11",
    topics: t("Learning", "Showcases", "Educator development", "Outreach", "Leadership"),
    category: "School",
    organization_name: "KSDC",
    event_year: 2024,
    location: "Karnataka",
  },
  {
    slug: "media-05",
    media_type: "video",
    title: "Media title 12",
    topics: t("Hackathons", "Activities", "Classroom innovation", "Learning workshops"),
    category: "College",
    organization_name: "AICTE",
    event_year: 2023,
    location: "Pan India",
  },
];

export type DemoSector = {
  /** e.g. "school-teachers" */
  slug: string;
  title: string;
  group_name: "School" | "Corporate" | "Government" | "Universities";
  description: string | null;
  /** local asset, e.g. /gallery/sector-school-teachers.jpg */
  card_image_url: string;
  parent_path: string;
  gallery_path: string;
  topic_options: string[];
  /** hub rotation order from the design frames */
  sort_order: number;
};

export const DEMO_SECTORS: DemoSector[] = [
  {
    slug: "school-teachers",
    title: "School – Teachers",
    group_name: "School",
    description: "Approved photos and videos for teachers and educators.",
    card_image_url: "/gallery/sector-school-teachers.jpg",
    parent_path: "/school/teacher",
    gallery_path: "/school/teacher/gallery",
    topic_options: ["Teacher workshops", "Educator development", "Classroom innovation"],
    sort_order: 0,
  },
  {
    slug: "universities",
    title: "Universities",
    group_name: "Universities",
    description: "Approved photos and videos of university and campus activities.",
    card_image_url: "/gallery/sector-universities.jpg",
    parent_path: "/universities",
    gallery_path: "/universities/gallery",
    topic_options: ["Campus programs", "Hackathons", "Career-readiness activities"],
    sort_order: 1,
  },
  {
    slug: "government",
    title: "Government",
    group_name: "Government",
    description: "Approved photos and videos of government-sector initiatives and outreach.",
    card_image_url: "/gallery/sector-government.jpg",
    parent_path: "/government",
    gallery_path: "/government/gallery",
    topic_options: ["Initiatives", "Outreach", "Program collaboration"],
    sort_order: 2,
  },
  {
    slug: "corporate-training",
    title: "Corporate – Training",
    group_name: "Corporate",
    description: "Approved photos and videos related to training and learning.",
    card_image_url: "/gallery/sector-corporate-training.jpg",
    parent_path: "/corporate/training",
    gallery_path: "/corporate/training/gallery",
    topic_options: ["Learning workshops", "Leadership", "Workplace upskilling"],
    sort_order: 3,
  },
  {
    slug: "corporate-recruitment",
    title: "Corporate – Recruitment",
    group_name: "Corporate",
    description: "Approved photos and videos related to recruitment.",
    card_image_url: "/gallery/sector-corporate-recruitment.jpg",
    parent_path: "/corporate/recruitment",
    gallery_path: "/corporate/recruitment/gallery",
    topic_options: [],
    sort_order: 4,
  },
  {
    slug: "school-students",
    title: "School – Students",
    group_name: "School",
    description: "Approved photos and videos of student learning, activities and projects.",
    card_image_url: "/gallery/sector-school-students.jpg",
    parent_path: "/school/student",
    gallery_path: "/school/student/gallery",
    topic_options: ["Learning", "Activities", "Projects", "Showcases"],
    sort_order: 5,
  },
];

/** Static dropdown option lists for the sector page filter dropdowns. */
export const FILTER_OPTIONS: {
  categories: string[];
  names: string[];
  years: string[];
  locations: string[];
} = {
  categories: [
    "College",
    "Government Body",
    "Naan Mudhalvan",
    "Organization",
    "School",
    "University",
  ],
  names: [
    "Acharya",
    "AICTE",
    "BLDEA",
    "DSATM",
    "Global International School",
    "KSDC",
    "Naan Mudhalvan 2023 Upskilling Program (Powered by Rareminds)",
    "Naan Mudhalvan 2024 Upskilling Program (Powered by Rareminds)",
    "Naan Mudhalvan 2025 Upskilling Program (Powered by Rareminds)",
    "Naan Mudhalvan 4th sem 2025 Upskilling Program (Powered by Rareminds)",
    "Naan Mudhalvan 6th sem 2025 Upskilling Program (Powered by Rareminds)",
    "PES",
    "TNSDC ITI (Spoken English)",
    "TNSDC Schools",
    "Tripura",
    "VELS",
    "Visvesvaraya Technological University",
  ],
  years: ["2019", "2023", "2024", "2025"],
  locations: ["Karnataka", "Pan India", "Tamil Nadu", "Tripura"],
};

/**
 * Builds a like-for-like fallback for the Supabase sector page query:
 * one row per item placed in that sector, sorted like the design grid,
 * with its topic tag cycling through the sector's chips.
 */
export function demoSectorItems(sectorSlug: string): Array<{
  sort_order: number;
  topics: string[];
  item: DemoMedia;
}> {
  const sector = DEMO_SECTORS.find((s) => s.slug === sectorSlug);
  if (!sector) return [];
  const chips = sector.topic_options;
  return DEMO_ITEMS.map((item, i) => ({
    sort_order: i,
    topics: chips.length ? [chips[i % chips.length]] : [],
    item,
  }));
}
