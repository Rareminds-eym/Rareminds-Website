import { useState, useMemo } from "react";
import type { Project } from "../types/index";
import { searchProjects } from "../../../../components/Academy/Project/utils/search";

interface Filters {
  category: string;
  status: string;
  year: string;
  location: string;
}

export const useProjectSearch = (projects: Project[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    category: "All",
    status: "All",
    year: "All",
    location: "All",
  });

  const filteredProjects = useMemo(() => {
    const result = searchProjects(projects, searchQuery);

    return result.filter((project) => {
      return (
        (filters.category === "All" || project.category === filters.category) &&
        (filters.status === "All" || project.status === filters.status) &&
        (filters.year === "All" || project.year === filters.year) &&
        (filters.location === "All" || project.location === filters.location)
      );
    });
  }, [projects, searchQuery, filters]);

  const handleFilterChange = (type: string, value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  return {
    searchQuery,
    setSearchQuery,
    filters,
    handleFilterChange,
    filteredProjects,
  };
};
