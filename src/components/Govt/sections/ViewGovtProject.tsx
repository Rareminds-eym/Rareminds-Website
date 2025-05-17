
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    ChevronLeft,
    ChevronRight,
    Download,
    Calendar,
    Send
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface StoryData {
    title: string;
    location: string;
    metrics: string[];
    bgColor: string;
    subProjects?: string[];
}

const stories: StoryData[] = [
    {
        title: "Soft Skills",
        location: "TNSDC (Tamil Nadu Skill Development Corporation)",
        metrics: [
            "30,000+ Students | 35 Districts | ₹1 Cr+ Delivered",
            "Pre-Post Scores ↑ 60%, Attendance > 90%, Placement Boost"
        ],
        bgColor: "from-blue-500/20 to-cyan-500/20",
        subProjects: [
            "TNSDC Naan Mudhalvan Project",
            "TNSDC School Project 1 week (cloud kitchen)"
        ]
    },
    {
        title: "Spoken English",
        location: "Tripura Skill Mission",
        metrics: [
            "1,200 Hostel Students",
            "94% Completion Rate | 87% Confidence Boost in Speaking"
        ],
        bgColor: "from-blue-500/20 to-teal-500/20"
    },
    {
        title: "Skill Development",
        location: "Maharashtra Skill Mission",
        metrics: [],
        bgColor: "from-orange-500/20 to-amber-500/20"
    },
    {
        title: "Skill Development",
        location: "Karnataka Skill Mission",
        metrics: [],
        bgColor: "from-green-500/20 to-cyan-500/20"
    }
];

const ViewGovtProject = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [showNestedProject, setShowNestedProject] = useState(false);
    const [showNestedCarousel, setShowNestedCarousel] = useState(false);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? stories.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === stories.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleProjectClick = () => {
        setShowNestedProject(!showNestedProject);
    };

    const toggleNestedCarousel = () => {
        setShowNestedCarousel(!showNestedCarousel);
    };




    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                handleNext();
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [currentIndex, isPaused]);

    return (
        <div className="relative w-full overflow-hidden rounded-xl py-4 px-3 md:py-8 md:px-4  shadow-lg mt-24">
            <div className="absolute top-4 right-4 ">
                <div className="flex space-x-1 items-center">
                    {stories.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all duration-300",
                                currentIndex === index
                                    ? "w-6 bg-blue-600"
                                    : "bg-gray-300 hover:bg-gray-400"
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-center bg-gradient-to-r from-blue-700 to-teal-600 bg-clip-text text-transparent">
                    Government Projects
                </h2>
            </div>

            <div
                className="relative mx-auto max-w-5xl"
                ref={carouselRef}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className="overflow-hidden relative rounded-xl">
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {stories.map((story, index) => (
                            <div
                                key={index}
                                className={`min-w-full px-3 md:px-6 py-8 md:py-10 rounded-xl bg-gradient-to-br ${story.bgColor}`}
                            >
                                <div className="flex flex-col h-full justify-between min-h-[280px]">
                                    <div>
                                        <div className="inline-block mb-3 rounded-full px-3 py-1 bg-white/60 text-sm font-medium text-blue-800">
                                            {story.location}
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-800">
                                            {story.title}
                                        </h3>

                                        {story.metrics.length > 0 ? (
                                            <ul className="space-y-2 mb-4">
                                                {story.metrics.map((metric, idx) => (
                                                    <li key={idx} className="flex items-start">
                                                        <span className="inline-flex mr-2 text-blue-600 font-bold">★</span>
                                                        <span className="text-slate-700">{metric}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-slate-600 italic mb-4">
                                                Successful implementation with notable outcomes
                                            </p>
                                        )}

                                        {/* Nested projects section */}
                                        {story.subProjects && story.subProjects.length > 0 && index === 0 && (
                                            <div className="mt-4">
                                                <h4 className="text-md font-semibold mb-2 text-slate-700">Related Projects:</h4>
                                                <div className="bg-white/40 rounded-lg p-3">
                                                    

                                                    {/* Always visible Carousel */}
                                                    <div className="mt-3 animate-fade-in">
                                                        <Carousel className="w-full">
                                                            <CarouselContent>
                                                                <CarouselItem className="basis-full">
                                                                    <div className="p-2">
                                                                        <div className="border border-blue-200 bg-white/80 rounded-lg p-4 shadow-sm">
                                                                            <h5 className="font-semibold text-blue-800 mb-2">TNSDC Naan Mudhalvan Project</h5>
                                                                            <ul className="space-y-1 text-sm">
                                                                                <li className="flex items-start">
                                                                                    <span className="inline-flex mr-2 text-blue-600">•</span>
                                                                                    <span className="text-slate-700">25,000 College Students</span>
                                                                                </li>
                                                                                <li className="flex items-start">
                                                                                    <span className="inline-flex mr-2 text-blue-600">•</span>
                                                                                    <span className="text-slate-700">Soft Skills & Career Readiness</span>
                                                                                </li>
                                                                                <li className="flex items-start">
                                                                                    <span className="inline-flex mr-2 text-blue-600">•</span>
                                                                                    <span className="text-slate-700">42% Placement Improvement</span>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </CarouselItem>
                                                                <CarouselItem className="basis-full">
                                                                    <div className="p-2">
                                                                        <div className="border border-blue-200 bg-white/80 rounded-lg p-4 shadow-sm">
                                                                            <h5 className="font-semibold text-blue-800 mb-2">TNSDC School Project</h5>
                                                                            <ul className="space-y-1 text-sm">
                                                                                <li className="flex items-start">
                                                                                    <span className="inline-flex mr-2 text-blue-600">•</span>
                                                                                    <span className="text-slate-700">1 Week Intensive Training</span>
                                                                                </li>
                                                                                <li className="flex items-start">
                                                                                    <span className="inline-flex mr-2 text-blue-600">•</span>
                                                                                    <span className="text-slate-700">Cloud Kitchen Training Module</span>
                                                                                </li>
                                                                                <li className="flex items-start">
                                                                                    <span className="inline-flex mr-2 text-blue-600">•</span>
                                                                                    <span className="text-slate-700">5,000+ School Students</span>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </CarouselItem>
                                                            </CarouselContent>
                                                            <div className="flex justify-center gap-2 mt-8 ">
                                                                <CarouselPrevious className="h-7 w-7 relative static border-2 bg-red-400 border-red-200" />
                                                                <CarouselNext className="h-7 w-7 relative static border-2 bg-red-400 border-red-200" />
                                                            </div>
                                                        </Carousel>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation buttons */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={18} className="text-slate-700" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={18} className="text-slate-700" />
                    </button>
                </div>

                {/* CTA Section */}
                <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-3">
                    <Button

                        className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white flex items-center gap-2"
                    >
                        <Send size={16} /> Request a Proposal
                    </Button>
                    <Button

                        className="w-full md:w-auto bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white flex items-center gap-2"
                        variant="outline"
                    >
                        <Calendar size={16} /> Schedule a Strategy Call
                    </Button>
                    <Button

                        className="w-full md:w-auto bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 flex items-center gap-2"
                        variant="outline"
                    >
                        <Download size={16} /> Download Government Brochure
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ViewGovtProject;