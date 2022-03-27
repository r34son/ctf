export interface Credentials {
  name: string;
  password: string;
}

export enum TimerStatus {
  RUNNING = 'running',
  PAUSED = 'paused',
  STOPPED = 'stopped',
}
