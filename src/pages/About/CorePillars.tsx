import React, {useEffect} from "react";
import { FiCheckCircle, FiUsers, FiTrendingUp, FiShield, FiGitBranch } from "react-icons/fi";
import CorePilars from "../../assets/our core pillar.webp"
const CoreFeatures: React.FC = () => {
   useEffect(() => {
    const lines = document.querySelectorAll<SVGPathElement | SVGLineElement>(
      ".animated-draw"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-now");
          } else {
            entry.target.classList.remove("animate-now");
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% visible
    );

    lines.forEach((line) => observer.observe(line));

    return () => observer.disconnect();
  }, []);
  return (
    <div 
      className="relative flex flex-col items-center justify-center min-h-screen py-12 overflow-hidden bg-section-with-opacity"
    >
      {/* === Inline Animation Styles === */}
     <style>{`
  .bg-section-with-opacity::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
     background-image: url(${CorePilars});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.04;
    z-index: 0;
  }

  @keyframes drawLine {
    0% { stroke-dashoffset: var(--path-length); }
    100% { stroke-dashoffset: 0; }
  }

  .animated-draw {
    stroke: black;
    stroke-width: 1;
    fill: none;
    stroke-dasharray: var(--path-length);
    stroke-dashoffset: var(--path-length);
    transition: stroke-dashoffset 1s ease;
  }

  .animate-now {
    animation: drawLine 3s ease-in-out forwards;
  }

  .card-hover {
    transition: all 0.1s ease;
  }

  .card-hover:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    border-color: #1D8DA1;
  }
/* ✅ Only hide on mobile, not tablets */
  @media (max-width: 767.98px) {
    .desktop-diagram { display: none; }
  }
`}</style>

      {/* ===== Heading Section ===== */}
      <div className="relative z-10 text-center mb-20 px-4 -mt-4 sm:mt-10">
  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
    Our Core Pillars Of The Ecosystem
  </h1>
</div>


      {/* ===== Desktop Diagram ===== */}
     {/* ===== Desktop Diagram ===== */}
      <div className="desktop-diagram relative w-full max-w-[1300px] h-[700px] mx-auto px-4 lg:scale-100 md:scale-75 transition-all duration-300 mt-12 lg:mt-12 md:-mt-8">

        {/* === Center Card === */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative w-[300px] h-[120px]">
            <svg
  className="
    absolute 
    left-[-15px] 
    top-[2px] 
    lg:top-[2px]
    lg:left-[-15px]
    md:left-[-10px] 
    sm:left-[-5px] 
    sm:top-[4px] 
    z-0 
    scale-y-[-1] 
    scale-x-[-1] 
    w-[8.5vw] 
    md:w-[12vw] 
    max-w-[110px] 
    h-auto
  "
  viewBox="0 0 116 111"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="xMidYMid meet"
>
  <path
    d="M0.00239916 0.500031L60.9935 0.60277C90.9543 0.653238 
       115.182 24.8693 115.242 54.8242C115.302 85.0699 
       90.7166 109.658 60.465 109.607L0.218569 109.505"
    stroke="black"
  />
</svg>
            <svg
  className="
    absolute 
    right-[-15px] 
    top-[3px] 
    lg:right-[-21px]
    lg:top-[5px]
    xl:right-[-15px]
    xl:top-[3px]
    md:right-[-10px] 
    sm:right-[-5px] 
    sm:top-[5px] 
    z-0 
    scale-x-[-1] 
    rotate-180 
    scale-y-[-1] 
    w-[8.5vw] 
    md:w-[12vw] 
    max-w-[110px] 
    h-auto
  "
  viewBox="0 0 116 111"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="xMidYMid meet"
>
  <path
    d="M0.00239916 0.500031L60.9935 0.60277C90.9543 0.653238 
       115.182 24.8693 115.242 54.8242C115.302 85.0699 
       90.7166 109.658 60.465 109.607L0.218569 109.505"
    stroke="black"
  />
</svg>

            <div className="relative bg-gradient-to-tr bg-[#1D8AD1] rounded-[55px] h-[85px] lg:h-[85px] md:h-[70px] top-4 lg:top-4 md:top-3 sm:top-4 flex items-center justify-center shadow-md card-hover">
              <div className="text-center text-white font-semibold">
                <div className="text-[22px] lg:text-[22px] md:text-[21px] leading-none -mt-2 gap-1">What</div>
                <div className="text-[22px] lg:text-[22px] md:text-[21px]  leading-none">We Do</div>
              </div>
            </div>
          </div>
        </div>

        {/* === Top Center === */}
        <div className="absolute top-[-3%] lg:top-[-3%] left-1/2 md:top-[-9%]      /* ⬆️ moves both icon & card upward on tablet view */
  -translate-x-1/2">
          <div className="absolute -top-[70px] left-1/2 -translate-x-1/2 
            w-[60px] h-[60px] rounded-xl bg-gradient-to-tr 
            bg-neutral-950  flex items-center justify-center shadow-md">
            <FiCheckCircle className="text-white text-3xl" />
          </div>
          <div className="w-[300px] bg-white border-2 border-black rounded-2xl 
            p-4 shadow-md text-center card-hover">
            <h3 className="text-lg font-bold">Training & Development</h3>
            <p className="text-sm text-gray-600 mt-2">
              Tailored programs for schools, colleges, corporates, and governments — aligned to future skills and industry needs.
            </p>
          </div>
        </div>
        <svg
  className="
    absolute 
    left-1/2 
    top-[-230px] 
    lg:top-[-230px]
    md:top-[-250px]
    -translate-x-1/2 
    delay-1 
    h-[155px]          /* default for desktop */
    md:h-[900px]       /* ⬆️ increased height for tablets */
  "
  style={{ ["--path-length" as any]: 175 }}
  width="2"
  viewBox="0 0 2 175"
  xmlns="http://www.w3.org/2000/svg"
>
  <line x1="1" y1="0" x2="1" y2="175" className="animated-draw" />
</svg>


        {/* === Top Left === */}
        <div className="absolute top-[15%] left-[9%] lg:top-[17%] xl:top-[15%] md:top-[16%] lg:left-[5%] xl:left-[9%]
   md:left-[-6%]">
          <div className="absolute -top-[70px] left-1/2 -translate-x-1/2 
            w-[70px] h-[60px] rounded-xl bg-gradient-to-tr 
            bg-neutral-950  flex items-center justify-center shadow-md">
            <FiUsers className="text-white text-3xl" />
          </div>
          <div className="w-[300px] bg-white border-2 border-black rounded-2xl 
            p-4 shadow-md text-center card-hover">
            <h3 className="text-lg font-bold">Recruitment & Career Pathways</h3>
            <p className="text-sm text-gray-600 mt-2">
              Linking skilled learners to jobs and internships through a structured placement network.
            </p>
          </div>
        </div>
       <svg
  className="
    absolute 
    top-[190px] 
    left-[360px] 
    lg:left-[319px]
    lg:top-[190px] 
    xl:left-[360px]
    xl:top-[190px] 
    md:left-[210px] 
    md:top-[190px] 
    sm:left-[180px] 
    delay-2 
    w-[15vw] 
    md:w-[20vw]       /* ⬆ wider for tablets = taller appearance */
    max-w-[270px] 
    h-auto 
    md:h-[200px]
  "
  style={{ ["--path-length" as any]: 320 }}
  viewBox="0 0 254 48"
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="xMidYMid meet"
>
  <path
    d="M253.5 47.427L253.5 33.9571C253.5 25.6729 246.784 18.9572 
       238.5 18.9571L15.5 18.9567C7.21571 18.9567 0.5 12.241 0.5 3.95672L0.5 0"
    className="animated-draw"
  />
</svg>

        {/* === Top Right === */}
        <div className="absolute top-[19%] right-[9%] lg:top-[19%] md:top-[17%] lg:right-[5%] xl:right-[9%]
   md:right-[-5%]">
          <div className="absolute -top-[70px] left-1/2 -translate-x-1/2 
            w-[60px] h-[60px] rounded-xl bg-gradient-to-tr 
            bg-neutral-950  flex items-center justify-center shadow-md">
            <FiTrendingUp className="text-white text-3xl" />
          </div>
          <div className="w-[300px] bg-white border-2 border-black rounded-2xl 
            p-4 shadow-md text-center card-hover">
            <h3 className="text-lg font-bold">Skill Passport</h3>
            <p className="text-sm text-gray-600 mt-2">
              A digital portfolio that tracks every learner’s growth, certification, and employability readiness.
            </p>
          </div>
        </div>
    <svg
  className="
    absolute 
    top-[260px] 
    right-[360px] 
    lg:right-[305px] 
    md:right-[210px] 
    xl:right-[360px] 
    xl:bottom-[210px]
    md:top-[90px]
    sm:right-[190px] 
    scale-x-[-1] 
    delay-3 
    w-[15vw] 
    md:w-[20vw]       /* ⬆ wider for tablets = taller appearance */
    
    max-w-[270px] 
    h-auto 
    md:h-[400px]
  "
  style={{ ["--path-length" as any]: 320 }}
  viewBox="0 0 254 48"
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="xMidYMid meet"
>
  <path
    d="M253.5 47.427L253.5 33.9571C253.5 25.6729 246.784 18.9572 
       238.5 18.9571L15.5 18.9567C7.21571 18.9567 0.5 12.241 0.5 3.95672L0.5 0"
    className="animated-draw"
  />
</svg>


        {/* === Bottom Left === */}
        <div className="absolute bottom-[17%] left-[9%] lg:bottom-[17%] lg:left-[5%] xl:left-[9%]   /* large screens */
    md:bottom-[21%] md:left-[-6%]">
          <div className="absolute -top-[70px] left-1/2 -translate-x-1/2 
            w-[60px] h-[60px] rounded-xl bg-gradient-to-tr 
             bg-neutral-950  flex items-center justify-center shadow-md">
            <FiShield className="text-white text-3xl" />
          </div>
          <div className="w-[300px] bg-white border-2 border-black rounded-2xl 
            p-4 shadow-md text-center card-hover">
            <h3 className="text-lg font-bold">360° Learning Framework</h3>
            <p className="text-sm text-gray-600 mt-2">
              Integrated model connecting training, assessment, mentoring, and placement for holistic outcomes.
            </p>
          </div>
        </div>
   <svg
  className="
    absolute 
    bottom-[180px] 
    left-[380px] 
    lg:left-[316px] 
    lg:bottom-[180px]
    xl:left-[360px] 
    xl:bottom-[180px]
    md:left-[210px] 
    md:bottom-[200px]
    sm:left-[180px] 
    delay-4 
    w-[15vw] 
    md:w-[20vw]       /* ⬆ wider for tablets = taller appearance */
    max-w-[270px] 
    h-auto 
    md:h-[200px] 
  "
  style={{ ["--path-length" as any]: 400 }}
  viewBox="0 0 255 67"
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="xMidYMid meet"
>
  <path
    d="M254.105 0.0198917L254.417 7.83847C254.757 16.3506 
       247.948 23.4366 239.429 23.4366L15.5 23.4366C7.2157 
       23.4366 0.5 30.1524 0.5 38.4366L0.5 66.1697"
    className="animated-draw"
  />
</svg>


        {/* === Bottom Right === */}
        <div className="absolute bottom-[18%] right-[9%] lg:bottom-[18%] lg:right-[5%] xl:right-[9%]
    md:bottom-[22%] md:right-[-5%]">
          <div className="-mb-2">
            <div className="absolute -top-[70px] left-1/2 -translate-x-1/2 
              w-[60px] h-[60px] rounded-xl bg-gradient-to-tr 
               bg-neutral-950  flex items-center justify-center shadow-md">
              <FiGitBranch className="text-white text-2xl" />
            </div>
            <div className="w-[300px] bg-white border-2 border-black rounded-2xl 
              p-4 shadow-md text-center card-hover">
              <h3 className="text-lg font-bold">Innovation & Hackathons</h3>
              <p className="text-sm text-gray-600 mt-2">
               Real-world challenges that inspire problem solving and build leadership skills in students..
              </p>
            </div>
          </div>
        </div>
       <svg
        className="
          absolute 
          bottom-[250px] 
          right-[370px] 
          lg:right-[313px] 
          lg:bottom-[200px]
          xl:right-[370px] 
          xl:bottom-[200px]
          md:right-[220px] 
          md:bottom-[220px]
          sm:right-[180px] 
          scale-x-[-1] 
          delay-5 
          w-[15vw] 
          max-w-[270px] 
          md:w-[20vw] 
          h-auto
          md:h-[160px]
        "
        style={{ ["--path-length" as any]: 400 }}

        viewBox="0 0 255 67"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        
        <path
          d="M254.105 0.0198917L254.417 7.83847C254.757 16.3506 
             247.948 23.4366 239.429 23.4366L15.5 23.4366C7.2157 
             23.4366 0.5 30.1524 0.5 38.4366L0.5 66.1697"
          className="animated-draw"
        />
      </svg>
      </div>

      {/* ===== Mobile Version (No SVGs) ===== */}
      {/* ===== Mobile Version (Icons + Cards, No SVGs) ===== */}
      <div className = "mb-7">
<div className="flex flex-col items-center justify-center space-y-12 px-6 md:hidden">
  {[
    {
      icon: <FiCheckCircle className="text-white text-2xl" />,
      title: "Training & Development",
      desc: "ailored programs for schools, colleges, corporates, and governments — aligned to future skills and industry needs.",
    },
    {
      icon: <FiUsers className="text-white text-2xl" />,
      title: "Recruitment & Career Pathways",
      desc: "Linking skilled learners to jobs and internships through a structured placement network.",
    },
    {
      icon: <FiShield className="text-white text-2xl" />,
      title: "Innovation & Hackathons",
      desc: "Real-world challenges that inspire problem solving and build leadership skills in students..",
    },
    {
      icon: <FiTrendingUp className="text-white text-2xl" />,
      title: "Skill Passport",
      desc: "A digital portfolio that tracks every learner’s growth, certification, and employability readiness.",
    },
    {
      icon: <FiGitBranch className="text-white text-2xl" />,
      title: "360° Learning Framework",
      desc: "Integrated model connecting training, assessment, mentoring, and placement for holistic outcomes.",
    },
  ].map((item, i) => (
    <div key={i} className="relative flex flex-col items-center">
      {/* === Icon above card === */}
      <div className="absolute -top-[37px] w-[60px] h-[60px] rounded-xl bg-gradient-to-tr bg-neutral-950 flex items-center justify-center shadow-md">
        {item.icon}
      </div>

      {/* === Card === */}
      <div className="w-[300px] bg-white border-2 border-black rounded-2xl p-4 shadow-md text-center mt-[36px] card-hover">
        <h3 className="text-lg font-bold text-black">{item.title}</h3>
        <p className="text-sm text-gray-600">{item.desc}</p>
      </div>
    </div>
  ))}
</div>
</div>
    </div>
  );
};

export default CoreFeatures;