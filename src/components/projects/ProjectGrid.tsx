
import { useState } from 'react';
import { Project, ProjectStatus } from '@/types';
import ProjectCard from './ProjectCard';
import { Button } from '@/components/ui/button';

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid = ({ projects }: ProjectGridProps) => {
  const [filter, setFilter] = useState<ProjectStatus | 'all'>('all');
  
  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.status === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'planned' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('planned')}
        >
          Planned
        </Button>
        <Button
          variant={filter === 'in-progress' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('in-progress')}
        >
          In Progress
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
        <Button
          variant={filter === 'on-hold' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('on-hold')}
        >
          On Hold
        </Button>
      </div>
      
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No projects found</p>
          <p className="text-sm text-muted-foreground mt-2">Create a new project or try a different filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;
