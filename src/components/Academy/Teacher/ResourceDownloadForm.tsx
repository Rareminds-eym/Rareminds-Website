import { Button } from "../UI/button";
import { Input } from "../UI/input";
import { Download } from "lucide-react";

const ResourceDownloadForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    
    <div className="max-w-4xl mx-auto flex justify-center  "data-aos="fade-left">
    <div className=" w-full max-w-sm p-7 pb-8 bg-cream rounded-md shadow-sm pt-10">
      <h2 className="text-lg md:text-xl mb-5 text-gray-800 text-center">
        Download All Free Resources
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input 
            placeholder="Your Name" 
            className="w-full border border-gray-200 rounded-sm h-10 bg-white px-3 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm" 
          />
        </div>
        <div>
          <Input 
            placeholder="School Name" 
            className="w-full border border-gray-200 rounded-sm h-10 bg-white px-3 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm" 
          />
        </div>
        <div>
          <Input 
            placeholder="Email Address" 
            type="email"
            className="w-full border border-gray-200 rounded-sm h-10 bg-white px-3 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm" 
          />
        </div>
        <Button 
          type="submit" 
          className="w-full bg-black hover:bg-black/90 text-white h-10 flex items-center justify-center gap-2 mt-1 rounded-sm text-sm font-normal"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Get All Resources</span>
        </Button>
      </form>
      </div>
    </div>

    
  );
};

export default ResourceDownloadForm;