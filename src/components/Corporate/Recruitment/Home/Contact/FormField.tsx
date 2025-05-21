import React from 'react';
import { FieldError } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
  register: any;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder = '',
  error,
  required = false,
  register,
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={name}
          placeholder={placeholder}
          {...register(name)}
          className={`w-full px-3 py-2 border rounded-md transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none
            ${error ? 'border-red-500' : 'border-gray-300'}`}
          rows={4}
        />
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name)}
          className={`w-full px-3 py-2 border rounded-md transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none
            ${error ? 'border-red-500' : 'border-gray-300'}`}
        />
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600 animate-fadeIn">{error.message}</p>
      )}
    </div>
  );
};

export default FormField;