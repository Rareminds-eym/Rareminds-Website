import React, { useState } from 'react';
import { Button } from '../UI/button';
import { Calendar, GraduationCap, ArrowRight, CheckSquare } from 'lucide-react';
import CareerCounsellingBlueprint from './CareerCounsellingBlueprint';
import NEPChecklist from './NEPChecklist';
import { useToast } from '@/hooks/use-toast';

const programs = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const { toast } = useToast();
  
  const dayData = [
    {
      day: 1,
      title: "The Future of Learning & NEP 2020 Alignment",
      theme: "Teaching Beyond Textbooks",
      color: "#4F46E5", // education-primary
      morning: [
        {
          title: "Introduction to NEP 2020 – Key Changes for Schools",
          description: "Comprehensive overview of National Education Policy 2020 and its implications for K-12 education.",
          time: "9:30 AM - 11:00 AM"
        },
        {
          title: "The Future Learner Profile – Gen Z & Gen Alpha Behavior Insights",
          description: "Understanding the characteristics, learning behaviors, and needs of modern students.",
          time: "11:15 AM - 12:45 PM"
        }
      ],
      afternoon: [
        {
          title: "Curriculum Mapping with NEP Guidelines",
          description: "Hands-on session on aligning existing curriculum with NEP 2020 recommendations.",
          time: "1:45 PM - 3:15 PM"
        },
        {
          title: "Interactive Group Activity: Designing Future-Ready Lesson Plans",
          description: "Collaborative workshop to create innovative lesson plans that integrate 21st-century skills.",
          time: "3:30 PM - 5:00 PM"
        }
      ]
    },
    {
      day: 2,
      title: "Digital Pedagogy & Tech Tools for Classrooms",
      theme: "Teaching with Tech – Without Losing Human Touch",
      color: "#8B5CF6", // education-secondary
      morning: [
        {
          title: "Google Classroom, MS Teams, and Online Teaching Best Practices",
          description: "Mastering popular educational platforms to create engaging virtual learning environments.",
          time: "9:30 AM - 11:00 AM"
        },
        {
          title: "AI Tools for Teachers – Easy & Ethical Usage",
          description: "Introduction to AI-assisted teaching tools and ethical guidelines for implementation.",
          time: "11:15 AM - 12:45 PM"
        }
      ],
      afternoon: [
        {
          title: "Canva for Teaching Content Creation",
          description: "Creating visually appealing educational materials using Canva's educator-friendly features.",
          time: "1:45 PM - 3:15 PM"
        },
        {
          title: "Creating Assessments & Quizzes Online (Kahoot, Mentimeter)",
          description: "Hands-on session on designing interactive assessments using popular digital platforms.",
          time: "3:30 PM - 5:00 PM"
        }
      ]
    },
    {
      day: 3,
      title: "Classroom Management & Emotional Intelligence",
      theme: "Connect Before You Correct",
      color: "#06B6D4", // education-accent
      morning: [
        {
          title: "Emotional Intelligence in Teaching",
          description: "Developing EQ skills to better understand student needs and create supportive learning environments.",
          time: "9:30 AM - 11:00 AM"
        },
        {
          title: "Identifying Student Behavioral Patterns",
          description: "Recognizing various behavioral signals and their underlying causes for effective intervention.",
          time: "11:15 AM - 12:45 PM"
        }
      ],
      afternoon: [
        {
          title: "Stress-Free Classroom Management Techniques",
          description: "Practical strategies to maintain classroom discipline while fostering a positive atmosphere.",
          time: "1:45 PM - 3:15 PM"
        },
        {
          title: "Role Play & Case Studies: Handling Classroom Scenarios",
          description: "Interactive session addressing real-world classroom challenges through simulations.",
          time: "3:30 PM - 5:00 PM"
        }
      ]
    },
    {
      day: 4,
      title: "Train The Trainer & Leadership Essentials",
      theme: "Leading with Vision, Teaching with Purpose",
      color: "#10B981", // education-success
      morning: [
        {
          title: "Building Leadership Mindset for Senior Teachers",
          description: "Developing leadership qualities to mentor colleagues and influence institutional growth.",
          time: "9:30 AM - 11:00 AM"
        },
        {
          title: "Effective Teacher Communication Strategies",
          description: "Enhancing communication skills for better collaboration with students, parents and colleagues.",
          time: "11:15 AM - 12:45 PM"
        }
      ],
      afternoon: [
        {
          title: "Peer-to-Peer Learning Circles",
          description: "Establishing sustainable knowledge-sharing communities within school departments.",
          time: "1:45 PM - 3:15 PM"
        },
        {
          title: "Creating a School-wide Mentoring Framework",
          description: "Designing structured mentorship programs to support new and developing teachers.",
          time: "3:30 PM - 5:00 PM"
        }
      ]
    },
    {
      day: 5,
      title: "Capstone Day – Designing Your Teaching Roadmap",
      theme: "Every Teacher a Changemaker",
      color: "#F59E0B", // education-warning
      morning: [
        {
          title: "Goal Setting for Teachers (Annual & Monthly Plans)",
          description: "Creating structured personal development plans with actionable milestones.",
          time: "9:30 AM - 11:00 AM"
        },
        {
          title: "Work-Life Integration for Educators",
          description: "Strategies for maintaining well-being while excelling in the demanding profession of teaching.",
          time: "11:15 AM - 12:45 PM"
        }
      ],
      afternoon: [
        {
          title: "Faculty Presentations: 'My Next-Gen Classroom Plan'",
          description: "Showcase of innovative teaching strategies developed during the program.",
          time: "1:45 PM - 3:15 PM"
        },
        {
          title: "Certificate Distribution & Feedback",
          description: "Recognition ceremony and structured feedback session for program improvement.",
          time: "3:30 PM - 5:00 PM"
        }
      ]
    }
  ];
  
  const [selectedSection, setSelectedSection] = useState<'tdp' | 'career' | 'nep'>('tdp');
  
  const handleDownloadPDF = () => {
    toast({
      title: "PDF Download Started",
      description: "Your 5-Day TDP Calendar PDF is being downloaded.",
    });
  };
  
  const handleContactRequest = () => {
    toast({
      title: "Request Received",
      description: "Our Academic Program Head will contact you shortly.",
    });
  };
  
  const handleButtonClick = (index: number) => {
    setActiveSection(index === activeSection ? null : index);
  };

  // Function to render a day card
  const renderDayCard = (day: any, index: number) => {
    return (
      <div key={index} className="day-card">
        <div className="day-card-header" style={{ backgroundColor: day.color }}>
          <div className="flex items-center text-white">
            <span className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold text-white">
              {day.day}
            </span>
            <h3 className="font-semibold">{day.title}</h3>
          </div>
        </div>
        
        <div className="bg-gray-50 px-4 py-2">
          <p className="text-sm font-medium text-gray-600">Theme:</p>
          <p className="text-sm italic">"{day.theme}"</p>
        </div>
        
        <div className="day-card-content">
          <div className="mb-4">
            <h4 className="font-semibold mb-2 text-gray-700">Morning Sessions:</h4>
            <div className="space-y-2">
              {day.morning.map((session: any, idx: number) => (
                <div key={idx} className="session-item">
                  <h5 className="font-medium text-sm">{session.title}</h5>
                  <p className="text-xs text-gray-600">{session.description}</p>
                  <p className="text-xs font-medium mt-1 text-gray-500">{session.time}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2 text-gray-700">Afternoon Workshops:</h4>
            <div className="space-y-2">
              {day.afternoon.map((session: any, idx: number) => (
                <div key={idx} className="session-item">
                  <h5 className="font-medium text-sm">{session.title}</h5>
                  <p className="text-xs text-gray-600">{session.description}</p>
                  <p className="text-xs font-medium mt-1 text-gray-500">{session.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Bonus section component
  const renderBonusSection = () => {
    return (
      <div className="bg-education-light rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-full bg-education-primary text-white flex items-center justify-center">
            <span className="font-bold">+</span>
          </div>
          <h2 className="text-xl font-bold text-education-primary">Bonus Goodie Pack</h2>
        </div>
        
        <p className="mb-4 text-education-dark opacity-75">
          Every participating faculty member receives these downloadable resources:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <p className="font-semibold text-education-primary mb-1">Lesson Plan Formats</p>
            <p className="text-sm text-gray-500">Ready-to-use templates for lesson planning</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <p className="font-semibold text-education-primary mb-1">Assessment Rubrics</p>
            <p className="text-sm text-gray-500">Standardized evaluation frameworks</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <p className="font-semibold text-education-primary mb-1">Engagement Checklist</p>
            <p className="text-sm text-gray-500">Student participation tracking tools</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <p className="font-semibold text-education-primary mb-1">Digital Tool Guide</p>
            <p className="text-sm text-gray-500">Curated edtech tools for classroom use</p>
          </div>
        </div>
      </div>
    );
  };
  
  // CTA Section component
  const renderCTASection = () => {
    return (
      <div className="bg-gradient-to-r from-education-primary to-education-secondary text-white rounded-xl p-8 shadow-xl">
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Faculty who learn, lead. Classrooms that change, inspire.</h2>
          <p className="text-lg opacity-90">
            Transform your teaching approach and empower your educators with our comprehensive development program.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleDownloadPDF}
            className="bg-white/10 hover:bg-white/20 text-white border-white/30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Full 5-Day TDP Calendar PDF
          </Button>
          
          <Button 
            variant="secondary" 
            size="lg"
            onClick={handleContactRequest}
            className="bg-white text-education-primary hover:bg-opacity-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Talk to Our Academic Program Head
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-education-primary to-education-secondary text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
            <Calendar className="h-5 w-5" />
            <span className="font-medium">Education Programs</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Reimagine Teaching. Redefine Learning.
          </h1>
          
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Designed for Schools | Customizable for CBSE / ICSE / State Boards
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              className={`px-6 py-6 text-lg ${selectedSection === 'tdp' ? 'bg-white text-education-primary' : 'bg-white/20 hover:bg-white/30'}`}
              onClick={() => setSelectedSection('tdp')}
            >
              <Calendar className="mr-2" />
              5-Day TDP Calendar
            </Button>
            <Button 
              className={`px-6 py-6 text-lg ${selectedSection === 'career' ? 'bg-white text-education-primary' : 'bg-white/20 hover:bg-white/30'}`}
              onClick={() => setSelectedSection('career')}
            >
              <GraduationCap className="mr-2" />
              Career Counselling Blueprint
            </Button>
            <Button 
              className={`px-6 py-6 text-lg ${selectedSection === 'nep' ? 'bg-white text-education-primary' : 'bg-white/20 hover:bg-white/30'}`}
              onClick={() => setSelectedSection('nep')}
            >
              <CheckSquare className="mr-2" />
              NEP-Ready Checklist
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto py-12 px-4">
        {selectedSection === 'tdp' ? (
          <>
            {/* Day buttons for TDP section */}
            <div className="mb-8 flex flex-wrap gap-2 justify-center">
              {dayData.map((day, index) => (
                <Button 
                  key={index}
                  className={`px-4 py-2 ${activeSection === index ? 'bg-education-primary text-white' : 'bg-white text-education-primary border border-education-primary'}`}
                  onClick={() => handleButtonClick(index)}
                >
                  Day {day.day}
                </Button>
              ))}
            </div>
              
            {/* Calendar Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {activeSection !== null ? (
                renderDayCard(dayData[activeSection], activeSection)
              ) : (
                dayData.map((day, index) => renderDayCard(day, index))
              )}
            </div>
            
            {/* Bonus Section */}
            <div className="mb-16">
              {renderBonusSection()}
            </div>
            
            {/* CTA Section */}
            {renderCTASection()}
          </>
        ) : selectedSection === 'career' ? (
          <CareerCounsellingBlueprint />
        ) : (
          <NEPChecklist />
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-education-dark text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p>© 2025 Teacher Development Program. All rights reserved.</p>
          <div className="mt-4 text-sm opacity-75">
            <a href="#" className="hover:underline mx-2">Terms & Conditions</a>
            <a href="#" className="hover:underline mx-2">Privacy Policy</a>
            <a href="#" className="hover:underline mx-2">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default programs;
