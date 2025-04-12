
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import ProjectGrid from '@/components/projects/ProjectGrid';
import { projects } from '@/data/sampleData';

const Dashboard = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-muted-foreground">Manage and track all your projects in one place</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex border rounded-md p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
          </div>
          
          <Link to="/projects/create">
            <Button>New Project</Button>
          </Link>
        </div>
      </div>
      
      <ProjectGrid projects={projects} />
    </PageLayout>
  );
};

export default Dashboard;
