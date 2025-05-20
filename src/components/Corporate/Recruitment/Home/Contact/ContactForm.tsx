import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

import { contactFormSchema, type ContactFormData } from '../lib/types';
import { supabase } from '../lib/supabase';
import FormField from './FormField';

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      company: '',
      position: '',
      message: ''
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setFormStatus('idle');
    
    try {
      const { error } = await supabase
        .from('recruitment_forms')
        .insert([
          {
            full_name: data.fullName,
            email: data.email,
            phone: data.phone || null,
            company: data.company,
            position: data.position,
            message: data.message,
            submitted_at: new Date().toISOString()
          }
        ]);
      
      if (error) throw error;
      
      setFormStatus('success');
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {formStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700 animate-fadeIn">
          <CheckCircle className="w-5 h-5 mr-2" />
          <span>Your message has been submitted successfully!</span>
        </div>
      )}
      
      {formStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700 animate-fadeIn">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>There was an error submitting your form. Please try again.</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label="Full Name"
          name="fullName"
          placeholder="John Doe"
          register={register}
          error={errors.fullName}
          required
        />
        
        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="john@example.com"
          register={register}
          error={errors.email}
          required
        />
        
        <FormField
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          register={register}
          error={errors.phone}
        />
        
        <FormField
          label="Company"
          name="company"
          placeholder="Acme Inc."
          register={register}
          error={errors.company}
          required
        />
        
        <FormField
          label="Position"
          name="position"
          placeholder="Frontend Developer"
          register={register}
          error={errors.position}
          required
        />
        
        <FormField
          label="Message"
          name="message"
          type="textarea"
          placeholder="Tell us about your interest in this position..."
          register={register}
          error={errors.message}
          required
        />
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center px-4 py-2 font-medium rounded-md text-white
            transition-all duration-200 transform hover:translate-y-[-2px]
            ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg'}`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Submit Application
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;