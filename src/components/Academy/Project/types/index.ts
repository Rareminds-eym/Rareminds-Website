export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  status: string;
  year: string;
  location: string;
  technologies: string[];
  imageUrl: string;
  timeline: string;
  team: string[];
  goals: string[];
  university?: string;
  /** Legacy field referenced by utils/search.ts; not present in current data. */
  title?: string;
}

export type { PersonType, ClientType } from "./project";
export type { EventLocation } from "./event";
export type { Course } from "./course";
