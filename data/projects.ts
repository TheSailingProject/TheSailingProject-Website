export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  thumbnail?: string;
  demoUrl?: string;
  githubUrl?: string;
  status: "live" | "in-development" | "archived";
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "example-app-1",
    title: "Business Analytics Dashboard",
    description: "A comprehensive analytics dashboard for visualizing business KPIs and metrics. Built with modern data visualization libraries to provide real-time insights into business performance.",
    techStack: ["React", "TypeScript", "D3.js", "Node.js", "PostgreSQL"],
    status: "live",
    featured: true,
  },
  {
    id: "example-app-2",
    title: "Sailing Route Planner",
    description: "An interactive tool for planning sailing routes, taking into account weather conditions, tides, and navigational hazards. Combines my passion for sailing with web development.",
    techStack: ["Next.js", "TypeScript", "Leaflet", "Weather API"],
    status: "in-development",
    featured: true,
  },
  {
    id: "example-app-3",
    title: "Data Migration Tool",
    description: "Enterprise-grade data migration and transformation tool designed to streamline database migrations with validation, error handling, and rollback capabilities.",
    techStack: ["Python", "SQL", "Docker", "React"],
    status: "live",
    featured: false,
  },
];

// Function to dynamically load projects from directories/READMEs
export async function loadProjectsFromDirectory(): Promise<Project[]> {
  // This can be extended to read from actual project folders
  // For now, returning the static list
  return projects;
}
