import { useEffect, useState } from "react";

const LoaderComponent = () => {
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Dots animation
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    // Simulated progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => prev < 90 ? prev + 10 : prev);
    }, 400);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-sky-50 via-white to-blue-50 flex flex-col justify-center items-center z-50">
      <div className="relative group">
        <div className="absolute inset-0 bg-blue-200/30 blur-2xl rounded-full group-hover:bg-blue-300/40 transition-colors duration-500" />
        <img
          src='/RMLogo.webp'
          width={130}
          height={130}
          alt="Rareminds"
          className="relative transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent blur-sm" />
      </div>
      
      <div className="mt-10 flex flex-col items-center">
        <div className="text-gray-700 font-medium tracking-wide">
          <span className="text-lg relative">
            Loading{dots}
            {/* <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400/20" /> */}
          </span>
        </div>
        
        <div className="mt-6 w-64">
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-sky-400 transition-all duration-300 ease-out"
              style={{ width: `${progress}%`, transition: 'width 0.4s ease-out' }}
            />
          </div>
          <div className="mt-2 text-sm text-gray-500 text-center font-medium">
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoaderComponent;
