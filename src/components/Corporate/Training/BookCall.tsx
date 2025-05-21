import React from "react";
import { CalendarCheck2, ArrowRight } from "lucide-react";

const phoneNumber = "919562481100"; // Replace with actual phone number

const handleCall = () => {
  window.location.href = `tel:${phoneNumber}`;
};

const BookCall: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl shadow-xl mx-auto text-center relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 shadow-lg">
            <CalendarCheck2 className="w-8 h-8" />
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
          Book a Discovery Call
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-8 font-medium max-w-md mx-auto">
          Give us{" "}
          <span className="font-semibold text-blue-700">20 minutes</span>. We’ll
          give you a training strategy that actually sticks.
        </p>
        <button
          className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full min-w-[240px] font-semibold text-base shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 mb-4 mx-auto"
          onClick={handleCall}
          type="button"
        >
          <span>Talk to the Experts. No Jargon. Just Strategy.</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        <div className="text-sm text-gray-500 mt-2">
          Click to call our experts
        </div>
      </div>
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-200 rounded-full opacity-20 blur-2xl"></div>
    </section>
  );
};

export default BookCall;
