import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, ArrowRight, Star, Award, Lightbulb, Users2, FileText, Target } from 'lucide-react';
import {
  Coursess,
  institutionalValueAddedDetails,
  leadershipCareerGrowthDetails,
  domainSpecificCertificationDetails,
  mentalHealthCounselingDetails,
  communicationPersonalityDevelopmentDetails
} from './Cources';
import AcademyHeader from '@/components/Header/AcademyHeader';
import React, { useEffect } from 'react';
import { Book } from "@/components/ui/book";

const iconMap = {
  Award,
  Target,
  Lightbulb,
  Users2,
  FileText,
};

export default function CourseDetailed() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = Coursess.find((s) => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  // Render detailed pages for all data-driven courses
  let data = null;
  if (course.id === 'institutional-value-added') {
    data = institutionalValueAddedDetails;
  } else if (course.id === 'leadership-career-growth') {
    data = leadershipCareerGrowthDetails;
  } else if (course.id === 'domain-specific-certification') {
    data = domainSpecificCertificationDetails;
  } else if (course.id === 'mental-health-counseling') {
    data = mentalHealthCounselingDetails;
  } else if (course.id === 'communication-personality') {
    data = communicationPersonalityDevelopmentDetails;
  } else if (course.id === 'Teacher Development Programs (TDP)') {
    const tdpSubcards = [
      {
        title: 'NEP Implementation for Foundational, Preparatory, Middle & Secondary Stages',
      },
      {
        title: 'Pedagogy: Activity-Based Learning (ABL), Experiential Learning, Gamification and EdTech Integration, Blended Learning Methods, Assessment Design and Bloom’s Taxonomy Mapping',
      },
      {
        title: 'Differentiated Instruction and Inclusive Classrooms; Holistic Development; Remedial and Special Education Support Training',
      },
      {
        title: 'Entrepreneurial teacher (Mentoring startups, incubation programs, IIC involvement)\nCultivating Young Innovators: Empowering Teachers to Foster Entrepreneurial Mindsets',
      },
      {
        title: 'Green Campus & Sustainability Education – Schools',
      },
      {
        title: 'Digital & Pedagogical Upskilling',
      },
    ];
    return (
      <>
        <AcademyHeader />
        <section className="pb-20">
          <div className="relative h-[45vh] flex items-center bg-black/60 pl-[8%] mb-12">
            <div className="container mx-auto px-6 flex flex-col justify-center h-full">
              <button
                onClick={() => navigate('/academia/school')}
                className="text-white mb-7 text-lg flex items-center gap-2 hover:underline"
              >
                <ArrowLeft className="w-4 h-4 " />
                Back to Courses
              </button>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                {course.name}
              </h1>
              {course.subtitle && (
                <p className="text-lg text-white/90 drop-shadow">
                  {course.subtitle}
                </p>
              )}
            </div>
          </div>
         <div className="max-w-6xl mx-auto px-6">
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {tdpSubcards.map((sub, i) => (
      <Book key={i} depth={10 + i * 2} color="#D5D5D5" variant="default" width={340}>
        <div className="flex items-center justify-center h-full p-6">
          <div className="w-64 h-72 flex items-center justify-center text-center">
            <h3 className="font-semibold text-white text-base">{sub.title}</h3>
          </div>
        </div>
      </Book>
    ))}
  </div>
</div>

        </section>
      </>
    );
  }

  if (data) {
    return (
      <>
      <AcademyHeader />
      <section className="pb-20 mt-[80px]">
        {/* Hero Banner with Back Button, Title, Subtitle */}
        <div className="relative h-[45vh] flex items-center bg-black/60 pl-[2%] mb-12">
          <div className="container mx-auto px-6 flex flex-col justify-center h-full">
            <button
              onClick={() => navigate('/academia/school')}
              className="text-white mb-7 text-lg flex items-center gap-2 hover:underline"
            >
              <ArrowLeft className="w-4 h-4 " />
              Back to Courses
            </button>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
              {course.name}
            </h1>
            {course.subtitle && (
              <p className="text-lg text-white/90 drop-shadow">
                {course.subtitle}
              </p>
            )}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Side - Problem & Solution */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {data.title}
                </h2>
                {data.intro.map((p, i) => (
                  <p key={i} className={`text-lg text-gray-700 leading-relaxed${i === 0 ? ' mb-8' : ''}`}>{p}</p>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Star className="h-6 w-6 text-blue-600 mr-3" />
                  Why It Matters
                </h3>
                <ul className="space-y-4">
                  {data.whyItMatters.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Side - Services Highlights */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-black/50 rounded-2xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-8 flex items-center">
                  <ArrowRight className="h-6 w-6 mr-3" />
                  How RareMinds Supports Schools
                </h3>
                <div className="space-y-6">
                  {data.highlights.map((item, i) => {
                    const Icon = iconMap[item.icon as keyof typeof iconMap];
                    return (
                      <div key={i} className="flex items-start space-x-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-colors">
                        {Icon && <Icon className="h-6 w-6 text-red-300 mt-1 flex-shrink-0" />}
                        <span className="text-white">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-8 p-6 bg-red-500 rounded-xl text-ehite">
                  <h4 className="text-xl font-bold mb-2">{data.cta.heading}</h4>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom CTA Section */}
          <div className="mt-20 text-center bg-gray-50 rounded-2xl p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              {data.cta.heading}
            </h3>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {data.cta.text}
            </p>
            <div className="mt-8">
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-300 transform hover:scale-105 shadow-lg">
                {data.cta.button}
              </button>
            </div>
          </div>
        </div>
      </section>

      </>
    );
  }

  // For all other courses, show a placeholder or empty detailed page
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Course details coming soon</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800"
        >
          Go back
        </button>
      </div>
    </div>
  );
}
