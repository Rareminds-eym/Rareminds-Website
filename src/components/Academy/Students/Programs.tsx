import { Calendar, ChartLine, Download, FileText, Book } from "lucide-react";
import { cn } from "@/lib/utils";


type IconType = "calendar" | "chart-line" | "download" | "file-text" | "book";

interface ResourceCardProps {
  title: string;
  description: string;
  icon: IconType;
  downloadLabel: string;
  className?: string;
}

const ResourceCard = ({
  title,
  description,
  icon,
  downloadLabel,
  className,
}: ResourceCardProps) => {
  const getIcon = (icon: IconType) => {
    switch (icon) {
      case "calendar":
        return <Calendar className="h-6 w-6" />;
      case "chart-line":
        return <ChartLine className="h-6 w-6" />;
      case "file-text":
        return <FileText className="h-6 w-6" />;
      case "book":
        return <Book className="h-6 w-6" />;
      default:
        return <Download className="h-6 w-6" />;
    }
  };

  return (
    <div className={cn("p-6 bg-white border border-gray-100 shadow-sm", className)}>
      <div className="mb-4">{getIcon(icon)}</div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-6">{description}</p>
      <button className="flex items-center gap-2 text-sm font-medium border border-gray-300 rounded px-3 py-1.5 hover:bg-gray-50">
        <Download className="h-4 w-4" />
        <span>{downloadLabel}</span>
      </button>
    </div>
  );
};

const Programs = () => {
  return (
   
    <div className="h-autopx-8 bg-white py-8" data-aos="fade-down-right">
{/* 
<div
  className="w-full h-[400px] bg-yellow-200 relative overflow-hidden"
>
  <div
    className="absolute inset-0 bg-no-repeat bg-center bg-cover opacity-30"
    style={{
      backgroundImage: 'url("/images/academy/SDP-01.jpg")',
    }}
  ></div>

  Your content can go here, above the background
  <div className="relative z-10 p-4">
    Content on top of background
  </div>
</div> */}


      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto mb-6">
          <h1 className="text-3xl text-center font-bold mb-2">From Classrooms to Careers: Skill Up, Speak Up, Stand Out.
          </h1>
          <p className="text-gray-600 mb-8 text-center">
          Career Readiness | Spoken English | Employability | Entrepreneurship | NEP-aligned Learning for Students


          </p>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="relative w-[300px] h-[auto]  ">
  <img src="/images/academy/resourcecard.jpg" alt="Example" className="w-full h-full object-cover rounded-md" />
  <button className="w-[160px] absolute bottom-2 right-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
    Download PDF
  </button>
</div>



            <ResourceCard
              title="5-Day PDP Calendar"
              description="Complete breakdown of our signature faculty development program with daily activities"
              icon="calendar"
              downloadLabel="Download PDF"
            />
            <ResourceCard
              title="Career Counselling Blueprint"
              description="Comprehensive guide to career guidance for a wide range of student needs"
              icon="chart-line"
              downloadLabel="Download PDF"
            />
          </div> */}
          

<div className="grid grid-cols-1 lg:grid-cols-3 gap-24 mb-6 mt-16 place-items-center"   >
    

<div className="w-[350px] h-[350px]">
<div className="w-full h-[80%] bg-white flex flex-col items-center justify-center relative">
    <h1 className="text-lg font-semibold absolute left-11 top-12 text-white">01</h1>

 <h2 className="text-xl absolute w-[250px] right-2 content-center   ">Welcome to India’s Most Trusted Student Skill Training Platform</h2>

    <img
      src="/images/academy/text.svg"
      alt="Icon"
      className="w-auto h-full object-contain"
    />
  </div>

  <div className="w-full h-[20%] bg-white flex justify-end items-center ">
    
  <button className="w-[120px] h-[40px] bg-black hover:text-yellow-200 rounded-md text-white flex items-center justify-center"> See More</button>
   
  </div>
</div>






<div className="w-[350px] h-[350px]">
<div className="w-full h-[80%] bg-white flex flex-col items-center justify-center relative">
    <h1 className="text-lg font-semibold absolute left-11 top-12 text-white">02</h1>

 <h2 className="text-xl absolute w-[250px] right-2 content-center   ">Spoken English & Public Speaking Bootcamps</h2>

    <img
      src="/images/academy/text.svg"
      alt="Icon"
      className="w-auto h-full object-contain"
    />
  </div>

  <div className="w-full h-[20%] bg-white flex justify-end items-center ">
    
  <button className="w-[120px] h-[40px] bg-black hover:text-yellow-200 rounded-md text-white flex items-center justify-center"> See More</button>
   
  </div>
</div>







<div className="w-[350px] h-[350px]">
<div className="w-full h-[80%] bg-white flex flex-col items-center justify-center relative">
    <h1 className="text-lg font-semibold absolute left-11 top-12 text-white">03</h1>

 <h2 className="text-xl absolute w-[250px] right-2 content-center   ">Career Counselling with Psychometric Assessments</h2>

    <img
      src="/images/academy/text.svg"
      alt="Icon"
      className="w-auto h-full object-contain"
    />
  </div>

  <div className="w-full h-[20%] bg-white flex justify-end items-center ">
    
  <button className="w-[120px] h-[40px] bg-black hover:text-yellow-200 rounded-md text-white flex items-center justify-center"> See More</button>
   
  </div>
</div>




<div className="w-[350px] h-[350px]">
<div className="w-full h-[80%] bg-white flex flex-col items-center justify-center relative">
    <h1 className="text-lg font-semibold absolute left-11 top-12 text-white">04</h1>

 <h2 className="text-xl absolute w-[250px] right-2 content-center   ">EEE Training: English, Employability, Entrepreneurship</h2>

    <img
      src="/images/academy/text.svg"
      alt="Icon"
      className="w-auto h-full object-contain"
    />
  </div>

  <div className="w-full h-[20%] bg-white flex justify-end items-center ">
    
  <button className="w-[120px] h-[40px] bg-black hover:text-yellow-200 rounded-md text-white flex items-center justify-center"> See More</button>
   
  </div>
</div>





<div className="w-[350px] h-[350px]">
<div className="w-full h-[80%] bg-white flex flex-col items-center justify-center relative">
    <h1 className="text-lg font-semibold absolute left-11 top-12 text-white">05</h1>

 <h2 className="text-xl absolute w-[250px] right-2 content-center   ">Confidence-Building & Mindset Programs</h2>

    <img
      src="/images/academy/text.svg"
      alt="Icon"
      className="w-auto h-full object-contain"
    />
  </div>

  <div className="w-full h-[20%] bg-white flex justify-end items-center ">
    
  <button className="w-[120px] h-[40px] bg-black hover:text-yellow-200 rounded-md text-white flex items-center justify-center"> See More</button>
   
  </div>
</div>






  
</div>


        </div>
      </div>

      {/* <div className="border-t border-gray-100 mt-12"></div> */}
    </div>
  );
};

export default Programs;
