
import { Project, ProjectStatus, Technology } from "../types";

// Sample technologies
export const technologies: Technology[] = [
  { id: "1", name: "React", color: "#61DAFB" },
  { id: "2", name: "Next.js", color: "#000000" },
  { id: "3", name: "TypeScript", color: "#3178C6" },
  { id: "4", name: "Tailwind CSS", color: "#06B6D4" },
  { id: "5", name: "Node.js", color: "#339933" },
  { id: "6", name: "Express", color: "#000000" },
  { id: "7", name: "MongoDB", color: "#47A248" },
  { id: "8", name: "PostgreSQL", color: "#336791" },
  { id: "9", name: "Supabase", color: "#3ECF8E" },
  { id: "10", name: "Firebase", color: "#FFCA28" },
  { id: "11", name: "GraphQL", color: "#E10098" },
  { id: "12", name: "AWS", color: "#FF9900" },
  { id: "13", name: "Vercel", color: "#000000" },
  { id: "14", name: "Docker", color: "#2496ED" },
  { id: "15", name: "Kubernetes", color: "#326CE5" },
];

// Sample projects
export const projects: Project[] = [
  {
    id: "1",
    title: "ProjectPilot",
    description: "A personal project tracker for solo developers and indie hackers",
    status: "in-progress" as ProjectStatus,
    githubUrl: "https://github.com/username/projectpilot",
    deploymentUrl: "https://projectpilot.vercel.app",
    tasks: [
      {
        id: "1-1",
        title: "Create landing page",
        description: "Design and implement the landing page with hero section and CTA",
        completed: true,
        deadline: new Date("2025-04-20"),
        createdAt: new Date("2025-04-01"),
        updatedAt: new Date("2025-04-05"),
      },
      {
        id: "1-2",
        title: "Implement project dashboard",
        description: "Create the dashboard with project cards and filters",
        completed: true,
        deadline: new Date("2025-04-25"),
        createdAt: new Date("2025-04-05"),
        updatedAt: new Date("2025-04-10"),
      },
      {
        id: "1-3",
        title: "Build project detail page",
        description: "Create the project detail page with editable fields",
        completed: false,
        deadline: new Date("2025-04-30"),
        createdAt: new Date("2025-04-10"),
        updatedAt: new Date("2025-04-10"),
      },
    ],
    technologies: [
      technologies[1], // Next.js
      technologies[2], // TypeScript
      technologies[3], // Tailwind CSS
      technologies[8], // Supabase
    ],
    startDate: new Date("2025-04-01"),
    deadline: new Date("2025-05-15"),
    createdAt: new Date("2025-04-01"),
    updatedAt: new Date("2025-04-12"),
  },
  {
    id: "2",
    title: "AI Writing Assistant",
    description: "An AI-powered writing assistant that helps with content creation",
    status: "planned" as ProjectStatus,
    tasks: [
      {
        id: "2-1",
        title: "Research AI models",
        description: "Explore available AI models for natural language processing",
        completed: false,
        deadline: new Date("2025-05-10"),
        createdAt: new Date("2025-04-02"),
        updatedAt: new Date("2025-04-02"),
      },
      {
        id: "2-2",
        title: "Design UI/UX",
        description: "Create wireframes and mockups for the writing assistant interface",
        completed: false,
        deadline: new Date("2025-05-20"),
        createdAt: new Date("2025-04-02"),
        updatedAt: new Date("2025-04-02"),
      },
    ],
    technologies: [
      technologies[0], // React
      technologies[2], // TypeScript
      technologies[3], // Tailwind CSS
      technologies[9], // Firebase
    ],
    startDate: new Date("2025-05-01"),
    deadline: new Date("2025-06-30"),
    createdAt: new Date("2025-04-02"),
    updatedAt: new Date("2025-04-02"),
  },
  {
    id: "3",
    title: "E-commerce Platform",
    description: "A modern e-commerce platform with product management and checkout",
    status: "completed" as ProjectStatus,
    githubUrl: "https://github.com/username/ecommerce",
    deploymentUrl: "https://myecommerce.vercel.app",
    tasks: [
      {
        id: "3-1",
        title: "Implement product catalog",
        description: "Create product listing and filtering functionality",
        completed: true,
        deadline: new Date("2025-03-15"),
        createdAt: new Date("2025-02-01"),
        updatedAt: new Date("2025-03-10"),
      },
      {
        id: "3-2",
        title: "Build shopping cart",
        description: "Implement shopping cart with add/remove functionality",
        completed: true,
        deadline: new Date("2025-03-25"),
        createdAt: new Date("2025-02-01"),
        updatedAt: new Date("2025-03-20"),
      },
      {
        id: "3-3",
        title: "Set up payment processing",
        description: "Integrate payment gateway for checkout",
        completed: true,
        deadline: new Date("2025-04-05"),
        createdAt: new Date("2025-02-01"),
        updatedAt: new Date("2025-04-01"),
      },
    ],
    technologies: [
      technologies[1], // Next.js
      technologies[2], // TypeScript 
      technologies[3], // Tailwind CSS
      technologies[7], // PostgreSQL
    ],
    startDate: new Date("2025-02-01"),
    deadline: new Date("2025-04-05"),
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-04-05"),
  },
  {
    id: "4",
    title: "Personal Blog",
    description: "A personal blog with markdown support and tag-based filtering",
    status: "on-hold" as ProjectStatus,
    githubUrl: "https://github.com/username/blog",
    tasks: [
      {
        id: "4-1",
        title: "Design blog layout",
        description: "Create responsive layout for blog posts",
        completed: true,
        createdAt: new Date("2025-03-01"),
        updatedAt: new Date("2025-03-10"),
      },
      {
        id: "4-2",
        title: "Implement markdown rendering",
        description: "Add support for markdown in blog posts",
        completed: false,
        createdAt: new Date("2025-03-01"),
        updatedAt: new Date("2025-03-15"),
      },
    ],
    technologies: [
      technologies[1], // Next.js
      technologies[2], // TypeScript
      technologies[3], // Tailwind CSS
    ],
    startDate: new Date("2025-03-01"),
    createdAt: new Date("2025-03-01"),
    updatedAt: new Date("2025-03-15"),
  },
];
