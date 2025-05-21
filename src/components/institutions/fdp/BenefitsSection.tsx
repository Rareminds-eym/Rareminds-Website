import React from "react";
import { CheckCircle, Brain, BookOpen, ShoppingBag, Eye, Lightbulb } from "lucide-react";

const icons = [
  { icon: CheckCircle },
  { icon: Brain },
  { icon: BookOpen },
  { icon: ShoppingBag },
  { icon: Eye },
];

export default function WhyFDPs() {
  return (
    <section className="relative py-24 bg-white text-center overflow-hidden">
      {/* Background circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-purple-100 opacity-20 rounded-full"></div>
        <div className="absolute w-[400px] h-[400px] bg-purple-100 opacity-30 rounded-full"></div>
        <div className="absolute w-[300px] h-[300px] bg-purple-100 opacity-50 rounded-full"></div>
        <div className="absolute w-[200px] h-[200px] bg-purple-100 opacity-60 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-center items-center gap-6 flex-wrap mb-10">
          {icons.map(({ icon: Icon }, index) => (
            <div key={index} className="w-16 h-16 flex items-center justify-center bg-white border border-gray-200 shadow-md rounded-xl">
              <Icon className="text-blue-600 w-6 h-6" />
            </div>
          ))}
        </div>

        <div className="mb-2 flex justify-center">
          <Lightbulb className="text-red-500 w-6 h-6" />
        </div>
        <h2 className="text-xl font-semibold">Why Rareminds FDPs?</h2>
        <p className="text-sm text-gray-600 mt-2">
          Industry-aligned programs that transform teaching effectiveness
        </p>
      </div>
    </section>
  );
}
