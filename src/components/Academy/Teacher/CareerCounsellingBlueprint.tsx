import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../UI/button';
import { ArrowRight, Award, Check, FileText, GraduationCap, Target, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CareerCounsellingBlueprint: React.FC = () => {
  const { toast } = useToast();

  const handleDownloadPDF = () => {
    toast({
      title: "PDF Download Started",
      description: "Your Career Counselling Blueprint PDF is being downloaded.",
    });
  };
  
  const handleContactRequest = () => {
    toast({
      title: "Request Received",
      description: "Our Career Counselling team will contact you shortly.",
    });
  };

  return (
    <div className="space-y-16">
      {/* Hero Section for Career Counselling */}
      <div className="bg-gradient-to-br from-education-secondary to-purple-800 text-white rounded-2xl overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-3 p-8 md:p-12 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-2">
              <GraduationCap className="h-5 w-5" />
              <span className="font-medium">Career Counselling</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold">Your Child's Future Starts Today</h1>
            <p className="text-xl opacity-90">Clarity, Confidence, and Career Readiness for Tomorrow's Leaders</p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={handleDownloadPDF}
                className="bg-white/10 hover:bg-white/20 border border-white/30"
              >
                <FileText className="mr-2 h-4 w-4" />
                Download Blueprint
              </Button>
              
              <Button 
                onClick={handleContactRequest}
                className="bg-white text-education-secondary hover:bg-white/90"
              >
                <Users className="mr-2 h-4 w-4" />
                Schedule Counselling
              </Button>
            </div>
          </div>
          
          <div className="md:col-span-2 bg-gradient-to-br from-purple-700/50 to-purple-900/50 p-8 flex items-center justify-center relative overflow-hidden">
            <div className="relative z-10 text-center">
              <div className="text-6xl font-bold mb-3">9-12</div>
              <p className="text-xl font-semibold">GRADES</p>
            </div>
            
            {/* Abstract shapes */}
            <div className="absolute top-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
      
      {/* Why Career Counselling Matters */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-education-light to-purple-50 pb-6">
          <CardTitle className="text-2xl text-education-secondary">Why Career Counselling Matters in Grades 9–12</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <span className="text-education-secondary text-lg font-bold">🔹</span>
              <p>85% of students choose careers based on guesswork.</p>
            </div>
            
            <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <span className="text-education-secondary text-lg font-bold">🔹</span>
              <p>Early planning = better academic and life outcomes.</p>
            </div>
            
            <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <span className="text-education-secondary text-lg font-bold">🔹</span>
              <p>Career counselling isn't just about careers — it's about clarity, self-awareness, and decision-making skills.</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 5-Step Career Counselling Blueprint */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-10 text-education-dark">Our 5-Step Career Counselling Blueprint</h2>
        
        <div className="space-y-8">
          {/* Step 1 */}
          <Card className="overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
            <div className="grid md:grid-cols-12">
              <div className="md:col-span-1 bg-gradient-to-b from-education-secondary to-purple-700 flex items-center justify-center p-4 text-white">
                <span className="text-3xl font-bold">1</span>
              </div>
              <div className="md:col-span-11 p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="bg-education-light/50 rounded-full p-3">
                    <Target className="h-6 w-6 text-education-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-education-secondary">Self-Discovery & Personality Mapping</h3>
                    <p className="text-gray-600 mt-2">🎯 Psychometric testing to uncover interests, strengths, and natural talents.</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Step 2 */}
          <Card className="overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
            <div className="grid md:grid-cols-12">
              <div className="md:col-span-1 bg-gradient-to-b from-education-secondary to-purple-700 flex items-center justify-center p-4 text-white">
                <span className="text-3xl font-bold">2</span>
              </div>
              <div className="md:col-span-11 p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="bg-education-light/50 rounded-full p-3">
                    <GraduationCap className="h-6 w-6 text-education-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-education-secondary">Career Awareness Building</h3>
                    <p className="text-gray-600 mt-2">🌍 Exploring industries, futuristic sectors (AI, EV, AgriTech), and opportunities beyond the textbook.</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Step 3 */}
          <Card className="overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
            <div className="grid md:grid-cols-12">
              <div className="md:col-span-1 bg-gradient-to-b from-education-secondary to-purple-700 flex items-center justify-center p-4 text-white">
                <span className="text-3xl font-bold">3</span>
              </div>
              <div className="md:col-span-11 p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="bg-education-light/50 rounded-full p-3">
                    <Target className="h-6 w-6 text-education-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-education-secondary">Goal Setting & Path Planning</h3>
                    <p className="text-gray-600 mt-2">🛤 Setting SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) for academic and career milestones.</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Step 4 */}
          <Card className="overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
            <div className="grid md:grid-cols-12">
              <div className="md:col-span-1 bg-gradient-to-b from-education-secondary to-purple-700 flex items-center justify-center p-4 text-white">
                <span className="text-3xl font-bold">4</span>
              </div>
              <div className="md:col-span-11 p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="bg-education-light/50 rounded-full p-3">
                    <Users className="h-6 w-6 text-education-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-education-secondary">Skill & Profile Development</h3>
                    <p className="text-gray-600 mt-2">🚀 Identifying skill gaps early and designing a plan for certifications, projects, and internships while in school.</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Step 5 */}
          <Card className="overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
            <div className="grid md:grid-cols-12">
              <div className="md:col-span-1 bg-gradient-to-b from-education-secondary to-purple-700 flex items-center justify-center p-4 text-white">
                <span className="text-3xl font-bold">5</span>
              </div>
              <div className="md:col-span-11 p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="bg-education-light/50 rounded-full p-3">
                    <FileText className="h-6 w-6 text-education-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-education-secondary">Action Blueprint & Ongoing Support</h3>
                    <p className="text-gray-600 mt-2">📅 A personalized Career Roadmap + Quarterly Mentoring Check-Ins till Grade 12.</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Special Focus Areas */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-10 text-education-dark">Special Focus Areas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex items-start space-x-4">
            <div className="bg-education-light text-education-secondary rounded-full p-2 flex-shrink-0">
              <Check className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Emerging Career Fields</h3>
              <p className="text-gray-600 text-sm">AI, Sustainability, Digital Content, Entrepreneurship</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex items-start space-x-4">
            <div className="bg-education-light text-education-secondary rounded-full p-2 flex-shrink-0">
              <Check className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Traditional Careers Reinvented</h3>
              <p className="text-gray-600 text-sm">Medicine, Law, Engineering 2.0</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex items-start space-x-4">
            <div className="bg-education-light text-education-secondary rounded-full p-2 flex-shrink-0">
              <Check className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Career Options after Different Streams</h3>
              <p className="text-gray-600 text-sm">Humanities, Commerce, and Science streams</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex items-start space-x-4">
            <div className="bg-education-light text-education-secondary rounded-full p-2 flex-shrink-0">
              <Check className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Global Career Pathways</h3>
              <p className="text-gray-600 text-sm">Universities Abroad & Competitive Exams</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bonus Tools */}
      <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-education-light to-purple-50">
        <CardHeader>
          <CardTitle className="text-2xl text-education-secondary">Bonus Tools Students Receive</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <p className="font-semibold text-education-secondary">Personalized Career Report</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <p className="font-semibold text-education-secondary">Parent-Student Consultation Guide</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <p className="font-semibold text-education-secondary">Goal Tracker Template</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <p className="font-semibold text-education-secondary">Monthly Career Webinars</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <p className="font-semibold text-education-secondary">Internships Guidance</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Why Choose Us */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-10 text-education-dark">Why Choose Us?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border border-education-light shadow-md hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="bg-education-light rounded-full p-3">
                  <Users className="h-6 w-6 text-education-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">2000+ Students Guided</h3>
                  <p className="text-gray-600">Across India with proven results and personalized guidance</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-education-light shadow-md hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="bg-education-light rounded-full p-3">
                  <Award className="h-6 w-6 text-education-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">94% Higher Confidence</h3>
                  <p className="text-gray-600">Students report better clarity after first 90 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-education-light shadow-md hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="bg-education-light rounded-full p-3">
                  <GraduationCap className="h-6 w-6 text-education-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">University Partnerships</h3>
                  <p className="text-gray-600">With top universities and skill providers for better opportunities</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-education-light shadow-md hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="bg-education-light rounded-full p-3">
                  <Users className="h-6 w-6 text-education-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Experienced Mentors</h3>
                  <p className="text-gray-600">Trained Career Mentors with 10+ Years' Experience</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-education-secondary to-purple-700 text-white rounded-xl p-8 shadow-xl">
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to guide your child to their perfect career path?</h2>
          <p className="text-lg opacity-90">
            Schedule a free 30-minute consultation with our expert career counsellors.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleDownloadPDF}
            className="bg-white/10 hover:bg-white/20 text-white border-white/30"
          >
            <FileText className="mr-2 h-5 w-5" />
            Download Career Counselling Blueprint
          </Button>
          
          <Button 
            variant="secondary" 
            size="lg"
            onClick={handleContactRequest}
            className="bg-white text-education-secondary hover:bg-opacity-90"
          >
            <ArrowRight className="mr-2 h-5 w-5" />
            Schedule Free Consultation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CareerCounsellingBlueprint;