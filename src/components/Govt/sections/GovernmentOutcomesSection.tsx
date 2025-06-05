import React from "react";
import { Section } from "../../../components/ui/section";
import { icons } from "../../../components/Govt/icons";
import { Card } from "../../../components/ui/card";
import { cn } from "../../../lib/utils";
import { ScrollArea, ScrollBar } from "../../../components/ui/scroll-area";
import { useIsMobile } from "../../../hooks/use-mobile";

const OUTCOME_TABS = [
  {
    label: "Tamil Nadu",
    value: "tamil-nadu",
    fullName: "Tamil Nadu - Southern India"
  },
  { 
    label: "Tripura", 
    value: "tripura",
    fullName: "Tripura - North Eastern India"
  },
  { 
    label: "Maharashtra", 
    value: "maharashtra",
    fullName: "Maharashtra - Western India"
  },
  { 
    label: "Karnataka", 
    value: "karnataka",
    fullName: "Karnataka - South Western India"
  },
  { 
    label: "Others", 
    value: "others",
    fullName: "Other States - Pan India"
  }
];

const OUTCOME_METRICS = [
  {
    icon: <span className="text-red-500"><icons.Users className="h-5 w-5" /></span>,
    label: "30,000+ Students"
  },
  {
    icon: <span className="text-red-500"><icons.MapPin className="h-5 w-5" /></span>,
    label: "35 Districts"
  },
  {
    icon: <span className="text-red-500"><icons.BarChart className="h-5 w-5" /></span>,
    label: "₹1 Cr+ Delivered"
  }
];

const OUTCOME_DETAILS = [
  {
    label: "Pre-Post Scores",
    value: "↑ 60%",

  },
  {
    label: "Attendance Rate",
    value: "> 90%",
   
  },
  {
    label: "Placement Impact",
    value: "Boost",
    
  },
];

const OUTCOME_CONTENT = {
  "tamil-nadu": {
    title: "TNSDC Soft Skills",
    description: "Innovative training solutions driving measurable success across India's educational landscape.",
    metrics: OUTCOME_METRICS,
    details: OUTCOME_DETAILS
  },
  "tripura": {
    title: "Tripura Project",
    description: "Project impact across Tripura state.",
    metrics: [
      {
        icon: <span className="text-red-500"><icons.Users className="h-5 w-5" /></span>,
        label: "7,500+ Students"
      },
      {
        icon: <span className="text-red-500"><icons.MapPin className="h-5 w-5" /></span>,
        label: "8 Districts"
      },
      {
        icon: <span className="text-red-500"><icons.BarChart className="h-5 w-5" /></span>,
        label: "₹10L+ Delivered"
      }
    ],
    details: [
      { label: "Pre-Post Scores", value: "↑ 47%", valueClass: "text-green-500" },
      { label: "Attendance Rate", value: "~87%", valueClass: "text-green-500" },
      { label: "Placement Impact", value: "Growth", valueClass: "text-green-500" }
    ]
  },
  "maharashtra": {
    title: "Maharashtra Project",
    description: "Wide-scale skilling outcomes delivered.",
    metrics: [
      {
        icon: <span className="text-red-500"><icons.Users className="h-5 w-5" /></span>,
        label: "15,000+ Students"
      },
      {
        icon: <span className="text-red-500"><icons.MapPin className="h-5 w-5" /></span>,
        label: "12 Districts"
      },
      {
        icon: <span className="text-red-500"><icons.BarChart className="h-5 w-5" /></span>,
        label: "₹35L+ Delivered"
      }
    ],
    details: [
      { label: "Pre-Post Scores", value: "↑ 53%", valueClass: "text-green-500" },
      { label: "Attendance Rate", value: ">85%", valueClass: "text-green-500" },
      { label: "Placement Impact", value: "Uplift", valueClass: "text-green-500" }
    ]
  },
  "karnataka": {
    title: "Karnataka Project",
    description: "Advancing skills and placement in southern India.",
    metrics: [
      {
        icon: <span className="text-red-500"><icons.Users className="h-5 w-5" /></span>,
        label: "5,000+ Students"
      },
      {
        icon: <span className="text-red-500"><icons.MapPin className="h-5 w-5" /></span>,
        label: "6 Districts"
      },
      {
        icon: <span className="text-red-500"><icons.BarChart className="h-5 w-5" /></span>,
        label: "₹8L+ Delivered"
      }
    ],
    details: [
      { label: "Pre-Post Scores", value: "↑ 49%", valueClass: "text-green-500" },
      { label: "Attendance Rate", value: ">86%", valueClass: "text-green-500" },
      { label: "Placement Impact", value: "Progress", valueClass: "text-green-500" }
    ]
  },
  "others": {
    title: "Other States",
    description: "Our approach has delivered results across many more states.",
    metrics: [
      {
        icon: <span className="text-red-500"><icons.Users className="h-5 w-5" /></span>,
        label: "2,500+ Students"
      },
      {
        icon: <span className="text-red-500"><icons.MapPin className="h-5 w-5" /></span>,
        label: "4 Districts"
      },
      {
        icon: <span className="text-red-500"><icons.BarChart className="h-5 w-5" /></span>,
        label: "₹3L+ Delivered"
      }
    ],
    details: [
      { label: "Pre-Post Scores", value: "↑ 40%", valueClass: "text-green-500" },
      { label: "Attendance Rate", value: "80%", valueClass: "text-green-500" },
      { label: "Placement Impact", value: "Emerging", valueClass: "text-green-500" }
    ]
  }
};

