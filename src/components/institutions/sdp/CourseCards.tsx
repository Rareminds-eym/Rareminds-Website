import { motion } from "framer-motion";
import { Globe, Briefcase, Bookmark } from "lucide-react";
import React, { useState } from "react";

const courses = [
  // ... same courses as before
  {
    id: "01",
    title: "Faculty Development Programs",
    subCards: [
      { label: "Faculty", icon: <Globe size={20} /> },
      { label: "Development", icon: <Briefcase size={20} /> },
      { label: "Programs", icon: <Bookmark size={20} /> },
    ],
  },
  {
    id: "02",
    title: "Communication & Personality Development",
    subCards: [
      { label: "Communication", icon: <Globe size={20} /> },
      { label: "Personality", icon: <Briefcase size={20} /> },
      { label: "Development", icon: <Bookmark size={20} /> },
    ],
  },
  {
    id: "03",
    title: "Mental Health & Counselling Training",
    subCards: [
      { label: "Mental Health", icon: <Globe size={20} /> },
      { label: "Counselling", icon: <Briefcase size={20} /> },
      { label: "Training", icon: <Bookmark size={20} /> },
    ],
  },
  {
    id: "04",
    title: "Domain Specific Classification Programs",
    subCards: [
      { label: "Domain", icon: <Globe size={20} /> },
      { label: "Classification", icon: <Briefcase size={20} /> },
      { label: "Programs", icon: <Bookmark size={20} /> },
    ],
  },
  {
    id: "05",
    title: "Leadership & Career Growth",
    subCards: [
      { label: "Leadership", icon: <Globe size={20} /> },
      { label: "Career", icon: <Briefcase size={20} /> },
      { label: "Growth", icon: <Bookmark size={20} /> },
    ],
  },
  {
    id: "06",
    title: "Institutional Value-add Services",
    subCards: [
      { label: "Institutional", icon: <Globe size={20} /> },
      { label: "Value-add", icon: <Briefcase size={20} /> },
      { label: "Services", icon: <Bookmark size={20} /> },
    ],
  },
];

// Fixed filter labels from your reference
const fixedFilters = [
  "Teacher",
  "Principal",
  "HOD",
  "Specialist",
  "Digital Pedagogy",
  "Leadership",
  "Wellness",
  "Assessment",
];

const CourseCards = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (label: string) => {
    setActiveFilters((prev) =>
      prev.includes(label)
        ? prev.filter((f) => f !== label)
        : [...prev, label]
    );
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    card: HTMLDivElement
  ) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = Math.max(Math.min(-(y - centerY) / 6, 6), -20);
    const rotateY = Math.max(Math.min((x - centerX) / 6, 6), -20);

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (card: HTMLDivElement) => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  // Filter courses by search term AND active fixed filters (AND logic)
  const filteredCourses = courses.filter((course) => {
    const lowerSearch = searchTerm.toLowerCase();

    const matchesSearch =
      course.title.toLowerCase().includes(lowerSearch) ||
      course.subCards.some((sub) =>
        sub.label.toLowerCase().includes(lowerSearch)
      );

    const matchesFilters =
      activeFilters.length === 0 ||
      activeFilters.every((filterLabel) =>
        course.subCards.some((sub) => sub.label === filterLabel)
      );

    return matchesSearch && matchesFilters;
  });

  return (
    <section className="min-h-screen bg-blue-50 p-10">
      <div className="container mx-auto px-6 relative z-10 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <h1 className="text-xl font-bold mb-4 bg-black bg-clip-text text-transparent">
            Integrated Services for Holistic Campus Transformation
          </h1>
          <p className="text-sm text-gray-600 mx-auto mb-4">
            From faculty development to student empowerment, RareMinds delivers expert-led programs in communication, counseling, domain skills, and leadership — all designed to build future-ready campuses.
          </p>

          {/* Search Input */}
          <div className="text-center mb-4 py-4">
          <input
            type="text"
            placeholder="Search courses..."
            className="border border-gray-300 rounded-3xl px-4 py-2 w-full max-w-md mx-auto focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          </div>

          {/* Fixed Filter Menu */}
          <div className="flex flex-wrap justify-center gap-3 max-w-xl mx-auto">
            {fixedFilters.map((label) => {
              const isActive = activeFilters.includes(label);
              return (
                <button
                  key={label}
                  onClick={() => toggleFilter(label)}
                  className={`px-4 py-2 rounded-full border ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                  } transition-colors duration-200`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-28 justify-items-center pt-16 px-6">
          {filteredCourses.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center">
              No courses match your search and filters.
            </p>
          ) : (
            filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                className="relative bg-white w-[240px] h-[320px] rounded-[25px] flex flex-col items-center pt-10 transition-transform ease-[cubic-bezier(0.25,1,0.5,1)] duration-500 will-change-transform"
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                style={{ transformStyle: "preserve-3d" }}
              >
                <h2
                  className="text-[#222B33] font-semibold text-3xl mb-12 transition-transform duration-300"
                  style={{ transform: "translateZ(20px)" }}
                >
                  {course.id}
                </h2>

                <div
                  className="relative z-10 w-20 h-20 rounded-full bg-blue-400 mb-6 flex items-center justify-center overflow-hidden transition-transform duration-300"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <img
                    src="https://via.placeholder.com/80"
                    alt="Course"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {course.subCards.map((sub, idx) => {
                  const positions = [
                    { top: "top-6 left-[-80px]" },
                    { top: "top-1/2 -translate-y-1/2 right-[-80px]" },
                    { bottom: "bottom-8 left-[-80px]" },
                  ];
                  const pos = positions[idx];

                  return (
                    <motion.div
                      key={sub.label}
                      className={`absolute ${
                        pos.top || ""
                      } ${pos.bottom || ""} ${pos.left || ""} ${
                        pos.right || ""
                      } w-[160px] bg-white shadow-md rounded-xl p-2 flex items-center gap-3 transition-transform duration-300`}
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      style={{ transform: "translateZ(20px)" }}
                    >
                      <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-600">
                        {sub.icon}
                      </div>
                      <p className="text-sm font-medium">{sub.label}</p>
                    </motion.div>
                  );
                })}

                <a
                  href={
                    course.id === "01"
                      ? "/institutions/fdp"
                      : "#"
                  }
                  className="absolute bottom-4 right-4 text-blue-500 text-sm font-medium hover:text-blue-700"
                  style={{ transform: "translateZ(20px)" }}
                >
                  Learn more &gt;
                </a>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseCards;
