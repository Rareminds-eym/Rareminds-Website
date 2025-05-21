import React, { useState } from "react";
import { Button } from "../../UI/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { caseStudies as originalCaseStudies } from "./caseStudies";
import { Card } from "../../UI/card";
import { Badge } from "../../UI/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../UI/tabs";

// Convert our original case studies to the new format
const adaptedCaseStudies = originalCaseStudies.map((study, index) => {
  // Get core theme from snapshot
  const coreTheme = study.snapshot.find(item => item.parameter === "Core Theme")?.details || "";
  
  return {
    number: index + 1,
    companyName: study.snapshot.find(item => item.parameter === "Location")?.details || "",
    tagline: study.subheader,
    keyOutcomes: study.outcomes.map(outcome => outcome.statistic),
    clientDetails: {
      title: coreTheme,
      description: study.snapshot.find(item => item.parameter === "Program Duration")?.details || ""
    },
    challengeDetails: {
      title: "Challenge",
      description: study.challenge.substring(0, 100) + "..."
    },
    solutionDetails: {
      title: "Our Approach",
      steps: study.interventions.map(int => int.title)
    },
    testimonial: study.testimonials.length > 0 ? {
      quote: study.testimonials[0].quote,
      author: study.testimonials[0].author,
      role: study.testimonials[0].role || ""
    } : undefined,
    // Keep the original ID for reference
    originalId: study.id
  };
});

const CaseStudyCard = ({ 
  number, 
  companyName, 
  tagline, 
  keyOutcomes, 
  clientDetails, 
  challengeDetails, 
  solutionDetails, 
  testimonial 
}) => {
  return (
    <Card className="p-6 md:p-10 border-none shadow-lg rounded-xl bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-light-blue/5 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-light-blue/10 rounded-full -ml-24 -mb-24"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <Badge className="bg-brand-light-blue text-brand-blue mb-2">Case Study {number}</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{companyName}</h2>
            <p className="text-gray-600 mt-2 text-lg">{tagline}</p>
          </div>
          
          {testimonial && (
            <div className="bg-gray-50 p-4 rounded-lg max-w-md">
              <div className="text-brand-teal mb-2">
                <svg className="w-6 h-6 inline-block" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-700 italic mb-3">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="mr-2">
                  <div className="w-8 h-8 bg-brand-teal/20 rounded-full flex items-center justify-center text-brand-teal">
                    {testimonial.author.charAt(0)}
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{testimonial.author}</p>
                  {testimonial.role && <p className="text-xs text-gray-600">{testimonial.role}</p>}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <Tabs defaultValue="outcomes" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 bg-gray-50 p-1 rounded-lg">
            <TabsTrigger value="outcomes">Key Outcomes</TabsTrigger>
            <TabsTrigger value="challenge">Challenge</TabsTrigger>
            <TabsTrigger value="solution">Solution</TabsTrigger>
          </TabsList>
          
          <TabsContent value="outcomes" className="animate-fade-in space-y-4">
            <h3 className="text-xl font-semibold text-brand-blue">Key Achievements</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-teal/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-brand-teal text-sm">✓</span>
                </div>
                <span className="text-gray-700">95% student engagement</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-teal/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-brand-teal text-sm">✓</span>
                </div>
                <span className="text-gray-700">Social Security learning for Grade 5</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-teal/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-brand-teal text-sm">✓</span>
                </div>
                <span className="text-gray-700">70+ robotics prototypes</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-teal/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-brand-teal text-sm">✓</span>
                </div>
                <span className="text-gray-700">Teacher training</span>
              </li>
            </ul>
          </TabsContent>
          
          <TabsContent value="challenge" className="animate-fade-in">
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-brand-blue">Challenge</h3>
              <p className="text-gray-700 leading-relaxed">
                Every child has the potential to think critically, solve creatively, and build with purpose, when given the right tools early on. At Rareminds, we saw an opportunity to spark this potential through experiential, hands-on learning that grows with the students. However, in many classrooms, early math was and felt like abstract concepts. STEM education remained out of reach. Robotics and coding, in particular, were treated as extras rather than essentials. Teachers lacked the resources to bring concepts to life, and students missed out on learning that connects to the real world.
              </p>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="font-medium text-gray-900 mb-2">Quick Snapshot</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Location</p>
                    <p className="text-gray-900">St. Joseph's School</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">No. of Students Impacted</p>
                    <p className="text-gray-900">1200+ students (KG to Grade 9)</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Program Duration</p>
                    <p className="text-gray-900">8 hours</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Trainers Deployed</p>
                    <p className="text-gray-900">8 LEGO-certified Facilitators</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Core Theme</p>
                    <p className="text-gray-900">STEM Education via LEGO</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="solution" className="animate-fade-in">
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-brand-blue">Transformation Points</h3>
              <ul className="space-y-4 mt-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-teal flex-shrink-0 flex items-center justify-center text-white">
                    1
                  </div>
                  <div>
                    <span className="text-gray-900 font-medium">Age-wise curriculum integration</span>
                    <p className="text-gray-700 mt-1">Learning is developmentally aligned, ensuring concepts are introduced when students are ready to absorb and apply them.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-teal flex-shrink-0 flex items-center justify-center text-white">
                    2
                  </div>
                  <div>
                    <span className="text-gray-900 font-medium">Highly engaging and participatory</span>
                    <p className="text-gray-700 mt-1">Students learn by doing, which increases retention, curiosity, and classroom involvement.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-teal flex-shrink-0 flex items-center justify-center text-white">
                    3
                  </div>
                  <div>
                    <span className="text-gray-900 font-medium">Easy teacher upskilling and replicability</span>
                    <p className="text-gray-700 mt-1">The program is designed for scalability—teachers can adopt it quickly and apply it consistently across classrooms.</p>
                  </div>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

const CaseStudy = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? adaptedCaseStudies.length - 1 : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === adaptedCaseStudies.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Proven Impact, Delivered
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl">
            Real stories. Real results. See how Rareminds transforms educational environments.
          </p>
        </div>

        {/* Case Study Display - Use Custom Card */}
        <div className="mb-12 max-w-5xl mx-auto">
          <CaseStudyCard
            number={1}
            companyName="St. Joseph's School"
            tagline="LEGO Education: Transforming Classrooms from KG Math to Grade 9 Robotics"
            keyOutcomes={[
              "95% student engagement",
              "Social Security learning for Grade 5",
              "70+ robotics prototypes",
              "Teacher training"
            ]}
            clientDetails={{
              title: "STEM Education via LEGO",
              description: "8 hours"
            }}
            challengeDetails={{
              title: "Challenge",
              description: "Every child has the potential to think critically, solve creatively, and build with purpose..."
            }}
            solutionDetails={{
              title: "Transformation Points",
              steps: [
                "Age-wise curriculum integration",
                "Highly engaging and participatory",
                "Easy teacher upskilling and replicability"
              ]
            }}
            testimonial={{
              quote: "This program brought joy and innovation back into our classrooms.",
              author: "Principal",
              role: "St. Joseph's School"
            }}
          />
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full w-12 h-12 border border-brand-teal bg-white shadow-sm hover:bg-brand-light-blue/10"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-5 w-5 text-brand-blue" />
          </Button>
          
          <div className="flex items-center px-4 py-2 bg-white rounded-full shadow-sm">
            <span className="text-sm font-medium text-gray-700">
              1 / 1
            </span>
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full w-12 h-12 border border-brand-teal bg-white shadow-sm hover:bg-brand-light-blue/10"
            onClick={handleNext}
          >
            <ChevronRight className="h-5 w-5 text-brand-blue" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;
