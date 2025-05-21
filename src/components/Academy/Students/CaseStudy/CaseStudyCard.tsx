import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../../UI/button";
import { Badge } from "../../UI/badge";
import { CaseStudy } from "./caseStudy";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  onClick: () => void;
  isActive?: boolean;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ 
  caseStudy, 
  onClick,
  isActive = false
}) => {
  // Get the first location parameter from snapshot
  const location = caseStudy.snapshot.find(item => item.parameter === "Location")?.details || "";
  
  // Get the theme from snapshot
  const theme = caseStudy.snapshot.find(item => item.parameter === "Core Theme")?.details || "";
  
  // Get first outcome for highlight
  const mainOutcome = caseStudy.outcomes[0];
  
  return (
    <Card 
      className={cn(
        "case-study-card cursor-pointer overflow-hidden transition-all duration-300",
        "border-2 hover:shadow-lg relative hover:-translate-y-1",
        isActive 
          ? "border-brand-teal ring-2 ring-brand-teal/20" 
          : "border-transparent hover:border-gray-200"
      )}
      onClick={onClick}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-light-blue/5 rounded-full -mr-12 -mt-12 transition-all duration-300 group-hover:bg-brand-light-blue/10"></div>
      
      <CardHeader className="pb-2 relative z-10">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="bg-brand-light-blue text-brand-blue font-medium px-2 py-1">
            {location}
          </Badge>
          {isActive && (
            <Badge className="bg-brand-teal text-white">
              Active
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl mt-2 text-brand-blue line-clamp-1">
          {caseStudy.header.split('–')[0].trim()}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {caseStudy.subheader}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="my-2 p-2 bg-gray-50 rounded-md">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Core Theme</p>
          <p className="text-sm font-medium text-gray-800">{theme}</p>
        </div>
        
        <div className="my-4 p-3 bg-brand-light-blue/40 rounded-lg border border-brand-light-blue/30">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-brand-teal"></span>
            <p className="text-lg font-semibold text-brand-blue">{mainOutcome.statistic}</p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{mainOutcome.description}</p>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white group"
        >
          View Details
          <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CaseStudyCard;