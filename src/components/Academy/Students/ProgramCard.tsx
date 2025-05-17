import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "../UI/carousel";
  import { Button } from "../UI/button";
  import { useState } from "react";
  import Autoplay from "embla-carousel-autoplay";
  import React from "react";
  
  interface ProgramCardProps {
    imageUrl?: string;
    title: string;
    subtitle?: string;
    label?: string;
    description: React.ReactNode;
  }
  
 const ProgramCard =()=> {
    const [api, setApi] = useState<any>();
    const autoplayPlugin = Autoplay({ delay: 3000 });
  
    const Program = ({
      imageUrl,
      title,
      subtitle,
      label,
      description,
    }: ProgramCardProps) => (
      <div className="border border-amber-300 rounded-lg p-5 flex flex-col items-center bg-white h-[320px] w-full max-w-[90%] mx-auto
        transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
        <div className="bg-black w-20 h-20 rounded-full mb-4 overflow-hidden flex-shrink-0">
          {imageUrl && <img src={imageUrl} alt={title} className="w-full h-full object-cover" />}
        </div>
        <div className="flex flex-col items-center flex-grow">
          <h3 className="text-sm font-semibold mb-0.5 text-center">{title}</h3>
          {subtitle && <h3 className="text-sm font-semibold mb-2 text-center">{subtitle}</h3>}
          {label && <p className="text-center font-semibold text-sm mb-4">{label}</p>}
          <p className="text-center text-xs leading-relaxed">{description}</p>
        </div>
      </div>
    );
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/30 px-4 py-12 w-full overflow-hidden">
        <h1 className="text-lg md:text-3xl font-extrabold text-center mb-10">
          Programs that Transform Faculty,<br className="hidden md:block" />
          Elevate Institutions
        </h1>
        <Carousel
          opts={{
            align: "start",
            loop: true,
            skipSnaps: false,
            containScroll: "keepSnaps",
            dragFree: false
          }}
          plugins={[autoplayPlugin]}
          setApi={setApi}
          className="w-full flex flex-col items-center justify-center [&_.embla__scrollbar]:hidden"
        >
          <CarouselContent className="-ml-6 ">
            <CarouselItem className="pl-6 md:basis-1/2 lg:basis-1/3 text-sm md:text-lg ">
              <Program 
                title="NEP-Readiness &"
                subtitle="Digital Pedagogy"
                label="FDPs"
                description={
                  <>
                    Foundational and<br />
                    Advanced Faculty<br />
                    Development aligned<br />
                    with NEP
                  </>
                }
              />
            </CarouselItem>
            <CarouselItem className="pl-6 md:basis-1/2 lg:basis-1/3">
              <Program 
                title="NEP-Readiness &"
                subtitle="Digital Pedagogy"
                label="FDPs"
                description={
                  <>
                    Foundational and<br />
                    Advanced Faculty<br />
                    Development aligned<br />
                    with NEP
                  </>
                }
              />
            </CarouselItem>
            <CarouselItem className="pl-6 md:basis-1/2 lg:basis-1/3">
              <Program
                title="NEP-I"
                subtitle="Digital"
                description={
                  <>
                    Training<br />
                    Solution for<br />
                    Effective<br />
                    Implementation...
                  </>
                }
              />
            </CarouselItem>
          </CarouselContent>
          <div className="flex flex-row items-center justify-center gap-6 mt-8">
            <CarouselPrevious />
            <CarouselNext />
          </div>
          <div className="flex justify-center  w-full">
            <Button 
              variant="outline"
              className="bg-amber-400 hover:bg-amber-500 border-none text-black text-sm font-medium px-6 py-1.5 rounded-md"
            >
              View Detailed Program Brochure
            </Button>
          </div>
        </Carousel>
  
       
      </div>
    );
  }
  
  export default ProgramCard;