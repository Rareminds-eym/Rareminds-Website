import React from "react";
import { HeroBanner } from "../../../components/Academy/Project/naanMudhalvan/HeroBanner";
import { Stats } from "../../../components/Academy/Project/naanMudhalvan/Stats";
import { Future } from "../../../components/Academy/Project/naanMudhalvan/Future";
import { CallToAction } from "../../../components/Academy/Project/naanMudhalvan/CallToAction";
import { CourseSection } from "../../../components/Academy/Project/naanMudhalvan/CourseSection";
import { naamMudhalvanCourses, otherCourses } from "../../../components/Academy/Project/Data/mockCourses";
import { Timeline } from "../../../components/Academy/Project/naanMudhalvan/Timeline";
import { MapSection } from "../../../components/Academy/Project/naanMudhalvan/MapSection";
import { Header } from "../../../components/Academy/Project/naanMudhalvan/Header";
import { Calendar, LucideProps, MapPin, Users } from "lucide-react";
import { Disclaimer } from "../../../components/Academy/Project/naanMudhalvan/Disclaimer";
import ClientsSection from "../../../components/Academy/Project/naanMudhalvan/ClientsSection";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";


type EventTimeline = {
  id: number;
  date: string;
  title: string;
  description: string;
  location: string;
  participants: number;
  icon: React.ComponentType<LucideProps>;
};

type PageData = {
  page: string;
  pname: string;
  description: string[];
  year: string;
  what_we_doing: string;
  event_time_line: EventTimeline[];
  take_the_next_step?: string;
  Take_the_next_step?: string;
};

function Naan() {
  const [data, setData] = useState<PageData[]>([
    {
      page: "nm_2024",
      pname: "Naan Mudhalvan 2024 Upskilling Program (Powered by Rareminds)",
      description: [
        "Rareminds, in collaboration with the Government of Tamil Nadu, proudly launches the Naan Mudhalvan 2024 Program—a flagship initiative designed to equip over 30,000 students with industry-specific skills across 18 specialized courses.",
        "This groundbreaking program bridges the gap between education and employability, empowering students to achieve their career aspirations while supporting the state’s vision for a skilled workforce.",
      ],
      year: "2024",
      what_we_doing: "What We have Achieved in 2024",
      event_time_line: [
        {
          id: 1,
          date: "March 2024",
          title: "Chennai Tech Hackathon",
          description:
            "Over 500 students participated in this 24-hour coding challenge",
          location: "Chennai",
          participants: 500,
          icon: Calendar,
        },
        {
          id: 2,
          date: "May 2024",
          title: "Coimbatore Innovation Summit",
          description: "Industry leaders shared insights with emerging talent",
          location: "Coimbatore",
          participants: 300,
          icon: Calendar,
        },
        {
          id: 3,
          date: "July 2024",
          title: "Madurai Tech Fest",
          description: "A celebration of technology and innovation",
          location: "Madurai",
          participants: 450,
          icon: Calendar,
        },
        {
          id: 4,
          date: "July 2024",
          title: "Madurai Tech Fest",
          description: "A celebration of technology and innovation",
          location: "Madurai",
          participants: 450,
          icon: Calendar,
        },
        {
          id: 5,
          date: "July 2024",
          title: "Madurai Tech Fest",
          description: "A celebration of technology and innovation",
          location: "Madurai",
          participants: 450,
          icon: Calendar,
        },
        {
          id: 6,
          date: "July 2024",
          title: "Madurai Tech Fest",
          description: "A celebration of technology and innovation",
          location: "Madurai",
          participants: 450,
          icon: Calendar,
        },
        {
          id: 7,
          date: "July 2024",
          title: "Madurai Tech Fest",
          description: "A celebration of technology and innovation",
          location: "Madurai",
          participants: 450,
          icon: Calendar,
        },
        {
          id: 8,
          date: "July 2024",
          title: "Madurai Tech Fest",
          description: "A celebration of technology and innovation",
          location: "Madurai",
          participants: 450,
          icon: Calendar,
        },
        {
          id: 9,
          date: "July 2024",
          title: "Madurai Tech Fest",
          description: "A celebration of technology and innovation",
          location: "Madurai",
          participants: 450,
          icon: Calendar,
        },
      ],
      take_the_next_step: "",
    },
    {
      page: "nm_2025",
      pname: "Naan Mudhalvan 2025 Upskilling Program (Powered by Rareminds)",
      description: [
        "Rareminds, in collaboration with the Government of Tamil Nadu, proudly launches the Naan Mudhalvan 2025 Program—a flagship initiative designed to equip over 30,000 students with industry-specific skills across 18 specialized courses.",
        "This groundbreaking program bridges the gap between education and employability, empowering students to achieve their career aspirations while supporting the state’s vision for a skilled workforce.",
      ],
      year: "2025",
      what_we_doing: "What We're Doing in 2025",
      event_time_line: [],
      Take_the_next_step: "",
    },
  ]);
  console.log(data);
  const { name } = useParams();
  console.log(name);
  const pageData = data.find((pageDetails: PageData) => pageDetails.page === name || pageDetails.pname === name);
  
  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="mb-4">The requested project {name} does not exist.</p>
          <Link to="/academia/projects" className="text-blue-600 hover:text-blue-800">
            View All Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* <Header /> */}
      <HeroBanner hero_data={pageData} />
      <div className="max-w-2xl mx-auto my-8">
        <Disclaimer />
      </div>

      {/* <div className="max-w-6xl mx-auto my-8 px-4">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
            alt="Team collaboration"
            className="rounded-lg shadow-lg object-cover w-full aspect-4/3"
          />
        </div>
        <div className="w-full md:w-1/2">
          <Disclaimer />
        </div>
      </div>
    </div> */}
      <Stats />
      <Future f_data={pageData} />
      <CourseSection
        title="Naan Mudhalvan Courses"
        description="Explore our specialized courses designed to enhance your skills and career prospects."
        courses={naamMudhalvanCourses}
      />
      {/* <CourseSection
      title="Other Courses"
      description="Discover additional learning opportunities to broaden your expertise."
      courses={otherCourses}
    />  
    {pageData?.event_time_line?.length > 0 ? <Timeline t_data={pageData}/>: <></>}
    <MapSection /> */}


    <ClientsSection/>
    

      <CallToAction />
    </div>
  );
}

export default Naan;

