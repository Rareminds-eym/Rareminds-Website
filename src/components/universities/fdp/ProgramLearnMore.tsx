import { programs } from './data/programsData';

const fdpProgram = programs.find(p => p.link === '/programs/fdp');

const ProgramLearnMore: React.FC = () => (
  <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold text-indigo-800 mb-2">
      {fdpProgram?.name}
    </h1>
    <h2 className="text-lg font-semibold text-indigo-600 mb-2">
      Empowering Educators. Transforming universities.
    </h2>
    <p className="mb-4">{fdpProgram?.description}</p>
    {/* Add your detailed sections here as in your previous design */}
    {/* ... */}
  </div>
);

export default ProgramLearnMore;