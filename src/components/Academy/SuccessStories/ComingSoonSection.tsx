import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface ComingSoonSectionProps {
  programName: string;
}

function ComingSoonSection({ programName }: ComingSoonSectionProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <button
          type="button"
          onClick={() => navigate('/success-stories')}
          className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg hover:bg-gray-50"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* Coming Soon Content */}
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Coming Soon
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            The detailed success story for <span className="font-semibold">{programName}</span> will be available soon.
          </p>
          
          <p className="text-gray-500 mb-12">
            We're working on bringing you comprehensive details about this program. Check back soon!
          </p>
          
          <button
            type="button"
            onClick={() => navigate('/success-stories')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Back to Success Stories
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComingSoonSection;
