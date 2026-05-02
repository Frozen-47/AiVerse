export interface Citation {
  text: string;
  url: string;
}

export interface Entry {
  name: string;
  type: string;
  summary: string;
  task: string;
  license: string;
  year: number;
  org: string;
  size: string;
  architecture: string;
  usage: string;
  benchmarks: string;
  limitations: string;
  url: string;
  citations: Citation[];
}