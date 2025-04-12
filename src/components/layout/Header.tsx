
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Command, Cog, Menu, Plus } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            
            <Link to="/" className="flex items-center space-x-2">
              <Command className="h-6 w-6 text-purple-400" />
              <span className="font-bold text-lg hidden md:inline-block">ProjectPilot</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-1 text-sm">
              <Link to="/dashboard">
                <Button variant="ghost" className="text-foreground/60 hover:text-foreground">
                  Dashboard
                </Button>
              </Link>
              <Link to="/calendar">
                <Button variant="ghost" className="text-foreground/60 hover:text-foreground">
                  Calendar
                </Button>
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-2">
            <Link to="/projects/create">
              <Button size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                <span>New Project</span>
              </Button>
            </Link>
            <Button variant="ghost" size="icon">
              <Cog className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="container py-2 md:hidden">
          <nav className="flex flex-col space-y-1">
            <Link to="/dashboard">
              <Button variant="ghost" className="justify-start w-full text-foreground/60 hover:text-foreground">
                Dashboard
              </Button>
            </Link>
            <Link to="/calendar">
              <Button variant="ghost" className="justify-start w-full text-foreground/60 hover:text-foreground">
                Calendar
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
