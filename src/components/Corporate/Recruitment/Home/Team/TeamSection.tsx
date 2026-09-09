import { motion } from "framer-motion";
import { Linkedin, Users } from "lucide-react";
import { Link } from "react-router-dom";

const missionBubbleClasses =
  "absolute pt-6 sm:pt-10 min-[640px]:pt-8 md:pt-9 lg:pt-[50px] top-0 px-3 min-[520px]:px-6 min-[640px]:px-7 md:px-6 lg:px-5 w-full h-[200px] sm:h-[170px] min-[640px]:h-[150px] md:h-[160px] lg:h-[200px] opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden";

const imageWrapperClasses =
  "absolute bottom-[-20px] min-[400px]:bottom-[-25px] min-[520px]:bottom-[-45px] min-[640px]:bottom-[-85px] md:bottom-[-65px] lg:bottom-[-100px] scale-[.92] min-[400px]:scale-95 min-[520px]:scale-90 min-[640px]:scale-[.85] md:scale-105 lg:scale-150";

const teamMembers = [
  {
    name: "Visakh Madhu",
    photo: "https://media.rareminds.in/Visakh.webp",
    designation: "Director HR",
    linkedin: "https://www.linkedin.com/in/visakh-madhu-6599b614a/",
    mission: "Help business succeed by aligning people and strategy.",
    bg: "bg-[#EFDECD]",
  },
  {
    name: "Subiksha Karthikeyan",
    photo: "https://media.rareminds.in/Subiksha.webp",
    designation: "Talent Acquisition Executive",
    linkedin: "https://www.linkedin.com/in/subiksha-k/",
    mission: "Connecting exceptional talent with transformative opportunities.",
    bg: "bg-[#BFBFFF]",
  },
  {
    name: "Varalakshmi M",
    photo: "https://media.rareminds.in/Varalakshmi.webp",
    designation: "Recruitment Executive",
    linkedin: "https://www.linkedin.com/in/varalakshmi-m-183001278/",
    mission:
      "Rareminds connect the word professionals to make them more productive & Successful.",
    bg: "bg-[#E3DCD4]",
  },
  {
    name: "Krishna R",
    photo: "https://media.rareminds.in/Krishna.webp",
    designation: "Recruitment Executive",
    linkedin: "https://www.linkedin.com/in/krishna-r-003b5b260/",
    mission:
      "Building strong talent pipelines that contribute to the growth of our clients and Rareminds.",
    bg: "bg-[#D0F0C0]",
  },
  {
    name: "Swetha S",
    photo: "https://media.rareminds.in/Swetha.webp",
    designation: "Recruitment Executive",
    linkedin: "https://www.linkedin.com/in/swetha-s-191b782b6/",
    mission: "Turning hiring needs into the right talent, quickly and effectively.",
    bg: "bg-[#FFE789]",
  },
];

const TeamSection = () => {
  return (
    <section className="pb-[160px] pt-[60px] relative overflow-hidden object-none object-bottom bg-no-repeat bg-white">
      <div className="absolute flex w-full h-[100%] bg-[url(https://media.rareminds.in/team-bg.webp)] opacity-5"></div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center mb-4">
            <div className="bg-corporate-black text-white w-16 h-16 rounded-[25px] mx-auto mb-4 flex items-center justify-center transform rotate-6">
              <Users className="text-white" size={32} />
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-corporate-black">
            Meet the Minds Behind the Rareminds
          </h2>
          <p className="text-corporate-grey max-w-3xl mx-auto text-lg text-center mt-2">
            The talent advisors and recruitment specialists driving precision hiring for India’s leading enterprises.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-8 lg:gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative group lg:row-span-4 ${
                index % 2 === 1 ? "lg:row-start-2" : "lg:row-start-1"
              }`}
            >
              <div
                className={`relative ${member.bg} rounded-full flex flex-col h-[380px] min-[400px]:h-[400px] min-[520px]:h-[450px] sm:h-[480px] min-[640px]:h-[440px] md:h-[460px] lg:h-[500px] overflow-hidden group`}
              >
                <div className="p-5 min-[640px]:pt-3 flex flex-col group-hover:opacity-0 transition-all duration-300">
                  <p className="text-base min-[520px]:text-lg min-[640px]:text-base md:text-lg font-bold text-center mt-6 min-[520px]:mt-10 min-[640px]:mt-6">
                    {member.name.toUpperCase()}
                  </p>
                  <p className="mt-1 text-sm min-[520px]:text-base text-center">{member.designation}</p>
                </div>

                <div className={missionBubbleClasses}>
                  <p className="text-sm lg:text-base text-center font-bold">Mission</p>
                  <p className="mt-1 text-xs md:text-sm lg:text-base text-center leading-snug">{member.mission}</p>
                </div>

                <div className={imageWrapperClasses}>
                  <img
                    src={member.photo}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    className="grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
              <Link
                to={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Connect with ${member.name} on LinkedIn`}
                className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 text-center mt-2 w-min mx-auto"
              >
                <div className="bg-[#1F2937] w-min rounded-full p-3">
                  <Linkedin className="text-white" aria-hidden="true" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
