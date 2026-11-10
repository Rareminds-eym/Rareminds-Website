// Static starting options for the gallery filter bar.
// The sector page merges these with values found in the actual media data,
// so the dropdowns stay populated before any media is loaded.
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
