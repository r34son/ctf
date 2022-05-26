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

export interface TeamSolvedTask {
  teamId: number;
  taskId: Task['id'];
  createdAt: string;
}

export interface Rating extends Team {
  totalPoints: number;
  graph: {
    points: Task['points'];
    time: number;
    title: Task['title'];
    value: Task['points'];
  }[];
}
