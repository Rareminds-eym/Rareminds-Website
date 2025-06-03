
import { Button } from "../../../components/Academy/UI/button";
import PageHeader from "../../../components/Academy/Students/courses-1/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";

const ThreeEProgram = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <PageHeader 
        title="The 3E Program" 
        subtitle="English, Employability, Entrepreneurship" 
      />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero section */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-6">
            Don't Step into the Future Unprepared
          </h2>
          <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto">
            For Grades 8–12: Building Confidence, Clarity, and Career Readiness
          </p>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Old methods fall short. We teach what the future demands. That's where 3E comes in.
          </p>
        </div>
        
        {/* Three pillars with modern cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-zinc-900 border-t-4 border-red-600 overflow-hidden hover:shadow-lg hover:shadow-red-600/20 transition-all">
            <CardContent className="p-6 pt-6">
              <div className="bg-red-600 text-white w-12 h-12 flex items-center justify-center rounded-full mb-6 shadow-lg">
                <span className="font-bold text-xl">E</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">English</h3>
              <p className="text-gray-300 mb-4">
                Build language skills that help you speak up, stand out, and move forward
                from everyday conversations to professional emails.
              </p>
              <div className="border-t border-gray-700 pt-4 mt-4">
                <p className="text-sm text-gray-400">
                  Modules on real-world scenarios, articulation, vocabulary, grammar, and written formats.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-zinc-900 border-t-4 border-white overflow-hidden hover:shadow-lg hover:shadow-white/20 transition-all">
            <CardContent className="p-6 pt-6">
              <div className="bg-white text-black w-12 h-12 flex items-center justify-center rounded-full mb-6 shadow-lg">
                <span className="font-bold text-xl">E</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Employability</h3>
              <p className="text-gray-300 mb-4">
                Master 21st-century workplace skills from digital tools and career planning to team communication, job readiness, and financial literacy.
              </p>
              <div className="border-t border-gray-700 pt-4 mt-4">
                <p className="text-sm text-gray-400">
                  Modules on digital literacy, career development, diversity, resume and interview prep, and financial awareness.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-zinc-900 border-t-4 border-red-600 overflow-hidden hover:shadow-lg hover:shadow-red-600/20 transition-all">
            <CardContent className="p-6 pt-6">
              <div className="bg-red-600 text-white w-12 h-12 flex items-center justify-center rounded-full mb-6 shadow-lg">
                <span className="font-bold text-xl">E</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Entrepreneurship</h3>
              <p className="text-gray-300 mb-4">
                Learn how to identify opportunities, build business plans, and pitch ideas to create your own path, even before college.
              </p>
              <div className="border-t border-gray-700 pt-4 mt-4">
                <p className="text-sm text-gray-400">
                  Modules on the 4Ps, business model development, customer targeting, funding, and risk awareness.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Why schools choose us */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
            Schools Across India Are Making the Shift. Here's Why:
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Aligned with NEP 2020 and future-readiness goals",
              "Backed by research, psychometrics, and industry insights",
              "No added burden on school faculty",
              "Career-ready portfolios for every student",
              "Strengthens career guidance and boosts parent trust"
            ].map((benefit, index) => (
              <div key={index} className="flex items-start p-4 bg-zinc-900 rounded-lg">
                <CheckCircle className="text-red-600 h-6 w-6 mr-3 flex-shrink-0 mt-1" />
                <p className="text-gray-200">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="relative overflow-hidden bg-gradient-to-r from-red-900 to-red-600 rounded-2xl shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjk4LjUgMzg1LjVjLTguOC05LjEtMjMuNC0xMC4xLTMzLjQtMS45bC05OC43IDgxLjNjLTEwLjEgOC4yLTExLjYgMjMtMy40IDMzLjFzMjMgMTEuNiAzMy4xIDMuNGw5OC43LTgxLjNjMTAuMS04LjIgMTEuNi0yMyAzLjQtMzMuMXYtLjFjLTQuNC01LjItMTAuNS04LjEtMTYuOS04LjFzLTEyLjYgMi45LTE2LjkgOHoiIGZpbGw9IiNmZmYwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]"></div>
          <div className="relative p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Ready to transform your school's approach to education?</h3>
            <p className="mb-8 text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Speak with our program specialists to learn how the 3E Program can benefit your students.
            </p>
            <Button 
              className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <span className="mr-2">Talk to Our Program Team Now!</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeEProgram;
