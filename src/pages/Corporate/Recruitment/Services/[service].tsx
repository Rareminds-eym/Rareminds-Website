import ComingSoon from "@/pages/ComingSoon";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useRecruitmentService } from "@/hooks/useRecruitmentService";

const Service: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const services = useRecruitmentService();
  const foundService = services.find(
    (s) => s.link && s.link.toLowerCase() === String(name).toLowerCase()
  );

  if (!foundService) {
    return <ComingSoon />;
  }

  return (
    <section className="w-full corporate-full-screen-h flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Services/bg.webp')] bg-cover bg-center opacity-[0.03] z-0" />
      <div className="corporate-container">
        <nav
          aria-label="Breadcrumb"
          className="relative z-20 w-full mt-6 mb-4 px-0"
        >
          <ol className="flex gap-2 flex-wrap text-[#727272] text-sm">
            <li>
              <Link to="/corporate" className="hover:underline">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/corporate#services" className="hover:underline">
                Services
              </Link>
            </li>
            <li>/</li>
            <li aria-current="page">
              <span className="text-black font-semibold">
                {foundService.title}
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="corporate-container grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-10 z-10 w-full h-full mt-8 lg:mt-0 items-center">
        <div className="flex flex-col justify-center items-center lg:items-start my-auto z-10 text-center lg:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-corporate-black mb-6 drop-shadow-lg">
            {foundService.title}
          </h1>
          <p className="text-base md:text-xl text-gray-700 mb-8 max-w-2xl ">
            {foundService.title_desc}
          </p>
          {foundService.title_cta && (
            <button className="corporate-btn-1">
              {foundService.title_cta}
            </button>
          )}
        </div>
        <div className="flex justify-center items-center h-full z-0">
          {foundService.title_img && (
            <img
              src={foundService.title_img}
              alt={foundService.title}
              className="lg:absolute bottom-0 right-0 w-full lg:scale-110 origin-bottom-right max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl object-contain mx-auto"
              loading="lazy"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Service;
