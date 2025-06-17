import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input-blog";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { useLocation } from "react-router-dom";

interface SearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onCategoryFilter: (category: string) => void;
  onSubcategoryFilter: (subcategory: string) => void;
  selectedCategory: string;
  selectedSubcategory: string;
}

const SearchAndFilter = ({
  searchQuery,
  setSearchQuery,
  onCategoryFilter,
  onSubcategoryFilter,
  selectedCategory,
  selectedSubcategory,
}: SearchAndFilterProps) => {
  const [userInteracted, setUserInteracted] = useState(false);
  const location = useLocation();

  // Determine if we're in a path that requires a specific subcategory
  const isFixedSubcategoryPath =
    location.pathname.includes("/school/student/blogs") ||
    location.pathname.includes("/school/teacher/blogs");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const subcategory = params.get("subcategory");
    if (subcategory) {
      onSubcategoryFilter(subcategory);
    }
  }, [location.search, onSubcategoryFilter]);

  const clearFilters = () => {
    setSearchQuery("");
    setUserInteracted(false);
    onCategoryFilter("all");

    // Only reset subcategory if we're not on a path that enforces subcategory
    if (!isFixedSubcategoryPath) {
      onSubcategoryFilter("all");
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-4xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search insights and articles..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setUserInteracted(true);
            }}
            className="pl-10 pr-4 py-3 text-base bg-white/80 border-sage-200 focus:border-primary"
          />
        </div>

        {/* Category Filter */}
        {/* <Select value={selectedCategory || "all"} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full lg:w-48 bg-white/80 border-sage-200">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <SelectValue placeholder="All Categories" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-white z-50">
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}

        {/* Clear Filters */}
        {userInteracted &&
          (searchQuery ||
            (selectedCategory && selectedCategory !== "all") ||
            (selectedSubcategory && selectedSubcategory !== "all")) && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="border-sage-200"
            >
              Clear
            </Button>
          )}
      </div>
    </div>
  );
};

export default SearchAndFilter;
