// import React from 'react';
// import { ArrowRight, Clock, MapPin, School } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import type { Project } from '../../types/index';

// interface ProjectCardProps {
//   project: Project;
//   onClick: (project: Project) => void;
// }

// // export const ProjectCard = ({ project }: ProjectCardProps) => {
// //   const navigate = useNavigate();

// //   const handleViewDetails = () => {
// //     // Redirect to the details page for the project
// //     // navigate(`/projects/${project.id}`);
// //     navigate(`/projects/naan_Mudhalvan`);
// //   };

// export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  
//   return (
//     <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
//       <div className="h-48 overflow-hidden">
//         <img
//           src={project.imageUrl}
//           alt={project.name}
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <div className="p-6">
//         <div className="flex justify-between items-start mb-4">
//           <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
//           {/* <span className={`px-3 py-1 rounded-full text-sm font-medium
//             ${project.status === 'Active' ? 'bg-green-100 text-green-800' :
//               project.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
//                 'bg-yellow-100 text-yellow-800'
//             }`}>
//             {project.status}
//           </span> */}
//         </div>
        
//         <p className="text-gray-600 mb-4">{project.description}</p>
        
//         <div className="space-y-2 mb-4">
//           <div className="flex items-center text-gray-600">
//             <School className="w-4 h-4 mr-2" />
//             <span className="text-sm">{project.year}</span>
//           </div>
//           <div className="flex items-center text-gray-600">
//             <MapPin className="w-4 h-4 mr-2" />
//             <span className="text-sm">{project.location}</span>
//           </div>
//           <div className="flex items-center text-gray-600">
//             <Clock className="w-4 h-4 mr-2" />
//             <span className="text-sm">{project.timeline}</span>
//           </div>
//         </div>

//         {/* <div className="flex flex-wrap gap-2 mb-4">
//           {project.technologies.map((tech) => (
//             <span
//               key={tech}
//               className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-sm"
//             >
//               {tech}
//             </span>
//           ))}
//         </div> */}
// <Link to={`/academia/projects/${project.name}`}>
//         <button
//         //  onClick={handleViewDetails}
//           // onClick={() => onClick(project)}
//           className="w-full  lg:mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
//         >
//           View Details
//           <ArrowRight className="ml-2 w-4 h-4" />
//         </button></Link>
//       </div>
//     </div>
//   );
// };

import React from 'react';
import { ArrowRight, Clock, MapPin, School } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../../types/index';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02] flex flex-col h-full">
      {/* Image Section */}
      <div className="h-48 overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <School className="w-4 h-4 mr-2" />
            <span className="text-sm">{project.year}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{project.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">{project.timeline}</span>
          </div>
        </div>

        {/* Button at Bottom */}
        <div className="mt-auto">
          <Link to={`/academia/projects/${project.name}`}>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
              View Details
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
