import { useState } from "react";
import { Button } from "../UI/button";
import { 
  GraduationCap, 
  Users, 
  LineChart, 
  Heart, 
  Laptop, 
  ArrowRight, 
  Download,
  Calendar,
  Check,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "../UI/input";
import { toast } from "@/hooks/use-toast";

type CourseType = {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  features: string[];
  cta: {
    text: string;
    icon: React.ElementType;
  };
  roles: string[];
  duration: string;
  nepFocus: string[];
};

const courses: CourseType[] = [
  {
    id: 1,
    title: "Teacher Training Programs (21st Century)",
    description: "",
    icon: Users,
    color: "",
    features: [
      "NEP Implementation for Foundational, Preparatory, Middle & Secondary Stages",
      "Pedagogy : Activity-Based Learning (ABL), Experiential Learning, Gamification and EdTech Integration , Blended Learning Methods, Assessment Design and Bloom’s Taxonomy Mapping",
      "Differentiated Instruction & Inclusive Classrooms & holisticRemedial & Special Education Support Training",
      "Remote teaching methods",
      "Entrepreneurial teacher(How to mentor startups, incubation programs, IIC involvement)",
      "Green Campus & Sustainability Education (ESG, SDGs, climate literacy integration)",
      "Digital and Pedagogical Upskilling (, Google Suite, Canva for Education, Microsoft Teams,, Padlet, Kahoot, Mentimeter) - technical"
    ],
    cta: {
      text: "Book Orientation",
      icon: Calendar
    },
    roles: ["Teacher"],
    duration: "3 days",
    nepFocus: ["Skill Development", "Capacity Building", "Institutional Reform"]
  },
  {
    id: 2,
    title: " Communication and Personality Development",
    description: "",
    icon: LineChart,
    color: "",
    features: [
      "English Fluency & Public Speaking for Teachers",
      "Classroom Management without Stress",
      "Parent-Teacher Communication Mastery",
     
    ],
    cta: {
      text: "Request Demo",
      icon: Calendar
    },
    roles: ["Teacher"],
    duration: "2 days",
    nepFocus: ["Management", "Vision", "Strategic Planning"]
  },
  {
    id: 3,
    title: "Mental Health and Counseling Training",
    description: "",
    icon: Heart,
    color: "",
    features: [
      "Recognizing At-Risk Student",
      "Peer Counseling & First Response Techniques",
      "Faculty as Mentors: Empathy & Active Listening",
      "Creating a Safe Classroom"
    ],
    cta: {
      text: "Download Brochure",
      icon: Download
    },
    roles: ["Teacher"],
    duration: "2 days",
    nepFocus: ["Wellbeing", "Holistic Education", "Culture"]
  },
  {
    id: 4,
    title: "Domain-Specific Certification Programs",
    description: "",
    icon: Laptop,
    color: "",
    features: [
      "In partnership with industries (AgriTech, EV, EdTech, AI, Biotechnology, etc.)",
     
    ],
    cta: {
      text: "Book Orientation",
      icon: Calendar
    },
    roles: ["Teacher"],
    duration: "4 days",
    nepFocus: ["Technology", "Innovation", "Digital Literacy"]
  },
  {
    id: 5,
    title: " Leadership and Career Growth",
    description: "",
    icon: Laptop,
    color: "",
    features: [
      "Aspiring Academic Leaders Program (For HODs/Coordinators)",
      "School Principal Excellence Program",
      "Continuous Professional Development Frameworks for School Clusters - Workshops",
     
    ],
    cta: {
      text: "Book Orientation",
      icon: Calendar
    },
    roles: ["Teacher"],
    duration: "4 days",
    nepFocus: ["Technology", "Innovation", "Digital Literacy"]
  },
  {
    id: 6,
    title: "  Institutional Value-Add Services",
    description: "",
    icon: Laptop,
    color: "",
    features: [
      "(Benefits both teachers and management)",
      "Teacher Performance Audits",
      "School/College Ranking Preparation (NAAC/NIRF Readiness)",
      "Building Teacher-Led Clubs & Innovation Cells",
      "Creating Peer-Learning Teacher Communities",
     
    ],
    cta: {
      text: "Book Orientation",
      icon: Calendar
    },
    roles: ["Teacher"],
    duration: "4 days",
    nepFocus: ["Technology", "Innovation", "Digital Literacy"]
  }
];

interface FilterOption {
  name: string;
  value: string;
  category: 'role' | 'focus';
}

const filterOptions: FilterOption[] = [
  { name: "Teacher", value: "Teacher", category: "role" },
  { name: "Principal", value: "Principal", category: "role" },
  { name: "HOD", value: "HOD", category: "role" },
  { name: "Specialist", value: "Specialist", category: "role" },
  { name: "Digital Pedagogy", value: "Technology", category: "focus" },
  { name: "Leadership", value: "Management", category: "focus" },
  { name: "Wellness", value: "Wellbeing", category: "focus" },
  { name: "Assessment", value: "Assessment", category: "focus" }
];

const CourseCards = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const toggleFilter = (value: string) => {
    setActiveFilters(prev => 
      prev.includes(value) 
        ? prev.filter(f => f !== value) 
        : [...prev, value]
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Searching courses",
        description: `Finding results for "${searchQuery}"`,
      });
    }
  };

  const filteredCourses = courses.filter(course => {
    // First apply search filtering
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const matchesTitle = course.title.toLowerCase().includes(query);
      const matchesDescription = course.description.toLowerCase().includes(query);
      const matchesFeatures = course.features.some(feature => 
        feature.toLowerCase().includes(query)
      );
      
      if (!(matchesTitle || matchesDescription || matchesFeatures)) {
        return false;
      }
    }
    
    // Then apply tag filtering
    if (activeFilters.length === 0) {
      return true;
    }
    
    return activeFilters.some(filter => {
      const filterOption = filterOptions.find(opt => opt.value === filter);
      if (!filterOption) return false;
      
      return filterOption.category === 'role' 
        ? course.roles.some(role => role.includes(filter))
        : course.nepFocus.some(focus => focus.includes(filter));
    });
  });

  const getColorClass = (color: string, isBackground = true) => {
    const colorMap: Record<string, string> = {
      red: isBackground ? "bg-red-50 border-red-200" : "text-red-600",
      black: isBackground ? "bg-gray-900 border-gray-800" : "text-black",
      white: isBackground ? "bg-white border-gray-200" : "text-white"
    };
  
    return colorMap[color] || (isBackground ? "bg-gray-50 border-gray-200" : "text-gray-600");
  };

  return (
    <div className="py-16 bg-gray-50 courses"  id="course-cards-section">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            NEP-Compliant Training Programs
          </h2>
          <p className="text-lg text-gray-600">
            Discover specialized courses designed to transform teaching practices in alignment with 
            the National Education Policy 2020
          </p>
        </div>

        <div className="mb-8 space-y-6">
          {/* Search input */}
          <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto">
            <div className="relative">
              <Input 
                type="text"
                placeholder="Search for courses..." 
                value={searchQuery}
                onChange={handleSearch}
                className="pr-10"
              />
              <button 
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-red-600"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Filter options */}
          <div className="flex flex-wrap justify-center gap-3">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => toggleFilter(option.value)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeFilters.includes(option.value)
                    ? "bg-red-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                )}
              >
                {option.name}
                {activeFilters.includes(option.value) && (
                  <span className="ml-2">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const isHovered = hoveredCourse === course.id;
            return (
              <div
                key={course.id}
                className={cn(
                  "rounded-xl overflow-hidden card-hover relative flex flex-col transition-shadow duration-300 ease-in-out transform",
                  isHovered ? "shadow-xl scale-105" : "shadow-sm"
                )}
                onMouseEnter={() => setHoveredCourse(course.id)}
                onMouseLeave={() => setHoveredCourse(null)}
                style={{ minHeight: isHovered ? "auto" : "auto" }}
              >
                <div
                  className={cn(
                    "absolute top-0 left-0 right-0 transition-all duration-300 ease-in-out",
                    `bg-${course.color}-500`,
                    isHovered ? "h-2" : "h-1"
                  )}
                  style={{height: isHovered ? "0.5rem" : "0.25rem"}}
                ></div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-start gap-4 p-4 bg-white shadow-sm rounded-lg">
                    <div
                      className={cn(
                        "p-3 rounded-full flex items-center justify-center",
                        getColorClass(course.color)
                      )}
                    >
                      <course.icon
                        className={cn("w-6 h-6", getColorClass(course.color, false))}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                    </div>
                  </div>

                  <div className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out mt-3",
                    isHovered ? "max-h-full opacity-100" : "max-h-0 opacity-0"
                  )} style={{ transitionProperty: "max-height, opacity" }}>
                    <div className="pt-3 border-t flex-grow flex flex-col justify-between">
                      <div>
                        <p className="font-medium text-sm text-gray-700 mb-2">Key Features:</p>
                        <ul className="space-y-2 mb-4 max-h-40 overflow-auto pr-2">
                          {course.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-sm text-gray-600">
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <div className="text-xs bg-red-50 text-black px-2 py-1 rounded-full">
                            {course.duration}
                          </div>
                          {course.roles.slice(0, 2).map((role, i) => (
                            <div key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                              {role}
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button className={cn(
                        "w-full group mt-auto",
                        course.color === "red" ? "bg-red-500 hover:bg-red-600" :
                        course.color === "gold" ? "bg-red-500 hover:bg-red-600" :
                        course.color === "purple" ? "bg-red-500 hover:bg-red-600" : 
                        course.color === "rose" ? "bg-red-500 hover:bg-red-600" :
                        "bg-red-500 hover:bg-red-600",
                        "text-white"
                      )}>
                        <course.cta.icon className="h-4 w-4 mr-2" />
                        {course.cta.text}
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                  
                  {!isHovered && (
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full mt-3 border",
                        getColorClass(course.color, false),
                        "hover:bg-gray-50"
                      )}
                    >
                      View Details
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No courses match your search or selected filters</p>
            <div className="space-x-2 mt-4">
              {searchQuery && (
                <Button 
                  variant="outline" 
                  onClick={() => setSearchQuery("")}
                  className="border-gray-300"
                >
                  Clear search
                </Button>
              )}
              {activeFilters.length > 0 && (
                <Button 
                  variant="link" 
                  onClick={() => setActiveFilters([])}
                  className="text-black"
                >
                  Clear filters
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCards;

