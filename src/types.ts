export type Theme = "amoled" | "light";

export interface Citation {
  text: string;
  url: string;
}

export interface Entry {
  name: string;
  org: string;
  type: "Model" | "Framework" | "Dataset" | "Platform";
  task: "NLP" | "Computer Vision" | "MLOps" | "Audio" | "Multimodal";
  license: string;
  year: number;
  size: string;
  summary: string;
  architecture: string;
  usage?: string;
  benchmarks: string;
  limitations: string;
  url?: string;
  citations: Citation[];
  popular: boolean;
}

export type TypeFilter = "All" | Entry["type"];
export type TaskFilter = "All Tasks" | Entry["task"];
