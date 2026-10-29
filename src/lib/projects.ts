import data from "../data/projects.json";

export interface Project {
  title: string;
  description: string;
  tech: string[];
  /** Link to the source code, e.g. a GitHub repo. Optional. */
  repo?: string;
  /** Link to the live site or demo. Optional. */
  live?: string;
}

export const projects: Project[] = data;
