import { Users, Calendar } from "lucide-react";

export const CTASection = ({ onDemoClick, onWaitlistClick }: { onDemoClick: () => void, onWaitlistClick: () => void }) => {
  return (
    <section className="py-20 px-6 text-center">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-[#000000] mb-4">
          Talent isn't missing — it's just not mapped. The Rareminds Skill Passport changes that.
        </h2>

        <p className="text-base md:text-xl text-gray-600 mb-10">Launching @ GITEX on 13 Oct</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
          onClick={onWaitlistClick}
          className="bg-white border-2 border-[#000000] text-[#000000] hover:bg-gray-100 px-6 py-5 rounded-full font-semibold flex items-center justify-center transition-all">
            <Users className="mr-2 h-5 w-5" />
            Join the Waitlist
          </button>

          <button
            onClick={onDemoClick}
            className="bg-[#E32A18] hover:bg-[#C41F0D] text-white px-6 py-5 rounded-full font-semibold flex items-center justify-center transition-all"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book a Demo
          </button>
        </div>
      </div>
    </section>
  );
};
