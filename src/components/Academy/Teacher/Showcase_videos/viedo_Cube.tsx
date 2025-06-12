import { Button } from "@/components/ui/button";
import { RotatingCube } from "./RotatingCube";

 const Viedo_cube = () => {
  // Example usage - you can provide either YouTube links or a channel ID
  const youtubeLinks = [
    "https://www.youtube.com/embed/Z467zES119Q?si=9foJ83czil9FCQCa", // Replace with your actual YouTube video URLs
    "https://www.youtube.com/embed/Bu0PdP0ymYo?si=mUcZV3Nh8nFDf3F5",
    "https://www.youtube.com/embed/YLvtv6yo00I?si=My81ChZqiNMDBq03", 
    "https://www.youtube.com/embed/Z467zES119Q?si=9foJ83czil9FCQCa", 
    "https://www.youtube.com/embed/Bu0PdP0ymYo?si=mUcZV3Nh8nFDf3F5",
    "https://www.youtube.com/embed/YLvtv6yo00I?si=My81ChZqiNMDBq03", 
    // Add more YouTube URLs here
  ];

  // Replace with your actual YouTube channel ID
  const channelId = "UCYourChannelId"; // Replace with your YouTube channel ID

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-white px-2 py-24 sm:py-32">
      {/* Background gradient overlay */}
      <div className="absolute inset-0  "></div>
      
      <div className="w-full mx-auto p-8 md:px-16 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center justify-center">
          {/* Left content */}
          <div className=" space-y-8 animate-fade-in">
            <div className="space-y-4 text-center">
              <h1 className="text-xl md:text-4xl font-bold mb-10">
                MAKE GAMES WITH
                
              </h1>
              
              <p className="text-xl md:text-2xl ">
                Over 250,000 users monthly create games in Construct 3. 
                Cutting-edge technology that runs right inside your browser like magic.
              </p>
            </div>
            
            {/* <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Launch Construct 3
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 bg-transparent"
              >
                Construct 3 Features
              </Button>
            </div> */}
            
      
          </div>
          
          {/* Right content - 3D Cube with YouTube videos */}
          <div className="flex justify-center lg:justify-center animate-scale-in">
            <div className="relative">
              <RotatingCube 
                youtubeLinks={youtubeLinks.length > 0 ? youtubeLinks : undefined}
                channelId={youtubeLinks.length === 0 ? channelId : undefined}
              />
              {/* Floating elements around cube */}
              <div className="absolute -top-4 -left-4 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: "0.5s"}}></div>
              <div className="absolute top-1/2 -right-8 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: "1s"}}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave */}
      {/* <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-24 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,120 C150,100 350,120 600,100 C850,80 1050,120 1200,100 L1200,120 Z"></path>
        </svg>
      </div> */}
    </div>
  );
};

export default Viedo_cube;