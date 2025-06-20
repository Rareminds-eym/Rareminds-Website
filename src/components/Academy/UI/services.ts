// export interface ServiceData {
//     id: string;
//     name: string;
//     headline: string;
//     subtext: string;
//     illustration: string;
//     color: string;
//   }
  
//   export const services: ServiceData[] = [
//     {
//       id: "design",
//       name: "Design",
//       headline: "Design Your Vision",
//       subtext: "Expert-led design sessions to bring your ideas to life",
//       illustration: "/placeholder.svg",
//       color: "bg-blue-500"
//     },
//     {
//       id: "development",
//       name: "Development",
//       headline: "Develop Your Skills",
//       subtext: "Learn cutting-edge development techniques from industry leaders",
//       illustration: "/placeholder.svg",
//       color: "bg-purple-500"
//     },
//     {
//       id: "marketing",
//       name: "Marketing",
//       headline: "Market Your Brand",
//       subtext: "Discover powerful marketing strategies that drive results",
//       illustration: "/placeholder.svg",
//       color: "bg-pink-500"
//     },
//     {
//       id: "data",
//       name: "Data Science",
//       headline: "Harness Your Data",
//       subtext: "Transform data into actionable insights and opportunities",
//       illustration: "/placeholder.svg",
//       color: "bg-green-500"
//     },
//     {
//       id: "business",
//       name: "Business",
//       headline: "Grow Your Business",
//       subtext: "Build sustainable business practices for long-term success",
//       illustration: "/placeholder.svg",
//       color: "bg-yellow-500"
//     }
//   ];
type ServiceData = {
    id: string;
    name: string;
    headline: string;
    subtext: string;
    illustration: string;
    alt: string;
};

const services: ServiceData[] = [
    {
      id: "design",
      name: "Schedule Your TDP",
      headline: "“Teach the Future, Not the Past”",
      subtext: "Train in NEP, Digital Pedagogy & Emotional Intelligence",
      illustration: "/academy/herobanner/1.png",
      alt: "Teachers delivering NEP-aligned subject instruction in a classroom focused on academic improvement through Rareminds programs",
    },
    {
      id: "development",
      name: "Download TDP Calendar",
      headline: "“From Chalkboards to GPT:\nAre You Ready?”",
      subtext: "Upgrade to AI-integrated teaching",
      illustration: "/academy/herobanner/2.png",
      alt: "Educators participating in Rareminds-led teacher training focused on digital tools, pedagogy, and professional growth",
    },
    {
      id: "marketing",
      name: "Explore Leadership Series",
      headline: "“A Principal’s Vision\nShapes a School’s Future.”",
      subtext: "Strategic leadership programs for HoDs & Principals",
      illustration: "/academy/herobanner/3.png",
      alt: "Students engaged in communication and life skills training sessions designed to build confidence and workplace readiness",
    },
    {
      id: "data",
      name: "Get Certified",
      headline: "“Tech Won’t Replace Teachers,\nTeachers Who Use Tech Will”",
      subtext: "Learn to integrate LMS, digital tools & hybrid teaching",
      illustration: "/academy/herobanner/4.png",
      alt: "Students discussing real-world topics through group activities and news-based learning as part of awareness-building modules",
    },
    {
      id: "business",
      name: "Join Emotional Intelligence Training",
      headline: "“Empathy is a Superpower\nin Every Classroom.”",
      subtext: "Build emotional intelligence and inclusive practices",
      illustration: "/academy/herobanner/5.png",
      alt: "Young learners exploring phonics, storytelling, and classroom games as part of Rareminds’ foundational skills enrichment program",
    }
];
  
export { services, type ServiceData };