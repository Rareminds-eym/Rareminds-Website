import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import TechnicalHiring from "@/assets/corporate/Home/services/TechnicalHiring.svg";
import BulkHiring from "@/assets/corporate/Home/services/BulkHiring.svg";
import LeadershipHiring from "@/assets/corporate/Home/services/LeadershipHiring.svg";
import Behavioral from "@/assets/corporate/Home/services/Behavioral-CultureFitAssessments.svg";
import ProjectBasedHiring from "@/assets/corporate/Home/services/Project-BasedHiring.svg";
import RPO from "@/assets/corporate/Home/services/RPO.svg";
import Campus from "@/assets/corporate/Home/services/Campus.svg";
import psychometrictesting from "@/assets/corporate/Home/services/psychometrictesting.svg";
import DiversityHiring from "@/assets/corporate/Home/services/DiversityHiring.svg";
import TalentMapping from "@/assets/corporate/Home/services/TalentMapping.svg";
import Interview from "@/assets/corporate/Home/services/Interview-as-a-Service.svg";
import OnboardingSupport from "@/assets/corporate/Home/services/OnboardingSupport.svg";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const ServicesSection = () => {
  const services = [
    {
      icon: TechnicalHiring,
      title: "Technical Hiring",
      link: "technical-hiring",
      heading: "Build Tech Teams That Deliver",
      subheading:
        "Hire top developers, engineers, and IT experts with precision.",
      industries: "IT, Mechanical, EdTech, Energy",
    },
    {
      icon: BulkHiring,
      title: "Bulk Hiring",
      link: "bulk-hiring",
      heading: "Scale Fast Without Compromising Quality",
      subheading: "Volume hiring solutions for fast-paced growth.",
      industries: "Hospitality, Agriculture, Retail, BPO",
    },
    {
      icon: LeadershipHiring,
      title: "Leadership Hiring",
      link: "leadership-hiring",
      heading: "Hire Leaders Who Transform",
      subheading: "Executive search for growth-driven organizations.",
      industries: "Pharma, IT, Energy, EdTech",
    },
    {
      icon: Behavioral,
      title: "Behavioral & Culture Fit Assessments",
      link: "behavioral-culture-fit-assessments",
      heading: "Hire for Attitude. Train for Skills.",
      subheading: "Make data-driven hiring decisions beyond the resume.",
      industries: "All industries",
    },
    {
      icon: ProjectBasedHiring,
      title: "Project-Based Hiring",
      link: "project-based-hiring",
      heading: "Agile Hiring for Agile Projects",
      subheading: "Get skilled experts when and where you need them.",
      industries: "IT, Pharma, EdTech, Manufacturing",
    },
    {
      icon: RPO,
      title: "RPO Services",
      link: "rpo-services",
      heading: "Recruitment, Reimagined",
      subheading: "We take charge of your hiring while you focus on growth.",
      industries: "IT, EdTech, Hospitality, Energy",
    },
    {
      icon: Campus,
      title: "Campus Hiring",
      link: "campus-hiring",
      heading: "Future-Proof Your Workforce",
      subheading: "Recruit top campus talent from across India.",
      industries: "IT, EdTech, Pharma, AgriTech",
    },
    {
      icon: psychometrictesting,
      title: "Psychometric Testing",
      link: "psychometric-testing",
      heading: "Hire Smarter With Science",
      subheading:
        "Evaluate beyond skills with cognitive and personality assessments.",
      industries: "All industries",
    },
    {
      icon: DiversityHiring,
      title: "Diversity Hiring",
      link: "diversity-hiring",
      heading: "Build Inclusive Teams That Thrive",
      subheading: "We help you meet your DEI goals.",
      industries: "All sectors",
    },
    {
      icon: TalentMapping,
      title: "Talent Mapping",
      link: "talent-mapping",
      heading: "See the Talent Before You Need It",
      subheading: "Market intelligence to fuel your future workforce.",
      industries: "Pharma, IT, Manufacturing, Energy",
    },
    {
      icon: Interview,
      title: "Interview-as-a-Service",
      link: "interview-as-a-service",
      heading: "Outsource Your Interviews to Experts",
      subheading:
        "Panel-driven, structured, and efficient candidate evaluation.",
      industries: "IT, EdTech, Pharma",
    },
    {
      icon: OnboardingSupport,
      title: "Pre-Onboarding Support",
      link: "pre-onboarding-support",
      heading: "From Offer to Office – Seamlessly",
      subheading: "Keep candidates engaged until Day 1.",
      industries: "All industries",
    },
  ];

  return (
    <section className="section relative bg-white">
      {/* Background elements */}
      <div className="absolute inset-0 bg-white z-0"></div>
      <div className="absolute w-full h-full bg-[url('https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Services/bg.webp')] bg-center bg-cover opacity-[0.03]">
      </div>

      <div className="max-w-[1300px] mx-auto relative z-10 py-20">
        <div className="text-center mb-12 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center items-center">
              <div className="bg-corporate-black text-white w-16 h-16 rounded-[25px] mx-auto mb-4 flex items-center justify-center transform rotate-6">
                <Briefcase size={32} />
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-corporate-black">
              Services We Offer
            </h2>
            <p className="text-corporate-grey max-w-3xl mx-auto">
              At Rareminds, we provide precision recruitment solutions tailored
              for fast-growing companies, enterprise teams, and industry
              leaders.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10">
          {services.map((service, index) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
              className="relative"
              key={index}
            >
              <div className="relative h-[230px]">
                <Link to={`/corporate/services/${service.link}`}>
                  <div className="mx-auto w-max relative group">
                    <div className="absolute flex items-center top-1/2 left-1/2 -translate-x-1/2 w-max group-hover:top-0 group-hover:left-0 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
                      <div className="h-[50px] w-[50px] group-hover:h-[42px] group-hover:w-[42px] p-2 bg-corporate-yellow rounded-[15px] transition-all duration-300">
                        <img src={service.icon} />
                      </div>
                      <h3 className="ml-3 font-semibold text-lg max-w-[225px] leading-5 text-center group-hover:text-left transition-all duration-300">
                        {service.title}
                      </h3>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:block absolute top-[80px] left-[30px] max-w-[320px]">
                      <p className="font-[500]">{service.heading}</p>
                      <p className="text-corporate-grey mt-1 leading-5 text-sm">
                        {service.subheading}
                      </p>
                    </div>
                    <div className="flex opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-[30px] left-[30px]  leading-5 text-[12px] max-w-[320px]">
                      <p className="min-w-max font-semibold">Key Industries:</p>
                      <p className="ml-1">{service.industries}</p>
                    </div>
                    <div className="pt-1 w-max">
                      <img
                        src="https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Services/service-bg.png"
                        alt="Curved Background"
                        className="w-"
                        width="384"
                        height={230}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 + services.length * 0.08 }}
          className="mt-16 text-center flex justify-center"
        >
          <button
            className="corporate-btn-1"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            type="button"
          >
            Try us on your toughest role{' '}
            <Icon
              icon="cil:arrow-right"
              height={20}
              width={20}
              className="ml-2"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
