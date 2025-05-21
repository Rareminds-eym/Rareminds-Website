import { useState } from "react";
import { Button } from "../UI/button";
import { Input } from "../UI/input";
import { toast } from "sonner";

const ContactSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you! We'll be in touch soon.");
      setEmail("");
    } else {
      toast.error("Please enter your email address.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-40 h-40 mb-4">
        <img 
          src="/lovable-uploads/87dd2c4f-eba5-4443-942f-ef04a1c63291.png" 
          alt="Question mark illustration" 
          className="w-full h-full object-contain"
        />
      </div>
      
      <h2 className="text-2xl font-semibold mb-2">Any Question?</h2>
      <p className="text-gray-500 text-center mb-6 max-w-xs">
        You can ask us anything you want, we're here to answer your questions.
      </p>
      
      <div className="w-full">
        <p className="text-gray-500 mb-2 text-sm">Let me know</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Enter email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-gray-300"
          />
          <Button 
            type="submit" 
            className="w-full bg-turquoise hover:bg-turquoise/90 text-white rounded-full"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactSection;