
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
        <p className="text-sm text-muted-foreground">
          Built with ❤️ using React, Tailwind CSS, and Supabase
        </p>
        <div className="flex items-center gap-4">
          <Link 
            to="https://github.com" 
            target="_blank"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            © 2025 ProjectPilot
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
