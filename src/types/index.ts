
export type ProjectStatus = 'planned' | 'in-progress' | 'completed' | 'on-hold';

export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  deadline?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type Technology = {
  id: string;
  name: string;
  color?: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  githubUrl?: string;
  deploymentUrl?: string;
  tasks: Task[];
  technologies: Technology[];
  startDate?: Date;
  deadline?: Date;
  createdAt: Date;
  updatedAt: Date;
};
