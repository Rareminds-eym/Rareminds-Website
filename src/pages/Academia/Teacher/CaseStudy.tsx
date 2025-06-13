import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Users, Clock, BookOpen, Target, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/Academy/UI/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import AcademyHeader from '../../../components/Header/AcademyHeader'
import FloatingActionMenu  from '../../../components/Academy/StickyButton/StickyButton/FloatingAction'

interface CaseStudyData {
  id: string;
  header: string;
  subheader: string;
  bannerImage: string;
  quickSnapshot: {
    location: string;
    studentsImpacted: string;
    duration: string;
    trainers: string;
    theme: string;
  };
  challenge: string;
  intervention: string[];
  outcomes: string[];
  testimonials: {
    principal?: string;
    student?: string;
    teacher?: string;
  };
  keyFeatures: string[];
  callToAction: string;
}





const caseStudiesData: Record<string, CaseStudyData> = {
  'st-josephs': {
    id: 'st-josephs',
    header: "St. Joseph's School – From Counting Blocks to Coding Bots",
    subheader: "LEGO Education: Transforming Classrooms from KG Math to Grade 9 Robotics",
    bannerImage: "/academy/Casestudy/StJoseph.png",
    quickSnapshot: {
      location: "St. Joseph's School",
      studentsImpacted: "1200+ students (KG to Grade 9)",
      duration: "8 hours",
      trainers: "8 LEGO-certified Facilitators",
      theme: "STEM Education via LEGO"
    },
    challenge: "Every child has the potential to think critically, solve creatively, and build with purpose, when given the right tools early on. At Rareminds, we saw an opportunity to spark this potential through experiential, hands-on learning that grows with the students. However, in many classrooms, early math was and felt like abstract concepts. STEM education remained out of reach. Robotics and coding, in particular, were treated as extras rather than essentials. Teachers lacked the resources to bring concepts to life, and students missed out on learning that connects to the real world.",
    intervention: [
      "Kindergarten – Grade 2: Introduced math through LEGO blocks and play-based learning. Made abstract math concepts tangible and enjoyable for young learners.",
      "Grades 3–5: Logical reasoning and spatial awareness through creative building challenges. Built cognitive skills using hands-on problem-solving and design.",
      "Grades 6–9: Robotics using LEGO kits, introduction to programming logic. Fostered real-world tech fluency and STEM innovation early.",
      "Regular sessions, student exhibitions, and assessment rubrics were implemented. Created structure, visibility, and accountability around the learning process."
    ],
    outcomes: [
      "95% student engagement across grades - Students consistently participated and showed enthusiasm across all levels.",
      "Social Security learning for Grade 5 students - Connected STEM with civic education, expanding interdisciplinary awareness.",
      "70+ robotics prototypes created by Grades 6–9 - Encouraged innovation, teamwork, and applied programming skills.",
      "Teachers trained to use LEGO-based pedagogy - Enabled long-term integration of play-based and experiential teaching."
    ],
    testimonials: {
      principal: "This program brought joy and innovation back into our classrooms.",
      student: "I built my first robot. I want to become an engineer now!"
    },
    keyFeatures: [
      "Age-wise curriculum integration - Learning is developmentally aligned, ensuring concepts are introduced when students are ready to absorb and apply them.",
      "Highly engaging and participatory - Students learn by doing, which increases retention, curiosity, and classroom involvement.",
      "Easy teacher upskilling and replicability - The program is designed for scalability—teachers can adopt it quickly and apply it consistently across classrooms."
    ],
    callToAction: "Partner with us to future-proof your school through integrated STEM learning."
  },
  'global-international': {
    id: 'global-international',
    header: "Global International School – Teacher Transformation Journey",
    subheader: "NEP-Aligned Pedagogy: Empowering Educators for Modern Learning",
    bannerImage: "/academy/Casestudy/GlobalInternational.png",
    quickSnapshot: {
      location: "Global International School",
      studentsImpacted: "500+ students (via trained teachers)",
      duration: "2 days",
      trainers: "6 Certified Education Specialists",
      theme: "Teacher Development & NEP Implementation"
    },
    challenge: "Teachers lacked NEP-aligned pedagogy, tech integration, and learner-centric strategies. Traditional teaching methods were not meeting the evolving needs of 21st-century learners, and educators needed comprehensive support to transform their approach to education.",
    intervention: [
      "Day 1: Digital tools integration workshop focusing on interactive teaching platforms and assessment technologies.",
      "Day 2: Hands-on sessions on engagement strategies, feedback culture development, and personalized learning approaches.",
      "Personalized action plans created for each teacher based on their subject expertise and classroom needs.",
      "Ongoing mentoring support and resource sharing platform established."
    ],
    outcomes: [
      "100% teacher participation with active engagement throughout the program.",
      "Micro-innovation plans developed by each teacher for their specific subjects.",
      "Improved lesson planning incorporating technology and interactive elements.",
      "Enhanced student engagement reported within first month of implementation."
    ],
    testimonials: {
      principal: "Our teachers are now confident in using modern pedagogical approaches.",
      teacher: "The personalized action plan helped me transform my classroom completely."
    },
    keyFeatures: [
      "NEP-aligned curriculum design ensuring compliance with national education policy.",
      "Technology integration making learning more interactive and accessible.",
      "Personalized development approach catering to individual teacher strengths and needs."
    ],
    callToAction: "Transform your teaching faculty with our comprehensive development programs."
  },
  'ryan-international': {
    id: 'ryan-international',
    header: "Ryan International School – Celebrating Sustainability",
    subheader: "One Day. One Planet. One Purpose.",
    bannerImage: "/academy/Casestudy/RyanInternationalSustainability.png", // Add a banner image URL if available
    quickSnapshot: {
      location: "Ryan International School",
      studentsImpacted: "300",
      duration: "1 Day",
      trainers: "4 Subject Experts",
      theme: "Environment and Sustainability"
    },
    challenge: "Students today hear about climate change, sustainability, and conservation across textbooks and media. Sustainability often remained an abstract idea, disconnected from their daily lives, school routines, or future goals. In today’s world where sustainability is more a trend than the need of the hour, students lacked hands-on experiences, despite this theoretical exposure. These concepts need to be made real, relevant, and actionable. However, there is little space in the constraints of the classroom for creativity, ownership, or local problem-solving tied to the environment and community.",
    intervention: [
      "Sessions on Climate Change, Green Careers, and Circular Economy: Introduced real-world environmental challenges and future-focused solutions.",
      "Eco-crafts and Upcycling Competition: Encouraged creative reuse and design thinking using everyday waste materials.",
      "Tree Planting and Pledge Activity: Connected personal responsibility with environmental action through symbolic and practical steps."
    ],
    outcomes: [
      "300+ eco pledges signed - Students committed to everyday actions toward environmental sustainability.",
      "100+ handmade eco-products created - Demonstrated creativity and practical understanding of reuse and waste reduction.",
      "Students ideated campus greening solutions - Generated implementable ideas to improve their immediate environment."
    ],
    testimonials: {
      student: "I didn’t know I could make a wallet from waste cartons!"
    },
    keyFeatures: [
      "Combines awareness with creation - Students move from learning to doing, making lessons memorable and real.",
      "Memorable, celebratory, and deeply impactful - Hands-on activities foster emotional connection and long-term behavior change."
    ],
    callToAction: "Join us in making sustainability a lived experience for students."
  },
  'bldea-schools': {
    id: 'bldea-schools',
    header: "BLDEA Schools – Deep Dive into Teacher Excellence",
    subheader: "3 Days and 360° Growth in Teaching Competency",
    bannerImage: "/academy/Casestudy/BLDEASchoolsDeepDiveintoTeacherExcellence.png", // Add a banner image URL if available
    quickSnapshot: {
      location: "BLDEA Schools, Karnataka",
      teachersTrained: "200+",
      duration: "3 Days",
      trainers: "5 Master Trainers",
      theme: "Teacher Excellence Framework"
    },
    challenge: "Great schools are built by great teachers. Consistent excellence requires intentional support and ongoing development. Teachers lack structured capacity-building across key areas: pedagogy, communication, and emotional intelligence, making it difficult to adapt to evolving classroom needs. As education shifts toward learner-centric, inclusive, and NEP-aligned practices, many educators feel unprepared and unsupported. Lesson planning required to be integrated with modern methods, assessment methods required uniformity, and classroom engagement needed to be modified to include student engagement. A unified framework became the priority to make teacher growth fragmented and reactive.",
    intervention: [
      "Workshop modules on NEP and Effective Classroom Engagement: Aligned teaching practices with modern educational requirements and inclusive values for young learners.",
      "Multiple Approaches: Roleplays, Lesson Design Labs, Reflection Circles - Moved teachers from passive learning to active, peer-supported application."
    ],
    outcomes: [
      "Over 90% teachers submitted revised lesson plans - Demonstrated ownership and immediate integration of training insights.",
      "Leadership committed to regular in-house mentoring circles - Built continuity and internal accountability for teacher growth."
    ],
    testimonials: {
      seniorTeacher: "This is the most transformative training I’ve attended in years."
    },
    keyFeatures: [
      "Comprehensive, interactive, and customizable - Adapts to different school contexts without compromising depth.",
      "Elevates both mindset and method - Focuses on personal growth and professional excellence together."
    ],
    callToAction: "Upgrade your school’s teaching culture with our multi-day intensive program."
  },
  'ghss-tamil-nadu': {
    id: 'ghss-tamil-nadu',
    header: "GHSS Tamil Nadu – Youth Powered by Agri & Cloud Kitchens",
    subheader: "From Farm to Startup – A New Vision for Rural Youth",
    bannerImage: "/academy/Casestudy/GHSSTamilInnovation.png", // Add a banner image URL if available
    quickSnapshot: {
      location: "GHSS, Tamil Nadu",
      studentsImpacted: "3057+ (Grades 12)",
      duration: "7 Days and 45 hours in total",
      trainers: "6 Industry Experts",
      theme: "Agribusiness & Cloud Kitchens"
    },
    challenge: "Every student has the potential to build, lead, and create change, especially when their learning is tied to real-world possibilities. For many students, the exposure to agriculture stopped at the field, making viable enterprises aligned with future-forward careers seem a faraway dream. Therefore, classroom learning called for stronger links to hands-on experiences and local enterprise exposure. Career guidance had to be contextual, relevant, and rooted in community-based opportunities. Teachers needed to go beyond traditional methods of teaching to include practical tools and frameworks. This will help them integrate entrepreneurial thinking into everyday lessons.",
    intervention: [
      "Modules on Organic Farming: Introduced sustainable practices and their market relevance.",
      "Supply Chain: Helped students understand how products move from farm to table.",
      "Cloud Kitchen Models: Showcased low-investment, high-impact food enterprise possibilities.",
      "Hands-on Project: Creating a Mini Cloud Kitchen Business Plan - Enabled students to apply learning through practical entrepreneurship.",
      "Career Maps and Idea Pitching Sessions: Guided students to connect aspirations with actionable next steps."
    ],
    outcomes: [
      "150+ teams of 1974 students pitched agri-startup ideas - Students demonstrated initiative, collaboration, and creative problem-solving.",
      "Students linked learning to local livelihood opportunities - Reinforced relevance and encouraged community-rooted innovation.",
      "Teachers requested more project-based modules - Validated the program’s classroom utility and impact."
    ],
    testimonials: {
      student: "I want to start a millet-based food truck in my village."
    },
    keyFeatures: [
      "Brings entrepreneurship mindset into rural classrooms - Students see themselves as change-makers, not just job-seekers.",
      "High relevance, low-cost implementation - Designed for scalability across diverse educational settings."
    ],
    callToAction: "Empower your students to explore agri-entrepreneurship and food innovation today."
  }
};

