
import { Link } from 'react-router-dom';
import { Calendar, ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Project } from '@/types';
import { format } from 'date-fns';

const statusColors = {
  'planned': 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
  'in-progress': 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30',
  'completed': 'bg-green-500/20 text-green-300 hover:bg-green-500/30',
  'on-hold': 'bg-orange-500/20 text-orange-300 hover:bg-orange-500/30'
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const completedTasksCount = project.tasks.filter(task => task.completed).length;
  const totalTasksCount = project.tasks.length;
  const progress = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  return (
    <Card className="overflow-hidden border-border/40 bg-card/50 hover:bg-card/80 transition-colors">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={`${statusColors[project.status]} transition-colors`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
          </Badge>
          
          {project.deadline && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              {format(new Date(project.deadline), 'MMM d, yyyy')}
            </div>
          )}
        </div>
        <CardTitle className="text-lg mt-2">
          <Link to={`/projects/${project.id}`} className="hover:text-purple-400 transition-colors">
            {project.title}
          </Link>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech.id} variant="secondary" className="bg-secondary/40">
              {tech.name}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge variant="secondary" className="bg-secondary/40">
              +{project.technologies.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
          <div 
            className="bg-purple-500 h-1 rounded-full" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          {completedTasksCount} of {totalTasksCount} tasks ({progress}%)
        </div>
      </CardContent>
      
      <CardFooter>
        <div className="flex items-center gap-2 w-full">
          <Button asChild variant="ghost" size="sm" className="flex-1 justify-start">
            <Link to={`/projects/${project.id}`}>View Details</Link>
          </Button>
          <div className="flex gap-1">
            {project.githubUrl && (
              <Button asChild variant="ghost" size="icon">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}
            {project.deploymentUrl && (
              <Button asChild variant="ghost" size="icon">
                <a href={project.deploymentUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
