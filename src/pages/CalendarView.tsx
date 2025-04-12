
import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PageLayout from '@/components/layout/PageLayout';
import { projects } from '@/data/sampleData';
import { Task } from '@/types';

type TaskWithProject = Task & { projectId: string; projectTitle: string };

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Get all tasks with their associated project info
  const tasksWithProjects: TaskWithProject[] = projects.flatMap(project => 
    project.tasks.map(task => ({
      ...task,
      projectId: project.id,
      projectTitle: project.title,
    }))
  );
  
  // Generate days for the current month
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Create a 7x6 grid (42 cells) for the calendar
  const startWeek = new Date(monthStart);
  startWeek.setDate(startWeek.getDate() - startWeek.getDay());
  
  const endWeek = new Date(monthEnd);
  endWeek.setDate(endWeek.getDate() + (6 - endWeek.getDay()));
  
  const calendarDays = eachDayOfInterval({ start: startWeek, end: endWeek });
  
  // Navigate to previous or next month
  const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  
  // Get tasks for a specific day
  const getTasksForDay = (date: Date) => {
    return tasksWithProjects.filter(task => {
      if (!task.deadline) return false;
      const taskDate = new Date(task.deadline);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };
  
  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-medium w-40 text-center">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <Button variant="outline" size="icon" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Card className="p-4">
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center py-2 text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {calendarDays.map((day) => {
            const dayTasks = getTasksForDay(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isCurrentDay = isToday(day);
            
            return (
              <div
                key={day.toString()}
                className={`
                  min-h-[100px] p-2 border border-border/40 rounded-md
                  ${isCurrentMonth ? 'bg-card/50' : 'bg-muted/20 text-muted-foreground'}
                  ${isCurrentDay ? 'ring-2 ring-purple-500/40' : ''}
                `}
              >
                <div className="text-sm font-medium mb-1">
                  {format(day, 'd')}
                </div>
                
                <div className="space-y-1">
                  {dayTasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      className="text-xs p-1 rounded bg-purple-500/10 border border-purple-500/20 truncate"
                      title={`${task.title} (${task.projectTitle})`}
                    >
                      {task.title}
                    </div>
                  ))}
                  
                  {dayTasks.length > 3 && (
                    <Badge variant="secondary" className="text-xs w-full justify-center">
                      +{dayTasks.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </PageLayout>
  );
};

export default CalendarView;
