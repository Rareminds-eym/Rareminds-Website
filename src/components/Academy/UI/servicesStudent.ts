type ServiceData = {
    id: string;
    name: string;
    headline: string;
    subtext: string;
    illustration: string;
    color: string;
    alt: string;
  };
  
  const servicesStudent: ServiceData[] = [
    {
      id: "design",
      name: "Talk to a Career Mentor",
      headline: "Turn Your Degree into a Career.",
      subtext: "1000+ students trained. Real companies. Real results.",
      illustration: "/academy/herobanner/6.png",
      color: "",
      alt: "Students participating in an interactive session to build English fluency and public speaking skills with Rareminds"
    },
    {
      id: "development",
      name: "Start Speaking Smart",
      headline: "English Isn’t Just a Subject.\nIt’s Your Superpower.",
      subtext: "Spoken English, Public Speaking, and Confidence Bootcamps",
      illustration: "/academy/herobanner/7.png",
      color: "",
      alt: "Students working on laptops during a coding or digital tools workshop focused on building 21st-century tech skills"
    },
    {
      id: "marketing",
      name: "Download Program Sheet",
      headline: "Jobs Don’t Come With Instructions.\nWe Train You for Them.",
      subtext: "120-hour Employability Skills Program",
      illustration: "/academy/herobanner/8.png",
      color: "",
      alt: "Students exploring career paths, aptitude tests, and guidance tools as part of Rareminds’ career mapping and readiness modules"
    },
    {
      id: "data",
      name: "Explore EEE Training",
      headline: "Entrepreneurship Starts Young.",
      subtext: "Learn how to build your own brand — even in school",
      illustration: "/academy/herobanner/9.png",
      color: "",
      alt: "Students collaborating on business ideas or startup models during a hands-on entrepreneurship training session"
    },
    {
      id: "business",
      name: "Get My Blueprint",
      headline: "Guessing Your Career Is Risky.\nPlanning It Isn’t.",
      subtext: "Career Counseling Blueprint with psychometrics & roadmaps",
      illustration: "/academy/herobanner/GuessingYourCareerIsRisky.PlanningItIsn’t.png",
      color: "",
      alt: "Students presenting projects or participating in a school-level hackathon designed to foster problem-solving and creativity"
    }
  ];
  
  export { servicesStudent, type ServiceData };