interface HeaderProps {

  CasestudyDetailToCasestudy: () => void;
}

const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const caseStudy = id ? caseStudiesData[id] : null;
  // const navigate = useNavigate();


  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Case Study Not Found</h1>
          <Link to="/" className="text-red-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <AcademyHeader />
      <FloatingActionMenu />
      {/* Banner Section with Image */}
     <div
  className="relative w-full h-[40vh] md:h-[50vh] bg-cover bg-center mt-[80px] flex items-center"
  style={{
    backgroundImage: `url(${caseStudy.bannerImage})`
  }}
>
  {/* Blurred Background */}
  <div className="absolute inset-0 bg-black opacity-30 backdrop-blur-sm z-0"></div>

  <div className='w-full relative z-10'>
    <div className="flex flex-col justify-center items-center mx-auto px-4 md:px-[2%] py-12 text-white">
      <h1 className="text-3xl md:text-5xl text-center font-bold mb-4 max-auto">{caseStudy.header}</h1>
      <p className="text-xl md:text-2xl opacity-90 max-auto">{caseStudy.subheader}</p>
    </div>

    <div className='w-auto h-auto md:pl-[10%] flex justify-start px-[2%]'>
      <Link to="/school/teacher#scrollToFacultyTransformation">
        <button
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Case Studies
        </button>
      </Link>
    </div>
  </div>
