import type { Project } from '../types';

export const searchProjects = (projects: Project[], query: string): Project[] => {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) return projects;

  return projects.filter(project => {
    const searchableFields = [
      project.name,
      project.description,
      project.category,
      project.year,
      project.location,
      ...project.technologies,
      ...project.team,
      ...project.goals
    ].map(field => field.toLowerCase());

    return searchableFields.some(field => field.includes(searchTerm));
  });
};