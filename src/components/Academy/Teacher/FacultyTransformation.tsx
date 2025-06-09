// import React, { useRef } from "react";
// import { Link } from "react-router-dom";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselPrevious,
//   CarouselNext,
//   type CarouselApi,
// } from "../UI/carousel";
// import { MapPin, AlertCircle, BookOpen, Sparkles } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface FacultyTransformationProps {
//   Facultytocontact: () => void;
// }

// // Helper to chunk array into pairs of 2
// function chunkArray<T>(array: T[], size: number): T[][] {
//   const result: T[][] = [];
//   for (let i = 0; i < array.length; i += size) {
//     result.push(array.slice(i, i + size));
//   }
//   return result;
// }

// // Dummy structure for multiple sections
// const facultySections = [
//  {
//   label: "See What Happens When Teacher Gets Future-Ready",
//   stories: [
//     {
//       schoolName: "St. Joseph's School",
//       location: "Location: St. Joseph's School",
//       link: "/academia/case-study/st-josephs",
//       problem: {
//         title: "Challenge",
//         description: "Early math felt abstract; robotics and coding treated as extras rather than essentials."
//       },
//       solution: {
//         title: "Intervention",
//         description: "Introduced STEM education via LEGO blocks, creative building, and robotics workshops."
//       },
//       outcome: {
//         title: "Impact",
//         description: "95% student engagement; 70+ robotics prototypes; teachers trained in LEGO pedagogy."
//       },
//     },
//     {
//       schoolName: "Global International School",
//       location: "Location: Global International School",
//       link: "/academia/case-study/global-international",
//       problem: {
//         title: "Challenge",
//         description: "Teachers lacked NEP-aligned pedagogy, tech integration, and learner-centric strategies."
//       },
//       solution: {
//         title: "Intervention",
//         description: "2-day hands-on workshops focusing on digital tools, engagement, feedback culture, and personalized action plans."
//       },
//       outcome: {
//         title: "Impact",
//         description: "100% teacher participation; micro-innovation plans; improved lesson planning and engagement."
//       },
//     },
//     {
//       schoolName: "Ryan International School",
//       location: "Location: Ryan International School",
//       link: "/academia/case-study/ryan-international",
//       problem: {
//         title: "Challenge",
//         description: "Sustainability remained abstract, disconnected from students' daily lives."
//       },
//       solution: {
//         title: "Intervention",
//         description: "One-day program with sessions on climate change, eco-crafts, upcycling, and tree planting."
//       },
//       outcome: {
//         title: "Impact",
//         description: "300+ eco pledges; 100+ handmade eco-products; student-generated campus greening ideas."
//       },
//     },
//     {
//       schoolName: "BLDEA Schools",
//       location: "Karnataka",
//       link: "/academia/case-study/bldea-schools",
//       problem: {
//         title: "Challenge",
//         description: "Teachers needed structured development in pedagogy, communication, and emotional intelligence."
//       },
//       solution: {
//         title: "Intervention",
//         description: "3-day intensive program covering NEP, assessment, inclusive education, empathy, roleplays, and lesson design labs."
//       },
//       outcome: {
//         title: "Impact",
//         description: "90%+ teachers submitted revised lesson plans; ongoing mentoring circles established."
//       },
//     },
//     {
//       schoolName: "GHSS Tamil Nadu",
//       location: "Tamil Nadu",
//       link: "/academia/case-study/ghss-tamil-nadu",
//       problem: {
//         title: "Challenge",
//         description: "Limited exposure to real-world agriculture and entrepreneurship opportunities."
//       },
//       solution: {
//         title: "Intervention",
//         description: "7-day program on organic farming, supply chain, cloud kitchen models, and project-based entrepreneurship."
//       },
//       outcome: {
//         title: "Impact",
//         description: "10+ student teams pitched agri-startups; strong linkages to local livelihood opportunities."
//       },
//     }
//   ]
// }

// ];

// // SchoolCard component now inside this file
// function SchoolCard({
//   schoolName,
//   location,
//   problem,
//   solution,
//   outcome,
//   link,
//   className,
// }: {
//   schoolName: string;
//   location: string;
//   problem: { title: string; description: string };
//   solution: { title: string; description: string };
//   outcome: { title: string; description: string };
//   link?: string;
//   className?: string;
// }) {
//   return (
//    <div
//   className={cn(
//     "rounded-lg border border-gray-300 bg-white shadow-sm p-6 flex flex-col justify-between gap-6 min-h-[320px]",
    
//   )}
// >
//   <div >
//     <div className="flex items-center gap-2 mb-3">
//       <MapPin size={16} className="text-grey-500" />
//       <h3 className="font-semibold text-xl text-[#222]">
//         {schoolName}
//       </h3>
//        {/* <h3 className="font-semibold text-xl text-[#222]">
//         {schoolName}, {location}
//       </h3> */}
//     </div>

