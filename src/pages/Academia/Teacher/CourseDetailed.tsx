import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, ArrowRight, Star, Award, Lightbulb, Users2, FileText, Target, CalendarCheck, Briefcase, Users, Heart, BarChart2 } from 'lucide-react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '../../../components/Academy/UI/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/Academy/UI/table';
import { Clock, BookOpen, TrendingUp } from 'lucide-react';
import FloatingActionMenu from "../../../components/Academy/StickyButton/StickyButton/FloatingAction"

const iconMap = {
  Award,
  Target,
  Lightbulb,
  Users2,
  FileText,
  CalendarCheck,
  Briefcase,
  Users,
  Heart,
  BarChart2,
};

const modules = [
  {
    id: 1,
    title: "Spoken English for the Classroom",
    hours: 9,
    objectives: "Improve classroom English fluency, pronunciation, and basic command",
    activities: "Speaking drills, situational dialogues, fluency games",
    outcomes: "Improved everyday classroom communication and teacher confidence"
  },
  {
    id: 2,
    title: "Public Speaking & Presentation Skills",
    hours: 9,
    objectives: "Build effective delivery, stage presence, and clarity for group settings",
    activities: "Presentations, voice modulation exercises, peer feedback",
    outcomes: "Clearer articulation, stronger presence in meetings and events"
  },
  {
    id: 3,
    title: "Inclusive and Stress-Free Classroom Management",
    hours: 9,
    objectives: "Adopt non-punitive strategies to manage diverse student behaviors",
    activities: "Classroom scenarios, role-play, and behavior mapping tools",
    outcomes: "Increased control, calmer classrooms, inclusive engagement"
  },
  {
    id: 4,
    title: "Parent Communication & Feedback Delivery",
    hours: 9,
    objectives: "Develop structured and empathetic communication with parents",
    activities: "Role-play with parent profiles, email templates, video-based practice",
    outcomes: "Improved handling of parent conversations and feedback clarity"
  },
  {
    id: 5,
    title: "Personal Confidence & Influence Building",
    hours: 9,
    objectives: "Strengthen personal presence, emotional control, and professional demeanor",
    activities: "Group reflection, assertiveness exercises, self-assessment journals",
    outcomes: "Higher confidence, better influence in peer and leadership interactions"
  }
];

