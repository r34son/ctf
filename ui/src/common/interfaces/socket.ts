import { Task } from 'common/interfaces';

export interface ServerToClientEvents {
  ['task:add']: (task: Task) => void;
  ['task:remove']: (id: Task['id']) => void;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ClientToServerEvents {}
