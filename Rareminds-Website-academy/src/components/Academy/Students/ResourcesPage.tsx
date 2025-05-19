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

const ResourcesPage = () => {
  return (
   
    <div className="h-autopx-8 bg-white py-8 mt-8" data-aos="fade-down-right ">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-6">
          <h1 className="text-3xl text-center font-bold mb-2">Free Student Resource Pack – Instant Downloads
          </h1>
          <p className="text-gray-600 mb-8 text-center">
          What Students, Parents & Schools Get:

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

<div className="flex justify-center md:justify-center">
<div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-6 mt-16">
  <div className="relative w-[300px] h-[auto] rounded-md overflow-hidden">
    <img
      src=" /academy/resourcecard.jpg"
      alt="Example"
      className="w-full h-full object-cover"
    />


    <div className="absolute inset-0 flex flex-col justify-center text-black text-left px-6">

  {/* Icon/Image below content */}
  <img src="/academy/careerCounsellingBlueprint.svg" alt="" className="w-16 h-16 "  />
  {/* Heading */}
  <h2 className="text-[18px] font-semibold mb-2">
  Career Counselling Blueprint (Grades 9–12)


  </h2>

  {/* Subheading */}
  <p className="text-[16px] mb-4">
  {/* "Reimagine Teaching. Redefine Learning." */}

  </p>

</div>
    {/* Button */}
    <a
  href="/academy/pdfs/5_Day.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="w-[160px] absolute bottom-2 right-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-center"
>
  Download PDF
</a>
  </div>

  <div className="relative w-[300px] h-[auto] rounded-md overflow-hidden">
    <img
      src="/academy/resourcecard.jpg"
      alt="Example"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 flex flex-col justify-center text-black text-left px-6">

  {/* Icon/Image below content */}
  <img src="/academy/Confidence & Goal Tracker PDF.svg" alt="" className="w-8 h-8 md:w-16 md:h-16 "  />
  {/* Heading */}
  <h2 className="text-[18px] font-semibold mb-2">
  Confidence & Goal Tracker PDF

  </h2>

  {/* Subheading */}
  <p className="text-[16px] mb-4">
  {/* "Your Child’s Future Starts Today: Career Counselling Blueprint for Grades 9–12" */}
  </p>

</div>
    {/* Button */}
    <a
  href="/academy/pdfs/5_Day.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="w-[160px] absolute bottom-2 right-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-center"
>
  Download PDF
</a>
  </div>





  <div className="relative w-[300px] h-[auto] rounded-md overflow-hidden">
    <img
      src="/academy/resourcecard.jpg"
      alt="Example"
      className="w-full h-full object-cover"
    />

    {/* Overlay content */}
    {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-black text-center px-4 ">
       <img src="/images/academy/ai.png" alt="" className="w-28 h-6 "/>
      <div className="flex items-center gap-2 mb-2">
       
        <h2 className="text-[24px] font-semibold pl-6 text-left">Career Counselling Blueprint</h2>
      </div>
      <p className="text-[16px] text-left pl-6">
        Comprehensive guide to career guidance for grades 9–12 with assessment tools
      </p>
    </div> */}
    <div className="absolute inset-0 flex flex-col justify-center text-black text-left px-6">

  {/* Icon/Image below content */}
  <img src="/academy/spoken english dally Practice Sheet .svg" alt="" className="w-8 h-8 md:w-16 md:h-16 "  />
  {/* Heading */}
  <h2 className="text-[18px] font-semibold mb-2">
  Spoken English Daily Practice Sheet


  </h2>

  {/* Subheading */}
  <p className="text-[16px] mb-4">
  {/* A Quick Audit for Schools Moving Toward 21st-Century Excellence. */}

  </p>

</div>
    {/* Button */}
    <a
  href="/academy/pdfs/5_Day.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="w-[160px] absolute bottom-2 right-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-center"
>
  Download PDF
</a>
  </div>


  <div className="relative w-[300px] h-[auto] rounded-md overflow-hidden">
    <img
      src="/academy/resourcecard.jpg"
      alt="Example"
      className="w-full h-full object-cover"
    />

    {/* Overlay content */}
    {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-black text-center px-4 ">
       <img src="/images/academy/ai.png" alt="" className="w-28 h-6 "/>
      <div className="flex items-center gap-2 mb-2">
       
        <h2 className="text-[24px] font-semibold pl-6 text-left">Career Counselling Blueprint</h2>
      </div>
      <p className="text-[16px] text-left pl-6">
        Comprehensive guide to career guidance for grades 9–12 with assessment tools
      </p>
    </div> */}
    <div className="absolute inset-0 flex flex-col justify-center text-black text-left px-6">

  {/* Icon/Image below content */}
  <img src="/academy/EEE Course Overview with Job Pathways.svg" alt="" className="w-8 h-8 md:w-16 md:h-16  "  />
  {/* Heading */}
  <h2 className="text-[18px] font-semibold mb-2">
  EEE Course Overview with Job Pathways


  </h2>

  {/* Subheading */}
  <p className="text-[16px] mb-4">
  {/* A Quick Audit for Schools Moving Toward 21st-Century Excellence. */}

  </p>

</div>
    {/* Button */}
    <a
  href="/academy/pdfs/5_Day.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="w-[160px] absolute bottom-2 right-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-center"
>
  Download PDF
</a>
  </div>
  </div>
</div>


        </div>
      </div>

      {/* <div className="border-t border-gray-100 mt-12"></div> */}
    </div>
  );
};

export default ResourcesPage;
