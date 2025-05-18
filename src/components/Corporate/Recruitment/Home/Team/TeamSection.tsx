import { motion } from "framer-motion";
import { Users, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Visakh Madhu",
    photo: "/Corporate/Images/Home/Team/Visakh.webp",
    designation: "Director HR",
    linkedin: "https://www.linkedin.com/in/visakh-madhu-6599b614a/",
    mission: "Help business succeed by aligning people and strategy.",
    bg: "bg-[#EFDECD]",
  },
  {
    name: "RONNIE Poulose",
    photo: "/Corporate/Images/Home/Team/Ronnie.webp",
    designation: "Head of Recruitment, BD & Delivery",
    linkedin: "https://www.linkedin.com/in/ronniepoulose/",
    mission:
      "Rareminds to reach Globally and to be a Pan India and International Brand.",
    bg: "bg-[#D0F0C0]",
  },
  {
    name: "Rohit Bhandiye",
    photo: "/Corporate/Images/Home/Team/Rohit.webp",
    designation: "Senior Recruiter",
    linkedin: "https://www.linkedin.com/in/rohit-bhandiye-267a0719/",
    mission: "Rareminds to be a Global Brand.",
    bg: "bg-[#FFE789]",
  },
  {
    name: "Subiksha Karthikeyan",
    photo: "/Corporate/Images/Home/Team/Subiksha.webp",
    designation: "Talent Acquisition Executive",
    linkedin: "https://www.linkedin.com/in/subiksha-k/",
    mission: "Connecting exceptional talent with transformative opportunities.",
    bg: "bg-[#BFBFFF]",
  },
  {
    name: "Varalakshmi M",
    photo: "/Corporate/Images/Home/Team/Varalakshmi.webp",
    designation: "Recruitment Executive",
    linkedin: "https://www.linkedin.com/in/varalakshmi-m-183001278/",
    mission:
      "Rareminds connect the word professionals to make them more productive & Successful.",
    bg: "bg-[#E3DCD4]",
  },
];

const TeamSection = () => {
  return (
    <section className="pb-[160px] pt-[60px] relative overflow-hidden object-none object-bottom bg-no-repeat bg-white">
      <div className="absolute flex w-full h-[100%] bg-[url(/Corporate/Images/Home/Team/team-bg.webp)] opacity-5"></div>

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
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative group lg:row-span-4 ${
                index % 2 == 1 ? "lg:row-start-2" : "lg:row-start-1"
              }`}
            >
              <div
                className={`relative ${member.bg} rounded-full flex flex-col h-[500px] overflow-hidden group`}
              >
                <div className="p-5 flex flex-col group-hover:opacity-0 transition-all duration-300">
                  <p className="text-lg font-bold text-center mt-10">
                    {member.name.toUpperCase()}
                  </p>
                  <p className="mt-1 text-center">{member.designation}</p>
                </div>

                <div className="absolute pt-[50px] top-0 p-5 w-full h-[200px] opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-center font-bold">Mission</p>
                  <p className="text-center">{member.mission}</p>
                </div>

                <div
                  className={`absolute ${
                    index == -1 ? "bottom-[-60px]" : "bottom-[-100px]"
                  } scale-150`}
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
              <Link
                to={member.linkedin}
                target="_blank"
                className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 text-center mt-2 w-min mx-auto"
              >
                <div className="bg-[#1F2937] w-min rounded-full p-3">
                  <Linkedin className="text-white" />
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
