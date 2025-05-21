import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../UI/button';
import { Check, ListCheck, CheckSquare, Book, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NEPChecklist: React.FC = () => {
  const { toast } = useToast();
  const [checklistScores, setChecklistScores] = useState({
    curriculum: 0,
    teacherCapacity: 0,
    studentAssessment: 0,
    infrastructure: 0,
    inclusion: 0,
    governance: 0
  });

  const handleScoreChange = (section: keyof typeof checklistScores, value: number) => {
    setChecklistScores(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const getTotalScore = () => {
    return Object.values(checklistScores).reduce((sum, score) => sum + score, 0);
  };

  const getReadinessLevel = () => {
    const totalScore = getTotalScore();
    if (totalScore >= 20) return { text: "You're Leading the Change! 🏆", color: "text-green-600" };
    if (totalScore >= 15) return { text: "Strong Progress. Finish the race! 🚀", color: "text-blue-600" };
    if (totalScore >= 10) return { text: "Good Start, Needs Structured Acceleration. ⚡", color: "text-yellow-600" };
    return { text: "Time for an Urgent NEP Transformation Plan! 🔥", color: "text-red-600" };
  };

  const handleBookAudit = () => {
    toast({
      title: "Consultation Request Received",
      description: "Our NEP experts will contact you shortly to schedule your free audit.",
    });
  };

  const checklistSections = [
    {
      title: "Curriculum & Pedagogy",
      icon: Book,
      color: "#4F46E5",
      items: [
        "Have you integrated Experiential Learning approaches across subjects?",
        "Are you offering multidisciplinary choices (e.g., Music + Math, AI + Literature)?",
        "Have you introduced Vocational Education from Grade 6 onwards?",
        "Are your teachers trained in Competency-Based Education (CBE)?",
        "Have you mapped your curriculum to Foundational, Preparatory, Middle, and Secondary stages as per NEP?"
      ]
    },
    {
      title: "Teacher Capacity Building",
      icon: Users,
      color: "#8B5CF6",
      items: [
        "Have your teachers undergone Continuous Professional Development (CPD) training aligned with NEP standards?",
        "Have you implemented Digital Pedagogy training (smart boards, LMS, AI tools)?",
        "Are you tracking teacher training hours per year as per NEP guidelines?",
        "Do you have in-house or partnered Faculty Development Programs (FDPs)?"
      ]
    },
    {
      title: "Student Assessment Reforms",
      icon: ListCheck,
      color: "#06B6D4",
      items: [
        "Are you moving beyond rote learning to formative assessments and portfolio evaluations?",
        "Have you adopted Holistic Progress Cards (HPCs) instead of traditional report cards?",
        "Are students assessed on 21st-century skills (critical thinking, creativity, communication, collaboration)?"
      ]
    },
    {
      title: "Infrastructure & Technology Integration",
      icon: CheckSquare,
      color: "#10B981",
      items: [
        "Do you have smart classrooms and an active Learning Management System (LMS)?",
        "Are you leveraging EdTech tools for blended learning and hybrid models?",
        "Have you equipped your library/laboratories for multidisciplinary exploration (STEM + Humanities)?",
        "Is there an active IT security policy protecting student data online?"
      ]
    },
    {
      title: "Inclusion, Equity & Outreach",
      icon: Users,
      color: "#F59E0B",
      items: [
        "Are your school policies aligned with equity and inclusion mandates of NEP (support for disadvantaged groups)?",
        "Have you introduced language options under the Three-Language Formula?",
        "Are you providing counselling and mentorship programs for socio-emotional well-being?"
      ]
    },
    {
      title: "Governance & Leadership",
      icon: CheckSquare,
      color: "#EC4899",
      items: [
        "Is there a defined School Development Plan aligned with NEP goals?",
        "Is the School Management Committee (SMC) active and involved in decision-making?",
        "Are you preparing for external school quality audits in the next 2 years?",
        "Are you tracking student pathways to higher education, skilling, entrepreneurship?"
      ]
    }
  ];

  const renderProgressBar = () => {
    const totalScore = getTotalScore();
    const percentage = (totalScore / 22) * 100;
    
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div 
          className="h-2.5 rounded-full transition-all duration-500 ease-in-out" 
          style={{ 
            width: `${percentage}%`,
            background: `linear-gradient(to right, #4F46E5, ${
              percentage > 75 ? '#10B981' : 
              percentage > 50 ? '#06B6D4' : 
              percentage > 30 ? '#F59E0B' : 
              '#EC4899'
            })`
          }}
        ></div>
      </div>
    );
  };

  const renderScoreCard = () => {
    const { text, color } = getReadinessLevel();
    return (
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 mt-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl text-center">Your NEP Readiness Score</CardTitle>
          <CardDescription className="text-center text-lg">Based on your self-assessment</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {renderProgressBar()}
          <div className="text-5xl font-bold mb-4">{getTotalScore()}<span className="text-2xl">/22</span></div>
          <p className={`text-xl font-semibold ${color}`}>{text}</p>
          
          <div className="mt-8">
            <Button 
              onClick={handleBookAudit}
              size="lg" 
              className="bg-gradient-to-r from-education-primary to-education-secondary text-white hover:opacity-90 shadow-md"
            >
              Book My Free NEP Audit
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-education-primary to-education-secondary text-white rounded-2xl overflow-hidden shadow-xl">
        <div className="p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Checklist: Is Your School NEP-Ready?</h1>
          <p className="text-xl opacity-90">A Quick Audit for Schools Moving Toward 21st-Century Excellence</p>
        </div>
      </div>

      {/* Checklist Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {checklistSections.map((section, index) => (
          <Card 
            key={index} 
            className="border-0 shadow-lg overflow-hidden transition-all hover:shadow-xl"
          >
            <div className="h-2" style={{ backgroundColor: section.color }}></div>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="rounded-full p-2" style={{ backgroundColor: `${section.color}20` }}>
                <section.icon className="h-6 w-6" style={{ color: section.color }} />
              </div>
              <div>
                <CardTitle>{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-3">
                    <div 
                      className={`mt-1 w-5 h-5 rounded flex-shrink-0 border cursor-pointer flex items-center justify-center transition-colors ${
                        // For simplicity, using the section index to map to the corresponding score property
                        checklistScores[Object.keys(checklistScores)[index] as keyof typeof checklistScores] > itemIndex 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'border-gray-300 bg-white'
                      }`}
                      onClick={() => {
                        // Toggle this item and all previous items in the section
                        const newValue = checklistScores[Object.keys(checklistScores)[index] as keyof typeof checklistScores] > itemIndex 
                          ? itemIndex 
                          : itemIndex + 1;
                        handleScoreChange(Object.keys(checklistScores)[index] as keyof typeof checklistScores, newValue);
                      }}
                    >
                      {checklistScores[Object.keys(checklistScores)[index] as keyof typeof checklistScores] > itemIndex && (
                        <Check className="h-3 w-3" />
                      )}
                    </div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Score Card */}
      {renderScoreCard()}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-8 text-center shadow-md">
        <h2 className="text-2xl font-bold text-education-primary mb-4">Need Help Becoming 100% NEP-Ready?</h2>
        <p className="mb-6 text-gray-700">Our team of education experts can guide you through the entire NEP implementation journey.</p>
        <Button 
          onClick={handleBookAudit}
          size="lg" 
          className="bg-education-primary hover:bg-education-primary/90 text-white"
        >
          Schedule a Free NEP Readiness Consultation
        </Button>
      </div>
    </div>
  );
};

export default NEPChecklist;