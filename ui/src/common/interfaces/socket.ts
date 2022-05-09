import { Task } from 'common/interfaces';

export interface ServerToClientEvents {
  ['task:add']: (task: Task) => void;
  ['task:remove']: (id: Task['id']) => void;
  ['task:update']: (task: Task) => void;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ClientToServerEvents {}