const OUTCOME_SLIDES_TAMILNADU = [
  {
    title: "TNSDC Training Impact",
    description: "Our comprehensive training solutions have transformed the lives of over 30,000 students across Tamil Nadu.",
    metrics: OUTCOME_METRICS,
    details: OUTCOME_DETAILS
  },
  {
    title: "Chennai Region Success",
    description: "Delivered exceptional results in the Chennai metropolitan area with focused skill development programs.",
    metrics: [
      {
        icon: <span className="text-red-500"><icons.Users className="h-5 w-5" /></span>,
        label: "12,000+ Students"
      },
      {
        icon: <span className="text-red-500"><icons.MapPin className="h-5 w-5" /></span>,
        label: "8 Districts"
      },
      {
        icon: <span className="text-red-500"><icons.BarChart className="h-5 w-5" /></span>,
        label: "₹40L+ Delivered"
      }
    ],
    details: [
      { label: "Pre-Post Scores", value: "↑ 65%", valueClass: "text-green-500" },
      { label: "Attendance Rate", value: "> 92%", valueClass: "text-green-500" },
      { label: "Placement Impact", value: "High", valueClass: "text-green-500" }
    ]
  }
];

const SLIDE_DURATION = 5000;

type TabValues = "tamil-nadu" | "tripura" | "maharashtra" | "karnataka" | "others";

export const GovernmentOutcomesSection = () => {
  const [activeTab, setActiveTab] = React.useState<TabValues>("tamil-nadu");
  const [slideIndex, setSlideIndex] = React.useState(0);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (activeTab === "tamil-nadu") {
      interval = setInterval(() => {
        setSlideIndex((prev) => 
          prev === OUTCOME_SLIDES_TAMILNADU.length - 1 ? 0 : prev + 1
        );
      }, SLIDE_DURATION);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [activeTab]);

  const activeContent = React.useMemo(() => {
    if (activeTab === "tamil-nadu") {
      return OUTCOME_SLIDES_TAMILNADU[slideIndex];
    }
    return OUTCOME_CONTENT[activeTab];
  }, [activeTab, slideIndex]);

  return (
    <Section  id="government-outcomes" className="sm:!px-4 !px-0 ">
      <div className="flex flex-col items-center w-full">
        <h2 className="text-xl md:text-4xl font-semibold  md:font-bold text-center mb-2 text-[#111827]">
          Trusted by governments, proven by outcomes.
        </h2>
        <p className="text-gray-600 text-center mb-10 max-w-5xl mx-auto text-base md:text-xl mt-2 md:mt-4">
          Our track record speaks for itself with measurable results across multiple state government projects.
        </p>
        
        <div className="w-full max-w-4xl mx-auto mb-8 px-4 ">
          <Card className="p-2 shadow-lg border border-gray-200 ">
            {isMobile ? (
              <ScrollArea className="w-full whitespace-nowrap rounded-full">
                <div className="flex items-center justify-start gap-1 ">
                  {OUTCOME_TABS.map((tab) => {
                    const isActive = activeTab === tab.value;
                    return (
                      <button
                        key={tab.value}
                        onClick={() => {
                          setActiveTab(tab.value as TabValues);
                          setSlideIndex(0);
                        }}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 md:px-6 md:py-3 rounded-full text-xs  md:text-sm font-medium transition-all duration-200 whitespace-nowrap min-w-[0px] justify-center",
                          isActive
                            ? "bg-gradient-to-r from-[#FF6366] to-[#FF8082] text-white shadow-md"
                            : "text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        {isActive && <icons.MapPin className="h-4 w-4" />}
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
                <ScrollBar orientation="horizontal" className="invisible" />
              </ScrollArea>
            ) : (
              <div className="flex items-center justify-start gap-1">
                {OUTCOME_TABS.map((tab) => {
                  const isActive = activeTab === tab.value;
                  return (
                    <button
                      key={tab.value}
                      onClick={() => {
                        setActiveTab(tab.value as TabValues);
                        setSlideIndex(0);
                      }}
                      className={cn(
                        "flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-200 whitespace-nowrap min-w-[140px] justify-center",
                        isActive
                          ? "bg-gradient-to-r from-[#FF6366] to-[#FF8082] text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      {isActive && <icons.MapPin className="h-4 w-4" />}
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        <div className="w-full flex flex-col px-3 items-center justify-center">
          <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">
            <h3 className=" text-lg md:text-2xl mb-4 font-bold  ">{activeContent.title}</h3>
            <p className="text-gray-700 mb-4 text-sm md:text-lg">{activeContent.description}</p>
            <div className="flex flex-wrap justify-center gap-x-8 md:gap-x-14 gap-y-4 mb-4 md:mb-8 mt-2 w-full">
              {activeContent.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-base font-medium text-[#232629] justify-center"
                >
                  {metric.icon}
                  <span className="text-base font-extrabold md:text-xl text-gray-700 ">{metric.label}</span>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl shadow-[0_4px_24px_0_rgba(68,68,68,0.08)] px-4 py-4 md:px-8 md:py-7 space-y-2 md:space-y-4 w-full max-w-[500px] border border-[#eee] mx-auto">
              {activeContent.details.map((d) => (
                <div key={d.label} className="flex justify-between items-center py-1 text-base md:text-lg">
                  <div className="font-medium text-[#252829]  ">{d.label}</div>
                  <div className={`font-extrabold ml-2 text-red-500 `}>{d.value}</div>
                </div>
              ))}
            </div>

            {activeTab === "tamil-nadu" && (
              <div className="flex justify-center gap-2 mt-8">
                {OUTCOME_SLIDES_TAMILNADU.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSlideIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === slideIndex ? "bg-[#FF6366] w-6" : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};