//     <div className="flex flex-col gap-5">
//       <div className="flex items-start gap-3">
//         <AlertCircle size={18} className="text-gray-600 mt-[2px]" />
//         <div>
//           <div className="font-medium text-xl text-gray-600">{problem.title}</div>
//           <div className="text-sm text-[#222]">{problem.description}</div>
//         </div>
//       </div>

//       <div className="flex items-start gap-3">
//         <BookOpen size={17} className="text-gray-600 mt-[2px]" />
//         <div>
//           <div className="font-medium text-xl text-gray-600">{solution.title}</div>
//           <div className="text-sm text-[#222]">{solution.description}</div>
//         </div>
//       </div>

//       <div className="flex items-start gap-3">
//         <Sparkles size={18} className="text-gray-600 mt-[2px]" />
//         <div>
//           <div className="font-medium text-xl text-gray-600">{outcome.title}</div>
//           <div className="text-sm text-[#222]">{outcome.description}</div>
//         </div>
//       </div>
//     </div>
//   </div>

//   {link && (
//     <div className="flex justify-center mt-auto">
//       <Link
//         to={link}
//         className="text-sm font-semibold text-red-600 hover:underline"
//       >
//         Read More →
//       </Link>
//     </div>
//   )}
// </div>

//   );
// }

    

// const FacultyTransformation=()=> {
//   const [sectionIndex, setSectionIndex] = React.useState(0);

//   const carouselApiRef = useRef<CarouselApi | null>(null);

//   const currentStories = facultySections[sectionIndex].stories;
//   const storyPairs = chunkArray(currentStories, 2);

//   // Go to first slide of chosen section when section/tab is changed
//   React.useEffect(() => {
//     // Slight timeout to ensure the carousel remounts
//     setTimeout(() => {
//       carouselApiRef.current?.scrollTo(0);
//     }, 80);
//   }, [sectionIndex]);

//   return (
//     <div className="w-full flex flex-col items-center justify-center min-h-screen bg-white px-2 py-8" data-aos="fade-down-right">
//       <div className="w-full max-w-5xl mx-auto flex flex-col items-center">

//         <div className="w-full flex flex-wrap gap-3 justify-center">
//           {facultySections.map((section, idx) => (
//             <button
//               key={section.label}
//               className={cn(
//                 "text-2xl md:text-4xl font-bold px-4  rounded-full transition-colors ",
//                 idx === sectionIndex
//                   ? "white text-black "
//                   : "white text-black"
//               )}
//               onClick={() => setSectionIndex(idx)}
//               type="button"
//             >
//               {section.label}
//             </button>
//           ))}
//         </div>

//         <p className="mb-7 text-gray-500 text-xl md:text-xl text-center mt-6">
//           Discover how schools across India transformed their teaching and learning experiences
//         </p>

//         <div className="relative w-full max-w-4xl">
//           <Carousel
//             className="w-full"
//             opts={{ align: "start" }}
//             setApi={api => { carouselApiRef.current = api; }}
//             key={sectionIndex} // Remount on tab change for isolation
//           >
//             <CarouselContent>
//               {storyPairs.map((pair, idx) => (
//                 <CarouselItem key={idx} className="px-1">
//                   <div className="flex flex-col md:flex-row gap-6 items-stretch  justify-center">
//                     {pair.map((data, subIdx) => (
//                       <SchoolCard
//                         key={subIdx}
//                         schoolName={data.schoolName}
//                         location={data.location}
//                         problem={data.problem}
//                         solution={data.solution}
//                         outcome={data.outcome}
//                           link={data.link} 
//                         className={cn("w-full md:w-[400px] border bg-white", subIdx==0 ? "" : "md:ml-0")}
//                       />
//                     ))}
//                     {pair.length === 1 && (
//                       // When odd, add an empty box for symmetry
//                       <div className="w-full md:w-[290px] bg-transparent"></div>
//                     )}
//                   </div>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             {/* Navigation arrows moved below cards and always visible */}
//             <div className="flex justify-center mt-8 gap-4 relative z-10">
//               <CarouselPrevious className="static relative left-0 bg-red-500 text-white border-none shadow-lg hover:bg-red-600" />
//               <CarouselNext className="static relative right-0 bg-red-600 text-white border-none shadow-lg hover:bg-red-500" />
//             </div>
//           </Carousel>
//         </div>
//         <button
//           className="mt-9 bg-red-500 text-white w-auto h-12 hover:bg-red-600 font-semibold px-7 py-2 rounded-md text-xs shadow-none hover:bg-bg-red-600 transition-colors animate-fade-in"
//         >
//           Read All Stories
//         </button>
//       </div>
//     </div>
//   );
// }

