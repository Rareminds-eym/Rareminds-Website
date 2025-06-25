import Counselling from "@/components/LandingPage/career-counselling";
import College from "@/components/LandingPage/college";
import Corporate from "@/components/LandingPage/corporate";
import Govt from "@/components/LandingPage/govt";
import School from "@/components/LandingPage/school";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
  const [partHover, setPartHover] = useState(false);
  const [activePart, setActivePart] = useState<UserType>("none");

  const [content, setContent] = useState([
    {
      heading: "Government collaborations",
      img: "2-crop.webp",
      path: "/government",
      description:
        "Collaborating on government skill development initiatives with customized training programs to uplift students beyond traditional curriculums.",
    },
    {
      heading: "Industries and firms",
      img: "1-crop.jpg",
      path: "/corporate/recruitment",
      description:
        "Revolutionizing the corporate world with tailored corporate training solutions and talent development to drive innovation and connect you with top talent.",
    },
    {
      heading: "School",
      img: "5-crop.webp",
      path: "/school",
      description:
        "Transforming education through innovative learning solutions and advanced curriculum design, fostering impactful educational institution partnerships.",
    },
    {
      heading: "Institutions network",
      img: "4-crop.png",
      path: "/institutions",
      description:
        "Bridging skill gaps and enhancing capabilities to create a future-ready workforce through transformative partnerships with colleges and universities.",
    },
    {
      heading: "Career counselling",
      img: "3-crop.jpg",
      path: "https://career.rareminds.in/",
      description:
        "Boosting career development with expert career counselling, employability skills, and personalized training for success.",
    },
  ]);

  const navigate = useNavigate();

  const redirectToPage = (slug: string) => {
    setTimeout(() => {
      localStorage.setItem("currentUserType", slug);
      navigate(`/${slug}`);
    }, 200);
  };

  const togglePartHover = (value: boolean) => {
    setPartHover(value);
  };

  return (
    <>
      <div className="hidden lg:block">
        <div className={`flex justify-center`}>
          <div className="relative flex w-min -translate-x-[25%] xxl:-translate-x-[25%] -mt-[40px] scale-75 xxl:-mt-5 xxl:scale-75">
            <Govt
              onAction={redirectToPage}
              overlayActive={togglePartHover}
              partHover={partHover}
              activePart={activePart}
              setActivePart={setActivePart}
              content={content[2]}
            />
            <Corporate
              onAction={redirectToPage}
              overlayActive={togglePartHover}
              partHover={partHover}
              activePart={activePart}
              setActivePart={setActivePart}
              content={content[1]}
            />
            <College
              onAction={redirectToPage}
              overlayActive={togglePartHover}
              partHover={partHover}
              setActivePart={setActivePart}
              content={content[3]}
              activePart={activePart}
            />
            <School
              onAction={redirectToPage}
              overlayActive={togglePartHover}
              partHover={partHover}
              setActivePart={setActivePart}
              content={content[0]}
              activePart={activePart}
            />
            <Counselling
              onAction={redirectToPage}
              overlayActive={togglePartHover}
              partHover={partHover}
              setActivePart={setActivePart}
              activePart={activePart}
              content={content[4]}
            />
          </div>
        </div>
        <div className="container flex justify-center mx-auto mt-[160px] pb-[80px]">
          <div className="max-w-[500px] xxl:max-w-[600px] -translate-x-[35%] xxl:-translate-x-[45%]">
            <h1 className="text-2xl font-semibold">
              Rareminds: Empowering Minds, Shaping Futures
            </h1>
            <p className="mt-3">
              At Rareminds, we transform potential into excellence through
              innovative talent acquisition, training, and consultation
              solutions. Bridging aspirations with achievements, we empower
              students, professionals, organizations, and academic institutions
              to unlock limitless possibilities and drive impactful growth.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="lg:hidden container px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-10">
          {content.map((item, i) => {
            const isExternal = item.path.startsWith("http");

            const CardContent = (
              <div
                className="h-[250px] bg-[#d5d5d5] rounded-2xl bg-cover bg-center relative overflow-hidden transition-transform hover:scale-[1.02]"
                style={{ backgroundImage: `url('/LandingPage/Brain/${item.img}')` }}
              >
                <div className="absolute bottom-0 bg-black/60 flex flex-col h-max justify-end p-4 text-white rounded-2xl">
                  <h2 className="text-xl font-semibold">{item.heading}</h2>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
            );

            return isExternal ? (
              <a
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                key={i}
              >
                {CardContent}
              </a>
            ) : (
              <Link to={item.path} key={i}>
                {CardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Index;
