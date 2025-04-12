
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar as CalendarIcon, Check, Edit2, ExternalLink, Github, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import PageLayout from '@/components/layout/PageLayout';
import { projects } from '@/data/sampleData';
import { Project, ProjectStatus, Task } from '@/types';
import { format } from 'date-fns';

const statusOptions: ProjectStatus[] = ['planned', 'in-progress', 'completed', 'on-hold'];

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState<Project | null>(project || null);
  const [newTask, setNewTask] = useState('');
  
  if (!project || !editedProject) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Link to="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }
  
  const handleUpdateTask = (taskId: string, completed: boolean) => {
    setEditedProject({
      ...editedProject,
      tasks: editedProject.tasks.map((task) => 
        task.id === taskId ? { ...task, completed, updatedAt: new Date() } : task
      ),
    });
  };
  
  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    
    const newTaskObject: Task = {
      id: `${editedProject.id}-${editedProject.tasks.length + 1}`,
      title: newTask,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setEditedProject({
      ...editedProject,
      tasks: [...editedProject.tasks, newTaskObject],
      updatedAt: new Date(),
    });
    
    setNewTask('');
  };
  
  const handleDeleteTask = (taskId: string) => {
    setEditedProject({
      ...editedProject,
      tasks: editedProject.tasks.filter((task) => task.id !== taskId),
      updatedAt: new Date(),
    });
  };
  
  const handleSave = () => {
    // Here we would normally save to the backend
    setIsEditing(false);
  };
  
  const handleInputChange = (field: keyof Project, value: string) => {
    setEditedProject({
      ...editedProject,
      [field]: value,
      updatedAt: new Date(),
    });
  };
  
  const handleStatusChange = (status: ProjectStatus) => {
    setEditedProject({
      ...editedProject,
      status,
      updatedAt: new Date(),
    });
  };
  
  const completedTaskCount = editedProject.tasks.filter((task) => task.completed).length;
  const progress = editedProject.tasks.length > 0 
    ? Math.round((completedTaskCount / editedProject.tasks.length) * 100) 
    : 0;
  
  return (
    <PageLayout>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="outline" size="sm">
              Back
            </Button>
          </Link>
          
          <h1 className="text-3xl font-bold">
            {isEditing ? (
              <Input 
                value={editedProject.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="text-3xl h-auto py-1 font-bold"
              />
            ) : (
              editedProject.title
            )}
          </h1>
        </div>
        
        <div className="flex gap-2">
          {isEditing ? (
            <Button onClick={handleSave}>Save</Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit2 className="h-4 w-4 mr-2" /> Edit
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea 
                  value={editedProject.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="min-h-[120px]"
                />
              ) : (
                <p className="text-muted-foreground">{editedProject.description}</p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Tasks</CardTitle>
              <div className="text-sm text-muted-foreground">
                {completedTaskCount} of {editedProject.tasks.length} complete
              </div>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-muted h-2 rounded-full overflow-hidden mb-6">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              {editedProject.tasks.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No tasks yet</p>
              ) : (
                <div className="space-y-2">
                  {editedProject.tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between border-b border-border/40 py-2 last:border-0">
                      <div className="flex items-center gap-3">
                        <Checkbox 
                          checked={task.completed}
                          onCheckedChange={(checked) => handleUpdateTask(task.id, checked === true)}
                          id={`task-${task.id}`}
                        />
                        <label 
                          htmlFor={`task-${task.id}`}
                          className={`${task.completed ? 'line-through text-muted-foreground' : ''}`}
                        >
                          {task.title}
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        {task.deadline && (
                          <span className="text-xs text-muted-foreground flex items-center">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            {format(new Date(task.deadline), 'MMM d, yyyy')}
                          </span>
                        )}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteTask(task.id)}
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex items-center gap-2 mt-4">
                <Input
                  placeholder="Add new task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                />
                <Button size="sm" onClick={handleAddTask}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="grid grid-cols-2 gap-2">
                  {statusOptions.map((status) => (
                    <Button
                      key={status}
                      variant={editedProject.status === status ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleStatusChange(status)}
                      className="justify-start"
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                    </Button>
                  ))}
                </div>
              ) : (
                <Badge className="text-sm">
                  {editedProject.status.charAt(0).toUpperCase() + editedProject.status.slice(1).replace('-', ' ')}
                </Badge>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">GitHub Repository</p>
                {isEditing ? (
                  <Input 
                    value={editedProject.githubUrl || ''}
                    onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                    placeholder="https://github.com/username/repo"
                  />
                ) : (
                  editedProject.githubUrl ? (
                    <a 
                      href={editedProject.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-purple-400 hover:underline"
                    >
                      <Github className="h-4 w-4" />
                      {editedProject.githubUrl.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
                    </a>
                  ) : (
                    <p className="text-muted-foreground text-sm italic">No GitHub link</p>
                  )
                )}
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Deployment URL</p>
                {isEditing ? (
                  <Input 
                    value={editedProject.deploymentUrl || ''}
                    onChange={(e) => handleInputChange('deploymentUrl', e.target.value)}
                    placeholder="https://youproject.vercel.app"
                  />
                ) : (
                  editedProject.deploymentUrl ? (
                    <a 
                      href={editedProject.deploymentUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-purple-400 hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {editedProject.deploymentUrl.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  ) : (
                    <p className="text-muted-foreground text-sm italic">No deployment link</p>
                  )
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {editedProject.technologies.map((tech) => (
                  <Badge key={tech.id} variant="secondary">
                    {tech.name}
                  </Badge>
                ))}
                {isEditing && (
                  <Button variant="outline" size="sm" className="h-6">
                    <Plus className="h-3 w-3 mr-1" /> Add Tech
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Start Date</p>
                <p>
                  {editedProject.startDate
                    ? format(new Date(editedProject.startDate), 'MMMM d, yyyy')
                    : 'Not set'}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Deadline</p>
                <p>
                  {editedProject.deadline
                    ? format(new Date(editedProject.deadline), 'MMMM d, yyyy')
                    : 'Not set'}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Last Updated</p>
                <p>{format(new Date(editedProject.updatedAt), 'MMMM d, yyyy')}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProjectDetails;
