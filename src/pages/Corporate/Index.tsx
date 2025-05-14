import React from "react";
import FullScreenCarousel from "../../components/Corporate/Home/Carousel/FullScreenCarousel";

const Corporate: React.FC = () => {
  const slides = [
    {
      heading: "Don’t Just Hire. <br>Build High-Performing Teams",
      subheading:
        "Smart, scalable recruitment solutions trusted by 250+ corporates",
      img: "/LandingPage/Brain/1-crop.jpg",
    },
    {
      heading: "From Bulk to Boardroom <br>One Partner. Zero Compromise",
      subheading: "Technical hiring, leadership search, and everything in between — done right",
      img: "/LandingPage/Brain/2-crop.jpg",
    },
    {
      heading: "When Time-to-Hire Matters, <br>So Does Who You Hire With",
      subheading: "Rareminds delivers role-fit talent with speed, accuracy, and accountability",
      img: "/LandingPage/Brain/3-crop.jpg",
    },
    {
      heading: "Your Toughest Role? <br>Filled Faster Than You’d Believe",
      subheading: "From CXOs to coders — precision hiring that drives business outcomes",
      img: "/LandingPage/Brain/3-crop.jpg",
    },
    {
      heading: "500+ Critical Roles <br>Closed This Quarter. <br>Yours Could Be Next",
      subheading: "Partner with the recruitment team built for performance and outcomes",
      img: "/LandingPage/Brain/3-crop.jpg",
    },
  ];

  return (
    <>
      <div className="bg-[url('/Corporate/Images/header-bg.webp')]">
        <FullScreenCarousel slides={slides} />
      </div>
    </>
  );
};

export default Corporate;
