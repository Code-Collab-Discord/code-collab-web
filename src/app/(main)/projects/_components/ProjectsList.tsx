import React from 'react';
import ProjectCard from './ProjectCard';

// Define the Project interface
export interface Project {
  id: number;
  title: string;
  subtitle?: string;
  description: string[];
  progress: number;
  daysLeft?: number;
  date: string;
  members: string[];
  color: string;
  icon?: string;
  iconBg?: string;
  featured?: boolean;
  border?: boolean;
  status: 'Current' | 'Finished' | 'On Hold' | 'Archive';
}

// Define props interface for ProjectsList
interface ProjectsListProps {
  projects: Project[];
  viewMode: 'grid' | 'list';
}

const ProjectsList: React.FC<ProjectsListProps> = ({ projects, viewMode }) => {
  return (
    <div 
      className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      }`}
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectsList;