import React from 'react';
import { X, Users, Target, Calendar, ExternalLink } from 'lucide-react';
import type { Project } from '../types/';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const handleViewDetails = () => {
    // Open in a new tab to preserve the current view
    // window.open(`/projects/${project.id}`, '_blank');
    window.open(`/projects/naan_Mudhalvan`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative h-64">
          <img
            src={project.imageUrl}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <X className="w-6 h-6 text-black" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">{project.name}</h2>
            <span className={`px-4 py-1 rounded-full text-sm font-medium
              ${project.status === 'Active' ? 'bg-green-100 text-green-800' :
                project.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
              }`}>
              {project.status}
            </span>
          </div>

          <p className="text-gray-600 mb-8">{project.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-2">
              <div className="flex items-center text-gray-700">
                <Calendar className="w-5 h-5 mr-2" />
                <h3 className="font-semibold">Timeline</h3>
              </div>
              <p className="text-gray-600">{project.timeline}</p>
            </div>

            {/* <div className="space-y-2">
              <div className="flex items-center text-gray-700">
                <Users className="w-5 h-5 mr-2" />
                <h3 className="font-semibold">Team</h3>
              </div>
              <ul className="space-y-1">
                {project.team.map((member) => (
                  <li key={member} className="text-gray-600">{member}</li>
                ))}
              </ul>
            </div> */}

            {/* <div className="space-y-2">
              <div className="flex items-center text-gray-700">
                <Target className="w-5 h-5 mr-2" />
                <h3 className="font-semibold">Goals</h3>
              </div>
              <ul className="list-disc list-inside space-y-1">
                {project.goals.map((goal) => (
                  <li key={goal} className="text-gray-600">{goal}</li>
                ))}
              </ul>
            </div> */}
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-700 mb-3">Courses</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleViewDetails}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              View Full Project Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};