
import React, { useState } from 'react';
import { Button } from '../../UI/button';
import { Input } from '../../UI/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../../UI/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Download } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../../UI/input-otp';
import { ServiceData } from '../../UI/services';

const formSchema = z.object({
  contactInfo: z.string().min(1, {
    message: "Please enter either your email or phone number.",
  }),
  otp: z.string().length(4, {
    message: "OTP must be 4 digits."
  }),
});

type DownloadFormValues = z.infer<typeof formSchema>;

interface DownloadFormProps {
  onClose: () => void;
  activeService: ServiceData;
}

const DownloadForm: React.FC<DownloadFormProps> = ({ onClose, activeService }) => {
  const [otpSent, setOtpSent] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<DownloadFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactInfo: '',
      otp: '',
    },
  });

  const sendOTP = () => {
    const contactInfo = form.getValues('contactInfo');
    if (!contactInfo) {
      form.setError('contactInfo', { 
        message: 'Please enter your email or phone number' 
      });
      return;
    }
    
    // Simulate sending OTP
    console.log('Sending OTP to:', contactInfo);
    toast({
      title: "OTP sent",
      description: "We've sent a 4-digit code to your contact information.",
    });
    setOtpSent(true);
  };

  const onSubmit = (data: DownloadFormValues) => {
    console.log('Download requested:', data);
    console.log('For service:', activeService.name);
    toast({
      title: "Download ready",
      description: `${activeService.name} PDF is downloading now.`,
    });
    
    // Simulate PDF download
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = activeService.illustration; // Placeholder - would be PDF URL in real scenario
      link.download = `${activeService.name.toLowerCase()}-guide.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onClose();
    }, 500);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">
        {otpSent ? 'Verify OTP' : 'Download PDF Guide'}
      </h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {!otpSent ? (
            <FormField
              control={form.control}
              name="contactInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email or Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email or phone number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter 4-Digit OTP</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={4} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            
            {!otpSent ? (
              <Button type="button" onClick={sendOTP}>
                Send OTP
              </Button>
            ) : (
              <Button type="submit">
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DownloadForm;
