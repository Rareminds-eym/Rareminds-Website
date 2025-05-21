import React, { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "../UI/carousel";
import { MapPin, AlertCircle, BookOpen, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface FacultyTransformationProps {
  Facultytocontact: () => void;
}

// Helper to chunk array into pairs of 2
function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

// Dummy structure for multiple sections
const facultySections = [
  {
    label: "See What Happens When Faculty Get Future-Ready",
    stories: [
      {
        schoolName: "Kangeyam School",
        location: "Tamil Nadu",
        problem: {
          title: "Problem Faced",
          description: "Low digital adoption among faculty",
        },
        solution: {
          title: "Training Delivered",
          description: "5-day intensive digital pedagogy training",
        },
        outcome: {
          title: "Outcome",
          description: "Improved teacher digital fluency by 78% in just 5 days",
        },
      },
      {
        schoolName: "Sunrise Academy",
        location: "Bangalore",
        problem: {
          title: "Problem Faced",
          description: "Poor student engagement in traditional classes",
        },
        solution: {
          title: "Training Delivered",
          description: "Interactive teaching methods workshop",
        },
        outcome: {
          title: "Outcome",
          description: "Student participation increased by 64% within one term",
        },
      },
      {
        schoolName: "Greenfield Public School",
        location: "Delhi",
        problem: {
          title: "Problem Faced",
          description: "Outdated teaching methodologies",
        },
        solution: {
          title: "Training Delivered",
          description: "Modern pedagogical approaches workshop",
        },
        outcome: {
          title: "Outcome",
          description: "85% of teachers implemented new techniques successfully",
        },
      },
      {
        schoolName: "Westside High",
        location: "Mumbai",
        problem: {
          title: "Problem Faced",
          description: "Limited tech integration in classrooms",
        },
        solution: {
          title: "Training Delivered",
          description: "EdTech integration certification program",
        },
        outcome: {
          title: "Outcome",
          description: "Technology usage in lessons increased by 92%",
        },
      },
      {
        schoolName: "Valley View Institute",
        location: "Himachal Pradesh",
        problem: {
          title: "Problem Faced",
          description: "Teacher burnout and low morale",
        },
        solution: {
          title: "Training Delivered",
          description: "Wellness and teaching effectiveness program",
        },
        outcome: {
          title: "Outcome",
          description: "Teacher satisfaction scores improved by 47%",
        },
      },
      {
        schoolName: "Coastal Academy",
        location: "Kerala",
        problem: {
          title: "Problem Faced",
          description: "Inconsistent assessment methods",
        },
        solution: {
          title: "Training Delivered",
          description: "Standardized evaluation techniques workshop",
        },
        outcome: {
          title: "Outcome",
          description: "Assessment consistency improved by 71% across faculty",
        },
      },
    ],
  },
  {
    label: "",
    stories: [
      {
        schoolName: "Riverdale School",
        location: "Assam",
        problem: {
          title: "Problem Faced",
          description: "Students lacked motivation for assignments",
        },
        solution: {
          title: "Training Delivered",
          description: "Gamified lesson planning workshop",
        },
        outcome: {
          title: "Outcome",
          description: "Assignments completed increased to 90%",
        },
      },
      {
        schoolName: "Bluebell School",
        location: "Mysore",
        problem: {
          title: "Problem Faced",
          description: "Low parent-teacher communication",
        },
        solution: {
          title: "Training Delivered",
          description: "Digital collaboration tools session",
        },
        outcome: {
          title: "Outcome",
          description: "Parent engagement increased by 2x",
        },
      }
    ],
  },
];

// SchoolCard component now inside this file
function SchoolCard({
  schoolName,
  location,
  problem,
  solution,
  outcome,
  className,
}: {
  schoolName: string;
  location: string;
  problem: { title: string; description: string };
  solution: { title: string; description: string };
  outcome: { title: string; description: string };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-300 bg-white shadow-sm p-6 flex flex-col gap-6 min-h-[230px]",
        className
      )}
      style={{
        borderLeft: "2px solid #FFD700"
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <MapPin size={16} className="text-red-500" />
        <h3 className="font-semibold text-xl text-[#222]">
          {schoolName}, {location}
        </h3>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-3">
          <AlertCircle size={18} className="text-gray-600 mt-[2px]" />
          <div>
            <div className="font-medium text-xl text-gray-600">{problem.title}</div>
            <div className="text-sm text-[#222]">{problem.description}</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <BookOpen size={17} className="text-gray-600 mt-[2px]" />
          <div>
            <div className="font-medium text-xl text-gray-600">{solution.title}</div>
            <div className="text-sm text-[#222]">{solution.description}</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Sparkles size={18} className="text-red-500 mt-[2px]" />
          <div>
            <div className="font-medium text-xl text-gray-600">{outcome.title}</div>
            <div className="text-sm text-[#222]">{outcome.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

    

const FacultyTransformation=()=> {
  const [sectionIndex, setSectionIndex] = React.useState(0);

  const carouselApiRef = useRef<CarouselApi | null>(null);

  const currentStories = facultySections[sectionIndex].stories;
  const storyPairs = chunkArray(currentStories, 2);

  // Go to first slide of chosen section when section/tab is changed
  React.useEffect(() => {
    // Slight timeout to ensure the carousel remounts
    setTimeout(() => {
      carouselApiRef.current?.scrollTo(0);
    }, 80);
  }, [sectionIndex]);

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-white px-2 py-8" data-aos="fade-down-right">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">

        <div className="w-full flex flex-wrap gap-3 justify-center">
          {facultySections.map((section, idx) => (
            <button
              key={section.label}
              className={cn(
                "text-2xl md:text-4xl font-bold px-4  rounded-full transition-colors ",
                idx === sectionIndex
                  ? "white text-black "
                  : "white text-black"
              )}
              onClick={() => setSectionIndex(idx)}
              type="button"
            >
              {section.label}
            </button>
          ))}
        </div>

        <p className="mb-7 text-gray-500 text-xl md:text-xl text-center mt-6">
          Discover how schools across India transformed their teaching and learning experiences
        </p>

        <div className="relative w-full max-w-4xl">
          <Carousel
            className="w-full"
            opts={{ align: "start" }}
            setApi={api => { carouselApiRef.current = api; }}
            key={sectionIndex} // Remount on tab change for isolation
          >
            <CarouselContent>
              {storyPairs.map((pair, idx) => (
                <CarouselItem key={idx} className="px-1">
                  <div className="flex flex-col md:flex-row gap-6 items-stretch  justify-center">
                    {pair.map((data, subIdx) => (
                      <SchoolCard
                        key={subIdx}
                        schoolName={data.schoolName}
                        location={data.location}
                        problem={data.problem}
                        solution={data.solution}
                        outcome={data.outcome}
                        className={cn("w-full md:w-[400px] border bg-white", subIdx==0 ? "" : "md:ml-0")}
                      />
                    ))}
                    {pair.length === 1 && (
                      // When odd, add an empty box for symmetry
                      <div className="w-full md:w-[290px] bg-transparent"></div>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Navigation arrows moved below cards and always visible */}
            <div className="flex justify-center mt-8 gap-4 relative z-10">
              <CarouselPrevious className="static relative left-0 bg-red-500 text-white border-none shadow-lg hover:bg-red-600" />
              <CarouselNext className="static relative right-0 bg-red-600 text-white border-none shadow-lg hover:bg-red-500" />
            </div>
          </Carousel>
        </div>
        <button
          className="mt-9 bg-red-500 text-white w-auto h-12 hover:bg-red-600 font-semibold px-7 py-2 rounded-md text-xs shadow-none hover:bg-bg-red-600 transition-colors animate-fade-in"
        >
          Read All Stories
        </button>
      </div>
    </div>
  );
}

export default FacultyTransformation