</div>


      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Quick Snapshot */}
        <Card className="mb-10 overflow-hidden border-none shadow-lg transition-transform transform hover:scale-105">
  <div className="bg-red-600 py-3 px-6">
    <h2 className="text-xl font-bold text-white">Quick Snapshot</h2>
  </div>
  <CardContent className="p-6 pt-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        { label: "Location", value: caseStudy.quickSnapshot.location, icon: <MapPin className="text-red-600 h-5 w-5" /> },
        { label: "Students Impacted", value: caseStudy.quickSnapshot.studentsImpacted, icon: <Users className="text-red-600 h-5 w-5" /> },
        { label: "Duration", value: caseStudy.quickSnapshot.duration, icon: <Clock className="text-red-600 h-5 w-5" /> },
        { label: "Trainers", value: caseStudy.quickSnapshot.trainers, icon: <BookOpen className="text-red-600 h-5 w-5" /> },
        { label: "Core Theme", value: caseStudy.quickSnapshot.theme, icon: <Target className="text-red-600 h-5 w-5" /> },
      ].map((item, index) => (
        <div key={index} className="flex items-start gap-4 transition-transform transform hover:scale-110">
          <div className="bg-red-100 p-2 rounded-full transition-transform transform hover:scale-125">
            {item.icon}
          </div>
          <div>
            <p className="font-medium text-gray-500">{item.label}</p>
            <p className="text-gray-900">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  </CardContent>
</Card>


          {/* Challenge */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="bg-red-600 h-8 w-2 rounded-sm"></div>
              The Challenge
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">{caseStudy.challenge}</p>
          </div>

          {/* Intervention */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="bg-red-600 h-8 w-2 rounded-sm"></div>
              Our Intervention
            </h2>
            <div className="space-y-6">
              {caseStudy.intervention.map((item, index) => (
                <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Outcomes */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="bg-red-600 h-8 w-2 rounded-sm"></div>
              Outcomes and Impact
            </h2>
            <div className="space-y-6">
              {caseStudy.outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                    <CheckCircle className="text-green-600 h-5 w-5" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{outcome}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="bg-red-600 h-8 w-2 rounded-sm"></div>
              Testimonials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudy.testimonials.principal && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="mb-4">
                    <div className="text-red-600 font-bold">Principal</div>
                    <div className="w-12 h-1 bg-red-600 mt-1"></div>
                  </div>
                  <p className="italic text-gray-700 mb-2 text-lg">"{caseStudy.testimonials.principal}"</p>
                </div>
              )}
              {caseStudy.testimonials.student && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="mb-4">
                    <div className="text-red-600 font-bold">Student</div>
                    <div className="w-12 h-1 bg-red-600 mt-1"></div>
                  </div>
                  <p className="italic text-gray-700 mb-2 text-lg">"{caseStudy.testimonials.student}"</p>
                </div>
              )}
              {caseStudy.testimonials.teacher && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="mb-4">
                    <div className="text-red-600 font-bold">Teacher</div>
                    <div className="w-12 h-1 bg-red-600 mt-1"></div>
                  </div>
                  <p className="italic text-gray-700 mb-2 text-lg">"{caseStudy.testimonials.teacher}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="bg-red-600 h-8 w-2 rounded-sm"></div>
              Turning Training Into Transformation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudy.keyFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    ✓
                  </div>
                  <p className="text-gray-700 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-8 text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Ready to Transform Your School?</h2>
            <p className="text-xl mb-6 opacity-90 max-w-2xl mx-auto">{caseStudy.callToAction}</p>
            <Button className="bg-white text-red-600 hover:bg-gray-100 hover:text-red-700 transition-colors px-8 py-6 h-auto text-lg font-medium">
              Get Started Today
            </Button>
          </div>
        </div>
      </div>

      

    </div>
  );
};

export default CaseStudy;