// Table data for communication-personality
const communicationPersonalityModules = [
  {
    id: 1,
    title: "Spoken English for the Classroom",
    hours: 9,
    objectives: "Improve classroom English fluency, pronunciation, and basic command",
    activities: "Speaking drills, situational dialogues, fluency games",
    outcomes: "Improved everyday classroom communication and teacher confidence"
  },
  {
    id: 2,
    title: "Public Speaking & Presentation Skills",
    hours: 9,
    objectives: "Build effective delivery, stage presence, and clarity for group settings",
    activities: "Presentations, voice modulation exercises, peer feedback",
    outcomes: "Clearer articulation, stronger presence in meetings and events"
  },
  {
    id: 3,
    title: "Inclusive and Stress-Free Classroom Management",
    hours: 9,
    objectives: "Adopt non-punitive strategies to manage diverse student behaviors",
    activities: "Classroom scenarios, role-play, and behavior mapping tools",
    outcomes: "Increased control, calmer classrooms, inclusive engagement"
  },
  {
    id: 4,
    title: "Parent Communication & Feedback Delivery",
    hours: 9,
    objectives: "Develop structured and empathetic communication with parents",
    activities: "Role-play with parent profiles, email templates, video-based practice",
    outcomes: "Improved handling of parent conversations and feedback clarity"
  },
  {
    id: 5,
    title: "Personal Confidence & Influence Building",
    hours: 9,
    objectives: "Strengthen personal presence, emotional control, and professional demeanor",
    activities: "Group reflection, assertiveness exercises, self-assessment journals",
    outcomes: "Higher confidence, better influence in peer and leadership interactions"
  }
];


  const otherCourses = [
  { name: 'Communication and Personality Development', route: '/school/teacher/Courses/communication-personality' },
  { name: 'Mental Health and Counseling Training', route: '/school/teacher/Courses/mental-health-counseling' },
  { name: 'Domain-Specific Certification Programs', route: '/school/teacher/Courses/domain-specific-certification' },
  { name: 'Leadership and Career Growth', route: '/school/teacher/Courses/leadership-career-growth' },
  { name: 'Institutional Value-Added Services', route: '/school/teacher/Courses/institutional-value-added' },
];



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
    return (
      <>
        <AcademyHeader />
        <section className="pb-20">
          <div className="relative h-[45vh] mb-12 overflow-hidden mt-[80px]">
            {/* Blurred and black & white background image */}
            <div
              className="absolute inset-0 bg-cover bg-center filter grayscale"
              style={{ backgroundImage: `url(${course.image})` }}
            ></div>
            {/* Black overlay with 50% opacity */}
            <div className="absolute inset-0 bg-black opacity-30 backdrop-blur-sm z-0"></div>
            {/* Foreground content */}
            <div className="relative z-10 container mx-auto px-6 pl-[8%] p-6 flex flex-col justify-center h-full">
              <button
                onClick={() => navigate('/school/teacher#course-cards-section')}
                className="text-white mb-7 text-lg flex items-center gap-2 hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Courses
              </button>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                {course.name}
              </h1>
              {course.subtitle && (
                <p className="text-lg text-white/90 drop-shadow">{course.subtitle}</p>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Coming Soon</h2>
              <p className="text-lg text-gray-600 mb-4">Detailed information about this program will be available soon.</p>
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
      <FloatingActionMenu />
      <section className=" mt-[80px]">
        {/* Hero Banner with Back Button, Title, Subtitle */}
    <div className="relative h-[45vh] flex items-center md:pl-[1%] mb-12 overflow-hidden">
  {/* Background Image with opacity */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${course.image})` }}
  ></div>
 <div className="absolute inset-0 bg-black opacity-10 backdrop-blur-sm z-0"></div>
  {/* Content on top */}
  <div className="relative z-10 container mx-auto px-6 flex flex-col justify-center h-full">
    <button
      onClick={() => navigate('/school/teacher#course-cards-section')}
      className="text-black mb-7 text-lg flex items-center gap-2 hover:underline"
    >
      <ArrowLeft className="w-4 h-4" />
      Back to Courses
    </button>
    <h1 className="text-3xl md:text-4xl font-bold text-black mb-2 drop-shadow-lg">
      {course.name}
    </h1>
    {course.subtitle && (
      <p className="text-lg text-black/90 drop-shadow">{course.subtitle}</p>
    )}
  </div>
</div>


        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Side - Problem & Solution */}
            <div className="space-y-8">
              <div>
               
                  <p className="text-xl   text-gray-900 mb-6">
                  {data.subtitle}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {data.title}
                </h2>
                {data.intro.map((p, i) => (
                  <p key={i} className={`text-lg text-gray-700 leading-relaxed${i === 0 ? ' mb-8' : ''}`}>{p}</p>
                ))}
              </div>
 <div className="bg-gray-100 rounded-2xl p-8 text-black shadow-2xl">
                <h3 className="text-2xl font-bold mb-8 flex items-center">
                  <ArrowRight className="h-6 w-6 mr-3" />
                  How RareMinds Supports Schools
                </h3>
                <div className="space-y-6">
                  {data.highlights.map((item, i) => {
                    const Icon = iconMap[item.icon as keyof typeof iconMap];
                    return (
                      <div key={i} className="flex items-start space-x-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-colors">
                        {Icon && <Icon className="h-6 w-6 text-black mt-1 flex-shrink-0" />}
                        <span className="text-black">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-8 p-6 bg-black/10 rounded-xl text-ehite">
                  <h4 className="text-xl font-bold mb-2">{data.cta.heading}</h4>
                </div>
              </div>
            
            </div>


                  
<aside className="w-auto mb-8 md:mb-0">
  <div className="md:sticky md:top-8 space-y-8 ">
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Other Courses</h2>
      <ul className="space-y-2">
        {otherCourses.map(course => (
          <li key={course.name}>
            <button className="text-red-700 hover:underline text-left font-semibold" onClick={() => navigate(course.route)}>{course.name}</button>
          </li>
        ))}
      </ul>
    </div>
    <div className="w-full bg-blue-50 rounded-xl p-8">
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
</aside>


  
          </div>
          {/* Bottom CTA Section */}
          {/* <div className="mt-20 text-center bg-gray-50 rounded-2xl p-12">
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
          </div> */}
        </div>
        
         <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 mt-20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {course.name}
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            {course.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Total Duration: {course.duration || 'N/A'}</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span>{course.modules ? `${course.modules.length} Comprehensive Modules` : 'Modules info coming soon'}</span>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <Card className="mb-12 border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-900">
              Module Plan Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <TableHead className="font-bold text-gray-900 w-12">#</TableHead>
                    <TableHead className="font-bold text-gray-900 min-w-[200px]">Module Title</TableHead>
                    <TableHead className="font-bold text-gray-900 text-center w-20">Hours</TableHead>
                    <TableHead className="font-bold text-gray-900 min-w-[250px]">Learning Objectives</TableHead>
                    <TableHead className="font-bold text-gray-900 min-w-[250px]">Activities / Tools</TableHead>
                    <TableHead className="font-bold text-gray-900 min-w-[250px]">Outcomes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
            {(course.modules || []).map((module) => (
              <TableRow key={module.id} className="hover:bg-blue-50/50 transition-colors">
                <TableCell className="text-center">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {module.id}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-semibold text-gray-900 leading-tight">
                    {module.title}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    <Clock className="w-3 h-3 mr-1" />
                    {module.hours}h
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    <div className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      {module.objectives}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    <div className="flex items-start gap-2">
                      <BookOpen className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {module.activities}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                      {module.outcomes}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Summary Statistics */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold mb-2">45</div>
              <div className="text-blue-100">Total Hours</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold mb-2">5</div>
              <div className="text-green-100">Core Modules</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-purple-100">Practical Focus</div>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>

      </section>

      </>
    );
  }

  if (course.id === 'communication-personality') {
    return (
      <>
        <AcademyHeader />
        <section className="pb-20 mt-[80px]">
          {/* Hero Banner with Back Button, Title, Subtitle */}
          <div className="relative h-[45vh] flex items-center pl-[8%] mb-12 overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${course.image})` }} />
            <div className="relative z-10 container mx-auto px-6 flex flex-col justify-center h-full">
              <button
                onClick={() => navigate('/school/teacher#course-cards-section')}
                className="text-black mb-7 text-lg flex items-center gap-2 hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Courses
              </button>
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-2 drop-shadow-lg">
                {course.name}
              </h1>
              {course.subtitle && (
                <p className="text-lg text-black/90 drop-shadow">{course.subtitle}</p>
              )}
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6">
            {/* Table Section */}
            <Card className="mb-12 border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-gray-900">
                  Module Plan Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-blue-50 to-indigo-50  ">
                        <TableHead className="font-bold text-gray-900 w-12 ">#</TableHead>
                        <TableHead className="font-bold text-gray-900 min-w-[200px]">Module Title</TableHead>
                        <TableHead className="font-bold text-gray-900 text-center w-20">Hours</TableHead>
                        <TableHead className="font-bold text-gray-900 min-w-[250px]">Learning Objectives</TableHead>
                        <TableHead className="font-bold text-gray-900 min-w-[250px]">Activities / Tools</TableHead>
                        <TableHead className="font-bold text-gray-900 min-w-[250px]">Outcomes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {communicationPersonalityModules.map((module) => (
                        <TableRow key={module.id} className="hover:bg-blue-50/50 transition-colors">
                          <TableCell className="text-center">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                              {module.id}
                            </div>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              <Clock className="w-3 h-3 mr-1" />
                              {module.hours}h
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-700 leading-relaxed">
                              <div className="flex items-start gap-2">
                                <Target className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                {module.objectives}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-700 leading-relaxed">
                              <div className="flex items-start gap-2">
                                <BookOpen className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                {module.activities}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-700 leading-relaxed">
                              <div className="flex items-start gap-2">
                                <TrendingUp className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                {module.outcomes}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            {/* Summary Statistics */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold mb-2">45</div>
                  <div className="text-blue-100">Total Hours</div>
                </CardContent>
              </Card>
              <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold mb-2">5</div>
                  <div className="text-green-100">Core Modules</div>
                </CardContent>
              </Card>
              <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold mb-2">100</div>
                  <div className="text-purple-100">Practical Focus</div>
                </CardContent>
              </Card>
            </div> */}
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
