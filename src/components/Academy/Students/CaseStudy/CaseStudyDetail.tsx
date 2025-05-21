import React from "react";
import { CaseStudy } from "./caseStudy";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../UI/tabs";
import { Badge } from "../../UI/badge";
import { Button } from "../../UI/button";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "../../UI/carousel";
import { 
  CircleUser, 
  ChevronRight, 
  GalleryHorizontal, 
  MessageSquareQuote,
  PanelLeft,
  BarChart 
} from "lucide-react";

interface CaseStudyDetailProps {
  caseStudy: CaseStudy;
}

const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({ caseStudy }) => {
  return (
    <div className="animate-fade-in">
      <div className="mb-8 relative">
        <div className="absolute top-0 left-0 w-20 h-20 -ml-6 -mt-6 bg-brand-light-blue rounded-full opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 -mr-10 mb-10 bg-brand-light-blue rounded-full opacity-10"></div>
        
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-3 relative z-10">
          {caseStudy.header}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl relative z-10">{caseStudy.subheader}</p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {caseStudy.snapshot.slice(0, 2).map((item, index) => (
            <Badge key={index} variant="outline" className="bg-gray-50">
              {item.parameter}: {item.details}
            </Badge>
          ))}
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-gray-50 p-1 rounded-lg">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <PanelLeft className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="interventions" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <ChevronRight className="h-4 w-4 mr-2" />
            Interventions
          </TabsTrigger>
          <TabsTrigger value="outcomes" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <BarChart className="h-4 w-4 mr-2" />
            Outcomes
          </TabsTrigger>
          <TabsTrigger value="testimonials" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <MessageSquareQuote className="h-4 w-4 mr-2" />
            Testimonials
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="animate-slide-in space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-to-br from-white to-brand-light-blue border-none shadow-md overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-10 -mt-10 bg-white/50 rounded-full"></div>
              <h3 className="text-xl font-semibold mb-4 text-brand-blue relative z-10">Quick Snapshot</h3>
              <div className="space-y-4 relative z-10">
                {caseStudy.snapshot.map((item, index) => (
                  <div key={index} className="flex justify-between border-b border-blue-100/50 pb-2">
                    <span className="font-medium text-gray-700">{item.parameter}</span>
                    <span className="text-brand-blue font-medium">{item.details}</span>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card className="p-6 shadow-md border-none bg-white relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-40 h-40 -mr-20 -mb-20 bg-brand-light-blue/10 rounded-full"></div>
              <h3 className="text-xl font-semibold mb-4 text-brand-blue">The Challenge</h3>
              <p className="text-gray-700 leading-relaxed relative z-10">
                {caseStudy.challenge}
              </p>
            </Card>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-6 text-brand-blue">Transformation Points</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseStudy.transformation.map((point, index) => (
                <div 
                  key={index} 
                  className="p-5 rounded-lg border border-gray-100 hover:shadow-md transition-shadow bg-white hover:bg-brand-light-blue/5"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-light-blue flex items-center justify-center mb-4">
                    <span className="text-brand-blue font-bold">{index + 1}</span>
                  </div>
                  <h4 className="font-semibold text-black mb-2 ">{point.title}</h4>
                  <p className="text-sm text-gray-600">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <Card className="p-8 border-none bg-gradient-to-r from-brand-blue to-brand-teal text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white/5 backdrop-blur-3xl"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mt-20 -mr-20"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -mb-10 -ml-10"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-semibold mb-4 bg-red-500 w-[300px] text-center p-3  rounded-md text-white hover:bg-red-600">Call to Action</h3>
              <p className="mb-6 text-lg">{caseStudy.callToAction}</p>
             
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="interventions" className="animate-slide-in">
          <Card className="p-8 shadow-md border-none bg-white overflow-hidden">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-brand-blue">Rareminds' Intervention</h3>
              <p className="text-gray-600">Our strategic approach to addressing educational challenges and transforming learning environments.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudy.interventions.map((intervention, index) => (
                <div 
                  key={index} 
                  className="p-6 rounded-xl border border-gray-100 hover:shadow-md transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light-blue/10 rounded-full -mt-16 -mr-16 group-hover:bg-brand-light-blue/20 transition-colors"></div>
                  <Badge className="mb-3 bg-brand-teal text-black font-bold md:text-xl">{intervention.title}</Badge>
                  <p className="text-gray-700 relative z-10">{intervention.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-10 flex justify-end">
              <Button variant="outline" className="border-brand-blue text-brand-blue">
                View Implementation Guide
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="outcomes" className="animate-slide-in">
          <Card className="p-8 shadow-md border-none overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-brand-light-blue/30 to-transparent"></div>
            
            <div className="relative z-10 mb-8">
              <h3 className="text-xl font-semibold mb-3 text-brand-blue">Outcomes and Impact</h3>
              <p className="text-gray-600">Measurable results and transformative changes we achieved together.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {caseStudy.outcomes.map((outcome, index) => (
                <div 
                  key={index} 
                  className="p-6 rounded-xl bg-white border border-gray-100 hover:bg-brand-light-blue/5 transition-colors shadow-sm"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="bg-brand-teal/10 p-3 rounded-lg w-16 h-16 flex items-center justify-center">
                      <span className="text-2xl font-bold text-brand-teal">{outcome.statistic.split(' ')[0]}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-800">{outcome.statistic}</h4>
                      <p className="text-gray-600">{outcome.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-6 flex items-center">
                <GalleryHorizontal className="w-5 h-5 mr-2 text-brand-teal" />
                Media Gallery
              </h4>
              
              <Carousel className="w-full max-w-4xl mx-auto">
                <CarouselContent>
                  {caseStudy.media.images?.map((image, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-2">
                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-md">
                          <img 
                            src={image} 
                            alt={`Case study image ${index + 1}`} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </Carousel>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="testimonials" className="animate-slide-in">
          <Card className="p-8 shadow-md border-none overflow-hidden">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-brand-blue">What People Say</h3>
              <p className="text-gray-600">Hear from the educators, students, and stakeholders who experienced our programs firsthand.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {caseStudy.testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="p-6 rounded-xl bg-white border border-gray-100 hover:shadow-lg transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-brand-light-blue/5 rounded-full -mr-20 -mt-20 group-hover:bg-brand-light-blue/10 transition-colors"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-6 text-brand-teal opacity-60">
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.5 19.25q1.05 0 1.775-0.725t0.725-1.775q0-1.05-0.725-1.775t-1.775-0.725q-1.05 0-1.775 0.725t-0.725 1.775q0 0.5 0.15 0.95t0.425 0.825l-1.7 1.675q-0.5-0.7-0.775-1.5t-0.275-1.65q0-0.85 0.2-1.675t0.625-1.625q0.425-0.8 1.075-1.475t1.5-1.1q0.85-0.425 1.825-0.65t2.025-0.225v2.8q-0.95 0-1.775 0.35t-1.425 0.975q-0.6 0.625-0.95 1.425t-0.35 1.7q0 0.75 0.275 1.375t0.8 1.075q0.525 0.45 1.2 0.7t1.45 0.25v0zM19.7 19.25q1.05 0 1.775-0.725t0.725-1.775q0-1.05-0.725-1.775t-1.775-0.725q-1.05 0-1.775 0.725t-0.725 1.775q0 0.5 0.15 0.95t0.425 0.825l-1.7 1.675q-0.5-0.7-0.775-1.5t-0.275-1.65q0-0.85 0.2-1.675t0.625-1.625q0.425-0.8 1.075-1.475t1.5-1.1q0.85-0.425 1.825-0.65t2.025-0.225v2.8q-0.95 0-1.775 0.35t-1.425 0.975q-0.6 0.625-0.95 1.425t-0.35 1.7q0 0.75 0.275 1.375t0.8 1.075q0.525 0.45 1.2 0.7t1.45 0.25v0z" />
                      </svg>
                    </div>
                    
                    <p className="text-gray-700 italic mb-6 text-lg">{testimonial.quote}</p>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue mr-4">
                        <CircleUser className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{testimonial.author}</p>
                        {testimonial.role && <p className="text-sm text-gray-600">{testimonial.role}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
           
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CaseStudyDetail;
