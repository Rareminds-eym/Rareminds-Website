
import { Button } from "../../../components/Academy/UI/button";

import { Card, CardContent } from "@/components/ui/card";

import { CheckCircle, BookOpen, GraduationCap, ExternalLink, Brain, Target, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "../../../components/ui/PageHeader";

const CareerToolkit = () => {
  const toolkitFeatures = [
    {
      title: "Stream Selector",
      description: "Find the academic stream that aligns with their aptitude and interests",
      icon: <BookOpen className="h-6 w-6 text-red-600" />
    },
    {
      title: "Learning Style Profiler",
      description: "Identify how each student learns best—visual, auditory, or hands-on",
      icon: <Brain className="h-6 w-6 text-red-600" />
    },
    {
      title: "Personality Mapping",
      description: "Understand traits that influence teamwork, leadership, and career fit",
      icon: <Target className="h-6 w-6 text-red-600" />
    },
    {
      title: "Ideal Career Finder",
      description: "Discover careers that match both mindset and skillset",
      icon: <Lightbulb className="h-6 w-6 text-red-600" />
    },
    {
      title: "Multiple Intelligence Test",
      description: "Explore abilities beyond academics such as creativity, logic, and more",
      icon: <GraduationCap className="h-6 w-6 text-red-600" />
    }
  ];

  const resourceTools = [
    {
      title: "Top Colleges Database",
      description: "Search trusted, ranked institutions by course, location, and outcomes"
    },
    {
      title: "College Compare",
      description: "Compare colleges side-by-side on key factors"
    },
    {
      title: "Course Fee Calculator",
      description: "Estimate tuition and living expenses based on city and college tier"
    },
    {
      title: "Career Trends Explorer",
      description: "See which careers are rising and evolving"
    },
    {
      title: "Entrance Exam Tracker",
      description: "Stay on top of test dates for CUET, SAT, IELTS, and more"
    },
    {
      title: "Scholarship Finder",
      description: "Find scholarships by course, location, or eligibility"
    },
    {
      title: "Career Deep Dives",
      description: "In-depth insights into job roles, required skills, top recruiters, and future growth paths"
    }
  ];
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <PageHeader 
        title="The Career Toolkit" 
        subtitle="Help students discover their own calling, not just follow the crowd" 
      />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero section with enhanced design */}
        <div className="mb-24 text-center relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent opacity-70 pointer-events-none"></div>
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-white to-red-400"
          >
            Designed for Grades 9–12 students ready to plan their future with purpose
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-2xl md:text-3xl mb-6 max-w-3xl mx-auto font-light"
          >
            The right choice begins with the right information.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Our toolkit guides students through a process of self-discovery and planning. From identifying their ideal stream and learning style to comparing colleges, tracking exams, and finding scholarships, we equip students—and their families—with everything needed to make smart, informed, and confident career decisions.
          </motion.p>
        </div>
        
        {/* Smart Career Discovery section with motion effects */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-red-400">
              Smart Career Discovery
            </span>
          </h2>
          
          <p className="text-center text-xl mb-12 max-w-3xl mx-auto text-gray-300">
            Help students discover <span className="text-red-500 font-semibold">who they are</span> before deciding where they're going.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {toolkitFeatures.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="bg-zinc-900 border-none overflow-hidden hover:shadow-lg hover:shadow-red-600/20 transition-all group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 to-black opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-0 right-0 h-16 w-16">
                    <div className="absolute transform rotate-45 translate-x-8 -translate-y-8 w-16 h-16 bg-red-600/30 group-hover:bg-red-600/60 transition-colors duration-300"></div>
                  </div>
                  <CardContent className="p-8 pt-8 relative z-10">
                    <div className="bg-gradient-to-br from-red-600 to-red-800 text-white w-16 h-16 flex items-center justify-center rounded-xl mb-6 shadow-lg group-hover:-translate-y-1 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-red-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-white transition-colors">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Clarity Meets Strategy section with modern layout */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-red-400">
              Clarity Meets Strategy
            </span>
          </h2>
          
          <p className="text-center text-xl mb-12 max-w-3xl mx-auto text-gray-300">
            From discovery to direction. We support <span className="text-red-500 font-semibold">every step</span> of the journey.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resourceTools.map((tool, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="flex items-start p-5 bg-gradient-to-br from-zinc-900 to-black rounded-xl border border-zinc-800 hover:border-red-900 transition-all"
              >
                <CheckCircle className="text-red-600 h-6 w-6 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-xl text-white mb-2">{tool.title}</h3>
                  <p className="text-gray-300">{tool.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Enhanced CTA with interactive elements */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-900 to-red-600 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('/career-pattern.svg')] opacity-10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-red-800/30 rounded-full filter blur-3xl"></div>
          
          <div className="relative p-10 md:p-16 text-center">
            <motion.h3 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
            >
              Ready to help students find their path?
            </motion.h3>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-10 text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
            >
              Start using our comprehensive career planning resources today.
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button 
                className="bg-white hover:bg-gray-100 text-red-600 text-lg px-10 py-6 h-auto rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group"
                onClick={() => window.open('https://career.rareminds.in', '_blank')}
              >
                <span className="mr-2">Start Your Career Discovery Journey</span>
                <ExternalLink className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CareerToolkit;
