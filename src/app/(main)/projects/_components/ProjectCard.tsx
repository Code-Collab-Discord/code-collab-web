import React from 'react';
import { MoreHorizontal, Calendar, Users, TrendingUp } from "lucide-react";
import { Project } from './ProjectsList';

// Define props interface for ProjectCard
interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const isDark = project.color === 'bg-gray-900';
  
  return (
    <div className={`${project.color} ${project.border ? 'border border-gray-200' : ''} rounded-3xl p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative group backdrop-blur-sm`}>
      {/* Header with Menu */}
      <div className="flex justify-between items-start mb-6">
        {/* Project Icon/Logo */}
        <div className="relative">
          {project.featured ? (
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
              {project.icon}
            </div>
          ) : project.iconBg ? (
            <div className={`w-14 h-14 ${project.iconBg} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
              {project.icon}
            </div>
          ) : project.icon === '+' ? (
            <div className={`w-14 h-14 ${project.iconBg} rounded-2xl flex items-center justify-center text-white text-3xl font-light shadow-lg`}>
              {project.icon}
            </div>
          ) : (
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-700 font-bold text-xl shadow-sm">
              {project.icon}
            </div>
          )}
          
          {/* Status indicator */}
          <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 ${
            isDark ? 'border-gray-900' : 'border-white'
          } ${
            project.status === 'Current' ? 'bg-green-500' :
            project.status === 'Finished' ? 'bg-blue-500' :
            project.status === 'On Hold' ? 'bg-yellow-500' :
            'bg-gray-500'
          }`}></div>
        </div>

        {/* Menu Button */}
        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-100 rounded-lg">
          <MoreHorizontal className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Project Title and Subtitle */}
      <div className="mb-4">
        <h3 className={`font-bold text-xl mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {project.title}
        </h3>
        {project.subtitle && (
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {project.subtitle}
          </p>
        )}
      </div>

      {/* Project Description */}
      <div className="mb-6">
        {project.description.slice(0, 2).map((item, index) => (
          <div key={index} className="flex items-center text-sm mb-2">
            <div className={`w-2 h-2 rounded-full mr-3 ${
              isDark ? 'bg-gray-500' : 'bg-gray-300'
            }`}></div>
            <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              {item}
            </span>
          </div>
        ))}
        {project.description.length > 2 && (
          <div className="flex items-center text-sm">
            <div className={`w-2 h-2 rounded-full mr-3 ${
              isDark ? 'bg-gray-500' : 'bg-gray-300'
            }`}></div>
            <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'} italic`}>
              +{project.description.length - 2} more...
            </span>
          </div>
        )}
      </div>

      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-gray-500" />
            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Progress
            </span>
          </div>
          <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {project.progress}%
          </span>
        </div>
        
        <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'} overflow-hidden`}>
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              project.progress >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
              project.progress >= 50 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
              'bg-gradient-to-r from-orange-500 to-yellow-500'
            }`}
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {/* Date and Days Left */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {project.date}
            </span>
          </div>
          {project.daysLeft && (
            <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              project.daysLeft <= 3 ? 'bg-red-100 text-red-700' :
              project.daysLeft <= 7 ? 'bg-yellow-100 text-yellow-700' :
              'bg-green-100 text-green-700'
            }`}>
              {project.daysLeft} days left
            </div>
          )}
        </div>

        {/* Team Members */}
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4 text-gray-500 mr-1" />
          <div className="flex -space-x-2">
            {project.members.slice(0, 3).map((member, index) => (
              <div 
                key={index} 
                className={`w-8 h-8 rounded-full border-2 ${
                  isDark ? 'border-gray-900' : 'border-white'
                } overflow-hidden shadow-sm hover:scale-110 transition-transform`}
              >
                <div className={`w-full h-full ${
                  index === 0 ? 'bg-gradient-to-br from-blue-400 to-purple-500' :
                  index === 1 ? 'bg-gradient-to-br from-green-400 to-blue-500' :
                  'bg-gradient-to-br from-orange-400 to-pink-500'
                }`}></div>
              </div>
            ))}
            {project.members.length > 3 && (
              <div className={`w-8 h-8 rounded-full border-2 ${
                isDark ? 'border-gray-900 bg-gray-800' : 'border-white bg-gray-100'
              } flex items-center justify-center shadow-sm`}>
                <span className={`text-xs font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  +{project.members.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;