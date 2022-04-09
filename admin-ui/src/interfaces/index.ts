export interface Team {
  id: number;
  name: string;
}

export interface TeamCredentials {
  name: string;
  password: string;
}

export interface Task {
  title: string;
  category: string;
  description: string;
  points: number;
  flag: string;
}

export enum TimerStatus {
  RUNNING = 'running',
  PAUSED = 'paused',
  STOPPED = 'stopped',
}
