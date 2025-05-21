
import { Button } from "../../UI/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  showHomeButton?: boolean;
}

const PageHeader = ({ title, subtitle, showHomeButton = true }: PageHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="relative bg-black border-b border-red-600 text-white py-16 px-4 sm:px-6 lg:px-8 mb-10">
      <div className="max-w-5xl mx-auto">
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
          {showHomeButton && (
            <Button 
              variant="ghost" 
              className="text-white hover:bg-red-800/30 group transition-all"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
              Back to Programs
            </Button>
          )}
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-red-400">{title}</h1>
        <p className="text-lg sm:text-xl md:text-2xl opacity-90 max-w-3xl mx-auto text-center text-gray-300">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default PageHeader;
