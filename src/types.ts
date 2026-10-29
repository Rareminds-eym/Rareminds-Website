// Shared types for the Gallery module (sectors, media items, filters).

export type TypeTab = "all" | "photo" | "video";

export type GallerySector = {
  id: string;
  slug: string;
  title: string;
  group_name: "School" | "Corporate" | "Government" | "Universities";
  description: string | null;
  card_image_url: string | null;
  parent_path: string;
  gallery_path: string;
  /** Chips shown under the All / Photos / Videos tabs. */
  topic_options: string[];
  sort_order: number;
  is_active: boolean;
};

export type GalleryItem = {
  id: string;
  media_type: "photo" | "video";
  title: string;
  caption: string | null;
  category: string | null;
  organization_name: string | null;
  event_year: number | null;
  location: string | null;
  image_url: string | null;
  video_url: string | null;
  sort_order: number;
  status: "draft" | "pending_review" | "approved" | "published" | "unpublished" | "revoked";
};

/** A gallery item placed inside one sector (joined from gallery_item_sectors). */
export type SectorMedia = {
  item: GalleryItem;
  topics: string[];
  sort_order: number;
  is_featured?: boolean;
};

export type Filters = {
  type: TypeTab;
  query: string;
  topic: string | null;
  /** Dropdown values default to "All". */
  category: string;
  name: string;
  year: string;
  location: string;
};
