import React from "react";
import FullScreenCarousel from "../../components/Corporate/Home/Carousel/FullScreenCarousel";
import WhyRareminds from "@/components/Corporate/Home/whyRM/WhyRareminds";

const Corporate: React.FC = () => {
  const slides = [
    {
      heading: "<span class='corporate-heading-highlight'>Don’t Just Hire.</span> <br>Build High-Performing Teams",
      subheading:
        "Smart, scalable recruitment solutions trusted by 250+ corporates",
      img: "/Corporate/Images/Home/Hero/BuildHigh.webp",
    },
    {
      heading: "From Bulk to Boardroom <br><span class='corporate-heading-highlight'>One Partner.</span> Zero Compromise",
      subheading: "Technical hiring, leadership search, and everything in between — done right",
      img: "/Corporate/Images/Home/Hero/OnePartner.webp",
    },
    {
      heading: "When <span class='corporate-heading-highlight'>Time-to-Hire Matters,</span> <br>So Does Who You Hire With",
      subheading: "Rareminds delivers role-fit talent with speed, accuracy, and accountability",
      img: "/Corporate/Images/Home/Hero/Time-to-Hire.webp",
    },
    {
      heading: "<span class='corporate-heading-highlight'>Your Toughest Role?</span> <br>Filled Faster Than You’d Believe",
      subheading: "From CXOs to coders — precision hiring that drives business outcomes",
      img: "/Corporate/Images/Home/Hero/ToughestRole.webp",
    },
    {
      heading: "<span class='corporate-heading-highlight'>500+ Critical Roles</span> Closed This Quarter. <br>Yours Could Be Next",
      subheading: "Partner with the recruitment team built for performance and outcomes",
      img: "/Corporate/Images/Home/Hero/CriticalRoles.webp",
    },
  ];

  return (
    <>
      <section className="bg-[url('/Corporate/Images/Home/Hero/header-bg.webp')]">
        <FullScreenCarousel slides={slides} />
      </section>

      <div id="why-rareminds">
          <WhyRareminds />
        </div>
    </>
  );
};

export default Corporate;
