export interface Team {
  id: number;
  name: string;
}

export interface TeamCredentials {
  name: string;
  password: string;
}

export interface Task {
  id: number;
  title: string;
  category: string;
  description: string;
  enabled: boolean;
  points: number;
  flag: string;
}

export enum TimerStatus {
  RUNNING = 'running',
  PAUSED = 'paused',
  STOPPED = 'stopped',
}
