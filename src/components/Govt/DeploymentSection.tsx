import { Send, Book } from "lucide-react";




export const DeploymentSection = () => {
  return (
    <section className="py-4 md:py-12 relative">
      <div
        className="absolute inset-0  bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50"
        style={{ opacity: 0.8 }}
      />
      <div className="container mx-auto px-4 relative">
        <h2 className="flex flex-col text-[18px] md:text-4xl font-semibold md:font-bold text-center text-[#111827] mx-auto">
          <span>Fully Equipped Teams. Streamlined Operations. Tech Stack Ready.</span>
          <span>Go Live in 48 Hours.</span>
        </h2>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <DeploymentCard
            icon={Clock}
            title="Pre-certified trainers"
            description="Our trainers are vetted, trained, and ready for immediate deployment"
          />
          <DeploymentCard
            icon={CheckSquare}
            title="Custom LMS setup"
            description="Learning Management System customized and deployed in 48 hours"
          />
          <DeploymentCard
            icon={FileText}
            title="SOPs ready"
            description="Standard operating procedures in place for seamless execution"
          />
        </div> */}
        <img src="/Govt-Images/Ready.svg" alt="Deployment" className="mx-auto" />

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            className="bg-white hover:bg-gray-50 border-b-4 border-gray-200 rounded-2xl md:rounded-3xl text-gray-800 shadow-md px-4 py-5 md:px-8 md:py-6 h-auto flex items-center gap-2 text-xs md:text-base"
            onClick={() => {
            const contactElement = document.getElementById('contact');
            if (contactElement) {
              contactElement.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          >
            <Send/>Submit Training Requirement
          </button>
          <button
            className="bg-red-500 border-b-4 border-red-700 text-white hover:bg-white hover:text-black rounded-2xl md:rounded-3xl shadow-md px-4 py-5 md:px-8 md:py-6 h-auto md:text-base duration-300 text-xs active:translate-y-1 active:scale-95 transition-all flex items-center gap-2"
            onClick={() => {
              const contactElement = document.getElementById('contact');
              if (contactElement) {
                contactElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <Book className="h-4 w-4 md:h-5 md:w-5" />Book Tender Discussion
          </button>
        </div>
      </div>
    </section>
  );
};
