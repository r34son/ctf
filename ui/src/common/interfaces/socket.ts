import { Task, TeamSolvedTask } from 'common/interfaces';

export interface ServerToClientEvents {
  'task:add': (task: Task) => void;
  'task:remove': (id: Task['id']) => void;
  'task:update': (task: Task) => void;
  'task:solve': (solved: TeamSolvedTask) => void;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ClientToServerEvents {}
