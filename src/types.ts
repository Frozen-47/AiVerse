export type Theme = "system" | "amoled" | "light";

export interface Citation {
  text: string;
  url: string;
}

export interface Entry {
  name: string;
  org: string;
  type: "Model" | "Framework" | "Dataset" | "Platform" | "AI";
  task: string;
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
  approved?: boolean;
  submitted_by?: string;
  created_at?: string;
}

export type TypeFilter = "All" | Entry["type"];
export type TaskFilter = "All Tasks" | Entry["task"];

export interface EntryRatingSummary {
  average: number;
  count: number;
}

export interface EntryComment {
  id: string;
  entryName: string;
  userKey: string;
  authorName: string;
  body: string;
  createdAt: string;
}

export interface EntryFeedbackData {
  summary: EntryRatingSummary;
  userRating: number | null;
  comments: EntryComment[];
}
