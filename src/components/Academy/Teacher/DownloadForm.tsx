import { useState } from "react";
import { Mail } from "lucide-react";
import { useToast } from "../.././../hooks/use-toast";
import { Button } from "../UI/button";
import { Input } from "../UI/input";

const DownloadForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate download process
    setTimeout(() => {
      toast({
        title: "Resources ready!",
        description: "Your download should start automatically.",
      });
      setIsSubmitting(false);
      
      // Reset form
      setName("");
      setEmail("");
      
      // Trigger download (in real app, this would be a real file)
      const link = document.createElement("a");
      link.href = "/dummy-resources.pdf";
      link.download = "free-resources.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-100 p-6 ">
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="flex items-center justify-center mb-2">
          <Mail className="text-yellow-400 h-5 w-5 mr-2" />
          <h2 className="text-base font-medium">Download All Free Resources</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-200 bg-[#E2E8F0]"
          />
        </div>
        
        <div>
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-200 bg-[#E2E8F0]"
          />
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black hover:bg-gray-800 text-white"
        >
          {isSubmitting ? "Processing..." : "Download All Resources"}
        </Button>
        
        <p className="text-center text-xs text-gray-500 mt-2">
          By submitting, you agree to receive educational resources via email. You can unsubscribe at any time.
        </p>
      </form>
    </div>
  );
};

export default DownloadForm;
