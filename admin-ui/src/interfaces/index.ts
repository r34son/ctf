export interface Team {
  id: number;
  name: string;
}

export interface TeamCredentials {
  name: string;
  password: string;
}

export enum TimerStatus {
  RUNNING = 'running',
  PAUSED = 'paused',
  STOPPED = 'stopped',
}
