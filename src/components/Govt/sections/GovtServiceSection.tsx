import React, { useState  } from 'react';
import { Button } from "../../../components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../../lib/supabaseClient';
import * as Toast from '@radix-ui/react-toast';
import {Link} from 'react-router-dom';

import {
  BookCheck,
  Briefcase,
  GraduationCap,
  Brain,
  Rocket,
  Handshake,
  ArrowUpRight,
  X,
} from "lucide-react";

interface CTAButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
}

// Define interface for form data and errors
interface BlueprintFormData {
  name: string;
  email: string;
  phone: string;
  designation: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  designation?: string;
}

const BlueprintModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: '', description: '', type: 'success' });
  const [formData, setFormData] = useState<BlueprintFormData>({
    name: '',
    email: '',
    phone: '',
    designation: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^[0-9]{10}$/i.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Invalid phone number';
      isValid = false;
    }

    if (!formData.designation) {
      newErrors.designation = 'Please select your designation';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const showToast = (title: string, description: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ title, description, type });
    setToastOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast(
        "Error",
        "Please fill in all required fields correctly.",
        "error"
      );
      return;
    }

    try {
      // Insert into Supabase
      const { error } = await supabase
        .from('Request_Blueprint')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            designation: formData.designation,
            Submitted_at: new Date().toISOString(),
          }
        ]);

      if (error) {
        console.error('Error submitting form:', error);
        showToast(
          "Error",
          "There was an error submitting your request. Please try again.",
          "error"
        );
        return;
      }

      // If successful, show success toast
      showToast(
        "Success!",
        "Your blueprint request has been submitted successfully."
      );

      // Create a link element to trigger download
      const pdfUrls = {
        'University heads': '/public/pdfs/university_blueprint.pdf',
        'School heads': '/public/pdfs/school_blueprint.pdf',
        'Govt Officials': '/public/pdfs/govt_blueprint.pdf',
        'Students': '/public/pdfs/student_blueprint.pdf'
      };
      
      const link = document.createElement('a');
      link.href = pdfUrls[formData.designation as keyof typeof pdfUrls];
      link.download = `Blueprint-${formData.designation}.pdf`;
      link.click();

      // Reset form and close modal
      setFormData({
        name: '',
        email: '',
        phone: '',
        designation: '',
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Error:', error);
      showToast(
        "Error",
        "An unexpected error occurred. Please try again later.",
        "error"
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-[425px] relative"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Request Blueprint</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                  <span className="sr-only">Close</span>
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full rounded-lg border ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } px-4 py-2.5 shadow-sm transition-all duration-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none`}
                    whileFocus={{ scale: 1.01 }}
                    required
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } px-4 py-2.5 shadow-sm transition-all duration-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none`}
                    whileFocus={{ scale: 1.01 }}
                    required
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <motion.input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`block w-full rounded-lg border ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    } px-4 py-2.5 shadow-sm transition-all duration-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none`}
                    whileFocus={{ scale: 1.01 }}
                    required
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
                    Designation
                  </label>
                  <motion.select
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className={`block w-full rounded-lg border ${
                      errors.designation ? 'border-red-500' : 'border-gray-300'
                    } px-4 py-2.5 shadow-sm transition-all duration-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none appearance-none bg-white`}
                    whileFocus={{ scale: 1.01 }}
                    required
                  >
                    <option value="">Select designation</option>
                    <option value="University heads">University heads</option>
                    <option value="School heads">School heads</option>
                    <option value="Govt Officials">Government Officials</option>
                    <option value="Students">Students</option>
                  </motion.select>
                  {errors.designation && (
                    <p className="mt-1 text-sm text-red-500">{errors.designation}</p>
                  )}
                </motion.div>

                <motion.div className="mt-6 flex justify-end gap-3">
                  <motion.button
                    type="button"
                    onClick={onClose}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                  >
                    Send PDF
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className={`fixed bottom-4 right-4 rounded-lg shadow-lg p-4 ${
            toastMessage.type === 'error' ? 'bg-red-600' : 'bg-green-600'
          } text-white`}
          open={toastOpen}
          onOpenChange={setToastOpen}
          duration={3000}
        >
          <Toast.Title className="font-semibold">{toastMessage.title}</Toast.Title>
          <Toast.Description className="mt-1">{toastMessage.description}</Toast.Description>
        </Toast.Root>
        <Toast.Viewport />
      </Toast.Provider>
    </>
  );
};

// CTAButton Component
const CTAButton = ({ children, variant, onClick }: CTAButtonProps) => {
  const base = 'px-6 py-3 font-semibold rounded-2xl  transition duration-300';
  const styles = variant === 'primary'
    ? 'border border-gray-300 border-b-4 border-gray-300  hover:bg-gray-100 '
    : 'bg-red-500 text-white border-b-4 border-red-300 hover:bg-red-600';

  return (
    <button className={`${base} ${styles}`} onClick={onClick}>
      {children}
    </button>
  );
};

const GovServiceSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const services = [
    {
      icon: <BookCheck size={24} />,
      title: "45-Hour Industry-Relevant Skilling Courses",
      description: "Comprehensive courses designed to meet  industry standards and requirements",
    },
    {
      icon: <Briefcase size={24} />,
      title: "Career Counselling & Employability Capsules",
      description: "Guidance and resources to enhance career readiness and employability",
     
    },
    {
      icon: <GraduationCap size={24} />,
      title: "NEP-Aligned Faculty Development Program",
      description: "Training programs for educators aligned with National Education Policy",
    },
    {
      icon: <Brain size={24} />,
      title: "AI, Digital Pedagogy, & Soft Skills Training",
      description: "Modern skill development in emerging technologies and soft skills",
    },
    {
      icon: <Rocket size={24} />,
      title: "Startup Bootcamps, Hackathons, Project Showcases",
      description: "Interactive events to foster innovation and entrepreneurship",
    },
    {
      icon: <Handshake size={24} />,
      title: "Placement & Internship Management",
      description: "Complete ecosystem for connecting students with career opportunities",
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-0 mt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className=" mx-auto text-center mb-4 xl:mb-8 2xl:mb-12">
          <h2 className="text-3xl xl:text-3xl   font-bold text-slate-800 mb-5">
            Solutions for State Skill Development Missions, Education Boards & Universities
          </h2>
          <p className="text-base xl:text-xl   text-slate-600  mx-auto">
            We offer comprehensive solutions tailored for government educational institutions and skill development initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-4 mb-10">
          {services.map((service, index) => (
            
            <Link to={"/academia/projects/"}
              key={index}
              className="p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group animate-fade-in bg-white"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12  rounded-xl flex items-center justify-center group-hover:text-black group-hover:border-blue-600 group-hover:bg-blue-100 bg-red-50 border-2 border-red-300 text-red-600 transition-all duration-300">
                  {service.icon}
                </div>
                <ArrowUpRight className="text-black/40 group-hover:text-black/90 w-8 h-8 rounded-full p-1.5 bg-black/5 flex items-center justify-center transition-colors" size={25} />
              </div>
              <h3 className="text-base font-semibold text-slate-800 mb-2 ">{service.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
            </Link>
           
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 animate-fade-in max-w-2xl mx-auto">
          <CTAButton variant="primary" onClick={() => {
            const contactElement = document.getElementById('contact');
            if (contactElement) {
              contactElement.scrollIntoView({ behavior: 'smooth' });
            }
          }}>
            Download Full Course Catalog
          </CTAButton>
          <CTAButton variant="secondary" onClick={() => setIsModalOpen(true)}>
            Request Blueprint
          </CTAButton>
        </div>
      </div>
      
      <BlueprintModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default GovServiceSection;