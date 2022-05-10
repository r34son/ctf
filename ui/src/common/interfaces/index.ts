export interface Team {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  title: string;
  category: string;
  solved: boolean;
  description: string;
  points: number;
  flag: string;
}
