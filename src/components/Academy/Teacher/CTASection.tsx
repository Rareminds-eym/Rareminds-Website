import { Button } from "@/components/ui/button";
import { Users, Calendar } from "lucide-react";

export const CTASection = () => {
  return (
    <div>
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
          Your Passport to Jobs – Launching Oct 13 at GITEX
        </h2>

        {/* Subtext */}
        <p className="text-base md:text-lg text-gray-300 mb-10">
          Join the movement redefining how the world looks at skills. <br />
          From India → to the World.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Left button (white) */}
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-100 px-6 py-5 rounded-full font-semibold flex items-center justify-center"
          >
            <Users className="mr-2 h-5 w-5" />
            Join the Waitlist
          </Button>

          {/* Right button (dark blue) */}
          <Button
            size="lg"
            className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white px-6 py-5 rounded-full font-semibold flex items-center justify-center"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book a Demo
          </Button>
        </div>
      </div>
    </div>
  );
};