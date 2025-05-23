
import React, { useRef, useEffect } from 'react';
import Text1 from './test1';
import Text2 from './test2';
import { cn } from '@/lib/utils';



const Oldandnewmethod = () => {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Play videos on component mount
    const videos = [videoRef1.current, videoRef2.current];
    videos.forEach(video => {
      if (video) {
        video.play().catch(error => {
          console.error("Video play failed:", error);
        });
      }
    });
  }, []);



useEffect(() => {
  const video = videoRef2.current;
  if (!video) return;

  let timeoutId;

  const handleEnded = () => {
    // Pause and wait 60 seconds, then play again
    timeoutId = setTimeout(() => {
      video.currentTime = 0;
      video.play();
    }, 60000); // 60 seconds = 60000 ms
  };

  // Start video on mount
  video.play();

  // Attach ended event listener
  video.addEventListener("ended", handleEnded);

  return () => {
    video.removeEventListener("ended", handleEnded);
    clearTimeout(timeoutId);
  };
}, []);

  return (
    <div className="min-h-screen bg-white">
   
      {/* Feature Compare Section - Old Method */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        {/* <div className="max-w-7xl mx-auto mb-12">
          
          
          <h1 className="md:text-5xl text-2xl text-center font-bold text-black p-2 rounded pt-12">
              
            </h1>
          <div className="h-1 w-24 bg-red-600 rounded-full mx-auto"></div>
        </div> */}

        {/* Old Method Section */}
        <div className="max-w-7xl mx-auto mb-20 md:mb-0 pl-10">

        <div className="h-[80%] bg-white justify-center">
          <h2 className=" text-2xl md:text-5xl font-bold text-black text-center pt-8">
            Why Schools Must <span className="text-red-600">Shift Now</span>
          </h2>
          <h4 className="text-1xl font-bold text-black text-center pt-4 pb-6">
            Traditional curriculum ≠ Future Careers
          </h4>
           </div>
          <div className="grid grid-cols-1 gap-4 items-center lg:grid-cols-2">
            <div className="order-2 lg:order-1 flex justify-center md:justify-center">
               <div className='  max-w-xl'>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8">Why Traditional TeachingNo Longer Works</h2>
              <div className="text-lg text-gray-600 mb-8 leading-relaxed">
                <div className="space-y-3">
                  <h3 className="font-semibold text-xl text-red-600"></h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li className="animate-fade-in" style={{ animationDelay: "0s" }}>
                      <span className='font-bold'> One-way lecture delivery</span> silences student engagement.
                    </li>
                    <li className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                    <span className='font-bold'> Rote learning and memorization </span> block creativity and critical thinking.
                    </li>
                    <li className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <span className='font-bold'> Minimal technology integration  </span>limits digital readiness.
                    </li>
                    <li className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                    <span className='font-bold'>  Static curriculum for years </span> disconnects learning from <br /> real-world needs.
                   
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-1 w-20 bg-red-600 rounded-full"></div>
                {/* <span className="ml-4 text-blue-600 font-medium">Explore</span> */}
              </div>
              </div>
            </div>
            


          
            {/* <div className="order-1 lg:order-2 overflow-hidden rounded-xl shadow-2xl">
              <video
                ref={videoRef1}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                preload="auto"
                style={{ minHeight: "320px" }}
              >
                <source src="/images/academy/Video/2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div> */}
              <div className="order-1 lg:order-2 overflow-hidden ">
           
          {/* <video
             ref={videoRef1}
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="auto"
              style={{ minHeight: "320px" }}
            >
               <source src="/images/academy/Video/2.mp4" type="video/mp4" />
               Your browser does not support the video tag.
        </video> */}
        
                        <Text1 />
            </div>
          </div>
        </div>

        <div className="w-full h-auto  flex items-center justify-center">
  <img
    src="/academy/RareMinds ISO Logo-01.png"
    alt="Logo"
    className="h-[10%] w-[10%] animate-glow rounded-full"
  />
</div>

        {/* New Method Section */}
        <div className="max-w-7xl mx-auto bg-white pb-16 pt-8 md:pt-0 px-4 sm:px-6 lg:px-8 rounded-2xl">
          <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2">
            {/* <div className="order-1 overflow-hidden rounded-xl shadow-2xl">
              <video
                ref={videoRef2}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                preload="auto"
                style={{ minHeight: "320px" }}
              >
                <source src="/images/academy/Video/1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div> */}
             <div className="order-1 overflow-hidden  ">
             {/* <video
      ref={videoRef2}
      className="w-full h-full object-cover"
      muted
      playsInline
      preload="auto"
      style={{ minHeight: "320px" }}
    >
      <source src="/images/academy/Video/1.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video> */}
           <Text2 />
            </div>

            <div className="order-2 flex justify-center md:justify-center">
            <div className='  max-w-xl'>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8">How Rareminds Transforms Learning </h2>
              <div className="text-lg text-gray-600 mb-8 leading-relaxed">
                <div className="space-y-3 ">
                  <h3 className="font-semibold text-xl text-red-600"></h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li className="animate-fade-in" style={{ animationDelay: "0s" }}>
                    <span className='font-bold'> Interactive & collaborative learning  </span>    sparks engagement and teamwork.
                    </li>
                    <li className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                    <span className='font-bold'>AI-enhanced teaching tools  </span>    advance learning with real-time support.

                    </li>
                    <li className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <span className='font-bold'> Student-driven exploration  </span>  fosters curiosity and independence.

                    </li>
                    <li className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                    <span className='font-bold'> Adaptive learning pathways </span>  nurture progress in line with individual growth.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-1 w-20 bg-red-600 rounded-full"></div>
                {/* <span className="ml-4 text-blue-600 font-medium">Explore</span> */}
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

   
    </div>
  );
};

export default Oldandnewmethod;