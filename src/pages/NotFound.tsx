
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Command } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Command className="h-12 w-12 text-purple-400 mb-4" />
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-xl text-muted-foreground mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
