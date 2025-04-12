
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  "Track multiple projects with detailed status",
  "Manage tasks and deadlines in one place",
  "Tag projects with technologies used",
  "Monitor GitHub and deployment links",
  "Plan with calendar view",
  "Clean, minimal dark interface",
];

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Command className="h-6 w-6 text-purple-400" />
          <span className="font-bold text-lg">ProjectPilot</span>
        </div>
        <Link to="/dashboard">
          <Button>Get Started</Button>
        </Link>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-20 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            The project tracker for
            <span className="text-gradient-purple"> solo developers</span>
          </h1>
          
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl">
            A minimal, beautiful way to manage your personal projects, track progress, 
            and stay on top of your deadlines. Built by developers, for developers.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="gap-2">
                <span>Start Tracking Projects</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {/* Features */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-16 max-w-3xl">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2 text-left">
                <CheckCircle2 className="h-5 w-5 text-purple-400 mt-1 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          
          {/* Preview Image */}
          <div className="mt-20 w-full max-w-5xl mx-auto">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border/40 bg-card/50 shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                App Preview
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="container py-6 border-t border-border/40">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            Built with ❤️ for solo developers
          </p>
          <p className="text-sm text-muted-foreground">
            © 2025 ProjectPilot
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
