export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  path: string;
}

export type ToolCategory = 
  | 'text'
  | 'conversion'
  | 'generator'
  | 'formatters'
  | 'utilities';

export interface ToolHistory {
  id: string;
  lastUsed: Date;
  useCount: number;
}

