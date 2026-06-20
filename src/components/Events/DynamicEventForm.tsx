import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { FormField, FormWithFields } from '../../types/dynamicForm';
import { getFormById } from '../../services/dynamicFormService';

interface DynamicEventFormProps {
  formId?: string | null;
  eventId: string;
  onSubmitSuccess?: (formData: Record<string, any>) => void | Promise<void>;
  onCancel?: () => void;
}

const DynamicEventForm: React.FC<DynamicEventFormProps> = ({
  formId,
  eventId,
  onSubmitSuccess,
  onCancel
}) => {
  const [form, setForm] = useState<FormWithFields | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Always start loading
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Use form fields from database only
  const fields = form?.fields || [];
  
  // Debug logging (only in development)
  useEffect(() => {
    if (form && fields.length > 0) {
      console.log('📝 Form loaded:', {
        title: form.title,
        fields: fields.map(f => f.field_name),
        total: fields.length
      });
    }
  }, [form?.id]); // Only log when form changes

  // Build dynamic Zod schema from fields
  const validationSchema = useMemo(() => {
    const shape: Record<string, z.ZodTypeAny> = {};

    fields.forEach(field => {
      let fieldSchema: z.ZodTypeAny;

      switch (field.field_type) {
        case 'email':
          fieldSchema = z.string().email('Please enter a valid email address');
          if (field.is_required) {
            fieldSchema = (fieldSchema as z.ZodString).min(1, `${field.field_label} is required`);
          } else {
            fieldSchema = fieldSchema.optional();
          }
          break;
        
        case 'tel':
          fieldSchema = z.string().regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Please enter a valid phone number');
          if (field.is_required) {
            fieldSchema = (fieldSchema as z.ZodString).min(1, `${field.field_label} is required`);
          } else {
            fieldSchema = fieldSchema.optional();
          }
          break;
        
        case 'select':
          if (field.options && field.options.length > 0) {
            if (field.is_required) {
              fieldSchema = z.enum(field.options as [string, ...string[]], {
                errorMap: () => ({ message: `Please select ${field.field_label.toLowerCase()}` })
              });
            } else {
              fieldSchema = z.enum(field.options as [string, ...string[]]).optional();
            }
          } else {
            fieldSchema = field.is_required 
              ? z.string().min(1, `${field.field_label} is required`)
              : z.string().optional();
          }
          break;
        
        case 'checkbox':
          fieldSchema = field.is_required 
            ? z.boolean().refine(val => val === true, 'This field must be checked')
            : z.boolean().optional();
          break;
        
        case 'textarea':
          fieldSchema = z.string();
          if (field.is_required) {
            fieldSchema = (fieldSchema as z.ZodString).min(1, `${field.field_label} is required`);
          } else {
            fieldSchema = fieldSchema.optional();
          }
          break;
        
        case 'text':
        default:
          fieldSchema = z.string();
          if (field.is_required) {
            fieldSchema = (fieldSchema as z.ZodString).min(1, `${field.field_label} is required`);
          } else {
            fieldSchema = fieldSchema.optional();
          }
          break;
      }

      shape[field.field_name] = fieldSchema;
    });

    return z.object(shape);
  }, [fields]);

  type FormValues = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema)
  });

  // Fetch form data - REQUIRED
  useEffect(() => {
    console.log('DynamicEventForm: formId prop received:', formId);
    console.log('DynamicEventForm: eventId prop received:', eventId);
    
    if (!formId) {
      console.error('DynamicEventForm: No formId provided - cannot load form');
      setFetchError('No form configured for this event. Please contact the event organizer.');
      setIsLoading(false);
      return;
    }

    const fetchForm = async () => {
      console.log('DynamicEventForm: Fetching form data for formId:', formId);
      setIsLoading(true);
      setFetchError(null);
      
      try {
        const formData = await getFormById(formId);
        console.log('DynamicEventForm: Form data received:', formData);
        
        if (!formData) {
          console.error('DynamicEventForm: Form not found for ID:', formId);
          setFetchError('Registration form not found. Please contact the event organizer.');
          setForm(null);
        } else if (!formData.fields || formData.fields.length === 0) {
          console.error('DynamicEventForm: Form has no fields');
          setFetchError('Registration form is empty. Please contact the event organizer.');
          setForm(null);
        } else {
          console.log('DynamicEventForm: Setting form with', formData.fields.length, 'fields');
          setForm(formData);
          setFetchError(null);
        }
      } catch (error) {
        console.error('DynamicEventForm: Error fetching form:', error);
        setFetchError('Failed to load registration form. Please try again or contact support.');
        setForm(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchForm();
  }, [formId, eventId]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Ensure all checkbox fields are included with boolean values
      // react-hook-form only includes checked checkboxes, so we need to add unchecked ones
      const completeData: Record<string, any> = { ...data };
      
      fields.forEach(field => {
        if (field.field_type === 'checkbox') {
          // If checkbox is not in data, it means it's unchecked
          if (!(field.field_name in completeData)) {
            completeData[field.field_name] = false;
          } else {
            // Convert checkbox value to proper boolean
            // react-hook-form might send true, "on", or other values
            const value = completeData[field.field_name];
            completeData[field.field_name] = value === true || value === 'on' || value === 'true';
          }
        }
      });
      
      // Pass the complete form data back to parent (HeoSection) to handle registration and payment
      await onSubmitSuccess?.(completeData);
      
      // Reset form and submitting state after successful submission
      reset();
      setIsSubmitting(false);
    } catch (error: any) {
      console.error('Submit error:', error);
      const errorMessage = error?.message || 'An unexpected error occurred. Please try again.';
      setSubmitError(errorMessage);
      setIsSubmitting(false);
    }
  };

  // Render individual field
  const renderField = (field: FormField) => {
    const hasError = !!errors[field.field_name];
    const errorMessage = errors[field.field_name]?.message as string | undefined;

    const baseInputClass = `w-full px-4 py-3 rounded-lg border ${
      hasError 
        ? 'border-red-500 focus:border-red-600 focus:ring-red-200' 
        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
    } focus:ring-2 focus:outline-none transition-colors`;

    switch (field.field_type) {
      case 'text':
      case 'email':
      case 'tel':
        return (
          <div key={field.id} className="mb-4">
            <label htmlFor={field.field_name} className="block text-sm font-medium text-gray-700 mb-2">
              {field.field_label}
              {field.is_required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              id={field.field_name}
              type={field.field_type}
              {...register(field.field_name)}
              className={baseInputClass}
              placeholder={`Enter ${field.field_label.toLowerCase()}`}
            />
            {hasError && (
              <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id} className="mb-4 col-span-full">
            <label htmlFor={field.field_name} className="block text-sm font-medium text-gray-700 mb-2">
              {field.field_label}
              {field.is_required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              id={field.field_name}
              {...register(field.field_name)}
              className={baseInputClass}
              placeholder={`Enter ${field.field_label.toLowerCase()}`}
              rows={4}
            />
            {hasError && (
              <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.id} className="mb-4 col-span-full">
            <label htmlFor={field.field_name} className="block text-sm font-medium text-gray-700 mb-2">
              {field.field_label}
              {field.is_required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              id={field.field_name}
              {...register(field.field_name)}
              className={baseInputClass}
            >
              <option value="">Select {field.field_label.toLowerCase()}</option>
              {field.options?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {hasError && (
              <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.id} className="mb-4 col-span-full">
            <div className="flex items-start">
              <input
                id={field.field_name}
                type="checkbox"
                {...register(field.field_name)}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={field.field_name} className="ml-3 text-sm text-gray-700 cursor-pointer">
                {field.field_label}
                {field.is_required && <span className="text-red-500 ml-1">*</span>}
              </label>
            </div>
            {hasError && (
              <p className="mt-1 text-sm text-red-600 ml-7">{errorMessage}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-10 bg-gray-200 rounded mt-6"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-300 rounded mt-6"></div>
        </div>
      </div>
    );
  }

  // Show error if form couldn't be loaded
  if (fetchError || !form || fields.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Form Not Available</h3>
          <p className="text-gray-600 mb-4">
            {fetchError || 'The registration form for this event could not be loaded.'}
          </p>
          <p className="text-sm text-gray-500">
            Please contact the event organizer for assistance.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {form?.title || 'Event Registration'}
      </h2>
      {form?.description && (
        <p className="text-gray-600 mb-6">{form.description}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map(field => renderField(field))}
        </div>

        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {submitError}
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${onCancel ? 'flex-1' : 'w-full'} px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Register'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicEventForm;
