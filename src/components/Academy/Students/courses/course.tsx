import AcademyHeader from "@/components/Header/AcademyHeader";

type CourseProps = {
  courseName?: string;
};

const Course = ({ courseName }: CourseProps) => {
  return (
  <>
  <AcademyHeader />
  
    <div className="min-h-[50%] mt-20 flex">
      {/* Left Image Section */}
      <div className="w-1/5 relative overflow-hidden">
        <img 
          src="" 
          alt="Coding workspace" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
      </div>

      {/* Center Content Section */}
      <div className="w-3/5 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-8 ">
        <div className="text-center max-w-2xl p-4    md:p-16">
          <h1 className="text-4xl font-bold mb-6 text-black">
            {/* Welcome to {courseName || "Your Course"} */}
            The 3E Program: English, Employability, Entrepreneurship
          </h1>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Experience the perfect balance of design and functionality. 
            Start building something amazing with our intuitive platform.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
              Get Started
            </button>
            
          </div>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="w-1/5 relative overflow-hidden">
        <img 
          src="" 
          alt="Code on screen" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20"></div>
      </div>
    </div>







    <div className="min-h-auto w-full flex pt-4">
      {/* Left div - 1/6 width */}
   <div className="w-[15%]  flex flex-col items-center  justify-end">
  <img
    src="/academy/courses/left-course-icon.svg"
    alt="Left Course Icon"
    className="w-full h-auto mb-2"
  />
  
</div>

 


        <div className="w-5/6 h-auto ">
            <div className="w-full h-auto  p-4 flex justify-center rounded-md border border-red-500">
                <div className="w-[99%] h-[95%] border p-6 border-red-500 text-center rounded-md font-blod text-2xl">

               
                    <p ><span className="text-red-500 font-bold text-3xl">For Grades 8–12 : </span> Building Confidence, Clarity, and Career Readiness
</p>
<p>Old methods fall short. We teach what the future demands.
</p>
<p>That’s where 3E comes in.</p>
                </div>
            </div>
        </div>



      {/* Right div - 1/6 width */}
      <div className="w-[15%]  flex flex-col items-center  justify-end">
       <img
    src="/academy/courses/right-course-icon.svg"
    alt="Left Course Icon"
    className="w-full h-auto mb-2"
  />
      </div>
    </div>

<section className="w-full px-4 py-12 bg-[#fdf4ec]">

    <div className=" text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">
            Modules on real-world scenarios, articulation, vocabulary, grammar, and written formats.
          </h2>
  </div>
     
    </section>



    </>

  );
};

export default Course;