// export default FacultyTransformation;
import React, { useRef } from "react";
import { Link } from "react-router-dom";
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
  label: "See What Happens When Teacher Gets Future-Ready",
  stories: [
    {
      schoolName: "St. Joseph's School",
      location: "Location: St. Joseph's School",
      link: "/academia/case-study/st-josephs",
      problem: {
        title: "Challenge",
        description: "Early math felt abstract; robotics and coding treated as extras rather than essentials."
      },
      solution: {
        title: "Intervention",
        description: "Introduced STEM education via LEGO blocks, creative building, and robotics workshops."
      },
      outcome: {
        title: "Impact",
        description: "95% student engagement; 70+ robotics prototypes; teachers trained in LEGO pedagogy."
      },
    },
    {
      schoolName: "Global International School",
      location: "Location: Global International School",
      link: "/academia/case-study/global-international",
      problem: {
        title: "Challenge",
        description: "Teachers lacked NEP-aligned pedagogy, tech integration, and learner-centric strategies."
      },
      solution: {
        title: "Intervention",
        description: "2-day hands-on workshops focusing on digital tools, engagement, feedback culture, and personalized action plans."
      },
      outcome: {
        title: "Impact",
        description: "100% teacher participation; micro-innovation plans; improved lesson planning and engagement."
      },
    },
    {
      schoolName: "Ryan International School",
      location: "Location: Ryan International School",
      link: "/academia/case-study/ryan-international",
      problem: {
        title: "Challenge",
        description: "Sustainability remained abstract, disconnected from students' daily lives."
      },
      solution: {
        title: "Intervention",
        description: "One-day program with sessions on climate change, eco-crafts, upcycling, and tree planting."
      },
      outcome: {
        title: "Impact",
        description: "300+ eco pledges; 100+ handmade eco-products; student-generated campus greening ideas."
      },
    },
    {
      schoolName: "BLDEA Schools",
      location: "Karnataka",
      link: "/academia/case-study/bldea-schools",
      problem: {
        title: "Challenge",
        description: "Teachers needed structured development in pedagogy, communication, and emotional intelligence."
      },
      solution: {
        title: "Intervention",
        description: "3-day intensive program covering NEP, assessment, inclusive education, empathy, roleplays, and lesson design labs."
      },
      outcome: {
        title: "Impact",
        description: "90%+ teachers submitted revised lesson plans; ongoing mentoring circles established."
      },
    },
    {
      schoolName: "GHSS Tamil Nadu",
      location: "Tamil Nadu",
      link: "/academia/case-study/ghss-tamil-nadu",
      problem: {
        title: "Challenge",
        description: "Limited exposure to real-world agriculture and entrepreneurship opportunities."
      },
      solution: {
        title: "Intervention",
        description: "7-day program on Agribusiness & Cloud Kitchens, and project-based entrepreneurship."
      },
      outcome: {
        title: "Impact",
        description: "10+ student teams pitched agri-startups; strong linkages to local livelihood opportunities."
      },
    }
  ]
}

];

// SchoolCard component now inside this file
function SchoolCard({
  schoolName,
  location,
  problem,
  solution,
  outcome,
  link,
  className,
}: {
  schoolName: string;
  location: string;
  problem: { title: string; description: string };
  solution: { title: string; description: string };
  outcome: { title: string; description: string };
  link?: string;
  className?: string;
}) {
  return (
 <div
  className={cn(
    "rounded-lg border border-gray-300 bg-white shadow-sm p-4 sm:p-6 flex flex-col justify-between gap-4 h-[420px] w-full max-w-[300px]",
    
  )}
>
  <div className="flex flex-col gap-4 overflow-hidden">
    <div className="flex items-center gap-2">
      <MapPin size={16} className="text-grey-500" />
      <h3 className="font-semibold text-lg sm:text-xl text-[#222] break-words">
        {schoolName}
      </h3>
    </div>

    <div className="flex flex-col gap-4 flex-grow">
      <div className="flex items-start gap-3">
        <AlertCircle size={18} className="text-gray-600 mt-[2px]" />
        <div className="overflow-hidden">
          <div className="font-medium text-base sm:text-xl text-gray-600">{problem.title}</div>
          <div className="text-sm text-[#222] break-words line-clamp-3">{problem.description}</div>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <BookOpen size={17} className="text-gray-600 mt-[2px]" />
        <div className="overflow-hidden">
          <div className="font-medium text-base sm:text-xl text-gray-600">{solution.title}</div>
          <div className="text-sm text-[#222] break-words line-clamp-3">{solution.description}</div>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Sparkles size={18} className="text-gray-600 mt-[2px]" />
        <div className="overflow-hidden">
          <div className="font-medium text-base sm:text-xl text-gray-600">{outcome.title}</div>
          <div className="text-sm text-[#222] break-words line-clamp-3">{outcome.description}</div>
        </div>
      </div>
    </div>
  </div>

  {link && (
    <div className="flex justify-center mt-auto w-full">
      <Link
        to={link}
        className="text-sm font-semibold text-red-600 hover:underline text-center break-words"
      >
        Read More →
      </Link>
    </div>
  )}
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
                          link={data.link} 
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

export default FacultyTransformation;

