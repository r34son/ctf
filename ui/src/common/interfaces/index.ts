export interface Team {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  title: string;
  category: string;
  description: string;
  points: number;
  flag: string;
}
