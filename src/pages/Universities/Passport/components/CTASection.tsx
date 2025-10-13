import { Button } from "@/components/ui/button";
import { Users, Calendar } from "lucide-react";


export const CTASection = ({ onDemoClick }: { onDemoClick: () => void }) => {
  return (
    <div>
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4">
          Ready to <span className="text-[#000000]">Transform Learning?</span>
        </h2>

        {/* Subtext */}
        <p className="text-base md:text-lg text-gray-600 mb-10">
          Join leading institutions already redefining student development with the Rareminds Skill Passport.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Schedule a Demo */}
          <Button
            size="lg"
            className="bg-[#1E3A5F] hover:bg-[#2A4A6F] text-white px-6 py-5 rounded-full font-semibold flex items-center justify-center"
            // onClick={() => (window.location.href = "/passport/demo")}
            onClick={onDemoClick}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Schedule a Demo
          </Button>

          {/* Talk to Academic Partner Team */}
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-100 px-6 py-5 rounded-full font-semibold flex items-center justify-center"
            onClick={onDemoClick}
          >
            <Users className="mr-2 h-5 w-5" />
            Talk to Our Academic Partner Team
          </Button>

          {/* Download Institutional Brochure */}
          <Button
            size="lg"
            className="bg-[#FF6B6B] hover:bg-[#ff8787] text-white px-6 py-5 rounded-full font-semibold flex items-center justify-center"
            onClick={onDemoClick}
          >
            Download Institutional Brochure
          </Button>
        </div>
      </div>
    </div>
  );
};
