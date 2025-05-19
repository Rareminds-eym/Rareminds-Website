
import React from 'react';
import { Button } from '../../UI/button';
import { Input } from '../../UI/input';
import { Textarea } from '../../UI/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../../UI/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  schoolName: z.string().min(2, { message: 'School name must be at least 2 characters' }),
  role: z.string().min(2, { message: 'Role must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
  message: z.string().optional(),
});

type EnquiryFormValues = z.infer<typeof formSchema>;

interface EnquiryFormProps {
  onClose: () => void;
}

const EnquiryForm: React.FC<EnquiryFormProps> = ({ onClose }) => {
  const { toast } = useToast();
  
  const form = useForm<EnquiryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      schoolName: '',
      role: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = (data: EnquiryFormValues) => {
    console.log('Form submitted:', data);
    toast({
      title: "Request submitted",
      description: "Thank you for your interest! We'll get back to you soon.",
    });
    onClose();
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">Submit your enquiry</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="schoolName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your school name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input placeholder="Your role" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" type="email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Your phone number" type="tel" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message (Optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Your message..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <Send className="mr-2 h-4 w-4" /> Submit Request
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EnquiryForm;